# Peer-to-Peer Networks

Bitcoin has no server. There is no central machine that clients connect to, no company operating the network, no single point that can be switched off to stop it. Instead, every participant runs software that connects directly to a number of other participants, forming a mesh where every node is simultaneously a client and a server. This chapter covers what that architecture actually means in practice, before later chapters build consensus and finality on top of it.

## The problem

A client-server architecture (a web browser talking to a company's servers) is simple to build and reason about, but it has a structural weakness for a system like Bitcoin: whoever controls the server controls the system. They can deny service to specific users, alter records, or shut the entire service down, and users have no recourse beyond trusting that operator's continued good behavior. This is exactly the [trusted third party](../origins/digital-cash.md#the-trusted-third-party) problem Bitcoin was designed to avoid.

**Peer-to-peer (P2P)** networking removes the special central server: every node runs the same software, follows the same protocol rules, and connects to a set of other nodes as equals. No node has architecturally privileged authority over any other, which doesn't mean all nodes have equal *influence* (miners with more hash power have more influence over which blocks get built on, covered in [Consensus](./consensus.md)), only that no node has a special protocol-level role like "the server" that others must go through.

## How it works

When a Bitcoin node starts up, it needs to find other nodes to connect to, a process called **peer discovery**. Bitcoin Core uses several mechanisms for this:

- **DNS seeds**: a small number of hardcoded domain names, operated by trusted volunteers, that return a list of currently active node IP addresses when queried, used mainly to bootstrap a brand-new node's very first connections.
- **Hardcoded seed nodes**: a fallback list of known-stable node addresses included directly in the software, used if DNS seeds are unreachable.
- **Address gossip (`addr` messages)**: once connected to even a few peers, a node can ask them for the addresses of other nodes they know about, and propagate addresses it learns to its own peers, the network's list of reachable nodes spreads organically through the mesh itself rather than through any central directory.

Once connected, a node typically maintains a modest number of active peer connections (Bitcoin Core's default is 8 outbound connections, plus additional inbound connections up to a configurable limit) (deliberately far fewer than the total network size, because full node connectivity to every other node would be impractical at scale, and isn't necessary: information (new transactions, new blocks) reaches the entire network by **propagation**) each node forwards what it receives to its own peers, who forward to theirs, so a piece of data reaches the whole network within a small number of hops, similar to how a rumor spreads through a large group even though no single person tells everyone directly.

```text
        Node A ─────── Node B
          │  ╲         ╱  │
          │    ╲     ╱    │
          │      ╲ ╱      │
        Node D ─── X ─── Node C
          │      ╱ ╲      │
          │    ╱     ╲    │
          │  ╱         ╲  │
        Node E ─────── Node F

Every node connects to a handful of others, not all of them.
A new transaction broadcast by Node A reaches every node within a few hops,
without any central server relaying it.
```

## Example: propagation timing matters

When Node A hears about a new transaction, it validates it against its own mempool and consensus rules (see [The Mempool](../bitcoin/mempool.md)) and, if valid, relays it onward to its peers, who each do the same. This means a piece of data doesn't arrive at every node simultaneously. It arrives at different times depending on network topology and latency, an unavoidable consequence of a decentralized network with no central broadcast point. This propagation delay is not just a performance detail; it is the direct cause of [Chain Reorganizations](../blockchain/reorgs.md), since two miners can each find a valid block within seconds of each other, before either block has finished propagating to the whole network, temporarily splitting which block different parts of the network consider the current tip.

## Under the hood: the protocol

Bitcoin nodes communicate using a defined wire protocol (documented in the Bitcoin Core developer reference), specific message types including `version` (exchanged when two nodes first connect, negotiating protocol version and capabilities), `inv` (announcing that a node has new data, such as a transaction or block, available), `getdata` (requesting that data), `tx` (a transaction), and `block` (a full block). This request/response pattern (announce, then let interested peers request the full data) avoids needlessly re-sending large data (like full blocks) to peers who already have it through another path, an efficiency detail that matters at Bitcoin's actual network scale.

## Tradeoffs

A peer-to-peer architecture removes the single point of control and failure that a client-server model has, at real, measurable costs: propagation across a decentralized mesh is slower than a direct connection to a single fast server would be, which directly shapes design decisions elsewhere in Bitcoin (block time, discussed in [Block Time](../blockchain/block-time.md), is partly chosen to keep propagation delay small relative to the time between blocks, limiting how often two miners accidentally produce competing blocks). Coordinating any protocol change also becomes harder without a central operator who can simply push an update, see [Bitcoin Governance](../governance/bitcoin.md) for how the network handles this in practice.

## Common misconceptions

**"Peer-to-peer" does not mean every node is directly connected to every other node.** Bitcoin's network has thousands of nodes, each connected to a comparatively small number of peers; data reaches the whole network through relaying, not direct connections to everyone.

**Bitcoin's peer-to-peer network is not literally anonymous or untraceable at the network level.** A node's IP address is visible to its direct peers by default, which is a genuine, documented privacy consideration (mitigated by tools like Tor, which some node operators use), see [Privacy](../society/privacy.md).

## Further reading

- [Bitcoin Core developer reference: P2P network](https://developer.bitcoin.org/reference/p2p_networking.html)
- [Bitcoin whitepaper, Section 5 (Network)](https://bitcoin.org/bitcoin.pdf)

---

[← Previous: Distributed Systems Basics](./README.md)
·
[Back to Distributed Systems](./README.md)
·
[Next: Replication →](./replication.md)
