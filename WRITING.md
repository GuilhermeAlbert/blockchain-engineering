# Writing and Research Guide

This file defines the editorial rules for Blockchain Engineering.

## Audience

Assume the reader is comfortable reading code but may know nothing about blockchain, cryptography, or monetary economics.

## Core rule

Explain the mechanism before introducing the label.

Prefer:

> A Bitcoin transaction spends previously created outputs and creates new outputs.

Then introduce the term **UTXO**.

## Writing style

Use direct technical English.

Prefer concrete mechanisms, active verbs, exact terminology, examples with numbers, useful diagrams, small code examples, and primary sources.

Avoid marketing language, dramatic framing, generic motivational prose, fake profundity, unnecessary rhetorical questions, "It's not X. It's Y." constructions, "What most people miss...", "Let's dive in.", repetitive summary endings, decorative em dashes, and synonym cycling when one technical term is correct.

## No AI slop

Use the `no-ai-slop` skill when available:

https://github.com/petergyang/no-ai-slop

Every chapter should be reviewed against its rules before being considered complete.

## Sources

Prefer primary material.

### Bitcoin

Use the Bitcoin whitepaper, Bitcoin Core source code and documentation, BIPs, original mailing-list posts, Satoshi Nakamoto's public messages, and protocol documentation.

### Ethereum

Use ethereum.org, execution and consensus specifications, EIPs, Solidity documentation, client documentation, and protocol repositories.

### Economics

Prefer original texts when discussing an economist.

Examples:

- Carl Menger, *Principles of Economics*
- Ludwig von Mises, *The Theory of Money and Credit*
- Friedrich Hayek, *Denationalisation of Money*
- Murray Rothbard, *What Has Government Done to Our Money?*

Do not attribute Bitcoin views to authors who died before Bitcoin existed.

Separate what the author wrote from later interpretations, Bitcoin advocacy, and criticism.

## Historical claims

Distinguish documented fact, inference, disputed interpretation, and speculation.

When discussing Satoshi Nakamoto, do not present any proposed identity as established fact.

## Technical claims

Prefer precise descriptions.

Avoid:

> Your Bitcoin is stored in your wallet.

Prefer:

> A wallet manages keys and transaction data used to authorize spending of UTXOs controlled by those keys.

Avoid describing Bitcoin as an account-balance database. Explain the UTXO model directly.

## Chapter structure

Do not force every chapter into the same template.

Use these sections when they help:

- introduction
- the problem
- how it works
- example
- under the hood
- tradeoffs
- common misconceptions
- try it yourself
- references

## Diagrams

Use Mermaid when it makes relationships or flow easier to understand.

Use ASCII diagrams for compact protocol structures.

Do not add diagrams only for decoration.

## Code

Prefer TypeScript for general examples and Solidity for smart-contract examples.

Every nontrivial example should explain the input, output, important steps, and what the example omits compared with a production system.

Do not present toy implementations as secure production systems.

## Security

Security content should focus on defensive understanding.

Historical exploit case studies may explain root cause, affected mechanism, impact, and mitigation.

## Citations

Do not invent citations.

If a claim cannot be verified, remove it, qualify it, or leave a TODO stating what needs verification.

## Tradeoffs

Avoid treating decentralization, scalability, security, privacy, censorship resistance, monetary hardness, or finality as binary properties.

Explain the mechanism and its tradeoff.

## Completion checklist

Before marking a chapter complete, verify:

- Does it explain the mechanism?
- Does it explain why the mechanism exists?
- Are new terms defined?
- Are important claims sourced?
- Are disputed claims identified as disputed?
- Are economic opinions separated from factual descriptions?
- Does the code make technical sense?
- Are links valid?
- Does the prose avoid AI-slop patterns?
- Does it repeat another chapter unnecessarily?
- Would a software engineer understand the concept after reading it?
