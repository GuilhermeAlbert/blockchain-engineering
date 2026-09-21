# Transaction Batching

Batching combines multiple payments into a single on-chain transaction, sharing one set of overhead (a transaction's fixed fields, version, locktime, and so on) across many payments rather than paying that overhead separately for each. This chapter covers the mechanism and why it's disproportionately valuable for high-volume senders like exchanges.

## How it works

Recall from [Inputs and Outputs](../bitcoin/inputs-and-outputs.md#multiple-inputs-multiple-outputs) that nothing restricts a transaction to a single output. One transaction can pay many recipients simultaneously. A business processing, say, 100 individual customer withdrawals could either broadcast 100 separate transactions (each with its own version field, input(s), and locktime overhead) or construct a single transaction with 100 outputs, one per recipient, sharing that fixed overhead once instead of 100 times.

## Example: the fee savings, quantified

```typescript
// Illustrative per-transaction weight estimates, not live network data.
const FIXED_OVERHEAD_WU = 42 * 4;       // version, locktime, counts (roughly, in weight units)
const PER_INPUT_WU = 68 * 4;             // one typical legacy input
const PER_OUTPUT_WU = 31 * 4;            // one typical output

function separateTransactionsWeight(count: number): number {
  return count * (FIXED_OVERHEAD_WU + PER_INPUT_WU + PER_OUTPUT_WU);
}

function batchedTransactionWeight(count: number): number {
  return FIXED_OVERHEAD_WU + PER_INPUT_WU + count * PER_OUTPUT_WU; // one shared input, many outputs
}

const recipientCount = 100;
const separate = separateTransactionsWeight(recipientCount);
const batched = batchedTransactionWeight(recipientCount);

console.log(`${recipientCount} separate transactions: ${separate} weight units`);
console.log(`1 batched transaction: ${batched} weight units`);
console.log(`Savings: ${(((separate - batched) / separate) * 100).toFixed(1)}%`);
```

Verified output from running this exact code:

```text
100 separate transactions: 56400 weight units
1 batched transaction: 12840 weight units
Savings: 77.2%
```

The per-field weight constants used are illustrative approximations, not derived from a specific, cited real transaction, replace with values computed from an actual serialized transaction if precision matters for a specific use case. The scale of the savings (dominated by no longer paying the fixed overhead and a separate input 99 extra times) is the real point, not the exact percentage.

## Who benefits most, and why

Batching's savings scale with the number of payments combined, which is why it's disproportionately valuable for high-volume senders (exchanges processing customer withdrawals, mining pools distributing payouts to many participants (see [Mining Pools](../bitcoin/mining-pools.md#example-reward-distribution-under-pplns)), and payroll-like services) rather than for an individual sending one payment. Several major exchanges have publicly documented adopting scheduled batching (collecting withdrawal requests over a window of time and processing them together) specifically to reduce their aggregate on-chain footprint and fees.

## Tradeoffs

Batching's fee savings come at the cost of **latency**: recipients in a batch generally wait for the batch window to close (whatever interval the sender uses, anywhere from minutes to hours, depending on the service) rather than receiving an immediately broadcast transaction. It's a direct latency-for-cost tradeoff, reasonable for routine, non-urgent payouts and less appropriate for anything requiring immediate settlement.

## Common misconceptions

**Batching does not change what any individual recipient can do with their payment**, each output in a batched transaction is an entirely ordinary, independently spendable UTXO (see [The UTXO Model](../bitcoin/utxo.md)); nothing about receiving funds as part of a batch restricts or delays the recipient's own ability to spend them once confirmed.

**Batching is not the same thing as a payment channel or Layer 2 system**. It's purely an on-chain efficiency technique, reducing overhead within ordinary base-layer transactions, not a way of moving volume off-chain the way [Payment Channels](./payment-channels.md) do.

## Further reading

- See also: [Transaction Fees](../bitcoin/fees.md), [Inputs and Outputs](../bitcoin/inputs-and-outputs.md)

---

[← Previous: SegWit as a Scaling Upgrade](./segwit.md)
·
[Back to Bitcoin Scaling](./README.md)
·
[Next: Payment Channels →](./payment-channels.md)
