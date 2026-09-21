# Payable Functions

[Functions](./functions.md#payable-functions) already introduced `payable` as the modifier that lets a function accept ether. This chapter goes deeper into what happens to that ether, the special `receive` and `fallback` functions that handle ether sent without calling any specific function, and a security-relevant detail worth knowing before writing any contract that holds funds.

## receive() and fallback()

A contract can define two special, unnamed functions specifically for handling calls that don't match any regular function:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PayableDemo {
    event Received(address sender, uint256 amount);

    // Called when ether is sent with empty calldata.
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    // Called when calldata is non-empty but doesn't match any function selector,
    // or when receive() doesn't exist and calldata is empty.
    fallback() external payable {
        emit Received(msg.sender, msg.value);
    }
}
```

Verified: this compiles cleanly with solc 0.8.26 (Solidity permits both to coexist, with `receive()` specifically handling the empty-calldata case and `fallback()` handling everything else, exactly as commented above).

## Why both exist, and the routing rule between them

This split exists because "ether sent with no data" (a plain transfer, the common case) and "a call to an unrecognized function selector" (which might indicate a mistake, or might be intentional — see the [Proxy Contracts](./proxies.md) pattern, which relies entirely on `fallback()` to forward unrecognized calls) are genuinely different situations a contract might want to handle differently. Solidity's exact routing rule: if calldata is empty and `receive()` exists, `receive()` runs; otherwise, if `fallback()` exists (and is marked `payable`, for a call carrying ether), `fallback()` runs; if neither exists and appropriate, the transaction reverts, refusing to accept the ether or the unrecognized call.

## The three ways to send ether, and why they differ

Solidity offers three low-level ways to send ether to another address, each with meaningfully different behavior worth knowing precisely:

- **`transfer(amount)`** — sends ether, forwarding a fixed **2,300 gas stipend** to the recipient's `receive`/`fallback` function, and automatically **reverts** the whole transaction if the send fails. The fixed, small gas stipend was originally intended as a security measure (too little gas for the recipient to do much beyond a minimal state update, limiting reentrancy risk — see [Reentrancy](../security/reentrancy.md)) but has become a source of real compatibility problems as gas costs for certain operations have changed over time, sometimes causing `transfer` to fail against otherwise-legitimate contracts that need more than 2,300 gas to process the receipt correctly.
- **`send(amount)`** — the older, low-level equivalent of `transfer`, but returns a `bool` indicating success rather than automatically reverting — meaning a developer using `send` must remember to explicitly check its return value, or a failed transfer can go silently unnoticed.
- **`call{value: amount}("")`** — the modern, generally recommended approach: forwards **all remaining gas** by default (avoiding the 2,300-gas compatibility problem `transfer` and `send` share) and returns a `bool` success indicator that must be explicitly checked, exactly like `send`.

## Common misconceptions

**Using `call` to send ether is not automatically less secure than `transfer`**, despite `transfer`'s gas-limiting behavior having originally been framed as a safety feature — current Solidity guidance generally recommends `call` specifically *combined with* the [checks-effects-interactions pattern](../security/reentrancy.md#the-fix-checks-effects-interactions) as the safer overall approach, rather than relying on an arbitrary, increasingly unreliable gas stipend to prevent reentrancy.

**A contract with no `receive()` or `payable fallback()` is not necessarily immune to ever holding ether** — while it will reject ordinary ether transfers, ether can still reach such a contract through other means (being the target of a `SELFDESTRUCT` from another contract, or being pre-funded before deployment via a `CREATE2` address, see [Contract Creation](../evm/contract-creation.md#common-misconceptions)), a detail that occasionally surprises developers who assumed "no payable function" meant "can never hold a balance."

## Further reading

- [Solidity documentation: Special Functions](https://docs.soliditylang.org/en/latest/contracts.html#special-functions)
- [Solidity documentation: Sending Ether](https://docs.soliditylang.org/en/latest/security-considerations.html#sending-and-receiving-ether)

---

[← Previous: Errors and Reverts](./errors.md)
·
[Back to Smart Contracts](./README.md)
·
[Next: Inheritance →](./inheritance.md)
