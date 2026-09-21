# Hash Functions

A hash function takes an input of any size and produces a fixed-size output, deterministically, such that the same input always produces the same output and even a tiny change to the input produces a completely different output. This single primitive underlies block linking, mining, Merkle trees, addresses, and commitments throughout this book — it is worth understanding precisely before any of those topics make sense.

## The problem

Blockchain systems need a way to answer questions like: "is this the exact same data I saw before?" and "can I compactly represent a large amount of data such that any tampering is detectable?" Comparing large datasets byte-by-byte every time is slow and, for some use cases (proving you know a piece of data without revealing it), impossible. A **cryptographic hash function** solves both problems: it compresses arbitrary data into a small, fixed-size fingerprint that changes unpredictably if even one bit of the input changes, making it a practical stand-in for the full data in comparisons, commitments, and integrity checks.

## How it works

A cryptographic hash function `H` maps an input of any length to an output of a fixed length (256 bits for SHA-256, the function Bitcoin uses throughout). To be useful for security purposes, it needs three properties, each of which has a precise technical meaning covered in its own chapter:

- **[Preimage resistance](./preimage-resistance.md)**: given a hash output `h`, it should be computationally infeasible to find any input `x` such that `H(x) = h`.
- **Second-preimage resistance**: given a specific input `x1`, it should be infeasible to find a different input `x2` such that `H(x1) = H(x2)`.
- **[Collision resistance](./collisions.md)**: it should be infeasible to find *any* two distinct inputs `x1` and `x2` (without either being given in advance) such that `H(x1) = H(x2)`.

These are related but distinct guarantees — collision resistance is the strongest and implies the other two hold in practice for a well-designed function, but they are worth naming separately because different blockchain use cases lean on different guarantees. A block's [proof-of-work](../bitcoin/proof-of-work.md) mainly relies on the output being unpredictable (you cannot guess which input will produce a hash below a target without trying it); a [Merkle tree](./merkle-trees.md) mainly relies on collision resistance (you cannot forge a different set of transactions that hashes to the same root).

## Example: try it yourself

Node.js includes a hash implementation in its standard library — no external dependencies needed to explore this hands-on.

```typescript
import { createHash } from "node:crypto";

function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

console.log(sha256("hello"));
// 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824

console.log(sha256("Hello"));
// 185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969

console.log(sha256(""));
// e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

Run this with `npx tsx hash-example.ts` or compile with `tsc` first. Notice two things: changing a single character (`hello` → `Hello`) produces an output with no visible relationship to the original — this unpredictability is called the **avalanche effect**, and it is what makes hash outputs useless for guessing anything about their input. Second, every output is exactly 64 hexadecimal characters (256 bits) long, regardless of whether the input was empty or a gigabyte — this fixed-size property is what lets a hash stand in for arbitrarily large data.

```text
input                       → SHA-256 output (hex, 256 bits)
"hello"                     → 2cf24dba5fb0a30e26e83b2ac5b9e29e...
"Hello"                     → 185f8db32271fe25f561a6fc938b2e26...
"hello " (trailing space)   → completely different output
```

## Under the hood

Bitcoin overwhelmingly uses **SHA-256**, and frequently applies it twice in a row (SHA-256d, or `SHA-256(SHA-256(x))`) — covered in full mechanical detail, including the compression function's internal steps, in [SHA-256](./sha-256.md). Ethereum and the EVM primarily use **Keccak-256** (frequently, if imprecisely, called "SHA-3" — it predates and differs slightly in padding from the later NIST-standardized SHA-3, see [Bytecode](../evm/bytecode.md) for where this shows up). Different blockchain systems making different hash function choices is a real, meaningful design decision, not an interchangeable detail — it affects everything from gas costs to hardware optimization possibilities for mining or proof generation.

## Tradeoffs

A cryptographic hash function is a one-way compression: you gain a small, fixed-size, tamper-evident fingerprint of arbitrarily large data, and you give up the ability to recover the original data from the fingerprint (that's the point — see [Preimage Resistance](./preimage-resistance.md)) and the ability to prove two pieces of data are related in any way other than being bit-for-bit identical (a hash tells you nothing about *how* two inputs differ, only *that* they differ).

## Common misconceptions

**Hashing is not encryption.** Encryption is reversible with the right key; hashing is one-way by design and has no key to reverse it with. A hash cannot be "decrypted" to recover its input — see [Preimage Resistance](./preimage-resistance.md).

**A hash is not a random number**, even though its output looks statistically indistinguishable from random data. It is fully deterministic — the same input always produces the same output on every machine, every time, which is precisely what makes it useful for verification.

## Try it yourself

Run the code sample above with a few different inputs, including very long ones (paste in a full paragraph) and inputs that differ by a single character. Confirm the output is always 64 hex characters and that similar inputs produce unrelated-looking outputs.

## Further reading

- [NIST FIPS 180-4: Secure Hash Standard](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf) — the official specification for SHA-256 and related functions
- [Node.js `crypto` module documentation](https://nodejs.org/api/crypto.html)

---

[← Previous: Bitcoin and Monetary Sovereignty](../economics/monetary-sovereignty.md)
·
[Back to Cryptography](./README.md)
·
[Next: SHA-256 →](./sha-256.md)
