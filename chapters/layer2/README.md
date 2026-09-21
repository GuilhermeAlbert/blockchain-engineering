# Layer 2

Layer 2 is Ethereum's answer to the same scaling tension Bitcoin's [Bitcoin Scaling](../bitcoin-scaling/README.md) section covered: keep the base chain deliberately constrained so running a full node stays accessible, and push transaction throughput onto separate systems that inherit L1's security through specific, verifiable mechanisms rather than a fresh trust assumption. This section covers those mechanisms directly, including several dated, sourced facts about where the major rollups actually stand today, not just how they're designed to work eventually.

## What you need to know first

[Gas](../ethereum/gas.md), [Proof of Stake](../ethereum/proof-of-stake.md), and [Zero-Knowledge Proofs](../cryptography/zero-knowledge.md). This section assumes familiarity with Ethereum's account and gas model, and builds directly on the general zero-knowledge proof concepts already covered in cryptography.

## Chapters

1. [L1 vs. L2](./l1-vs-l2.md): why Ethereum didn't just raise L1's own throughput instead
2. [Rollups](./rollups.md): the sequence-batch-verify structure every rollup design shares
3. [Optimistic Rollups](./optimistic-rollups.md): why withdrawals take about a week, worked through directly
4. [Fraud Proofs](./fraud-proofs.md): interactive bisection, narrowing a dispute to one cheap-to-verify step
5. [ZK Rollups](./zk-rollups.md): proof instead of assumption, and the real cost of proof generation
6. [Validity Proofs](./validity-proofs.md): what statement a proof actually establishes, and what a zkEVM circuit has to reproduce
7. [Sequencers](./sequencers.md): the current, dated fact that every major rollup's sequencer is centralized
8. [Data Availability](./data-availability.md): why availability and correctness are separately enforced guarantees
9. [Blobs](./blobs.md): Ethereum's dedicated, cheap, temporarily-retained data type for rollup batches
10. [EIP-4844](./eip-4844.md): the blob base fee formula, derived and verified with real numbers
11. [Bridges](./bridges.md): the trust spectrum from federated multisigs to trust-minimized light clients
12. [Canonical Bridges](./canonical-bridges.md): why a rollup's own bridge reuses its existing verification mechanism
13. [Cross-Chain Messaging](./cross-chain-messaging.md): LayerZero's configurable verifiers and Wormhole's 19-guardian network
14. [Arbitrum](./arbitrum.md): Nitro, and the real gap between theoretical and actually-deployed permissionless fraud proofs
15. [Optimism](./optimism.md): the OP Stack, the Superchain vision, and where that vision actually stands
16. [Base](./base.md): Coinbase's L2, and a dated, sourced example of measuring decentralization directly
17. [zkSync](./zksync.md): EVM-compatible but not EVM-equivalent, with native account abstraction
18. [StarkNet](./starknet.md): Cairo, STARKs specifically, and an independently designed account model

## Next

Continue to [Security](../security/README.md), where the trust boundaries this section has drawn carefully (what a sequencer can and can't do, what a bridge's specific verification mechanism actually guarantees) become the starting point for understanding how real exploits have broken those boundaries in practice.
