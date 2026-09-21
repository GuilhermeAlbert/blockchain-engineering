import { decodeTransaction } from "./decode-transaction";
import { decodeBlockHeader, bitsToTarget, meetsTarget } from "./decode-block-header";

function section(title: string): void {
  console.log(`\n=== ${title} ===`);
}

// A real, historical Bitcoin transaction and the block header that contains
// it, both captured from a public block explorer. Hardcoded here so this
// demo runs deterministically, offline, with no network dependency — see
// src/live.ts for a version that fetches current data instead.

const REAL_TX_HEX =
  "020000000001015b8811eb92091af3cdcafc4877cc1f1ecea6af2a9c75d8d1293560c40baf561d0000000000fdffffff02dab3580000000000160014ea7a2c6e9bf5e01679b1b0f8d9795ffaf46a1b787f12490300000000160014a874bdf28808e1ef1a1c90f2173bce5a55ff9e590247304402206baf151789815bcae3d9e340fdf8c7acff74afc336c66f58268d2d7e84b875a2022023b5eeda1cc756e47197c9bc63413f5c5e5dc2542b2e229947888a53098f953d0121022b17e5893882ffda05376a16f47ff82860ecec3c61f995d48b467e09299de78800000000";
const REAL_TX_EXPECTED_TXID = "c1a73f280512ad0c86d67e1404001c721a59ba29ac83abc92a3f57fd455b344b";

const REAL_HEADER_HEX =
  "002031223ee896273e46e15f9fd9587c122c3d4a577fe05c1f9d0100000000000000000038d86ce8d25c33f2b082801ba1e6b196be1ce24f3c2e9fe199612b8965bf64edfe48b16ac51e0217319b2db5";
const REAL_BLOCK_HASH = "000000000000000000005ba563e2c64df06a14db5c51cd74e4bf14b0228fe3cf";
const REAL_BLOCK_HEIGHT = 968_006;

section(`Decoding a real transaction (confirmed in block ${REAL_BLOCK_HEIGHT})`);

const tx = decodeTransaction(REAL_TX_HEX);
console.log("version:", tx.version);
console.log("is SegWit:", tx.isSegWit);
console.log("computed txid:", tx.txid);
console.log("matches known txid:", tx.txid === REAL_TX_EXPECTED_TXID);

console.log(`\n${tx.inputs.length} input(s):`);
for (const input of tx.inputs) {
  console.log(`  spends output #${input.previousOutputIndex} of tx ${input.previousTxId}`);
}

console.log(`\n${tx.outputs.length} output(s):`);
for (const [i, output] of tx.outputs.entries()) {
  const btc = Number(output.amountSats) / 100_000_000;
  console.log(`  output ${i}: ${output.amountSats} sats (${btc} BTC) — scriptPubKey: ${output.scriptPubKey}`);
}

console.log(`\nwitness data (${tx.witnesses.length} input(s) with witnesses):`);
for (const [i, stack] of tx.witnesses.entries()) {
  console.log(`  input ${i}: ${stack.length} witness item(s)`);
  stack.forEach((item, j) => console.log(`    item ${j} (${item.length / 2} bytes): ${item.slice(0, 20)}...`));
}

section("Decoding the real block header that contains it");

const header = decodeBlockHeader(REAL_HEADER_HEX);
console.log("version:", header.version);
console.log("previous block hash:", header.previousBlockHash);
console.log("merkle root:", header.merkleRoot);
console.log("timestamp:", header.timestamp, `(${header.timestampISO})`);
console.log("bits:", header.bits);
console.log("nonce:", header.nonce);
console.log("\ncomputed block hash:", header.blockHash);
console.log("matches known block hash:", header.blockHash === REAL_BLOCK_HASH);

section("Checking the header's own proof-of-work");

const target = bitsToTarget(header.bits);
console.log("target (hex):", target.toString(16));
console.log("does the block hash actually satisfy its own target?", meetsTarget(header.blockHash, target));

section("What this demonstrates");
console.log(
  [
    "1. The transaction's txid was computed independently from raw bytes, not read from",
    "   a field — and it matches the txid every block explorer shows for this transaction.",
    "2. The block hash was computed by hashing the 80-byte header with SHA-256d — the exact",
    "   mechanism described in chapters/cryptography/sha-256.md and chapters/blockchain/block-headers.md —",
    "   and it matches the real, known hash of this real, historical block.",
    "3. The computed block hash genuinely satisfies its own proof-of-work target, exactly as",
    "   chapters/bitcoin/proof-of-work.md describes: this isn't a simulated or illustrative",
    "   value, it's the actual work a real miner performed.",
  ].join("\n"),
);
