# Byzantine Faults

A Byzantine fault is a failure mode where a component of a system doesn't just stop working. It keeps working, but behaves arbitrarily, inconsistently, or maliciously, potentially sending different, contradictory information to different observers. This chapter defines the term precisely and distinguishes it from simpler failure models, because the distinction is the entire reason blockchain consensus needed a different design than earlier distributed database technology.

## The problem: not all failures look the same

Distributed systems engineering distinguishes between several failure models, roughly ordered from easiest to hardest to tolerate:

- **Fail-stop**: a component stops entirely and this is detectable by others (e.g., a network heartbeat check confirms it's down). The easiest failure model to design around.
- **Crash fault**: a component stops entirely, but this may not be immediately or reliably detectable. It might just be slow, or the network to it might be down, rather than the component itself having failed. Still, the assumption is that while a component is running, it behaves correctly according to the protocol.
- **Byzantine fault**: a component continues operating but behaves in an arbitrary, inconsistent, or actively adversarial way, sending different values to different peers, following the protocol correctly with some messages and incorrectly with others, or coordinating with other faulty components to disrupt the honest majority's ability to agree. This is the hardest failure model to design a protocol around, because a Byzantine-faulty node's behavior is, by definition, unconstrained by the protocol's own rules.

## Where the name comes from

The term comes from the 1982 paper "The Byzantine Generals Problem" by Leslie Lamport, Robert Shostak, and Marshall Pease, which frames the problem as a group of Byzantine army generals, each commanding a portion of a besieging force, who must agree unanimously on a battle plan (attack or retreat) by exchanging messengers, while knowing that some of the generals might be traitors, actively sending different, contradictory orders to different loyal generals specifically to sabotage agreement. The full mechanics of this framing, and the paper's central impossibility and possibility results, are covered in the next chapter, [Byzantine Generals Problem](./byzantine-generals.md); this chapter focuses on the general fault-tolerance concept the paper introduced and named.

## Why Byzantine fault tolerance is harder than crash fault tolerance

With crash faults, a working component's information can always be trusted at face value. The only question is whether a given component is currently reachable and responsive. Protocols can be built around timeouts and redundancy: if you don't hear from a component, assume it has failed and work around it.

With Byzantine faults, you cannot trust *any* single component's claims at face value, even a component that appears to be responding normally, because a Byzantine-faulty component can lie convincingly, including lying differently to different observers simultaneously. This means Byzantine fault tolerant protocols generally require participants to cross-check information with multiple other participants and require a **supermajority** (not just any majority) of honest participants to guarantee correct agreement, classical results (developed in the original Byzantine Generals paper) show that with `n` total participants, Byzantine agreement is achievable only if fewer than `n/3` of them are Byzantine-faulty, a stronger requirement than the "more than half must be honest" threshold that's often sufficient for simpler fault models.

## Bitcoin's specific answer

Bitcoin's mining-based consensus (see [Consensus](./consensus.md)) sidesteps the classical Byzantine fault tolerance framework's exact machinery (which assumes a known, fixed set of participants) but addresses the same underlying threat (participants who might lie, send conflicting information, or actively try to disrupt agreement) through a different mechanism: making it economically costly to have disproportionate influence over the agreed-upon history, via proof-of-work. Rather than requiring `n/3` of a known participant set to be honest, Bitcoin's security assumption is usually summarized as requiring that **more than half of the network's total hash power** is controlled by participants following the protocol honestly (see [51% Attacks](../bitcoin/51-percent-attacks.md) for what happens when this assumption is violated, and note this is a different, though related, threshold than classical BFT's one-third bound, reflecting the different underlying mechanism).

## Example: what Byzantine behavior looks like concretely in Bitcoin's context

A Byzantine-faulty node or miner in Bitcoin's network might: broadcast two conflicting transactions spending the same coins to different parts of the network simultaneously (attempting a double-spend), withhold a validly mined block from the network temporarily to gain a mining advantage (a **selfish mining** strategy, discussed further in [Mining Pools](../bitcoin/mining-pools.md)), or relay invalid blocks or transactions hoping some peers fail to validate them correctly. Bitcoin's protocol is designed so that honest nodes, independently validating every rule for themselves (see [Replication](./replication.md)), simply reject anything that violates consensus rules regardless of who sent it or how convincingly. The defense against Byzantine behavior is not detecting and excluding liars through reputation, but making lies simply fail validation wherever they're checked.

## Tradeoffs

Designing for Byzantine fault tolerance, rather than the simpler crash-fault model, means accepting a real, structural cost: more redundant checking, more conservative agreement thresholds, and in Bitcoin's specific case, an entire proof-of-work mechanism whose only purpose is to make it costly to gain disproportionate influence over consensus (see [Proof of Work](../bitcoin/proof-of-work.md)). Systems that don't need to tolerate active adversaries (an internal company database replicated across servers the company fully controls) can use much simpler and more efficient crash-fault-tolerant protocols instead, since they don't need to defend against a component actively trying to sabotage the others.

## Common misconceptions

**A Byzantine fault does not require malicious intent from a human operator.** A software bug that causes a node to send inconsistent or incorrect data to different peers is, from the protocol's perspective, indistinguishable from a deliberately malicious node, the term describes the *behavior pattern*, not the cause behind it.

**Byzantine fault tolerance is not a Bitcoin-specific or even blockchain-specific concept.** It is a general distributed-systems fault model, studied since the early 1980s, with applications in aerospace systems, distributed databases, and any system that needs to remain correct despite some components behaving arbitrarily.

## Further reading

- [The Byzantine Generals Problem](https://lamport.azurewebsites.net/pubs/byz.pdf): Lamport, Shostak, Pease, 1982
- [Practical Byzantine Fault Tolerance](http://pmg.csail.mit.edu/papers/osdi99.pdf): Castro & Liskov, 1999

---

[← Previous: Consensus](./consensus.md)
·
[Back to Distributed Systems](./README.md)
·
[Next: Byzantine Generals Problem →](./byzantine-generals.md)
