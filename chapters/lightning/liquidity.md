# Liquidity

Liquidity is the single most common practical constraint Lightning users and node operators actually encounter — more so than routing algorithms or cryptographic mechanics. This chapter covers what it precisely means at the channel level, and why it's directional in a way that surprises people coming from a mental model of a simple, undifferentiated account balance.

## Inbound versus outbound liquidity

Within a single channel, capacity splits into two directional components:

- **Outbound liquidity**: the amount *you* can currently send through that channel — your side of the current balance.
- **Inbound liquidity**: the amount you can currently *receive* through that channel — the counterparty's side of the current balance.

```text
Channel capacity: 1,000,000 sats total

Balance right now:
  Your outbound liquidity:  800,000 sats  (you can send up to this much)
  Your inbound liquidity:   200,000 sats  (you can receive up to this much)
```

This directional split is a direct consequence of the commitment transaction structure covered in [Commitment Transactions](./commitment-transactions.md): the channel's total capacity is fixed at funding time, but how much of it sits on each side shifts with every payment that flows through — sending decreases your outbound and increases your counterparty's (which becomes your inbound, from their side), and receiving does the reverse.

## Why this trips people up

A newcomer with a freshly opened channel, having funded it entirely themselves, has **maximum outbound liquidity and zero inbound liquidity** — they can send freely but cannot yet *receive* any payment through that channel at all, since there's no balance on the counterparty's side to shift toward them. This is a common, genuine point of confusion: "I opened a Lightning channel and funded it, why can't anyone pay me?" The answer is specifically about liquidity direction, not the channel being broken or insufficiently capitalized in total.

## How inbound liquidity is actually obtained

Since a channel's total capacity is fixed at open time, gaining inbound liquidity on a specific channel generally requires one of: receiving payments through it (which shifts balance toward you, but requires already having *some* inbound liquidity to receive anything in the first place — a genuine cold-start problem for a brand-new node), having someone else open a channel *to* you (making you the recipient side of a channel they funded, which starts you with inbound liquidity on that specific channel), or using a **liquidity marketplace or service** — several exist where a node operator can pay a fee to have another node open a channel toward them, directly purchasing inbound liquidity rather than waiting to accumulate it organically.

## Common misconceptions

**A channel's total capacity does not tell you how much you can currently send or receive through it** — only the current balance split (outbound versus inbound) determines that; two channels with identical total capacity can have completely different, opposite practical usability depending on their current balance.

**Liquidity is not a property of a node overall, but of each individual channel separately** — a node can have abundant outbound liquidity on one channel and zero on another; managing liquidity well across many channels (a practice sometimes called "rebalancing," moving balance between channels via circular payment routes) is an active, ongoing operational task for anyone running a Lightning node handling meaningful volume.

## Further reading

- See also: [Channel Capacity](./channel-capacity.md), [Commitment Transactions](./commitment-transactions.md)

---

[← Previous: Routing Payments](./routing.md)
·
[Back to Lightning Network](./README.md)
·
[Next: Channel Capacity →](./channel-capacity.md)
