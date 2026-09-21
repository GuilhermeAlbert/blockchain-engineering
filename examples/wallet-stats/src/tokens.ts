/**
 * A small, fixed list of well-known mainnet ERC-20 tokens to check
 * balances for. Addresses here have been independently verified (see
 * chapters/tokens/weth.md and chapters/tokens/balances.md) by querying
 * their name()/symbol() functions live and confirming the result — not
 * copied from an unverified source.
 */
export interface KnownToken {
  symbol: string;
  address: `0x${string}`;
  decimals: number;
}

export const KNOWN_TOKENS: KnownToken[] = [
  { symbol: "WETH", address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", decimals: 18 },
  { symbol: "USDC", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", decimals: 6 },
];
