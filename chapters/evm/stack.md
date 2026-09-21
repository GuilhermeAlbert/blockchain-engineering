# Stack

The EVM is a stack machine. Nearly every opcode reads its operands from the top of a stack and pushes its result back onto it, the identical execution model already demonstrated directly in [Bytecode](./bytecode.md) and [Opcodes](./opcodes.md#example-verified-execution-of-add). This chapter covers the stack's specific properties and limits.

## Structure and limits

The EVM stack holds 256-bit words (see [Opcodes](./opcodes.md#every-arithmetic-operation-works-on-256-bit-words)) and is limited to a **maximum depth of 1024 items**, a fixed protocol constant. Exceeding this limit (a "stack overflow," in EVM-specific terminology, distinct from the general programming concept of the same name applied to a call stack) causes the current execution context to revert. Most opcodes only ever interact with the top few stack items (`ADD` pops two and pushes one, `PUSH1` pushes one, and so on) with `DUP` and `SWAP` opcodes providing the only way to reach deeper into the stack (up to 16 items back, for `DUP1`-`DUP16` and `SWAP1`-`SWAP16`).

## Why DUP and SWAP exist

Because the stack only exposes its top few items directly to most operations, `DUP` (duplicate an item from up to 16 positions back onto the top) and `SWAP` (exchange the top item with one up to 16 positions back) are the mechanisms that let bytecode reorder and reuse values without needing memory or storage for simple, local computation. This is why compiled Solidity bytecode is dense with `DUP` and `SWAP` instructions even for fairly simple expressions: the compiler is constantly rearranging the stack to get the right operands into position for the next operation.

## Why the stack, specifically, rather than named registers

A stack machine (as opposed to a register machine, which most physical CPUs are) has a specific advantage for this context: it needs no fixed set of named storage locations for intermediate values, which keeps the instruction set and bytecode format simpler, every operation implicitly knows where to find its operands (the top of the stack) without needing to encode which specific register to read from. The cost is that compiled code often needs more instructions overall (the `DUP`/`SWAP` shuffling mentioned above) than an equivalent register-based instruction sequence might need, a real, accepted tradeoff in exchange for the EVM's overall simplicity.

## Common misconceptions

**The EVM stack is not the same thing as a contract's persistent storage**. The stack exists only for the duration of a single call's execution and is discarded entirely once that call finishes; nothing about stack contents survives between separate calls to the same contract, unlike [Storage](./storage.md), which explicitly does persist.

**"Stack too deep" (a real, commonly encountered Solidity compiler error) is not a runtime EVM error** in most cases; it's typically the *compiler* determining, ahead of time, that a function has too many local variables active simultaneously to fit within reach of the stack's DUP/SWAP addressing limits, and refusing to compile rather than generating bytecode that would later fail unpredictably.

## Further reading

- [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf): Appendix H (Virtual Machine Specification)

---

[← Previous: Opcodes](./opcodes.md)
·
[Back to The EVM](./README.md)
·
[Next: Memory →](./memory.md)
