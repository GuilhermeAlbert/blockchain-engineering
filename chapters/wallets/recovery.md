# Key Backup and Recovery

This closing chapter of the Wallets section pulls together a practical discipline from everything covered so far: what actually needs to be backed up, what happens when it isn't, and the specific, documented failure modes worth planning around.

## What actually needs to be backed up

For an ordinary, single-seed HD wallet (see [HD Wallets](./hd-wallets.md)), backing up the [seed phrase](./seed-phrases.md) is sufficient to recover every key that wallet has ever derived or will derive. This is the entire point of the HD structure. But this book has flagged several additional pieces of information, easy to overlook, that are equally necessary for a *complete* recovery in specific situations:

- **The passphrase**, if one was used (see [BIP-39](./bip-39.md#the-optional-passphrase)), without it, the seed phrase alone recovers a different, empty wallet, with no indication anything is wrong.
- **The specific derivation path convention** used (see [Derivation Paths](./derivation-paths.md#why-different-wallets-sometimes-show-different-addresses-for-the-same-seed)), if it's non-default or the wallet doesn't auto-detect it.
- **The full multisig configuration**: which specific public keys, and what threshold, for a multisig setup (see [Multisig](./multisig.md#common-misconceptions)), since having enough individual key backups is useless without knowing how they combine.

## The core tension: redundancy versus exposure

Backup strategy is a genuine, unavoidable tradeoff: a single backup copy, stored in one location, risks total loss if that one location is destroyed (fire, flood, simple misplacement) or the backup itself degrades (paper decaying, ink fading). Multiple copies in multiple locations reduce that risk, but each additional copy is also an additional location where the backup could be found and stolen, directly increasing the attack surface for the exact catastrophic, complete-loss-of-funds scenario a backup exists to prevent. There is no single objectively correct number of backup copies or set of locations. It's a judgment call balancing these two specific, opposing risks, informed by realistic assessment of both the threats an individual actually faces and the value at stake.

## Practical techniques for managing this tension

- **Geographic distribution**: storing copies in physically separate locations (a home safe, a bank safety deposit box, a trusted family member's location) reduces the chance a single localized disaster destroys every copy, at the cost of needing to trust or secure multiple locations.
- **Metal backup plates**: engraving or stamping seed words onto metal (rather than writing on paper) specifically addresses the physical durability half of the risk (resistant to fire, water, and general degradation in ways paper isn't) without addressing the theft/exposure half at all.
- **Shamir's Secret Sharing (SLIP-39)**: splits a seed into multiple shares, where only a threshold number of shares (not all of them) is needed for recovery, meaning no single stolen or lost share compromises or is even sufficient to recover the wallet, addressing both the redundancy problem (losing one share doesn't lose access) and the exposure problem (finding one share doesn't grant access) simultaneously, at the cost of meaningfully more complex setup and recovery procedures than a single seed phrase.
- **Multisig** (see [Multisig](./multisig.md)), as an alternative to splitting a single seed, distributing the actual spending authority itself across multiple independent keys rather than splitting one key's backup.

## Common misconceptions

**A backup that has never been tested is not a verified backup.** A genuinely common, avoidable failure mode is discovering (only at the moment recovery is actually needed, often under stress) that a backup was recorded incorrectly (a mistyped word, a missing page, a photo that didn't fully capture all the words) and doesn't actually work; periodically testing a backup's recoverability (restoring it into a spare device or software wallet, checking the resulting addresses match what's expected, without moving real funds through that test setup unnecessarily) is a meaningfully different and stronger guarantee than simply trusting that a backup was made correctly.

**Recovery information is not "safe" simply because it's split or obscured in some informal, ad-hoc way** (writing half the words on one page and half on another, for instance, without a formally verified scheme like SLIP-39). Informal splitting schemes are easy to get subtly wrong in ways that either don't actually protect against theft (if the split is guessable or one half leaks enough information) or, more commonly, make legitimate recovery harder or impossible if any piece is lost, without providing the tested, deliberate security tradeoffs an actual scheme like Shamir's Secret Sharing is specifically designed to provide.

## Further reading

- [SLIP-39: Shamir's Secret-Sharing for Mnemonic Codes](https://github.com/satoshilabs/slips/blob/master/slip-0039.md)
- See also: [Seed Phrases](./seed-phrases.md), [Multisig](./multisig.md), [Custodial vs Non-Custodial Wallets](./custody.md)

---

[← Previous: Custodial vs Non-Custodial Wallets](./custody.md)
·
[Back to Wallets and Key Management](./README.md)
·
[Next: The Scaling Problem →](../bitcoin-scaling/README.md)
