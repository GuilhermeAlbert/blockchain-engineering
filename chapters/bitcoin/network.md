# The Bitcoin Network

This chapter applies [Peer-to-Peer Networks](../distributed-systems/p2p.md)'s general concepts to Bitcoin's actual, running network — its approximate scale, how nodes actually find each other in practice, and what propagation looks like at real-world speed.

## Scale and shape

The Bitcoin network has no fixed size — anyone can join or leave at any time (see [Permissionless vs Permissioned Networks](../blockchain/permissionless-vs-permissioned.md)), and reachable node counts are only ever estimates, typically gathered by crawling projects that attempt to enumerate publicly reachable nodes (a number that excludes nodes running behind NAT or Tor that don't accept inbound connections, meaning the true total participant count is understood to be meaningfully higher than any public reachable-node count suggests). Estimates from public node-crawling services have generally placed the reachable node count in the range of several thousand to around fifteen thousand at various points, though this fluctuates and any specific figure should be treated as a snapshot rather than a stable constant.

## Node discovery in practice

Building on the general mechanisms described in [Peer-to-Peer Networks](../distributed-systems/p2p.md#how-it-works), a new Bitcoin Core node's actual bootstrap sequence is: try DNS seeds first, fall back to a hardcoded seed list if DNS seeds are unreachable, and once connected to even a handful of peers, request additional peer addresses via `getaddr`/`addr` messages, gradually building up a local address database (`peers.dat`) it can reuse on future restarts without needing to re-query DNS seeds every time.

## Propagation speed in practice

Empirical measurement projects (such as the long-running Bitnodes and DSN Bitcoin network monitoring efforts) have historically found that a newly broadcast block reaches the overwhelming majority of reachable nodes within a small number of seconds — fast relative to the roughly 10-minute average interval between blocks (see [Block Time](../blockchain/block-time.md)), which is precisely the relationship that keeps the natural, propagation-driven orphan rate low. Techniques like **compact block relay** (BIP 152) reduce the data actually transmitted for a new block by sending short transaction identifiers instead of full transaction data when the receiving node's mempool likely already has most of the block's transactions, further speeding up propagation as block and mempool sizes have grown over time.

## Tor and network-level privacy

Because a node's IP address is visible to its direct peers by default, some node operators run their node exclusively over Tor to avoid revealing their network location — a real, practical privacy measure covered further in [Privacy](../society/privacy.md). Bitcoin Core has built-in support for connecting through and accepting connections via Tor hidden services.

## Common misconceptions

**There is no "central" Bitcoin network status anyone can authoritatively check.** Public dashboards and node-crawling projects provide estimates based on what they can observe, not a ground truth — this is a direct, expected consequence of the network having no central registry by design.

## Further reading

- [Bitcoin Core developer reference: P2P network](https://developer.bitcoin.org/reference/p2p_networking.html)
- [BIP 152: Compact Block Relay](https://github.com/bitcoin/bips/blob/master/bip-0152.mediawiki)

---

[← Previous: Bitcoin Nodes](./nodes.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Full Nodes →](./full-nodes.md)
