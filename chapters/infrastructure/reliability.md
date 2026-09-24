# Reliability

Reliable blockchain infrastructure returns data with a known chain context, remains available within stated limits, and recovers without losing or duplicating effects. Process uptime alone does not establish any of those properties.

## Measure correctness and freshness

Track head number and hash, safe or finalized head where available, distance from independent peers, indexer checkpoint, queue age, webhook backlog, RPC latency, error classes, and database replication lag. A healthy HTTP endpoint can serve an old head. A current node can feed an indexer stuck thousands of blocks behind.

Service-level objectives should name the operation and consistency point: for example, recent finalized logs available within a stated delay, or transaction submission acknowledged within a stated latency. Combining every method into one availability percentage hides failures in expensive or critical paths.

## Redundancy needs independent failure modes

Replicas in one region share network and cloud failures. Two providers can share an upstream client or routing layer. Identical clients share software defects. Independence may require different regions, operators, client implementations, credentials, and deployment pipelines.

Failover tests should verify chain ID, head agreement, archive capability, supported methods, and rate limits before production traffic moves. A fallback that has never served real queries is an assumption.

## Recovery objectives

Recovery time objective states how long restoration may take. Recovery point objective states how much nonreconstructable data may be lost. Chain data can be replayed, but local signing keys, webhook secrets, labels, checkpoints, and configuration may not be reproducible from the chain.

Document resync time and backfill throughput. If replay processes 100 blocks per minute while the chain creates more work than that, the service never catches up.

## Degraded modes

Choose explicit behavior for stale or partial data. A portfolio can show a last-updated time. A withdrawal system may stop rather than value collateral from a stale oracle. A transaction service may accept signed bytes into a durable queue while providers are unavailable, but must tell the caller submission has not reached the network.

Circuit breakers need reopening rules and operator ownership. Automatic failover needs a threshold that does not flap between disagreeing providers.

## Drills and reconciliation

Test node loss, provider rate limits, database restoration, dropped WebSockets, duplicate webhooks, reorgs, corrupt checkpoints, and expired credentials. Reconciliation jobs compare derived totals and sampled records against canonical RPC. They catch silent divergence that uptime monitors miss.

## Further reading

- [Ethereum nodes and clients](https://ethereum.org/developers/docs/nodes-and-clients/)
- [The Graph Graph Node monitoring](https://thegraph.com/docs/en/indexing/tooling/graph-node/)
- See also: [Running a Node](./running-a-node.md), [Data Pipelines](./data-pipelines.md)

---

[← Previous: Caching](./caching.md)
·
[Back to Infrastructure](./README.md)
·
[Next: Governance →](../governance/README.md)
