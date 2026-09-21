# Federations

This chapter generalizes the federation trust model introduced concretely in [Liquid Network](./liquid.md), since it's a recurring pattern across Bitcoin's scaling and sidechain ecosystem, not something specific to any single project.

## The general pattern

A federation is a fixed, known set of parties who collectively control some function (most commonly, authorizing fund movements) typically through a multisig or threshold-signature scheme requiring a defined quorum (M of N members) to act. This is structurally the same idea as the [multisig](../wallets/multisig.md) wallets covered in the Wallets section, applied at a larger, more institutional scale: instead of an individual holding 2-of-3 keys personally, a federation's members are separate, typically publicly identified organizations, each independently securing and controlling their own key.

## Why federations exist as a design choice

Federations occupy a deliberate middle ground between two extremes: a single, fully centralized custodian (fast and simple, but a single point of failure and trust) and Bitcoin's own fully permissionless, proof-of-work-secured consensus (maximally decentralized and trust-minimized, but slow and resource-intensive to bootstrap for a new system). A federation of, say, 15 known, reputable institutions requiring 11 to agree offers meaningfully more resilience than any single custodian (no single member's compromise or dishonesty alone can steal funds), while being far faster to establish and operate than building and securing an entirely new, permissionless proof-of-work network from scratch, a genuine, if intermediate, tradeoff rather than a strictly worse alternative to full decentralization.

## What a federation's security actually depends on

A federation's practical security rests on several distinct, independently important properties: the **honesty** of enough individual members (no collusion among a quorum), the **operational security** of each member's key management (a federation is only as strong as its most poorly secured individual member's key custody), and the **diversity and independence** of the members themselves, a federation of institutions all subject to the same jurisdiction, the same regulatory pressure, or with undisclosed common ownership provides meaningfully weaker security guarantees than one composed of genuinely independent, diversely located, and diversely regulated members, even if the nominal M-of-N threshold looks identical on paper.

## Where else this pattern appears

Beyond Bitcoin sidechains like Liquid, federated trust models appear throughout the broader blockchain ecosystem covered later in this book: many cross-chain [bridges](../layer-2/bridges.md) use federated or multisig-based validation for authorizing asset transfers between chains, and some early blockchain oracle designs (see [Oracles](../defi/oracles.md)) rely on a federated set of data providers rather than a fully trust-minimized mechanism. Recognizing the pattern in one context (Liquid's functionaries) makes it easier to correctly evaluate the same underlying trust tradeoff when it recurs elsewhere under a different name.

## Common misconceptions

**A federation is not inherently untrustworthy or a lesser design**, for specific use cases where full permissionless decentralization's costs (speed, resource requirements) outweigh its benefits relative to the actual threat model, a well-designed federation with genuinely diverse, accountable members can be a reasonable, honest engineering tradeoff, not a corner-cutting compromise.

**"Federated" does not specify a particular threshold or member count on its own**, the actual security properties of any specific federation depend entirely on its specific M-of-N parameters and member composition, which vary considerably across different real systems and should be evaluated individually rather than assumed from the label alone.

## Further reading

- See also: [Liquid Network](./liquid.md), [Multisig](../wallets/multisig.md), [Bridges](../layer-2/bridges.md)

---

[← Previous: Liquid Network](./liquid.md)
·
[Back to Bitcoin Scaling](./README.md)
·
[Next: Statechains →](./statechains.md)
