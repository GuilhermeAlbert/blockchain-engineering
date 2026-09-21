# Contract Accounts

A contract account is an Ethereum account whose behavior is defined by code — EVM bytecode, executed whenever the account is called. This chapter covers how contract accounts differ from [EOAs](./eoa.md), how they come into existence, and the specific limitation that shapes almost every other design decision covered in the [Smart Contracts](../contracts/README.md) section later in this book.

## What makes it a contract account

Recall the shared four-field structure from [Ethereum Accounts](./accounts.md#what-every-account-contains): a contract account has the identical fields an EOA has, but its `codeHash` points to real, non-empty EVM bytecode (see [Bytecode](../evm/bytecode.md)), and it typically has non-empty persistent storage (its `storageRoot` pointing to an actual [Merkle Patricia Trie](./state-trie.md) of stored key-value data) — the account's contract code and stored state are what implement whatever logic the contract provides.

## How a contract account comes into existence

A contract account is created by a special transaction (or an internal call using the `CREATE` or `CREATE2` opcode — see [Contract Creation](../evm/contract-creation.md)) that includes **initialization code** — a piece of EVM bytecode that runs exactly once, at creation time, and whose *return value* becomes the new contract's permanent, stored code going forward. This two-step structure (init code that runs once and returns the code to actually store) is what lets a contract's constructor logic — setting up initial storage values, for instance — run without that constructor logic itself becoming part of the contract's permanent, callable bytecode.

```text
Contract creation transaction:
  data: <init code>
           │
           │  init code executes once, at creation
           ▼
      returns: <runtime code>
           │
           ▼
  new contract account's codeHash now points to <runtime code>
  (the init code itself is discarded, not stored)
```

## The central limitation: a contract can't act on its own

This is worth stating as plainly and directly as possible, because it shapes an enormous amount of downstream design in the [DeFi](../defi/README.md) and broader smart contract ecosystem: **a contract account has no ability to initiate any action whatsoever on its own.** It can only execute in response to being called — by a transaction originating from an EOA, or by a call from another contract that is itself, tracing back through the call chain, ultimately triggered by an EOA's transaction (see [EOAs](./eoa.md#every-transaction-traces-back-to-an-eoa)). A contract cannot "wake up" and act at a scheduled future time, cannot monitor external conditions and react automatically, and cannot spontaneously decide to do anything — it is entirely, structurally **passive** until called.

This is precisely why systems that need something to happen automatically — liquidating an undercollateralized loan the moment it becomes eligible (see [Liquidations](../defi/liquidations.md)), for instance — rely on external, off-chain participants (often called "keepers" or "bots") who watch on-chain conditions and submit the triggering transaction themselves, typically earning a fee for doing so, rather than any mechanism internal to the contract initiating the action unprompted.

## Common misconceptions

**A contract account is not "running" continuously in the background** the way a conventional server process does — its code executes only for the specific duration of a single call, then stops entirely until the next call arrives; there's no persistent, always-on execution happening between calls, only persistent *storage* (see [Storage](../evm/storage.md)) retaining state from one call to the next.

**Deploying a contract does not require the deployer to retain any ongoing relationship with it** unless the contract's own code specifically grants the deployer special, ongoing privileges (an owner role, for instance — see [Access Control](../security/access-control.md)) — a contract with no such privileged roles built into its code operates entirely according to its own fixed logic, independent of whoever originally deployed it.

## Further reading

- [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) — Section 7 (Contract Creation)
- [ethereum.org: Accounts](https://ethereum.org/en/developers/docs/accounts/#contract-accounts)

---

[← Previous: Externally Owned Accounts](./eoa.md)
·
[Back to Ethereum](./README.md)
·
[Next: Ethereum Transactions →](./transactions.md)
