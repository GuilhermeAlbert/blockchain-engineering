# Block Size

This chapter revisits the block size parameter itself (what it actually limits, and the specific arithmetic connecting it to transaction throughput) as a foundation for the rest of this section's scaling approaches, building on the historical dispute already covered in [The Block Size Debate](../forks/block-size-war.md).

## What the limit actually constrains

Bitcoin's block size limit constrains how much transaction data can be included in each roughly-10-minute block (see [Block Time](../blockchain/block-time.md)). Since [SegWit](../bitcoin/segwit.md#weight-and-the-effective-capacity-increase), this is technically a **weight** limit (4 million weight units) rather than a simple byte-count limit, but the practical effect is the same kind of constraint: a hard ceiling on how much transaction data the network processes per unit of time.

## The throughput arithmetic

A rough, commonly cited estimate: an ordinary single-input, single-output SegWit transaction weighs somewhere around 550-650 weight units. Dividing the 4 million weight unit block limit by a typical transaction's weight, and dividing again by the ~600-second average block interval, gives Bitcoin's base-layer throughput ceiling, commonly cited in the range of roughly 3-7 transactions per second, depending heavily on the actual mix of transaction types and sizes in a given block (transactions with more inputs, multiple outputs, or complex scripts weigh more and reduce the effective count per block; a block full of simple transactions fits more of them). This is a real, structural ceiling, not a temporary inefficiency. It holds regardless of node performance, internet speed, or any other factor besides the weight limit and block interval themselves.

## Why this ceiling exists at all

As established in [The Block Size Debate](../forks/block-size-war.md#the-case-for-a-more-conservative-approach), the limit exists specifically to bound the resource requirements (storage, bandwidth, validation time) of running a full node (see [Full Nodes](../bitcoin/full-nodes.md#what-running-one-actually-requires)) a deliberate tradeoff favoring a network more people can realistically fully validate over one optimized purely for maximum on-chain transaction volume. This is the starting premise the rest of this section's approaches all respond to: given this ceiling is being deliberately maintained rather than simply raised, how does Bitcoin scale to serve more users and more transaction volume anyway?

## Two directions, not one

The rest of this section covers two structurally different responses to the same throughput ceiling: **making better use of existing block space** (transaction batching, and SegWit's own weight-discounting design, covered next) and **moving transaction volume off the base layer entirely** (payment channels and the Lightning Network, sidechains, and other systems covered later in this section), approaches that aren't mutually exclusive and that the Bitcoin ecosystem has pursued simultaneously rather than choosing between.

## Common misconceptions

**The block size limit is not literally "1 MB" anymore** and hasn't been the single governing constraint since SegWit's weight-based accounting replaced a pure byte-size limit. See [SegWit](../bitcoin/segwit.md#weight-and-the-effective-capacity-increase) for exactly how that transition worked technically.

**A low base-layer throughput ceiling does not mean Bitcoin as a whole is limited to that transaction rate.** It specifically limits *base-layer, on-chain* transaction volume. Systems like the Lightning Network are designed precisely to let far more actual payments occur than the base layer could ever directly process, settling only periodically on-chain (see [Why Layer 2 Exists](../layer2/README.md) for the general pattern this follows, shared with Ethereum's own Layer 2 ecosystem).

## Further reading

- See also: [The Block Size Debate](../forks/block-size-war.md), [Transaction Fees](../bitcoin/fees.md)

---

[← Previous: The Scaling Problem](./README.md)
·
[Back to Bitcoin Scaling](./README.md)
·
[Next: SegWit as a Scaling Upgrade →](./segwit.md)
