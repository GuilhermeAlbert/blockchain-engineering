# Mining Pools

A mining pool lets many individual miners combine their hash power, sharing whatever reward any pool participant earns proportionally, rather than each miner competing entirely alone. This chapter covers why pools exist, how payouts are actually calculated, and the centralization concern they introduce — a genuine, documented tension in Bitcoin's practical operation, not a hypothetical one.

## Why pools exist: variance reduction

As covered in [Mining](./mining.md#variance-and-why-pools-exist), an individual miner with a small share of total network hash power faces genuine, sometimes extreme variance in how often they personally find a block — someone with 0.01% of network hash power might, on average, expect to find a block roughly once every seven years at current network scale, but could easily go considerably longer with no reward at all, purely by chance. A pool converts this into small, frequent, predictable payouts by having the pool operator distribute whatever reward *any* participant finds across all contributing participants, weighted by how much work each contributed — the same total expected reward, but with dramatically reduced variance for each individual participant.

## How pool payouts actually work

Pool participants don't search for a full, valid block hash directly — they search for **shares**: hashes that meet a much easier, pool-specific threshold than the actual network difficulty requires, but that still demonstrate genuine work was performed (since finding a share requires the same underlying search process, just against an easier target). The pool operator tracks how many shares each participant submits, and when any participant in the pool happens to find a hash that also meets the *actual* network difficulty (a "full solution," which is also, necessarily, a valid share), the resulting block reward is distributed across all recent share contributors according to the pool's specific payout scheme — common schemes include **PPS** (Pay Per Share, a fixed payout per submitted share regardless of whether a block is ultimately found, with the pool operator bearing the variance risk) and **PPLNS** (Pay Per Last N Shares, distributing actual found rewards proportionally among the most recent N shares submitted, with participants bearing more of the variance than under PPS).

## Example: reward distribution under PPLNS

```typescript
interface ShareContribution {
  miner: string;
  shares: number;
}

function distributeReward(rewardSats: number, contributions: ShareContribution[]): Record<string, number> {
  const totalShares = contributions.reduce((sum, c) => sum + c.shares, 0);
  const payout: Record<string, number> = {};
  for (const c of contributions) {
    payout[c.miner] = Math.floor((rewardSats * c.shares) / totalShares);
  }
  return payout;
}

const blockReward = 312_500_000; // 3.125 BTC in satoshis
const recentShares: ShareContribution[] = [
  { miner: "MinerA", shares: 4000 },
  { miner: "MinerB", shares: 3500 },
  { miner: "MinerC", shares: 2500 },
];

console.log(distributeReward(blockReward, recentShares));
```

Verified output from running this exact code:

```text
{ MinerA: 125000000, MinerB: 109375000, MinerC: 78125000 }
```

MinerA contributed 40% of recent shares (4000 of 10,000) and received 40% of the 3.125 BTC reward (125,000,000 of 312,500,000 satoshis) — the payout tracks each participant's proportional share contribution exactly.

## The centralization concern

Because pool operators control which transactions get included in the blocks their pool mines (the pool, not individual participants, typically assembles the candidate block template), a small number of large pools controlling a majority of network hash power collectively represents a meaningful point of centralized influence over transaction inclusion and, in principle, over which chain gets extended during a contentious fork — even though the underlying hash power is contributed by many separate, individual participants who could, in principle, switch pools if they disagreed with a specific pool's behavior. This is a real, actively monitored dynamic in Bitcoin's ecosystem (public dashboards regularly track approximate hash power distribution across known pools), and it's a specific, concrete instance of the broader decentralization tradeoffs discussed in [Governance](../governance/README.md) — pools reduce individual variance risk at the cost of concentrating a meaningful amount of practical influence in a comparatively small number of operators.

## Stratum and pool protocols

Miners connect to pools using a protocol called **Stratum** (and its later revision, Stratum V2, which adds features including letting individual miners, rather than the pool operator, choose their own transaction sets — directly addressing part of the centralization concern above by giving participants more control over what they're actually mining, without needing to leave the pool's variance-reduction benefits behind).

## Common misconceptions

**Joining a mining pool does not change how much total bitcoin gets mined**, or affect Bitcoin's issuance schedule in any way (see [The Halving](./halving.md)) — pools only change how the existing, protocol-defined reward is distributed among the miners who actually contributed the hash power to find it.

**A pool operator does not have unilateral custody of participants' hash power or earnings** in any deep technical sense — participants can generally switch pools relatively freely, since mining hardware is pointed at whichever pool's server address a miner configures, and this switching cost, not any binding technical lock-in, is what limits how quickly hash power could redistribute away from a pool behaving badly.

## Further reading

- [Stratum V2 specification](https://stratumprotocol.org/)

---

[← Previous: The Halving](./halving.md)
·
[Back to Bitcoin](./README.md)
·
[Next: ASICs →](./asics.md)
