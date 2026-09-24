# On-Chain Governance

On-chain governance records proposals and votes in contracts and can execute approved actions without a separate human signer. The contract makes counting and execution inspectable, but the design still chooses who has power and which actions fall within it.

## Proposal lifecycle

A common lifecycle is proposal creation, voting delay, snapshot, voting period, quorum and threshold checks, queueing, timelock delay, then execution. The proposal contains calldata and targets, so voters authorize concrete state changes rather than a prose summary alone.

Interfaces should decode every action. A proposal titled “routine parameter update” can also grant a role or transfer assets if bundled calldata permits it.

## Voting power

Voting can use token balances, delegated balances, staked positions, NFTs, reputation, or one-member-one-vote registries. Token-weighted systems are easy to compose with on-chain assets and inherit their concentration, lending, custody, and delegation behavior.

Snapshots fix voting power at a block and prevent transfers from voting repeatedly. Quorum requires a minimum participation level. A proposal threshold limits who can submit. These controls shape access and liveness; none establishes that the majority chose a safe action.

## Timelocks and emergency paths

A timelock separates decision from execution. Users can inspect calls, exit, or coordinate a response during the delay. The timelock must hold the relevant roles. If another admin can upgrade or transfer immediately, the delay is cosmetic.

Emergency councils can pause or veto attacks faster than token voting. Their membership, threshold, scope, duration, and removal process need public definition. Emergency power that never expires becomes the effective governance layer.

## Governance attacks

Threats include borrowed voting power, compromised delegates, malicious proposal payloads, low-turnout capture, denial of quorum, execution bugs, and upgrades to the governor itself. Test the entire lifecycle and authority graph. Monitor proposal creation, vote changes where allowed, queueing, cancellation, and execution.

## Further reading

- [OpenZeppelin governance](https://docs.openzeppelin.com/contracts/5.x/governance)
- [OpenZeppelin Governor API](https://docs.openzeppelin.com/contracts/5.x/api/governance)
- See also: [Flash Loan Attacks](../security/flash-loan-attacks.md), [Access Control](../security/access-control.md)

---

[← Previous: DAOs](./daos.md)
·
[Back to Governance](./README.md)
·
[Next: Off-Chain Governance →](./off-chain.md)
