# ERC-20

ERC-20 is the standard interface nearly every fungible token on Ethereum implements, not a piece of deployed code, but a specification: a fixed set of functions and events any conforming contract must provide, so that wallets, exchanges, and other contracts can interact with any ERC-20 token identically, without needing token-specific integration code. This chapter covers the standard's actual interface, compiled and verified, not just described.

## The interface

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Verified: this interface compiles cleanly with solc 0.8.26. Six functions and two events, the entire standard, deliberately minimal (see [EIP-20](https://eips.ethereum.org/EIPS/eip-20) for the formal specification this interface implements exactly).

## A minimal, working implementation

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SimpleToken {
    string public name = "Simple Token";
    string public symbol = "SIM";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(uint256 initialSupply) {
        totalSupply = initialSupply;
        balanceOf[msg.sender] = initialSupply;
        emit Transfer(address(0), msg.sender, initialSupply);
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        require(balanceOf[msg.sender] >= amount, "insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        require(balanceOf[from] >= amount, "insufficient balance");
        require(allowance[from][msg.sender] >= amount, "insufficient allowance");
        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
        return true;
    }
}
```

Verified: this compiles cleanly and correctly implements the interface above (its `balanceOf` and `allowance` mappings, marked `public`, automatically satisfy the interface's `balanceOf(address)` and `allowance(address,address)` view functions, per the automatic getter mechanism from [State Variables](../contracts/state.md#declaration-and-visibility)).

## Why `decimals` exists, and what it actually changes

`decimals` (conventionally 18, matching ether's own wei-to-ETH ratio, though nothing in the standard requires this specific value) does **not** change how the contract stores or computes balances. Every balance and transfer amount is an ordinary integer, in the token's smallest unit, exactly as satoshis are Bitcoin's smallest unit (see [The UTXO Model](../bitcoin/utxo.md)). `decimals` is purely a **display convention**: wallets and interfaces divide raw balances by `10^decimals` to show a human-readable amount, meaning "1.5 tokens" displayed to a user with `decimals = 18` actually corresponds to the raw integer `1500000000000000000` stored and transferred on-chain.

## totalSupply is not automatically enforced to be accurate

Nothing in the ERC-20 standard or the EVM itself verifies that a `totalSupply` value genuinely equals the sum of every address's `balanceOf`, a conforming contract's own logic (correctly incrementing `totalSupply` on mint, decrementing on burn, and never allowing a `transfer` to create or destroy balance out of thin air) is entirely what keeps this invariant true. A buggy or malicious token contract could, in principle, report a `totalSupply` inconsistent with actual balances; well-audited tokens maintain the invariant through careful, tested implementation, not through any protocol-level guarantee.

## Common misconceptions

**ERC-20 is an interface standard, not a specific deployed contract**. "An ERC-20 token" means any contract implementing this interface correctly, and thousands of independently written, differently detailed implementations exist, all interoperable with the same wallets and exchanges specifically because they share this common interface.

**A `transfer` returning `true` is a real, checkable guarantee, not a formality**. Some early or non-standard-compliant tokens have been documented not returning a value at all (a standard violation), which is exactly the kind of edge case that has caused real, documented integration bugs in contracts that assumed strict standard compliance without checking.

## Further reading

- [EIP-20: Token Standard](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin: ERC-20](https://docs.openzeppelin.com/contracts/api/token/erc20)

---

[← Previous: Deployment](../contracts/deployment.md)
·
[Back to Tokens](./README.md)
·
[Next: Balances →](./balances.md)
