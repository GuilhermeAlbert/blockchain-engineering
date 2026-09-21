# Taproot

Taproot, activated in November 2021 via [BIPs 340, 341, and 342](https://github.com/bitcoin/bips), is Bitcoin's most recent major soft fork. It brought Schnorr signatures (see [Schnorr Signatures](../cryptography/schnorr.md)) into the base protocol, and — its headline feature — made complex spending conditions indistinguishable on-chain from simple, single-signature spends. This chapter covers how that indistinguishability actually works.

## The core idea: key-path and script-path spending

A Taproot output can be spent in one of two ways, and (this is the important part) **an outside observer generally cannot tell in advance which one a given spend will use, and after a key-path spend, cannot tell that a script-path option even existed**:

- **Key path**: spend directly with a single Schnorr signature from an "internal key" — indistinguishable from an ordinary single-signer payment.
- **Script path**: reveal one specific script from a pre-committed set of alternative spending conditions (built using a **Merkle tree of scripts**, called a "Taptree" — directly reusing the mechanism from [Merkle Trees](../cryptography/merkle-trees.md), applied here to spending conditions rather than transactions) and satisfy that specific script's conditions.

```text
Taproot output creation:
  internal key + Taptree (Merkle tree of alternative scripts, e.g.
    "2-of-3 multisig", "spendable by Bob alone after 1 year", etc.)
        │
        ▼  combined via a specific "tweaking" construction
  a single, ordinary-looking public key (the Taproot output key)

Spending, option A (key path):
  provide one Schnorr signature for the output key directly
  → looks identical to any other single-key Taproot spend

Spending, option B (script path):
  reveal ONE specific script from the Taptree, plus a Merkle
  proof that it's part of the committed tree, plus data
  satisfying that script
  → reveals only the ONE branch actually used, not the others
```

## Why this matters: privacy and cost

Before Taproot, a complex spending arrangement — a multisig wallet, a Lightning channel's cooperative-versus-uncooperative-close conditions, a time-locked inheritance plan — had to reveal its full script structure on-chain the moment it was spent (via [P2SH](./p2sh.md) or SegWit's script-hash equivalents), visibly marking that transaction as "not an ordinary single-signer spend" to anyone examining the blockchain. With Taproot, the common, cooperative case (key-path spending, which participants can generally agree to use whenever they *can* cooperate, even for an arrangement that also has more complex fallback conditions) looks exactly like an ordinary payment — smaller, cheaper, and not visibly distinguishable as having come from a complex, multi-party, or conditional setup at all. Only the uncommon case (an actual dispute or fallback requiring one specific script-path branch) reveals any of the underlying complexity, and even then, only the *one* branch actually used — not the other alternatives that were available but not needed.

## Schnorr's role

Taproot's key-path spending relies directly on [Schnorr signatures'](../cryptography/schnorr.md) linearity property: a Taproot output's internal key can itself be an aggregate of several participants' individual keys (via the MuSig family of protocols), meaning a genuine multi-party arrangement can, if all parties cooperate, produce a single, ordinary-looking Schnorr signature for the key-path spend — one signature, indistinguishable from a single signer, even though multiple parties actually authorized it together.

## Example: how the "tweak" works, conceptually

The construction that combines an internal key with a Taptree into one output key uses **elliptic curve point addition** (see [Elliptic Curves](../cryptography/elliptic-curves.md#point-addition-the-operation-that-makes-this-useful)): the output key is computed as the internal key plus (the generator point multiplied by a value derived from hashing the internal key together with the Taptree root). This is designed so that revealing the Taptree root and proving the tweak later (for a script-path spend) is possible, while someone who only ever sees the final output key, with no script-path spend ever occurring, has no way to tell whether a Taptree was committed at all, or what it might have contained.

## Taproot and Bitcoin Script

Taproot's script-path spending uses a new, related scripting context called **Tapscript** (BIP 342), a variant of ordinary [Bitcoin Script](./script.md) with some opcodes adjusted or added specifically for Taproot's needs (including reserving space for potential future opcodes without requiring another soft fork just to add them) — the underlying stack-machine execution model covered in [Bitcoin Script](./script.md) still applies; Tapscript is best understood as Script's rules adapted for this new context, not a wholesale replacement.

## Tradeoffs

Taproot's privacy and efficiency gains for complex spending arrangements come at the cost of real implementation and conceptual complexity — the internal key/Taptree tweaking construction, and the MuSig protocols needed to actually get multiple parties to cooperatively produce a single aggregate signature, are meaningfully more involved to implement correctly than simpler pre-Taproot multisig, and (as covered in [Schnorr Signatures](../cryptography/schnorr.md#tradeoffs)) the MuSig aggregation protocols themselves went through multiple revisions after their initial publication specifically because early versions had subtle security flaws in certain interaction patterns.

## Common misconceptions

**Taproot adoption is not universal or automatic** — it's an optional script type wallets and services choose to support and use; pre-Taproot script types (P2PKH, P2SH, pre-Taproot SegWit) remain fully valid and in active use, and Bitcoin does not force migration to newer formats.

**A Taproot key-path spend does not prove there was no script-path alternative available.** The entire point of the design is that key-path spends are indistinguishable from a simple single-key output whether or not a Taptree was ever committed — you cannot conclude "no complex conditions existed" just because a simple signature was used.

## Further reading

- [BIP 340: Schnorr Signatures for secp256k1](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki)
- [BIP 341: Taproot: SegWit version 1 spending rules](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki)
- [BIP 342: Validation of Taproot Scripts](https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki)

---

[← Previous: SegWit](./segwit.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Ordinals and Inscriptions →](./ordinals.md)
