# Public Keys

This chapter is deliberately short: the cryptographic mechanics of public keys are covered fully in [Private and Public Keys](../cryptography/keys.md). Here, the focus is narrower, what role a public key plays specifically inside wallet software, and where exactly it becomes visible on-chain.

## Where a public key actually appears in wallet operation

A wallet computes a public key from each private key it manages (via the elliptic curve multiplication covered in [Private and Public Keys](../cryptography/keys.md#deriving-the-public-key)), and uses it in two specific ways: deriving an [address](./addresses.md) to receive funds at, and, when spending, including the public key itself in the transaction's unlocking data (scriptSig or witness, see [Inputs and Outputs](../bitcoin/inputs-and-outputs.md)) so the network can verify the provided signature against it.

## When a public key becomes visible on-chain

This is worth stating precisely, since it's the entire reason [addresses](./addresses.md) exist rather than sharing public keys directly: for standard script types (P2PKH, P2WPKH, P2TR), the public key is **not** revealed on-chain when you *receive* funds, only the address (a hash of the public key) is. The public key only becomes publicly visible the moment you *spend* from that address, since the unlocking data has to include it for signature verification. Practically, this means an address that has received funds but never sent any is more resistant to any attack that would require knowing the public key (again, speculatively including a future quantum-computing attack) than one that has already been spent from.

## Common misconceptions

**A public key is not an address**, and cannot be pasted into most "send to address" fields as-is, wallets expect the encoded, hashed [address](./addresses.md) format, not the raw public key, even though the address is derived from it.

**Sharing your public key is not risky in the way sharing your private key is**. It's called "public" because it's designed to be shared; the entire security model depends on this asymmetry (see [Public-Key Cryptography](../cryptography/public-key-cryptography.md)). The privacy consideration around public key exposure (discussed above) is about address reuse and linkability, not about the key itself being "sensitive" the way a private key is.

## Further reading

- [Private and Public Keys](../cryptography/keys.md): full cryptographic treatment

---

[← Previous: Private Keys](./private-keys.md)
·
[Back to Wallets and Key Management](./README.md)
·
[Next: Seed Phrases →](./seed-phrases.md)
