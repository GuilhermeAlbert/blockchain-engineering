# Execution Clients

The execution client is the half of an Ethereum node responsible for the work covered throughout most of this section so far: processing transactions, executing EVM bytecode, and maintaining the [state trie](./state-trie.md). This chapter covers what it actually does and the major independent implementations.

## What an execution client does

Given a block (handed to it by the [consensus client](./consensus-clients.md)), the execution client processes every transaction in order, running the EVM (see [The EVM](../evm/README.md)) for each one, updating account balances and contract storage, computing gas usage and fees, and producing the resulting new state root and transaction receipts. It also serves [JSON-RPC](./json-rpc.md) requests — every `eth_call`, `eth_getBalance`, and similar query is answered by the execution client, since it's the component that actually holds and can query current state.

## Major implementations

- **Geth (go-ethereum)** — historically the most widely run execution client, written in Go, maintained by the Ethereum Foundation.
- **Nethermind** — written in C#/.NET.
- **Besu** — written in Java, notable for its enterprise and permissioned-network use cases in addition to public mainnet use.
- **Erigon** — a Geth-derived client focused specifically on faster sync times and more efficient storage for archive-node use cases (see [Archive Nodes](../infrastructure/archive-nodes.md)).
- **Reth** — a newer, Rust-based client developed by Paradigm, focused on performance and modularity.

Client diversity across these independent implementations is the specific structural benefit described in [Ethereum Nodes](./nodes.md#why-this-split-is-a-deliberate-strength-not-a-leftover-complication) — a bug specific to one client's code doesn't affect nodes running a different one, and the Ethereum community actively monitors the real-world distribution of which clients node operators actually run, historically raising concern when any single client's share has grown large enough to represent a meaningful systemic risk if it turned out to have a serious bug.

## Common misconceptions

**Different execution clients are not different, competing versions of Ethereum** — they're independent implementations of the identical protocol specification, expected to (and, when working correctly, do) produce byte-for-byte identical results when processing the same blocks; the diversity is in the software, not in the rules being enforced.

**An execution client alone cannot participate in Ethereum's consensus** — since the Merge, it depends entirely on a paired consensus client (see [Consensus Clients](./consensus-clients.md)) to tell it which blocks to process and validate; it has no independent way to determine the canonical chain on its own.

## Further reading

- [ethereum.org: Execution clients](https://ethereum.org/en/developers/docs/nodes-and-clients/#execution-clients)

---

[← Previous: Ethereum Nodes](./nodes.md)
·
[Back to Ethereum](./README.md)
·
[Next: Consensus Clients →](./consensus-clients.md)
