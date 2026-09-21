# State Variables

State variables are a contract's persistent data, declared at the contract level (not inside a function), each one backed directly by [storage](../evm/storage.md), the only place data survives between separate calls. This chapter covers how they're declared, visibility's effect on them specifically, and the packing behavior that affects gas costs.

## Declaration and visibility

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract StateDemo {
    uint256 public totalSupply;      // generates an automatic public getter
    address private owner;            // no automatic getter; only readable internally
    bool internal paused;              // readable by this contract and inheriting contracts

    constructor() {
        owner = msg.sender;
        totalSupply = 1_000_000;
    }
}
```

Verified: this compiles cleanly with solc 0.8.26. Marking a state variable `public` does exactly one thing beyond ordinary declaration: it auto-generates a getter function with the same name, returning the variable's current value, visible directly in the compiled ABI, exactly the mechanism already demonstrated for `count` in [Solidity](./solidity.md#a-complete-minimal-contract).

## Storage packing

Recall from [Storage](../evm/storage.md#storage-layout-for-complex-types) that each storage slot holds 256 bits. Solidity automatically **packs** multiple smaller state variables into a single slot when they're declared consecutively and their combined size fits within 256 bits, a `uint128` followed by another `uint128` shares one slot; a `uint256` followed by a `uint128` does not, since the `uint256` alone already fills a full slot. This packing is a real, deliberate gas optimization: reading or writing a single packed slot costs the same as reading or writing one *unpacked* variable's slot, so packing multiple smaller variables together can meaningfully reduce the number of expensive `SSTORE`/`SLOAD` operations a function needs.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PackingDemo {
    // These two together occupy ONE storage slot (16 + 16 = 32 bytes):
    uint128 public a;
    uint128 public b;

    // This starts a NEW slot, since the previous slot is already full:
    uint256 public c;
}
```

## Constants and immutables

`constant` variables are baked directly into the contract's bytecode at compile time (never occupying a storage slot at all), and `immutable` variables are set once, in the constructor, and then also stored directly in the bytecode rather than in storage. Both are meaningfully cheaper to read than an ordinary state variable, precisely because reading them avoids an `SLOAD` entirely, substituting a cheap, fixed bytecode read instead.

```solidity
uint256 public constant MAX_SUPPLY = 21_000_000;  // fixed forever, known at compile time
address public immutable deployer;                  // fixed after construction, per-deployment

constructor() {
    deployer = msg.sender;
}
```

## Common misconceptions

**Declaration order is not arbitrary or purely stylistic when gas efficiency matters**, because packing depends on consecutive declaration and combined size, reordering state variables (grouping smaller types together) can reduce a contract's real, ongoing gas costs without changing any of its logic at all.

**`constant` and `immutable` are not interchangeable with `public` state variables that simply never get reassigned**. A `constant`/`immutable` variable's value is embedded directly in bytecode and costs no storage read at all, while an ordinary state variable that happens to never change after construction still occupies a full storage slot and still costs a real `SLOAD` every time it's read.

## Further reading

- [Solidity documentation: State Variables](https://docs.soliditylang.org/en/latest/structure-of-a-contract.html#state-variables)
- [Solidity documentation: Layout of State Variables in Storage](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html)

---

[← Previous: Functions](./functions.md)
·
[Back to Smart Contracts](./README.md)
·
[Next: Mappings →](./mappings.md)
