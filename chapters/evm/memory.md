# Memory

Memory is the EVM's temporary, byte-addressable workspace, used and discarded within a single call, unlike the permanent [Storage](./storage.md) covered next. The `MSTORE` and the implicit memory read in `RETURN` from [Bytecode](./bytecode.md#example-a-complete-minimal-contract-byte-by-byte) already demonstrated memory directly; this chapter covers its specific properties.

## Structure

EVM memory is a linear, byte-addressable array, conceptually starting empty and expanding as needed. `MSTORE` writes a full 32-byte word at a given byte offset; `MSTORE8` writes a single byte; `MLOAD` reads a 32-byte word starting at a given offset. Because it's byte-addressable rather than word-aligned, offsets don't need to be multiples of 32. `MSTORE` at offset 1 writes bytes 1 through 32, overlapping whatever was at bytes 1-31 previously, a detail that matters when tightly packing data for gas efficiency.

## Memory expansion costs gas, and grows quadratically

Unlike the stack's fixed 1024-item limit, memory has no hard upper bound in the protocol itself, but accessing memory at a higher offset than previously used triggers **memory expansion**, and the gas cost of that expansion grows **quadratically**, not linearly, with total memory size (see [Gas Accounting](./gas-accounting.md#memory-expansion-a-specific-non-linear-cost) for the exact formula). This is a deliberate anti-abuse design: linear-cost memory would make it cheap, relative to its resource impact, to allocate enormous amounts of memory; quadratic cost makes very large memory usage disproportionately, deliberately expensive, discouraging exactly the kind of resource-exhaustion pattern gas metering exists to prevent (see [Gas](../ethereum/gas.md#the-problem-gas-solves)).

## Why memory is separate from storage at all

This split exists for the same underlying reason a conventional computer separates RAM from disk: most intermediate computation (building up a string, assembling arguments for a call, temporary scratch space) doesn't need to persist beyond the current call, and using cheaper, call-scoped memory for it rather than the more expensive, permanently-persisted [storage](./storage.md) is a direct, significant gas cost saving, `SSTORE`'s gas cost (see [Gas Accounting](./gas-accounting.md)) is dramatically higher than memory operations, specifically because storage writes impose a permanent, ongoing burden on every full node that has to keep storing that data indefinitely, where memory's cost is paid once and then the space is reclaimed entirely once the call ends.

## Common misconceptions

**Memory is not shared between separate calls, even within the same transaction**. Each call (including a call from one contract to another via [Message Calls](./message-calls.md)) gets its own fresh, empty memory space; passing data between calls requires it to be explicitly included in [calldata](./calldata.md) or return data, not simply left in a shared memory region.

**Memory is not free just because it's cheaper than storage**. The quadratic expansion cost means very large memory usage (loading enormous arrays, for instance) can become a genuinely significant, deliberately discouraged expense well before any storage operations are even involved.

## Further reading

- [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf): Appendix H (Virtual Machine Specification)

---

[← Previous: Stack](./stack.md)
·
[Back to The EVM](./README.md)
·
[Next: Storage →](./storage.md)
