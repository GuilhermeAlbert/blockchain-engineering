# Commitment Transactions

A commitment transaction is each party's currently-valid, unilaterally-broadcastable claim on the channel's funds, reflecting the latest agreed balance split. [Payment Channels](./payment-channels.md) already covered the revocation mechanism that keeps old commitments from being profitably broadcast; this chapter covers the transaction's actual structure and a subtlety worth understanding: **each party holds a different version**.

## Why each party has their own version

This is a detail easy to miss and important to get right: Alice and Bob do not share one single commitment transaction. Each holds their **own** version, structured so that if *they* broadcast it, funds are distributed correctly to both parties — but with a timelock specifically applied to the broadcaster's own output (not the counterparty's), and a revocation path attached specifically to the broadcaster's output (giving the counterparty the ability to claim the penalty described in [Payment Channels](./payment-channels.md#the-revocation-mechanism) if this specific, asymmetric version is broadcast after being superseded).

```text
Alice's version of commitment #5:
  output to Alice: timelocked (delayed claim) OR revocable by Bob
  output to Bob:   immediately spendable by Bob

Bob's version of commitment #5:
  output to Bob:   timelocked (delayed claim) OR revocable by Alice
  output to Alice: immediately spendable by Alice
```

Each party only ever needs to broadcast their *own* version to close the channel unilaterally — the asymmetric timelock on their own output (versus the counterparty's immediately spendable output) is specifically what gives the *other* party the window needed to detect and punish a revoked broadcast, per the mechanism in [Payment Channels](./payment-channels.md#the-revocation-mechanism).

## Cooperative versus forced closes

- **Cooperative close**: both parties agree the channel should close, and jointly sign a single, ordinary, final settlement transaction directly spending the funding output at the current balance — cheaper and faster than a forced close, since it doesn't need any of the timelock or revocation machinery at all.
- **Forced (unilateral) close**: either party broadcasts their own current commitment transaction without the other's cooperation — necessary if the counterparty is unresponsive, offline, or uncooperative, but more expensive (the broadcaster's own funds are locked behind the timelock delay) and reveals more information on-chain than a cooperative close does.

## HTLC outputs

A commitment transaction made while one or more Hashed Timelock Contracts (see [HTLCs](./htlcs.md)) are in flight also includes additional, conditional outputs representing those pending, not-yet-settled payments — covered fully in the next chapter, since understanding HTLCs requires the routing context [Routing Payments](./routing.md) introduces first.

## Common misconceptions

**Alice's and Bob's versions of the same commitment number are not interchangeable or identical** — they're deliberately, asymmetrically different, specifically to make the revocation penalty mechanism work correctly regardless of which party ends up broadcasting.

**A forced close does not mean something went wrong in a security sense** — it's a normal, expected, always-available option built into the protocol specifically so that either party can exit the channel and recover their funds even if the counterparty becomes permanently unresponsive; it's more expensive and slower than a cooperative close, not evidence of a failure or attack.

## Further reading

- [BOLT #3: Bitcoin Transaction and Script Formats](https://github.com/lightning/bolts/blob/master/03-transactions.md)

---

[← Previous: Funding Transactions](./funding-transactions.md)
·
[Back to Lightning Network](./README.md)
·
[Next: HTLCs →](./htlcs.md)
