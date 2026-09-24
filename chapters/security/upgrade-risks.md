# Upgrade Risks

An upgradeable proxy keeps state and address in one contract while delegating execution to replaceable implementation code. This makes repairs possible, but turns upgrade authority and storage compatibility into permanent security boundaries.

## The proxy runs code in proxy storage

With `delegatecall`, implementation code executes in the proxy's context. Reads and writes affect proxy storage, `msg.sender` remains the external caller, and assets remain at the proxy address. Changing the implementation changes the logic that can operate on all existing state and funds.

The new implementation must interpret old storage exactly. Reordering variables, changing incompatible types, or inserting fields in the wrong place can make a balance slot appear to be an address or overwrite a mapping seed. Storage gaps and namespaced layouts support planned extension, but tools still need the old and new layouts to compare.

## Initialization replaces construction

An implementation constructor does not initialize proxy storage. Upgradeable contracts use initializer functions guarded so they run once for the intended version. A missing guard permits reinitialization. A deployment that leaves the proxy uninitialized may let another account become administrator. A later implementation may add state and need a versioned reinitializer without reopening earlier initialization.

Implementation contracts should disable their own initializers when direct initialization would create an exploitable or confusing state.

## Upgrade authority is code authority

Whoever can change the implementation can usually install logic that transfers assets, changes accounting, disables withdrawals, or destroys assumptions other contracts rely on. A multisig, DAO, or timelock changes how that authority is exercised, not its scope.

Transparent and UUPS proxies place upgrade logic differently. In a transparent proxy, the proxy separates admin calls from user delegation. In UUPS, the implementation contains the authorization and upgrade function. A faulty UUPS upgrade can remove or expose the path itself. The chosen pattern must match the tooling and authorization model used in deployment.

## Safer upgrade operations

Treat an upgrade as a migration, not a code replacement. Compare storage layouts, run old-state fixtures against new logic, test initialization exactly once, verify implementation bytecode, simulate governance execution, and check every integration whose assumptions changed. Queue upgrades through a timelock when users need a withdrawal window, while retaining a separately governed emergency process only if the product needs one.

Monitoring should cover upgrade proposals, implementation-slot changes, admin changes, initializer calls, and role changes. Record the source commit and compiler settings for each implementation so deployed bytecode can be reproduced.

## Immutability and escape paths

Removing upgrade authority eliminates one attack surface and one recovery mechanism. Some systems make only peripheral modules replaceable, cap upgrade powers, or let users exit during a delay. The appropriate design depends on how costly a frozen bug is, how credible the administrator is, and whether users can leave before a disputed change executes.

## Further reading

- [OpenZeppelin upgrades documentation](https://docs.openzeppelin.com/upgrades)
- [EIP-1967: Proxy storage slots](https://eips.ethereum.org/EIPS/eip-1967)
- [EIP-1822: Universal Upgradeable Proxy Standard](https://eips.ethereum.org/EIPS/eip-1822)
- See also: [Proxy Contracts](../contracts/proxies.md), [Upgradeable Contracts](../contracts/upgrades.md)

---

[← Previous: Bridge Exploits](./bridge-exploits.md)
·
[Back to Security](./README.md)
·
[Next: Smart Contract Auditing →](./auditing.md)
