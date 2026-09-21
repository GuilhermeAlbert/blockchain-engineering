# Block Time

Bitcoin targets a new block roughly every 10 minutes. This chapter covers why that specific number was chosen, and the general tradeoff every blockchain faces when picking a target block interval — a decision covered in depth for Bitcoin specifically in [Difficulty Adjustment](../bitcoin/difficulty-adjustment.md), and revisited for Ethereum's very different choice in [Ethereum Blocks](../ethereum/blocks.md).

## The tradeoff block time controls

A shorter target block time means transactions get included (and start accumulating confirmations) faster, which is good for usability. But it comes at a direct cost tied to [Peer-to-Peer Networks](../distributed-systems/p2p.md#example-propagation-timing-matters): the shorter the interval between blocks, the more likely two miners find valid blocks close enough together in time that neither has finished propagating across the network before the other is found — increasing the rate of [Chain Reorganizations](./reorgs.md) and orphaned/stale blocks. A block that gets orphaned represents wasted mining effort (the miner who found it earns nothing) and, at scale, can subtly favor better-connected miners (who propagate their blocks faster and are less likely to be orphaned), a centralization pressure worth taking seriously.

## Why roughly 10 minutes

Satoshi's own reasoning for the specific figure isn't extensively documented in known public writing beyond general engineering judgment about balancing these tradeoffs, but the choice reflects a deliberate compromise: short enough that the system feels usable (waiting on the order of tens of minutes to an hour for reasonable confirmation confidence, rather than days), long enough that propagation delay across a global, decentralized network (which, even today, generally completes within a few seconds for a typical block) represents only a small fraction of the interval between blocks, keeping the natural, propagation-caused orphan rate low without requiring any special engineering to suppress it.

## How the target interval is actually maintained

Block time isn't enforced directly — no rule says "you may not submit a block sooner than 10 minutes after the last one." Instead, it emerges as a statistical average from the interaction between the network's total mining power and the [difficulty target](../bitcoin/difficulty.md), which is periodically recalculated (every 2016 blocks, roughly two weeks, for Bitcoin) specifically to push the *average* time between blocks back toward 10 minutes, compensating for changes in the total hash power dedicated to mining. This is covered mechanically, with the actual adjustment formula, in [Difficulty Adjustment](../bitcoin/difficulty-adjustment.md).

Because block discovery is fundamentally a random process (see [Preimage Resistance](../cryptography/preimage-resistance.md#why-this-matters-mining-is-a-preimage-search)), individual blocks arrive at irregular intervals even when the network is perfectly calibrated to a 10-minute average — some blocks are found in under a minute, others take 30 minutes or more, purely by chance, the same way flipping a fair coin doesn't produce heads and tails in a perfectly alternating pattern even though the long-run average is 50/50.

## Different chains, different choices

Ethereum's pre-Merge proof-of-work chain targeted roughly 13-15 seconds per block — far shorter than Bitcoin's, reflecting a different tradeoff prioritizing faster transaction inclusion at the cost of a meaningfully higher natural orphan (called "uncle" in Ethereum's terminology) rate, which Ethereum's design explicitly accounted for with specific rules to reward and account for uncle blocks rather than simply discarding that mining effort entirely. Since [The Merge](../ethereum/the-merge.md), Ethereum uses a fixed 12-second **slot** time under proof-of-stake, a different mechanism entirely (not proof-of-work block discovery, but a scheduled validator rotation, see [Slots](../ethereum/README.md)), which sidesteps the propagation-delay tradeoff in a fundamentally different way since slot assignment is deterministic rather than probabilistic.

## Common misconceptions

**"10 minutes" is a target average, not a guarantee for any individual block.** Individual block intervals vary considerably and unpredictably around that average — a wait of 20+ minutes for the next block, or two blocks arriving within seconds of each other, are both normal, expected outcomes of the underlying random process, not signs of a problem.

**A shorter block time is not simply "better."** It's a genuine tradeoff between transaction latency and network-level inefficiency (orphan rate, propagation-driven centralization pressure) — different blockchain protocols make different, defensible choices here depending on their specific priorities.

## Further reading

- [Bitcoin whitepaper, Section 4 (Proof-of-Work)](https://bitcoin.org/bitcoin.pdf)
- See also: [Difficulty Adjustment](../bitcoin/difficulty-adjustment.md)

---

[← Previous: Block Height](./block-height.md)
·
[Back to Blockchain Fundamentals](./README.md)
·
[Next: Chain Reorganizations →](./reorgs.md)
