# P2SH

Pay-to-Script-Hash, standardized in [BIP 16](https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki) and activated in 2012, lets an output be locked to the hash of an arbitrary script, with the actual script only revealed and executed when the output is spent. This chapter covers the mechanism and why it matters specifically for multisig, historically P2SH's dominant use case.

## The problem it solves

Before P2SH, a locking script had to contain the *entire* spending logic directly, for a 2-of-3 multisig output, this meant embedding all three public keys and the multisig-checking opcode directly in the output's scriptPubKey. This has two real costs: the **sender** creating the output pays for all that script data's weight (even though the recipient is the one who actually benefits from the multisig arrangement), and the sender needs to know and correctly construct the recipient's exact, potentially complex spending script in advance, impractical for anything beyond the simplest cases.

## How it works

A P2SH locking script is short and generic, regardless of how complex the actual spending logic is:

```text
OP_HASH160 <scriptHash> OP_EQUAL
```

Where `<scriptHash>` is `RIPEMD160(SHA256(redeemScript))`, a hash of the actual spending script (called the **redeem script**), which is *not* included in the output at all. To spend this output, the unlocking data must provide the redeem script itself, plus whatever data satisfies *that* script:

```text
<data satisfying the redeem script...> <serialized redeem script>
```

Execution happens in two stages: first, the outer P2SH check confirms the provided redeem script actually hashes to `<scriptHash>` (proving the spender isn't substituting a different script than what the output was really locked to); then, per BIP 16's special-cased rule, the redeem script itself is executed against the remaining stack data, exactly as if it had been the original locking script all along.

```text
Output creation (sender only needs to know the scriptHash, not the full logic):
  scriptPubKey: OP_HASH160 <scriptHash> OP_EQUAL

Spending (spender provides and reveals the actual logic):
  scriptSig: <sig1> <sig2> <redeemScript: OP_2 <pubA> <pubB> <pubC> OP_3 OP_CHECKMULTISIG>
                                            ↑ this is a 2-of-3 multisig script, only
                                              revealed now, at spend time
```

## Why this matters for multisig specifically

A sender paying into a 2-of-3 multisig P2SH address doesn't need to know anything about the multisig arrangement's internal details. They just need the P2SH address (a hash), exactly as simple to pay as an ordinary P2PKH address. All the complexity of "which three keys, and how many of them are required" stays hidden until spend time, and the cost of storing and validating that complexity is borne by the multisig participants when they actually spend the funds, not imposed on every sender who ever pays them. This is covered further, with the actual multisig script structure, in [Multisig](../wallets/multisig.md).

## P2SH-wrapped SegWit: a transitional pattern

When SegWit activated (2017, see [SegWit](./segwit.md)), older wallet and exchange software that didn't yet understand native SegWit addresses (bech32-encoded, starting with `bc1`) couldn't send funds directly to them. **P2SH-wrapped SegWit** addresses (starting with `3`, the standard P2SH address prefix) let a SegWit output be paid to using an ordinary-looking P2SH address, while the actual redeem script inside is a minimal SegWit program, giving SegWit's fee and functionality benefits some backward compatibility with software that hadn't yet added native SegWit support, at the cost of a small amount of extra data (the wrapping) compared to a fully native SegWit output.

## Tradeoffs

P2SH's flexibility (arbitrary redeem script complexity, revealed only at spend time) comes at a real, if usually modest, cost: the redeem script itself, once revealed, does count toward the spending transaction's size and fee, P2SH defers this cost to spend time rather than eliminating it, which is exactly the intended tradeoff (paid by whoever benefits from the complexity, at the time they actually use it, rather than by every sender up front).

## Common misconceptions

**P2SH addresses (starting with "3") are not inherently "multisig addresses."** P2SH can wrap any valid script. Multisig is its most common historical use, but P2SH-wrapped SegWit outputs (which aren't multisig at all) also use the same "3..." address format, meaning the address prefix alone doesn't tell you what spending logic is actually behind it.

**The redeem script is not visible on-chain until the output is spent.** Before spending, only its hash is public, a real, if modest, privacy benefit for complex spending arrangements that haven't yet been used.

## Further reading

- [BIP 16: Pay to Script Hash](https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki)

---

[← Previous: P2PKH](./p2pkh.md)
·
[Back to Bitcoin](./README.md)
·
[Next: SegWit →](./segwit.md)
