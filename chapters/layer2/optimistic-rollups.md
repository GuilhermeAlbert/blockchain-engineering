# Optimistic Rollups

An optimistic rollup assumes every submitted state claim is correct by default, and gives anyone a window of time to prove otherwise. This chapter covers the assumption behind the name, and the specific cost it imposes: a withdrawal delay measured in days, not blocks.

## The "optimistic" assumption

When a sequencer publishes a new batch of transactions and the resulting state root to L1, an optimistic rollup doesn't verify that the state root is actually correct at publication time. It simply accepts the claim, optimistically, and starts a **challenge period**: a fixed window (commonly around seven days on the major optimistic rollups) during which anyone running the rollup's software can independently recompute the batch's correct result and, if it disagrees with what was published, submit a **fraud proof** disputing it (covered fully in [Fraud Proofs](./fraud-proofs.md)). If no one successfully disputes the claim before the challenge period ends, it's treated as final.

This is a genuinely different security model from requiring proof of correctness upfront: it depends on at least one honest, watching party being willing and able to submit a fraud proof if a batch actually is invalid, an assumption usually phrased as needing only a single honest participant among the rollup's verifiers, rather than needing a majority.

## Why withdrawals take about a week

The challenge period's existence has a direct, unavoidable consequence for anyone withdrawing assets from the rollup back to L1: a withdrawal can't be treated as final, and the funds can't be released on L1, until the challenge period for the batch containing that withdrawal has fully elapsed without a successful fraud proof. This is why moving funds from an optimistic rollup back to Ethereum mainnet through the rollup's own native bridge takes roughly a week, not the near-instant experience of transacting within the rollup itself, and it's a direct, structural consequence of the optimistic verification model, not an arbitrary inconvenience.

```typescript
// Illustrative timeline for a native optimistic-rollup withdrawal.
const withdrawalInitiated = new Date("2026-01-01T00:00:00Z");
const challengePeriodDays = 7;
const withdrawalFinalized = new Date(
  withdrawalInitiated.getTime() + challengePeriodDays * 24 * 60 * 60 * 1000
);
console.log(withdrawalFinalized.toISOString()); // 2026-01-08T00:00:00.000Z
```

**Fast bridges** (third-party services, separate from the rollup's own native bridge) work around this delay by fronting a user their withdrawal immediately, for a fee, and then collecting the actual funds themselves once the native challenge period elapses. This shifts the waiting period onto the fast-bridge provider rather than the user, at the cost of trusting that provider and paying for the service, a real, separate tradeoff from waiting out the native bridge's delay directly.

## Common misconceptions

**The challenge period does not mean an optimistic rollup's transactions are unconfirmed or unusable for a week.** Transactions within the rollup itself confirm quickly, and most applications and users treat them as final well before the L1 challenge period elapses; the delay specifically affects moving assets back to L1 through the rollup's native bridge, not activity happening on the rollup itself.

**A shorter challenge period is not simply a strict improvement.** It reduces withdrawal latency, but it also reduces the amount of time an honest party has to detect and submit a fraud proof against an invalid state claim; the roughly week-long window on major optimistic rollups reflects a deliberate tradeoff, not an arbitrarily chosen number.

## Further reading

- [Arbitrum documentation](https://docs.arbitrum.io/)
- [Optimism documentation](https://docs.optimism.io/)
- See also: [Fraud Proofs](./fraud-proofs.md), [Rollups](./rollups.md)

---

[← Previous: Rollups](./rollups.md)
·
[Back to Layer 2](./README.md)
·
[Next: Fraud Proofs →](./fraud-proofs.md)
