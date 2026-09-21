# Functions

Solidity functions carry more required metadata than most general-purpose languages' functions do — visibility, mutability, and (optionally) payability — each compiling down to specific, real EVM-level guarantees, not just documentation. This chapter covers each, verified against a real compiler.

## Visibility

- **`external`** — callable only from outside the contract (via a message call, see [Message Calls](../evm/message-calls.md)), not from within the contract's own code directly (though it can still be called internally via `this.functionName()`, which routes through an actual external call).
- **`public`** — callable both externally and internally.
- **`internal`** — callable only from within the contract or contracts that inherit from it (see [Inheritance](./inheritance.md)), never from an external call.
- **`private`** — callable only from within the exact contract it's defined in, not even from inheriting contracts.

## View and pure functions

- **`view`** — the function reads contract state but doesn't modify it. Calling a `view` function via a transaction still costs gas (since the EVM has to actually execute it), but calling it via `eth_call` (see [Calling Contracts](../web3/calling-contracts.md)) — the normal way to query a `view` function — is free and instant, since no state-changing transaction needs to be broadcast or mined at all.
- **`pure`** — the function neither reads nor modifies state — its output depends only on its explicit input arguments.

Both `view` and `pure` are enforced, at least in part, by the EVM itself: a `view` or `pure` function called via [`STATICCALL`](../evm/message-calls.md#staticcall-call-with-a-read-only-guarantee) will revert if it attempts any state-modifying operation, giving the caller a real, protocol-level guarantee, not merely a compiler-checked promise that could be bypassed by a bug in the compiler's own static analysis.

## Payable functions

By default, a function that receives ether sent alongside its call **reverts automatically** — a deliberate safety default, since accidentally accepting ether a contract has no logic to handle correctly could permanently strand it. Marking a function **`payable`** explicitly opts into accepting ether, making `msg.value` (the amount sent) available within the function body.

## Example: all four concepts, compiled and verified

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract FunctionDemo {
    uint256 private storedValue;

    function setValue(uint256 newValue) external {
        storedValue = newValue;
    }

    function getValue() external view returns (uint256) {
        return storedValue;
    }

    function double(uint256 x) external pure returns (uint256) {
        return x * 2;
    }

    function deposit() external payable returns (uint256) {
        return msg.value;
    }
}
```

Verified: this contract compiles cleanly with solc 0.8.26, producing an ABI listing `setValue` as `nonpayable`, `getValue` as `view`, `double` as `pure`, and `deposit` as `payable` — exactly matching each function's declared mutability, confirming the compiler enforces and reports these distinctions consistently.

## Common misconceptions

**A `view` function is not free to call from within another contract's state-changing transaction** — the gas-free property specifically applies to calling it as a standalone `eth_call` query from outside any transaction; called as part of executing an actual transaction (even one that only reads, without writing), it still consumes real gas as part of that transaction's total execution.

**Marking a function `payable` does not mean it must receive ether** — it means it *may*; a `payable` function called with zero ether attached executes normally, with `msg.value` simply equal to zero.

## Further reading

- [Solidity documentation: Functions](https://docs.soliditylang.org/en/latest/contracts.html#functions)

---

[← Previous: Contract ABI](./abi.md)
·
[Back to Smart Contracts](./README.md)
·
[Next: State Variables →](./state.md)
