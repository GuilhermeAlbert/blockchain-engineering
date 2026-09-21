# Public-Key Cryptography

Public-key cryptography (also called asymmetric cryptography) uses a mathematically related pair of keys — one kept secret, one shared openly — instead of a single shared secret. This chapter covers the concept in general terms before the next chapters get specific about the exact mathematics (elliptic curves) and exact use case (digital signatures) Bitcoin and Ethereum rely on.

## The problem

**Symmetric cryptography** — where the same secret key both locks and unlocks data — has a distribution problem: before two parties can communicate securely, they need to somehow already share a secret key, which itself has to be transmitted over some channel. If that channel isn't already secure, you have a chicken-and-egg problem: you need a secure channel to establish the secret that would let you create a secure channel.

Public-key cryptography, developed independently by Whitfield Diffie and Martin Hellman (published 1976) and, as later declassified documents revealed, earlier and separately within British intelligence (GCHQ) by James Ellis, Clifford Cocks, and Malcolm Williamson in the early 1970s, solves this by using two mathematically linked keys instead of one: a **public key**, which can be shared openly with anyone, and a **private key**, which must be kept secret by its owner. The mathematical relationship between them is designed so that operations performed with one key can only be reversed or verified using the other — and, critically, knowing the public key does not let you derive the private key, at least not with any known practical method (see [Elliptic Curves](./elliptic-curves.md) for the specific hard mathematical problem this relies on for Bitcoin and Ethereum).

## How it works: two main use cases

### Encryption (not the primary use in this book)

One public-key application: anyone can encrypt a message using the recipient's public key, but only the holder of the matching private key can decrypt it. This is how, for example, HTTPS establishes secure connections. **This book focuses much less on this use case** — Bitcoin and Ethereum transactions are not encrypted, they are broadcast in the open (see [Privacy](../society/privacy.md)) — and much more on the second use case below.

### Digital signatures (the primary use in this book)

The reverse operation: the private key holder can produce a **signature** over a message, and anyone holding the corresponding public key can verify that signature was produced by someone who controls the private key, without that verifier ever needing the private key itself. This is the mechanism that authorizes Bitcoin transactions and Ethereum transactions alike — proving the right to spend funds without ever transmitting the private key over the network. This is covered in full in [Digital Signatures](./digital-signatures.md), [ECDSA](./ecdsa.md), and [Schnorr Signatures](./schnorr.md).

## Why "asymmetric" is the precise term

The key pair is asymmetric in capability, not just in secrecy: the private key can do things (sign, decrypt) the public key cannot, while the public key can do things (verify, encrypt) that reveal nothing about the private key. This is different from, say, a physical lock and key, where possessing the key gives you full capability and there's no meaningful "public half" — the mathematical structure of public-key cryptography specifically allows one half to be shared without compromising the other, which has no direct physical analogue.

## The hard problem underneath

Every public-key system rests on a specific mathematical problem that is easy to compute in one direction and believed to be infeasible to reverse. Bitcoin and Ethereum both use **elliptic curve cryptography**, which relies on the **elliptic curve discrete logarithm problem**: given a point `P` on a curve and the result of adding `P` to itself `k` times (written `k·P`), it is computationally infeasible to recover `k` even though computing `k·P` from `k` is fast. This asymmetry — fast in one direction, infeasible in the other — is the entire security foundation of the keys covered in [Private and Public Keys](./keys.md) and [Elliptic Curves](./elliptic-curves.md). Older systems including RSA rely on a different hard problem (integer factorization: multiplying two large primes is fast, but factoring their product back into the original primes is believed to be infeasible), which is not the approach Bitcoin or Ethereum use, though it remains common in other contexts, including much of the infrastructure underlying HTTPS.

## Tradeoffs

Public-key cryptography solves the key-distribution problem symmetric cryptography faces, but at a real computational cost: public-key operations (signing, verifying, the underlying elliptic curve point multiplication) are substantially slower than symmetric encryption operations, which is why most real-world secure systems, including TLS, use public-key cryptography only to establish an initial secure connection and a shared symmetric key, then switch to faster symmetric encryption for the bulk of the data. Bitcoin and Ethereum use public-key cryptography specifically for its signature property (proving authorization) rather than for bulk encryption, since transaction data itself is meant to be public, not confidential.

## Common misconceptions

**A public key is not the same as an address.** In Bitcoin, an address is a hashed, encoded derivative of a public key (see [Addresses](../wallets/addresses.md)), not the public key itself — this extra hashing step provides some practical benefits covered in that chapter.

**Losing your private key is not the same failure mode as someone learning your public key.** Public keys are meant to be shared; private keys must never be shared. Confusing the two, or accidentally treating a private key as safe to display, is one of the most consequential mistakes possible in this entire field — see [Private Key Theft](../security/private-key-theft.md).

## Further reading

- [New Directions in Cryptography](https://ee.stanford.edu/~hellman/publications/24.pdf) — Whitfield Diffie and Martin Hellman, 1976
- GCHQ's declassified account of Ellis, Cocks, and Williamson's earlier, independent, classified work on public-key cryptography — TODO: link the specific official GCHQ or CESG historical release once verified

---

[← Previous: Preimage Resistance](./preimage-resistance.md)
·
[Back to Cryptography](./README.md)
·
[Next: Private and Public Keys →](./keys.md)
