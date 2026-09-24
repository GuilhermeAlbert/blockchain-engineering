# Difficulty Adjustment

Every 2016 blocks (roughly two weeks, if blocks are averaging 10 minutes) Bitcoin recalculates its difficulty target, specifically to correct for however much the network's total hash power has actually changed. This chapter covers the exact formula and its built-in safety limits.

## The formula

```text
new target = old target × (actual time for last 2016 blocks / expected time [2016 × 10 minutes])
```

If the last 2016 blocks took *longer* than the expected 20,160 minutes (two weeks) (meaning hash power effectively decreased, or at least didn't grow as fast as the target assumed) the ratio is greater than 1, and the target increases (making it *easier* to find a valid block, correcting block time back toward 10 minutes). If those blocks took *less* time than expected (hash power increased) the ratio is less than 1, and the target decreases (making mining *harder*), again pulling the average block time back toward 10 minutes.

## The clamp: limiting how much difficulty can swing at once

To prevent a single retargeting period from producing an extreme, destabilizing swing (say, from a very sudden and temporary hash power spike or collapse), Bitcoin's consensus rules **clamp the adjustment ratio to between 0.25x and 4x** per retargeting period, difficulty cannot more than quadruple or drop to less than a quarter of its previous value in any single adjustment, regardless of how extreme the actual observed timespan was.

## Example: computing an adjustment

```typescript
const TARGET_TIMESPAN_SECONDS = 2016 * 10 * 60; // expected: 2 weeks, in seconds

function clampRatio(ratio: number): number {
  return Math.max(0.25, Math.min(4, ratio));
}

function adjustDifficulty(oldTarget: bigint, actualTimespanSeconds: number): bigint {
  const rawRatio = actualTimespanSeconds / TARGET_TIMESPAN_SECONDS;
  const clampedRatio = clampRatio(rawRatio);
  // Multiply as integers scaled by 1,000,000 to avoid floating-point
  // imprecision on very large bigint targets — mirroring, in spirit, how
  // real implementations avoid float arithmetic on consensus-critical values.
  const scaledRatio = BigInt(Math.round(clampedRatio * 1_000_000));
  return (oldTarget * scaledRatio) / 1_000_000n;
}

const oldTarget = 1000000n; // illustrative units, not a real 256-bit target
// Scenario: the last 2016 blocks took 3 weeks instead of 2 (network slowed down)
const threeWeeksSeconds = 3 * 7 * 24 * 60 * 60;
console.log("New target (network slower than expected):", adjustDifficulty(oldTarget, threeWeeksSeconds).toString());

// Scenario: the last 2016 blocks took only 2 days instead of 2 weeks (network much
// faster — the raw ratio would be ~0.143, but the 0.25x floor clamps it)
const twoDaysSeconds = 2 * 24 * 60 * 60;
console.log("New target (network much faster, clamped to 0.25x):", adjustDifficulty(oldTarget, twoDaysSeconds).toString());
```

Verified output from running this exact code:

```text
New target (network slower than expected): 1500000
New target (network much faster, clamped to 0.25x): 250000
```

The first scenario (3 weeks instead of 2) produces a raw ratio of 1.5, within the clamp range, so it applies directly. The second scenario's raw ratio would be roughly 0.143 (2 days versus the expected 14), but the 0.25x floor caps how much the target can shrink in a single adjustment, so the actual result reflects the clamp, not the raw ratio.

## Why fixed 2016-block intervals, not continuous adjustment

Adjusting only periodically, rather than after every block, is a deliberate stability choice: continuous, per-block adjustment based on very recent, noisy timing data (recall that individual block intervals vary considerably around the average purely by chance, per [Block Time](../blockchain/block-time.md#how-the-target-interval-is-actually-maintained)) would risk the target chasing short-term statistical noise rather than genuine, sustained shifts in network hash power. A two-week averaging window smooths out this noise considerably while still responding to real, sustained changes within a reasonable time frame.

## What happens during a sudden hash power drop

If a large fraction of network hash power suddenly disappears (historically, this has happened during regional mining bans (most notably China's 2021 mining crackdown, which removed a very large share of global hash power within weeks)) blocks slow down considerably until the next scheduled retarget, since the difficulty was calibrated for the higher, now-absent hash power. Once the retarget occurs, the 0.25x-4x clamp allows a substantial one-time correction if needed, and further retargets continue adjusting every two weeks until block times return to normal, a real, historically observed stress test of the mechanism, which functioned as designed during that specific 2021 event, restoring roughly 10-minute average block times over the following weeks.

## Common misconceptions

**Difficulty adjustment does not happen "every two weeks" on a fixed calendar schedule.** It happens every 2016 blocks, which averages to roughly two weeks only if blocks are actually arriving close to their 10-minute target, during an unusual period (like the hash power drop scenario above), the interval between actual retargets can be noticeably longer or shorter than two calendar weeks.

**The 0.25x-4x clamp is a per-adjustment limit, not a lifetime limit.** Difficulty has changed by many orders of magnitude over Bitcoin's history through the cumulative effect of many individual adjustments, each individually bounded by the clamp, the clamp limits the size of any single jump, not the total possible change over time.

## Further reading

- [Bitcoin Core developer reference: Target (nBits) and retargeting](https://developer.bitcoin.org/reference/block_chain.html#target-nbits)

---

[← Previous: Mining Difficulty](./difficulty.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Nonce →](./nonce.md)
