import assert from "node:assert/strict";
import { existsSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";

import { prepareEdition, transformMarkdown } from "./prepare-mkdocs.mjs";

function write(root, relativePath, contents) {
  const destination = join(root, relativePath);
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, contents);
}

test("converts GitHub alerts while leaving fenced examples untouched", () => {
  const source = [
    "> [!NOTE]",
    "> First paragraph.",
    ">",
    "> Second paragraph.",
    "",
    "```md",
    "> [!WARNING]",
    "> This is an example.",
    "```",
    "",
  ].join("\n");

  assert.equal(transformMarkdown(source), [
    "!!! note",
    "    First paragraph.",
    "",
    "    Second paragraph.",
    "",
    "```md",
    "> [!WARNING]",
    "> This is an example.",
    "```",
    "",
  ].join("\n"));
});

test("rewrites README links to staged index pages", () => {
  const source = "[Home](../README.md) [Section](./guide/README.md#start) `README.md`\n";
  assert.equal(
    transformMarkdown(source),
    "[Home](../index.md) [Section](./guide/index.md#start) `README.md`\n",
  );
});

test("stages an English edition with shared assets and generated navigation", () => {
  const root = mkdtempSync(join(tmpdir(), "mkdocs-stage-"));
  const output = join(root, ".stage", "en");
  write(root, "README.md", "# Book\n\n> [!NOTE]\n> Read this.\n");
  write(root, "SUMMARY.md", "# Contents\n\n- [Chapter](./chapters/topic/README.md)\n");
  write(root, "chapters/topic/README.md", "# Topic\n");
  write(root, "examples/demo/README.md", "# Demo\n");
  write(root, "examples/demo/example.ts", "export const value = 1;\n");
  write(root, "cover.png", "image");
  write(root, "LICENSE", "license");
  write(root, "docs-site/stylesheets/extra.css", ":root {}\n");

  prepareEdition({ root, edition: "en", output });

  assert.equal(readFileSync(join(output, "index.md"), "utf8"), "# Book\n\n!!! note\n    Read this.\n");
  assert.ok(existsSync(join(output, "chapters/topic/index.md")));
  assert.ok(existsSync(join(output, "examples/demo/index.md")));
  assert.ok(existsSync(join(output, "examples/demo/example.ts")));
  assert.ok(existsSync(join(output, "stylesheets/extra.css")));
  assert.match(readFileSync(join(output, "SUMMARY.md"), "utf8"), /\[Home\]\(\.\/index\.md\)/);
  assert.match(readFileSync(join(output, "SUMMARY.md"), "utf8"), /chapters\/topic\/index\.md/);
});

test("normalizes Portuguese links to shared examples copied inside its site", () => {
  const root = mkdtempSync(join(tmpdir(), "mkdocs-stage-"));
  const output = join(root, ".stage", "pt-BR");
  write(root, "pt-BR/README.md", "# Livro\n\n[Exemplo](../examples/demo/)\n");
  write(root, "pt-BR/SUMMARY.md", "# Conteúdo\n\n- [Capítulo](./chapters/topic/page.md)\n");
  write(root, "pt-BR/chapters/topic/page.md", "# Tópico\n\n[Código](../../../examples/demo/example.ts)\n");
  write(root, "examples/demo/example.ts", "export const value = 1;\n");
  write(root, "cover.png", "image");
  write(root, "LICENSE", "license");

  prepareEdition({ root, edition: "pt-BR", output });

  assert.match(readFileSync(join(output, "index.md"), "utf8"), /\.\/examples\/demo\//);
  assert.match(readFileSync(join(output, "chapters/topic/page.md"), "utf8"), /\.\.\/\.\.\/examples\/demo\/example\.ts/);
  assert.ok(existsSync(join(output, "examples/demo/example.ts")));
});

test("fails clearly when an edition source is missing", () => {
  const root = mkdtempSync(join(tmpdir(), "mkdocs-stage-"));
  assert.throws(
    () => prepareEdition({ root, edition: "pt-BR", output: join(root, "out") }),
    /missing edition source/i,
  );
});
