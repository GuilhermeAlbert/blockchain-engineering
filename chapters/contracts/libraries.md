# Libraries

A Solidity library is reusable code with a specific, important restriction — it cannot have its own state, cannot hold ether, and cannot be inherited from the way an ordinary contract is inherited. This chapter covers what libraries are actually for, and the `using for` syntax that makes them feel like built-in methods on a type.

## Declaration and the `using for` pattern

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

library MathLib {
    function average(uint256 a, uint256 b) internal pure returns (uint256) {
        return (a & b) + (a ^ b) / 2; // avoids overflow that (a + b) / 2 could hit
    }
}

contract LibraryDemo {
    using MathLib for uint256;

    function getAverage(uint256 x, uint256 y) external pure returns (uint256) {
        return x.average(y); // reads as a method call on x, but compiles to MathLib.average(x, y)
    }
}
```

Verified: this compiles cleanly with solc 0.8.26. The `using MathLib for uint256` declaration is what enables the `x.average(y)` call syntax — without it, the same function would need to be called as `MathLib.average(x, y)` directly, functionally identical but less readable for code that chains many such calls.

## Why libraries exist as a distinct concept from contracts

A library's core restriction — no state, no ether — exists because libraries are meant to be pure, stateless logic: a collection of functions operating entirely on the arguments passed to them, with no persistent data of their own to manage. This makes them safe to reuse across many different contracts without any risk of accidentally sharing or corrupting state between unrelated callers, a concern that would be much harder to reason about if libraries could hold their own storage the way ordinary contracts do.

## Internal libraries versus deployed libraries

Most modern Solidity libraries (like `MathLib` above, and most of OpenZeppelin's utility libraries) use only `internal` functions, which get compiled directly into whatever contract uses them — no separate deployment, no external call overhead, just inlined logic, exactly like inheritance's compile-time code inclusion covered in [Inheritance](./inheritance.md#common-misconceptions). A library can alternatively expose `external` or `public` functions, in which case it gets deployed as its own, separate on-chain contract, and calling contracts link to it via `DELEGATECALL` (see [Message Calls](../evm/message-calls.md#delegatecall-borrowed-code-your-own-context)) — sharing one deployed copy of the logic across many calling contracts, at the cost of the extra gas an external call involves, a tradeoff worth making specifically when a library is large enough that avoiding duplicating its bytecode into every single calling contract meaningfully reduces overall deployment costs.

## Common misconceptions

**A library is not simply "a contract that happens not to use state"** — the "no state, no ether" restriction is enforced by the compiler, not merely a convention a developer chooses to follow; attempting to declare a state variable that isn't a `constant` in a library, or attempting to give a library function a `payable` modifier, is a compile-time error.

**`using X for Y` does not modify type `Y` itself in any global sense** — it's a **file-scoped** (or contract-scoped, if declared inside a contract) syntactic convenience specific to wherever it's declared; the same `uint256` type elsewhere in the codebase, in a file or contract without that same `using` declaration, doesn't gain the `.average()` method call syntax.

## Further reading

- [Solidity documentation: Libraries](https://docs.soliditylang.org/en/latest/contracts.html#libraries)
- [OpenZeppelin Contracts: utility libraries](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/utils)

---

[← Previous: Inheritance](./inheritance.md)
·
[Back to Smart Contracts](./README.md)
·
[Next: Proxy Contracts →](./proxies.md)
