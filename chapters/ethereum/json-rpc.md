# JSON-RPC

JSON-RPC is the protocol every piece of Ethereum software — wallets, block explorers, dapps — actually uses to talk to a node. This chapter covers the raw protocol directly, underneath the higher-level libraries (like `viem`, used elsewhere in this book) that most real applications build on top of it, since understanding the raw calls demystifies what those libraries are actually doing.

## The protocol, at its simplest

JSON-RPC is a lightweight remote procedure call protocol: a client sends a JSON object naming a method and its parameters; the server responds with a JSON object containing the result (or an error). Ethereum nodes expose a large, standardized set of methods (prefixed `eth_`, `net_`, `web3_`, and others) over this protocol, typically reachable via HTTP or WebSocket.

## Example: a raw JSON-RPC call, no library

```typescript
async function ethCall(method: string, params: unknown[]): Promise<unknown> {
  const response = await fetch("https://ethereum-rpc.publicnode.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  const json = await response.json();
  if (json.error) throw new Error(`RPC error: ${json.error.message}`);
  return json.result;
}

const blockNumberHex = await ethCall("eth_blockNumber", []);
console.log("latest block number (hex):", blockNumberHex);
console.log("latest block number (decimal):", parseInt(blockNumberHex as string, 16));

const chainIdHex = await ethCall("eth_chainId", []);
console.log("chain ID:", parseInt(chainIdHex as string, 16));
```

This code has been run against a live public endpoint. A representative result:

```text
latest block number (hex): 0x18d2360
latest block number (decimal): 26026848
chain ID: 1
```

Chain ID `1` confirms this is Ethereum mainnet (see [Chain IDs](../web3/README.md)); the block number naturally increases each time this is run, since it's reading the live chain tip. This example uses a specific public RPC provider purely for illustration — see [RPC Providers](../web3/rpc-providers.md) for a fuller discussion of choosing one for real applications.

## Why the results come back as hex strings

Every numeric value in Ethereum's JSON-RPC responses is encoded as a **hex string**, not a native JSON number — `eth_blockNumber` returns `"0x1234abc"`, not `4995260`. This is a deliberate choice: JSON numbers are conventionally represented as IEEE 754 doubles, which cannot precisely represent integers beyond 2^53 — a real limitation for Ethereum, where balances (in wei) and other values routinely exceed that range by many orders of magnitude. Encoding as hex strings sidesteps this precision loss entirely, at the cost of every client needing to explicitly parse hex before doing arithmetic — exactly what libraries like `viem` handle automatically, and exactly why a naive integration that forgets this conversion produces subtly wrong results for any sufficiently large value.

## Some of the most commonly used methods

| Method | Purpose |
| --- | --- |
| `eth_blockNumber` | The current chain tip's block number |
| `eth_getBalance` | An account's ether balance at a given block |
| `eth_getTransactionCount` | An account's current nonce |
| `eth_call` | Simulate a contract call without sending a real transaction or paying gas (see [Calling Contracts](../web3/calling-contracts.md)) |
| `eth_sendRawTransaction` | Broadcast a signed transaction |
| `eth_getTransactionReceipt` | Retrieve a transaction's execution result once mined (see [Transaction Receipts](../web3/receipts.md)) |
| `eth_getLogs` | Query historical event logs matching a filter (see [Event Indexing](../web3/event-indexing.md)) |

## Why higher-level libraries exist on top of this

Working directly with raw JSON-RPC, as this chapter's example does, quickly becomes tedious and error-prone for real applications: manually encoding function calls into the `data` field (see [Contract ABI](../contracts/abi.md)), manually converting every hex value, and manually handling the many method-specific parameter formats. Libraries like [`viem`](../web3/viem.md), used throughout this book's later Web3 examples, exist specifically to wrap this raw protocol in a type-safe, ergonomic interface — but everything they do ultimately compiles down to exactly the kind of raw JSON-RPC calls this chapter demonstrates directly.

## Common misconceptions

**JSON-RPC is not Ethereum-specific** — it's a general-purpose, protocol-agnostic RPC standard; Ethereum's specific set of methods (the `eth_` namespace and others) is an Ethereum-specific *application* of the general JSON-RPC standard, not a different protocol altogether.

**Calling `eth_call` does not create a real, on-chain transaction or cost real gas** — it's a read-only simulation against current (or a specified historical) state, useful for querying contract data without any of the cost or finality of an actual state-changing transaction (see [Calling Contracts](../web3/calling-contracts.md)).

## Further reading

- [Ethereum JSON-RPC specification](https://ethereum.org/en/developers/docs/apis/json-rpc/)
- [Ethereum execution APIs specification (formal, machine-readable)](https://github.com/ethereum/execution-apis)

---

[← Previous: State Trie](./state-trie.md)
·
[Back to Ethereum](./README.md)
·
[Next: Ethereum Nodes →](./nodes.md)
