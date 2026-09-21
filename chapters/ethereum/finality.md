# Finality

This chapter closes the Ethereum section by returning to a concept introduced generally in [Finality](../distributed-systems/finality.md): Ethereum's specific finality mechanism, **Casper FFG** (Friendly Finality Gadget), and exactly how it differs from Bitcoin's purely probabilistic model.

## Checkpoints, justification, and finalization

Casper FFG operates on **checkpoints**, specifically, the first block of each epoch (see [Proof of Stake](./proof-of-stake.md#slots-and-epochs)). Validators' attestations don't just vote on the current chain head; they also vote on which checkpoint they consider valid, building toward two successive thresholds:

1. **Justified**: a checkpoint becomes justified once attestations representing at least **two-thirds of total staked ETH** vote for it (technically, for the specific `(source, target)` checkpoint pair required by the protocol's exact voting rules).
2. **Finalized**: a checkpoint becomes finalized once the **next** checkpoint after it also becomes justified, two consecutive justified checkpoints finalize the earlier one.

```text
Epoch N checkpoint    Epoch N+1 checkpoint
   justified?    ──►      justified?
       │                      │
       └──── both justified ──┘
                  │
                  ▼
      Epoch N checkpoint is now FINALIZED
```

## What finalization actually guarantees

Once a checkpoint is finalized, reverting it would require an attacker to have controlled at least **one-third of total staked ETH** and be willing to have that entire stake **slashed** (see [Slashing](./slashing.md)), since reverting a finalized checkpoint necessarily requires validators to violate the same double-voting rules slashing is specifically designed to catch and punish. This gives Ethereum's finality a meaningfully different character than Bitcoin's: it's not "increasingly improbable with more confirmations" (Bitcoin's model, covered with its actual formula in [Probabilistic Finality](../distributed-systems/probabilistic-finality.md)) but "would require deliberately, provably destroying a specific, enormous, quantifiable amount of real capital", the **economic finality** concept introduced generally in [Finality](../distributed-systems/finality.md#economic-finality).

## Deterministic versus probabilistic guarantees, compared

| | Bitcoin | Ethereum (post-Merge) |
| --- | --- | --- |
| Finality type | Probabilistic | Justified/finalized checkpoints (economic finality) |
| Typical time to strong confidence | Multiple confirmations (often ~1 hour for high value) | Two epochs (~12.8 minutes) for finalization |
| What reversal requires | More cumulative hash power than the honest chain, sustained | Roughly 1/3+ of total stake, willing to be slashed |
| Guarantee style | Probability approaches (never reaches) zero | Reversal is possible but economically self-destructive past finalization |

## Why this two-tier design (justified, then finalized), not a single step

Requiring **two consecutive** justified checkpoints, rather than finalizing immediately upon a single checkpoint reaching the two-thirds threshold, is a deliberate safety margin: it protects against a scenario where a checkpoint reaches the threshold due to a temporary, unusual pattern of attestations (perhaps during a network partition or unusual validator behavior) that doesn't reflect a durable, sustained consensus, requiring the *next* checkpoint to also independently reach the same threshold provides confirmation that the justified state reflects a stable, ongoing agreement, not a one-off statistical or adversarial anomaly.

## Common misconceptions

**Ethereum's finalized blocks are not mathematically, absolutely irreversible** in the same sense a formal proof establishes something as logically impossible. Reverting them is possible in principle, but only at a specific, enormous, and precisely quantifiable economic cost (the slashing of roughly a third of all staked ETH), which is a different, though in practice extremely strong, kind of guarantee than mathematical impossibility.

**"Confirmed" (a block simply being added to the chain) and "finalized" (surviving the full justification-then-finalization process) are not the same thing on Ethereum**. An unfinalized, recently added block can still, in principle, be reorganized away under some circumstances, similar in spirit (though different in exact mechanism) to Bitcoin's shallow reorgs covered in [Chain Reorganizations](../blockchain/reorgs.md); finalization is the stronger, later guarantee.

## Further reading

- [Casper the Friendly Finality Gadget](https://arxiv.org/abs/1710.09437): Buterin & Griffith, 2017
- [Ethereum consensus specifications, Casper FFG](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md)

---

[← Previous: Slashing](./slashing.md)
·
[Back to Ethereum](./README.md)
·
[Next: Bytecode →](../evm/bytecode.md)
