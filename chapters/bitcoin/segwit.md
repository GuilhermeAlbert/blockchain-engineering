# SegWit

Segregated Witness — SegWit — is a 2017 protocol upgrade that changed where signature data lives within a transaction. It sounds like a small technical detail. It fixed a long-standing malleability problem, changed how transaction size is measured and fees are calculated, effectively increased Bitcoin's practical block capacity, and became the center of the most contentious governance dispute in Bitcoin's history (see [The Block Size Debate](../forks/block-size-war.md)). This chapter covers the mechanism; the political history is covered separately in [Forks and Protocol Upgrades](../forks/README.md).

## Why SegWit exists

Two separate, real problems motivated it:

1. **Transaction malleability.** As covered in [Digital Signatures](../cryptography/digital-signatures.md#malleability-a-subtlety-worth-naming-here), a transaction's ID (txid) is computed by hashing its *entire* serialized contents — including the scriptSig, which contains signature data. Because ECDSA signatures have some flexibility in their exact byte encoding without changing their validity (a form of signature malleability), a third party could take a valid, unconfirmed transaction and produce a different, equally valid signature encoding for it — changing the txid without changing what the transaction actually does. This complicated any protocol that needed to reference an unconfirmed transaction by its txid before confirmation, most notably early Lightning Network channel designs (see [Lightning Network](../lightning/README.md)).
2. **Block capacity**, discussed in depth in [The Block Size Debate](../forks/block-size-war.md) — SegWit's weight-based accounting effectively increased the amount of transaction data that fits in a block, as a byproduct of its main design rather than through a simple, direct block size limit increase, which was the specific point of contention in the surrounding governance dispute.

## How it works

SegWit **moves witness data (signatures and, for more complex scripts, the full unlocking script) out of the traditional transaction structure and into a separate, appended witness field**, which is not included in the calculation of the transaction's txid. This directly solves malleability: since the txid no longer depends on the signature data at all, no amount of signature-encoding manipulation can change it.

```text
Pre-SegWit transaction (signature data is part of what's hashed for txid):

  [ version | inputs (incl. scriptSig) | outputs | locktime ]
                     ↑
              signature data lives here,
              and affects the txid


SegWit transaction (signature data moved out, excluded from txid):

  [ version | marker+flag | inputs (scriptSig now empty for SegWit inputs) |
    outputs | witness data | locktime ]
                                  ↑
                          signature data lives here now,
                          does NOT affect the txid
```

## txid and wtxid

A SegWit transaction actually has two identifiers: the **txid**, computed over the transaction with witness data excluded (as described above, and matching what a pre-SegWit node would compute, preserving backward compatibility for anything referencing transactions by txid), and the **wtxid**, computed over the *entire* serialized transaction including witness data. The wtxid is used internally for relay deduplication and in the [Merkle tree](../cryptography/merkle-trees.md) that commits to witness data (a separate structure, the witness commitment, stored in the coinbase transaction of a block containing SegWit transactions — a detail added specifically to preserve backward compatibility with pre-SegWit block validation logic).

## Weight and the effective capacity increase

Covered with the actual formula in [Transaction Fees](./fees.md#transaction-size-and-weight): SegWit introduced **weight units**, discounting witness data to a quarter of its byte count's weight. The consensus rule changed from a strict 1 MB block size limit to a 4 million weight unit limit — since witness data (typically a large share of a transaction's total bytes, given signatures are large relative to the rest of a typical transaction) now counts less, more total transactions fit within the same weight budget than would have fit under the old byte-based 1 MB limit, without directly touching the number "1 MB" as a literal, single value in the consensus rules — a technical design choice that was also, deliberately, part of how SegWit was structured as a soft fork (see [Soft Forks](../forks/soft-forks.md)) rather than a hard fork.

## SegWit as a soft fork

SegWit was deployed as a **soft fork**: witness data is placed in a part of the transaction that old, non-upgraded nodes simply don't parse or validate at all — to an old node, a SegWit transaction looks like an ordinary transaction with an empty (and therefore, under old rules, trivially "anyone can spend") scriptSig. This is possible specifically because SegWit outputs use a script pattern (`OP_0 <20-or-32-byte-hash>`) that old nodes treat as "anyone can spend" (**anyone-can-spend** meaning old nodes impose no restriction there, since the pattern doesn't match anything they recognize as needing a signature check) while upgraded nodes correctly enforce that only a valid witness satisfying that hash can actually spend it — meaning old, non-upgraded nodes remain able to see and relay SegWit transactions as valid (if permissive) without themselves being able to independently enforce the new witness-checking rules the way an upgraded node does. This soft-fork compatibility mechanism is examined more generally in [Soft Forks](../forks/soft-forks.md).

## Address formats: Bech32

SegWit introduced a new address encoding, **Bech32** (BIP 173), distinct from the Base58Check format covered in [P2PKH](./p2pkh.md#addresses-encoding-a-p2pkh-pubkeyhash-for-humans). Bech32 addresses (starting with `bc1` on mainnet) use an error-detecting code capable of catching essentially all common transcription mistakes (a stronger guarantee than Base58Check's checksum) and are case-insensitive, among other practical improvements — covered fully in [Addresses](../wallets/addresses.md).

## Common misconceptions

**SegWit is not "smaller blocks."** It changed *how* block capacity is measured (weight instead of raw byte size) and, as an effect of that change, increased practical capacity — describing it as a block size reduction, a framing used by some critics during the surrounding governance debate, inverts what actually happened to available transaction throughput.

**A SegWit transaction is not a "different kind of Bitcoin"** or a separate asset — it's an ordinary Bitcoin transaction using a newer, more efficient script format; SegWit and pre-SegWit transaction types coexist on the same chain and can freely pay each other.

## Further reading

- [BIP 141: Segregated Witness (Consensus layer)](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki)
- [BIP 173: Base32 address format for native v0-16 witness outputs](https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki)

---

[← Previous: P2SH](./p2sh.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Taproot →](./taproot.md)
