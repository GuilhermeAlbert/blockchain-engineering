# Wrapped Assets

A wrapped asset is a token representing another asset — often from a different chain, or, in ether's specific and important case, a native asset represented in a standard-compliant token form. This chapter covers the general wrapping mechanism before [Wrapped Ether](./weth.md) covers WETH specifically as the most important concrete example.

## The general mechanism: lock and mint, burn and release

Wrapping generally follows the same locked-and-minted pattern already introduced for [Sidechains](../bitcoin-scaling/sidechains.md#the-peg-mechanism): the original asset is locked (held by a custodian, a smart contract, or a federation of some kind — the specific mechanism determining the wrapped token's actual trust model), and an equivalent quantity of a new, standard-compliant token is minted elsewhere, representing a claim on the locked original. Redeeming — unwrapping — reverses this: burn the wrapped token, release the locked original.

```text
Original asset (e.g. BTC, or ETH itself) ──► locked
                                                  │
                                                  ▼
                                     wrapped token minted
                                     (e.g. WBTC, an ERC-20)
                                                  │
                              ... trades, is used in DeFi, etc ...
                                                  │
                                                  ▼
                              wrapped token burned to unwrap
                                                  │
                                                  ▼
                              original asset released
```

## Why wrap an asset at all

The motivating problem: many chains and standards can't natively interact with assets from outside their own ecosystem — Bitcoin has no native way to participate in an Ethereum-based lending protocol (see [DeFi](../defi/README.md)), because Bitcoin's UTXO model and Bitcoin Script have no concept of Ethereum's account model or ERC-20 interface at all. Wrapping bridges this gap by creating an ERC-20-compliant representation of the original asset's value, usable anywhere ERC-20 tokens are usable, without requiring the underlying protocol (Bitcoin, in this example) to change anything about itself.

## WBTC: Bitcoin, wrapped for Ethereum

Wrapped Bitcoin (WBTC) is the most widely used Bitcoin-wrapping implementation: BTC is deposited with and held by a custodian (historically, primarily BitGo, operating alongside a DAO-based merchant/custodian governance structure), and an equivalent amount of WBTC — an ordinary ERC-20 token — is minted on Ethereum. This makes WBTC's trust model explicit and worth stating clearly, echoing the same peg-trust analysis from [Sidechains](../bitcoin-scaling/sidechains.md#why-this-trust-question-matters-so-much): WBTC's value is only as reliable as the custodian's actual, ongoing honesty and solvency — a real, different trust assumption than holding BTC directly, not a technicality, and precisely the kind of custodial risk covered generally in [Custodial vs Non-Custodial Wallets](../wallets/custody.md).

## Common misconceptions

**A wrapped token is not the same asset as the original, even when priced and traded as if fungible with it.** WBTC and BTC are two distinct assets on two distinct ledgers, connected only by the custodian's promise (and, ideally, transparently auditable proof of reserves) to honor the peg — a documented, real distinction that matters specifically during any crisis of confidence in the custodian, when a wrapped token's market price can and has diverged from the underlying asset's price.

**Wrapping does not require the original asset's own protocol to support or even be aware of the wrapping** — Bitcoin's protocol has no concept of WBTC and requires no changes to accommodate it; the entire wrapping mechanism exists on the *destination* chain and in the custodian arrangement, entirely external to Bitcoin's own consensus rules.

## Further reading

- [Wrapped Bitcoin (WBTC) documentation](https://wbtc.network/)

---

[← Previous: Minting and Burning](./minting-and-burning.md)
·
[Back to Tokens](./README.md)
·
[Next: Wrapped Ether →](./weth.md)
