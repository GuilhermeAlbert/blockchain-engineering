# Wrapped Ether

WETH wraps ether itself, not a different chain's asset, but Ethereum's own native currency, converted into an ordinary ERC-20 token. This chapter covers why that conversion is necessary at all, and the minimal, elegant contract that implements it.

## Why ether needs wrapping on its own chain

This is worth stating precisely, since it's a common point of confusion: **ether is not an ERC-20 token**. It's the network's native currency, tracked directly in every account's `balance` field (see [Ethereum Accounts](../ethereum/accounts.md#what-every-account-contains)), moved via a transaction's `value` field, not via any contract's `transfer` function. Because ether predates and sits outside the ERC-20 standard, any contract or protocol written generically against the ERC-20 interface (a decentralized exchange expecting to call `transferFrom` on whatever token it's trading, for instance) has no way to directly accept or move raw ether through that same interface. WETH closes this gap: a simple contract that holds ether 1:1 and issues an ERC-20-compliant token representing it, letting ether participate anywhere an ERC-20 token is expected.

## The full contract, verified

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract WETH {
    string public name = "Wrapped Ether";
    string public symbol = "WETH";
    uint8 public decimals = 18;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Deposit(address indexed to, uint256 value);
    event Withdrawal(address indexed from, uint256 value);

    receive() external payable {
        deposit();
    }

    function deposit() public payable {
        balanceOf[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external {
        require(balanceOf[msg.sender] >= amount, "insufficient balance");
        balanceOf[msg.sender] -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "ETH transfer failed");
        emit Withdrawal(msg.sender, amount);
    }

    function totalSupply() external view returns (uint256) {
        return address(this).balance;
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

Verified: this compiles cleanly with solc 0.8.26 (structurally, it's the exact `SimpleToken` from [ERC-20](./erc-20.md#a-minimal-working-implementation), with `deposit`/`withdraw` replacing a fixed-supply constructor, and `totalSupply` computed live from `address(this).balance` (this contract's own ether holdings) rather than tracked separately) a neat consequence of the 1:1 backing guarantee: the contract's ether balance and its total issued WETH are always, by construction, identical, so there's no separate value to track.

## Why deposit and withdraw are symmetric and always honor 1:1

`deposit` credits the caller's WETH balance with exactly the ether sent (`msg.value`); `withdraw` burns WETH and sends back exactly that much ether. Because every unit of WETH in existence corresponds to ether actually held by this specific contract (there is no minting mechanism independent of an actual, matching ether deposit), WETH maintains a hard, contract-enforced 1:1 backing, a meaningfully stronger, more directly verifiable guarantee than WBTC's custodian-based peg from [Wrapped Assets](./wrapped-assets.md#wbtc-bitcoin-wrapped-for-ethereum), since anyone can independently verify the backing simply by checking this contract's own ether balance against its total WETH supply, with no custodian's honesty to trust at all.

## Common misconceptions

**WETH is not a separate, independently valuable asset that could trade away from ether's price** (because it's backed 1:1 by a trustless, always-available smart contract (rather than a custodian that could become insolvent or dishonest), one WETH is always redeemable for exactly one ETH, and any market price deviation would be closed immediately by arbitrage (deposit ETH for underpriced WETH, or withdraw ETH from overpriced WETH)) a fundamentally different, stronger guarantee than a custodial wrapped asset provides.

**Using WETH instead of raw ether is not merely a stylistic preference in DeFi protocols**. It's frequently a genuine technical necessity, since many protocols are written generically against the ERC-20 interface and have no separate code path for handling raw ether's different transfer mechanism at all.

## Further reading

- [WETH9 (the canonical, widely deployed implementation)](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)

---

[← Previous: Wrapped Assets](./wrapped-assets.md)
·
[Back to Tokens](./README.md)
·
[Next: Token Supply →](./token-supply.md)
