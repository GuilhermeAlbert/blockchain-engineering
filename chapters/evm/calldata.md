# Calldata

Calldata is the input data attached to a call, the same `data` field introduced in [Ethereum Transactions](../ethereum/transactions.md#core-fields) for a top-level transaction, and the equivalent input data passed along an internal [message call](./message-calls.md) between contracts. This chapter covers what it actually contains and why it's treated differently from memory.

## What calldata actually holds

For an ordinary contract call, calldata is [ABI-encoded](../contracts/abi.md) data: the first 4 bytes identify which function is being called (a **function selector**, derived from hashing the function's signature. See [Selectors](../contracts/abi.md#function-selectors)), followed by the ABI-encoded arguments to that function. The `CALLDATALOAD`, `CALLDATASIZE`, and `CALLDATACOPY` opcodes let executing code read this data. `CALLDATALOAD` reads a 32-byte word starting at a given offset, `CALLDATACOPY` copies a range of calldata bytes into memory for further processing.

## Why calldata is read-only and separate from memory

Calldata is explicitly **read-only** from the executing contract's perspective. There's no `CALLDATASTORE` opcode, because calldata represents the caller's input, fixed at the moment the call was made, not something the callee should be able to mutate. Keeping it structurally separate from [Memory](./memory.md) (rather than simply copying it into memory automatically) also has a real gas-efficiency benefit: a contract that only needs to read a few specific fields from a large calldata payload can do so directly via `CALLDATALOAD` without paying the memory-expansion cost of copying the entire payload into memory first, unless it actually needs to.

## Calldata gas cost, and why EIP-4844's blob pricing matters here indirectly

Calldata itself has a real, direct gas cost, historically higher per non-zero byte than per zero byte, specifically because non-zero bytes were judged more likely to represent meaningful, compressible-poorly data worth pricing higher (a detail later revisited by [EIP-2028](https://eips.ethereum.org/EIPS/eip-2028), which reduced the non-zero-byte cost specifically to make data-heavy use cases, including early Layer 2 rollups posting transaction data via calldata, more economical). This is the direct link to [Layer 2](../layer-2/README.md)'s later chapters: before [EIP-4844](../layer-2/eip-4844.md) introduced dedicated, separately priced blob space, rollups posting their transaction data back to Ethereum for [data availability](../layer-2/data-availability.md) had no better option than paying ordinary calldata gas costs for that data, a real, significant expense this section's calldata gas cost directly explains the origin of.

## Common misconceptions

**Calldata is not free just because it isn't "storage" in the persistent-state sense**. It has a real, direct gas cost proportional to its size, which is exactly why efficient ABI encoding (packing arguments tightly, avoiding unnecessary padding) matters for gas-conscious contract and dapp design.

**Calldata is not the same thing as an event log's data** (see [Events and Logs](../contracts/events.md)). Calldata is the *input* to a call, consumed during execution; logs are *output*, emitted during execution and stored separately in the block's receipts (see [Ethereum Blocks](../ethereum/blocks.md#header-fields-beyond-what-bitcoins-header-carries)), for external observers to later query.

## Further reading

- [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf): Appendix H (Virtual Machine Specification)
- [EIP-2028: Transaction data gas cost reduction](https://eips.ethereum.org/EIPS/eip-2028)

---

[← Previous: Storage](./storage.md)
·
[Back to The EVM](./README.md)
·
[Next: Message Calls →](./message-calls.md)
