# Arbitrum

Arbitrum, built by Offchain Labs, is Ethereum's highest-volume optimistic rollup and this section's case study for [Optimistic Rollups](./optimistic-rollups.md) and [Fraud Proofs](./fraud-proofs.md) in actual production. Its history includes an honest, worth-naming gap between the theoretical fraud-proof security model and what was actually deployed for its first several years.

## Launch and the Nitro rewrite

Arbitrum One launched on Ethereum mainnet in beta in May 2021, opening to general use that August. In August 2022, Arbitrum migrated to **Nitro**, a substantial rewrite of its underlying technology stack that compiles Ethereum's own Geth client directly into the WebAssembly environment Arbitrum's fraud-proof system uses to interactively verify disputed execution steps (see [Fraud Proofs](./fraud-proofs.md#interactive-fraud-proofs-narrowing-down-to-one-disputed-step)), meaningfully improving both EVM compatibility and performance over the earlier, custom-built execution environment Arbitrum originally launched with.

## The permissioned-validation gap, and BOLD

For years after launch, Arbitrum's fraud-proof dispute system, while designed the way [Fraud Proofs](./fraud-proofs.md) describes generally, was only actually usable by a permissioned, Offchain-Labs-approved set of validators, not genuinely open to anyone, because the dispute protocol as originally built was vulnerable to denial-of-service attacks if opened to arbitrary participants. This is a real, honest gap worth naming directly: for a meaningful stretch of Arbitrum's history, the fraud-proof security model was closer to theoretical than fully operative in practice, since an unauthorized party couldn't actually submit a challenge even if they detected fraud. **BOLD** (Bounded Liquidity Delay), Offchain Labs' redesigned dispute protocol that resolves this specific denial-of-service vulnerability, went live on Arbitrum One's mainnet, enabling genuinely permissionless validation for the first time since launch.

## Common misconceptions

**Arbitrum's fraud-proof security has not been uniformly "permissionless" throughout its entire history.** Genuinely open, permissionless validation is a comparatively recent addition (via BOLD); anyone evaluating Arbitrum's security model at a specific point in time should check whether that period predates or postdates this specific upgrade, rather than assuming the fully decentralized dispute model described in [Fraud Proofs](./fraud-proofs.md) was always actually operative.

**"Arbitrum" does not refer to one single chain.** Offchain Labs operates multiple Arbitrum chains (Arbitrum One and Arbitrum Nova, with different data-availability tradeoffs), and Arbitrum's underlying technology stack is also used by numerous independently operated "Arbitrum Orbit" chains, similar in spirit to the OP Stack ecosystem covered in [Optimism](./optimism.md).

## Further reading

- [Arbitrum documentation](https://docs.arbitrum.io/)
- [Arbitrum Nitro whitepaper](https://github.com/OffchainLabs/nitro/blob/master/docs/Nitro-whitepaper.pdf)
- See also: [Optimistic Rollups](./optimistic-rollups.md), [Fraud Proofs](./fraud-proofs.md)

---

[← Previous: Cross-Chain Messaging](./cross-chain-messaging.md)
·
[Back to Layer 2](./README.md)
·
[Next: Optimism →](./optimism.md)
