# Impermanent Loss

Impermanent loss is the value gap between what a liquidity provider's withdrawn position is worth and what simply holding the same original tokens, unpooled, would have been worth. This chapter derives the number directly from the constant-product formula and works through several verified price scenarios, rather than citing the standard result without showing where it comes from.

## Setting up the comparison

Deposit 100 ETH and 200,000 USDC into a pool when ETH trades at $2,000, for a total deposit value of $400,000 and `k = 100 * 200,000 = 20,000,000` (see [Constant Product Formula](./constant-product.md)). Two things can happen from here: the LP could have just held those 100 ETH and 200,000 USDC in a wallet, or they deposited into the pool, where arbitrage trading constantly pulls the pool's internal price toward the external market price (see [Automated Market Makers](./amm.md#common-misconceptions)) as ETH's price moves.

Impermanent loss compares these two outcomes at some later point where ETH's price has changed, holding everything else (deposit timing, amounts) fixed.

## Deriving the pool's new reserves after a price move

If ETH's external price becomes `newPrice`, arbitrageurs trade against the pool until its internal price (`reserveUSDC / reserveETH`) matches `newPrice`, while `k` stays fixed at 20,000,000. Solving for the new reserves:

```typescript
function poolValueAfterPriceChange(
  initialETH: number,
  initialUSDC: number,
  priceMultiplier: number
) {
  const k = initialETH * initialUSDC;
  const initialPrice = initialUSDC / initialETH;
  const newPrice = initialPrice * priceMultiplier;

  const newETH = Math.sqrt(k / newPrice);
  const newUSDC = k / newETH;

  const poolValue = newETH * newPrice + newUSDC;
  const holdValue = initialETH * newPrice + initialUSDC;
  const impermanentLossPercent = ((poolValue - holdValue) / holdValue) * 100;

  return { newETH, newUSDC, poolValue, holdValue, impermanentLossPercent };
}
```

## Verified results across price moves

Running this for several price multipliers against the same starting pool:

| ETH price change | Pool value | Hold value | Impermanent loss |
|---|---|---|---|
| No change (1x) | $400,000 | $400,000 | 0% |
| +25% (1.25x) | $447,213.60 | $450,000 | -0.62% |
| +50% (1.5x) | $489,897.95 | $500,000 | -2.02% |
| 2x | $565,685.42 | $600,000 | -5.72% |
| 3x | $692,820.32 | $800,000 | -13.40% |
| 4x | $800,000 | $1,000,000 | -20% |
| -50% (0.5x) | $282,842.71 | $300,000 | -5.72% |
| -75% (0.25x) | $200,000 | $250,000 | -20% |

The loss is symmetric in the price *ratio*: a 2x increase and a 2x decrease (0.5x) produce the identical -5.72% impermanent loss, since the formula depends on how far the price ratio moved from 1, not on the direction. Small moves cost very little (a 25% move costs under 1%), but the loss grows faster than the price change itself: doubling the price move from 2x to 4x roughly quadruples the loss, from -5.72% to -20%.

## Why it happens: the pool is forced to sell the appreciating asset

The mechanism is exactly what "constant product" implies: as ETH's price rises, the pool's arbitrage-driven rebalancing sells ETH out of the pool and buys USDC into it, to keep `reserveETH * reserveUSDC` fixed while the ratio matches the new external price. An LP ends up holding *less* of the asset that went up in value and *more* of the asset that didn't, compared to what they'd hold if they'd simply done nothing. That's the entire mechanism: it's not a fee, a penalty, or a hack, it's the direct, mechanical consequence of a formula that must keep `k` constant by continuously trading the pool's own reserves against price moves.

## Why "impermanent" and when it stops being impermanent

The loss is called impermanent because it isn't realized until the LP actually withdraws. If ETH's price returns to its original $2,000 before withdrawal, the pool's reserves return to their original 100 ETH / 200,000 USDC split too, and the loss disappears entirely, exactly canceling back to zero. The loss becomes real, permanent capital loss only if the LP withdraws while the price ratio remains different from the ratio at deposit time. This is why impermanent loss must always be weighed against the accumulated fee income earned over the same period (see [Liquidity Providers](./liquidity-providers.md#the-two-components-of-lp-return)): fee income earned while deposited is real and keeps accruing regardless of what the price does next, while impermanent loss can shrink, grow, or vanish depending on where the price ends up at withdrawal.

## Common misconceptions

**Impermanent loss is not a fee charged to LPs, and nobody collects it.** It's an opportunity cost relative to a specific counterfactual (holding the same tokens unpooled), not a transfer of value to any party; the "missing" value effectively went to traders who got better prices from the pool's rebalancing than they would have from a static allocation.

**Impermanent loss is not avoided by choosing a pool with lower fees, or eliminated once it happens.** It depends entirely on the price ratio's movement between deposit and withdrawal, which is unrelated to the pool's fee tier; a 0% fee pool and a 1% fee pool experience identical impermanent loss for the identical price move, only their fee income differs.

**"Impermanent" does not mean "small" or "rare."** As the -20% figure for a 4x price move shows, the loss can be substantial for a volatile pair, and large price moves are exactly the conditions under which impermanent loss matters most, not an edge case that can be ignored.

## Further reading

- [Uniswap v2 whitepaper](https://uniswap.org/whitepaper.pdf)
- See also: [Liquidity Providers](./liquidity-providers.md), [Constant Product Formula](./constant-product.md)

---

[← Previous: Liquidity Providers](./liquidity-providers.md)
·
[Back to DeFi](./README.md)
·
[Next: Slippage →](./slippage.md)
