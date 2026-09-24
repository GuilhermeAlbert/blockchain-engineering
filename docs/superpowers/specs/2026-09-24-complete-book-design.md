# Complete Blockchain Engineering Book Design

## Goal

Finish the book at the depth of its existing chapters. The completed repository must include every section and project named in the current index, working navigation, checked local links, tested examples, a complete glossary and resource list, and no unresolved editorial TODOs.

## Scope

The work covers four unfinished sections:

- Blockchain Security
- Blockchain Infrastructure
- Governance
- Regulation and Society

It also covers four unfinished projects:

- `examples/ethereum-rpc`
- `examples/solidity`
- `examples/defi`
- `examples/indexer`

The final editorial pass covers the whole repository. It will resolve existing TODOs, repair links, standardize the `chapters/layer2` path, add the missing license, complete the glossary and resources, and update the book status.

## Chapter design

Each section starts with a `README.md` that defines the subject, its boundaries, and its reading order. Each chapter explains one concept, gives a concrete mechanism or example, names the relevant failure modes or tradeoffs, cites sources, and ends with previous, section, and next navigation links.

The new chapters will follow the vocabulary and density of the existing book. They will not pad short subjects to match a fixed word count. A chapter is complete when a reader can explain the mechanism, identify its limits, and follow its sources without relying on unstated background knowledge.

## Research standards

Protocol claims will cite specifications, standards, source code, or official documentation. Historical incidents will cite contemporary disclosures, postmortems, court records, or other direct records when available. Legal and regulatory claims will name the jurisdiction and the date checked. Claims that can change, such as software policy, network behavior, or regulation, will carry a dated qualification.

No unsupported statistic, quotation, attribution, or claim about a person's motive will remain in the published text. If a claim cannot be verified, it will be removed or narrowed to what the source supports.

## Section boundaries

### Blockchain Security

Security content is defensive. Chapters explain the vulnerable assumption, the failure mechanism, observable consequences, and mitigations. Historical case studies may describe an exploit closely enough to teach the engineering lesson, but will not include deployment-ready attack instructions, theft workflows, live targets, or reusable offensive code.

### Blockchain Infrastructure

Infrastructure chapters cover node operation, RPC behavior, providers, archive data, indexers, explorers, mempool data, pipelines, event processing, reorg handling, webhooks, caching, and reliability. Examples will address retries, idempotency, confirmation depth, duplicate events, rate limits, stale reads, and partial failure.

### Governance

Governance chapters separate written process from effective power. They distinguish proposal authorship, implementation, miner or validator behavior, node adoption, application decisions, market response, and social coordination. A BIP, EIP, DAO vote, or client release will not be described as binding merely because it completed a formal process.

### Regulation and Society

These chapters separate technical properties, legal requirements, empirical claims, and political judgments. They will compare custody models, exchanges, identity checks, privacy, surveillance, censorship resistance, self-custody, stablecoin dollarization, and central bank digital currencies without presenting financial, legal, or tax advice.

## Example projects

Each project will have a focused README, pinned dependencies, source code, deterministic tests where possible, and type checking.

- `ethereum-rpc` will issue raw JSON-RPC requests and validate responses and errors.
- `solidity` will compile and test a small contract locally without production keys or public deployment.
- `defi` will implement AMM arithmetic and inspect a fixed, documented swap fixture.
- `indexer` will process a deterministic block and log fixture, persist a checkpoint, deduplicate events, and roll back data after a simulated reorganization.

Network access may support an optional demonstration, but tests must not depend on a public endpoint. Examples must not ask readers to use meaningful funds, real seed phrases, or production credentials.

## Editorial standard

All new and revised prose will be checked against the `no-ai-slop` rules. The edit will preserve the book's direct technical voice while removing generic introductions, inflated importance claims, unsupported attribution, repetitive summaries, fake dramatic reveals, synonym cycling, and decorative formatting. Concrete mechanisms, dates, names, numbers, and consequences will carry the explanation.

The repository's existing rule against em dashes remains in force.

## Delivery sequence

Work proceeds in verified blocks:

1. Write and validate Blockchain Security.
2. Write and validate Blockchain Infrastructure.
3. Write and validate Governance.
4. Write and validate Regulation and Society.
5. Build and test the four example projects.
6. Complete the glossary and resources.
7. Resolve all existing editorial TODOs.
8. Repair navigation, path inconsistencies, the index, and the license.
9. Run repository-wide editorial and technical verification.

Each content block receives a source check, a `no-ai-slop` pass, a local-link check, and a navigation check before the next block begins.

## Completion criteria

The book is complete only when all of the following are true:

- Every chapter linked from `SUMMARY.md` exists and contains substantive content.
- Every planned example exists, is documented, passes its tests, and passes TypeScript type checking.
- No editorial `TODO`, `TBD`, `FIXME`, placeholder instruction, or unresolved verification note remains.
- Every local Markdown link resolves, including fragment links where the checker supports them.
- Chapter navigation forms one continuous reading sequence and uses `chapters/layer2` consistently.
- The glossary covers the terminology introduced by the completed sections.
- The resources page contains the primary sources used by the completed sections.
- The repository includes the license named by the README.
- `README.md`, `SUMMARY.md`, and the tracked progress record agree about the book's status.
- A final `no-ai-slop` review finds no banned wording or named slop pattern in authored prose, except where a technical quotation requires exact wording.
- The working tree contains no accidental build products or unrelated edits from this work.

## Verification

Verification will include a repository-wide missing-file and local-link scan, navigation validation, TODO and banned-language scans, Markdown structure checks, TypeScript type checking, and all example test suites. Any network-dependent demonstration will be reported separately from deterministic tests.

Existing user changes to `.gitignore` and `_config.yml` are outside this work and will be preserved.
