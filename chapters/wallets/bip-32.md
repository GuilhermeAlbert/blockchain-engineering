# BIP-32

BIP-32 defines exactly how an HD wallet, introduced conceptually in [HD Wallets](./hd-wallets.md), actually derives its tree of keys from a single seed. This chapter covers the mechanism precisely: chain codes, hardened versus non-hardened derivation, and extended public keys, a feature with real, useful properties and a real, documented risk worth understanding before relying on it.

## The master key and chain code

A BIP-32 master key is derived from the seed (the 64-byte output of the BIP-39 process covered in [Seed Phrases](./seed-phrases.md#from-mnemonic-to-seed-why-pbkdf2)) via HMAC-SHA512, splitting the 512-bit result into two 256-bit halves: the **master private key** and the **master chain code**. The chain code is not a key. It's additional entropy mixed into every subsequent derivation step, specifically so that child keys don't have an easily discoverable mathematical relationship to each other or to the parent, despite all being deterministic functions of the same ultimate seed.

## Why child keys don't look related

Deriving a child key combines the parent's key material with the chain code and an **index number** through HMAC-SHA512 again, producing a new 512-bit output that's split into a new child private key (via modular addition with the parent's key, for non-hardened derivation) and a new child chain code. Because HMAC-SHA512's output is, for practical purposes, indistinguishable from random given different inputs (the same unpredictability property covered in [Hash Functions](../cryptography/hashes.md)), two sibling keys (derived from the same parent, differing only by index) have no discoverable pattern connecting them beyond both being reproducible from the same parent key and chain code. This is exactly what the [HD Wallets](./hd-wallets.md#example-one-seed-deterministically-producing-many-keys) example demonstrated: three keys derived from the same seed, each looking like an entirely independent, unrelated 256-bit number.

## Hardened versus non-hardened derivation

BIP-32 defines two derivation modes, distinguished by index range (indices `0` to `2^31 - 1` are non-hardened; indices `2^31` to `2^32 - 1`, conventionally written with an apostrophe like `0'` or `44'`, are hardened):

- **Non-hardened derivation** can compute a child *public* key directly from the *parent's public key* and chain code alone, without ever needing the parent's private key. This is what makes [extended public keys](#extended-public-keys-and-a-real-risk) useful, covered below.
- **Hardened derivation** requires the parent's *private* key to derive anything (child public or private) specifically because it was designed to close a specific vulnerability non-hardened derivation has (covered next).

## Extended public keys, and a real risk

Because non-hardened derivation lets you compute child public keys from just a parent's extended public key (**xpub**, in BIP-32's serialization format) and chain code, a business can generate customer-facing receiving addresses for accounting or invoicing purposes using only an xpub, without ever having the corresponding private keys anywhere near that system, a genuinely useful separation of concerns. But this convenience carries a specific, well-documented cryptographic risk: **if an attacker ever learns both a non-hardened child's private key and its parent's extended public key, they can mathematically recover the parent's private key** (and therefore every other child key in that entire non-hardened branch), because the derivation math for non-hardened keys is fully reversible once you have one private/public key pair plus the shared chain code. This is exactly why [BIP-44](./bip-44.md) and standard derivation path conventions use **hardened derivation for the higher, more sensitive levels of the path** (purpose, coin type, account) and reserve non-hardened derivation only for the lower levels (address index) where this specific xpub-plus-one-leaked-key risk is judged acceptable for the convenience it enables.

## Example: an xpub deriving child public keys without any private key present

```typescript
import { mnemonicToSeedSync, entropyToMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";
import { HDKey } from "@scure/bip32";

const testEntropy = new Uint8Array(16); // TEST ONLY
const seed = mnemonicToSeedSync(entropyToMnemonic(testEntropy, wordlist), "");
const master = HDKey.fromMasterSeed(seed);

// Derive down to a non-hardened branch, then export only the public data.
const account = master.derive("m/44'/0'/0'");
const accountXpub = account.publicExtendedKey;
console.log("account xpub:", accountXpub);

// Simulate a separate, private-key-free system that only has the xpub:
const watchOnly = HDKey.fromExtendedKey(accountXpub);
const child = watchOnly.derive("m/0/0"); // non-hardened from here — no private key needed
console.log("derived child public key (from xpub alone):", Buffer.from(child.publicKey!).toString("hex"));
console.log("private key is null (watch-only, as expected):", child.privateKey === null);
```

Verified output from running this exact code:

```text
account xpub: xpub6BosfCnifzxcFwrSzQiqu2DBVTshkCXacvNsWGYJVVhhawA7d4R5WSWGFNbi8Aw6ZRc1brxMyWMzG3DSSSSoekkudhUd9yLb6qx39T9nMdj
derived child public key (from xpub alone): 03aaeb52dd7494c361049de67cc680e83ebcbbbdbeb13637d92cd845f70308af5e
private key is null (watch-only, as expected): true
```

The derived public key matches exactly what the full-seed derivation in [HD Wallets](./hd-wallets.md#example-one-seed-deterministically-producing-many-keys) computes for the same path (`e284129c...`'s corresponding public key), confirming the xpub-only, private-key-free derivation genuinely reaches the same child public key as the full-key derivation, without ever handling the private key.

## Common misconceptions

**An xpub is not safe to share as casually as an ordinary public key or address.** Beyond the leaked-private-key risk described above, an xpub alone reveals *every* address in its entire derivation branch to whoever holds it, plus the exact amounts and transaction history at each, a real, meaningful privacy leak (see [Privacy](../society/privacy.md)) distinct from, and in addition to, the private-key-recovery risk.

**Hardened derivation is not simply "more secure" in every dimension with no tradeoff**. It closes the specific xpub-plus-child-key vulnerability, at the cost of requiring the parent private key for every derivation step below a hardened level, which is exactly why watch-only, private-key-free setups (useful for accounting, monitoring, or receiving-only systems) are only possible below the account's hardened boundary, not above it.

## Further reading

- [BIP 32: Hierarchical Deterministic Wallets](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

---

[← Previous: HD Wallets](./hd-wallets.md)
·
[Back to Wallets and Key Management](./README.md)
·
[Next: BIP-44 →](./bip-44.md)
