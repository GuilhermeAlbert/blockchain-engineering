# Bitcoin SV

Bitcoin SV ("Satoshi Vision") split from **Bitcoin Cash**, not from Bitcoin directly, at **block 556,766** on **November 15, 2018**. This chapter covers that distinction precisely (it's a common source of confusion), what the specific dispute was about, and the unusual, publicly contentious mining competition that accompanied the split.

## Whose fork this actually is

This is worth stating clearly because it's frequently conflated: Bitcoin SV is a hard fork of **Bitcoin Cash (BCH)**, which was itself a hard fork of Bitcoin (BTC) in 2017 (see [Bitcoin Cash](./bitcoin-cash.md)). By the time of the Bitcoin SV split, Bitcoin Cash had its own separate development history, its own client implementations, and its own internal governance disagreements. The 2018 split is a continuation of that separate chain's story, not a second, direct split from Bitcoin itself.

## The dispute

By 2018, Bitcoin Cash's own developer and mining community had split into factions disagreeing about the chain's future direction, centering substantially on a proposed upgrade backed by **Bitcoin ABC** (the dominant Bitcoin Cash client, also central to the original 2017 Bitcoin Cash fork) that included specific new opcodes and features, versus an alternative vision backed by **nChain** (a company closely associated with Craig Wright) and mining pool operator Calvin Ayre, implemented through a competing client called **Bitcoin SV**, favoring a return to what its proponents characterized as Satoshi's original, unmodified protocol design, combined with a dramatically larger block size increase (Bitcoin SV blocks were designed to support gigabyte-scale sizes, far beyond both Bitcoin Cash's and Bitcoin's own limits at the time).

Craig Wright is the same individual discussed in [Who Was Satoshi Nakamoto?](../origins/satoshi.md#craig-steven-wright), whose claim to be Satoshi Nakamoto was rejected by a UK High Court ruling in March 2024, a ruling that postdates this 2018 split by several years, but is directly relevant context for evaluating "Satoshi Vision" branding's central claim. This book does not treat that branding as an accurate description of Satoshi's actual, documented intentions, consistent with the identity chapter's treatment of Wright's claim as rejected by the most legally definitive examination of the evidence to date.

## The "hash war"

Unlike the 2017 Bitcoin Cash split, which resolved into two chains operating independently with comparatively little direct conflict between them, the Bitcoin SV split was accompanied by what participants and media coverage at the time called a "hash war": both the Bitcoin ABC-aligned chain and the Bitcoin SV-aligned chain claimed to be the legitimate continuation of Bitcoin Cash, and each side directed substantial mining hash power specifically to try to produce a longer, heavier chain than the other, a direct, public application of the [fork choice](../blockchain/fork-choice.md) mechanism as a contested battleground, rather than the split simply being accepted by both sides as settled from the start. The conflict was costly for participants (substantial hash power was directed at this competition rather than ordinary, revenue-generating mining) and was eventually resolved by the two chains simply continuing to diverge as separate, independently tracked assets (Bitcoin Cash retaining the BCH ticker and, by most market and adoption measures, the larger of the two resulting chains, and Bitcoin SV continuing separately as BSV) rather than one chain being fully abandoned.

## Where things stand

Bitcoin SV has continued as an independently operated chain, maintaining its own developer community centered substantially around nChain, with the large-block, "restore the original protocol" philosophy remaining its central distinguishing claim relative to both Bitcoin and Bitcoin Cash. By market capitalization, adoption, and exchange support, Bitcoin SV has generally ranked well below both Bitcoin and Bitcoin Cash in the years since the split, a documented market outcome this book notes without treating as a conclusive technical judgment, consistent with the same caveat applied to the original Bitcoin/Bitcoin Cash split in the previous chapter.

## Common misconceptions

**Bitcoin SV is not a fork of Bitcoin (BTC) directly**, see the clarification at the top of this chapter; it shares its earliest history with Bitcoin only through Bitcoin Cash's own 2017 split from Bitcoin.

**"Satoshi Vision" in the project's name is a branding claim, not a documented, verified fact about Satoshi Nakamoto's actual intentions**. This book treats it as a claim, one further undermined by the UK court ruling on Craig Wright's Satoshi claim specifically, not as an established description of Satoshi's real design philosophy.

## Further reading

- [Crypto Open Patent Alliance v Craig Wright, UK High Court judgment, March 2024](https://www.judiciary.uk/wp-content/uploads/2024/05/Crypto-Open-Patent-Alliance-v-Wright-judgment-140524.pdf)
- See also: [Bitcoin Cash](./bitcoin-cash.md), [Who Was Satoshi Nakamoto?](../origins/satoshi.md)

---

[← Previous: Bitcoin Cash](./bitcoin-cash.md)
·
[Back to Forks and Protocol Upgrades](./README.md)
·
[Next: SegWit2x →](./segwit2x.md)
