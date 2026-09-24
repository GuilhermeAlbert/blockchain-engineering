export function quoteExactInput(
  amountIn: bigint,
  reserveIn: bigint,
  reserveOut: bigint,
  feeBps: bigint,
): bigint {
  if (amountIn <= 0n) throw new Error("Input must be positive");
  if (reserveIn <= 0n || reserveOut <= 0n) throw new Error("Pool has insufficient liquidity");
  if (feeBps < 0n || feeBps >= 10_000n) throw new Error("Invalid fee");
  const amountInWithFee = amountIn * (10_000n - feeBps);
  return amountInWithFee * reserveOut / (reserveIn * 10_000n + amountInWithFee);
}

export function applySwap(amountIn: bigint, amountOut: bigint, reserveIn: bigint, reserveOut: bigint) {
  if (amountOut <= 0n || amountOut >= reserveOut) throw new Error("Output exceeds liquidity");
  return { reserveIn: reserveIn + amountIn, reserveOut: reserveOut - amountOut };
}

export function minimumOutput(quotedOutput: bigint, slippageBps: bigint): bigint {
  if (slippageBps < 0n || slippageBps >= 10_000n) throw new Error("Invalid slippage");
  return quotedOutput * (10_000n - slippageBps) / 10_000n;
}
