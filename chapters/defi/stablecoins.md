# Stablecoins

A stablecoin is a token designed to hold a roughly constant value relative to some reference, almost always the US dollar. This chapter covers why stablecoins exist at all, given [Volatility and Monetary Adoption](../economics/volatility.md) already established that price stability is exactly what a volatile asset like Bitcoin or ether lacks; the next two chapters cover the two structurally different ways stablecoins achieve it.

## The problem stablecoins solve

Recall [Bitcoin as Money](../economics/bitcoin-as-money.md#unit-of-account): a currency that swings 10% in a day is a poor unit of account and a risky medium of exchange, even if it's a reasonable long-term store of value. This is a genuine, practical problem for anyone wanting to use blockchain rails (fast, programmable, globally accessible settlement) without taking on ether or bitcoin's price volatility for the duration of a trade, a loan, or simply holding working capital. A stablecoin is, mechanically, an attempt to get blockchain-native settlement *and* fiat-like price stability simultaneously, by pegging a token's value to an external reference rather than letting supply and demand for the token itself set its price the way Bitcoin's does.

## The two broad approaches

- **Centralized (fiat-backed) stablecoins**: an issuer holds real dollars (or dollar-equivalent assets) in reserve and issues tokens redeemable 1:1, covered fully in [Centralized Stablecoins](./centralized-stablecoins.md). This is structurally the same trust model as [Wrapped Assets](../tokens/wrapped-assets.md) and WBTC specifically, a custodian's promise, not a protocol guarantee.
- **Crypto-collateralized (decentralized) stablecoins**: a smart contract holds *other* crypto assets (ether, for instance) as over-collateralization, and issues stablecoin debt against that collateral, covered fully in [Collateralized Stablecoins](./collateralized-stablecoins.md). This trades custodial trust for a different set of risks, collateral price volatility, and the mechanics of what happens when collateral value falls (see [Liquidations](./liquidations.md)).

Both approaches are attempting the same goal (value stability) through fundamentally different trust and risk models, which is precisely why "stablecoin" alone doesn't tell you much about a specific token's actual risk profile without knowing which category, and which specific implementation, it belongs to.

## What "stable" actually means in practice

Even a well-designed, well-collateralized stablecoin isn't perfectly, permanently stable. It's stable relative to its peg under *normal* conditions, with real, documented historical episodes of stablecoins trading meaningfully away from their intended $1.00 value during periods of stress (a bank run on a centralized issuer's reserves, a collateral price crash for a crypto-backed design, or (in the case of *algorithmic* stablecoins not backed by sufficient collateral at all, a category this book treats with particular caution given its historical failure record) a complete, permanent collapse of the peg). "Stablecoin" describes a design goal and a general market behavior under ordinary conditions, not an ironclad guarantee.

## Common misconceptions

**A token being called a "stablecoin" is not, by itself, evidence that it's actually well-collateralized or safe**, the term describes an intended design goal, and the specific mechanism (and its actual, current collateralization, if applicable) has to be checked individually for any given stablecoin, exactly the same due-diligence principle already established for token supply claims in [Token Supply](../tokens/token-supply.md#why-checking-supply-policy-matters-before-trusting-a-token).

**Stablecoins are not a Bitcoin-native or Bitcoin-scaling technology**. They're overwhelmingly an Ethereum and other smart-contract-platform phenomenon, since implementing either collateralization model requires the kind of general-purpose contract logic [Bitcoin Script](../bitcoin/script.md) deliberately doesn't support; Bitcoin-adjacent stablecoin-like systems generally operate on sidechains or Layer 2 systems with smart contract capability instead (see [Liquid Network](../bitcoin-scaling/liquid.md) and [RGB](../bitcoin-scaling/rgb.md)).

## Further reading

- See also: [Centralized Stablecoins](./centralized-stablecoins.md), [Collateralized Stablecoins](./collateralized-stablecoins.md)

---

[← Previous: Decentralized Finance](./README.md)
·
[Back to DeFi](./README.md)
·
[Next: Collateralized Stablecoins →](./collateralized-stablecoins.md)
