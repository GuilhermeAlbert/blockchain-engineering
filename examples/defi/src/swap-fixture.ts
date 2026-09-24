export type RawSwap = {
  address: string;
  transactionHash: string;
  args: { amount0: string; amount1: string };
};

export const swapFixture: RawSwap = {
  address: "0x1111111111111111111111111111111111111111",
  transactionHash: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  args: { amount0: "1000000", amount1: "-498000000000000" },
};

export function decodeSwap(raw: RawSwap) {
  if (!/^0x[0-9a-f]{40}$/i.test(raw.address)) throw new Error("Invalid pool address");
  if (!/^0x[0-9a-f]{64}$/i.test(raw.transactionHash)) throw new Error("Invalid transaction hash");
  return {
    pool: raw.address.toLowerCase(),
    transactionHash: raw.transactionHash.toLowerCase(),
    amount0Delta: BigInt(raw.args.amount0),
    amount1Delta: BigInt(raw.args.amount1),
  };
}
