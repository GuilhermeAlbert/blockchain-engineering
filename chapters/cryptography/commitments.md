# Commitments

A commitment scheme lets you lock in a value now, prove later that you committed to it, without revealing the value until you choose to — and without being able to change it after the fact. This is a more general primitive than it might first sound, and it shows up, sometimes without being named explicitly, throughout blockchain systems: a Merkle root is a commitment to a set of transactions, and several privacy and scaling techniques in later chapters rely on the same underlying idea applied to individual values.

## The problem

Imagine two parties want to run a coin flip over the internet, with neither trusting the other. If Alice announces "heads" before Bob announces his own guess, Bob can simply say whatever wins. If Bob announces first, the same problem applies in reverse. Neither party can safely reveal their choice first without giving the other an advantage. This is a general problem — **how do you commit to a hidden choice in a way the other party can trust you won't secretly change later, without revealing the choice immediately?**

## How it works

A commitment scheme has two phases and two required properties:

1. **Commit**: the committing party produces a commitment `C = commit(value, randomness)` and shares `C` — typically by combining the value with a random "blinding factor" and hashing the result, using a construction like `C = H(value || randomness)`.
2. **Reveal**: later, the committing party discloses both `value` and `randomness`, and anyone can check that `H(value || randomness) = C` to confirm the revealed value matches what was originally committed.

The two required properties, both of which follow directly from the underlying hash function's properties (see [Hash Functions](./hashes.md)):

- **Hiding**: the commitment `C` reveals nothing about `value` before the reveal phase — this relies on the hash function's preimage resistance (see [Preimage Resistance](./preimage-resistance.md)) and on including the random blinding factor, since without it, an attacker with a small number of guesses (like "heads" or "tails") could simply hash each possible value and compare against `C` directly.
- **Binding**: once `C` is published, the committing party cannot find a different `(value', randomness')` pair that also hashes to `C` — this relies on the hash function's collision resistance (see [Hash Collisions](./collisions.md)).

## Example: a verifiable coin flip

```typescript
import { createHash, randomBytes } from "node:crypto";

function sha256(data: Buffer): Buffer {
  return createHash("sha256").update(data).digest();
}

function commit(value: string): { commitment: string; randomness: string } {
  const randomness = randomBytes(32).toString("hex");
  const commitment = sha256(Buffer.from(value + randomness)).toString("hex");
  return { commitment, randomness };
}

function verify(value: string, randomness: string, commitment: string): boolean {
  return sha256(Buffer.from(value + randomness)).toString("hex") === commitment;
}

// Alice commits to her guess without revealing it
const alice = commit("heads");
console.log("Alice publishes commitment:", alice.commitment);
// Bob now announces his own guess in the open, since Alice's is already locked in and hidden
console.log("Bob announces:", "tails");

// Later, Alice reveals
console.log("Alice reveals: heads, randomness =", alice.randomness);
console.log("Commitment checks out:", verify("heads", alice.randomness, alice.commitment));
console.log("Alice cannot claim she said 'tails':", verify("tails", alice.randomness, alice.commitment));
```

This code has been run and verified directly. Because `commit()` uses fresh randomness each time, the exact commitment hash differs on every run, but the behavior is consistent: `verify("heads", alice.randomness, alice.commitment)` always returns `true`, and `verify("tails", alice.randomness, alice.commitment)` always returns `false` — Alice cannot reinterpret her commitment as a different value after the fact, and nobody seeing only the published commitment could tell it was "heads" rather than "tails" before she revealed her randomness.

## Where this shows up in this book

- **Merkle roots** (see [Merkle Trees](./merkle-trees.md)) are commitments to an entire dataset — the root hides nothing intentionally (block data is public), but the same hiding/binding logic underlies why a root can't be forged to match a different transaction set after the fact.
- **Hashed timelock contracts (HTLCs)**, used throughout the [Lightning Network](../lightning/htlcs.md), use a commitment (a hash of a secret "preimage") to link a payment's release across multiple hops to the revelation of that one shared secret.
- **Confidential transactions and privacy-preserving protocols**, discussed in [Privacy](../society/privacy.md), extend simple hash-based commitments into more advanced cryptographic constructions (Pedersen commitments and similar) that can hide a value's amount while still allowing the network to verify that inputs and outputs balance correctly, without revealing the actual numbers — a more advanced application of the same hiding/binding idea, covered at an introductory level in [Zero-Knowledge Proofs](./zero-knowledge.md).

## Tradeoffs

A simple hash-based commitment (as in the example above) is easy to implement and reason about, but it is not, by itself, useful for hiding a value from someone able to guess it from a small set of possibilities (a coin flip's two outcomes, for instance) without the added random blinding factor — a detail easy to omit by mistake, and doing so silently breaks the hiding property while looking identical in code. More advanced commitment schemes (Pedersen commitments, used in several privacy-focused and scaling protocols) offer additional properties, such as being **additively homomorphic** — letting you verify that a set of committed values sums correctly without revealing any individual value — at the cost of more complex underlying mathematics than a simple hash.

## Common misconceptions

**A commitment is not the same as encryption.** A commitment is specifically designed to later be *opened* by revealing the original value and randomness for anyone to check — it is not meant to keep something secret indefinitely, only until the reveal phase the protocol defines.

**Omitting the random blinding factor does not just weaken a commitment scheme slightly — it can break the hiding property entirely** for any value drawn from a small or guessable set, since an observer can simply hash every candidate value and compare against the published commitment.

## Further reading

- [Bitcoin whitepaper, Section 7](https://bitcoin.org/bitcoin.pdf) — Merkle trees as a form of commitment, in their original context
- [Pedersen, T. (1991). Non-Interactive and Information-Theoretic Secure Verifiable Secret Sharing](https://link.springer.com/chapter/10.1007/3-540-46766-1_9) — the original Pedersen commitment paper

---

[← Previous: Merkle Proofs](./merkle-proofs.md)
·
[Back to Cryptography](./README.md)
·
[Next: Zero-Knowledge Proofs →](./zero-knowledge.md)
