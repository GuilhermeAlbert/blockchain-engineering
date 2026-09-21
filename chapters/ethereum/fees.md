# Gas Price and Fees

This chapter covers how Ethereum actually prices gas, the pre-2021 simple auction model, and the base-fee-and-tip mechanism EIP-1559 replaced it with, including the specific formula that adjusts the base fee block by block.

## Before EIP-1559: a first-price auction

Ethereum's original fee model had senders specify a single `gasPrice` (how much they'd pay per unit of gas) and miners, naturally profit-maximizing, prioritized whichever pending transactions offered the highest gas price. This is a classic **first-price auction**: bidders pay exactly what they bid, which creates a well-documented economic inefficiency. Bidders have an incentive to overbid out of uncertainty about what others are bidding, since underbidding risks not getting included at all, and there's no way to know the "just barely enough" price in advance.

## EIP-1559: base fee plus tip

The **London upgrade** (August 5, 2021) replaced this with a model splitting the fee into two components:

- **Base fee**: a protocol-calculated minimum fee per unit of gas, **burned** (permanently destroyed, not paid to anyone), not set by the sender's bid at all, but algorithmically determined by recent network demand.
- **Priority fee (tip)**: an additional amount the sender chooses to pay directly to the block's proposer, as an incentive to prioritize their transaction over others competing for the same block space.

A sender specifies `maxFeePerGas` (the absolute ceiling they're willing to pay per gas, covering both base fee and tip) and `maxPriorityFeePerGas` (the tip ceiling); the actual amount charged is `min(maxFeePerGas, baseFee + maxPriorityFeePerGas)`, with the tip portion capped so it never exceeds `maxFeePerGas - baseFee`.

## The base fee adjustment formula

Each block has a **target gas usage** (historically 15 million gas, with a **maximum** of 30 million, the target being exactly half the max, by design) and the base fee adjusts block-by-block based on how full the *previous* block was relative to that target:

```text
if previous block gas used > target:
    new base fee = old base fee × (1 + (excess / target) × (1/8))    [rises, capped at 12.5% per block]
if previous block gas used < target:
    new base fee = old base fee × (1 − (deficit / target) × (1/8))   [falls, capped at 12.5% per block]
if previous block gas used == target:
    new base fee = old base fee                                       [unchanged]
```

## Example: simulating the base fee over several blocks

```typescript
function nextBaseFee(currentBaseFee: bigint, gasUsed: bigint, gasTarget: bigint): bigint {
  if (gasUsed === gasTarget) return currentBaseFee;
  if (gasUsed > gasTarget) {
    const delta = currentBaseFee * (gasUsed - gasTarget) / gasTarget / 8n;
    return currentBaseFee + (delta > 0n ? delta : 1n);
  }
  const delta = currentBaseFee * (gasTarget - gasUsed) / gasTarget / 8n;
  return currentBaseFee - delta;
}

const GAS_TARGET = 15_000_000n;
let baseFee = 20_000_000_000n; // 20 gwei, illustrative starting point

// Simulate three consecutive fully-packed blocks (30M gas used = 2x target)
for (let block = 1; block <= 3; block++) {
  baseFee = nextBaseFee(baseFee, 30_000_000n, GAS_TARGET);
  console.log(`After full block ${block}: base fee = ${baseFee / 1_000_000_000n} gwei (${baseFee} wei)`);
}
```

Verified output from running this exact code:

```text
After full block 1: base fee = 22 gwei (22500000000 wei)
After full block 2: base fee = 25 gwei (25312500000 wei)
After full block 3: base fee = 28 gwei (28476562500 wei)
```

Each fully-packed block raises the base fee by exactly 12.5% over the previous block, compounding, a real, documented dynamic during periods of sustained high demand, capable of roughly doubling the base fee in about six consecutive fully-packed blocks if demand stays that high.

## Why this design: predictability over auction efficiency

EIP-1559's goal wasn't primarily to lower fees (during sustained high demand, fees under EIP-1559 can still be high) but to make fee **estimation** more predictable: since the base fee is algorithmically determined and publicly known before a transaction is even constructed, wallets can estimate an appropriate `maxFeePerGas` with much less guesswork than the old first-price auction required, reducing the systematic overbidding problem described above.

## Why the base fee is burned, not paid to validators

Burning the base fee (rather than paying it to whoever produces the block) removes a specific incentive problem: if the base fee were paid to block producers, they'd have a direct financial incentive to artificially inflate demand or manipulate the adjustment mechanism to push the base fee higher. Burning it makes the base fee a pure function of genuine, organic network demand with no party benefiting from manipulating it, and as a side effect, ties Ethereum's total ether supply growth inversely to network usage, a connection covered further in [Ethereum State](./state.md) and the broader monetary policy discussion in [Money Supply](../economics/money-supply.md).

## Common misconceptions

**EIP-1559 did not eliminate the possibility of high fees**, during periods of sustained high demand, the base fee rises to reflect that demand, and total fees can still be substantial; the change improved fee *predictability* and reduced auction-driven overbidding, not the underlying scarcity of block space itself.

**The base fee is not paid to miners or validators at all**. Only the priority fee (tip) is; this is a frequently misunderstood detail, since pre-EIP-1559 intuition (all fees go to whoever produces the block) doesn't carry over to the post-EIP-1559 model.

## Further reading

- [EIP-1559: Fee market change for ETH 1.0 chain](https://eips.ethereum.org/EIPS/eip-1559)

---

[← Previous: Gas](./gas.md)
·
[Back to Ethereum](./README.md)
·
[Next: Ethereum Blocks →](./blocks.md)
