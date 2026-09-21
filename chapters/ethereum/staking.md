# Staking

Staking is the act of locking ETH as a validator deposit to participate in Ethereum's consensus and earn rewards for doing so. This chapter covers the practical landscape of how people actually stake (solo staking, pooled staking, and liquid staking) and the meaningfully different tradeoffs each involves, since "staking" describes several structurally different arrangements sharing one name.

## Solo staking

Running your own validator with your own 32 ETH and your own hardware and software (an execution and consensus client, see [Ethereum Nodes](./nodes.md)) is **solo staking**, the most trust-minimized option, since it requires no counterparty at all beyond the protocol itself, directly analogous to running your own Bitcoin [full node](../bitcoin/full-nodes.md) rather than relying on someone else's infrastructure. The cost is the full 32 ETH capital requirement, the technical and operational burden of running reliable node infrastructure, and the [slashing](./slashing.md) risk that falls entirely on the solo staker's own mistakes.

## Pooled staking

Because 32 ETH is a substantial sum for many individual participants, **staking pools** let many people contribute smaller amounts, which the pool combines to fund full validators, distributing rewards back to contributors proportional to their share. This directly parallels the mining-pool variance-reduction logic from [Mining Pools](../bitcoin/mining-pools.md#why-pools-exist-variance-reduction), applied to staking instead of mining, but introduces a real, distinct trust question: contributors are relying on the pool operator's honest key management and operational competence, a different and generally more centralized trust model than solo staking provides.

## Liquid staking

**Liquid staking** protocols (Lido and Rocket Pool are among the most widely used, though this book does not endorse any specific provider) take pooled staking a step further: in exchange for depositing ETH, a contributor receives a **liquid staking token** (a tradeable, transferable token representing their staked position and its accruing rewards) which can then be used elsewhere in [DeFi](../defi/README.md) (as collateral for a loan, or deposited into a liquidity pool, for instance) while the underlying ETH remains locked and staked. This solves a genuine capital-efficiency problem (staked ETH would otherwise be completely illiquid and unusable elsewhere for the duration of staking) at the cost of adding another layer of smart-contract risk (see [Smart Contract Auditing](../security/auditing.md)) and further concentrating validator operation among whichever entities the liquid staking protocol actually delegates validator duties to.

## Centralization concerns across all pooled models

Both pooled and liquid staking raise a real, actively discussed concern within the Ethereum community: if a small number of staking providers come to control a large share of total staked ETH, that concentration represents a meaningful, structural centralization risk to the network's validator set, echoing the exact mining-pool centralization concern from [Mining Pools](../bitcoin/mining-pools.md#the-centralization-concern), applied to Ethereum's validator set instead of Bitcoin's hash power. This is monitored, discussed, and remains an open, actively addressed area of concern within Ethereum's research and development community, not a settled or dismissed issue.

## Common misconceptions

**Staked ETH is not automatically, instantly liquid**, solo and ordinary pooled staking both involve a real withdrawal process (see [Validators](./validators.md#exiting)) with potential delays; only liquid staking's *derivative token* is freely tradeable, which is precisely the specific problem that model is designed to solve, not a property of staking generally.

**Staking rewards are not a fixed, guaranteed interest rate**. The actual reward rate depends on the total amount of ETH staked network-wide (more total stake generally means each individual validator's share of rewards is diluted, following a protocol-defined issuance curve) and on a validator's own actual uptime and correctness, not a fixed percentage promised by the protocol.

## Further reading

- [ethereum.org: Staking](https://ethereum.org/en/staking/)

---

[← Previous: Validators](./validators.md)
·
[Back to Ethereum](./README.md)
·
[Next: Slashing →](./slashing.md)
