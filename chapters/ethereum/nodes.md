# Ethereum Nodes

Since [The Merge](./the-merge.md), running a full Ethereum node means running **two** separate pieces of software that work together — an execution client and a consensus client — rather than the single, unified node software Bitcoin uses. This chapter explains why the split exists before the next two chapters cover each half in detail.

## Why two clients, not one

Before the Merge, a single piece of software (like Geth) handled everything: executing transactions, maintaining state, and running proof-of-work mining or validation. The Merge (see [The Merge](./the-merge.md)) combined Ethereum's original proof-of-work execution layer with a separately developed proof-of-stake consensus system (the Beacon Chain, which had been running independently since December 2020 specifically to let the new consensus mechanism be tested and hardened before being connected to Ethereum's real, value-bearing execution layer). Rather than merging these into one monolithic codebase after the fact, Ethereum kept them as two communicating pieces of software:

- **Execution client** — processes transactions, executes EVM bytecode, maintains state (see [Execution Clients](./execution-clients.md)).
- **Consensus client** — runs the proof-of-stake consensus protocol, determining which chain of blocks is canonical and coordinating validators (see [Consensus Clients](./consensus-clients.md)).

The two communicate over a standardized local interface (the **Engine API**), with the consensus client directing the execution client on which blocks to build and validate, and the execution client reporting back the results.

## Why this split is a deliberate strength, not a leftover complication

This architecture, sometimes framed as unwelcome added complexity for node operators, is genuinely useful for a specific, structural reason: it lets Ethereum's community run **multiple independent implementations of each layer**, developed by separate teams, reducing the risk that a single software bug affecting one specific client could take down or corrupt the entire network's consensus — a real concern given that a bug shared by every network participant's identical software is a systemic risk in a way that diversity of independent implementations directly mitigates. Client diversity — the actual, monitored distribution of which execution and consensus clients node operators run — is tracked and actively discussed within the Ethereum community specifically because excessive concentration on any single client would reintroduce exactly this systemic risk.

## Common misconceptions

**Running an Ethereum node does not mean running just one piece of software**, unlike Bitcoin Core's single-binary model (see [Bitcoin Core](../bitcoin/bitcoin-core.md)) — a full, validating Ethereum node since the Merge requires both an execution and a consensus client running together and communicating.

**The execution/consensus split is not the same distinction as Bitcoin's full-node-versus-light-client split** — both Ethereum client types are typically run together for full validation; the analogous "light" alternative on Ethereum is a separate question about trusting a remote RPC provider rather than running any client software locally at all (see [Infrastructure](../infrastructure/README.md)).

## Further reading

- [ethereum.org: Nodes and clients](https://ethereum.org/en/developers/docs/nodes-and-clients/)

---

[← Previous: JSON-RPC](./json-rpc.md)
·
[Back to Ethereum](./README.md)
·
[Next: Execution Clients →](./execution-clients.md)
