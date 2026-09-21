# Bitcoin

This is the deepest section of the book. Bitcoin gets the fullest treatment here because everything in [Origins](../origins/README.md), [Economics](../economics/README.md), [Cryptography](../cryptography/README.md), [Distributed Systems](../distributed-systems/README.md), and [Blockchain Fundamentals](../blockchain/README.md) was building toward being able to explain, precisely and mechanically, how the actual, running Bitcoin network works, not as an analogy or a simplified model, but as the specific protocol it is.

## What you need to know first

Everything preceding this section, especially [Blockchain Fundamentals](../blockchain/README.md) (blocks, headers, the chain) and [Cryptography](../cryptography/README.md) (hashes, keys, signatures, Merkle trees). This section applies those tools directly to Bitcoin Core's actual, specific implementation, with verified code examples throughout.

## Chapters

### Network and nodes

1. [Bitcoin Nodes](./nodes.md): nodes, miners, and wallets as distinct, independent roles
2. [The Bitcoin Network](./network.md): real-world scale and propagation speed
3. [Full Nodes](./full-nodes.md): what independent validation actually checks
4. [Light Clients](./light-clients.md): SPV, and precisely what it does and doesn't verify
5. [Bitcoin Core](./bitcoin-core.md): the reference implementation as, in practice, the specification

### Transactions

6. [Bitcoin Transactions](./transactions.md): structure, serialization, and a verified txid computation
7. [The UTXO Model](./utxo.md): where bitcoins actually "live," precisely stated
8. [Inputs and Outputs](./inputs-and-outputs.md): referencing, unlocking, and the fee that's never a stated field
9. [Transaction Fees](./fees.md): weight, vsize, and why fees are priced per byte
10. [The Mempool](./mempool.md): why there's no single global mempool, and how Replace-By-Fee works
11. [Transaction Confirmation](./confirmation.md): turning confirmation depth into a practical risk decision
12. [Coinbase Transactions](./coinbase-transactions.md): the one transaction type with no real input

### Scripts and spending conditions

13. [Bitcoin Script](./script.md): a working, verified stack-machine interpreter
14. [ScriptPubKey and ScriptSig](./scripts.md): the standard script types, at a glance
15. [P2PKH](./p2pkh.md)
16. [P2SH](./p2sh.md)
17. [SegWit](./segwit.md): the malleability fix that also changed fee accounting
18. [Taproot](./taproot.md): making complex spends indistinguishable from simple ones
19. [Ordinals and Inscriptions](./ordinals.md): an emergent use of Taproot, and the debate it sparked

### Mining

20. [Proof of Work](./proof-of-work.md): what a miner actually computes, with the whitepaper's own formula
21. [Mining](./mining.md): the full process, end to end, and mining economics
22. [Mining Difficulty](./difficulty.md): target, bits, and difficulty as a ratio
23. [Difficulty Adjustment](./difficulty-adjustment.md): the retargeting formula, with its clamp
24. [Nonce](./nonce.md): why 4 bytes isn't enough anymore, and how extranonce fills the gap
25. [Block Rewards](./block-rewards.md): subsidy versus total reward
26. [The Halving](./halving.md): the full historical schedule
27. [Mining Pools](./mining-pools.md): variance reduction, and the centralization it introduces
28. [ASICs](./asics.md): why CPU and GPU mining became permanently unprofitable
29. [Hashrate](./hashrate.md): an estimate, not a measurement
30. [51% Attacks](./51-percent-attacks.md): precisely what a majority attacker can and cannot do
31. [Energy Consumption](./energy.md): the mechanism, the scale, and the genuine debate

### Bitcoin monetary policy

32. [21 Million BTC](./21-million.md): where the number comes from, and what it does and doesn't guarantee
33. [Issuance Schedule](./issuance.md): the disinflationary curve, compared to gold and fiat
34. [Stock-to-Flow](./stock-to-flow.md): a contested price model, and why it's contested
35. [Lost Coins](./lost-coins.md): why "lost" is unrecoverable by design, not a bug
36. [Fee Market](./fee-market.md): block space as a scarce resource with a real price mechanism
37. [Long-Term Security Budget](./security-budget.md): the open question this section builds toward

## Experiments

- [examples/bitcoin/](../../examples/bitcoin/): decoding real transactions and blocks
- Every code example throughout this section has been run and verified directly, not hand-computed

## Next

Continue to [Forks and Protocol Upgrades](../forks/README.md) to see how Bitcoin actually changes over time without a central authority, including the SegWit and block-size disputes this section's transaction and script chapters set up but didn't resolve. Readers more interested in key management can instead jump to [Wallets and Key Management](../wallets/README.md).
