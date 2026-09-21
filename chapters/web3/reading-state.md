# Reading Blockchain State

Reading data from a contract (a balance, a price, an owner) is the most common thing a Web3 application does, and it costs nothing: no gas, no signature, no transaction. This chapter covers exactly why that's true and demonstrates reading real, live contract state with a verified call.

## Why reads are free

Recall from [JSON-RPC](../ethereum/json-rpc.md#some-of-the-most-commonly-used-methods) that `eth_call` simulates a contract call against current (or historical) state without ever broadcasting a transaction or being included in a block. It runs entirely on the RPC node answering the query, locally, and discards any state changes the call would have made (which is fine, since a `view`/`pure` function, per [Functions](../contracts/functions.md#view-and-pure-functions), makes none anyway). No gas is charged because no other node on the network ever needs to process or validate it. It's a local computation the querying node performs and returns, not something that becomes part of the shared, agreed-upon chain state.

## Example: reading real, live state

```typescript
import { createPublicClient, http, formatUnits, parseAbi } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({ chain: mainnet, transport: http() });
const erc20Abi = parseAbi([
  "function name() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function decimals() view returns (uint8)",
]);

const weth = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" as const;

const [name, totalSupply, decimals] = await Promise.all([
  client.readContract({ address: weth, abi: erc20Abi, functionName: "name" }),
  client.readContract({ address: weth, abi: erc20Abi, functionName: "totalSupply" }),
  client.readContract({ address: weth, abi: erc20Abi, functionName: "decimals" }),
]);

console.log("name:", name);
console.log("totalSupply (raw):", totalSupply.toString());
console.log("totalSupply (formatted):", formatUnits(totalSupply, decimals));
```

Verified output from running this exact code (captured at the time of writing):

```text
name: Wrapped Ether
totalSupply (raw): 2084662897219033353846529
totalSupply (formatted): 2084662.897219033353846529
```

`totalSupply` reflects live, ever-changing chain state (WETH's supply grows and shrinks continuously as users deposit and withdraw ETH), so unlike this book's other verified examples, the specific number above should be treated as a snapshot, not a fixed fact. Rerunning this code will return whatever WETH's supply is at that later moment.

## Reading at a specific historical block

Every read can be pinned to a specific past block rather than the current chain tip, by passing a `blockNumber` (or `blockTag`) parameter. Letting an application ask "what was this balance at block 18,000,000" rather than only "what is it right now," useful for historical analysis, auditing, or reconstructing state at a specific past moment without needing to replay the entire chain manually.

## Batching reads: multicall

Making many separate `eth_call` requests (one per piece of data needed) is straightforward but can be slow. Each is a separate network round-trip. The **Multicall** pattern (a widely deployed helper contract, and a built-in feature of `viem`'s `client.multicall()`) batches many read calls into a single `eth_call`, executed together in one round-trip against a single helper contract that internally loops through and returns every requested call's result, a direct, practical efficiency technique any application reading many pieces of contract state (a dashboard showing many token balances, for instance) should generally use instead of firing off many independent, separately-awaited reads.

## Common misconceptions

**Reading state does not require a connected wallet at all** (anyone can read any contract's public, non-restricted data from a public RPC endpoint (exactly as this chapter's example does), entirely independent of whether a specific user has connected a wallet to the application; wallet connection (see [Connecting Wallets](./wallet-connections.md)) is only needed for *writing*) sending transactions or signatures.

**A `view` function reverting during a read does not cost the caller anything** in the way a failed on-chain transaction would (recall [Errors and Reverts](../contracts/errors.md#why-reverting-undoes-everything-precisely)), since the read never becomes a real transaction, a reverted `eth_call` simply returns an error to the caller locally, with no gas consumed and nothing recorded on-chain at all.

## Further reading

- [viem documentation: readContract](https://viem.sh/docs/contract/readContract)
- [Multicall3 contract](https://github.com/mds1/multicall)

---

[← Previous: WalletConnect](./walletconnect.md)
·
[Back to Building Web3 Applications](./README.md)
·
[Next: Calling Contracts →](./calling-contracts.md)
