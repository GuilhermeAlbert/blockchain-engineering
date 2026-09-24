# RPC Providers

An RPC provider operates nodes and exposes them as a managed service. This removes sync and fleet operations from an application team, but adds provider limits, credentials, routing behavior, and trust in the provider's view of the chain.

## What the service adds

Providers commonly add load balancing, geographic routing, caching, request accounting, enhanced methods, archive access, tracing, and support. Two endpoints labeled for the same chain may differ in client implementation, head lag, retained history, log limits, supported methods, and error behavior.

An application should probe required capabilities at startup or deployment. Chain ID, archive depth, WebSocket support, trace APIs, maximum log range, batch size, and supported block tags belong in configuration rather than assumptions hidden in code.

## Trust and privacy

The provider sees IP addresses, account queries, contract calls, and transactions submitted through it. Repeated balance queries can associate addresses with one application session. Private transaction products intentionally reveal pending intent to a restricted infrastructure path instead of the public mempool.

A provider can omit data, lag, censor a submission, or return an incorrect result. High-value applications can compare block hashes and critical reads across independently operated providers or verify proofs where the protocol supports them. Querying two brands backed by the same upstream fleet is not independent redundancy.

## Rate limits and cost

Providers meter requests by count or weighted compute. A trace or wide log query may cost far more than a block-number read. Retry storms can turn a short outage into rate-limit exhaustion. Apply client-side concurrency limits, exponential backoff with jitter, and a retry budget. Cache immutable historical results.

Do not retry deterministic application errors such as an invalid method or malformed parameters. Respect explicit rate-limit responses and provider guidance, but cap delay to the caller's deadline.

## Failover without inconsistency

Failover must carry context. If a request sequence began at block hash A, the fallback should confirm A before continuing. Broadcasting the same signed transaction to more than one endpoint is normally safe because the transaction hash is stable. Constructing and signing a replacement on every retry is not.

Track provider identity, latency, head number, head hash, error class, and failover reason. This makes an inconsistent response diagnosable instead of appearing as a random application bug.

## Further reading

- [Ethereum JSON-RPC](https://ethereum.org/developers/docs/apis/json-rpc/)
- [Ethereum nodes as a service](https://ethereum.org/developers/docs/nodes-and-clients/nodes-as-a-service/)
- See also: [RPC Providers](../web3/rpc-providers.md), [Reliability](./reliability.md)

---

[← Previous: RPC](./rpc.md)
·
[Back to Infrastructure](./README.md)
·
[Next: Archive Nodes →](./archive-nodes.md)
