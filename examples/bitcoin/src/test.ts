import { strict as assert } from "node:assert";
import { decodeTransaction } from "./decode-transaction";
import { decodeBlockHeader, bitsToTarget, meetsTarget } from "./decode-block-header";

let passed = 0;

function test(name: string, fn: () => void): void {
  try {
    fn();
    passed++;
    console.log(`ok - ${name}`);
  } catch (err) {
    console.error(`FAIL - ${name}`);
    throw err;
  }
}

const REAL_TX_HEX =
  "020000000001015b8811eb92091af3cdcafc4877cc1f1ecea6af2a9c75d8d1293560c40baf561d0000000000fdffffff02dab3580000000000160014ea7a2c6e9bf5e01679b1b0f8d9795ffaf46a1b787f12490300000000160014a874bdf28808e1ef1a1c90f2173bce5a55ff9e590247304402206baf151789815bcae3d9e340fdf8c7acff74afc336c66f58268d2d7e84b875a2022023b5eeda1cc756e47197c9bc63413f5c5e5dc2542b2e229947888a53098f953d0121022b17e5893882ffda05376a16f47ff82860ecec3c61f995d48b467e09299de78800000000";
const REAL_TX_TXID = "c1a73f280512ad0c86d67e1404001c721a59ba29ac83abc92a3f57fd455b344b";

const REAL_HEADER_HEX =
  "002031223ee896273e46e15f9fd9587c122c3d4a577fe05c1f9d0100000000000000000038d86ce8d25c33f2b082801ba1e6b196be1ce24f3c2e9fe199612b8965bf64edfe48b16ac51e0217319b2db5";
const REAL_BLOCK_HASH = "000000000000000000005ba563e2c64df06a14db5c51cd74e4bf14b0228fe3cf";

test("decodes the correct txid for a real SegWit transaction", () => {
  const tx = decodeTransaction(REAL_TX_HEX);
  assert.equal(tx.txid, REAL_TX_TXID);
});

test("decodes version, input, and output fields correctly", () => {
  const tx = decodeTransaction(REAL_TX_HEX);
  assert.equal(tx.version, 2);
  assert.equal(tx.isSegWit, true);
  assert.equal(tx.inputs.length, 1);
  assert.equal(tx.outputs.length, 2);
  assert.equal(tx.outputs[0].amountSats, "5813210");
  assert.equal(tx.outputs[1].amountSats, "55120511");
});

test("consumes exactly the full buffer with no leftover bytes", () => {
  const tx = decodeTransaction(REAL_TX_HEX);
  assert.equal(tx.serializedBytes, REAL_TX_HEX.length / 2);
});

test("decodes the correct block hash for a real block header", () => {
  const header = decodeBlockHeader(REAL_HEADER_HEX);
  assert.equal(header.blockHash, REAL_BLOCK_HASH);
});

test("the decoded block hash satisfies its own proof-of-work target", () => {
  const header = decodeBlockHeader(REAL_HEADER_HEX);
  const target = bitsToTarget(header.bits);
  assert.equal(meetsTarget(header.blockHash, target), true);
});

test("rejects a header that isn't exactly 80 bytes", () => {
  assert.throws(() => decodeBlockHeader(REAL_HEADER_HEX + "00"));
});

test("decoding does not mutate the input in a way that breaks re-decoding", () => {
  // A regression test for the Buffer.reverse()-mutates-in-place bug this
  // project hit during development: decoding the same hex twice must
  // produce identical results both times.
  const first = decodeBlockHeader(REAL_HEADER_HEX);
  const second = decodeBlockHeader(REAL_HEADER_HEX);
  assert.deepEqual(first, second);
});

console.log(`\n${passed} tests passed`);
