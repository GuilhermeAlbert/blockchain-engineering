# Mempool Infrastructure

A mempool is a node's local set of valid, unconfirmed transactions considered for relay or inclusion. There is no single global mempool. Nodes receive different transactions at different times and apply local policy before relaying them.

## Policy is not consensus

Consensus rules decide whether a transaction can appear in a valid block. Mempool policy decides whether one node stores and relays it before confirmation. Fee thresholds, replacement rules, ancestor and descendant limits, and transaction standardness can differ by software version and configuration.

A transaction rejected from one mempool may still reach a miner or validator through another peer or private channel. A transaction present locally may never confirm because its fee is too low, a conflicting transaction wins, or it expires from local storage.

## Pending data is unstable

Applications use mempool feeds for fee estimation, pending balances, trading, fraud monitoring, and user notifications. Every result needs the observation source and time. Absence means “not seen here,” not “does not exist.”

Ethereum builders and private transaction systems may see order flow unavailable to a public node. Bitcoin nodes may differ in replacement policy and package acceptance. Comparing several peers improves visibility but does not create completeness.

## Replacement and conflicts

Track transactions by hash and by the resource they compete to spend. Bitcoin conflicts consume the same UTXO. Ethereum transactions from one account compete at the same nonce. A replacement creates a new hash; an interface that watches only the original hash may report a transaction as stuck after its intent has already executed through another hash.

Pending state should not be mixed with confirmed accounting. Mark tentative records and reconcile them when a block arrives. If a transaction disappears, distinguish confirmed, replaced, dropped, and merely absent from the current provider when evidence permits it.

## Operating a feed

Persist observations only when the product needs history, and bound retention. Backpressure matters during fee spikes when arrival rate and replacement traffic rise. Protect public endpoints from leaking sensitive submission data or enabling unbounded subscription load.

## Further reading

- [Bitcoin Core mempool documentation and RPC](https://bitcoincore.org/en/doc/)
- [Ethereum transactions](https://ethereum.org/developers/docs/transactions/)
- See also: [The Bitcoin Mempool](../bitcoin/mempool.md), [Front Running](../security/front-running.md)

---

[← Previous: Block Explorers](./block-explorers.md)
·
[Back to Infrastructure](./README.md)
·
[Next: Blockchain Data Pipelines →](./data-pipelines.md)
