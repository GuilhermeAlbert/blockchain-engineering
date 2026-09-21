# Bytecode

EVM bytecode is what a contract account's code field (introduced in [Contract Accounts](../ethereum/contract-accounts.md)) actually contains, a sequence of single-byte instructions the EVM executes one at a time. This chapter runs a minimal, real contract from raw bytecode to demonstrate the mechanism directly, rather than treating "bytecode" as an abstract black box.

## What bytecode actually looks like

Each byte in EVM bytecode is either an **opcode** (an instruction, covered fully in [Opcodes](./opcodes.md)) or, immediately following a `PUSH` opcode, raw data to be pushed onto the stack. There's no separator, no whitespace, no human-readable structure at all in the raw form, just a dense sequence of bytes the EVM interprets strictly left to right.

## Example: a complete, minimal contract, byte by byte

This bytecode stores the value 42 in memory and returns it, short enough to walk through entirely by hand:

```text
602a60005260206000f3

60 2a   PUSH1 0x2a     — push the value 42 onto the stack
60 00   PUSH1 0x00     — push memory offset 0 onto the stack
52      MSTORE         — pop offset and value, store 42 at memory[0:32]
60 20   PUSH1 0x20     — push length 32 (0x20) onto the stack
60 00   PUSH1 0x00     — push memory offset 0 onto the stack
f3      RETURN         — pop offset and length, return memory[0:32]
```

```typescript
import { createEVM } from "@ethereumjs/evm";
import { hexToBytes, bytesToHex } from "@ethereumjs/util";

const evm = await createEVM();
const code = hexToBytes("0x602a60005260206000f3");

const result = await evm.runCode({ code });
console.log("returned bytes (hex):", bytesToHex(result.returnValue));
console.log("gas used:", result.executionGasUsed.toString());
```

Verified output from running this exact code, using [`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm), a real, independent EVM implementation, not a simulation built for this book:

```text
returned bytes (hex): 0x000000000000000000000000000000000000000000000000000000000000002a
gas used: 18
```

The returned value, read as a 256-bit integer, is `0x2a` (decimal 42) exactly what the bytecode was constructed to return. This is a genuine, if trivial, EVM execution: the same interpreter loop (fetch instruction, execute, advance) that runs every deployed Ethereum contract, running against six bytes of raw, hand-written machine code.

## Where bytecode comes from in practice

Almost no one writes raw bytecode by hand for real contracts, [Solidity](../contracts/solidity.md) and other higher-level languages compile down to exactly this kind of byte sequence, which is what actually gets deployed and stored in a contract account's code (see [Contract Creation](./contract-creation.md) for the deployment mechanism). Understanding the raw form matters anyway, for the same reason understanding Bitcoin's raw transaction serialization mattered in [Bitcoin Transactions](../bitcoin/transactions.md#example-building-and-hashing-a-simplified-transaction). It demystifies what the higher-level tooling is actually producing and lets you verify, rather than simply trust, what a compiler generated.

## Common misconceptions

**Bytecode is not the same thing as Solidity source code**, and a deployed contract's bytecode cannot be mechanically reversed back into the original source with full fidelity. Decompilers exist and can recover an approximation of the logic, but variable names, comments, and the exact original source structure are gone once compiled, discarded during compilation and never stored on-chain at all.

**Not every byte in a bytecode sequence is necessarily reachable or meaningful during execution**. `PUSH` data bytes are a clear example (they're data, not instructions, even though they occupy space directly following the opcode), and compiled contracts often include dead code paths or metadata (like a trailing Solidity compiler version hash) that execution never actually reaches.

## Further reading

- [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf): Section 9 (Execution Model)
- [`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm): the library used in this chapter's example

---

[← Previous: Finality](../ethereum/finality.md)
·
[Back to The EVM](./README.md)
·
[Next: Opcodes →](./opcodes.md)
