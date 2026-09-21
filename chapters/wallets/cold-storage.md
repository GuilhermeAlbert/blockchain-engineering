# Cold Storage

Cold storage keeps private keys entirely offline — never present, even momentarily, on any device connected to the internet. This chapter covers how that's actually achieved in practice (it's less exotic than it might sound) and what specific risks it does and doesn't address.

## The core technique: air-gapping and offline signing

A cold storage setup generates and holds private keys on a device that has never been, and will never be, connected to any network. Spending from cold storage requires an **offline signing** workflow: an unsigned transaction is created on a connected device, transferred to the offline device (via a QR code, a USB drive, or manually typed data — any channel that doesn't require the offline device itself to have network access), signed there using the offline private key, and the resulting signature transferred back to the connected device for broadcast. The private key itself never crosses back to the connected side — only the unsigned transaction goes one way, and the completed signature comes back.

```text
Connected device                      Offline device (cold storage)
  (has network access,          ──►    (never connects to any network,
   no private key)                      holds the private key)
        │                                       │
        │  1. build unsigned transaction        │
        └──────────────► QR code / USB ─────────┤
                                                  │  2. sign with offline private key
        ┌──────────────◄ QR code / USB ──────────┘
        │  3. broadcast the now-signed
        │     transaction to the network
```

## What cold storage protects against, and what it doesn't

Cold storage is specifically effective against **remote** attacks — malware, phishing, and network-based exploits that require reaching a device holding the key over a network connection (see [Private Key Theft](../security/private-key-theft.md)). It does **not**, by itself, protect against physical theft or destruction of the device or its backup, coercion of the holder, or simple loss (see [Lost Coins](../bitcoin/lost-coins.md)) — cold storage addresses one specific category of risk, and a complete security posture generally needs additional measures (physical security, backup redundancy across locations, and in some cases [multisig](./multisig.md)) to address the risks cold storage alone leaves open.

## Common cold storage implementations

- **Hardware wallets** (see [Hardware Wallets](./hardware-wallets.md)) — purpose-built devices designed specifically for offline key storage and signing, generally the most accessible and widely used cold storage method for individuals.
- **Paper wallets** — a private key (or seed phrase) printed or written on physical paper, historically common but now generally discouraged relative to hardware wallets, since paper offers no protection against physical damage, degradation, or being photographed/copied without the holder's knowledge, and generating one securely (without the generating device ever having been compromised or connected) is harder to verify than using a purpose-built hardware device.
- **Air-gapped general-purpose computers** — a permanently offline laptop or single-board computer running wallet software, used exclusively for offline signing — more flexible but requiring more technical care to set up and maintain correctly than a dedicated hardware wallet.

## Common misconceptions

**Cold storage is not a synonym for a hardware wallet specifically** — it's the general category (keys never touching a connected device); hardware wallets are the most common, but not the only, way to achieve it.

**"Offline" does not mean the signing device needs no interaction with the outside world at all** — data transfer via QR codes, USB drives, or manual entry is expected and necessary; what matters is that the device itself never establishes a network connection, not that it never exchanges any data whatsoever.

## Further reading

- See also: [Hardware Wallets](./hardware-wallets.md), [Hot Wallets](./hot-wallets.md), [Multisig](./multisig.md)

---

[← Previous: Hot Wallets](./hot-wallets.md)
·
[Back to Wallets and Key Management](./README.md)
·
[Next: Hardware Wallets →](./hardware-wallets.md)
