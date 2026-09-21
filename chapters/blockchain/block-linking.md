# Hashes and Block Linking

This chapter answers the question in this book's core purpose list directly: why can't someone simply change an old Bitcoin block? The answer is entirely mechanical, and it comes from one simple fact stated in [Block Headers](./block-headers.md): every block's header includes the hash of the block before it.

## The mechanism

Each block header contains a field, `previousBlockHash`, holding the SHA-256d hash of the entire previous block's header. Because a hash function is sensitive to every bit of its input (the avalanche effect, see [Hash Functions](../cryptography/hashes.md)), any change to a block — even a single altered transaction — changes that block's header hash entirely and unpredictably.

```text
Block 100                Block 101                Block 102
hash: A                  hash: B                   hash: C
previous: Z               previous: A               previous: B
     │                         │                         │
     └────────────────────────►│                         │
                                └────────────────────────►│
```

Now suppose someone tries to alter a transaction inside Block 100, years after the fact. This changes Block 100's Merkle root (see [Merkle Roots](./merkle-roots.md)), which changes Block 100's header, which changes Block 100's hash from `A` to some new value `A'`. But Block 101's header still contains the *old* value `A` in its `previousBlockHash` field — the chain is now broken: Block 101 no longer correctly references the (now-altered) Block 100. To fix this, the attacker would also need to update Block 101's `previousHash` field to `A'`, which changes Block 101's own hash from `B` to `B'` — which breaks Block 102's reference, and so on, for every single block from the altered one to the current tip of the chain.

## The cost this imposes: redoing proof-of-work

Changing a header isn't just a bookkeeping fix — every block's hash has to satisfy the proof-of-work requirement active at the time it was mined (see [Proof of Work](../bitcoin/proof-of-work.md)): the hash must be below a specific target, which (per [Preimage Resistance](../cryptography/preimage-resistance.md)) requires trying many nonce values on average. So an attacker who alters Block 100 doesn't just need to recompute hashes for every subsequent block — they need to **re-mine** every one of them, searching for a new valid nonce for each, exactly as if creating each of those blocks from scratch. If a hundred blocks have been mined on top of the altered one, the attacker needs to redo, from a standing start, the equivalent of a hundred blocks' worth of the entire network's combined computational effort — and do it faster than the honest network continues extending the real chain in the meantime, or their alternative chain will never become the longest and will simply be ignored (see [Fork Choice](./fork-choice.md)).

## Example: quantifying the cost

If Bitcoin's entire network is currently finding blocks roughly every 10 minutes using its full combined hash rate, an attacker attempting to alter a block 100 blocks deep would need to single-handedly out-produce that combined effort for the equivalent of 100 blocks' worth of work, while the honest network keeps adding new blocks on top of the current tip during the same period — meaning the attacker's actual required output is even higher than "100 blocks' worth," since they're racing against a moving target. This is precisely the calculation formalized in [Probabilistic Finality](../distributed-systems/probabilistic-finality.md): the deeper a block is buried, the more computational work would need to be redone to alter it, which is why "6 confirmations" and similar depth thresholds function as a practical, quantifiable security margin.

## Under the hood: this is Merkle–Damgård applied at the block level

There's a structural echo worth naming here: just as SHA-256 chains together 512-bit message blocks internally, each block's processing depending on the previous block's intermediate state (see [SHA-256](../cryptography/sha-256.md#how-it-works-step-by-step)), the blockchain itself chains together full blocks, each one's validity depending on a hash of the one before. The blockchain is, structurally, a hash chain of hash chains — the same "tamper anywhere breaks everything downstream" property shows up at both the level of individual hash function internals and at the level of the entire ledger, for the same underlying reason.

## Tradeoffs

Hash-chaining every block makes tampering with old history detectable and, past a shallow depth, computationally impractical — this is the entire security property that makes a blockchain a meaningfully different data structure from an ordinary append-only log or database table, which offers no comparable tamper-evidence on its own. The cost is entirely borne upfront and ongoing: every block, honest or not, requires real proof-of-work to create in the first place, which is the resource cost discussed throughout [Bitcoin](../bitcoin/README.md) and specifically in [Energy Consumption](../bitcoin/energy.md).

## Common misconceptions

**Hash-chaining does not make old blocks literally impossible to alter** — it makes altering them require redoing a specific, quantifiable, and (for anything but the most recent few blocks) enormous amount of computational work, faster than the honest network can extend the real chain. "Impossible" is a useful shorthand for "computationally infeasible with any realistic resources," not a literal mathematical impossibility.

**The security this provides is not really about the individual block hashes being "unbreakable."** It comes from the *combination* of hash chaining (which makes any alteration detectable) and proof-of-work (which makes producing a valid alternative chain of sufficient length prohibitively expensive) — hash chaining alone, without a costly-to-produce proof attached to each link, would let an attacker simply recompute the entire chain instantly, since ordinary hashing is fast.

## Further reading

- [Bitcoin whitepaper, Section 3 (Timestamp Server) and Section 4 (Proof-of-Work)](https://bitcoin.org/bitcoin.pdf)

---

[← Previous: Transactions](./transactions.md)
·
[Back to Blockchain Fundamentals](./README.md)
·
[Next: Merkle Roots →](./merkle-roots.md)
