# Custody

Custody answers who can authorize a transfer and what claim another person has if that authority is misused, lost, frozen, or becomes insolvent. On-chain key control and legal ownership can align, but they are not the same concept.

## Custodial accounts

A custodian controls private keys and records customer entitlements in an internal ledger. Transfers between customers may never appear on-chain. The customer depends on the custodian's solvency, controls, withdrawal policy, legal structure, and accurate books.

Asset segregation aims to keep client assets distinct from the custodian's own property. Implementation depends on wallets, ledgers, contracts, and applicable insolvency law. An address labeled “customer assets” does not prove that liabilities reconcile or that creditors cannot contest ownership.

## Omnibus and segregated wallets

An omnibus wallet combines assets for many customers while the internal ledger allocates balances. It improves operational efficiency and privacy between customers, but users cannot prove their individual entitlement from the address balance alone. Individually segregated addresses improve attribution while increasing address management and fees. Both models can fail if signing authority or accounting is compromised.

## Proof of reserves and liabilities

An on-chain signature or Merkle proof can show control of selected assets at a point in time. Solvency also requires complete liabilities, ownership of the assets, and absence of undisclosed pledges or borrowed balances. A reserve snapshot is evidence, not a full financial statement.

Independent assurance can examine controls and reconciliation within a defined scope. Read the date, entities, assets, liabilities, and procedures rather than treating the word “audit” as universal coverage.

## Operational controls

Custodians divide keys across hot, warm, and cold systems, set withdrawal limits, screen destinations, and require multiple approvals. These controls reduce some theft paths and can delay legitimate withdrawals. Emergency freezes preserve assets only if governance and recovery remain trustworthy.

Users should understand withdrawal rights, fees, delay, insurance limits, governing law, inheritance, and what happens during insolvency. Developers should model custody state explicitly instead of displaying an internal balance as though it were an on-chain UTXO or account balance.

## Further reading

- [Custodial vs Non-Custodial Wallets](../wallets/custody.md)
- [Private Key Theft](../security/private-key-theft.md)

---

[← Previous: Regulation and Society](./README.md)
·
[Back to Regulation and Society](./README.md)
·
[Next: Exchanges →](./exchanges.md)
