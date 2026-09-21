# Decentralized Exchanges

A decentralized exchange (DEX) lets users trade tokens directly against a smart contract, with no company operating an order book or custody of user funds between trades. This chapter covers the two structurally different models DEXs have used, before the rest of this section goes deep on the model that came to dominate.

## Order-book DEXs

Early decentralized exchanges tried to replicate the traditional exchange model (a matching engine pairing buy and sell orders at agreed prices) on-chain. This ran directly into Bitcoin's and Ethereum's own throughput constraints (see [Block Size](../bitcoin-scaling/block-size.md) and [Gas](../ethereum/gas.md)): posting, updating, and canceling orders as individual on-chain transactions is slow and expensive relative to a centralized exchange's off-chain matching engine, which can process orders far faster and at effectively no per-order cost. Some order-book DEXs mitigated this by keeping order matching off-chain and only settling actual trades on-chain, a hybrid model with its own centralization tradeoffs (an off-chain matching component is itself a trust dependency, similar in spirit to the RPC provider trust question in [RPC Providers](../web3/rpc-providers.md)).

## Automated Market Makers: the model that won

The alternative (and, by trading volume, the model that has come to dominate decentralized trading) replaces the order book entirely with an **Automated Market Maker (AMM)**: a smart contract holding reserves of two (or more) tokens, pricing trades algorithmically based on the reserves' current ratio, rather than matching individual buy and sell orders at all. This is covered in full mechanical detail in [Automated Market Makers](./amm.md) and [Constant Product Formula](./constant-product.md), with real, computed numbers rather than a conceptual description alone.

## Why AMMs fit the blockchain execution model better

An AMM's pricing is a pure, deterministic function of current reserves (exactly the kind of stateless, `view`-function-computable logic (see [Functions](../contracts/functions.md#view-and-pure-functions)) that fits naturally into a single, atomic transaction: a user submits one transaction specifying "swap up to X of token A for at least Y of token B," and the contract either executes the entire swap in that one transaction or reverts), no waiting for a counterparty's separate order to arrive, no off-chain matching component required at all. This structural fit, more than any single design decision, is why AMMs became the dominant DEX architecture rather than order books, despite order books being the more familiar model from traditional finance.

## Common misconceptions

**A decentralized exchange does not eliminate all trust or risk**. It eliminates counterparty custody risk in the specific sense that a DEX never holds user funds between trades (see [Custodial vs Non-Custodial Wallets](../wallets/custody.md)), but users still bear smart contract risk (a bug or exploit in the DEX's own code, see [Smart Contract Auditing](../security/auditing.md)) and, for AMMs specifically, the price-impact and impermanent-loss risks covered later in this section.

**"DEX" does not imply a single, universal architecture**. Order-book and AMM-based DEXs are genuinely different systems with different tradeoffs, and this book treats "AMM" and "DEX" as related but non-synonymous terms throughout, since conflating them obscures real architectural differences worth understanding separately.

## Further reading

- See also: [Automated Market Makers](./amm.md), [Uniswap](./uniswap.md)

---

[← Previous: Centralized Stablecoins](./centralized-stablecoins.md)
·
[Back to DeFi](./README.md)
·
[Next: Automated Market Makers →](./amm.md)
