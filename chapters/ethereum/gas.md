# Gas

Gas is Ethereum's unit for metering computational work, every EVM operation costs a specific, fixed amount of gas, and a transaction must pay for every unit it consumes. This chapter covers why Ethereum needs this mechanism at all, a distinction Bitcoin's non-Turing-complete [Script](../bitcoin/script.md#the-design-a-stack-machine-deliberately-not-turing-complete) never had to solve.

## The problem gas solves

Recall from [Bitcoin Script](../bitcoin/script.md#the-design-a-stack-machine-deliberately-not-turing-complete) that Bitcoin's scripting language deliberately excludes loops specifically to guarantee every script's execution time is bounded and predictable in advance. Ethereum's [EVM](../evm/README.md) makes the opposite choice: it's **Turing-complete**, supporting arbitrary loops and general computation, which creates a real problem, an infinite or extremely long-running loop could otherwise let anyone force every node on the network to spend unbounded time and resources validating a single transaction, a denial-of-service vector with no natural limit. Gas is the mechanism that closes this gap: every operation costs gas, a transaction specifies a maximum gas it's willing to spend, and execution simply **halts** (reverting all state changes except the fee payment) the moment that limit is reached, no matter what the code was still trying to do.

## How gas costs are assigned

Every EVM opcode (see [Opcodes](../evm/opcodes.md)) has a fixed, protocol-defined gas cost, roughly calibrated to the real computational and storage burden that operation places on every node that has to process and store it, a simple arithmetic operation costs very little gas; writing new data to persistent storage costs considerably more, since every full node has to store that data indefinitely going forward, not just compute something transiently. This calibration is deliberately not "one gas unit equals one CPU cycle" in any precise physical sense. It's an economic approximation, periodically revisited and adjusted through the EIP process (see [EIPs](../governance/eips.md)) as real-world costs and attack patterns become better understood.

## Gas limit versus gas used versus gas price

Three related but distinct quantities, easy to conflate:

- **Gas limit**: the maximum gas a transaction's sender authorizes it to consume, a safety ceiling, set by the sender (typically via wallet software estimation), not a target.
- **Gas used**: the actual gas the transaction consumed during execution, always less than or equal to the gas limit; any unused gas (limit minus used) is refunded to the sender, they only pay for what was actually consumed.
- **Gas price** (or, since EIP-1559, the effective combination of base fee and tip, see [Gas Price and Fees](./fees.md)): how much the sender pays *per unit of gas*, converting the gas-denominated cost into an actual ether amount.

```text
Total fee paid = gas used × gas price (or effective gas price, post-EIP-1559)

NOT: gas limit × gas price — unused gas is refunded, not charged
```

## What happens when a transaction runs out of gas

If execution reaches the gas limit before completing, the EVM halts immediately with an "out of gas" error, and **every state change the transaction attempted is reverted**, as if the transaction had never executed at all, with one crucial exception: the gas actually consumed up to that point is still paid to the block's producer, and is not refunded. This is a deliberate design choice: the computational work of attempting (and failing) the transaction was still real work every node had to perform, and gas exists specifically to compensate for real work done, not only for successful outcomes.

## Common misconceptions

**Gas is not a separate cryptocurrency**. It's a unit of account for computational cost, always ultimately paid in ether (denominated at whatever gas price applies); there's no separate "gas token" to hold or trade.

**A transaction failing (running out of gas, or hitting a `revert`) is not free**, gas consumed up to the point of failure is still charged; only the *state changes* are undone, not the fee for the computation already performed. This is a real, sometimes costly mistake for developers who assume a failed transaction costs nothing.

## Further reading

- [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf): Appendix G (Fee Schedule)
- [ethereum.org: Gas](https://ethereum.org/en/developers/docs/gas/)

---

[← Previous: Ethereum Transactions](./transactions.md)
·
[Back to Ethereum](./README.md)
·
[Next: Gas Price and Fees →](./fees.md)
