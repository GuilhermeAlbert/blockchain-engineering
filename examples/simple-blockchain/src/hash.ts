import { createHash } from "node:crypto";

/**
 * A single SHA-256 pass. Real Bitcoin uses SHA-256d (double SHA-256) for
 * block hashing, to mitigate length-extension attacks — see
 * chapters/cryptography/sha-256.md. This example uses a single pass
 * throughout for simplicity; it does not change any of the pedagogical
 * points this project demonstrates.
 */
export function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}
