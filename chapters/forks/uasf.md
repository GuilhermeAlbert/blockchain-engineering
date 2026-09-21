# User-Activated Soft Forks

A User-Activated Soft Fork (UASF) is a soft fork activated by node operators enforcing new rules on a predetermined date, independent of whether miners have signaled sufficient support through the usual mechanism. This chapter covers the concept and its single, real, historically consequential instance: [BIP 148](https://github.com/bitcoin/bips/blob/master/bip-0148.mediawiki), part of the events that led to SegWit's activation in 2017.

## The underlying argument

[Miner Signaling](./miner-signaling.md) gives miners a formal role in activating soft forks, but [Bitcoin Governance](./governance.md#the-groups-with-practical-influence-and-what-each-actually-controls) established that node operators (not miners) are the ones who ultimately decide which rules actually get enforced, since full nodes independently validate blocks regardless of miner behavior. A UASF makes this structural point operational: proponents argue that if a soft fork has broad support among node operators and the wider economic ecosystem but is specifically being blocked by insufficient miner signaling, node operators can simply commit, in advance, to a flag day after which they will reject blocks not following the new rules, creating strong economic pressure for miners to comply (since miners producing non-compliant blocks after that date would have those blocks rejected by every UASF-enforcing node, making them commercially worthless) without waiting on miner signaling to reach its threshold first.

## BIP 148: the 2017 SegWit case

By early-to-mid 2017, SegWit ([BIP 141](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki)) had been ready and broadly discussed for an extended period, but miner signaling under the standard BIP 9 mechanism (see [Miner Signaling](./miner-signaling.md#the-activation-process)) had stalled well below the 95% threshold, amid a broader, related dispute over block size covered fully in [The Block Size Debate](./block-size-war.md). In response, a pseudonymous developer writing as "shaolinfry" (real identity undocumented and, as far as this book can verify, still unknown) proposed BIP 148 in March 2017, committing supporting nodes to begin rejecting blocks that did not signal SegWit readiness starting on a fixed date, **August 1, 2017**, regardless of what the overall signaling percentage was at that point.

## What actually happened

The credible threat of a UASF-driven split (combined with a separate, related industry initiative (the New York Agreement, discussed in [SegWit2x](./segwit2x.md))) is widely credited with motivating miners to increase SegWit signaling before the BIP 148 deadline arrived. SegWit ultimately locked in via the standard BIP 9 mechanism shortly before August 1, 2017, achieving the required threshold through ordinary signaling rather than through BIP 148's rules actually needing to take effect and reject non-signaling blocks in practice. Separately, and around the same period, **Bitcoin Cash** split off as its own chain on August 1, 2017, a related but distinct event covered in its own chapter, [Bitcoin Cash](./bitcoin-cash.md), driven by disagreement over the block size question rather than by BIP 148 specifically.

## Why UASF is a significant governance precedent, independent of this one case

Whether or not BIP 148's specific rules ever took effect on live blocks, its existence and the credible commitment behind it demonstrated, concretely, that node operators collectively hold real, exercisable leverage over protocol activation, not merely a theoretical veto, as discussed abstractly in [Bitcoin Governance](./governance.md), but a coordinating mechanism that historically appears to have produced observable results in miner behavior. This is cited by different parts of the Bitcoin community in different, sometimes conflicting ways: some treat it as validating evidence that "users," broadly construed, ultimately govern Bitcoin; others note that BIP 148's own support came substantially from a specific, vocal, technically engaged subset of the community, and caution against generalizing too readily from one historical episode about how governance disputes will resolve in the future. This book presents the sequence of events as documented above without endorsing either broader interpretation as settled.

## Common misconceptions

**BIP 148's rules did not, in the end, need to actively reject any blocks on the main network** in practice, because signaling reached the required threshold before August 1, 2017 arrived. This is sometimes described loosely as "the UASF worked," which is accurate in the sense that the credible threat achieved its goal, but should not be confused with a claim that BIP 148-enforcing nodes were widely rejecting real blocks in significant numbers as a matter of routine operation.

**UASF is not a general-purpose mechanism available for any dispute at any time**. BIP 148 was one specific, deliberately organized proposal, coordinated in response to one specific stalled activation; the label describes a strategy that node operators could, in principle, employ again under different circumstances, not a standing, automatic protocol feature.

## Further reading

- [BIP 148: Mandatory activation of segwit deployment](https://github.com/bitcoin/bips/blob/master/bip-0148.mediawiki)
- See also: [The Block Size Debate](./block-size-war.md), [SegWit](../bitcoin/segwit.md)

---

[← Previous: Miner Signaling](./miner-signaling.md)
·
[Back to Forks and Protocol Upgrades](./README.md)
·
[Next: Bitcoin Cash →](./bitcoin-cash.md)
