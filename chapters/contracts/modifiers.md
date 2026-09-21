# Modifiers

A modifier is reusable code that wraps around a function's execution — most commonly used for access control and validation checks that would otherwise need to be repeated, identically, at the start of many functions. This chapter covers how they work mechanically, including the specific placeholder syntax that determines when the wrapped function actually runs.

## Declaration and use

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ModifierDemo {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not the owner");
        _;
    }

    function setOwner(address newOwner) external onlyOwner {
        owner = newOwner;
    }
}
```

Verified: this compiles cleanly with solc 0.8.26.

## The underscore: not a typo, a placeholder

The `_;` inside a modifier marks exactly where the wrapped function's own body executes — everything in the modifier *before* `_;` runs first, and (if present) anything *after* `_;` runs after the wrapped function's body completes. This means a modifier can run checks before a function (the common case, as in `onlyOwner` above, which reverts before `setOwner`'s body ever executes if the check fails), run cleanup logic after a function, or both, depending entirely on where `_;` is placed relative to the modifier's other code.

```solidity
modifier logExecution() {
    // runs BEFORE the function body
    _;
    // runs AFTER the function body completes
}
```

## Multiple modifiers, and their order

A function can have multiple modifiers, applied left to right — each modifier's pre-`_;` code runs in the order listed, then the function body itself runs (once all modifiers have reached their `_;`), then each modifier's post-`_;` code runs in *reverse* order, the same nesting behavior a stack of function calls would produce.

## Why modifiers matter for reducing a specific class of bug

Repeating an access-control check (`require(msg.sender == owner, ...)`) manually at the start of every sensitive function is exactly the kind of repetitive, easy-to-accidentally-omit code that has historically caused real, documented smart contract vulnerabilities — a single function where the developer forgot to add the check is a genuine access-control bypass (see [Access Control](../security/access-control.md)). A modifier, applied consistently as part of a function's declared signature, makes the check visually explicit right in the function's own definition and harder to simply forget, though it does not, by itself, prevent a developer from forgetting to *apply* the modifier to a function that needed it.

## Common misconceptions

**A modifier is not a separate, independently deployed piece of code** — it's compiled inline into every function that uses it, meaning each function using a given modifier effectively contains its own copy of that modifier's logic in the deployed bytecode, not a shared, externally-called routine.

**Forgetting to include `_;` in a modifier is a real, valid (if almost always unintended) way to write a modifier that never actually runs the wrapped function's body at all** — the Solidity compiler does not require `_;` to appear, or appear exactly once, which is occasionally a source of confusing, hard-to-spot bugs in modifiers with complex conditional logic around where `_;` is placed.

## Further reading

- [Solidity documentation: Function Modifiers](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers)

---

[← Previous: Events and Logs](./events.md)
·
[Back to Smart Contracts](./README.md)
·
[Next: Errors and Reverts →](./errors.md)
