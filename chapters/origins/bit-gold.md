# Bit Gold

Nick Szabo proposed "bit gold" in 1998 and wrote it up in detail on his blog in December 2005 — before Bitcoin existed, and specifically before Satoshi's whitepaper. Szabo is a legal scholar and computer scientist who, independent of the money question, spent the 1990s writing about how contracts and property rights could be enforced in software rather than courts, coining the term "[smart contract](../contracts/README.md)" in 1994. Bit gold sits at the intersection of that work and the cypherpunk digital-cash tradition: an attempt to create scarcity and unforgeable ownership in a purely digital medium, modeled explicitly on the properties that make physical gold work as money.

## The problem, as Szabo framed it

Szabo's starting question was: why has gold functioned as money across nearly every human civilization, when it has comparatively little intrinsic use (some jewelry and, in modern times, electronics manufacturing) relative to its price? His answer, laid out in his companion essay [Shelling Out: The Origins of Money](https://nakamotoinstitute.org/library/shelling-out/), is that gold is **costly to produce** (it requires real effort to mine and refine) and **cheap to verify** (its density, color, and reaction to acid are easy to test), and these two properties together make it hard to counterfeit and easy for strangers to trust without a central authority vouching for it. He wanted to build a digital good with the same two properties: expensive to create, trivial to verify.

## How bit gold was designed to work

Szabo's proposal is more of a protocol sketch than a fully engineered system, but its structure is describable in concrete steps:

1. A participant generates a **challenge string** — some piece of unpredictable, current data, so that a solution can't be precomputed in advance.
2. The participant performs a **proof-of-work computation** (the same class of puzzle as [Hashcash](./hashcash.md)) using that challenge as an input, searching for a solution that is expensive to find but cheap to check.
3. The solution — the "bit gold" itself — is **cryptographically timestamped**, and Szabo proposed doing this using a **distributed, Byzantine-fault-tolerant timestamping service** run collectively by a quorum of servers, so that no single party controls the official record of when a piece of bit gold was created.
4. The timestamped solution is **linked to the previous solution or chain of solutions**, creating a growing, ordered string of bit gold "coins," each provably created after the last.
5. Because each unit of bit gold requires new, non-reusable proof-of-work, units cannot be copied or forged — verifying one only requires re-checking a hash, but creating a new one requires redoing the expensive search from a fresh challenge.

Szabo explicitly proposed that **ownership of bit gold units be tracked and transferred via a title registry**, again ideally maintained by a distributed, quorum-based system rather than a single company, echoing the same "who keeps the ledger honest without a single trusted party" problem found in [b-money](./b-money.md).

```text
Challenge #1 (random seed)
        │
        ▼  proof-of-work search
Solution #1 ── timestamped by BFT quorum
        │
        ▼  becomes input to next challenge
Challenge #2
        │
        ▼  proof-of-work search
Solution #2 ── timestamped, chained to Solution #1
        │
        ▼
       ...
```

This chained structure — each new unit's creation referencing what came before, timestamped by a distributed quorum rather than one party — is the part of bit gold that most visibly anticipates a blockchain. It is not identical to Bitcoin's design: bit gold has no single global chain with a "longest chain" rule, no mining difficulty adjustment tied to a target block time, and — critically — Szabo never fully specified how the distributed timestamping quorum itself reaches agreement or resists being taken over, which is the same unresolved problem that appears in b-money's server model.

## What bit gold got right

- **Proof-of-work as the source of digital scarcity**, using the same cost-to-produce / cheap-to-verify logic Bitcoin uses for mining.
- **Chaining new units to prior state**, an early conceptual precursor to linking blocks by hash (see [Hashes and Block Linking](../blockchain/block-linking.md)).
- **A distributed, rather than single-party, timestamping and title-registry service** — recognizing, as b-money's author did, that the party who keeps the record is the crux of the whole design.
- **Explicit modeling on gold's monetary properties**, which put Szabo's work directly in conversation with monetary theory questions this book covers in [Economics](../economics/README.md), particularly why costly-to-produce goods historically function well as money (see [Carl Menger and the Origin of Money](../economics/menger.md)).

## What bit gold left unsolved

- **No fully specified consensus mechanism.** "A distributed quorum of servers" is a design goal, not a protocol. How the quorum is selected, how it handles a participant trying to join or leave, and how it resists a coalition of dishonest quorum members controlling the timestamping process were never worked out in detail or implemented.
- **Never built.** Like b-money, bit gold exists as essays, not running code. Szabo has said in later interviews and blog comments that he attempted a prototype implementation but never released or deployed one publicly.
- **No native mechanism for dividing or aggregating units into arbitrary payment amounts** the way Bitcoin's satoshi-denominated outputs do (see [The UTXO Model](../bitcoin/utxo.md)).

## Bit gold, Satoshi, and the identity question

Because bit gold is structurally close to Bitcoin — proof-of-work, chained timestamps, digital scarcity modeled on gold — and because Szabo was demonstrably active in exactly the intellectual circles that produced Bitcoin, Szabo has been one of the most frequently proposed candidates for Satoshi Nakamoto's real identity in outside speculation and journalism. Szabo has repeatedly and publicly denied being Satoshi. No primary-source evidence — cryptographic, stylometric, or otherwise — has been published that establishes his identity as Satoshi's beyond speculation, and this book does not treat that claim as fact. See [Who Was Satoshi Nakamoto?](./satoshi.md) for a full treatment of identity theories and why this book labels them as speculation rather than history.

What is documented, rather than speculated: Satoshi did not cite bit gold by name in the Bitcoin whitepaper's references (unlike Hashcash and b-money), though the two designs are close enough in structure that the omission has itself been a subject of public comment. Szabo and Satoshi both posted on overlapping cryptography and financial-cryptography mailing lists in the years before 2008.

## Common misconceptions

**Bit gold was not a cryptocurrency that launched and failed.** No coins were ever issued under this design; it never moved past the design-essay and (per Szabo's own later comments) limited prototype stage.

**Szabo being a Satoshi candidate is speculation, not evidence.** Structural similarity between two designs by different authors working in the same small community on the same well-known problem is expected, not suspicious on its own.

## Further reading

- [Bit gold](https://unenumerated.blogspot.com/2005/12/bit-gold.html) — Nick Szabo, 2005
- [Shelling Out: The Origins of Money](https://nakamotoinstitute.org/library/shelling-out/) — Nick Szabo
- [Smart Contracts: Building Blocks for Digital Markets](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html) — Nick Szabo, 1996

---

[← Previous: b-money](./b-money.md)
·
[Back to Origins](./README.md)
·
[Next: Who Was Satoshi Nakamoto? →](./satoshi.md)
