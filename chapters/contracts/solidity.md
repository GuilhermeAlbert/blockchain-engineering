# Solidity

Solidity is the language most Ethereum smart contracts are written in, a statically-typed, contract-oriented language that compiles down to exactly the EVM bytecode examined directly in [Bytecode](../evm/bytecode.md). This chapter is a practical orientation to the language's shape, verified against a real compiler, before the rest of this section goes feature by feature.

## A complete, minimal contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {
    uint256 public count;

    function increment() external {
        count += 1;
    }
}
```

This compiles cleanly and demonstrates several conventions worth naming immediately: the `SPDX-License-Identifier` comment (a machine-readable license declaration Solidity's compiler checks for and warns about if missing, following the same [SPDX](https://spdx.dev/) standard used across much of the open-source software ecosystem), the `pragma` line pinning a minimum compatible compiler version, and `public` on the `count` variable, a modifier covered in [State Variables](./state.md) that automatically generates a public getter function, which is why `count` appears in the compiled ABI as a callable function even though it's declared as a plain state variable.

## Why a new language, rather than reusing an existing one

Solidity was designed specifically for the EVM's execution model, its type system, its handling of fixed-size integers (`uint256`, matching the EVM's native 256-bit word exactly, see [Opcodes](../evm/opcodes.md#every-arithmetic-operation-works-on-256-bit-words)), and language-level constructs for concepts with no equivalent in general-purpose languages (external calls with configurable gas and value, explicit `payable` functions, built-in `revert`/`require` semantics tied directly to EVM gas refund behavior) all reflect the EVM's specific execution and cost model rather than being a general-purpose language later adapted to it.

## Solidity is not the only option

Vyper (Python-inspired, deliberately more restrictive than Solidity, aiming for greater auditability through simplicity) and Fe (a newer, Rust-inspired language) both also compile to EVM bytecode. Solidity remains, by a wide margin, the dominant choice for real, deployed contracts as of this writing. This book uses it throughout for that reason, not because it's the only technically valid option.

## Toolchains: Foundry

This book's Solidity examples are written for [Foundry](https://getfoundry.sh/), a Rust-based toolchain (`forge` for building and testing, `cast` for command-line chain interaction, `anvil` for a local test node) that has become a widely adopted standard for professional Solidity development, alongside the longer-established Hardhat (JavaScript/TypeScript-based). Foundry's tests are written in Solidity itself, which keeps this book's testing examples (see [Testing](./testing.md)) in the same language as the contracts they test, rather than requiring a second language purely for the test suite.

## Common misconceptions

**Solidity source code is not what gets deployed or executed on-chain**. Only the compiled bytecode is; the source (along with the compiler version and settings used) is what's needed to independently *verify* that a given deployed bytecode actually corresponds to specific, human-readable source code, a service block explorers like Etherscan provide by recompiling submitted source and checking the output matches.

**A `.sol` file compiling without errors does not mean the contract is safe or bug-free**. The compiler checks syntax, types, and a limited set of statically-detectable issues; it makes no claim about logical correctness, economic soundness, or security against the attack classes covered in [Security](../security/README.md).

## Further reading

- [Solidity documentation](https://docs.soliditylang.org/)
- [Foundry Book](https://book.getfoundry.sh/)

---

[← Previous: Gas Accounting](../evm/gas-accounting.md)
·
[Back to Smart Contracts](./README.md)
·
[Next: Contract ABI →](./abi.md)
