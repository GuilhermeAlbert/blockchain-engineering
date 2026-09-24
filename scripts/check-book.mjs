#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const rootFlag = args.indexOf("--root");
const baseRoot = resolve(
  rootFlag === -1
    ? dirname(dirname(fileURLToPath(import.meta.url)))
    : args[rootFlag + 1],
);
const editionFlag = args.indexOf("--edition");
const parityFlag = args.indexOf("--parity-with");
const root = editionFlag === -1 ? baseRoot : resolve(baseRoot, args[editionFlag + 1]);
const parityRoot = parityFlag === -1 ? null : resolve(baseRoot, args[parityFlag + 1]);
const requested = new Set(args.filter((arg) => ["--links", "--navigation", "--editorial"].includes(arg)));
const full = requested.size === 0;
const runLinks = full || requested.has("--links");
const runNavigation = full || requested.has("--navigation");
const runEditorial = full || requested.has("--editorial");
const errors = [];

const excludedDirectories = new Set([".git", "node_modules", "dist", "build", "out", "docs"]);
const bannedWords = [
  "delve",
  "foster",
  "utilize",
  "facilitate",
  "empower",
  "streamline",
  "robust",
  "cutting-edge",
  "paradigm shift",
  "game changer",
  "tapestry",
  "realm",
  "multifaceted",
  "meticulous",
  "intricate",
  "paramount",
  "transformative",
  "elevate",
  "embark",
  "supercharge",
  "harness",
  "ever-evolving",
];

function walk(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) continue;
    const absolute = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(absolute);
  }
  return files;
}

function displayPath(absolute) {
  return relative(root, absolute).split(sep).join("/");
}

function report(file, line, category, message) {
  errors.push({ file: displayPath(file), line, category, message });
}

function lineAt(source, index) {
  return source.slice(0, index).split("\n").length;
}

function decodeTarget(raw) {
  const withoutAngles = raw.trim().replace(/^<|>$/g, "");
  try {
    return decodeURIComponent(withoutAngles);
  } catch {
    return withoutAngles;
  }
}

function slugifyHeading(heading) {
  return heading
    .trim()
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[`*_~]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function headingSlugs(source) {
  const counts = new Map();
  const slugs = new Set();
  for (const line of source.split("\n")) {
    const match = line.match(/^#{1,6}\s+(.+?)\s*#*$/);
    if (!match) continue;
    const base = slugifyHeading(match[1]);
    const count = counts.get(base) ?? 0;
    counts.set(base, count + 1);
    slugs.add(count === 0 ? base : `${base}-${count}`);
  }
  return slugs;
}

function markdownLinks(source) {
  return [...source.matchAll(/(?<!!)\[[^\]]*\]\(([^)]+)\)/g)].map((match) => ({
    raw: match[1],
    index: match.index,
  }));
}

function resolveMarkdownTarget(file, raw) {
  const decoded = decodeTarget(raw);
  const [pathPart, fragment = ""] = decoded.split("#", 2);
  const cleanPath = pathPart.split("?", 1)[0];
  const targetFile = cleanPath ? resolve(dirname(file), cleanPath) : file;
  return { decoded, targetFile, fragment };
}

function checkLinks(files) {
  for (const file of files) {
    const source = readFileSync(file, "utf8");
    for (const link of markdownLinks(source)) {
      const target = decodeTarget(link.raw);
      if (/^(https?:|mailto:|tel:)/i.test(target)) continue;
      const { targetFile, fragment } = resolveMarkdownTarget(file, link.raw);
      const line = lineAt(source, link.index);
      if (!existsSync(targetFile)) {
        report(file, line, "links", `missing local file: ${link.raw}`);
        continue;
      }
      if (!fragment || statSync(targetFile).isDirectory() || !targetFile.endsWith(".md")) continue;
      const slugs = headingSlugs(readFileSync(targetFile, "utf8"));
      if (!slugs.has(fragment.toLowerCase())) {
        report(file, line, "links", `missing heading fragment: ${link.raw}`);
      }
    }
  }
}

function summaryOrder() {
  const summary = resolve(root, "SUMMARY.md");
  if (!existsSync(summary)) return [];
  const source = readFileSync(summary, "utf8");
  const order = [];
  for (const link of markdownLinks(source)) {
    const { targetFile } = resolveMarkdownTarget(summary, link.raw);
    if (displayPath(targetFile).startsWith("chapters/") && targetFile.endsWith(".md")) {
      order.push(targetFile);
    }
  }
  return order;
}

function findDirectionalLink(file, label) {
  const source = readFileSync(file, "utf8");
  const pattern = label === "previous"
    ? /\[←\s*(?:Previous|Anterior):[^\]]*\]\(([^)]+)\)/i
    : /\[(?:Next|Próximo):[^\]]*→\]\(([^)]+)\)/i;
  const match = source.match(pattern);
  if (!match) return null;
  return { target: resolveMarkdownTarget(file, match[1]).targetFile, line: lineAt(source, match.index) };
}

function parityFiles(directory) {
  const topLevel = new Set([
    "README.md",
    "SUMMARY.md",
    "PROGRESS.md",
    "WRITING.md",
    "CONTRIBUTING.md",
    "glossary.md",
    "resources.md",
  ]);
  return walk(directory).filter((file) => {
    const path = relative(directory, file).split(sep).join("/");
    return path.startsWith("chapters/") || topLevel.has(path);
  });
}

function checkParity(sourceDirectory, translatedDirectory) {
  const sourceFiles = parityFiles(sourceDirectory);
  const translated = new Set(parityFiles(translatedDirectory).map((file) => relative(translatedDirectory, file)));
  for (const sourceFile of sourceFiles) {
    const path = relative(sourceDirectory, sourceFile);
    if (!translated.has(path)) {
      errors.push({ file: path.split(sep).join("/"), line: 1, category: "parity", message: "missing translated counterpart" });
    }
  }
  const source = new Set(sourceFiles.map((file) => relative(sourceDirectory, file)));
  for (const translatedFile of parityFiles(translatedDirectory)) {
    const path = relative(translatedDirectory, translatedFile);
    if (!source.has(path)) {
      report(translatedFile, 1, "parity", "translated file has no source counterpart");
    }
  }
}

function checkNavigation(order) {
  for (let index = 0; index < order.length; index += 1) {
    const file = order[index];
    if (!existsSync(file)) continue;
    const previous = findDirectionalLink(file, "previous");
    const next = findDirectionalLink(file, "next");
    if (index > 0 && previous && previous.target !== order[index - 1]) {
      report(file, previous.line, "navigation", `previous link must point to ${displayPath(order[index - 1])}`);
    }
    if (index < order.length - 1 && next && next.target !== order[index + 1]) {
      report(file, next.line, "navigation", `next link must point to ${displayPath(order[index + 1])}`);
    }
  }
}

function checkInventory(files, order) {
  const listed = new Set(order.map((file) => resolve(file)));
  for (const file of files) {
    if (!displayPath(file).startsWith("chapters/")) continue;
    if (!listed.has(resolve(file))) {
      report(file, 1, "inventory", "chapter is absent from SUMMARY.md");
    }
  }
}

function proseLines(source) {
  let fenced = false;
  return source.split("\n").map((line, index) => {
    if (/^\s*```/.test(line)) {
      fenced = !fenced;
      return null;
    }
    return fenced ? null : { line, number: index + 1 };
  }).filter(Boolean);
}

function checkEditorial(files) {
  const banned = new RegExp(`\\b(${bannedWords.join("|")})\\b`, "i");
  const marker = /\b(TODO|TBD|FIXME|XXX|WIP)\b/;
  const placeholder = /lorem ipsum|\[insert/i;
  for (const file of files) {
    const source = readFileSync(file, "utf8");
    for (const entry of proseLines(source)) {
      if (marker.test(entry.line) || placeholder.test(entry.line)) {
        report(file, entry.number, "editorial", "editorial marker remains");
      }
      if (entry.line.includes("—")) report(file, entry.number, "editorial", "em dash remains");
      const match = entry.line.match(banned);
      if (match) report(file, entry.number, "editorial", `banned wording: ${match[0]}`);
    }
  }
}

if (!existsSync(root)) {
  console.error(`Root does not exist: ${root}`);
  process.exit(2);
}

const files = walk(root);
const order = summaryOrder();

if (runLinks) checkLinks(files);
if (runNavigation) checkNavigation(order);
if (runEditorial) checkEditorial(files);
if (full) checkInventory(files, order);
if (parityRoot) checkParity(parityRoot, root);

errors.sort((left, right) =>
  left.file.localeCompare(right.file) || left.line - right.line || left.message.localeCompare(right.message),
);
for (const error of errors) {
  console.log(`${error.file}:${error.line}: [${error.category}] ${error.message}`);
}

const counts = new Map();
for (const error of errors) counts.set(error.category, (counts.get(error.category) ?? 0) + 1);
const breakdown = [...counts.entries()].map(([category, count]) => `${category}=${count}`).join(", ");
console.log(`${errors.length} errors${breakdown ? ` (${breakdown})` : ""}`);
process.exitCode = errors.length === 0 ? 0 : 1;
