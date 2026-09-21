# Wallets and Key Management

A wallet does not literally store coins. It stores or manages the keys used to authorize spending — a distinction this section returns to repeatedly, because the "your Bitcoin is stored in your wallet" mental model, while a convenient simplification, obscures how backup, recovery, custody, and theft actually work. This section covers keys, seed phrases, hierarchical derivation, and the practical spectrum from hot wallets to cold, air-gapped storage.

## What you need to know first

[Private and Public Keys](../cryptography/keys.md) and [Digital Signatures](../cryptography/digital-signatures.md) from the Cryptography section, and [The UTXO Model](../bitcoin/utxo.md) from Bitcoin — this section is entirely about managing the keys those chapters already explained the mechanics of.

**Every private key, seed phrase, and derivation example in this section uses either a trivial, clearly-fake test value (like the number 42) or the official, publicly documented BIP-39 all-zero test vector, never real, unpredictable entropy. Never reuse any value shown in this section for real funds.**

## Chapters

1. [Addresses](./addresses.md) — Base58Check, Bech32, and Bech32m, and why an address isn't a public key
2. [Private Keys](./private-keys.md) — precisely what a wallet does and doesn't do with one
3. [Public Keys](./public-keys.md) — when they become visible on-chain, and why that timing matters
4. [Seed Phrases](./seed-phrases.md) — entropy to mnemonic to seed, verified against the official BIP-39 test vector
5. [BIP-39](./bip-39.md) — the standard itself, the optional passphrase, and its real, documented risk
6. [HD Wallets](./hd-wallets.md) — one seed, an unlimited deterministic tree of keys
7. [BIP-32](./bip-32.md) — chain codes, hardened derivation, and a genuine xpub-related vulnerability
8. [BIP-44](./bip-44.md) — the standardized path structure, and its purpose-field variants
9. [Derivation Paths](./derivation-paths.md) — a practical reference for reading and troubleshooting them
10. [Hot Wallets](./hot-wallets.md) — connectivity as the defining, not incidental, property
11. [Cold Storage](./cold-storage.md) — air-gapping and offline signing, concretely
12. [Hardware Wallets](./hardware-wallets.md) — secure elements and on-device transaction verification
13. [Multisig](./multisig.md) — script-based and Taproot-aggregated, and what each actually solves
14. [Custodial vs Non-Custodial Wallets](./custody.md) — "not your keys, not your coins," unpacked precisely
15. [Key Backup and Recovery](./recovery.md) — the redundancy-versus-exposure tradeoff, and Shamir's Secret Sharing

## Next

Continue to [Bitcoin Scaling](../bitcoin-scaling/README.md), which picks up the throughput questions this section's [multisig](./multisig.md) and [hot wallet](./hot-wallets.md) chapters touched on, and builds toward the [Lightning Network](../lightning/README.md) — a system that depends directly on the key and signature mechanics this section covered.
