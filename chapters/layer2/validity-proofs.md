# Validity Proofs

A validity proof is the specific zero-knowledge proof a ZK rollup submits to L1 alongside each batch, and this chapter works through exactly what statement that proof actually establishes, and what an L1 verifier contract checks when it receives one.

## What statement the proof actually proves

A validity proof doesn't prove a vague claim like "this rollup is working correctly." It proves a precise, specific mathematical statement about one particular batch: given a previous state root, a batch of transactions (or a commitment to that batch's data), and the rollup's own execution rules encoded as a circuit, executing those transactions against that previous state, following those rules exactly, produces the claimed new state root. The proof's public inputs are exactly these values (previous root, batch data commitment, new root); the proof itself demonstrates that a valid execution trace connecting them exists, without the L1 verifier needing to re-execute anything to confirm it.

```text
Public inputs to the proof:
  - previousStateRoot
  - batchDataCommitment (a hash committing to the batch's transaction data)
  - newStateRoot

The proof demonstrates: "I know a valid execution trace, following the
rollup's own EVM-equivalent rules, that starts at previousStateRoot,
processes exactly the transactions committed to by batchDataCommitment,
and ends at newStateRoot."
```

## What the L1 verifier contract actually does

L1 doesn't re-execute the batch. It runs a much smaller, fixed-cost computation: checking the submitted proof against the public inputs, using the specific cryptographic verification algorithm for whichever proof system (a SNARK or STARK variant, see [ZK Rollups](./zk-rollups.md#snarks-versus-starks-in-this-context)) the rollup uses. This verification step is what makes ZK rollups practical at all: it's cheap and fast regardless of how large or complex the underlying batch of transactions was, since the proof's size and verification cost are largely independent of how much computation the proof actually attests to, a property called **succinctness** that both SNARKs and STARKs provide.

## The prover's job: turning execution into a provable circuit

Generating a validity proof requires the rollup's entire execution logic, every EVM opcode's behavior, to be expressible as an arithmetic circuit or an equivalent provable computational model, since zero-knowledge proof systems prove statements about circuits, not arbitrary code. Building a circuit that faithfully reproduces the EVM's actual behavior, opcode for opcode, including its exact gas accounting and edge cases, is a substantial engineering undertaking in its own right (commonly called a **zkEVM**), and different ZK rollups have taken different approaches to how completely and how directly they replicate real EVM bytecode versus using a different, purpose-built execution model that's easier to prove but requires translating or recompiling existing Ethereum contracts to run on it.

## Common misconceptions

**A validity proof does not prove that a rollup's rules themselves are good, fair, or bug-free.** It proves that a specific state transition correctly followed the rollup's own encoded rules; if those rules themselves contain a bug (an incorrectly specified circuit, for instance), a validity proof can be entirely valid while still attesting to an outcome that doesn't match what the rollup's designers actually intended.

**Generating a validity proof is not something an ordinary user's own transaction does directly.** It's the rollup's prover infrastructure that generates a proof for an entire batch after the fact; an individual user submits an ordinary transaction to the sequencer and doesn't interact with the proving process at all.

## Further reading

- [Ethereum.org: ZK rollups](https://ethereum.org/en/developers/docs/scaling/zk-rollups/)
- See also: [Zero-Knowledge Proofs](../cryptography/zero-knowledge.md), [ZK Rollups](./zk-rollups.md)

---

[← Previous: ZK Rollups](./zk-rollups.md)
·
[Back to Layer 2](./README.md)
·
[Next: Sequencers →](./sequencers.md)
