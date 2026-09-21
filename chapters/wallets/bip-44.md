# BIP-44

BIP-32 defines *how* to derive a tree of keys; it says nothing about *which specific paths within that tree* should mean "the first Bitcoin receiving address" or "the fifth Ethereum account." BIP-44 fills that gap: a standardized structure for organizing an HD wallet's derivation tree so that different wallet software, given the same seed, derive the identical set of addresses for the identical purposes.

## The problem BIP-44 solves

Without an agreed convention, two different wallets could both correctly implement [BIP-32](./bip-32.md) derivation and still produce completely different, incompatible sets of addresses from the identical seed phrase — simply because they chose different, arbitrary paths within the tree for "the first receiving address." This would make seed phrases far less portable across wallet software in practice than they claim to be in principle. BIP-44 (building on the multi-account structure BIP-43 introduced) fixes this by standardizing the path structure itself.

## The five-level structure

```text
m / purpose' / coin_type' / account' / change / address_index
```

- **purpose'** — always `44'` for BIP-44-structured wallets (other purpose values signal different standards — BIP-49 for `49'`, BIP-84 for `84'`, and BIP-86 for `86'`, covered below).
- **coin_type'** — identifies which cryptocurrency this branch is for, per a registry maintained in [SLIP-44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md) (a related specification from SatoshiLabs) — `0'` for Bitcoin, `60'` for Ethereum, and so on for hundreds of other registered chains, letting a single seed phrase manage keys for many different blockchains simultaneously, each in its own dedicated branch.
- **account'** — an arbitrary, user-chosen index letting one seed manage multiple, logically separate accounts (for organizational or accounting purposes) within the same coin type.
- **change** — `0` for ordinary receiving addresses, `1` for internal change addresses (the leftover-value outputs described in [The UTXO Model](../bitcoin/utxo.md#how-spending-works)) — keeping change addresses in a logically separate branch from receiving addresses, even though both are ordinary addresses functionally.
- **address_index** — a sequential counter, incrementing for each new address generated within that branch.

Note the apostrophes on the first three levels — these indicate **hardened derivation** (see [BIP-32](./bip-32.md#hardened-versus-non-hardened-derivation)), while `change` and `address_index` use ordinary, non-hardened derivation, specifically so that an xpub at the account level can generate every receiving and change address below it without ever needing the private key, per the watch-only pattern demonstrated in [BIP-32](./bip-32.md#example-an-xpub-deriving-child-public-keys-without-any-private-key-present).

## Purpose-field variants for different Bitcoin script types

Because Bitcoin has multiple standard script types (see [ScriptPubKey and ScriptSig](../bitcoin/scripts.md#the-standard-script-types-at-a-glance)), the ecosystem extended BIP-44's purpose field with related standards for newer address formats, rather than overloading `44'` to mean different things depending on context:

| Purpose | Standard | Address type |
| --- | --- | --- |
| `44'` | BIP-44 | Legacy P2PKH |
| `49'` | BIP-49 | P2SH-wrapped SegWit |
| `84'` | BIP-84 | Native SegWit (P2WPKH) |
| `86'` | BIP-86 | Taproot (P2TR) |

A wallet supporting multiple address types for the same underlying seed typically derives each type from its own, separate purpose-level branch — meaning a single seed phrase can simultaneously back legacy, SegWit, and Taproot addresses, each independently derivable and independently checkable, from the same original backup.

## Example: the full path for a real, common case

"The third receiving address in the first Bitcoin account, using native SegWit" would be:

```text
m/84'/0'/0'/0/2
```

Reading it left to right: BIP-84 purpose (native SegWit), Bitcoin coin type, first account, receiving (not change) branch, third address (index 2, since indexing starts at 0).

## Common misconceptions

**BIP-44 does not define anything about the underlying cryptography** — that's entirely BIP-32's job; BIP-44 only standardizes the *meaning* of specific positions within a BIP-32 tree, a purely organizational convention layered on top.

**Two wallets both correctly implementing BIP-44 for the same seed will derive identical addresses only if they also agree on the same purpose-field variant (44' vs 84', for instance) for the address type you're looking at** — restoring a seed into a wallet that defaults to a different purpose field than the one your funds were originally derived under is a real, documented source of "my funds disappeared" confusion, when in fact the funds are sitting at a different, correct-but-undisplayed path the new wallet isn't checking by default.

## Further reading

- [BIP 44: Multi-Account Hierarchy for Deterministic Wallets](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
- [SLIP-44: Registered coin types](https://github.com/satoshilabs/slips/blob/master/slip-0044.md)
- [BIP 84: Derivation scheme for P2WPKH](https://github.com/bitcoin/bips/blob/master/bip-0084.mediawiki)

---

[← Previous: BIP-32](./bip-32.md)
·
[Back to Wallets and Key Management](./README.md)
·
[Next: Derivation Paths →](./derivation-paths.md)
