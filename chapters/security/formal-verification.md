# Formal Verification

Formal verification checks whether a mathematical model of a program satisfies a written specification. The result is conditional: the model, specification, tool assumptions, and environment define what has been proved.

## The specification carries the security claim

A verifier cannot discover what the protocol was meant to do without properties. Engineers write invariants, preconditions, postconditions, temporal properties, or equivalence claims. Examples include:

- total claims never exceed assets held;
- only an administrator can change an implementation;
- a successful withdrawal reduces both the user's claim and system liabilities by the same amount;
- a nonce cannot be consumed twice;
- assets cannot become permanently unreachable through an allowed transition.

Proving an incomplete property can create false confidence. A token contract may prove that balances never overflow while omitting the fact that anyone can mint. A bridge may prove message uniqueness while modeling an honest validator set that the real deployment does not maintain.

## Models and techniques

Model checking explores states of an abstract transition system against temporal or logical properties. Symbolic execution follows program paths with symbolic inputs and asks a constraint solver whether a violating input exists. Theorem proving derives a property through formal inference, often with human guidance. Equivalence checking asks whether two implementations behave the same under stated observations.

Solidity's SMTChecker can analyze assertions and safety properties during compilation. Other tools provide specification languages for contract-level rules or formal EVM semantics. Different tools model external calls, gas, hashing, storage, and unknown code differently. Read the tool's assumptions before interpreting “proved.”

## Safety, liveness, and reachability

A safety property says a bad state never occurs, such as unauthorized minting. A liveness property says a desired state can eventually occur, such as an honest user being able to withdraw. A system can preserve balances perfectly by freezing forever, so safety alone does not capture usable correctness.

Reachability matters for upgrade and governance systems. It may be safe for an administrator to pause, but the specification should establish which path restores service and who controls it.

## The environment remains part of the proof

A contract model may treat an oracle answer as an unconstrained input, a trusted value, or a value within a range. Each choice proves something different. External token behavior, reentrancy, proxy storage, delegate calls, cryptographic precompiles, chain reorganizations, and off-chain signer thresholds may sit outside the analyzed model.

Formal verification complements testing and review. Tests make concrete behavior easy to inspect and cover integrations the model may omit. Manual review challenges whether the specification matches product intent. Verification explores a broader state space for the properties it can express.

## A practical workflow

Write invariants before optimizing code. Keep verified components small. Prove arithmetic and authorization properties, inspect counterexamples, add assumptions explicitly, and rerun proofs on the exact code revision and compiler configuration intended for deployment. Version specifications beside code because a changed property is a changed security claim.

## Further reading

- [Ethereum.org formal verification of smart contracts](https://ethereum.org/developers/docs/smart-contracts/formal-verification/)
- [Solidity SMTChecker](https://docs.soliditylang.org/en/latest/smtchecker.html)
- [Certora Prover documentation](https://docs.certora.com/en/latest/)

---

[← Previous: Smart Contract Auditing](./auditing.md)
·
[Back to Security](./README.md)
·
[Next: Blockchain Infrastructure →](../infrastructure/README.md)
