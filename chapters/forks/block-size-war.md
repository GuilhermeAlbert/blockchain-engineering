# The Block Size Debate

Between roughly 2015 and 2017, Bitcoin's community engaged in an extended, often heated dispute over whether and how to increase the amount of transaction data each block could contain. This chapter covers the substance of the technical arguments on each side, using contemporary sources rather than retrospective narrative, and sets up the three specific events — [SegWit2x](./segwit2x.md), [Bitcoin Cash](./bitcoin-cash.md), and (indirectly, as a later Bitcoin Cash split) [Bitcoin SV](./bitcoin-sv.md) — that emerged from it.

## The underlying technical question

Bitcoin's original code included a 1 MB block size limit, added by Satoshi in 2010 as an anti-spam measure (not part of the original whitepaper or initial release) at a time when blocks were nowhere near that size. As transaction volume grew through the mid-2010s, blocks began approaching this limit during periods of high demand, causing the fee-market dynamics described in [Fee Market](../bitcoin/fee-market.md#observed-patterns): rising fees and longer wait times during congestion. This raised a genuine, substantive engineering and economic question with no single objectively correct answer: **should the block size limit be raised, and if so, how and by how much?**

## The case for raising the block size limit directly

Proponents of directly increasing the block size limit (a simple parameter change, technically a hard fork since it loosens rather than tightens consensus rules — see [Hard Forks](./hard-forks.md)) argued that larger blocks would keep transaction fees low and confirmation times fast as adoption grew, preserving Bitcoin's usability as an everyday payment system for a broader range of transaction sizes and values. Some pointed to Satoshi's own early mailing-list discussion of scaling, in which larger blocks were discussed as a plausible future path, as evidence this approach was consistent with the original design's intended trajectory. Prominent supporters of this general direction included Bitcoin Core contributors Gavin Andresen and Mike Hearn (both proposed specific larger-block-size implementations, including "Bitcoin XT," an early alternative client proposing an increase to 8 MB), and later a broader coalition that included significant mining and business interests.

## The case for a more conservative approach

Critics of directly raising the base block size limit argued that larger blocks increase the resource requirements (storage, bandwidth, validation time) for running a full node (see [Full Nodes](../bitcoin/full-nodes.md#what-running-one-actually-requires)), which they argued could reduce the number of people realistically able to run one, pushing toward a network with fewer, larger, more centralized node operators — a direct threat, in their view, to the decentralization properties Bitcoin's entire security model depends on (see [Permissionless vs Permissioned Networks](../blockchain/permissionless-vs-permissioned.md)). This position generally favored either a smaller, more conservative increase, or scaling primarily through off-chain and Layer 2 approaches (most significantly the [Lightning Network](../lightning/README.md), whose early design work was happening concurrently during this period) combined with efficiency improvements to the existing block size accounting — which is exactly what [SegWit](../bitcoin/segwit.md#weight-and-the-effective-capacity-increase) ultimately provided, alongside its separate malleability fix.

## Why this became genuinely, deeply contentious

Both positions had real, substantive technical merit and real, documented tradeoffs — this was not, as it is sometimes retrospectively simplified into, a dispute between technically sound engineers and technically unsound obstructionists on either side. It combined a genuine engineering disagreement (about how to weigh throughput against node-operation accessibility) with disagreements about Bitcoin's fundamental purpose and audience (a high-throughput, low-fee daily payment network for the widest possible user base, versus a more constrained, maximally decentralized base settlement layer with additional throughput built on top via Layer 2), and, as the dispute dragged on, with accumulating personal and organizational friction between key participants that made purely technical resolution progressively harder. This book presents both positions' actual, substantive arguments as documented above rather than adjudicating which side was correct — reasonable, technically informed people held, and continue to hold, different views on this specific tradeoff.

## How it was resolved, and how it wasn't fully resolved

[SegWit](../bitcoin/segwit.md) activated in August 2017, following the [UASF](./uasf.md) pressure campaign, providing a soft-fork-compatible effective capacity increase without directly raising the base block size limit. A parallel industry effort, the "New York Agreement," proposed combining SegWit activation with a subsequent hard fork block size increase — this became [SegWit2x](./segwit2x.md), and its cancellation is covered in that chapter. Separately, a portion of the community that wanted a larger, direct block size increase and disagreed with SegWit's specific approach split off entirely, creating [Bitcoin Cash](./bitcoin-cash.md) on August 1, 2017 — the same date SegWit itself locked in, though the two events, while related through the same underlying dispute, were organizationally distinct. Bitcoin itself continued with SegWit's approach and, later, [Taproot](../bitcoin/taproot.md); Bitcoin Cash continued as its own, separately governed chain with its own subsequent history, including its own later split producing [Bitcoin SV](./bitcoin-sv.md).

## Common misconceptions

**This was not a dispute with one side representing "true Bitcoin" and the other representing an attack on it** — regardless of how participants on any side characterized it at the time or since, this book treats it as a genuine, substantive disagreement about engineering tradeoffs and project direction among people who, by and large, wanted Bitcoin (in whatever form each envisioned) to succeed.

**The dispute was not purely technical** — it also involved real questions about decision-making process and authority (who gets to decide, and how, when the community disagrees) that connect directly to [Bitcoin Governance](./governance.md), not just the underlying block-size engineering question itself.

## Further reading

- [Satoshi Nakamoto's early mailing-list comments on block size scaling](https://satoshi.nakamotoinstitute.org/posts/bitcointalk/threads/416/) — TODO: verify this specific archive link resolves to the correct, complete thread before publication
- See also: [SegWit](../bitcoin/segwit.md), [SegWit2x](./segwit2x.md), [Bitcoin Cash](./bitcoin-cash.md)

---

[← Previous: SegWit2x](./segwit2x.md)
·
[Back to Forks and Protocol Upgrades](./README.md)
·
[Next: Addresses →](../wallets/addresses.md)
