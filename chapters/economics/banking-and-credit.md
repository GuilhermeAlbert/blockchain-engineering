# Banking and Credit

Most of the money in a modern economy is not currency issued by a central bank. It is bank deposits, created by commercial banks in the act of lending. This chapter explains that process concretely, because it is widely misunderstood even by people who use banks daily, and because it underlies later arguments about inflation, monetary policy, and what Bitcoin does and does not change about how credit works.

## The problem banking solves

Savers generally want to hold money safely and access it on short notice. Borrowers (businesses building factories, individuals buying homes) generally want to commit capital for years. A bank sits between these two mismatched needs: it accepts short-term, easily withdrawable deposits and makes long-term loans, profiting from the difference between what it pays depositors and what it charges borrowers. This transformation (turning short-term, liquid liabilities into long-term, illiquid assets) is called **maturity transformation**, and it is the economic function banks perform beyond simply storing money.

## How fractional reserve banking works

A bank does not hold 100% of its deposits in reserve, ready to be withdrawn at any moment. It holds a fraction (historically set by reserve requirements, though many modern central banks, including the US Federal Reserve since 2020, have reduced or eliminated formal reserve requirements in favor of other regulatory tools) and lends out the rest.

Here is the mechanism concretely, in the traditional "money multiplier" description found in most introductory textbooks:

```text
Alice deposits $1,000 in Bank A.
Bank A keeps $100 in reserve (10% reserve ratio) and lends $900 to Bob.
Bob deposits that $900 in Bank B.
Bank B keeps $90 in reserve and lends $810 to Carol.
Carol deposits that $810 in Bank C.
   ... and so on.
```

Alice's original $1,000 deposit, through repeated lending, can support total deposits across the banking system approaching $10,000 (in the limit, under a 10% reserve ratio, following the geometric series 1,000 × (1/0.10)). This is the origin of the term **fractional reserve banking**: reserves are a fraction of deposits, not the full amount.

### A more accurate modern description: loans create deposits

Central banks, including the Bank of England in a widely cited 2014 paper, have clarified that the simple "multiplier" story above, while a useful first approximation, does not describe how individual lending decisions actually happen day to day. In practice, when a bank approves a loan, it typically creates a new deposit in the borrower's account directly, as a matching bookkeeping entry. The loan is a new asset on the bank's balance sheet, and the deposit it creates is a new liability, and both entries are created in the same transaction, not sourced from a pre-existing pool of depositors' money waiting to be lent out. The bank then manages its reserve position afterward, borrowing reserves from other banks or the central bank if needed to meet regulatory and settlement requirements. Either description arrives at the same conclusion relevant to this book: **new bank lending expands the money supply**, and this expansion happens through ordinary commercial lending decisions, not only through central bank action.

> "Rather than banks receiving deposits when households save and then lending them out, bank lending creates deposits. [...] The reality of how money is created today differs from the description found in some economics textbooks."
> Bank of England, [Money Creation in the Modern Economy](https://www.bankofengland.co.uk/-/media/boe/files/quarterly-bulletin/2014/money-creation-in-the-modern-economy.pdf), 2014

## Why this matters for later chapters

This mechanism is the practical link between [Banking and Credit] and [Money Supply](./money-supply.md): most of what economists count as "money" in a modern economy is bank-created deposits, not central-bank-issued cash. It is also the starting point for Austrian-school criticism of fractional reserve banking, discussed in depth in [Ludwig von Mises and Monetary Theory](./mises.md) and [Murray Rothbard and Sound Money](./rothbard.md), which argues that credit expansion beyond what savers have actually chosen to defer consuming distorts interest rates and investment decisions, contributing to boom-and-bust cycles (the **Austrian business cycle theory**).

## Tradeoffs

**What fractional reserve banking gains:** it lets savings be productively deployed as long-term investment capital rather than sitting idle, and it is the mechanism that funds most business investment, mortgages, and infrastructure in modern economies.

**What it gives up:** a bank that has lent out most of its deposits cannot honor a sudden, simultaneous demand from many depositors to withdraw their funds at once. A **bank run**. This is not a hypothetical: bank runs have recurred throughout banking history, from 19th-century panics to the 2008 collapse of Northern Rock in the UK (the first UK bank run in over 140 years) to the 2023 collapse of Silicon Valley Bank in the US. Deposit insurance (such as the FDIC in the United States, established in 1933) and central bank lender-of-last-resort facilities exist specifically to prevent bank runs from cascading into full banking-system collapses, at the cost of introducing the public backstops and associated regulation discussed in [Central Banking](./central-banking.md).

## Common misconceptions

**Banks do not simply re-lend money that other people deposited, waiting in a vault.** The bookkeeping mechanics of most modern lending create new deposits at the moment a loan is issued, as described in the Bank of England's own account above. This is a documented feature of how banking actually operates, not a simplification for beginners.

**"Money supply" is not the same as "physical cash in circulation."** Cash (banknotes and coins) is typically a small fraction of the total money supply in a developed economy; the overwhelming majority exists as bank deposits. See [Money Supply](./money-supply.md).

## Further reading

- [Money Creation in the Modern Economy](https://www.bankofengland.co.uk/-/media/boe/files/quarterly-bulletin/2014/money-creation-in-the-modern-economy.pdf): Bank of England Quarterly Bulletin, 2014
- [What Has Government Done to Our Money?](https://mises.org/library/what-has-government-done-our-money): Murray Rothbard, 1963, Part III covers fractional reserve banking's history and Austrian critique

---

[← Previous: Fiat Money](./fiat-money.md)
·
[Back to Economics](./README.md)
·
[Next: Inflation and Deflation →](./inflation-and-deflation.md)
