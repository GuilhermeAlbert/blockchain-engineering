# ZK Rollups

A zero-knowledge rollup proves its state transitions are correct upfront, using a cryptographic proof submitted alongside every batch, rather than assuming correctness and relying on a challenge period the way an optimistic rollup does. This chapter covers what changes mechanically when a rollup provides proof instead of merely a claim.

## Proof instead of assumption

Recall the shared rollup structure from [Rollups](./rollups.md): a sequencer batches transactions, executes them, and publishes the result to L1. A ZK rollup adds one more thing to that publication: a **validity proof**, a cryptographic proof (covered generally in [Zero-Knowledge Proofs](../cryptography/zero-knowledge.md) and specifically as applied here in [Validity Proofs](./validity-proofs.md)) demonstrating that the published new state actually followed correctly from the previous state and the batch of transactions, according to the rollup's own execution rules. L1 verifies this proof directly, cheaply, as part of accepting the batch. There's no challenge period, because there's no need for anyone to be able to dispute a claim that's already been proven correct.

## Why this removes the withdrawal delay

Since a validity proof is checked and accepted (or rejected) at the moment a batch is published, a ZK rollup's state doesn't need a waiting period before it can be treated as final on L1. This is the practical payoff distinguishing ZK rollups from optimistic rollups most directly for an ordinary user: withdrawals back to L1 through a ZK rollup's native bridge can be near-instant once the proof for the relevant batch is verified on-chain, rather than requiring the roughly week-long challenge period [Optimistic Rollups](./optimistic-rollups.md#why-withdrawals-take-about-a-week) imposes.

## The real cost: proof generation

Generating a validity proof for an entire batch of EVM execution is computationally expensive, meaningfully more expensive than simply executing the batch itself would be. This is the actual tradeoff ZK rollups make: cheap, fast on-chain *verification* in exchange for expensive off-chain *proof generation*, which requires specialized infrastructure (often called a **prover**) and takes real, non-trivial time and computing resources per batch. A ZK rollup's practical throughput and latency depend heavily on how efficiently its specific proving system can generate these proofs, an active, ongoing area of engineering optimization across the major ZK rollup implementations.

## SNARKs versus STARKs in this context

The two dominant proof systems covered generally in [SNARKs versus STARKs](../cryptography/zero-knowledge.md#snarks-versus-starks-at-a-glance) show up directly in how different ZK rollups are actually built. zkSync and Scroll use SNARK-based proving systems; StarkNet uses STARKs specifically, reflected directly in its name. The same general tradeoffs apply here as in the cryptography chapter: SNARK-based systems have historically produced smaller, cheaper-to-verify-on-L1 proofs, some using a trusted setup, while STARK-based systems avoid a trusted setup and are typically considered better positioned against a quantum-computing threat, at the cost of larger proof sizes and generally higher L1 verification gas costs per batch.

## Common misconceptions

**ZK rollups are not automatically "more secure" than optimistic rollups in every sense.** Both, done correctly, provide strong security guarantees rooted in L1; the actual difference is in *when* correctness is established (upfront, via proof, versus after a challenge window with no successful dispute) and in the resulting engineering and cost tradeoffs, not a simple better-or-worse ranking.

**"Zero-knowledge" in this context does not mean the rollup hides transaction data from the public.** A ZK rollup still publishes the underlying transaction data to L1 for data availability, exactly like an optimistic rollup does; "zero-knowledge" refers specifically to the proof system's mathematical property of proving a statement true without revealing the private inputs used to prove it, a property most current ZK rollups don't even use to hide their own transaction contents, which remain public.

## Further reading

- [Ethereum.org: ZK rollups](https://ethereum.org/en/developers/docs/scaling/zk-rollups/)
- [StarkNet documentation](https://docs.starknet.io/)
- [zkSync documentation](https://docs.zksync.io/)
- See also: [Zero-Knowledge Proofs](../cryptography/zero-knowledge.md), [Validity Proofs](./validity-proofs.md)

---

[← Previous: Fraud Proofs](./fraud-proofs.md)
·
[Back to Layer 2](./README.md)
·
[Next: Validity Proofs →](./validity-proofs.md)
