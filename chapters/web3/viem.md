# viem

Every code example throughout this book's Ethereum, EVM, Tokens, and Web3 chapters uses `viem` — a TypeScript library for interacting with Ethereum, chosen specifically for the reasons this short chapter explains, rather than treated as an unexamined default.

## What viem actually provides, on top of raw JSON-RPC

Recall [JSON-RPC](../ethereum/json-rpc.md#why-higher-level-libraries-exist-on-top-of-this"): raw JSON-RPC calls require manually encoding function calls, manually converting hex values, and manually handling dozens of method-specific parameter formats. `viem` wraps this in a type-safe, ergonomic API — `readContract`, `writeContract`, `getLogs`, and the other functions used throughout this book's examples — while remaining a thin, transparent layer: every `viem` call in this book's verified examples ultimately compiles down to exactly the raw JSON-RPC calls demonstrated directly in [JSON-RPC](../ethereum/json-rpc.md#example-a-raw-json-rpc-call-no-library).

## Public clients versus wallet clients

`viem` separates read access from write/signing access into two distinct client types, mirroring the [reading state](./reading-state.md) versus [sending transactions](./sending-transactions.md) distinction already covered:

```typescript
import { createPublicClient, createWalletClient, http, custom } from "viem";
import { mainnet } from "viem/chains";

// Read-only — no wallet, no signing capability, safe to use anywhere.
const publicClient = createPublicClient({ chain: mainnet, transport: http() });

// Read AND write — requires a signer (a browser wallet, or a private
// key account for scripts/backends — never hardcode a real private key,
// see chapters/wallets/seed-phrases.md).
const walletClient = createWalletClient({ chain: mainnet, transport: custom(window.ethereum) });
```

This split is a deliberate API design choice reflecting a real security boundary: a `publicClient` genuinely cannot sign or send anything, no matter how it's used, which makes it safe to construct and use freely (in a frontend, a backend service, a script) without any risk of accidentally exposing signing capability where it isn't needed.

## Type safety from the ABI

Because `viem` is written in TypeScript with strong generic types, passing a properly-typed ABI (as this book's examples do with `parseAbi`) gives compile-time type checking on function names, argument types, and return types — a real, practical benefit that catches a class of integration bugs (a mistyped function name, a wrong argument type) at build time rather than as a runtime failure against a live contract.

## Why this book uses viem specifically

`viem` was chosen for this book's examples for reasons stated plainly rather than left implicit: it's actively maintained, has become a widely adopted standard across the Ethereum developer ecosystem (including being the default underlying client for [wagmi](./wagmi.md), covered next), and its API design closely mirrors the underlying JSON-RPC and ABI concepts this book teaches directly — making it easier to see the connection between `viem`'s ergonomic calls and the raw mechanics underneath, rather than obscuring them behind heavier abstraction. Alternative libraries (ethers.js, historically the most widely used predecessor) remain valid, well-maintained choices; this book's consistent use of `viem` is a pedagogical choice for consistency across chapters, not a claim that it's the only reasonable option.

## Common misconceptions

**viem is not a blockchain node or an RPC provider itself** — it's a client library that talks to whatever RPC endpoint (a public one, or your own node, see [RPC Providers](./rpc-providers.md)) you configure its `transport` with; it has no independent access to chain data without an underlying RPC connection.

**Using viem does not remove the trust considerations covered in [RPC Providers](./rpc-providers.md)** — the library faithfully relays whatever the configured RPC endpoint returns; verifying that data's accuracy independently (or trusting the endpoint) remains exactly the same consideration regardless of which client library is used to make the request.

## Further reading

- [viem documentation](https://viem.sh/)

---

[← Previous: Event Indexing](./event-indexing.md)
·
[Back to Building Web3 Applications](./README.md)
·
[Next: wagmi →](./wagmi.md)
