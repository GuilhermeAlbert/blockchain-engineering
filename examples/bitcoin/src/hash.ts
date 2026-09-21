import { createHash } from "node:crypto";

export function sha256(buf: Buffer): Buffer {
  return createHash("sha256").update(buf).digest();
}

/** SHA-256d — SHA-256 applied twice. See chapters/cryptography/sha-256.md. */
export function sha256d(buf: Buffer): Buffer {
  return sha256(sha256(buf));
}
