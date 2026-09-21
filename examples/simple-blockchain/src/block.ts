import { sha256 } from "./hash";
import { merkleRoot } from "./merkle";
import { Transaction, serializeTransaction } from "./transaction";

/**
 * A block's header fields, kept separate from its transaction list —
 * mirroring the header/body split described in
 * chapters/blockchain/blocks.md and chapters/blockchain/block-headers.md.
 * This is a simplified header: no version field, no compact difficulty
 * "bits" encoding, and difficulty here means "number of leading zero hex
 * characters required," not Bitcoin's actual target representation.
 */
export class Block {
  readonly index: number;
  readonly timestamp: number;
  readonly transactions: Transaction[];
  readonly previousHash: string;
  readonly merkleRoot: string;
  nonce: number;
  hash: string;

  constructor(index: number, transactions: Transaction[], previousHash: string) {
    this.index = index;
    this.timestamp = Date.now();
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.merkleRoot = merkleRoot(transactions.map(serializeTransaction));
    this.nonce = 0;
    this.hash = this.computeHash();
  }

  /**
   * Every field that affects the hash is concatenated and hashed together.
   * Changing any one of them — even a single transaction amount, or the
   * previousHash link — produces a completely different hash. This is the
   * literal mechanism behind chapters/blockchain/block-linking.md.
   */
  computeHash(): string {
    const header = `${this.index}|${this.timestamp}|${this.merkleRoot}|${this.previousHash}|${this.nonce}`;
    return sha256(header);
  }

  /**
   * A brute-force proof-of-work search: try nonce values until the
   * resulting hash starts with `difficulty` zero characters. This is the
   * same search structure described in
   * chapters/cryptography/preimage-resistance.md and
   * chapters/bitcoin/proof-of-work.md — just with a far smaller,
   * classroom-scale difficulty than real Bitcoin mining.
   */
  mine(difficulty: number): void {
    const target = "0".repeat(difficulty);
    while (!this.hash.startsWith(target)) {
      this.nonce++;
      this.hash = this.computeHash();
    }
  }
}
