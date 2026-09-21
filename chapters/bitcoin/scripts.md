# ScriptPubKey and ScriptSig

[Bitcoin Script](./script.md) covered how the stack machine executes. This chapter is a reference overview of the standard script **templates** — the specific, recognized patterns of locking and unlocking scripts that make up the overwhelming majority of real Bitcoin transactions — before the next several chapters cover the most important ones (P2PKH, P2SH, SegWit, Taproot) in full depth.

## Terminology

- **scriptPubKey** — the locking script attached to an output, specifying the condition for spending it. The name comes from its most common historical form: a script referencing a public key (or a hash of one).
- **scriptSig** — the unlocking script provided in a (pre-SegWit) input, satisfying the referenced output's scriptPubKey. The name comes from its most common historical content: a signature.
- **witness** — for SegWit and Taproot spends, the unlocking data equivalent to scriptSig, but stored in a separate part of the transaction rather than inline — see [SegWit](./segwit.md).

## The standard script types, at a glance

| Type | Name | Locking condition | Chapter |
| --- | --- | --- | --- |
| P2PK | Pay to Public Key | A valid signature for a specific, directly embedded public key | Largely historical; superseded by P2PKH |
| P2PKH | Pay to Public Key Hash | A valid signature and public key matching a specific hash | [P2PKH](./p2pkh.md) |
| P2MS | Bare Multisig | M-of-N valid signatures, directly | Largely superseded by P2SH-wrapped multisig |
| P2SH | Pay to Script Hash | Providing a script matching a specific hash, which itself must then execute successfully | [P2SH](./p2sh.md) |
| P2WPKH | Pay to Witness Public Key Hash | SegWit version of P2PKH | [SegWit](./segwit.md) |
| P2WSH | Pay to Witness Script Hash | SegWit version of P2SH | [SegWit](./segwit.md) |
| P2TR | Pay to Taproot | A single Schnorr signature (key-path), or revealing and satisfying one of several pre-committed script alternatives (script-path) | [Taproot](./taproot.md) |

## Why P2PK gave way to P2PKH

Bitcoin's very earliest transactions, including the [first transaction to Hal Finney](../origins/early-bitcoin.md#the-first-bitcoin-transaction), used **P2PK** — a locking script embedding the recipient's full public key directly. This was replaced almost immediately by **P2PKH**, which locks to a *hash* of the public key (an address) instead, for a specific, concrete security reason: an address hides the actual public key until the output is spent, meaning an attacker (including, in principle, a sufficiently powerful future quantum computer capable of solving the elliptic curve discrete logarithm problem, see [Elliptic Curves](../cryptography/elliptic-curves.md#scalar-multiplication-and-the-hard-problem)) can't even begin trying to derive the private key from a public key that isn't yet publicly visible on-chain — the public key is only revealed at the moment an output is spent, not the moment it's received. This distinction is discussed further in [Quantum Resistance](../security/README.md) considerations covered in the Security section.

## Why P2SH exists

Before P2SH, a locking script had to embed its full spending logic directly in the output — meaning, for example, a 2-of-3 multisig output's entire multisig script had to appear in the transaction *creating* that output, and the sender (not the recipient) bore the on-chain data cost of that complexity. **P2SH** (BIP 16, 2012) inverts this: the output only stores a hash of the spending script, and the actual script is only revealed when the output is spent — pushing the complexity, and its cost, onto the spender rather than the sender, and letting a sender pay a recipient using an arbitrarily complex script without needing to know or care what that script actually is, only its hash. Covered fully in [P2SH](./p2sh.md).

## Common misconceptions

**scriptSig and witness data serve the identical functional purpose** (proving the right to spend) — the difference is purely about *where in the transaction's serialized format* that data lives, a structural change introduced by SegWit for reasons covered in [SegWit](./segwit.md#why-segwit-exists), not a difference in what they accomplish.

**Not every Bitcoin output uses one of these standard templates.** Non-standard scripts are valid per consensus rules as long as they execute correctly, but most Bitcoin Core nodes' default relay policy won't forward non-standard transactions by default — a policy rule (see [Consensus Rules](../blockchain/consensus-rules.md#what-makes-a-rule-a-policy-rule)), not a consensus restriction, meaning a miner could still choose to include a non-standard transaction in a block they mine themselves.

## Further reading

- [Bitcoin Core developer reference: Transactions (standard scripts)](https://developer.bitcoin.org/devguide/transactions.html)
- [BIP 16: Pay to Script Hash](https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki)

---

[← Previous: Bitcoin Script](./script.md)
·
[Back to Bitcoin](./README.md)
·
[Next: P2PKH →](./p2pkh.md)
