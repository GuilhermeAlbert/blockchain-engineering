# Curve

Curve is the AMM this section's [Automated Market Makers](./amm.md#different-pricing-formulas-for-different-asset-relationships) chapter referenced when describing pricing curves built specifically for assets expected to trade near a fixed ratio. This chapter covers Curve's actual pricing formula, and a real, documented incident showing that a specialized formula doesn't remove the smart contract risk every DeFi protocol carries.

## The StableSwap invariant: flatter than constant product

Curve's core innovation, described in Michael Egorov's StableSwap whitepaper, is a pricing formula designed to behave very differently from the constant-product curve near the point where two assets are equally valued. For assets meant to trade near parity (two dollar-pegged stablecoins, or a token and its liquid-staked wrapped version), a plain constant-product curve wastes capital efficiency: most of a constant-product pool's depth sits at price ratios far from 1:1, ratios these specific assets are never expected to actually reach. StableSwap's formula flattens the curve specifically near the 1:1 point, concentrating far more effective liquidity, and correspondingly lower slippage, right where trades between these assets actually happen, at the cost of behaving more like a constant-sum (linear) curve near parity and reverting toward constant-product-like behavior only as the pool's assets drift further from their expected ratio.

This is a direct, concrete illustration of the general principle [Automated Market Makers](./amm.md) raised generally: the choice of pricing curve is a real design decision matched to the specific assets a pool serves, not a one-size-fits-all default, and Curve's formula is a purpose-built answer to exactly the case constant-product handles inefficiently.

## The July 2023 exploit

On July 30, 2023, several of Curve's liquidity pools were exploited for a combined loss reported by various sources in the range of roughly $50 to $70 million. The root cause wasn't a flaw in Curve's own pricing logic or contract design, but a bug in specific versions of the Vyper compiler (0.2.15, 0.2.16, and 0.3.0) that Curve's affected pools had been compiled with: the compiler failed to correctly implement the reentrancy guard those contracts relied on, leaving a reentrancy vulnerability (see [Reentrancy](../security/reentrancy.md)) present in the deployed bytecode despite the contract's own source code including the guard as written. Pools compiled with unaffected Vyper versions were not vulnerable to this specific bug.

## Why this incident matters beyond Curve specifically

The Curve exploit is a useful, concrete case for a point [Smart Contract Auditing](../security/auditing.md) makes generally: a contract's security depends on its entire toolchain, not just its own source code as a human reviewer reads it. A vulnerability introduced by the compiler translating correct, audited source code into flawed bytecode is invisible to a source-level code review and to most static analysis tools that reason about source code rather than compiled output, which is exactly why this specific class of bug had gone undetected across multiple Vyper compiler releases before being discovered.

## Common misconceptions

**Curve's specialized pricing formula was not the cause of the July 2023 exploit.** The vulnerability was in the Vyper compiler's code generation for the reentrancy guard, unrelated to StableSwap's pricing math; any contract compiled with the same affected Vyper versions and relying on the same broken guard pattern carried the identical risk, independent of what that contract's own logic did.

**A "flatter" pricing curve does not mean lower risk overall.** StableSwap's design reduces slippage specifically for assets trading near their expected ratio; it says nothing about a pool's smart contract risk, oracle dependencies, or exposure if the paired assets' prices diverge from that expected ratio more than the design anticipated.

## Further reading

- [Curve StableSwap whitepaper](https://curve.fi/files/stableswap-paper.pdf)
- [Curve Finance documentation](https://resources.curve.fi/)
- See also: [Automated Market Makers](./amm.md), [Reentrancy](../security/reentrancy.md), [Smart Contract Auditing](../security/auditing.md)

---

[← Previous: MakerDAO / Sky](./maker.md)
·
[Back to DeFi](./README.md)
·
[Next: Layer 2 Overview →](../layer2/l1-vs-l2.md)
