# Multisig

A multisig ("multi-signature") wallet requires more than one private key to authorize spending, for example, any 2 of 3 designated keys, rather than a single key alone. This chapter covers the two structurally different ways Bitcoin implements this (pre-Taproot script-based multisig, and Taproot's key-aggregation approach) and the concrete problems multisig actually solves.

## The problem multisig solves

A single private key is a **single point of failure**: lose it, and funds are gone forever (see [Lost Coins](../bitcoin/lost-coins.md)); have it stolen, and funds are gone to the thief, with no recourse. Multisig distributes this risk: with a 2-of-3 setup, losing any *one* of the three keys doesn't lose access to funds (the other two can still authorize spending), and a thief stealing any *one* key doesn't gain the ability to spend anything (they'd need a second key too). This makes multisig a genuine, structural risk-reduction tool, not merely a inconvenience-adding security theater. It changes what failure modes actually threaten the funds.

## Pre-Taproot: OP_CHECKMULTISIG and P2SH

Bitcoin's original multisig mechanism uses the `OP_CHECKMULTISIG` opcode directly, typically wrapped in [P2SH](../bitcoin/p2sh.md) so the sender only needs to know the resulting script hash, not the full multisig arrangement:

```text
Redeem script for a 2-of-3 multisig:
  OP_2 <pubkeyA> <pubkeyB> <pubkeyC> OP_3 OP_CHECKMULTISIG

Spending requires providing signatures from any 2 of the 3 corresponding
private keys, in the same relative order the public keys appear in the
script, plus the redeem script itself, per the P2SH pattern covered in
chapters/bitcoin/p2sh.md.
```

This is visible on-chain at spend time as exactly what it is, a multisig transaction, larger and more expensive (in fees) than an ordinary single-signature spend, because it needs to include multiple full signatures.

## Taproot: aggregated signatures

[Taproot](../bitcoin/taproot.md#why-this-matters-privacy-and-cost) changes this picture substantially. Using [Schnorr signature aggregation](../cryptography/schnorr.md#why-bitcoin-adopted-it-linearity) via the MuSig family of protocols, several participants can cooperatively produce a **single** Schnorr signature that a single, ordinary-looking Taproot output accepts, indistinguishable on-chain from a single-signer spend, both in privacy (no visible sign that multiple parties were involved) and in cost (one signature's worth of data, not several). If cooperation fails, Taproot's script-path spending (also covered in [Taproot](../bitcoin/taproot.md#the-core-idea-key-path-and-script-path-spending)) can fall back to a pre-committed, more traditional multisig-style script as a backup condition.

## Common multisig configurations and their purposes

- **2-of-2**: often used for payment channels (see [Lightning Network](../lightning/README.md)) or joint accounts requiring both parties' agreement for every spend.
- **2-of-3**: a common personal or small-organization setup, two keys held by the primary owner (perhaps a hardware wallet and a separate backup), one held by a trusted third party or backup location, so losing any single key doesn't lock out funds, and no single compromised key can steal them.
- **Larger M-of-N** (3-of-5, 4-of-7, and so on): typical for organizational treasuries, requiring a meaningful quorum of geographically or organizationally distributed key holders to agree before funds move, directly reducing the risk of a single compromised or coerced individual moving funds unilaterally.

## Tradeoffs

Multisig meaningfully reduces single-point-of-failure risk, at real costs: more complex setup and backup procedures (each key needs its own secure backup, and the specific multisig configuration itself (which public keys, what threshold) also needs to be reliably recorded, or funds become unrecoverable even with enough correct individual keys in hand), higher transaction fees for pre-Taproot multisig spends, and genuine coordination overhead when multiple, possibly geographically separated key holders need to cooperate to authorize a transaction.

## Common misconceptions

**Multisig is not the same thing as a [hardware wallet](./hardware-wallets.md).** A hardware wallet secures a single key; multisig is a policy about how many separate keys are required to spend, and any of those keys (including ones held on hardware wallets) can individually be single-signature keys that only become part of a multisig arrangement when combined with the others in a specific script or aggregated signature.

**Forgetting the specific multisig configuration (which keys, what threshold) is just as unrecoverable as losing a key itself**, having 2 of 3 required keys is useless if you don't know it was originally a 2-of-3 setup involving those specific three public keys in that specific order, which is why documenting the full setup (not just backing up individual keys) matters for multisig specifically, discussed further in [Key Backup and Recovery](./recovery.md).

## Further reading

- [BIP 11: M-of-N Standard Transactions](https://github.com/bitcoin/bips/blob/master/bip-0011.mediawiki)
- See also: [P2SH](../bitcoin/p2sh.md), [Taproot](../bitcoin/taproot.md), [Schnorr Signatures](../cryptography/schnorr.md)

---

[← Previous: Hardware Wallets](./hardware-wallets.md)
·
[Back to Wallets and Key Management](./README.md)
·
[Next: Custodial vs Non-Custodial Wallets →](./custody.md)
