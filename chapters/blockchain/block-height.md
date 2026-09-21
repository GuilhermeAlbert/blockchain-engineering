# Block Height

Block height is a block's position in the chain, counted from the genesis block at height 0. This is a short, focused chapter. The concept is simple, but it underlies terminology ("confirmations," "the chain tip," "reorg depth") used constantly throughout the rest of this book.

## Definition

The genesis block (see [Genesis Blocks](./genesis-blocks.md)) is height 0. The block built directly on top of it is height 1, the next is height 2, and so on. Because each block references exactly one previous block (see [Hashes and Block Linking](./block-linking.md)), height increases by exactly one with each new block, giving every block in the canonical chain a unique, unambiguous position.

## Height versus confirmations

These two related concepts are easy to conflate. **Height** is an absolute position: block 800,000 is always block 800,000, regardless of when you're looking at it. **Confirmations** (covered fully in [Transaction Confirmation](../bitcoin/confirmation.md)) is a relative, moving count: a transaction included in block 800,000 has 1 confirmation once block 800,000 is the tip, 2 confirmations once block 800,001 is mined on top, and so on, the confirmation count for a given transaction grows every time a new block is added, while its block height stays fixed forever.

```text
Chain tip is currently block 800,003.

Transaction X, included in block 800,000:
  block height of inclusion: 800,000  (fixed, never changes)
  confirmations: 800,003 - 800,000 + 1 = 4  (grows as new blocks arrive)
```

## Why height alone doesn't uniquely identify "the" block at that position

Under normal conditions, there is exactly one block at any given height in the chain everyone agrees on. But during a [chain reorganization](./reorgs.md), two different blocks can briefly both claim the same height on different, competing branches of the chain. Only one of them ultimately remains part of the canonical chain once the network converges (see [Fork Choice](./fork-choice.md)). This is why block height alone is not a permanent identifier for a specific block's *contents*. The block's own hash is the permanent, unambiguous identifier; height is better understood as "the position a block currently occupies in whichever chain a given node currently considers canonical."

## Common misconceptions

**Block height is not the same as the total number of blocks that have ever existed.** Orphaned or stale blocks (blocks that were validly mined but ultimately excluded from the canonical chain after a reorg, see [Chain Reorganizations](./reorgs.md)) don't count toward height; height only tracks position within the currently-accepted canonical chain.

**A higher block height does not, by itself, make a chain more valid.** [Fork Choice](./fork-choice.md) is determined by cumulative proof-of-work, which is normally, but not always, correlated with height, under unusual circumstances (a sudden, temporary difficulty mismatch between competing branches), a shorter chain by height could in principle have more cumulative work, though this is rare in practice given how Bitcoin's difficulty adjustment works.

## Further reading

- [Bitcoin Core developer reference: Block chain](https://developer.bitcoin.org/reference/block_chain.html)

---

[← Previous: Genesis Blocks](./genesis-blocks.md)
·
[Back to Blockchain Fundamentals](./README.md)
·
[Next: Block Time →](./block-time.md)
