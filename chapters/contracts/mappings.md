# Mappings

A `mapping` is Solidity's key-value storage type, the mechanism behind essentially every token balance, allowance, and ownership record in the entire Ethereum ecosystem. This chapter covers exactly how it's stored, since a mapping's behavior differs from a conventional hash map in ways that matter for both gas costs and correctness.

## Declaration and basic use

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract BalanceTracker {
    mapping(address => uint256) public balances;

    function credit(address account, uint256 amount) external {
        balances[account] += amount;
    }
}
```

Verified: this compiles cleanly. Note `public` on a mapping generates a getter taking the key as a parameter (`balances(address)` in the ABI, not a bare `balances` value) since a mapping has no single "current value" to return without specifying which key.

## Every possible key already has a value: zero

This is the single most important, and most frequently misunderstood, property of Solidity mappings: **there is no way to check whether a key was ever explicitly set.** Every possible key (all 2^160 possible addresses, for an `address => uint256` mapping) is considered to already map to the type's default value (`0` for `uint256`) from the moment the mapping is declared. A mapping doesn't grow or get initialized per-key the way a JavaScript object or Python dictionary does. Reading `balances[someRandomAddressThatNeverInteractedWithThisContract]` returns `0`, indistinguishable from `balances[anAddressThatWasExplicitlySetToZero]`.

## How this is actually stored: keccak256-derived slots

Recall from [Storage Layout for Complex Types](../evm/storage.md#storage-layout-for-complex-types): a mapping's value for key `k`, declared at storage slot `p`, lives at `keccak256(abi.encode(k, p))`. This is why mappings can have an effectively unlimited number of "entries" without needing to pre-allocate anything. Each key's slot is computed independently via hashing, not by growing a contiguous data structure, and slots for different keys essentially never collide (with the same negligible-probability collision resistance guarantee covered in [Hash Collisions](../cryptography/collisions.md)).

## What mappings cannot do

Because there's no way to enumerate "every key that was ever set" (the mapping has no length, no iteration, and no way to list its keys. This is a direct, deliberate consequence of the keccak256-derived slot scheme, which provides no ordering or enumeration structure at all), any contract logic that needs to iterate over "all accounts with a balance," for instance, has to maintain a **separate array** tracking which keys have been used, alongside the mapping itself, a common, necessary pattern for anything needing enumeration, not something mappings provide natively.

## Nested mappings

```solidity
// A common ERC-20 allowance pattern: how much `spender` may spend on behalf of `owner`.
mapping(address => mapping(address => uint256)) public allowances;
```

Verified: this compiles, and the ABI-generated getter takes two parameters (`allowances(address,address)`), reflecting the two nested keys needed to reach a specific value.

## Common misconceptions

**A mapping does not track how many keys have been assigned a non-default value**, and has no built-in way to answer "does this key exist" separately from "what value does this key currently have". Any such tracking must be built explicitly, often via a companion `mapping(address => bool)` or similar existence flag.

**Deleting a mapping entry (via `delete balances[account]`) does not remove anything from an enumerable structure**. It simply resets that specific key's value back to the type's default (zero, for numeric types), exactly as if it had never been set, consistent with the "every key already has a default value" property above.

## Further reading

- [Solidity documentation: Mapping Types](https://docs.soliditylang.org/en/latest/types.html#mapping-types)

---

[← Previous: State Variables](./state.md)
·
[Back to Smart Contracts](./README.md)
·
[Next: Events and Logs →](./events.md)
