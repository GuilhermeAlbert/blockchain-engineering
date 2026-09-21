# The Merge

On **September 15, 2022**, Ethereum switched its consensus mechanism from proof-of-work to proof-of-stake, not through a contentious hard fork or a chain split, but through a carefully engineered transition years in the making, with no interruption to the network's operation or its accumulated history. This chapter covers how that transition actually worked and why it took roughly two years of preparation to execute safely.

## The two-chain strategy

Rather than attempting to redesign Ethereum's live, value-bearing execution chain to support proof-of-stake directly, Ethereum's developers built and tested the new consensus mechanism as an entirely **separate chain** first: the **Beacon Chain**, launched December 1, 2020, running Ethereum's new proof-of-stake protocol independently, with its own validators and its own ETH (staked, not the same ETH actively circulating on the original chain, and initially non-transferable), for nearly two years before it took over consensus duties for the real network. This let the proof-of-stake mechanism (a genuinely new, complex piece of distributed systems engineering) be tested, attacked, and hardened under real, adversarial conditions without risking Ethereum's actual, value-bearing execution chain during that development and testing period.

## What actually happened at the Merge

The Merge itself was the moment the Beacon Chain took over responsibility for producing and finalizing blocks on Ethereum's **existing** execution chain (the chain with all of Ethereum's real history, contracts, and account balances) rather than launching a new chain from scratch. Practically, this meant: the original proof-of-work execution chain kept running exactly as before, block by block, right up until a specific point (defined by the Beacon Chain reaching a specific, predetermined **total terminal difficulty** value. A proof-of-work-native metric chosen as the trigger specifically because it was tied to real, ongoing mining progress rather than a predictable block height or timestamp an attacker might have tried to target). At that trigger point, proof-of-work mining simply stopped producing new blocks, and the Beacon Chain's validators took over block production from that exact point forward, preserving every single block of Ethereum's prior history unchanged, with the execution chain and its entire accumulated state (see [Ethereum State](./state.md)) continuing seamlessly under the new consensus mechanism.

```text
Before:  [PoW block] → [PoW block] → [PoW block] → ... → [PoW block, TTD reached]
                                                                    │
                                                                    ▼
After:                                                    [PoS block] → [PoS block] → ...
                                                            (produced by Beacon Chain
                                                             validators from this point on)

Same chain, same history, same state — only the block production
mechanism changed, at one precise, predetermined point.
```

## Why "The Merge" is the accurate name

The name reflects exactly what happened: two previously separate systems (the original proof-of-work execution chain and the independently-running Beacon Chain) merged into one, with the Beacon Chain's consensus layer taking over the execution chain's block production going forward, rather than either chain being discarded or restarted.

## The immediate, measurable effect

The most immediately measurable consequence was energy consumption: because proof-of-stake requires no competitive computational mining (see [Proof of Stake](./proof-of-stake.md) for the mechanism that replaces it), Ethereum's energy consumption dropped by a figure widely cited, including by the Ethereum Foundation itself, as approximately **99.95%**, a documented, dramatic reduction directly attributable to eliminating proof-of-work mining specifically, not a broader claim about Ethereum's total resource footprint from every source.

## Common misconceptions

**The Merge did not change Ethereum's transaction history, account balances, or existing smart contracts in any way**, every block, transaction, and piece of state from before the Merge remained exactly as it was; only the mechanism producing *new* blocks going forward changed.

**The Merge is not the same event as "Ethereum 2.0,"** a term that was used informally and sometimes confusingly in earlier community discussion to describe the broader, multi-year proof-of-stake transition effort, the Ethereum Foundation and core developers have since moved away from the "Eth2" terminology specifically because it created a misleading impression of two separate networks or tokens, when in fact it was always a staged upgrade to the single, same Ethereum network and the same ETH.

## Further reading

- [ethereum.org: The Merge](https://ethereum.org/en/roadmap/merge/)
- [Ethereum Foundation blog: The Merge](https://blog.ethereum.org/2022/09/15/merge-mainnet)

---

[← Previous: Consensus Clients](./consensus-clients.md)
·
[Back to Ethereum](./README.md)
·
[Next: Proof of Stake →](./proof-of-stake.md)
