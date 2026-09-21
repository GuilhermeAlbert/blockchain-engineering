# P2PKH

Pay-to-Public-Key-Hash is Bitcoin's original, and for most of its history most common, standard way to lock an output to a single key. This chapter walks through its exact script structure (already demonstrated executing in [Bitcoin Script](./script.md)) and covers the address format built specifically around it.

## The locking script

```text
OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG
```

Where `<pubKeyHash>` is `RIPEMD160(SHA256(publicKey))`, the same "hash160" operation demonstrated in [Bitcoin Script](./script.md#example-a-working-simplified-script-interpreter). The double-hash construction (SHA-256, then RIPEMD-160) rather than a single hash function is a deliberate defense-in-depth choice: an address remains secure even if a weakness were later found in just one of the two hash functions, as long as the other remains sound.

## The unlocking script (scriptSig)

```text
<signature> <publicKey>
```

Just two pushes: the spender's signature over the transaction, and their public key. As walked through step by step in [Bitcoin Script](./script.md#what-just-happened-step-by-step), the combined execution proves two things simultaneously: the provided public key genuinely hashes to the address this output was locked to (`OP_EQUALVERIFY`), and the provided signature is valid for that specific public key over this specific transaction (`OP_CHECKSIG`).

## Addresses: encoding a P2PKH pubKeyHash for humans

A P2PKH address is a human-typeable encoding of the pubKeyHash, using **Base58Check**, Base58 (a 58-character alphabet deliberately excluding visually similar characters like `0`/`O` and `l`/`I`, to reduce transcription errors) combined with a version byte (identifying the address type and network. Mainnet P2PKH addresses conventionally start with `1`) and a 4-byte checksum (the first four bytes of `SHA256(SHA256(versionByte + pubKeyHash))`, appended before encoding), letting wallet software detect most typos or transcription errors before ever broadcasting a transaction to an address that doesn't actually correspond to any valid key. This is covered fully, alongside the newer Bech32 format used for SegWit, in [Addresses](../wallets/addresses.md).

## Why this became the historical default

P2PKH's specific advantage over the earlier P2PK format (not revealing the actual public key until the output is spent) is covered in [ScriptPubKey and ScriptSig](./scripts.md#why-p2pk-gave-way-to-p2pkh). Its cost, relative to a bare public key, is a few extra bytes (the hash operations and the comparison), a negligible overhead in exchange for a real security improvement, which is why it displaced P2PK almost immediately after Bitcoin's earliest days.

## Tradeoffs relative to newer formats

P2PKH transactions are larger, and therefore more expensive to spend, than their SegWit (P2WPKH) equivalent, because the signature and public key sit in the `scriptSig` field, which is counted at full weight rather than receiving the witness discount described in [Transaction Fees](./fees.md#transaction-size-and-weight). Modern wallet software generally defaults to SegWit or Taproot address formats for this reason, though P2PKH remains fully valid, supported, and in active use. Bitcoin does not deprecate or remove support for older, still-consensus-valid script types.

## Common misconceptions

**A P2PKH address is not the same thing as a public key**, and cannot be reversed back into one. It's a one-way hash of a public key, encoded for readability. The public key itself only becomes visible on-chain the moment the corresponding output is actually spent.

**"1" addresses are not obsolete or unsafe**. They remain fully valid Bitcoin addresses; the shift toward SegWit and Taproot formats is driven by cost efficiency and additional features, not by any security deprecation of P2PKH itself.

## Further reading

- [Bitcoin Core developer reference: Transactions](https://developer.bitcoin.org/devguide/transactions.html)

---

[← Previous: ScriptPubKey and ScriptSig](./scripts.md)
·
[Back to Bitcoin](./README.md)
·
[Next: P2SH →](./p2sh.md)
