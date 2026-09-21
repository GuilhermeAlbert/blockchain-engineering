# Liquidity Pools

A liquidity pool is the actual smart contract holding an AMM's reserves: the two token balances the constant-product formula (see [Constant Product Formula](./constant-product.md)) prices trades against. This chapter covers what a pool contract actually tracks and how depositors get a claim on it.

## What a pool contract holds

At minimum, a pool contract tracks three things: the balance of token A it currently custodies, the balance of token B it currently custodies, and the total supply of a third token it mints itself, called an **LP token** (liquidity provider token). The pool's own reserves are exactly the `x` and `y` from [Constant Product Formula](./constant-product.md); nothing about the pool's logic requires any state beyond these two balances and the swap formula operating on them.

## LP tokens: a receipt for a share of the pool

When a liquidity provider deposits tokens into a pool, the contract mints LP tokens back to them, representing a proportional claim on the pool's current reserves. If a provider deposits assets worth 10% of the pool's total value, they receive LP tokens representing 10% of the total LP token supply. Withdrawing later means burning those LP tokens and receiving back a proportional share of whatever the pool's reserves are *at that time*, not necessarily the same token amounts originally deposited: the pool's reserve ratio moves as trades happen, and a withdrawal returns a slice of the current ratio.

```typescript
// Simplified LP token accounting for a first deposit into an empty pool.
// Uniswap v2 actually uses sqrt(x * y) for the first mint, burning a small
// fixed amount permanently to prevent a division-by-zero on later math;
// this omits that detail to keep the core mechanic visible.
function firstDeposit(amountA: number, amountB: number) {
  const lpTokensMinted = Math.sqrt(amountA * amountB);
  return { reserveA: amountA, reserveB: amountB, lpTokensMinted };
}

function subsequentDeposit(
  amountA: number,
  reserveA: number,
  reserveB: number,
  totalLpSupply: number
) {
  // Depositing must match the pool's current ratio, or the depositor
  // effectively donates the mismatched portion to existing LPs.
  const amountB = (amountA * reserveB) / reserveA;
  const lpTokensMinted = (amountA / reserveA) * totalLpSupply;
  return { amountB, lpTokensMinted };
}

const pool = firstDeposit(100, 200_000); // 100 ETH, 200,000 USDC
console.log(pool);
// { reserveA: 100, reserveB: 200000, lpTokensMinted: 4472.13595499958 }

const nextLp = subsequentDeposit(10, pool.reserveA, pool.reserveB, pool.lpTokensMinted);
console.log(nextLp);
// { amountB: 20000, lpTokensMinted: 447.213595499958 }
```

A second depositor adding 10 ETH must also add 20,000 USDC to match the pool's existing 1:2,000 ratio, and receives LP tokens equal to exactly 10% of the existing supply, since they're adding exactly 10% more of each reserve.

## Fees accrue to the pool, not as a separate payout

The trading fee collected on every swap (see [Automated Market Makers](./amm.md#fees)) doesn't get paid out to liquidity providers directly as a running balance. It stays in the pool, added to the reserves, which raises the amount of both tokens a given quantity of LP tokens can be redeemed for over time. An LP token's value grows as accumulated fees increase the pool's total reserves relative to the fixed LP token supply, so a provider realizes their fee income by withdrawing later for more than they'd get back from their original deposit alone, not through a separate claim or distribution transaction.

## Common misconceptions

**Depositing into a pool does not guarantee getting back the same two token amounts originally deposited.** Withdrawal returns a proportional share of the pool's *current* reserves, whatever ratio those happen to be at withdrawal time; if the pool's price has moved since deposit, the withdrawn amounts reflect that new ratio, which is the mechanical basis of [impermanent loss](./impermanent-loss.md).

**An LP token is not a passive index of the two underlying assets held separately.** Its value tracks the pool's constant-product curve, which behaves differently from simply holding the two assets outside the pool, a distinction covered precisely in [Impermanent Loss](./impermanent-loss.md).

## Further reading

- [Uniswap v2 core contracts](https://github.com/Uniswap/v2-core)
- See also: [Liquidity Providers](./liquidity-providers.md), [Impermanent Loss](./impermanent-loss.md)

---

[← Previous: Constant Product Formula](./constant-product.md)
·
[Back to DeFi](./README.md)
·
[Next: Liquidity Providers →](./liquidity-providers.md)
