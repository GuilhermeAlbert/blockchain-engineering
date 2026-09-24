# Core Developers

Core developers maintain clients, specifications, tests, and supporting tools. Their technical work gives them substantial agenda and implementation influence. It does not give them remote control over software already running on other people's machines.

## Sources of influence

Developers decide which designs they will implement, review, and maintain. Repository maintainers decide what enters a particular codebase. Release teams package changes. Researchers frame alternatives and identify risks. Meeting organizers shape agendas. These choices affect which proposals become credible options.

Influence grows from expertise, review capacity, reputation, employer support, and control of scarce maintenance time. Calling the process permissionless does not make those resources evenly distributed. Anyone may publish code; persuading several mature clients and a risk-sensitive ecosystem to adopt it is harder.

## Limits

A merged pull request affects no node until someone installs the release. Users, businesses, miners, validators, and infrastructure operators can decline an upgrade, delay it, or run another implementation. If a change violates the rules their current software enforces, incompatible groups may form separate networks.

Maintainers can also reject unsafe or unmaintainable code from their repository without preventing an author from forking it. Repository authority and network authority are related through adoption, not identical.

## Accountability in open development

Public specifications, code review, reproducible tests, meeting notes, and multiple implementations make decisions inspectable. They do not guarantee broad participation. Security disclosures may remain private until a coordinated fix ships. Employers and funders can shape priorities even when code is open.

Evaluate governance by the actual path from proposal to running rules. List who wrote the specification, who implemented it, who reviewed it, who funded the work, which releases included it, and which operators adopted those releases.

## Further reading

- [Bitcoin Core contribution guidelines](https://github.com/bitcoin/bitcoin/blob/master/CONTRIBUTING.md)
- [EIP-1](https://eips.ethereum.org/EIPS/eip-1)
- [Ethereum governance](https://ethereum.org/governance/)

---

[← Previous: EIPs](./eips.md)
·
[Back to Governance](./README.md)
·
[Next: Validators and Miners →](./validators-and-miners.md)
