# Allowances and Approvals

`approve` grants another address permission to move up to a specific amount of your tokens via `transferFrom` — the mechanism [Transfers](./transfers.md#transferfrom-moving-tokens-on-someone-elses-behalf) introduced. This chapter covers the allowance model in full, including a documented race condition in the original standard and why it matters for how you should — and shouldn't — grant approvals in practice.

## The mechanism

```solidity
function approve(address spender, uint256 amount) external returns (bool) {
    allowance[msg.sender][spender] = amount;
    emit Approval(msg.sender, spender, amount);
    return true;
}
```

Calling `approve(spenderAddress, 100)` sets `allowance[msg.sender][spenderAddress]` to exactly 100 — not additive to any prior allowance, but an outright replacement. `spenderAddress` can then call `transferFrom` to move up to 100 of the caller's tokens, in one call or several, until the allowance is exhausted or reset.

## The approve race condition

This is a real, documented quirk of the original ERC-20 standard, not a hypothetical concern: because `approve` **replaces** rather than adjusts the allowance, changing an existing non-zero allowance to a new non-zero value has a narrow window for a specific attack. Suppose Alice has approved Bob for 100 tokens, and wants to change that to 50. If Bob is watching the mempool (see [The Mempool](../bitcoin/mempool.md), applied here to Ethereum's own mempool) and sees Alice's transaction changing the approval to 50, he could quickly submit his own `transferFrom` call spending the *original* 100 allowance, get it mined first, and then — once Alice's transaction changing the allowance to 50 also confirms — spend the *new* 50 as well, extracting 150 total from an intended 50-token approval.

```text
Alice's allowance to Bob: 100

Alice submits: approve(Bob, 50)
                    │
Bob sees this in the mempool and front-runs it:
Bob submits: transferFrom(Alice, Bob, 100)  ← mined FIRST, spends old allowance
Alice's tx:  approve(Bob, 50)                ← mined second, sets NEW allowance
Bob submits: transferFrom(Alice, Bob, 50)   ← spends the new allowance too

Bob extracted 150 tokens from an approval Alice intended to reduce to 50.
```

## The mitigation, and why it's a workaround rather than a fix

The standard-recommended mitigation is to always set an allowance to **zero first**, confirm that transaction, and only then set the new desired value — removing the window where both an old and new non-zero allowance could be separately exploited. Some tokens additionally implement non-standard `increaseAllowance`/`decreaseAllowance` functions specifically to let an allowance be adjusted atomically without ever passing through this race condition at all. Neither is a change to ERC-20 itself, which remains specified exactly as originally written; both are patterns applications and users have adopted specifically because the underlying race condition is real and has, in some form, been discussed as a live risk factor in real integrations.

## Unlimited approvals: convenience versus risk

Many applications request an **unlimited** approval (the maximum possible `uint256` value) rather than an amount matching the specific transaction, specifically to avoid requiring a new approval transaction (with its own gas cost and confirmation wait) for every future interaction. This is a genuine convenience tradeoff with a real, documented downside: an unlimited approval, if the approved contract is later found to have a vulnerability or turns out to be malicious, gives an attacker the ability to drain the full token balance, not just whatever amount a specific transaction actually needed — this exact pattern is covered directly, with real historical incidents, in [Approval Attacks](../security/approval-attacks.md).

## Common misconceptions

**An approval does not transfer any tokens by itself** — `approve` only changes a permission recorded in the `allowance` mapping; no balance moves until and unless the approved spender actually calls `transferFrom`.

**Revoking an approval (setting it back to zero) does not require the original approving transaction to be "undone"** in any special sense — it's simply another ordinary `approve` call, setting the allowance to zero, available to the token holder at any time regardless of whether the spender has used any of the previously approved amount.

## Further reading

- [EIP-20: Token Standard](https://eips.ethereum.org/EIPS/eip-20)
- See also: [Approval Attacks](../security/approval-attacks.md)

---

[← Previous: Transfers](./transfers.md)
·
[Back to Tokens](./README.md)
·
[Next: ERC-721 →](./erc-721.md)
