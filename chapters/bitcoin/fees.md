# Transaction Fees

A Bitcoin transaction fee is whatever's left over when you subtract total output value from total input value. This chapter covers how fees are actually calculated, why they're priced per unit of data rather than as a flat amount, and how the fee market functions as an auction for scarce block space.

## Fees are implicit, not a stated field

As shown in [The UTXO Model](./utxo.md#example-computing-a-wallets-balance), a Bitcoin transaction has no explicit "fee" field. The fee is computed as `(sum of input amounts) − (sum of output amounts)`. A miner assembling a block collects this difference for every transaction included, which is why a transaction that accidentally sends more value in than it claims in outputs (a genuine, historically documented mistake in some wallet software) effectively pays an unusually large fee rather than the difference going anywhere else.

## Why fees are priced per byte (or per weight unit), not flat

Block space is scarce. A block has a maximum size (more precisely, a maximum **weight**, see below), so only a limited amount of transaction data fits in each roughly-10-minute block. A larger, more complex transaction (more inputs, more outputs, larger unlocking scripts) consumes more of that scarce space than a small, simple one, so fees are priced per byte (historically) or per weight unit (post-SegWit) rather than as a flat amount per transaction, a transaction paying the same total fee but using less space is more attractive to a miner assembling a block, because it leaves more room for additional fee-paying transactions.

## Transaction size and weight

Pre-SegWit, "size" simply meant the transaction's total serialized byte count. SegWit (see [SegWit](./segwit.md)) introduced **weight**, which counts witness data (signatures) at a quarter of the weight of non-witness data:

```text
weight = (non-witness bytes × 4) + (witness bytes × 1)
vsize (virtual size, used for fee-rate calculations) = weight / 4
```

This formula gives witness data an effective 75% discount relative to non-witness data, reflected in the fee a transaction needs to pay, a deliberate incentive for wallets to adopt SegWit, since SegWit transactions became measurably cheaper to send for equivalent economic content, without needing to change the underlying 4 million weight unit block limit (roughly equivalent to a maximum of 4 MB in an all-witness-data hypothetical, or closer to 1-2 MB of typical, mixed transaction data in practice).

## The fee market: an auction for block space

Because miners are economically rational (see [Mining Economics](./mining.md#mining-economics)) and want to maximize the fees collected from whichever transactions they include, they generally prioritize transactions offering the highest fee rate (satoshis per virtual byte), not the highest absolute fee. When many transactions compete for limited block space (during periods of high network demand) fee rates rise, since users willing to pay more get prioritized ahead of those unwilling to. This dynamic is covered fully, with its longer-term implications for Bitcoin's security budget, in [Fee Market](./fee-market.md).

## Example: estimating a fee

```typescript
// Roughly typical sizes for illustration; real transactions vary.
const NON_WITNESS_BYTES = 110; // version, input/output structure, locktime, etc.
const WITNESS_BYTES = 107;     // a single signature + pubkey witness

function vsize(nonWitnessBytes: number, witnessBytes: number): number {
  const weight = nonWitnessBytes * 4 + witnessBytes * 1;
  return Math.ceil(weight / 4);
}

const txVsize = vsize(NON_WITNESS_BYTES, WITNESS_BYTES);
const feeRateSatsPerVbyte = 20; // an illustrative, not live, fee rate
console.log("Estimated vsize:", txVsize, "vbytes");
console.log("Estimated fee:", txVsize * feeRateSatsPerVbyte, "satoshis");
```

TODO: replace the illustrative `feeRateSatsPerVbyte` value with a note pointing readers to a live fee estimation API (such as a public mempool/fee-estimation endpoint) rather than a hardcoded figure, since real fee rates fluctuate constantly with network demand.

## Replace-By-Fee (RBF)

A transaction sitting unconfirmed in the mempool with too low a fee rate to be prioritized can, if it explicitly signals support for **Replace-By-Fee** (BIP 125, done by setting its sequence number below a specific threshold), be replaced by a new transaction spending the same inputs with a higher fee, letting the sender effectively bid the fee up after the fact rather than waiting indefinitely or creating a conflicting double-spend attempt. This is covered further in [The Mempool](./mempool.md#replace-by-fee).

## Common misconceptions

**A higher fee does not buy a faster block time.** It buys higher *priority* for inclusion in whichever block is found next, if the network happens to find no blocks for 40 minutes due to ordinary random variance (see [Block Time](../blockchain/block-time.md)), even a very high fee transaction still waits that long; fees affect ordering among competing transactions, not the network's underlying block discovery rate.

**Fees are not paid to "Bitcoin" or to any protocol treasury.** They're paid entirely to whichever miner successfully mines the block including that transaction, as part of that block's coinbase reward, see [Coinbase Transactions](./coinbase-transactions.md).

## Further reading

- [BIP 125: Opt-in Full Replace-by-Fee Signaling](https://github.com/bitcoin/bips/blob/master/bip-0125.mediawiki)
- [BIP 141: Segregated Witness (weight calculation)](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki)

---

[← Previous: Inputs and Outputs](./inputs-and-outputs.md)
·
[Back to Bitcoin](./README.md)
·
[Next: The Mempool →](./mempool.md)
