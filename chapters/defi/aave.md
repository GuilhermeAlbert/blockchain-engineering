# Aave

Aave is one of the two dominant pooled lending protocols this section has referenced throughout (see [Lending](./lending.md)), and its own history is a useful case study in how a protocol's core mechanism can stay stable while its product model changes substantially around it.

## From ETHLend to Aave: a pivot from peer-to-peer to pooled

The protocol now known as Aave began in 2017 as ETHLend, founded by Stani Kulechov, a peer-to-peer lending platform that matched individual lenders directly with individual borrowers, funded through an initial coin offering that raised roughly $16.2 million. Peer-to-peer matching turned out to be a genuinely difficult product to make liquid and efficient on-chain: a lender's specific loan terms needed a specific, compatible borrower to actually execute, a much harder matching problem than a shared pool anyone can immediately borrow from or deposit into. The team rebuilt the protocol around the pooled model this section has covered throughout, relaunching in January 2020 under the name Aave (Finnish for "ghost").

## What Aave added beyond the base pooled-lending model

Aave's specific contribution to the pooled lending model was less about the core mechanism, which works the way [Lending](./lending.md) and [Borrowing](./borrowing.md) describe generally, and more about the surrounding features built on top of it: Aave was an early, prominent implementation of flash loans (see [Flash Loans](./flash-loans.md)), and it introduced **aTokens**, an interest-bearing token minted 1:1 against a depositor's supplied assets, whose balance increases automatically as interest accrues, letting a depositor's growing claim be represented as a simple, transferable ERC-20 balance rather than requiring a separate interest-tracking calculation.

## Why the rebrand mattered beyond a name change

The shift from ETHLend to Aave wasn't cosmetic: it reflected a genuine architectural rethink, moving from a model that couldn't scale past the friction of individual loan matching to the pooled, utilization-rate-driven model that this section's [Lending](./lending.md) chapter describes as the actual dominant design across the space today. Aave's pooled relaunch predates, and by most accounts helped establish, the specific pattern (shared pools, algorithmic interest rates, over-collateralization, permissionless liquidation) that essentially every subsequent DeFi lending protocol, including Compound, converged on.

## Common misconceptions

**Aave was not originally a pooled lending protocol.** Its 2017-era ETHLend product used direct peer-to-peer loan matching, a meaningfully different design from the shared-pool model the Aave name has been associated with since the January 2020 relaunch; the two shouldn't be treated as the same product under different names.

**Aave is not the only major implementation of the pooled lending model.** Compound uses a closely related but independently developed pooled model, and numerous other protocols across many chains implement variations on the same general pattern; "Aave" and "DeFi lending" are not synonymous, even though Aave is one of the space's most widely used implementations.

## Further reading

- [Aave documentation](https://aave.com/docs)
- [Aave V2 whitepaper](https://github.com/aave/aave-protocol/blob/master/docs/Aave_Protocol_Whitepaper_v1_0.pdf)
- See also: [Lending](./lending.md), [Flash Loans](./flash-loans.md), [Liquidations](./liquidations.md)

---

[← Previous: Uniswap](./uniswap.md)
·
[Back to DeFi](./README.md)
·
[Next: MakerDAO / Sky →](./maker.md)
