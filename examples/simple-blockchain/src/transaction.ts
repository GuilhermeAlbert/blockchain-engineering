/**
 * A deliberately minimal transaction: just a sender, recipient, and amount.
 *
 * Real Bitcoin transactions do not look like this at all — see
 * chapters/bitcoin/transactions.md. There are no inputs, no outputs, no
 * signatures, and no scripts here. This exists only to give blocks
 * something concrete to hash and Merkle-tree together.
 */
export interface Transaction {
  from: string;
  to: string;
  amount: number;
}

export function serializeTransaction(tx: Transaction): string {
  return `${tx.from}->${tx.to}:${tx.amount}`;
}
