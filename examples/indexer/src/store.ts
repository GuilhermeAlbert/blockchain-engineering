import type { ChainBlock } from "./types.js";

export class MemoryStore {
  private readonly balances = new Map<string, bigint>();
  private readonly blocks: ChainBlock[] = [];
  private readonly events = new Set<string>();

  constructor(readonly chainId: number) {}

  tip(): ChainBlock | undefined { return this.blocks.at(-1); }
  hasBlock(hash: string): boolean { return this.blocks.some((block) => block.hash === hash); }
  balance(account: string): bigint { return this.balances.get(account) ?? 0n; }
  checkpoint() { const tip = this.tip(); return tip ? { number: tip.number, hash: tip.hash } : undefined; }

  commit(block: ChainBlock): void {
    for (const log of block.logs) {
      const key = `${this.chainId}:${block.hash}:${log.transactionHash}:${log.logIndex}`;
      if (this.events.has(key)) continue;
      this.events.add(key);
      this.balances.set(log.account, this.balance(log.account) + log.delta);
    }
    this.blocks.push(block);
  }

  rollback(): ChainBlock {
    const block = this.blocks.pop();
    if (!block) throw new Error("No block to roll back");
    for (const log of [...block.logs].reverse()) {
      const key = `${this.chainId}:${block.hash}:${log.transactionHash}:${log.logIndex}`;
      if (!this.events.delete(key)) continue;
      this.balances.set(log.account, this.balance(log.account) - log.delta);
    }
    return block;
  }
}
