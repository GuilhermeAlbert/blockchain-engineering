# Hashrate

Hashrate is the total computational power currently being applied to Bitcoin mining, measured in hashes per second. This short chapter covers how it's estimated (since, like network node count, it can't be directly observed) and what it actually tells you.

## Why hashrate can't be measured directly

No central registry tracks how much mining hardware exists or how fast it's running — hashrate is inferred, not observed, from the one piece of public information the network actually provides: **how quickly blocks are being found relative to the current difficulty**. Because difficulty defines a known, calculable probability of finding a valid block per hash attempt (see [Mining Difficulty](./difficulty.md) and [Proof of Work](./proof-of-work.md)), the *observed* average time between blocks can be worked backward into an *implied* total hashrate, using the same relationship in reverse.

## The estimation formula

```text
estimated hashrate ≈ (difficulty × 2^32) / (average observed seconds per block)
```

This is exactly the inverse of the calculation shown in [Proof of Work](./proof-of-work.md#example-computing-todays-approximate-odds): given a known difficulty and an *assumed* average block time (10 minutes), you can estimate hashrate; given a known difficulty and the *actually observed* average block time over some recent window, you can instead solve for the hashrate that would produce that observed timing.

## Example

```typescript
function estimateHashrate(difficulty: number, averageSecondsPerBlock: number): number {
  return (difficulty * Math.pow(2, 32)) / averageSecondsPerBlock;
}

const illustrativeDifficulty = 90_000_000_000_000; // illustrative, not live — see difficulty.md
const observedAverageSeconds = 580; // blocks arriving slightly faster than the 600-second target
const hashrate = estimateHashrate(illustrativeDifficulty, observedAverageSeconds);
console.log("Estimated hashrate (H/s):", hashrate.toExponential(3));
console.log("Estimated hashrate (EH/s):", (hashrate / 1e18).toFixed(1));
```

Verified output from running this exact code:

```text
Estimated hashrate (H/s): 6.665e+20
Estimated hashrate (EH/s): 666.5
```

These numbers use an illustrative, not live, difficulty figure — replace it with a specific, dated, cited value from a live source before treating any hashrate figure in this chapter as current.

## Why hashrate estimates from different sources sometimes disagree

Different tracking services use different observation windows (the last 24 hours of blocks versus the last week, for instance) and slightly different smoothing methodologies, which can produce visibly different hashrate estimates at any given moment even though they're all working from the same underlying, publicly available block timestamps and difficulty value — a real source of the minor inconsistency you'll notice comparing hashrate figures across different block explorers or statistics sites.

## Why hashrate matters for security

Hashrate is the practical, real-world quantity behind the abstract "attacker's share of hash power" (`q`) used throughout [Probabilistic Finality](../distributed-systems/probabilistic-finality.md) and [51% Attacks](./51-percent-attacks.md) — a higher total honest network hashrate directly means an attacker needs to acquire and operate proportionally more hardware to reach any given fraction of total network power, which is why sustained hashrate growth is generally treated within the Bitcoin community as a positive indicator of the network's overall security margin, even though it says nothing directly about decentralization (see [Mining Pools](./mining-pools.md#the-centralization-concern)), which is a separate, distinct concern.

## Common misconceptions

**Hashrate figures reported by public dashboards are estimates, not exact measurements** — treat any specific cited hashrate figure as an approximation with some inherent uncertainty and methodology-dependent variation, not a precisely known ground truth.

**Rising hashrate does not automatically mean rising decentralization**, and can in fact coincide with the opposite if the growth is concentrated among a small number of very large operators or pools — hashrate (total security) and decentralization (distribution of control over that security) are related but distinct properties, both covered across this section.

## Further reading

- See also: [Mining Difficulty](./difficulty.md), [Proof of Work](./proof-of-work.md)

---

[← Previous: ASICs](./asics.md)
·
[Back to Bitcoin](./README.md)
·
[Next: 51% Attacks →](./51-percent-attacks.md)
