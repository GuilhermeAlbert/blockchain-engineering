# MEV

Maximal extractable value is value obtained by controlling transaction inclusion, exclusion, or ordering within a block. The term began as miner extractable value under proof of work. It now covers validators, block builders, sequencers, and other actors that influence ordered execution.

## Where the value comes from

Pending transactions expose state changes that have not happened yet. A searcher simulates possible orderings and constructs a bundle that captures an opportunity. Common sources include decentralized-exchange arbitrage, liquidations, NFT mints, and sandwich attacks. The searcher may pay most of the expected profit to a builder or validator for favorable inclusion.

The roles can be separate:

- users create transactions;
- searchers find profitable bundles;
- builders assemble candidate blocks;
- relays deliver bids and payloads;
- validators propose a block;
- applications and sequencers may control ordering before data reaches the base layer.

The exact pipeline depends on the network. A security analysis should identify who observes order flow, who can withhold it, who constructs the order, and who receives payment.

## Helpful and harmful extraction

Some MEV performs work a protocol depends on. Arbitrage keeps prices across pools close enough for markets and oracles to function. Liquidators repay unhealthy debt and restore collateral ratios. The same competition can create congestion, failed transactions, centralization pressure, and worse execution for users.

Sandwiching transfers value from a user's allowed price movement to the attacker. Censorship or delayed inclusion can make an opportunity unavailable to everyone except a preferred participant. Time-sensitive applications may pay increasingly high fees, with much of the economic surplus moving to the ordering layer.

Calling all MEV malicious hides the design problem. Calling it all harmless market efficiency hides who bears the cost. Measure the action, the beneficiary, the harmed party, and the protocol function it performs.

## Centralization pressure

Better latency, private order flow, simulation infrastructure, and capital can improve a builder's bids. Validators prefer higher bids, which can concentrate block construction among a small set of builders. Relays can become availability and policy chokepoints. Proposer-builder separation changes who performs ordering but does not remove ordering power.

Rollup sequencers hold a similar position for their execution environments. A centralized sequencer can choose transaction order and temporarily censor submissions even when users retain an escape path through L1. The escape path limits custody risk more directly than it guarantees prompt, fair ordering.

## Application defenses

Protocols can use batch auctions, frequent clearing, commit-reveal schemes, encrypted submission, transaction-level price bounds, or designs that return ordering surplus to users. Each changes latency, complexity, trust, or market behavior. Private transaction delivery can reduce exposure to public searchers while giving the private service visibility and policy power.

MEV cannot be addressed only at the wallet. Application rules determine whether ordering creates an extractable difference. Infrastructure determines who sees and controls the order. Consensus determines who can finalize it.

## Further reading

- [Flashbots documentation](https://docs.flashbots.net/)
- [Flashbots research](https://collective.flashbots.net/)
- [Ethereum proposer-builder separation research](https://ethereum.org/roadmap/pbs/)
- See also: [Sequencers](../layer2/sequencers.md), [Liquidations](../defi/liquidations.md)

---

[← Previous: Front Running](./front-running.md)
·
[Back to Security](./README.md)
·
[Next: Bridge Exploits →](./bridge-exploits.md)
