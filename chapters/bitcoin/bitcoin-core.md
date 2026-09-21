# Bitcoin Core

Bitcoin Core is the reference implementation of the Bitcoin protocol — the direct descendant of the original code Satoshi Nakamoto released in January 2009. This chapter covers what "reference implementation" actually means for a protocol with no formal specification document, and how Bitcoin Core's development process works.

## Why there's no formal specification

Unlike protocols developed through a standards body (HTTP through the IETF, for instance), Bitcoin has no independently authored specification that implementations are checked against. Bitcoin Core's actual code **is** the specification, in a very literal, practical sense: the consensus rules are whatever the code enforces, and any alternative implementation aiming for full compatibility has to match Bitcoin Core's behavior exactly, including in edge cases that were never explicitly documented anywhere outside the code itself. This has real, practical consequences — a subtle bug in Bitcoin Core's validation logic, if it became widely deployed, would effectively become "correct" consensus behavior by virtue of being what the majority of the network actually enforces, a scenario that has happened at least once in Bitcoin's history (a 2013 chain fork caused by a database-related consensus discrepancy between different Bitcoin Core versions, resolved by node operators coordinating to reconverge on the older, more widely-deployed version's behavior).

## History and lineage

Satoshi released the original client as "Bitcoin" (later informally called "Bitcoin-Qt" for its Qt-based graphical interface, then "Bitcoin Core" from 2014 onward to distinguish the node/consensus software from wallet-specific functionality and other Bitcoin-branded projects). Gavin Andresen became the project's lead maintainer as Satoshi withdrew from public involvement (see [Early Bitcoin History](../origins/early-bitcoin.md)), and the project has since operated with a rotating set of maintainers and a large number of regular contributors, coordinated primarily through its public GitHub repository rather than through any company or foundation with formal authority over the project.

## Development process

Bitcoin Core changes go through public code review on GitHub, and consensus-affecting changes in particular receive especially careful scrutiny given the stakes of a bug in validation logic. Changes to the actual protocol rules (as opposed to node software features, performance improvements, or bug fixes that don't affect consensus) typically go through the [BIP process](../forks/bips.md) for community discussion and, for contentious changes, some form of demonstrated broad support among node operators, miners, and the wider ecosystem before being considered safe to deploy — this process is examined in full in [Bitcoin Governance](../forks/governance.md).

## Alternative implementations

Bitcoin Core is not the only Bitcoin node software — alternative implementations like Bitcoin Knots (a Bitcoin Core-derived fork with additional or different default policies) and various other full node implementations exist, though achieving and maintaining full consensus compatibility with Bitcoin Core's exact validation behavior is demanding enough that Bitcoin Core remains, by a wide margin, the dominant implementation actually running on the network. This concentration is itself sometimes discussed as a centralization concern — the community's practical reliance on one codebase's correctness — distinct from, though related to, the network-level decentralization the protocol otherwise provides.

## Common misconceptions

**Bitcoin Core is not a company, and does not control Bitcoin the network or currency in any legal or financial sense.** It's an open-source software project; its maintainers and contributors have influence over what code gets merged into that specific repository, but they cannot force node operators to run any particular version, and the network's actual behavior is determined by what software node operators, in aggregate, choose to run.

**Running Bitcoin Core does not require holding, mining, or using bitcoin.** It's node software; using it as a full validating node is separate from any decision to also mine or hold funds.

## Further reading

- [Bitcoin Core GitHub repository](https://github.com/bitcoin/bitcoin)
- [Bitcoin Core developer documentation](https://developer.bitcoin.org/)

---

[← Previous: Light Clients](./light-clients.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Bitcoin Transactions →](./transactions.md)
