# Payment Channels

A payment channel lets two parties exchange many payments between each other while only ever touching the blockchain twice, once to open the channel, once to close it. This chapter introduces the general concept and mechanism; the [Lightning Network](../lightning/README.md) section builds this into a full, multi-hop network and covers the remaining mechanics (routing, liquidity, watchtowers) in depth.

## The core idea

Recall the throughput ceiling from [Block Size](./block-size.md#the-throughput-arithmetic): every on-chain transaction consumes scarce, rate-limited block space. If two parties expect to transact with each other frequently (a customer and a coffee shop, or two exchanges settling with each other repeatedly) putting every single payment on-chain is wasteful. A payment channel lets them commit funds once, then exchange an effectively unlimited number of updated balance agreements **off-chain**, broadcasting to the blockchain only when they finally want to settle and close out.

## How it works, mechanically

1. **Funding transaction**: both parties (or just one, for a simpler channel) contribute funds to a single, on-chain multisig output (see [Multisig](../wallets/multisig.md)), typically 2-of-2, requiring both parties' signatures to spend.
2. **Commitment transactions**: each time the parties want to update the balance (Alice pays Bob some amount), they cooperatively construct and sign a new, updated transaction spending the multisig output, reflecting the new balance split, but **don't broadcast it**. Each new commitment transaction supersedes the previous one; only the most recent, mutually agreed version is meant to ever actually be published.
3. **Closing**: when either party wants to settle, they broadcast the latest, mutually signed commitment transaction, which pays out the current balance split, one final on-chain transaction, regardless of how many off-chain updates happened in between.

```text
On-chain:  [Funding tx] ─────────────────────────────────── [Closing tx]
                          │
Off-chain:                ├─ update 1 (Alice: 0.9, Bob: 0.1)
                          ├─ update 2 (Alice: 0.7, Bob: 0.3)
                          ├─ update 3 (Alice: 0.5, Bob: 0.5)
                          └─ ... potentially thousands more,
                             none of them touching the blockchain
```

## Why an old commitment can't simply be rebroadcast to cheat

A naive version of this scheme has an obvious problem: what stops a dishonest party from broadcasting an *old*, outdated commitment transaction (one favoring them more than the current, correct balance) instead of the latest one? Preventing exactly this is the specific job of the **penalty mechanism** covered fully in [Lightning Network](../lightning/README.md) and [Commitment Transactions](../lightning/commitment-transactions.md): each new commitment transaction invalidates the previous one in a way that makes broadcasting an old, outdated version punishable. The other party can, within a defined time window, claim the *entire* channel balance as a penalty if they detect an old commitment being broadcast, an incentive strong enough to make cheating irrational under normal conditions.

## The general pattern this establishes

Payment channels are the foundational building block for [Layer 2](../layer-2/README.md) scaling generally, not just Bitcoin's specific Lightning Network, the same core idea (commit on-chain once, transact off-chain many times, settle on-chain once) reappears, in various forms, across Ethereum's own Layer 2 landscape (see [Why Layer 2 Exists](../layer-2/README.md)), even though the specific technical implementations differ substantially between a Bitcoin-Script-based payment channel and an Ethereum rollup.

## Tradeoffs

A two-party payment channel only lets you transact cheaply and instantly with the *specific counterparty* you opened the channel with. Paying someone you don't already have an open channel with still requires either opening a new channel (another on-chain transaction) or routing the payment through a connected network of channels, which is precisely the problem the full [Lightning Network](../lightning/README.md) is designed to solve.

## Common misconceptions

**Off-chain payments within a channel are not less real or less final than on-chain transactions for practical purposes**. Each cooperatively signed commitment update is a valid, enforceable claim on the channel's funds; what's deferred is only the act of broadcasting to the blockchain, not the cryptographic validity of the agreement itself.

**A payment channel does not require trusting the counterparty not to cheat**, the penalty mechanism (covered fully in the Lightning section) is specifically designed to make cheating economically irrational through cryptographic and economic enforcement, not through relying on the other party's good faith.

## Further reading

- See also: [Lightning Network](../lightning/README.md), [Multisig](../wallets/multisig.md)

---

[← Previous: Transaction Batching](./batching.md)
·
[Back to Bitcoin Scaling](./README.md)
·
[Next: Sidechains →](./sidechains.md)
