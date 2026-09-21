# Proof of Stake

Proof of stake replaces Bitcoin's [proof-of-work](../bitcoin/proof-of-work.md) Sybil-resistance mechanism (see [Sybil Attacks](../distributed-systems/sybil-attacks.md)) with a different costly resource: staked capital rather than computational work. This chapter covers Ethereum's specific proof-of-stake design, who gets to propose blocks, how the network agrees on the canonical chain, and how dishonest behavior is punished.

## The core substitution

Recall from [Sybil Attacks](../distributed-systems/sybil-attacks.md#bitcoins-specific-defense") that Bitcoin ties influence over consensus to a resource that's expensive to acquire in large quantities, computational hash power. Proof of stake ties that same influence to a different expensive-to-acquire resource: **ether locked as a stake**, called a validator's **deposit**. Both mechanisms solve the identical underlying problem (preventing cheap, unlimited fake-identity creation from gaining disproportionate influence), through different specific economic mechanisms with different specific tradeoffs, covered directly in [Finality](./finality.md#deterministic-versus-probabilistic-guarantees-compared) and this book's earlier general treatment in [Finality](../distributed-systems/finality.md#economic-finality).

## Becoming a validator

Ethereum requires a validator deposit of **32 ETH** to activate as a validator, a specific, protocol-defined amount, not adjustable per-validator (someone wanting to stake a different amount either runs multiple 32 ETH validators, or participates through a staking pool, see [Staking](./staking.md), which lets many participants collectively fund validators without each individually holding the full 32 ETH).

## Slots and epochs

Time on Ethereum's consensus layer is divided into **slots**, fixed, 12-second windows, each with exactly one validator (selected pseudorandomly, weighted by the total validator set) assigned to propose a block for that slot. Every 32 slots (6.4 minutes) constitute an **epoch**, the unit over which validator committees are reorganized and, critically, over which the finality mechanism (see [Finality](./finality.md)) operates.

```text
Epoch (32 slots, 6.4 minutes)
├── Slot 1 (12s): validator A proposes a block; a committee of other
│                 validators attests to (votes on) the current head
├── Slot 2 (12s): validator B proposes; a different committee attests
├── ...
└── Slot 32 (12s): validator Z proposes; final committee attests
```

Not every slot necessarily produces a block, if the assigned validator is offline or fails to propose in time, that slot is simply empty (a "missed slot"), and the chain continues from the next slot's proposal.

## Attestations: how validators vote

Every active validator, once per epoch, submits an **attestation**, a signed vote specifying which block they consider the current chain head, and which checkpoint they consider justified for finality purposes (see [Finality](./finality.md#how-justification-and-finalization-actually-work)). These attestations, aggregated across the validator set, are what Ethereum's fork-choice rule (**LMD-GHOST**, a variant of the general [fork choice](../blockchain/fork-choice.md) concept, weighted by attesting validators' stake rather than by proof-of-work) uses to determine the canonical chain, directly analogous in *purpose* to Bitcoin's cumulative-proof-of-work rule, but computed from validator votes rather than accumulated computational work.

## Why this requires knowing the validator set, unlike Bitcoin

This is a structural difference worth naming directly: Ethereum's proof-of-stake protocol needs to know, precisely, who the current validators are and how much each has staked, a **permissioned-by-registration**, though still openly joinable, validator set, tracked explicitly by the protocol itself. Bitcoin's proof-of-work needs no equivalent registry. Anyone can point hash power at the network with zero registration, and the protocol never needs to know who or how many miners exist. This is a genuine, consequential design tradeoff, not simply an implementation detail. It's part of why proof-of-stake can achieve faster, more structured finality (see [Finality](./finality.md)) than Bitcoin's fully open, unregistered participant model allows.

## Common misconceptions

**Proof of stake does not mean "the people with the most ether control everything" in an unconstrained sense**. It means influence over block proposal and attestation is proportional to staked ETH specifically committed as a validator deposit, subject to slashing risk (see [Slashing](./slashing.md)) for misbehavior; simply holding ether without staking it confers no consensus influence at all.

**Ethereum's validators are not the same thing as Bitcoin's miners in terms of what they physically do**. A validator's job is signing attestations and occasionally proposing blocks, computationally lightweight compared to Bitcoin's brute-force hash search; the "work" in proof of stake is economic (capital at risk), not computational.

## Further reading

- [Ethereum consensus specifications](https://github.com/ethereum/consensus-specs)
- [ethereum.org: Proof-of-stake](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/)

---

[← Previous: The Merge](./the-merge.md)
·
[Back to Ethereum](./README.md)
·
[Next: Validators →](./validators.md)
