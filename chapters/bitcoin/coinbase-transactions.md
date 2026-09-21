# Coinbase Transactions

Every block's first transaction is special: it creates new bitcoin from nothing and pays it to whoever mined the block. This chapter covers exactly how a coinbase transaction differs structurally from an ordinary transaction, and the specific technical details (the extranonce field, the embedded data) that give it functions beyond simple reward payment.

## What makes it different

An ordinary transaction's inputs reference real, previously created UTXOs. A coinbase transaction's single input instead references a **null previous output** (a previous transaction hash of all zeros and an output index of `0xffffffff`) since there's nothing being spent; the value is created directly by protocol rule, not transferred from an existing output. In place of a normal unlocking script, the coinbase input's script field holds **arbitrary data**, up to a size limit (100 bytes, per consensus rules), that the miner can set to whatever it wants.

```text
Ordinary transaction input:              Coinbase transaction input:
  previousTxId: <real tx hash>              previousTxId: 0000...0000 (null)
  previousOutputIndex: <real index>          previousOutputIndex: 0xffffffff
  scriptSig: <signature + pubkey>            coinbase data: <arbitrary, up to 100 bytes>
```

## What the reward amount is, and how it's checked

The coinbase transaction's output(s) can total up to the current **block subsidy** (the newly issued reward, per the [halving schedule](./halving.md)) **plus the sum of every included transaction's fees**, but not more. This is a consensus rule every full node checks: a coinbase transaction claiming more than `subsidy + total fees` makes the entire block invalid, rejected by every honest node, regardless of the block's proof-of-work. A miner is free to claim *less* than the maximum (effectively donating the difference, which nobody does in practice) but never more.

## Common uses of the embedded data field

Beyond the historically significant example in the [genesis block](../origins/genesis-block.md#the-embedded-message), the coinbase data field serves ongoing, practical purposes:

- **Extranonce**: as covered in [Block Headers](../blockchain/block-headers.md#the-nonce-problem-and-extranonce), miners vary data in this field to extend their effective proof-of-work search space beyond the header's own 4-byte nonce field.
- **BIP 34 block height**: since BIP 34 (activated 2013), the coinbase data must include the block's height as its first element, a consensus rule specifically added to guarantee every coinbase transaction (and therefore every block) produces a unique transaction hash, closing a subtle vulnerability where two different blocks at different heights could otherwise theoretically produce identical coinbase transactions.
- **Mining pool signatures/tags**: many mining pools embed a short identifying string in this field, which is how public block-by-block mining pool attribution (visible on block explorers) is actually determined, not from any formal registration, but from pools voluntarily tagging their own blocks.
- **Miner signaling**: historically used for signaling readiness for proposed protocol upgrades (see [Miner Signaling](../forks/miner-signaling.md) and [BIP 9](../forks/README.md)).

## The maturity rule

Coinbase outputs cannot be spent until **100 blocks** have been mined on top of the block containing them, a consensus rule (distinct from ordinary confirmation-count risk judgments covered in [Transaction Confirmation](./confirmation.md)) specifically protecting against a scenario where a miner spends freshly minted coins immediately, only for the block that created them to later be orphaned in a reorg (see [Chain Reorganizations](../blockchain/reorgs.md)), which would retroactively make those spent coins never have existed. Waiting 100 blocks makes this scenario astronomically unlikely given Bitcoin's actual historical reorg depth, per the same math covered in [Probabilistic Finality](../distributed-systems/probabilistic-finality.md).

## Common misconceptions

**A coinbase transaction is not named after the Coinbase company**, the terminology (from "coin base," the transaction that establishes the base/origin of new coins) predates the company, which took its name from the pre-existing Bitcoin term, not the other way around.

**The embedded coinbase data field is not free-form for any purpose whatsoever**. It's limited to 100 bytes, and since BIP 34, its first bytes must correctly encode the block's height, meaning it's not fully arbitrary even though a meaningful portion of it remains available for miners to use as they choose.

## Further reading

- [BIP 34: Block v2, Height in Coinbase](https://github.com/bitcoin/bips/blob/master/bip-0034.mediawiki)
- [Bitcoin Core developer reference: Transactions](https://developer.bitcoin.org/reference/transactions.html)

---

[← Previous: Transaction Confirmation](./confirmation.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Bitcoin Script →](./script.md)
