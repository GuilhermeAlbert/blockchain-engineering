# 51% Attacks

A 51% attack is a scenario where a single party (or coordinated group) controls a majority of a proof-of-work network's total hash power, and uses that majority to manipulate which transactions the network accepts. This chapter covers precisely what such an attacker can and cannot do, since the term is frequently used more loosely and more alarmingly than the actual, bounded capability it describes.

## What a majority attacker can do

With sustained majority hash power, an attacker can:

- **Exclude specific transactions** from blocks they mine, effectively censoring them from confirmation as long as the attacker continues controlling a majority (though other, honest miners not controlled by the attacker could still include those transactions in blocks *they* find, if any exist).
- **Reverse their own recent transactions**: the classic **double-spend attack**: spend coins in a transaction included in the publicly visible chain (e.g., paying an exchange and having them credit the deposit), then secretly mine an alternative chain that doesn't include that transaction, and once that alternative chain has more cumulative work, broadcast it, per [Fork Choice](../blockchain/fork-choice.md), the network adopts the longer-work chain, orphaning the original transaction and letting the attacker spend those same coins again elsewhere.
- **Prevent other miners' blocks from becoming part of the accepted chain** while the attacker's private chain is being built, though this requires the attacker to continuously out-mine the honest network for the duration of the attack.

## What a majority attacker cannot do, even with 100% of hash power

This is the more important, and more reassuring, half of the picture, and it's worth stating precisely because it's frequently misunderstood:

- **Cannot steal funds from addresses they don't control the private keys for.** Proof-of-work majority controls which *valid* chain gets extended; it does not let an attacker forge signatures or bypass the [digital signature](../cryptography/digital-signatures.md) requirement for spending any output. A 51% attack is not a way to break ECDSA or Schnorr signatures.
- **Cannot change Bitcoin's protocol rules**: issuance schedule, block size limits, or any other consensus rule. Hash power determines which *valid-per-existing-rules* chain wins a fork-choice comparison; it has no power to make an otherwise-invalid block (one that breaks a consensus rule) become acceptable to honestly-running full nodes, which independently reject it regardless of how much work backs it (see [Full Nodes](./full-nodes.md)).
- **Cannot reverse transactions buried deep enough in the past** without redoing an amount of cumulative work proportional to that depth, the calculation from [Probabilistic Finality](../distributed-systems/probabilistic-finality.md) still applies; a 51% attacker has a *rising*, not certain, probability of successfully reversing recent transactions, and reversing very old, deeply buried ones requires an amount of sustained work that becomes impractical even for a majority attacker the deeper the target transaction is.

## Historical incidents

Bitcoin's own mainnet has not, to date, experienced a confirmed, sustained majority attack of the kind described above at meaningful scale, its total hash rate and the capital cost of acquiring a genuine majority share have grown large enough to make such an attack extraordinarily expensive relative to the plausible gain from double-spending. Several smaller proof-of-work cryptocurrencies with much lower total hash rate (a lower barrier for an attacker to rent or acquire majority hash power against) have experienced real, documented 51% attacks and resulting double-spends, including Bitcoin Gold (2018) and Ethereum Classic (multiple incidents, including 2019 and 2020), illustrating that this is a real, demonstrated risk for smaller networks even though it has not materialized against Bitcoin's own, much larger, mainnet. TODO: verify the specific financial impact figures reported for these incidents against primary sources (exchange post-mortems or blockchain analysis reports) before citing a specific dollar amount.

## Why the threshold is called "51%" rather than exactly 50%

An attacker with *exactly* 50% of hash power is, in expectation, tied with the honest network, the race described in [Probabilistic Finality](../distributed-systems/probabilistic-finality.md#the-model) never resolves reliably in the attacker's favor over the long run, though short-term variance could still occasionally favor either side. "51%" is shorthand for "a genuine, sustained majority," and in practice, a smaller majority (say, 40-45%, especially combined with strategies like selfish mining that exploit propagation-timing advantages rather than pure hash power alone) can, under some analyses, achieve disproportionate influence without needing a full, clean 51%, meaning the real-world threshold for meaningful risk is somewhat more nuanced than the round, popularized "51%" figure suggests.

## Common misconceptions

**A 51% attack is not a way to "hack Bitcoin" in the sense of breaking its cryptography.** It's an economic and probabilistic attack on the consensus mechanism specifically, entirely distinct from, and not enabled by, any weakness in the hash functions or signature schemes covered in [Cryptography](../cryptography/README.md).

**The cost of a 51% attack against Bitcoin's mainnet is not primarily about acquiring hardware alone**, sustaining majority hash power for a meaningful attack duration also requires an enormous, ongoing electricity expenditure, and the attacker forfeits the substantial honest mining revenue (subsidy plus fees) they'd otherwise have earned by mining honestly with that same hardware during the attack, a real opportunity cost factored into most serious analyses of attack economics.

## Further reading

- [Bitcoin whitepaper, Section 11 (Calculations)](https://bitcoin.org/bitcoin.pdf)
- See also: [Probabilistic Finality](../distributed-systems/probabilistic-finality.md), [Mining Pools](./mining-pools.md)

---

[← Previous: Hashrate](./hashrate.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Energy Consumption →](./energy.md)
