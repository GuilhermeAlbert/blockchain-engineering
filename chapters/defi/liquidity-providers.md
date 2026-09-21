# Liquidity Providers

A liquidity provider (LP) is anyone who deposits tokens into an AMM pool to earn a share of its trading fees. This chapter covers the LP's actual position: what they're exposed to, what they earn, and why the role is a deliberate risk-for-yield trade rather than a passive, risk-free way to hold two assets.

## What being an LP actually means

Depositing into a pool (see [Liquidity Pools](./liquidity-pools.md)) means giving up direct control of two specific token balances in exchange for LP tokens representing a proportional claim on whatever the pool's reserves are at withdrawal time. This is a fundamentally different position from simply holding the same two assets in a wallet: an LP's holdings are constantly being rebalanced by the constant-product formula (see [Constant Product Formula](./constant-product.md)) as other traders swap against the pool, whether the LP wants that rebalancing or not.

## The two components of LP return

An LP's overall return has two separate pieces that need to be evaluated independently, not conflated:

- **Fee income**: the LP's proportional share of every trading fee collected on swaps against the pool, which accrues automatically into the pool's reserves (see [Liquidity Pools](./liquidity-pools.md#fees-accrue-to-the-pool-not-as-a-separate-payout)). This is always positive for an LP that stays deposited; more trading volume against the pool means more fee income for the same deposited capital.
- **Impermanent loss**: the value difference between what an LP's withdrawn position is worth versus what simply holding the original two token amounts, unpooled, would have been worth. This can be positive, negative, or zero depending entirely on how the pool's price ratio has moved since deposit, and it's covered precisely, with real computed numbers, in [Impermanent Loss](./impermanent-loss.md).

A pool's fee income can outweigh its impermanent loss, or the reverse can happen; which one dominates depends on trading volume relative to price volatility for that specific pair, and is not something that can be assumed favorably by default.

## Why LPs provide liquidity despite the risk

Fee income is a genuine, recurring yield on deposited capital, generated directly from real trading activity rather than from token emissions or any other inflationary source, which is why liquidity provision remains an actively pursued strategy despite the impermanent loss risk. Pools for asset pairs expected to stay close in relative value (two stablecoins, or a token paired against its own wrapped version) carry structurally lower impermanent loss risk for a given amount of trading volume, which is part of why AMM designs specialized for near-fixed-ratio pairs exist (see [Curve](./curve.md)).

## Common misconceptions

**Being an LP is not equivalent to simply holding both underlying tokens.** The constant-product formula actively rebalances an LP's effective holdings as the pool's price moves, which is a structurally different exposure than a static 50/50 holding of the same two assets, quantified precisely in [Impermanent Loss](./impermanent-loss.md).

**Fee income is not guaranteed to exceed impermanent loss.** Whether a specific pool is profitable for LPs over a given period depends on that pool's actual trading volume and price volatility during that period, both of which vary by pair and by market conditions, and neither of which can be assumed in an LP's favor without checking.

## Further reading

- See also: [Liquidity Pools](./liquidity-pools.md), [Impermanent Loss](./impermanent-loss.md)

---

[← Previous: Liquidity Pools](./liquidity-pools.md)
·
[Back to DeFi](./README.md)
·
[Next: Impermanent Loss →](./impermanent-loss.md)
