import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";

import { checkBuiltSite } from "./check-built-site.mjs";

function write(root, relativePath, contents = "") {
  const destination = join(root, relativePath);
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, contents);
}

function validFixture() {
  const root = mkdtempSync(join(tmpdir(), "built-site-"));
  const page = '<html><div class="admonition note"></div><pre class="mermaid"></pre><script src="javascripts/language-switcher.js"></script></html>';
  write(root, "index.html", page);
  write(root, "pt-BR/index.html", page);
  write(root, "chapters/origins/index.html", "<html>Origins</html>");
  write(root, "pt-BR/chapters/origins/index.html", "<html>Origens</html>");
  write(root, "search/search_index.json", "{}");
  write(root, "pt-BR/search/search_index.json", "{}");
  write(root, "stylesheets/extra.css", "body {}");
  write(root, "javascripts/language-switcher.js", "(() => {})();");
  return root;
}

test("accepts a complete bilingual Material build", () => {
  assert.deepEqual(checkBuiltSite(validFixture()), []);
});

test("reports missing language and search outputs", () => {
  const root = validFixture();
  const empty = mkdtempSync(join(tmpdir(), "built-site-empty-"));
  const errors = checkBuiltSite(empty);
  assert.ok(errors.some((error) => error.includes("English root")));
  assert.ok(errors.some((error) => error.includes("Portuguese root")));
  assert.ok(errors.some((error) => error.includes("search index")));
  assert.notDeepEqual(checkBuiltSite(root), errors);
});

test("reports unrendered rich content and README routes", () => {
  const root = validFixture();
  write(root, "index.html", '<html><a href="chapters/origins/README.md">Chapter</a><p>[!NOTE]</p></html>');
  const errors = checkBuiltSite(root);
  assert.ok(errors.some((error) => error.includes("admonition")));
  assert.ok(errors.some((error) => error.includes("Mermaid")));
  assert.ok(errors.some((error) => error.includes("README.md")));
});
