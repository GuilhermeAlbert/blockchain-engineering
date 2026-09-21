# Watchtowers

[Payment Channels](./payment-channels.md#why-this-requires-being-online-or-delegating-to-a-watchtower) flagged a real, unavoidable requirement of the revocation-penalty security model: detecting and punishing a cheating counterparty requires actually watching the blockchain during the relevant timelock window. A watchtower is a service that does this watching on your behalf, so you don't personally need to stay online continuously to remain protected.

## The problem watchtowers solve

A Lightning node that goes offline for longer than a channel's timelock window is, in principle, vulnerable: if a counterparty broadcasts an old, revoked commitment transaction while the honest party is offline and unable to observe it, the honest party might miss their window to claim the penalty described in [Payment Channels](./payment-channels.md#the-revocation-mechanism) — not because the cryptography failed, but because nobody was watching to use it in time. This is a genuine, practical availability requirement most casual users (someone running a mobile Lightning wallet that isn't continuously connected, for instance) can't realistically satisfy on their own.

## How a watchtower works, without needing to be trusted with your funds

A well-designed watchtower doesn't require handing over your private keys or trusting it not to steal from you — it works because of a specific, deliberate design choice in how the data given to it is structured: a client sends the watchtower an **encrypted penalty transaction** for each channel state, plus a way to recognize when the corresponding old commitment has been broadcast (a short identifier derived from that specific transaction, not usable to reconstruct or identify it in advance), **without revealing which channel or counterparty it applies to, or the penalty transaction's actual contents, until the moment it's needed**. The watchtower monitors the blockchain for any transaction matching one of the identifiers it holds; if a match appears, it decrypts and broadcasts the corresponding penalty transaction — pre-signed, and paying the recovered funds to an address the original client specified in advance, not to the watchtower itself. Structured this way, a watchtower that never sees a matching broadcast learns essentially nothing about its clients' channels at all, and even a malicious or compromised watchtower can't steal funds, since the pre-signed penalty transaction pays out to the client's own specified address, not to the watchtower.

```text
Client, while online:
  1. creates a new commitment (update #6), revoking #5
  2. pre-signs a penalty transaction claiming the FULL channel balance
     IF the revoked #5 commitment is ever broadcast, paying out to the
     client's own address
  3. encrypts that penalty transaction and sends it, along with a
     recognition hint for commitment #5, to the watchtower — without
     revealing which channel this is for

Later, while the client is offline:
  4. counterparty (dishonestly) broadcasts old commitment #5
  5. watchtower recognizes the match, decrypts the pre-signed penalty tx,
     broadcasts it — claiming the funds on the client's behalf, to an
     address only the client controls
```

## Tradeoffs

Watchtowers restore continuous protection without requiring continuous personal uptime, at the cost of some operational complexity (generating and managing per-state encrypted penalty transactions, and either running your own watchtower or trusting — in a limited, structurally constrained way — a third-party one) and, for third-party watchtower services, a residual trust question about the *availability* of the watchtower itself (a watchtower that's down or unresponsive when needed provides no protection, even though it structurally can't steal funds when it is working correctly).

## Common misconceptions

**A watchtower is not a custodian and does not hold your funds or your channel's private keys** — the specific encrypted, blinded design described above is what makes it meaningfully different from, and safer than, simply trusting a third party with custody; a competently implemented watchtower learns nothing useful about a channel it never needs to act on.

**Using a watchtower is not mandatory for using Lightning** — it's an optional, additional protection specifically for the offline-vulnerability window; a node that stays reliably online and actively monitors its own channels doesn't strictly need a third-party (or even personally-run) watchtower, though many operators use one anyway as a redundant safety measure regardless.

## Further reading

- [BOLT 13: Watchtower Protocol (draft specification)](https://github.com/sr-gi/bolt13/blob/master/13-watchtowers.md) — as of this writing, a draft proposal maintained outside the core `lightning/bolts` repository, not yet a ratified part of the core specification set

---

[← Previous: Channel Capacity](./channel-capacity.md)
·
[Back to Lightning Network](./README.md)
·
[Next: Lightning Nodes →](./nodes.md)
