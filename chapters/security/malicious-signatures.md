# Malicious Signatures

A digital signature proves that a key authorized a specific byte sequence. It does not prove that the signer understood those bytes, saw an accurate explanation, or intended the downstream action a contract will permit.

## Messages can carry authority

Wallet users often treat a message signature as safer than a transaction because it costs no gas and does not immediately change chain state. That distinction is incomplete. Protocols use signatures as portable authorization for token permits, marketplace orders, governance actions, account logins, relayed transactions, and smart-account operations. Another party can submit the signed payload later and pay the gas.

The risk comes from semantics. A plain-text login statement tied to one domain and nonce grants little reusable authority. A permit may authorize a spender to move tokens. An order may offer an NFT for a stated price. A smart-account signature may validate an arbitrary call bundle. All are “messages” at the wallet layer.

## Domain separation and replay

EIP-712 structures signed data and includes a domain separator. A sound domain identifies the application context with fields such as name, version, chain ID, and verifying contract. The signed type describes named fields instead of an opaque byte string. This lets a wallet display useful meaning and limits where a signature should be valid.

The contract must still enforce replay protection. Common designs include a nonce consumed after use, a deadline, an order identifier, or a bitmap of used authorizations. If the signed data omits the chain, contract, nonce, or intended action, the same signature may work in another context. If cancellation changes only an off-chain database, a previously copied signature may remain executable on-chain.

EIP-191 prefixes signed data so an arbitrary signed message is not interpreted as a raw Ethereum transaction. It does not supply application-specific meaning or replay protection by itself.

## Blind signing

Blind signing occurs when the device cannot display the operation in terms the user can verify. It may show a hash, raw hexadecimal data, or a generic warning. The device can still protect the private key from extraction, but the authorization decision moves back to the compromised or confusing host interface.

Clear signing requires cooperation across the stack: the protocol defines structured data, the application requests the correct domain and fields, the wallet decodes them, and the signer checks the result. A failure at any layer can turn a cryptographically correct signature into unintended authority.

## Safer authorization design

Make signed authority narrow and short-lived. Bind it to the chain, verifying contract, operation, asset, amount, recipient or spender, nonce, and deadline wherever those fields belong. Display the same values in the interface and wallet. Consume nonces atomically and provide an on-chain cancellation path for outstanding orders when the protocol needs one.

Users should reject signatures they cannot explain in plain terms. Developers should test cross-chain replay, cross-contract replay, expired signatures, reused nonces, altered recipients, altered amounts, and signatures produced for an earlier contract version.

## Further reading

- [EIP-712: Typed structured data hashing and signing](https://eips.ethereum.org/EIPS/eip-712)
- [EIP-191: Signed data standard](https://eips.ethereum.org/EIPS/eip-191)
- [EIP-2612: Permit extension for ERC-20 signed approvals](https://eips.ethereum.org/EIPS/eip-2612)
- See also: [Typed Data and EIP-712](../web3/eip-712.md), [Digital Signatures](../cryptography/digital-signatures.md)

---

[← Previous: Phishing](./phishing.md)
·
[Back to Security](./README.md)
·
[Next: Approval Attacks →](./approval-attacks.md)
