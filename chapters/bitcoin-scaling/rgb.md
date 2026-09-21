# RGB

RGB is a protocol for issuing and transferring smart-contract-like assets (tokens, and more general programmable state) that stores the actual data and computation **off-chain**, using Bitcoin only as a timestamping and ownership-anchoring layer. This chapter covers what makes that specific design choice distinctive, particularly by comparison with how Ethereum handles smart contracts.

## The core design principle: client-side validation

RGB's defining architectural choice is **client-side validation**: rather than every network participant downloading and verifying every RGB contract's full state and history (the way every Ethereum node processes every smart contract's state changes, see [Ethereum State](../ethereum/state.md)), an RGB contract's data and transition history is held and independently validated only by the parties actually involved in that specific contract. The data isn't broadcast to or stored by the broader Bitcoin network at all. Bitcoin's role is narrower and specific: RGB commitments (cryptographic hashes representing a contract state transition) are embedded into ordinary Bitcoin transactions, using Bitcoin's own [Taproot](../bitcoin/taproot.md) script-path capabilities, giving RGB state transitions a tamper-evident, timestamped anchor in Bitcoin's own proof-of-work-secured history without Bitcoin's base layer needing to understand, store, or validate the RGB-specific content itself.

## Why this is different from how Ethereum smart contracts work

This is worth contrasting directly, since it's the clearest way to understand RGB's design intent: an Ethereum smart contract's full state is public, stored, and independently validated by every full node on the network (see [Ethereum Accounts](../ethereum/accounts.md#contract-accounts)), a global, shared, universally verifiable ledger of contract state. RGB deliberately inverts this: contract state is private by default, known only to the parties involved, with Bitcoin providing only a minimal, generic commitment mechanism rather than a full execution and storage environment. This gives RGB meaningfully stronger privacy properties (an outside observer sees only an ordinary-looking Bitcoin transaction, not any detail about what RGB contract state changed) at the cost of not having a single, universally shared, publicly auditable ledger of contract state the way Ethereum provides, verifying an RGB asset's legitimate history requires actually obtaining and validating that specific asset's private transaction history from a counterparty, not simply querying a public blockchain.

## What this enables

RGB is designed to support issuing fungible tokens (comparable in spirit to Ethereum's [ERC-20](../tokens/erc-20.md)) and non-fungible assets directly on top of Bitcoin's security model, without requiring Bitcoin's own base-layer consensus rules to natively understand token semantics at all, a meaningfully different approach than, for instance, the [Ordinals and Inscriptions](../bitcoin/ordinals.md) pattern, which embeds data directly and publicly into Bitcoin's own witness data rather than keeping it off-chain and privately held.

## Current status

RGB remains an actively developed, comparatively early-stage protocol relative to Ethereum's mature, extensively battle-tested token and smart-contract ecosystem. Real implementations and specifications exist, and some issuance and wallet tooling has been built, but adoption and real-world usage remain considerably smaller in scale than established Ethereum token standards as of this writing. This book presents it as a documented, genuine architectural approach worth understanding for its design principles, not as an established, widely-adopted production system on the scale of Ethereum's token ecosystem.

## Common misconceptions

**RGB contract data is not stored on the Bitcoin blockchain**, even in a compressed or hashed form beyond the commitment itself. This is the entire point of client-side validation; confusing RGB with an on-chain data-storage scheme like [Ordinals](../bitcoin/ordinals.md) misses its core, distinguishing design choice.

**RGB is not a Bitcoin sidechain** in the sense [Sidechains](./sidechains.md) describes. It has no separate blockchain or independent consensus mechanism of its own; it's a protocol layered directly on top of ordinary Bitcoin transactions and off-chain data exchange between parties.

## Further reading

- [RGB protocol documentation](https://rgb.tech/)

---

[← Previous: Statechains](./statechains.md)
·
[Back to Bitcoin Scaling](./README.md)
·
[Next: Bitcoin Rollup Proposals →](./rollups.md)
