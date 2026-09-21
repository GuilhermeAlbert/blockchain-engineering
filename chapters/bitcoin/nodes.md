# Bitcoin Nodes

A Bitcoin node is any computer running software that speaks the Bitcoin protocol. This short chapter sets up vocabulary the rest of the Bitcoin section relies on constantly — the difference between a node, a miner, and a wallet, three roles that are easy to conflate but are functionally distinct and frequently performed by different pieces of software or even different people entirely.

## Three distinct roles

- **A node** validates transactions and blocks against the protocol's consensus rules (see [Consensus Rules](../blockchain/consensus-rules.md)) and relays valid data to its peers over the [peer-to-peer network](../distributed-systems/p2p.md). Running a node does not require mining, holding any bitcoin, or having a wallet at all — a node's job is verification and relaying, full stop.
- **A miner** competes to create new blocks by searching for valid proof-of-work (see [Mining](./mining.md)). A miner typically also runs full node software (to know what transactions and blocks are currently valid to build on), but the mining-specific hardware and software is a distinct, additional layer on top of ordinary node operation.
- **A wallet** manages private keys and constructs transactions on a user's behalf (see [What Is a Wallet?](../wallets/README.md)). A wallet does not need to run a full node — many wallets connect to someone else's node or a third-party service instead, a distinction covered fully in [Full Nodes](./full-nodes.md) and [Light Clients](./light-clients.md).

These roles are commonly combined (a home miner might run node, mining, and wallet software on the same machine) but are architecturally independent — an exchange might run thousands of nodes with no mining at all, while a large mining operation might rely on someone else's node infrastructure entirely rather than running its own.

## What a node actually does, step by step

1. Connects to peers and exchanges data over the [P2P network](../distributed-systems/p2p.md).
2. Receives new transactions and blocks as they're broadcast.
3. Independently validates each one against the full set of [consensus rules](../blockchain/consensus-rules.md) — checking signatures, checking that inputs aren't already spent, checking proof-of-work, and every other rule the protocol defines.
4. Relays valid data onward to its own peers; silently drops (and typically disconnects from peers who repeatedly send) invalid data.
5. Maintains its own local copy of the current best chain and, for full nodes, the full history needed to have independently verified it from the genesis block forward.

## Node types this book covers separately

Because the distinction has real, practical consequences for security and resource requirements, this book gives full nodes and light clients their own dedicated chapters rather than treating "node" as a single undifferentiated category:

- [Full Nodes](./full-nodes.md) — download and independently validate the entire blockchain, trusting no one.
- [Light Clients](./light-clients.md) — download only block headers and rely on [Merkle proofs](../cryptography/merkle-proofs.md) and trust in the honest majority for transaction verification, trading some trust-minimization for dramatically lower resource requirements.

## Common misconceptions

**Running a node is not the same as mining, and does not by itself earn any bitcoin.** Full node operators validate and relay data as a voluntary contribution to the network's decentralization and their own trust-minimized verification — there's no direct financial reward for running a node, unlike mining.

**"The Bitcoin network" is not a single entity anyone can inspect from one vantage point.** It's the emergent result of thousands of independently operated nodes, each with its own view formed by whichever peers it happens to be connected to — see [Peer-to-Peer Networks](../distributed-systems/p2p.md).

## Further reading

- [Bitcoin Core developer reference](https://developer.bitcoin.org/reference/)

---

[Back to Bitcoin](./README.md)
·
[Next: The Bitcoin Network →](./network.md)
