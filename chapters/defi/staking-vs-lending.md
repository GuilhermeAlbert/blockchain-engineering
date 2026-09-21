# Staking vs. Lending

"Staking" gets used loosely across crypto to describe several structurally different activities, some of which have nothing to do with the proof-of-stake consensus mechanism the word originally referred to. This chapter draws the actual distinctions, closing out the DeFi section's mechanism chapters before the protocol case studies that follow.

## Consensus staking: securing a blockchain

The original, precise meaning of staking is Ethereum's own consensus mechanism, covered fully in [Proof of Stake](../ethereum/proof-of-stake.md) and [Staking](../ethereum/staking.md): locking ETH as a validator's bond, which can be destroyed (slashed) for provably dishonest behavior, in exchange for the right to propose and attest to blocks and earn the associated rewards. This is staking in the sense the term was coined for: capital at risk, securing a specific protocol's consensus, with a defined, protocol-level penalty for misbehavior.

## DeFi "staking": usually just lending or liquidity provision, renamed

Most things called "staking" in DeFi interfaces are mechanically identical to lending (see [Lending](./lending.md)) or liquidity provision (see [Liquidity Providers](./liquidity-providers.md)): a user locks a token into a contract and receives a yield, drawn from trading fees, borrower interest, or token emissions (see [Yield](./yield.md)). Calling this "staking" isn't necessarily inaccurate, since the tokens are, in the plain-English sense, being staked (put at risk) in the contract, but it obscures a meaningful distinction: this kind of staking generally has no protocol-level slashing condition or consensus role at all. The risk is smart contract risk and the yield source's own sustainability, not the specific, defined penalty structure that governs actual consensus-layer staking.

## Why the distinction matters for risk assessment

Consensus staking's risks are well-defined and specific: slashing for a small set of provably attributable protocol violations, and the operational risk of running (or trusting an operator to run) validator infrastructure correctly. DeFi "staking" risks are a different set entirely: smart contract exploits, the sustainability of whatever emissions are funding the advertised yield, and, if the staked token itself is a governance or protocol token rather than something with independent utility, the token's own price risk. Treating a governance token "staking" pool and actual ETH validator staking as carrying comparable risk profiles because both use the word "staking" is a real, common source of miscalibrated expectations.

## Liquid staking sits between the two

[Liquid staking](../ethereum/staking.md#liquid-staking) is a genuine hybrid: the underlying activity is real consensus staking (ETH backing validators, subject to actual slashing conditions), but the liquid staking token itself (stETH, for instance) can then be deposited into DeFi lending or liquidity pools exactly like any other token, stacking a DeFi yield source on top of the underlying consensus staking yield. This compounds the risk categories rather than replacing one with the other: a liquid-staked, DeFi-deposited position carries both the consensus-layer risks of the underlying stake and the smart-contract and market risks of wherever the liquid staking token itself is deployed.

## Common misconceptions

**"Staking" a governance token in a DeFi protocol does not contribute to any blockchain's consensus security.** Unless the specific mechanism explicitly involves validator infrastructure and protocol-defined slashing, "staking" here is a UI label for locking tokens into a smart contract for yield, not a security-relevant activity for any underlying chain.

**A high "staking" APY advertised by a DeFi protocol is not evidence of anything about that protocol's safety.** The yield's source (see [Yield](./yield.md)) needs to be checked independently; a high APY funded by token emissions carries meaningfully different risk than a modest APY funded by real trading fees, regardless of which one a UI happens to label "staking."

## Further reading

- See also: [Proof of Stake](../ethereum/proof-of-stake.md), [Staking](../ethereum/staking.md), [Yield](./yield.md)

---

[← Previous: Yield](./yield.md)
·
[Back to DeFi](./README.md)
·
[Next: Uniswap →](./uniswap.md)
