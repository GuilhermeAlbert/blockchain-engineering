# Issuance Schedule

This chapter looks at Bitcoin's issuance as a monetary policy curve — not just the mechanics already covered in [Block Rewards](./block-rewards.md) and [The Halving](./halving.md), but what that curve actually looks like over time, and how it compares to the issuance patterns of other monetary assets discussed in [Money and Economics](../economics/README.md).

## The shape of the curve

Bitcoin's issuance is **disinflationary**, not deflationary, in a specific technical sense worth being precise about (see [Inflation and Deflation](../economics/inflation-and-deflation.md)): the supply is still growing — new bitcoin is still being created with every block — but the *rate* of that growth (annual inflation rate, as a percentage of existing supply) continuously falls, stepping down by half at every halving. This is a meaningfully different pattern from a currency with a literally shrinking supply (which would be deflationary in the stricter sense), even though the community and media sometimes use "deflationary" loosely to describe Bitcoin's overall long-run trajectory toward a fixed cap.

## Annual inflation rate over time

```typescript
function annualInflationRate(circulatingSupplyBTC: number, blocksPerYear: number, subsidyBTC: number): number {
  const newSupplyPerYear = subsidyBTC * blocksPerYear;
  return (newSupplyPerYear / circulatingSupplyBTC) * 100;
}

const BLOCKS_PER_YEAR = Math.round((365.25 * 24 * 60) / 10); // ~52,596 blocks/year at 10-min average

// Illustrative circulating-supply snapshots at various points — not live data.
console.log("~2013 (post-1st halving, ~11M BTC circulating):", annualInflationRate(11_000_000, BLOCKS_PER_YEAR, 25).toFixed(2), "%");
console.log("~2021 (post-3rd halving, ~18.6M BTC circulating):", annualInflationRate(18_600_000, BLOCKS_PER_YEAR, 6.25).toFixed(2), "%");
console.log("~2024 (post-4th halving, ~19.7M BTC circulating):", annualInflationRate(19_700_000, BLOCKS_PER_YEAR, 3.125).toFixed(2), "%");
```

Verified output from running this exact code:

```text
~2013 (post-1st halving, ~11M BTC circulating): 11.95 %
~2021 (post-3rd halving, ~18.6M BTC circulating): 1.77 %
~2024 (post-4th halving, ~19.7M BTC circulating): 0.83 %
```

The circulating-supply figures used are illustrative approximations for the stated eras, not precise, sourced historical snapshots — replace with cited figures from a block-explorer supply history before treating any specific percentage as authoritative for a specific date.

The clear pattern regardless of exact figures: because both the subsidy per block *and* (following each halving) its share of an ever-growing existing supply are falling, the annual inflation rate declines considerably faster than a simple "halving the subsidy" description alone might suggest — each successive halving cuts new issuance in half while dividing it into an already-larger base.

## Comparison to other monetary assets

Gold's annual production has historically added roughly 1-2% to the existing global above-ground gold stock in most years (see [Commodity Money](../economics/commodity-money.md)), a figure that has been relatively — though not perfectly — stable over long periods, since gold mining output responds to price and extraction technology rather than following any fixed schedule. Fiat currency supply growth, discussed in [Money Supply](../economics/money-supply.md), varies considerably by country and period, and is a matter of ongoing central bank discretion rather than a fixed schedule at all (see [Monetary Policy](../economics/monetary-policy.md)). Bitcoin's issuance, by contrast, is the only major monetary asset covered in this book with a **publicly known, mathematically fixed schedule extending decades into the future**, verifiable by anyone rather than dependent on geological luck, extraction technology, or institutional discretion — a genuinely distinctive property, independent of any judgment about whether that predictability is, on net, beneficial (a question this book examines from multiple angles in [Austrian Economics and Bitcoin](../economics/austrian-economics-and-bitcoin.md) and [Critiques of Bitcoin as Money](../economics/bitcoin-criticism.md)).

## Common misconceptions

**A falling inflation rate does not mean the circulating supply is shrinking.** New bitcoin continues to be created at every block until the last subsidy is mined around 2140 — the *rate* of growth falls, not the total amount in existence.

**The issuance schedule is not adjustable in response to demand, price, or economic conditions** — unlike gold (where higher prices can incentivize more extraction) or fiat currency (where a central bank can expand supply in response to a crisis), Bitcoin's issuance follows its fixed schedule regardless of any external economic condition, a deliberate design choice examined from multiple sides throughout the [Economics](../economics/README.md) section.

## Further reading

- [Bitcoin Core source: subsidy calculation](https://github.com/bitcoin/bitcoin/blob/master/src/validation.cpp)
- See also: [21 Million BTC](./21-million.md), [The Halving](./halving.md)

---

[← Previous: 21 Million BTC](./21-million.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Stock-to-Flow →](./stock-to-flow.md)
