# Temporary Chain Forks

"Fork" is one of the most overloaded words in blockchain terminology — it describes at least three genuinely different events: a routine, temporary disagreement about the current chain tip; a rule change that old software still accepts; and a rule change that splits the network into two permanently separate chains. This chapter covers the first, most common, and least consequential kind, setting up [Soft Forks](./soft-forks.md) and [Hard Forks](./hard-forks.md) to cover the other two.

## What a temporary chain fork actually is

This is exactly the scenario already covered mechanically in [Chain Reorganizations](../blockchain/reorgs.md): two miners find valid blocks at nearly the same time, building on the same parent, and different parts of the network briefly see different chain tips until one branch pulls ahead in cumulative work and the network converges. This happens routinely — a direct, expected consequence of propagation delay across a decentralized network (see [Peer-to-Peer Networks](../distributed-systems/p2p.md)), not a rule disagreement, a governance dispute, or anything requiring coordination to resolve. It resolves itself, automatically, via [Fork Choice](../blockchain/fork-choice.md), typically within one or two blocks.

## Why this chapter exists separately

Naming this kind of fork explicitly matters because news coverage and casual conversation sometimes uses "Bitcoin forked" to describe this routine, self-resolving event and, in the same breath, to describe a permanent, contentious network split like [Bitcoin Cash](./bitcoin-cash.md) — two categorically different things that share a name. This book keeps them separate throughout: a temporary chain fork is a normal operational event every proof-of-work blockchain experiences continuously; the forks covered in the rest of this section — soft forks, hard forks, and the specific historical splits — are about **changes to the protocol's own rules**, a different subject entirely.

## Common misconceptions

**A temporary chain fork does not require any human decision, coordination, or announcement.** It's resolved automatically by every node independently applying the same fork-choice rule to whatever data it has received — see [Fork Choice](../blockchain/fork-choice.md).

**Reading about "a fork" in Bitcoin news does not tell you, by itself, which of the several different meanings is intended** — always check whether the article describes a routine, resolving-within-minutes event or a permanent, coordinated rule change before drawing any conclusion about its significance.

## Further reading

- See also: [Chain Reorganizations](../blockchain/reorgs.md), [Fork Choice](../blockchain/fork-choice.md)

---

[Back to Forks and Protocol Upgrades](./README.md)
·
[Next: Soft Forks →](./soft-forks.md)
