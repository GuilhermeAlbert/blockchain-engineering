# Blockchain Infrastructure

A blockchain application rarely reads consensus data directly from a peer and stops there. Nodes expose RPC methods, providers operate fleets, indexers turn blocks and logs into queryable tables, webhooks deliver derived events, and caches keep repeated reads affordable. Every layer adds useful behavior and another place where data can become late, duplicated, incomplete, or inconsistent with the canonical chain.

This section treats infrastructure as a correctness system. Availability matters, but a fast response from a stale fork can be worse than an explicit error. The chapters follow data from a node through RPC, indexing, delivery, caching, and recovery after a reorganization.

## Chapters

1. [Running a Node](./running-a-node.md): verification, sync, storage, exposure, and operations
2. [RPC](./rpc.md): request semantics, block references, errors, and unsafe assumptions
3. [RPC Providers](./rpc-providers.md): managed access, trust, limits, and failover
4. [Archive Nodes](./archive-nodes.md): historical state versus historical blocks and receipts
5. [Indexers](./indexers.md): deterministic derivation, checkpoints, schemas, and backfills
6. [The Graph](./the-graph.md): subgraph manifests, mappings, Graph Node, and query serving
7. [Block Explorers](./block-explorers.md): derived labels, verification, and public query interfaces
8. [Mempool Infrastructure](./mempool.md): local policy, propagation, replacement, and pending uncertainty
9. [Blockchain Data Pipelines](./data-pipelines.md): ordered ingestion, durable logs, and replay
10. [Event Processing](./event-processing.md): idempotency, deduplication, and delivery guarantees
11. [Reorg Handling](./reorg-handling.md): detecting a changed canonical history and rolling data back
12. [Webhooks](./webhooks.md): signed delivery, retries, ordering, and consumer safety
13. [Caching](./caching.md): keys, finality classes, invalidation, and stale reads
14. [Reliability](./reliability.md): lag, health signals, redundancy, recovery objectives, and drills

## The central data contract

Every stored or delivered fact should retain its chain ID, block number, block hash, transaction hash where applicable, and log index where applicable. Block numbers alone identify a position, not a unique history. Hashes let downstream systems detect that the block once called canonical has been replaced.

Infrastructure should also state its consistency point. “Latest” may mean the provider's current head, an indexer checkpoint, a confirmed block, a finalized block, or cached data from seconds ago. Interfaces that hide this distinction force callers to guess.

## Further reading

- [Ethereum nodes and clients](https://ethereum.org/developers/docs/nodes-and-clients/)
- [Ethereum JSON-RPC](https://ethereum.org/developers/docs/apis/json-rpc/)
- [Bitcoin Core RPC](https://bitcoincore.org/en/doc/)
- [The Graph documentation](https://thegraph.com/docs/)

---

[← Previous: Formal Verification](../security/formal-verification.md)
·
[Back to Full Contents](../../SUMMARY.md)
·
[Next: Running a Node →](./running-a-node.md)
