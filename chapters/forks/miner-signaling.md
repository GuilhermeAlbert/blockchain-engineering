# Miner Signaling

Miner signaling lets miners indicate support for a proposed soft fork by embedding a specific value in the blocks they mine, giving the network a way to measure real, demonstrated readiness before a rule change activates. This chapter covers BIP 9, the standardized mechanism Bitcoin has used for most of its soft fork activations, and what happens when signaling doesn't reach its threshold.

## How BIP 9 signaling works

[BIP 9](https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki) repurposes the block header's version field (see [Block Headers](../blockchain/block-headers.md)) as a bit-field: each proposed soft fork is assigned one of 29 available bits, and a miner supporting that specific proposal sets the corresponding bit in the blocks they mine (alongside setting a specific high-order pattern in the version field to signal "these bits are BIP 9 signals," distinguishing this usage from the version field's other historical purposes). This lets multiple, independent proposals signal simultaneously without interfering with each other, since each gets its own dedicated bit.

## The activation process

BIP 9 defines a state machine each soft fork proposal moves through, checked once per **difficulty adjustment period** (2016 blocks, see [Difficulty Adjustment](../bitcoin/difficulty-adjustment.md)):

- **DEFINED** — the proposal exists but its signaling window hasn't started yet.
- **STARTED** — the signaling window is open; miners can begin setting the bit.
- **LOCKED_IN** — reached once at least 95% of blocks in a single 2016-block period signal support (this threshold is a Bitcoin Core convention within the BIP 9 framework, not a universal requirement of the mechanism itself). Once locked in, activation is now guaranteed after one more retargeting period, regardless of signaling in that final period.
- **ACTIVE** — the new rules are now enforced.
- **FAILED** — if the signaling window's timeout is reached without hitting the LOCKED_IN threshold, the proposal fails and would need to be reintroduced (potentially with a different bit or parameters) to be tried again.

```text
DEFINED → STARTED → (95% signal in one period?) → LOCKED_IN → ACTIVE
                          │
                          └─ (timeout reached first?) → FAILED
```

## Why 95%, and what happens below it

The high threshold is deliberately conservative: it's meant to ensure that by the time a soft fork activates, the overwhelming majority of hash power (and, by strong practical implication, the mining infrastructure and pools operating on the network) is already prepared to enforce it, minimizing the risk of the new rules being violated by unprepared miners immediately after activation. This conservatism has a real cost, demonstrated directly by SegWit's own activation history (see [The Block Size Debate](./block-size-war.md)): a proposal with strong majority but sub-95% miner support can stall indefinitely under pure BIP 9 signaling, which is exactly the situation that led to [User-Activated Soft Forks](./uasf.md) as an alternative path when miner signaling alone wasn't producing activation despite apparent broader ecosystem support.

## Speedy Trial: a later refinement

Taproot's activation (2021) used a modified approach informally called "Speedy Trial" — a shorter signaling window than typical BIP 9 deployments, reflecting lessons learned from SegWit's prolonged signaling stall: rather than leaving a long timeout that could drag on for years, Speedy Trial used a compressed window specifically to get a faster definitive answer (either LOCKED_IN or FAILED), with the option to pursue alternative activation paths sooner if signaling alone didn't succeed. Taproot's signaling reached the required threshold within this compressed window, activating without needing to resort to a UASF-style alternative path the way SegWit ultimately did.

## Common misconceptions

**Miner signaling measures signaled readiness, not a binding vote or an economic or political mandate.** A miner can signal support and then, in principle, produce a non-compliant block after activation (which would simply be rejected by upgraded nodes) — signaling is a coordination and readiness-measurement tool, not a mechanism that itself enforces anything beyond triggering the activation state machine.

**BIP 9 signaling only applies to soft forks structured to use it** — it's a specific activation mechanism, not a universal requirement for every protocol change; some changes use other mechanisms entirely, including the alternative activation path covered in [User-Activated Soft Forks](./uasf.md).

## Further reading

- [BIP 9: Version bits with timeout and delay](https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki)
- [BIP 8: Version bits with lock-in on timeout](https://github.com/bitcoin/bips/blob/master/bip-0008.mediawiki) — a later refinement addressing some of BIP 9's stalling concerns directly

---

[← Previous: Bitcoin Governance](./governance.md)
·
[Back to Forks and Protocol Upgrades](./README.md)
·
[Next: User-Activated Soft Forks →](./uasf.md)
