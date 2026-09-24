# Self-Custody

Self-custody means controlling the keys or authorization policy needed to move assets without asking a custodian. It removes one institutional dependency and transfers security, backup, recovery, and succession to the holder.

## Authority and responsibility

A single-key wallet gives one secret complete authority. A hardware wallet can isolate that key, but the user still verifies transactions and protects recovery material. A multisig spreads authority across keys. A smart account can add guardians, spending limits, delayed recovery, or session keys, while introducing contract and upgrade assumptions.

Self-custody does not require one person to hold one seed phrase. It requires that the user-defined policy, rather than an exchange account, controls execution.

## Failure modes

Loss and theft pull in opposite directions. More backups improve availability and increase exposure. Complex schemes resist one failure and create procedural failures. A geographically distributed multisig helps with local disaster but may make urgent coordination hard.

Test recovery before funding. Record device models, derivation paths, wallet policy, signer order where relevant, and software needed to reconstruct the account. Never store those instructions with enough secret material to authorize spending.

## Inheritance and incapacity

An heir needs both authority and knowledge that assets exist. A plan can use documented backups, multisig co-signers, legal instructions, or time-delayed recovery. It should account for incapacity, not only death, and avoid giving one helper immediate unilateral control.

Laws governing estates, trusts, taxes, and fiduciary duties vary. The cryptographic recovery path must fit the legal plan rather than substitute for professional advice.

## Operational boundaries

Self-custody does not remove token-issuer freezes, contract bugs, bridge trust, phishing, or transaction fees. It protects against a custodian refusing or losing the asset only when the asset itself remains transferable and the user can reach the network.

## Further reading

- [Key Backup and Recovery](../wallets/recovery.md)
- [Multisig](../wallets/multisig.md)
- [Seed Phrase Theft](../security/seed-phrase-theft.md)

---

[← Previous: Censorship Resistance](./censorship-resistance.md)
·
[Back to Regulation and Society](./README.md)
·
[Next: Stablecoins and Dollarization →](./stablecoins-and-dollarization.md)
