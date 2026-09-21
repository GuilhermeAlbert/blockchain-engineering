# ECDSA

ECDSA (the Elliptic Curve Digital Signature Algorithm) is the signature scheme Bitcoin used exclusively from its 2009 launch until [Taproot](../bitcoin/taproot.md) added Schnorr signatures as an alternative in 2021, and remains the scheme most Bitcoin transactions and virtually all Ethereum transactions use today. This chapter covers exactly how it works, verified against a real implementation, and covers in detail the single implementation mistake that has caused more real-world cryptocurrency theft than almost any other cryptographic error: nonce reuse.

## How signing works

Given a private key `d`, a message hash `z` (see [Digital Signatures](./digital-signatures.md#why-you-sign-a-hash-not-the-raw-message)), and the curve's generator point `G` and order `n` (see [secp256k1](./secp256k1.md)):

1. **Generate a random nonce `k`.** This must be a fresh, unpredictable value for every single signature. The reason why is the entire subject of this chapter's second half.
2. **Compute the curve point `R = k × G`**, and take `r`, the x-coordinate of `R`, reduced modulo `n`.
3. **Compute `s = k⁻¹ × (z + r × d) mod n`**, where `k⁻¹` is the modular inverse of `k`.
4. **The signature is the pair `(r, s)`.**

## How verification works

Given the public key `Q = d × G`, the message hash `z`, and the signature `(r, s)`:

1. Compute `w = s⁻¹ mod n`.
2. Compute `u1 = z × w mod n` and `u2 = r × w mod n`.
3. Compute the point `(x, y) = u1 × G + u2 × Q`.
4. **The signature is valid if `x mod n` equals `r`.**

This works because of how `r` and `s` were constructed during signing. The algebra is designed so that the verification formula reconstructs the same `r` value only if the signature was produced by someone who knew the private key `d` corresponding to `Q`, without the verifier ever needing to know `d` or `k`.

## Example: signing and verifying, verified end to end

```typescript
import { secp256k1 } from "@noble/curves/secp256k1.js";
import { hexToBytes, bytesToHex } from "@noble/curves/utils.js";
import { sha256 } from "@noble/hashes/sha2.js";

const privateKey = hexToBytes((42).toString(16).padStart(64, "0"));
const publicKey = secp256k1.getPublicKey(privateKey, true);

const message = "hello bitcoin";
const messageHash = sha256(new TextEncoder().encode(message));

const signature = secp256k1.sign(messageHash, privateKey); // 64-byte compact (r || s)
console.log("r:", bytesToHex(signature.slice(0, 32)));
console.log("s:", bytesToHex(signature.slice(32, 64)));

console.log("valid:", secp256k1.verify(signature, messageHash, publicKey));

const tamperedHash = sha256(new TextEncoder().encode("hello bitcoin!"));
console.log("valid after tampering with the message:", secp256k1.verify(signature, tamperedHash, publicKey));
```

Verified output from running this exact code:

```text
r: c21a625bfc4b9f6be2ec6ddfee389c5fc154ae68f4889bbdc25eb06f19ec5f08
s: 329617c8b5b819c8a240dbcd7969cf020069cc96dd0b1f0e6b715b8a8429058e
valid: true
valid after tampering with the message: false
```

Changing a single character in the message produces a completely different hash (see [Hash Functions](./hashes.md)), which the original signature no longer validates against, demonstrating the integrity property from [Digital Signatures](./digital-signatures.md#the-three-required-properties) directly.

## Nonce reuse: the single most consequential implementation bug

Step 1 of the signing algorithm above requires a **fresh, unpredictable nonce `k` for every signature**. Look again at the signing formula: `s = k⁻¹ × (z + r × d) mod n`. If an attacker ever observes **two different signatures that reused the same `k`** (for two different messages `z1` and `z2`, signed by the same private key) basic algebra lets them recover the private key `d` directly:

Given `s1 = k⁻¹(z1 + r·d)` and `s2 = k⁻¹(z2 + r·d)`, with the same `r` (which happens exactly when `k` is reused, since `r` is derived purely from `k`), subtracting gives `s1 - s2 = k⁻¹(z1 - z2)`, which can be solved directly for `k`, and once `k` is known, `d` follows immediately from the original signing equation. **No cryptographic weakness is required. This is a straightforward algebraic solve**, computable by hand with pen and paper given the two signatures and messages.

This is not a theoretical concern. Two well-documented real-world cases:

- **Sony's PlayStation 3.** In 2010, security researchers (the "fail0verflow" group, presenting at the Chaos Communication Congress) discovered that Sony's PS3 firmware used ECDSA to sign software updates but reused the same nonce `k` for every signature, allowing the group to recover Sony's private signing key and permanently break the PS3's code-signing security.
- **Android Bitcoin wallets, 2013.** A flaw in the Java `SecureRandom` implementation on certain Android versions caused some Bitcoin wallet apps to generate predictable or repeated nonces when signing transactions. Multiple users lost funds to attackers who monitored the blockchain for signatures sharing an `r` value (a direct, observable sign of nonce reuse, since `r` is derived from `k`), and used the equations above to recover private keys and drain the affected addresses. This was significant enough that Bitcoin Core and other wallet software subsequently moved toward **deterministic nonce generation**.

## The fix: deterministic nonces (RFC 6979)

Rather than relying on a fresh random number generator call for every signature (which is only as trustworthy as the quality of that specific call, as the Android case demonstrated), modern ECDSA implementations (including the `@noble/curves` library used in this book's examples, and Bitcoin Core) generate the nonce `k` **deterministically**, as a specific, reproducible function of the private key and the message hash itself, following the algorithm specified in [RFC 6979](https://www.rfc-editor.org/rfc/rfc6979). This guarantees a fresh, effectively-unpredictable-to-outside-observers `k` for every distinct message, while removing the random-number-generator quality as a point of failure entirely, since no separate random value needs to be generated at signing time at all, the code example above uses this by default, which is why signing the same message twice with the same key produces the identical signature both times, verified directly by re-running `secp256k1.sign` on the same hash and confirming the output bytes match.

## Tradeoffs

ECDSA's mathematics is comparatively simple to implement (a genuine advantage explaining its wide adoption since the 1990s across many non-blockchain systems, including TLS certificates), but this same simplicity leaves little margin for implementation error, as the nonce-reuse cases above demonstrate, a single subtle mistake in an otherwise mathematically sound algorithm can be catastrophic and totally silent until exploited. [Schnorr Signatures](./schnorr.md), covered next, were designed partly to reduce this class of implementation risk, among other improvements.

## Common misconceptions

**Nonce reuse across two signatures does not require an attacker to find any hidden mathematical weakness in the curve or the hash function.** It is elementary algebra applied directly to the observed public data (the two signatures and their messages), the entire cryptographic security of the private key depends on the nonce never repeating, a fact that is easy to state but was violated in real, deployed systems as recently as 2013.

**ECDSA signatures are not deterministic by the algorithm's original specification**. Determinism is a property of *which nonce-generation method* an implementation chooses to use (RFC 6979 versus naive fresh randomness), not an inherent property of ECDSA itself.

## Further reading

- [RFC 6979: Deterministic Usage of the Digital Signature Algorithm (DSA) and Elliptic Curve Digital Signature Algorithm (ECDSA)](https://www.rfc-editor.org/rfc/rfc6979)
- [fail0verflow's 2010 PS3 signing-key recovery presentation](https://media.ccc.de/v/27c3-4087-en-console_hacking_2010): Chaos Communication Congress 27C3

---

[← Previous: Digital Signatures](./digital-signatures.md)
·
[Back to Cryptography](./README.md)
·
[Next: Schnorr Signatures →](./schnorr.md)
