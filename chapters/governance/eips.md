# EIPs

Ethereum Improvement Proposals document standards and changes for Ethereum. Core EIPs concern protocol behavior. ERCs define application-level conventions. Networking and interface proposals cover their respective layers. Final status means the document completed its standards process, not that every application must use it.

## Workflow

EIP-1 asks authors to discuss an idea before submitting a formal proposal. Editors check format and process. A tracked proposal moves through Draft, Review, Last Call, and Final when its specification stabilizes and review completes. Inactive work may become Stagnant; authors can withdraw proposals; Living documents remain open to revision by design.

Editors merge qualifying documents but do not activate Core EIPs. Core changes need client interest, implementations, tests, coordination, and inclusion in a network upgrade. EIP-1 identifies AllCoreDevs as a venue for implementers to discuss technical merit and coordinate compatible releases.

## Core EIPs and ERCs

A Core EIP can change transaction validity, gas accounting, opcodes, consensus, or networking. Its deployment affects nodes and may require activation at a named fork. An ERC defines a convention contracts and applications may choose, such as token interfaces. ERC-20 became useful because contracts, wallets, and exchanges adopted it, not because the EIP repository could force compliance.

Some EIPs span layers or depend on others. Read the `requires` field, discussions, test cases, and client implementation status. An interface can be Final while common contracts implement extensions or deviations that callers must handle.

## Status does not measure safety

Final indicates specification maturity. It does not certify an implementation, audit a contract, resolve governance objections, or guarantee adoption. A proposal can be technically complete and economically controversial. Conversely, a widely deployed convention may continue evolving through later EIPs.

## Further reading

- [EIP-1: EIP Purpose and Guidelines](https://eips.ethereum.org/EIPS/eip-1)
- [All Ethereum Improvement Proposals](https://eips.ethereum.org/all)
- See also: [Protocol Upgrades](../forks/upgrades.md), [Token Standards](../tokens/README.md)

---

[← Previous: BIPs](./bips.md)
·
[Back to Governance](./README.md)
·
[Next: Core Developers →](./core-developers.md)
