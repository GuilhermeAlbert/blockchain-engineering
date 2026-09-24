# RPC

Remote procedure call interfaces expose node functions as requests and responses. Ethereum commonly uses JSON-RPC over HTTP or WebSocket. Bitcoin Core exposes its own JSON-RPC methods. The transport is familiar; the data semantics still follow a changing chain.

## Request and response structure

An Ethereum JSON-RPC request includes `jsonrpc`, `method`, `params`, and an `id` chosen by the client. A response returns the same ID with either `result` or `error`. Batch responses may arrive in a different order, so clients must match IDs rather than array positions.

Hex quantities use compact hexadecimal without unnecessary leading zeroes. Data values represent bytes and preserve pairs of hex digits. Treating both as arbitrary strings produces subtle parsing bugs. Large balances and block values exceed JavaScript's safe integer range and should be parsed into `bigint` or another exact integer type.

## Block references define consistency

Methods may accept a block number or tags such as `latest`, `pending`, `safe`, and `finalized`, depending on the client and method. Two calls using `latest` can observe different blocks if the head advances between them. A multi-call calculation should pin a block number or hash when consistency matters.

The `pending` view is node-local and may differ across providers because mempools differ. `safe` and `finalized` express consensus properties on Ethereum, while a numeric confirmation policy is an application rule. Unsupported tags or methods must fail visibly rather than silently falling back to `latest`.

## Errors are part of the API

Separate transport failures, HTTP status, JSON parsing, JSON-RPC errors, schema errors, and semantically missing data. A successful HTTP 200 can contain a JSON-RPC error. A `null` result may mean a transaction is unknown, not yet indexed, or no longer canonical, depending on the method.

Retries are safe for deterministic reads when pinned to a block. Retrying transaction submission requires care: the original request may have reached the node even if the response was lost. Re-submit the same signed bytes and track the transaction hash instead of creating a new transfer blindly.

## Subscriptions and polling

WebSocket subscriptions reduce polling delay but are not a durable queue. Connections drop, providers restart, and messages can be missed. On reconnect, resume from a persisted checkpoint by querying block ranges. Use subscriptions as a wake-up signal, then reconcile against canonical RPC data.

## Defensive clients

Validate response shapes, IDs, chain IDs, block hashes, and expected contract code. Bound log ranges and response sizes. Apply timeouts and cancellation. Record the exact block used for every derived result. Do not log credentials embedded in provider URLs.

## Further reading

- [Ethereum JSON-RPC specification](https://ethereum.org/developers/docs/apis/json-rpc/)
- [Bitcoin Core RPC documentation](https://bitcoincore.org/en/doc/)
- See also: [JSON-RPC](../ethereum/json-rpc.md), [RPC Providers](./rpc-providers.md)

---

[← Previous: Running a Node](./running-a-node.md)
·
[Back to Infrastructure](./README.md)
·
[Next: RPC Providers →](./rpc-providers.md)
