# Rollups

A rollup executes transactions off Ethereum's L1, then publishes the data and a way to verify correctness back to L1. This chapter covers the shared structure every rollup design has in common, before the next chapters split into the two specific verification mechanisms, optimistic and zero-knowledge.

## The shared rollup pattern

Every rollup, regardless of its specific verification mechanism, follows the same basic loop:

1. Users submit transactions to the rollup, not directly to L1.
2. A **sequencer** (covered in [Sequencers](./sequencers.md)) orders these transactions and executes them against the rollup's own state, off L1 entirely, which is what makes rollup transactions fast and cheap compared to executing directly on L1.
3. The sequencer periodically batches many transactions together and publishes their data to L1 (see [Data Availability](./data-availability.md)), so that anyone, not just the sequencer, has the information needed to reconstruct the rollup's state independently.
4. The rollup's new state, after processing that batch, gets verified against L1 through one of two mechanisms: a challenge period during which anyone can dispute an incorrect claim (**optimistic rollups**, see [Optimistic Rollups](./optimistic-rollups.md)), or a cryptographic proof submitted alongside the batch itself, proving correctness without needing a challenge period at all (**zero-knowledge rollups**, see [ZK Rollups](./zk-rollups.md)).

## Why "rollup" specifically means data gets published to L1

The defining, load-bearing property of a rollup, as distinct from other L2 designs, is step 3: publishing enough data to L1 that anyone, using only publicly available information, could reconstruct the rollup's entire state from scratch, without needing to trust the sequencer's own claims about what happened. This is what makes a rollup meaningfully different from a sidechain that merely checkpoints an occasional state root to L1 without publishing the underlying transaction data: a rollup's security rests on data availability plus a verification mechanism, while a data-withholding system has no way for an outside party to catch an invalid state claim even in principle, since the information needed to detect it was never made public.

## Batching is where the cost savings come from

A rollup amortizes the cost of writing to L1 across every transaction in a batch, the same fee-market economics already covered for [Transaction Batching](../bitcoin-scaling/batching.md) on Bitcoin: L1 data publication and verification has a largely fixed cost per batch, so spreading that cost across hundreds or thousands of transactions in a single batch drives the per-transaction cost on L1 down substantially compared to what each of those transactions would have cost executing on L1 individually.

## Common misconceptions

**A rollup is not simply "a faster version of Ethereum."** It's a separate execution environment with its own sequencer and its own withdrawal mechanics, whose security depends on the specific verification mechanism connecting it back to L1; understanding which mechanism a given rollup uses, and what its actual current trust assumptions are, matters more than the general label "rollup" by itself.

**Publishing data to L1 does not, by itself, guarantee a rollup's state is correct.** Data availability means anyone *could* verify the state independently, given the mechanism to do so; it's the specific verification mechanism (fraud proofs or validity proofs) that actually enforces correctness, and the two provide meaningfully different guarantees, covered in the next two chapters.

## Further reading

- [Ethereum.org: rollups](https://ethereum.org/en/developers/docs/scaling/#rollups)
- See also: [L1 vs. L2](./l1-vs-l2.md), [Data Availability](./data-availability.md), [Sequencers](./sequencers.md)

---

[← Previous: L1 vs. L2](./l1-vs-l2.md)
·
[Back to Layer 2](./README.md)
·
[Next: Optimistic Rollups →](./optimistic-rollups.md)
