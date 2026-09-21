# Light Clients

A light client (also called an SPV (Simplified Payment Verification) client) verifies Bitcoin payments without downloading or validating the entire blockchain. This chapter covers exactly what it checks, what it doesn't, and why that gap matters, building directly on [Merkle Proofs](../cryptography/merkle-proofs.md) and Section 8 of the whitepaper, which [The Bitcoin Whitepaper](../origins/bitcoin-whitepaper.md#8-simplified-payment-verification-spv) already introduced.

## How it works

A light client downloads and stores only [block headers](../blockchain/block-headers.md) (80 bytes each, roughly 4.2 MB per year of blocks) rather than full blocks. To verify a specific transaction, it asks a full node (or several) for a [Merkle proof](../cryptography/merkle-proofs.md) showing that transaction is included under a specific block's Merkle root. Because the light client independently has that block's header (and can verify the header's own proof-of-work and its link to the chain it's been following), it can confirm the transaction's inclusion without ever downloading that block's other, unrelated transactions.

## What this genuinely verifies

A light client using this method can confirm, with real cryptographic assurance: this specific transaction is included in a block that is part of a chain with a specific amount of cumulative proof-of-work behind it. This is a meaningful, non-trivial guarantee. Nobody can forge a fake inclusion proof for a transaction that wasn't actually in the block, because doing so would require breaking the Merkle tree's collision resistance (see [Merkle Proofs](../cryptography/merkle-proofs.md#tradeoffs)).

## What it does not verify

This is the tradeoff stated explicitly in the whitepaper itself: a light client does not independently check that every transaction in every block it's building confidence on was actually valid under consensus rules. It trusts that the network majority extending the chain it's following is behaving honestly and would reject invalid blocks. A light client connected to a dishonest majority (or an attacker temporarily able to isolate it and feed it a fabricated chain. An **eclipse attack**) could, in principle, be shown a chain containing invalid transactions that a full node would have rejected outright.

> "[SPV] verification is reliable as long as honest nodes control the network, but is more vulnerable if the network is overpowered by an attacker."
> Satoshi Nakamoto, [Bitcoin whitepaper](https://bitcoin.org/bitcoin.pdf), Section 8

## Bloom filters and their privacy cost

Early SPV implementations (via BIP 37) let a light client ask full nodes to filter which transactions to send it using a **Bloom filter**, a compact, probabilistic data structure that lets a node request "transactions matching roughly these addresses" without revealing exactly which addresses it cares about. In practice, Bloom filters leaked more information than intended (a sufficiently motivated full node could often narrow down, with reasonable confidence, which specific addresses a given light client was actually interested in), and this approach has been substantially deprecated in favor of newer designs.

## Compact block filters (BIP 157/158)

Modern light client designs increasingly use **compact block filters**: instead of the light client telling a full node what it's looking for (which leaks information), the full node publishes a compact filter for each block's contents, and the light client downloads and checks filters *locally* against its own addresses, only requesting full block data for blocks that plausibly match, meaningfully improving privacy since the full node never learns which specific addresses the client is checking against.

## Tradeoffs

Light clients make running a Bitcoin wallet practical on resource-constrained devices (phones, browser extensions) at the direct cost of the trust-minimization guarantee full validation provides. This is a real, quantifiable security-versus-convenience tradeoff, not a minor implementation detail, and it's why this book treats "running a full node" and "using a light wallet" as meaningfully different security postures throughout, rather than interchangeable ways of "using Bitcoin."

## Common misconceptions

**A light client is not "less secure" against theft of already-received funds** in the same way it's less secure about verifying incoming payments, the private key security model (see [Private and Public Keys](../cryptography/keys.md)) is independent of whether a wallet does full or SPV validation; the specific risk SPV introduces is about trusting the *history and validity* it's shown, not about key custody itself.

**SPV is not the same thing as a "custodial" wallet.** A light client still holds its own private keys and constructs its own transactions. It simply relies on other nodes for blockchain data rather than validating that data fully itself. Custodial wallets, by contrast, don't hold the user's keys at all (see [Custodial vs Non-Custodial Wallets](../wallets/custody.md)).

## Further reading

- [Bitcoin whitepaper, Section 8](https://bitcoin.org/bitcoin.pdf)
- [BIP 157: Client Side Block Filtering](https://github.com/bitcoin/bips/blob/master/bip-0157.mediawiki)
- [BIP 37: Connection Bloom Filtering](https://github.com/bitcoin/bips/blob/master/bip-0037.mediawiki)

---

[← Previous: Full Nodes](./full-nodes.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Bitcoin Core →](./bitcoin-core.md)
