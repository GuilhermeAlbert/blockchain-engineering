# Ethereum State

Ethereum's "state" is the complete, current snapshot of every account that exists, every balance, every contract's storage, everything the network currently knows to be true at this exact moment. This chapter covers state as a concept, distinct from the mechanics of how it's actually stored and proven, covered next in [State Trie](./state-trie.md).

## State versus history

This distinction matters and is easy to blur: **state** is Ethereum's current snapshot, what every account looks like *right now*. **History** is the full sequence of blocks and transactions that produced that current state, going back to genesis. A full Ethereum node needs to process the full history at least once to arrive at a correct current state, but ongoing operation (validating new blocks, answering queries about current balances) primarily depends on the current state, not on continuously re-deriving it from history. This is why [Archive Nodes](../infrastructure/archive-nodes.md) (which retain every historical state snapshot, not just the current one) are a specialized, more resource-intensive category distinct from an ordinary full node.

## What state execution actually does

Processing a block means taking the previous block's state, applying every transaction in the new block in order, and arriving at a new state. Each transaction reads some current state (account balances, contract storage) and, if valid, writes updated values back. This is deterministic: every honest node, given the identical previous state and the identical block, computes the identical resulting state, which is exactly what lets the block header's `stateRoot` field (see [Ethereum Blocks](./blocks.md#header-fields-beyond-what-bitcoin's-header-carries)) serve as a universally checkable commitment; any node can independently verify a claimed state root by actually re-executing the block itself and confirming its own computed root matches.

## Why state size is a real, ongoing engineering concern

Because state only grows (new accounts and contracts are created far more often than existing ones are meaningfully removed, and even Ethereum's rare account-clearing mechanisms have historically been limited), the size of Ethereum's full state has grown substantially over the network's history, and continues to. This is a genuine, actively-managed engineering concern: larger state means more expensive storage and slower access for every full node, which is part of the motivation behind ongoing research and proposals (state expiry, statelessness, and various forms of state rent have all been discussed within Ethereum's research community) aimed at keeping state growth from becoming an unsustainable long-term burden on node operators, an active area of protocol research this book does not treat as settled or finalized.

## Common misconceptions

**"The blockchain" and "the state" are not the same thing, even though they're closely related.** The blockchain is the full, append-only history of blocks; the state is a derived, current snapshot computable by replaying that history, a distinction directly analogous to (though computed differently than) how a Bitcoin node's current UTXO set is derived from, but not identical to, the full historical transaction record.

**Ethereum state is not global in the sense of being instantly, synchronously the same everywhere at all times**, like Bitcoin's chain tip, different nodes can briefly hold different views during normal network propagation delay or a temporary fork, converging as the network's consensus mechanism (see [Proof of Stake](./proof-of-stake.md)) resolves which chain and therefore which state is canonical.

## Further reading

- [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf): Section 4 (The World State)

---

[← Previous: Ethereum Blocks](./blocks.md)
·
[Back to Ethereum](./README.md)
·
[Next: State Trie →](./state-trie.md)
