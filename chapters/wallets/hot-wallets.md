# Hot Wallets

A hot wallet keeps its private keys on a device connected to the internet. This chapter covers what that specifically means for security, and where hot wallets fit in the broader tradeoff space this section's remaining chapters (particularly [Cold Storage](./cold-storage.md)) explore from the opposite direction.

## The defining property

"Hot" describes network connectivity, not any particular device type or software, a desktop wallet application, a mobile app, a browser extension, and an exchange's custodial holding system (see [Custodial vs Non-Custodial Wallets](./custody.md)) are all hot wallets if the private keys they use are ever present on an internet-connected system. The connectivity is precisely what makes them convenient (funds can be spent immediately, without any offline signing step) and precisely what makes them a larger attack surface: malware, phishing, and remote exploits (see [Private Key Theft](../security/private-key-theft.md)) generally require some form of network reachability to a device actually holding key material to succeed at scale.

## Why hot wallets exist despite the risk

The convenience tradeoff is real and, for many use cases, worthwhile: an everyday spending wallet, a small operational balance for a business's routine payments, or funds actively being used in a Layer 2 or DeFi context all benefit from a hot wallet's immediate, frictionless signing, the same way most people don't keep their entire net worth in physical cash in a safe simply because bank accounts carry some risk of fraud. The generally accepted practical guidance, echoed across security-conscious parts of the Bitcoin community, is to hold only what you're comfortable losing (or actively need for near-term spending) in a hot wallet, and move larger, longer-term holdings to [cold storage](./cold-storage.md).

## Common misconceptions

**A hot wallet is not inherently "bad" or a sign of poor practice**. It's a specific point in a security-versus-convenience tradeoff, appropriate for specific use cases and inappropriate for others, exactly like carrying cash in your pocket is reasonable for a coffee and unreasonable for a house down payment.

**Software wallet and hot wallet are not perfectly synonymous**, even though most software wallets are hot in practice. A software wallet run on a permanently offline, air-gapped machine (used only to sign transactions passed to it via removable media or QR codes, then broadcast from a separate connected device) is cold, despite being "just software," because the actual key material never touches an internet-connected device.

## Further reading

- See also: [Cold Storage](./cold-storage.md), [Private Key Theft](../security/private-key-theft.md)

---

[← Previous: Derivation Paths](./derivation-paths.md)
·
[Back to Wallets and Key Management](./README.md)
·
[Next: Cold Storage →](./cold-storage.md)
