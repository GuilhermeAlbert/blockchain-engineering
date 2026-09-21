# Blocks

A block is a batch of data — in Bitcoin's case, transactions — bundled together, stamped with a reference to the block before it, and secured by proof-of-work. This chapter treats the block purely as a data structure, independent of Bitcoin's specific consensus rules or monetary policy, because the same basic shape appears (with variations) in essentially every blockchain system covered later in this book.

## The problem

[Merkle trees](../cryptography/merkle-trees.md) show how to summarize a large set of data into one small hash. [Hash linking](./block-linking.md) shows how to chain records together so tampering with an old record breaks everything after it. A block is where these pieces combine with a batching decision: rather than adding every single transaction to the chain individually (which would mean computing proof-of-work for every single transaction — extremely wasteful) or waiting to batch the entire network's activity into one enormous, rarely-updated record (which would make the system too slow to be usable), Bitcoin batches transactions into blocks created at a roughly fixed interval (about every 10 minutes, see [Block Time](./block-time.md)), and proof-of-work secures each batch as a unit.

## Structure

A Bitcoin block has two main parts:

1. **The block header** — a fixed-size, 80-byte structure containing metadata about the block: a reference to the previous block's hash, a Merkle root summarizing the block's transactions, a timestamp, the current difficulty target, and a nonce. This is covered in full detail in [Block Headers](./block-headers.md), because the header alone is what proof-of-work actually secures, and it's also all a [light client](../bitcoin/light-clients.md) needs to download.
2. **The block body** — the full list of transactions included in this block, starting with a special coinbase transaction (see [Coinbase Transactions](../bitcoin/coinbase-transactions.md)) that creates new coins and pays them to whoever mined the block, followed by ordinary transactions.

```text
┌─────────────────────────────────────────┐
│               Block Header (80 bytes)     │
│  ┌─────────────────────────────────────┐ │
│  │ Previous block hash                  │ │
│  │ Merkle root (summarizes all tx below)│ │
│  │ Timestamp                            │ │
│  │ Difficulty target                    │ │
│  │ Nonce                                │ │
│  └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│               Block Body                  │
│  ┌─────────────────────────────────────┐ │
│  │ Coinbase transaction (new coins)     │ │
│  │ Transaction 1                        │ │
│  │ Transaction 2                        │ │
│  │ ...                                  │ │
│  │ Transaction N                        │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## Why the header/body split matters

Separating a small, fixed-size header from a variable-size body is a deliberate design decision with real consequences: the header is what gets hashed to check proof-of-work, and it's small enough that a miner can try billions of nonce values per second without needing to touch the (potentially megabyte-sized) body at all for each attempt — the body's contents only matter insofar as they're summarized into the Merkle root, one field in the header. This is also what makes [Simplified Payment Verification](../bitcoin/light-clients.md) possible: a lightweight client only needs to download and store 80-byte headers (roughly 4.2 MB per year of blocks, at Bitcoin's actual block rate) to verify the proof-of-work chain, rather than the full multi-hundred-gigabyte blockchain.

## Example: constructing a minimal block

This example builds a simplified block — not a fully Bitcoin-compatible one, but enough to demonstrate the exact mechanics of hashing a header and confirming it references the right previous block and transaction data:

```typescript
import { createHash } from "node:crypto";

interface Block {
  index: number;
  timestamp: number;
  transactions: string[];
  previousHash: string;
  nonce: number;
}

function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

function merkleRoot(transactions: string[]): string {
  let level = transactions.map((tx) => sha256(tx));
  while (level.length > 1) {
    const next: string[] = [];
    for (let i = 0; i < level.length; i += 2) {
      const left = level[i];
      const right = i + 1 < level.length ? level[i + 1] : level[i];
      next.push(sha256(left + right));
    }
    level = next;
  }
  return level[0] ?? sha256("");
}

function blockHash(block: Block): string {
  const header = `${block.index}|${block.timestamp}|${merkleRoot(block.transactions)}|${block.previousHash}|${block.nonce}`;
  return sha256(header);
}

const block: Block = {
  index: 1,
  timestamp: 1700000000,
  transactions: ["Alice pays Bob 1 coin", "Bob pays Carol 0.5 coin"],
  previousHash: "0000000000000000000000000000000000000000000000000000000000000",
  nonce: 0,
};

console.log("Merkle root:", merkleRoot(block.transactions));
console.log("Block hash: ", blockHash(block));
```

This chapter's example is intentionally simplified — a real block-building implementation, with actual proof-of-work search, is built up across this section's [Try It Yourself](#try-it-yourself) exercises and in [examples/simple-blockchain/](../../examples/simple-blockchain/).

## Under the hood: what changes if you alter anything

Try mentally altering any single field — the transaction list, the previous hash, even the timestamp by one second — and recomputing: the Merkle root changes (if transactions changed), and the block hash changes regardless of which field changed, because the header concatenates and hashes all of them together. This is the direct mechanism behind [Hashes and Block Linking](./block-linking.md#tamper-evidence): a block's own hash depends on everything inside it, and the next block's header explicitly includes this block's hash as its `previousHash` field, so altering anything in this block breaks the chain from this point forward.

## Tradeoffs

Batching transactions into blocks mined at a roughly fixed interval means individual transactions don't get individual, instant proof-of-work security — they inherit the security of whichever block they're batched into, and that block's position in the chain (see [Block Height](./block-height.md) and [Transaction Confirmation](../bitcoin/confirmation.md)). This is a deliberate throughput/security tradeoff: batching amortizes the cost of proof-of-work across many transactions at once, making the system usable at all, at the cost of transactions not being instantly, individually final the moment they're broadcast.

## Common misconceptions

**A block does not need to be "full" to be valid.** Bitcoin blocks can and do contain far fewer transactions than the maximum the block weight limit allows, particularly during periods of low network activity — block size is a ceiling, not a target.

**The coinbase transaction is not optional or separate from the block's transaction list** — it is the first transaction in every valid block, and a block with no coinbase transaction is invalid. See [Coinbase Transactions](../bitcoin/coinbase-transactions.md).

## Try it yourself

Run the code example above, then modify one character in one transaction string and recompute both the Merkle root and block hash — confirm both change completely. Then try building a chain of two blocks, where the second block's `previousHash` field is set to the first block's computed hash, and confirm changing anything in block 1 would require recomputing block 2's hash to keep the chain consistent (this is the mechanism explored fully in [Hashes and Block Linking](./block-linking.md)).

## Further reading

- [Bitcoin Core developer reference: Block chain](https://developer.bitcoin.org/reference/block_chain.html)
- [Bitcoin whitepaper, Section 3 (Timestamp Server)](https://bitcoin.org/bitcoin.pdf)

---

[Back to Blockchain Fundamentals](./README.md)
·
[Next: Block Headers →](./block-headers.md)
