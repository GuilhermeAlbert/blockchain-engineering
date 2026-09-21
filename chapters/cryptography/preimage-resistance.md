# Preimage Resistance

Preimage resistance is the property that makes a hash function one-way: given a hash output, there is no practical way to find an input that produces it, other than trying inputs one at a time. This chapter defines the property precisely, distinguishes it from the related but different property of collision resistance covered in [Hash Collisions](./collisions.md), and works through the concrete arithmetic of why Bitcoin mining is, specifically, a preimage-search problem.

## Definition

A hash function `H` is **preimage resistant** if, given an output value `h`, it is computationally infeasible to find any input `x` such that `H(x) = h`. This is sometimes explained with the phrase "hashing is easy, un-hashing is hard": computing `H(x)` from `x` takes a fixed, small amount of computation regardless of what `x` is, but going the other direction (from a target output back to an input that produces it) has no known method faster than guessing inputs and checking each one.

A closely related, stronger property is **second-preimage resistance**: given one specific input `x1`, it should be infeasible to find a *different* input `x2` (with `x2 ≠ x1`) such that `H(x1) = H(x2)`. The difference from ordinary preimage resistance is subtle but matters: preimage resistance starts from just an output value with no known input; second-preimage resistance starts from a known input and looks for a different one matching its output. The difference from collision resistance (covered in [Hash Collisions](./collisions.md)) is that collision resistance doesn't fix either input in advance. The attacker is free to choose both `x1` and `x2` together, which is a meaningfully easier problem (hence the weaker `2^(n/2)` collision bound versus preimage resistance's full `2^n` bound).

## Why this matters: mining is a preimage search

[Proof of Work](../bitcoin/proof-of-work.md) is, concretely, a constrained preimage search. A miner is looking for a block header (which includes a variable nonce field) whose SHA-256d hash is numerically below a target value. Equivalently, whose hash has a required number of leading zero bits. This is exactly a preimage problem: given a target region of outputs (all hashes below a certain number), find an input that lands in that region.

Because there is no known shortcut for computing a preimage faster than trying candidates, the only strategy available to a miner is **brute-force search**: try a nonce, compute the hash, check if it meets the target, and if not, try a different nonce and repeat. This is precisely why mining difficulty can be tuned so precisely (see [Mining Difficulty](../bitcoin/difficulty.md)): since there's no clever shortcut, the *expected* number of attempts needed to find a valid hash is a simple, predictable function of the target's size, which lets the network calibrate the target to produce blocks at a roughly constant average rate.

## The arithmetic

If a target requires a hash to fall within the lowest fraction `p` of the full 256-bit output space, then a single random hash attempt has probability `p` of succeeding. This gives the same relationship the Bitcoin whitepaper's Section 11 relies on:

```text
P(success on a given attempt) = target / 2^256
```

If the target is set so that only 1 in 2^32 possible hash outputs qualifies (an illustrative example, not today's actual Bitcoin difficulty, which requires vastly more leading zero bits), a miner would need, on average, 2^32 (about 4.3 billion) attempts to find a valid nonce, a number easily reached by modern mining hardware in a fraction of a second, which is why real Bitcoin difficulty today requires far more leading zero bits than this illustrative example, calibrated against the network's actual combined hash rate (see [Difficulty Adjustment](../bitcoin/difficulty-adjustment.md)).

## Example: brute-forcing a toy preimage

This short example demonstrates the mechanism directly, searching for an input whose hash starts with a specific short prefix, small enough to actually run to completion on an ordinary computer in a reasonable time:

```typescript
import { createHash } from "node:crypto";

function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

function findPreimage(prefix: string): { input: string; hash: string; attempts: number } {
  let attempts = 0;
  let nonce = 0;
  while (true) {
    attempts++;
    const candidate = `block-data-${nonce}`;
    const hash = sha256(candidate);
    if (hash.startsWith(prefix)) {
      return { input: candidate, hash, attempts };
    }
    nonce++;
  }
}

const result = findPreimage("000"); // 3 hex chars = 12 bits of leading zeros
console.log(result);
// Expect roughly 2^12 = 4096 attempts on average to satisfy a 3-hex-character prefix
```

Running this repeatedly will show the attempt count varies but clusters around a few thousand, consistent with needing roughly `16^3 = 4096` tries on average for a 3-character hex prefix (each hex character represents 4 bits, so 3 characters is 12 bits, and `2^12 = 4096`). Extending the required prefix to 6 characters (24 bits) increases the expected attempts to roughly 16 million; Bitcoin's actual mining difficulty, expressed the same way, corresponds to a search space many orders of magnitude larger, see [Mining Difficulty](../bitcoin/difficulty.md) for the current real-world numbers and how they translate into required leading zero bits.

## Tradeoffs

Preimage resistance is exactly what makes proof-of-work function as a fair, unforgeable measure of effort: because there's no shortcut, the only way to find a valid block hash is to actually spend the computational work, which means the resulting proof genuinely reflects real expended effort rather than being fakeable by anyone with mathematical cleverness instead of computing power. The cost of this is the same cost discussed in [Hashcash](../origins/hashcash.md#tradeoffs) and [Proof of Work](../bitcoin/proof-of-work.md#tradeoffs): the search is, by design, wasteful in the sense that failed attempts produce no useful output beyond ruling out one candidate.

## Common misconceptions

**Preimage resistance does not mean "the hash function is encrypted" or that there's a hidden key.** There is no secret involved at all. The function `H` is completely public, and the difficulty comes purely from the lack of a mathematical shortcut for inverting it, not from anything being hidden.

**A large number of required leading zero bits does not mean the hash function has changed or gotten "harder" in some intrinsic sense.** SHA-256 itself is unchanged; only the *target* (how many valid outputs count as a success) changes with mining difficulty, which affects how many attempts are needed on average, not anything about the hash function's internal computation.

## Further reading

- [Bitcoin whitepaper, Section 11 (Calculations)](https://bitcoin.org/bitcoin.pdf): the probability formula in its original context
- [NIST FIPS 180-4: Secure Hash Standard](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf)

---

[← Previous: Hash Collisions](./collisions.md)
·
[Back to Cryptography](./README.md)
·
[Next: Public-Key Cryptography →](./public-key-cryptography.md)
