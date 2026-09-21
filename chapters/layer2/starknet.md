# StarkNet

StarkNet, built by StarkWare, launched its mainnet alpha in October 2021 and reached full mainnet in November 2021. This chapter closes out the section's rollup case studies with the one that departs furthest from EVM compatibility of any kind: StarkNet doesn't run EVM bytecode, doesn't run EVM-adjacent bytecode, and requires contracts to be written for an entirely different execution model from the ground up.

## Cairo: a purpose-built language for provable computation

StarkNet contracts are written in **Cairo**, a language StarkWare designed specifically to be efficient to prove correctness for, rather than adapted from an existing EVM-targeting language the way zkSync Era's compiler translates Solidity (see [zkSync](./zksync.md#not-evm-equivalent-evm-compatible)). This is the most fundamental compatibility difference among this section's case studies: porting an existing Ethereum contract to StarkNet generally means rewriting it in Cairo, not simply redeploying compiled bytecode or recompiling identical source code the way moving between EVM-equivalent chains typically allows.

## STARKs specifically, and what that trades away and gains

StarkNet's name reflects its specific proof system: **STARKs**, not SNARKs, the same general distinction already covered in [Zero-Knowledge Proofs](../cryptography/zero-knowledge.md#snarks-versus-starks-at-a-glance) and applied specifically to rollups in [ZK Rollups](./zk-rollups.md#snarks-versus-starks-in-this-context). This means StarkNet's validity proofs require no trusted setup ceremony at all, and are built on cryptographic assumptions generally considered more resistant to a future quantum-computing threat than the elliptic-curve pairing assumptions many SNARK systems rely on, at the cost of StarkNet's proofs being larger and generally more expensive to verify on L1 per batch than a comparable SNARK-based rollup's proofs would be.

## Native account abstraction, independently designed

Like zkSync, StarkNet builds account abstraction into its protocol natively rather than relying on Ethereum's ERC-4337 standard, and every StarkNet account, including what would be an ordinary EOA on Ethereum, is actually a smart contract with its own programmable validation logic from the start. This is a separately designed system from zkSync's own native account abstraction, not a shared standard between the two; StarkNet's and zkSync's account abstraction implementations, despite solving a similar underlying problem, are not interchangeable or portable between the two chains.

## Common misconceptions

**StarkNet is not simply "another EVM-compatible rollup with a different name."** Its execution model, language, and account architecture are independently designed, purpose-built systems, not an EVM adaptation; treating it as interchangeable with an EVM-equivalent or EVM-compatible chain for tooling or contract-porting purposes is a real, common source of wasted migration effort.

**Choosing STARKs over SNARKs is not a strictly better security choice.** STARKs avoid a trusted setup and offer stronger claimed quantum resistance, genuine, real advantages, but SNARK-based systems have historically offered smaller proof sizes and lower L1 verification costs; which tradeoff matters more depends on a specific application's priorities, not a universal ranking.

## Further reading

- [StarkNet documentation](https://docs.starknet.io/)
- [Cairo documentation](https://docs.cairo-lang.org/)
- See also: [zkSync](./zksync.md), [Zero-Knowledge Proofs](../cryptography/zero-knowledge.md)

---

[← Previous: zkSync](./zksync.md)
·
[Back to Layer 2](./README.md)
·
[Next: Private Key Theft →](../security/private-key-theft.md)
