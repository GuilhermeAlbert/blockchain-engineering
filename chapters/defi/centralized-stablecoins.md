# Centralized Stablecoins

A centralized stablecoin (USDT (Tether) and USDC (Circle) are, by market capitalization, overwhelmingly the largest examples) is backed by an issuer holding real-world reserves and promising 1:1 redemption. This chapter covers the mechanism plainly and the specific trust question this book has flagged repeatedly for every custodial arrangement it's covered so far.

## The mechanism

An issuer (Circle, for USDC; Tether Limited, for USDT) accepts dollars (or dollar-equivalent instruments) from an authorized participant, mints an equivalent amount of tokens on one or more blockchains, and commits to redeeming those tokens for dollars on request, typically through the issuer's own institutional-facing platform rather than a permissionless smart contract. On-chain, the token itself is an ordinary [ERC-20](../tokens/erc-20.md) (or equivalent standard on other chains), mechanically indistinguishable from any other token; what makes it "stable" is entirely the issuer's off-chain reserve management and redemption commitment, not anything the smart contract itself enforces.

## Where the trust actually sits

This is the exact same trust question already raised for [WBTC](../tokens/wrapped-assets.md#wbtc-bitcoin-wrapped-for-ethereum) and [Custodial vs Non-Custodial Wallets](../wallets/custody.md#what-custody-actually-determines): holding a centralized stablecoin means holding a claim against a specific company, not a cryptographically self-enforcing guarantee. The token's value depends entirely on:

- **Reserve quality**: what the reserves backing the token actually consist of (cash and short-term government securities are considered the highest-quality, most liquid backing; other issuers have historically held or been alleged to hold a broader mix of assets with different risk and liquidity profiles).
- **Reserve attestation and audit**: whether the issuer provides regular, independently verified accounting confirming reserves actually match issued tokens, and how rigorous that verification actually is (a full audit is a meaningfully stronger claim than a periodic attestation, and issuers have varied, and changed over time, in which they provide).
- **Regulatory and operational risk**: the issuer's ability and willingness to honor redemptions, which can be affected by banking relationships, regulatory action, or simple operational failure, independent of whether reserves are technically sufficient on paper.

## Contract-level controls: freezing and blacklisting

Unlike a permissionless token with no privileged roles, most major centralized stablecoin contracts include an **issuer-controlled freeze/blacklist function**, the ability to block a specific address from transferring the token, typically used in response to law enforcement requests or sanctions compliance. This is a real, documented, and actively used capability, not a theoretical one: both USDC and USDT have frozen specific addresses' balances at various points. This is a direct, concrete illustration of the access-control question already raised generally in [Token Supply](../tokens/token-supply.md#why-checking-supply-policy-matters-before-trusting-a-token). Holding a centralized stablecoin means accepting that the issuer retains this specific, powerful capability over the tokens themselves, a meaningfully different property than holding an asset with no privileged control at all.

## Why they remain dominant despite this tradeoff

Centralized stablecoins remain, by a wide margin, the most widely used and highest-volume stablecoins in the broader crypto ecosystem, largely because the trust tradeoff described above is one many users and institutions find acceptable in exchange for genuine dollar-price stability backed by a regulated, identifiable company, the same practical calculus already discussed generally in [Custodial vs Non-Custodial Wallets](../wallets/custody.md#why-custodial-services-exist-and-are-widely-used-anyway).

## Common misconceptions

**A centralized stablecoin's smart contract code being publicly auditable does not mean the *backing reserves* are equally verifiable**. Code verification (see [Deployment](../contracts/deployment.md#contract-verification)) confirms what the contract's logic does; it says nothing about whether the issuer actually holds the dollars it claims to, which requires separate, off-chain financial verification entirely outside what any blockchain explorer can confirm.

**Not every stablecoin with "USD" in its name uses the same reserve model or carries the same risk profile.** USDC, USDT, and other centralized stablecoins have, at various points in their history, differed meaningfully in reserve composition, audit rigor, and regulatory standing; treating them as interchangeable is a real, documented source of miscalibrated risk assessment.

## Further reading

- [Circle: USDC reserve reporting](https://www.circle.com/transparency)
- See also: [Stablecoins](./stablecoins.md), [Custodial vs Non-Custodial Wallets](../wallets/custody.md)

---

[← Previous: Collateralized Stablecoins](./collateralized-stablecoins.md)
·
[Back to DeFi](./README.md)
·
[Next: Decentralized Exchanges →](./dex.md)
