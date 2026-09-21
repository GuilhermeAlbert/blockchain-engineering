# Collateral

Every DeFi loan is over-collateralized: the value locked up always exceeds the value borrowed, by a margin the protocol enforces automatically. This chapter covers exactly how that margin is set and why it's structured the way it is, building on the vault mechanism already introduced for stablecoins in [Collateralized Stablecoins](./collateralized-stablecoins.md).

## Loan-to-value ratio

The core number governing any collateralized position is its **loan-to-value ratio (LTV)**: the borrowed amount's value divided by the collateral's value. A protocol sets a maximum LTV for each supported collateral asset, capping how much a borrower can draw out relative to what they've locked up.

```typescript
function loanToValue(borrowedValue: number, collateralValue: number): number {
  return borrowedValue / collateralValue;
}

const example = { collateralETH: 10, ethPrice: 2000, borrowedUSDC: 12_000 };
const collateralValue = example.collateralETH * example.ethPrice; // $20,000
console.log(loanToValue(example.borrowedUSDC, collateralValue)); // 0.6, 60% LTV
```

A borrower locking $20,000 of ETH and drawing $12,000 of USDC is at 60% LTV. If the protocol's maximum LTV for ETH is 75%, this borrower has room to draw more, or room to absorb some price decline, before hitting the cap.

## Why the maximum LTV is well below 100%

The gap between the maximum borrowable LTV and 100% exists to absorb collateral price volatility. If the maximum LTV were 100%, any price drop in the collateral asset, even a small one, would immediately make the position undercollateralized, with no time for anyone (the borrower, or an automated liquidation mechanism) to react before the protocol is left holding collateral worth less than the debt it backs. A lower maximum LTV builds in a buffer sized to the collateral asset's typical volatility: a highly volatile asset gets a lower maximum LTV than a more stable one, because it needs a bigger buffer to give the same practical safety margin.

## Liquidation threshold: a second, higher number

Separately from the maximum LTV a borrower can *open* a position at, protocols set a **liquidation threshold**: a higher LTV percentage at which an existing position becomes eligible for liquidation (see [Liquidations](./liquidations.md)). The gap between maximum LTV (say, 75%) and liquidation threshold (say, 80%) gives a borrower room to keep an already-open position solvent through minor price fluctuations without immediately triggering liquidation the moment their LTV ticks up even slightly from where they opened it.

## Not all collateral assets are treated equally

Protocols set different parameters (maximum LTV, liquidation threshold, and whether an asset is accepted as collateral at all) per asset, based on that asset's liquidity, volatility, and how reliably its price can be determined on-chain (see [Oracles](./oracles.md)). A deeply liquid, lower-volatility asset like ETH typically gets more favorable collateral parameters than a thinly traded, highly volatile token, because a thin market makes both the price feed less reliable and the liquidation process itself (which requires actually selling the seized collateral) harder to execute without significant price impact.

## Common misconceptions

**Collateral is not held by any third party the way a traditional secured loan's collateral might be.** It sits in the protocol's own smart contract, and the borrower retains the ability to withdraw it (up to whatever remains after their outstanding debt) at any time; no bank or company has custody of it.

**A higher collateral value does not mean a lower loan-to-value ratio automatically stays that way.** LTV changes continuously as both the collateral's price and the accruing debt (see [Borrowing](./borrowing.md#interest-accrues-continuously-not-on-a-schedule)) change, so a position opened safely below the maximum LTV can still drift toward the liquidation threshold over time even without the borrower taking any new action.

## Further reading

- [Aave documentation: risk parameters](https://docs.aave.com/risk/asset-risk/risk-parameters)
- See also: [Borrowing](./borrowing.md), [Liquidations](./liquidations.md), [Oracles](./oracles.md)

---

[← Previous: Borrowing](./borrowing.md)
·
[Back to DeFi](./README.md)
·
[Next: Liquidations →](./liquidations.md)
