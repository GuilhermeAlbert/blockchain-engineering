# Functions of Money

Economists define money by what it does, not what it is made of. This chapter covers the three functions most textbooks agree on, plus a fourth some add, and shows why separating them matters: a good can perform one or two of these functions well while performing others poorly, and Bitcoin is a useful test case precisely because critics and advocates disagree about which functions it currently performs.

## Medium of exchange

A medium of exchange is anything widely accepted in trade for goods and services, used specifically to avoid the double coincidence of wants problem described in [What Is Money?](./money.md). This is usually treated as money's most fundamental function, because the other functions tend to follow from something already being widely used in exchange.

For a good to work as a medium of exchange, it needs to be accepted by a large enough share of a community that holding it is useful. A good nobody else will accept is not a medium of exchange no matter how durable or scarce it is. This is a **network effect**: the value of a medium of exchange to any one user increases as more other users accept it (see [Network Effects in Money](./network-effects.md)).

## Unit of account

A unit of account is the standard used to measure and compare the value of different goods and debts. The "yardstick" function. Prices, contracts, wages, and debts are denominated in a unit of account. This function can, in principle, be separated from the medium of exchange function: prices could theoretically be quoted in one unit (say, gold) while actual payment happens in another (say, banknotes convertible to gold), and in some economies with severe currency instability, prices are informally quoted in a stable foreign currency (US dollars, for instance) while payment happens in the local, unstable currency, a real-world case of the unit-of-account function separating from the medium-of-exchange function.

A good unit of account needs **stability**, not just acceptance: if the yardstick itself keeps changing length, it becomes hard to write long-term contracts, compare prices over time, or do the basic accounting a business needs to track whether it is profitable. This is the function most frequently cited as Bitcoin's weakest, because of price volatility (see [Volatility and Monetary Adoption](./volatility.md)). A good can be widely accepted in trade while still being a poor yardstick, if its value relative to everyday goods swings sharply over short periods.

## Store of value

A store of value is something that can be saved, retrieved, and exchanged in the future without significant loss of purchasing power in the meantime. This is the function most directly threatened by inflation: if a currency loses purchasing power quickly, holding it as savings becomes costly, and people shift savings into other assets (foreign currency, real estate, commodities, equities) that they expect to hold value better, even if those assets are less convenient as a medium of exchange.

Store of value and medium of exchange can pull in different directions. An asset that is expected to *appreciate* in value gives holders an incentive to hold rather than spend it, an argument frequently made both for and against Bitcoin (see [Bitcoin as Money](./bitcoin-as-money.md) and [Deflationary Money](./deflationary-money.md)), since an asset people prefer to hold is, by the same logic, an asset people are more reluctant to spend on everyday purchases.

## Standard of deferred payment

Some economists (following a tradition in monetary theory dating to at least the 19th century) add a fourth function: a standard of deferred payment, meaning the unit in which debts and future obligations are specified and eventually settled. A mortgage, a bond, or an employment contract paying a salary in twelve months' time all rely on money serving this function. This function overlaps heavily with unit of account and is sometimes treated as a special case of it rather than a fully separate function. This book notes the distinction because debt contracts specifically require confidence that the currency will still be usable, and in a predictable quantity relative to today, at the future date of repayment, which is a slightly different requirement than simply pricing goods for sale today.

## Why separating the functions matters for this book

When later chapters ask "is Bitcoin money?", a precise answer requires asking the question function by function rather than as a single yes-or-no judgment:

| Function | What it requires | Where this book covers Bitcoin's case |
| --- | --- | --- |
| Medium of exchange | Wide acceptance, low transaction friction | [Bitcoin as Money](./bitcoin-as-money.md), [Lightning Network](../lightning/README.md) |
| Unit of account | Price stability | [Volatility and Monetary Adoption](./volatility.md) |
| Store of value | Predictable future purchasing power | [Deflationary Money](./deflationary-money.md), [Bitcoin as Money](./bitcoin-as-money.md) |
| Standard of deferred payment | Confidence in future contract settlement | [Bitcoin as Money](./bitcoin-as-money.md) |

A currency does not need to score perfectly on every function to be economically significant, historically, gold functioned well as a store of value and unit of account for centuries while being relatively impractical as a day-to-day medium of exchange for small purchases, which is part of why gold-backed paper notes and coins (see [Commodity Money](./commodity-money.md)) developed alongside it.

## Common misconceptions

**"Money" and "currency that is legal tender" are not synonyms in economic analysis.** Legal tender status (a government requirement that a currency must be accepted for debts) is a legal fact about one specific currency, not a requirement for something to perform monetary functions. Cigarettes functioned as a medium of exchange, unit of account, and store of value in WWII prisoner-of-war camps (documented in R.A. Radford's 1945 paper "The Economic Organisation of a P.O.W. Camp") with no legal tender status at all.

**Performing one monetary function does not automatically mean performing all three.** Gift cards are a widely accepted, narrow medium of exchange (at a specific retailer) but are a poor store of value (fixed nominal amount, no interest, risk of retailer bankruptcy) and are not really a general unit of account.

## Further reading

- [The Economic Organisation of a P.O.W. Camp](https://www.jstor.org/stable/2550133): R.A. Radford, Economica, 1945
- [On the Origin of Money](https://mises.org/library/origin-money): Carl Menger, 1892

---

[← Previous: What Is Money?](./money.md)
·
[Back to Economics](./README.md)
·
[Next: Commodity Money →](./commodity-money.md)
