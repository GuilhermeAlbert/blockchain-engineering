/**
 * Bitcoin's variable-length integer ("compactSize") encoding, used
 * throughout the wire format for counts and lengths. See
 * chapters/bitcoin/transactions.md for where this shows up.
 */
export interface VarintResult {
  value: number;
  bytesRead: number;
}

export function readVarint(buf: Buffer, offset: number): VarintResult {
  const first = buf.readUInt8(offset);
  if (first < 0xfd) return { value: first, bytesRead: 1 };
  if (first === 0xfd) return { value: buf.readUInt16LE(offset + 1), bytesRead: 3 };
  if (first === 0xfe) return { value: buf.readUInt32LE(offset + 1), bytesRead: 5 };
  return { value: Number(buf.readBigUInt64LE(offset + 1)), bytesRead: 9 };
}
