# Consensus Clients

The consensus client is the half of an Ethereum node responsible for running the proof-of-stake protocol itself — tracking validators, participating in or verifying attestations, and determining which chain of blocks is canonical. This chapter covers what it does, ahead of the full proof-of-stake mechanics covered in [Proof of Stake](./proof-of-stake.md) and [Validators](./validators.md).

## What a consensus client does

A consensus client implements Ethereum's proof-of-stake consensus protocol (formally, a combination of **LMD-GHOST** for fork choice and **Casper FFG** for finality, both covered mechanically in [Proof of Stake](./proof-of-stake.md) and [Finality](./finality.md)). For a node running one or more validators (see [Validators](./validators.md)), the consensus client also handles the validator duties themselves: proposing blocks when assigned, and submitting attestations (votes on which block/chain a validator considers canonical) on the fixed 12-second slot schedule.

## Major implementations

- **Prysm** — written in Go, developed by Prysmatic Labs (now part of Offchain Labs).
- **Lighthouse** — written in Rust, developed by Sigma Prime.
- **Teku** — written in Java, developed by Consensys.
- **Nimbus** — written in Nim, notable for being specifically optimized to run efficiently on resource-constrained hardware.
- **Lodestar** — written in TypeScript, notable for being usable directly in browser and Node.js environments.

As with execution clients, diversity across these independent implementations is monitored and actively encouraged within the Ethereum community for the same systemic-risk reasons covered in [Ethereum Nodes](./nodes.md#why-this-split-is-a-deliberate-strength-not-a-leftover-complication).

## The Engine API: how the two client halves actually talk

The consensus client and execution client communicate over a standardized local API (the **Engine API**), letting the consensus client instruct the execution client to build or validate a specific block and receive back the execution results needed to include in that block's proposal or attestation. This interface is itself a formally specified part of Ethereum's protocol, specifically designed so that *any* execution client implementation can pair correctly with *any* consensus client implementation — a real, tested property (not just a theoretical goal) that further reinforces the client-diversity benefit, since operators can mix and match implementations freely rather than being locked into using a matched pair from the same development team.

## Common misconceptions

**A consensus client does not execute transactions or maintain EVM state itself** — that's entirely the execution client's job; the consensus client's role is specifically about which chain of blocks is canonical and about validator participation in the proof-of-stake protocol, not about processing transaction contents.

**Running a consensus client without also running validators is a completely normal, common configuration** — most consensus clients run as part of an ordinary full node, verifying the chain without necessarily also running the validator duties that require staked ETH (see [Staking](./staking.md)).

## Further reading

- [Ethereum consensus specifications](https://github.com/ethereum/consensus-specs)
- [ethereum.org: Consensus clients](https://ethereum.org/en/developers/docs/nodes-and-clients/#consensus-clients)

---

[← Previous: Execution Clients](./execution-clients.md)
·
[Back to Ethereum](./README.md)
·
[Next: The Merge →](./the-merge.md)
