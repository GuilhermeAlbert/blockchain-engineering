import assert from "node:assert/strict";
import { quoteExactInput, applySwap, minimumOutput } from "./amm.js";
import { decodeSwap, swapFixture } from "./swap-fixture.js";

const quote = quoteExactInput(10_000n, 1_000_000n, 500_000n, 30n);
assert.equal(quote, 4_935n);
const updated = applySwap(10_000n, quote, 1_000_000n, 500_000n);
assert.ok(updated.reserveIn * updated.reserveOut >= 1_000_000n * 500_000n);
assert.equal(minimumOutput(4_935n, 100n), 4_885n);
assert.throws(() => quoteExactInput(0n, 1n, 1n, 30n), /positive/);
assert.throws(() => quoteExactInput(1n, 0n, 1n, 30n), /liquidity/);
assert.ok(quoteExactInput(10n ** 30n, 10n ** 35n, 5n * 10n ** 34n, 30n) > 0n);
assert.deepEqual(decodeSwap(swapFixture), {
  pool: "0x1111111111111111111111111111111111111111",
  transactionHash: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  amount0Delta: 1_000_000n,
  amount1Delta: -498_000_000_000_000n,
});
console.log("7 tests passed");
