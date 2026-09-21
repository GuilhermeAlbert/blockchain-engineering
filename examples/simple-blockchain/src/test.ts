import { strict as assert } from "node:assert";
import { Blockchain } from "./blockchain";
import { merkleRoot } from "./merkle";
import { sha256 } from "./hash";

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

test("sha256 is deterministic", () => {
  assert.equal(sha256("hello"), sha256("hello"));
});

test("sha256 changes completely for a one-character change", () => {
  assert.notEqual(sha256("hello"), sha256("Hello"));
});

test("merkleRoot is deterministic and order-sensitive", () => {
  const a = merkleRoot(["tx1", "tx2", "tx3"]);
  const b = merkleRoot(["tx1", "tx2", "tx3"]);
  const c = merkleRoot(["tx2", "tx1", "tx3"]);
  assert.equal(a, b);
  assert.notEqual(a, c);
});

test("a freshly mined chain validates", () => {
  const chain = new Blockchain(3);
  chain.addBlock([{ from: "Alice", to: "Bob", amount: 1 }]);
  chain.addBlock([{ from: "Bob", to: "Carol", amount: 1 }]);
  assert.equal(chain.isValid().valid, true);
});

test("every mined block satisfies the difficulty target", () => {
  const difficulty = 3;
  const chain = new Blockchain(difficulty);
  chain.addBlock([{ from: "Alice", to: "Bob", amount: 1 }]);
  const target = "0".repeat(difficulty);
  for (const block of chain.chain) {
    assert.ok(block.hash.startsWith(target), `block ${block.index} hash ${block.hash} does not meet difficulty ${difficulty}`);
  }
});

test("tampering with a transaction is detected", () => {
  const chain = new Blockchain(3);
  chain.addBlock([{ from: "Alice", to: "Bob", amount: 1 }]);
  (chain.chain[1].transactions[0] as { amount: number }).amount = 999;
  assert.equal(chain.isValid().valid, false);
});

test("a broken previousHash link is detected", () => {
  const chain = new Blockchain(3);
  chain.addBlock([{ from: "Alice", to: "Bob", amount: 1 }]);
  chain.addBlock([{ from: "Bob", to: "Carol", amount: 1 }]);
  (chain.chain[2] as { previousHash: string }).previousHash = "f".repeat(64);
  assert.equal(chain.isValid().valid, false);
});

test("fork choice picks the chain with more cumulative work", () => {
  const difficulty = 3;
  const shortChain = new Blockchain(difficulty);
  const longChain = new Blockchain(difficulty);
  longChain.addBlock([{ from: "Alice", to: "Bob", amount: 1 }]);
  longChain.addBlock([{ from: "Bob", to: "Carol", amount: 1 }]);
  assert.equal(shortChain.chooseBetween(longChain.chain), "other");
  assert.equal(longChain.chooseBetween(shortChain.chain), "current");
});

console.log(`\n${passed} tests passed`);
