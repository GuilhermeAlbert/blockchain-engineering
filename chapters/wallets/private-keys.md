# Private Keys

This chapter is short and specific: it establishes exactly what a wallet does and does not do with a private key, correcting the "your coins are stored in your wallet" framing this book has flagged since [The UTXO Model](../bitcoin/utxo.md). The underlying cryptography — what a private key mathematically is, how a public key is derived from it — is covered fully in [Private and Public Keys](../cryptography/keys.md); this chapter is about the wallet's specific job managing that key.

## What a wallet actually does with a private key

A wallet generates, stores (in some form), and uses private keys to construct and sign transactions on your behalf. It does not "contain" your bitcoin in any literal sense — your bitcoin, more precisely the [UTXOs](../bitcoin/utxo.md) associated with addresses your keys control, exist on the blockchain itself, replicated across every full node in the network. A wallet losing its private key data doesn't destroy any bitcoin; it destroys your *ability to prove ownership and construct valid spending transactions* for whatever UTXOs that key controlled — the UTXOs themselves remain, unchanged and unspendable by anyone, forever (see [Lost Coins](../bitcoin/lost-coins.md)).

## Precise language versus casual language

This book's writing-principles commitment (stated in the top-level README) says: don't say "your Bitcoin is stored in your wallet." Say: **"the wallet manages the private keys and transaction data required to spend UTXOs associated with addresses controlled by those keys."** This precision matters practically, not just pedantically: it clarifies why "backing up your wallet" really means "backing up your private key material" (see [Seed Phrases](./seed-phrases.md) and [Key Backup and Recovery](./recovery.md)), why switching wallet software doesn't require "moving" your coins anywhere (you're just pointing different software at the same keys, or generating new keys and sending an on-chain transaction to them), and why a wallet's security is entirely about key security, not about "protecting a balance" the way a bank app protects an account number.

## How a wallet actually spends funds, end to end

1. Scans the blockchain (or queries a service that does) for UTXOs associated with addresses derived from its keys.
2. When you initiate a payment, selects appropriate UTXOs to use as inputs (**coin selection**, introduced in [The UTXO Model](../bitcoin/utxo.md#example-computing-a-wallets-balance)).
3. Constructs a transaction spending those inputs, with an output paying the recipient and, typically, a change output paying any leftover value back to an address the wallet controls.
4. Signs the transaction using the relevant private key(s) — the actual cryptographic step covered in [Digital Signatures](../cryptography/digital-signatures.md) and [ECDSA](../cryptography/ecdsa.md)/[Schnorr Signatures](../cryptography/schnorr.md).
5. Broadcasts the signed transaction to the network.

At no point in this process does the private key leave the wallet software (or hardware, for a [hardware wallet](./hardware-wallets.md)) that holds it — only the resulting signature and public key data are ever transmitted.

## Common misconceptions

**"My wallet was hacked and my Bitcoin was stolen" is a real, common description of a real event, but it's worth being precise about what actually happened**: an attacker gained access to the private key material (through malware, a phishing attack, a compromised backup, or similar — see [Private Key Theft](../security/private-key-theft.md)) and used it to sign a transaction moving the associated UTXOs to an address they control. The "theft" is the signing of a valid, properly authorized (by the compromised key) transaction — not a breach of the blockchain itself, which continues operating exactly as designed throughout.

**Deleting wallet software does not delete or destroy any bitcoin.** If you have a backup of the private key material (see [Key Backup and Recovery](./recovery.md)), any wallet software supporting the same key format can reconstruct full access to the same funds — the software is a tool for managing keys, not a container holding value.

## Further reading

- [Private and Public Keys](../cryptography/keys.md) — the underlying cryptography
- See also: [Seed Phrases](./seed-phrases.md), [Custodial vs Non-Custodial Wallets](./custody.md)

---

[← Previous: Addresses](./addresses.md)
·
[Back to Wallets and Key Management](./README.md)
·
[Next: Public Keys →](./public-keys.md)
