# Cross-Chain Messaging

Beyond moving assets, a class of general-purpose protocols lets a contract on one chain send an arbitrary message, any data, not just a token, to a contract on a different chain entirely. This chapter covers how these protocols work generally, and where two widely used examples, LayerZero and Wormhole, actually sit on the trust spectrum [Bridges](./bridges.md) already introduced.

## What a general message-passing protocol actually does

A cross-chain messaging protocol lets a contract on chain A emit a message that some verification mechanism confirms actually happened, so a contract on chain B can act on it, updating state, releasing funds, or triggering any other logic the receiving contract implements. This generalizes the specific asset-bridging case: a token bridge is, mechanically, just one particular application built on top of this same message-passing pattern, where the message happens to say "release this amount of this asset to this address."

## LayerZero: a configurable verifier network

LayerZero's current architecture lets each application choose one or more independent **Decentralized Verifier Networks (DVNs)**, professional node operators or security firms that watch the source chain and attest that a given message actually occurred there, before it's accepted on the destination chain. An application can require attestations from multiple independent DVNs before accepting a message, an explicit, configurable m-of-n security model that lets each application choose its own tradeoff between cost, speed, and how many independent parties have to collude or fail for a forged message to get through. This is a meaningfully different design from a single, fixed set of verifiers: the actual trust assumption depends on which DVNs, and how many, a specific application has chosen to require.

## Wormhole: a fixed guardian network

Wormhole uses a different, more traditional design: a fixed set of 19 professional validator operators, called **guardians**, each independently observes source-chain activity and signs off on messages; a message needs signatures from at least 13 of the 19 guardians to produce a valid, acceptable attestation. This is a federated trust model in the sense already covered generally in [Bridges](./bridges.md#the-trust-spectrum-from-trusted-to-trust-minimized): security depends on at least 13 of these 19 specific, named parties behaving honestly and not being compromised, a meaningfully different (and, by most measures, more concentrated) trust assumption than LayerZero's application-configurable DVN model, though Wormhole's fixed, well-known guardian set has its own advantage in being simpler to reason about and audit than a variable, application-chosen verifier set.

## Why these protocols matter beyond simple token bridging

General message passing enables use cases a plain asset bridge can't: a lending protocol on one chain reading collateral state from a different chain, a DAO on one chain executing a governance decision on a contract deployed to a different chain entirely, or an application maintaining synchronized state across several chains without users needing to manually bridge assets between each one. This generality is also exactly why these protocols carry the same, or greater, stakes as an asset bridge: a forged or replayed message can trigger arbitrary contract logic on the receiving chain, not just an incorrect asset release, making the underlying verification mechanism's trust assumptions just as consequential here as for any bridge moving locked value directly.

## Common misconceptions

**A general-purpose messaging protocol is not automatically more or less trustworthy than a purpose-built asset bridge.** Both ultimately depend on some verification mechanism confirming a source-chain event actually happened; the relevant question for any specific protocol is which mechanism it uses and how concentrated or distributed that mechanism's trust actually is, exactly the same question [Bridges](./bridges.md) raises generally.

**Choosing more verifiers, or a larger guardian threshold, does not eliminate cross-chain messaging risk entirely.** It reduces the risk of a forged message getting through by requiring more independent parties to collude or fail simultaneously, but it doesn't eliminate smart contract risk in the messaging protocol's own code, or in the receiving application's handling of an incoming message.

## Further reading

- [LayerZero documentation](https://docs.layerzero.network/)
- [Wormhole documentation](https://docs.wormhole.com/)
- See also: [Bridges](./bridges.md), [Bridge Exploits](../security/bridge-exploits.md)

---

[← Previous: Canonical Bridges](./canonical-bridges.md)
·
[Back to Layer 2](./README.md)
·
[Next: Arbitrum →](./arbitrum.md)
