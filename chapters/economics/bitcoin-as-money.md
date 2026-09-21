# Bitcoin as Money

Having covered what money is, what functions it performs, and the main historical forms it has taken, this chapter asks the question directly: does Bitcoin function as money? The honest answer, using the framework from [Functions of Money](./functions-of-money.md), is function-by-function and non-binary. Bitcoin performs some monetary functions reasonably well, performs others weakly by mainstream standards, and the balance has shifted meaningfully since 2009.

## Medium of exchange

Bitcoin can be transferred peer-to-peer without a financial institution's involvement, which is its foundational technical achievement (see [Origins](../origins/README.md)). As an everyday medium of exchange for ordinary retail purchases, however, base-layer Bitcoin has real practical limits: block space is scarce (see [The Scaling Problem](../bitcoin-scaling/README.md)), which means transaction fees can rise sharply during periods of high demand, and confirmation times (roughly ten minutes per block, with multiple confirmations often recommended for larger payments, see [Transaction Confirmation](../bitcoin/confirmation.md)) are slow relative to a card swipe.

The [Lightning Network](../lightning/README.md) was built specifically to address this gap, enabling near-instant, low-fee Bitcoin payments through payment channels rather than on-chain transactions for every purchase. Merchant acceptance of Bitcoin, directly or through payment processors that convert to fiat at the point of sale, has grown since 2009 but remains a small fraction of overall retail commerce in most economies; several early corporate adopters (Microsoft, Overstock, and others) have added and in some cases later restricted direct Bitcoin payment acceptance over the years, reflecting fluctuating merchant interest tied partly to price volatility and processing complexity.

## Unit of account

This is Bitcoin's weakest function by conventional measures. Prices for goods and services are overwhelmingly quoted in national fiat currencies worldwide, even in jurisdictions with meaningful Bitcoin adoption; merchants that accept Bitcoin typically price in the local fiat currency and convert at the point of sale, rather than setting native Bitcoin-denominated prices. This is a direct consequence of the volatility discussed in [Volatility and Monetary Adoption](./volatility.md). A good unit of account requires short-term price stability, and Bitcoin's price has historically moved by double-digit percentages within single weeks on multiple occasions, making native Bitcoin pricing impractical for most ordinary commerce.

## Store of value

This is the function most emphasized by Bitcoin advocates and is where the strongest empirical case exists: Bitcoin's fixed supply (see [21 Million BTC](../bitcoin/21-million.md)) and its long-term price trajectory since 2009 have led a growing number of individuals and, more recently, some institutional investors and corporate treasuries to hold Bitcoin explicitly as a long-term savings vehicle, often described using the analogy "digital gold." This use case does not require Bitcoin to function well as a medium of exchange or unit of account simultaneously. Gold itself has historically functioned primarily as a store of value while being relatively impractical for everyday transactions (see [Commodity Money](./commodity-money.md)). Critics counter that Bitcoin's price history, while trending upward over its full history, has also included severe, multi-year drawdowns (over 80% peak-to-trough on more than one occasion, including 2013–2015 and 2021–2022), which is a volatility profile very different from traditional stores of value like gold or investment-grade bonds, and that the store-of-value case rests significantly on continued future adoption rather than an established, decades-long track record.

## What determines the answer

Whether Bitcoin "is money" is not resolvable as a single yes-or-no fact. It depends on which function you're asking about, which population of users you're asking about (a Bitcoin holder in a country with a stable fiat currency uses it very differently than someone in a country experiencing hyperinflation or capital controls, see [Bitcoin and Monetary Sovereignty](./monetary-sovereignty.md)), and over what time horizon. This book treats the question as an open, evolving empirical one rather than a matter of ideological commitment, and presents the strongest documented case on each side in the relevant linked chapters rather than declaring a verdict here.

| Function | Strength today | Primary limiting factor |
| --- | --- | --- |
| Medium of exchange | Weak-to-moderate, improving via Layer 2 | Fees and confirmation time on the base layer |
| Unit of account | Weak | Price volatility |
| Store of value | Contested, strongest advocate case | Historical volatility and shorter track record than gold |

## Common misconceptions

**"Bitcoin failed as money" and "Bitcoin succeeded as money" are both oversimplifications** of a more nuanced, function-specific and population-specific reality described above.

**Bitcoin's monetary role is not static.** The balance across these three functions in 2009, 2017, and today differs meaningfully as infrastructure (exchanges, custody, Lightning, regulatory clarity in some jurisdictions) and market conditions have evolved; claims about "what Bitcoin is" should specify a time frame.

## Further reading

- [Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf): Satoshi Nakamoto, for the originally intended use case
- See also: [Critiques of Bitcoin as Money](./bitcoin-criticism.md) and [Austrian Economics and Bitcoin](./austrian-economics-and-bitcoin.md)

---

[← Previous: Network Effects in Money](./network-effects.md)
·
[Back to Economics](./README.md)
·
[Next: Carl Menger and the Origin of Money →](./menger.md)
