# Early Bitcoin History

Between the whitepaper's publication in October 2008 and Satoshi's last known correspondence in April 2011, Bitcoin went from a nine-page proposal to a running network with independent developers, exchanges, and a market price. This chapter covers that stretch (the first release, the first transaction, the earliest mining and development activity, and Satoshi's departure) as documented history, distinct from the design questions covered in [The Bitcoin Whitepaper](./bitcoin-whitepaper.md) and the identity questions covered in [Who Was Satoshi Nakamoto?](./satoshi.md).

## Bitcoin v0.1

Satoshi released the first version of the Bitcoin software, v0.1.0, on **January 9, 2009**, announcing it on the Cryptography mailing list with a link to download the client and the whitepaper. The announcement described the software plainly:

> "The root problem with conventional currency is all the trust that's required to make it work. [...] Bitcoin's solution is to use a peer-to-peer network to check for double-spending."
> Satoshi Nakamoto, [Cryptography mailing list](https://www.metzdowd.com/pipermail/cryptography/2009-January/015010.html), January 9, 2009

The initial reception on the list was mixed and, in places, openly skeptical. Cryptographer James A. Donald responded early in the thread expressing doubt that the system could scale to a large, un-trusted, and rapidly growing peer-to-peer network without central coordination, a fair technical concern at the time, since no system of this kind had been deployed and proven at scale before. Satoshi responded to specific technical objections in detail over the following weeks, a pattern of engagement that continued as more early adopters joined.

## The first Bitcoin transaction

[Hal Finney](./cypherpunks.md#members-who-matter-to-this-books-story) downloaded the client on release day, January 9, 2009, becoming (based on the public record) the second person to run Bitcoin software after Satoshi. Finney has described, in a 2013 Bitcoin Talk forum post written after his ALS diagnosis had progressed, running the client and mining blocks with Satoshi in Bitcoin's earliest days, noting the CPU-only mining of that period made it feasible for an ordinary computer to find blocks.

On **January 12, 2009**, Satoshi sent Finney **10 BTC** in the transaction recorded in **block 170**, the first Bitcoin transaction between two distinct parties, as opposed to a coinbase reward paid to the miner who found the block. This transaction is often cited as proof that Bitcoin's peer-to-peer transfer mechanism worked as designed, independent of the mining process itself.

## Early mining

For roughly the first year, Bitcoin mining ran on ordinary CPUs using code built into the reference client. With few participants, difficulty (see [Mining Difficulty](../bitcoin/difficulty.md)) stayed at or near its protocol minimum for months. Researcher Sergio Demian Lerner identified a recurring pattern in early block nonces and timestamps, often called the "Patoshi pattern," that is consistent with one miner producing a large share of early blocks. The pattern is an inference from public chain data, not proof of the miner's identity. See Lerner's [original analysis](https://bitslog.com/2013/04/17/the-well-deserved-fortune-of-satoshi-nakamoto/).

## Early development

Development quickly became a small, collaborative effort beyond Satoshi alone:

- **Martti Malmi (sirius-m)**, a Finnish developer, began contributing to the codebase and to early promotional and organizational work (including registering bitcoin.org's early hosting arrangements and running the bitcointalk.org forum) starting in 2009, corresponding extensively and directly with Satoshi by email.
- **Gavin Andresen** began contributing code in 2010 and became the developer Satoshi handed primary project leadership to as Satoshi withdrew from public involvement, including, over the following months, the SourceForge code repository's commit access and the network alert key (a mechanism, since retired, that let a trusted key broadcast urgent warnings to nodes).
- The project's code repository moved from SourceForge to a dedicated **bitcointalk.org** forum community and, later, to GitHub, as the number of contributors grew past what informal email coordination could support.

## Satoshi's departure

Satoshi's public involvement wound down over late 2010 and early 2011, documented through a specific, dated sequence rather than a single announcement:

- **December 11, 2010**: Satoshi posted on the bitcointalk.org forum expressing concern about WikiLeaks' interest in accepting Bitcoin donations, writing: "It would have been nice to get this attention in any other context. WikiLeaks has kicked the hornet's nest, and the swarm is headed towards us."
- **December 12, 2010**: Satoshi's last known public forum post, discussing a denial-of-service related code change with other developers.
- **Late 2010 through early 2011**: control of the source code repository and the network alert key passed to Gavin Andresen and other early contributors, gradually rather than in one transfer.
- **April 23, 2011**: Satoshi's last known email, sent to developer Mike Hearn, stated Satoshi had "moved on to other things" and that Bitcoin was "in good hands" with Andresen and the growing developer community.

No confirmed communication from Satoshi's known accounts or signing keys has surfaced since. Andresen has described, in public talks and interviews, being asked by Satoshi not to portray him or the project as having a single controlling leader going forward, consistent with the project's subsequent development as a loosely coordinated, multi-contributor effort rather than one led by a founder, a structure examined in [Bitcoin Governance](../governance/bitcoin.md).

## Why this history matters for understanding Bitcoin today

Two structural consequences of this early period persist in how Bitcoin works now. First, because Satoshi left no successor with special authority, Bitcoin's ongoing development runs through a rough-consensus process among independent contributors and node operators rather than a company or foundation with the power to unilaterally change the protocol, see [Bitcoin Governance](../forks/governance.md) and [Governance](../governance/README.md). Second, because Satoshi's known coins have never moved, the largest single identified holder of bitcoin (by the on-chain analysis discussed above) has, as a practical matter, never participated in the market, a fact sometimes cited in discussions of Bitcoin's realistic circulating supply and ownership concentration (see [21 Million BTC](../bitcoin/21-million.md)).

## Common misconceptions

**Bitcoin was not immediately valuable or widely used in 2009–2010.** For its first year, bitcoins had no established market price; the first widely cited real-world purchase using bitcoin (10,000 BTC for two pizzas, arranged by developer Laszlo Hanyecz in May 2010) is frequently cited specifically because it was novel at the time, not because Bitcoin was already in common commercial use.

**"Satoshi disappeared" understates how gradual and documented the departure was.** The public record shows a multi-month handoff of specific technical responsibilities (repository access, the alert key) to named individuals, not a sudden vanishing.

## Further reading

- [Cryptography mailing list, January 2009 release announcement](https://www.metzdowd.com/pipermail/cryptography/2009-January/015010.html)
- [Satoshi Nakamoto Institute, Satoshi's writings archive](https://nakamotoinstitute.org/satoshi-archive/)
- [Bitcointalk.org forum archives](https://bitcointalk.org/index.php?topic=13.0): original announcement thread
- [Hal Finney's 2013 "Bitcoin and Me" forum post](https://bitcointalk.org/index.php?topic=155054.0)

---

[← Previous: The Genesis Block](./genesis-block.md)
·
[Back to Origins](./README.md)
·
[Next: Money and Economics →](../economics/README.md)
