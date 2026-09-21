# Collateralized Stablecoins

A crypto-collateralized stablecoin is backed not by dollars in a bank, but by other crypto assets locked in a smart contract, over-collateralized specifically so that a drop in the collateral's price doesn't immediately break the peg. This chapter covers the mechanism precisely, using DAI/USDS (issued by Sky Protocol, formerly MakerDAO; see [MakerDAO / Sky](./maker.md) for the full case study) as the worked example.

## The core mechanism: over-collateralized debt positions

A user locks collateral (historically primarily ETH, now a broader set of approved assets) into a smart contract called a **vault**, and can then mint stablecoins against it, but only up to some fraction of the collateral's current value, never the full amount. If a user locks $150 of ETH, the protocol might allow minting only $100 of stablecoin against it: a **150% collateralization ratio**. This gap exists specifically to absorb collateral price drops. If ETH's price falls, the vault remains solvent (collateral value still exceeds debt) down to some threshold, giving the system room to react before a vault actually goes underwater.

```text
User locks:     $150 worth of ETH
User mints:     $100 worth of stablecoin (150% collateralization)
                          │
                    ETH price falls
                          │
                          ▼
Collateral now worth $120. Still exceeds the $100 debt, but the
safety margin has shrunk from 50% to 20%. If it falls further, past
a defined liquidation threshold, the position becomes eligible for
liquidation (see Liquidations) before debt could exceed collateral value.
```

## Why over-collateralization, not 1:1

A 1:1-backed crypto stablecoin would become instantly insolvent the moment its collateral's price fell even slightly. There would be more debt (stablecoins owed) than collateral value backing it, immediately breaking the redemption promise. Over-collateralization builds in a deliberate buffer, and the protocol's [liquidation](./liquidations.md) mechanism exists specifically to close out under-margined positions *before* they actually go underwater, using the same general logic as a margin call in traditional finance, but automated and enforced entirely by smart contract code rather than a human back-office process.

## Stability mechanisms: keeping the peg near $1

Over-collateralization alone doesn't guarantee the stablecoin actually trades at $1 on the open market. That requires additional mechanisms creating an arbitrage incentive to correct deviations:

- **The Stability Fee**: effectively an interest rate charged on minted debt, adjustable by protocol governance to influence how attractive minting (and therefore increasing supply) is relative to demand.
- **The Dai Savings Rate / Sky Savings Rate**: a rate paid to holders who lock their stablecoins in a designated savings module, adjustable to influence how attractive *holding* the stablecoin is, pulling supply out of active circulation when the peg needs support.
- **Direct arbitrage**: if the stablecoin trades below $1, anyone can buy it cheaply on the open market and use it to close out (repay) an existing debt position at full $1 face value, profiting from the difference and reducing circulating supply. If it trades above $1, opening a new vault and minting more (sellable above $1) is profitable, increasing supply. Both directions push the market price back toward the $1 peg through ordinary, decentralized profit-seeking rather than any central party actively managing it.

## Common misconceptions

**Over-collateralization does not mean the system holds more dollars than it has issued in stablecoins.** It holds more *value* in other crypto assets, whose price can itself fall; over-collateralization is a buffer against collateral volatility, not a claim about holding actual fiat currency in reserve at all.

**A crypto-collateralized stablecoin's stability is not guaranteed by the protocol's code alone, independent of market conditions.** Extreme, fast-moving collateral price crashes, particularly ones fast enough to outpace the liquidation mechanism's ability to react, a real, documented risk covered in [Liquidations](./liquidations.md) and [Oracle Manipulation](../security/oracle-manipulation.md), can and have caused real stress and, in specific historical incidents, real losses within these systems.

## Further reading

- [Sky Protocol documentation](https://docs.sky.money/)
- See also: [MakerDAO / Sky](./maker.md), [Liquidations](./liquidations.md)

---

[← Previous: Stablecoins](./stablecoins.md)
·
[Back to DeFi](./README.md)
·
[Next: Centralized Stablecoins →](./centralized-stablecoins.md)
