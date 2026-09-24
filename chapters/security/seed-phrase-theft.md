# Seed Phrase Theft

A seed phrase is a human-readable encoding of entropy used to derive a wallet's keys. In a typical BIP-39 and BIP-32 wallet, the same phrase can recreate every account on every supported chain. It is a backup, but it is also a portable master secret.

## Why the phrase is more valuable than one key

A wallet may derive thousands of private keys from one seed. Stealing one private key compromises one account or address. Stealing the seed can expose the entire derivation tree, including accounts the owner has not used yet. An attacker can import it into unrelated wallet software and scan common derivation paths without touching the victim's device again.

The optional BIP-39 passphrase changes the derived seed. It is sometimes called a twenty-fifth word, though it can be any string. It is not an extra checksum and cannot be recovered from the mnemonic. Every passphrase produces a valid wallet, so a typing mistake silently opens a different set of accounts. The phrase and passphrase must be backed up separately if separation is part of the threat model.

## Common exposure paths

Seed phrases leak through behavior that feels like backup:

- photographs enter phone and cloud-photo backups;
- notes synchronize across devices;
- printers, scanners, and network storage retain copies;
- browser forms and fake wallet extensions capture words in order;
- support impersonators ask the user to “verify” or “synchronize” a wallet;
- a paper or metal backup is found, photographed, or coerced from its owner.

A legitimate wallet may ask for the phrase during initial import or recovery. That does not make every phrase prompt legitimate. The user must verify the software and environment before typing. No support agent, airdrop, token migration, or troubleshooting conversation needs the phrase.

## Backup design is a threat-model decision

One copy creates a loss risk. Many copies create a theft risk. A home safe protects against casual discovery but not every fire, flood, burglary, or coercion scenario. A bank deposit box changes the threat to access rules and institutional availability. Secret sharing can distribute recovery material, but introduces procedure risk: holders may lose shares, combine them incorrectly, or expose enough shares during a rehearsal.

Do not split a BIP-39 phrase into informal word groups and assume it behaves like cryptographic secret sharing. The remaining words and checksum structure may leave much less uncertainty than expected. Use a specified scheme and test recovery with a wallet that supports that exact scheme.

## What to do after suspected exposure

Treat a photographed, typed, copied, or briefly unattended phrase as compromised. Creating a new password on the same wallet does not change derived keys. Generate a new seed on a trusted device, verify the new backup, and move assets and authorities to accounts derived from the new seed. Token approvals, contract roles, validator duties, and identities tied to old addresses may require separate migration.

Recovery practice matters. A backup that has never been tested is an assumption. Test with an empty or low-value wallet, confirm the expected addresses, then document the procedure without recording the secret itself.

## Further reading

- [BIP 39: Mnemonic code for generating deterministic keys](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- [BIP 32: Hierarchical deterministic wallets](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
- See also: [Seed Phrases](../wallets/seed-phrases.md), [BIP-39](../wallets/bip-39.md), [Key Backup and Recovery](../wallets/recovery.md)

---

[← Previous: Private Key Theft](./private-key-theft.md)
·
[Back to Security](./README.md)
·
[Next: Phishing →](./phishing.md)
