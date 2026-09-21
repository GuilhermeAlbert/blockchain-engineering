# Base

Base, launched by Coinbase in August 2023, runs on the OP Stack (see [Optimism](./optimism.md#the-op-stack-a-shared-open-source-rollup-framework)) and is the OP Stack ecosystem's highest-volume chain. This chapter uses Base specifically as a case study for how "decentralization" for a rollup is actually a matter of degree, measured directly, rather than a binary label.

## What Coinbase actually controls

Base's sequencer (see [Sequencers](./sequencers.md)) is operated by Coinbase, giving Coinbase ordinary-case control over transaction ordering, the same centralized-sequencer situation this section already noted applies to essentially every major rollup today, not something unique to Base. What matters more for assessing actual risk is what Coinbase *cannot* do: because Base uses the OP Stack's standard fault-proof system, a centralized sequencer can reorder or delay transactions, but it cannot fabricate an invalid state transition that survives the chain's own fraud-proof verification, the same security boundary [Optimistic Rollups](./optimistic-rollups.md) establishes generally.

## Measuring decentralization directly: the L2Beat stages framework

Rather than treating "decentralized" as a binary claim, the independent analytics organization L2Beat evaluates rollups against a concrete, three-stage framework: **Stage 0**, where the operator effectively runs the chain directly; **Stage 1**, where the chain is governed by smart contracts with a functional, permissionless fraud-proof system, though a security council retains emergency intervention power as a backstop; and **Stage 2**, fully immutable and contract-governed, with no remaining privileged intervention power at all. On July 28, 2026, L2Beat classified Base as having reached **Stage 1**, following the deployment of permissionless fault proofs and a security council structure requiring 9 of 12 members (11 independent entities plus Coinbase itself) to approve any contract upgrade, rather than upgrades being unilaterally controlled by Coinbase alone.

## Why this specific, dated fact matters more than a general label

Stating that Base "reached Stage 1 on July 28, 2026" is a meaningfully more useful claim than simply saying "Base is a rollup" or even "Base is decentralized," because it's checkable, dated, and tied to a specific, concrete change (permissionless fault proofs going live, plus the security council's multi-party approval requirement) rather than a general impression. This is the same discipline this book has applied throughout: a specific, sourced, dated claim survives scrutiny in a way a vague characterization doesn't, and a rollup's decentralization status is exactly the kind of fact that changes over time and deserves being checked against its current state rather than assumed from memory.

## Common misconceptions

**Base's sequencer being Coinbase-operated does not mean Coinbase can unilaterally steal or freeze user funds.** The fault-proof system bounds what a misbehaving sequencer can actually get away with; the real, concrete risk from centralized sequencing is transaction-ordering manipulation and censorship (mitigated by forced inclusion, see [Sequencers](./sequencers.md#why-sequencer-centralization-is-a-genuine-current-tradeoff)), not outright fund theft.

**Reaching "Stage 1" is not the same as reaching full, "Stage 2" decentralization.** Base's security council retains real, if constrained by its 9-of-12 threshold, emergency intervention power over the chain's contracts; Stage 1 is a genuine, verified milestone, not a claim that no privileged party retains any special power at all.

## Further reading

- [Base documentation](https://docs.base.org/)
- [L2Beat: Base](https://l2beat.com/scaling/projects/base)
- [L2Beat: rollup stages framework](https://l2beat.com/scaling/stages)
- See also: [Optimism](./optimism.md), [Sequencers](./sequencers.md)

---

[← Previous: Optimism](./optimism.md)
·
[Back to Layer 2](./README.md)
·
[Next: zkSync →](./zksync.md)
