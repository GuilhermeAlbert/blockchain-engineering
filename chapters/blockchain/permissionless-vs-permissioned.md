# Permissionless vs Permissioned Networks

Not every system marketed as "blockchain" shares Bitcoin's defining property of open participation. This chapter draws the distinction precisely, because it affects which of the guarantees covered throughout this section — Sybil resistance, censorship resistance, trustless verification — actually apply to a given system.

## Permissionless networks

A **permissionless** blockchain allows anyone to participate in its core functions — running a full node, validating transactions, and (for proof-of-work or proof-of-stake systems) participating in block production — without needing approval from any gatekeeper. Bitcoin and Ethereum are both permissionless: anyone can download the software, run a node, and, subject to the resource requirements involved (mining hardware, or staked capital), participate in producing blocks. This openness is precisely why these networks need the specific consensus mechanisms covered in [Distributed Systems](../distributed-systems/README.md) — [Sybil resistance](../distributed-systems/sybil-attacks.md) is only a meaningful problem to solve when anyone can join at will, which is exactly the situation permissionless systems create.

## Permissioned networks

A **permissioned** blockchain restricts who can participate — typically to a known, vetted set of organizations, common in enterprise and consortium contexts (supply chain tracking among a group of known corporate partners, for instance, or interbank settlement systems among regulated financial institutions). Because the set of participants is known and controlled in advance, permissioned systems can use classical Byzantine fault tolerant consensus protocols (see [Byzantine Faults](../distributed-systems/byzantine-faults.md) and [Consensus](../distributed-systems/consensus.md)) that assume a fixed, identifiable membership — protocols like PBFT become practical precisely because the "who might be dishonest" set is bounded and known, sidestepping the harder permissionless-Sybil-resistance problem entirely.

## Comparing the two directly

| | Permissionless | Permissioned |
| --- | --- | --- |
| Who can validate | Anyone, subject to resource cost | A known, vetted, approved set |
| Sybil resistance needed | Yes — proof-of-work, proof-of-stake, or similar | Not really — membership is already controlled |
| Typical consensus mechanism | Nakamoto consensus (probabilistic finality) or proof-of-stake variants | Classical BFT (PBFT and derivatives), often deterministic finality |
| Censorship resistance | High — no gatekeeper can exclude a participant | Lower — the controlling organization(s) determine membership |
| Governance | Emergent, distributed among a large, open set of stakeholders (see [Governance](../governance/README.md)) | Formal, contractual agreement among known member organizations |
| Typical throughput | Lower (constrained by the need for open, global consensus — see [Bitcoin Scaling](../bitcoin-scaling/README.md)) | Often higher (fewer, faster-communicating, trusted-enough participants) |

## Why this distinction matters when evaluating "blockchain" claims

A significant amount of blockchain-adjacent marketing over the 2010s and 2020s described permissioned, consortium-controlled systems using language borrowed from Bitcoin and Ethereum's permissionless, trust-minimized design — "decentralized," "trustless," "censorship-resistant" — without those systems actually offering the same guarantees, because a permissioned system's security ultimately still depends on trusting the specific, known set of organizations running it not to collude. This isn't necessarily a criticism of permissioned systems on their own terms — for some enterprise use cases, a known, accountable, and vetted set of participants is a perfectly reasonable and even preferable design choice, since it can offer higher throughput and clearer legal accountability than a fully open network. But it is a meaningfully different security and trust model than Bitcoin's, and conflating the two — assuming a permissioned "blockchain" offers the same censorship resistance or trustlessness as Bitcoin simply because it uses similar underlying data structures (blocks, hashes, a chain) — is a common and consequential category error.

## Common misconceptions

**Using a blockchain-style data structure (blocks linked by hashes) does not automatically make a system "decentralized" or "trustless."** Those properties depend on the consensus mechanism and participant model — specifically, permissionless membership combined with Sybil-resistant consensus — not merely on using hash-linked blocks as a storage format. A permissioned system using the exact same block-and-hash data structure as Bitcoin, but controlled by a small consortium, offers fundamentally different trust guarantees.

**"Private blockchain" is sometimes used as a near-synonym for "permissioned blockchain," but the terms aren't perfectly interchangeable** across all sources — some use "private" to describe restricted *read* access (who can see the data) as distinct from "permissioned," which more precisely describes restricted *write/validate* access (who can propose or approve new blocks). This book uses "permissioned" specifically for the write/validate distinction covered above, since that's the property that most directly affects the security guarantees discussed throughout this section.

## Further reading

- [Practical Byzantine Fault Tolerance](http://pmg.csail.mit.edu/papers/osdi99.pdf) — Castro & Liskov, 1999, the foundational protocol most permissioned blockchain consensus mechanisms build on
- See also: [Consensus](../distributed-systems/consensus.md), [Sybil Attacks](../distributed-systems/sybil-attacks.md)

---

[← Previous: Fork Choice](./fork-choice.md)
·
[Back to Blockchain Fundamentals](./README.md)
·
[Next: Bitcoin Nodes →](../bitcoin/nodes.md)
