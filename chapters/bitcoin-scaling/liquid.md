# Liquid Network

Liquid is a federated Bitcoin sidechain, operated by Blockstream since its 2018 mainnet launch, designed primarily for faster settlement and confidential transaction amounts, targeted specifically at exchanges, market makers, and other institutional participants who transact with each other frequently and want more privacy and speed than Bitcoin's base layer provides. This chapter covers its specific design as a concrete instance of the general sidechain pattern from the previous chapter.

## The federation

Liquid's peg is controlled by a federation of **functionaries**, a fixed set of known, named institutions (exchanges, Bitcoin businesses, and infrastructure providers) who collectively hold the multisig keys authorizing peg-ins and peg-outs, and who also collectively produce Liquid's blocks (Liquid does not use proof-of-work; blocks are signed by a rotating quorum of functionaries, a much faster process than Bitcoin's own mining). This is a direct, explicit instance of the [federated sidechain](./sidechains.md#the-trust-spectrum) trust model. Liquid's security for locked funds depends on a sufficient number of these known federation members remaining honest and not colluding, a materially different and more centralized trust assumption than Bitcoin's own permissionless proof-of-work security.

## What Liquid offers over Bitcoin's base layer

- **Faster settlement**: roughly one-minute block times (compared to Bitcoin's ~10-minute average), with faster practical finality for federation-signed blocks than Bitcoin's own probabilistic finality model provides.
- **Confidential transactions**: transaction amounts and asset types are cryptographically hidden from public view (using Pedersen commitments, the same general commitment primitive introduced in [Commitments](../cryptography/commitments.md#tradeoffs)) while still allowing the network to verify that inputs and outputs balance correctly, a meaningfully stronger privacy property than Bitcoin's base layer offers by default, where amounts are fully public.
- **Issued assets**: Liquid supports issuing additional, non-bitcoin assets natively on the sidechain (stablecoins and security tokens, among other use cases some institutions have deployed), a feature Bitcoin's own base layer doesn't natively support.

## Who actually uses it, and why

Liquid's primary documented use case is inter-exchange settlement, exchanges and trading firms moving funds between each other faster and with more privacy than on-chain Bitcoin transfers would allow, particularly valuable during periods of high market volatility when fast settlement matters most and Bitcoin's own base-layer fees and confirmation times can be least convenient. This is a narrower, more specialized use case than Bitcoin itself serves, reflecting Liquid's specific design tradeoffs (federation trust, in exchange for speed and privacy) being well-suited to institutional counterparties who already have other reasons to trust the specific, known federation members involved.

## Common misconceptions

**Liquid bitcoin (L-BTC) is not the same asset as base-layer bitcoin in terms of trust guarantees**, even though it's pegged 1:1 and often treated as interchangeable in casual conversation. L-BTC's security depends on the federation's honesty in a way base-layer BTC's does not, a distinction worth keeping in mind specifically when evaluating custody or counterparty risk, not merely a technical footnote.

**Liquid is not a proof-of-work blockchain**, despite being a Bitcoin sidechain, its block production mechanism (federation signing) is entirely different from Bitcoin's own mining process, a structural difference this book flags explicitly rather than letting "sidechain" imply shared consensus mechanics.

## Further reading

- [Liquid Network documentation](https://docs.liquid.net/)
- See also: [Sidechains](./sidechains.md), [Federations](./federations.md)

---

[← Previous: Sidechains](./sidechains.md)
·
[Back to Bitcoin Scaling](./README.md)
·
[Next: Federations →](./federations.md)
