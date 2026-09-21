# Derivation Paths

This short, practical chapter is a reference for reading and troubleshooting derivation paths in the wild (the actual strings you'll encounter in wallet software, hardware wallet interfaces, and recovery documentation) building on the mechanics already covered in [BIP-32](./bip-32.md) and [BIP-44](./bip-44.md).

## Reading a path

```text
m / 84' / 0' / 0' / 0 / 5
│    │    │    │   │   └── address index 5 (the sixth address, 0-indexed)
│    │    │    │   └────── change branch: 0 = receiving, 1 = change
│    │    │    └────────── account 0 (first account)
│    │    └─────────────── coin type: 0 = Bitcoin
│    └──────────────────── purpose: 84 = native SegWit (BIP-84)
└───────────────────────── the master key itself
```

`m` always refers to the master key derived directly from the seed (see [BIP-32](./bip-32.md#the-master-key-and-chain-code)). Each subsequent level is a step further down the tree; an apostrophe after a number means that level uses hardened derivation.

## Why different wallets sometimes show different addresses for "the same" seed

This is the single most common source of user confusion this chapter exists to resolve: restoring an identical seed phrase into two different wallets can produce two different sets of default addresses if the wallets default to different purpose-field conventions (see [BIP-44](./bip-44.md#purpose-field-variants-for-different-bitcoin-script-types")) (one defaulting to `m/44'/...` (legacy), another to `m/84'/...` (native SegWit). **The funds are not lost or missing** in this scenario) they exist at whatever path they were originally sent to; the new wallet is simply not checking that specific path by default. Most modern wallets let you manually specify a custom derivation path, or automatically scan several common paths during recovery, precisely to handle this.

## Example: deriving the same path across several common conventions

```typescript
import { mnemonicToSeedSync, entropyToMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";
import { HDKey } from "@scure/bip32";

const testEntropy = new Uint8Array(16); // TEST ONLY
const seed = mnemonicToSeedSync(entropyToMnemonic(testEntropy, wordlist), "");
const master = HDKey.fromMasterSeed(seed);

const paths = {
  "legacy (BIP-44)": "m/44'/0'/0'/0/0",
  "SegWit-wrapped (BIP-49)": "m/49'/0'/0'/0/0",
  "native SegWit (BIP-84)": "m/84'/0'/0'/0/0",
  "Taproot (BIP-86)": "m/86'/0'/0'/0/0",
};

for (const [label, path] of Object.entries(paths)) {
  const child = master.derive(path);
  console.log(`${label.padEnd(28)} ${path.padEnd(18)} pubkey: ${Buffer.from(child.publicKey!).toString("hex")}`);
}
```

Verified output from running this exact code:

```text
legacy (BIP-44)              m/44'/0'/0'/0/0    pubkey: 03aaeb52dd7494c361049de67cc680e83ebcbbbdbeb13637d92cd845f70308af5e
SegWit-wrapped (BIP-49)      m/49'/0'/0'/0/0    pubkey: 039b3b694b8fc5b5e07fb069c783cac754f5d38c3e08bed1960e31fdb1dda35c24
native SegWit (BIP-84)       m/84'/0'/0'/0/0    pubkey: 0330d54fd0dd420a6e5f8d3624f5f3482cae350f79d5f0753bf5beef9c2d91af3c
Taproot (BIP-86)             m/86'/0'/0'/0/0    pubkey: 03cc8a4bc64d897bddc5fbc2f670f7a8ba0b386779106cf1223c6fc5d7cd6fc115
```

Four completely distinct public keys, from the identical seed, at what looks like "the same" address-index-0 position. Confirming the purpose field genuinely changes the derived key, not just its display format.

## A practical checklist when restoring a wallet

1. Confirm you have the exact, correctly-ordered mnemonic words (see [Seed Phrases](./seed-phrases.md)).
2. Confirm whether a passphrase (the "25th word," see [BIP-39](./bip-39.md#the-optional-passphrase)) was used originally. Restoring without it, if one was used, silently produces a completely different, empty wallet with no error.
3. Confirm which purpose-field convention (44'/49'/84'/86') the original wallet used, if not automatically detected.
4. Confirm the coin type and account index if managing multiple chains or accounts from the same seed.

## Common misconceptions

**A derivation path is not a secret**, knowing the path alone, without the seed itself, reveals nothing usable; paths are a public convention for organizing a tree, not part of its security.

**Manually specifying a "custom" derivation path is not inherently more or less secure** than using a standard one. The security comes entirely from the seed's entropy and the correctness of the underlying [BIP-32](./bip-32.md) math, not from how obscure or standard the specific path happens to be.

## Further reading

- See also: [BIP-32](./bip-32.md), [BIP-44](./bip-44.md)

---

[← Previous: BIP-44](./bip-44.md)
·
[Back to Wallets and Key Management](./README.md)
·
[Next: Hot Wallets →](./hot-wallets.md)
