# Front Running

Public transaction propagation reveals pending intent before execution. A participant who sees a profitable transaction can submit another transaction designed to execute first. The ability to choose or influence ordering turns visibility into an attack surface.

## Ordering is part of execution

Two individually valid transactions can produce different outcomes depending on order. A decentralized exchange trade changes reserves and therefore the price seen by the next trade. A liquidation consumes an available position. A name registration, NFT mint, or arbitrage opportunity may go to the first successful caller.

Users submit bids for block space through fees. Validators or builders assemble blocks under protocol constraints, but those constraints do not require first-seen ordering. A transaction with a higher effective fee may be placed earlier. Private order flow changes who can observe the transaction before inclusion, not the fact that some party eventually decides its position.

## Sandwich attacks

In a sandwich, an attacker places one trade before a victim and another after it. The first trade moves the pool price against the victim. The victim's trade executes at a worse price within its slippage limit. The second attacker trade unwinds the position at the victim's expense.

The victim's slippage setting defines how much adverse movement the transaction will tolerate before reverting. An unnecessarily wide limit leaves more extractable room. A zero or extremely tight limit may fail under ordinary market movement. The correct bound depends on pool depth, trade size, volatility, gas cost, and the user's tolerance for failure.

## Other ordering attacks

A copy trader can reproduce a profitable public transaction with a higher fee. A liquidator can outbid another liquidator. An attacker can place a transaction after a known state change, sometimes called back running, without harming the original transaction. Attackers can also fill blocks or target a specific account with transactions that make its operation revert.

Not every reorder is theft. Arbitrage and liquidations can keep markets aligned and lending systems solvent. The engineering question is whether the protocol allocates an opportunity intentionally or leaks value because pending inputs reveal a result before anyone commits resources.

## Mitigations and their costs

Commit-reveal schemes separate commitment from disclosure across transactions, which adds latency and requires users to return. Batch auctions reduce advantages inside a batch but need a rule for batch construction and clearing. Encrypted or private submission hides intent from the public mempool but introduces trust in relays, builders, or threshold decryption. Frequent-batch or uniform-price designs change application economics rather than only transaction transport.

At the application level, enforce deadlines, minimum output or maximum input, nonces, and bounded price movement. These fields limit damage; they do not control block ordering.

## Further reading

- [Flashbots documentation](https://docs.flashbots.net/)
- [Ethereum.org transactions](https://ethereum.org/developers/docs/transactions/)
- See also: [Slippage](../defi/slippage.md), [The Mempool](../bitcoin/mempool.md)

---

[← Previous: Flash Loan Attacks](./flash-loan-attacks.md)
·
[Back to Security](./README.md)
·
[Next: MEV →](./mev.md)
