# Oracles

A smart contract cannot query an external API, read a webpage, or ask anything outside the blockchain directly. An oracle is the infrastructure that gets real-world data, most often asset prices, onto the chain in a form a contract can trust. This chapter covers why this is a genuinely hard problem, and the two dominant approaches to solving it.

## Why this is a hard problem, not just a plumbing one

Every node executing a smart contract's code must arrive at the identical result, since consensus depends on every node computing the same state transition (see [Consensus](../distributed-systems/consensus.md)). An HTTP request to an external API breaks this immediately: different nodes could receive different responses depending on timing, network conditions, or the API being unavailable to some nodes and not others, making deterministic consensus impossible. This is why the EVM has no opcode for making an external network request; the problem isn't that nobody built one, it's that the entire consensus model requires avoiding this kind of non-determinism.

The actual problem an oracle solves is: get external data on-chain through a mechanism that *is* deterministic once it's there, meaning the data has to arrive via an ordinary transaction, submitted by someone (or something), and included in a block the same way any other transaction is.

## Push oracles: a designated party publishes updates

The dominant model, and the one Chainlink (the most widely integrated oracle network) uses, has a decentralized network of independent node operators each fetch a price from multiple external sources, then submit that price on-chain via ordinary transactions, aggregated (typically a median across the reporting nodes) into a single value a contract can read from a **price feed** contract. Updates happen on a schedule, or whenever the price moves beyond some threshold since the last update, not on every block:

```typescript
// Reading Chainlink's ETH/USD price feed on mainnet.
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({ chain: mainnet, transport: http() });

const chainlinkEthUsdFeed = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419" as const;
const aggregatorAbi = [
  {
    name: "latestRoundData",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      { name: "roundId", type: "uint80" },
      { name: "answer", type: "int256" },
      { name: "startedAt", type: "uint256" },
      { name: "updatedAt", type: "uint256" },
      { name: "answeredInRound", type: "uint80" },
    ],
  },
] as const;

const [, answer, , updatedAt] = await client.readContract({
  address: chainlinkEthUsdFeed,
  abi: aggregatorAbi,
  functionName: "latestRoundData",
});

console.log("ETH/USD:", Number(answer) / 1e8); // Chainlink feeds use 8 decimals
console.log("last updated:", new Date(Number(updatedAt) * 1000));
```

A borrowing protocol's collateral valuation (see [Collateral](./collateral.md)) typically reads directly from a feed like this rather than computing a price itself.

## TWAP oracles: deriving price from an AMM's own trading history

The alternative, used when an asset doesn't have a Chainlink feed or as an additional safeguard, derives a price directly from an AMM pool's own trade history rather than an external network of reporters. A **time-weighted average price (TWAP)** averages a pool's price over some window (commonly 30 minutes) rather than reading its instantaneous spot price, specifically because the instantaneous spot price of an AMM pool (see [Constant Product Formula](./constant-product.md)) can be moved substantially within a single transaction, exactly the mechanism [Oracle Manipulation](../security/oracle-manipulation.md) exploits when a contract naively trusts a spot price instead. Averaging over a longer window makes manipulation far more expensive, since an attacker would need to sustain a distorted price across many blocks, not just one, to meaningfully move the average.

## Common misconceptions

**An oracle is not a single, trusted party by default in a well-designed system.** Chainlink's price feeds aggregate reports from many independent node operators specifically so no single reporter's failure or dishonesty can corrupt the published price; a naive oracle design using a single data source reintroduces exactly the kind of centralized trust dependency DeFi protocols generally try to minimize.

**Reading an AMM pool's current spot price directly is not the same thing as using a TWAP oracle**, even though both derive from the same underlying pool. A contract reading spot price directly is exposed to single-transaction price manipulation in a way a properly windowed TWAP is specifically designed to resist.

## Further reading

- [Chainlink documentation: price feeds](https://docs.chain.link/data-feeds)
- [Uniswap v3: oracle documentation](https://docs.uniswap.org/contracts/v3/concepts/oracle)
- See also: [Collateral](./collateral.md), [Oracle Manipulation](../security/oracle-manipulation.md)

---

[← Previous: Flash Loans](./flash-loans.md)
·
[Back to DeFi](./README.md)
·
[Next: Yield →](./yield.md)
