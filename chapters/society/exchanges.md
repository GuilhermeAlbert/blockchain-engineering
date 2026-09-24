# Exchanges

An exchange matches buyers and sellers or quotes trades from its own inventory. Centralized exchanges combine trading, custody, account ledgers, deposits, withdrawals, compliance, and sometimes lending. Decentralized exchanges execute contract rules from user-signed transactions.

## Centralized order books

Orders live in an exchange database. The matching engine decides priority under published rules and updates internal balances. On-chain settlement occurs when users deposit or withdraw, not for every trade. Users therefore trust the venue's matching, market surveillance, custody, and solvency.

An exchange can halt a market, reject a withdrawal, change listing support, or reverse an internal credit under its terms and applicable law. These powers differ from blockchain finality because the customer's claim exists inside the venue until withdrawal confirms.

## Deposits and withdrawals

Credit policies choose required confirmations and handle reorg risk. Address and network mistakes can make recovery impossible or discretionary. Token contracts with fees, rebasing, pausing, or upgrade controls require asset-specific handling.

Withdrawal batching reduces fees and obscures one-to-one mapping between user requests and transactions. A transaction hash proves the exchange sent an on-chain output, not which internal account authorized it unless the exchange supplies that linkage.

## Market and solvency risk

Order-book depth can disappear during stress. Internal market makers or affiliates create conflicts if the venue does not separate roles. Lending customer assets adds counterparty exposure. A platform can appear liquid during normal net flows while lacking assets for simultaneous withdrawals.

Reserve evidence, liability assurance, governance, and withdrawal history provide different information. None substitutes for understanding the legal entity and customer claim.

## Decentralized exchanges

A DEX contract can remove custody between trades while retaining oracle, upgrade, frontend, token, and bridge risks. Users pay network fees and face public ordering and MEV. Calling a venue decentralized should identify which controls are actually on-chain and who can change them.

## Further reading

- [Decentralized Exchanges](../defi/dex.md)
- [Custody](./custody.md)
- [Proof of Reserves](https://niccarter.info/proof-of-reserves/)

---

[← Previous: Custody](./custody.md)
·
[Back to Regulation and Society](./README.md)
·
[Next: KYC and AML →](./kyc-aml.md)
