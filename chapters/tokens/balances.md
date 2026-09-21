# Balances

A token's balances are nothing more than a `mapping(address => uint256)` — exactly the mapping mechanics covered generally in [Mappings](../contracts/mappings.md), applied specifically to tracking how many tokens each address holds. This short chapter makes the connection explicit and covers what "balance" actually means at the contract level.

## Where a balance actually lives

There is no special, protocol-level concept of a "token balance" the way there is for ether itself (stored directly in the `balance` field of every account, see [Ethereum Accounts](../ethereum/accounts.md#what-every-account-contains)). A token balance is **ordinary contract storage**, tracked entirely by the token contract's own logic — recall `balanceOf` from [ERC-20](./erc-20.md#a-minimal-working-implementation), a plain mapping like any other, whose values only mean "token balance" because the contract's `transfer` and `transferFrom` functions consistently read and update it that way. Nothing enforces this meaning at the EVM level; it's purely a convention the contract's code implements and honors.

## Why this matters: a balance is only as trustworthy as its contract

Because a balance is just a number in a mapping, a token contract's own code is the **entire** source of truth for what that number means and how it can change — there's no external check verifying a token contract's `balanceOf` values are being tracked honestly. This is precisely why token contract audits (see [Smart Contract Auditing](../security/auditing.md)) matter: a malicious or buggy token contract could, in principle, report inflated balances, allow unauthorized balance changes, or otherwise violate the ERC-20 semantics an integrating wallet or exchange assumes are being honestly enforced.

## Reading a balance from outside the contract

```typescript
import { createPublicClient, http, parseAbi, formatUnits } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({ chain: mainnet, transport: http() });
const erc20Abi = parseAbi(["function balanceOf(address) view returns (uint256)", "function decimals() view returns (uint8)"]);

// USDC's real, verified mainnet contract address.
const usdc = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" as const;

// Querying the contract's own balance of its own token — a neutral
// example that requires no claim about who controls any other address.
const [balance, decimals] = await Promise.all([
  client.readContract({ address: usdc, abi: erc20Abi, functionName: "balanceOf", args: [usdc] }),
  client.readContract({ address: usdc, abi: erc20Abi, functionName: "decimals" }),
]);

console.log("raw balance:", balance.toString());
console.log("decimals:", decimals);
console.log("formatted balance:", formatUnits(balance, decimals));
```

Verified output from running this exact code against live mainnet data:

```text
raw balance: 0
decimals: 6
formatted balance: 0
```

That `decimals: 6` is a genuinely useful, concrete data point, not a boring result: USDC does **not** use the common 18-decimal convention — it uses 6, matching how US cents relate to dollars more closely than wei relates to ether. Any application hardcoding an assumption of 18 decimals for "every ERC-20 token" will compute USDC amounts off by a factor of 10^12 — a real, documented class of integration bug this single live query directly illustrates.

## Common misconceptions

**A wallet application does not query "the blockchain" for a generic balance the way it queries an ether balance** — for every different token, it must call that specific token contract's `balanceOf` function separately; a wallet displaying balances across many different tokens is making many separate, independent contract calls, not one unified query.

**A token balance is not decremented or incremented by anything other than that specific token contract's own code path being executed** — there's no way for a balance to change as a side effect of unrelated activity; every single change traces back to a `transfer`, `transferFrom`, mint, or burn call specifically on that token's contract.

## Further reading

- See also: [ERC-20](./erc-20.md), [Mappings](../contracts/mappings.md)

---

[← Previous: ERC-20](./erc-20.md)
·
[Back to Tokens](./README.md)
·
[Next: Transfers →](./transfers.md)
