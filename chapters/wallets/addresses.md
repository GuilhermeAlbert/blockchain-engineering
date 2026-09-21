# Addresses

A Bitcoin address is a short, shareable string that tells the network where to send funds — but it is not itself a key, and it is not the same thing as a public key either, despite being derived from one. This chapter covers exactly what an address is, why it exists as a separate thing from a public key, and the three address formats in active use today.

## Why addresses exist at all, separately from public keys

As established in [ScriptPubKey and ScriptSig](../bitcoin/scripts.md#why-p2pk-gave-way-to-p2pkh), the earliest Bitcoin locking scripts (P2PK) embedded a full public key directly. Addresses exist because hashing the public key first — before it's ever revealed on-chain — provides real security value: an address reveals nothing about the underlying public key until the corresponding output is actually spent, closing off any possibility of attacking the public key (including, speculatively, via a future sufficiently powerful quantum computer, see [Elliptic Curves](../cryptography/elliptic-curves.md#scalar-multiplication-and-the-hard-problem)) before that point. An address is, mechanically, `hash(publicKey)`, encoded for human use — never the public key itself.

## The three formats in active use

| Format | Prefix (mainnet) | Underlying script type | Chapter |
| --- | --- | --- | --- |
| Base58Check | `1` | P2PKH | [P2PKH](../bitcoin/p2pkh.md) |
| Base58Check | `3` | P2SH (including P2SH-wrapped SegWit) | [P2SH](../bitcoin/p2sh.md) |
| Bech32 | `bc1q...` | Native SegWit (P2WPKH/P2WSH) | [SegWit](../bitcoin/segwit.md) |
| Bech32m | `bc1p...` | Taproot (P2TR) | [Taproot](../bitcoin/taproot.md) |

## Base58Check, precisely

Base58 uses a 58-character alphabet — the ordinary base62 alphanumeric set with `0` (zero), `O` (capital o), `I` (capital i), and `l` (lowercase L) deliberately removed, since these are easy to visually confuse, especially in handwritten or low-resolution-printed backups. **Base58Check** adds a version byte (identifying network and address type) and a 4-byte checksum, computed as the first four bytes of `SHA256(SHA256(versionByte + payload))`, appended before encoding — letting a wallet detect nearly every accidental typo or transcription error in an address before broadcasting funds to it, rather than silently sending to an unintended, likely-unspendable destination.

## Bech32 and Bech32m

[SegWit](../bitcoin/segwit.md#address-formats-bech32) introduced **Bech32** (BIP 173), a different encoding using a 32-character alphabet, entirely lowercase (or entirely uppercase — mixed case is explicitly rejected as invalid, which itself catches a class of transcription errors), and a mathematically stronger error-detection code than Base58Check's checksum, capable of both detecting and, for short error runs, identifying the specific character position likely mistyped. Taproot uses a refined variant, **Bech32m** (BIP 350), which fixes a subtle bug discovered in the original Bech32 specification that could, in rare cases, let certain errors go undetected specifically for longer encoded strings — Bech32m changes one constant in the checksum calculation to close this gap, which is why Taproot addresses use a `bc1p` prefix distinct from native SegWit's `bc1q`, making the two formats visually distinguishable at a glance.

## Example: deriving an address from a public key

```typescript
import { createHash } from "node:crypto";
import { secp256k1 } from "@noble/curves/secp256k1.js";
import { hexToBytes, bytesToHex } from "@noble/curves/utils.js";

function sha256(buf: Buffer): Buffer {
  return createHash("sha256").update(buf).digest();
}
function ripemd160(buf: Buffer): Buffer {
  return createHash("ripemd160").update(buf).digest();
}
function hash160(buf: Buffer): Buffer {
  return ripemd160(sha256(buf));
}

// A toy private key (the number 42) — for demonstration only, never real funds.
const privateKey = hexToBytes((42).toString(16).padStart(64, "0"));
const publicKey = secp256k1.getPublicKey(privateKey, true); // compressed

const pubKeyHash = hash160(Buffer.from(publicKey));
console.log("Public key (hex):", bytesToHex(publicKey));
console.log("Hash160 (the value a P2PKH address encodes):", pubKeyHash.toString("hex"));
```

Verified output from running this exact code:

```text
Public key (hex): 02fe8d1eb1bcb3432b1db5833ff5f2226d9cb5e65cee430558c18ed3a3c86ce1af
Hash160 (the value a P2PKH address encodes): 9290649ba520a35912dab1733b6f098587e432ef
```

A full Base58Check encoding implementation is left as the [Try It Yourself](#try-it-yourself) exercise below rather than included inline, to keep this example focused on the hashing step specifically.

## Tradeoffs

Deriving addresses from a hash rather than exposing the public key directly costs a small amount of extra computation (two additional hash operations) and a small amount of extra data in older, non-SegWit script types, in exchange for the security and privacy benefit of not revealing the public key until spend time — a tradeoff essentially every wallet and protocol designer since Bitcoin's earliest years has judged worthwhile, given how cheap hashing is relative to the benefit.

## Common misconceptions

**Reusing the same address for multiple incoming payments is not incorrect or invalid, but it does have a real privacy cost**, discussed in [Privacy](../society/privacy.md) — every transaction to or from that address becomes trivially linkable to every other one, which is why modern wallets generate a fresh address for each new transaction by default (see [HD Wallets](./hd-wallets.md)).

**An address is not "yours" in the way a bank account number is tied to your identity** — nothing in the address itself encodes who controls it; an address only becomes linked to a real-world identity through external information (KYC records at an exchange, for instance — see [KYC and AML](../society/kyc-aml.md)), not through anything in the Bitcoin protocol itself.

## Try it yourself

Extend the example above with a full Base58Check encoder (version byte `0x00` for mainnet P2PKH, plus the double-SHA256 checksum) to produce an actual, valid-format P2PKH address string from the computed hash160 value.

## Further reading

- [Bitcoin Core developer reference: Addresses](https://developer.bitcoin.org/devguide/wallets.html)
- [BIP 173: Base32 address format for native v0-16 witness outputs](https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki)
- [BIP 350: Bech32m format for v1+ witness addresses](https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki)

---

[← Previous: What Is a Wallet?](./README.md)
·
[Back to Wallets and Key Management](./README.md)
·
[Next: Private Keys →](./private-keys.md)
