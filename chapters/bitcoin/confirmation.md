# Transaction Confirmation

A transaction has one confirmation once it's included in the current tip block, two once another block is mined on top of that, and so on. This chapter applies the general finality concepts from [Probabilistic Finality](../distributed-systems/probabilistic-finality.md) to the specific, practical question of how many confirmations different real-world situations actually warrant.

## What a confirmation count actually represents

Recall the numbers computed in [Probabilistic Finality](../distributed-systems/probabilistic-finality.md#what-the-numbers-actually-say): against an attacker with 10% of network hash power, the probability of a successful reversal falls from about 20% at 1 confirmation to roughly 0.024% at 6 confirmations. Confirmation count is, precisely, this — a proxy for "how much cumulative proof-of-work now stands behind this transaction," which translates directly into "how expensive would it be for an attacker to produce an alternative chain that excludes it."

## Zero-confirmation risk

An unconfirmed ("zero-conf") transaction sitting in the mempool carries meaningfully more risk than even a single confirmation, for a specific reason: it can potentially be replaced by a conflicting transaction before any miner includes it, either through explicit [Replace-By-Fee](./mempool.md#replace-by-fee) (if it signaled RBF) or, in principle, through a miner simply choosing to include a different, conflicting transaction spending the same inputs (though a well-connected, honestly-operating network makes this a much smaller practical risk for a non-RBF-signaling transaction than RBF-based replacement, absent active attacker effort). Some merchants historically accepted zero-confirmation payments for low-value, low-risk transactions (a coffee purchase) as a usability tradeoff, understanding this carries real, if generally small, fraud risk — a business decision about acceptable risk, not a protocol guarantee.

## How many confirmations is "enough"?

There's no single universally correct number — it's a risk decision that depends on transaction value and the realistic threat model:

- **Small, everyday purchases**: many merchants and services accept 0-1 confirmations, accepting the corresponding small fraud risk as a cost of doing business, similar to how card networks accept some chargeback risk.
- **Typical retail or moderate-value transactions**: 1-3 confirmations is a common practical standard.
- **Historically common exchange/large-value standard**: 6 confirmations (roughly one hour) has been a widely used informal benchmark since Bitcoin's earlier years, though many exchanges now use fewer confirmations for smaller amounts and more for larger ones, a graduated approach directly reflecting the value-at-risk logic from [Probabilistic Finality](../distributed-systems/probabilistic-finality.md#tradeoffs).
- **Very large transactions or those specifically concerned about a well-resourced attacker**: some businesses and protocols require considerably more than 6 confirmations, particularly for cross-chain bridge or exchange deposit contexts where the assumed attacker resources are higher.

## Example: a graduated confirmation policy

```typescript
function requiredConfirmations(amountSats: number): number {
  if (amountSats < 100_000) return 0;        // small purchase, accept zero-conf risk
  if (amountSats < 10_000_000) return 1;     // moderate value
  if (amountSats < 100_000_000) return 3;    // significant value
  return 6;                                   // large value, use the conventional standard
}

for (const amount of [50_000, 5_000_000, 50_000_000, 500_000_000]) {
  console.log(`${amount} sats → require ${requiredConfirmations(amount)} confirmation(s)`);
}
```

This is illustrative, not a rule Bitcoin itself enforces — the protocol has no concept of "required" confirmations at all; this kind of policy exists entirely at the application layer, chosen by whoever is accepting the payment based on their own risk tolerance.

## Common misconceptions

**"Confirmed" is not a binary safety switch that flips at some specific magic number.** Reversal probability is continuous and shrinks gradually with each additional confirmation (see the actual numbers in [Probabilistic Finality](../distributed-systems/probabilistic-finality.md)) — any specific confirmation threshold is a practical, risk-based cutoff chosen by whoever's accepting the payment, not a property Bitcoin itself defines as "the" safe number.

**A transaction losing its confirmations in a reorg does not mean it's permanently invalidated.** If it doesn't conflict with anything in the new, winning chain, it typically returns to the mempool as unconfirmed and gets re-included in a future block — see [Chain Reorganizations](../blockchain/reorgs.md).

## Further reading

- [Bitcoin whitepaper, Section 11 (Calculations)](https://bitcoin.org/bitcoin.pdf)

---

[← Previous: The Mempool](./mempool.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Coinbase Transactions →](./coinbase-transactions.md)
