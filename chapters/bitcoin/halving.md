# The Halving

Every 210,000 blocks (roughly every four years) Bitcoin's block subsidy cuts exactly in half. This chapter covers the mechanism (already shown formulaically in [Block Rewards](./block-rewards.md#example-the-subsidy-formula)), the actual historical halving dates, and why this specific schedule matters for how Bitcoin's supply grows.

## The schedule, exactly

The subsidy starts at 50 BTC and halves every 210,000 blocks, continuing until, after 64 halvings, the subsidy rounds down to zero under Bitcoin Core's integer-satoshi arithmetic (since repeatedly halving a whole number of satoshis eventually reaches zero, rather than continuing indefinitely as a fraction), projected, at roughly four years per halving, to occur around the year 2140.

| Halving | Approximate date | Block height | Subsidy before → after |
| --- | --- | --- | --- |
| Genesis | January 3, 2009 | 0 |, → 50 BTC |
| 1st | November 28, 2012 | 210,000 | 50 → 25 BTC |
| 2nd | July 9, 2016 | 420,000 | 25 → 12.5 BTC |
| 3rd | May 11, 2020 | 630,000 | 12.5 → 6.25 BTC |
| 4th | April 19-20, 2024 | 840,000 | 6.25 → 3.125 BTC |
| 5th (projected) | ~April 2028 | 1,050,000 | 3.125 → 1.5625 BTC |

Projected dates for future halvings are estimates based on the average 10-minute block time. The actual date depends on the network's real historical block timing up to that point, and will only be known precisely once it happens.

## Why every 210,000 blocks specifically

210,000 blocks at a 10-minute average block time works out to almost exactly four years (210,000 × 10 minutes ÷ 60 ÷ 24 ÷ 365.25 ≈ 3.99 years). This specific number appears to have been chosen by Satoshi for this approximate four-year cadence, though (consistent with this book's general approach to unverified claims about Satoshi's private reasoning) no known public writing definitively explains the exact choice of "four years" as a target beyond it being a plausible, round-ish design decision. TODO: check Satoshi's mailing-list and forum archives for any direct statement about the reasoning behind the 210,000-block interval before stating a specific motivation as documented fact.

## Why halvings matter beyond the subsidy number itself

Each halving directly shifts the ratio between block subsidy and transaction fees within total miner revenue (see [Block Rewards](./block-rewards.md#subsidy-versus-total-reward)), which has two, related, longer-term implications covered fully elsewhere in this book: it puts a mechanical, predictable downward pressure on new supply issuance (see [21 Million BTC](./21-million.md) and [Issuance Schedule](./issuance.md)), and it raises the practical question of whether transaction fees alone will eventually need to support Bitcoin's mining security budget once the subsidy has shrunk to a negligible amount, examined directly in [Long-Term Security Budget](./security-budget.md).

## Halvings and mining economics

A halving is, from a pure mining-revenue perspective, an overnight 50% cut to subsidy income for every miner, with no corresponding change to their electricity or hardware costs. This has historically put pressure on the least efficient miners (older or less power-efficient hardware, or those paying above-average electricity rates) to shut down shortly after a halving if Bitcoin's price and fee revenue haven't risen enough to compensate, after which the [difficulty adjustment](./difficulty-adjustment.md) responds to the resulting hash power decline by lowering difficulty, restoring profitability for the remaining, more efficient miners. This adjustment process has occurred, in some form, after each historical halving to date, though the specific magnitude and timing of hash power changes around each halving is an empirical question better answered by examining actual historical hash rate data than asserted as a fixed pattern.

## Common misconceptions

**A halving does not directly and immediately change Bitcoin's price** through any mechanical protocol effect. It changes the *rate of new supply issuance*, and any price effect depends entirely on how demand responds relative to that supply change, a market dynamic this book does not treat as predictable or guaranteed (see [Stock-to-Flow](./stock-to-flow.md) for a specific, contested model that attempts to link the two, and its documented criticisms).

**Existing bitcoin holdings are not affected by a halving in any way.** Only the rate of *newly created* bitcoin changes. Nobody's existing balance is reduced, split, or altered.

## Further reading

- [Bitcoin Core source: subsidy calculation](https://github.com/bitcoin/bitcoin/blob/master/src/validation.cpp)
- See also: [Block Rewards](./block-rewards.md), [21 Million BTC](./21-million.md)

---

[← Previous: Block Rewards](./block-rewards.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Mining Pools →](./mining-pools.md)
