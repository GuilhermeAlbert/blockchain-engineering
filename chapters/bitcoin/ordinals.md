# Ordinals and Inscriptions

Ordinals is a numbering scheme, and inscriptions are a way of attaching arbitrary data to individual satoshis, that together let people create Bitcoin-native digital artifacts comparable in spirit to NFTs — without any new opcode, soft fork, or protocol change. This chapter covers how both pieces work and why they became possible specifically after [Taproot](./taproot.md).

## Ordinal theory: numbering satoshis

The "ordinals" scheme, proposed by developer Casey Rodarmor in 2022, assigns every individual satoshi a unique, sequential number based on the order it was mined — the first satoshi of the genesis block's coinbase reward is ordinal `0`, and so on, following a specific, deterministic rule for how ordinal numbers transfer through transactions (generally, in first-in-first-out order relative to a transaction's inputs and outputs). This numbering exists entirely as an **off-chain convention** — nothing about it is enforced by Bitcoin's consensus rules, and a node running standard Bitcoin Core software has no concept of "ordinal numbers" at all. Software implementing ordinal theory (an indexer, tracking the rule externally) computes these numbers by replaying transaction history and applying the transfer rule consistently.

## Inscriptions: attaching data to a satoshi

An **inscription** embeds arbitrary content (an image, text, or any other data) directly into a transaction's witness data, using Taproot's script-path spending (see [Taproot](./taproot.md#taproot-and-bitcoin-script)) in a specific pattern that Bitcoin Script's `OP_FALSE OP_IF ... OP_ENDIF` sequence allows — placing data inside a branch that never actually executes (since `OP_FALSE` makes the following `OP_IF` block get skipped), meaning the data can be arbitrarily large (subject to the transaction's overall size limits) without affecting the script's actual execution logic at all. This data is then conventionally associated with the specific satoshi being spent by that transaction, per ordinal theory's numbering — creating a record that a specific, identifiable satoshi now "carries" this inscribed content, trackable by anyone running compatible indexing software.

## Why Taproot specifically made this practical

Before SegWit and Taproot, embedding meaningful amounts of data in this way would have counted at full transaction weight, and pre-Taproot script size limits were considerably more restrictive. Taproot's witness discount (see [Transaction Fees](./fees.md#transaction-size-and-weight)) and its more flexible script-path spending made embedding significant amounts of arbitrary data economically practical in a way it hadn't quite been before — inscriptions are, in an important sense, an emergent use of Taproot's design rather than something its authors specifically built the feature to enable.

## Why this is controversial within the Bitcoin community

Inscriptions generated real, substantive debate, not merely enthusiasm, because they touch on a long-running disagreement about what Bitcoin's block space should be used for:

- **Supporters** point out that nothing about inscriptions violates any consensus rule — they're ordinary, valid transactions using Bitcoin Script exactly as specified, and the fees they pay (which rose substantially during periods of heavy inscription activity) contribute directly to [miner revenue and Bitcoin's long-term security budget](./security-budget.md), an argument connected to concerns about fee revenue's role once block subsidies fully taper off (see [The Halving](./halving.md)).
- **Critics** argue that using block space for arbitrary media storage, rather than financial transactions, pushes up fees for ordinary payments and represents a use case Bitcoin's block space was never intended or well-suited for, and some Bitcoin Core contributors have discussed (with disagreement about implementation and merit) various proposed policy-level (not consensus-level) filtering approaches in response.

This book presents both positions as a real, ongoing disagreement within the Bitcoin community rather than a settled question — it is, at its core, a dispute about the proper use of a genuinely scarce, shared resource (block space), not a technical dispute about whether inscriptions are valid (they unambiguously are, under existing consensus rules).

## Common misconceptions

**Inscriptions do not modify Bitcoin's consensus rules in any way.** No soft fork or hard fork was required — they use existing, previously-specified Taproot script capabilities in a way its designers may not have specifically anticipated being used this way, but did not prohibit.

**An "ordinal number" is not stored anywhere in the Bitcoin protocol itself.** It's a convention computed by specialized indexing software applying a specific, externally-defined rule to the existing, unmodified blockchain data — a node running unmodified Bitcoin Core has no awareness of ordinal numbers at all.

## Further reading

- [Ordinals Handbook / specification](https://docs.ordinals.com/)
- [BIP 341: Taproot](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki)

---

[← Previous: Taproot](./taproot.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Proof of Work →](./proof-of-work.md)
