# Uniswap

Uniswap is the protocol that popularized the constant-product AMM (see [Constant Product Formula](./constant-product.md)) and, by trading volume, remains the most widely used decentralized exchange on Ethereum. This chapter traces its three major versions as a case study in how the AMM model this section has covered mechanically actually evolved in production.

## v1: proof of concept, ETH-only pairs

Uniswap v1 launched on Ethereum mainnet on November 2, 2018, built by Hayden Adams as an implementation of an AMM design Ethereum co-founder Vitalik Buterin had earlier sketched in a Reddit post. Every v1 pool paired a single ERC-20 token against ETH directly; there was no way to create a pool between two arbitrary ERC-20 tokens. Trading between two non-ETH tokens meant routing through two separate pools (token A to ETH, then ETH to token B), an early, working demonstration that the constant-product formula alone was enough to build a functioning, permissionless exchange, without yet being the general-purpose design later versions became.

## v2: arbitrary ERC-20 pairs, and price oracles

Uniswap v2 launched in May 2020, removing the ETH-pairing requirement entirely: any ERC-20 token could be paired directly against any other. V2 also introduced a built-in time-weighted average price mechanism (see [Oracles](./oracles.md#twap-oracles-deriving-price-from-an-amms-own-trading-history)), letting other contracts read a manipulation-resistant price directly from a Uniswap pool's own accumulated trading history, which became a widely used building block for other DeFi protocols needing an on-chain price reference. V2's core contracts are open source and remain, in modified or directly forked form, one of the most widely reused pieces of code in DeFi.

## v3: concentrated liquidity

Uniswap v3 launched on May 5, 2021, with the section's biggest structural change: **concentrated liquidity**. Instead of a liquidity provider's capital being spread across the entire price curve from zero to infinity (as in v1 and v2's uniform model), a v3 LP chooses a specific price range to concentrate their capital within. Capital committed to a narrow range around the current price earns proportionally more fees per dollar deposited than the same capital spread across the full range, since it's actively used for a much larger share of trades that occur near the current price, at the cost of that capital earning nothing (and being fully converted to whichever single asset the price moved toward) once the price exits the chosen range entirely. Uniswap Labs describes this as enabling meaningfully higher capital efficiency than v2's uniform distribution for liquidity concentrated near the current price, though the exact multiple depends heavily on the specific range chosen and how actively it's managed as price moves.

## What this history illustrates about AMM design

Each version solved a specific, concrete limitation of the previous one rather than being a ground-up redesign: v2 removed v1's ETH-routing requirement, and v3 addressed v2's capital-inefficiency for liquidity far from the current trading price. This incremental pattern is typical of how DeFi primitives have evolved generally: the core constant-product mechanism from [Constant Product Formula](./constant-product.md) has remained the pricing foundation across all three versions, with each iteration changing how liquidity is organized and priced around that same underlying formula rather than replacing it.

## Common misconceptions

**Uniswap v3's concentrated liquidity does not eliminate impermanent loss.** It changes an LP's capital efficiency and fee-earning intensity within a chosen range, but the underlying exposure to price movement, and the impermanent loss that comes with it (see [Impermanent Loss](./impermanent-loss.md)), works the same way within that range as it does for a v2-style full-range position; a v3 position can, in fact, experience effectively worse impermanent loss than a full-range v2 position if price exits the chosen range.

**"Uniswap" does not refer to one single deployment.** Its v2 and v3 contracts, being open source, have been directly forked and deployed as separate, independently operated protocols numerous times, some with parameter changes and some nearly identical; encountering "a Uniswap fork" on a different chain or under a different brand name is common and doesn't imply any relationship to Uniswap Labs.

## Further reading

- [Uniswap v2 whitepaper](https://uniswap.org/whitepaper.pdf)
- [Uniswap v3 whitepaper](https://uniswap.org/whitepaper-v3.pdf)
- [Uniswap v2 core contracts](https://github.com/Uniswap/v2-core)
- See also: [Constant Product Formula](./constant-product.md), [Automated Market Makers](./amm.md)

---

[← Previous: Staking vs. Lending](./staking-vs-lending.md)
·
[Back to DeFi](./README.md)
·
[Next: Aave →](./aave.md)
