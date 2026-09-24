import { block1, block2a, block2b, block3b, genesis } from "./fixtures.js";
import { Indexer } from "./indexer.js";
import { MemoryStore } from "./store.js";

const store = new MemoryStore(1);
const indexer = new Indexer(store);
for (const block of [genesis, block1, block2a]) indexer.apply(block);
console.log("Before reorg", { checkpoint: store.checkpoint(), alice: store.balance("alice") });
indexer.reorganize([block2b, block3b]);
console.log("After reorg", { checkpoint: store.checkpoint(), alice: store.balance("alice"), bob: store.balance("bob") });
