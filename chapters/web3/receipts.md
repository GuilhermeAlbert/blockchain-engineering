# Transaction Receipts

A transaction receipt is what a node produces after actually executing a mined transaction — the definitive record of what happened, as opposed to what was merely requested. This chapter covers what a receipt actually contains, verified against a real, historical transaction.

## Example: a real receipt

```typescript
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({ chain: mainnet, transport: http() });

const receipt = await client.getTransactionReceipt({
  hash: "0x631a3d545a45a0aa38f7f4f0cefdee53debae2e8b70e05b7a692071e1d78fe95",
});

console.log("status:", receipt.status);
console.log("block number:", receipt.blockNumber);
console.log("gas used:", receipt.gasUsed.toString());
console.log("effective gas price:", receipt.effectiveGasPrice.toString());
console.log("number of logs:", receipt.logs.length);
```

Verified output from running this exact code, against a real, mined mainnet transaction:

```text
status: success
block number: 26028030n
gas used: 149517
effective gas price: 37540063681
number of logs: 3
```

This transaction (an ordinary, real contract interaction — not one of this book's own construction) succeeded, used 149,517 gas, paid an effective price of roughly 37.5 gwei per unit, and emitted three separate event logs across whatever contract calls its execution triggered.

## What a receipt actually contains, and why each field matters

- **status** — `"success"` or `"reverted"` (encoded as `1` or `0` at the protocol level since [Byzantium](https://eips.ethereum.org/EIPS/eip-658), an earlier upgrade that added this field — before it, callers had no direct, cheap way to distinguish success from failure without separately re-simulating the transaction).
- **gasUsed** — the actual gas consumed, which (per [Gas](../ethereum/gas.md#gas-limit-versus-gas-used-versus-gas-price)) can be less than the transaction's declared gas limit.
- **effectiveGasPrice** — the actual price paid per unit of gas, reflecting the base-fee-plus-tip calculation from [Gas Price and Fees](../ethereum/fees.md#eip-1559-base-fee-plus-tip) for an EIP-1559 transaction.
- **logs** — every event (see [Events and Logs](../contracts/events.md)) the transaction's execution emitted, across every contract call it triggered, not just the top-level call — this is what [Event Indexing](./event-indexing.md) reads to reconstruct what actually happened during a transaction's execution.
- **contractAddress** — populated only for a contract-creation transaction, giving the newly deployed contract's address (see [Contract Creation](../evm/contract-creation.md)).

## Why an application should always check status, not just wait for a receipt to exist

A receipt existing only means the transaction was **mined** — it says nothing about whether execution actually succeeded. Recall from [Errors and Reverts](../contracts/errors.md#why-reverting-undoes-everything-precisely): a reverted transaction still produces a receipt, still consumes gas, and is still permanently recorded — but achieved none of its intended state changes. An application that checks only "does a receipt exist" rather than "does the receipt say `status: success`" will silently treat failed transactions as successful, a real, documented, and easily avoidable class of application bug.

## Common misconceptions

**A receipt is not available the instant a transaction is broadcast** — it only exists once the transaction has actually been included in a mined block; querying for a receipt immediately after broadcasting will return nothing (or an explicit "not found") until that happens, which is exactly what [Sending Transactions](./sending-transactions.md#the-lifecycle)'s `waitForTransactionReceipt` pattern exists to handle correctly.

**gasUsed in the receipt is not necessarily what determines the transaction's total cost** in isolation — total cost is `gasUsed × effectiveGasPrice`; two transactions with identical `gasUsed` can have paid very different total fees if network conditions (and therefore the base fee) differed at the time each was mined.

## Further reading

- [EIP-658: Embedding transaction status code in receipts](https://eips.ethereum.org/EIPS/eip-658)
- [viem documentation: getTransactionReceipt](https://viem.sh/docs/actions/public/getTransactionReceipt)

---

[← Previous: Typed Data and EIP-712](./eip-712.md)
·
[Back to Building Web3 Applications](./README.md)
·
[Next: Event Indexing →](./event-indexing.md)
