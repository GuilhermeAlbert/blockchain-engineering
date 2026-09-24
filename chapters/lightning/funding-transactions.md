# Funding Transactions

A funding transaction is the single on-chain event that opens a Lightning channel, everything that happens inside the channel afterward is off-chain, until it eventually closes. This chapter covers exactly what this transaction contains and why its specific structure matters.

## Structure

A funding transaction creates one output: a **2-of-2 multisig** (see [Multisig](../wallets/multisig.md)) requiring both channel participants' signatures to spend. Modern Lightning implementations typically use Taproot's key-aggregation capabilities (see [Taproot](../bitcoin/taproot.md#schnorrs-role)) so this 2-of-2 arrangement, when both parties cooperate, looks on-chain like an ordinary single-signature output, one more instance of the general privacy benefit covered in [Multisig](../wallets/multisig.md#taproot-aggregated-signatures).

```text
Funding transaction
  input(s): from either or both participants' regular on-chain funds
  output:   2-of-2 multisig (Alice + Bob), amount = total channel capacity
```

The amount locked in this output becomes the channel's total **capacity** (see [Channel Capacity](./channel-capacity.md)). The maximum amount that can ever be in the channel at once, fixed at open time and only changeable by closing and reopening (or, in newer implementations supporting **splicing**, adjusting the channel's on-chain-anchored capacity without a full close/reopen cycle).

## Why it needs confirmations before the channel is considered safely open

Because the funding transaction is an ordinary on-chain Bitcoin transaction, it's subject to the same [chain reorganization](../blockchain/reorgs.md) risk as any other transaction until it has accumulated sufficient confirmations (see [Transaction Confirmation](../bitcoin/confirmation.md)), most implementations wait for multiple confirmations (commonly around 3-6, configurable) before treating a newly opened channel as safely usable for meaningful value, specifically to avoid a scenario where the channel's very foundation gets reorganized away after off-chain activity has already begun on top of it.

## The channel's initial balance split

The funding transaction itself doesn't have to specify how the channel's capacity is initially split between the two parties beyond who contributed which inputs, that initial balance is established by the **first commitment transaction** (covered in [Commitment Transactions](./commitment-transactions.md)), agreed upon and signed by both parties before the funding transaction is even broadcast, specifically so that both parties have an immediately valid way to reclaim their share if the counterparty disappears or becomes uncooperative right after the channel opens, before any further off-chain updates occur.

## Common misconceptions

**Opening a channel does not require an equal contribution from both parties.** A channel can be funded entirely by one party (a common pattern for a service or business opening channels toward customers) or by both, in any split. The funding transaction's inputs determine this, not any protocol requirement for equal contribution.

**A funding transaction is not the same as a "deposit" held by a custodian.** The 2-of-2 multisig requires both parties' cooperation to spend cooperatively, but either party can unilaterally force the channel closed using their most recent commitment transaction if the counterparty becomes unresponsive, see [Channel Closure](../bitcoin-scaling/payment-channels.md) and this section's coverage of uncooperative closes.

## Further reading

- [BOLT #2: Peer Protocol for Channel Management](https://github.com/lightning/bolts/blob/master/02-peer-protocol.md)

---

[← Previous: Payment Channels](./payment-channels.md)
·
[Back to Lightning Network](./README.md)
·
[Next: Commitment Transactions →](./commitment-transactions.md)
