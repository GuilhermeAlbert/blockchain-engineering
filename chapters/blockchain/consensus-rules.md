# Consensus Rules

Consensus rules are the specific, exact conditions every node checks to decide whether a block or transaction is valid. This chapter defines the term precisely and draws a distinction — consensus rules versus policy rules — that matters enormously for understanding how Bitcoin can change over time without any central authority deciding on changes, covered fully in [Forks and Protocol Upgrades](../forks/README.md).

## What makes a rule a consensus rule

A **consensus rule** is a validity condition that, if violated, makes a block or transaction invalid for *every* correctly functioning node on the network — there's no ambiguity or local discretion involved. Examples include: a block's hash must be below the current difficulty target, a transaction cannot spend more than the sum of its inputs, and a signature must be cryptographically valid for the key it claims to be spending from. If even one node in the network enforced a different version of these rules than everyone else, that node would eventually diverge from the chain everyone else agrees on — which is exactly why consensus rules require near-universal agreement among node operators to change safely (see [Soft Forks](../forks/soft-forks.md) and [Hard Forks](../forks/hard-forks.md)).

## What makes a rule a policy rule

A **policy rule**, by contrast, is a *local, optional* condition an individual node or miner applies to decide, for example, which valid transactions to relay or include in a block it's mining — but a transaction violating a policy rule (and not a consensus rule) is still a perfectly valid transaction that other nodes with different policy settings would accept without issue. The canonical example: Bitcoin Core's default **minimum relay fee** — a node configured with this default policy won't relay a transaction paying an extremely low fee, but that transaction is not consensus-invalid; a differently configured node, or a miner willing to accept a lower fee, can still include it in a block, and every other node will accept that block as valid once mined, because the fee amount itself isn't a consensus rule.

## Example: the distinction in practice

| Rule | Type | What happens if violated |
| --- | --- | --- |
| Block hash must meet difficulty target | Consensus | Block rejected by every node, unconditionally |
| Transaction inputs must not exceed outputs plus fee | Consensus | Transaction/block rejected by every node |
| Signature must be cryptographically valid | Consensus | Transaction/block rejected by every node |
| Minimum relay fee | Policy | Transaction not relayed by *this* node, but still valid; other nodes/miners may include it |
| Block size soft-limits below the protocol maximum (used at various points in Bitcoin Core's history) | Policy | This node/miner won't build a block that large, but a larger block up to the actual consensus maximum is still valid |

## Why this distinction matters for how Bitcoin evolves

Because consensus rules require every node to agree, changing them is a coordination problem with no central decision-maker (see [Bitcoin Governance](../forks/governance.md)) — a change that isn't adopted by an overwhelming share of the network risks splitting it into two incompatible chains (see [Hard Forks](../forks/hard-forks.md) and the [Bitcoin Cash](../forks/bitcoin-cash.md) case study). Policy rules, by contrast, can be changed unilaterally by any node operator or mining pool at any time, with zero risk of a network split, precisely because they don't affect what other nodes consider valid — only what a specific node chooses to relay or mine. This is also why [soft forks](../forks/soft-forks.md) — which *tighten* consensus rules (making previously-valid things now invalid) rather than loosening them — can be deployed more gradually and with weaker coordination requirements than hard forks, a mechanical distinction explored fully in the Forks section.

## Common misconceptions

**Policy rules being "optional" does not mean they're unimportant or arbitrary.** Widely adopted default policies (like the minimum relay fee) function as an effective, informal standard across the network even without being formally enforced as consensus, because most nodes run largely unmodified default software — but this is a social and practical convergence, not a protocol-level requirement, and it can and does shift over time as defaults change.

**A rule being "consensus" does not mean it's written down in one single, canonical place.** Bitcoin's actual consensus rules are defined by what Bitcoin Core's (and, to the extent they achieve full compatibility, alternative full node implementations') code actually does when validating blocks and transactions — the code is the specification in a very literal sense, which is part of why changes to consensus-critical code paths are reviewed with such particular care by Bitcoin Core developers.

## Further reading

- [Bitcoin Core developer reference: Consensus rules changes](https://developer.bitcoin.org/devguide/p2p_network.html)
- See also: [What Is a Fork?](../forks/README.md)

---

[← Previous: Chain Reorganizations](./reorgs.md)
·
[Back to Blockchain Fundamentals](./README.md)
·
[Next: Fork Choice →](./fork-choice.md)
