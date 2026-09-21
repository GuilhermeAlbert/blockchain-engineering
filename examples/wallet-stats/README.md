# Wallet Stats

A small, read-only Web3 CLI accompanying the [Building Web3 Applications](../../chapters/web3/README.md) section: given any Ethereum address, it reads and reports the address's real, live ETH balance, transaction count, contract status, and balances of a couple of well-known ERC-20 tokens. Using only [viem](https://viem.sh/) public-client reads, no wallet connection, no private keys, no writes.

## Running it

```bash
npm install
npm run stats -- 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
npm test
```

Any valid, checksummed Ethereum address works. `npm test` runs assertion-based tests against live mainnet data (see [Why this project has no fixture data](#why-this-project-has-no-fixture-data) below for why).

## What it demonstrates

This project is a direct, runnable version of the patterns covered across [Reading Blockchain State](../../chapters/web3/reading-state.md), [Ethereum Accounts](../../chapters/ethereum/accounts.md), and [ERC-20](../../chapters/tokens/erc-20.md):

- `client.getBalance`, `client.getTransactionCount`, and `client.getBytecode`. The three reads that together distinguish an EOA from a contract account, per [Ethereum Accounts](../../chapters/ethereum/accounts.md#the-two-kinds-of-account).
- `client.readContract` against a fixed list of independently-verified token addresses (see `src/tokens.ts`), the exact `balanceOf` pattern from [Balances](../../chapters/tokens/balances.md).
- A public, read-only client (`src/client.ts`), never a wallet client, since this project only ever reads, matching the [public-vs-wallet-client](../../chapters/web3/viem.md#public-clients-versus-wallet-clients) distinction directly.

## A real, current discovery this project made

While testing this project against a real address, `client.getBytecode()` unexpectedly returned non-empty data for an address that should have been an ordinary EOA, meaning the naive `isContract = code !== undefined` check reported `true` for something that isn't a deployed contract at all. The actual bytecode, `0xef0100...`, is an **EIP-7702 delegation designator**: since the Pectra upgrade (May 2025), an EOA can delegate execution to a smart contract's logic while remaining, at the protocol level, a private-key-controlled EOA, exactly the account-abstraction feature this book's [Externally Owned Accounts](../../chapters/ethereum/eoa.md) chapter describes the EVM's account model as historically *not* supporting.

`src/stats.ts` now checks for this specific `0xef0100` prefix and reports `isEip7702Delegated` separately from plain contract detection, and `src/test.ts` includes a regression test for exactly this case. This is left in deliberately, the same way the `examples/bitcoin` project's Buffer-mutation bug was: a real, current (as of this writing) protocol detail that a naive, seemingly-reasonable check gets wrong, caught only by testing against real, live data rather than a hand-picked, static fixture.

## Why this project has no fixture data

Every value this project reports is live, real, and changes constantly (balances shift, block numbers advance). Rather than mocking responses, this project's tests run against real mainnet data and assert on properties that are true regardless of exact current values (WETH9 has code, WETH9 holds a very large ETH balance, a specific known address is EIP-7702-delegated), a deliberate choice consistent with this book's broader practice of verifying examples against reality rather than plausible-looking fabrications.
