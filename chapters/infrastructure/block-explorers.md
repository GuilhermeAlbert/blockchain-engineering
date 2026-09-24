# Block Explorers

A block explorer combines node data, traces, decoded contracts, token metadata, address labels, and search indexes into a public interface. It is a powerful debugging tool, not part of blockchain consensus.

## Canonical and derived fields

Block hash, transaction bytes, receipt status, logs, and contract code come from chain data. Human-readable function names come from an ABI or signature database. Token names and symbols come from contract calls or metadata. Address labels come from the explorer's research, users, or partners. Fiat values use off-chain price sources.

These fields carry different guarantees. A label can be wrong while the address is correct. A decoded call can use an ABI that does not match the implementation active at that block. A displayed token can imitate the name and symbol of another contract.

## Source verification

Contract source verification recompiles submitted source and settings, then compares resulting bytecode with deployed code. Matching bytecode connects readable source to an address. It does not audit the source, validate constructor arguments as safe, or prove that a proxy currently delegates to the verified implementation a user is reading.

Reproducibility requires compiler version, optimizer settings, metadata behavior, libraries, and source inputs. Proxy-aware explorers should show implementation and admin slots with the block context in which they were read.

## Reorgs and status

An explorer can display a transaction in a block that later becomes orphaned. Confirmation counts should follow the current canonical hash, not only increment from a stored block number. Near-head pages may change. Finalized or sufficiently confirmed history can be cached more aggressively.

## Using explorers safely

Verify chain and contract address before copying data. Treat labels, token metadata, decoded calls, and fiat values as aids. For high-impact actions, compare source, bytecode, implementation address, and role state through an independent RPC path.

An explorer outage does not stop the chain, but applications that depend on its proprietary API may stop. Prefer standard RPC for consensus data and use explorer APIs for the added indexes the product explicitly needs.

## Further reading

- [Solidity contract metadata](https://docs.soliditylang.org/en/latest/metadata.html)
- [EIP-1967 proxy storage slots](https://eips.ethereum.org/EIPS/eip-1967)
- See also: [Deployment](../contracts/deployment.md), [Indexers](./indexers.md)

---

[← Previous: The Graph](./the-graph.md)
·
[Back to Infrastructure](./README.md)
·
[Next: Mempool Infrastructure →](./mempool.md)
