# Cryptography

Blockchain systems combine a handful of cryptographic primitives — hash functions, key pairs, digital signatures, Merkle trees — that individually predate Bitcoin, in some cases by decades. This section builds each one from its underlying problem, with runnable TypeScript examples throughout, so that later chapters can use terms like "hash," "sign," and "Merkle proof" precisely rather than as unexplained jargon.

## What you need to know first

Nothing beyond basic programming familiarity. Code examples use TypeScript with Node.js's built-in `crypto` module and the [`@noble/curves`](https://github.com/paulmillr/noble-curves) library for elliptic curve operations — install with `npm install @noble/curves`. Every code example in this section has been run and its output verified directly, not hand-computed.

## Chapters

This section is ordered for teaching, not the order it might appear in a quick-reference list: elliptic curve concepts come before the signature schemes built on them, even though signatures are the more immediately practical topic.

1. [Hash Functions](./hashes.md) — the general primitive: preimage resistance, collision resistance, the avalanche effect
2. [SHA-256](./sha-256.md) — inside the specific algorithm Bitcoin uses, step by step
3. [Hash Collisions](./collisions.md) — why they must exist mathematically, and SHA-1's real, documented collision
4. [Preimage Resistance](./preimage-resistance.md) — why mining is a brute-force search with no shortcut
5. [Public-Key Cryptography](./public-key-cryptography.md) — asymmetric keys, and the two things you can do with them
6. [Private and Public Keys](./keys.md) — what a private key actually is, and how a public key is derived
7. [Elliptic Curves](./elliptic-curves.md) — the geometry and algebra behind "multiplying" a key by a curve point
8. [secp256k1](./secp256k1.md) — the exact curve Bitcoin and Ethereum use, and why it was chosen
9. [Digital Signatures](./digital-signatures.md) — authentication, non-repudiation, and why you sign a hash
10. [ECDSA](./ecdsa.md) — Bitcoin's original signature scheme, verified end to end, and the nonce-reuse bug that has cost real money
11. [Schnorr Signatures](./schnorr.md) — Bitcoin's newer scheme, added via Taproot, and why it enables signature aggregation
12. [Merkle Trees](./merkle-trees.md) — summarizing a large dataset into one hash, built and verified in code
13. [Merkle Proofs](./merkle-proofs.md) — proving inclusion without downloading the whole dataset
14. [Commitments](./commitments.md) — locking in a hidden value you can't later change
15. [Zero-Knowledge Proofs](./zero-knowledge.md) — an introductory treatment, enough to understand ZK rollups later in the book

## Experiments

Every chapter above includes a runnable code example. As a set, they take you through:

- hashing a file and observing the avalanche effect
- generating a key pair and deriving a public key from a private key
- signing and verifying a message with both ECDSA and Schnorr
- constructing a small Merkle tree and building a valid inclusion proof
- building a simple commitment scheme (a verifiable coin flip)

## Next

Continue to [Distributed Systems](../distributed-systems/README.md) to see how these primitives combine with networking and consensus — cryptography alone proves a message wasn't tampered with; it does not, by itself, tell a network of mutually distrusting nodes which version of history to believe.
