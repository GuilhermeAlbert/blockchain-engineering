# Calling Contracts

This chapter draws the line [Reading Blockchain State](./reading-state.md) already implied but didn't fully spell out: the difference between **calling** a contract (a simulated, free, read-only `eth_call`) and **sending a transaction** to a contract (a real, gas-costing, state-changing action requiring a signature). Confusing the two is a common source of both bugs and unnecessary gas expenditure.

## Two fundamentally different operations behind similar-looking code

```typescript
// A CALL — free, instant, read-only, no signature needed.
const balance = await client.readContract({
  address: tokenAddress,
  abi: erc20Abi,
  functionName: "balanceOf",
  args: [someAddress],
});

// A TRANSACTION — costs gas, requires a signature, takes time to confirm.
const hash = await walletClient.writeContract({
  address: tokenAddress,
  abi: erc20Abi,
  functionName: "transfer",
  args: [recipientAddress, amount],
});
```

The distinction traces directly back to [Functions](../contracts/functions.md#view-and-pure-functions): a `view`/`pure` function can be safely called with `readContract` (or a raw `eth_call`), since it makes no state changes to simulate away. A state-changing function (no `view`/`pure` modifier) needs `writeContract`, which constructs, signs (via the connected wallet, see [Connecting Wallets](./wallet-connections.md)), and broadcasts a real transaction.

## Simulating a write before sending it

A well-built application generally **simulates** a state-changing call before actually sending it as a transaction, using `eth_call` against the exact same function and arguments the real transaction will use, specifically to catch a failure (a revert, an insufficient balance, invalid arguments) **before** paying any real gas or waiting for a real confirmation:

```typescript
// Simulates the write, catching failures for free, before spending real gas.
const { request } = await client.simulateContract({
  address: tokenAddress,
  abi: erc20Abi,
  functionName: "transfer",
  args: [recipientAddress, amount],
  account: senderAddress,
});

const hash = await walletClient.writeContract(request);
```

This two-step pattern (simulate, then send exactly what simulation validated) is standard practice specifically because a failed on-chain transaction still costs the gas consumed up to its failure point (recall [Gas](../ethereum/gas.md#what-happens-when-a-transaction-runs-out-of-gas)), simulating first catches most preventable failures for free.

## Common misconceptions

**A successful simulation does not guarantee the real transaction will also succeed** (state can change between simulation and the transaction actually being mined (another transaction could execute first, altering a balance or a contract's state in a way that makes the originally-simulated call now fail)) simulation reduces, but does not eliminate, the risk of a failed transaction, particularly for time-sensitive or contested on-chain conditions (see [Front Running](../security/front-running.md)).

**Calling a `view` function through a wallet's transaction-sending flow (rather than a plain read) is not "more correct" or "more secure"**. It's simply unnecessary: a `view` function makes no state changes for a wallet signature to meaningfully authorize, so routing it through the transaction flow only adds needless friction (a wallet popup, a wait for confirmation) for no additional benefit over a plain, free `readContract` call.

## Further reading

- [viem documentation: writeContract](https://viem.sh/docs/contract/writeContract)
- [viem documentation: simulateContract](https://viem.sh/docs/contract/simulateContract)

---

[← Previous: Reading Blockchain State](./reading-state.md)
·
[Back to Building Web3 Applications](./README.md)
·
[Next: Sending Transactions →](./sending-transactions.md)
