# Hard Forks

A hard fork is a protocol rule change that **loosens or otherwise changes** consensus rules in a way that's incompatible with old software, blocks valid under the new rules can be rejected by non-upgraded nodes, and vice versa. This chapter covers why that incompatibility, unlike a soft fork's, makes coordination genuinely mandatory rather than merely preferable.

## The defining property

Unlike a [soft fork](./soft-forks.md), a hard fork's new rules are **not** a strict subset of the old ones, something becomes valid under the new rules that the old rules would have rejected (a larger block size limit is the canonical example: a block that exceeds the old limit is invalid to an old node, no matter how valid it is under new, looser rules). This means **every node must upgrade to continue following the same chain**, a non-upgraded node, encountering a block that violates rules it still enforces, will reject it and continue building on the old rule set instead, while upgraded nodes accept it and build forward under the new rules.

```text
Old rules accept: { A, B, C }
New rules accept: { A, B, C, D, E }   (a larger, different set — not a subset relationship)

A block like D is valid under new rules but INVALID under old rules.
Non-upgraded nodes reject it; upgraded nodes accept it.
If both upgraded and non-upgraded nodes keep mining after this point,
the chain splits into two permanently separate, incompatible chains.
```

## Why this makes a permanent split a real risk, not just a possibility

If even a meaningful minority of miners, node operators, or economically significant users (exchanges, merchants) don't upgrade by the time a hard fork activates, the network can genuinely, permanently split into two separate chains, each with its own subsequent history, each considered "the real chain" by whichever set of participants follows its rules. This is exactly what happened with [Bitcoin Cash](./bitcoin-cash.md) in 2017. This is a structurally different risk than a soft fork carries, where non-upgraded nodes remain on the same single chain throughout, simply without independently verifying every new rule.

## Coordinating a hard fork

Because of this split risk, a hard fork generally requires demonstrating, in advance, that an overwhelming share of the relevant ecosystem (node operators, miners, major exchanges and services, and the broader user base) genuinely supports and will adopt the change by a specific, coordinated activation point, often via a hardcoded block height or timestamp rather than the more flexible signaling mechanisms soft forks can use (see [Miner Signaling](./miner-signaling.md)). Even with this coordination, achieving true, complete, ecosystem-wide unanimity is difficult in a large, decentralized, permissionless network with no central authority who can compel participation, which is precisely why contentious hard forks (as opposed to broadly, near-unanimously supported ones) have historically produced actual, lasting chain splits rather than the clean, single-chain transitions their proponents typically hope for.

## Not every hard fork is contentious

It's worth being precise here, since "hard fork" sometimes gets used as if it always implies controversy: a rule change that's technically incompatible with old software can still achieve near-universal, rapid adoption if the ecosystem broadly agrees it's necessary, producing no lasting second chain at all, the word describes the *technical compatibility mechanism*, not a prediction about how contentious or smooth a given change will actually be. Bitcoin's most famous emergency fix, the August 2010 "value overflow incident" (a bug, CVE-2010-5139, that let a single transaction create over 184 billion BTC from nothing due to an integer overflow in validation code), was resolved within hours via a rule change rejecting the flawed transaction type, technically a soft fork, since it *tightened* validation rather than loosening it, but a useful reminder that emergency, near-unanimous protocol fixes are a real category distinct from the contentious, deliberately-designed changes this section's case studies focus on.

## Tradeoffs

A hard fork can implement changes a soft fork's subset constraint makes impossible or highly awkward to achieve, genuine design freedom, unconstrained by needing old nodes to remain (partially) compatible. The cost is the coordination burden and genuine, structural risk of a permanent, unintended split if that coordination isn't achieved with something close to full ecosystem consensus. A risk soft forks are specifically designed to avoid, discussed in [Soft Forks](./soft-forks.md#why-soft-forks-are-generally-preferred-when-possible).

## Common misconceptions

**A hard fork does not automatically create a new cryptocurrency.** Only a hard fork that a meaningful, sustained set of participants actually continues mining and using on the *old* rule set (while another set adopts the new rules) produces two lasting, separate chains, an uncontentious hard fork with universal adoption simply continues as one chain under the new rules, with no second chain persisting.

**"Hard fork" and "contentious fork" are not synonyms**, even though the historically most famous hard forks (Bitcoin Cash, Ethereum's DAO fork) were contentious, the technical mechanism and the social/political reception are separate, independently variable properties of any given change.

## Further reading

- See also: [What Is a Fork?](./README.md), [Bitcoin Cash](./bitcoin-cash.md), [The Block Size Debate](./block-size-war.md)

---

[← Previous: Soft Forks](./soft-forks.md)
·
[Back to Forks and Protocol Upgrades](./README.md)
·
[Next: Backward Compatibility →](./backward-compatibility.md)
