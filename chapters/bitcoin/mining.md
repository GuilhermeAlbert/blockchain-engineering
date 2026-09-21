# Mining

Mining is the full process of competing to create new Bitcoin blocks: assembling candidate blocks, searching for valid proof-of-work, and (if successful) broadcasting the result to earn the block reward. This chapter covers mining as an economic activity and operational process, building on the pure mechanics already covered in [Proof of Work](./proof-of-work.md).

## What a miner actually does, end to end

1. **Connects to the network** as a full node (or relies on a pool's node, see [Mining Pools](./mining-pools.md)), staying synced with the current chain tip and mempool.
2. **Selects transactions** from the mempool to include in a candidate block, typically prioritizing by fee rate (see [Transaction Fees](./fees.md)) to maximize revenue, subject to the block weight limit.
3. **Constructs the coinbase transaction**, paying itself the block subsidy plus the sum of included transactions' fees (see [Coinbase Transactions](./coinbase-transactions.md)).
4. **Runs the proof-of-work search** described in [Proof of Work](./proof-of-work.md), using specialized hardware (see [ASICs](./asics.md)).
5. **Broadcasts the block immediately upon finding a valid hash**, since any delay increases the risk another miner finds a competing block first and the effort is wasted (see [Block Propagation](../distributed-systems/p2p.md#example-propagation-timing-matters) and [Chain Reorganizations](../blockchain/reorgs.md)).

## Mining economics

A miner's revenue is the block subsidy plus transaction fees for every block they successfully mine (see [Block Rewards](./block-rewards.md)); their costs are the capital expense of mining hardware (see [ASICs](./asics.md)) and the ongoing cost of electricity to run it, plus facility, cooling, and maintenance overhead. Because mining is a **competitive**, probabilistic process (a miner with X% of the network's total hash power finds roughly X% of blocks over a long enough period, but with genuine, sometimes substantial variance over shorter periods) profitability depends on the relationship between a miner's own costs (largely electricity price and hardware efficiency, in hashes-per-joule) and Bitcoin's price, current difficulty, and current fee levels. This relationship is dynamic and self-correcting: rising Bitcoin prices attract more mining investment, which raises total network hash power, which the [difficulty adjustment](./difficulty-adjustment.md) responds to by raising the target difficulty, pushing marginal, less-efficient miners back toward unprofitability, an ongoing equilibrium-seeking process rather than a fixed, static state.

## Variance and why pools exist

An individual miner with a small fraction of total network hash power might, by pure chance, go a very long time without finding any block at all, even if their expected long-run share of rewards is accurately reflected by their hash power share (this is the same kind of variance inherent in any low-probability-per-trial, many-trials process. [Mining Pools](./mining-pools.md) exist specifically to smooth this variance: many individual miners combine their hash power, and whichever pool participant actually finds a valid block shares the reward across all contributing participants proportional to their contributed work, converting a high-variance, infrequent windfall into a smaller, more predictable, more frequent payout) a real and understandable reason pools became dominant, discussed further (including the centralization concerns this raises) in that chapter.

## Stale and orphaned blocks

A miner who finds a valid block that ultimately isn't included in the winning chain (because a competing block, found nearly simultaneously, was extended first. See [Chain Reorganizations](../blockchain/reorgs.md)) receives **no reward at all** for that block, all the electricity and hardware time spent finding it was, from a pure revenue perspective, wasted. This is a real, ongoing cost of Bitcoin's probabilistic, propagation-delay-sensitive consensus mechanism, and it's part of why well-connected miners (with faster, more reliable propagation to the rest of the network) have a genuine, structural advantage over poorly connected ones, a centralization pressure worth taking seriously rather than treating mining purely as an equal, hash-power-proportional lottery.

## Common misconceptions

**Mining does not involve "solving complex mathematical puzzles" in the sense of clever problem-solving.** It's brute-force, memoryless trial and error (see [Proof of Work](./proof-of-work.md#common-misconceptions)). The "difficulty" is entirely about how many attempts are needed on average, not about any attempt requiring more insight or cleverness than any other.

**A miner's hash power share does not guarantee that exact share of blocks over any specific short period.** It's a probabilistic expectation that holds accurately only over a long enough sample. Short-run outcomes can and do deviate meaningfully, which is precisely the variance problem mining pools exist to address.

## Further reading

- [Bitcoin Core developer reference: Mining](https://developer.bitcoin.org/reference/)
- See also: [Proof of Work](./proof-of-work.md), [Mining Difficulty](./difficulty.md)

---

[← Previous: Proof of Work](./proof-of-work.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Mining Difficulty →](./difficulty.md)
