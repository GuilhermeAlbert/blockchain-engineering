# Progress

This file tracks the state of each section of the book. Statuses: `Planned`, `Drafting`, `Review`, `Complete`.

A section is `Complete` only when every linked chapter exists, is substantive (not a stub), has been checked against the `no-ai-slop` style rules, and its internal links resolve.

| Section | Status | Notes |
| --- | --- | --- |
| Origins | Complete | 10 chapters + README. Sourced from whitepaper, mailing-list archives, and court record (Wright ruling). |
| Economics | Complete | 26 chapters + README. Austrian economics sourced to primary texts; claims about Bitcoin explicitly separated from what each economist wrote. |
| Cryptography | Complete | 15 chapters + README. All code examples run and verified (Node crypto + @noble/curves v2.x). |
| Distributed Systems | Complete | 9 chapters + README. Whitepaper Section 11 formula independently computed and verified against published table. |
| Blockchain Fundamentals | Complete | 12 chapters + README. |
| Bitcoin | Complete | 37 chapters + README. Deepest section of the book. All numeric/code examples verified by execution. |
| Forks | Complete | 13 chapters + README. Case studies fact-checked (dates/block heights verified); one fabricated pseudonym-to-real-name attribution caught and corrected during drafting. |
| Wallets | Complete | 15 chapters + README. All derivation/mnemonic examples run and verified (@scure/bip39, @scure/bip32); uses only the official BIP-39 test vector or trivial test keys, never real entropy. |
| Bitcoin Scaling | Complete | 10 chapters + README. Distinguishes trust models (federation/statechain/BitVM) carefully rather than treating "Layer 2" as one category. |
| Lightning | Complete | 9 chapters + README. One citation error caught (BOLT 13 lives outside the core lightning/bolts repo as a draft) and corrected. |
| Ethereum | Complete | 19 chapters + README. Live JSON-RPC and viem examples verified against real mainnet data; EIP-1559 base fee formula independently computed and verified. |
| EVM | Complete | 9 chapters + README. Every bytecode example executed against a real EVM implementation (@ethereumjs/evm), including a real SSTORE/SLOAD gas cost measurement. |
| Contracts | Complete | 15 chapters + README. Nearly every non-trivial Solidity snippet compiled with solc 0.8.26 and confirmed clean, including a working minimal proxy with inline Yul assembly. |
| Tokens | Complete | 11 chapters + README. All interfaces/contracts compile with solc 0.8.26; WETH's real mainnet address verified live via viem (returns name/symbol correctly). |
| Web3 | Complete | 12 chapters + README. Nearly every non-browser example run live against mainnet (receipts, eth_getLogs, EIP-712 round-trip, EIP-191 round-trip). |
| DeFi | Planned | AMMs, lending, oracles, Uniswap/Aave case studies. |
| Layer 2 | Planned | Rollups, data availability, blobs, bridges. |
| Security | Planned | Defensive-only; historical case studies. |
| Infrastructure | Planned | Nodes, RPC, indexing, reorg handling. |
| Governance | Planned | BIPs, EIPs, DAOs, on/off-chain governance. |
| Society | Planned | Custody, KYC/AML, privacy, CBDCs. |
| Glossary | Drafting | Built incrementally alongside each section. |
| Resources | Drafting | Built incrementally alongside each section. |
| examples/simple-blockchain | Complete | TypeScript, runnable (`npm run demo` / `npm test`), 8/8 tests passing, type-checks clean. |
| examples/bitcoin | Complete | Decodes real, verified on-chain tx/block data (txid + block hash + PoW target all confirmed to match). Live-fetch variant included. 7/7 tests passing. |
| examples/wallet-stats | Planned | Read-only web3 app (TypeScript/viem). |
| examples/ethereum-rpc | Planned | JSON-RPC exercises. |
| examples/solidity | Planned | Foundry-based contract examples. |
| examples/defi | Planned | AMM math and swap inspection. |
| examples/indexer | Planned | Small event indexer. |

## Working notes

- Filenames carry no numeric prefixes; reading order comes from links in section README files and the top-level README.
- Every chapter must end with a navigation footer linking to the previous chapter, the section index, and the next chapter.
- Run a link check after each batch of new files (see `notes/link-check.md` once created).
