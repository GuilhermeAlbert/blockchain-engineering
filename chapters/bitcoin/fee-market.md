# Fee Market

Bitcoin's block space is scarce by design (a fixed weight limit per block, produced at a roughly fixed rate (see [Block Time](../blockchain/block-time.md))) and transaction fees are the price mechanism that allocates that scarce resource among competing users. This chapter covers how the fee market actually behaves under varying demand, and its connection to the long-term question examined in [Long-Term Security Budget](./security-budget.md).

## Fees as an auction, revisited

[Transaction Fees](./fees.md) already covered how individual fees are calculated. This chapter is about the **market-level dynamics**: when many transactions compete for limited block space, the fee rate (satoshis per virtual byte) required to get reliably confirmed within a given time window rises and falls with demand. This is an ordinary, if unusually visible and real-time, supply-and-demand price mechanism, directly analogous to how prices for any genuinely scarce, non-storable resource (a hotel room on a specific night, for instance) respond to shifting demand against a fixed supply.

## Observed patterns

Bitcoin's fee market has historically shown clear demand-driven spikes: periods of intense on-chain activity (during major price rallies drawing in new users, or, more recently, during episodes of heavy [inscription](./ordinals.md) activity competing for the same block space as ordinary payments) have produced sharply elevated fee rates and longer effective wait times for lower-fee transactions, followed by fees falling back toward baseline levels once that specific demand surge subsides. This volatility is a direct, mechanical consequence of Bitcoin's fixed block-weight supply meeting variable demand. There's no equivalent of a company scaling up server capacity to meet a traffic spike; block space supply is fixed by consensus rules regardless of demand.

## Fee estimation

Wallets and services trying to help users choose an appropriate fee typically build **fee estimation** models, using recent confirmed-block fee-rate data and current mempool contents to predict what fee rate is likely needed for confirmation within a target number of blocks (e.g., "high priority: next block," "economy: within roughly 6 blocks"). These estimates are inherently probabilistic and can be wrong, particularly during rapidly shifting demand, since they're predictions about near-future network conditions based on recent, but not guaranteed to continue, patterns.

## Why the fee market matters beyond individual transaction cost

Beyond the immediate, practical question of "how much will my transaction cost," the fee market's long-run health is directly tied to Bitcoin's mining security, because (as covered in [Block Rewards](./block-rewards.md#subsidy-versus-total-reward)) total miner revenue is subsidy plus fees, and the subsidy is mechanically, permanently shrinking toward zero (see [The Halving](./halving.md)). A sustained, sufficiently large fee market is the component of miner revenue this shrinking subsidy needs to eventually be replaced by, if Bitcoin's mining security is to remain economically sustainable over the multi-decade horizon toward full issuance (~2140) and beyond, examined directly, including the genuine uncertainty around whether this transition will happen smoothly, in [Long-Term Security Budget](./security-budget.md).

## Common misconceptions

**A "fee market" existing does not mean fees are set by any single party or algorithm controlling prices.** It emerges entirely from the decentralized interaction of many individual users' willingness to pay and miners' independent, profit-motivated selection of which transactions to include, no entity sets fee levels directly.

**Low fees during quiet periods do not indicate a permanently healthy or unhealthy fee market** on their own. Fee market health, in the long-run sense relevant to [Long-Term Security Budget](./security-budget.md), is about the sustained, aggregate trend over years and cycles, not any single snapshot of current conditions.

## Further reading

- See also: [Transaction Fees](./fees.md), [The Mempool](./mempool.md), [Long-Term Security Budget](./security-budget.md)

---

[← Previous: Lost Coins](./lost-coins.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Long-Term Security Budget →](./security-budget.md)
