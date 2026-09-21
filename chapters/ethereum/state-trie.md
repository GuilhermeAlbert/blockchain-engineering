# State Trie

Ethereum doesn't store its state as a simple list. It uses a specific data structure, the **Merkle Patricia Trie**, that combines the tamper-evidence and compact-proof properties of a [Merkle tree](../cryptography/merkle-trees.md) with the efficient key-based lookup of a **trie** (a tree structure organized by the individual characters or nibbles of a key, rather than by value comparison). This chapter covers why this specific combination, rather than a plain Merkle tree, was necessary.

## Why a plain Merkle tree isn't enough

A [Merkle tree](../cryptography/merkle-trees.md#how-it-works), as covered in Cryptography, is built from a fixed, ordered list of items. Exactly what Bitcoin needs for a block's transaction list, but not what Ethereum needs for its state. Ethereum's state is a **key-value mapping** (account addresses (keys) to account data (values)) that needs to support efficient insertion, update, and lookup **by key**, not just sequential hashing of a fixed list. A plain Merkle tree has no natural notion of "look up the value for this specific key". You'd need to already know an item's position in the list, which doesn't map onto "look up account 0xABC...'s current balance" at all.

## What a trie contributes: key-based structure

A trie (from "retrieval," historically pronounced to rhyme with "tree" by some and "try" by others) organizes data by the actual bytes of the key: each level of the tree corresponds to one part of the key (in Ethereum's implementation, one "nibble", 4 bits, half a byte, since keys are hashed addresses and hex-encoded), and looking up a value means walking down the tree following the key's own bytes, one nibble at a time, until reaching the stored value. This gives efficient, deterministic key-based lookup: the path to any specific key's value is entirely determined by the key itself.

## What "Patricia" adds: compression

A naive trie following this simple one-nibble-per-level scheme would be extremely deep and wasteful for keys with long stretches where only one path exists (no branching) (most of a 64-nibble hashed address's path might have no other keys sharing that same prefix. **Patricia** ("Practical Algorithm to Retrieve Information Coded in Alphanumeric," the same acronym behind the "Patricia" name in networking data structures generally) compresses these single-child chains into a single edge labeled with the shared, un-branching sequence of nibbles, rather than one wasteful, mostly-empty node per nibble) a real, meaningful space and lookup-time efficiency improvement over the naive version.

## What "Merkle" adds: tamper-evidence and proofs

Every node in the trie, from the leaves up to the single **root**, is hashed, exactly the chaining principle from [Merkle Trees](../cryptography/merkle-trees.md#how-it-works), applied to a trie's branching structure instead of a simple linear list. This gives the state trie the identical core property a Merkle tree gives a transaction list: a single 32-byte root hash (the `stateRoot` field in [Ethereum Blocks](./blocks.md#why-a-state-root-specifically)) commits to the *entire* trie's contents, and a compact proof (a **Merkle Patricia proof**, following the same general logic as the [Merkle Proofs](../cryptography/merkle-proofs.md) already covered in Cryptography, adapted for the trie's branching path structure) can prove any specific key's value (or its absence) against that root, without needing the entire trie.

```text
stateRoot
    │
    ▼
 [Merkle Patricia Trie]
    │
    ├── path for address 0xAB... → account data (balance, nonce, storageRoot, codeHash)
    ├── path for address 0xCD... → account data
    └── ... every account in the current state, addressable by key
```

## Multiple tries, not one

Ethereum actually uses several separate Merkle Patricia Tries, not just one: the **state trie** (mapping addresses to account data, described above), a separate **storage trie** *per contract account* (mapping that specific contract's own storage keys to values. This is what an account's `storageRoot` field, from [Ethereum Accounts](./accounts.md#what-every-account-contains), actually points to), and the separate **transactions** and **receipts** tries per block. Each serves the identical underlying purpose (compact, tamper-evident, provable key-value or list commitment) applied to a different kind of data.

## Common misconceptions

**The state trie is not rebuilt from scratch for every new block.** Nodes maintain and incrementally update their local trie data structure as new blocks are processed, computing a new root reflecting only the changes a given block actually made, not recomputing the entire trie over every account from nothing each time.

**A Merkle Patricia proof does not require downloading the entire state trie**, exactly like the Merkle proofs covered in [Merkle Proofs](../cryptography/merkle-proofs.md#how-it-works), only the sibling hashes along the specific path to the key being proven are needed, growing logarithmically (roughly) with the trie's size, not linearly.

## Further reading

- [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf): Appendix D (Modified Merkle Patricia Trie)
- [ethereum.org: Merkle Patricia Trie](https://ethereum.org/en/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)

---

[← Previous: Ethereum State](./state.md)
·
[Back to Ethereum](./README.md)
·
[Next: JSON-RPC →](./json-rpc.md)
