import { Block } from "./block";
import { Transaction, serializeTransaction } from "./transaction";
import { merkleRoot } from "./merkle";

const GENESIS_PREVIOUS_HASH = "0".repeat(64);

export class Blockchain {
  readonly chain: Block[];
  readonly difficulty: number;

  constructor(difficulty = 4) {
    this.difficulty = difficulty;
    const genesis = new Block(0, [], GENESIS_PREVIOUS_HASH);
    genesis.mine(difficulty);
    this.chain = [genesis];
  }

  get latestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  /**
   * Creates a new block on top of the current tip and mines it — i.e.
   * performs the proof-of-work search from block.ts — before appending it.
   * A real network has many independent miners racing to do this; here,
   * there is only one, so there is no propagation delay and no natural
   * forking (see chapters/blockchain/reorgs.md for what a real network
   * adds on top of this single-miner simplification).
   */
  addBlock(transactions: Transaction[]): Block {
    const block = new Block(this.chain.length, transactions, this.latestBlock.hash);
    block.mine(this.difficulty);
    this.chain.push(block);
    return block;
  }

  /**
   * Re-derives and checks every fact about every block, independently,
   * exactly as described in chapters/distributed-systems/replication.md:
   * this does not trust that any block's stored fields are correct — it
   * recomputes the hash and the Merkle root from scratch and compares.
   */
  isValid(): { valid: boolean; reason?: string } {
    for (let i = 0; i < this.chain.length; i++) {
      const block = this.chain[i];

      const expectedMerkleRoot = merkleRoot(block.transactions.map(serializeTransaction));
      if (block.merkleRoot !== expectedMerkleRoot) {
        return { valid: false, reason: `Block ${i}: stored Merkle root does not match its transactions` };
      }

      if (block.hash !== block.computeHash()) {
        return { valid: false, reason: `Block ${i}: stored hash does not match recomputed hash (tampering detected)` };
      }

      if (!block.hash.startsWith("0".repeat(this.difficulty))) {
        return { valid: false, reason: `Block ${i}: hash does not satisfy proof-of-work difficulty` };
      }

      if (i > 0) {
        const previous = this.chain[i - 1];
        if (block.previousHash !== previous.hash) {
          return { valid: false, reason: `Block ${i}: previousHash does not match block ${i - 1}'s actual hash` };
        }
      } else {
        if (block.previousHash !== GENESIS_PREVIOUS_HASH) {
          return { valid: false, reason: "Genesis block: previousHash is not the expected placeholder" };
        }
      }
    }

    return { valid: true };
  }

  /**
   * A simplified fork-choice rule: compare two chains by their total
   * proof-of-work (approximated here as block count times difficulty,
   * since every block in this toy chain is mined at the same fixed
   * difficulty — real Bitcoin sums actual per-block target-implied work,
   * since difficulty can vary block to block; see
   * chapters/blockchain/fork-choice.md).
   */
  static cumulativeWork(chain: Block[], difficulty: number): number {
    return chain.length * difficulty;
  }

  /**
   * Given a competing chain, decide which one this node should adopt,
   * following the cumulative-work rule from
   * chapters/blockchain/fork-choice.md — not simply "whichever is longer
   * by block count" in the general case, though for this fixed-difficulty
   * toy chain the two happen to coincide.
   */
  chooseBetween(otherChain: Block[]): "current" | "other" {
    const currentWork = Blockchain.cumulativeWork(this.chain, this.difficulty);
    const otherWork = Blockchain.cumulativeWork(otherChain, this.difficulty);
    return otherWork > currentWork ? "other" : "current";
  }
}
