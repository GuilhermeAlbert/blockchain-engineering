# Channel Capacity

Channel capacity is the total amount locked in a channel's funding transaction, the hard ceiling on what that channel can ever hold, split between [inbound and outbound liquidity](./liquidity.md) in whatever proportion the current balance reflects. This short chapter covers the practical limits and considerations around choosing and managing capacity.

## The protocol-level limit

Lightning historically imposed a maximum channel size, originally 0.16777215 BTC (2^24 - 1 satoshis, a limit tied to how channel amounts were encoded in the original specification) for **non-wumbo** channels. Nodes that opt into **wumbo channels** (a real, if informally named, protocol extension supported by major implementations) can exceed this limit, enabling channels of arbitrary size by mutual agreement between the two participants, a deliberate loosening of the original conservative default as the protocol and its operators' confidence in larger-value channel security matured.

## The practical tradeoff in choosing capacity

A larger channel can route or hold larger individual payments without needing [multi-path splitting](./routing.md#multi-path-payments), but ties up more capital (both parties' funds, for however each contributed) that could otherwise be deployed elsewhere, and represents a larger sum at risk if the channel needs to be force-closed under adversarial conditions (see [Commitment Transactions](./commitment-transactions.md#cooperative-versus-forced-closes)) or if a counterparty attempts to cheat and the [revocation penalty](./payment-channels.md#the-revocation-mechanism) process needs to actually play out. A smaller channel ties up less capital but limits the size of payments that specific channel alone can route.

## Capacity versus liquidity, restated

This is worth restating plainly, since [Liquidity](./liquidity.md) already covered the mechanism but the terminology distinction is easy to blur in casual conversation: **capacity is fixed at channel open** (changeable only by closing and reopening, or via splicing in supporting implementations); **liquidity is the current, constantly shifting split of that fixed capacity** between the two sides. A channel's capacity never tells you what you can send or receive *right now*, only what the channel's absolute ceiling is, regardless of current balance.

## How network-wide capacity is tracked

Because channel capacities (though not balances) are part of the publicly gossiped network graph (see [Routing Payments](./routing.md#the-core-challenge)), aggregate statistics like "total network capacity" are publicly computable by summing every known public channel's capacity, a commonly cited, if necessarily incomplete, health metric for the Lightning Network overall, incomplete specifically because **private channels** (channels that opt out of public gossip, common for channels not intended to route third-party payments) aren't counted in any public aggregate figure, meaning total real capacity, including private channels, is understood to be higher than any publicly computed total suggests.

## Common misconceptions

**A channel's capacity is not the same as either party's "balance" in that channel**, see [Liquidity](./liquidity.md) for the precise distinction; capacity is the fixed total, liquidity is the current directional split.

**Total network capacity figures cited in the media or by tracking services are undercounts**, not precise totals, because they can only reflect publicly gossiped channels, a real, structural limitation of measuring a network that deliberately allows private, non-broadcast channels.

## Further reading

- [BOLT #2: Peer Protocol for Channel Management (channel size limits)](https://github.com/lightning/bolts/blob/master/02-peer-protocol.md)

---

[← Previous: Liquidity](./liquidity.md)
·
[Back to Lightning Network](./README.md)
·
[Next: Watchtowers →](./watchtowers.md)
