# DAOs

A decentralized autonomous organization coordinates shared assets or protocol authority through contracts and off-chain processes. The label does not specify how voting power is distributed, who can submit proposals, which actions execute automatically, or who holds emergency keys.

## Components

A DAO may include a governance token, delegation, proposal thresholds, voting delay and period, quorum, vote-counting rules, a timelock, a treasury, and an executor. Discussion and temperature checks may happen in forums or off-chain polling before an on-chain vote.

Map authority contract by contract. A public vote may advise a foundation multisig. A governor may control a timelock but not an oracle or legal entity. A security council may bypass ordinary delay. The operational DAO is the union of these powers, not the voting interface alone.

## Participation and concentration

Token-weighted voting assigns more power to larger balances or delegated positions. Delegation can concentrate expertise and participation while creating durable political intermediaries. Low turnout lets a small active group meet quorum or dominate outcomes. High proposal thresholds reduce spam and also restrict agenda access.

Snapshot-based voting prevents tokens acquired later from changing past voting power. It does not prove long-term commitment. Borrowing, delegation markets, custodial voting, and vote buying can separate control from economic exposure.

## Execution and accountability

Automatic execution makes the vote binding within contract permissions. A timelock gives users and reviewers time to inspect queued calls. It must control the actual roles, and its admin paths must not bypass delay.

Off-chain execution permits judgment when a proposal contains an error, but restores trust in signers. Publish transaction payloads, signer policies, conflicts, and deviations from passed votes.

## Legal and social boundaries

Contracts do not answer who signs employment agreements, owns trademarks, pays taxes, or bears legal duties. Foundations, companies, service providers, and contributors may perform those roles. Their relationship to token voting varies by jurisdiction and governing documents.

## Further reading

- [OpenZeppelin governance](https://docs.openzeppelin.com/contracts/5.x/governance)
- See also: [On-Chain Governance](./on-chain.md), [Off-Chain Governance](./off-chain.md)

---

[← Previous: Users and Node Operators](./users.md)
·
[Back to Governance](./README.md)
·
[Next: On-Chain Governance →](./on-chain.md)
