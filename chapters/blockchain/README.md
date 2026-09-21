# Blockchain Fundamentals

This section builds the blockchain data structure from its individual parts — before treating it as a financial system, treat it as what it fundamentally is: blocks of data, linked by hashes, secured by proof-of-work, with a deterministic rule for resolving disagreements. Everything here is protocol-agnostic groundwork for the deep, Bitcoin-specific treatment that follows in the next section.

## What you need to know first

[Cryptography](../cryptography/README.md) (specifically hash functions and Merkle trees) and [Distributed Systems](../distributed-systems/README.md) (specifically consensus and the CAP theorem). This section combines both directly: a blockchain is a cryptographic data structure operated under a distributed consensus protocol.

## Chapters

1. [Blocks](./blocks.md) — the header/body split, and why it exists
2. [Block Headers](./block-headers.md) — all six fields of Bitcoin's 80-byte header, with a verified serialization example
3. [Transactions](./transactions.md) — the UTXO model versus the account model, as a general design choice
4. [Hashes and Block Linking](./block-linking.md) — why altering an old block requires redoing every block after it
5. [Merkle Roots](./merkle-roots.md) — the header field that commits to every transaction in a block
6. [Genesis Blocks](./genesis-blocks.md) — the necessary, hardcoded exception to trustless verification
7. [Block Height](./block-height.md) — absolute position versus confirmation count
8. [Block Time](./block-time.md) — the propagation-delay tradeoff behind Bitcoin's ~10-minute target
9. [Chain Reorganizations](./reorgs.md) — why they're routine, and when they become serious
10. [Consensus Rules](./consensus-rules.md) — the distinction between consensus rules and policy rules
11. [Fork Choice](./fork-choice.md) — cumulative proof-of-work, precisely, not just "longest chain"
12. [Permissionless vs Permissioned Networks](./permissionless-vs-permissioned.md) — why not every "blockchain" offers the same guarantees

## Build one

Reading about a data structure only goes so far. [examples/simple-blockchain/](../../examples/simple-blockchain/) is a small, runnable TypeScript implementation that builds up, module by module, everything covered in this section: blocks, hash linking, Merkle roots, a basic proof-of-work search, and tamper-detection validation. It is explicitly **not** production-grade or Bitcoin-compatible — see that project's README for exactly what it omits and why, so its simplicity isn't mistaken for a claim about what real security requires.

## Next

Continue to [Bitcoin](../bitcoin/README.md), where this same data structure gets its full, deep treatment: real transaction formats, real mining economics, real script-based spending conditions, and everything else that turns this chapter's abstractions into the network actually running today.
