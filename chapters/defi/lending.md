# Lending

DeFi lending protocols (Aave and Compound are the two most widely used) let anyone deposit crypto assets to earn interest, drawn from a pool other users borrow against. This chapter covers the pooled lending model that both protocols share, before the next three chapters cover borrowing, collateral, and liquidations in detail.

## The pooled model, not peer-to-peer matching

A DeFi lending protocol doesn't match individual lenders to individual borrowers the way a traditional bilateral loan does. Instead, every depositor's funds for a given asset go into one shared pool, and every borrower of that asset borrows from the same shared pool. A depositor never has a specific counterparty; their claim is on a share of the pool as a whole, and the pool's smart contract tracks exactly how much of it belongs to each depositor.

```typescript
// Simplified pooled-lending accounting.
interface Pool {
  totalDeposited: number;
  totalBorrowed: number;
}

function utilizationRate(pool: Pool): number {
  return pool.totalBorrowed / pool.totalDeposited;
}

const usdcPool: Pool = { totalDeposited: 10_000_000, totalBorrowed: 6_000_000 };
console.log(utilizationRate(usdcPool)); // 0.6, 60% utilized
```

**Utilization** (the fraction of a pool's deposits currently lent out) is the central variable these protocols track, because it directly drives interest rates.

## Interest rates set by utilization, not by a central decision

Both the interest rate depositors earn and the rate borrowers pay are computed algorithmically from a pool's current utilization, via a formula set by protocol governance, not decided manually for each loan. As utilization rises toward 100% (a pool with little spare liquidity left to lend), the borrow rate rises sharply, discouraging further borrowing and encouraging new deposits; as utilization falls, rates fall too. This creates a self-correcting mechanism keeping a pool from being fully drained: a rate curve that spikes near full utilization gives borrowers a strong incentive to repay, and depositors a strong incentive to add liquidity, exactly when the pool needs it most.

```typescript
// A simplified, illustrative version of the kind of kinked rate curve
// Aave and Compound actually use: a gentle slope below a target
// utilization, then a much steeper slope above it.
function borrowRate(utilization: number, kink = 0.8): number {
  const baseRate = 0.02;
  if (utilization <= kink) {
    return baseRate + (utilization / kink) * 0.08; // up to 10% at the kink
  }
  const excessUtilization = (utilization - kink) / (1 - kink);
  return 0.10 + excessUtilization * 0.5; // steep climb toward 60% near 100%
}

console.log(borrowRate(0.6));  // 0.08, moderate rate at 60% utilization
console.log(borrowRate(0.95)); // 0.4749..., much steeper past the 80% kink
```

Depositor interest is always lower than borrower interest for the same pool; the difference (sometimes going to a protocol reserve, sometimes purely a function of the rate curve's own math) is how these protocols remain solvent, since every dollar paid out to depositors has to come from somewhere.

## Why lenders don't need to trust individual borrowers

Unlike a traditional loan, a DeFi lending protocol never performs a credit check or relies on a borrower's identity or reputation at all. Every loan is fully collateralized by crypto assets the borrower has locked in the same protocol (covered fully in [Collateral](./collateral.md)), and an automated [liquidation](./liquidations.md) mechanism protects the pool if that collateral's value falls too far. This is what makes pooled, permissionless lending possible at all: the protocol's solvency depends entirely on collateral and code, not on any borrower's willingness or ability to repay based on trust.

## Common misconceptions

**Depositing into a lending pool is not risk-free just because it's collateralized by other users' assets.** The protocol's smart contract code itself carries risk (a bug or exploit, see [Smart Contract Auditing](../security/auditing.md)), and extreme market conditions can, in rare cases, cause a pool's liquidation mechanism to fail to fully cover a borrower's debt before their collateral value falls below what's owed, leaving depositors exposed to that shortfall.

**A DeFi lending protocol's interest rates are not set by a company or committee deciding what's profitable.** They're computed directly from the pool's own utilization via a formula, which is why rates can change from block to block as deposits and borrows happen, unlike a bank's periodically-set rate.

## Further reading

- [Aave documentation](https://docs.aave.com/)
- [Compound documentation](https://docs.compound.finance/)
- See also: [Borrowing](./borrowing.md), [Collateral](./collateral.md), [Aave](./aave.md)

---

[← Previous: Slippage](./slippage.md)
·
[Back to DeFi](./README.md)
·
[Next: Borrowing →](./borrowing.md)
