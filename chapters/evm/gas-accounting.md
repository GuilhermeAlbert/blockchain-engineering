# Gas Accounting

This closing chapter of the EVM section pulls together the gas mechanics referenced throughout ([Gas](../ethereum/gas.md)'s general purpose, the storage-versus-memory cost asymmetry demonstrated with real numbers in [Storage](./storage.md)) into the actual accounting rules: what's charged before execution even begins, and the specific formula behind memory's quadratic cost.

## Intrinsic gas: charged before any opcode executes

Every transaction pays a fixed **intrinsic gas cost** before the EVM executes a single opcode of the actual call: 21,000 gas as a base cost (referenced already in [Ethereum Transactions](../ethereum/transactions.md#example-constructing-and-inspecting-a-transactions-fields-with-viem)), plus additional gas per byte of calldata (historically 4 gas per zero byte, 16 gas per non-zero byte, following [EIP-2028](https://eips.ethereum.org/EIPS/eip-2028)'s reduction from the original, higher non-zero-byte cost), plus additional fixed costs for contract-creation transactions specifically. This intrinsic cost exists to cover the base overhead of processing any transaction at all (signature verification, basic validity checks) work that happens regardless of what the transaction's own code subsequently does.

## Memory expansion: a specific, non-linear cost

As flagged in [Memory](./memory.md#memory-expansion-costs-gas-and-grows-quadratically), the cost of expanding memory to a new highest-accessed word count `n` follows:

```text
memory_cost(n) = 3n + floor(n² / 512)
```

The linear `3n` term is cheap and dominates for small memory usage; the quadratic `n²/512` term is negligible at small sizes but grows to dominate at large sizes, deliberately making very large memory allocations disproportionately expensive.

```typescript
function memoryCost(words: number): number {
  return 3 * words + Math.floor((words * words) / 512);
}

for (const words of [1, 10, 100, 1000, 10000]) {
  console.log(`${words} words: ${memoryCost(words)} gas`);
}
```

Verified output from running this exact code:

```text
1 words: 3 gas
10 words: 30 gas
100 words: 319 gas
1000 words: 4953 gas
10000 words: 225312 gas
```

Notice the ratio of gas to words: at 10 words it's roughly 3 gas/word (the linear term dominates); by 10,000 words it's over 22 gas/word. A more than sevenfold increase in the *marginal* rate, purely from the quadratic term, exactly the deliberately disproportionate scaling described above.

## Refunds: a shrinking mechanism

Older Ethereum gas accounting offered **refunds** for certain state-reducing operations, most notably, clearing a non-zero storage slot back to zero via `SSTORE`. This created a genuine incentive to clean up unused state, but also created real, documented gaming opportunities (contracts specifically engineered to set and immediately clear large amounts of storage purely to farm refunds, exploiting the refund mechanism's interaction with certain transaction-level gas limits). [EIP-3529](https://eips.ethereum.org/EIPS/eip-3529) (part of the same London upgrade that introduced EIP-1559) substantially reduced these refunds specifically to close that gaming vector, reflecting a broader pattern worth noting: gas accounting rules are not fixed forever at Ethereum's launch, they've been revised multiple times as the community has identified real, exploitable gaps between the rules as originally specified and how sophisticated actors actually behaved under them.

## Why gas accounting keeps changing

Every gas cost mentioned throughout this section (21,000 for base transaction cost, 20,000 for a cold `SSTORE`, 2,100 for a cold `SLOAD`, the specific values in the memory formula) reflects a specific point-in-time calibration, revised through the [EIP process](../governance/eips.md) as real-world usage patterns, hardware costs, and discovered exploitation techniques reveal gaps between the original pricing and the actual resource burden or incentive effects different operations create. This book presents the current, documented values, but treats them as a snapshot of an ongoing, deliberately adjustable system, not a permanently fixed protocol constant the way, say, Bitcoin's 21 million supply cap is treated within its own ecosystem.

## Common misconceptions

**Gas costs are not proportional to real-world computation time in any precise, literal sense**. They're economic approximations calibrated to the resource burden (computation, storage, bandwidth) each operation places on every node, periodically recalibrated when that approximation is found to be significantly off in either direction for a specific opcode.

**A transaction is not charged gas for opcodes it never actually executes**, a contract with many conditional branches only pays for the specific path execution actually takes on a given call, not for every possible path the code could theoretically follow.

## Further reading

- [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf): Appendix G (Fee Schedule)
- [EIP-3529: Reduction in refunds](https://eips.ethereum.org/EIPS/eip-3529)
- [evm.codes](https://www.evm.codes/): current, exact gas costs per opcode

---

[← Previous: Contract Creation](./contract-creation.md)
·
[Back to The EVM](./README.md)
·
[Next: Smart Contracts →](../contracts/README.md)
