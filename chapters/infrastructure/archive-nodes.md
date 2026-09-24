# Archive Nodes

An archive node retains historical state so it can answer questions about an account or contract at an old block without replaying the chain to reconstruct that state. This differs from retaining old blocks, transactions, and receipts.

## History has several layers

A normal full node verifies the chain and maintains current state. It may retain all block bodies and receipts while pruning older state tries. Such a node can return an old transaction but may not answer `eth_getBalance` or `eth_call` at the block where that transaction occurred.

Historical state queries support explorers, accounting, investigations, indexer backfills, and contract simulation at old heights. Tracing may require additional retained data or client-specific indexes. “Archive” is not a complete capability description; name the methods and range the workload needs.

## Storage and client differences

Archive storage depends on client implementation, database layout, pruning strategy, chain age, and enabled indexes. Published size estimates become stale. Measure growth on the chosen client and include compaction, snapshots, backup, and restore time.

Some clients can reconstruct historical state from retained change sets or use newer storage schemes that differ from traditional per-block state tries. The user-facing requirement remains the same: return the correct result for a pinned historical block within the required latency.

## Serving archive workloads

Separate expensive historical queries from head traffic so a large backfill cannot starve transaction submission or health checks. Bound concurrency and ranges. Cache immutable results by chain ID and block hash. A block number alone is unsafe until the block is final under the application's policy.

Test the oldest required block, not only a recent one. Providers may advertise archive access while imposing plan limits, method exclusions, or reduced throughput.

## Alternatives

An indexer can answer a defined set of historical questions more efficiently than arbitrary state access. A snapshot or analytical dataset may serve research workloads. Proof services can answer narrow queries with verifiable evidence. None replaces an archive node when applications need arbitrary historical contract execution or state reads.

## Further reading

- [Ethereum archive nodes](https://ethereum.org/developers/docs/nodes-and-clients/archive-nodes/)
- [Geth archive mode](https://geth.ethereum.org/docs/fundamentals/archive)
- See also: [Ethereum State](../ethereum/state.md), [Indexers](./indexers.md)

---

[← Previous: RPC Providers](./rpc-providers.md)
·
[Back to Infrastructure](./README.md)
·
[Next: Indexers →](./indexers.md)
