# Ethereum Governance

Ethereum changes through an off-chain coordination process involving EIP authors, researchers, client teams, application developers, validators, node operators, infrastructure providers, and users. On-chain ETH balances do not directly vote protocol upgrades into effect.

## Core EIPs and network upgrades

A Core EIP specifies a consensus or networking change. Authors develop the proposal and gather feedback. Client teams discuss implementation and coordination, including through AllCoreDevs calls. Candidate changes receive implementations and testing across clients before inclusion in a named network upgrade.

The scheduled activation point coordinates compatible releases. Validators propose and attest under the rules implemented by their clients. Nodes running old incompatible rules may follow a different chain or stop tracking the upgraded network correctly.

AllCoreDevs provides technical coordination among implementers. It is not a legal legislature or token-weighted vote. Its rough consensus assumes the proposal is technically sound and not contentious enough to split the network. Broader social disagreement can make implementation consensus insufficient.

## Multiple clients and specifications

Ethereum separates protocol specifications from several independent execution and consensus clients. This limits dependence on one codebase and forces ambiguous behavior into shared tests and specifications. It also expands coordination work: every production client must implement compatible state transitions, networking, and fork activation.

Client diversity matters operationally. A defect in one majority client can threaten finality or create correlated behavior. Users and staking operators influence this risk through client choice even when they do not participate in protocol meetings.

## The Merge as a coordination case

The Merge replaced proof of work with proof of stake through years of research, specifications, testnets, client implementation, infrastructure preparation, and a coordinated activation condition. No smart contract vote enacted it. Exchanges, applications, node operators, and validators prepared because they expected the upgraded chain to retain social and economic adoption.

Proof-of-work participants could continue incompatible software, and EthereumPoW did. The existence of that fork shows that software rules can diverge. The relative adoption of assets, applications, stablecoins, oracles, and users determines which ecosystem each fork retains.

## What remains outside core governance

Applications can deploy without protocol approval. Token issuers, rollups, wallets, and DAOs govern their own systems under separate rules. Their decisions may influence Ethereum's roadmap, but they do not become protocol rules unless clients and users adopt corresponding changes.

## Further reading

- [Ethereum governance](https://ethereum.org/governance/)
- [EIP-1](https://eips.ethereum.org/EIPS/eip-1)
- [Ethereum execution specifications](https://github.com/ethereum/execution-specs)
- [Ethereum consensus specifications](https://github.com/ethereum/consensus-specs)

---

[← Previous: Bitcoin Governance](./bitcoin.md)
·
[Back to Governance](./README.md)
·
[Next: BIPs →](./bips.md)
