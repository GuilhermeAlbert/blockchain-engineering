# secp256k1

secp256k1 is the specific elliptic curve Bitcoin uses for every key and signature, and which Ethereum also adopted. This short chapter covers the curve's exact parameters, why Bitcoin chose it over more common alternatives, and where it shows up elsewhere in cryptography.

## The name

"secp256k1" decodes as: **S**tandards for **E**fficient **C**ryptography, a **P**rime field curve, with a **256**-bit field size, from the "**k**oblitz" family (a specific class of curves with computational efficiency advantages), and it is curve number **1** in that naming sequence within the SEC2 standard. It was specified by Certicom Research, a cryptography company, in the SEC 2 document (Standards for Efficient Cryptography), first published in 2000.

## The exact parameters

secp256k1 is defined, per [SEC 2: Recommended Elliptic Curve Domain Parameters](https://www.secg.org/sec2-v2.pdf), by:

- **The curve equation**: `y² = x³ + 7` (mod p), with `a = 0` and `b = 7`, one of the simplest possible non-trivial curves.
- **The field prime `p`**: `2^256 - 2^32 - 977`, a specific 256-bit prime chosen for particular computational efficiency properties (its bit pattern allows faster modular reduction than an arbitrary prime of the same size).
- **The generator point `G`**: a specific, fixed `(x, y)` coordinate pair on the curve, published in the standard, from which every public key is derived via `PublicKey = privateKey × G`.
- **The order `n`**: the number of points reachable by repeatedly adding `G` to itself, which is `0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141`, a large prime slightly less than `2^256`, and the actual upper bound on valid private key values (a private key must be an integer between 1 and `n - 1`, referenced in [Private and Public Keys](./keys.md)).

## Why Bitcoin chose secp256k1

This is one of the more debated design choices in Bitcoin's history, because secp256k1 was, at the time of Bitcoin's creation, a comparatively unusual choice, the more common elliptic curve choices in mainstream cryptographic software at the time were the NIST-standardized curves (such as secp256r1, also called P-256), which are Koblitz-family alternatives with different generation parameters. Two documented, technical reasons are generally cited for secp256k1's selection:

1. **Computational efficiency.** The Koblitz-curve family, which secp256k1 belongs to, allows certain optimizations in the point-multiplication arithmetic (exploiting the curve's specific algebraic structure, called an efficiently computable endomorphism) that are not available to the NIST P-curves, making secp256k1 measurably faster for the signing and verification operations Bitcoin performs constantly.
2. **Provenance concerns about NIST curves.** The NIST-standardized curves' parameters were generated using unexplained "seed" values whose origin was never publicly justified in a way that rules out the possibility they were deliberately chosen to hide a weakness, a concern that gained significant public attention following the 2013 revelations (from Edward Snowden's disclosures) that the NSA had deliberately weakened a different, unrelated NIST cryptographic standard (the Dual_EC_DRBG random number generator). secp256k1's parameters, by contrast, are derived from simpler, more transparently justifiable mathematical choices, similar in spirit to the "nothing-up-my-sleeve" reasoning discussed for SHA-256's constants in [SHA-256](./sha-256.md#4-the-compression-function).

It is worth being precise about timing here: Bitcoin's whitepaper and initial code (2008–2009) predate the 2013 Dual_EC_DRBG revelations by several years, so later suspicion of some NIST-associated designs cannot be projected backward as Satoshi's documented motive. Satoshi's surviving public writings do not explain why secp256k1 was selected over the alternatives.

## Where else secp256k1 is used

Beyond Bitcoin, secp256k1 is used by Ethereum (for account keys and transaction signatures, see [Ethereum Accounts](../ethereum/accounts.md)) and by most other cryptocurrencies derived from or influenced by Bitcoin's design. This makes it, by a wide margin, the most-used elliptic curve in the cryptocurrency ecosystem specifically, even though it remains a less common choice than the NIST P-curves or Curve25519 in general-purpose software like TLS and SSH.

## Example: verifying the curve parameters directly

```typescript
import { secp256k1 } from "@noble/curves/secp256k1.js";

// secp256k1's field prime: 2^256 - 2^32 - 977
const p = (2n ** 256n) - (2n ** 32n) - 977n;
console.log("Field prime matches library:", p === secp256k1.Point.Fp.ORDER);

// The curve's order (number of points reachable from G)
console.log("Curve order (n):", secp256k1.Point.Fn.ORDER.toString(16));
```

```text
Field prime matches library: true
Curve order (n): fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141
```

This confirms the field prime the library uses matches the value published in the SEC 2 standard, and prints the curve's order in hexadecimal, matching the value quoted above.

## Common misconceptions

**secp256k1 is not a Bitcoin-specific invention.** It is a general-purpose elliptic curve standard published years before Bitcoin existed, which Bitcoin adopted rather than created.

**Using the same curve as Bitcoin does not mean Ethereum's or any other cryptocurrency's key format is directly interoperable with Bitcoin's.** The underlying curve math is shared, but address encoding, derivation paths, and signature schemes differ between chains, see [Addresses](../wallets/addresses.md) and [Ethereum Accounts](../ethereum/accounts.md).

## Further reading

- [SEC 2: Recommended Elliptic Curve Domain Parameters](https://www.secg.org/sec2-v2.pdf): Certicom Research
- [Bitcoin Core source: secp256k1 library](https://github.com/bitcoin-core/secp256k1): the specific, highly optimized implementation Bitcoin Core uses

---

[← Previous: Elliptic Curves](./elliptic-curves.md)
·
[Back to Cryptography](./README.md)
·
[Next: Digital Signatures →](./digital-signatures.md)
