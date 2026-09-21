# Ethereum

Ethereum adds general-purpose computation to the blockchain model this book built up through Bitcoin — trading Bitcoin's UTXO model for accounts, its non-Turing-complete Script for the Turing-complete EVM, and (since 2022) its proof-of-work consensus for proof-of-stake. This section covers Ethereum's own architecture on its own terms, drawing direct comparisons to Bitcoin throughout precisely because the contrasts are the fastest way to understand *why* Ethereum made each different design choice.

## What you need to know first

Everything through [Bitcoin](../bitcoin/README.md) and [Distributed Systems](../distributed-systems/README.md) — this section assumes you understand blocks, transactions, consensus, and Sybil resistance in Bitcoin's specific context, and builds Ethereum's differences directly on top of that foundation rather than re-explaining shared concepts from scratch.

## Chapters

### Accounts and transactions

1. [Ethereum Accounts](./accounts.md) — the four fields every account has, verified against live chain data
2. [Externally Owned Accounts](./eoa.md) — key-controlled accounts, and why every transaction traces back to one
3. [Contract Accounts](./contract-accounts.md) — code-controlled accounts, and why they can never act unprompted
4. [Ethereum Transactions](./transactions.md) — the fields, and the EIP-1559 type that's been default since 2021
5. [Gas](./gas.md) — metering computation to bound a Turing-complete virtual machine
6. [Gas Price and Fees](./fees.md) — the base-fee-and-tip model, with its adjustment formula run and verified

### State

7. [Ethereum Blocks](./blocks.md) — the header fields with no Bitcoin analogue
8. [Ethereum State](./state.md) — the current snapshot, distinguished from history
9. [State Trie](./state-trie.md) — why a plain Merkle tree isn't enough for key-based state

### Infrastructure

10. [JSON-RPC](./json-rpc.md) — the raw protocol underneath every wallet and library, called directly and verified live
11. [Ethereum Nodes](./nodes.md) — why a full node is two communicating pieces of software, not one
12. [Execution Clients](./execution-clients.md) — Geth, Nethermind, Besu, Erigon, Reth
13. [Consensus Clients](./consensus-clients.md) — Prysm, Lighthouse, Teku, Nimbus, Lodestar

### Proof of Stake

14. [The Merge](./the-merge.md) — the two-year, two-chain strategy behind Ethereum's consensus transition
15. [Proof of Stake](./proof-of-stake.md) — staked capital as Sybil resistance, and why it needs a known validator set
16. [Validators](./validators.md) — activation queues, effective balance, and exit
17. [Staking](./staking.md) — solo, pooled, and liquid staking, and the centralization question each raises
18. [Slashing](./slashing.md) — the two narrow, cryptographically provable offenses that trigger it
19. [Finality](./finality.md) — justified and finalized checkpoints, compared directly against Bitcoin's probabilistic model

## Next

Continue to [The EVM](../evm/README.md) to see exactly what a contract account's code actually is and how it executes — the bytecode and opcode level this section's [Contract Accounts](./contract-accounts.md) chapter described only from the outside.
