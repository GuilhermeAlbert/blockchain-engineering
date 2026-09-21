# Hash Collisions

A collision is two different inputs that produce the same hash output. Collisions are not a bug, by the pigeonhole principle, since SHA-256 maps an effectively infinite space of possible inputs onto a fixed 2^256 possible outputs, collisions must exist mathematically. What matters is not whether collisions exist, but whether anyone can *find* one faster than brute force. This chapter covers why that distinction is the entire security model, and what happens when it breaks, using SHA-1's real, documented collision as a concrete case study.

## The problem collision resistance solves

Consider [Merkle trees](./merkle-trees.md), where a single 256-bit root hash represents an entire set of transactions in a block. This only works as a security mechanism if it is infeasible for someone to construct a *different* set of transactions that happens to produce the identical root hash. Otherwise, someone could present a forged transaction set to a light client (see [Light Clients](../bitcoin/light-clients.md)) and have it accepted as legitimate, since the light client only checks the root hash, not every underlying transaction. **Collision resistance** is the property that makes this forgery infeasible.

## How many tries would it take?

For a hash function with an `n`-bit output, finding *any* two colliding inputs (not targeting a specific one in advance) requires, on average, roughly `2^(n/2)` attempts. This is a direct consequence of the **birthday paradox**: in a room of just 23 people, there's already a better-than-even chance two people share a birthday, because you're checking all pairs, not looking for a match to one specific date. For SHA-256, with `n = 256`, this means an attacker needs roughly `2^128` attempts to find a random collision. A number so large it is considered computationally infeasible with any foreseeable technology (for comparison, the entire Bitcoin network's cumulative hashing effort since 2009, though astronomically large in absolute terms, remains many, many orders of magnitude below `2^128`).

This `2^(n/2)` relationship is why hash output length matters directly for security: a 128-bit hash offers only `2^64` collision resistance, which is within reach of large, well-funded attackers using modern hardware, one of the reasons Bitcoin, Ethereum, and virtually all modern cryptographic protocols use 256-bit (or larger) hash functions rather than shorter ones.

## A real, documented collision: SHA-1

SHA-256's predecessor-generation cousin, SHA-1 (a different, older, 160-bit hash function, not part of the SHA-2 family SHA-256 belongs to), had a **practically demonstrated** collision published in February 2017 by researchers at Google and the CWI (Centrum Wiskunde & Informatica) in Amsterdam, in an attack they named "SHAttered." The researchers produced two different PDF files with different visible content that both hash to the identical SHA-1 value, using an estimated 9,223,372,036,854,775,808 (2^63) SHA-1 computations. A number that was infeasible for individuals but reachable for a well-resourced research effort using significant cloud computing resources.

This is the clearest real-world illustration of why "collision resistant" is a statement about computational cost, not mathematical impossibility: SHA-1 collisions always existed in principle (by the same pigeonhole argument above), but they were considered secure as long as finding one was computationally infeasible. Once researchers demonstrated a practical, reproducible method to find one within reach of real-world resources, SHA-1 was no longer considered safe for security-critical use. Major browsers and certificate authorities had already begun deprecating SHA-1 for TLS certificates before the SHAttered announcement, based on earlier theoretical weakenings of its security margin published from 2005 onward.

## What this means for SHA-256

No practical collision attack against SHA-256 has been published as of this writing. Cryptanalysts have found theoretical weaknesses in *reduced-round* versions of SHA-256 (variants with fewer than the full 64 rounds, studied to understand the algorithm's security margin), but no attack comes close to threatening the full, standard 64-round SHA-256 used by Bitcoin. This is a meaningfully different security posture than SHA-1 had even before SHAttered, and it is monitored on an ongoing basis by the cryptographic research community. A genuine break of SHA-256 would be significant enough news to affect Bitcoin's security model directly, which is one reason mining and consensus researchers track cryptanalytic literature on SHA-2 closely.

## Tradeoffs

There is no way to mathematically prove a hash function is collision-resistant forever, security here rests on the absence of a known attack after sustained, adversarial public scrutiny by the cryptography research community, not on a formal impossibility proof. This means the security of any specific hash function is, in principle, a moving target that could change with new mathematical insight or vastly increased computing power (including, speculatively, sufficiently large quantum computers, though the specific quantum algorithms known to threaten collision resistance, such as versions of Grover's algorithm, offer at most a quadratic speedup, reducing SHA-256's effective security margin from `2^128` to roughly `2^85.3` even in an optimistic quantum-attacker scenario, which remains far beyond current or near-term practical reach).

## Common misconceptions

**A collision is not the same as a preimage attack.** A collision means finding *any two* inputs that hash the same; a preimage attack means finding an input that produces *one specific, given* hash output. These require different amounts of work and have different practical implications, see [Preimage Resistance](./preimage-resistance.md) for the distinction in detail.

**SHA-1 having a practical collision does not mean SHA-256 is similarly weak.** They are structurally related (both Merkle–Damgård constructions) but are different algorithms with different round counts, internal state sizes, and security margins. A weakness in one is not automatically a weakness in the other.

## Further reading

- [SHAttered: The first collision for full SHA-1](https://shattered.io/): Google/CWI Amsterdam research team, 2017
- [NIST FIPS 180-4: Secure Hash Standard](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf)

---

[← Previous: SHA-256](./sha-256.md)
·
[Back to Cryptography](./README.md)
·
[Next: Preimage Resistance →](./preimage-resistance.md)
