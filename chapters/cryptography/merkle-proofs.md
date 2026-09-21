# Merkle Proofs

A Merkle proof (also called a Merkle branch or authentication path) lets you prove that a specific piece of data is included in a Merkle tree, given only the Merkle root and a small number of sibling hashes, without needing the rest of the dataset at all. This is the mechanism that makes [Simplified Payment Verification](../bitcoin/light-clients.md) possible: a lightweight Bitcoin wallet can confirm a specific transaction is included in a specific block by downloading only that block's header (80 bytes) and a short proof, instead of the entire block.

## The problem

Having built a [Merkle tree](./merkle-trees.md) and computed its root, the natural next question is: how does someone who only has the root (not the full dataset) verify that a specific item was actually included? Recomputing the whole tree from scratch requires every leaf, defeating the purpose of a compact summary. A Merkle proof solves this with a much smaller piece of data: just the sibling hash at each level of the tree along the path from your specific leaf up to the root.

## How it works

To prove a leaf's inclusion, provide:

1. The leaf's own hash (or the original data, if the verifier is expected to hash it themselves).
2. At each level of the tree, the **sibling hash** needed to recompute the parent, not the sibling's own children, just its hash.
3. A left/right indicator at each level, so the verifier knows whether to concatenate the sibling before or after the running hash.

The verifier recomputes the path from the leaf to the root using only these sibling hashes, and checks whether the final result matches the known, trusted Merkle root.

```text
                    Root
                   /    \
                  H12    H34   ← for proving tx1: need H(tx2) and H34
                 /  \    /  \
              H(tx1) H(tx2) H(tx3) H(tx4)
                │
              tx1  ← the leaf being proven

Proof for tx1 = [ H(tx2) (sibling, on the right), H34 (sibling, on the right) ]
Verifier computes:
  step 1: H12' = SHA256( H(tx1) || H(tx2) )   ← should equal H12
  step 2: Root' = SHA256( H12' || H34 )        ← should equal Root
  if Root' == Root, tx1 is proven included
```

Notice the proof size: for a tree with `N` leaves, a proof requires exactly `log2(N)` sibling hashes, for a block with 2,048 transactions, that's just 11 hashes (352 bytes), regardless of how large the full block's data actually is. This logarithmic scaling is the entire practical value of the structure.

## Example: building and verifying a proof, verified end to end

Continuing directly from the tree built in [Merkle Trees](./merkle-trees.md):

```typescript
import { createHash } from "node:crypto";

function sha256(data: Buffer): Buffer {
  return createHash("sha256").update(data).digest();
}

interface ProofStep {
  hash: Buffer;
  isRight: boolean; // true if the sibling goes on the right during concatenation
}

function buildProof(levels: Buffer[][], leafIndex: number): ProofStep[] {
  const proof: ProofStep[] = [];
  let idx = leafIndex;
  for (let level = 0; level < levels.length - 1; level++) {
    const currentLevel = levels[level];
    const isRightNode = idx % 2 === 1;
    const siblingIndex = isRightNode ? idx - 1 : idx + 1;
    const sibling = siblingIndex < currentLevel.length ? currentLevel[siblingIndex] : currentLevel[idx];
    proof.push({ hash: sibling, isRight: !isRightNode });
    idx = Math.floor(idx / 2);
  }
  return proof;
}

function verifyProof(leaf: string, proof: ProofStep[], root: Buffer): boolean {
  let computed = sha256(Buffer.from(leaf));
  for (const step of proof) {
    computed = step.isRight
      ? sha256(Buffer.concat([computed, step.hash]))
      : sha256(Buffer.concat([step.hash, computed]));
  }
  return computed.equals(root);
}

// Using the same four-transaction tree from the previous chapter:
// const levels = buildMerkleTree(transactions);
const proof = buildProof(levels, 0); // prove transactions[0] ("tx1: Alice pays Bob 1 BTC")
const root = levels[levels.length - 1][0];

console.log("Proof verifies for the real transaction:", verifyProof(transactions[0], proof, root));
console.log("Proof fails for a tampered transaction:  ", verifyProof("tx1: Alice pays Bob 100 BTC", proof, root));
```

Verified output from running this exact code (continuing the tree from [Merkle Trees](./merkle-trees.md)):

```text
Proof verifies for the real transaction: true
Proof fails for a tampered transaction:   false
```

Note precisely what this demonstrates and what it does *not*: the proof confirms that `"tx1: Alice pays Bob 1 BTC"` is included under the known root. It says nothing about whether that transaction is otherwise valid (correctly signed, spending real funds, and so on). A Merkle proof only proves **inclusion**, never correctness. Validating a transaction's actual legitimacy is a separate process, covered in [Full Nodes](../bitcoin/full-nodes.md), and it is precisely the process a light client using only Merkle proofs does *not* perform, which is the core tradeoff below.

## Tradeoffs

Merkle proofs let a light client verify inclusion in a specific block using a tiny fraction of the data a full node needs, which is the entire value proposition of SPV wallets (see [Light Clients](../bitcoin/light-clients.md)). The cost, stated explicitly in [Section 8 of the Bitcoin whitepaper](../origins/bitcoin-whitepaper.md#8-simplified-payment-verification-spv), is that this only proves a transaction is *included in a block that some node claims is part of the chain*. It does not independently verify that block's transactions are actually valid, or that the chain the client is being shown is really the honest, longest chain rather than one fabricated by an attacker with enough resources to briefly mislead a light client. A full node checks both inclusion and correctness; a light client using only Merkle proofs checks inclusion and trusts that the network majority it's connected to is behaving honestly.

## Common misconceptions

**A Merkle proof does not require trusting the party who provides it, for the specific claim it makes.** Because the verifier recomputes the path and checks it against an independently known root, a dishonest prover cannot fabricate a false inclusion proof. They can only fail to produce a valid one for something that wasn't actually included. What must still be trusted is the root itself (i.e., that it came from a legitimate block header on the honest chain). The proof mechanism itself is trustless, but where the root comes from is not automatically verified by the proof.

**A short Merkle proof is not evidence that the block or chain it references is legitimate.** It only proves internal consistency (this leaf belongs under this root), see [Tradeoffs](#tradeoffs) above.

## Try it yourself

Extend the code from [Merkle Trees](./merkle-trees.md) with the proof functions above. Build proofs for each of the four transactions in turn and confirm each one verifies against the same root. Then try tampering with a sibling hash inside a proof (flip one hex character) and confirm verification correctly fails.

## Further reading

- [Bitcoin whitepaper, Section 8 (Simplified Payment Verification)](https://bitcoin.org/bitcoin.pdf)
- [Ralph Merkle's original 1979 dissertation](https://www.merkle.com/papers/Thesis1979.pdf)

---

[← Previous: Merkle Trees](./merkle-trees.md)
·
[Back to Cryptography](./README.md)
·
[Next: Commitments →](./commitments.md)
