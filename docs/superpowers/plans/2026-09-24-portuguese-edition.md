# Portuguese Edition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a complete, maintainable Brazilian Portuguese edition while preserving the English URLs and shared executable projects.

**Architecture:** English stays at the root. `pt-BR/` mirrors editorial Markdown paths while code and assets remain shared. The book checker validates each edition independently and enforces source/translation parity.

**Tech Stack:** Markdown, Node.js, the existing book integrity checker, npm/TypeScript example projects.

---

### Task 1: Add bilingual integrity tests

**Files:**
- Modify: `scripts/check-book.test.mjs`
- Modify: `scripts/check-book.mjs`

- [ ] Add fixtures proving that edition roots, parity mismatches, translated heading fragments, and Portuguese navigation labels are validated.
- [ ] Run `node scripts/check-book.test.mjs` and observe the new tests fail.
- [ ] Add `--edition`, `--parity-with`, and Portuguese navigation-label support without weakening English checks.
- [ ] Run `node scripts/check-book.test.mjs` and confirm all tests pass.
- [ ] Commit the checker changes.

### Task 2: Create the Portuguese publication shell

**Files:**
- Create: `pt-BR/README.md`
- Create: `pt-BR/SUMMARY.md`
- Create: `pt-BR/PROGRESS.md`
- Create: `pt-BR/WRITING.md`
- Create: `pt-BR/CONTRIBUTING.md`
- Create: `pt-BR/glossary.md`
- Create: `pt-BR/resources.md`
- Modify: `README.md`

- [ ] Translate the top-level publication documents and add reciprocal language links.
- [ ] Adjust shared-file and example links to point outside `pt-BR/`.
- [ ] Run the Portuguese link check and fix every shell-level error.
- [ ] Commit the publication shell.

### Task 3: Translate foundations

**Files:**
- Create: `pt-BR/chapters/origins/*.md`
- Create: `pt-BR/chapters/economics/*.md`
- Create: `pt-BR/chapters/cryptography/*.md`
- Create: `pt-BR/chapters/distributed-systems/*.md`
- Create: `pt-BR/chapters/blockchain/*.md`

- [ ] Translate prose and navigation while preserving code, URLs, and factual qualifiers.
- [ ] Update Portuguese summary titles and heading fragments.
- [ ] Run edition, parity, and editorial checks.
- [ ] Commit the five sections.

### Task 4: Translate Bitcoin

**Files:**
- Create: `pt-BR/chapters/bitcoin/*.md`
- Create: `pt-BR/chapters/forks/*.md`
- Create: `pt-BR/chapters/wallets/*.md`
- Create: `pt-BR/chapters/bitcoin-scaling/*.md`
- Create: `pt-BR/chapters/lightning/*.md`

- [ ] Translate the five sections with consistent terms for UTXO, mineração, carteira, fork, canal, and liquidação.
- [ ] Preserve BIP names, Script opcodes, commands, and code exactly.
- [ ] Run edition, parity, and editorial checks.
- [ ] Commit the five sections.

### Task 5: Translate Ethereum application engineering

**Files:**
- Create: `pt-BR/chapters/ethereum/*.md`
- Create: `pt-BR/chapters/evm/*.md`
- Create: `pt-BR/chapters/contracts/*.md`
- Create: `pt-BR/chapters/tokens/*.md`
- Create: `pt-BR/chapters/web3/*.md`

- [ ] Translate the five sections while preserving Solidity, ABI, opcode, RPC, and EIP identifiers.
- [ ] Keep code comments unchanged where translating them would change tested examples; translate explanatory prose around them.
- [ ] Run edition, parity, and editorial checks.
- [ ] Commit the five sections.

### Task 6: Translate protocols, operations, and society

**Files:**
- Create: `pt-BR/chapters/defi/*.md`
- Create: `pt-BR/chapters/layer2/*.md`
- Create: `pt-BR/chapters/security/*.md`
- Create: `pt-BR/chapters/infrastructure/*.md`
- Create: `pt-BR/chapters/governance/*.md`
- Create: `pt-BR/chapters/society/*.md`

- [ ] Translate the six sections and retain all dates attached to current regulatory or deployment claims.
- [ ] Use consistent Brazilian terms for empréstimo, garantia, liquidação, ponte, governança, custódia, and lavagem de dinheiro.
- [ ] Run edition, parity, and editorial checks.
- [ ] Commit the six sections.

### Task 7: Final terminology and publication audit

**Files:**
- Modify: `pt-BR/**/*.md`
- Modify: `README.md`
- Modify: `pt-BR/PROGRESS.md`

- [ ] Scan for untranslated headings, navigation labels, placeholders, em dashes, malformed links, and inconsistent core terminology.
- [ ] Confirm the Portuguese and English Markdown inventories match exactly for the declared scope.
- [ ] Run `node scripts/check-book.mjs` for English and Portuguese plus checker unit tests.
- [ ] Run tests and `tsc --noEmit` in all seven shared example projects.
- [ ] Mark the Portuguese edition complete only after all commands pass.
- [ ] Commit the final audit.

