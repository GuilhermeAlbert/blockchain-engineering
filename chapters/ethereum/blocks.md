# Ethereum Blocks

An Ethereum block shares the same basic shape as a Bitcoin block — a header plus a body of transactions — but its header carries meaningfully more information, reflecting Ethereum's richer state model. This chapter covers the header fields specific to Ethereum, building on the general block structure from [Blocks](../blockchain/blocks.md).

## Header fields beyond what Bitcoin's header carries

Alongside fields with direct Bitcoin analogues (a parent block hash, a timestamp, a nonce field used pre-Merge for proof-of-work), Ethereum's block header includes several roots committing to different kinds of state, each a root of its own [Merkle Patricia Trie](./state-trie.md):

- **stateRoot** — commits to the *entire* current world state (every account's balance, nonce, code, and storage) after this block's transactions have executed. This has no Bitcoin analogue at all — Bitcoin's UTXO set is derived, not directly committed to in any single block header field.
- **transactionsRoot** — commits to this block's list of transactions, playing the same role as Bitcoin's Merkle root (see [Merkle Roots](../blockchain/merkle-roots.md)).
- **receiptsRoot** — commits to the **receipts** (execution results, including whether each transaction succeeded, how much gas it used, and any [event logs](../contracts/events.md) it emitted) produced by executing this block's transactions.
- **gasLimit / gasUsed** — the block's own gas ceiling (adjustable, within bounds, block to block by validators) and how much of it this block's transactions actually consumed, feeding directly into the [base fee adjustment](./fees.md#the-base-fee-adjustment-formula).

## Why a state root, specifically

Because Ethereum's account model means the full world state changes with every block (balances update, contract storage updates), committing to that entire state in the header — not just to the transactions that caused the changes — gives a powerful, direct capability: given only a block header's state root, a party can request and verify a **Merkle proof** (the same general mechanism from [Merkle Proofs](../cryptography/merkle-proofs.md)) that a specific account currently has a specific balance, nonce, or piece of contract storage, without needing to replay the entire transaction history from genesis to compute it. This is the foundation for **light client** designs on Ethereum, conceptually similar to Bitcoin's SPV (see [Light Clients](../bitcoin/light-clients.md)) but proving current state directly, rather than only proving historical transaction inclusion.

## Post-Merge changes to block production

Since [The Merge](./the-merge.md), Ethereum blocks are no longer found through proof-of-work mining — they're produced by **validators** selected through Ethereum's proof-of-stake mechanism (see [Proof of Stake](./proof-of-stake.md)), on a fixed, predictable 12-second **slot** schedule (see [Validators](./validators.md)) rather than the probabilistic, variable timing Bitcoin's proof-of-work produces. The `nonce` and `difficulty` header fields, meaningful under proof-of-work, are fixed to constant, no-longer-meaningful values post-Merge, retained in the header format for backward structural compatibility rather than because they still serve their original purpose.

## Common misconceptions

**Ethereum's stateRoot does not mean the full state is stored inside every block** — only a 32-byte root hash committing to that state is stored in the header; the actual, full state data lives in each node's own local database, updated incrementally as blocks are processed, exactly analogous to how a Bitcoin node maintains its own local UTXO set (see [Under the Hood: The UTXO Set](../bitcoin/utxo.md#under-the-hood-the-utxo-set)) rather than that set being stored directly in block headers.

**Block time on Ethereum is not probabilistic the way Bitcoin's is**, since The Merge — validators are assigned specific, scheduled slots (see [Validators](./validators.md)), producing a fixed 12-second cadence rather than the random, Poisson-distributed timing that proof-of-work mining produces (see [Block Time](../blockchain/block-time.md)).

## Further reading

- [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) — Section 4.3 (The Block)
- [ethereum.org: Blocks](https://ethereum.org/en/developers/docs/blocks/)

---

[← Previous: Gas Price and Fees](./fees.md)
·
[Back to Ethereum](./README.md)
·
[Next: Ethereum State →](./state.md)
