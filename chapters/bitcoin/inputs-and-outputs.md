# Inputs and Outputs

[Bitcoin Transactions](./transactions.md) introduced inputs and outputs at a structural level; this chapter goes into each field precisely, because the details here — what exactly an input references, what exactly an output specifies, and the specific difference between a locking script and unlocking data — are where a lot of the confusion around "how do I actually build a transaction" comes from.

## Outputs: the simpler half

An output specifies two things: an **amount** (in satoshis) and a **locking script** (`scriptPubKey`), which defines the condition someone must satisfy to spend it later. Despite the name "locking script," it's better understood as a small, self-contained program: when someone later tries to spend this output, the network runs this script (combined with the spender's provided unlocking data) and checks whether it evaluates to true. The most common locking script forms — [P2PKH](./p2pkh.md), [P2SH](./p2sh.md), and the SegWit/[Taproot](./taproot.md) variants — are covered in their own chapters; this chapter treats the concept generally.

An output, once created, is immutable and exists exactly as created until it's spent — there's no way to modify an output's amount or locking script after the transaction containing it is confirmed.

## Inputs: referencing and unlocking

An input does three things: it identifies **which previous output** is being spent (by the pair `(previousTxId, outputIndex)` — see [The UTXO Model](./utxo.md)), it provides **unlocking data** proving the right to spend that output (a signature, for the most common script types — see [ScriptPubKey and ScriptSig](./scripts.md)), and it specifies a **sequence number**, a field with a complicated history (originally intended by Satoshi for a transaction-replacement mechanism that was never fully implemented as designed, later repurposed for [BIP 68's](https://github.com/bitcoin/bips/blob/master/bip-0068.mediawiki) relative timelocks — see [Timelocks](./script.md#timelocks)).

## "Unlocking script" versus "unlocking data": a terminology note

For pre-SegWit transaction types, the unlocking data is itself a script (`scriptSig`) — a small sequence of operations (typically just pushing a signature and public key onto the stack) that runs immediately before the output's locking script, leaving its results on the same stack for the locking script to check. For SegWit and Taproot spends, the equivalent data (the **witness**) is stored in a separate part of the transaction rather than inline in the traditional `scriptSig` field — a structural change covered fully in [SegWit](./segwit.md), but functionally serving the identical purpose: proving the right to spend.

## Example: connecting inputs to the outputs they reference

```typescript
interface Output {
  amountSats: number;
  lockingScript: string; // simplified representation
}

interface Input {
  previousTxId: string;
  previousOutputIndex: number;
  unlockingData: string; // simplified representation
}

interface Transaction {
  txid: string;
  inputs: Input[];
  outputs: Output[];
}

// A miniature two-transaction chain: tx1 creates an output, tx2 spends it.
const tx1: Transaction = {
  txid: "tx1",
  inputs: [], // (a real tx1 would have its own inputs; omitted here for focus)
  outputs: [{ amountSats: 100_000_000, lockingScript: "OP_DUP OP_HASH160 <alice-pubkey-hash> OP_EQUALVERIFY OP_CHECKSIG" }],
};

const tx2: Transaction = {
  txid: "tx2",
  inputs: [
    {
      previousTxId: "tx1",
      previousOutputIndex: 0,
      unlockingData: "<alice-signature> <alice-pubkey>",
    },
  ],
  outputs: [{ amountSats: 99_900_000, lockingScript: "OP_DUP OP_HASH160 <bob-pubkey-hash> OP_EQUALVERIFY OP_CHECKSIG" }],
};

// Validation, conceptually: does tx2's input correctly reference tx1's
// output, and does its unlocking data satisfy that output's locking script?
function referencesOutput(input: Input, sourceTx: Transaction): Output | undefined {
  if (input.previousTxId !== sourceTx.txid) return undefined;
  return sourceTx.outputs[input.previousOutputIndex];
}

const referenced = referencesOutput(tx2.inputs[0], tx1);
console.log("tx2's input references an output worth:", referenced?.amountSats, "satoshis");
console.log("Implicit fee:", (referenced?.amountSats ?? 0) - tx2.outputs[0].amountSats, "satoshis");
```

The [Bitcoin Script](./script.md) chapter covers exactly how the locking-script/unlocking-data pair `OP_DUP OP_HASH160 ... OP_CHECKSIG` actually executes step by step; this example treats them as opaque strings to isolate the input/output referencing mechanic itself.

## Multiple inputs, multiple outputs

Nothing restricts a transaction to one input or one output — a single transaction can spend many UTXOs (combining several smaller amounts to cover a larger payment) and create many outputs (paying several recipients, plus change, in one transaction — a pattern called a **batch transaction**, commonly used by exchanges processing many customer withdrawals at once to save on cumulative transaction fees compared to sending each payout separately).

## Common misconceptions

**An input does not contain an amount field of its own.** The amount being spent is implicitly whatever the *referenced output* specified — an input only needs to identify which output it's spending and prove the right to spend it; the amount is looked up from that referenced output, not restated.

**A transaction with multiple outputs does not mean the sender is paying multiple parties from separate "accounts."** All outputs in a single transaction are funded collectively by that same transaction's inputs — there's no per-output attribution back to a specific input.

## Further reading

- [Bitcoin Core developer reference: Transactions](https://developer.bitcoin.org/reference/transactions.html)

---

[← Previous: The UTXO Model](./utxo.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Transaction Fees →](./fees.md)
