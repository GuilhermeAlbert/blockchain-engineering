# Sending Transactions

This chapter covers a transaction's full lifecycle from an application's perspective (building, signing, broadcasting, and waiting for confirmation) and the specific points along that lifecycle where things can go wrong in ways an application needs to handle deliberately, not just hope don't happen.

## The lifecycle

```typescript
// 1. Build and send — the wallet signs behind the scenes, per Connecting Wallets.
const hash = await walletClient.sendTransaction({
  to: recipientAddress,
  value: parseEther("0.1"),
});

console.log("transaction broadcast, hash:", hash);

// 2. Wait for confirmation — blocks until the transaction is mined
//    (or, optionally, until a specified number of confirmations pass).
const receipt = await client.waitForTransactionReceipt({ hash, confirmations: 2 });

console.log("confirmed in block:", receipt.blockNumber);
console.log("status:", receipt.status); // "success" or "reverted"
```

`waitForTransactionReceipt` polls (or subscribes, depending on the transport) until the transaction hash appears in a mined block, per [Transaction Receipts](./receipts.md), covered in the next chapter.

## Why "broadcast" and "confirmed" are meaningfully different moments

Recall the general pattern from [The Mempool](../bitcoin/mempool.md) and [Transaction Confirmation](../bitcoin/confirmation.md): a broadcast transaction sits unconfirmed until a block includes it, and (just as on Bitcoin) a small number of confirmations still carries a real, if generally low, risk of a [chain reorganization](../blockchain/reorgs.md) reversing it. Ethereum's proof-of-stake [Finality](../ethereum/finality.md) provides a stronger, faster guarantee than Bitcoin's purely probabilistic model (finalization within roughly two epochs, ~12.8 minutes), but the same underlying principle applies: an application handling meaningful value should generally wait for more than a single confirmation, and ideally for actual finality, before treating a transaction's effects as irreversible.

## Handling failure: reverted versus never-mined

A transaction can fail in two structurally different ways an application needs to distinguish:

- **Reverted on-chain**: the transaction was mined, consumed gas, but its execution reverted (`receipt.status === "reverted"`). The transaction genuinely happened and is permanently recorded, but achieved nothing beyond consuming the sender's gas, per [Errors and Reverts](../contracts/errors.md).
- **Never mined**: the transaction is stuck in the mempool (too low a fee, see [Gas Price and Fees](../ethereum/fees.md)) or was dropped entirely, no gas consumed yet, but no outcome either, until it's replaced, sped up, or eventually dropped by nodes' mempool policies (echoing [The Mempool](../bitcoin/mempool.md#mempool-eviction-and-limits)'s discussion of Bitcoin's analogous behavior).

An application's transaction-tracking logic needs to handle both cases explicitly. Assuming "no receipt yet" always means "still pending, will eventually confirm" is a real, documented source of applications silently hanging on transactions that will, in fact, never confirm.

## Speeding up or canceling a stuck transaction

Because Ethereum transactions include a nonce (see [EOAs](../ethereum/eoa.md#the-nonce-and-why-it-matters-more-than-it-might-first-appear)), a stuck transaction can be replaced by submitting a **new** transaction with the identical nonce but a higher gas price, either the same intended action (a "speed up") or a no-op transaction to self (a "cancel"), exactly the same nonce-based replacement principle behind Bitcoin's [Replace-By-Fee](../bitcoin/mempool.md#replace-by-fee), applied to Ethereum's own mempool and fee mechanics instead.

## Common misconceptions

**A transaction hash existing does not mean the transaction is confirmed or even guaranteed to ever be mined**. The hash is computed and known the moment a transaction is signed, before it's even broadcast, let alone included in a block; treating "I have a hash" as equivalent to "this happened" is a real, avoidable application bug.

**`waitForTransactionReceipt` blocking (or a promise not yet resolving) does not necessarily mean something is wrong**, normal confirmation delay, and especially waiting for multiple confirmations for safety, are expected, not exceptional, and an application's UI should reflect this pending state clearly rather than treating it as an error condition.

## Further reading

- [viem documentation: sendTransaction](https://viem.sh/docs/actions/wallet/sendTransaction)
- [viem documentation: waitForTransactionReceipt](https://viem.sh/docs/actions/public/waitForTransactionReceipt)

---

[← Previous: Calling Contracts](./calling-contracts.md)
·
[Back to Building Web3 Applications](./README.md)
·
[Next: Signing Messages →](./signing-messages.md)
