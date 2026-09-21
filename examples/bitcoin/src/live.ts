import { decodeTransaction } from "./decode-transaction";
import { decodeBlockHeader, bitsToTarget, meetsTarget } from "./decode-block-header";

/**
 * Fetches and decodes CURRENT, live Bitcoin data instead of the hardcoded
 * historical example in demo.ts. Requires network access. Uses the public
 * mempool.space REST API (https://mempool.space/docs/api/rest) — no API
 * key required, and this project has no affiliation with that service; any
 * public Bitcoin block explorer with a similar raw-hex endpoint would work
 * as a substitute.
 */

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`request to ${url} failed: ${res.status} ${res.statusText}`);
  }
  return res.text();
}

async function main(): Promise<void> {
  console.log("Fetching the current chain tip...");
  const tipHash = await fetchText("https://mempool.space/api/blocks/tip/hash");
  const tipHeight = await fetchText("https://mempool.space/api/blocks/tip/height");
  console.log(`Current tip: block ${tipHeight} (${tipHash})`);

  console.log("\nFetching and decoding that block's header...");
  const headerHex = await fetchText(`https://mempool.space/api/block/${tipHash}/header`);
  const header = decodeBlockHeader(headerHex);
  console.log("decoded block hash:", header.blockHash);
  console.log("matches the hash we asked for:", header.blockHash === tipHash);

  const target = bitsToTarget(header.bits);
  console.log("satisfies its own proof-of-work target:", meetsTarget(header.blockHash, target));

  console.log("\nFetching this block's transaction list...");
  const txidsJson = await fetchText(`https://mempool.space/api/block/${tipHash}/txids`);
  const txids: string[] = JSON.parse(txidsJson);
  console.log(`Block contains ${txids.length} transactions. Decoding the second one (skipping the coinbase)...`);

  const sampleTxid = txids[1];
  const rawTxHex = await fetchText(`https://mempool.space/api/tx/${sampleTxid}/hex`);
  const tx = decodeTransaction(rawTxHex);
  console.log("decoded txid:", tx.txid);
  console.log("matches the txid we asked for:", tx.txid === sampleTxid);
  console.log(`${tx.inputs.length} input(s), ${tx.outputs.length} output(s), SegWit: ${tx.isSegWit}`);
}

main().catch((err) => {
  console.error("Live fetch failed — this script requires network access.", err);
  process.exitCode = 1;
});
