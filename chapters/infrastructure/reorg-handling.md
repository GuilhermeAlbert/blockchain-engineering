# Reorg Handling

A chain reorganization replaces one recent canonical branch with another. Infrastructure that indexed the old branch must remove or reverse its effects, then apply the replacement branch in order.

## Detection uses hashes, not height alone

Suppose the indexer stored block 100 with hash A. The next fetched block claims number 101 but its parent is not A. The pipeline has found a discontinuity. It should walk backward through stored canonical hashes and the node's current ancestors until it finds a common block.

Polling only the latest height misses a same-height replacement. Store and compare block hashes. Provider failover can look like a reorg when providers disagree temporarily, so record the source and recheck before performing a destructive rollback when policy allows.

## Rollback models

One model stores every derived record with its block hash and deletes records owned by orphaned blocks. Another stores inverse operations for each block. A third rebuilds affected materialized views from a retained event log. The correct model depends on data size and transformation complexity.

Rollback blocks from newest to oldest, then apply the new branch from oldest to newest. Update the canonical checkpoint in the same transaction as each block's changes. Aggregates need reversible contributions or recomputation from a safe point.

## Confirmation policies

Waiting for confirmations reduces the chance and depth of rollback at the cost of latency. Ethereum exposes safe and finalized checkpoints through consensus-aware clients. Bitcoin applications choose a confirmation count based on transaction value and risk. Neither policy means old history is mathematically impossible to replace under every network failure.

Use different policies for different effects. A UI can show a pending deposit quickly. Crediting withdrawable funds or shipping a high-value asset can wait longer. Display the state rather than collapsing seen, included, safe, and finalized into “complete.”

## Testing reorgs

Fixtures should contain two branches sharing an ancestor. Test one-block and multi-block replacements, duplicate delivery, process restart during rollback, a removed log, and provider disagreement. Assert that orphaned effects disappear, canonical effects appear once, and the checkpoint names the replacement hash.

## Further reading

- [Ethereum blocks and finality](https://ethereum.org/developers/docs/blocks/)
- [Bitcoin probabilistic finality](../distributed-systems/probabilistic-finality.md)
- See also: [Chain Reorganizations](../blockchain/reorgs.md), [Indexers](./indexers.md)

---

[← Previous: Event Processing](./event-processing.md)
·
[Back to Infrastructure](./README.md)
·
[Next: Webhooks →](./webhooks.md)
