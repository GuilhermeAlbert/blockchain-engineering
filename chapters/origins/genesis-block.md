# The Genesis Block

The genesis block is block 0 — the first block in the Bitcoin blockchain, mined by Satoshi Nakamoto before the network had any other participants. It is a useful chapter on its own because it is short, fully concrete, and demonstrates several mechanisms — the coinbase transaction, block hashing, and hardcoded network parameters — that later chapters cover in general terms. Here they appear in one specific, inspectable example.

## The problem it solves

Every blockchain needs a starting point: a first block with no predecessor, whose hash every subsequent block ultimately traces back to. The genesis block cannot follow the normal linking rule (each block references the hash of the block before it — see [Hashes and Block Linking](../blockchain/block-linking.md)) because there is no block before it. Bitcoin's software handles this by hardcoding the genesis block's parameters directly into the client, rather than deriving it through the normal mining and validation process a new node would apply to every later block.

## What is in it

The genesis block was mined on **January 3, 2009, at 18:15:05 UTC**. Its hash is:

```text
000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
```

Like every Bitcoin block, its single transaction is a **coinbase transaction** — the special first transaction in a block that creates new coins rather than spending existing ones (see [Coinbase Transactions](../bitcoin/coinbase-transactions.md)). The genesis coinbase transaction paid a block reward of 50 BTC. Because of how Bitcoin Core's original code checks are written, this specific output is **hardcoded as unspendable** — no valid Bitcoin transaction can reference it as an input, so these 50 BTC have never been and cannot be moved, regardless of who might hold the corresponding private key.

### The embedded message

The coinbase transaction's input includes an arbitrary data field (later formalized as `coinbase` scriptSig data, discussed in [Coinbase Transactions](../bitcoin/coinbase-transactions.md)) containing the text:

```text
The Times 03/Jan/2009 Chancellor on brink of second bailout for banks
```

This is a verbatim copy of the front-page headline of the UK newspaper *The Times* on the date the block was created, referring to then-Chancellor of the Exchequer Alistair Darling and the escalating UK bank bailouts during the 2008–2009 financial crisis. Two things about this message are documented fact; a third is interpretation:

- **Fact:** the text matches a real, verifiable newspaper headline from that exact date, which anyone can independently confirm from surviving copies or archives of that day's *Times*.
- **Fact:** embedding a recent, publicly verifiable piece of text in a block is a standard technique (also used in some of the timestamping proposals discussed in [Bit Gold](./bit-gold.md)) for proving a block could not have been created before a certain date, since the text could not have been known earlier.
- **Interpretation:** many readers, including much of the Bitcoin community, take the specific choice of headline as a political statement about the fragility of the banking system Bitcoin was designed to route around. Satoshi never explained the choice of headline in any known writing. This book treats the political reading as a widely held interpretation, not a fact Satoshi confirmed.

## Under the hood

The genesis block's parameters — its exact timestamp, nonce, Merkle root, and the coinbase message above — are written directly into the Bitcoin source code, in what is now the `chainparams.cpp` file (or its historical equivalent in early code) of Bitcoin Core, rather than being something a node discovers by running the normal proof-of-work search on empty input. Every full node independently recomputes the genesis block's hash from these hardcoded parameters as one of its first validation steps on startup, confirming it matches the expected value before accepting any other block — this is one of the few places in Bitcoin's design where trust in a specific, unchangeable value is built into the software itself, rather than derived purely from the proof-of-work chain.

The genesis block has a block height of 0 and, unusually among Bitcoin blocks, its header field for "previous block hash" is filled with all zeros — there being no previous block to reference. See [Block Height](../blockchain/block-height.md) and [Block Headers](../blockchain/block-headers.md).

## Tradeoffs

Hardcoding the genesis block is a pragmatic, necessary exception to Bitcoin's usual model of trustless verification — every node has to simply trust that this specific starting point, distributed with the software itself, is the legitimate one. In practice this trust is anchored by the software's own open-source distribution and by the fact that changing the genesis block would produce an entirely different chain that no existing node, wallet, or exchange would recognize as Bitcoin — so the practical risk is closer to "everyone would notice and reject a change" than to a genuine, exploitable trust gap in day-to-day operation.

## Common misconceptions

**The 50 BTC in the genesis block are not "lost coins" in the same sense as coins whose private key was misplaced.** They are unspendable by protocol design, a hardcoded quirk of the original client's transaction-index code, not a case of a lost key. See [Lost Coins](../bitcoin/lost-coins.md) for the broader (and much larger) category of coins that are lost because of forgotten or destroyed private keys.

**The nine-day gap between the whitepaper's release (October 31, 2008) and the genesis block (January 3, 2009) is real and documented**, not evidence of anything unusual — it reflects the time needed to finish and test the initial implementation, consistent with private mailing-list correspondence from that period in which Satoshi discussed ongoing development work.

## Further reading

- [Genesis block — Bitcoin Wiki](https://en.bitcoin.it/wiki/Genesis_block)
- [Bitcoin Core source, chainparams.cpp](https://github.com/bitcoin/bitcoin/blob/master/src/kernel/chainparams.cpp) — see the hardcoded genesis block parameters
- [Block 0 on a block explorer](https://mempool.space/block/000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f) — inspect the genesis block directly

---

[← Previous: The Bitcoin Whitepaper](./bitcoin-whitepaper.md)
·
[Back to Origins](./README.md)
·
[Next: Early Bitcoin History →](./early-bitcoin.md)
