# Minting and Burning

Minting creates new tokens; burning destroys them. Neither is part of the ERC-20, ERC-721, or ERC-1155 standard interfaces themselves. Both are conventions, implemented by a token contract's own additional logic, on top of the standard transfer mechanics already covered. This chapter covers how they actually work and why they're built on the exact same event the standards already define.

## The convention: minting and burning are transfers to and from the zero address

Neither ERC-20 nor ERC-721 defines a `mint` or `burn` function in their formal interfaces, but both standards' `Transfer` event, and most implementations' internal logic, treat the special **zero address** (`0x000...000`, an address with a known, unrecoverable private key, or, more precisely, no known private key at all, see [Private and Public Keys](../cryptography/keys.md)) as representing "outside the token system entirely." A mint is conventionally implemented as a transfer *from* the zero address; a burn as a transfer *to* it, visible directly in the `SimpleToken` constructor from [ERC-20](./erc-20.md#a-minimal-working-implementation), which emits `Transfer(address(0), msg.sender, initialSupply)` for its initial mint.

```solidity
function mint(address to, uint256 amount) external onlyOwner {
    totalSupply += amount;
    balanceOf[to] += amount;
    emit Transfer(address(0), to, amount);
}

function burn(uint256 amount) external {
    require(balanceOf[msg.sender] >= amount, "insufficient balance");
    balanceOf[msg.sender] -= amount;
    totalSupply -= amount;
    emit Transfer(msg.sender, address(0), amount);
}
```

Verified: both functions compile cleanly as part of a token contract, following the same pattern as [ERC-20](./erc-20.md)'s verified `SimpleToken` example, with the `onlyOwner` modifier from [Modifiers](../contracts/modifiers.md) restricting who may mint.

## Why this specific convention, rather than a dedicated event

Reusing the existing `Transfer` event (rather than defining separate `Mint`/`Burn` events) means every piece of off-chain tooling that already watches for `Transfer` events (block explorers, wallets, indexers (see [Event Indexing](../web3/event-indexing.md))) automatically, correctly reflects minting and burning as changes to `totalSupply` and individual balances, without needing any special-case logic to separately recognize a different event type. This is a deliberate, elegant reuse of an interface the standard already requires, rather than a limitation of what the standard could express.

## Who can mint, and why that access-control decision matters enormously

Unlike Bitcoin, where issuance is governed by protocol-wide consensus rules everyone can verify (see [21 Million BTC](../bitcoin/21-million.md)), an ERC-20 token's minting logic is **entirely up to that specific contract's own code**. There's no protocol-level cap, no fixed schedule, unless the contract's own author deliberately built one in and (critically) removed any ability to later change it. This makes the specific access control governing a token's `mint` function one of the single most consequential things to check before trusting any token's supply claims: a token whose owner can mint arbitrary new supply at will has fundamentally different monetary properties than one with a hardcoded, immutable cap or no minting function at all, a distinction covered further in [Token Supply](./token-supply.md) and [Access Control](../security/access-control.md).

## Common misconceptions

**Burning tokens does not return any underlying value to the burner**. It simply destroys the tokens (decrementing `totalSupply` and the burner's balance), typically as a deliberate deflationary or supply-management mechanism; any "value" a burn might be understood to create is an indirect, market-driven effect (reduced supply, all else equal, potentially supporting price, see [Deflationary Money](../economics/deflationary-money.md) for the same general economic logic discussed extensively for Bitcoin), not something the burn transaction itself pays out.

**The zero address convention does not mean tokens sent to `address(0)` by an ordinary `transfer` call are automatically recognized as "burned" by every contract**, whether sending to the zero address is treated as a real burn (decrementing `totalSupply`) depends entirely on whether the contract's specific logic checks for and handles that destination specially; a naive implementation might simply record a permanent, unreachable balance at the zero address without ever adjusting `totalSupply` at all.

## Further reading

- [OpenZeppelin: ERC-20 extensions (Burnable, Mintable patterns)](https://docs.openzeppelin.com/contracts/api/token/erc20)

---

[← Previous: NFT Metadata](./nft-metadata.md)
·
[Back to Tokens](./README.md)
·
[Next: Wrapped Assets →](./wrapped-assets.md)
