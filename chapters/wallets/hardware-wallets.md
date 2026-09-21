# Hardware Wallets

A hardware wallet is a physical device purpose-built to generate and hold private keys offline and sign transactions without ever exposing those keys to a connected computer or phone. This chapter covers the specific design properties that distinguish a hardware wallet from simply "cold storage in general" (covered in the previous chapter) and what a hardware wallet does and doesn't protect against.

## The core design goal: the private key never leaves the device

A hardware wallet's defining property is that the private key is generated on the device itself (using the device's own random number generator), stored in the device's secure memory, and **never transmitted off the device in any form** — not to the connected computer, not over USB, not anywhere. When a connected computer needs a transaction signed, it sends the unsigned transaction data to the device; the device signs it internally and returns only the signature, exactly the offline-signing pattern described generally in [Cold Storage](./cold-storage.md#the-core-technique-air-gapping-and-offline-signing), but implemented specifically and exclusively for this one purpose rather than as a general-purpose offline computer repurposed for it.

## Secure elements

Many hardware wallets use a **secure element** — a specialized, tamper-resistant chip (similar in category to the chips used in credit cards and passports) designed specifically to resist physical extraction attacks, including sophisticated ones involving decapping the chip and probing it directly. This is a meaningfully different, generally stronger hardware security guarantee than an ordinary general-purpose microcontroller offers against a well-resourced, physically-present attacker — though the specific security properties, and the tradeoffs of using a secure element's often-proprietary, closed-source firmware versus a more auditable but potentially less physically hardened open design, vary across different hardware wallet manufacturers and models, and this book does not endorse any specific product.

## Verifying transaction details on-device

A critical security property beyond just "the key never leaves": a well-designed hardware wallet displays the actual transaction details (recipient address, amount) on its **own physical screen**, separate from the connected computer's display, and requires physical confirmation (a button press) before signing. This specifically defends against malware on the connected computer that might alter a transaction's details after the user reviewed them on-screen but before signing — since the hardware wallet's own screen shows what it's actually about to sign, independent of anything the potentially-compromised connected computer displays. A hardware wallet without its own trusted display, or one whose display can't be relied on to show accurate transaction details, doesn't fully provide this specific protection even if its key-isolation is otherwise sound.

## What hardware wallets don't protect against

Hardware wallets are specifically designed against remote, software-based key extraction. They do **not**, by themselves, protect against: physical theft of the device combined with knowledge of its PIN (though most implement delays or wipe-after-failed-attempts protections against PIN brute-forcing), loss of both the device and its seed phrase backup, supply-chain attacks (a device tampered with before it reaches the buyer — which is why buying directly from the manufacturer and verifying device authenticity on first setup matters), or the user being socially engineered or coerced into approving a malicious transaction the device faithfully displays and the user approves anyway.

## Common misconceptions

**A hardware wallet does not store your bitcoin "on" the device** — like any wallet, it manages keys; the actual funds exist as UTXOs on the blockchain, exactly as covered in [Private Keys](./private-keys.md#what-a-wallet-actually-does-with-a-private-key). Losing or destroying a hardware wallet with no seed phrase backup means losing access to the keys, not "losing the coins stored inside it."

**Setting up a hardware wallet does not require trusting the manufacturer with your funds at any point** — the device generates keys locally and you're responsible for backing up the resulting seed phrase yourself; the manufacturer has no ongoing access to your keys or funds under normal, correctly-followed setup procedures.

## Further reading

- See also: [Cold Storage](./cold-storage.md), [Key Backup and Recovery](./recovery.md)

---

[← Previous: Cold Storage](./cold-storage.md)
·
[Back to Wallets and Key Management](./README.md)
·
[Next: Multisig →](./multisig.md)
