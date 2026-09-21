# L1 vs. L2

Ethereum's scaling roadmap settled, over several years of debate, on a specific division of labor: the base chain (L1) prioritizes security and decentralization over raw throughput, and separate chains (L2s) built on top of it prioritize throughput, inheriting L1's security rather than building their own from scratch. This chapter covers what that division actually means mechanically, before the rest of this section works through the dominant L2 design, the rollup, in detail.

## Why Ethereum didn't just raise L1's own throughput

Recall the blockchain trilemma tension already covered for Bitcoin's own scaling debate (see [The Block Size Debate](../forks/block-size-war.md)): directly increasing a base chain's transaction throughput, by raising its gas limit or block size, increases the hardware and bandwidth required to run a full node, which pushes toward fewer, more powerful nodes actually validating the chain. Ethereum's rollup-centric roadmap is a deliberate answer to this tension: keep L1 itself deliberately constrained, so that running an Ethereum full node stays accessible on ordinary hardware, and push the actual transaction execution work to separate L2 systems that don't carry that same constraint, while still relying on L1 for the specific things L1 is good at providing: security and data availability.

## What "inheriting L1 security" actually means

An L2 doesn't just claim to be secure because it's associated with Ethereum. It inherits Ethereum's security through a specific, verifiable mechanism: an L2 periodically publishes data about its own transactions to L1 (see [Data Availability](./data-availability.md)), and includes a way for anyone to cryptographically verify that the L2's claimed state actually followed from that published data, correctly, according to the L2's own rules. The exact verification mechanism, whether a challenge period letting anyone dispute an incorrect claim (see [Fraud Proofs](./fraud-proofs.md)) or a cryptographic proof submitted alongside every claim (see [Validity Proofs](./validity-proofs.md)), is what actually determines how much of L1's security guarantee an L2 genuinely inherits, and by how much delay.

## Not every L2 inherits security the same way

"Layer 2" gets used loosely to describe systems with meaningfully different trust models, echoing exactly the caution this book applied to Bitcoin's own scaling systems (see [Bitcoin Scaling](../bitcoin-scaling/README.md)): a rollup that publishes full transaction data to L1 and lets anyone independently verify its state inherits security very differently than a sidechain with its own separate validator set and only a bridge connecting it back to L1. This section treats "rollup" and "L2" as related but non-synonymous terms for exactly this reason, and covers the specific mechanisms (see [Rollups](./rollups.md)) rather than treating "it's an L2" as a single, uniform security claim.

## Common misconceptions

**An L2 is not automatically as secure as L1 just because it settles to L1 eventually.** The actual security depends entirely on the specific verification mechanism connecting the L2's claimed state to what was published on L1, which varies meaningfully between rollup designs and varies even more between a genuine rollup and a sidechain that merely bridges to L1.

**Lower fees on an L2 are not free of tradeoffs.** They come from batching many transactions' costs together and executing off L1's own constrained environment; what an L2 gives up in exchange, whether it's a withdrawal delay, a different trust assumption, or both, is specific to that L2's design and worth checking explicitly rather than assumed away.

## Further reading

- [Ethereum: a rollup-centric roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698): Vitalik Buterin, 2020
- See also: [Rollups](./rollups.md), [Data Availability](./data-availability.md)

---

[← Previous: Curve](../defi/curve.md)
·
[Back to Layer 2](./README.md)
·
[Next: Rollups →](./rollups.md)
