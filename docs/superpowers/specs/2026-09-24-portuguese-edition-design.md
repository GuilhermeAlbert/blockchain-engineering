# Portuguese Edition Design

## Objective

Publish a complete Brazilian Portuguese edition without moving or breaking the finished English edition.

## Repository structure

- English remains canonical at the repository root.
- Portuguese lives under `pt-BR/` and mirrors every editorial path.
- Filenames and directory names remain in English so each translated file has an obvious source counterpart.
- `examples/`, `scripts/`, `cover.png`, and `LICENSE` remain shared.
- The root README links to both editions. The Portuguese README links back to English.

## Translation scope

The Portuguese edition includes translated copies of `README.md`, `SUMMARY.md`, `PROGRESS.md`, `WRITING.md`, `CONTRIBUTING.md`, `glossary.md`, `resources.md`, and every Markdown file under `chapters/`. It does not duplicate source code projects, generated dependencies, the license, or internal planning documents.

Prose, headings, table labels, callouts, and navigation labels are translated into natural Brazilian Portuguese. Code, commands, identifiers, protocol names, URLs, file paths, mathematical notation, and source quotations remain unchanged unless an official Portuguese title is useful and unambiguous. Technical terms use the form most common among Brazilian engineers; the first occurrence may retain the English term in parentheses when that helps readers search specifications.

## Link policy

Links between book pages stay inside `pt-BR/`. Links to shared examples and repository files move up one directory. Heading fragments must match translated headings. External primary sources remain unchanged. Each Portuguese page has the same relative counterpart as the English page.

## Quality controls

`scripts/check-book.mjs` gains edition-aware validation and a parity check. It must verify local links, heading fragments, summary inventory, directional navigation, editorial markers, and one-to-one Markdown file coverage. The Portuguese edition must contain no English navigation labels or publication placeholders. Code fences are excluded from language checks.

Translation is completed section by section. A section is complete only when its file inventory matches English and its checks pass. The final gate runs both editions, checker tests, all example tests, and all TypeScript type-checks.

## Publication status

The root README presents English as the original edition and Portuguese as a complete translation. `pt-BR/PROGRESS.md` records translation completion separately from the English authorship record. The existing user change in `_config.yml` remains untouched and outside implementation commits.

