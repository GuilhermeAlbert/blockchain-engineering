# What Is Money?

Before asking why Bitcoin exists, it helps to ask a more basic question: why does money exist at all? This chapter covers the economic problem money solves and the two competing accounts of where money comes from — one that treats it as a spontaneous market outcome, and one that treats it as a creation of the state. Both matter for understanding later arguments about Bitcoin's monetary properties.

## The problem: barter is inefficient

Imagine an economy with no money, where all exchange happens by trading goods directly for other goods. A farmer with surplus wheat who wants shoes has to find a shoemaker who happens to want wheat, at the same time, in the right quantities. Economists call this requirement the **double coincidence of wants**: each party must want exactly what the other has to offer, at the same time and place.

As an economy specializes — different people producing different things, which is what makes an economy productive in the first place — the double coincidence of wants becomes a serious bottleneck. A carpenter who wants medical care has to find a doctor who wants furniture, which is unlikely. In practice, barter economies develop workarounds: a general-purpose commodity that most people are willing to accept, not because they want to consume it directly, but because they expect to be able to trade it again later for something they do want.

That commodity, once enough people converge on accepting it, is money. Money's defining function is that it lets a two-step trade (sell what you have for money, then buy what you want with money) replace a much harder simultaneous trade (find someone who has what you want and wants what you have).

## Two accounts of how money emerges

### The spontaneous-order account (Menger)

Austrian economist Carl Menger argued in the 1870s and 1880s that money did not need to be invented or decreed by any authority. It could emerge from decentralized, self-interested behavior, as traders individually noticed that some goods were easier to resell than others and began favoring them, not because they wanted to hold those goods, but because holding them made future trades easier. As more people did this, those goods became progressively easier to trade, reinforcing the pattern until one or a few commodities became the accepted medium of exchange across the whole community. This is covered in depth in [Carl Menger and the Origin of Money](./menger.md).

This account treats money as an **emergent institution** — nobody designed it, but it arose from many individuals independently solving the same coordination problem in a compatible way, similar to how a language or a system of weights and measures can develop without central design.

### The state theory of money (chartalism)

A different tradition, associated with economist Georg Friedrich Knapp's 1905 work *The State Theory of Money* and revived in modern form by Modern Monetary Theory (see [Modern Monetary Theory](./mmt.md)), argues that money's origin and continued function depend on the state: specifically, that a government can create demand for a currency by requiring taxes to be paid in it, and that historically many monetary systems (including the origins of coinage in the ancient world, where coins are closely tied to state minting and taxation) show government, not spontaneous market behavior, driving adoption.

These two accounts are not necessarily describing the same historical events. Anthropological and historical evidence supports both spontaneous, market-driven monetization of commodities like cattle, salt, and metals in some contexts, and state-driven adoption of specific coinages in others. This book does not treat one account as settled; both are covered on their own terms, with their own primary sources, in later chapters.

## What makes a good "moneyness"

Whichever account of origin you find more persuasive, economists broadly agree on the properties that make something function well as money, because these properties explain why some commodities (gold, silver, cattle, cowrie shells, cigarettes in POW camps) have historically won out over others as money in a given context:

- **Durability** — it must not decay or degrade if held for a long time.
- **Divisibility** — it must be splittable into smaller units for transactions of different sizes.
- **Portability** — it must be easy to carry and transport relative to its value.
- **Fungibility** — one unit must be interchangeable with another unit of the same denomination.
- **Scarcity** — its supply must be limited enough that it can't be trivially reproduced, or its value as a medium of exchange collapses.
- **Recognizability / verifiability** — people must be able to quickly confirm it is genuine.

No real-world money has ever scored perfectly on all of these. Cattle are recognizable and hard to counterfeit but fail badly on divisibility and portability. Gold is durable, divisible (in principle), and scarce, but is heavy and hard to verify purity without specialized equipment. Paper currency is portable and divisible but requires trust in an issuer to remain scarce. These tradeoffs are the throughline connecting [Commodity Money](./commodity-money.md), [Fiat Money](./fiat-money.md), and, later in this book, [Bitcoin as Money](./bitcoin-as-money.md) — Bitcoin is best understood as a new point in this same tradeoff space, not an exemption from it.

## The three (or four) functions economists attribute to money

Money is usually defined not by what it is physically, but by what it does. The next chapter, [Functions of Money](./functions-of-money.md), covers this in depth: **medium of exchange**, **unit of account**, and **store of value**, sometimes with a fourth function, **standard of deferred payment**, added separately. A good is not fully "money" in the economic sense unless it performs most or all of these functions for a community, which is why economists debate whether specific goods — including, in modern discussion, Bitcoin — qualify as money, partial money, or something else (a commodity, a speculative asset) that performs only some of these functions.

## Common misconceptions

**Money is not the same thing as currency.** Currency refers to the specific physical or digital tokens issued by a particular authority (US dollars, euros, bitcoin). Money is the broader economic function those tokens can perform. Many things have served as money historically — cattle, salt, shells, tobacco, metal coins, paper notes, ledger entries — without being "currency" in the modern, state-issued sense.

**Money did not require government to exist as a concept**, even though most money in daily use today is government-issued. The historical and theoretical case for money predating organized states is a live, sourced argument (see [Carl Menger and the Origin of Money](./menger.md)), not a settled fact, and this book presents it as such.

## Further reading

- [On the Origin of Money](https://mises.org/library/origin-money) — Carl Menger, 1892 (Economic Journal)
- [The State Theory of Money](https://archive.org/details/statetheoryofmon00knapuoft) — Georg Friedrich Knapp, 1905 (English translation, 1924)
- Karl Polanyi, *The Great Transformation* (1944), for an anthropological counter-perspective on markets and money's social origins — TODO: add a direct primary-source link or citation with page numbers

---

[← Previous: Early Bitcoin History](../origins/early-bitcoin.md)
·
[Back to Economics](./README.md)
·
[Next: Functions of Money →](./functions-of-money.md)
