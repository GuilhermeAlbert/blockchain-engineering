import { minimumOutput, quoteExactInput } from "./amm.js";
import { decodeSwap, swapFixture } from "./swap-fixture.js";

const output = quoteExactInput(10_000n, 1_000_000n, 500_000n, 30n);
console.log({ exactInput: "10000", quotedOutput: output.toString(), minimumAtOnePercent: minimumOutput(output, 100n).toString() });
console.log(decodeSwap(swapFixture));
