# BIP-39

[Seed Phrases](./seed-phrases.md) covered the entropy-to-mnemonic mechanism itself. This chapter covers BIP-39 as a specification — its history, the optional passphrase feature it defines, and a genuine, documented limitation worth understanding before relying on it.

## Origin

BIP-39 was proposed in 2013 by Marek Palatinus, Pavol Rusnak, and Aaron Voisine (the first two associated with the hardware wallet company SatoshiLabs/Trezor, the third with the Breadwallet/BRD mobile wallet), aiming to standardize mnemonic seed backup across otherwise-incompatible wallet implementations — before BIP-39, different wallets used different, often proprietary and mutually incompatible, backup schemes, meaning a phrase from one wallet often couldn't be restored in another.

## The optional passphrase

BIP-39 defines an optional passphrase, mixed into the PBKDF2 derivation described in [Seed Phrases](./seed-phrases.md#from-mnemonic-to-seed-why-pbkdf2) alongside the mnemonic itself. This passphrase is **not** part of the mnemonic and is **not** checksummed or validated in any way — critically, a different passphrase combined with the identical mnemonic words produces a completely different, entirely unrelated seed and therefore an entirely different set of derived keys, with no cryptographic relationship between the two beyond sharing the same starting words. This gives the passphrase two real, distinct practical uses:

- **Plausible deniability**: a wallet holder can maintain a primary wallet under one passphrase and a separate, hidden wallet under a different passphrase from the *same* mnemonic backup — if coerced into revealing the mnemonic, they can reveal it (and a decoy passphrase, or none) without necessarily revealing the passphrase protecting funds they'd prefer to keep hidden.
- **An additional security factor**: even if an attacker obtains the physical mnemonic backup (a real, documented risk this book covers in [Seed Phrase Theft](../security/seed-phrase-theft.md)), funds protected by an additional passphrase remain inaccessible without it — the mnemonic alone is insufficient.

This is sometimes informally called a "25th word" (for a 24-word mnemonic), though it isn't actually drawn from the BIP-39 wordlist or subject to any of that list's structure — it can be any string the user chooses.

## A genuine risk the passphrase feature introduces

Because a passphrase produces a *completely different* wallet with no way to verify or recover it if forgotten (there's no checksum on the passphrase the way there is on the mnemonic itself), **losing or forgetting a passphrase is exactly as unrecoverable as losing the mnemonic itself** — see [Lost Coins](../bitcoin/lost-coins.md). This is a real, well-documented source of permanently lost funds: a user sets a passphrase, forgets its exact value (or a single character's capitalization, since passphrases are typically case-sensitive with no correction mechanism), and has no way to distinguish this situation from simply having the wrong mnemonic, since both produce a seemingly "valid" but wrong wallet with no error message at any point.

## Multi-language wordlists

BIP-39 defines wordlists in multiple languages (English, Japanese, Spanish, Chinese, and others, listed in the specification itself) — but **the checksum and derivation mechanics don't care which wordlist a wallet displays the words from**; the same underlying entropy maps to a language-appropriate 2048-word list, but a wallet needs to know which specific wordlist a given mnemonic uses to correctly convert it back to a seed. Using the wrong wordlist (attempting to restore a Japanese-generated mnemonic into a wallet expecting only the English list, for instance) will typically fail validation outright, rather than silently producing a wrong wallet — a reassuring, if narrow, safety property.

## Common misconceptions

**A BIP-39 mnemonic is not a "Bitcoin-only" standard**, despite being introduced and primarily associated with Bitcoin wallets — it's now widely used as a general key-backup mechanism across many blockchain ecosystems, including Ethereum wallets, precisely because it standardizes a genuinely useful, protocol-agnostic mechanism (turning entropy into human-transcribable words) that isn't inherently specific to any one chain's key format.

**A BIP-39 mnemonic's checksum does not validate that the phrase is "the right one" for your funds** — it only validates that the words themselves form a structurally valid BIP-39 phrase (correct wordlist, correct checksum bits). A perfectly valid, checksummed mnemonic can still be the *wrong* mnemonic (a typo that happens to still produce a valid checksum, or simply someone else's unrelated valid phrase) and derive keys with no funds associated with them at all.

## Further reading

- [BIP 39: Mnemonic code for generating deterministic keys](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)

---

[← Previous: Seed Phrases](./seed-phrases.md)
·
[Back to Wallets and Key Management](./README.md)
·
[Next: HD Wallets →](./hd-wallets.md)
