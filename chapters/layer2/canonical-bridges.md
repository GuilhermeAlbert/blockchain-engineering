# Canonical Bridges

Every major rollup ships its own official bridge connecting it to L1, and that specific bridge, unlike most third-party bridges covered generally in [Bridges](./bridges.md), inherits its security directly from the rollup's own verification mechanism rather than from a separate trusted party. This chapter covers why a rollup's canonical bridge sits in a meaningfully different, stronger trust category than the general bridge landscape.

## Why the canonical bridge doesn't need its own separate trust model

A rollup's state is already being verified through fraud proofs or validity proofs (see [Fraud Proofs](./fraud-proofs.md) and [Validity Proofs](./validity-proofs.md)), specifically to let L1 trust the rollup's claimed state. The canonical bridge simply reuses that exact same verification: a withdrawal is, mechanically, just a claim about the rollup's state (specifically, that a given user's balance decreased on the rollup, entitling them to an equivalent release of funds on L1), verified through the identical mechanism securing every other piece of the rollup's state. This is why a canonical bridge doesn't introduce a new, separate multisig or federation the way most third-party bridges do: it's not a bolt-on trust assumption, it's a direct application of the trust assumption the rollup already has to make for its execution to be trusted at all.

## The practical consequence: canonical bridges inherit the rollup's own delays

Because the canonical bridge is just another consumer of the rollup's own verification mechanism, it also inherits that mechanism's own timing characteristics directly. Withdrawing through an optimistic rollup's canonical bridge means waiting out that rollup's own challenge period (see [Optimistic Rollups](./optimistic-rollups.md#why-withdrawals-take-about-a-week)), commonly around a week; withdrawing through a ZK rollup's canonical bridge can be much faster, gated only by validity-proof generation and verification time, not an extended challenge window. This is a direct, mechanical consequence of the same underlying design choice covered in [ZK Rollups](./zk-rollups.md#why-this-removes-the-withdrawal-delay), not an independent property of the bridge itself.

## Why third-party bridges exist despite the canonical bridge being more trust-minimized

Given that the canonical bridge is generally the most trust-minimized way to move assets between a rollup and L1, a natural question is why third-party bridges (and the fast-bridge services already mentioned in [Optimistic Rollups](./optimistic-rollups.md#why-withdrawals-take-about-a-week)) exist at all. The answer is almost always speed and convenience: a third-party bridge can offer a near-instant withdrawal by fronting the funds itself and collecting from the slower canonical bridge later, or can connect two rollups directly without routing through L1 at all, at the cost of introducing that third party's own separate trust assumptions on top of, or instead of, the rollup's own verification mechanism. Choosing a third-party bridge over the canonical one is a real, explicit tradeoff between speed and trust minimization, not a strictly better or worse option in every case.

## Common misconceptions

**A rollup's canonical bridge is not risk-free simply because it avoids a separate multisig.** It still carries the rollup's own smart contract risk (a bug in the bridge contract itself, independent of the fraud-proof or validity-proof logic) and, for optimistic rollups, depends on the honest-challenger assumption underlying fraud proofs actually holding in practice.

**Using a canonical bridge is not always the objectively correct choice over a third-party bridge.** It's generally the more trust-minimized option, but a third-party bridge's speed can be worth its additional trust assumption for some users and use cases; which tradeoff makes sense depends on the specific amount at stake and how much the wait actually costs the user in practice.

## Further reading

- [Arbitrum documentation: bridging](https://docs.arbitrum.io/for-devs/dev-tools-and-resources/chain-info)
- See also: [Bridges](./bridges.md), [Optimistic Rollups](./optimistic-rollups.md), [ZK Rollups](./zk-rollups.md)

---

[← Previous: Bridges](./bridges.md)
·
[Back to Layer 2](./README.md)
·
[Next: Cross-Chain Messaging →](./cross-chain-messaging.md)
