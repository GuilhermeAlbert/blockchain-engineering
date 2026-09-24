import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";

const source = readFileSync(new URL("../docs-site/javascripts/language-switcher.js", import.meta.url), "utf8");

function switchFrom(pathname, scriptPath, language) {
  let handler;
  let destination;
  const link = { hreflang: language };
  const context = {
    document: {
      addEventListener: (_event, callback) => { handler = callback; },
      currentScript: { src: `https://example.test${scriptPath}` },
    },
    URL,
    window: {
      location: {
        pathname,
        assign: (value) => { destination = value; },
      },
    },
  };
  runInNewContext(source, context);
  handler({ preventDefault() {}, target: { closest: () => link } });
  return destination;
}

test("keeps the equivalent page when switching languages on project Pages", () => {
  assert.equal(
    switchFrom(
      "/blockchain-engineering/chapters/origins/",
      "/blockchain-engineering/javascripts/language-switcher.js",
      "pt-BR",
    ),
    "/blockchain-engineering/pt-BR/chapters/origins/",
  );
});

test("derives the site root so switching also works in local previews", () => {
  assert.equal(
    switchFrom("/chapters/origins/", "/javascripts/language-switcher.js", "pt-BR"),
    "/pt-BR/chapters/origins/",
  );
});
