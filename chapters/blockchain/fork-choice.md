# Fork Choice

When a node sees two or more competing valid chains — the situation described in [Chain Reorganizations](./reorgs.md) — it needs a precise, deterministic rule for deciding which one to treat as canonical. This chapter covers that rule exactly, because "longest chain wins" (the common shorthand) is an imprecise simplification of what Bitcoin actually does.

## The rule, precisely

Bitcoin's fork choice rule is: **accept the valid chain with the greatest cumulative proof-of-work**, not the chain with the most blocks. These are usually, but not always, the same thing. Cumulative work is calculated by summing the expected work required to produce each block's hash, given that block's difficulty target at the time — a block mined at higher difficulty contributes more to a chain's cumulative work than a block mined at lower difficulty, even though each still counts as exactly one block toward height.

## Why work, not block count

Consider two competing branches: one with 10 blocks mined at a low difficulty, another with 9 blocks mined at a much higher difficulty. If the 9-block chain's higher difficulty means it actually represents more total expected computational effort than the 10-block chain, the network adopts the **9-block chain** despite it being shorter by count — because cumulative work, not block count, is what proof-of-work is actually meant to measure the security of (see [Proof of Work](../bitcoin/proof-of-work.md)). This scenario is unusual in practice — Bitcoin's [difficulty adjustment](../bitcoin/difficulty-adjustment.md) generally keeps both branches at similar difficulty if they diverged recently — but it's the mathematically correct statement of the rule, and it matters for understanding why "longest chain" is a simplification rather than the literal mechanism.

## Example: how a node applies the rule

```text
Node currently follows Chain A (tip at block 105, cumulative work: W_A)

Node receives a new block extending a previously unseen Chain B
(tip at block 104, cumulative work: W_B)

If W_B > W_A:
    node discards Chain A from the fork point onward,
    adopts Chain B as canonical (a reorg, per Chain Reorganizations)
Else:
    node keeps following Chain A, and simply stores Chain B's blocks
    as known-but-not-canonical, in case a future block extends it
    past W_A later
```

Nodes don't discard blocks belonging to a losing chain outright — they typically retain them for some period, because a currently-losing branch could still become the winning one if it receives more work before the currently-winning branch does. This is what allows a node to correctly handle a reorg immediately, without needing to re-download data it had already validated.

## Under the hood: why this rule is Sybil-resistant

This connects directly back to [Sybil Attacks](../distributed-systems/sybil-attacks.md): because the fork choice rule weighs chains by proof-of-work rather than by which chain more *nodes* claim is correct, an attacker can't win by simply running more nodes or broadcasting louder — they have to actually produce more cumulative computational work than the honest chain, a cost that doesn't shrink no matter how the attacker's effort is distributed across fake identities.

## Tradeoffs

A cumulative-work-based rule is unambiguous and gives every node the same deterministic answer given the same information, which is essential for the network to reliably converge on one chain. Its cost is exactly the one covered in [CAP Theorem](../distributed-systems/cap.md) and [Finality](../distributed-systems/finality.md): the "right" answer can change as new blocks arrive and shift the cumulative work balance, which is why confidence in any specific block's permanence grows only gradually, rather than being settled the instant a block is created.

## Common misconceptions

**"Longest chain" is a common, useful shorthand, but not a fully precise description of the actual rule.** The Bitcoin whitepaper itself uses "longest chain" language informally in places while the underlying mechanism it describes is cumulative proof-of-work — Bitcoin Core's actual implementation follows the cumulative-work rule precisely, and block-count-based descriptions should be understood as an approximation that holds in the overwhelmingly common case where difficulty hasn't just shifted sharply between competing branches.

**Fork choice does not require any node to communicate its preference to any other node.** Every node applies the same deterministic rule independently to whatever chains it has observed — agreement emerges from every node reaching the same conclusion given the same (eventually shared) data, not from any voting or negotiation process.

## Further reading

- [Bitcoin whitepaper, Section 5 (Network)](https://bitcoin.org/bitcoin.pdf)
- [Bitcoin Core developer reference: Block chain](https://developer.bitcoin.org/reference/block_chain.html)

---

[← Previous: Consensus Rules](./consensus-rules.md)
·
[Back to Blockchain Fundamentals](./README.md)
·
[Next: Permissionless vs Permissioned Networks →](./permissionless-vs-permissioned.md)
