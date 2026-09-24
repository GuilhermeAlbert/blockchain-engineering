# Flash Loan Attacks

A flash loan lends assets without collateral on the condition that principal and fee return before the transaction ends. If repayment fails, the whole transaction reverts. Flash liquidity can amplify an exploit, but it does not create the vulnerable price, accounting rule, governance process, or access check.

## Atomic repayment changes the lender's risk

The lender calls the borrower's callback after transferring funds. The borrower may trade, liquidate positions, refinance debt, or perform arbitrage across several protocols. Before returning, the lender checks repayment. Ethereum's atomic execution means an unpaid loan rolls back along with every intermediate action.

The lender avoids ordinary credit risk because no final state contains an unpaid loan. The borrower receives temporary purchasing power inside one transaction. That matters to protocols whose defenses assume an attacker cannot command enough capital to move a market or acquire a large position quickly.

## The root cause sits elsewhere

A common sequence is:

1. borrow a large amount atomically;
2. move a thin on-chain price or acquire temporary voting weight;
3. call a protocol that trusts that state;
4. extract assets under the distorted condition;
5. reverse enough trades to repay the loan;
6. keep the remainder.

Removing the flash loan may increase the attacker's funding cost but leaves the unsafe dependency. A wealthy attacker or coordinated group could execute the same logic with owned capital. The repair belongs in oracle design, accounting, governance snapshots, liquidity assumptions, or whichever rule converted temporary state into a valuable privilege.

## Why one transaction matters

Atomicity reduces market exposure. The attacker does not need to hold a manipulated position across blocks, wait for another participant, or risk being unable to unwind after the protocol action. Every leg succeeds together or none does. This lets an attacker evaluate the entire route before paying more than gas for a reverting attempt.

Protocols should assume any publicly callable operation can be composed with borrowed capital and other contracts in the same transaction. Checks based on an account's starting balance, a pool's instantaneous reserves, or tokens held at the moment of a vote may not represent durable economic commitment.

## Defenses target the assumption

Use manipulation-resistant oracles, adequate observation windows, and multiple sources for high-value pricing. Base governance power on snapshots taken before a proposal or voting period. Apply conservative collateral factors and borrowing caps to assets with shallow liquidity. Validate invariants after callbacks and across the complete transaction path.

Blocking calls from contracts is not a durable defense. Smart accounts, proxy calls, constructors, and evolving account models make “externally owned account only” restrictions brittle, while also excluding legitimate composability.

## Further reading

- [Aave flash loans documentation](https://aave.com/docs/developers/flash-loans)
- [EIP-3156: Flash loans](https://eips.ethereum.org/EIPS/eip-3156)
- See also: [Flash Loans](../defi/flash-loans.md), [Oracle Manipulation](./oracle-manipulation.md)

---

[← Previous: Oracle Manipulation](./oracle-manipulation.md)
·
[Back to Security](./README.md)
·
[Next: Front Running →](./front-running.md)
