# SegWit as a Scaling Upgrade

[SegWit](../bitcoin/segwit.md) already received a full technical treatment in the Bitcoin section, covering the malleability fix and the exact mechanics of witness separation. This short chapter isolates one specific angle: SegWit purely as a scaling measure, and how much throughput it actually bought.

## The scaling mechanism, restated concisely

Recall from [Transaction Fees](../bitcoin/fees.md#transaction-size-and-weight) that SegWit's weight formula gives witness data (signatures) a quarter of the weight of ordinary transaction data. Because signatures typically make up a substantial share of an ordinary transaction's total byte count, this discount meaningfully increases how many transactions fit within the same 4-million-weight-unit block limit compared to the old, pure-byte-count 1 MB limit, without directly changing the headline "1 MB" figure the way a contested hard fork block size increase would have.

## How much throughput this actually added

The realized capacity increase depends on what fraction of blocks' data is witness data versus non-witness data, which itself depends on how many transactions actually use SegWit's script formats (native SegWit or SegWit-wrapped) rather than legacy formats, an adoption-dependent figure that grew gradually over years following activation, rather than jumping immediately, since it required wallets and services to actually adopt SegWit-format addresses (see [Addresses](../wallets/addresses.md)) to realize the discount on their own transactions. Commonly cited estimates for SegWit's realized effective capacity increase, once SegWit adoption became widespread, range roughly from 1.5x to 2x compared to the pre-SegWit 1 MB limit. A genuine, meaningful increase, though considerably more modest than the 2-8x increases a direct block size increase to 2-8 MB would have provided immediately upon activation (setting aside the node-resource tradeoffs such an increase would separately have imposed, covered in [Block Size](./block-size.md#why-this-ceiling-exists-at-all)).

## Why SegWit's capacity increase mattered beyond the raw numbers

Beyond the throughput figure itself, SegWit's malleability fix (see [SegWit](../bitcoin/segwit.md#why-segwit-exists)) was a necessary technical prerequisite for building reliable off-chain payment channel systems. The [Lightning Network](../lightning/README.md)'s design depends on being able to reference unconfirmed transactions by a stable, non-malleable identifier, which pre-SegWit transaction malleability made unreliable. In this sense, SegWit's contribution to Bitcoin's overall scaling story is better understood as two separate contributions bundled into one upgrade: a direct, modest base-layer capacity increase, and an indirect but arguably larger enabling effect on Layer 2 scaling built on top of the base layer.

## Common misconceptions

**SegWit's capacity increase was not instantaneous upon activation**, realizing the full discount required transactions to actually use SegWit-format scripts, which happened gradually as wallets and exchanges adopted support, not immediately when the soft fork itself activated in August 2017.

**SegWit and a direct block size increase are not mutually exclusive alternatives that Bitcoin had to choose between forever**. They were the two specific options debated during [the block size dispute](../forks/block-size-war.md) at that particular moment, not a permanent, binary fork in Bitcoin's only possible future scaling paths, as the rest of this section's additional approaches demonstrate.

## Further reading

- [SegWit](../bitcoin/segwit.md): the full technical treatment
- See also: [Transaction Fees](../bitcoin/fees.md), [The Block Size Debate](../forks/block-size-war.md)

---

[← Previous: Block Size](./block-size.md)
·
[Back to Bitcoin Scaling](./README.md)
·
[Next: Transaction Batching →](./batching.md)
