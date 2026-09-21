# Blobs

A blob is Ethereum's dedicated data type for rollup batch data, introduced specifically to make data availability (see [Data Availability](./data-availability.md)) cheap without permanently bloating every Ethereum node's storage. This chapter covers what a blob actually is and how it's priced, separately from ordinary transaction gas.

## What a blob actually contains

A blob is a fixed-size chunk of data: 4,096 field elements of 32 bytes each, for a total of roughly 128 KB. A rollup packs its batch of transaction data into one or more blobs and attaches them to an ordinary Ethereum transaction (a **blob-carrying transaction**), alongside a compact commitment to the blob's contents that Ethereum's own execution layer can verify without needing the blob's full data at execution time.

## Blobs are priced separately from ordinary gas

Blob data has its own, entirely separate fee market, with its own base fee that adjusts based on blob-space demand, independent of the ordinary gas base fee EIP-1559 already established for regular transactions (see [Gas Price and Fees](../ethereum/fees.md)). This separation is deliberate: ordinary transaction execution and blob data publication compete for genuinely different, independently constrained resources (EVM execution capacity versus data bandwidth), and pricing them together in one shared gas market would mean a surge in one kind of demand driving up costs for the other, unrelated kind of usage.

```typescript
// Reading a transaction's blob-related fields with viem.
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({ chain: mainnet, transport: http() });

// A blob-carrying transaction has a distinct "blobVersionedHashes" field
// and pays a separate "maxFeePerBlobGas" alongside ordinary gas fields.
const block = await client.getBlock({ blockTag: "latest" });
console.log("blob gas used this block:", block.blobGasUsed);
console.log("excess blob gas:", block.excessBlobGas);
```

## Why blobs don't stay around forever

Unlike ordinary calldata, which becomes a permanent part of Ethereum's history that every full node retains indefinitely, blob data is deliberately short-lived: Ethereum consensus nodes retain it for a fixed window, 4,096 epochs, roughly 18 days, before pruning it, rather than forever. This is a deliberate design choice matching the data's actual purpose: blob data only needs to be available long enough for a rollup's fraud-proof challenge period to run its course, or for a validity proof to be generated and verified, not permanently, since Ethereum's own long-term storage burden was exactly what made pre-blob rollup data publication so expensive in the first place. Anyone needing longer-term access to historical blob data relies on separate, off-protocol archival services rather than Ethereum's own consensus nodes.

## The target and maximum have already changed since launch

EIP-4844 (covered in full in [EIP-4844](./eip-4844.md)) launched with a deliberately conservative target of 3 blobs and a maximum of 6 blobs per block at Ethereum's March 2024 Dencun upgrade. Since then, further network upgrades (Blob Parameter Only forks, which adjust these specific numbers without requiring a full hard fork's broader changes) have raised both figures substantially, with the long-term roadmap (full danksharding) aiming much higher still, toward roughly 128 blobs per block. This growth pattern, start conservative and scale up gradually as the network proves it can handle more, mirrors how Bitcoin's own block size has historically been approached with caution (see [Block Size](../bitcoin-scaling/block-size.md)), rather than committing to an aggressive capacity increase before it's been tested in production.

## Common misconceptions

**A blob is not the same thing as calldata, even though both can carry rollup batch data.** Blobs have their own fee market, their own size format, and their own limited retention period; a rollup choosing to publish data as calldata instead of a blob pays ordinary gas prices and gets Ethereum's permanent storage guarantee, a meaningfully different cost and durability tradeoff.

**Blob capacity per block is not a fixed, permanent protocol constant.** It has already been raised multiple times since EIP-4844's initial launch through Blob Parameter Only forks, and is expected to keep rising as Ethereum's roadmap toward full danksharding progresses; a specific blob-count figure should be treated as current for a given point in time, not as an unchanging property of the protocol.

## Further reading

- [EIP-4844.com](https://www.eip4844.com/)
- See also: [EIP-4844](./eip-4844.md), [Data Availability](./data-availability.md)

---

[← Previous: Data Availability](./data-availability.md)
·
[Back to Layer 2](./README.md)
·
[Next: EIP-4844 →](./eip-4844.md)
