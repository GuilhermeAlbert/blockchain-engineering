# Finality

Finality is the property of a transaction or block becoming permanent and irreversible. This chapter defines the general concept and the three broad categories blockchain systems fall into (deterministic, probabilistic, and economic finality) before the next chapter, [Probabilistic Finality](./probabilistic-finality.md), works through Bitcoin's specific case with the actual numbers.

## What finality means, precisely

A transaction has reached finality when it is no longer possible (or no longer practically possible) for it to be reversed, altered, or excluded from the canonical history a system's participants agree on. This matters enormously in practice: a merchant deciding whether to ship goods after receiving a cryptocurrency payment, or an exchange deciding whether to credit a deposit, needs to know how confident they can be that the payment won't later turn out to have been reversed by a chain reorganization (see [Chain Reorganizations](../blockchain/reorgs.md)).

## Three categories

### Deterministic (absolute) finality

A transaction is deterministically final if, once a specific event occurs (a block is committed by a classical Byzantine fault tolerant protocol, for instance), it is **mathematically guaranteed** never to be reversed under the protocol's stated assumptions. There's no probability distribution involved, just a binary before/after. Classical BFT consensus protocols like PBFT (covered in [Consensus](./consensus.md)) provide this kind of finality: once a decision is committed by the required supermajority, it's final, full stop, as long as the assumed fraction of Byzantine participants isn't exceeded.

### Probabilistic finality

A transaction has probabilistic finality if the *chance* it gets reversed shrinks over time and additional confirmations, approaching but never mathematically reaching exactly zero. Bitcoin is the paradigm example: a transaction included in a block has some (typically already very small) chance of being reversed if that block turns out not to be part of the eventual longest chain, and that chance shrinks further, roughly exponentially, with each additional block mined on top of it, but strictly speaking, no finite number of confirmations makes reversal mathematically impossible, only astronomically improbable. This is covered with the actual formula and numbers in [Probabilistic Finality](./probabilistic-finality.md).

### Economic finality

A third, related concept used mainly in [Proof of Stake](../ethereum/proof-of-stake.md) systems like modern Ethereum: a transaction or block is economically final once reversing it would require an attacker to destroy an extremely large, specific, quantifiable amount of their own staked capital (through the protocol's slashing rules, see [Slashing](../ethereum/slashing.md)), making an attack economically irrational even if it were technically possible. This differs from Bitcoin's probabilistic model, where the cost of an attack is an ongoing operational expense (mining hardware and electricity to out-compete the honest chain going forward), rather than a one-time, protocol-enforced destruction of previously committed capital. Ethereum's post-Merge consensus (covered fully in [Finality](../ethereum/finality.md)) actually combines both ideas: it achieves a form of near-deterministic checkpoint finality roughly every two epochs (about 12-13 minutes) through validator voting, backed by economic finality's slashing guarantee, rather than relying purely on probabilistic confirmation depth the way Bitcoin does.

## Comparing the three

| | Deterministic | Probabilistic (Bitcoin) | Economic (Ethereum PoS) |
| --- | --- | --- | --- |
| Guarantee | Mathematical certainty once committed | Probability approaches zero, never reaches it exactly | Reversal possible but economically self-destructive |
| Typical time to strong finality | Single round of voting (seconds) | Multiple confirmations (Bitcoin: often ~60 minutes for high-value transactions) | Two epochs (~12-13 minutes) |
| What an attacker needs | Control over the Byzantine-fault threshold of participants | More cumulative hash power than the honest network, sustained | Willingness to have a large stake destroyed by slashing |

## Why this distinction matters practically

The choice of finality model directly shapes how businesses and users should behave: a Bitcoin merchant accepting a very large payment reasonably waits for more confirmations than one accepting a cup of coffee, because the probability curve (covered next) means additional confirmations genuinely add security, in a way that's meaningful to quantify against the value at risk. This is a rational, continuous risk calculation rather than a fixed rule, and it's a direct, practical consequence of choosing probabilistic over deterministic finality as a design tradeoff (see [CAP Theorem](./cap.md) for the underlying reason Bitcoin made this choice).

## Common misconceptions

**"Confirmed" does not mean "mathematically guaranteed forever" on a probabilistic-finality chain.** Even transactions with many confirmations retain a nonzero, if vanishingly small, theoretical probability of reversal, see [Probabilistic Finality](./probabilistic-finality.md) for exactly how small, as a function of confirmation count and assumed attacker resources.

**Deterministic finality is not strictly "better" in every dimension.** It generally requires knowing the exact set of participants in advance (see [Consensus](./consensus.md#two-dimensions-of-difficulty)), which is incompatible with the fully permissionless, anyone-can-join model Bitcoin was specifically designed to support. The choice of finality model is entangled with, not independent of, the choice of participant model.

## Further reading

- [Bitcoin whitepaper, Section 11 (Calculations)](https://bitcoin.org/bitcoin.pdf)
- See also: [CAP Theorem](./cap.md), [Consensus](./consensus.md)

---

[← Previous: CAP Theorem](./cap.md)
·
[Back to Distributed Systems](./README.md)
·
[Next: Probabilistic Finality →](./probabilistic-finality.md)
