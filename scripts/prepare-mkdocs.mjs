#!/usr/bin/env node

import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ALERTS = new Set(["NOTE", "TIP", "IMPORTANT", "WARNING", "CAUTION"]);
const TOP_LEVEL_DOCS = [
  "PROGRESS.md",
  "WRITING.md",
  "CONTRIBUTING.md",
  "glossary.md",
  "resources.md",
];

function rewriteReadmeLinks(line) {
  return line.replace(/(\[[^\]]*\]\()([^\s)]+?)(README\.md)(#[^)\s]+)?(\))/g, "$1$2index.md$4$5");
}

function convertAlert(lines, start) {
  const marker = lines[start].match(/^> \[!([A-Z]+)\]\s*$/);
  if (!marker || !ALERTS.has(marker[1])) return null;
  const output = [`!!! ${marker[1].toLowerCase()}`];
  let index = start + 1;
  while (index < lines.length && /^>(?: |$)/.test(lines[index])) {
    const content = lines[index].replace(/^> ?/, "");
    output.push(content ? `    ${rewriteReadmeLinks(content)}` : "");
    index += 1;
  }
  return { output, next: index };
}

export function transformMarkdown(source) {
  const lines = source.split("\n");
  const output = [];
  let fence = null;

  for (let index = 0; index < lines.length;) {
    const line = lines[index];
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);
    if (fenceMatch) {
      const token = fenceMatch[1][0];
      if (fence === null) fence = token;
      else if (fence === token) fence = null;
      output.push(line);
      index += 1;
      continue;
    }

    if (fence === null) {
      const alert = convertAlert(lines, index);
      if (alert) {
        output.push(...alert.output);
        index = alert.next;
        continue;
      }
      output.push(rewriteReadmeLinks(line));
    } else {
      output.push(line);
    }
    index += 1;
  }

  return output.join("\n");
}

function copyTree(source, destination) {
  if (!existsSync(source)) return;
  mkdirSync(destination, { recursive: true });
  for (const entry of readdirSync(source, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".DS_Store") continue;
    const from = join(source, entry.name);
    const stagedName = entry.name === "README.md" ? "index.md" : entry.name;
    const to = join(destination, stagedName);
    if (entry.isDirectory()) copyTree(from, to);
    else if (entry.isFile() && entry.name.endsWith(".md")) {
      mkdirSync(dirname(to), { recursive: true });
      writeFileSync(to, transformMarkdown(readFileSync(from, "utf8")));
    } else if (entry.isFile()) {
      mkdirSync(dirname(to), { recursive: true });
      copyFileSync(from, to);
    }
  }
}

function normalizePortugueseSharedLinks(output) {
  const visit = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const target = join(directory, entry.name);
      if (entry.isDirectory()) visit(target);
      if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
      const depth = relative(output, dirname(target)).split(sep).filter(Boolean).length;
      const prefix = depth === 0 ? "./" : "../".repeat(depth);
      const source = readFileSync(target, "utf8")
        .replace(/\.\.\/(?:\.\.\/)*examples\//g, `${prefix}examples/`)
        .replace(/\.\.\/(?:\.\.\/)*cover\.png/g, `${prefix}cover.png`)
        .replace(/\.\.\/(?:\.\.\/)*LICENSE/g, `${prefix}LICENSE`);
      writeFileSync(target, source);
    }
  };
  visit(output);
}

function addNavigationPages(summary, edition, available) {
  const labels = edition === "pt-BR"
    ? { home: "Início", reference: "Referência", pages: ["Progresso", "Guia de escrita", "Como contribuir", "Glossário", "Recursos"] }
    : { home: "Home", reference: "Reference", pages: ["Progress", "Writing guide", "Contributing", "Glossary", "Resources"] };
  const entries = TOP_LEVEL_DOCS
    .map((file, index) => available.has(file) ? `- [${labels.pages[index]}](./${file})` : null)
    .filter(Boolean);
  return [`- [${labels.home}](./index.md)`, "", summary.trim(), ...(entries.length ? ["", `## ${labels.reference}`, "", ...entries] : []), ""].join("\n");
}

export function prepareEdition({ root, edition, output }) {
  const source = edition === "en" ? root : join(root, edition);
  const required = [join(source, "README.md"), join(source, "SUMMARY.md"), join(source, "chapters")];
  if (required.some((path) => !existsSync(path))) {
    throw new Error(`Missing edition source for ${edition}: ${source}`);
  }

  rmSync(output, { recursive: true, force: true });
  mkdirSync(output, { recursive: true });
  copyTree(join(source, "chapters"), join(output, "chapters"));
  copyTree(join(root, "examples"), join(output, "examples"));
  copyFileSync(join(source, "README.md"), join(output, "index.md"));
  writeFileSync(join(output, "index.md"), transformMarkdown(readFileSync(join(output, "index.md"), "utf8")));

  const available = new Set();
  for (const file of TOP_LEVEL_DOCS) {
    const candidate = join(source, file);
    if (!existsSync(candidate)) continue;
    available.add(file);
    writeFileSync(join(output, file), transformMarkdown(readFileSync(candidate, "utf8")));
  }

  const summary = transformMarkdown(readFileSync(join(source, "SUMMARY.md"), "utf8"));
  writeFileSync(join(output, "SUMMARY.md"), addNavigationPages(summary, edition, available));

  for (const asset of ["cover.png", "LICENSE"]) {
    const candidate = join(root, asset);
    if (existsSync(candidate)) copyFileSync(candidate, join(output, asset));
  }
  copyTree(join(root, "docs-site"), output);
  if (edition === "pt-BR") normalizePortugueseSharedLinks(output);
}

function parseArgs(args) {
  const value = (flag) => {
    const index = args.indexOf(flag);
    return index === -1 ? null : args[index + 1];
  };
  const root = resolve(value("--root") ?? dirname(dirname(fileURLToPath(import.meta.url))));
  const edition = value("--edition") ?? "en";
  const output = resolve(value("--output") ?? join(root, ".mkdocs-stage", edition));
  return { root, edition, output };
}

const invoked = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invoked) {
  const options = parseArgs(process.argv.slice(2));
  prepareEdition(options);
  const count = readdirSync(options.output, { recursive: true }).filter((entry) => {
    try { return statSync(join(options.output, entry)).isFile(); } catch { return false; }
  }).length;
  console.log(`Prepared ${options.edition}: ${count} files in ${options.output}`);
}
