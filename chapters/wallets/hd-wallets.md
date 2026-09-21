# HD Wallets

A Hierarchical Deterministic (HD) wallet derives an entire tree of key pairs from a single seed, rather than generating and separately backing up each key individually. This chapter covers why that matters practically — it's the reason a single 12-word backup can protect an unlimited number of addresses — and sets up [BIP-32](./bip-32.md), which defines the actual derivation mechanism.

## The problem HD wallets solve

Before HD wallets (standardized by [BIP 32](./bip-32.md) in 2012), wallets generated and stored a pool of independent, unrelated private keys, each requiring its own separate backup — losing a backup made after new keys were generated meant those newer keys were unrecoverable even with an older backup in hand, since there was no mathematical relationship between them. This was a genuine, practical usability and safety problem: users had to remember to re-backup their wallet every time it generated new keys (which most wallets did automatically and frequently, to support the privacy-motivated practice of using a fresh address per transaction — see [Addresses](./addresses.md#common-misconceptions)), and a missed backup could mean permanently lost funds despite having a technically valid, just outdated, backup.

## How HD wallets solve it

An HD wallet derives every key it will ever need from one starting point — the **master seed**, itself derived from your [seed phrase](./seed-phrases.md) — using a one-way, deterministic function (covered mechanically in [BIP-32](./bip-32.md)). Because the derivation is deterministic, the *same* seed always produces the *same* entire tree of keys, in the *same* order, on any correctly implemented wallet software. This means backing up the single, original seed phrase is sufficient to recover every key the wallet has ever derived or ever will derive — including keys generated after the backup was made, since they're all deterministic functions of the same starting seed rather than independently, randomly generated.

```text
Master seed (from your seed phrase)
        │
        ▼
   Master key
    ├── Account 0
    │     ├── Receiving address 0
    │     ├── Receiving address 1
    │     ├── Receiving address 2, 3, 4, ...
    │     └── Change address 0, 1, 2, ...
    ├── Account 1
    │     └── ...
    └── Account 2, 3, ...
```

## Example: one seed, deterministically producing many keys

```typescript
import { mnemonicToSeedSync, entropyToMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";
import { HDKey } from "@scure/bip32";

const testEntropy = new Uint8Array(16); // TEST ONLY — see chapters/wallets/seed-phrases.md
const mnemonic = entropyToMnemonic(testEntropy, wordlist);
const seed = mnemonicToSeedSync(mnemonic, "");

const master = HDKey.fromMasterSeed(seed);

// Deriving several different, unrelated-looking child keys from the same seed:
for (let i = 0; i < 3; i++) {
  const child = master.derive(`m/44'/0'/0'/0/${i}`);
  console.log(`address index ${i}: private key = ${Buffer.from(child.privateKey!).toString("hex")}`);
}
```

Verified output from running this exact code:

```text
address index 0: private key = e284129cc0922579a535bbf4d1a3b25773090d28c909bc0fed73b5e0222cc372
address index 1: private key = 5c1141f60edd3095579529db7e88d964cb0a9ec0f814f6a10cd5cbd763078a0c
address index 2: private key = cfa32fc333b7297ca611c33f046d96895071672e1e5d9b77f3492b3c8d0149f9
```

Each derived key looks like a completely independent, unrelated private key — this is intentional, and covered mechanically in [BIP-32](./bip-32.md#why-child-keys-dont-look-related) — but all three, and every other key this wallet will ever derive, come from re-running the exact same backup phrase through the exact same deterministic process.

## Tradeoffs

HD wallets trade a small amount of derivation computation (fast, and done automatically by wallet software, not something users notice) for a dramatic usability and safety improvement: one backup, taken once, protects every key the wallet will ever generate, for the lifetime of that seed. The cost worth naming: an HD wallet's entire tree shares a single point of failure — the master seed — meaning compromising that one seed compromises every derived key at once, a different risk profile than a collection of fully independent keys would have (where compromising one key wouldn't affect the others) — a tradeoff this book returns to in [Multisig](./multisig.md), which addresses it directly.

## Common misconceptions

**Generating a new receiving address does not require a new backup.** This is the entire point of the HD structure — every address, no matter when it's generated, is recoverable from the original seed phrase backup made once, at wallet creation.

**Different wallet software using the same seed phrase does not necessarily derive the identical address tree** unless both also agree on the same derivation path structure (see [BIP-44](./bip-44.md) and [Derivation Paths](./derivation-paths.md)) — the seed alone isn't quite the whole story; the specific path convention used matters too.

## Further reading

- [BIP 32: Hierarchical Deterministic Wallets](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

---

[← Previous: BIP-39](./bip-39.md)
·
[Back to Wallets and Key Management](./README.md)
·
[Next: BIP-32 →](./bip-32.md)
