# Statechains

A statechain is an experimental protocol that lets ownership of a specific Bitcoin UTXO be transferred between parties off-chain, without an on-chain transaction for each transfer, a different mechanism from a payment channel, worth understanding on its own terms rather than as a variant of [Payment Channels](./payment-channels.md).

## The core mechanism

A statechain relies on a semi-trusted third party, sometimes called a **statechain entity** or operator, that co-signs transactions using a 2-of-2 arrangement with the current owner, but (this is the mechanism's central, distinguishing trick) never actually learns the full private key on its own, and critically, when ownership transfers to a new party, the *previous* owner's key share is deleted and a fresh key share is generated cooperatively between the operator and the new owner. The UTXO itself never moves on-chain during a transfer; what changes is who, together with the operator, can authorize spending it.

```text
UTXO locked in a 2-of-2 (operator + current owner)
         │
         │  ownership transfer #1 (off-chain)
         ▼
Operator generates a new joint key with the new owner;
old owner's key share is deleted (this deletion step is
what the whole scheme's security depends on)
         │
         │  ownership transfer #2 (off-chain)
         ▼
        ... repeats, no on-chain transaction at any step ...
         │
         ▼
Eventual on-chain settlement, whenever the current owner
chooses to actually spend the UTXO normally
```

## Why this is a meaningfully different trust model than it might first appear

The security of a statechain transfer depends entirely on the **previous owner's key share genuinely having been deleted** and not retained. This is not something the new owner can independently, cryptographically verify at the moment of transfer. It rests on trusting the statechain operator (and, implicitly, trusting that the previous owner didn't secretly retain a copy before supposedly deleting it, an action outside the operator's control to prevent). This is a real, structural difference from a genuinely trust-minimized scheme, and it's why statechains are generally described in the technical community as a **semi-trusted** or **reduced-trust** mechanism, not a trustless one, a distinction this book states plainly rather than letting "off-chain transfer" imply the same security guarantees as an on-chain transaction's own trust-minimized settlement.

## Why use one despite this tradeoff

The appeal is speed and cost: transferring ownership of a statechain-held UTXO is fast (no waiting for block confirmation) and doesn't consume any on-chain block space or incur on-chain fees, useful for scenarios involving frequent ownership changes of the same underlying value (some proposed and experimental use cases include fast, low-cost transfers of specific, larger UTXOs among a set of semi-trusted participants). This is explicitly a different tradeoff point than the Lightning Network's approach, which achieves trust-minimization through cryptographic penalty enforcement (see [Payment Channels](./payment-channels.md#why-an-old-commitment-cant-simply-be-rebroadcast-to-cheat")) rather than through an operator's promise to delete old key material.

## Current status

Statechains remain a comparatively niche, experimental technology relative to the Lightning Network's far broader adoption and much more extensively battle-tested deployment. Implementations exist (the Mercury Wallet project is the most commonly cited) but statechains have not achieved anywhere near Lightning's level of ecosystem integration, liquidity, or real-world usage as of this writing. This book presents statechains as a documented, real, but still experimental and comparatively lower-adoption approach, distinct from established, widely-used systems.

## Common misconceptions

**A statechain transfer is not cryptographically trustless** in the way an on-chain Bitcoin transaction or a properly penalty-enforced Lightning channel update is. It depends on trusting the operator's honest key deletion, a meaningfully different and weaker security property than this book applies to genuinely trust-minimized mechanisms elsewhere.

**Statechains are not a Lightning Network variant or extension**. They're a structurally distinct protocol solving a different problem (transferring ownership of a whole, specific UTXO) than Lightning's problem (routing many small, incremental balance updates through a network of bidirectional channels).

## Further reading

- [Statechains: Non-Custodial Off-Chain Bitcoin Transfer](https://www.commerceblock.com/statechains-non-custodial-off-chain-bitcoin-transfer/): TODO: verify this specific link resolves correctly before publication; statechain documentation has moved across several projects and URLs over time

---

[← Previous: Federations](./federations.md)
·
[Back to Bitcoin Scaling](./README.md)
·
[Next: RGB →](./rgb.md)
