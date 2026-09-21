# Signing Messages

A wallet can sign an arbitrary message without sending any transaction at all — no gas, no blockchain interaction, just a cryptographic proof that the holder of a specific private key endorsed a specific piece of data. This chapter covers why that's useful, and the specific format (EIP-191) that makes a plain-message signature distinguishable from a transaction signature.

## Signing and verifying a plain message

```typescript
import { verifyMessage } from "viem";

// Signing (from a connected wallet):
const signature = await walletClient.signMessage({
  account: userAddress,
  message: "Sign in to Example App",
});

// Verifying (can be done by anyone, without any wallet connection at all):
const isValid = await verifyMessage({
  address: userAddress,
  message: "Sign in to Example App",
  signature,
});

console.log("signature valid:", isValid);
```

## Why sign a message at all, if it does nothing on-chain

The most common use case is **authentication without a password**: an application asks a user to sign a specific, often randomly generated message ("Sign in to Example App — nonce: 8f3a2b..."), and treats a valid signature as proof the user controls the claimed address — the same [digital signature](../cryptography/digital-signatures.md) authentication property covered generally in Cryptography, applied here to prove identity rather than to authorize a fund transfer. This is genuinely useful precisely because it costs nothing and requires no blockchain interaction: no gas, no waiting for confirmation, just an instant cryptographic proof.

## EIP-191: why signed messages start with a specific prefix

A raw ECDSA signature (see [ECDSA](../cryptography/ecdsa.md)) can't tell, from the signature alone, what kind of data was actually signed — this creates a real, documented danger: if plain message signing used the identical signing process as transaction signing, a malicious site could trick a user into "signing a message" that a wallet or a different tool might actually be able to reinterpret and rebroadcast as a valid, authorized transaction. [EIP-191](https://eips.ethereum.org/EIPS/eip-191) closes this gap by requiring every plain message signature to be computed over the message **prefixed** with `"\x19Ethereum Signed Message:\n" + message.length`, before hashing and signing — a prefix specifically chosen because it can never collide with the start of a validly RLP-encoded transaction, guaranteeing a message signature can never be misinterpreted as authorizing a real transaction.

## Common misconceptions

**Signing a message is not risk-free just because it costs no gas** — a malicious dapp can still present a *disguised* message for signing whose content, once decoded, actually authorizes something harmful (particularly relevant for the structured, more expressive signatures covered next in [Typed Data and EIP-712](./eip-712.md)) — the "no gas" property means no transaction fee is charged, not that the action being authorized is automatically safe.

**A valid signature over a message does not, by itself, prove anything about the *truthfulness* of the message's content** — it only proves the holder of a specific private key endorsed that exact text; if an application asks a user to sign "I am 18 years or older," a valid signature proves the user's wallet endorsed that statement, not that it's factually true.

## Further reading

- [EIP-191: Signed Data Standard](https://eips.ethereum.org/EIPS/eip-191)

---

[← Previous: Sending Transactions](./sending-transactions.md)
·
[Back to Building Web3 Applications](./README.md)
·
[Next: Typed Data and EIP-712 →](./eip-712.md)
