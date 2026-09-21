# The Mempool

The mempool ("memory pool") is the set of valid, unconfirmed transactions a node currently knows about and is prepared to relay or include in a block. This chapter covers what it actually is, why it's local to each node rather than a single global list, and the specific mechanics of fee-based prioritization and replacement.

## What it is, precisely

When a node receives a new transaction, it checks the transaction against consensus rules and its own local policy rules (see [Consensus Rules](../blockchain/consensus-rules.md)). Is it correctly signed, do its inputs reference real unspent outputs, does it meet this node's minimum relay fee. If it passes, the node adds it to its mempool: an in-memory (not persisted to the blockchain, hence the name) collection of transactions awaiting inclusion in a future block. A miner assembling a new block typically selects transactions from its own mempool, generally prioritizing higher fee-rate transactions first, up to the block's weight limit.

## Why the mempool is not one global, shared list

This is a common and consequential misunderstanding: **there is no single, authoritative mempool.** Every node maintains its own, based on which transactions it has seen and which policy rules it applies. Two nodes can, and often briefly do, have somewhat different mempool contents, especially in the seconds immediately after a new transaction is broadcast, before it has fully propagated across the network (see [Peer-to-Peer Networks](../distributed-systems/p2p.md)). Block explorers and fee-estimation services that show "the mempool" are showing *their own node's* view, which is generally representative of the broader network's state but not a formally synchronized, single source of truth.

## Mempool eviction and limits

Because mempool space (RAM) is finite, nodes apply eviction policies when the mempool grows too large, typically dropping the lowest fee-rate transactions first to make room for new, higher-paying ones. A transaction that's been sitting unconfirmed for an extended period (Bitcoin Core's default is 14 days) is also typically dropped from the mempool entirely if it hasn't been confirmed by then, though this is a local node policy, not a consensus rule. The transaction remains theoretically valid and could still be confirmed if rebroadcast and picked up by a miner.

## Replace-By-Fee

Introduced in [Transaction Fees](./fees.md#replace-by-fee-rbf), **Replace-By-Fee (RBF)**, standardized in BIP 125, lets a sender replace an unconfirmed transaction with a new version spending the same inputs but paying a higher fee. Useful when a transaction was broadcast with too low a fee to be confirmed in a reasonable time. For RBF to apply, the original transaction must explicitly signal it (via a sequence number below `0xfffffffe`), and the replacement must meet specific rules (paying a strictly higher absolute fee and fee rate, among others in BIP 125) designed to prevent RBF from being trivially abused to spam the network with competing fee bids at no real cost.

## Full Replace-By-Fee versus opt-in

Bitcoin Core historically supported only **opt-in RBF**. A transaction had to explicitly signal it was replaceable, and nodes/miners were not required to relay or accept a replacement for a transaction that hadn't opted in. Some Bitcoin Core releases have moved toward treating replacement more permissively by default, a policy change that generated genuine debate within the Bitcoin development community about tradeoffs between usability (letting senders correct underpriced fees) and merchant risk assumptions (some merchants previously relied on non-signaling transactions being harder to replace as a weak, zero-confirmation acceptance heuristic, see [Transaction Confirmation](./confirmation.md#zero-confirmation-risk)). TODO: verify the specific current default RBF policy in the latest Bitcoin Core release before stating it definitively, since this has been an area of active, evolving policy discussion.

## Common misconceptions

**A transaction "stuck" in the mempool is not lost or failed**. It remains a valid, pending transaction that can eventually confirm (if fees fall or network demand drops), be replaced via RBF, or eventually be dropped from individual nodes' mempools after their local expiration period, at which point it may need to be rebroadcast to be seen again.

**Mempool size and contents are not something any single party controls or can manipulate globally**. Each node forms its own view based on what it observes and its own policy configuration, consistent with the general peer-to-peer, no-central-authority design covered in [Peer-to-Peer Networks](../distributed-systems/p2p.md).

## Further reading

- [BIP 125: Opt-in Full Replace-by-Fee Signaling](https://github.com/bitcoin/bips/blob/master/bip-0125.mediawiki)
- [Bitcoin Core developer reference: Transactions](https://developer.bitcoin.org/reference/transactions.html)

---

[← Previous: Transaction Fees](./fees.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Transaction Confirmation →](./confirmation.md)
