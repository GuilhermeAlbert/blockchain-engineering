# Custodial vs Non-Custodial Wallets

This is the single most consequential distinction in how people actually hold Bitcoin, and it's frequently under-explained: **who controls the private keys**. This chapter covers the difference precisely, since it determines who ultimately has power over any given set of funds — not who the funds nominally "belong to."

## The distinction, precisely

A **non-custodial** (or "self-custody") wallet is one where the user alone holds and controls the private keys — the pattern this entire Wallets section has assumed and described throughout. A **custodial** wallet is one where a third party (an exchange, a custodian, some app or service) holds the private keys on the user's behalf, and the user interacts with a balance the custodian tracks and reports, typically via a conventional username/password login rather than direct key management.

## What custody actually determines

This distinction is often summarized by the phrase **"not your keys, not your coins"** — a piece of community shorthand worth unpacking rather than just repeating: with a custodial holding, the user doesn't control the private keys that would let them construct a valid, network-accepted transaction moving those funds. They have a claim against the custodian (a contractual or trust-based promise that the custodian will honor withdrawal requests), not direct, cryptographic control over specific UTXOs the way a non-custodial holder does (see [Private Keys](./private-keys.md#what-a-wallet-actually-does-with-a-private-key)). This is not a hypothetical distinction — it has produced real, well-documented, consequential outcomes: when a custodian becomes insolvent, is hacked, freezes withdrawals, or otherwise fails to honor its obligations, custodial holders' access to "their" funds depends entirely on that custodian's solvency, honesty, and continued cooperation, in a way a non-custodial holder's access never does.

## Why custodial services exist and are widely used anyway

Custody isn't simply a mistake users make out of ignorance — it offers real, legitimate benefits many users reasonably value: no risk of individually losing a seed phrase or private key (a real, common failure mode for self-custody, see [Lost Coins](../bitcoin/lost-coins.md)), a familiar username/password recovery process rather than an unforgiving, unrecoverable-if-lost seed phrase, and, for active trading, the operational convenience of not needing to move funds on-chain (with real fees and confirmation delays) for every transaction — an exchange can update internal balances instantly, off-chain, for trades between its own users. This book does not treat custodial holding as inherently wrong; it's a genuine tradeoff between convenience and control, appropriate for some purposes (active trading, amounts a user is comfortable trusting to a specific, reputable custodian) and inappropriate for others (long-term savings someone specifically wants no counterparty risk on).

## The documented failure modes of custody

Bitcoin and broader cryptocurrency history includes multiple, well-documented cases of custodial failures resulting in users permanently losing access to funds — including exchange hacks (Mt. Gox, 2014, historically the most significant early example, though the specific circumstances and eventual creditor recovery process are their own detailed, separate story this book doesn't cover in full here) and outright fraud or mismanagement (FTX, 2022). These are cited throughout this book's Security and Society sections not to argue custody should never be used, but because understanding *why* they happened — a custodian controlling keys and simply failing to have (or dishonestly claiming to have) sufficient reserves to honor withdrawals — is directly explained by the custody distinction this chapter establishes.

## Common misconceptions

**A custodial "balance" shown in an app is not the same kind of fact as a UTXO you control the private key for.** The app-displayed number is the custodian's internal record of what they owe you, not a cryptographic proof of your own current, independently verifiable control over specific funds.

**Self-custody is not automatically "safer" in every dimension** — it removes counterparty risk (the custodian failing or acting dishonestly) but adds full personal responsibility for key security, backup, and recovery, with no recourse or recovery process if that responsibility is mishandled. Both models carry real, different risks; neither is a strictly dominant choice for every user and every amount.

## Further reading

- See also: [Key Backup and Recovery](./recovery.md), [Exchanges](../society/exchanges.md), [Self-Custody](../society/self-custody.md)

---

[← Previous: Multisig](./multisig.md)
·
[Back to Wallets and Key Management](./README.md)
·
[Next: Key Backup and Recovery →](./recovery.md)
