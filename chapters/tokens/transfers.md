# Transfers

`transfer` and `transferFrom` are ERC-20's two distinct ways of moving tokens — this chapter covers exactly why two functions exist rather than one, since the distinction is the entire basis for how token approvals (covered next, in [Allowances and Approvals](./approvals.md)) work at all.

## transfer: moving your own tokens

```solidity
function transfer(address to, uint256 amount) external returns (bool) {
    require(balanceOf[msg.sender] >= amount, "insufficient balance");
    balanceOf[msg.sender] -= amount;
    balanceOf[to] += amount;
    emit Transfer(msg.sender, to, amount);
    return true;
}
```

`transfer` always moves tokens **from the caller's own balance** — `msg.sender` is hardcoded as the source, meaning nobody can use `transfer` to move tokens out of an address they don't themselves control (there's no source-address parameter at all to specify otherwise). This is the direct equivalent of an ordinary Bitcoin transaction spending a UTXO you control (see [Bitcoin Transactions](../bitcoin/transactions.md)) — you can only move value you can authorize, by virtue of the call itself coming from your own address.

## transferFrom: moving tokens on someone else's behalf

```solidity
function transferFrom(address from, address to, uint256 amount) external returns (bool) {
    require(balanceOf[from] >= amount, "insufficient balance");
    require(allowance[from][msg.sender] >= amount, "insufficient allowance");
    allowance[from][msg.sender] -= amount;
    balanceOf[from] -= amount;
    balanceOf[to] += amount;
    emit Transfer(from, to, amount);
    return true;
}
```

`transferFrom` lets the **caller** move tokens from a **different** address (`from`), but only up to whatever `allowance[from][msg.sender]` currently permits — a value that address explicitly set via a prior `approve` call (see [Allowances and Approvals](./approvals.md)). This is the mechanism that makes decentralized exchanges, lending protocols, and essentially all of [DeFi](../defi/README.md) possible: a protocol contract can move a user's tokens on their behalf (to execute a swap, deposit collateral, and so on) without ever holding the user's private key — only a specific, user-granted, on-chain permission to move a specific, bounded amount.

## Why both are needed: two genuinely different trust situations

`transfer` requires no prior setup — it's a direct action authorized purely by the call coming from the token holder's own address. `transferFrom` requires the token holder to have separately, explicitly authorized a specific third party (the `spender`) in advance — a distinct trust decision, made once (via `approve`), that then permits potentially many later `transferFrom` calls up to the approved limit, without needing the token holder's direct involvement in each individual transfer. Bitcoin has no equivalent to this second pattern at the protocol level — a Bitcoin UTXO can only ever be spent by a party with the corresponding private key directly signing that specific transaction (see [Bitcoin Script](../bitcoin/script.md)), with no native concept of "pre-authorize someone else to spend up to X on my behalf later."

## Common misconceptions

**`transferFrom` does not require the `from` address's private key or direct participation in the specific `transferFrom` call** — that's precisely the point of the pattern: the `from` address authorized the *category* of future transfers in advance (via `approve`), and the actual `transferFrom` call can be initiated entirely by the approved spender, without the original token holder signing or even being aware of that specific transaction.

**A `transfer` call reverting does not necessarily mean the recipient rejected it** — for a standard-compliant ERC-20 token, `transfer` succeeds or fails based purely on the sender's balance and the transaction's own validity; the recipient has no built-in mechanism to reject an incoming ERC-20 transfer at all (a real, documented difference from ERC-721 and ERC-1155's optional receiver-callback checks, covered in [ERC-721](./erc-721.md) and [ERC-1155](./erc-1155.md)).

## Further reading

- [EIP-20: Token Standard](https://eips.ethereum.org/EIPS/eip-20)

---

[← Previous: Balances](./balances.md)
·
[Back to Tokens](./README.md)
·
[Next: Allowances and Approvals →](./approvals.md)
