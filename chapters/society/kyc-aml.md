# KYC and AML

Know-your-customer procedures identify customers. Anti-money-laundering controls assess risk, monitor activity, keep records, report specified suspicious activity, and apply sanctions or other legal restrictions. Exact duties depend on jurisdiction, service, customer, and date.

## FATF standards

The Financial Action Task Force sets international standards that member jurisdictions implement through domestic law. Its virtual-asset guidance applies a risk-based approach to virtual asset service providers. FATF's Travel Rule calls for originator and beneficiary information to accompany qualifying transfers between covered institutions.

The standard does not make every self-hosted wallet a regulated institution. A service may need to collect additional information when interacting with one, depending on national implementation and risk policy. Protocol addresses do not carry verified legal identity by default.

## European Union

Regulation (EU) 2023/1114, known as MiCA, establishes requirements for crypto-asset issuers and service providers within its scope, including authorization, governance, disclosure, and client protection. Transfer-of-funds rules address information accompanying certain crypto-asset transfers. Classification and obligations depend on the asset and service; MiCA does not collapse every token into one legal category.

## Brazil

Brazil's Law 14,478/2022 created a framework for virtual-asset service providers, and Decree 11,563/2023 assigned regulatory authority to the Banco Central do Brasil while preserving other agencies' mandates. BCB Resolutions 519, 520, and 521 took effect on 2 February 2026 for authorization, service provision, and specified foreign-exchange and international-capital activity. The CVM retains authority over securities within its jurisdiction.

## Engineering consequences

Identity records and blockchain analytics are sensitive systems. Minimize collection to defined obligations, encrypt data, restrict access, record purpose and retention, and separate compliance decisions from irreversible account deletion. A false positive can freeze legitimate funds; a false negative can expose the service to abuse and legal risk.

Transaction monitoring uses heuristics and external labels, not proof of a person's intent. Preserve review and appeal paths where required. Never present an address-risk score as a consensus fact.

## Further reading

- [FATF guidance for virtual assets and VASPs](https://www.fatf-gafi.org/content/dam/fatf-gafi/guidance/Updated-Guidance-VA-VASP.pdf.coredownload.inline.pdf)
- [EU Regulation 2023/1114](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32023R1114)
- [Banco Central do Brasil virtual-asset regulation FAQ](https://www.bcb.gov.br/meubc/faqs/p/guarda-e-negociacao-de-moedas-virtuais)

---

[← Previous: Exchanges](./exchanges.md)
·
[Back to Regulation and Society](./README.md)
·
[Next: Privacy →](./privacy.md)
