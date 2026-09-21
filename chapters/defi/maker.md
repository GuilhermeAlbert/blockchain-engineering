# MakerDAO / Sky

MakerDAO is the protocol behind DAI, the crypto-collateralized stablecoin this section's [Collateralized Stablecoins](./collateralized-stablecoins.md) chapter used as its worked example. Its history includes both the clearest real-world stress test any crypto-collateralized stablecoin has faced and a recent, substantial rebrand, both worth covering directly.

## Origins and the single-collateral launch

MakerDAO was founded by Rune Christensen, with development beginning around 2014. The original DAI system (now referred to as Single-Collateral DAI, or "Sai") launched on the Ethereum mainnet on December 18, 2017, accepting only ETH as collateral. The system this book's [Collateralized Stablecoins](./collateralized-stablecoins.md) chapter describes, with a broader set of approved collateral assets, is **Multi-Collateral DAI**, which the protocol upgraded to in 2019.

## Black Thursday: March 12, 2020

On March 12, 2020, ETH's price fell roughly 43% in a single day, part of a broader, sudden market crash across both crypto and traditional markets. This triggered mass liquidations across MakerDAO's vaults, and exposed a specific weakness in the liquidation auction mechanism as designed at the time: Ethereum's own network became severely congested as gas prices spiked, which both delayed price oracle updates and made it difficult for keepers (the liquidators covered generally in [Liquidations](./liquidations.md#who-performs-liquidations-and-why)) to participate normally in the collateral auctions. With little competing bidding activity, at least one participant was able to win liquidation auctions for large amounts of ETH collateral at bids close to zero DAI, rather than anything close to the collateral's actual market value. Reported estimates of the resulting shortfall vary by source, but the event left several million dollars of DAI undercollateralized system-wide, a genuine, documented case of a crypto-collateralized stablecoin's liquidation mechanism failing to work as intended under extreme, congested market conditions, exactly the kind of scenario flagged generally in [Collateralized Stablecoins](./collateralized-stablecoins.md#common-misconceptions).

MakerDAO's governance responded by minting and auctioning new MKR (the protocol's governance token at the time) to cover the shortfall, and by later reworking the liquidation auction mechanism itself to reduce the same failure mode recurring.

## The Sky rebrand

On August 27, 2024, MakerDAO rebranded as **Sky Protocol**, the first release under a broader multi-year plan the project calls Endgame. DAI became upgradeable to a new stablecoin, **USDS**, at a fixed 1:1 rate, and MKR became upgradeable to a new governance token, **SKY**, at a fixed rate of 24,000 SKY per MKR. Neither upgrade is mandatory: DAI and MKR continue to exist and function as legacy tokens for holders who choose not to convert, with the protocol's own conversion contracts minting and burning between the old and new tokens on demand in either direction.

## Common misconceptions

**Black Thursday was not caused by a flaw in the over-collateralization concept itself.** It was caused by a specific, since-modified weakness in how the liquidation auction mechanism behaved under extreme network congestion, a mechanism-level and market-conditions failure, not evidence that over-collateralized stablecoins are fundamentally unsound; the protocol continued operating and DAI's peg recovered afterward.

**"DAI" and "USDS" are not two different, competing stablecoins.** They're two names for tokens the same protocol makes freely convertible at a fixed 1:1 rate; a holder of one can always exchange it for the other through Sky's own contracts, and both remain part of the same underlying system.

## Further reading

- [Sky Protocol documentation](https://docs.sky.money/)
- [MakerDAO whitepaper](https://makerdao.com/en/whitepaper/)
- See also: [Collateralized Stablecoins](./collateralized-stablecoins.md), [Liquidations](./liquidations.md)

---

[← Previous: Aave](./aave.md)
·
[Back to DeFi](./README.md)
·
[Next: Curve →](./curve.md)
