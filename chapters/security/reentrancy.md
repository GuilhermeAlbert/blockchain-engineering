# Reentrancy

Reentrancy occurs when a contract calls external code before it has finished updating its own accounting, and that external code calls back into the original contract while the first invocation is still active. The second call observes an intermediate state the developer did not intend anyone to use.

## Control flow leaves the contract

An external call is a transfer of control, not a passive payment. The recipient may execute a fallback function, token hook, or arbitrary contract logic. That code can call the sender again, call another function sharing the same state, or route through several contracts before returning.

Consider a withdrawal function that reads a balance, sends Ether, then sets the balance to zero. During the send, the recipient calls `withdraw` again. The stored balance still shows the old amount, so both invocations pass the same check. The bug is in the ordering of state and interaction.

The same pattern is not limited to Ether. ERC-777 hooks, NFT receiver callbacks, flash-loan callbacks, and calls into unknown integrations can all reenter. A guard on one function may still leave cross-function reentrancy if another public function reads or changes the same invariant.

## Checks, effects, interactions

The checks-effects-interactions pattern orders a function in three phases:

1. validate permissions, balances, deadlines, and other preconditions;
2. update internal state so the operation is already accounted for;
3. call external contracts.

If the recipient calls back during phase three, it sees the updated balance. A reentrancy guard adds a lock that rejects nested entry while the protected call is active. Pull-payment designs record a claim and let each recipient withdraw rather than sending funds during unrelated state changes.

These techniques solve different parts of the problem. A guard can prevent nested execution but does not repair incorrect accounting. Checks-effects-interactions protects an invariant only when every relevant state update occurs before the call. Pull payments isolate failures and reduce shared control flow, but the withdrawal function still needs sound accounting.

## Read-only reentrancy

A callback does not need to modify the original contract to cause harm. During an intermediate state, another protocol may read a view function and treat its result as a price, share value, or collateral amount. The original transaction later completes, but the dependent protocol has already acted on a value that was never meant to be externally observable.

This is a composability problem. An invariant that holds at transaction boundaries may be temporarily false between external calls. Developers must decide which intermediate states other contracts can observe and whether any external call occurs while reported values are inconsistent.

## Testing the invariant

Test with a receiver that calls back through every reachable path, not only the function named in the original incident. Include repeated entry, entry through a sibling function, callback after partial accounting, and integration hooks. Invariant tests should assert conservation rules across the whole call graph, such as total user claims never exceeding assets held.

## Further reading

- [Solidity security considerations: reentrancy](https://docs.soliditylang.org/en/latest/security-considerations.html#reentrancy)
- [OpenZeppelin ReentrancyGuard API](https://docs.openzeppelin.com/contracts/5.x/api/utils#ReentrancyGuard)
- See also: [Payable Functions](../contracts/payable.md), [Flash Loans](../defi/flash-loans.md)

---

[← Previous: Approval Attacks](./approval-attacks.md)
·
[Back to Security](./README.md)
·
[Next: Access Control →](./access-control.md)
