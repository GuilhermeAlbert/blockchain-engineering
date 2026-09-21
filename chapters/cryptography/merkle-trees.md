# Merkle Trees

A Merkle tree (named after Ralph Merkle, who patented the structure in 1979) is a way to summarize a large set of data items into a single, small hash, such that any single item's inclusion in the set can be proven with a small amount of additional data — without needing the entire set. Bitcoin uses a Merkle tree to summarize every block's transactions into one 32-byte value, the Merkle root, stored in the block header. This chapter builds one from scratch; the next chapter, [Merkle Proofs](./merkle-proofs.md), covers proving individual membership.

## The problem

A Bitcoin block can contain thousands of transactions. If a block header needed to directly include every transaction to prove what the block contains, headers would be enormous, and a [light client](../bitcoin/light-clients.md) — a lightweight wallet that doesn't download the full blockchain — would need the entire transaction set just to check whether one transaction of interest was included in a block. Hashing all the transactions together into one combined hash (a single `H(tx1 || tx2 || ... || txN)`) would produce a small, fixed-size summary, but it has the same problem: proving any one transaction is part of that hash still requires having every other transaction to recompute it. A Merkle tree solves both problems at once: a small, fixed-size root hash, and small, efficient proofs of individual membership.

## How it works

Build the tree bottom-up:

1. **Hash each data item (leaf) individually.** For Bitcoin, each leaf is a transaction's hash.
2. **Pair up adjacent leaf hashes and hash each pair together**, producing one parent hash per pair. If there's an odd number of items at a level, the last one is paired with itself (Bitcoin's specific convention, described in the [Bitcoin Core source](https://github.com/bitcoin/bitcoin)) — a detail worth naming because different Merkle tree implementations handle the odd-leaf case differently, and getting it wrong produces a root that doesn't match other implementations.
3. **Repeat**, hashing pairs of the new level's hashes together, until only one hash remains: the **Merkle root**.

```text
Level 2 (root):              fc388a91...
                             /          \
Level 1:              8e4e9385...      70f239cb...
                      /        \       /        \
Level 0 (leaves): H(tx1)     H(tx2)  H(tx3)     H(tx4)
                     │           │      │           │
                    tx1         tx2    tx3         tx4
```

## Example: building one, verified end to end

```typescript
import { createHash } from "node:crypto";

function sha256(data: Buffer): Buffer {
  return createHash("sha256").update(data).digest();
}

function buildMerkleTree(leaves: string[]): Buffer[][] {
  let level = leaves.map((leaf) => sha256(Buffer.from(leaf)));
  const levels: Buffer[][] = [level];
  while (level.length > 1) {
    const next: Buffer[] = [];
    for (let i = 0; i < level.length; i += 2) {
      const left = level[i];
      const right = i + 1 < level.length ? level[i + 1] : level[i]; // duplicate last if odd
      next.push(sha256(Buffer.concat([left, right])));
    }
    level = next;
    levels.push(level);
  }
  return levels;
}

const transactions = [
  "tx1: Alice pays Bob 1 BTC",
  "tx2: Bob pays Carol 0.5 BTC",
  "tx3: Carol pays Dave 0.2 BTC",
  "tx4: Dave pays Alice 0.1 BTC",
];

const levels = buildMerkleTree(transactions);
console.log("Merkle root:", levels[levels.length - 1][0].toString("hex"));
```

Verified output from running this exact code:

```text
Level 0 (leaves, 4 hashes):
  tx1 → f5313c6b2e182ae19bf51aa5429560e324e7a17e3c486997afef7c9e47d20734
  tx2 → a57c4412c96e96f2ef4dd45359c3eda660da18c4511138e7fb9e9440ba60092a
  tx3 → 2172cc90f79cee70b3cc91ccfb53be868a300d92a8aeea10a18623b9035a8505
  tx4 → 26fcf3bcb0d488fc5be1ad65389420c31c894b0705c592d1b2dcbc6001e61b97

Level 1 (2 hashes):
  8e4e9385f04d619560996d38aabc81618c7b70ee60b1156f4864d4537047b788
  70f239cb90cfbb78007febcacf938225859e8c4bc924c4ea04c5e8d90d8c84a4

Merkle root: fc388a918a6360ad4ec764159c5b44ff954aea5d722a53ea9b611681aba1ae2c
```

Change a single character in any transaction — even just the amount — and the root changes completely and unpredictably (the avalanche effect described in [Hash Functions](./hashes.md)), which is exactly the tamper-evidence property a block header relies on: a single altered transaction anywhere in a block changes the root stored in that block's header, which changes the block's own hash, which breaks the link to every subsequent block (see [Hashes and Block Linking](../blockchain/block-linking.md)).

## Under the hood: Bitcoin's specific construction

Bitcoin's Merkle tree, as implemented in Bitcoin Core, uses **SHA-256d** (double SHA-256, see [SHA-256](./sha-256.md#sha-256d-bitcoins-actual-choice)) at every level, not single SHA-256 as in the simplified example above. It also has a documented historical quirk worth knowing: the "duplicate the last node if odd" rule was the subject of a real vulnerability, **CVE-2012-2459**. Because an odd-sized level duplicates its last hash before pairing, a transaction list like `[1,2,3,4,5,6]` and a different, longer list `[1,2,3,4,5,6,5,6]` (which duplicates the last pair) can produce the *identical* Merkle root. This allowed a node to be sent a block containing a duplicated transaction list that hashed to the same root, and the same block hash, as the legitimate block — a block-processing denial-of-service that could cause an affected node to stall on an invalid fork rather than a theft of funds. The bug was patched by adding an explicit check for duplicate transactions during block validation. This is a good concrete illustration of a broader lesson: even a conceptually simple cryptographic structure like a Merkle tree can have subtle, exploitable edge cases in its precise implementation details, which is why using well-reviewed, battle-tested code for consensus-critical logic matters more than the elegance of the underlying idea.

## Tradeoffs

A Merkle tree trades a small amount of extra hashing computation (building the tree) and a small amount of extra data (needed for proofs, covered next) for a dramatic reduction in what a verifier needs to download and check to confirm a single item's inclusion — from the entire dataset down to a handful of hashes, growing only logarithmically (as `log2(N)`) with the total number of items, rather than linearly.

## Common misconceptions

**A Merkle root does not let you reconstruct the underlying data.** It is a one-way summary (relying on the hash function's preimage resistance, see [Preimage Resistance](./preimage-resistance.md)) — knowing the root tells you nothing about the individual transactions unless someone separately provides them.

**Building a Merkle tree is not the same as encrypting the data it summarizes.** Every transaction in a Bitcoin block remains fully visible in the block itself; the Merkle root in the header is a compact, tamper-evident fingerprint of that already-public data, not a way of hiding it.

## Try it yourself

Run the code above, then modify one character in `transactions[1]` and rerun — confirm the root changes completely. Then try building the tree with an odd number of transactions (three or five) and confirm the "duplicate the last leaf" rule still produces a single root.

## Further reading

- [Bitcoin whitepaper, Section 7 (Reclaiming Disk Space)](https://bitcoin.org/bitcoin.pdf) — Merkle trees in their original Bitcoin context
- [Ralph Merkle's original 1979 dissertation, "Secrecy, Authentication, and Public Key Systems"](https://www.merkle.com/papers/Thesis1979.pdf)
- [CVE-2012-2459](https://nvd.nist.gov/vuln/detail/CVE-2012-2459) — the documented Bitcoin Merkle tree duplication vulnerability

---

[← Previous: Schnorr Signatures](./schnorr.md)
·
[Back to Cryptography](./README.md)
·
[Next: Merkle Proofs →](./merkle-proofs.md)
