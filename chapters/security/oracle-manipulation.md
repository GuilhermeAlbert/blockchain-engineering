# Oracle Manipulation

An oracle turns information from outside a contract into state the contract can read. The contract cannot know whether that state represents a fair market price, a thin pool moved for one block, a stale update, a broken source, or a value posted by a compromised operator. It can only enforce the validation rules developers wrote around the feed.

## A price is a measurement procedure

“Use the ETH price” leaves important questions unanswered:

- Which market or set of markets?
- Is the value a spot price, median, or time-weighted average?
- How often can it update?
- How old may the last answer be?
- What happens when sources disagree?
- Which unit and decimal scale does it use?
- Can anyone move the source market cheaply relative to the value protected?

A spot price from one automated market maker is the pool's current reserve ratio. A trade can move it. If a lending protocol uses that ratio to value collateral in the same transaction, an attacker can trade against the pool, trigger the valuation, borrow or liquidate under the distorted price, then reverse the trade.

## Manipulation cost versus extractable value

The relevant comparison is not whether moving a market costs money. It is whether the attacker can recover that cost and extract more value from the dependent protocol. Atomic borrowing can supply temporary capital, and the attacker may unwind the manipulation before the transaction ends. Fees and price impact become attack costs inside a larger calculation.

Deeper liquidity raises manipulation cost. Time-weighted prices force an attacker to sustain distortion across observations, exposing capital to arbitrage and market movement. Multiple independent sources reduce dependence on one venue. None of these choices creates a universal safe oracle. The protected value, update frequency, chain conditions, and failure behavior determine whether the cost is sufficient.

## Freshness and liveness

A correctly signed answer can be stale. Contracts should inspect the feed's update timestamp and reject values older than a protocol-specific threshold. The threshold must reflect the market and application. A fast-moving collateral market and a slow settlement process need different limits.

Rejecting stale data preserves price integrity but may stop liquidations or withdrawals. Accepting the last value preserves liveness but may create bad debt. This tradeoff needs an explicit emergency state, not an accidental consequence of an unchecked timestamp.

## Validation at the consumer

Validate positive values, decimals, timestamps, round completeness where the interface exposes it, and reasonable deviation from another observation when a comparison exists. Treat feed addresses and configuration setters as high-impact access control. A secure feed routed through a mutable pointer is only as trustworthy as the account that can change the pointer.

Circuit breakers can cap how quickly a value changes or pause sensitive actions. They also create edge cases during genuine market gaps. A cap that lags reality may protect against manipulation while delaying necessary liquidations and increasing insolvency.

## Further reading

- [Chainlink Data Feeds documentation](https://docs.chain.link/data-feeds)
- [Uniswap v2 whitepaper](https://uniswap.org/whitepaper.pdf), including cumulative prices for time-weighted observations
- See also: [Oracles](../defi/oracles.md), [Liquidations](../defi/liquidations.md)

---

[← Previous: Integer and Precision Bugs](./precision.md)
·
[Back to Security](./README.md)
·
[Next: Flash Loan Attacks →](./flash-loan-attacks.md)
