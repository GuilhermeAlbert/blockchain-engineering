# The EVM

The Ethereum Virtual Machine is what actually runs when a contract account (see [Contract Accounts](../ethereum/contract-accounts.md)) gets called, a stack-based virtual machine executing bytecode, one opcode at a time, metered by gas. This section goes inside it directly: every code example runs real bytecode against a real, independent EVM implementation, not a description of what the bytecode is supposed to do.

## What you need to know first

[Contract Accounts](../ethereum/contract-accounts.md) and [Gas](../ethereum/gas.md). This section assumes you understand why contracts need code and why that code's execution needs to be metered, and goes into the mechanism itself.

## Chapters

1. [Bytecode](./bytecode.md): a complete, six-byte contract, executed and verified
2. [Opcodes](./opcodes.md): the full instruction set by category, plus a verified arithmetic example
3. [Stack](./stack.md): 1024 items, DUP/SWAP, and why a stack machine over named registers
4. [Memory](./memory.md): byte-addressable, call-scoped, and quadratically priced past a point
5. [Storage](./storage.md): the only place state survives between calls, with its real gas cost measured directly
6. [Calldata](./calldata.md): read-only input data, and its surprising connection to Layer 2 costs
7. [Message Calls](./message-calls.md): CALL, STATICCALL, and DELEGATECALL's borrowed-code mechanism explained precisely
8. [Contract Creation](./contract-creation.md): CREATE's nonce-dependent addressing versus CREATE2's determinism
9. [Gas Accounting](./gas-accounting.md): intrinsic cost, the memory formula verified, and why refunds got cut

## Next

Continue to [Smart Contracts](../contracts/README.md), where Solidity compiles down to exactly the bytecode this section examined directly, now from the higher-level language side.
