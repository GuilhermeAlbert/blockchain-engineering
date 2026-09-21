# Ethereum Accounts

Ethereum has no UTXOs. Every balance, every piece of contract storage, every unit of state lives in an **account**, addressed by a 20-byte identifier, and updated directly in place — the account model introduced conceptually in [Transactions](../blockchain/transactions.md#the-account-model-ethereum). This chapter covers what an account actually contains and the fundamental split between its two kinds.

## What every account contains

Every Ethereum account, regardless of kind, has exactly four fields:

- **nonce** — for an externally owned account (see [EOAs](./eoa.md)), a count of transactions sent from this account, used specifically to prevent replaying the same signed transaction twice; for a contract account, a count of contracts this account has created.
- **balance** — the account's ether balance, denominated in **wei** (10^18 wei = 1 ether — the smallest unit, named after Wei Dai, the [b-money](../origins/b-money.md) author cited in the Bitcoin whitepaper).
- **storageRoot** — the root hash of a [Merkle Patricia Trie](./state-trie.md) containing this account's own persistent storage (empty for an account with no stored data, which describes every EOA and many simple contracts).
- **codeHash** — the hash of this account's EVM bytecode (a fixed, well-known empty hash for an EOA, which has no code at all).

## The two kinds of account

This is the single most important distinction in Ethereum's account model, covered separately in full in [Externally Owned Accounts](./eoa.md) and [Contract Accounts](./contract-accounts.md):

| | Externally Owned Account (EOA) | Contract Account |
| --- | --- | --- |
| Controlled by | A private key | Its own code |
| Has code? | No | Yes (EVM bytecode) |
| Can initiate a transaction? | Yes | No — can only act when called by a transaction or another contract |
| Address derived from | The public key (see [Ethereum's key cryptography](../cryptography/secp256k1.md)) | The creator's address and nonce (or, for CREATE2, a chosen salt — see [CREATE2](../evm/contract-creation.md)) |

Every action on Ethereum ultimately traces back to a transaction signed by an EOA — contracts can call other contracts, but that entire call chain is always triggered, at its root, by some EOA's signed transaction. This is a structural property worth internalizing early: there is no such thing as a contract spontaneously acting on its own, unprompted by an external transaction somewhere upstream.

## Why an account-based model, not UTXOs

Recall from [Transactions](../blockchain/transactions.md#two-fundamentally-different-models) that Bitcoin's UTXO model and Ethereum's account model are a genuine, consequential design fork. Ethereum's designers chose accounts specifically because it's a more natural fit for **persistent, evolving contract state** — a smart contract (see [Smart Contracts](../contracts/README.md)) generally needs to remember things across many separate calls (a token's balances mapping, a decentralized exchange's liquidity pool reserves), which maps naturally onto "a place that holds and updates values" in a way that's considerably more awkward to express purely in terms of consuming and creating discrete, one-time UTXOs.

## Example: reading an account's state

```typescript
import { createPublicClient, http, formatEther } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({ chain: mainnet, transport: http() });

// Any valid, checksummed mainnet address works here — this example reads
// public, on-chain state, which requires no special permission or
// association with the address being queried.
const address = "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe" as const;

const [balance, nonce, code] = await Promise.all([
  client.getBalance({ address }),
  client.getTransactionCount({ address }),
  client.getBytecode({ address }),
]);

console.log("balance (ETH):", formatEther(balance));
console.log("nonce:", nonce);
console.log("has contract code:", code !== undefined);
```

This code has been run against a live mainnet RPC endpoint and works as shown — output naturally varies over time since it's reading live, ever-changing chain state, but a representative run returned:

```text
balance (ETH): 5774.491790776062094343
nonce: 0
has contract code: true
```

That last line is worth noting: this particular example address turns out to be a **contract account**, not an EOA — its nonzero `getBytecode()` result is exactly the distinguishing check described in the table above. See [JSON-RPC](./json-rpc.md) for what's actually happening under the hood of these `viem` calls.

## Common misconceptions

**An Ethereum "balance" is not analogous to a Bitcoin UTXO set summed up** — it's a single, directly stored, directly updated number per account, not a derived sum of many discrete outputs. Sending ether directly decrements the sender's stored balance and increments the recipient's, in place.

**A contract account having a balance does not mean the contract can spend it freely on its own initiative** — a contract can only move its own balance in response to being called (by a transaction or another contract), executing whatever logic its own code specifies; it has no independent agency to act outside of being invoked.

## Further reading

- [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) — the formal specification, Section 4 (The World State)
- [ethereum.org: Accounts](https://ethereum.org/en/developers/docs/accounts/)

---

[Back to Ethereum](./README.md)
·
[Next: Externally Owned Accounts →](./eoa.md)
