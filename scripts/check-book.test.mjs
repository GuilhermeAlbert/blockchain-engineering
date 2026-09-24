import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const checker = new URL("./check-book.mjs", import.meta.url);

function write(root, relativePath, contents) {
  const destination = join(root, relativePath);
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, contents);
}

function runFixture(files, ...args) {
  const root = mkdtempSync(join(tmpdir(), "book-check-"));
  for (const [relativePath, contents] of Object.entries(files)) {
    write(root, relativePath, contents);
  }

  return spawnSync(process.execPath, [checker.pathname, "--root", root, ...args], {
    encoding: "utf8",
  });
}

const portugueseFiles = {
  "pt-BR/SUMMARY.md": "# Conteúdo\n\n- [Primeiro](./chapters/first.md)\n- [Segundo](./chapters/second.md)\n",
  "pt-BR/chapters/first.md": [
    "# Primeiro",
    "",
    "Leia a [seção específica](./second.md#seção-específica).",
    "",
    "---",
    "",
    "[Voltar ao conteúdo](../SUMMARY.md)",
    "·",
    "[Próximo: Segundo →](./second.md)",
    "",
  ].join("\n"),
  "pt-BR/chapters/second.md": [
    "# Segundo",
    "",
    "## Seção específica",
    "",
    "Uma explicação direta.",
    "",
    "---",
    "",
    "[← Anterior: Primeiro](./first.md)",
    "·",
    "[Voltar ao conteúdo](../SUMMARY.md)",
    "",
  ].join("\n"),
};

const cleanFiles = {
  "SUMMARY.md": "# Contents\n\n- [First](./chapters/first.md)\n- [Second](./chapters/second.md)\n",
  "chapters/first.md": [
    "# First",
    "",
    "Read the [specific section](./second.md#specific-section).",
    "",
    "---",
    "",
    "[Back to Contents](../SUMMARY.md)",
    "·",
    "[Next: Second →](./second.md)",
    "",
  ].join("\n"),
  "chapters/second.md": [
    "# Second",
    "",
    "## Specific section",
    "",
    "A direct explanation.",
    "",
    "---",
    "",
    "[← Previous: First](./first.md)",
    "·",
    "[Back to Contents](../SUMMARY.md)",
    "",
  ].join("\n"),
};

test("accepts a clean book fixture", () => {
  const result = runFixture(cleanFiles);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /0 errors/);
});

test("reports a missing local file", () => {
  const result = runFixture({
    ...cleanFiles,
    "chapters/first.md": cleanFiles["chapters/first.md"].replace(
      "./second.md#specific-section",
      "./missing.md",
    ),
  }, "--links");
  assert.equal(result.status, 1);
  assert.match(result.stdout, /missing local file/);
});

test("reports a missing heading fragment", () => {
  const result = runFixture({
    ...cleanFiles,
    "chapters/first.md": cleanFiles["chapters/first.md"].replace(
      "#specific-section",
      "#absent-section",
    ),
  }, "--links");
  assert.equal(result.status, 1);
  assert.match(result.stdout, /missing heading fragment/);
});

test("reports a chapter absent from SUMMARY.md", () => {
  const result = runFixture({
    ...cleanFiles,
    "chapters/unlisted.md": "# Unlisted\n",
  });
  assert.equal(result.status, 1);
  assert.match(result.stdout, /chapter is absent from SUMMARY\.md/);
});

test("reports editorial markers, em dashes, and banned wording", () => {
  const result = runFixture({
    ...cleanFiles,
    "chapters/second.md": cleanFiles["chapters/second.md"].replace(
      "A direct explanation.",
      "TODO: delve into this—then leverage a robust tool.",
    ),
  }, "--editorial");
  assert.equal(result.status, 1);
  assert.match(result.stdout, /editorial marker/);
  assert.match(result.stdout, /em dash/);
  assert.match(result.stdout, /banned wording/);
});

test("does not treat the Portuguese word todo as an editorial marker", () => {
  const files = {
    ...cleanFiles,
    "chapters/second.md": cleanFiles["chapters/second.md"].replace(
      "A direct explanation.",
      "Todo bloco válido referencia o bloco anterior.",
    ),
  };
  const result = runFixture(files, "--editorial");
  assert.equal(result.status, 0, result.stdout + result.stderr);
});

test("reports a malformed navigation footer", () => {
  const result = runFixture({
    ...cleanFiles,
    "chapters/first.md": cleanFiles["chapters/first.md"].replace(
      "[Next: Second →](./second.md)",
      "[Next: Second →](./first.md)",
    ),
  }, "--navigation");
  assert.equal(result.status, 1);
  assert.match(result.stdout, /next link must point to/);
});

test("validates a Portuguese edition from its own root", () => {
  const result = runFixture({ ...cleanFiles, ...portugueseFiles }, "--edition", "pt-BR");
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /0 errors/);
});

test("reports malformed Portuguese navigation", () => {
  const files = {
    ...cleanFiles,
    ...portugueseFiles,
    "pt-BR/chapters/first.md": portugueseFiles["pt-BR/chapters/first.md"].replace(
      "[Próximo: Segundo →](./second.md)",
      "[Próximo: Segundo →](./first.md)",
    ),
  };
  const result = runFixture(files, "--edition", "pt-BR", "--navigation");
  assert.equal(result.status, 1);
  assert.match(result.stdout, /next link must point to/);
});

test("reports an edition parity mismatch", () => {
  const files = {
    ...cleanFiles,
    ...portugueseFiles,
    "chapters/only-in-source.md": "# Only in source\n",
  };
  const result = runFixture(files, "--edition", "pt-BR", "--parity-with", ".");
  assert.equal(result.status, 1);
  assert.match(result.stdout, /missing translated counterpart/);
});
