#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REQUIRED = [
  ["index.html", "English root"],
  ["pt-BR/index.html", "Portuguese root"],
  ["chapters/origins/index.html", "English representative chapter"],
  ["pt-BR/chapters/origins/index.html", "Portuguese representative chapter"],
  ["search/search_index.json", "English search index"],
  ["pt-BR/search/search_index.json", "Portuguese search index"],
  ["stylesheets/extra.css", "custom stylesheet"],
  ["javascripts/language-switcher.js", "language switcher"],
];

export function checkBuiltSite(root) {
  const errors = [];
  for (const [path, label] of REQUIRED) {
    if (!existsSync(join(root, path))) errors.push(`Missing ${label}: ${path}`);
  }

  for (const [path, language] of [["index.html", "English"], ["pt-BR/index.html", "Portuguese"]]) {
    const target = join(root, path);
    if (!existsSync(target)) continue;
    const html = readFileSync(target, "utf8");
    if (!html.includes('class="admonition note"')) errors.push(`${language} root is missing a rendered admonition`);
    if (!html.includes('class="mermaid"')) errors.push(`${language} root is missing rendered Mermaid markup`);
    if (/README\.md/i.test(html)) errors.push(`${language} root still contains a README.md route`);
    if (/\[!(?:NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/.test(html)) errors.push(`${language} root contains a raw GitHub alert`);
  }
  return errors;
}

const invoked = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invoked) {
  const root = resolve(process.argv[2] ?? join(dirname(dirname(fileURLToPath(import.meta.url))), "site"));
  const errors = checkBuiltSite(root);
  if (errors.length) {
    console.error(errors.map((error) => `- ${error}`).join("\n"));
    process.exitCode = 1;
  } else {
    console.log(`Built site check passed: ${REQUIRED.length} required outputs and 2 language roots verified.`);
  }
}
