# Genesis Blocks

Every blockchain needs a starting point with no predecessor. This chapter covers the general structural requirement and how it's handled as a data-structure problem; Bitcoin's specific, historically significant genesis block — its exact contents, embedded message, and what's known about its creation — is covered in depth in [The Genesis Block](../origins/genesis-block.md).

## The structural problem

[Hashes and Block Linking](./block-linking.md) establishes that every block references the hash of the block before it. This creates an obvious question for the very first block in any chain: what does it reference, given there's nothing before it? Every blockchain protocol has to define, and hardcode, a specific answer.

## The general solution

The first block in a chain — conventionally called the **genesis block**, at height (or block number) 0 — is defined directly in the protocol's software rather than being discovered through the normal process of extending an existing chain. Its "previous block hash" field is conventionally set to a fixed placeholder value, typically all zeros, signaling explicitly that there is no predecessor. Every node's software includes this exact genesis block, hardcoded, and every node's very first validation step on startup is confirming its own computed hash of this block matches the expected, hardcoded value — establishing an unambiguous, shared, universally agreed starting point before any other validation can proceed.

```text
Genesis Block (height 0)
  previousHash: 0000...0000   (placeholder — no real predecessor)
  hash: <computed from this block's own contents>
        │
        ▼
Block 1 (height 1)
  previousHash: <genesis block's hash>
        │
        ▼
Block 2 (height 2)
  previousHash: <Block 1's hash>
        │
       ...
```

## Why this is a necessary, deliberate exception to trustlessness

Every other block in the chain is validated through the ordinary process: check its proof-of-work, check its transactions, check it correctly references its predecessor. The genesis block cannot be validated this way, because there's no predecessor to check against and, in most designs, no proof-of-work requirement is even meaningfully enforceable for it (there's nothing to compare its difficulty against). This means trusting the genesis block is trusting the software distribution itself — a small, specific, and unavoidable exception to the general principle that Bitcoin's design otherwise minimizes trust requirements. In practice this trust is well-anchored: the genesis block is public, unchanging, and identical across every legitimate copy of the software, so verifying it matches what the rest of the world uses is straightforward and requires no ongoing trust in any particular party.

## Different chains, different approaches

Not every blockchain's genesis block works identically. Bitcoin's genesis block contains one coinbase transaction with an embedded, human-readable message and an unspendable reward (see [The Genesis Block](../origins/genesis-block.md) for the specifics). Ethereum's genesis block instead defines an initial **state** — a starting allocation of ether balances to specific addresses (largely from the 2014 token sale that funded Ethereum's development), reflecting Ethereum's account-based model (see [Ethereum State](../ethereum/state.md)) rather than Bitcoin's UTXO model. A blockchain that later forks from an existing chain (see [Forks](../forks/README.md)) doesn't get a new genesis block at all — it inherits the entire history up to the fork point, including the original genesis block, and only diverges from that shared point forward.

## Common misconceptions

**A chain's genesis block is not necessarily block "number 1."** By near-universal convention, it's block (or height) 0 — an important detail when writing code that indexes into block height, since an off-by-one error here is a common and easy mistake.

**Genesis blocks across different blockchains are not interchangeable or comparable in any functional sense** — each defines the specific starting conditions (initial supply, initial state, embedded data) for its own independent chain, and there's no protocol-level relationship between, say, Bitcoin's genesis block and Ethereum's.

## Further reading

- [The Genesis Block](../origins/genesis-block.md) — Bitcoin's specific genesis block in full historical and technical detail

---

[← Previous: Merkle Roots](./merkle-roots.md)
·
[Back to Blockchain Fundamentals](./README.md)
·
[Next: Block Height →](./block-height.md)
