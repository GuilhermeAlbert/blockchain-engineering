# Bitcoin Cash

Bitcoin Cash split from Bitcoin via a hard fork on **August 1, 2017**, at **block 478,558/478,559**, becoming the first major, lasting chain split in Bitcoin's history. This chapter covers what happened mechanically, what each side argued at the time, and what has happened to the two chains since — using contemporary positions rather than retrospective characterization from either side.

## Immediate context

As covered in [The Block Size Debate](./block-size-war.md), a portion of the Bitcoin community had, for an extended period, favored directly raising the base block size limit rather than pursuing [SegWit](../bitcoin/segwit.md)'s soft-fork-compatible capacity increase. When SegWit activated (locking in shortly before August 1, 2017, following the [UASF](./uasf.md) pressure campaign) without also including a direct block size increase, a group of developers, businesses, and miners who had advocated for larger blocks proceeded with their own hard fork, implemented primarily through the **Bitcoin ABC** client, raising the block size limit to 8 MB (later increased further on the Bitcoin Cash chain) and explicitly not adopting SegWit's approach.

## What each side argued, at the time

**Bitcoin Cash proponents** argued that Satoshi's original vision was for Bitcoin to function as peer-to-peer electronic cash usable for everyday transactions at low cost and high volume (citing the whitepaper's own title and stated goal directly), that SegWit's capacity increase was insufficient and unnecessarily complex relative to a direct block size increase, and that larger blocks were both technically safe and necessary to prevent fees from rising to levels that would price out small, everyday transactions.

**Bitcoin (the chain that retained the BTC ticker and, by essentially every liquidity, market capitalization, hash rate, and developer-activity measure, the dominant continuation) proponents** argued that a large, direct block size increase would meaningfully raise the resource cost of running a full node, reducing how many people could realistically do so and concentrating practical influence over the network among fewer, larger operators — a decentralization cost they judged as outweighing the throughput benefit, especially given Layer 2 approaches (specifically the Lightning Network, then in active development) offered a path to much higher effective throughput without that specific tradeoff.

## The technical and economic outcome

Both chains continued operating independently after the split, sharing their full transaction and balance history up to the fork point (anyone holding bitcoin before the split held an equal balance of both BTC and BCH immediately after, a direct mechanical consequence of a hard fork preserving pre-split history on both branches) and diverging entirely from that point forward. In the years since, Bitcoin (BTC) has maintained a substantially larger market capitalization, hash rate, developer ecosystem, and general adoption than Bitcoin Cash (BCH) by essentially every commonly cited metric — a documented, measurable outcome, though this book does not treat market size alone as a definitive verdict on which chain's underlying technical or philosophical arguments were "correct," since market outcomes and technical merit are related but distinct questions.

## Bitcoin Cash's own subsequent history

Bitcoin Cash itself later experienced its own significant internal governance dispute, resulting in a further split in November 2018 that produced **Bitcoin SV**, covered in the next chapter — a reminder that the underlying disagreement about scaling philosophy, decision-making authority, and project direction that produced the original 2017 split did not fully resolve within the new chain either; it recurred in a different form.

## Common misconceptions

**Bitcoin Cash is not "fake Bitcoin" or a scam in any technical sense** — it is a legitimate, functioning hard fork implementing its own, internally consistent set of consensus rules, maintained by its own developer community, and this book does not adopt language from either side's more dismissive characterizations of the other.

**Holding bitcoin before August 1, 2017 did not require any action to "receive" the equivalent Bitcoin Cash balance** at the fork itself — anyone controlling the relevant private keys automatically controlled the equivalent balance on both resulting chains, though accessing and safely handling both chains' coins in practice required wallet software supporting the split correctly, and carried its own, separate technical risks (particularly around transaction replay between the two chains) that this book does not cover in operational detail.

## Further reading

- [Bitcoin ABC](https://www.bitcoinabc.org/) — the primary client implementation
- [Bitcoin.com's contemporary coverage of the 2017 split](https://www.bitcoin.com/) — TODO: link a specific, dated, primary contemporary article rather than the general site before publication

---

[← Previous: User-Activated Soft Forks](./uasf.md)
·
[Back to Forks and Protocol Upgrades](./README.md)
·
[Next: Bitcoin SV →](./bitcoin-sv.md)
