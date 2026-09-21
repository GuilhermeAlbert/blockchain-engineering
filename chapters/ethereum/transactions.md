# Ethereum Transactions

An Ethereum transaction directly debits a sender's account balance and credits a recipient's (or, for a contract call, triggers code execution) a structurally different operation than the UTXO-consuming transactions covered in [Bitcoin Transactions](../bitcoin/transactions.md). This chapter covers the transaction fields and the transaction type that's been Ethereum's default since 2021.

## Core fields

- **nonce**: the sender's current transaction count, covered in [EOAs](./eoa.md#the-nonce-and-why-it-matters-more-than-it-might-first-appear).
- **to**: the recipient address, or empty for a contract-creation transaction (see [Contract Creation](../evm/contract-creation.md)).
- **value**: the amount of ether (in wei) to transfer.
- **data**: arbitrary byte data, used to encode a function call and its arguments when calling a contract (see [Contract ABI](../contracts/abi.md)), or contract initialization code for a creation transaction.
- **gasLimit**: the maximum amount of [gas](./gas.md) the sender is willing to have this transaction consume.
- **signature** (v, r, s), the ECDSA signature authorizing the transaction, covering everything else in the transaction.
- **chainId**: which network this transaction is valid on (see [Chain IDs](../web3/README.md)), preventing a transaction signed for one network from being replayed on a different one.

## Transaction types: legacy versus EIP-1559

Ethereum has used more than one transaction format over its history, distinguished by a **type byte**:

- **Type 0 (legacy)**: the original format, using a single `gasPrice` field, the sender specifies exactly how much they're willing to pay per unit of gas, and (before EIP-1559) the entire amount goes to the miner/validator who includes the transaction.
- **Type 2 (EIP-1559)**: introduced in the **London upgrade** (August 5, 2021) and the default format since, replacing the single `gasPrice` with two separate fields (`maxFeePerGas` and `maxPriorityFeePerGas`) feeding into the base-fee-and-tip mechanism covered fully in [Gas Price and Fees](./fees.md#eip-1559-the-base-fee-and-tip-model).

## Example: constructing and inspecting a transaction's fields with viem

```typescript
import { parseEther, parseGwei } from "viem";

const transaction = {
  to: "0x0000000000000000000000000000000000dEaD" as const, // a conventional "burn" address
  value: parseEther("0.01"),
  maxFeePerGas: parseGwei("20"),
  maxPriorityFeePerGas: parseGwei("1.5"),
  gas: 21_000n, // the fixed cost of a simple ETH transfer — see chapters/ethereum/gas.md
};

console.log("value (wei):", transaction.value.toString());
console.log("maxFeePerGas (wei):", transaction.maxFeePerGas.toString());
console.log("maxPriorityFeePerGas (wei):", transaction.maxPriorityFeePerGas.toString());
```

Verified output from running this exact code:

```text
value (wei): 10000000000000000
maxFeePerGas (wei): 20000000000
maxPriorityFeePerGas (wei): 1500000000
```

This specific example only constructs and displays the fields locally (`parseEther`/`parseGwei` are pure unit-conversion functions), so it doesn't require network access, unlike the account-reading example in [Ethereum Accounts](./accounts.md#example-reading-an-accounts-state).

## Common misconceptions

**An Ethereum transaction's `data` field is not the same thing as a Bitcoin transaction's script**. It's typically ABI-encoded function-call data interpreted by the EVM when executing a contract, a fundamentally different mechanism from Bitcoin's stack-based locking/unlocking scripts (see [Bitcoin Script](../bitcoin/script.md)), even though both serve a broadly analogous "specify what this transaction is instructing" role.

**Setting a high `gasLimit` does not mean a transaction will necessarily consume that much gas**. It's a ceiling, not a target; a simple ETH transfer consumes exactly 21,000 gas regardless of a higher configured limit, and any unused gas (up to the limit) is not charged (see [Gas](./gas.md)).

## Further reading

- [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf): Section 4.2 (The Transaction)
- [EIP-1559: Fee market change for ETH 1.0 chain](https://eips.ethereum.org/EIPS/eip-1559)
- [EIP-155: Simple replay attack protection (chain ID)](https://eips.ethereum.org/EIPS/eip-155)

---

[← Previous: Contract Accounts](./contract-accounts.md)
·
[Back to Ethereum](./README.md)
·
[Next: Gas →](./gas.md)
