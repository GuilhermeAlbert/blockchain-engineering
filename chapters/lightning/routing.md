# Routing Payments

[HTLCs](./htlcs.md) covered how a payment moves safely across a known chain of channels. This chapter covers how a sender actually *finds* that chain in the first place, across a network with no central coordinator, and why this problem, called **pathfinding**, is genuinely harder than it might first appear.

## The core challenge

Lightning's network topology (which nodes have channels open with which other nodes, and how much capacity each channel has) is broadcast across the network (via a **gossip protocol**, where nodes share information about public channels with their peers, who relay it onward). But a channel's **balance** (how much of its capacity currently sits on each side) is private information known only to the two channel participants, not broadcast publicly. This creates a genuine routing challenge: a sender can see the overall network graph and each channel's total capacity, but not the specific current balance split that determines whether a given channel can actually forward a payment of a specific size in a specific direction *right now*.

## Source-based routing

Lightning uses **source-based routing**: the sender (not intermediate nodes) computes the entire route in advance, using their local view of the public network graph, before sending the payment. This is a deliberate privacy design choice, intermediate nodes only learn the immediately adjacent hop before and after themselves (via the [onion routing](#onion-routing-privacy-along-the-path) construction below), not the payment's full path or its ultimate sender and recipient.

## Onion routing: privacy along the path

Lightning payments use a construction based on **Sphinx**, an onion-routing packet format (conceptually related to Tor's onion routing, adapted for payment routing specifically). The sender encrypts routing instructions in layers, one per hop, such that each intermediate node can decrypt only its own layer, learning just enough to forward the payment to the next hop, without learning the full route, the original sender's identity, or the final recipient (unless that node happens to be the final hop itself). This gives Lightning payments meaningfully stronger privacy than a fully transparent routing scheme would, though it isn't perfect, sophisticated timing or amount-correlation analysis by well-positioned or colluding nodes remains a documented, studied area of ongoing privacy research for the protocol.

## Why routing can fail

Because balance information is private, a sender's chosen route can fail partway through. An intermediate channel might not actually have enough capacity on the correct side to forward the payment, even though its total capacity (public information) looked sufficient. When this happens, the payment fails at that hop, HTLCs unwind back along the already-attempted path (per the failure-handling mechanism in [HTLCs](./htlcs.md#what-happens-if-the-payment-fails-partway-through)), and the sender's software typically retries with a different route automatically, often without the user noticing anything beyond a brief delay for smaller, well-connected payments.

## Multi-path payments

Modern Lightning implementations support **Multi-Part Payments (MPP)**, splitting a single payment across several simultaneous routes rather than requiring one route to carry the full amount, directly addressing the liquidity constraint problem, since a payment too large for any single available route might still succeed by being split across multiple smaller, individually sufficient paths, all coordinated to either entirely succeed or entirely fail together using a shared payment identifier.

## Common misconceptions

**Lightning nodes do not maintain a complete, real-time map of exact channel balances across the network**. Only total channel capacity is public; actual balance splits remain private to the two channel participants, which is precisely why routing can fail and requires retry logic.

**A failed routing attempt does not put funds at risk**, per the HTLC timeout-and-refund mechanism, a failed hop simply unwinds, with locked funds returning to their original holders at each stage, not lost or stuck (barring the ordinary, bounded delay until relevant timeouts would expire in a worst case).

## Further reading

- [BOLT #7: P2P Node and Channel Discovery](https://github.com/lightning/bolts/blob/master/07-routing-gossip.md)
- [BOLT #4: Onion Routing Protocol](https://github.com/lightning/bolts/blob/master/04-onion-routing.md)

---

[← Previous: HTLCs](./htlcs.md)
·
[Back to Lightning Network](./README.md)
·
[Next: Liquidity →](./liquidity.md)
