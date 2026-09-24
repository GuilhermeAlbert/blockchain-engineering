#!/usr/bin/env node

import { rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { prepareEdition } from "./prepare-mkdocs.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const site = join(root, "site");
const mkdocs = process.env.MKDOCS_BIN ?? "mkdocs";

function run(config) {
  const result = spawnSync(mkdocs, ["build", "--strict", "--config-file", config], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, DISABLE_MKDOCS_2_WARNING: "true" },
  });
  process.stdout.write(result.stdout ?? "");
  process.stderr.write(result.stderr ?? "");
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`MkDocs failed for ${config} with status ${result.status}`);
}

rmSync(site, { recursive: true, force: true });
prepareEdition({ root, edition: "en", output: join(root, ".mkdocs-stage", "en") });
prepareEdition({ root, edition: "pt-BR", output: join(root, ".mkdocs-stage", "pt-BR") });
run("mkdocs.en.yml");
run("mkdocs.pt-BR.yml");

console.log(`Bilingual documentation built at ${resolve(site)}`);
