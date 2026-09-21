# Borrowing

Borrowing from a DeFi lending pool means locking collateral and drawing out a different asset against it, with no identity check and no fixed repayment schedule. This chapter covers the borrower's side of the pooled lending model introduced in [Lending](./lending.md): how a loan is opened, how interest accrues, and how repayment actually works.

## Opening a borrow position

A borrower first deposits collateral into the protocol (see [Collateral](./collateral.md) for how much is required), then calls a borrow function specifying which asset and how much they want to draw out. The protocol checks the requested amount against the collateral's value and the protocol's maximum loan-to-value ratio for that asset before releasing the funds; if the request would exceed the allowed ratio, the transaction simply reverts. There's no approval process beyond this on-chain check, no waiting period, and no requirement that the borrower ever intends to use the borrowed funds for anything specific.

## Interest accrues continuously, not on a schedule

Once a position is open, interest accrues on the borrowed amount continuously, compounding with every block rather than on a monthly or annual schedule the way a traditional loan does. Protocols track this with an internally maintained interest index: each borrower's actual owed balance is computed by multiplying their originally borrowed amount by however much that index has grown since they borrowed, rather than the protocol storing and updating every individual borrower's balance on every single block (which would be prohibitively expensive in gas).

```typescript
// Simplified interest-index accounting, the pattern Aave and Compound
// both use to avoid updating every borrower's balance on every block.
interface BorrowPosition {
  principalBorrowed: number;
  borrowIndexAtOpen: number;
}

function currentDebt(position: BorrowPosition, currentBorrowIndex: number): number {
  return position.principalBorrowed * (currentBorrowIndex / position.borrowIndexAtOpen);
}

const position: BorrowPosition = { principalBorrowed: 10_000, borrowIndexAtOpen: 1.0 };
// Some time later, accrued interest has grown the pool's borrow index:
console.log(currentDebt(position, 1.05)); // 10500, 5% accrued since borrowing
```

## No fixed term or repayment schedule

Unlike a traditional loan, a DeFi borrow position has no maturity date and no required minimum payment. A borrower can repay any amount at any time, partially or in full, and interest simply stops accruing on whatever principal has been repaid. The position can, in principle, stay open indefinitely, as long as the collateral backing it remains sufficient relative to the growing debt as interest accrues, which is exactly the condition [Liquidations](./liquidations.md) exists to enforce once it stops being true.

## Why a borrower would do this instead of just selling their asset

Borrowing against collateral rather than selling it outright lets a holder access liquidity (stablecoins to spend, or a different asset to deploy elsewhere) without triggering a taxable sale in many jurisdictions, and without giving up the collateral's potential future price appreciation or its own yield if it's a staking or interest-bearing asset. This is the same basic motivation behind a securities-backed loan in traditional finance, applied to on-chain assets with a smart contract enforcing the terms instead of a bank's credit department.

## Common misconceptions

**Borrowing from a DeFi protocol does not require repaying by any specific date.** The position can stay open as long as it remains sufficiently collateralized; what actually forces action is the collateral ratio approaching the liquidation threshold, not the passage of time itself.

**A larger borrowed amount does not mean a larger risk of liquidation by itself.** What matters is the loan-to-value ratio (borrowed value relative to collateral value), not the absolute size of either number; a small position at 75% LTV is closer to liquidation than a large position at 30% LTV.

## Further reading

- [Aave documentation: borrowing](https://docs.aave.com/faq/borrowing-and-repaying)
- See also: [Lending](./lending.md), [Collateral](./collateral.md), [Liquidations](./liquidations.md)

---

[← Previous: Lending](./lending.md)
·
[Back to DeFi](./README.md)
·
[Next: Collateral →](./collateral.md)
