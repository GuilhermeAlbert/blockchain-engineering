# Contract ABI

The ABI (Application Binary Interface) is how anything outside a contract (a wallet, another contract, a frontend application) knows how to correctly encode a call to it and decode what it returns. This chapter covers exactly how a function call becomes bytes, verified against a real, independently computable value.

## What the ABI actually is

An ABI is a JSON description of a contract's functions, their parameter types, return types, and events, generated automatically by the compiler from the contract's source (visible directly in the `abi` field of the compiler output demonstrated in [Solidity](./solidity.md#a-complete-minimal-contract)). It's not deployed on-chain alongside the contract; it's metadata used by off-chain tooling to construct correctly formatted calldata and to interpret the raw bytes a contract returns.

## Function selectors

Every function call's [calldata](../evm/calldata.md#what-calldata-actually-holds) begins with a 4-byte **function selector**, the first 4 bytes of `keccak256(functionSignature)`, where the signature is the function's name and parameter types, with no spaces, no parameter names, no return type (`transfer(address,uint256)`, not `transfer(address to, uint256 amount)`).

```typescript
import { keccak256, toBytes } from "viem";

const selector = keccak256(toBytes("transfer(address,uint256)")).slice(0, 10);
console.log("selector:", selector);
```

Verified output from running this exact code:

```text
selector: 0xa9059cbb
```

This is the actual, well-known selector for ERC-20's `transfer(address,uint256)` function (see [ERC-20](../tokens/erc-20.md)), recognizable across essentially every block explorer and token contract on Ethereum, computed here independently rather than simply asserted.

## Encoding arguments

Following the 4-byte selector, arguments are encoded according to fixed rules: static types (like `address` and `uint256`) are encoded directly, padded to 32 bytes each; dynamic types (like `string`, `bytes`, or arrays) are encoded as an offset pointing to where their actual data appears later in the calldata, with the data itself including a length prefix. This encoding scheme is precisely and formally specified, not a convention different tools might implement slightly differently, but a strict standard every correct ABI encoder/decoder must follow identically, which is exactly what lets a Python script, a `viem`-based TypeScript app, and Solidity's own internal call-encoding all interoperate correctly when calling the same contract.

## Example: a full encoded call, decoded piece by piece

```typescript
import { encodeFunctionData, decodeFunctionData, parseAbi } from "viem";

const abi = parseAbi(["function transfer(address to, uint256 amount) returns (bool)"]);

const data = encodeFunctionData({
  abi,
  functionName: "transfer",
  args: ["0x000000000000000000000000000000000000dEaD", 1000000000000000000n],
});

console.log("encoded calldata:", data);

const decoded = decodeFunctionData({ abi, data });
console.log("decoded function:", decoded.functionName);
console.log("decoded args:", decoded.args);
```

Verified output from running this exact code:

```text
encoded calldata: 0xa9059cbb000000000000000000000000000000000000000000000000000000000000dead0000000000000000000000000000000000000000000000000de0b6b3a7640000
decoded function: transfer
decoded args: [ '0x000000000000000000000000000000000000dEaD', 1000000000000000000n ]
```

Notice the calldata's first 4 bytes, `a9059cbb`, exactly the selector this chapter computed independently above, confirming `viem`'s encoder and the manual `keccak256` computation agree, as the ABI specification requires them to.

## Common misconceptions

**A function selector collision (two different function signatures producing the same 4-byte selector) is a real, if extremely rare, possibility** given only 4 bytes (2^32 possible values). Solidity's compiler checks for and rejects selector collisions *within a single contract* at compile time, but a selector collision *across two different, unrelated contracts* is possible and has occasionally been exploited or discussed as a security consideration, particularly for proxy patterns (see [Proxy Contracts](./proxies.md)) that route calls based on selector matching.

**The ABI is not required to be published or verified for a contract to function**. A contract works purely based on its deployed bytecode's own logic, regardless of whether anyone has published a matching ABI; the ABI is a convenience for *interacting* with a contract correctly, not something the EVM itself checks or enforces at call time.

## Further reading

- [Solidity documentation: Contract ABI Specification](https://docs.soliditylang.org/en/latest/abi-spec.html)

---

[← Previous: Solidity](./solidity.md)
·
[Back to Smart Contracts](./README.md)
·
[Next: Functions →](./functions.md)
