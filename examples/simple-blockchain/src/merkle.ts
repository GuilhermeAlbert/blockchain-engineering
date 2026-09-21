import { sha256 } from "./hash";

/**
 * Builds a Merkle root from a list of transaction strings.
 * See chapters/cryptography/merkle-trees.md for the full mechanism.
 *
 * Odd levels duplicate the last hash before pairing, matching the
 * convention described (and its historical pitfall, CVE-2012-2459) in
 * that chapter.
 */
export function merkleRoot(transactions: string[]): string {
  if (transactions.length === 0) {
    return sha256("");
  }

  let level = transactions.map((tx) => sha256(tx));

  while (level.length > 1) {
    const next: string[] = [];
    for (let i = 0; i < level.length; i += 2) {
      const left = level[i];
      const right = i + 1 < level.length ? level[i + 1] : level[i];
      next.push(sha256(left + right));
    }
    level = next;
  }

  return level[0];
}
