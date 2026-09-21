# Full Nodes

A full node downloads and independently validates the entire Bitcoin blockchain, checking every rule for every block and transaction since the genesis block, rather than trusting anyone else's claim about what's valid. This chapter covers exactly what that means in practice and why "running your own full node" is the specific, concrete action behind the common but vague claim that Bitcoin lets you "not trust anyone."

## What "full validation" actually checks

A full node applies the complete set of [consensus rules](../blockchain/consensus-rules.md) to every block it processes, including: every transaction's signatures are cryptographically valid, every input references a real, previously created, currently unspent output (see [The UTXO Model](./utxo.md)), no transaction spends more than the sum of its inputs, every block's proof-of-work meets the current difficulty target, the block's Merkle root correctly summarizes its transactions, and the block correctly references its parent's hash. None of this is taken on faith from peers — a full node recomputes and checks every one of these facts itself, exactly as described generally in [Replication](../distributed-systems/replication.md).

## What running one actually requires

As of any recent measurement, the full blockchain occupies several hundred gigabytes of storage, and initial synchronization — downloading and validating the entire history from genesis — can take anywhere from several hours to a couple of days depending on hardware, internet speed, and whether pruning is used. **Pruning** lets a node discard old block data after validating it, retaining only the current UTXO set and (optionally) the block headers, dramatically reducing long-term storage requirements while still having performed full validation at sync time — the tradeoff being a pruned node can no longer serve full historical block data to other peers, or replay historical validation without re-downloading it.

## Why this matters: the specific guarantee it provides

Running a full node means that when your wallet (whether built into the same software, like Bitcoin Core's, or a separate wallet connected to it) tells you a payment has been received, that claim rests on your own node's independent validation — not on trusting an exchange's API, a block explorer's website, or a third-party wallet provider's server. This is the concrete, technical basis for the common Bitcoin community phrase "don't trust, verify": verification is something a full node does automatically and continuously, as a direct consequence of how it processes every block.

Full nodes also play a specific role in the [governance](../governance/README.md) of protocol changes: because a full node enforces the rules its own software implements, a coordinated set of node operators refusing to accept a proposed rule change (by simply not upgrading, or by actively rejecting blocks that violate the old rules) is a real check on what changes can succeed on the network — a dynamic explored fully in [Bitcoin Governance](../forks/governance.md) and the [UASF](../forks/uasf.md) case study.

## Tradeoffs

Running a full node requires real, ongoing resources — storage, bandwidth, and time for initial sync — that a [light client](./light-clients.md) avoids by trusting the honest majority instead of independently verifying everything itself. This is a genuine tradeoff, not a strictly superior choice in every context: an individual managing modest holdings, prioritizing maximum trust-minimization, reasonably chooses to run a full node; an application needing to check thousands of user balances instantly reasonably relies on third-party infrastructure instead (see [Infrastructure](../infrastructure/README.md)), accepting a different, more centralized trust model in exchange for practicality.

## Common misconceptions

**A full node does not need to be mining, or hold any bitcoin, to be useful.** Its value is independent verification and relaying — the majority of full nodes are not also mining.

**A full node's validation does not depend on how much hash power backs any given block.** A full node rejects an invalid block regardless of how much proof-of-work was spent producing it — proof-of-work determines which *valid* chain wins under the fork choice rule (see [Fork Choice](../blockchain/fork-choice.md)); it does not make an otherwise-invalid block acceptable.

## Further reading

- [Bitcoin Core: Running a Full Node](https://bitcoin.org/en/full-node)

---

[← Previous: The Bitcoin Network](./network.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Light Clients →](./light-clients.md)
