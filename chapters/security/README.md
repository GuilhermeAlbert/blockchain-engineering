# Blockchain Security

Blockchain systems fail at boundaries. A signature can be mathematically valid and still authorize a theft. A contract can execute exactly as written while violating the economic assumption its developers meant to encode. A bridge can run correct contracts and still fail because enough validator keys were compromised. Security work starts by naming the asset, the authority that can move it, and every assumption between a user's intent and the final state transition.

This section follows those boundaries from the user inward. It starts with keys, recovery phrases, phishing, signatures, and token approvals. It then covers contract failures, transaction ordering, bridges, upgrades, audits, and formal verification. The chapters describe attacks closely enough to explain the engineering failure and its mitigation. They do not provide operational instructions for targeting live systems.

## A working threat model

A threat model answers four questions before anyone chooses a tool:

1. **What must remain protected?** Private keys, withdrawal authority, governance control, price integrity, accounting invariants, availability, and confidential user data are different assets.
2. **Who can act?** Users, administrators, validators, sequencers, relayers, oracle operators, external contracts, compromised frontends, and attackers have different capabilities.
3. **What must be trusted?** Code, hardware, browser state, DNS, off-chain services, multisig signers, upgrade keys, data feeds, and economic incentives may all sit inside the trust boundary.
4. **How does failure appear?** Theft is only one outcome. Funds can be frozen, accounting can drift, withdrawals can become insolvent, governance can stall, or a service can return stale data while appearing healthy.

The same component can be safe under one model and unsafe under another. A single administrator may be acceptable for a local prototype and reckless for a contract holding public deposits. A time-weighted price can resist one-block manipulation but remain wrong during a prolonged market dislocation. Security claims need the assumption attached.

## Chapters

1. [Private Key Theft](./private-key-theft.md): how signing authority is copied, abused, and contained
2. [Seed Phrase Theft](./seed-phrase-theft.md): why a recovery phrase is a portable master secret
3. [Phishing](./phishing.md): how attackers replace the interface, destination, or request a user believes they are approving
4. [Malicious Signatures](./malicious-signatures.md): valid cryptography attached to hostile meaning
5. [Approval Attacks](./approval-attacks.md): persistent token authority and the limits of revocation
6. [Reentrancy](./reentrancy.md): external control flow before internal accounting is settled
7. [Access Control](./access-control.md): roles, admin paths, initialization, and least privilege
8. [Integer and Precision Bugs](./precision.md): units, rounding direction, truncation, and accounting drift
9. [Oracle Manipulation](./oracle-manipulation.md): when a contract trusts a price that an attacker can move
10. [Flash Loan Attacks](./flash-loan-attacks.md): atomic capital as an amplifier rather than a root cause
11. [Front Running](./front-running.md): transaction visibility and adversarial ordering
12. [MEV](./mev.md): value extracted through inclusion, exclusion, and ordering
13. [Bridge Exploits](./bridge-exploits.md): signer compromise, verification failure, and replay across chains
14. [Upgrade Risks](./upgrade-risks.md): mutable logic, storage compatibility, and concentrated authority
15. [Smart Contract Auditing](./auditing.md): what a review can find and what it cannot prove
16. [Formal Verification](./formal-verification.md): proving properties of a model against a written specification

## Further reading

- [Solidity security considerations](https://docs.soliditylang.org/en/latest/security-considerations.html)
- [Ethereum.org smart contract security](https://ethereum.org/developers/docs/smart-contracts/security/)
- [OpenZeppelin Contracts documentation](https://docs.openzeppelin.com/contracts/)
- [Ethereum.org formal verification](https://ethereum.org/developers/docs/smart-contracts/formal-verification/)

---

[← Previous: Starknet](../layer2/starknet.md)
·
[Back to Full Contents](../../SUMMARY.md)
·
[Next: Private Key Theft →](./private-key-theft.md)
