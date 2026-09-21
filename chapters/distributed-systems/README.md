# Distributed Systems

Blockchain is a distributed systems problem before it is a financial one: a set of independent, sometimes-adversarial computers that need to agree on a single, shared history. This section covers the specific concepts from distributed systems theory needed to understand why Bitcoin's consensus mechanism is designed the way it is, and where it differs from decades of prior distributed database and fault-tolerance research.

## What you need to know first

[Cryptography](../cryptography/README.md). This section assumes familiarity with hash functions and digital signatures, since both are load-bearing components of the consensus mechanisms discussed here.

## Chapters

1. [Peer-to-Peer Networks](./p2p.md): how nodes find each other and propagate data with no central server
2. [Replication](./replication.md): why every full node stores and independently re-verifies the entire blockchain
3. [Consensus](./consensus.md): the general problem, and why Bitcoin's permissionless membership makes it harder than classical approaches
4. [Byzantine Faults](./byzantine-faults.md): the failure model where participants can lie, not just crash
5. [Byzantine Generals Problem](./byzantine-generals.md): the original 1982 formulation, its one-third bound, and how Bitcoin relates to it
6. [Sybil Attacks](./sybil-attacks.md): why proof-of-work is "one-CPU-one-vote," not "one-node-one-vote"
7. [CAP Theorem](./cap.md): the consistency/availability tradeoff, and Bitcoin's specific choice
8. [Finality](./finality.md): deterministic, probabilistic, and economic finality compared
9. [Probabilistic Finality](./probabilistic-finality.md): the whitepaper's actual formula, computed and verified

## Next

With consensus theory covered, [Blockchain Fundamentals](../blockchain/README.md) builds the actual data structure (blocks, headers, the chain itself) that Bitcoin's consensus mechanism operates on, treating it as a data structure before treating it as a financial system.
