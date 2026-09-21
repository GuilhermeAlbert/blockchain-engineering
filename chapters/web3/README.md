# Building Web3 Applications

The reader of this book is a software engineer, and this section is where that matters most directly: it shows how ordinary TypeScript and React code talks to the blockchain infrastructure covered in every preceding section. Most of this section's non-browser-dependent examples have been run against live, real mainnet data, not illustrative pseudocode, actual verified queries against actual deployed contracts.

## What you need to know first

[JSON-RPC](../ethereum/json-rpc.md), [Ethereum Accounts](../ethereum/accounts.md), and [Contract ABI](../contracts/abi.md). This section builds application-layer patterns directly on top of those underlying mechanics, and assumes you understand what a `readContract` call or a signed transaction is actually doing underneath.

## Chapters

1. [RPC Providers](./rpc-providers.md): what you're actually trusting when you query a third-party endpoint
2. [Connecting Wallets](./wallet-connections.md): EIP-1193, and exactly what a connection does and doesn't grant
3. [WalletConnect](./walletconnect.md): bridging a dapp to a wallet on a different device entirely
4. [Reading Blockchain State](./reading-state.md): why reads are free, verified against WETH's live total supply
5. [Calling Contracts](./calling-contracts.md): call vs. transaction, and why you simulate before you send
6. [Sending Transactions](./sending-transactions.md): the full lifecycle, and the two distinct ways a transaction can fail
7. [Signing Messages](./signing-messages.md): gasless authentication, verified end to end, and the EIP-191 prefix that makes it safe
8. [Typed Data and EIP-712](./eip-712.md): structured, human-readable signatures, verified with a real signature round-trip
9. [Transaction Receipts](./receipts.md): a real, historical mainnet receipt, decoded field by field
10. [Event Indexing](./event-indexing.md): a live eth_getLogs query returning 187 real WETH transfers
11. [viem](./viem.md): the library behind every code example in this book's Ethereum-side chapters
12. [wagmi](./wagmi.md): React hooks for the state-management problems viem deliberately leaves alone

## Build one

[examples/wallet-stats/](../../examples/wallet-stats/) is a small, runnable application built directly on this section's patterns, reading real balances and transaction history for any address you give it.

## Next

Continue to [DeFi](../defi/README.md), where this section's contract-calling and event-reading patterns get applied to real, live decentralized exchange and lending protocols.
