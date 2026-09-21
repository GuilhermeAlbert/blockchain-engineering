# Bitcoin Decoder

From-scratch decoders for real Bitcoin transactions and block headers — no Bitcoin library, just the raw wire-format parsing rules described in [Bitcoin Transactions](../../chapters/bitcoin/transactions.md) and [Block Headers](../../chapters/blockchain/block-headers.md), applied to real, on-chain data and checked against what a public block explorer reports.

## Running it

```bash
npm install
npm run demo   # decodes a hardcoded, real historical transaction and block header
npm test       # assertion-based tests, including a regression test for a real bug found below
npm run live   # fetches and decodes CURRENT data from the live network (requires internet)
```

## What it demonstrates

`npm run demo` decodes a real SegWit transaction (`c1a73f28...b344b`, confirmed in Bitcoin block 968,006) and that block's real 80-byte header, entirely from raw hex, with no shortcuts:

- The transaction's **txid is computed, not read** — the decoder re-serializes the non-witness fields and runs them through SHA-256d itself, and the result matches the txid every block explorer shows for this transaction.
- The block's **hash is computed the same way**: SHA-256d of the raw 80-byte header, matching the real, known hash of this real block.
- The computed hash is then checked against the block's own **decoded proof-of-work target** (from its compact "bits" field), confirming it genuinely satisfies the difficulty requirement described in [Proof of Work](../../chapters/bitcoin/proof-of-work.md) — this is real, historical mining work, not a simulated example.

`npm run live` does the same thing against whatever the current chain tip is at the moment you run it, using the public [mempool.space REST API](https://mempool.space/docs/api/rest) (no API key needed) purely as a data source — every byte of actual parsing is still done by this project's own code, not a library call.

## What's in here

| File | What it does |
| --- | --- |
| `src/varint.ts` | Bitcoin's variable-length integer encoding |
| `src/hash.ts` | SHA-256 and SHA-256d |
| `src/decode-transaction.ts` | Parses raw transaction hex (legacy and SegWit), including txid computation |
| `src/decode-block-header.ts` | Parses an 80-byte header, computes its hash, decodes the difficulty target |
| `src/demo.ts` | The main walkthrough, using hardcoded real data (no network needed) |
| `src/live.ts` | The same walkthrough, fetching current live data instead |
| `src/test.ts` | Assertion-based tests |

## A real bug this project hit, on purpose left visible in the code

While building this, the first version of the header and transaction decoders computed the wrong txid and the wrong block hash — despite every individual field (previous block hash, Merkle root, and so on) decoding correctly. The cause: `Buffer.prototype.reverse()` mutates a buffer **in place**, and `buf.subarray(...)` returns a **view** into the same underlying memory, not a copy. Reversing a subarray (to get conventional display byte order for a hash) was silently corrupting the original buffer, which the code then hashed *after* it had already been mutated.

The fix — wrapping each subarray in `Buffer.from(...)` before reversing, forcing an actual copy — is called out directly in the code comments in both decoder files, and `src/test.ts` includes a regression test (`decoding does not mutate the input in a way that breaks re-decoding`) specifically for it. This is left in deliberately: it's a genuine, easy-to-make mistake with Node's Buffer API, not a hypothetical one, and the fix is a useful, concrete example of exactly the kind of bug that "the code looks right, the individual pieces test fine in isolation" doesn't catch — only end-to-end verification against known-correct real data did.
