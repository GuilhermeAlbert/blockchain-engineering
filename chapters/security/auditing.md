# Smart Contract Auditing

A smart contract audit is a bounded review of specified code, configuration, assumptions, and documentation at a particular revision. It can find defects and challenge the design. It cannot prove that deployed code will remain safe under every integration, governance decision, market condition, or later upgrade.

## Scope defines the result

An audit report should identify commit hashes, contracts, compiler versions, dependencies, deployment assumptions, excluded components, and the review period. A report for a token contract does not cover the bridge that mints it. A report for an implementation does not establish that the proxy points to that implementation or that initialization used the intended values.

Review starts with invariants and authority. Which balances must reconcile? Who may mint, withdraw, pause, upgrade, or change an oracle? Can users always exit under stated conditions? Which external contracts and off-chain services does the system trust?

Without these statements, reviewers can find local coding errors while missing a design that faithfully implements the wrong rule.

## Review techniques

Manual review traces state changes, access paths, external calls, arithmetic, lifecycle transitions, and failure recovery. Unit tests check named examples. Fuzz tests explore generated inputs. Invariant tests run sequences and assert properties such as conservation or solvency. Static analyzers detect known patterns. Symbolic execution reasons about paths using symbolic inputs. Differential tests compare two implementations or a contract against a reference model.

Tools produce evidence, not a verdict. A static warning may be irrelevant in context. A clean run may mean the detector lacks a rule for the actual bug. Coverage reports show which code executed during tests, not which economic states were understood.

## Findings and remediation

A useful finding states the affected code and version, preconditions, failure mechanism, impact, reproducible evidence, and a specific repair. Severity combines impact with likelihood under the stated threat model. Teams should track whether they fixed, mitigated, accepted, or disputed each finding and provide evidence for the decision.

Fixes need review. A patch can introduce a new bug, move the trust boundary, or invalidate earlier analysis. Rerun tests and ask the reviewer to confirm remediation against the actual commit intended for deployment.

## Deployment verification

After review, verify compiler settings, linked libraries, constructor or initializer arguments, proxy slots, administrators, roles, oracle addresses, multisig thresholds, timelocks, and source-code publication. A safe source tree deployed with the wrong administrator is an unsafe system.

Audits also age. New integrations, parameter changes, compiler discoveries, upgrades, and shifts in market liquidity can invalidate assumptions without changing the audited file.

## Further reading

- [Ethereum.org smart contract security](https://ethereum.org/developers/docs/smart-contracts/security/)
- [Solidity security considerations](https://docs.soliditylang.org/en/latest/security-considerations.html)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- See also: [Testing](../contracts/testing.md), [Formal Verification](./formal-verification.md)

---

[← Previous: Upgrade Risks](./upgrade-risks.md)
·
[Back to Security](./README.md)
·
[Next: Formal Verification →](./formal-verification.md)
