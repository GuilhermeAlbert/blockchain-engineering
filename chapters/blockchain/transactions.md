# Transactions

A transaction is a signed record of an intended change. Most commonly, a transfer of value from one party to another. This chapter treats transactions as a general blockchain concept, at the level needed to understand how they fit into blocks and the chain as a whole; the full mechanical depth of Bitcoin's specific transaction format (inputs, outputs, scripts, fees) is covered separately in [Bitcoin Transactions](../bitcoin/transactions.md), and Ethereum's transaction format in [Ethereum Transactions](../ethereum/transactions.md).

## The problem

A block (see [Blocks](./blocks.md)) needs some unit of data to actually batch together. That unit needs to be self-contained enough that any node can independently verify it's legitimate, that whoever authorized it actually had the right to, and that it doesn't attempt something the protocol's rules forbid (like spending value that doesn't exist). A transaction is that self-contained, independently verifiable unit.

## What every blockchain transaction has in common

Regardless of the specific blockchain, a transaction generally includes:

- **An authorization**, almost always a [digital signature](../cryptography/digital-signatures.md) proving the party initiating the transaction controls the relevant private key.
- **A description of the change being requested**: in Bitcoin, a list of inputs being spent and outputs being created; in Ethereum, typically a sender, recipient, amount, and optionally data for a smart contract call.
- **A fee**, compensating whoever includes the transaction in a block for the block space and computational effort it consumes (see [Transaction Fees](../bitcoin/fees.md) and [Gas](../ethereum/gas.md)).
- **A unique identifier**, typically a hash of the transaction's own contents, used to reference it (as an input to a later transaction, in Bitcoin's case; or simply for lookup, in either system).

## Two fundamentally different models

This is the most consequential design fork among blockchain transaction formats, and it's worth understanding at a conceptual level before diving into either system's specifics:

### The UTXO model (Bitcoin)

Bitcoin has no concept of an "account balance" stored anywhere. Instead, the network tracks a set of **Unspent Transaction Outputs (UTXOs)**, discrete, unspent chunks of value, each created by some prior transaction and not yet spent by any later one. A new transaction consumes one or more existing UTXOs as inputs (proving ownership via signature) and creates one or more new UTXOs as outputs. A wallet's "balance" is not a stored number anywhere. It's computed on the fly as the sum of all UTXOs a wallet's keys can spend. This is covered in full in [The UTXO Model](../bitcoin/utxo.md).

### The account model (Ethereum)

Ethereum instead maintains an explicit, global **state** (essentially a large table mapping addresses to account balances (and, for contract accounts, to stored data and code)) and a transaction directly debits the sender's balance and credits the recipient's, much like a conventional bank ledger. This is covered in full in [Ethereum State](../ethereum/state.md) and [Ethereum Accounts](../ethereum/accounts.md).

```text
UTXO model (Bitcoin)                    Account model (Ethereum)

  UTXO A (0.5 BTC) ──┐                    Alice's balance: 10 ETH
  UTXO B (0.3 BTC) ──┼─► new tx ──► UTXO C (0.7 BTC)     │
                      │              UTXO D (0.1 BTC)     ▼ tx: send 2 ETH to Bob
                      └─► (change)                       Alice's balance: 8 ETH
                                                          Bob's balance:   +2 ETH
No stored "balance" anywhere —                          Balances stored directly
it's the sum of unspent outputs                          in global state
```

Neither model is strictly superior. This is a genuine design tradeoff covered specifically for each chain in their respective sections, and it's one of the most consequential differences between Bitcoin and Ethereum's overall architecture, affecting everything from privacy (UTXOs make certain kinds of analysis harder, see [Privacy](../society/privacy.md)) to smart contract design (the account model's persistent state is a more natural fit for complex contract logic, see [Smart Contracts](../contracts/README.md)).

## How transactions become part of the chain

A transaction, once created and signed, is broadcast to the peer-to-peer network (see [Peer-to-Peer Networks](../distributed-systems/p2p.md)) and sits in nodes' [mempools](../bitcoin/mempool.md) until a miner or validator includes it in a block. Being included in a block doesn't make it instantly, permanently final. It inherits the block's position in the chain and gains confidence over time as described in [Probabilistic Finality](../distributed-systems/probabilistic-finality.md). Inclusion in a block, and that block's transactions being correctly summarized in the block's Merkle root, is what [Merkle Proofs](../cryptography/merkle-proofs.md) let a light client verify without downloading every transaction on the network.

## Common misconceptions

**A transaction being "confirmed" does not mean it was checked by some external authority**. It means it was included in a block that the network has accepted as part of the valid chain, and every node that validated that block independently checked the transaction against the protocol's own rules.

**Not every blockchain uses the UTXO model, and not every blockchain uses the account model.** These are two of the most common approaches, but the specific choice is a protocol design decision, not an inherent property of "blockchain" as a category, see [UTXO](../bitcoin/utxo.md) and [Ethereum Accounts](../ethereum/accounts.md) for each model's actual mechanics.

## Further reading

- [Bitcoin whitepaper, Section 2 (Transactions)](https://bitcoin.org/bitcoin.pdf)
- See also: [Bitcoin Transactions](../bitcoin/transactions.md), [Ethereum Transactions](../ethereum/transactions.md)

---

[← Previous: Block Headers](./block-headers.md)
·
[Back to Blockchain Fundamentals](./README.md)
·
[Next: Hashes and Block Linking →](./block-linking.md)
