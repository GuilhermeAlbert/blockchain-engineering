# Liquidations

Liquidation is the automated process that closes out an undercollateralized position before its debt can exceed its collateral's value. This chapter works through a complete, verified numeric example of a position getting liquidated, and covers who actually performs liquidations and why they're incentivized to do it.

## When liquidation triggers

Recall the liquidation threshold from [Collateral](./collateral.md#liquidation-threshold-a-second-higher-number): a loan-to-value ratio above which a position becomes eligible for liquidation. A position's LTV rises when its collateral's price falls, its debt grows from accruing interest, or both; once LTV crosses the threshold, anyone (not just the protocol itself) can call the liquidation function against that specific position.

## A complete worked example

A borrower locks 10 ETH as collateral when ETH trades at $2,000, for $20,000 of collateral value, and borrows $12,000 of USDC against it:

```typescript
const collateralETH = 10;
const initialPrice = 2000;
const borrowed = 12_000;

const collateralValue = collateralETH * initialPrice; // $20,000
const initialLTV = borrowed / collateralValue;
console.log(initialLTV); // 0.6, opened at 60% LTV
```

Suppose the protocol's liquidation threshold for ETH is 80%. Solving for the ETH price at which this specific position's LTV reaches exactly 80%:

```typescript
const liquidationThreshold = 0.80;
const liquidationPrice = borrowed / (collateralETH * liquidationThreshold);
console.log(liquidationPrice); // 1500

const collateralValueAtLiquidation = collateralETH * liquidationPrice; // $15,000
console.log(borrowed / collateralValueAtLiquidation); // 0.8, exactly the threshold
```

If ETH's price falls from $2,000 to $1,500, a 25% decline, this position's collateral value falls to $15,000 against the same $12,000 debt, an LTV of exactly 80%: the liquidation threshold. At this point, the position becomes eligible for liquidation.

## Who performs liquidations, and why

Liquidation isn't performed by the protocol's team or any centralized process. It's an open, permissionless function any address can call, and it's profitable to do so: a liquidator repays some or all of a position's outstanding debt on the borrower's behalf, and in exchange receives an equivalent value of the position's collateral *plus a bonus*, typically a discount of a few percent below the collateral's market price.

```typescript
const repayAmount = 5_000; // a liquidator repays part of the debt
const liquidationBonus = 0.08; // 8% bonus, protocol-specific
const priceAtLiquidation = 1500;

const collateralSeizedValue = repayAmount * (1 + liquidationBonus); // $5,400
const collateralSeizedETH = collateralSeizedValue / priceAtLiquidation; // 3.6 ETH
const liquidatorProfit = collateralSeizedValue - repayAmount; // $400

console.log({ collateralSeizedETH, liquidatorProfit });
```

A liquidator repaying $5,000 of the borrower's debt receives $5,400 worth of ETH (3.6 ETH at $1,500), a $400 profit for the transaction, funded by the discount built into the liquidation bonus. This bonus is what makes liquidation a competitive, automated market: bots continuously monitor open positions across the protocol, ready to liquidate the instant any position crosses its threshold, which is why undercollateralized positions on major protocols are typically liquidated within the same block they become eligible, not left sitting exposed.

## Why the bonus comes from the borrower, not the protocol

The liquidation bonus isn't a subsidy the protocol pays; it comes directly out of the liquidated borrower's own collateral. A borrower who gets liquidated loses more collateral value than the debt actually repaid, exactly the size of the bonus, which is the real cost of letting a position drift into liquidation range rather than adding collateral or repaying debt proactively. This is a deliberate design choice: the loss falls on the party whose position created the risk, not on the pool's other depositors, who remain protected as long as liquidations happen promptly enough to close positions before their debt actually exceeds their collateral value.

## Common misconceptions

**Liquidation does not mean losing all of a position's collateral.** Only enough collateral to cover the repaid debt plus the liquidation bonus is seized; if a liquidator only repays part of the debt (a common protocol-imposed limit, to avoid one liquidation forcibly closing an entire large position at once), the borrower keeps whatever collateral remains after that partial liquidation.

**A liquidation bonus is not free money independent of risk.** A liquidator still needs to actually acquire the repayment asset, execute the liquidation transaction before a competing liquidator does, and often sell the seized collateral afterward, all of which carry real transaction costs and competitive risk (see [MEV](../security/mev.md)) that erode the theoretical profit shown above.

## Further reading

- [Aave documentation: liquidations](https://docs.aave.com/faq/liquidations)
- See also: [Collateral](./collateral.md), [Borrowing](./borrowing.md), [Oracle Manipulation](../security/oracle-manipulation.md)

---

[← Previous: Collateral](./collateral.md)
·
[Back to DeFi](./README.md)
·
[Next: Flash Loans →](./flash-loans.md)
