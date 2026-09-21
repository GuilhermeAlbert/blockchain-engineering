# Fraud Proofs

A fraud proof is how an optimistic rollup's challenge period actually gets enforced: a way for a challenger to prove, on L1, that a specific published state claim is wrong. This chapter covers what a fraud proof actually has to demonstrate, and why rollups use an interactive, step-by-step dispute process rather than simply re-executing an entire disputed batch on L1.

## The core problem: L1 can't just re-run the whole batch

The most direct way to check whether a rollup's claimed state is correct would be to have L1 re-execute the entire disputed batch of transactions itself and compare the result. This defeats the entire purpose of a rollup: if L1 had to re-execute every batch to verify it, none of the computation would actually have moved off L1, and none of the cost savings a rollup exists to provide would materialize. A fraud proof has to prove a batch is wrong without requiring L1 to redo all the work the rollup did.

## Interactive fraud proofs: narrowing down to one disputed step

The dominant approach, used by Arbitrum and (in earlier, single-round form) by Optimism, is an **interactive fraud proof**: instead of asking L1 to verify an entire batch at once, the challenger and the party defending the claim (typically the original sequencer) engage in a back-and-forth protocol that repeatedly bisects the disputed computation in half, narrowing down exactly where the two parties' claimed results first diverge.

```text
Disputed computation: 1,000,000 execution steps, claimed results disagree

Round 1: bisect at step 500,000 — where do results diverge, before or after?
Round 2: bisect the identified half again — 250,000, or 750,000?
...continuing until the range narrows to a single step...

Final round: exactly one EVM opcode's execution is disputed.
L1 only needs to execute that ONE step to determine who's right.
```

Each round of bisection is cheap: it only requires comparing claimed intermediate results, not re-executing anything. After enough rounds (logarithmic in the total number of steps, meaning a batch with a million execution steps needs only around twenty rounds to narrow down to one), the dispute is reduced to a single, tiny, individually verifiable step: one EVM opcode's execution, cheap enough for L1 to actually re-execute and settle the dispute definitively.

## What happens once fraud is proven

If a fraud proof successfully demonstrates that a published state claim was wrong, the rollup's protocol reverts that claim, and the party who submitted the fraudulent claim (typically the sequencer, who is required to post a bond before publishing state claims specifically to make this possible) loses their bond, which is used to reward the successful challenger. This economic penalty, losing a substantial posted bond, is what makes submitting a knowingly fraudulent state claim an irrational strategy for a sequencer, on top of the practical difficulty of getting a false claim past a determined, honest challenger in the first place.

## Why this requires at least one honest, watching participant

The entire fraud-proof security model depends on someone actually running the verification and being willing to submit a challenge if they detect an invalid claim; a fraud proof that nobody submits does nothing. This is the honest-minority assumption underlying optimistic rollups: the system remains secure as long as at least one honest, adequately resourced participant is actively watching and willing to challenge, not because incorrect claims are somehow impossible, but because they can always be caught and penalized if anyone bothers to check.

## Common misconceptions

**A fraud proof does not require re-executing an entire disputed transaction batch on L1.** The interactive bisection process narrows any dispute down to a single, cheap-to-verify step; the whole design exists specifically to avoid the cost of full-batch re-execution, which would eliminate a rollup's scaling benefit entirely.

**Fraud proofs are not automatic.** They require an actively watching, willing challenger to detect an invalid claim and initiate the dispute process; a rollup with no one running verifying infrastructure, or where doing so is prohibitively expensive, has a weaker practical security guarantee than the theoretical fraud-proof mechanism alone would suggest.

## Further reading

- [Arbitrum: interactive fraud proofs](https://docs.arbitrum.io/how-arbitrum-works/fraud-proofs/overview-fraud-proofs)
- See also: [Optimistic Rollups](./optimistic-rollups.md), [Validity Proofs](./validity-proofs.md)

---

[← Previous: Optimistic Rollups](./optimistic-rollups.md)
·
[Back to Layer 2](./README.md)
·
[Next: ZK Rollups →](./zk-rollups.md)
