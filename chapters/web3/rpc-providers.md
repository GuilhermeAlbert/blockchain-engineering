# RPC Providers

Every Web3 application needs a way to reach an Ethereum node, and running your own is often impractical for a frontend application or a small team. This chapter covers what an RPC provider actually is, the real tradeoffs of relying on one, and how to reason about picking one, building directly on [JSON-RPC](../ethereum/json-rpc.md).

## What a provider actually offers

An RPC provider (Alchemy, Infura, QuickNode, and public options like the one used throughout this book's verified examples, among many others) runs and maintains Ethereum nodes (execution and consensus clients, kept synced, across potentially many different networks) and exposes [JSON-RPC](../ethereum/json-rpc.md) endpoints for applications to call, without those applications needing to run, sync, and maintain their own node infrastructure. This is a direct, practical trade: real infrastructure and operational burden, outsourced to a specialized third party, in exchange for a recurring cost (free tiers exist, with rate limits; paid tiers scale with usage) and a trust dependency this chapter covers explicitly below.

## The trust tradeoff, stated precisely

This connects directly to [Full Nodes](../bitcoin/full-nodes.md) versus [Light Clients](../bitcoin/light-clients.md)'s trust discussion, applied to Ethereum: an application querying a third-party RPC provider is **trusting that provider to return accurate, honest data**. It has no independent way to verify a `balanceOf` response, an `eth_call` result, or a transaction's inclusion status without redoing the same query against its own independently-run, fully-validating node. A malicious or compromised provider could, in principle, return false data, showing a transaction as confirmed when it isn't, misreporting a balance, or selectively censoring specific addresses' activity. This is a real, documented category of risk, not merely theoretical, and it's exactly why serious infrastructure providers, exchanges, and high-value applications frequently run their own nodes (see [Ethereum Nodes](../ethereum/nodes.md)) rather than relying solely on a third party for consensus-critical queries.

## Practical mitigations

- **Querying multiple independent providers** and cross-checking responses for critical operations, rather than trusting any single provider's answer unconditionally.
- **Verifying responses against cryptographic proofs where possible**: a Merkle proof against a trusted block header (see [State Trie](../ethereum/blocks.md#why-a-state-root-specifically)) can be independently checked without needing to trust the party that supplied it, for applications sophisticated enough to implement this verification layer themselves.
- **Running your own node** for anything where the trust cost outweighs the operational burden, the same tradeoff [Full Nodes](../bitcoin/full-nodes.md#tradeoffs) already covered for Bitcoin applies identically here.

## Choosing a provider in practice

Beyond raw trust considerations, practical factors most real applications weigh include: rate limits and pricing at expected usage volume, which networks and historical data depth are supported (an [archive node](../infrastructure/archive-nodes.md) capable of answering queries about arbitrary past state costs meaningfully more to run than a node serving only recent state), uptime and geographic latency, and (for anything handling meaningful value) whether the provider offers enough redundancy (or whether the application itself should query multiple providers) to avoid a single point of failure taking the application down entirely.

## Common misconceptions

**Using an RPC provider is not the same as trusting that provider with your funds or private keys**, a provider only ever sees the read queries and signed transactions your application sends it; it has no access to private keys unless an application is specifically, separately configured to hand key material to a remote service (a meaningfully different and much riskier setup, covered in [Custodial vs Non-Custodial Wallets](../wallets/custody.md), that most ordinary Web3 applications correctly avoid entirely).

**A "decentralized" RPC provider network does not automatically eliminate the trust question this chapter raises**. It can reduce reliance on any single company, but the underlying question (can the specific node or nodes actually answering a given query be trusted, or independently verified) remains relevant regardless of how many organizationally distinct providers exist behind an aggregation layer.

## Further reading

- [Ethereum JSON-RPC specification](https://ethereum.org/en/developers/docs/apis/json-rpc/)

---

[← Previous: Web3 Application Architecture](./README.md)
·
[Back to Building Web3 Applications](./README.md)
·
[Next: Connecting Wallets →](./wallet-connections.md)
