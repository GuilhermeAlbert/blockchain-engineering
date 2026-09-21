# Testing

Foundry tests are written in Solidity itself, the same language as the contracts under test, running against a real, embedded EVM rather than a mocked or simulated one. This chapter covers the standard test structure and the specific capabilities (cheatcodes) that make testing blockchain-specific behavior practical.

## A standard Foundry test

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";

contract Counter {
    uint256 public count;

    function increment() external {
        count += 1;
    }
}

contract CounterTest is Test {
    Counter public counter;

    function setUp() public {
        counter = new Counter();
    }

    function testIncrement() public {
        counter.increment();
        assertEq(counter.count(), 1);
    }

    function testIncrementTwice() public {
        counter.increment();
        counter.increment();
        assertEq(counter.count(), 2);
    }
}
```

Run with `forge test`, Foundry compiles the contract and its tests, deploys a fresh instance for each test function (via `setUp()`, re-run before every individual test to guarantee isolation between tests), and reports pass/fail with gas usage per test.

## Cheatcodes: testing what an ordinary contract can't control

Foundry provides special testing-only functions ("cheatcodes," accessed via the `vm` object inherited from `forge-std/Test.sol`) that let a test manipulate blockchain state and context in ways no real contract could do to itself, because tests specifically need to exercise scenarios (a specific caller, a specific block timestamp, an expected revert) that are otherwise outside a contract's own control:

- **`vm.prank(address)`**: makes the *next* call appear to come from a specified address, letting a test check access-control logic (like the `onlyOwner` modifier from [Modifiers](./modifiers.md)) by simulating calls from both authorized and unauthorized callers.
- **`vm.expectRevert()`**: asserts that the next call reverts, optionally checking for a specific error message or custom error (see [Errors and Reverts](./errors.md)), essential for testing that invalid inputs are correctly rejected, not just that valid ones succeed.
- **`vm.warp(timestamp)`**: sets the block timestamp for subsequent calls, letting a test exercise time-dependent logic (a timelock, a vesting schedule) without needing to wait real time.
- **`vm.deal(address, amount)`**: sets an address's ether balance directly, letting a test set up a specific starting balance without needing a real funding transaction.

## Why testing against a real EVM matters

Because Foundry tests run against `revm` (a real Rust-based EVM implementation, not a hand-rolled approximation), gas costs, opcode behavior, and revert semantics observed during testing match real network behavior far more closely than testing against a simplified mock would, the same principle behind this book's own EVM examples in [Bytecode](../evm/bytecode.md) and [Storage](../evm/storage.md), which run against a real EVM implementation rather than describing expected behavior in prose alone.

## Fuzz testing

Foundry automatically **fuzzes** any test function that takes parameters, rather than testing one hand-picked input, `function testIncrementBy(uint256 amount) public` gets run many times (256 by default) against randomly generated `amount` values, including deliberately chosen edge cases (zero, the maximum `uint256` value, values near type boundaries) that a developer might not think to test manually but that have historically been exactly where real, documented integer-handling bugs have hidden.

## Common misconceptions

**A test suite passing does not mean a contract is secure**. It means the specific scenarios the tests actually check behave as expected; it says nothing about scenarios the test author didn't think to write a test for, which is exactly the gap [Smart Contract Auditing](../security/auditing.md) and [Formal Verification](../security/formal-verification.md) exist to address through different, complementary methods.

**Fuzz testing is not the same thing as formal verification**, fuzzing tries many random and edge-case inputs and reports any that fail a given assertion, which is highly effective at finding real bugs but provides no mathematical guarantee that *no* input could ever fail; formal verification (a separate, more rigorous and more expensive technique) aims for exactly that stronger guarantee, for the specific properties it's applied to.

## Further reading

- [Foundry Book: Writing Tests](https://book.getfoundry.sh/forge/writing-tests)
- [Foundry Book: Cheatcodes Reference](https://book.getfoundry.sh/cheatcodes/)

---

[← Previous: Upgradeable Contracts](./upgrades.md)
·
[Back to Smart Contracts](./README.md)
·
[Next: Deployment →](./deployment.md)
