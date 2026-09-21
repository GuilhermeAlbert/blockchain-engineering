# Event Indexing

[Events and Logs](../contracts/events.md) covered why contracts emit events instead of relying on storage for historical records. This chapter covers the application side: querying and decoding those events, verified against a live, real query.

## Querying logs directly

```typescript
import { createPublicClient, http, parseAbiItem, formatUnits } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({ chain: mainnet, transport: http() });
const weth = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" as const;

const latest = await client.getBlockNumber();

const logs = await client.getLogs({
  address: weth,
  event: parseAbiItem("event Transfer(address indexed from, address indexed to, uint256 value)"),
  fromBlock: latest - 5n,
  toBlock: latest,
});

console.log("number of Transfer events in the last 5 blocks:", logs.length);
if (logs.length > 0) {
  const first = logs[0];
  console.log("from:", first.args.from);
  console.log("to:", first.args.to);
  console.log("value:", formatUnits(first.args.value, 18));
}
```

Verified output from running this exact code against live mainnet data:

```text
number of Transfer events in the last 5 blocks: 187
from: 0x000000000004444c5dc75cB358380D2e3dE08A90
to: 0x0000000aa232009084Bd71A5797d089AA4Edfad4
value: 0.796016784344761129
```

187 WETH transfers in just five blocks (roughly one minute of real time) — a concrete sense of how much raw event volume even a single popular contract generates, and why querying logs efficiently (using [indexed parameters](../contracts/events.md#indexed-parameters) to filter, as `parseAbiItem`'s `indexed` markers on `from`/`to` enable here) matters for any application trying to work with this data at scale.

## Why real applications don't query `eth_getLogs` live, on every page load

This example queries a narrow, five-block range directly — practical for a small, bounded query, but `eth_getLogs` has real, common limitations for broader historical queries: many RPC providers cap how large a block range or how many results a single call can return, and reconstructing a complete history (every transfer a specific address has ever made, for instance) by repeatedly querying narrow ranges is slow and inefficient for anything beyond occasional, small lookups. This is exactly the gap dedicated **indexers** (see [Indexers](../infrastructure/indexers.md) and [The Graph](../infrastructure/the-graph.md)) exist to close: a service that continuously watches for new events, stores them in an efficiently queryable database (rather than requiring a fresh, potentially slow blockchain query every time), and exposes a fast, flexible query interface — trading the RPC-layer's raw, unindexed access for pre-processed, purpose-built queryability.

## Reorg handling for indexed data

Because logs come from mined blocks, and mined blocks can (rarely, but genuinely) be reorganized away before finalization (see [Chain Reorganizations](../blockchain/reorgs.md) and [Finality](../ethereum/finality.md)), any application or indexer processing events needs a strategy for this: either waiting for enough confirmations (or actual finality) before treating an event as permanent, or implementing logic to detect and correct for a reorg that invalidates previously-processed events — a real, non-optional consideration for indexing pipelines, covered further in [Reorg Handling](../infrastructure/reorg-handling.md).

## Common misconceptions

**Events emitted by a contract are not automatically pushed to every listening application** — an application has to actively query for them (via `eth_getLogs`, a WebSocket subscription, or a third-party indexer), there's no built-in push notification mechanism at the base protocol level that reaches applications without them polling or subscribing through some specific mechanism.

**A large `logs.length` from a broad query does not mean an application should always fetch and process every single one eagerly** — depending on the use case, filtering more precisely (by indexed parameters, by a narrower block range, or by delegating to an indexer purpose-built for the specific query pattern) is usually the more practical, scalable approach than fetching everything and filtering client-side.

## Further reading

- [viem documentation: getLogs](https://viem.sh/docs/actions/public/getLogs)
- [Ethereum JSON-RPC: eth_getLogs](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs)

---

[← Previous: Transaction Receipts](./receipts.md)
·
[Back to Building Web3 Applications](./README.md)
·
[Next: viem →](./viem.md)
