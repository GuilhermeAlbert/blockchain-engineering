# Simple Blockchain

A small, from-scratch TypeScript implementation of a blockchain, built to accompany [Blockchain Fundamentals](../../chapters/blockchain/README.md). It demonstrates blocks, hash linking, Merkle roots, a brute-force proof-of-work search, tamper detection, and a basic fork-choice rule, in about 150 lines of code, split into small, readable modules.

**This is not Bitcoin, and it is not secure software.** It is a teaching tool. The "What this project deliberately leaves out" section of the demo output, and the list below, are not an afterthought. Read them.

## Running it

```bash
npm install
npm run demo   # runs the walkthrough script
npm test       # runs the assertion-based test suite
```

Both commands use [`tsx`](https://github.com/privatenumber/tsx) to run the TypeScript directly, with no separate build step needed. `npm run build` compiles to `dist/` with `tsc` if you want a compiled version.

## What's in here

| File | What it does | Related chapter |
| --- | --- | --- |
| `src/hash.ts` | A single SHA-256 wrapper | [Hash Functions](../../chapters/cryptography/hashes.md) |
| `src/merkle.ts` | Builds a Merkle root from a transaction list | [Merkle Trees](../../chapters/cryptography/merkle-trees.md) |
| `src/transaction.ts` | A minimal `{from, to, amount}` record | [Transactions](../../chapters/blockchain/transactions.md) |
| `src/block.ts` | The `Block` class: header fields, hash computation, proof-of-work `mine()` | [Blocks](../../chapters/blockchain/blocks.md), [Block Headers](../../chapters/blockchain/block-headers.md) |
| `src/blockchain.ts` | The `Blockchain` class: adding blocks, full re-validation, fork choice | [Hashes and Block Linking](../../chapters/blockchain/block-linking.md), [Fork Choice](../../chapters/blockchain/fork-choice.md) |
| `src/demo.ts` | A runnable walkthrough: mine a chain, validate it, tamper with it, compare competing chains |, |
| `src/test.ts` | Assertion-based tests covering the same behavior |, |

## What each demo step shows

1. **Mining a small blockchain**: creates a genesis block and three more, each requiring a proof-of-work search (4 leading zero hex characters, chosen so it finishes in well under a second on ordinary hardware, Bitcoin's actual difficulty, by contrast, currently requires roughly 19-20 leading zero *bits*, many orders of magnitude harder).
2. **Validating the chain**: independently recomputes every block's Merkle root and hash from scratch and checks the proof-of-work and previous-hash links, exactly as described in [Replication](../../chapters/distributed-systems/replication.md): nothing is trusted at face value.
3. **Tampering with a historical block**: directly mutates a transaction amount in an already-mined block, then re-validates, showing the tamper is caught immediately and explaining exactly what would additionally be required (re-mining every subsequent block, faster than a real honest network) to make such a change stick in a real, multi-participant network.
4. **Fork choice**: builds two independent, competing chains and shows the cumulative-work comparison a node uses to decide which one to adopt, per [Fork Choice](../../chapters/blockchain/fork-choice.md).

## What this project deliberately omits

Every one of these is a real, necessary part of Bitcoin's actual security model that this toy implementation does not attempt:

- **No peer-to-peer network.** Everything runs in one process with one miner. There is no propagation delay, so none of the naturally occurring forks described in [Chain Reorganizations](../../chapters/blockchain/reorgs.md) can happen here, the fork-choice demo builds two chains manually instead.
- **No digital signatures.** Transactions are plain data with no cryptographic proof of authorization. Anyone could construct a transaction claiming to move funds "from" anyone else. See [Digital Signatures](../../chapters/cryptography/digital-signatures.md) for what's missing.
- **No UTXO or account model, and no double-spend prevention.** There is no concept of a balance being checked or funds actually existing before a transfer, see [The UTXO Model](../../chapters/bitcoin/utxo.md).
- **No real difficulty adjustment.** Difficulty is a fixed constant passed to the constructor, not something recalculated against a target block time across a network of unknown, changing size, see [Difficulty Adjustment](../../chapters/bitcoin/difficulty-adjustment.md).
- **No adversarial environment at all.** There is no attacker, no competing miners, no network partition. Bitcoin's actual security guarantees are specifically about what happens when some participants are actively dishonest (see [Byzantine Faults](../../chapters/distributed-systems/byzantine-faults.md)). A single-process demo has nothing to defend against.

If you want to extend this project, the most instructive next steps, roughly in order of difficulty, are: add [digital signatures](../../chapters/cryptography/digital-signatures.md) to transactions, add a UTXO set and reject transactions that would double-spend, and (considerably harder) simulate multiple independent miner processes communicating over a real network to see natural forks and reorgs emerge.
