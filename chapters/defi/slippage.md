# Slippage

Slippage is the difference between a trade's expected price and its actual executed price. This chapter covers where that gap comes from mechanically, why it grows with trade size and shrinks with pool depth, and how arbitrage keeps an AMM's price anchored to the broader market despite the pool having no external price feed of its own.

## Price impact versus quoted slippage

[Constant Product Formula](./constant-product.md) already showed the mechanism directly: a 1 ETH swap against a 100 ETH / 200,000 USDC pool executes at an effective price of 1,980.20 USDC per ETH, not the pool's pre-trade spot price of 2,000. That gap, about 0.99%, is **price impact**: the trade's own effect on the pool's reserves, moving the price against the trader as it executes. Most wallet and DEX interfaces show a separate, user-configurable **slippage tolerance** setting, a maximum acceptable gap between the quoted price at submission time and the price at actual execution, protecting against the price moving (from *other* trades landing first) between when a trade is signed and when it's mined. These are related but distinct: price impact is inherent to the trade's own size against the current pool, while slippage tolerance guards against price changes caused by everyone else's activity in the time between quote and execution.

## Pool depth determines how much a given trade size costs

The same trade size produces very different price impact depending on how large the pool's reserves are relative to it. A 1 ETH swap against a 100 ETH pool moves the price about 1%; the identical 1 ETH swap against a 10,000 ETH pool moves it roughly 100 times less, since the reserves being perturbed are 100 times larger relative to the trade:

```typescript
function swap(reserveIn: number, reserveOut: number, amountIn: number) {
  const k = reserveIn * reserveOut;
  const newReserveIn = reserveIn + amountIn;
  const newReserveOut = k / newReserveIn;
  const amountOut = reserveOut - newReserveOut;
  const spotPrice = reserveOut / reserveIn;
  const effectivePrice = amountOut / amountIn;
  const slippagePercent = (1 - effectivePrice / spotPrice) * 100;
  return { amountOut, slippagePercent };
}

console.log(swap(100, 200_000, 1));
// { amountOut: 1980.1980198019883, slippagePercent: 0.9900990099005913 }

console.log(swap(10_000, 20_000_000, 1));
// { amountOut: 1999.8000199981034, slippagePercent: 0.009999000094829125 }
```

This is why trading platforms surface a pool's total liquidity prominently: **pool depth** (the size of a pool's reserves) is the single biggest factor determining how much price impact a given trade size will cost, independent of which specific token pair or protocol is involved.

## Arbitrage and why prices across venues converge

An AMM pool has no built-in connection to any external price feed (see [Automated Market Makers](./amm.md#common-misconceptions)); its price is purely a function of its own reserve ratio. If a pool's price drifts away from the price available elsewhere (a centralized exchange, or a different pool for the same pair), that gap creates a pure, mechanical profit opportunity: buy the underpriced asset wherever it's cheap, sell it wherever it's expensive, pocketing the difference. Doing so moves both prices toward each other: buying from the cheap venue raises its price (exactly the price-impact mechanism above), and selling into the expensive venue lowers its price, until the gap narrows to whatever remains after transaction costs. This is **arbitrage**, and it's the entire mechanism keeping an AMM's price in line with the broader market: no governance decision or oracle update does this. Independent, profit-seeking traders do it automatically, continuously, as a side effect of pursuing the arbitrage opportunity itself.

## Common misconceptions

**Slippage is not always a cost imposed on the trader by someone else.** A meaningful portion of it, the price-impact component, is a direct, unavoidable consequence of the trade's own size relative to the pool it's executing against; a larger pool or a smaller trade reduces it, but no slippage-tolerance setting can eliminate the price-impact portion entirely.

**A low slippage-tolerance setting does not guarantee a good price, only a bounded one.** It protects against execution price drifting *beyond* a chosen threshold from the quoted price; it says nothing about whether that quoted price itself already reflects meaningful price impact from the trade's own size.

## Further reading

- See also: [Constant Product Formula](./constant-product.md), [Liquidity Pools](./liquidity-pools.md), [MEV](../security/mev.md)

---

[← Previous: Impermanent Loss](./impermanent-loss.md)
·
[Back to DeFi](./README.md)
·
[Next: Lending →](./lending.md)
