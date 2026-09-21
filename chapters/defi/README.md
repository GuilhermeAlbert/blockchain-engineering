# DeFi

DeFi (decentralized finance) is what happens when the contract-calling and event-reading patterns from [Building Web3 Applications](../web3/README.md) get applied to actual financial primitives: trading, lending, and borrowing, implemented as smart contracts rather than intermediary-operated services. This section covers the mechanics directly, with real, verified math throughout, not conceptual summaries of what these protocols claim to do.

## What you need to know first

[Smart Contracts](../contracts/README.md), [Tokens](../tokens/README.md), and [Reading Blockchain State](../web3/reading-state.md). This section assumes you're comfortable with ERC-20 balances, contract calls, and the general account and gas model covered in earlier sections.

## Chapters

1. [Stablecoins](./stablecoins.md): why blockchain rails need price stability, and the two structurally different ways to get it
2. [Collateralized Stablecoins](./collateralized-stablecoins.md): DAI/USDS, over-collateralized vaults, and the stability mechanisms that hold the peg
3. [Centralized Stablecoins](./centralized-stablecoins.md): USDC/USDT, and the custodial trust question this book keeps returning to
4. [Decentralized Exchanges](./dex.md): why AMMs beat order books on-chain
5. [Automated Market Makers](./amm.md): pricing trades from reserves, not from orders
6. [Constant Product Formula](./constant-product.md): `x*y=k`, worked through with real computed slippage numbers
7. [Liquidity Pools](./liquidity-pools.md): what a pool contract actually tracks, and how LP tokens work
8. [Liquidity Providers](./liquidity-providers.md): the two components of LP return, and why they must be evaluated separately
9. [Impermanent Loss](./impermanent-loss.md): derived directly from the formula, verified across eight price scenarios
10. [Slippage](./slippage.md): pool depth, price impact, and the arbitrage that keeps AMM prices honest
11. [Lending](./lending.md): the pooled model, and interest rates set by utilization
12. [Borrowing](./borrowing.md): opening a position, continuous interest accrual, and why there's no fixed term
13. [Collateral](./collateral.md): loan-to-value ratios, liquidation thresholds, and why the two differ
14. [Liquidations](./liquidations.md): a complete, verified example, including the liquidator's bonus math
15. [Flash Loans](./flash-loans.md): uncollateralized borrowing made safe by atomicity alone
16. [Oracles](./oracles.md): why contracts can't query external data directly, verified with a live Chainlink read
17. [Yield](./yield.md): fees, interest, staking, and emissions, and why they shouldn't be compared as one number
18. [Staking vs. Lending](./staking-vs-lending.md): separating consensus-layer staking from DeFi products that borrow the word
19. [Uniswap](./uniswap.md): v1 through v3, as a case study in how the AMM model actually evolved
20. [Aave](./aave.md): from peer-to-peer ETHLend to the pooled lending model most protocols converged on
21. [MakerDAO / Sky](./maker.md): Black Thursday, and a documented liquidation-mechanism failure under stress
22. [Curve](./curve.md): the StableSwap curve, and a real compiler-level exploit unrelated to its pricing math

## Build one

[examples/defi/](../../examples/defi/) is a runnable project implementing a constant-product AMM pool and a simplified lending market directly from this section's formulas, exercised against real numbers rather than mocked data.

## Next

Continue to [Layer 2](../layer2/README.md), where the scaling techniques Bitcoin's [Bitcoin Scaling](../bitcoin-scaling/README.md) section covered get Ethereum's own, much larger-scale treatment: rollups, data availability, and the bridges connecting them back to Ethereum mainnet.
