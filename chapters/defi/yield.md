# Yield

"Yield" in DeFi covers several structurally different sources of return, often bundled together under one number in a protocol's interface without distinguishing where it actually comes from. This chapter breaks down those sources, and works through the APR-versus-APY distinction that shows up on nearly every yield figure quoted in the space.

## Where DeFi yield actually comes from

Every yield-bearing DeFi position ultimately traces back to one of a small number of underlying sources, and understanding which one applies to a specific position is the difference between evaluating real, sustainable return and evaluating something that depends on continued token inflation:

- **Trading fees**: an LP's share of swap fees, covered fully in [Liquidity Providers](./liquidity-providers.md#the-two-components-of-lp-return). Real yield, generated directly from trading activity, but paired with impermanent loss risk.
- **Interest from borrowers**: a lender's share of interest paid by borrowers in a pooled lending market, covered in [Lending](./lending.md#interest-rates-set-by-utilization-not-by-a-central-decision). Real yield, funded by actual borrowing demand.
- **Staking rewards**: newly issued tokens or a share of protocol revenue paid to those who lock a token toward the protocol's own consensus or governance function, covered separately in [Staking vs. Lending](./staking-vs-lending.md).
- **Token emissions ("liquidity mining")**: a protocol distributing its own newly minted governance token to incentivize an activity (usually depositing into a specific pool), on top of whatever organic yield that activity already generates. This is the source most responsible for eye-catching, triple-digit "APY" figures, and it's fundamentally different from the sources above: it's paid from token inflation, not from any underlying economic activity, and its value depends entirely on the emitted token maintaining its price, which heavy selling pressure from yield farmers themselves often works against.

A yield figure that doesn't specify which of these it's built from, or that blends several together into one headline number, doesn't give enough information to judge whether it's durable.

## APR versus APY: the compounding question

**APR** (annual percentage rate) is a simple, non-compounded annual rate. **APY** (annual percentage yield) accounts for compounding: reinvesting earned yield so it itself starts earning yield, which produces a higher effective annual return than the stated APR for the same underlying rate.

```typescript
function aprToApy(apr: number, compoundsPerYear: number): number {
  return Math.pow(1 + apr / compoundsPerYear, compoundsPerYear) - 1;
}

const apr = 0.10; // 10% APR
console.log(aprToApy(apr, 365)); // 0.10515578..., about 10.52% APY with daily compounding
console.log(aprToApy(apr, 52));  // 0.10506479..., about 10.51% APY with weekly compounding
```

A 10% APR compounded daily works out to roughly 10.52% APY, a gap that widens as either the rate or the compounding frequency increases. Many DeFi interfaces quote APY assuming a specific, often optimistic, auto-compounding frequency that a user isn't actually achieving unless they're using a vault or strategy that automatically reinvests on that same schedule; manually compounding by hand incurs real, repeated gas costs each time, which can consume a meaningful share of the theoretical benefit for smaller position sizes.

## Why very high yield figures deserve scrutiny, not excitement

A protocol advertising an APY far above what trading fees or lending interest alone could plausibly generate is very likely paying most of that yield in freshly emitted governance tokens, whose market price the yield figure typically assumes stays constant, an assumption heavy selling from yield farmers routinely breaks. A yield figure is only as meaningful as the sustainability of its underlying source; comparing a fee-based yield to an emissions-based yield as if they were the same kind of number is a common, costly category error.

## Common misconceptions

**A high quoted APY is not automatically better than a lower one.** The composition matters more than the headline number: a lower yield built entirely from trading fees or lending interest can be a fundamentally sounder position than a higher yield that's mostly emissions of a token likely to depreciate as more of it enters circulation.

**APY is not a guarantee of future return.** Nearly every DeFi yield figure is a snapshot of a current, variable rate (from utilization, trading volume, or emission schedules that themselves change), not a fixed, locked-in return over any specific future period.

## Further reading

- See also: [Liquidity Providers](./liquidity-providers.md), [Lending](./lending.md), [Staking vs. Lending](./staking-vs-lending.md)

---

[← Previous: Oracles](./oracles.md)
·
[Back to DeFi](./README.md)
·
[Next: Staking vs. Lending →](./staking-vs-lending.md)
