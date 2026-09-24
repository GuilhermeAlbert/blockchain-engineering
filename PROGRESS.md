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
| DeFi | Complete | 22 chapters + README. Impermanent loss and constant-product slippage derived and verified numerically across multiple scenarios; protocol case studies (Uniswap, Aave, MakerDAO/Sky, Curve) fact-checked against primary sources, including exact dates and the July 2023 Vyper compiler exploit's root cause. |
| Layer 2 | Complete | 18 chapters + README. EIP-4844 blob base fee formula independently computed and verified against a range of excess-demand scenarios; rollup decentralization claims (Arbitrum's BOLD, Base's Stage 1 status) checked against current, dated sources rather than launch-era assumptions. |
| Security | Complete | 16 chapters + README. Threat models, incident analysis, contract failures, bridge risk, operational security, and defensive testing. |
| Infrastructure | Complete | 14 chapters + README. Node operation, RPC, indexing, reorg handling, observability, backups, and key infrastructure. |
| Governance | Complete | 10 chapters + README. BIP and EIP processes, client diversity, DAOs, treasuries, voting, timelocks, and capture risk. |
| Society | Complete | 9 chapters + README. Custody, privacy, KYC/AML, sanctions, taxation, CBDCs, inclusion, and environmental tradeoffs. Regulatory scope dated September 24, 2026. |
| Glossary | Complete | Covers the technical, economic, governance, security, and regulatory vocabulary used throughout the book. |
| Resources | Complete | Curated primary specifications, papers, official documentation, and further study by topic. |
| examples/simple-blockchain | Complete | TypeScript, runnable (`npm run demo` / `npm test`), 8/8 tests passing, type-checks clean. |
| examples/bitcoin | Complete | Decodes real, verified on-chain tx/block data (txid + block hash + PoW target all confirmed to match). Live-fetch variant included. 7/7 tests passing. |
| examples/wallet-stats | Complete | Live CLI reading real balances/tx count/contract status/token balances. 4/4 tests pass against live mainnet data. Found and documented a real EIP-7702 detection gap during testing. |
| examples/ethereum-rpc | Complete | Raw JSON-RPC learning project with deterministic fixtures. 7/7 tests passing and type-checks clean. |
| examples/solidity | Complete | Compiles Solidity, inspects ABI and bytecode, and explains compiler failures. 6/6 tests passing and type-checks clean. |
| examples/defi | Complete | Constant-product AMM with fees, exact-output quotes, slippage limits, and invariant checks. 7/7 tests passing and type-checks clean. |
| examples/indexer | Complete | Reorg-safe event indexer with checkpoints, rollback, replay, and idempotency. 8/8 tests passing and type-checks clean. |

## Working notes

- Filenames carry no numeric prefixes; reading order comes from links in section README files and the top-level README.
- Every chapter must end with a navigation footer linking to the previous chapter, the section index, and the next chapter, chained continuously across section boundaries so the whole book reads as one sequence.
- Run `node scripts/check-book.mjs` after changing chapters, navigation, or the table of contents.
- Run `node scripts/check-book.test.mjs` after changing the book checker.
- No em dashes anywhere in the book's prose; use a period, comma, parentheses, or a colon instead, whichever the sentence actually calls for.
