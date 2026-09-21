# Chain Reorganizations

A chain reorganization ("reorg") happens when a node switches from one version of the recent chain to a different, competing version it now considers more valid. This chapter covers why reorgs happen, why they're a normal and expected part of Bitcoin's design rather than a malfunction, and how deep reorgs differ meaningfully from shallow, routine ones.

## Why reorgs happen at all

Recall from [Peer-to-Peer Networks](../distributed-systems/p2p.md) and [CAP Theorem](../distributed-systems/cap.md) that Bitcoin's network doesn't have instant, perfect synchronization. Data takes time to propagate, and this is an unavoidable consequence of operating over a real, global, decentralized network with no central coordinator. Because of this, it's entirely possible for two different miners, in different parts of the network, to each find a valid block at nearly the same time, both building on the same previous block. For a brief window, different nodes see different "tips" of the chain, depending on which of the two blocks reached them first.

```text
                    Block 100
                    /        \
            Block 101a        Block 101b
          (found by miner A)  (found by miner B, nearly simultaneously)

Nodes near miner A initially see 101a as the tip.
Nodes near miner B initially see 101b as the tip.
This is a temporary fork — both blocks are individually valid.
```

## How it resolves

Per the [fork choice rule](./fork-choice.md), nodes always adopt whichever valid chain has the greatest cumulative proof-of-work. In the scenario above, whichever branch gets the *next* block first (say, a block 102 built on top of 101a) now has more cumulative work than the other branch. Nodes that had been following 101b **reorganize**: they discard block 101b (which becomes a stale or orphaned block, its transactions returned to the mempool if they weren't also included in 101a) and adopt the 101a → 102 chain instead.

```text
                    Block 100
                    /        \
            Block 101a        Block 101b   ← orphaned once 101a's branch pulls ahead
                 │
            Block 102          ← this branch now has more cumulative work
                 │
                 ▼
           network converges on this chain
```

This kind of shallow, single-block reorg happens routinely on Bitcoin's network. It's a direct, expected consequence of probabilistic finality and normal propagation delay (see [Finality](../distributed-systems/finality.md)), not a sign of an attack or a bug. It's precisely why a transaction with zero or one confirmation carries meaningfully more uncertainty than one with several, see [Probabilistic Finality](../distributed-systems/probabilistic-finality.md) for the actual numbers behind that uncertainty.

## Deep reorgs: a different category

A **deep reorg** (discarding many blocks, not just one) is a fundamentally different and far more serious event. It requires an alternative chain to have accumulated more total proof-of-work than many blocks' worth of the honest network's output, which (per the analysis in [Probabilistic Finality](../distributed-systems/probabilistic-finality.md)) requires either an extraordinarily lucky honest miner working alone for an extended period, or a sustained, expensive attack by a party controlling a large share of network hash power (see [51% Attacks](../bitcoin/51-percent-attacks.md)). Deep reorgs on Bitcoin's mainnet are, to date, extremely rare historical events, and their rarity is itself evidence that the network's actual honest hash power has remained large relative to any adversarial share throughout Bitcoin's history. This is an empirical, ongoing observation about Bitcoin's operational history, not a permanent mathematical guarantee.

## Example: what a reorg means for a specific transaction

If a transaction was included only in the discarded block (101b in the earlier example) and not in the winning block (101a), that transaction is no longer confirmed. It returns to the mempool as an unconfirmed transaction (assuming it's still valid against the new chain's state) and needs to be included in a future block to be confirmed again. This is the exact scenario merchants and exchanges are protecting against when they wait for multiple confirmations before treating a payment as final: a transaction with several confirmations behind it would need to be part of a much deeper, far less likely reorg to be un-confirmed than a transaction that just arrived.

## Tradeoffs

Allowing reorgs at all is a direct consequence of choosing availability over strict, instant consistency (see [CAP Theorem](../distributed-systems/cap.md)). The alternative would be a system that halts or requires manual intervention whenever a temporary disagreement about the chain tip occurs, which would make Bitcoin far less usable as an always-available, global network. The cost is that no single confirmation, taken alone, offers absolute certainty, only growing statistical confidence, as covered in [Probabilistic Finality](../distributed-systems/probabilistic-finality.md).

## Common misconceptions

**A reorg is not evidence of an attack or a security failure.** Shallow, one-block reorgs are a routine, expected, and well-understood consequence of normal network propagation delay, occurring naturally without any adversarial behavior involved.

**"Orphaned" and "stale" blocks are sometimes used slightly differently across sources**: some use "orphan" specifically for a block whose parent hasn't been received yet (a block seen out of order), and "stale" for a validly-connected block that was later excluded from the canonical chain by a reorg. This book uses "stale" for the latter, more common meaning discussed here, and flags the terminology variation explicitly since usage is not fully standardized across the Bitcoin literature.

## Further reading

- [Bitcoin whitepaper, Section 5 (Network) and Section 11 (Calculations)](https://bitcoin.org/bitcoin.pdf)

---

[← Previous: Block Time](./block-time.md)
·
[Back to Blockchain Fundamentals](./README.md)
·
[Next: Consensus Rules →](./consensus-rules.md)
