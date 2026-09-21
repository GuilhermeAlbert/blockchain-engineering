# Upgradeable Contracts

[Proxy Contracts](./proxies.md) covered the DELEGATECALL mechanism that makes upgradeability technically possible. This chapter covers the specific patterns built on top of that mechanism, and the tradeoffs of upgradeability itself — a genuine design choice with real costs, not an unambiguous improvement over immutable deployment.

## Why immutability was the original default, and why that's a real cost

Once deployed, ordinary contract bytecode cannot be changed — this was, for much of Ethereum's early history, treated as a core, valued property: users interacting with a contract could trust that its logic would never change underneath them, a guarantee proxies deliberately trade away. This tradeoff is real and worth stating plainly: an immutable contract's users have certainty about the code they're interacting with forever; an upgradeable contract's users have to trust whoever controls the upgrade mechanism (see [Access Control](../security/access-control.md)) not to introduce malicious or simply buggy logic in a future upgrade — a trust assumption immutable contracts don't require at all.

## Why upgradeability became common anyway

Real-world software has bugs, and a serious bug discovered in an immutable contract holding real value has no remedy beyond deploying an entirely new contract and asking users to migrate — a slow, costly, and sometimes practically impossible process for a contract with significant, hard-to-coordinate adoption. Upgradeability trades away immutability's certainty specifically to make bug fixes (and, more contestably, feature additions) possible without requiring every user and integrated system to migrate to a new address — a real, practical benefit that has made upgradeable patterns common for exactly the kind of large, high-value, actively developed protocols covered in [DeFi](../defi/README.md).

## The three most common patterns

- **Transparent Proxy** — the pattern this section's [Proxy Contracts](./proxies.md) chapter demonstrated, with an added rule to prevent a specific ambiguity: if the caller is the proxy's designated admin, calls are routed to the proxy's own admin functions (like "change the implementation"); if the caller is anyone else, calls are forwarded to the implementation — preventing a scenario where an admin's own call accidentally triggers implementation logic with the same function selector as an admin function.
- **UUPS (Universal Upgradeable Proxy Standard)** — moves the upgrade logic *into the implementation contract itself* rather than the proxy, making the proxy simpler and cheaper to deploy (a real, meaningful gas saving when deploying many proxies pointing to the same implementation), at the cost of requiring every implementation version to correctly include the upgrade logic itself — forgetting to include it in a new implementation would permanently lock the proxy out of any future upgrades.
- **Diamond Pattern (EIP-2535)** — splits a contract's logic across multiple implementation contracts ("facets"), routed by function selector rather than a single monolithic implementation — designed specifically to work around Ethereum's contract size limit (see [EIP-7954](../evm/opcodes.md#common-misconceptions) for the current, more recent size limits) for systems whose combined logic would otherwise exceed what a single contract can hold, at the cost of meaningfully more complexity in both the routing logic and in reasoning about the system's full behavior across many separate facet contracts.

## The specific risk this book flags explicitly

Beyond the storage-collision risk already covered in [Proxy Contracts](./proxies.md#the-storage-collision-risk), upgradeability concentrates real power in whoever controls the upgrade mechanism — a compromised or malicious admin key can redirect a proxy to arbitrary, hostile logic, potentially draining every user's funds in a single transaction. This is precisely why serious, security-conscious upgradeable deployments typically place upgrade authority behind a **timelock** (a mandatory delay between proposing and executing an upgrade, giving users time to notice and exit if they disagree) and/or a **multisig or DAO vote** (see [DAOs](../governance/daos.md)) rather than a single, individually-held private key — a real, documented mitigation for a real, documented risk category, covered further in [Upgrade Risks](../security/upgrade-risks.md).

## Common misconceptions

**"Upgradeable" is not a single, uniform risk level** — a contract upgradeable only by a 30-day-timelocked DAO vote and a contract upgradeable instantly by one individual's private key are both technically "upgradeable" in the same sense, but represent dramatically different real-world risk profiles; evaluating an upgradeable contract's actual safety requires checking *who* controls the upgrade and *under what constraints*, not just whether upgradeability exists at all.

**Choosing immutability is not automatically the "safer" choice in every case** — it removes upgrade-related trust risk but permanently forecloses any remedy for a bug discovered after deployment; which tradeoff is more appropriate depends on the specific contract's purpose, expected lifespan, and the maturity of its logic at deployment time.

## Further reading

- [OpenZeppelin: Proxy Upgrade Pattern](https://docs.openzeppelin.com/upgrades-plugins/proxies)
- [EIP-1822: Universal Upgradeable Proxy Standard (UUPS)](https://eips.ethereum.org/EIPS/eip-1822)
- [EIP-2535: Diamonds, Multi-Facet Proxy](https://eips.ethereum.org/EIPS/eip-2535)

---

[← Previous: Proxy Contracts](./proxies.md)
·
[Back to Smart Contracts](./README.md)
·
[Next: Testing →](./testing.md)
