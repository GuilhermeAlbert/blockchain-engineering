# Indexers

An indexer reads ordered chain data and builds a database shaped for application queries. The chain stores consensus state and receipts; an indexer derives views such as account activity, token ownership, positions, volume, and protocol history.

## Deterministic derivation

Given the same canonical blocks, configuration, and code version, an indexer should produce the same derived state. Store enough provenance to reproduce each row: chain ID, block number, block hash, transaction hash, log index, contract address, and decoder version where relevant.

Logs are convenient but not magical. Contracts choose what to emit, events can be missing or ambiguous, and proxy upgrades can change the ABI at a known block. Some facts require transaction input, traces, or state calls. Document which source creates each table.

## Checkpoints and backfills

A checkpoint records the last block applied atomically. Fetch a bounded range, validate continuity, transform events, commit derived rows, then advance the checkpoint in the same database transaction. Advancing first can create a permanent gap after a crash.

Backfills use the same transformation path as live ingestion. Separate range scheduling from block application so workers can parallelize immutable history without applying one entity's updates out of order. Record code and schema version so a changed mapping triggers a controlled rebuild or migration.

## Idempotency and uniqueness

RPC calls, queues, and restarts can deliver the same log more than once. A unique key based on chain ID, block hash, transaction hash, and log index makes repeated application detectable. Transaction hash alone is insufficient because one transaction can emit many logs.

Derived aggregates need reversible updates or recomputation. Incrementing a counter without recording which event contributed makes reorg rollback and bug repair difficult.

## Serving queries

Expose the indexed height and hash with responses. Clients can compare freshness with chain head and decide whether to wait. Separate finalized datasets from near-head datasets when consumers have different consistency needs.

An indexer's database is not consensus. It is a materialized interpretation of consensus data. Schema constraints, reconciliation jobs, sampled comparisons with RPC, and deterministic replay keep that interpretation honest.

## Further reading

- [Ethereum logs and events](https://ethereum.org/developers/docs/smart-contracts/anatomy/#events-and-logs)
- [The Graph subgraphs](https://thegraph.com/docs/en/subgraphs/overview/)
- See also: [Event Indexing](../web3/event-indexing.md), [Reorg Handling](./reorg-handling.md)

---

[← Previous: Archive Nodes](./archive-nodes.md)
·
[Back to Infrastructure](./README.md)
·
[Next: The Graph →](./the-graph.md)
