import { sha256d } from "./hash";

export interface DecodedBlockHeader {
  version: number;
  previousBlockHash: string;
  merkleRoot: string;
  timestamp: number;
  timestampISO: string;
  bits: number;
  nonce: number;
  blockHash: string;
}

/**
 * Decodes an 80-byte Bitcoin block header — see
 * chapters/blockchain/block-headers.md for what each field means and why
 * it's exactly 80 bytes.
 */
export function decodeBlockHeader(hex: string): DecodedBlockHeader {
  const buf = Buffer.from(hex, "hex");
  if (buf.length !== 80) {
    throw new Error(`expected an 80-byte header, got ${buf.length} bytes`);
  }

  // IMPORTANT: Buffer.prototype.reverse() mutates in place, and
  // subarray() returns a *view* into the same underlying memory — not a
  // copy. Reversing a subarray in place would silently corrupt `buf`
  // itself, which we still need intact below to compute the block hash.
  // Buffer.from(...) here makes an actual copy before reversing it.
  const version = buf.readInt32LE(0);
  const previousBlockHash = Buffer.from(buf.subarray(4, 36)).reverse().toString("hex");
  const merkleRoot = Buffer.from(buf.subarray(36, 68)).reverse().toString("hex");
  const timestamp = buf.readUInt32LE(68);
  const bits = buf.readUInt32LE(72);
  const nonce = buf.readUInt32LE(76);

  const blockHash = Buffer.from(sha256d(buf)).reverse().toString("hex");

  return {
    version,
    previousBlockHash,
    merkleRoot,
    timestamp,
    timestampISO: new Date(timestamp * 1000).toISOString(),
    bits,
    nonce,
    blockHash,
  };
}

/**
 * Decodes the compact "bits" field into the full 256-bit target — see
 * chapters/bitcoin/difficulty.md#the-compact-bits-encoding.
 */
export function bitsToTarget(bits: number): bigint {
  const exponent = bits >>> 24;
  const coefficient = BigInt(bits & 0x007fffff);
  if (exponent <= 3) {
    return coefficient >> BigInt(8 * (3 - exponent));
  }
  return coefficient << BigInt(8 * (exponent - 3));
}

/** Does this block's hash actually satisfy its own proof-of-work target? */
export function meetsTarget(blockHash: string, target: bigint): boolean {
  return BigInt(`0x${blockHash}`) <= target;
}
