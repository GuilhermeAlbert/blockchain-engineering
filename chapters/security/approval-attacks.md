# Approval Attacks

Token ownership and token spending authority are separate state. An ERC-20 holder can authorize a spender with `approve`, after which the spender calls `transferFrom`. ERC-721 and ERC-1155 expose comparable operator permissions. A malicious or compromised spender can use that standing authority without another signature from the owner.

## What an approval changes

For ERC-20, the allowance maps an owner and spender to an amount. The spender can transfer up to the remaining allowance, subject to the owner's balance. Applications often request the maximum `uint256` value so future interactions do not require another approval transaction. That reduces friction and gas, but leaves authority after the intended swap, deposit, or mint has finished.

NFT standards can authorize one token or set an operator for every token in a collection. A phrase such as “set approval for all” describes a broad change in authority, not a routine connection step.

An approval does not transfer assets by itself. The later transfer may occur in a separate transaction, initiated by the approved contract or any account able to make that contract exercise its authority. This separation explains why a wallet can be drained long after the user visited the site that created the approval.

## Legitimate spender, later compromise

The spender need not be malicious when approval is granted. Its contract may later receive a faulty upgrade, lose an admin key, expose an access-control bug, or call an unsafe integration. An unlimited allowance turns that later contract compromise into a user-wallet risk.

Allowances also survive interface changes. Removing a button from a website, disconnecting a wallet, clearing browser data, or deleting an application does not modify on-chain approval state.

## Approval races and safer patterns

The original ERC-20 `approve` interface permits an ordering problem when changing a nonzero allowance to another nonzero value. A spender who observes the pending change may spend the old allowance before the update, then retain the new allowance afterward. Some interfaces set the allowance to zero first. Increment and decrement functions can express changes more precisely when the token supports them.

Signature-based permits remove a separate approval transaction, but do not remove authority. They move authorization into a signed message. The permit needs a nonce, deadline, correct domain separation, and a spender and amount the user can verify.

Applications can reduce exposure by requesting the amount needed for the current operation, avoiding collection-wide NFT approval when a narrower method works, and making the spender address visible. Users can review and revoke stale approvals through a trusted explorer or approval tool.

## Limits of revocation

Revocation sets future authority to zero or disables an operator. It does not reverse completed transfers. It can also be front-run if an attacker already controls the spender or a usable signed permit. Moving assets to a fresh account may be safer after broad compromise, but contract roles, identities, and pending signed orders need separate review.

Approval dashboards depend on indexed chain data. Verify the chain, token, owner, spender, and transaction before signing the revocation itself.

## Further reading

- [EIP-20: Token Standard](https://eips.ethereum.org/EIPS/eip-20)
- [EIP-721: Non-Fungible Token Standard](https://eips.ethereum.org/EIPS/eip-721)
- [EIP-1155: Multi Token Standard](https://eips.ethereum.org/EIPS/eip-1155)
- [Ethereum.org scam help and approval revocation](https://ethereum.org/community/support/scams/)
- See also: [Allowances and Approvals](../tokens/approvals.md), [EIP-712](../web3/eip-712.md)

---

[← Previous: Malicious Signatures](./malicious-signatures.md)
·
[Back to Security](./README.md)
·
[Next: Reentrancy →](./reentrancy.md)
