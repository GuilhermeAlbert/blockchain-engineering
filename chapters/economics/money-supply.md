# Money Supply

"The money supply" sounds like it should refer to a single, obvious number, how much money exists. In practice, economists track several different measures, because "money" itself is a matter of degree: some assets (physical cash) are immediately spendable, while others (a savings account, a money market fund) are spendable only after a small delay or conversion step. This chapter defines the standard measures and explains why the distinctions matter for the inflation and central-banking debates covered elsewhere in this section.

## The standard measures

Central banks and economists generally organize the money supply into tiers based on **liquidity**, how quickly and easily an asset can be converted into cash without loss of value:

- **M0 (monetary base)**: physical currency in circulation plus commercial banks' reserves held at the central bank. This is the narrowest measure and the one most directly under a central bank's control.
- **M1**: M0's currency-in-circulation component, plus demand deposits (ordinary checking accounts) and other funds that can be withdrawn on demand without penalty. This is the most common approximation of "money readily available for spending."
- **M2**: M1 plus savings accounts, small time deposits (such as certificates of deposit below a threshold), and retail money market fund shares. Slightly less liquid than M1, but still convertible to spendable form quickly and with minimal friction.
- **M3** (used by some central banks, discontinued by the US Federal Reserve in 2006), M2 plus larger time deposits and institutional money market funds, capturing a broader, less liquid definition of money-like assets.

Different countries' central banks define these tiers with slightly different specific thresholds and included instruments, so comparing, say, US M2 directly to eurozone M2 requires care about exactly what each institution counts.

## Why the distinction matters

The choice of which measure to watch affects how you'd interpret claims like "the money supply grew by 25% during the pandemic." Much of the dramatic increase in US M2 during 2020–2021 came from a combination of Federal Reserve asset purchases (which directly expand bank reserves, part of M0) and a surge in bank lending and government stimulus payments flowing into checking and savings accounts (expanding M1 and M2). Economists across different schools broadly agreed the expansion was historically large; where they disagreed was on how much of that expansion would translate into sustained inflation, given differing views on the relationship between money supply growth and price levels described in [Inflation and Deflation](./inflation-and-deflation.md).

## Velocity: the missing piece

The quantity theory of money, in its classic form, is often expressed as an identity:

```text
M × V = P × Y
```

Where `M` is the money supply, `V` is the **velocity of money** (how many times, on average, a unit of currency is spent in a given period), `P` is the price level, and `Y` is real economic output. This identity shows why money supply growth alone does not mechanically determine inflation: if velocity falls at the same time the money supply rises (as happened notably during 2020, when much of the pandemic-era monetary expansion sat in savings rather than being spent, due to lockdowns and precautionary saving) the inflationary effect of the expanded money supply can be muted or delayed. Monetarists (see [Monetarism](./monetarism.md)) historically assumed velocity was relatively stable and predictable, a assumption that came under significant empirical strain starting in the 1980s as financial innovation made velocity considerably more volatile than earlier monetarist models assumed.

## Bitcoin's money supply

Bitcoin's supply is fully specified by protocol rules, not measured after the fact through banking-system surveys: the total supply approaches, but never exceeds, 21 million bitcoin, following a fixed issuance schedule that halves roughly every four years (see [21 Million BTC](../bitcoin/21-million.md) and [The Halving](../bitcoin/halving.md)). This makes "the Bitcoin money supply" a fundamentally different kind of quantity than M1 or M2 for a fiat currency: it is not an emergent measurement of banking-system activity, but a number every full node can compute exactly and independently verify from the blockchain itself. Whether this kind of fully predetermined, non-elastic supply is an advantage or a liability is the subject of [Deflationary Money](./deflationary-money.md) and [Austrian Economics and Bitcoin](./austrian-economics-and-bitcoin.md).

## Common misconceptions

**"Printing money" is not a precise description of most modern money-supply growth.** As covered in [Banking and Credit](./banking-and-credit.md), the majority of money-supply expansion in a fiat system happens through commercial bank lending creating new deposits, not through a central bank issuing new physical currency.

**A rising money supply does not mechanically and immediately produce proportional inflation.** The `M × V = P × Y` identity shows at least three other variables (velocity, and real output growth) that also determine the price level's response to a change in the money supply.

## Further reading

- [Federal Reserve, Money Stock Measures (H.6 release)](https://www.federalreserve.gov/releases/h6/current/)
- [Money Creation in the Modern Economy](https://www.bankofengland.co.uk/-/media/boe/files/quarterly-bulletin/2014/money-creation-in-the-modern-economy.pdf): Bank of England, 2014

---

[← Previous: Monetary Policy](./monetary-policy.md)
·
[Back to Economics](./README.md)
·
[Next: The Cantillon Effect →](./cantillon-effect.md)
