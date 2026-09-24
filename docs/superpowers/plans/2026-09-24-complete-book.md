# Complete Blockchain Engineering Book Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish every planned chapter and example, remove the repository's editorial debt, and produce a deeply researched book that passes content, link, navigation, type, and test checks.

**Architecture:** Work in isolated, reviewable phases. Each section is researched, written, linked, and checked before the next section starts. The example projects use deterministic local fixtures so their tests do not depend on public RPC services. A final repository-wide pass reconciles the index, navigation, glossary, resources, status, and license.

**Tech Stack:** Markdown, TypeScript 5.6+, Node.js 20+, `tsx`, `viem`, `solc`, Node's built-in test/assert and file APIs, primary protocol specifications and official records.

---

## File map

### Content sections

- `chapters/security/`: defensive security model, user attacks, contract failures, bridge failures, auditing, and formal verification.
- `chapters/infrastructure/`: node and data infrastructure, event delivery, reorg safety, caching, and reliability.
- `chapters/governance/`: Bitcoin, Ethereum, proposal processes, effective power, DAOs, and on-chain/off-chain governance.
- `chapters/society/`: custody, exchanges, identity rules, privacy, censorship, stablecoin dollarization, and CBDCs.

### Example projects

- `examples/ethereum-rpc/`: raw JSON-RPC client, response validation, local fixture server, tests, and CLI demonstration.
- `examples/solidity/`: small contract, compilation wrapper, deterministic tests, and local demonstration.
- `examples/defi/`: constant-product AMM arithmetic, swap fixture decoding, tests, and CLI demonstration.
- `examples/indexer/`: deterministic event indexer with checkpoints, deduplication, and reorg rollback.

### Repository-wide files

- `SUMMARY.md`: canonical chapter inventory.
- `README.md`: overview, learning projects, and publication status.
- `glossary.md`: concise definitions linked to chapters.
- `resources.md`: primary sources grouped by subject.
- `WRITING.md`: existing editorial rules, changed only if the completed workflow requires clarification.
- `PROGRESS.md`: move from ignored local state to a tracked completion record.
- `.gitignore`: retain user intent while allowing the finished progress record to be tracked.
- `LICENSE`: MIT license referenced by the README.
- `scripts/check-book.mjs`: deterministic repository-wide structural checker.

## Shared chapter contract

Every new chapter must contain:

1. A precise title and direct opening paragraph.
2. The mechanism, not only a definition.
3. At least one concrete example, incident, protocol rule, or operational consequence.
4. Limits, tradeoffs, or failure conditions.
5. A `Further reading` section with primary sources when the subject has an authoritative source.
6. Previous, section, and next links matching the order in `SUMMARY.md`.

Before a chapter is accepted, run these checks against it:

```bash
rg -n -i '\b(TODO|TBD|FIXME|XXX|WIP)\b|lorem ipsum|\[insert' <chapter-files>
rg -n '—' <chapter-files>
rg -n -i '\b(delve|foster|leverage|utilize|facilitate|empower|streamline|robust|cutting-edge|paradigm shift|game changer|tapestry|realm|beacon|multifaceted|meticulous|intricate|paramount|transformative|elevate|embark|supercharge|harness|ever-evolving)\b' <chapter-files>
```

Expected: no authored-prose matches. A source title or exact quotation may remain only after manual review.

### Task 1: Add the repository checker before new content

**Files:**

- Create: `scripts/check-book.mjs`
- Create: `scripts/check-book.test.mjs`
- Modify: `.gitignore`

- [ ] **Step 1: Write failing checker tests**

Create fixtures in a temporary directory from the test process. Cover a valid local link, a missing local file, a missing heading fragment, a chapter absent from `SUMMARY.md`, an editorial marker, an em dash, a banned `no-ai-slop` word, and a malformed navigation footer. Assert one diagnostic per defect and a zero exit status for a clean fixture.

- [ ] **Step 2: Run the tests and confirm failure**

Run:

```bash
node --test scripts/check-book.test.mjs
```

Expected: failure because `scripts/check-book.mjs` does not exist.

- [ ] **Step 3: Implement the checker**

The checker must scan tracked Markdown, exclude `docs/superpowers/`, parse inline Markdown links, resolve relative paths, derive GitHub-style heading slugs, inspect `SUMMARY.md`, and check chapter footers. It must print `file:line: message`, summarize errors by category, and exit nonzero when any error remains.

Support these flags:

```text
node scripts/check-book.mjs                 # full repository check
node scripts/check-book.mjs --links         # local files and fragments only
node scripts/check-book.mjs --navigation    # chapter footer chain only
node scripts/check-book.mjs --editorial     # markers, em dashes, banned wording
```

- [ ] **Step 4: Run checker tests**

Run `node --test scripts/check-book.test.mjs`.

Expected: all tests pass.

- [ ] **Step 5: Record the current baseline**

Run `node scripts/check-book.mjs` and save the error totals in the commit message or implementation notes. Do not weaken checks to make the existing repository pass.

- [ ] **Step 6: Track the progress file intentionally**

Remove the `PROGRESS.md` ignore rule from `.gitignore`. Preserve every other user change in `.gitignore`. Add the current `PROGRESS.md` explicitly in the later status task, after its contents are accurate.

- [ ] **Step 7: Commit**

```bash
git add scripts/check-book.mjs scripts/check-book.test.mjs .gitignore
git commit -m "test: add book integrity checker"
```

### Task 2: Write Blockchain Security

**Files:**

- Create: `chapters/security/README.md`
- Create: `chapters/security/private-key-theft.md`
- Create: `chapters/security/seed-phrase-theft.md`
- Create: `chapters/security/phishing.md`
- Create: `chapters/security/malicious-signatures.md`
- Create: `chapters/security/approval-attacks.md`
- Create: `chapters/security/reentrancy.md`
- Create: `chapters/security/access-control.md`
- Create: `chapters/security/precision.md`
- Create: `chapters/security/oracle-manipulation.md`
- Create: `chapters/security/flash-loan-attacks.md`
- Create: `chapters/security/front-running.md`
- Create: `chapters/security/mev.md`
- Create: `chapters/security/bridge-exploits.md`
- Create: `chapters/security/upgrade-risks.md`
- Create: `chapters/security/auditing.md`
- Create: `chapters/security/formal-verification.md`
- Modify: `chapters/layer2/starknet.md`
- Modify: `resources.md`
- Modify: `glossary.md`

- [ ] **Step 1: Build a source ledger**

Use primary sources: Ethereum smart-contract security documentation, Solidity security considerations, EIPs, verified incident postmortems, affected project disclosures, court or regulator records where relevant, Flashbots documentation and papers, OpenZeppelin documentation, and formal-verification tool documentation. Record the exact URL, title, publisher, and access date for time-sensitive claims.

- [ ] **Step 2: Write user-compromise chapters**

Write `private-key-theft.md`, `seed-phrase-theft.md`, `phishing.md`, `malicious-signatures.md`, and `approval-attacks.md`. Distinguish key compromise from authorization abuse. Explain blind signing, typed data, token allowances, permit signatures, revocation limits, hardware-wallet limits, and recovery consequences without including theft instructions.

- [ ] **Step 3: Write contract-failure chapters**

Write `reentrancy.md`, `access-control.md`, `precision.md`, `oracle-manipulation.md`, `flash-loan-attacks.md`, and `upgrade-risks.md`. Use checks-effects-interactions, pull payments, role boundaries, rounding direction, stale prices, liquidity-sensitive prices, atomic liquidity, initializer safety, storage layout, and admin-key risk as concrete mechanisms.

- [ ] **Step 4: Write ordering and bridge chapters**

Write `front-running.md`, `mev.md`, and `bridge-exploits.md`. Separate public-mempool ordering, proposer/builder behavior, sandwich attacks, liquidations, censorship, validator economics, signer compromise, verification bugs, and message-replay failures.

- [ ] **Step 5: Write assurance chapters and section index**

Write `auditing.md`, `formal-verification.md`, and `README.md`. Explain what review, testing, fuzzing, invariant testing, symbolic execution, and proofs can and cannot establish. The section index must list all 16 chapters in reading order and link from Layer 2 into Security and from Security into Infrastructure.

- [ ] **Step 6: Repair the Starknet key-compromise link and add terms and sources**

Update `chapters/layer2/starknet.md` to point to the completed key-theft chapter. Add security terms to `glossary.md` and replace the Security TODO in `resources.md` with the sources actually used.

- [ ] **Step 7: Run section checks**

Run the three shared editorial scans, then:

```bash
node scripts/check-book.mjs --links
node scripts/check-book.mjs --navigation
```

Expected: no Security link or navigation errors. Errors caused only by later, still-unwritten sections must be listed separately.

- [ ] **Step 8: Commit**

```bash
git add chapters/security chapters/layer2/starknet.md glossary.md resources.md
git commit -m "docs: complete blockchain security section"
```

### Task 3: Write Blockchain Infrastructure

**Files:**

- Create: `chapters/infrastructure/README.md`
- Create: `chapters/infrastructure/running-a-node.md`
- Create: `chapters/infrastructure/rpc.md`
- Create: `chapters/infrastructure/rpc-providers.md`
- Create: `chapters/infrastructure/archive-nodes.md`
- Create: `chapters/infrastructure/indexers.md`
- Create: `chapters/infrastructure/the-graph.md`
- Create: `chapters/infrastructure/block-explorers.md`
- Create: `chapters/infrastructure/mempool.md`
- Create: `chapters/infrastructure/data-pipelines.md`
- Create: `chapters/infrastructure/event-processing.md`
- Create: `chapters/infrastructure/reorg-handling.md`
- Create: `chapters/infrastructure/webhooks.md`
- Create: `chapters/infrastructure/caching.md`
- Create: `chapters/infrastructure/reliability.md`
- Modify: `resources.md`
- Modify: `glossary.md`

- [ ] **Step 1: Build a source ledger**

Use Bitcoin Core and Geth documentation, Ethereum JSON-RPC specifications, client sync documentation, The Graph specifications, provider documentation for behavior that cannot be described generically, and database or messaging documentation for delivery guarantees. Date claims about client modes, pruning, API limits, and provider products.

- [ ] **Step 2: Write node and access chapters**

Write `running-a-node.md`, `rpc.md`, `rpc-providers.md`, and `archive-nodes.md`. Cover verification boundaries, hardware and bandwidth, sync modes, pruning, authenticated RPC, batching, rate limits, provider trust, method variance, historical state, and operational cost.

- [ ] **Step 3: Write data-product chapters**

Write `indexers.md`, `the-graph.md`, `block-explorers.md`, and `mempool.md`. Separate canonical chain data from derived data. Explain schemas, decoding, backfills, query latency, pending-state uncertainty, and explorer labels.

- [ ] **Step 4: Write delivery and correctness chapters**

Write `data-pipelines.md`, `event-processing.md`, `reorg-handling.md`, `webhooks.md`, and `caching.md`. Cover checkpoints, idempotency keys, at-least-once delivery, deduplication, ordering, replay, confirmation policies, rollback, cache keys, and invalidation.

- [ ] **Step 5: Write reliability chapter and section index**

Write `reliability.md` and `README.md`. Define measurable failure modes: stale head, lag, rate-limit exhaustion, inconsistent providers, missed logs, duplicate delivery, deep reorgs, and corrupt checkpoints. Link Security to Infrastructure and Infrastructure to Governance.

- [ ] **Step 6: Add terms and sources**

Add infrastructure terminology to `glossary.md` and a dedicated Infrastructure section to `resources.md` using only sources cited by the chapters.

- [ ] **Step 7: Run section checks and commit**

Run the shared editorial scans plus link and navigation checks. Then:

```bash
git add chapters/infrastructure glossary.md resources.md
git commit -m "docs: complete blockchain infrastructure section"
```

### Task 4: Write Governance

**Files:**

- Create: `chapters/governance/README.md`
- Create: `chapters/governance/bitcoin.md`
- Create: `chapters/governance/ethereum.md`
- Create: `chapters/governance/bips.md`
- Create: `chapters/governance/eips.md`
- Create: `chapters/governance/core-developers.md`
- Create: `chapters/governance/validators-and-miners.md`
- Create: `chapters/governance/users.md`
- Create: `chapters/governance/daos.md`
- Create: `chapters/governance/on-chain.md`
- Create: `chapters/governance/off-chain.md`
- Modify: `resources.md`
- Modify: `glossary.md`

- [ ] **Step 1: Build a source ledger**

Use BIP 2 and its current successor process where applicable, EIP-1, client repository contribution records, activation specifications, public meeting records, governance contracts, and official DAO documentation. Treat governance power as an empirical claim that needs evidence, not a role inferred from a title.

- [ ] **Step 2: Write network governance chapters**

Write `bitcoin.md` and `ethereum.md`. Trace proposal, implementation, release, activation, adoption, and disagreement as separate stages. Use a documented upgrade case for each network.

- [ ] **Step 3: Write process and actor chapters**

Write `bips.md`, `eips.md`, `core-developers.md`, `validators-and-miners.md`, and `users.md`. Explain what each actor can block, choose, signal, or refuse, and what it cannot decide alone.

- [ ] **Step 4: Write DAO and governance-mode chapters**

Write `daos.md`, `on-chain.md`, and `off-chain.md`. Cover proposal thresholds, delegation, turnout, quorum, timelocks, multisigs, emergency powers, voter concentration, governance attacks, and social override.

- [ ] **Step 5: Write the section index, terms, and sources**

Write `README.md`, link Infrastructure to Governance and Governance to Society, then update `glossary.md` and `resources.md`.

- [ ] **Step 6: Run section checks and commit**

Run the shared editorial scans plus link and navigation checks. Then:

```bash
git add chapters/governance glossary.md resources.md
git commit -m "docs: complete blockchain governance section"
```

### Task 5: Write Regulation and Society

**Files:**

- Create: `chapters/society/README.md`
- Create: `chapters/society/custody.md`
- Create: `chapters/society/exchanges.md`
- Create: `chapters/society/kyc-aml.md`
- Create: `chapters/society/privacy.md`
- Create: `chapters/society/financial-surveillance.md`
- Create: `chapters/society/censorship-resistance.md`
- Create: `chapters/society/self-custody.md`
- Create: `chapters/society/stablecoins-and-dollarization.md`
- Create: `chapters/society/cbdcs.md`
- Modify: `SUMMARY.md`
- Modify: `resources.md`
- Modify: `glossary.md`

- [ ] **Step 1: Define dated jurisdictional scope and gather primary sources**

Use FATF standards, primary legislation or regulator publications for named jurisdictions, central-bank CBDC publications, official monetary statistics, court or insolvency records for custody failures, and protocol documentation for privacy mechanisms. State the factual cutoff date in the section README. Do not offer legal advice.

- [ ] **Step 2: Write intermediary chapters**

Write `custody.md`, `exchanges.md`, and `kyc-aml.md`. Distinguish ownership records, control of keys, segregation, rehypothecation, proof of reserves, proof of liabilities, withdrawal risk, travel-rule obligations, sanctions screening, and jurisdictional variation.

- [ ] **Step 3: Write privacy and control chapters**

Write `privacy.md`, `financial-surveillance.md`, `censorship-resistance.md`, and `self-custody.md`. Separate pseudonymity from anonymity, public-ledger analysis from off-chain identity data, protocol resistance from endpoint control, and key control from operational competence.

- [ ] **Step 4: Write monetary-system chapters**

Write `stablecoins-and-dollarization.md` and `cbdcs.md`. Cover issuer liabilities, reserve and redemption structures, foreign-currency demand, monetary substitution, retail and wholesale CBDC models, account and token designs, privacy choices, programmability limits, and operational concentration.

- [ ] **Step 5: Add the missing section index**

Write `chapters/society/README.md` and add it to `SUMMARY.md` before `custody.md`. Link Governance to Society. End the final chapter with links back to the Society index and the book resources instead of inventing an unplanned next section.

- [ ] **Step 6: Add terms and sources**

Update `glossary.md` and add Regulation and Society plus Books sections to `resources.md`. Every book listed must be cited somewhere or carry one sentence explaining its specific use.

- [ ] **Step 7: Run section checks and commit**

Run the shared editorial scans plus link and navigation checks. Then:

```bash
git add chapters/society SUMMARY.md glossary.md resources.md
git commit -m "docs: complete regulation and society section"
```

### Task 6: Build the Ethereum RPC example with TDD

**Files:**

- Create: `examples/ethereum-rpc/package.json`
- Create: `examples/ethereum-rpc/package-lock.json`
- Create: `examples/ethereum-rpc/tsconfig.json`
- Create: `examples/ethereum-rpc/README.md`
- Create: `examples/ethereum-rpc/src/client.ts`
- Create: `examples/ethereum-rpc/src/validation.ts`
- Create: `examples/ethereum-rpc/src/fixtures.ts`
- Create: `examples/ethereum-rpc/src/test.ts`
- Create: `examples/ethereum-rpc/src/demo.ts`

- [ ] **Step 1: Write failing tests**

Test request IDs, JSON serialization, HTTP errors, JSON-RPC errors, malformed results, hex-quantity parsing, batch response reordering, and successful `eth_blockNumber`, `eth_getBlockByNumber`, and `eth_getBalance` fixtures.

- [ ] **Step 2: Run and confirm failure**

Run `npm test` in `examples/ethereum-rpc`.

Expected: failure because the client and validators do not exist.

- [ ] **Step 3: Implement the minimal client**

Use injected `fetch` so tests remain local. Represent requests and responses with explicit TypeScript types. Reject duplicate batch IDs, missing results, simultaneous `result` and `error`, unsafe numeric conversion, and non-hex quantities.

- [ ] **Step 4: Add a local demonstration and README**

The default demo uses fixtures. An optional `RPC_URL` mode may read a public chain, but must perform only read methods and must never log credentials embedded in a URL.

- [ ] **Step 5: Verify and commit**

Run `npm test` and `npx tsc --noEmit`. Then commit the project with `git commit -m "feat: add Ethereum RPC learning project"`.

### Task 7: Build the Solidity example with TDD

**Files:**

- Create: `examples/solidity/package.json`
- Create: `examples/solidity/package-lock.json`
- Create: `examples/solidity/tsconfig.json`
- Create: `examples/solidity/README.md`
- Create: `examples/solidity/contracts/Counter.sol`
- Create: `examples/solidity/src/compile.ts`
- Create: `examples/solidity/src/test.ts`
- Create: `examples/solidity/src/demo.ts`

- [ ] **Step 1: Write failing compilation tests**

Assert compiler success, absence of errors, expected ABI entries, non-empty creation bytecode, non-empty runtime bytecode, and a deliberate invalid-source diagnostic.

- [ ] **Step 2: Run and confirm failure**

Run `npm test` in `examples/solidity`.

Expected: failure because the compiler wrapper and contract do not exist.

- [ ] **Step 3: Implement the contract and compiler wrapper**

Use a pinned `solc` package. `Counter.sol` must demonstrate state, an event, a custom error, access control, and a payable rejection without importing a framework. The wrapper must return typed ABI and bytecode or throw all compiler errors with source locations.

- [ ] **Step 4: Document the boundary**

Explain that compilation is not an audit and the project does not deploy to a public chain. Include exact test and demo commands.

- [ ] **Step 5: Verify and commit**

Run `npm test` and `npx tsc --noEmit`. Then commit with `git commit -m "feat: add Solidity compilation project"`.

### Task 8: Build the DeFi example with TDD

**Files:**

- Create: `examples/defi/package.json`
- Create: `examples/defi/package-lock.json`
- Create: `examples/defi/tsconfig.json`
- Create: `examples/defi/README.md`
- Create: `examples/defi/src/amm.ts`
- Create: `examples/defi/src/swap-fixture.ts`
- Create: `examples/defi/src/test.ts`
- Create: `examples/defi/src/demo.ts`

- [ ] **Step 1: Write failing arithmetic tests**

Test exact-input output with fees, reserve updates, invariant non-decrease after integer rounding, price impact, slippage limits, zero or negative input rejection, insufficient liquidity, and large values using `bigint`.

- [ ] **Step 2: Write failing fixture tests**

Use a fixed documented swap-log fixture. Assert address normalization, signed token deltas, and the difference between pool deltas and trader intent. Do not call a public endpoint.

- [ ] **Step 3: Implement minimal arithmetic and decoding**

Keep units explicit. Never use JavaScript floating point for token base units. Format decimal output only at the CLI boundary.

- [ ] **Step 4: Document assumptions and verify**

Explain that the arithmetic models a constant-product pool and does not quote concentrated-liquidity pools. Run `npm test` and `npx tsc --noEmit`, then commit with `git commit -m "feat: add DeFi AMM learning project"`.

### Task 9: Build the reorg-safe indexer example with TDD

**Files:**

- Create: `examples/indexer/package.json`
- Create: `examples/indexer/package-lock.json`
- Create: `examples/indexer/tsconfig.json`
- Create: `examples/indexer/README.md`
- Create: `examples/indexer/src/types.ts`
- Create: `examples/indexer/src/store.ts`
- Create: `examples/indexer/src/indexer.ts`
- Create: `examples/indexer/src/fixtures.ts`
- Create: `examples/indexer/src/test.ts`
- Create: `examples/indexer/src/demo.ts`

- [ ] **Step 1: Write failing state-transition tests**

Test initial indexing, checkpoint persistence, restart from checkpoint, duplicate log delivery, multiple logs in one transaction, removed logs, a one-block reorg, a multi-block reorg, and rejection of a block whose parent is unknown.

- [ ] **Step 2: Run and confirm failure**

Run `npm test` in `examples/indexer`.

Expected: failure because the store and indexer do not exist.

- [ ] **Step 3: Implement the in-memory store and indexer**

Identify events by chain ID, block hash, transaction hash, and log index. Apply a block atomically. Store inverse operations or block-owned records so rollback removes only orphaned data. Persist the canonical checkpoint after the block commit.

- [ ] **Step 4: Add deterministic fork fixtures and demo**

The demo must show the indexed state before and after a simulated reorg. No public RPC endpoint is required.

- [ ] **Step 5: Verify and commit**

Run `npm test` and `npx tsc --noEmit`. Then commit with `git commit -m "feat: add reorg-safe indexer project"`.

### Task 10: Resolve existing editorial TODOs and path debt

**Files:**

- Modify: every Markdown file returned by the initial editorial scan
- Modify: every Markdown file containing `../layer-2/`
- Remove if empty and untracked: `chapters/layer-2/`

- [ ] **Step 1: Export the exact debt list**

Run:

```bash
rg -l -i --glob '*.md' '\b(TODO|TBD|FIXME|XXX|WIP)\b|\[insert|lorem ipsum'
rg -l --glob '*.md' 'chapters/layer-2|\.\./layer-2'
```

Treat each returned file as an explicit checklist item. Do not delete a TODO without resolving the uncertainty it records.

- [ ] **Step 2: Research and resolve historical and technical notes**

For each note, find a primary source. Replace the note with the supported claim and citation. If no primary source supports the claim, remove the claim or state the narrower documented fact without editorial residue.

- [ ] **Step 3: Normalize Layer 2 paths**

Change every `layer-2` link to `layer2`. Confirm that no prose or tooling depends on the empty compatibility directory, then remove it if it contains no tracked files.

- [ ] **Step 4: Run the editorial and link checks**

Run `node scripts/check-book.mjs --editorial` and `node scripts/check-book.mjs --links`.

Expected: zero errors.

- [ ] **Step 5: Commit**

```bash
git add chapters resources.md glossary.md
git commit -m "docs: resolve outstanding research and link debt"
```

### Task 11: Rebuild navigation and publication metadata

**Files:**

- Modify: `SUMMARY.md`
- Modify: `README.md`
- Modify: every chapter footer affected by section boundaries
- Modify: `PROGRESS.md`
- Create: `LICENSE`

- [ ] **Step 1: Make `SUMMARY.md` canonical**

Ensure every section has its README first and every real chapter appears exactly once. Add the Society README. Keep `chapters/layer2` as the only Layer 2 path.

- [ ] **Step 2: Generate the footer checklist from the canonical order**

For each adjacent pair in `SUMMARY.md`, confirm the first chapter's Next link points to the second and the second chapter's Previous link points to the first. Section README files may use a `Next` section rather than the three-link footer only where that matches the existing book style.

- [ ] **Step 3: Add the MIT license**

Create `LICENSE` with the standard MIT text and `Copyright (c) 2026 Guilherme Albert`, matching the repository owner and commit author metadata.

- [ ] **Step 4: Update status and project lists**

Change the README badge and Status section only after all content and examples exist. Update Learning by building so each listed implemented project links to its README. Rewrite `PROGRESS.md` as a tracked completion record with verification commands and dates, not unsupported claims.

- [ ] **Step 5: Verify and commit**

Run the link and navigation checker. Then:

```bash
git add README.md SUMMARY.md PROGRESS.md LICENSE chapters
git commit -m "docs: finalize book navigation and publication status"
```

### Task 12: Complete glossary and resource curation

**Files:**

- Modify: `glossary.md`
- Modify: `resources.md`

- [ ] **Step 1: Find undefined high-value terms**

Review headings, bold definition terms, protocol abbreviations, and recurring infrastructure or governance vocabulary from the new sections. Add terms a reader would plausibly look up. Do not turn the glossary into a second index.

- [ ] **Step 2: Check every glossary link and definition**

Each definition must be one or two direct sentences and point to the chapter that explains the mechanism. Remove the statement that the glossary is still growing.

- [ ] **Step 3: Curate resources from citations actually used**

Group sources under Security, Infrastructure, Governance, Regulation and Society, Books, Papers, Specifications, and Source-code repositories. Remove duplicates and generic homepages when a stable specific document is available.

- [ ] **Step 4: Apply `no-ai-slop` review and commit**

Run the shared editorial scans, read both files aloud for repetitive rhythm, and remove portability-test filler. Then commit with `git commit -m "docs: complete glossary and source guide"`.

### Task 13: Final verification and completion claim

**Files:**

- Modify only files required to fix failures found by this task.

- [ ] **Step 1: Run the full book checker**

```bash
node --test scripts/check-book.test.mjs
node scripts/check-book.mjs
```

Expected: all checker tests pass and the book reports zero structural, link, navigation, and editorial errors.

- [ ] **Step 2: Run every example test**

```bash
for d in examples/*; do (cd "$d" && npm test); done
```

Expected: every package reports all tests passed.

- [ ] **Step 3: Run every TypeScript check**

```bash
for d in examples/*; do (cd "$d" && npx tsc --noEmit); done
```

Expected: all commands exit zero with no diagnostics.

- [ ] **Step 4: Check repository hygiene**

```bash
git diff --check
git status --short
```

Expected: no whitespace errors. Only intentional changes or pre-existing user changes may appear.

- [ ] **Step 5: Perform the final human editorial sample**

Read each new section README, at least three chapters from every new section, all four example READMEs, the revised book README, glossary additions, and resource additions. Check each sample directly against `no-ai-slop/eval.md`. If any check fails, revise the relevant files and repeat the full checker.

- [ ] **Step 6: Record fresh evidence**

Update `PROGRESS.md` with the exact test totals, checker result, TypeScript result, and verification date from this run. Rerun the full checker after the update.

- [ ] **Step 7: Commit the verified state**

Stage only the files changed while executing this plan, listed explicitly, then run:

```bash
git commit -m "docs: complete Blockchain Engineering book"
```

Do not include unrelated user changes in this commit. In particular, inspect `.gitignore` and `_config.yml` before staging because both contained pre-existing user edits when the plan was written.
