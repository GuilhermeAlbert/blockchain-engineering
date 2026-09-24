# Blockchain Data Pipelines

A blockchain data pipeline moves blocks, transactions, receipts, logs, traces, and derived records from nodes into systems built for search, analytics, notifications, or application state. The pipeline must preserve order and provenance while tolerating retry and reorganization.

## Ingestion stages

A useful split has four stages:

1. discover a candidate head;
2. fetch a contiguous block and its required data;
3. transform it into versioned records;
4. commit records and checkpoint atomically.

Queues can separate stages, but each message must identify chain, block number, and block hash. Consumers verify parent continuity rather than trusting queue order alone.

## Durable raw data

Keeping a compact immutable copy of raw inputs makes transformations replayable. A schema bug can then be repaired without depending on an RPC provider to serve years of history at production speed. Store source method, block identity, ingestion time, and format version.

Raw storage does not remove validation. A provider can return partial receipts, inconsistent blocks, or data from the wrong chain. Check counts, hashes, parent links, chain ID, and required fields before publishing downstream.

## Backpressure and range control

The chain produces at its own pace. Downstream databases and APIs may slow. Bounded queues make pressure visible. Unlimited buffering turns a short slowdown into memory exhaustion or an unbounded recovery backlog.

Use small adaptive RPC ranges. Providers often limit log result counts even when the requested block range is allowed. Split failed ranges deterministically and persist completed segments.

## Replay and versioning

Transformation code changes its interpretation of old data. Attach a version to derived rows and jobs. A replay should write into a separate table or version until validation completes, then switch readers. Mutating production history in place makes comparison and rollback difficult.

## Further reading

- [Ethereum JSON-RPC](https://ethereum.org/developers/docs/apis/json-rpc/)
- [The Graph indexing overview](https://thegraph.com/docs/en/indexing/overview/)
- See also: [Indexers](./indexers.md), [Event Processing](./event-processing.md)

---

[← Previous: Mempool Infrastructure](./mempool.md)
·
[Back to Infrastructure](./README.md)
·
[Next: Event Processing →](./event-processing.md)
