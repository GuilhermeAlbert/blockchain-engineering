# Opcodes

An opcode is a single instruction the EVM understands. Roughly 140 are currently defined, each a single byte, each with a fixed [gas cost](./gas-accounting.md). This chapter organizes them by category and demonstrates arithmetic execution directly, building on the raw bytecode walkthrough in [Bytecode](./bytecode.md).

## Opcode categories

| Category | Examples | Purpose |
| --- | --- | --- |
| Arithmetic | `ADD`, `SUB`, `MUL`, `DIV`, `MOD`, `EXP` | Basic integer math, all operating on 256-bit words |
| Comparison & bitwise | `LT`, `GT`, `EQ`, `AND`, `OR`, `XOR`, `NOT` | Comparisons and bit manipulation |
| Stack manipulation | `PUSH1`-`PUSH32`, `POP`, `DUP1`-`DUP16`, `SWAP1`-`SWAP16` | Moving values on and off the stack (see [Stack](./stack.md)) |
| Memory | `MLOAD`, `MSTORE`, `MSTORE8`, `MSIZE` | Reading and writing transient memory (see [Memory](./memory.md)) |
| Storage | `SLOAD`, `SSTORE` | Reading and writing persistent contract storage (see [Storage](./storage.md)) |
| Control flow | `JUMP`, `JUMPI`, `JUMPDEST`, `PC` | Conditional and unconditional jumps, the EVM's only branching mechanism |
| Environment | `CALLER`, `CALLVALUE`, `ADDRESS`, `BALANCE`, `TIMESTAMP` | Reading information about the current call and block context |
| Calls | `CALL`, `DELEGATECALL`, `STATICCALL`, `CALLCODE` | Invoking other contracts (see [Message Calls](./message-calls.md)) |
| Logging | `LOG0`-`LOG4` | Emitting events (see [Events and Logs](../contracts/events.md)) |
| System | `CREATE`, `CREATE2`, `RETURN`, `REVERT`, `STOP`, `SELFDESTRUCT` | Contract creation, halting, and (historically) self-destruction |

## Every arithmetic operation works on 256-bit words

This is a specific, consequential design choice worth stating directly: the EVM's native word size is 256 bits (32 bytes), every stack value, every arithmetic operation, operates on this fixed width, chosen specifically because it's large enough to hold a Keccak-256 or SHA-256 hash output, or a secp256k1 curve coordinate, in a single word, without needing multi-word arithmetic for the cryptographic operations Ethereum relies on constantly.

## Example: verified execution of ADD

```typescript
import { createEVM } from "@ethereumjs/evm";
import { hexToBytes, bytesToHex } from "@ethereumjs/util";

// PUSH1 0x05, PUSH1 0x03, ADD, PUSH1 0x00, MSTORE, PUSH1 0x20, PUSH1 0x00, RETURN
// Computes 5 + 3 and returns the result.
const code = hexToBytes("0x600560030160005260206000f3");

const evm = await createEVM();
const result = await evm.runCode({ code });
console.log("5 + 3 =", BigInt(bytesToHex(result.returnValue)));
```

Verified output from running this exact code:

```text
5 + 3 = 8n
```

Note the opcode for addition is `01` (following `ADD`'s position in the opcode table), the byte sequence `60 05 60 03 01` is `PUSH1 0x05`, `PUSH1 0x03`, `ADD`, leaving `8` on top of the stack before the same memory-store-and-return sequence from [Bytecode](./bytecode.md#example-a-complete-minimal-contract-byte-by-byte) returns it.

## Why control flow uses JUMPDEST specifically

Unlike a conventional processor, the EVM requires every jump target to be marked with an explicit `JUMPDEST` opcode in the bytecode itself, jumping to any byte position that isn't marked `JUMPDEST` is invalid and reverts execution, even if that byte happens to numerically match a valid instruction. This is a deliberate security measure: it prevents a specific class of exploit where an attacker could construct a jump that lands in the *middle* of a multi-byte `PUSH` instruction's data (which isn't really an instruction at all, just data that happens to look like one from a different starting offset), potentially causing the EVM to misinterpret data as code in an attacker-controlled way.

## Common misconceptions

**Not every 256-bit value on the stack represents a number in the ordinary sense**. The same 32-byte word width is used to hold addresses (padded to 32 bytes from their native 20), boolean values (`0` or `1`), hashes, and arbitrary packed data; the EVM itself doesn't track or enforce any type distinction between these uses, which is entirely the responsibility of the compiler (like Solidity) generating correct bytecode.

**`SELFDESTRUCT` no longer deletes a contract's code and storage the way it originally did**, following [EIP-6780](https://eips.ethereum.org/EIPS/eip-6780) (activated with the Cancun upgrade, 2024). It now only sends the contract's remaining balance to a specified address, unless called within the same transaction the contract was created in, a change made specifically to reduce a category of state-management complexity the original, unrestricted deletion behavior created for node implementations.

## Further reading

- [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf): Appendix H (Virtual Machine Specification)
- [evm.codes](https://www.evm.codes/): an interactive, opcode-by-opcode reference

---

[← Previous: Bytecode](./bytecode.md)
·
[Back to The EVM](./README.md)
·
[Next: Stack →](./stack.md)
