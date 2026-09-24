# Access Control

Access control decides which account or contract may perform a sensitive operation. The code can authenticate the caller perfectly and still be unsafe if the wrong role can mint, upgrade, withdraw, pause, change an oracle, or assign itself more authority.

## Authentication is only the first question

Checking `msg.sender == owner` authenticates one address. It does not answer whether a single owner is appropriate, how ownership transfers, what happens when the owner is lost, or whether the protected function grants more power than its name suggests.

Common models include:

- **single owner:** one address controls every restricted operation;
- **role-based control:** distinct roles authorize minting, pausing, upgrading, or configuration;
- **multisignature control:** several signers must approve an administrative transaction;
- **governance and timelock:** a proposal passes a process, then waits before execution;
- **capability or module control:** a dedicated contract can call a narrow set of target functions.

Each model moves trust. A multisig reduces dependence on one key but adds signer coordination and configuration risk. A timelock gives observers time to react but does not make a malicious action harmless. Governance distributes a decision only to the extent voting power, delegation, and execution are distributed.

## Initialization is an access-control event

Proxy implementations use initializer functions because constructors do not set proxy storage. An initializer that can be called twice may overwrite the administrator. A proxy left uninitialized may let the first caller claim control. The implementation contract may also require initialization or explicit disabling so nobody can use it in an unintended context.

Deployment scripts should assert the administrator, implementation, roles, thresholds, and ownership after deployment. A successful transaction receipt does not prove the resulting authority graph is correct.

## Role administration and privilege growth

In role-based systems, every role has an administrator that can grant or revoke it. The role graph matters as much as protected functions. If a routine operator role administers the upgrade role, its effective power includes upgrades. If the default administrator controls its own membership, compromising one holder may allow permanent privilege expansion.

Use the smallest role that can perform the job. Separate routine operations from emergency response and upgrades. Add delays to high-impact changes where delayed execution does not create a worse failure mode. Two-step ownership transfer prevents an address typo from immediately losing control because the recipient must accept.

## Authorization across calls

`tx.origin` identifies the transaction's original external account and should not authorize contract actions. A malicious intermediary can cause a victim to originate a transaction that reaches the protected contract. Authorization should normally use `msg.sender`, which identifies the immediate caller, and account explicitly for trusted forwarders or account-abstraction entry points.

When an access manager calls a target on behalf of a user, the target may see the manager as `msg.sender`. The original caller must not be reconstructed from arbitrary calldata unless a specified forwarding scheme authenticates it.

## What to test

For every sensitive function, test authorized and unauthorized callers, role grant and revocation, administrator transfer, initialization, repeated initialization, zero-address mistakes, delayed execution, emergency actions, and recovery after a signer disappears. Then test the composed system: a harmless-looking configuration setter may redirect calls to an attacker-controlled contract and become equivalent to withdrawal authority.

## Further reading

- [OpenZeppelin access control](https://docs.openzeppelin.com/contracts/5.x/access-control)
- [OpenZeppelin access-control API](https://docs.openzeppelin.com/contracts/5.x/api/access)
- [Ethereum.org smart contract security](https://ethereum.org/developers/docs/smart-contracts/security/)

---

[← Previous: Reentrancy](./reentrancy.md)
·
[Back to Security](./README.md)
·
[Next: Integer and Precision Bugs →](./precision.md)
