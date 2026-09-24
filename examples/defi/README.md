# DeFi AMM Math

This project implements exact-input constant-product AMM arithmetic with integer base units. It also decodes a fixed swap fixture with signed pool deltas.

```bash
npm install
npm test
npm run demo
```

The code uses `bigint` throughout. JavaScript floating point never handles token base units. Tests cover fees, rounding, invariant behavior, slippage bounds, invalid liquidity, large values, and fixture decoding.

The formula models a constant-product pool. It does not quote concentrated-liquidity pools, stable-swap curves, routing, gas, or MEV. See [Constant Product Formula](../../chapters/defi/constant-product.md) for the derivation.
