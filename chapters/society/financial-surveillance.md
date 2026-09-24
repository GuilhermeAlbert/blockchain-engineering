# Financial Surveillance

Financial surveillance combines records to infer who transacts, with whom, for how much, and for what purpose. Public ledgers provide a persistent transaction graph. Exchanges, banks, merchants, devices, and governments supply identity and context.

## On-chain analysis

Analytics systems label addresses, cluster activity, trace flows, and score exposure to known services or incidents. The chain supplies exact transactions; attribution remains an external claim. A cluster can join unrelated users through a custodial wallet or collaborative transaction. A labeled deposit address can change ownership or function over time.

Risk systems often measure distance from a labeled event. Receiving funds several hops from an incident does not prove knowledge or intent. Policies need thresholds, review, documentation, and correction procedures.

## Data fusion

Identity checks at exchanges connect legal identity to deposits and withdrawals. IP logs and device identifiers connect sessions. Merchant records describe purchases. Subpoenas, reporting duties, data brokers, leaks, and commercial partnerships can bring these datasets together.

Blockchain history is difficult to erase. A future label or analytical method can reinterpret years of earlier activity. Data collection decisions therefore create long-lived consequences beyond the immediate compliance check.

## Design choices

Services should collect defined fields for a documented purpose, restrict access, set retention rules, and log queries. Separate transaction monitoring from product analytics. Aggregate where individual records are unnecessary. Protect exports and support correction of off-chain labels.

Transparency reports can disclose request volume and policy without exposing investigations. Technical privacy tools change available data, while law and institutional policy determine who may demand or share the remaining records.

## Further reading

- [FATF virtual-assets guidance](https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Updated-Guidance-VA-VASP.pdf.coredownload.inline.pdf)
- See also: [Privacy](./privacy.md), [KYC and AML](./kyc-aml.md)

---

[← Previous: Privacy](./privacy.md)
·
[Back to Regulation and Society](./README.md)
·
[Next: Censorship Resistance →](./censorship-resistance.md)
