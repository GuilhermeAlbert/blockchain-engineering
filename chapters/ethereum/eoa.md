# Externally Owned Accounts

An Externally Owned Account (EOA) is the Ethereum account type controlled by a private key — the type every human user directly holds, and the only account type capable of initiating a transaction. This chapter covers exactly what that means, building on the general account structure from [Ethereum Accounts](./accounts.md).

## The defining properties

An EOA has no code (its `codeHash` field is a fixed, universal empty-code hash) and is controlled entirely by whoever holds its corresponding private key — the same [ECDSA](../cryptography/ecdsa.md) key pair mechanics covered in Cryptography, using the same [secp256k1](../cryptography/secp256k1.md) curve Bitcoin uses, though Ethereum derives its addresses differently (see below) and, as of this writing, uses ECDSA exclusively for standard account signatures rather than offering a Schnorr-based alternative the way post-Taproot Bitcoin does.

## Address derivation

An Ethereum address is derived from a public key differently than a Bitcoin address is: rather than the RIPEMD-160-after-SHA-256 "hash160" construction covered in [Addresses](../wallets/addresses.md), Ethereum computes `Keccak-256(publicKey)` and takes the **last 20 bytes** of that hash — no additional checksum-encoding scheme baked into the address format itself the way Bitcoin's Base58Check provides (Ethereum instead uses an optional, separate mixed-case checksum convention, [EIP-55](https://eips.ethereum.org/EIPS/eip-55), applied on top of the raw hex address for typo detection, rather than the checksum being fundamental to the address encoding itself).

## The nonce, and why it matters more than it might first appear

An EOA's nonce — a simple incrementing counter of transactions sent — solves a specific problem: without it, a validly signed transaction could be rebroadcast and re-executed multiple times (a **replay attack**), since a signature alone proves "the key holder authorized this specific transaction," but says nothing about whether it should only execute once. Ethereum's rule that a transaction is only valid if its nonce exactly matches the sender's current on-chain nonce, incrementing by exactly one with each successful transaction, closes this gap — a signed transaction becomes permanently unusable for replay the moment it's successfully processed, since the account's nonce moves past the value that transaction specifies.

This also means **transactions from the same account must be processed in nonce order** — a transaction with nonce 5 cannot be included before the transaction with nonce 4 from the same account has been processed, which is a real, practical consideration for anyone building software that sends multiple transactions from the same EOA in quick succession (see [Sending Transactions](../web3/sending-transactions.md)).

## Every transaction traces back to an EOA

Restating the structural point from [Ethereum Accounts](./accounts.md#the-two-kinds-of-account): contract accounts can call other contracts, and those calls can chain arbitrarily deep, but tracing any such chain backward always terminates at some EOA's directly signed, originating transaction — there is no path to on-chain execution that doesn't ultimately begin with an EOA's signature.

## Common misconceptions

**An EOA is not the same thing as a "wallet address" in some vague, informal sense** — it's a precisely defined account type (no code, controlled by a private key) within Ethereum's protocol-level account model, distinct specifically from contract accounts, which can also receive and hold funds at their own, differently-derived addresses.

**Ethereum addresses are not case-sensitive at the protocol level** — the mixed-case checksum (EIP-55) is a client-side, human-readable convention layered on top for typo detection; the underlying 20-byte address the protocol actually processes has no concept of letter case.

## Further reading

- [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) — Appendix F (Signing Transactions)
- [EIP-55: Mixed-case checksum address encoding](https://eips.ethereum.org/EIPS/eip-55)

---

[← Previous: Ethereum Accounts](./accounts.md)
·
[Back to Ethereum](./README.md)
·
[Next: Contract Accounts →](./contract-accounts.md)
