# Validators and Miners

Block producers choose transactions and extend a chain under rules enforced by validating nodes. They can influence ordering, inclusion, signaling, and which valid branch they build on. They cannot make an invalid state transition valid for nodes that independently check the rules.

## Signaling is coordination

Bitcoin version bits let miners signal readiness for a soft fork. The signal helps coordinate activation and estimate deployment. It is not proof that users, exchanges, wallets, or all nodes support the change, and it does not grant miners authority over unrelated protocol decisions.

Ethereum validators attest to blocks and finality under their client rules. Protocol upgrades are coordinated through client releases and scheduled activation, not a general validator ballot. Validators choose whether to install compatible software and can continue another fork, subject to slashing and market consequences within each system.

## Ordering and censorship

The current proposer can include, omit, or order transactions within protocol constraints. Persistent censorship requires repeated influence across proposers or infrastructure such as builders and relays. Fee markets and MEV create incentives for particular ordering.

Users may route around one censor through other peers, private submission paths, or later proposers. That does not make short-term censorship harmless for auctions, liquidations, or time-sensitive governance.

## Majority power has limits

Majority hash power can reorganize recent proof-of-work history and censor transactions, but cannot spend coins without signatures or create blocks that violate rules enforced by nodes. A proof-of-stake supermajority can finalize conflicting or censoring behavior under protocol conditions, with penalties and social recovery considerations defined by the system.

Economic actors can respond by rejecting a branch, changing software, or coordinating a fork. Such responses are costly and uncertain. Technical ability and governance legitimacy are separate questions.

## Further reading

- [BIP 9](https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki)
- [Ethereum proof of stake](https://ethereum.org/developers/docs/consensus-mechanisms/pos/)
- See also: [Miner Signaling](../forks/miner-signaling.md), [Validators](../ethereum/validators.md)

---

[← Previous: Core Developers](./core-developers.md)
·
[Back to Governance](./README.md)
·
[Next: Users and Node Operators →](./users.md)
