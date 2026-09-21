# Bitcoin Scaling

Bitcoin's base layer deliberately limits block space, a design choice covered in [Block Size](./block-size.md) and defended in [The Block Size Debate](../forks/block-size-war.md). This section covers the two broad families of response: getting more out of existing block space, and moving transaction volume off the base layer entirely, through a spectrum of systems with genuinely different trust models worth distinguishing carefully.

## What you need to know first

[The Block Size Debate](../forks/block-size-war.md), [Multisig](../wallets/multisig.md), and [Taproot](../bitcoin/taproot.md), the systems in this section build directly on all three.

## Chapters

### Getting more from the base layer

1. [Block Size](./block-size.md): the throughput ceiling, and why it's a deliberate tradeoff, not an oversight
2. [SegWit as a Scaling Upgrade](./segwit.md): how much capacity it actually added, isolated from its malleability fix
3. [Transaction Batching](./batching.md): quantified fee savings from combining payments

### Moving off the base layer

4. [Payment Channels](./payment-channels.md): the general two-party mechanism the Lightning Network builds on

### Other Bitcoin layers and systems

Presented in order of decreasing trust-minimization, pay attention to what secures the peg or the transfer in each case, not just what each system's own internal mechanism does.

5. [Sidechains](./sidechains.md): the general pattern, and why the peg mechanism is what actually matters
6. [Liquid Network](./liquid.md): a federated sidechain built for institutional settlement speed and privacy
7. [Federations](./federations.md): the trust model generalized, and where else it recurs
8. [Statechains](./statechains.md): off-chain UTXO ownership transfer, and the semi-trusted deletion it depends on
9. [RGB](./rgb.md): client-side validation, contrasted directly with how Ethereum smart contracts work
10. [Bitcoin Rollup Proposals](./rollups.md): BitVM, and why genuine rollups are harder to build on Bitcoin than Ethereum

## Next

Continue to [Lightning Network](../lightning/README.md) for the full, multi-hop network built on the payment channel mechanism introduced in this section.
