import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { compile } from "./compile.js";

const source = readFileSync(new URL("../contracts/Counter.sol", import.meta.url), "utf8");
const result = compile("Counter.sol", source, "Counter");
assert.ok(result.abi.some((item) => item.type === "function" && item.name === "increment"));
assert.ok(result.abi.some((item) => item.type === "event" && item.name === "Incremented"));
assert.ok(result.abi.some((item) => item.type === "error" && item.name === "NotOwner"));
assert.ok(result.bytecode.length > 2);
assert.ok(result.runtimeBytecode.length > 2);
assert.throws(() => compile("Broken.sol", "contract {", "Broken"), /Broken\.sol:1/);
console.log("6 tests passed");
