# 21 Million BTC

Bitcoin's total supply approaches, but never exceeds, 21 million coins. This chapter covers where that specific number comes from, mechanically, and treats a question this book's economics section raised but didn't fully resolve: what "21 million" actually guarantees, and what it doesn't.

## Where the number comes from

21 million isn't a number Satoshi chose directly — it's the mathematical result of the subsidy schedule covered in [Block Rewards](./block-rewards.md) and [The Halving](./halving.md): starting at 50 BTC per block, halving every 210,000 blocks, continuing until the subsidy rounds to zero. Summing this entire geometric series of block rewards produces a total that converges to almost exactly 21 million:

```typescript
function totalSupplyAtHalving(halvings: number): number {
  const halvingInterval = 210_000;
  const initialSubsidySats = 50 * 100_000_000;
  let total = 0;
  for (let h = 0; h <= halvings; h++) {
    const subsidyThisEra = Math.floor(initialSubsidySats / Math.pow(2, h));
    if (subsidyThisEra === 0) break;
    total += subsidyThisEra * halvingInterval;
  }
  return total / 100_000_000; // convert back to BTC
}

console.log("Approximate total supply after all halvings (BTC):", totalSupplyAtHalving(64));
```

Verified output from running this exact code:

```text
Approximate total supply after all halvings (BTC): 20999999.9769
```

This matches the well-documented figure — not exactly 21,000,000, due to the integer-satoshi rounding applied at each halving.

## Why it's not exactly 21,000,000

Because each halving rounds the subsidy down to a whole number of satoshis (Bitcoin has no sub-satoshi unit), the actual mathematical sum of the entire series converges to a figure very slightly below 21 million — commonly cited as approximately 20,999,999.9769 BTC — due to the cumulative effect of this rounding across many halvings. This is a well-known, if minor, technical footnote: colloquially, "21 million" is accurate to how the figure is universally referred to and understood, even though the precise mathematical total is a small fraction below it.

## What the fixed cap actually guarantees

This is worth stating with precision, connecting back to [Money Supply](../economics/money-supply.md): the 21 million figure is a **hard, protocol-enforced ceiling on newly issued coins through mining**, checkable by anyone running a full node (see [Full Nodes](./full-nodes.md)) — no central authority decides or could unilaterally change this number without a coordinated, network-wide change to the consensus rules that node operators, miners, and the broader ecosystem would need to actually adopt (see [Bitcoin Governance](../forks/governance.md)). It does **not** guarantee that exactly 21 million coins will ever be in active, usable circulation — some portion is permanently lost (see [Lost Coins](./lost-coins.md)) or unspendable by design (like the [genesis block's](../origins/genesis-block.md#what-is-in-it) unspendable coinbase output), meaning the realistic circulating, spendable supply has always been, and will likely remain, somewhat below the theoretical maximum.

## Could the 21 million cap be changed?

Technically, yes, in the same sense any consensus rule could technically be changed: a coordinated hard fork (see [Hard Forks](../forks/hard-forks.md)) adopted by an overwhelming share of node operators, miners, and users could alter it. In practice, this is considered extraordinarily unlikely and would face immense, near-universal community resistance, since the fixed supply is widely regarded — across essentially the full range of Bitcoin's user base, regardless of other internal disagreements — as one of the protocol's most fundamental, load-bearing properties; a change of this kind would almost certainly be rejected by the overwhelming majority of the community and would likely simply create a separate, alternative chain with little adoption relative to the original, unchanged Bitcoin, following the same dynamic discussed in [Forks and Protocol Upgrades](../forks/README.md).

## Common misconceptions

**"21 million" refers to bitcoin, the unit, not to some other measure like transactions or addresses.** Total addresses, total wallets, and total transactions are all unrelated, unbounded figures — only the total issued coin count is capped.

**The cap does not mean Bitcoin becomes "unusable" once fully issued.** After the last subsidy is mined (projected around 2140), miners continue earning revenue entirely from transaction fees — a transition examined directly in [Long-Term Security Budget](./security-budget.md), which is a genuine, debated open question, but a distinct one from whether the currency itself continues to function.

## Further reading

- [Bitcoin Core source: subsidy and total supply calculation](https://github.com/bitcoin/bitcoin/blob/master/src/validation.cpp)
- See also: [The Halving](./halving.md), [Issuance Schedule](./issuance.md)

---

[← Previous: Energy Consumption](./energy.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Issuance Schedule →](./issuance.md)
