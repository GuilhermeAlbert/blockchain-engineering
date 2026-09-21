# Errors and Reverts

When something goes wrong, a Solidity function doesn't return an error value the way many languages do. It **reverts**, unwinding every state change the current call made, as if it had never executed at all (except for the gas already consumed, per [Gas](../ethereum/gas.md#what-happens-when-a-transaction-runs-out-of-gas)). This chapter covers the three ways to trigger a revert, and why modern Solidity has shifted toward the newest of the three.

## Three mechanisms, one underlying behavior

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ErrorDemo {
    error InsufficientBalance(uint256 available, uint256 requested);

    mapping(address => uint256) public balances;

    function withdrawWithRequire(uint256 amount) external {
        require(balances[msg.sender] >= amount, "insufficient balance");
        balances[msg.sender] -= amount;
    }

    function withdrawWithCustomError(uint256 amount) external {
        if (balances[msg.sender] < amount) {
            revert InsufficientBalance(balances[msg.sender], amount);
        }
        balances[msg.sender] -= amount;
    }

    function withdrawWithAssert(uint256 amount) external {
        balances[msg.sender] -= amount;
        assert(balances[msg.sender] >= 0); // trivially true for uint256, illustrative only
    }
}
```

Verified: this compiles cleanly with solc 0.8.26.

- **`require(condition, "message")`**: the traditional, most common form: reverts with a string message if the condition is false. Simple and widely understood, but the string is stored and returned in full on every revert, which costs real, avoidable gas and bytecode size.
- **Custom errors** (`error InsufficientBalance(...)`, introduced in Solidity 0.8.4). Defined like a lightweight event, `revert`ed with specific typed arguments. Encoded far more compactly than a string (just a 4-byte selector, computed the same way as a function selector, see [Contract ABI](./abi.md#function-selectors), plus ABI-encoded arguments), making custom errors meaningfully cheaper in both deployment bytecode size and runtime gas than an equivalent `require` with a descriptive string, which is why modern Solidity style guides and most actively maintained codebases have shifted toward custom errors as the default choice.
- **`assert(condition)`**: intended specifically for conditions that should be **mathematically impossible** to violate if the contract's logic is correct, an `assert` failure signals an internal bug, not a normal, expected user-facing error condition (which `require` or a custom error should handle instead). Historically, `assert` failures consumed *all* remaining gas rather than refunding unused gas; this was changed in Solidity 0.8.0 to behave like other reverts, refunding unused gas, but the *semantic* convention (use `assert` only for "this should never happen" invariants) remains the recommended practice regardless.

## Why reverting undoes everything, precisely

A revert doesn't selectively undo "the bad part". It undoes **every** state change made since the current call frame began, including changes made by any nested calls to other contracts that this call frame itself triggered (unless those nested calls' effects were already finalized in a separate, earlier top-level transaction). This all-or-nothing guarantee is what makes reasoning about a function's correctness tractable: if a function reverts partway through, a developer never has to worry about a half-completed, inconsistent state being left behind on-chain.

## Common misconceptions

**A `require` or custom-error revert does not consume all the gas sent with the transaction**, since Solidity 0.8.0, only the gas actually used up to the point of the revert is charged; the remainder (up to the original gas limit) is refunded, the same behavior described generally in [Gas](../ethereum/gas.md#what-happens-when-a-transaction-runs-out-of-gas) for an "out of gas" halt, extended to cover explicit reverts as well.

**Custom errors are not just a stylistic preference**. The gas and bytecode-size savings are real and measurable, particularly for contracts with many distinct failure conditions, which is why this book's own later Solidity examples (in [Tokens](../tokens/README.md) and [DeFi](../defi/README.md)) default to custom errors rather than `require` strings wherever practical.

## Further reading

- [Solidity documentation: Errors and the Revert Statement](https://docs.soliditylang.org/en/latest/control-structures.html#errors-and-the-revert-statement)

---

[← Previous: Modifiers](./modifiers.md)
·
[Back to Smart Contracts](./README.md)
·
[Next: Payable Functions →](./payable.md)
