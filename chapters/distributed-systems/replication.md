# Replication

Every full Bitcoin node stores a complete copy of the entire blockchain, hundreds of gigabytes of data, duplicated across tens of thousands of independent machines worldwide, with no coordination beyond the protocol rules every node follows independently. This chapter covers why this radical amount of duplication is the point, not an inefficiency, and how it differs from replication as practiced in conventional distributed databases.

## The problem

Conventional distributed systems (a database backing a large website, for instance) use replication for **availability** and **durability**: if one server fails, another copy of the data is available, and the system stays up. This is a well-studied engineering problem with well-known tradeoffs (discussed in [CAP Theorem](./cap.md)), and it generally assumes the replicas are all controlled by the same organization and are expected to cooperate honestly. The failures being defended against are crashes, hardware failure, and network partitions, not replicas actively lying to each other.

Bitcoin's replication problem is different and harder: the network has to tolerate not just honest failures but **actively adversarial participants**. Nodes and miners who might deliberately try to present false data, double-spend, or rewrite history for their own benefit. This distinction (tolerating honest-but-unreliable failures versus tolerating actively malicious behavior) is the dividing line between classical distributed systems fault tolerance and the [Byzantine fault tolerance](./byzantine-faults.md) Bitcoin actually needs, covered in the next two chapters.

## How it works

Every full node independently downloads and validates the entire blockchain from its peers (checking every block's proof-of-work, every transaction's signatures, and every rule the protocol specifies (see [Consensus Rules](../blockchain/consensus-rules.md))) rather than trusting any peer's word that a block is valid. This means Bitcoin's replication is not "copy the data and trust the source" the way replicating a database typically works; it's "copy the data and *independently re-verify every single fact about it*." A node that receives an invalid block from a peer (one with a bad signature, a double-spend, or a broken proof-of-work) simply rejects it, regardless of how many other nodes might have already accepted it or how much hash power produced it.

This is what gives Bitcoin's replication its specific security property: **a user does not need to trust any of their peers**, only the protocol rules and their own node's independent verification of them. A single, permissionless full node run by one individual with no special access or relationship to anyone else can, and by design does, fully verify the entire history of the network from the genesis block forward, checking every rule for every block, without asking anyone to vouch for anything.

## Example: the cost of full replication

As of any recent measurement, the full Bitcoin blockchain (including all historical blocks since 2009) occupies several hundred gigabytes and grows continuously as new blocks are added roughly every ten minutes. Running a full node means downloading and storing this entire dataset (or using [pruning](../bitcoin/README.md), which discards old block data after validating it, keeping only the current UTXO set, see the Bitcoin section for details) and re-executing every historical validation step during initial sync, a process that can take many hours to days on ordinary consumer hardware, depending on internet connection speed and disk performance. This is a real, ongoing cost every full node operator bears voluntarily, in exchange for not needing to trust anyone else's claims about the blockchain's contents.

```text
Traditional replicated database:              Bitcoin's replication model:

  Primary ──► Replica A                         Node A ◄──► Node B ◄──► Node C
     │        (trusts primary,                     ▲           ▲           ▲
     └──────► Replica B                            │           │           │
              copies data as-is)              each independently
                                               re-validates every
                                               block and transaction
                                               against protocol rules
```

## Under the hood: why this scales despite the cost

Bitcoin's replication model deliberately trades storage and bandwidth efficiency (the same data, duplicated tens of thousands of times, is objectively wasteful by conventional database-engineering standards) for a property no efficiently-replicated centralized system can offer: **no single node, or even a large group of nodes, can unilaterally alter what any other node accepts as valid**, because every node checks the rules for itself. A node run by a lone individual with a consumer laptop has exactly the same power to reject an invalid block as a node run by the largest mining pool or exchange. This is a direct, structural consequence of full replication combined with independent verification, and it is the basis for the claim, covered further in [Full Nodes](../bitcoin/full-nodes.md), that running your own node is the only way to fully avoid trusting someone else's version of the truth.

## Tradeoffs

Full replication with independent verification gives every participant the ability to check the entire history themselves, at the cost of requiring every participant who wants that guarantee to store and process the entire dataset. A burden that grows over time as the blockchain grows, and that has real, practical implications for who can realistically run a full node (a topic connected to [decentralization](../governance/README.md) debates covered in Governance). Systems that relax full replication ([light clients](../bitcoin/light-clients.md), which store only block headers, or centralized services like exchanges and block explorers) trade away some of this independent-verification guarantee for significantly lower resource requirements, a real and consequential tradeoff rather than a strictly inferior choice for every use case.

## Common misconceptions

**Running a full node is not the same as mining.** A full node validates and relays blocks and transactions and enforces consensus rules; mining is the separate process of competing to create new blocks (see [Mining](../bitcoin/mining.md)). Most full nodes do not mine.

**More copies of the data existing does not, by itself, provide Bitcoin's security guarantees.** A thousand copies of a database controlled by the same dishonest operator provides no more integrity than one copy, what matters is that each copy is independently verified against fixed rules by parties with no need to trust each other, not merely that many copies exist.

## Further reading

- [Bitcoin Core developer reference: Full nodes](https://developer.bitcoin.org/devguide/p2p_network.html)
- [Bitcoin whitepaper, Section 5](https://bitcoin.org/bitcoin.pdf)

---

[← Previous: Peer-to-Peer Networks](./p2p.md)
·
[Back to Distributed Systems](./README.md)
·
[Next: Consensus →](./consensus.md)
