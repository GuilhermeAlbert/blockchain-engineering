# Block Rewards

A block reward (more precisely, the block **subsidy**) is the newly created bitcoin a miner receives for successfully mining a block, separate from and in addition to whatever transaction fees that block's included transactions pay. This chapter covers exactly how the subsidy is defined and enforced, setting up [The Halving](./halving.md) and [21 Million BTC](./21-million.md).

## Subsidy versus total reward

It's worth being precise about terminology this book uses consistently: the **subsidy** is the newly issued bitcoin, defined entirely by protocol rule and currently, as of writing, 3.125 BTC per block (following the fourth halving, April 2024, see [The Halving](./halving.md) for the full schedule). The **total block reward** a miner actually receives is the subsidy **plus** the sum of every included transaction's fees (see [Transaction Fees](./fees.md)). These two components have very different long-term trajectories: the subsidy shrinks by design over time, while fees depend on network demand for block space, a relationship central to [Fee Market](./fee-market.md) and [Long-Term Security Budget](./security-budget.md).

## How the subsidy is enforced

The subsidy amount is a **consensus rule**, not a suggestion: a coinbase transaction claiming a subsidy larger than the protocol-defined amount for that block's height makes the entire block invalid, rejected by every full node regardless of proof-of-work (see [Coinbase Transactions](./coinbase-transactions.md#what-the-reward-amount-is-and-how-its-checked)). This is enforced identically and automatically by every node's independent validation. There is no central authority tracking or approving miner payouts; the rule is simply part of what every node checks about every block it receives.

## Example: the subsidy formula

```typescript
function blockSubsidySats(blockHeight: number): number {
  const halvingInterval = 210_000;
  const initialSubsidySats = 50 * 100_000_000; // 50 BTC in satoshis
  const halvings = Math.floor(blockHeight / halvingInterval);
  if (halvings >= 64) return 0; // subsidy rounds to zero after 64 halvings
  return Math.floor(initialSubsidySats / Math.pow(2, halvings));
}

for (const height of [0, 209_999, 210_000, 630_000, 840_000, 1_050_000]) {
  console.log(`Block ${height}: subsidy = ${blockSubsidySats(height) / 100_000_000} BTC`);
}
```

Verified output from running this exact code, cross-checked against documented Bitcoin history:

```text
Block 0: subsidy = 50 BTC
Block 209999: subsidy = 50 BTC
Block 210000: subsidy = 25 BTC       (first halving, November 2012)
Block 630000: subsidy = 6.25 BTC     (third halving, May 2020)
Block 840000: subsidy = 3.125 BTC    (fourth halving, April 2024)
Block 1050000: subsidy = 1.5625 BTC  (fifth halving, projected ~2028)
```

## Why the reward goes only to the block's miner, not distributed differently

The subsidy exists specifically as the **initial distribution mechanism and mining incentive** described in the whitepaper's Section 6: paying the entire reward to whoever successfully produces a valid block gives every participant a direct, individual financial incentive to contribute honest computational work to the network, with no need for any central authority to decide who deserves a reward or how much. This is also why mining pools exist (see [Mining Pools](./mining-pools.md)), an individual miner's chance of personally finding a block and collecting the entire reward can be very low relative to their share of total hash power, so pools redistribute rewards proportionally among many participants to reduce this variance, discussed there in depth.

## Common misconceptions

**The block reward is not paid "by" the Bitcoin network as an organization, from any treasury or reserve.** It's newly created bitcoin, defined and enforced entirely by protocol rule. There's no pool of pre-existing funds a reward is drawn from; the total supply itself increases by exactly the subsidy amount each time a block is mined.

**Transaction fees are not part of the "subsidy," even though both are commonly bundled together informally as "the block reward."** This book uses "subsidy" specifically for the newly issued portion and "total reward" for subsidy plus fees combined, a distinction that matters increasingly as the subsidy continues shrinking toward zero, see [Long-Term Security Budget](./security-budget.md).

## Further reading

- [Bitcoin whitepaper, Section 6 (Incentive)](https://bitcoin.org/bitcoin.pdf)
- [Bitcoin Core developer reference: Block chain](https://developer.bitcoin.org/reference/block_chain.html)

---

[← Previous: Nonce](./nonce.md)
·
[Back to Bitcoin](./README.md)
·
[Next: The Halving →](./halving.md)
