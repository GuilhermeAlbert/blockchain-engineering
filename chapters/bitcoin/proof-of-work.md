# Proof of Work

This chapter answers, concretely, a question posed in this book's introduction: what does a miner actually compute? The underlying mathematics (preimage search, hash probability) is covered generally in [Preimage Resistance](../cryptography/preimage-resistance.md); this chapter applies it precisely to Bitcoin's actual mining loop.

## The target

Bitcoin's proof-of-work requirement is stated as: a valid block's header, when hashed with SHA-256d, must produce a value numerically **less than or equal to a target**, a specific 256-bit number that changes over time via the [difficulty adjustment](./difficulty-adjustment.md). A smaller target means fewer possible hash outputs qualify, which means more attempts are needed on average to find one. This is the literal meaning of "difficulty."

## The mining loop

```text
1. Assemble a candidate block: select transactions from the mempool,
   build the coinbase transaction, compute the Merkle root.
2. Build the 80-byte header (version, previous hash, Merkle root,
   timestamp, difficulty bits, nonce).
3. Compute SHA-256d(header).
4. Is the result ≤ target?
     YES → broadcast the block. Done.
     NO  → increment the nonce (and/or extranonce, and/or timestamp,
           and/or transaction selection/order, to get fresh header
           bytes), go back to step 3.
```

This loop is, exactly, the preimage search described generally in [Preimage Resistance](../cryptography/preimage-resistance.md#why-this-matters-mining-is-a-preimage-search). There is no shortcut, no cleverness that reduces the expected number of attempts below what the target's size implies. The whitepaper's own formula applies directly:

```text
P(a single hash attempt succeeds) = target / 2^256
```

## Example: computing today's approximate odds

Bitcoin's difficulty is often expressed relative to the network's very first difficulty (1.0). If today's difficulty is, say, 90 trillion (a real order of magnitude in recent years, though this specific figure changes roughly every two weeks and should not be treated as current, see [Mining Difficulty](./difficulty.md) for how to find the live value), the expected number of hash attempts to find one valid block is approximately `difficulty × 2^32` (a standard relationship between Bitcoin's difficulty units and expected hashes, derived from how the difficulty-1 target is defined):

```typescript
function expectedHashesForDifficulty(difficulty: number): number {
  return difficulty * Math.pow(2, 32);
}

const illustrativeDifficulty = 90_000_000_000_000; // ~90 trillion — illustrative, not live
const expected = expectedHashesForDifficulty(illustrativeDifficulty);
console.log("Expected hash attempts:", expected.toExponential(3));

const networkHashrateHz = 500_000_000_000_000_000_000; // ~500 EH/s — illustrative, not live
console.log("Expected time to find a block (seconds):", expected / networkHashrateHz);
console.log("Expected time to find a block (minutes):", expected / networkHashrateHz / 60);
```

TODO: replace the illustrative difficulty and network hashrate figures with values pulled from a live source (or a specific, dated snapshot with a citation) before treating any specific number as current. Both figures change continuously and any hardcoded value in this book will become stale.

Running this with realistic order-of-magnitude figures produces an expected time close to Bitcoin's 10-minute target, which is not a coincidence, but the entire point of [difficulty adjustment](./difficulty-adjustment.md): the network continuously recalibrates the target specifically to keep this expected time near 10 minutes, regardless of how much total hash power is actually competing.

## Why proof-of-work, specifically, secures the chain

Recall the connection to [Sybil Attacks](../distributed-systems/sybil-attacks.md): because finding a valid hash requires real, external computational work with no shortcut, influence over which chain extends is tied to a resource (hash power) that can't be manufactured for free by creating more software instances or network identities. This is also what makes [Hashes and Block Linking](../blockchain/block-linking.md#the-cost-this-imposes-redoing-proof-of-work) meaningful: altering a past block requires literally redoing this exact search, from scratch, for that block and every block after it.

## Common misconceptions

**Mining is not "solving a math problem" in the sense of working toward a solution incrementally.** Each nonce attempt is an independent, memoryless trial. Finding a hash that starts with, say, 19 zero bits gives you no information that makes finding 20 zero bits any easier; every attempt has exactly the same, unchanged probability of success regardless of how many failed attempts came before it, a property sometimes called "memorylessness" and directly implied by a well-designed hash function's unpredictability (see [Hash Functions](../cryptography/hashes.md)).

**A miner does not need to try every possible nonce value in order**. Nonces can be tried in any order, including in parallel across many independent processing units, since each attempt is a fully independent trial with no dependency on any other.

## Further reading

- [Bitcoin whitepaper, Section 4 (Proof-of-Work) and Section 11 (Calculations)](https://bitcoin.org/bitcoin.pdf)
- See also: [Hashcash](../origins/hashcash.md), [Preimage Resistance](../cryptography/preimage-resistance.md)

---

[← Previous: Ordinals and Inscriptions](./ordinals.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Mining →](./mining.md)
