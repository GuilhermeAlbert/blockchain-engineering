import { readFileSync } from "node:fs";
import { compile } from "./compile.js";

const source = readFileSync(new URL("../contracts/Counter.sol", import.meta.url), "utf8");
const result = compile("Counter.sol", source, "Counter");
console.log(`ABI entries: ${result.abi.length}`);
console.log(`Creation bytecode: ${(result.bytecode.length - 2) / 2} bytes`);
console.log(`Runtime bytecode: ${(result.runtimeBytecode.length - 2) / 2} bytes`);
