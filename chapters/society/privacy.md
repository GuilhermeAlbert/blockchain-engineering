# Privacy

Public blockchains expose transaction graphs. Addresses are pseudonyms, not anonymity. Once an address is linked to a person or organization, past and future activity around it may become easier to interpret.

## Linkage on the ledger

Bitcoin heuristics cluster inputs likely controlled by one spender and track change outputs. Ethereum accounts expose balances, contract calls, token approvals, and application interactions under one address. Heuristics are probabilistic and can be wrong, especially around shared custody, collaborative transactions, bridges, and contracts.

Amounts and timing add context. A withdrawal from an identified exchange followed by a matching transfer can support a linkage even without an explicit label. Reusing addresses makes this easier.

## Network and application data

Peers, RPC providers, wallets, explorers, frontends, analytics scripts, and mobile platforms observe metadata outside the chain. An RPC provider can associate queried addresses with an IP address or API key. A wallet can reveal its address set while checking balances. Browser trackers connect on-chain activity to ordinary web identity.

Privacy therefore needs layers. Changing addresses does not hide network metadata. Routing through a privacy network does not remove transaction-graph linkage. A private transfer protocol does not protect an exchange account that records deposit and withdrawal ownership.

## Privacy techniques

Coin control avoids merging unrelated Bitcoin UTXOs. Collaborative transaction designs can weaken common-input heuristics. Stealth addressing, zero-knowledge systems, confidential amounts, and privacy-focused networks protect different fields. Each introduces wallet, liquidity, fee, auditability, or regulatory tradeoffs.

The anonymity set matters. Unusual amounts, immediate timing, or a small user pool can make a technically private transaction distinguishable. Defaults often matter more than optional features because privacy weakens when few users share the same pattern.

## Privacy and safety

Public balances can make individuals targets for phishing, coercion, or theft. Organizations may expose payroll, suppliers, treasury strategy, and customer activity. Privacy is an operational security property as well as a political preference.

## Further reading

- [Bitcoin whitepaper, Section 10](https://bitcoin.org/bitcoin.pdf)
- [Ethereum privacy](https://ethereum.org/privacy/)
- See also: [Addresses](../wallets/addresses.md), [Zero-Knowledge Proofs](../cryptography/zero-knowledge.md)

---

[← Previous: KYC and AML](./kyc-aml.md)
·
[Back to Regulation and Society](./README.md)
·
[Next: Financial Surveillance →](./financial-surveillance.md)
