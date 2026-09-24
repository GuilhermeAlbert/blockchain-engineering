# Censorship Resistance

Censorship resistance is the ability to submit and settle valid transactions despite actors trying to exclude them. It is a property of a path through wallets, networks, block production, consensus, and application contracts, not a permanent label attached to a chain.

## Protocol inclusion

A decentralized set of block producers makes lasting exclusion harder when users can reach alternative producers and fees create an incentive to include valid transactions. One proposer can omit a transaction. Sustained censorship requires repeated control, coordination, or infrastructure chokepoints.

Consensus can preserve a censored valid history if the majority follows it. Social and economic responses may reject censoring behavior, but they are slow and costly compared with ordinary inclusion.

## Endpoint control

Users often reach a protocol through app stores, DNS, hosted frontends, RPC providers, wallets, banks, and regulated exchanges. Any can block access while the underlying contracts remain callable. Skilled users may switch interfaces or run nodes; ordinary users face higher switching costs.

Stablecoin issuers can freeze tokens through contract authority. Upgrade administrators can block functions. Bridges and rollup sequencers can delay or filter messages within their powers. Analyze each asset and layer instead of transferring the base chain's properties to everything built on it.

## Resistance versus immunity

Increasing producer diversity, peer connectivity, client diversity, permissionless transaction submission, inclusion lists, escape hatches, and self-hosted interfaces can reduce chokepoints. These measures have limits. Network-level blocking, fee spikes, legal pressure, compromised software distribution, and concentrated infrastructure can still restrict access.

State the threat: one provider, one country, a majority of block producers, an asset issuer, or global coordinated action. A system resistant to one may be vulnerable to another.

## Further reading

- [Ethereum censorship resistance](https://ethereum.org/roadmap/pbs/)
- See also: [MEV](../security/mev.md), [Sequencers](../layer2/sequencers.md), [Full Nodes](../bitcoin/full-nodes.md)

---

[← Previous: Financial Surveillance](./financial-surveillance.md)
·
[Back to Regulation and Society](./README.md)
·
[Next: Self-Custody →](./self-custody.md)
