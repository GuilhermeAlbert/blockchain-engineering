# zkSync

zkSync Era, built by Matter Labs, launched to closed mainnet in October 2022 and opened to the public in March 2023. This chapter covers what makes zkSync's specific technical approach distinctive among ZK rollups: it doesn't aim for exact EVM bytecode equivalence, and it builds account abstraction directly into the protocol itself.

## Not EVM-equivalent, EVM-compatible

Recall [Validity Proofs](./validity-proofs.md#the-provers-job-turning-execution-into-a-provable-circuit): building a zkEVM that proves execution requires the execution logic to be expressible as a provable circuit. Rather than building a circuit that reproduces the exact EVM bytecode format opcode for opcode, zkSync Era uses its own custom virtual machine, and an LLVM-based compiler toolchain that translates Solidity, Vyper, and Yul source code directly into that custom VM's instruction format. This means a contract's high-level source code runs correctly on zkSync Era, but the exact compiled bytecode, and some byte-level EVM edge cases that depend on exact opcode behavior, can differ from what the identical source produces on Ethereum L1 or on an EVM-equivalent rollup, a meaningfully different compatibility tradeoff than the bytecode-level equivalence Arbitrum's Nitro stack specifically targets (see [Arbitrum](./arbitrum.md#launch-and-the-nitro-rewrite)).

## Native account abstraction

Ethereum L1 achieves account abstraction (letting an account have programmable validation logic instead of the fixed ECDSA-signature check every plain EOA uses) through ERC-4337, a standard built entirely on top of the existing EVM and account model without requiring any protocol-level change, precisely because Ethereum's base protocol itself doesn't natively support it. zkSync Era's custom VM builds this capability in directly at the protocol level instead: every account on zkSync Era can implement its own custom validation and fee-payment logic as a first-class, native feature, rather than requiring the additional infrastructure (bundlers, entry-point contracts) ERC-4337 needs to work on top of an unmodified EVM. This lets zkSync-native applications build custom account logic, gasless transactions paid for by a third party through a **paymaster**, for instance, more directly than an ERC-4337-based approach on an EVM-equivalent chain requires.

## The tradeoff this specific design represents

zkSync's approach illustrates a real, general tradeoff among ZK rollups: a custom VM purpose-built for efficient proving and native features like account abstraction can outperform and out-feature a strict EVM-equivalent design, at the cost of subtle compatibility differences that can matter for tooling, security auditing practices built around exact EVM behavior, and contracts that depend on precise, byte-level EVM semantics rather than just correct high-level Solidity behavior.

## Common misconceptions

**zkSync Era is not bytecode-identical to Ethereum's EVM**, even though ordinary Solidity contracts generally work correctly on it. "EVM-compatible" (correct high-level behavior for most contracts) and "EVM-equivalent" (identical bytecode-level execution) are meaningfully different claims, and zkSync Era is the former, not the latter, a distinction worth checking for any application relying on precise, low-level EVM behavior.

**Native account abstraction on zkSync is not the same standard as ERC-4337.** They solve a similar underlying problem (programmable account validation logic) through architecturally different mechanisms; a wallet or application built specifically for one doesn't automatically work with the other without adaptation.

## Further reading

- [zkSync documentation](https://docs.zksync.io/)
- [zkSync Era account abstraction documentation](https://docs.zksync.io/zksync-protocol/era-vm/account-abstraction)
- See also: [ZK Rollups](./zk-rollups.md), [Validity Proofs](./validity-proofs.md)

---

[← Previous: Base](./base.md)
·
[Back to Layer 2](./README.md)
·
[Next: StarkNet →](./starknet.md)
