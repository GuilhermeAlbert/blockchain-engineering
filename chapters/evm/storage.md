# Storage

Storage is the only place a contract's data survives between separate calls — everything in [Memory](./memory.md) and the [Stack](./stack.md) is discarded the instant a call finishes. This chapter runs a real `SSTORE`/`SLOAD` sequence to demonstrate both the persistence and the specific, deliberately high cost that persistence carries.

## Structure

Each contract account has its own storage, organized as a mapping from 256-bit keys ("slots") to 256-bit values (see [Ethereum Accounts](../ethereum/accounts.md#what-every-account-contains) for the `storageRoot` field this maps onto, and [State Trie](../ethereum/state-trie.md) for the underlying data structure). Unlike memory, storage slots default to zero and, critically, **persist across every future call to that contract**, for as long as the contract exists — this is the entire mechanism behind a token's balance mapping, a DeFi protocol's pool reserves, or any other on-chain state that needs to outlive a single transaction.

## Example: a value that survives, verified with real execution

```typescript
import { createEVM } from "@ethereumjs/evm";
import { Account, bytesToHex, createAddressFromString, hexToBytes } from "@ethereumjs/util";

const evm = await createEVM();
const caller = createAddressFromString("0x00000000000000000000000000000000000000ee");
const contract = createAddressFromString("0x00000000000000000000000000000000000000c0");

// PUSH1 0x2a PUSH1 0x00 SSTORE   -- store 42 at storage slot 0
// PUSH1 0x00 SLOAD               -- load slot 0 back
// PUSH1 0x00 MSTORE              -- put it in memory
// PUSH1 0x20 PUSH1 0x00 RETURN   -- return it
const code = hexToBytes("0x602a600055600054600052602060" + "00f3");
await evm.stateManager.putCode(contract, code);
await evm.stateManager.putAccount(caller, new Account(0n, 1_000_000_000_000n));

const result = await evm.runCall({ caller, to: contract, gasLimit: 100_000n });
console.log("Return value:", BigInt(bytesToHex(result.execResult.returnValue)));
console.log("Gas used:", result.execResult.executionGasUsed.toString());
```

Verified output from running this exact code:

```text
Return value: 42n
Gas used: 22224
```

The value written by `SSTORE` and read back by `SLOAD` **within the same call** correctly round-trips to 42 — but look at the gas cost: **22,224**, dramatically more than the 18 gas the near-identical memory-only example in [Bytecode](./bytecode.md) consumed for essentially the same "store a value, return it" logic. That difference is almost entirely the cost of one `SSTORE` writing a previously-zero slot to a non-zero value (20,000 gas, per [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929)'s gas schedule) plus one `SLOAD` on a "cold" (not-yet-accessed-this-transaction) slot (2,100 gas) — real, measured, and exactly the deliberate storage-versus-memory cost asymmetry [Memory](./memory.md#why-memory-is-separate-from-storage-at-all) already described conceptually, now demonstrated with an actual number.

## Storage layout for complex types

Solidity (see [State Variables](../contracts/state.md)) assigns storage slots to a contract's declared state variables in declaration order for simple types, but uses **hashing** for more complex types: a `mapping`'s value for key `k` is stored at slot `keccak256(k . p)` (where `p` is the mapping's own declared slot position), and a dynamic array's elements are stored starting at `keccak256(p)` — a scheme specifically designed so that slots for different keys or array indices don't collide with each other or with the contract's other declared variables, without needing to know in advance how large a mapping or array will eventually grow.

## Common misconceptions

**Storage is not automatically "public" or freely readable by other contracts through some built-in access mechanism** — it's fully readable by anyone inspecting the blockchain directly (nothing on a public blockchain is confidential, see [Privacy](../society/privacy.md)), but another *contract* can only read it through its own `SLOAD` calls against its own storage, or by calling a function the target contract explicitly exposes to return that data — there's no cross-contract `SLOAD` of another contract's storage directly.

**A storage slot defaulting to zero is indistinguishable, at the EVM level, from a slot that was explicitly set to zero.** This has real, occasionally consequential implications for contract logic that needs to distinguish "never set" from "explicitly set to the zero value" — such logic has to track that distinction itself, in a separate variable, since the EVM's storage model provides no such distinction natively.

## Further reading

- [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) — Appendix H (Virtual Machine Specification)
- [EIP-2929: Gas cost increases for state access opcodes](https://eips.ethereum.org/EIPS/eip-2929)
- [Solidity documentation: Layout of State Variables in Storage](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html)

---

[← Previous: Memory](./memory.md)
·
[Back to The EVM](./README.md)
·
[Next: Calldata →](./calldata.md)
