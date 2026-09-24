# Running a Node

Running a node replaces trust in a remote API with responsibility for software, storage, networking, updates, and monitoring. The node verifies protocol rules itself, but applications can still misconfigure its interfaces or read data before it reaches the confirmation level they need.

## What the node verifies

A Bitcoin full node downloads blocks and transactions, checks proof of work and consensus rules, maintains the UTXO set, and follows the valid chain with the most accumulated work. An Ethereum node requires an execution client and a consensus client. The execution client validates transactions and state transitions; the consensus client follows proof-of-stake consensus and finality. They exchange payload and fork-choice information through the Engine API.

Using a light client changes the trust and resource model. It verifies consensus evidence while requesting bodies, state proofs, or other data from servers. Pruning changes retained history, not consensus verification of the current state. An archive configuration retains historical state needed for queries at old block heights.

## Resource planning

Storage grows and database workloads are bursty. Initial sync can stress disk input/output more than steady operation. Network bandwidth, memory, file descriptors, database compaction, and snapshot growth need headroom. Published minimum requirements are a starting point; traffic from an indexer or public RPC changes the load.

Backups do not replace chain synchronization. Back up configuration, keys, allowlists, monitoring rules, and any local data that cannot be reconstructed. Node chain data can usually be rebuilt from peers, though restoration time may be operationally unacceptable.

## RPC exposure

Node RPC interfaces can reveal account activity, consume expensive resources, submit transactions, unlock local signers in older configurations, or expose administrative methods. Bind private interfaces to trusted networks, authenticate access, allow only required namespaces, and separate public read traffic from administration. Never place an unauthenticated administrative RPC endpoint on the public internet.

Rate limits and request-size limits protect the node from one client exhausting capacity. Expensive log ranges, traces, and historical state calls need stricter policies than simple head queries.

## Operations and upgrades

Monitor peer count, sync distance, current and finalized heads, disk capacity, database errors, RPC latency, error rate, and agreement with an independent reference. A process can be alive while hundreds of blocks behind.

Client diversity reduces dependence on one implementation bug, but operating multiple clients requires separate expertise and update procedures. Read release notes for database migrations, consensus changes, deprecated flags, and security fixes. Test upgrades against a replica or snapshot, then verify head agreement and RPC behavior after restart.

## Failure and recovery

Document how long a resync takes, which data consumers can tolerate the gap, and how traffic moves to a fallback. A fallback node on the same host, disk, network, cloud account, and software version shares most failure modes. Independence must be designed.

## Further reading

- [Ethereum nodes and clients](https://ethereum.org/developers/docs/nodes-and-clients/)
- [Running an Ethereum node](https://ethereum.org/developers/docs/nodes-and-clients/run-a-node/)
- [Bitcoin Core documentation](https://bitcoincore.org/en/doc/)
- See also: [Full Nodes](../bitcoin/full-nodes.md), [Ethereum Nodes](../ethereum/nodes.md)

---

[← Previous: Blockchain Infrastructure](./README.md)
·
[Back to Infrastructure](./README.md)
·
[Next: RPC →](./rpc.md)
