import type { ChainBlock } from "./types.js";
import { MemoryStore } from "./store.js";

export class Indexer {
  constructor(private readonly store: MemoryStore) {}

  checkpoint() { return this.store.checkpoint(); }

  apply(block: ChainBlock): void {
    const tip = this.store.tip();
    if (tip?.hash === block.hash) return;
    if (tip && block.parentHash !== tip.hash) throw new Error(`unknown parent: ${block.parentHash}`);
    if (!tip && block.number !== 0) throw new Error(`unknown parent: ${block.parentHash}`);
    if (tip && block.number !== tip.number + 1) throw new Error("non-contiguous block number");
    this.store.commit(block);
  }

  reorganize(replacement: ChainBlock[]): void {
    if (replacement.length === 0) return;
    const ancestorHash = replacement[0]!.parentHash;
    while (this.store.tip() && this.store.tip()!.hash !== ancestorHash) this.store.rollback();
    if (!this.store.tip() || this.store.tip()!.hash !== ancestorHash) throw new Error(`unknown parent: ${ancestorHash}`);
    for (const block of replacement) this.apply(block);
  }
}
