# Consensus

Consensus is the general problem of getting multiple independent parties to agree on a single value or sequence of events, even when some parties might fail, disconnect, or actively try to disrupt agreement. Every distributed database, every multi-node system that needs a consistent view of the world, and every blockchain has to solve some version of this problem. This chapter covers consensus as a general distributed-systems concept, sets up the specific failure model (Byzantine faults) covered in the next two chapters, and previews how Bitcoin's specific solution differs from classical approaches.

## The problem, stated precisely

Imagine several computers, connected over an unreliable network, each independently receiving a stream of proposed transactions from different sources, sometimes in different orders and with different delays. For a currency system to work, every participant eventually needs to agree on one single, canonical order of transactions. Otherwise, there is no way to agree on who owns what. A **consensus protocol** is the mechanism that gets independent, possibly-faulty, possibly-adversarial parties to converge on the same answer.

Classical distributed systems theory, developed largely from the 1970s through the 1990s for systems like distributed databases and coordinated backup systems, generally assumed a **known, fixed set of participants** (a specific list of servers a company or organization controls) and focused on tolerating honest failures: a server crashing, a network link going down, messages arriving late or out of order. This is a meaningfully different, and easier, problem than the one Bitcoin faces.

## Two dimensions of difficulty

### Fault type: crash faults versus Byzantine faults

A **crash fault** is a participant simply stopping (going offline, becoming unreachable, or failing silently) without sending any incorrect information while it's still functioning. A **Byzantine fault** (covered in full in [Byzantine Faults](./byzantine-faults.md)) is far more dangerous: a participant that actively sends different, contradictory, or deliberately false information to different parts of the network, potentially in a coordinated way designed to prevent honest agreement. Byzantine fault tolerance is strictly harder to achieve than crash fault tolerance, and requires fundamentally different protocol designs, most classical, pre-blockchain consensus algorithms (like Paxos, developed by Leslie Lamport starting in the late 1980s, and Raft, a later, more understandable alternative) tolerate only crash faults, not Byzantine ones.

### Membership: permissioned versus permissionless

Classical consensus protocols generally assume a **fixed, known set of participants** (the protocol has to tolerate some of them failing, but it knows in advance exactly who is participating and how many there are, which lets it reason precisely about, for example, "a majority of the known 5 servers agree." Bitcoin's problem is harder still: it needs consensus among a **permissionless** set of participants) anyone can join or leave the network of miners and nodes at any time, with no registration, vetting, or fixed count. This rules out classical Byzantine fault tolerant protocols like PBFT (Practical Byzantine Fault Tolerance, developed by Miguel Castro and Barbara Liskov in 1999), which require knowing the exact number of participants in advance to calculate the fraction needed for agreement (typically more than two-thirds honest, in PBFT's specific formulation).

## How Bitcoin's consensus actually works

Bitcoin sidesteps the "who gets to vote" problem inherent to permissionless membership by not counting votes by identity at all. Instead, influence over which chain is accepted is proportional to **computational work actually performed** (proof-of-work, see [Proof of Work](../bitcoin/proof-of-work.md)), which cannot be cheaply manufactured by creating fake identities. This is Bitcoin's specific defense against the [Sybil attack](./sybil-attacks.md) problem that permissionless membership otherwise creates. Every node then applies a simple, deterministic rule to resolve disagreements: accept the chain with the greatest cumulative proof-of-work (commonly summarized as the "longest chain rule," though the precise rule is about total accumulated work, not simply block count, see [Fork Choice](../blockchain/fork-choice.md)).

This is a genuinely different kind of consensus than classical Byzantine fault tolerant protocols provide, and the difference matters: Bitcoin's consensus does not produce instant, final agreement the moment a block is created. It produces **probabilistic agreement that strengthens over time** as more blocks are built on top, a block with many confirmations behind it is vastly less likely to ever be reverted than a block that was just mined, but even a well-confirmed block is not, strictly speaking, mathematically guaranteed final the way a classical BFT protocol's committed decision is. This distinction (deterministic finality versus probabilistic finality) is significant enough to warrant its own chapter: see [Probabilistic Finality](./probabilistic-finality.md).

## Comparing the two families directly

| | Classical BFT (e.g. PBFT) | Bitcoin's Nakamoto Consensus |
| --- | --- | --- |
| Membership | Fixed, known set of participants | Permissionless, anyone can join |
| Sybil resistance | Not needed (membership is controlled) | Proof-of-work (costly to fake identity influence) |
| Finality | Deterministic (once committed, final | Probabilistic) confidence grows with confirmations |
| Typical fault tolerance | Up to ~1/3 of participants Byzantine | Up to ~50% of hash power (assuming rational, not just honest, majority) |
| Communication pattern | Multiple rounds of direct messaging among all known participants | Broadcast and propagation among an unknown, changing set of peers |

This comparison sets up [Byzantine Faults](./byzantine-faults.md) and [Byzantine Generals Problem](./byzantine-generals.md) next, which cover the specific adversarial model both families of protocol are trying to survive, and then [Probabilistic Finality](./probabilistic-finality.md), which covers exactly what "confidence grows with confirmations" means numerically.

## Common misconceptions

**"Consensus" in the Bitcoin sense does not mean every participant votes on every transaction.** No node casts an explicit vote; nodes independently validate against fixed rules and extend whichever valid chain has the most accumulated work, agreement emerges from many independent, self-interested actors following the same deterministic rule, not from an explicit voting process.

**Nakamoto consensus is not simply "PBFT but with mining added."** They are different families of protocol with different membership models, different fault-tolerance guarantees, and different finality properties, Bitcoin's design predates any attempt to adapt classical BFT protocols to permissionless settings, and solves a genuinely different version of the problem.

## Further reading

- [Bitcoin whitepaper](https://bitcoin.org/bitcoin.pdf): Sections 4 and 5
- [Practical Byzantine Fault Tolerance](http://pmg.csail.mit.edu/papers/osdi99.pdf): Castro & Liskov, 1999
- [The Part-Time Parliament](https://lamport.azurewebsites.net/pubs/lamport-paxos.pdf): Leslie Lamport, 1998 (the original Paxos paper)

---

[← Previous: Replication](./replication.md)
·
[Back to Distributed Systems](./README.md)
·
[Next: Byzantine Faults →](./byzantine-faults.md)
