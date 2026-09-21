# Forks and Protocol Upgrades

"Fork" describes several genuinely different events sharing one overloaded word. This section separates them precisely — a routine, self-resolving disagreement about the chain tip is not the same kind of event as a soft fork, which is not the same kind of event as a hard fork, which is not the same kind of event as the specific, historically contentious splits covered in this section's case studies. Getting this vocabulary precise matters for understanding how Bitcoin actually changes over time without a central authority to decide.

## What you need to know first

[Blockchain Fundamentals](../blockchain/README.md), specifically [Fork Choice](../blockchain/fork-choice.md) and [Consensus Rules](../blockchain/consensus-rules.md) — this section builds directly on the distinction between consensus rules and policy rules established there.

## Chapters

### The vocabulary

1. [Temporary Chain Forks](./temporary-forks.md) — the routine, self-resolving kind, distinguished from everything else in this section
2. [Soft Forks](./soft-forks.md) — rule tightening, with SegWit as the worked example
3. [Hard Forks](./hard-forks.md) — rule changes that require universal upgrading, and the real risk of a permanent split
4. [Backward Compatibility](./backward-compatibility.md) — what the term means precisely at the consensus-rules level

### Process

5. [Protocol Upgrades](./upgrades.md) — the general path from idea to deployed change
6. [BIPs](./bips.md) — the formal proposal process, modeled on Python's PEPs
7. [Bitcoin Governance](./governance.md) — who has practical influence, and what each group actually controls
8. [Miner Signaling](./miner-signaling.md) — BIP 9, its 95% threshold, and what happens below it
9. [User-Activated Soft Forks](./uasf.md) — node operators' leverage, demonstrated concretely by BIP 148

### Case studies

Presented using each side's own contemporary arguments, without adopting either side's characterization of the other.

10. [Bitcoin Cash](./bitcoin-cash.md) — the August 2017 hard fork
11. [Bitcoin SV](./bitcoin-sv.md) — a fork of Bitcoin Cash, not of Bitcoin, and the "hash war" that followed
12. [SegWit2x](./segwit2x.md) — an industry agreement that couldn't override the network's own rough consensus
13. [The Block Size Debate](./block-size-war.md) — the underlying, genuinely substantive dispute behind all three

## Next

Continue to [Wallets and Key Management](../wallets/README.md) — a more practical, less contentious subject, covering what actually manages the keys and addresses referenced constantly throughout this section and the Bitcoin section before it.
