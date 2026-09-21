# Payment Channels

[Bitcoin Scaling](../bitcoin-scaling/payment-channels.md) introduced the general two-party payment channel concept and flagged the core problem: what stops a party from broadcasting an old, outdated commitment transaction to cheat? This chapter covers Lightning's actual answer in full technical detail. The revocation mechanism that makes cheating a losing strategy.

## The problem, restated precisely

Each time Alice and Bob update their channel balance, they create a new commitment transaction. The old one still exists, still validly signed by both parties, and still spendable. Nothing inherently prevents either party from broadcasting an old commitment transaction that favored them more than the current, correct balance. A workable channel design needs to make this **strictly irrational**, not merely discouraged.

## The revocation mechanism

Lightning's solution: every time a new commitment transaction is created, the *previous* one is explicitly **revoked** by having both parties exchange the information needed to punish the other if they ever broadcast it. Concretely, each commitment transaction includes an output that can be spent in one of two ways:

1. **After a relative timelock** (see [Timelocks](../bitcoin/script.md#timelocks)), by the commitment transaction's rightful owner, the normal, honest closing path.
2. **Immediately, with no timelock, by the counterparty, but only if they can produce a specific "revocation key,"** which is only ever revealed once that particular commitment has been superseded by a newer one.

When Alice and Bob agree on a new commitment (say, update 5), they each send the other the revocation secret for the *previous* commitment (update 4). This means: if Alice tries to cheat by broadcasting the old update 4 commitment, Bob now holds the revocation key for exactly that transaction, and can use it to claim the **entire channel balance** (not just his rightful share) within the timelock window before Alice's own honest claim path would have activated.

```text
Commitment #4 broadcast (an old, revoked state):

  Alice's claim path:  spendable after N blocks (the honest path,
                        if this were genuinely the latest state)

  Bob's penalty path:  spendable IMMEDIATELY, but only with the
                        revocation key for commitment #4 —
                        which Bob already holds, because Alice
                        gave it to him when they both moved to #5

If Alice broadcasts #4: Bob sees it, has plenty of time (the N-block
window) to claim EVERYTHING using the penalty path before Alice's
own honest path could ever activate.
```

## Why this makes cheating irrational

The penalty isn't just "you don't gain from cheating". It's "you lose everything you would have otherwise kept, including your own rightful share." This asymmetric, severe penalty (lose the whole channel, not just forfeit the disputed difference) is what makes broadcasting an old state a strictly dominated strategy for a rational actor: the expected value of attempting to cheat is strictly worse than simply closing the channel honestly with the current, correct balance.

## Why this requires being online (or delegating to a watchtower)

This mechanism has an important, unavoidable requirement worth stating clearly: **detecting and punishing a cheating counterparty requires actually observing the blockchain** during the timelock window to notice the old commitment being broadcast. A party who is offline for an extended period (longer than the timelock window) when a counterparty attempts to cheat could miss the opportunity to claim the penalty, which is precisely the gap [Watchtowers](./watchtowers.md) are designed to close, covered in this section's later chapter.

## Common misconceptions

**The revocation key is not the same as either party's channel private key**. It's a separate secret specifically generated for and tied to one particular commitment transaction, revealed only once that commitment is superseded; revealing it does not compromise anything about future commitments or the channel's ongoing operation.

**A "cheating" broadcast is not typically a sign of malicious intent in every real-world case**, software bugs, crashed nodes restoring from an outdated backup, or genuine confusion about channel state have all, in practice, led to old commitments being accidentally broadcast; the penalty mechanism applies regardless of intent, which is precisely why correct, tested channel-state backup and management matters operationally for anyone running a Lightning node.

## Further reading

- [BOLT specifications (Basis of Lightning Technology)](https://github.com/lightning/bolts): the formal, cross-implementation Lightning protocol specification

---

[← Previous: Bitcoin Rollup Proposals](../bitcoin-scaling/rollups.md)
·
[Back to Lightning Network](./README.md)
·
[Next: Funding Transactions →](./funding-transactions.md)
