export type ChainLog = { transactionHash: string; logIndex: number; account: string; delta: bigint };
export type ChainBlock = { number: number; hash: string; parentHash: string; logs: ChainLog[] };
