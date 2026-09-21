# Byzantine Generals Problem

The Byzantine Generals Problem is the specific thought experiment, and the accompanying formal results, that gave [Byzantine faults](./byzantine-faults.md) their name. This chapter covers the original 1982 formulation in detail, its key result (agreement is impossible past a certain fraction of traitors), and how Bitcoin's design relates to — without directly implementing — the protocols that paper describes.

## The setup

Leslie Lamport, Robert Shostak, and Marshall Pease posed the problem in their 1982 paper as follows: several divisions of the Byzantine army, each commanded by a different general, surround an enemy city. The generals can communicate only by messenger. They must agree on a common plan of action — attack or retreat — because a coordinated attack by all divisions succeeds, but if only some divisions attack while others retreat, the attacking divisions are destroyed. This would be a simple problem if every general were honest and every messenger reliable. The paper's actual concern is harder: **some of the generals may be traitors**, actively trying to prevent the loyal generals from reaching agreement, including by sending different orders to different generals ("attack" to one, "retreat" to another) or simply lying about what other generals told them.

The formal requirement the paper sets out: a solution must guarantee that (1) all loyal generals decide upon the same plan of action, and (2) a small number of traitors cannot cause the loyal generals to adopt a bad plan — specifically, if the commanding general is loyal, every loyal general must follow the order that general actually gave, even in the presence of traitors trying to confuse the issue.

## The key result: the one-third bound

The paper's central, formally proven result is a specific numeric threshold: with `n` total generals, of which `m` might be traitors, a solution guaranteeing agreement exists **if and only if `n ≥ 3m + 1`** — equivalently, agreement is achievable only if fewer than one-third of all participants are traitors. Below this threshold, the paper proves, by explicit construction of a scenario, that **no messaging protocol, however clever, can guarantee agreement** — there exist situations where a small number of traitors can be arranged so that no protocol lets the loyal generals reliably distinguish the true situation from a different, equally consistent-looking false one.

This is worth sitting with because it's a genuine impossibility result, not just "no one has found a good enough protocol yet": for `n = 3`, generals `A`, `B`, and `C`, with one traitor — say `C` — the paper shows a scenario where `C` tells `A` "attack" and tells `B` "retreat," while `A` and `B` cannot reliably determine, from the information available to them through messengers alone, which of them (if either) is being told the truth, because from `A`'s perspective, "`B` is lying about what `C` told them" and "`C` is lying to `B` while telling `A` the truth" are indistinguishable situations given only the messages `A` can see.

The paper also proves a positive result: with `n ≥ 3m + 1`, explicit algorithms exist (the paper presents both an "oral messages" algorithm, assuming messages can't be forged but their content can't be authenticated as coming from a specific sender beyond the messenger relationship, and a "signed messages" algorithm using what we would now recognize as digital signatures) that do guarantee correct agreement.

## Why signatures change the math

The paper's "signed messages" variant is worth highlighting because of its direct relevance to blockchain systems: if messages can be cryptographically signed in a way that makes forgery infeasible (see [Digital Signatures](../cryptography/digital-signatures.md)) and messages can be relayed while preserving their signatures (so a general can prove exactly what another general said, not just relay a claim about it), the one-third bound can be relaxed — the signed-messages algorithm in the original paper tolerates up to any number of traitors short of all loyal generals being outnumbered, because a traitor caught sending contradictory signed messages can be provably exposed as lying, rather than merely creating ambiguity. This is part of why digital signatures are foundational to essentially every modern Byzantine fault tolerant protocol, blockchain-based or not — they change what's achievable, not just how efficiently it's achieved.

## How Bitcoin relates to this specific framework

It's worth being precise here, since this connection is frequently overstated in casual explanations: **Bitcoin does not implement the Byzantine Generals paper's specific algorithms.** Those algorithms assume a fixed, known set of `n` generals, all directly reachable, engaging in multiple structured rounds of message exchange — a model that doesn't fit Bitcoin's permissionless, unbounded, constantly-changing set of participants (see [Consensus](./consensus.md#two-dimensions-of-difficulty) for why this membership difference matters).

What Bitcoin shares with the Byzantine Generals framing is the **underlying threat model**: a set of mutually distrusting participants who need to agree on a single version of history, some of whom might actively lie or try to cause disagreement. Bitcoin's specific solution — proof-of-work-weighted longest-chain agreement — is often described informally as "solving the Byzantine Generals Problem for a permissionless network," which is a reasonable characterization of the *problem it solves* but not a claim that it implements the 1982 paper's specific protocols. Some Bitcoin explanatory material (including some early community writing) uses "Byzantine Generals Problem" loosely as a synonym for "the general problem of achieving distributed consensus with unreliable, possibly dishonest participants" — this book uses the term in that same general sense when referring to Bitcoin, while keeping the historical, technical claim (the one-third bound, the specific algorithms) tied to its original, more specific meaning above.

## Common misconceptions

**Satoshi Nakamoto's whitepaper does not use the phrase "Byzantine Generals Problem."** The whitepaper never cites Lamport, Shostak, and Pease's paper directly, and does not use this specific terminology — the connection between Bitcoin and the Byzantine Generals framing is one made by later commentators and the broader blockchain community explaining Bitcoin's significance in established distributed-systems terms, not a framing Satoshi used in the original text.

**The one-third bound from the original paper does not directly translate to "Bitcoin is secure as long as less than one-third of hash power is dishonest."** Bitcoin's actual security assumption, discussed in [51% Attacks](../bitcoin/51-percent-attacks.md), is generally framed around a majority (roughly 50%) of hash power, because it relies on a different mechanism (proof-of-work-weighted chain selection among permissionless participants) than the fixed-membership signed-message protocols the one-third bound was proven for.

## Further reading

- [The Byzantine Generals Problem](https://lamport.azurewebsites.net/pubs/byz.pdf) — Lamport, Shostak, Pease, ACM Transactions on Programming Languages and Systems, 1982

---

[← Previous: Byzantine Faults](./byzantine-faults.md)
·
[Back to Distributed Systems](./README.md)
·
[Next: Sybil Attacks →](./sybil-attacks.md)
