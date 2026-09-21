# Automated Market Makers

An Automated Market Maker prices trades algorithmically from a pool's current token reserves, rather than matching individual buy and sell orders the way a traditional exchange does. This chapter covers the general AMM concept; the specific, dominant formula (`x*y=k`) gets its own dedicated chapter next, in [Constant Product Formula](./constant-product.md), with real computed numbers.

## The core idea: price from reserves, not from orders

An AMM holds a **pool** of two (or more) tokens (say, ETH and USDC) and a **pricing function** that determines the exchange rate between them based purely on how much of each the pool currently holds. Trading against the pool changes its reserves, which mechanically changes the price for the *next* trade. There's no separate order book to consult, no counterparty to match with; every trade is against the pool itself, priced by a formula anyone can compute in advance from the pool's current, publicly visible reserve amounts.

## Why this needs liquidity providers

An AMM pool doesn't fund itself. Someone has to deposit the initial (and ongoing) reserves that make trading against the pool possible at all. This is the role of **liquidity providers**, covered in full in [Liquidity Providers](./liquidity-providers.md): third parties who deposit both tokens in a pool, in exchange for a share of the trading fees every swap against that pool generates, and (this is the crucial, non-obvious part) a real, quantifiable risk of their own, covered in [Impermanent Loss](./impermanent-loss.md).

## Fees

Nearly every AMM charges a small fee on each swap (commonly 0.3% for many Uniswap-style pools, though the exact fee varies by protocol and, on some, by pool), a fixed percentage deducted from the swap amount before the pricing formula is applied, accumulating in the pool as additional reserves that liquidity providers can eventually withdraw their proportional share of. This fee is the primary economic incentive for anyone to provide liquidity in the first place, since simply holding both tokens directly (without depositing them in a pool) captures none of this fee revenue.

## Different pricing formulas for different asset relationships

While the constant-product formula (`x * y = k`, covered next) is the most widely known and originally popularized (by Uniswap, see [Uniswap](./uniswap.md)), it's not the only AMM formula in use. Pools specifically designed for assets expected to trade near a fixed ratio (two different stablecoins, both intended to be worth $1, for instance) commonly use flatter, different curves (see [Curve](./curve.md)) that reduce price impact specifically in that narrow, expected trading range, at the cost of behaving differently if the assets' relative value ever diverges meaningfully from the expected ratio. The choice of pricing curve is a real, deliberate design decision matched to the specific assets a pool is meant to serve, not a one-size-fits-all default.

## Common misconceptions

**An AMM pool's price is not set by any external reference or oracle by default**. It's determined purely by the pool's own internal reserve ratio, which is precisely why arbitrage (see [Arbitrage](./slippage.md#arbitrage-and-why-prices-across-venues-converge)) is what actually keeps an AMM's price in line with the broader market price elsewhere, not any built-in connection to external market data.

**Providing liquidity to an AMM pool is not a risk-free way to earn fees**. The [Impermanent Loss](./impermanent-loss.md) chapter covers, with real computed numbers, a specific, quantifiable risk that can outweigh fee income under real, documented market conditions.

## Further reading

- [Uniswap v2 whitepaper](https://uniswap.org/whitepaper.pdf)
- See also: [Constant Product Formula](./constant-product.md), [Liquidity Pools](./liquidity-pools.md)

---

[← Previous: Decentralized Exchanges](./dex.md)
·
[Back to DeFi](./README.md)
·
[Next: Constant Product Formula →](./constant-product.md)
