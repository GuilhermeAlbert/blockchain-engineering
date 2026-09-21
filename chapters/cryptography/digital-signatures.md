# Digital Signatures

A digital signature proves that someone possessing a specific private key authorized a specific message, in a way anyone holding the corresponding public key can independently verify — without the signer ever revealing the private key. This is the mechanism that authorizes every Bitcoin and Ethereum transaction. This chapter covers the general concept and its required properties before the next two chapters cover the two specific signature schemes Bitcoin actually uses: [ECDSA](./ecdsa.md) and [Schnorr Signatures](./schnorr.md).

## The problem

[Bitcoin transactions](../bitcoin/transactions.md) need to prove that whoever is spending a given set of coins is actually authorized to do so — specifically, that they control the private key associated with the address those coins were sent to. Doing this naively — like sending the private key itself as proof — would be catastrophic: anyone who observed that transaction could then use the same private key to spend from that address again. A digital signature scheme solves this by letting the private key holder prove control of the key without ever exposing it.

## The three required properties

A digital signature scheme must provide:

- **Authentication**: a valid signature can only have been produced by someone with access to the private key. Nobody without the key should be able to forge a signature that verifies successfully, even after seeing many other valid signatures from the same key.
- **Non-repudiation**: once someone has signed a message, they cannot credibly deny having done so, since the signature could only have come from their private key. In a legal or contractual context, this makes digital signatures load-bearing evidence of consent, though this book focuses on their technical role in authorizing transactions rather than their legal standing.
- **Integrity**: the signature is tied specifically to the exact message signed. If even a single bit of the signed message changes, the signature no longer verifies — this is what makes a signature over a Bitcoin transaction protect the entire transaction's contents (amounts, recipients, and so on), not just prove "this key was used at some point."

## The general shape of a signature scheme

Every digital signature scheme (ECDSA, Schnorr, RSA-based schemes, and others) provides three algorithms:

1. **Key generation**: produces a private/public key pair, as covered in [Private and Public Keys](./keys.md).
2. **Signing**: takes a private key and a message (in practice, a hash of the message — see below) and produces a signature.
3. **Verification**: takes a public key, a message, and a signature, and returns true or false — whether the signature is valid for that specific message and public key.

## Why you sign a hash, not the raw message

In practice, no signature scheme signs an arbitrarily large message directly — the message is first run through a cryptographic hash function (see [Hash Functions](./hashes.md)), and the signature is computed over the resulting fixed-size hash. This has two benefits: it makes signing efficient regardless of message size (signing a 32-byte hash takes the same time whether the original message was one word or one gigabyte), and it relies on the hash function's collision resistance (see [Hash Collisions](./collisions.md)) to guarantee that a signature valid for one message's hash cannot be reinterpreted as valid for some other, different message that happens to produce the same hash. This is why the hash function's own security properties directly matter to the overall security of anything built on top of it — a signature scheme is only as strong as the weaker of the signature algorithm and the hash function feeding it.

## Malleability: a subtlety worth naming here

A signature scheme can be **malleable** if, given one valid signature for a message, it's possible to compute a *different* valid signature for the same message without knowing the private key. This sounds harmless (the message and its authorization haven't changed) but caused a real, documented problem for Bitcoin: because early Bitcoin transaction IDs were computed by hashing the entire transaction *including* its signatures, an attacker could take a broadcast, unconfirmed transaction, produce a different but equally valid signature for the same spend, rebroadcast it with a different resulting transaction ID, and potentially get the modified version confirmed instead of the original — this is **transaction malleability**, and it complicated systems (including early Lightning Network payment channel designs) that referenced transactions by their ID before confirmation. [SegWit](../bitcoin/segwit.md) resolved this specific issue by moving signature data outside the part of the transaction used to compute its ID. This is covered fully in [SegWit](../bitcoin/segwit.md); it's mentioned here because signature malleability is a property of the underlying signature scheme, not a transaction-format detail, and understanding it requires understanding what a signature scheme actually guarantees (and doesn't) in the first place.

## Tradeoffs

Digital signatures replace a physical or bureaucratic trust mechanism (a notary, a witnessed physical signature, a bank verifying your identity) with a purely mathematical one, which removes the need for any third party but shifts the entire burden of security onto private key management: there is no recourse, no "forgot my signature" recovery process, and no institution that can reverse a signed transaction if a private key is stolen or lost (see [Private Key Theft](../security/private-key-theft.md) and [Key Backup and Recovery](../wallets/recovery.md)). This is a genuine, significant tradeoff, not a strict improvement over trust-based systems — it trades institutional recourse for cryptographic certainty and self-sovereignty.

## Common misconceptions

**A digital signature does not encrypt or hide the signed message.** Bitcoin transaction data, including its signatures, is fully public on the blockchain — a signature proves authorization, it does not provide confidentiality. Confusing signing with encryption is a common but consequential error; see [Public-Key Cryptography](./public-key-cryptography.md#how-it-works-two-main-use-cases) for the distinction.

**Signing the same message twice with the same key does not necessarily produce the identical signature**, depending on the scheme and its nonce-generation approach — this is a deliberate design detail covered in depth, including a serious historical security failure that resulted from getting it wrong, in [ECDSA](./ecdsa.md#nonce-reuse-the-single-most-consequential-implementation-bug).

## Further reading

- [Handbook of Applied Cryptography, Chapter 11: Digital Signatures](https://cacr.uwaterloo.ca/hac/about/chap11.pdf) — Menezes, van Oorschot, Vanstone (free, widely cited reference text)

---

[← Previous: secp256k1](./secp256k1.md)
·
[Back to Cryptography](./README.md)
·
[Next: ECDSA →](./ecdsa.md)
