import type { ChainBlock } from "./types.js";

export const genesis: ChainBlock = { number: 0, hash: "0x00", parentHash: "0x0", logs: [] };
export const block1: ChainBlock = {
  number: 1, hash: "0x01", parentHash: genesis.hash,
  logs: [{ transactionHash: "0xt1", logIndex: 0, account: "alice", delta: 10n }],
};
export const block2a: ChainBlock = {
  number: 2, hash: "0x02a", parentHash: block1.hash,
  logs: [{ transactionHash: "0xt2a", logIndex: 0, account: "alice", delta: 5n }],
};
export const block2b: ChainBlock = {
  number: 2, hash: "0x02b", parentHash: block1.hash,
  logs: [
    { transactionHash: "0xt2b", logIndex: 0, account: "alice", delta: -3n },
    { transactionHash: "0xt2b", logIndex: 1, account: "bob", delta: 2n },
  ],
};
export const block3b: ChainBlock = {
  number: 3, hash: "0x03b", parentHash: block2b.hash,
  logs: [{ transactionHash: "0xt3b", logIndex: 0, account: "bob", delta: 2n }],
};
