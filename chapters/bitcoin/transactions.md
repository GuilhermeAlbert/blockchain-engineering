# Bitcoin Transactions

A Bitcoin transaction is a signed message that destroys existing coins (technically, unspent outputs) and creates new ones. This is a precise, mechanical description worth internalizing early, because it's easy to unconsciously slip into the more familiar, but wrong, mental model of a bank transfer decrementing one account and incrementing another. Bitcoin does not track account balances at all. This chapter covers the transaction structure directly; [The UTXO Model](./utxo.md) covers the accounting model this structure implements, and [Inputs and Outputs](./inputs-and-outputs.md) goes deeper into the input/output mechanics specifically.

## The core structure

Every Bitcoin transaction consists of:

- **A version number**
- **A list of inputs**, each referencing a specific previous transaction's output (by transaction ID and output index) that this transaction is spending, plus an unlocking script (or witness data, for SegWit transactions, see [SegWit](./segwit.md)) proving the right to spend it
- **A list of outputs**, each specifying an amount and a locking script defining the condition under which that amount can be spent in the future
- **A locktime**, an optional field restricting the earliest time or block height at which the transaction becomes valid for inclusion

```text
Transaction
├── version
├── inputs[]
│   ├── previous transaction ID  ─┐
│   ├── previous output index     ├─ together, these identify exactly
│   ├── unlocking script/witness  │  which UTXO is being spent, and
│   └── sequence number          ─┘  prove the right to spend it
├── outputs[]
│   ├── amount (in satoshis)
│   └── locking script  ─── defines who can spend this output next
└── locktime
```

## The transaction ID (txid)

A transaction's ID is the SHA-256d hash of its serialized contents (for non-SegWit fields. SegWit transactions compute the txid over a specific subset of fields that excludes witness data, discussed in [SegWit](./segwit.md#txid-and-wtxid)). This is a value **derived from** the transaction's contents, not a field stored inside it. Just as a block's hash is derived from its header (see [Hashes and Block Linking](../blockchain/block-linking.md)), a transaction's ID is derived the same way, which is why altering anything in a transaction (even in a way that doesn't change its economic meaning) produces a completely different txid.

## Example: building and hashing a simplified transaction

Real Bitcoin transaction serialization has specific binary encoding rules (variable-length integers, little-endian byte order, and (for SegWit transactions) a marker/flag byte pair and separate witness data). The example below implements the core, non-SegWit serialization format directly, to show the actual mechanism rather than treat it as a black box:

```typescript
import { createHash } from "node:crypto";

function sha256d(buf: Buffer): Buffer {
  const once = createHash("sha256").update(buf).digest();
  return createHash("sha256").update(once).digest();
}

// Bitcoin's variable-length integer encoding, for lengths and counts.
function varint(n: number): Buffer {
  if (n < 0xfd) return Buffer.from([n]);
  const buf = Buffer.alloc(3);
  buf.writeUInt8(0xfd, 0);
  buf.writeUInt16LE(n, 1);
  return buf;
}

interface SimpleInput {
  previousTxId: string; // hex, big-endian as usually displayed
  previousOutputIndex: number;
  scriptSig: Buffer;
  sequence: number;
}

interface SimpleOutput {
  amountSats: bigint;
  scriptPubKey: Buffer;
}

function serializeTransaction(inputs: SimpleInput[], outputs: SimpleOutput[], locktime: number): Buffer {
  const parts: Buffer[] = [];

  const version = Buffer.alloc(4);
  version.writeInt32LE(1);
  parts.push(version);

  parts.push(varint(inputs.length));
  for (const input of inputs) {
    parts.push(Buffer.from(input.previousTxId, "hex").reverse()); // stored little-endian
    const outIndex = Buffer.alloc(4);
    outIndex.writeUInt32LE(input.previousOutputIndex);
    parts.push(outIndex);
    parts.push(varint(input.scriptSig.length));
    parts.push(input.scriptSig);
    const sequence = Buffer.alloc(4);
    sequence.writeUInt32LE(input.sequence);
    parts.push(sequence);
  }

  parts.push(varint(outputs.length));
  for (const output of outputs) {
    const amount = Buffer.alloc(8);
    amount.writeBigInt64LE(output.amountSats);
    parts.push(amount);
    parts.push(varint(output.scriptPubKey.length));
    parts.push(output.scriptPubKey);
  }

  const locktimeBuf = Buffer.alloc(4);
  locktimeBuf.writeUInt32LE(locktime);
  parts.push(locktimeBuf);

  return Buffer.concat(parts);
}

const tx = serializeTransaction(
  [
    {
      previousTxId: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      previousOutputIndex: 0,
      scriptSig: Buffer.from([]), // left empty here — a real scriptSig contains a signature and public key
      sequence: 0xffffffff,
    },
  ],
  [{ amountSats: 5000000000n, scriptPubKey: Buffer.from([]) }], // 50 BTC, matching the genesis-era reward for illustration
  0,
);

const txid = sha256d(tx).reverse().toString("hex"); // txids are conventionally displayed byte-reversed
console.log("Serialized size:", tx.length, "bytes");
console.log("txid:", txid);
```

Verified output from running this exact code:

```text
Serialized size: 60 bytes
txid: f7b0f6d21b485cdfdf801c4bfffc2a5c2d30baf4aaf94284aeb9be5be96e0c0f
```

A real transaction's `scriptSig` and `scriptPubKey` are not empty, of course. This example leaves them empty specifically to isolate and demonstrate the serialization and hashing mechanics without also needing [Bitcoin Script](./script.md), which the next few chapters build up to.

## Transaction size and weight

Before SegWit, transaction "size" simply meant its serialized byte count, and fees were (and still can be) priced per byte. SegWit introduced **weight units** to give witness data (signatures, largely) a discount relative to non-witness data, because witness data doesn't need to be processed by older, pre-SegWit software and was judged to warrant different treatment in the block size limit's accounting, covered fully, with the actual weight formula, in [SegWit](./segwit.md) and [Transaction Fees](./fees.md#transaction-size-and-weight).

## Confirmation

A transaction is **unconfirmed** while it sits in nodes' [mempools](./mempool.md), waiting to be included in a block. Once mined into a block, it has 1 confirmation, and that count grows by one with each subsequent block, see [Transaction Confirmation](./confirmation.md) for what different confirmation depths actually mean in terms of reversal risk, quantified in [Probabilistic Finality](../distributed-systems/probabilistic-finality.md).

## The coinbase transaction: the one exception

Every block's first transaction is a **coinbase transaction**, which has no real inputs (it references a null previous transaction and carries arbitrary data instead of an unlocking script) and creates new coins from nothing, per the protocol's [issuance schedule](./issuance.md), covered fully in [Coinbase Transactions](./coinbase-transactions.md).

## Common misconceptions

**A Bitcoin transaction does not directly say "Alice sends Bob X bitcoin."** It says "the party who can satisfy these specific unlocking conditions is spending these specific previous outputs, and creating these new outputs with these specific new spending conditions." Framing it in terms of balances is a useful simplification for casual conversation, but it obscures the UTXO mechanics that later chapters (particularly [The UTXO Model](./utxo.md)) depend on understanding precisely.

**A txid is not assigned or chosen by anyone**. It's a direct mathematical consequence of a transaction's contents, which is why it can't be predicted before the transaction is fully constructed, and why altering even a signature (see [Transaction Malleability](../cryptography/digital-signatures.md#malleability-a-subtlety-worth-naming-here)) changes it.

## Further reading

- [Bitcoin Core developer reference: Transactions](https://developer.bitcoin.org/reference/transactions.html)
- [Bitcoin whitepaper, Section 2 and Section 9](https://bitcoin.org/bitcoin.pdf)

---

[← Previous: Bitcoin Core](./bitcoin-core.md)
·
[Back to Bitcoin](./README.md)
·
[Next: The UTXO Model →](./utxo.md)
