# HTLCs

A Hashed Timelock Contract (HTLC) is what lets a Lightning payment route safely across multiple, unrelated channels — through people you have no direct relationship with, no direct channel with, and no reason to trust — without any of them being able to steal the payment along the way. This is the single mechanism that turns a collection of independent two-party [payment channels](./payment-channels.md) into an actual, usable payment *network*.

## The problem: routing through strangers

Suppose Alice wants to pay Carol, but has no direct channel with her — only a channel with Bob, who happens to have a channel with Carol. Alice could ask Bob to simply forward the payment, but this requires trusting Bob not to take Alice's money and never actually pay Carol. An HTLC removes this trust requirement entirely, using the same hash-based commitment idea introduced in [Commitments](../cryptography/commitments.md), applied specifically to conditionally routed payments.

## How it works, step by step

1. **Carol generates a secret** — a random value, call it `R` (the "preimage") — and gives Alice its hash, `H = SHA256(R)`, through the Lightning invoice Alice is paying (see [Lightning invoices](./README.md#lightning-invoices-briefly)). Carol does not reveal `R` itself yet.
2. **Alice creates an HTLC with Bob**: "I will pay you this amount, **if and only if** you show me the preimage `R` such that `SHA256(R) = H`, within some time limit — otherwise, after that time limit expires, I get my money back."
3. **Bob, wanting to earn his routing fee, extends an equivalent HTLC to Carol**: the same hash `H`, the same condition, but with a *shorter* time limit than the one Alice gave him (this timing detail matters — covered below).
4. **Carol, who actually knows `R`** (she generated it), reveals `R` to Bob to claim the HTLC he offered her.
5. **Bob now knows `R`** too (Carol had to reveal it to claim payment from him), and uses it to claim the HTLC Alice extended to him.
6. **Payment has now moved from Alice to Bob to Carol**, atomically — either the whole chain of HTLCs resolves (everyone gets paid, in sequence, using the same revealed secret), or none of it does.

```text
Alice ──HTLC(H, timeout=T1)──► Bob ──HTLC(H, timeout=T2)──► Carol
                                                    (T2 < T1)

Carol reveals R (knows it: she generated it)
         │
         ▼
Bob learns R, claims Alice's HTLC using it
         │
         ▼
Alice's payment is now, provably, Bob's — and Bob has already
paid Carol using the same secret
```

## Why the timeouts must decrease along the route

Notice step 3's detail: Bob's HTLC to Carol has a **shorter** timeout than Alice's HTLC to Bob. This isn't arbitrary — it's essential to the mechanism's safety. If Carol were slow to claim, or if something went wrong, Bob needs enough remaining time, *after* his own HTLC to Carol expires, to still claim his HTLC from Alice before *that* one expires too. Each hop along a route needs a strictly decreasing timeout, giving every intermediate node a safe window to either successfully forward the secret backward or safely reclaim their own funds if the payment fails partway through — without ever being caught in a position where they've paid the next hop but can no longer claim from the previous one.

## What happens if the payment fails partway through

If Carol never reveals `R` (she doesn't want the payment, the invoice expired, or anything else goes wrong), neither Bob's nor Alice's HTLC is ever claimed — once each HTLC's respective timeout passes, the locked funds simply return to whoever originally offered them (Bob gets his back from the HTLC he offered Carol; Alice gets hers back from the HTLC she offered Bob). No one loses funds from a failed route — the worst outcome is a delay until the relevant timeout expires, not a loss.

## Why intermediate nodes can't steal the payment

This is the mechanism's entire point, worth stating explicitly: **Bob can never claim Alice's HTLC without also being obligated to have already paid (or being about to pay) Carol**, because claiming requires revealing `R`, and the only way Bob learns `R` is by Carol revealing it to claim her own HTLC first. Bob cannot claim Alice's payment and simply keep it — the hash-lock cryptographically ties his ability to get paid to Carol having *already* gotten paid using the identical secret.

## Common misconceptions

**An HTLC does not require Alice and Carol to trust Bob at all** — the entire mechanism is designed so that Bob's honest, correct behavior is enforced by the cryptographic and economic structure of the HTLCs themselves, not by any reputation or trust relationship between the parties.

**HTLCs are not unique to Lightning** — the same hash-lock-plus-timelock pattern appears in cross-chain atomic swaps and various other trust-minimized conditional payment schemes; Lightning is its most widely deployed application, not its only one.

## Further reading

- [BOLT #3: HTLC output formats](https://github.com/lightning/bolts/blob/master/03-transactions.md)

---

[← Previous: Commitment Transactions](./commitment-transactions.md)
·
[Back to Lightning Network](./README.md)
·
[Next: Routing Payments →](./routing.md)
