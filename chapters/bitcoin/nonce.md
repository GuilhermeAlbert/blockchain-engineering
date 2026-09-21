# Nonce

The nonce is the one field in a block header that miners freely vary while searching for a valid proof-of-work hash. This short chapter focuses specifically on the nonce's role and its practical limitations, building on the full header layout in [Block Headers](../blockchain/block-headers.md) and the search process in [Proof of Work](./proof-of-work.md).

## What it is

"Nonce" — a term borrowed from cryptography generally, short for "number used once" — is a 4-byte (32-bit) field in the block header with no meaning beyond giving miners a value to change between hash attempts. It has no relationship to the block's transactions, timestamp, or any other field's content; its sole purpose is producing different header bytes to hash on each attempt, since hashing the identical header twice would obviously produce the identical (and, if it already failed once, still-failing) result.

## The problem: 4 bytes is not enough anymore

A 32-bit nonce provides about 4.3 billion (2^32) distinct values. Modern ASIC mining hardware (see [ASICs](./asics.md)) can exhaust this entire range in a small fraction of a second — many orders of magnitude faster than the roughly 10-minute average time needed to actually find a valid hash at current difficulty. This means the header nonce field alone cannot provide enough search space on its own; miners need additional ways to generate fresh header bytes once they've exhausted all 4.3 billion nonce values without finding a valid hash.

## How miners get more search space

Two mechanisms extend the effective search space beyond the header's own nonce field:

1. **Extranonce**: an additional value, of a size the miner or pool chooses, embedded in the coinbase transaction's input data field (see [Coinbase Transactions](./coinbase-transactions.md#common-uses-of-the-embedded-data-field)). Changing the extranonce changes the coinbase transaction, which changes the Merkle root, which changes the header — giving a fresh set of header bytes to search through the entire nonce range again.
2. **Timestamp rolling**: since the timestamp field has some permitted flexibility (it must be greater than the median of the past 11 blocks and not too far in the future — see [Block Headers](../blockchain/block-headers.md#under-the-hood-byte-order)), a miner can also increment the timestamp slightly to get additional fresh header variations, though this provides a comparatively small amount of extra space compared to extranonce.

In practice, high-performance mining hardware exhausts the nonce field, then increments the extranonce (triggering a Merkle root recomputation) and exhausts the nonce field again, repeating this cycle continuously.

## Example: exhausting a small nonce space

```typescript
function findValidNonce(headerPrefix: string, targetPrefix: string, maxNonce: number): number | null {
  const { createHash } = require("node:crypto");
  const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");

  for (let nonce = 0; nonce <= maxNonce; nonce++) {
    const hash = sha256(headerPrefix + nonce);
    if (hash.startsWith(targetPrefix)) {
      return nonce;
    }
  }
  return null; // exhausted the search space without success — a real possibility!
}

const result = findValidNonce("block-header-data", "0000", 10_000_000);
console.log(result === null ? "Search space exhausted without finding a valid nonce" : `Found at nonce ${result}`);
```

Running this exact code finds a match at nonce `47558` (deterministic, since SHA-256 is a pure function of its input — the same header prefix and target will always find the same nonce). With a 4-hex-character target, a match within 10 million attempts is overwhelmingly likely (roughly 65,536 attempts are expected on average), but nothing guarantees it — a longer required prefix could easily exhaust `maxNonce` with no match found at all.

This demonstrates the exact scenario extranonce exists to solve: for a given fixed header prefix, there is no guarantee any nonce in a limited range produces a qualifying hash — sometimes none of the 4.3 billion possible header-plus-nonce combinations work, and the miner genuinely must change something else (the extranonce, changing the Merkle root) to get an entirely new set of header bytes to search through.

## Common misconceptions

**A higher nonce value does not mean "more work" was done to reach it**, and nonces are not tried in any required order — any specific nonce value found to be valid is exactly as valid as any other; there's no significance to which numeric nonce ultimately worked, only that a header-plus-nonce combination was found whose hash meets the target.

## Further reading

- [Bitcoin Core developer reference: Block headers](https://developer.bitcoin.org/reference/block_chain.html#block-headers)

---

[← Previous: Difficulty Adjustment](./difficulty-adjustment.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Block Rewards →](./block-rewards.md)
