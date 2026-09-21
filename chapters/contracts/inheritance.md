# Inheritance

Solidity contracts can inherit from other contracts, sharing state variables, functions, and modifiers, the standard way to reuse and compose contract logic, particularly for well-audited, standard components like OpenZeppelin's contract library. This chapter covers the mechanics and the specific rule Solidity uses to resolve multiple inheritance.

## Basic inheritance

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Ownable {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not the owner");
        _;
    }
}

contract Vault is Ownable {
    uint256 public balance;

    function withdraw(uint256 amount) external onlyOwner {
        balance -= amount;
    }
}
```

Verified: this compiles cleanly with solc 0.8.26. `Vault` inherits `Ownable`'s `owner` state variable, its constructor logic, and its `onlyOwner` modifier, usable directly in `Vault` without redeclaring any of it.

## virtual and override

A base contract's function must be explicitly marked `virtual` to allow a derived contract to replace it, and the derived contract's replacement must be explicitly marked `override`, both keywords required, a deliberate design choice preventing accidental overriding (a base contract author has to opt in to allowing a function to be changed by inheritors, and an inheriting contract author has to explicitly acknowledge they're intentionally replacing existing behavior, not accidentally shadowing it with a same-named function).

```solidity
contract Base {
    function greet() public virtual returns (string memory) {
        return "Hello from Base";
    }
}

contract Derived is Base {
    function greet() public override returns (string memory) {
        return "Hello from Derived";
    }
}
```

## Multiple inheritance and the C3 linearization rule

Solidity supports inheriting from multiple contracts simultaneously, and resolves the resulting ambiguity (what if two parent contracts define the same function?) using **C3 linearization** (the same algorithm Python uses for its own multiple inheritance) which computes a single, well-defined, linear order of all ancestor contracts, ensuring every contract in the hierarchy appears only once, in an order consistent with each individual inheritance chain's own declared order. Contracts must be listed in the `is` clause from "most base-like" to "most derived" for this to resolve correctly; violating this ordering produces a compile-time error rather than silently picking an unintended resolution.

## super

Within an overriding function, calling `super.functionName()` invokes the *next* contract in the linearized inheritance order's version of that function, not necessarily the immediate parent contract's version, particularly in a multiple-inheritance hierarchy, where "next in the linearized order" can differ from "the contract's own direct parent" depending on the full inheritance graph.

## Common misconceptions

**Inheriting from a contract does not create a separate, independently deployed instance of that parent contract**. The parent's code is compiled directly into the child's own bytecode (assuming no separate library linking is involved, see [Libraries](./libraries.md)); there's only ever one deployed contract, `Vault` in the example above, containing all the inherited logic combined.

**Multiple inheritance ambiguity is not silently resolved by "whichever parent is listed first"** in every case. Solidity's C3 linearization can, particularly in more complex hierarchies (sometimes called "diamond" inheritance patterns), produce an ordering that isn't immediately obvious from a quick reading of the `is` clause alone, which is exactly why the compiler enforces a specific, checkable ordering rule rather than leaving it to convention.

## Further reading

- [Solidity documentation: Inheritance](https://docs.soliditylang.org/en/latest/contracts.html#inheritance)
- [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts): the most widely used library of audited, inheritable contract components

---

[← Previous: Payable Functions](./payable.md)
·
[Back to Smart Contracts](./README.md)
·
[Next: Libraries →](./libraries.md)
