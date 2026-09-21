# Bridges

A bridge moves value or information between two separate blockchains, which, having no shared consensus, have no native way to talk to each other at all. This chapter covers the general trust spectrum every bridge design falls somewhere on, before the next two chapters cover the two specific categories this book distinguishes: a rollup's own canonical bridge, and general-purpose cross-chain messaging protocols.

## Why bridging is fundamentally hard

Two independent blockchains are, by design, separate systems: separate validator sets, separate consensus rules, and no built-in mechanism for one chain to verify what happened on the other. Moving an asset "from" chain A "to" chain B doesn't literally move anything; chain A's asset stays on chain A. What actually happens is that some asset gets locked or burned on chain A, and a corresponding claim (very often a wrapped, IOU-style representation, see [Wrapped Assets](../tokens/wrapped-assets.md)) gets minted or released on chain B, based on *someone* or *something* verifying that the lock or burn on chain A genuinely happened. Every bridge design is, at its core, a specific answer to the question of who or what performs that verification, and how much trust that verifier requires.

## The trust spectrum: from trusted to trust-minimized

- **Trusted (federated or multisig) bridges**: a fixed, permissioned set of parties observes chain A and signs off on the corresponding action on chain B. This is the simplest design to build, and the most common in practice, but it concentrates trust in that specific group of signers, structurally the same custodial trust question already raised for [WBTC](../tokens/wrapped-assets.md#wbtc-bitcoin-wrapped-for-ethereum): the bridge is only as reliable and honest as its signers.
- **Light-client (trust-minimized) bridges**: chain B runs an actual light client (see [Light Clients](../bitcoin/light-clients.md) for the general concept) verifying chain A's consensus proofs directly, requiring no separate trusted party at all beyond chain A's own validator set. This is meaningfully more trust-minimized, but substantially harder to build and typically more expensive to operate, since it requires implementing and continuously running one chain's consensus-verification logic inside another chain's execution environment.
- **Optimistic bridges**: a claim about chain A's state is accepted after a challenge period, during which anyone can dispute it with a fraud proof, the same general pattern already covered for [Optimistic Rollups](./optimistic-rollups.md), applied to general cross-chain messages rather than specifically to a rollup's own L1 settlement.

Most bridges in production today sit closer to the trusted end of this spectrum than the trust-minimized end, since light-client verification is genuinely difficult to implement correctly and efficiently between two arbitrary, independently designed chains.

## Why bridges are a concentrated, high-value attack target

A bridge, by its nature, holds or controls a large pool of locked assets on one side, backing whatever's been minted on the other side. This makes bridges an unusually concentrated target: compromising a bridge's verification mechanism, whether by stealing signer keys from a federated bridge or exploiting a flaw in a light client's verification logic, can potentially unlock the entire pool of locked assets at once, rather than compromising one user's funds at a time. This is exactly why bridge exploits, covered in detail in [Bridge Exploits](../security/bridge-exploits.md), account for some of the largest individual losses in the industry's history, and why the specific trust model a bridge uses deserves real scrutiny before relying on it for meaningful value.

## Common misconceptions

**A bridged, wrapped asset is not the same asset that exists on the original chain.** It's a separate, derivative claim whose value depends entirely on the bridge's own solvency and correctness; holding a bridged token means trusting that specific bridge's verification mechanism, not holding a fungible, interchangeable unit of the original asset.

**"Bridge" does not imply one uniform trust model.** The gap between a fully trusted multisig bridge and a genuinely trust-minimized light-client bridge is enormous, and treating "it's a bridge" as sufficient due diligence, without checking which specific design a given bridge actually uses, is a real, common source of underestimated risk.

## Further reading

- See also: [Canonical Bridges](./canonical-bridges.md), [Cross-Chain Messaging](./cross-chain-messaging.md), [Bridge Exploits](../security/bridge-exploits.md)

---

[← Previous: EIP-4844](./eip-4844.md)
·
[Back to Layer 2](./README.md)
·
[Next: Canonical Bridges →](./canonical-bridges.md)
