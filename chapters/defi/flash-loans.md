# Flash Loans

A flash loan lets a borrower draw an arbitrary amount of an asset with zero collateral, on the condition that it's repaid, with a fee, within the same transaction it was borrowed in. This chapter covers the atomicity guarantee that makes an uncollateralized loan safe for the lender, and what flash loans are actually used for.

## The mechanism: atomicity as the only collateral

A flash loan works because of a property specific to blockchain transactions: an entire transaction either fully succeeds or fully reverts, with no partial execution (see [Ethereum Transactions](../ethereum/transactions.md)). A flash loan contract lends out funds, then hands control to the borrower's own contract code to do whatever it wants with them, and finally, before the transaction ends, checks whether the loan plus a fee has been returned. If it hasn't, the entire transaction, including the original loan disbursement, reverts as if it never happened. This is the entire security model: there's no need for collateral, credit checks, or trust in the borrower, because it's mathematically impossible for the loan to go unrepaid and still have its effects persist on-chain.

```solidity
// Simplified flash loan pattern, illustrating the structure real
// implementations (Aave, Uniswap v3 flash swaps) share.
contract FlashLoanExample {
    function flashLoan(uint256 amount) external {
        uint256 balanceBefore = token.balanceOf(address(this));
        token.transfer(msg.sender, amount);

        // Control returns to the caller's own contract here, which must
        // implement a callback that uses the funds and repays before
        // returning control back to this function.
        IFlashBorrower(msg.sender).onFlashLoan(amount);

        uint256 balanceAfter = token.balanceOf(address(this));
        uint256 fee = (amount * 5) / 10000; // 0.05%, Aave v3's current rate
        require(balanceAfter >= balanceBefore + fee, "Flash loan not repaid");
    }
}
```

On a $1,000,000 loan at Aave v3's current 0.05% flash loan fee, the required repayment is $1,000,500, a $500 fee for a loan that, from the lender's perspective, was outstanding for a single transaction and never carried any default risk at all.

```typescript
const loanAmount = 1_000_000;
const feeRate = 0.0005; // Aave v3's current flash loan fee
const fee = loanAmount * feeRate;
const totalRepay = loanAmount + fee;
console.log({ fee, totalRepay }); // { fee: 500, totalRepay: 1000500 }
```

## What flash loans are actually used for

The most common legitimate uses all share the same shape: a borrower needs a large, temporary amount of capital to execute a multi-step operation that's only profitable, or only possible, if every step happens atomically.

- **Arbitrage**: borrowing enough capital to exploit a price difference between two venues (see [Slippage](./slippage.md#arbitrage-and-why-prices-across-venues-converge)), buying on the cheap venue and selling on the expensive one within the same transaction, repaying the loan from the proceeds, and keeping the difference, all without needing to own any capital upfront.
- **Collateral swaps**: replacing one collateral asset backing a lending position with a different one, without needing to first repay the existing debt with separate funds, by using a flash loan to briefly cover the debt while the swap happens.
- **Self-liquidation**: a borrower closing out their own at-risk position before an external liquidator does, capturing the liquidation bonus (see [Liquidations](./liquidations.md#who-performs-liquidations-and-why)) for themselves instead of losing it to someone else.

## Why flash loans are also a real attack tool

The same property that makes flash loans safe for lenders, the ability to command a very large, temporary amount of capital with no collateral, also makes them a powerful tool for attacking other protocols. A flash loan can supply enough capital to briefly manipulate a thin market's price (see [Oracle Manipulation](../security/oracle-manipulation.md)) or exploit a pricing assumption in a vulnerable contract, all within one atomic transaction that reverts cleanly if the attack doesn't pan out, meaning an attacker risks essentially only the transaction's gas cost even on a failed attempt. This isn't a flaw in the flash loan mechanism itself; it's a flaw in whatever protocol assumed an attacker couldn't temporarily access enormous, uncollateralized capital, covered in detail in [Flash Loan Attacks](../security/flash-loan-attacks.md).

## Common misconceptions

**A flash loan is not free money for the lender to give away.** The loan must be repaid with a fee within the same transaction or the entire transaction reverts; the lender's principal is never actually at risk, but neither is a flash loan a subsidy or a gift, since an unrepaid attempt simply never happened as far as the blockchain's final state is concerned.

**Flash loans are not inherently malicious.** The large majority of flash loan volume is legitimate arbitrage, collateral management, and liquidation activity; they're a real attack vector specifically against protocols with exploitable pricing or logic assumptions, not a mechanism that's harmful by itself.

## Further reading

- [Aave documentation: flash loans](https://aave.com/docs/aave-v3/guides/flash-loans)
- See also: [Liquidations](./liquidations.md), [Flash Loan Attacks](../security/flash-loan-attacks.md), [Oracle Manipulation](../security/oracle-manipulation.md)

---

[← Previous: Liquidations](./liquidations.md)
·
[Back to DeFi](./README.md)
·
[Next: Oracles →](./oracles.md)
