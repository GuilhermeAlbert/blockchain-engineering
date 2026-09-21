# Block Headers

The block header is the 80-byte structure that proof-of-work actually secures, and it's the only part of a block a light client needs to download to verify the chain's proof-of-work. This chapter goes field by field through Bitcoin's actual header format.

## The six fields

Bitcoin's block header consists of exactly six fields, totaling 80 bytes:

| Field | Size | Purpose |
| --- | --- | --- |
| Version | 4 bytes | Indicates which set of consensus rules the block follows (used historically for signaling soft fork activation, see [Miner Signaling](../forks/miner-signaling.md)) |
| Previous block hash | 32 bytes | SHA-256d hash of the previous block's header, linking this block into the chain (see [Hashes and Block Linking](./block-linking.md)) |
| Merkle root | 32 bytes | SHA-256d-based Merkle root summarizing every transaction in the block (see [Merkle Roots](./merkle-roots.md)) |
| Timestamp | 4 bytes | Unix timestamp of when the miner started hashing this block (approximate, and loosely bounded by consensus rules, not exact) |
| Difficulty target (bits) | 4 bytes | A compactly encoded form of the current target threshold a valid block hash must be below (see [Mining Difficulty](../bitcoin/difficulty.md)) |
| Nonce | 4 bytes | The value miners vary while searching for a valid proof-of-work hash |

```text
┌──────────┬──────────────────┬─────────────┬───────────┬──────┬───────┐
│ Version  │ Previous block   │ Merkle root │ Timestamp │ Bits │ Nonce │
│ 4 bytes  │ hash (32 bytes)  │ (32 bytes)  │ (4 bytes) │ (4B) │ (4B)  │
└──────────┴──────────────────┴─────────────┴───────────┴──────┴───────┘
                                  = 80 bytes total
```

## Why exactly these six fields, and nothing more

Every field earns its place by being either necessary for chaining (previous block hash), necessary for committing to the block's contents without including them directly (Merkle root), or necessary for the proof-of-work search itself (timestamp, bits, nonce. Version is used more incidentally, mainly for signaling). Notably, the transaction data itself is **not** in the header. Only its Merkle root is. This is the entire reason the header can stay a small, fixed 80 bytes no matter how many transactions the block contains: adding more transactions changes the Merkle root but never the header's size, which is what keeps header-only verification (SPV, see [Light Clients](../bitcoin/light-clients.md)) cheap regardless of how large blocks themselves get.

## The nonce problem, and extranonce

The nonce field is only 4 bytes, a 32-bit number, giving about 4.3 billion possible values. Modern mining hardware can exhaust this entire range in a small fraction of a second, far faster than the roughly 10-minute target block time (see [Block Time](./block-time.md)) requires. To keep searching for a valid hash beyond exhausting the nonce field, miners also vary an **extranonce** value embedded inside the coinbase transaction (see [Coinbase Transactions](../bitcoin/coinbase-transactions.md)). Changing the extranonce changes the coinbase transaction, which changes the Merkle root, which effectively gives miners access to a vastly larger search space than the header's nonce field alone provides. This is a practical detail that becomes necessary the moment mining hardware exceeds roughly 4 billion hashes per second, which happened early in Bitcoin's ASIC era.

## Example: serializing and hashing a header

```typescript
import { createHash } from "node:crypto";

interface BlockHeader {
  version: number;
  previousBlockHash: string; // hex
  merkleRoot: string;        // hex
  timestamp: number;         // unix seconds
  bits: string;               // compact difficulty target, hex
  nonce: number;
}

function sha256d(buf: Buffer): Buffer {
  const once = createHash("sha256").update(buf).digest();
  return createHash("sha256").update(once).digest();
}

function serializeHeader(h: BlockHeader): Buffer {
  const version = Buffer.alloc(4);
  version.writeUInt32LE(h.version);

  const timestamp = Buffer.alloc(4);
  timestamp.writeUInt32LE(h.timestamp);

  const nonce = Buffer.alloc(4);
  nonce.writeUInt32LE(h.nonce);

  return Buffer.concat([
    version,
    Buffer.from(h.previousBlockHash, "hex").reverse(), // Bitcoin serializes hashes little-endian
    Buffer.from(h.merkleRoot, "hex").reverse(),
    timestamp,
    Buffer.from(h.bits, "hex").reverse(),
    nonce,
  ]);
}

const header: BlockHeader = {
  version: 1,
  previousBlockHash: "0".repeat(64),
  merkleRoot: "3d086d8d96bd2bb74c257636b0ae07fe7d3d4c02a9b4ace7f1af21e6c6ba0aa8",
  timestamp: 1700000000,
  bits: "1d00ffff",
  nonce: 0,
};

const serialized = serializeHeader(header);
console.log("Serialized length (should be 80 bytes):", serialized.length);
console.log("SHA-256d hash:", sha256d(serialized).reverse().toString("hex"));
```

Verified output from running this exact code:

```text
Serialized length (should be 80 bytes): 80
SHA-256d hash: fa6881fa2de15ecd5cce9c877420f00794e64fd2d1f68551d06486e29ce65754
```

Confirming the header serializes to exactly 80 bytes, regardless of the (arbitrary, illustrative) field values used here.

## Under the hood: byte order

Bitcoin's serialization uses **little-endian** byte order for most numeric fields and, confusingly to newcomers, stores hashes reversed relative to how they're conventionally displayed (block explorers show hashes in a human-readable big-endian-looking hex string, but the raw bytes on the wire and in storage are the reverse of that). This is a well-known, if awkward, historical quirk of Bitcoin's original C++ implementation rather than a deliberate design choice with a deeper rationale, and it is a common source of subtle bugs for anyone implementing Bitcoin serialization from scratch. Getting byte order wrong produces a completely different, incorrect hash even though every individual byte value is "correct."

## Tradeoffs

Keeping the header at a fixed, small 80 bytes (deliberately excluding the actual transaction data) is what enables lightweight verification at scale, at the cost of the header alone being insufficient to verify that the transactions themselves are individually valid (only that *some* set of transactions, summarized by the Merkle root, was committed to). This is the precise, mechanical basis for the SPV security tradeoff discussed in [Light Clients](../bitcoin/light-clients.md) and [Merkle Proofs](../cryptography/merkle-proofs.md#tradeoffs).

## Common misconceptions

**The timestamp field is not a trustworthy, precise record of exactly when a block was created.** Consensus rules only require it to be greater than the median of the previous 11 blocks' timestamps and not more than two hours ahead of network-adjusted time, a loose constraint, not a precise clock, which is a detail that occasionally surprises developers building timestamp-sensitive applications on top of block data.

**A block's hash is not stored inside its own header.** The header's fields, hashed together, *produce* the block's hash. The hash is a computed property of the header's contents, not a field within it.

## Further reading

- [Bitcoin Core developer reference: Block headers](https://developer.bitcoin.org/reference/block_chain.html#block-headers)

---

[← Previous: Blocks](./blocks.md)
·
[Back to Blockchain Fundamentals](./README.md)
·
[Next: Transactions →](./transactions.md)
