# CAP Theorem

The CAP theorem is a foundational result in distributed systems theory stating that a distributed data system cannot simultaneously guarantee all three of Consistency, Availability, and Partition tolerance. It can provide at most two out of three at any given moment a network partition is actually occurring. This chapter covers the theorem precisely, then applies it directly to Bitcoin, which makes a specific, identifiable choice among the tradeoffs the theorem describes.

## The three properties, defined precisely

- **Consistency**: every read receives the most recent write, or an error, all nodes see the same data at the same time. (Note: this is a different, stricter meaning of "consistency" than the C in the unrelated database acronym ACID; CAP's consistency specifically means all nodes agree on the current state.)
- **Availability**: every request to a non-failing node receives a response, the system doesn't refuse to answer, even if that answer might not reflect the most recent write.
- **Partition tolerance**: the system continues to operate despite an arbitrary number of messages being dropped or delayed between nodes, a **network partition**, where the network splits into groups that can't communicate with each other for some period.

## The theorem's actual claim

Computer scientist Eric Brewer first proposed the CAP conjecture in a 2000 talk, and Seth Gilbert and Nancy Lynch formally proved it in 2002. The precise claim: **in the presence of a network partition, a distributed system must choose between consistency and availability**. It cannot provide both simultaneously during the partition. If a system chooses consistency during a partition, some nodes must refuse to respond (or must respond with an error) rather than risk returning stale or conflicting data. If a system chooses availability during a partition, it must allow every node to keep responding, which means different, disconnected parts of the network can end up with different, inconsistent views of the data until the partition heals.

A common misreading of the theorem treats it as "pick any two of the three, always", but partition tolerance isn't really optional for any real-world distributed system spanning more than one physical location, since network partitions (a cut cable, a router failure, a regional outage) are a fact of operating over real networks, not a hypothetical you can architect away. The theorem is more accurately understood as: **given that partitions will happen, you must choose, for the duration of the partition, between consistency and availability**. It describes a genuine, unavoidable tradeoff under a specific real-world condition, not a menu of equally viable permanent configurations.

## Where Bitcoin sits

Bitcoin makes a clear, identifiable choice: it is an **AP system** during a partition, available, not strictly consistent. When the Bitcoin network experiences a partition (which happens routinely at a small scale simply due to normal propagation delay across a global network, and could in principle happen more severely during a major internet disruption), nodes on each side of the partition keep operating, keep accepting and relaying transactions, and keep mining and extending their own view of the chain. The system does not halt and refuse to process anything just because it can't currently reach every other node. This is exactly what produces [Chain Reorganizations](../blockchain/reorgs.md): two disconnected (or even just slow-to-communicate) parts of the network can temporarily build different, individually valid chains, and once the partition heals, the network converges by discarding the shorter (less cumulative work) chain in favor of the longer one, per the [fork choice rule](../blockchain/fork-choice.md).

This is precisely why Bitcoin does not offer classical, instant consistency, at any given moment, different nodes might have slightly different views of the most recent blocks, and what counts as "the truth" is only established with increasing confidence as more confirmations accumulate (see [Probabilistic Finality](./probabilistic-finality.md)). Bitcoin trades strict, always-consistent agreement for a system that keeps functioning and accepting transactions even when parts of the network temporarily can't fully communicate, a deliberate, documented design choice, not an oversight.

## Example: how this plays out mechanically

```text
Before partition:  All nodes agree chain tip is Block 100.

Partition occurs — network splits into Group A and Group B, unable to communicate.

Group A mines Block 101a, then 102a.  ──►  Group A believes tip = 102a
Group B mines Block 101b.             ──►  Group B believes tip = 101b

Both groups remain AVAILABLE throughout — every node keeps accepting
transactions and extending its own view. Neither group halts.
The network is temporarily INCONSISTENT: A and B disagree about the tip.

Partition heals — Group B receives Group A's chain, sees it has more
cumulative proof-of-work (two blocks vs one), and adopts it, discarding
Block 101b (which becomes an orphaned/stale block — see Chain Reorganizations).

Consistency is restored, retroactively, once the partition ends.
```

## Tradeoffs

Choosing availability over strict consistency means Bitcoin can never offer the kind of instant, unconditional finality a strictly consistent system (like a traditional single-master database, or a classical Byzantine fault tolerant protocol operating among a small, always-connected set of nodes) can offer under normal conditions. This is directly why waiting for [confirmations](../bitcoin/confirmation.md) is standard practice rather than treating a single block as immediately, permanently final. In exchange, Bitcoin gains a system that continues to function through network conditions (partitions, delays, node churn) that would cause a strictly consistent system to either halt or reject requests until the partition resolves, a meaningful advantage for a global, permissionless, always-on payment network with no central operator who could coordinate a graceful pause during a partition.

## Common misconceptions

**CAP theorem tradeoffs are not a permanent, fixed architectural choice a system makes once.** They describe what happens specifically *during* an active partition. A system can, and does, behave with full consistency and availability simultaneously during normal operation when no partition is occurring; the tradeoff only bites when a partition actually happens.

**Choosing availability over consistency does not mean Bitcoin has no consistency guarantees at all.** It means consistency is eventual and probabilistic rather than instant and absolute. The system does converge to a single agreed history, just not necessarily the instant a block is created, and with the specific probabilistic guarantees covered in [Probabilistic Finality](./probabilistic-finality.md).

## Further reading

- [Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services](https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer2.pdf): Gilbert & Lynch, 2002 (the formal proof)

---

[← Previous: Sybil Attacks](./sybil-attacks.md)
·
[Back to Distributed Systems](./README.md)
·
[Next: Finality →](./finality.md)
