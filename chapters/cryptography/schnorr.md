# Schnorr Signatures

Schnorr signatures are, in some ways, the scheme Bitcoin's designer might have used from the start if not for a patent. Named after cryptographer Claus-Peter Schnorr, who patented the scheme in 1989 (the patent expired in 2008, the same year the Bitcoin whitepaper was published. A timing coincidence that has fueled speculation but has no documented connection to Satoshi's actual choice of ECDSA over Schnorr, which is unexplained in any known writing), the scheme is simpler than ECDSA and offers a specific, practically valuable additional property: signature aggregation. Bitcoin added Schnorr signatures as an option via [Taproot](../bitcoin/taproot.md), activated in November 2021.

## How signing works

Given a private key `d`, its public key `Q = d × G`, and a message hash `m`:

1. **Generate a nonce `k`** (in BIP 340's specification, this is generated deterministically, similar in spirit to RFC 6979 for ECDSA, avoiding the exact nonce-reuse pitfalls covered in [ECDSA](./ecdsa.md#nonce-reuse-the-single-most-consequential-implementation-bug)).
2. **Compute `R = k × G`.**
3. **Compute a challenge `e = H(R || Q || m)`**: a hash of the nonce point, the public key, and the message together, binding all three into a single value.
4. **Compute `s = k + e × d mod n`.**
5. **The signature is the pair `(R, s)`**, typically encoded as the x-coordinate of `R` plus `s`.

## How verification works

Given the public key `Q`, message `m`, and signature `(R, s)`:

1. Recompute the challenge `e = H(R || Q || m)`, the same hash used during signing.
2. Check whether `s × G = R + e × Q`.

This is a direct algebraic identity: substituting the signing equation `s = k + e·d` into `s × G` gives `(k + e·d) × G = k·G + e·d·G = R + e·Q`, which is exactly what verification checks. So a valid signature will always satisfy this equation, and (by the elliptic curve discrete logarithm problem's hardness, see [Elliptic Curves](./elliptic-curves.md)) no one without knowledge of `d` can construct an `(R, s)` pair that satisfies it for a chosen message, except with negligible probability.

## Why Bitcoin adopted it: linearity

The property that makes Schnorr signatures genuinely different from ECDSA, not just an alternative with the same capabilities, is **linearity**: because the signing equation `s = k + e × d` is a simple linear combination, Schnorr signatures from multiple different signers can be mathematically combined into a single, compact aggregate signature that verifies against a combined public key, without any signer's individual signature or private key ever being separately revealed. ECDSA's signing equation (`s = k⁻¹(z + r·d)`) involves a modular inversion of `k`, which breaks this same kind of clean linear combination.

This enables **multi-signature (multisig) transactions that are indistinguishable on-chain from ordinary single-signer transactions**: a 3-of-5 multisig spend using Schnorr aggregation (via a protocol called MuSig, built on top of BIP 340) produces one signature of the same size and shape as a single signer's signature, rather than three separate signatures bundled together the way pre-Taproot multisig required. This has two concrete, practical benefits covered further in [Taproot](../bitcoin/taproot.md) and [Multisig](../wallets/multisig.md): it reduces the transaction data multisig spends require (lowering fees, since Bitcoin fees scale with transaction size, see [Transaction Fees](../bitcoin/fees.md)), and it improves privacy, since a complex multisig arrangement is no longer visibly distinguishable on the blockchain from an ordinary single-key transaction.

## Example

```typescript
import { schnorr } from "@noble/curves/secp256k1.js";
import { hexToBytes, bytesToHex } from "@noble/curves/utils.js";
import { sha256 } from "@noble/hashes/sha2.js";

const privateKey = hexToBytes((42).toString(16).padStart(64, "0"));
const publicKey = schnorr.getPublicKey(privateKey); // 32-byte x-only public key, per BIP 340

const message = sha256(new TextEncoder().encode("hello taproot"));
const signature = schnorr.sign(message, privateKey);

console.log("x-only public key:", bytesToHex(publicKey));
console.log("signature (r || s):", bytesToHex(signature));
console.log("valid:", schnorr.verify(signature, message, publicKey));
```

Verified output from running this exact code:

```text
x-only public key: fe8d1eb1bcb3432b1db5833ff5f2226d9cb5e65cee430558c18ed3a3c86ce1af
signature (r || s): 4b5cf63c407f6b4db647d13711445f3c8a7ac45e07877d936862e6bd71c2e66c4fc8367362010303a6b5db037fdcedd10f39fac9321b35cddf511060ba1cb188
valid: true
```

Note the public key here is 32 bytes, not the 33-byte compressed (or 65-byte uncompressed) format used elsewhere in this book, BIP 340 defines Schnorr public keys as **x-only**, dropping the y-coordinate's sign bit entirely and fixing a convention for which of the two possible y-values to use, which shaves a further byte off every public key compared to even the compressed ECDSA format, a small but real space saving that compounds across the blockchain.

## Tradeoffs

Schnorr signatures require BIP 340's specific, careful construction (including the x-only public key convention and specific domain-separated hashing for the challenge) to avoid subtle attacks that a naive implementation of the "obvious" Schnorr construction can fall into. Bitcoin's version is not simply "the original 1989 Schnorr paper's algorithm," but a carefully specified variant designed for this exact use case. Aggregation, the scheme's headline benefit, also introduces new protocol-level complexity: the MuSig family of aggregation protocols has gone through multiple published versions (MuSig, MuSig2) specifically because earlier versions had subtle security flaws in specific multi-party interaction patterns, discovered and fixed through continued cryptographic research after initial publication, a reminder that "linear and simple" does not mean "trivially safe to compose in every context different developers might imagine."

## Common misconceptions

**Schnorr signatures did not replace ECDSA in Bitcoin. They were added alongside it.** Pre-Taproot transaction types (P2PKH, P2SH, pre-Taproot SegWit) continue to use ECDSA; only Taproot-spending transactions use Schnorr. Both remain valid, supported signature schemes on the Bitcoin network today.

**Signature aggregation is not the same as simply "one person signing on behalf of a group."** Every participating key must still individually and honestly participate in producing the aggregate signature, no participant can forge the group's signature alone, which is precisely the security property that makes it useful for genuine multisig rather than a way to bypass the need for every party's cooperation.

## Further reading

- [BIP 340: Schnorr Signatures for secp256k1](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki)
- [Efficient Signature Generation by Smart Cards](https://link.springer.com/article/10.1007/BF00196725): Claus-Peter Schnorr's original 1991 paper

---

[← Previous: ECDSA](./ecdsa.md)
·
[Back to Cryptography](./README.md)
·
[Next: Merkle Trees →](./merkle-trees.md)
