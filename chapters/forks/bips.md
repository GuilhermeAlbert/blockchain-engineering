# BIPs

A Bitcoin Improvement Proposal (BIP) is a formal design document describing a proposed change, new feature, or piece of standardized information for the Bitcoin protocol or ecosystem. This chapter covers the process itself, modeled explicitly on an older, similar process from a different open-source project.

## Origin and model

The BIP process, formalized by Amir Taaki and Luke Dashjr starting in 2011 via BIP 1 and BIP 2, was explicitly modeled on Python's PEP (Python Enhancement Proposal) process — a deliberate choice to bring a structured, precedented way of proposing and documenting significant changes to a project that, unlike Python, has no single organization or benevolent-dictator figure with final authority over what gets adopted.

## The three categories

BIPs are classified into types, each with a different purpose:

- **Standards Track** — proposals affecting most or all Bitcoin implementations, including changes to the network protocol, consensus rules (block or transaction validity), or anything affecting interoperability between different pieces of Bitcoin software. This is the category most soft forks and hard forks fall under, including [BIP 141 (SegWit)](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki) and [BIP 341 (Taproot)](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki).
- **Informational** — design issues, general guidelines, or information for the Bitcoin community, not proposing a new feature; these carry no requirement or expectation of implementation.
- **Process** — proposals about a process surrounding Bitcoin itself, rather than the protocol — including changes to the BIP process, like BIP 1 and BIP 2 themselves.

## The lifecycle a BIP moves through

A BIP typically progresses through statuses including **Draft** (under active discussion and revision), **Proposed** (considered feature-complete and ready for broader review), **Active** or **Final** (implemented, and for a Standards Track BIP describing a consensus change, actually activated on the network), **Rejected** (a proposal that didn't move forward, kept in the record), **Withdrawn** (removed by its own author), or **Replaced** (superseded by a later BIP). A BIP number and a "Final" status don't imply universal love for the idea — they specifically indicate the document met the process's formal completeness and review bar, and (for consensus-changing proposals) that the change actually activated on the network.

## BIP editors, not a governing authority

BIPs are formally assigned numbers and merged into the public [bitcoin/bips repository](https://github.com/bitcoin/bips) by designated **BIP editors** — a role focused on process and documentation quality (is the proposal clearly written, technically complete, correctly formatted), explicitly **not** a role with authority to decide which proposals are good ideas or should be adopted by the network. This distinction matters directly for [Bitcoin Governance](./governance.md): a BIP editor accepting a document into the repository is a curatorial, documentation-focused act, not an endorsement or a guarantee of eventual activation.

## Notable BIPs referenced throughout this book

| BIP | Subject | Chapter |
| --- | --- | --- |
| BIP 9 | Version bits soft fork signaling | [Miner Signaling](./miner-signaling.md) |
| BIP 16 | Pay to Script Hash | [P2SH](../bitcoin/p2sh.md) |
| BIP 32 | Hierarchical Deterministic Wallets | [HD Wallets](../wallets/hd-wallets.md) |
| BIP 39 | Mnemonic code for generating deterministic keys (seed phrases) | [Seed Phrases](../wallets/seed-phrases.md) |
| BIP 44 | Multi-account hierarchy for deterministic wallets | [Derivation Paths](../wallets/derivation-paths.md) |
| BIP 141 | Segregated Witness | [SegWit](../bitcoin/segwit.md) |
| BIP 340/341/342 | Taproot and Schnorr signatures | [Taproot](../bitcoin/taproot.md) |

## Common misconceptions

**A BIP is not legally binding or enforceable in any sense** — it's a documentation and coordination convention the Bitcoin developer community has adopted voluntarily; nothing prevents an implementation from ignoring a BIP entirely, though doing so for a widely-adopted consensus-affecting BIP would mean falling out of consensus with the rest of the network.

**Having a BIP number does not mean a proposal is technically sound or will ever be adopted** — the process accepts drafts for structured discussion and record-keeping; scrutiny, debate, and ultimately voluntary, distributed adoption decide whether an idea actually becomes part of the protocol.

## Further reading

- [bitcoin/bips repository](https://github.com/bitcoin/bips)
- [BIP 1: BIP Purpose and Guidelines](https://github.com/bitcoin/bips/blob/master/bip-0001.mediawiki)
- [BIP 2: BIP process, revised](https://github.com/bitcoin/bips/blob/master/bip-0002.mediawiki)

---

[← Previous: Protocol Upgrades](./upgrades.md)
·
[Back to Forks and Protocol Upgrades](./README.md)
·
[Next: Bitcoin Governance →](./governance.md)
