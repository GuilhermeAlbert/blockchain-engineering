# Tokens

Token standards are interfaces, not deployed code — this section explains ERC-20, ERC-721, and ERC-1155 through their actual function signatures and events, building working, compiled implementations rather than describing the standards in the abstract. Every interface and non-trivial contract in this section has been compiled with solc 0.8.26 and confirmed to build cleanly; the WETH example's real deployed address was verified live, on-chain.

## What you need to know first

[Smart Contracts](../contracts/README.md), especially [Mappings](../contracts/mappings.md) and [Events and Logs](../contracts/events.md) — token contracts are, mechanically, mappings tracked via the patterns that section already covered.

## Chapters

1. [ERC-20](./erc-20.md) — the fungible token interface, with a full working implementation
2. [Balances](./balances.md) — why a balance is just a mapping, verified against a real token's live decimals
3. [Transfers](./transfers.md) — transfer vs. transferFrom, and the trust distinction between them
4. [Allowances and Approvals](./approvals.md) — the approve race condition, and why unlimited approvals are a real risk
5. [ERC-721](./erc-721.md) — non-fungible tokens, and the safeTransferFrom check ERC-20 lacks entirely
6. [ERC-1155](./erc-1155.md) — one contract, many token types, and the batching efficiency that motivated it
7. [NFT Metadata](./nft-metadata.md) — tokenURI, and the real gap between on-chain permanence and off-chain availability
8. [Minting and Burning](./minting-and-burning.md) — the zero-address convention, and why minting access control matters enormously
9. [Wrapped Assets](./wrapped-assets.md) — the lock-and-mint pattern, and WBTC's custodial trust model stated plainly
10. [Wrapped Ether](./weth.md) — a complete, compiled WETH contract, with its real mainnet address verified live
11. [Token Supply](./token-supply.md) — why "fixed supply" is only as trustworthy as the code enforcing it

## Next

Continue to [Building Web3 Applications](../web3/README.md), where these same token interfaces get called from ordinary TypeScript applications — reading balances, decoding events, and sending transactions against real, live contracts.
