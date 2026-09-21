# Protocol Upgrades

This chapter is a short bridge between the mechanical distinctions already covered ([soft forks](./soft-forks.md), [hard forks](./hard-forks.md), [backward compatibility](./backward-compatibility.md)) and the process chapters that follow ([BIPs](./bips.md), [Bitcoin Governance](./governance.md)): how does a proposed idea actually become a deployed protocol change, end to end?

## The general path

Bitcoin protocol changes generally move through a recognizable, if informal and not strictly enforced, sequence: an idea is discussed (often first on mailing lists or developer forums), formalized as a written proposal (a [BIP](./bips.md), for changes significant enough to warrant one), implemented and reviewed as actual code (typically in [Bitcoin Core](../bitcoin/bitcoin-core.md), though alternative implementations can also propose and implement changes), tested (on Bitcoin's public test networks, `testnet` and `signet`, which exist specifically to let developers and node operators try changes without risking real funds), and finally activated on the main network through whichever mechanism fits the change's compatibility profile — [miner signaling](./miner-signaling.md) for many soft forks, or a coordinated flag day for changes requiring broader coordination.

## No fixed release schedule or roadmap authority

Unlike software with a company behind it setting a roadmap, Bitcoin has no entity with the authority to schedule or guarantee when — or whether — any specific proposed change will actually activate. A change proceeds only as far as it earns actual, voluntary adoption from the specific parties whose cooperation it needs (miners for signaling-based activation, node operators broadly for the network to actually enforce new rules, and economically significant users and services for the change to matter in practice) — examined fully in [Bitcoin Governance](./governance.md), which covers exactly who has practical influence at each stage and why.

## Why some proposals never activate

Many BIPs and proposed changes are written, discussed, and never deployed — sometimes because consensus doesn't form around them, sometimes because a better alternative approach emerges during discussion, and sometimes because the ecosystem's priorities shift before implementation and testing complete. This is a normal, expected outcome of a process with no central authority who can simply decide a change should happen — it's a feature of the coordination model, not evidence of dysfunction, though it does mean protocol evolution can move considerably slower than a centrally-directed software project's release cycle might.

## Common misconceptions

**A published BIP is not the same as an adopted protocol change.** Many BIPs exist purely as documented proposals or even as rejected ideas, preserved for the historical record — a BIP number alone says nothing about whether the change it describes was ever implemented, let alone activated on mainnet.

**Bitcoin Core merging code implementing a proposal does not, by itself, activate a protocol change** for soft forks and hard forks that need broader network activation — the code needs to actually run on a sufficient share of the network and, depending on the specific activation mechanism, meet whatever threshold that mechanism requires, covered in [Miner Signaling](./miner-signaling.md).

## Further reading

- See also: [BIPs](./bips.md), [Bitcoin Governance](./governance.md)

---

[← Previous: Backward Compatibility](./backward-compatibility.md)
·
[Back to Forks and Protocol Upgrades](./README.md)
·
[Next: BIPs →](./bips.md)
