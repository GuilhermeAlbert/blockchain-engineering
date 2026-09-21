import { Blockchain } from "./blockchain";
import { Block } from "./block";

function section(title: string): void {
  console.log(`\n=== ${title} ===`);
}

// --- 1. Build a small chain -------------------------------------------------

section("Mining a small blockchain");

const DIFFICULTY = 4; // number of leading zero hex characters required
const chain = new Blockchain(DIFFICULTY);

console.log(`Genesis block mined: hash=${chain.latestBlock.hash}, nonce=${chain.latestBlock.nonce}`);

chain.addBlock([{ from: "Alice", to: "Bob", amount: 10 }]);
chain.addBlock([
  { from: "Bob", to: "Carol", amount: 4 },
  { from: "Carol", to: "Dave", amount: 1 },
]);
chain.addBlock([{ from: "Dave", to: "Alice", amount: 0.5 }]);

for (const block of chain.chain) {
  console.log(
    `Block ${block.index}: hash=${block.hash.slice(0, 16)}... previousHash=${block.previousHash.slice(0, 16)}... nonce=${block.nonce} tx-count=${block.transactions.length}`,
  );
}

// --- 2. Validate the untouched chain ----------------------------------------

section("Validating the chain");
console.log(chain.isValid());

// --- 3. Tamper with a historical block --------------------------------------

section("Tampering with block 1 (changing Bob's amount from 10 to 1000)");

// A direct, deliberate mutation for demonstration purposes — the
// interfaces above use `readonly` specifically to make this awkward in
// ordinary code, exactly as chapters/blockchain/block-linking.md argues
// altering history should be.
(chain.chain[1].transactions[0] as { amount: number }).amount = 1000;

console.log("Validation after tampering (should fail):", chain.isValid());

console.log(
  "\nNotice what tampering did NOT require: the attacker did not need to break SHA-256," +
    "\nfind a hash collision, or forge a signature. They just edited a field in memory." +
    "\nWhat makes this detectable is that block.hash was computed BEFORE the tamper and" +
    "\nnever recomputed — isValid() recomputes it fresh and finds a mismatch. On a real" +
    "\nnetwork, the attacker would also need to re-mine this block and every block after" +
    "\nit faster than the honest network extends the real chain — see" +
    "\nchapters/blockchain/block-linking.md for the full cost calculation.",
);

// --- 4. Fork choice: comparing two competing chains -------------------------

section("Fork choice between two competing chains");

const chainA = new Blockchain(DIFFICULTY);
chainA.addBlock([{ from: "Alice", to: "Bob", amount: 1 }]);
chainA.addBlock([{ from: "Bob", to: "Carol", amount: 1 }]);

const chainB = new Blockchain(DIFFICULTY);
chainB.addBlock([{ from: "Alice", to: "Eve", amount: 1 }]);

console.log(`Chain A: ${chainA.chain.length} blocks, cumulative work = ${Blockchain.cumulativeWork(chainA.chain, DIFFICULTY)}`);
console.log(`Chain B: ${chainB.chain.length} blocks, cumulative work = ${Blockchain.cumulativeWork(chainB.chain, DIFFICULTY)}`);
console.log("A node currently following Chain B, seeing Chain A, would choose:", chainB.chooseBetween(chainA.chain));

section("What this project deliberately leaves out");
console.log(
  [
    "- No peer-to-peer network: this runs on one machine with one miner, so there is",
    "  no propagation delay and no naturally occurring forks (see distributed-systems/p2p.md).",
    "- No digital signatures: transactions are not signed, so nothing here actually proves",
    "  who authorized a transfer (see cryptography/digital-signatures.md).",
    "- No UTXO or account model: balances are not tracked or validated against double-spending",
    "  at all (see bitcoin/utxo.md).",
    "- Fixed, tiny difficulty: real Bitcoin's difficulty targets a specific block time across",
    "  a global network of unknown, changing size (see bitcoin/difficulty-adjustment.md).",
    "- Single-process, single-miner: there is no adversarial environment here at all, which is",
    "  the entire problem Bitcoin's actual security model is designed for.",
  ].join("\n"),
);
