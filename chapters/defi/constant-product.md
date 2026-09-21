# Constant Product Formula

Uniswap's `x * y = k` formula is the specific pricing rule behind the most widely deployed class of AMM (see [Automated Market Makers](./amm.md)). This chapter works through the formula directly, verified with real computed numbers, rather than describing it only in the abstract.

## The formula

A pool holds two reserves, `x` and `y` (say, ETH and USDC). The formula requires their product to stay constant across any swap:

```text
x * y = k
```

`k` is not a fee, a target, or a governance parameter. It's simply whatever `x * y` equals right now, and the formula's only job is to keep that product unchanged after a swap. Every swap moves the pool along the same curve, trading some of one reserve for some of the other in whatever ratio keeps `k` fixed.

## Working through a swap

Start with a pool holding 100 ETH and 200,000 USDC:

```text
x = 100 ETH
y = 200,000 USDC
k = x * y = 20,000,000
```

The pool's current spot price is `y / x = 2,000 USDC per ETH`. Now a trader sends 1 ETH into the pool, wanting USDC out. The new ETH reserve is `x' = 101`. Since `k` must stay at 20,000,000, the new USDC reserve is forced to be:

```text
y' = k / x' = 20,000,000 / 101 = 198,019.801980198...
```

The trader receives the difference between the old and new USDC reserve:

```text
amountOut = y - y' = 200,000 - 198,019.801980198... = 1,980.198019801988...
```

Verified directly in TypeScript:

```typescript
function swap(reserveIn: number, reserveOut: number, amountIn: number) {
  const k = reserveIn * reserveOut;
  const newReserveIn = reserveIn + amountIn;
  const newReserveOut = k / newReserveIn;
  const amountOut = reserveOut - newReserveOut;
  return { amountOut, newReserveIn, newReserveOut, k };
}

const before = { x: 100, y: 200_000 };
const result = swap(before.x, before.y, 1);
// { amountOut: 1980.198019801988, newReserveIn: 101, newReserveOut: 198019.801980198, k: 20000000 }

console.log(result.newReserveIn * result.newReserveOut); // 20000000, k held constant
```

The trader pays 1 ETH and receives 1,980.198... USDC, not the naive 2,000 USDC the pre-trade spot price would suggest. That gap has a name: slippage.

## Slippage: the cost of moving the reserves

The trader's *effective* price (1,980.198 USDC per ETH) is worse than the pool's spot price before the trade (2,000 USDC per ETH), by about 0.99%. This isn't a fee taken by the protocol. It's a direct, mechanical consequence of the formula itself: buying ETH from the pool removes ETH from the reserve, which raises the ETH reserve's scarcity relative to USDC, which the formula prices as a *rising* ETH price as the trade executes. A trader buying 1 ETH pays a blended price across the whole curve from 2,000 down toward whatever the new marginal price becomes, not the flat starting price.

The size of the trade relative to the pool's reserves determines how much slippage a trader eats. The same pool, but with a 10 ETH swap instead of 1 ETH:

```typescript
const result10 = swap(100, 200_000, 10);
// { amountOut: 18181.818181818177, newReserveIn: 110, newReserveOut: 181818.18181818182, k: 20000000 }
```

10 ETH in returns 18,181.818... USDC, an effective price of 1,818.18 USDC per ETH: about 9.09% slippage, roughly nine times worse than the 1 ETH trade's 0.99%, despite the trade only being ten times larger. Slippage grows faster than trade size because the curve gets steeper as reserves become more imbalanced; a full treatment of this relationship, and of price impact on shallow pools specifically, is in [Slippage](./slippage.md).

## Why the curve looks the way it does

Plotting `y = k / x` produces a hyperbola: as `x` grows, `y` shrinks, and neither reserve can ever reach zero, since `y = k / x` approaches zero only as `x` approaches infinity. This is a deliberate, useful property, not an accident of the algebra: it means a constant-product pool can never be fully drained of one asset no matter how large a single trade is, since the price of the remaining units rises without bound as the reserve thins out. A trader can always buy *some* of the remaining reserve, but buying *all* of it would cost an infinite amount of the other token.

## Common misconceptions

**`k` is not fixed across the pool's entire lifetime, only across an individual swap.** Liquidity providers adding or removing liquidity (see [Liquidity Pools](./liquidity-pools.md)) changes both reserves proportionally, which changes `k` itself without changing the pool's price, since price depends on the *ratio* `y / x`, not on `k`'s absolute value.

**Slippage is not a fee, and it isn't paid to anyone.** The gap between spot price and effective price reflects the trade's own price impact on the curve; the separate, explicit trading fee (see [Automated Market Makers](./amm.md#fees)) is a distinct amount taken on top of whatever slippage the trade already incurs.

## Further reading

- [Uniswap v2 whitepaper](https://uniswap.org/whitepaper.pdf)
- See also: [Automated Market Makers](./amm.md), [Slippage](./slippage.md)

---

[← Previous: Automated Market Makers](./amm.md)
·
[Back to DeFi](./README.md)
·
[Next: Liquidity Pools →](./liquidity-pools.md)
