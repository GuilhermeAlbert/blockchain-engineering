# Caching

Blockchain reads vary from immutable to immediately stale. A transaction by hash is stable once finalized. An account balance at `latest` can change with the next block. Cache design starts by naming the block context and mutability of the result.

## Cache keys need chain context

Include chain ID, method or query version, normalized parameters, and block identity. For historical data, prefer block hash. Two networks can share an address and block number while containing unrelated state. A proxy contract can keep one address while its behavior changes after an upgrade, so decoded or simulated results may need implementation or block context.

Never turn `latest` into an unqualified long-lived key. Resolve it to a block number and hash, cache the response under that identity, and let callers choose how long they accept that head.

## Finality classes

Near-head data needs short lifetimes and reorg invalidation. Safe or finalized data can live longer. Protocol metadata changes rarely but may still change through upgrades. Static assets and ABI files can use content hashes.

Negative caching deserves care. A missing transaction or empty code result may mean the local provider is behind. Cache absence briefly and attach the observed block.

## Invalidation and stampedes

When a new head arrives, invalidate only keys whose meaning depends on head state. Historical keys by hash remain valid even if that block becomes noncanonical, but callers asking for canonical history should no longer receive them. Maintain canonical number-to-hash mappings separately.

Popular expiry can cause many workers to request the same expensive value simultaneously. Use request coalescing, bounded stale-while-revalidate for noncritical views, and randomized expiry. Do not serve stale authorization, solvency, or transaction-submission data merely to preserve latency.

## Layers and observability

Browser, CDN, application, provider, and node may all cache. A response header or log should expose block identity and cache age so stale results can be traced. Measure hit rate alongside stale-read incidents and origin load; a high hit rate is not success if it hides chain progress.

## Further reading

- [Ethereum JSON-RPC](https://ethereum.org/developers/docs/apis/json-rpc/)
- See also: [RPC](./rpc.md), [Reorg Handling](./reorg-handling.md)

---

[← Previous: Webhooks](./webhooks.md)
·
[Back to Infrastructure](./README.md)
·
[Next: Reliability →](./reliability.md)
