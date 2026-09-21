import { readVarint } from "./varint";
import { sha256d } from "./hash";

export interface DecodedInput {
  previousTxId: string; // displayed big-endian, as block explorers show it
  previousOutputIndex: number;
  scriptSig: string; // hex
  sequence: number;
}

export interface DecodedOutput {
  amountSats: string; // bigint as string, to avoid precision loss on large values
  scriptPubKey: string; // hex
}

export interface DecodedTransaction {
  txid: string;
  version: number;
  isSegWit: boolean;
  inputs: DecodedInput[];
  outputs: DecodedOutput[];
  witnesses: string[][]; // one array of witness items per input, empty if not SegWit
  locktime: number;
  serializedBytes: number;
}

/**
 * Decodes a raw Bitcoin transaction from its wire-format hex encoding.
 * Handles both legacy and SegWit transactions (marker/flag byte pair,
 * per-input witness stacks) — see chapters/bitcoin/segwit.md for what the
 * marker/flag bytes are for and chapters/bitcoin/transactions.md for the
 * overall structure this function walks through field by field.
 */
export function decodeTransaction(hex: string): DecodedTransaction {
  const buf = Buffer.from(hex, "hex");
  let offset = 0;

  const version = buf.readInt32LE(offset);
  offset += 4;

  let isSegWit = false;
  if (buf[offset] === 0x00 && buf[offset + 1] === 0x01) {
    isSegWit = true;
    offset += 2; // marker (0x00) + flag (0x01)
  }

  const inputCount = readVarint(buf, offset);
  offset += inputCount.bytesRead;

  const inputs: DecodedInput[] = [];
  for (let i = 0; i < inputCount.value; i++) {
    // Previous txids are stored little-endian on the wire; conventional
    // display (and what block explorers show) reverses them. We copy
    // with Buffer.from() before reversing — reverse() mutates in place,
    // and subarray() shares memory with `buf`, which we still need intact.
    const previousTxId = Buffer.from(buf.subarray(offset, offset + 32)).reverse().toString("hex");
    offset += 32;
    const previousOutputIndex = buf.readUInt32LE(offset);
    offset += 4;
    const scriptLen = readVarint(buf, offset);
    offset += scriptLen.bytesRead;
    const scriptSig = buf.subarray(offset, offset + scriptLen.value).toString("hex");
    offset += scriptLen.value;
    const sequence = buf.readUInt32LE(offset);
    offset += 4;
    inputs.push({ previousTxId, previousOutputIndex, scriptSig, sequence });
  }

  const outputCount = readVarint(buf, offset);
  offset += outputCount.bytesRead;

  const outputs: DecodedOutput[] = [];
  for (let i = 0; i < outputCount.value; i++) {
    const amountSats = buf.readBigUInt64LE(offset);
    offset += 8;
    const scriptLen = readVarint(buf, offset);
    offset += scriptLen.bytesRead;
    const scriptPubKey = buf.subarray(offset, offset + scriptLen.value).toString("hex");
    offset += scriptLen.value;
    outputs.push({ amountSats: amountSats.toString(), scriptPubKey });
  }

  const witnesses: string[][] = [];
  if (isSegWit) {
    for (let i = 0; i < inputCount.value; i++) {
      const itemCount = readVarint(buf, offset);
      offset += itemCount.bytesRead;
      const items: string[] = [];
      for (let j = 0; j < itemCount.value; j++) {
        const itemLen = readVarint(buf, offset);
        offset += itemLen.bytesRead;
        items.push(buf.subarray(offset, offset + itemLen.value).toString("hex"));
        offset += itemLen.value;
      }
      witnesses.push(items);
    }
  }

  const locktime = buf.readUInt32LE(offset);
  offset += 4;

  // The txid is computed over the non-witness serialization only — see
  // chapters/bitcoin/segwit.md#txid-and-wtxid. For a SegWit transaction,
  // that means re-serializing without the marker/flag/witness fields.
  const txid = computeTxid(buf, isSegWit);

  return { txid, version, isSegWit, inputs, outputs, witnesses, locktime, serializedBytes: offset };
}

function computeTxid(fullBuf: Buffer, isSegWit: boolean): string {
  if (!isSegWit) {
    return Buffer.from(sha256d(fullBuf)).reverse().toString("hex");
  }

  // Strip the 2-byte marker+flag and the witness data to get the
  // legacy-equivalent serialization the txid is actually computed over.
  let offset = 4; // version
  offset += 2; // marker + flag

  const inputCount = readVarint(fullBuf, offset);
  const inputsStart = offset;
  offset += inputCount.bytesRead;
  for (let i = 0; i < inputCount.value; i++) {
    offset += 32 + 4; // prevTxId + prevIndex
    const scriptLen = readVarint(fullBuf, offset);
    offset += scriptLen.bytesRead + scriptLen.value;
    offset += 4; // sequence
  }
  const inputsEnd = offset;

  const outputCount = readVarint(fullBuf, offset);
  const outputsStart = inputsEnd;
  offset += outputCount.bytesRead;
  for (let i = 0; i < outputCount.value; i++) {
    offset += 8; // amount
    const scriptLen = readVarint(fullBuf, offset);
    offset += scriptLen.bytesRead + scriptLen.value;
  }
  const outputsEnd = offset;

  const locktime = fullBuf.subarray(fullBuf.length - 4);

  const legacySerialization = Buffer.concat([
    fullBuf.subarray(0, 4), // version
    fullBuf.subarray(inputsStart, inputsEnd), // input count + inputs
    fullBuf.subarray(outputsStart, outputsEnd), // output count + outputs
    locktime,
  ]);

  return Buffer.from(sha256d(legacySerialization)).reverse().toString("hex");
}
