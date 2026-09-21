# Events and Logs

Events are how a contract communicates with the outside world *after* a transaction completes, not by returning a value (which only the immediate caller sees), but by writing a record into the block's logs, which any off-chain application can watch for and query later. This chapter covers how they're declared, what actually gets stored, and why they're dramatically cheaper than storage for data that doesn't need to be read back on-chain.

## Declaration and emission

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract EventDemo {
    event Transfer(address indexed from, address indexed to, uint256 value);

    function send(address to, uint256 value) external {
        emit Transfer(msg.sender, to, value);
    }
}
```

Verified: this compiles cleanly with solc 0.8.26, and the ABI output correctly lists `Transfer` as an event with `from` and `to` marked `indexed`.

## Where logs actually live

Recall from [Ethereum Blocks](../ethereum/blocks.md#header-fields-beyond-what-bitcoins-header-carries) that emitted logs are committed to via a block's `receiptsRoot`, not the `stateRoot`. Logs are **not** contract storage, and a contract cannot read its own or any other contract's past emitted events from within the EVM at all. Events exist purely for off-chain consumption: a frontend application, an indexer (see [Event Indexing](../web3/event-indexing.md)), or a block explorer watches for and queries them via `eth_getLogs` (see [JSON-RPC](../ethereum/json-rpc.md#some-of-the-most-commonly-used-methods)), entirely outside the EVM's own execution.

## indexed parameters

Marking a parameter `indexed` (up to three per event) makes it searchable as a filter. An off-chain query can ask for "every `Transfer` event where `to` equals this specific address" efficiently, because indexed parameters are stored in a separate part of the log structure (called **topics**) specifically designed for this kind of filtered lookup, rather than requiring a query to fetch and manually inspect every single log's full data. Non-indexed parameters are still fully recorded (in the log's `data` field) and still readable by anyone querying the event, just not efficiently filterable by their specific value the way indexed ones are.

## Why events are dramatically cheaper than storage

This connects directly to the real, measured gas cost difference demonstrated in [Storage](../evm/storage.md#example-a-value-that-survives-verified-with-real-execution): an `SSTORE` costs up to 20,000 gas for a fresh, non-zero write, while a `LOG` opcode (the underlying mechanism behind `emit`) costs a comparatively modest, mostly size-proportional amount, because logs are never read back by the EVM itself and never contribute to the [state trie](../ethereum/state-trie.md) that every node must maintain going forward, only to the block's (still permanently retained, but differently structured) receipts. This is precisely why event logs, not contract storage, are the standard way to record a full historical trail (every transfer that ever happened to a token, for instance), storing that full history directly in contract storage would be both far more expensive and, given mappings have no native enumeration (see [Mappings](./mappings.md#what-mappings-cannot-do)), awkward to query anyway.

## Common misconceptions

**A contract cannot read events it or any other contract previously emitted**. This is a hard, protocol-level limitation, not a Solidity restriction that could be worked around with different syntax; anything a contract's own logic needs to react to later must be stored in actual [storage](../evm/storage.md), not left in an event log.

**Events are not free, even though they're much cheaper than storage**, a `LOG` opcode's cost scales with the amount of data logged and the number of indexed topics, meaning an event with many fields or excessive per-transaction emission volume still represents a real, measurable gas expense, just a substantially smaller one than the equivalent data written to storage.

## Further reading

- [Solidity documentation: Events](https://docs.soliditylang.org/en/latest/contracts.html#events)
- [Ethereum JSON-RPC: eth_getLogs](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs)

---

[← Previous: Mappings](./mappings.md)
·
[Back to Smart Contracts](./README.md)
·
[Next: Modifiers →](./modifiers.md)
