# Sequencers

The sequencer is the component of a rollup that decides which transactions get included and in what order, before anything gets executed or published to L1. This chapter covers what a sequencer actually does, and a specific, current fact worth stating plainly rather than glossing over: as of 2026, every major rollup's sequencer is operated by a single, centralized entity.

## What a sequencer actually does

When a user submits a transaction to a rollup, it goes to the sequencer first, not directly to L1. The sequencer collects pending transactions, orders them (the exact ordering rule, whether strict first-come-first-served or something more complex, is the sequencer's own policy), executes them against the rollup's current state, and gives the user a fast, provisional confirmation, well before that batch is actually published to and settled on L1. This is the entire source of a rollup's fast, cheap user experience: the sequencer's provisional confirmation arrives in roughly the time a centralized service would take, not the time L1 itself would take, with the L1 publication and verification (fraud proof or validity proof) happening afterward, asynchronously, to make that provisional state actually final.

## Why sequencer centralization is a genuine, current tradeoff

A single, centralized sequencer operator, which is how essentially every major rollup (Arbitrum, Optimism's OP Mainnet, Base, zkSync Era, and others) currently operates, has two specific powers worth naming directly: it can reorder transactions before they're included (a form of MEV extraction, see [MEV](../security/mev.md)), and it can, in principle, censor a specific transaction by simply refusing to include it. Most major rollups mitigate the censorship risk specifically with a **forced inclusion** mechanism: a slower, more expensive path that lets a user submit a transaction directly to the rollup's L1 contract, bypassing the sequencer entirely, guaranteeing eventual inclusion even if the sequencer refuses to cooperate. This doesn't eliminate the sequencer's ordinary-case power over transaction ordering, but it does bound how much a censoring sequencer can actually prevent.

## The path toward decentralized sequencing

Multiple rollup ecosystems have active, public roadmaps toward removing this single-operator dependency, generally through **shared sequencer** designs: a separate, decentralized network of nodes (Espresso Systems and Astria are among the most developed projects in this space) that multiple different rollups could all use for transaction ordering, rather than each rollup running its own single, centralized sequencer. As of 2026, none of the major rollups have shipped fully decentralized sequencing in production; realistic timelines across the ecosystem generally point toward late 2026 or 2027 for the first production deployments, a genuine, currently-unresolved gap between the rollup security model's theoretical decentralization and its actual, current operational reality.

## Common misconceptions

**A rollup's sequencer being centralized does not mean the rollup's *funds* are centrally controlled.** The sequencer controls transaction ordering and provisional execution, not custody of user funds, which remain secured by the rollup's smart contracts on L1 and its verification mechanism (fraud proofs or validity proofs); a malicious sequencer can reorder or delay transactions, but forcing an invalid state transition still requires defeating that verification mechanism, not just controlling the sequencer.

**Forced inclusion is not equivalent to sequencer decentralization.** It provides a guaranteed, if slow and expensive, fallback against a censoring sequencer; it doesn't distribute the sequencer's ordinary-case transaction-ordering power across multiple parties the way an actually decentralized sequencer network would.

## Further reading

- [Arbitrum documentation: sequencer](https://docs.arbitrum.io/how-arbitrum-works/sequencer)
- [Optimism documentation](https://docs.optimism.io/)
- See also: [L1 vs. L2](./l1-vs-l2.md), [MEV](../security/mev.md)

---

[← Previous: Validity Proofs](./validity-proofs.md)
·
[Back to Layer 2](./README.md)
·
[Next: Data Availability →](./data-availability.md)
