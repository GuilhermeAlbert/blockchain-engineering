# Token Supply

This closing chapter of the Tokens section pulls together a theme running through every chapter before it: unlike Bitcoin's protocol-enforced 21 million cap (see [21 Million BTC](../bitcoin/21-million.md)), an ERC-20 token's total supply is defined entirely by that specific contract's own code. There is no equivalent, network-wide enforcement mechanism for any individual token.

## Where totalSupply actually comes from

As established in [ERC-20](./erc-20.md#totalsupply-is-not-automatically-enforced-to-be-accurate) and [Minting and Burning](./minting-and-burning.md), a token's `totalSupply` is just a number the contract's own logic maintains. Incremented by mint operations, decremented by burns, and otherwise unchanged by ordinary transfers (which move existing supply between addresses without creating or destroying anything). Whatever that contract's code allows to call `mint`, and under what conditions, is the **entire** determinant of that token's actual issuance policy. There's no protocol-level check comparable to Bitcoin's consensus-enforced subsidy schedule (see [Block Rewards](../bitcoin/block-rewards.md#how-the-subsidy-is-enforced)).

## The spectrum of real-world supply policies

- **Fixed supply, minted once**: the `SimpleToken` pattern from [ERC-20](./erc-20.md): a constructor mints a fixed amount, and no `mint` function exists at all afterward. This is the closest analogue to Bitcoin's hard cap, though enforced entirely by that one specific contract's own immutable code (or, for an upgradeable contract, by whatever governs its upgrade authority, see [Upgradeable Contracts](../contracts/upgrades.md)) rather than by any broader network consensus.
- **Capped, ongoing minting**: a fixed maximum `totalSupply` the contract enforces (reverting any `mint` call that would exceed it), with actual issuance happening gradually over time, under rules the contract itself defines (a fixed per-block rate, a decreasing schedule, or governance-voted amounts).
- **Uncapped, discretionary minting**: no maximum at all, with minting authority held by an owner address, a multisig, or a DAO (see [DAOs](../governance/daos.md)), who can mint new supply at will, subject only to whatever off-chain governance process (or lack of one) actually constrains that authority in practice.
- **Algorithmic or demand-driven supply**: some tokens (particularly certain stablecoin designs, see [Stablecoins](../defi/stablecoins.md)) mint and burn supply automatically in response to specific on-chain conditions (collateral deposits and withdrawals, for instance), rather than through direct, discretionary human or governance decisions at all.

## Why checking supply policy matters before trusting a token

Given how directly this maps onto real, documented risk, this book states it plainly: before treating any specific token's stated supply as meaningful, it's worth checking, directly in the contract's actual code (or a trusted audit of it), exactly who can mint, under what constraints, and whether that authority is itself further constrained by a timelock, multisig, or DAO vote rather than a single, unilaterally-controlled key, precisely the same access-control question already raised for upgradeable proxies in [Upgradeable Contracts](../contracts/upgrades.md#the-specific-risk-this-book-flags-explicitly). A token's advertised "fixed supply" is only as trustworthy as the actual code backing that claim, not the claim itself.

## Common misconceptions

**A token's `totalSupply` being large is not, by itself, evidence of anything about its value or legitimacy**, supply figures across different tokens aren't directly comparable in isolation; a token with a `totalSupply` of 1,000 and one with a `totalSupply` of 1 trillion could represent identical total value, differing only in how many units that value is divided into (closely related to the `decimals` display convention covered in [Balances](./balances.md#why-decimals-exists-and-what-it-actually-changes)).

**Circulating supply and total supply are not necessarily the same number** (many tokens distinguish a `totalSupply` (everything ever minted) from a smaller circulating figure (excluding tokens locked in vesting contracts, held in a team treasury, or otherwise not yet freely tradeable)) a distinction not enforced by the ERC-20 standard itself, and one that requires checking a specific project's own disclosures or on-chain vesting contract logic to verify accurately.

## Further reading

- [EIP-20: Token Standard](https://eips.ethereum.org/EIPS/eip-20)
- See also: [21 Million BTC](../bitcoin/21-million.md), [Access Control](../security/access-control.md)

---

[← Previous: Wrapped Ether](./weth.md)
·
[Back to Tokens](./README.md)
·
[Next: RPC Providers →](../web3/rpc-providers.md)
