# SegWit2x

SegWit2x was a planned two-part upgrade — SegWit activation followed by a block size increase to 2 MB via hard fork — backed by a May 2017 industry agreement, whose second half was **canceled on November 8, 2017**, days before its planned activation. This chapter covers the agreement, why the hard fork portion was ultimately called off, and what its cancellation demonstrates about Bitcoin's governance in practice.

## The New York Agreement

In May 2017, at a meeting held during the Consensus conference in New York, a group of companies, miners, and industry participants — representing, by the organizers' own account, a substantial share of Bitcoin's mining hash power and transaction-processing businesses at the time — signed an agreement (informally called the "New York Agreement," or NYA) committing to a specific two-step plan: activate SegWit via miner signaling, followed roughly three months later by a hard fork doubling the block size limit to 2 MB. This was, explicitly, an attempt to bridge the two positions described in [The Block Size Debate](./block-size-war.md) — giving SegWit's supporters their soft-fork capacity increase while also giving direct-block-size-increase supporters the larger base limit they had been advocating for.

## Why it fell apart

Despite the agreement's backing from significant mining and business interests, it did not have the support of a large share of Bitcoin Core's own developer community, nor of a significant portion of the broader node-operating and user ecosystem — many of whom viewed the process itself (an agreement reached among a comparatively small, self-selected group of companies and miners, without the broader rough-consensus process described in [Bitcoin Governance](./governance.md)) as an inappropriate way to decide a consensus-rules change, independent of what they thought of the 2 MB increase on its own technical merits. As the planned November hard fork activation date approached, it became increasingly clear that a large share of node operators and economically significant participants did not intend to run the SegWit2x-compatible software, meaning the hard fork risked producing another contentious chain split (similar to, and following shortly after, the Bitcoin Cash split) rather than the smooth, unifying transition its organizers had intended.

## The cancellation

On **November 8, 2017**, the SegWit2x organizers announced they were suspending the planned hard fork, citing a lack of sufficient consensus to proceed safely — explicitly stating the goal had been to avoid a contentious network split, and that proceeding without broader agreement would work against that goal rather than for it. The SegWit portion of the original plan had already activated successfully in August 2017 (via the process covered in [User-Activated Soft Forks](./uasf.md)); it was specifically the second, hard-fork block size increase that was called off.

## Why this episode matters for understanding Bitcoin's governance

SegWit2x is a clear, concrete illustration of the structural point made generally in [Bitcoin Governance](./governance.md#the-checks-against-unilateral-change): even an agreement backed by companies and miners representing substantial economic and hash power weight could not, on its own, force a consensus-rules change onto a network whose node operators and broader ecosystem had not independently converged on supporting it. This is presented by different observers as evidence of different things — some see it as validating proof that Bitcoin's governance genuinely resists capture by concentrated economic interests, no matter how well-organized; others note that the episode also revealed real friction and lack of institutionalized process for resolving this kind of disagreement, since the outcome depended heavily on informal social and technical pressure rather than any defined, predictable mechanism. This book presents the documented sequence of events and leaves the broader interpretive judgment to the reader.

## Common misconceptions

**SegWit2x is not the same event as the Bitcoin Cash split**, though both stemmed from the same underlying block-size dispute and both are closely associated with the same mid-2017 period — SegWit2x was an attempt to keep the entire ecosystem on one chain via a coordinated, sequenced plan; Bitcoin Cash was a group choosing to split off entirely rather than wait for or participate in that coordinated plan.

**The cancellation of the SegWit2x hard fork was not a cancellation of SegWit itself** — SegWit had already activated separately and successfully months before the hard-fork portion's planned date, and remains part of Bitcoin's protocol today (see [SegWit](../bitcoin/segwit.md)).

## Further reading

- See also: [The Block Size Debate](./block-size-war.md), [Bitcoin Governance](./governance.md), [User-Activated Soft Forks](./uasf.md)

---

[← Previous: Bitcoin SV](./bitcoin-sv.md)
·
[Back to Forks and Protocol Upgrades](./README.md)
·
[Next: The Block Size Debate →](./block-size-war.md)
