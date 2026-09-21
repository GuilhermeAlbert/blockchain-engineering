# Long-Term Security Budget

Bitcoin's "security budget" is the total value miners earn for securing the network (subsidy plus fees) and it's the direct economic backing behind everything covered in [Proof of Work](./proof-of-work.md) and [Hashes and Block Linking](../blockchain/block-linking.md#the-cost-this-imposes-redoing-proof-of-work): a chain is expensive to attack precisely because so much real value is being spent honestly extending it. This chapter covers a genuine, unresolved question this book has flagged at several points already: what happens once the subsidy, which currently dominates that budget, shrinks to nearly nothing.

## The concern, stated precisely

As covered in [Block Rewards](./block-rewards.md#subsidy-versus-total-reward) and [The Halving](./halving.md), the block subsidy is on a fixed, mechanical path toward zero, roughly halving every four years, projected to become negligible well before its final, formal exhaustion around 2140. For the cost of a majority attack (per the analysis in [51% Attacks](./51-percent-attacks.md)) to stay prohibitively high. **Transaction fees need to grow enough to replace the shrinking subsidy's contribution to total miner revenue**, roughly maintaining (in real, not necessarily nominal, terms) the overall economic incentive currently driving honest mining.

## Why this isn't automatically guaranteed

This is where the concern becomes genuinely open rather than a settled technical question: fee revenue depends on sustained, high demand for scarce block space (see [Fee Market](./fee-market.md)), which in turn depends on continued, growing usage of Bitcoin's base layer for transactions people are willing to pay meaningfully for. If a large share of everyday Bitcoin-denominated activity moves to [Layer 2](../lightning/README.md) systems like the Lightning Network specifically to *avoid* base-layer fees (a reasonable, expected outcome of Layer 2 systems succeeding at their stated purpose. See [Why Layer 2 Exists](../layer-2/README.md)), base-layer fee revenue could, in principle, grow more slowly than needed to fully offset the shrinking subsidy, even as overall Bitcoin adoption and usage (broadly construed, across all layers) continues growing.

## Arguments that this will work out

- **Price appreciation could offset volume concerns.** If Bitcoin's price rises over time (even independent of any specific price prediction, which this book does not endorse, see [Stock-to-Flow](./stock-to-flow.md) for a specific, contested attempt at exactly this kind of prediction), a fixed number of satoshis charged per transaction represents rising real-world value, which could sustain adequate security budget in dollar (or purchasing-power) terms even without dramatic growth in raw transaction *count* or fee rate.
- **Block space could remain genuinely scarce and valuable** even in a world where most small, everyday payments move to Layer 2. Layer 2 systems still periodically need base-layer settlement transactions (opening and closing Lightning channels, for instance, see [Lightning Network](../lightning/README.md)), and high-value settlement, particularly cross-institutional settlement, may continue to value base-layer finality highly enough to sustain meaningful fees even at comparatively lower transaction volume.
- **The transition is gradual, not a cliff.** Because halvings occur roughly every four years rather than as a single sudden drop-off, the fee market has a long runway (decades) to develop and mature in response to the gradually shifting balance between subsidy and fees, rather than needing to solve this instantly.

## Arguments that this is a genuine, unresolved risk

- **No historical precedent exists for a security model transitioning this fully from subsidy to fees at the scale Bitcoin would require**, making this a genuinely novel situation without a clean analogous case study to draw confidence from.
- **Fee revenue has historically been considerably more volatile than subsidy revenue** (see [Fee Market](./fee-market.md#observed-patterns)), and a security budget dependent primarily on a volatile revenue source is, some argue, structurally less predictable and potentially more vulnerable during demand troughs than one anchored by a fixed, predictable subsidy.
- **Layer 2 growth and base-layer fee revenue could be in genuine tension**, not just gradually reconciled, if Layer 2 systems succeed precisely by minimizing how often users need base-layer transactions, this could suppress exactly the demand needed to sustain adequate long-run fee revenue, a dynamic some researchers and Bitcoin developers have flagged as worth active monitoring rather than assuming will resolve itself favorably.

## This book's position

This is a genuinely open, actively studied question within Bitcoin's technical and economic research community, not a solved problem this book can responsibly present as settled in either direction, and not merely a talking point raised by external critics. Serious Bitcoin developers and researchers take the question seriously, and it remains, as of this writing, without a confident, broadly agreed-upon resolution either predicting a smooth transition or predicting a serious future security shortfall. Readers encountering confident claims in either direction (that this is definitely fine, or that it definitely dooms Bitcoin's long-term security) should treat both with appropriate skepticism given the genuine, documented uncertainty involved.

## Common misconceptions

**This is not an imminent problem.** The subsidy remains a substantial majority of total miner revenue as of this writing and will for years to come. The concern is specifically about the multi-decade trajectory, not a near-term crisis.

**Layer 2 adoption succeeding is not straightforwardly "bad" for base-layer security**, despite the tension noted above. It depends on the specific balance between base-layer settlement demand and Layer 2 payment volume that actually emerges over time, which remains genuinely uncertain rather than predictable in either direction from today's vantage point.

## Further reading

- See also: [Fee Market](./fee-market.md), [The Halving](./halving.md), [51% Attacks](./51-percent-attacks.md)

---

[← Previous: Fee Market](./fee-market.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Temporary Chain Forks →](../forks/temporary-forks.md)
