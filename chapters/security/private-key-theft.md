# Private Key Theft

A private key is signing authority encoded as a number. Anyone who obtains a usable copy can produce the same signatures as the owner. The network cannot tell whether a transaction came from the original device, a backup, malware, or a thief. It verifies the signature and applies the state transition.

## Theft usually happens outside the cryptography

Breaking secp256k1 is not the practical route to a wallet. Attackers target the systems that store, display, or use the key:

- malware reads a key from a file, process memory, clipboard, or browser storage;
- a compromised wallet update exports secrets or changes the transaction being signed;
- an attacker steals an unlocked device or observes a weak device passcode;
- a cloud backup synchronizes an unencrypted wallet file to an account protected by a reused password;
- an administrator, employee, or hosting provider copies a server-side signing key;
- a user enters a key into a fake recovery tool or support form.

Encryption at rest narrows the window but does not eliminate it. Software must decrypt a key before signing. Malware running with sufficient access can wait for that moment, request signatures through the wallet, or replace transaction data before it reaches the signer.

## Hot and cold boundaries

A hot key exists on a network-connected system. It can sign quickly, which also makes remote compromise useful to an attacker. A cold key stays away from network-connected devices. That removes many remote paths, but the transaction still crosses a boundary: an online device prepares data, the offline signer displays or signs it, and the signed transaction returns online.

The signer must let the user verify the destination, amount, network, contract, and method. A hardware wallet that displays only a hash can protect the key while signing a transaction the owner did not understand. Secure storage and clear authorization are separate requirements.

## One key, many consequences

The damage depends on what the key controls. A wallet key may transfer assets and grant approvals. A contract admin key may replace implementation code, pause withdrawals, change an oracle, or assign roles. A bridge validator key may attest to cross-chain messages. A compromised deployer key may not matter after ownership has been renounced, while a compromised upgrade key may expose every asset held behind the proxy.

Inventory authority by effect, not by address label. For each key, record which functions it can call, which contracts trust it, whether actions have a delay, and how it can be replaced. This turns a vague list of wallets into a map of failure domains.

## Containment and recovery

Once a private key is copied, changing a password on the original wallet does not invalidate the copy. Recovery requires moving authority on-chain: transfer assets, revoke roles, rotate signers, replace guardians, or upgrade the account if its design permits rotation. Public mempools create a race because the attacker may see and front-run the recovery transaction.

Systems can reduce the blast radius before an incident:

- separate daily operational keys from treasury and upgrade authority;
- require multiple independent signers for high-impact actions;
- use timelocks so monitoring can detect a queued administrative action;
- apply withdrawal limits or staged approvals where the product permits them;
- keep tested rotation and emergency procedures;
- monitor role changes, upgrades, large approvals, and unusual signing locations.

Multisignature control helps only when signers fail independently. Five keys stored in the same password manager, cloud account, office, or deployment pipeline do not provide five independent barriers.

## Further reading

- [Ethereum.org wallet security guidance](https://ethereum.org/security/)
- [OpenZeppelin access control documentation](https://docs.openzeppelin.com/contracts/5.x/access-control)
- See also: [Cold Storage](../wallets/cold-storage.md), [Hardware Wallets](../wallets/hardware-wallets.md), [Multisig](../wallets/multisig.md)

---

[← Previous: Blockchain Security](./README.md)
·
[Back to Security](./README.md)
·
[Next: Seed Phrase Theft →](./seed-phrase-theft.md)
