# Optimism

Optimism, whose production chain is called OP Mainnet, launched in January 2021, making it one of the earliest live optimistic rollups on Ethereum. This chapter covers what makes Optimism distinctive beyond simply being an early mover: it open-sourced its entire technology stack, and built an ecosystem of independently operated chains around that shared codebase.

## The OP Stack: a shared, open-source rollup framework

OP Labs, the team behind Optimism, open-sourced the software underlying OP Mainnet as the **OP Stack**, a modular framework any team can use to launch their own rollup with standardized, interoperable components rather than building an optimistic rollup's infrastructure from scratch. This is a meaningfully different strategy from treating the rollup's technology as Optimism's own proprietary product: dozens of independently operated chains, including some run by entirely separate companies, run on the OP Stack today, all sharing the same underlying rollup design and, increasingly, coordinated upgrade paths.

## The Superchain vision

Optimism's stated long-term goal, called the **Superchain**, goes beyond simply sharing open-source code: it aims for OP Stack chains to eventually share security, communication, and infrastructure directly, including a shared sequencer (see [Sequencers](./sequencers.md#the-path-toward-decentralized-sequencing)) that would let transactions move between Superchain member chains with much stronger guarantees than bridging between two entirely unrelated chains provides today. As of 2026, this shared-infrastructure vision remains a work in progress rather than a fully realized reality: individual OP Stack chains currently operate largely independently, each with its own sequencer, even though they share the same underlying codebase.

## Base: the most prominent OP Stack chain

Base, launched by Coinbase in August 2023, runs on the OP Stack and has become the highest-volume OP Stack chain, illustrating the practical value of the shared-framework strategy: Coinbase didn't need to design and build an optimistic rollup's core mechanics from scratch, instead deploying a production chain on infrastructure Optimism had already built, tested, and continued to maintain, while retaining its own operational control over Base's specific sequencer and chain-level decisions.

## Common misconceptions

**"OP Stack chain" is not the same claim as "part of a unified, shared-security Superchain."** Most OP Stack chains today, Base included, are independently operated with their own sequencer and their own trust assumptions; sharing the OP Stack's codebase is a starting point for the Superchain vision, not evidence that vision has already been fully realized.

**Optimism being an early mover does not mean its fraud-proof and dispute mechanisms have remained static since 2021.** Like Arbitrum's BOLD upgrade (see [Arbitrum](./arbitrum.md#the-permissioned-validation-gap-and-bold)), Optimism's own dispute and validation mechanisms have continued evolving well past initial launch; a claim about Optimism's exact current security properties should be checked against its current, not launch-era, implementation.

## Further reading

- [Optimism documentation](https://docs.optimism.io/)
- [OP Stack specification](https://specs.optimism.io/)
- See also: [Optimistic Rollups](./optimistic-rollups.md), [Base](./base.md)

---

[← Previous: Arbitrum](./arbitrum.md)
·
[Back to Layer 2](./README.md)
·
[Next: Base →](./base.md)
