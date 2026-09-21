# Elliptic Curves

The previous chapter described public keys as "a private key multiplied by a generator point on a curve" without explaining what that means. This chapter fills that gap: what an elliptic curve actually is, what "adding points" on one means geometrically, and why this specific mathematical structure became the standard choice for blockchain cryptography.

## What an elliptic curve is

An elliptic curve, in the form used for cryptography, is the set of points `(x, y)` satisfying an equation of the form:

```text
y² = x³ + ax + b  (mod p)
```

where `a` and `b` are fixed constants defining the specific curve, and everything is computed **modulo a large prime number `p`**, meaning all arithmetic wraps around after reaching `p`, the same way a clock wraps around after 12. This "modulo a prime" detail is what makes the curve usable for cryptography: instead of a smooth, continuous curve you could sketch on paper, working modulo a large prime produces a large, finite, evenly scattered set of discrete points with no obvious visual pattern (a **finite field**, in the formal terminology) even though the underlying equation looks like ordinary algebra.

For Bitcoin and Ethereum's curve, secp256k1 (covered in the next chapter), the specific equation is:

```text
y² = x³ + 7  (mod p)
```

with `a = 0` and `b = 7`, one of the simplest possible non-trivial choices, and `p` a specific 256-bit prime defined in the curve's specification.

## Point addition: the operation that makes this useful

Elliptic curve cryptography defines a specific rule for "adding" two points on the curve to get a third point also on the curve. Geometrically, over the real numbers (before the "modulo a prime" wraparound is applied, purely as a visualization aid), the rule is: draw a straight line through the two points you're adding; that line intersects the curve at exactly one more point (because the curve equation is cubic); reflect that third point across the x-axis, and that reflected point is the sum.

```text
      y
      │      P
      │     ╱ ╲
      │    ╱   ╲
──────┼───╱─────╲──── x
      │  ╱       ╲
      │ Q          
      │             ╲
      │              R'  (line through P, Q hits curve here)
      │              │
      │              ▼
      │              R  = P + Q  (R' reflected across x-axis)
```

Adding a point to itself (`P + P`, used when computing `k × G` for a private key `k`) uses a related rule based on the tangent line at that point instead of a line through two distinct points. Both rules reduce to explicit algebraic formulas involving only addition, subtraction, multiplication, and modular inversion, no actual geometric drawing happens in a real implementation; the geometry is a way to understand *why* the algebraic formulas are defined the way they are.

## Scalar multiplication and the hard problem

"Multiplying" a point `P` by an integer `k` (written `k × P` or `kP`) means adding `P` to itself `k` times using the point-addition rule above: `2P = P + P`, `3P = 2P + P`, and so on. Computing this efficiently for very large `k` (256-bit private keys are astronomically large numbers) uses a technique called **double-and-add**, which computes `kP` in roughly `log2(k)` point-doubling and point-addition operations rather than `k` separate additions. For a 256-bit `k`, this means around 256 operations instead of an infeasible 2^256 operations, which is what makes computing a public key from a private key fast in practice.

The **elliptic curve discrete logarithm problem (ECDLP)** is the reverse question: given `P` and `Q = kP`, find `k`. No efficient algorithm for this is known for a well-chosen curve, the best known classical attacks (such as Pollard's rho algorithm) take time roughly proportional to the square root of the curve's order, which for secp256k1's approximately 256-bit order means roughly `2^128` operations, considered infeasible with any foreseeable computing resources. This asymmetry (fast forward (`k → kP`), infeasible backward (`kP → k`)) is the entire security foundation described generally in [Public-Key Cryptography](./public-key-cryptography.md).

## Why elliptic curves instead of, say, RSA

Elliptic curve cryptography achieves comparable security to RSA (which relies on the difficulty of factoring large numbers, not the ECDLP) with much smaller keys: a 256-bit elliptic curve key provides security roughly comparable to a 3072-bit RSA key, according to widely cited security-level comparisons from NIST and other standards bodies. Smaller keys mean smaller signatures, less bandwidth, and less storage, a meaningful, compounding advantage for a system like Bitcoin, where millions of public keys and signatures accumulate in permanent, broadcast, storage-constrained block data (see [Transaction Size / Weight](../bitcoin/fees.md)).

## Tradeoffs

Elliptic curve cryptography's compactness comes at the cost of implementation complexity: the modular arithmetic and point-addition formulas have more edge cases to get right than RSA's simpler modular exponentiation, and subtle implementation bugs (incorrect handling of edge cases like the point at infinity, or non-constant-time operations that leak timing information) have historically caused real vulnerabilities in specific software libraries, even though the underlying mathematics remains sound. This is why using audited, widely reviewed libraries (like [`@noble/curves`](https://github.com/paulmillr/noble-curves), used throughout this book's examples) rather than implementing curve arithmetic from scratch is standard, sound practice for real-world software.

## Common misconceptions

**An elliptic curve, in this cryptographic context, is not a smooth curved line you'd draw on paper.** Because all arithmetic is done modulo a large prime, the actual set of valid points is a large, discrete, seemingly-scattered set of coordinate pairs. The smooth-curve picture is a visualization aid for understanding the point-addition rule's geometric origin, not a description of what the real, finite-field version looks like.

**"Elliptic" does not refer to an ellipse.** The name is a historical holdover from the study of elliptic integrals, an unrelated area of 19th-century mathematics that happened to involve equations of a similar cubic form. Elliptic curves are not ellipses and have no direct geometric relationship to them.

## Further reading

- [SEC 2: Recommended Elliptic Curve Domain Parameters](https://www.secg.org/sec2-v2.pdf)
- [A (Relatively Easy To Understand) Primer on Elliptic Curve Cryptography](https://arstechnica.com/information-technology/2013/10/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/): Cloudflare/Ars Technica, 2013

---

[← Previous: Private and Public Keys](./keys.md)
·
[Back to Cryptography](./README.md)
·
[Next: secp256k1 →](./secp256k1.md)
