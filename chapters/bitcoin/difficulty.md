# Mining Difficulty

"Difficulty" is a normalized, human-friendlier number representing how hard it currently is to find a valid block hash, expressed relative to the easiest possible target Bitcoin ever defined. This chapter covers exactly how difficulty relates to the target, and how the compact "bits" encoding stored in every block header actually works.

## Difficulty as a ratio

Bitcoin's genesis block used the maximum possible target — the easiest difficulty the protocol allows, defined as **difficulty 1**. Every subsequent difficulty value is expressed as a ratio: how many times harder the current target is than that original, easiest target.

```text
difficulty = (difficulty-1 target) / (current target)
```

Because a *smaller* numeric target means *fewer* valid hash outputs and therefore *more* required attempts on average, difficulty and target move in opposite directions: as difficulty rises, the target shrinks. A difficulty of, say, 50,000,000,000 means the current target is 50 billion times smaller (harder to hit) than the original difficulty-1 target, which correspondingly means roughly 50 billion times more hash attempts are needed on average to find a valid block.

## The compact "bits" encoding

Storing a full 256-bit target directly in every block header would be needlessly large, given how much of that number's high-order bits are typically all zeros (which is precisely what a small target looks like). Bitcoin instead stores a **compact representation** in the header's "bits" field — a 4-byte value encoding a coefficient and an exponent, similar in spirit to floating-point scientific notation, that expands to the full 256-bit target through a defined formula. This is a pure space-saving encoding trick; it doesn't change the underlying target value or the probability calculations, only how compactly that value is represented in the 80-byte header.

## Example: converting bits to a target

```typescript
function bitsToTarget(bits: number): bigint {
  const exponent = bits >>> 24;
  const coefficient = BigInt(bits & 0x007fffff);
  if (exponent <= 3) {
    return coefficient >> BigInt(8 * (3 - exponent));
  }
  return coefficient << BigInt(8 * (exponent - 3));
}

// 0x1d00ffff was Bitcoin's actual genesis-era difficulty-1 bits value.
const genesisBits = 0x1d00ffff;
const target = bitsToTarget(genesisBits);
console.log("Target (hex):", target.toString(16));
console.log("Target (decimal, approx):", target.toString());
```

Verified output from running this exact code:

```text
Target (hex): ffff0000000000000000000000000000000000000000000000000000
Target (hex, padded to 64): 00000000ffff0000000000000000000000000000000000000000000000000000
```

This matches Bitcoin's well-documented genesis-era difficulty-1 target.

## Why difficulty exists as a separate concept from the raw target

Difficulty gives humans (and mining hardware displays, pool dashboards, and public statistics) a single, intuitively scaling number to track over time, without needing to reason about enormous 256-bit target values directly — "difficulty doubled this year" is more immediately meaningful than comparing two 78-digit numbers. The actual consensus rule, though, operates on the target (via its compact "bits" encoding) directly; "difficulty" as a named quantity is a derived, human-facing convenience built on top of it.

## Common misconceptions

**Difficulty is not adjusted continuously, block by block.** It changes only at fixed intervals (every 2016 blocks) — see [Difficulty Adjustment](./difficulty-adjustment.md) for exactly how and why.

**A higher difficulty does not mean SHA-256 itself has gotten "harder" or changed in any way.** The hash function is unchanged; only the target threshold a valid hash must fall below has shrunk, requiring more attempts on average to find a qualifying hash — see [Preimage Resistance](../cryptography/preimage-resistance.md).

## Further reading

- [Bitcoin Core developer reference: Block chain (difficulty target and retargeting)](https://developer.bitcoin.org/reference/block_chain.html#target-nbits)

---

[← Previous: Mining](./mining.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Difficulty Adjustment →](./difficulty-adjustment.md)
