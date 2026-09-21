# Private and Public Keys

A private key is, at bottom, a single large random number. Everything else (public keys, addresses, wallets, the ability to spend funds) is derived from that number through fixed, public mathematical operations. This chapter makes that concrete: what a key actually is, how a public key is derived from it, and why the randomness of that first number is the single most important security property in this entire book.

## What a private key actually is

For the elliptic curve Bitcoin and Ethereum use (secp256k1, covered in [secp256k1](./secp256k1.md)), a private key is simply an integer between 1 and approximately 1.158 × 10^77 (precisely, one less than the curve's order, a specific large prime number defined in the secp256k1 specification). That's it, no special structure, no embedded information, just a number, typically represented as 256 bits (32 bytes), often shown in hexadecimal:

```text
Example private key (for demonstration only — never use this or any published key for real funds):
0000000000000000000000000000000000000000000000000000000000002a
```

The entire security of everything built on top of this number depends on it being chosen **unpredictably** from the full range of possible values, see [Entropy](../wallets/seed-phrases.md#entropy) for how wallets actually generate this randomness in practice, and [Seed Phrases](../wallets/seed-phrases.md) for how humans back up and reconstruct this number without writing down the raw hex.

## Deriving the public key

The public key is computed from the private key through **elliptic curve point multiplication**: the curve has an agreed-upon starting point called the **generator point** `G`, and the public key is computed as `PublicKey = privateKey × G`, where `×` here means "add `G` to itself, on the curve, `privateKey` times", not ordinary multiplication (see [Elliptic Curves](./elliptic-curves.md) for exactly what "adding points on a curve" means geometrically and algebraically).

This operation is fast to compute in the forward direction (efficient algorithms exist to compute `k × G` even for enormous values of `k`, using repeated doubling rather than literally adding `G` to itself one time per unit of `k`) and, as far as any known mathematics or algorithm can currently do, infeasible to reverse, recovering `privateKey` from `PublicKey` and `G` is the elliptic curve discrete logarithm problem mentioned in [Public-Key Cryptography](./public-key-cryptography.md), and no efficient classical algorithm for solving it is known.

## Example

```typescript
import { secp256k1 } from "@noble/curves/secp256k1.js";
import { hexToBytes, bytesToHex } from "@noble/curves/utils.js";

// A toy private key (the number 42) — for demonstration only, never use a value this simple for real funds.
const privateKeyHex = (42).toString(16).padStart(64, "0");
const privateKeyBytes = hexToBytes(privateKeyHex);

const publicKey = secp256k1.getPublicKey(privateKeyBytes, false); // uncompressed form
console.log("Private key (decimal):", BigInt("0x" + privateKeyHex).toString());
console.log("Public key (hex):     ", bytesToHex(publicKey));
```

```text
Private key (decimal): 42
Public key (hex):      04fe8d1eb1bcb3432b1db5833ff5f2226d9cb5e65cee430558c18ed3a3c86ce1a
                        f07b158f244cd0de2134ac7c1d371cffbfae4db40801a2572e531c573cda9b5b4
```

This uses [`@noble/curves`](https://github.com/paulmillr/noble-curves), a widely used, audited pure-TypeScript implementation of secp256k1 and other curves, install with `npm install @noble/curves` (the example above targets v2.x's API and module paths; check the library's current documentation if a different major version is installed). Running this deterministically produces the same public key every time for the same private key, which is the point: this is a pure mathematical function, not a random process, the only randomness in the entire system is in the original choice of private key, discussed further below. The output above is verified directly from running this exact code, not hand-computed.

## Public keys: compressed and uncompressed

A point on an elliptic curve has two coordinates, `(x, y)`. The **uncompressed** public key format includes both, prefixed with `0x04` (65 bytes total for secp256k1). Because the curve equation means that for any valid `x` coordinate there are only two possible `y` values (one even, one odd), a **compressed** format can store just the `x` coordinate plus a single byte indicating which of the two `y` values applies (`0x02` for even, `0x03` for odd), 33 bytes total, roughly half the size. Modern Bitcoin wallets and addresses overwhelmingly use compressed public keys by default, since the space savings compound across every transaction that includes one.

## Tradeoffs

The entire system's security rests on one property: private keys must be generated with **sufficient entropy**, genuine, unpredictable randomness spread across the full range of possible values. A private key generated with weak or predictable randomness (a poorly seeded random number generator, a private key derived from a guessable phrase, or reused randomness across signatures. See [Nonce Reuse](./ecdsa.md#nonce-reuse-the-single-most-consequential-implementation-bug)) can be found by an attacker far faster than brute-force search across the full key space would suggest, regardless of how strong the underlying elliptic curve mathematics is. This is a documented, real-world failure mode, not a theoretical one. Several publicized Bitcoin thefts have been traced to poor private key randomness in specific wallet software, discussed further in [Private Key Theft](../security/private-key-theft.md).

## Common misconceptions

**A private key is not a password you choose.** It must be generated with cryptographically secure randomness across its full possible range, a private key based on a memorable phrase, a birthdate, or any human-guessable pattern is catastrophically insecure, because attackers can and do run scripts checking guessable private keys against the blockchain for any funds sent to their corresponding addresses.

**The public key is not the same as a Bitcoin address.** An address is derived by hashing the public key and encoding the result (see [Addresses](../wallets/addresses.md)). This extra step means an address reveals less information than a raw public key, discussed further in that chapter.

## Try it yourself

Install `@noble/curves` (`npm install @noble/curves`) and run the example above with several different private key values. Confirm that the same input always produces the same public key, and that changing even one bit of the private key produces a completely unrelated-looking public key.

## Further reading

- [SEC 2: Recommended Elliptic Curve Domain Parameters](https://www.secg.org/sec2-v2.pdf): the formal specification defining secp256k1's generator point, order, and other parameters
- [`@noble/curves` source and documentation](https://github.com/paulmillr/noble-curves)

---

[← Previous: Public-Key Cryptography](./public-key-cryptography.md)
·
[Back to Cryptography](./README.md)
·
[Next: Elliptic Curves →](./elliptic-curves.md)
