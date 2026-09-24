export function parseQuantity(value: unknown): bigint {
  if (typeof value !== "string" || !/^0x(?:0|[1-9a-f][0-9a-f]*)$/i.test(value)) {
    if (typeof value === "string" && /^0x0[0-9a-f]+$/i.test(value)) {
      throw new Error(`Non-canonical hex quantity: ${value}`);
    }
    throw new Error(`Invalid hex quantity: ${String(value)}`);
  }
  return BigInt(value);
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
