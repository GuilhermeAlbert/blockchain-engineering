# Stock-to-Flow

Stock-to-flow is a valuation model, popularized in the Bitcoin community starting in 2019 by a pseudonymous analyst known as "PlanB," that attempts to relate Bitcoin's price to its issuance schedule. This chapter covers what the model actually claims, why it attracted so much attention, and the substantive, methodological criticisms that have led many economists and quantitative analysts — including some within the Bitcoin community — to treat it as unreliable. This is a case where presenting "both sides" without weighing the evidence would misrepresent the actual state of the debate; this chapter says so directly.

## The core concept

**Stock-to-flow (S2F)** is a ratio: the existing stock of an asset (total amount already in existence) divided by its flow (new production per year). A higher stock-to-flow ratio means new production adds a smaller percentage to the existing supply — the same underlying idea as the annual inflation rate discussed in [Issuance Schedule](./issuance.md), just expressed as a ratio (stock/flow) rather than a percentage (flow/stock — literally the reciprocal relationship). Stock-to-flow is a longstanding concept in commodity economics, historically used to explain why gold, with a very high stock-to-flow ratio (a large existing stock relative to modest annual mining output), has functioned well as a store of value compared to commodities with low stock-to-flow ratios (like most industrial or agricultural commodities, where annual production is large relative to existing stockpiles, making them more vulnerable to price swings from production changes).

## PlanB's specific model

PlanB's model, published in a March 2019 article, proposed a specific mathematical relationship — fitting a power-law regression between Bitcoin's historical stock-to-flow ratio (which rises in discrete steps at each halving) and its historical price — and used this fitted relationship to project future price levels following subsequent halvings, generating specific, quantitative price predictions that received significant attention and discussion within the Bitcoin community and financial media through 2020 and 2021.

## The methodological criticisms

Several substantive, specific criticisms have been raised, primarily by economists and quantitative researchers, including some prominent figures within the broader Bitcoin research community itself:

- **Spurious correlation with time.** Critics, including a widely discussed 2019 critique by Bitcoin researcher Nic Carter and others in subsequent analyses, pointed out that because Bitcoin's stock-to-flow ratio and Bitcoin's price have both, historically, generally trended upward over time, a regression between the two can produce a seemingly strong statistical fit largely because *both* variables are correlated with time itself, rather than because stock-to-flow is genuinely driving price — a well-known statistical pitfall (spurious correlation between two independently trending time series) that doesn't, on its own, establish any causal or even reliably predictive relationship.
- **No account for demand.** The model relates price purely to the supply side (stock-to-flow), with no term representing demand at all — yet basic economic reasoning (see [What Is Money?](../economics/money.md)) holds that price is determined by the interaction of supply *and* demand; a model that omits demand entirely, critics argue, cannot be a complete or reliable explanation of price, even if it happens to fit historical data reasonably well over some specific, limited window.
- **Failure to hold up out-of-sample.** Following the model's period of greatest attention, Bitcoin's actual price action in 2021-2023 diverged substantially and for a sustained period from the levels the stock-to-flow model had projected, which many analysts — including some who had previously found the model's historical fit interesting — treated as a meaningful empirical failure of the model's predictive claims, not merely normal, expected volatility around a correct trend.

## Where this leaves the model

Stock-to-flow remains a real, historically-grounded *concept* in commodity economics generally, and Bitcoin's stock-to-flow ratio is a real, computable, meaningful number reflecting its issuance schedule (directly related to the material already covered in [Issuance Schedule](./issuance.md)). PlanB's *specific predictive price model* built on top of that concept, however, is treated with substantial, well-documented skepticism by economists and quantitative researchers, for the specific, stated reasons above — this is closer to expert consensus than an unresolved, evenly balanced debate, and this book presents it accordingly rather than as a neutral "some say, others say" framing that would understate how thoroughly and specifically the predictive model has been challenged.

## Common misconceptions

**Stock-to-flow as a general economic concept and PlanB's specific 2019 price-prediction model are not the same thing**, and criticism of the latter doesn't invalidate the former — the ratio itself is a legitimate, standard way to compare a monetary asset's existing supply against its production rate; what's specifically disputed is whether a simple regression against historical price reliably predicts future price.

**A model's historical fit to past data is not, by itself, evidence that it will predict future data reliably** — this is a general statistical principle (related to the risk of overfitting), not a criticism unique to stock-to-flow, and it's why the model's actual subsequent, out-of-sample performance (which diverged from its projections) is the more relevant test than how well it appeared to fit data available before those projections were made.

## Further reading

- PlanB, "Modeling Bitcoin's Value with Scarcity," Medium, March 2019 (the original model) — TODO: verify the exact current URL before publication, as the author's Medium handle/URL structure may have changed since 2019
- [Nic Carter, "The Bitcoin Stock-to-Flow Model Is Fundamentally Flawed"](https://www.coindesk.com/markets/2020/06/30/why-the-stock-to-flow-bitcoin-valuation-model-is-wrong), CoinDesk, 2020

---

[← Previous: Issuance Schedule](./issuance.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Lost Coins →](./lost-coins.md)
