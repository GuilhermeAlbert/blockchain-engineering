# Backward Compatibility

This short chapter makes explicit a distinction [Soft Forks](./soft-forks.md) and [Hard Forks](./hard-forks.md) each depend on: what "backward compatible" precisely means in a consensus-rules context, and why it's a stricter, more specific claim than the same phrase means in ordinary software development.

## Backward compatibility, precisely defined here

In most software contexts, "backward compatible" means something like "old clients can still talk to the new system without breaking." In Bitcoin's consensus-rules context, it means something more exact: **old, non-upgraded nodes continue to accept every block that upgraded nodes consider valid, without requiring the old nodes to change anything about how they validate.** This is exactly the property [soft forks](./soft-forks.md#the-defining-property) are engineered to preserve, and exactly the property [hard forks](./hard-forks.md#the-defining-property) necessarily break.

## Why this specific definition matters

A change can be "backward compatible" in the loose, everyday sense (old wallet software can still construct and broadcast ordinary transactions after the change) while still being a hard fork in the strict consensus sense (old *node* software would reject some new-format blocks as invalid). These are genuinely different claims about genuinely different pieces of software. A wallet only needs to construct valid transactions; a full node needs to correctly validate every block and transaction against the complete, current rule set. Conflating "my wallet still works" with "the protocol change was backward compatible" is a common, understandable, but technically imprecise simplification.

## Example: why SegWit needed care here

[SegWit](../bitcoin/segwit.md#segwit-as-a-soft-fork) is instructive precisely because achieving true consensus-level backward compatibility required deliberate design work. It wasn't automatic. The specific script pattern SegWit outputs use (`OP_0 <hash>`) was chosen because old nodes already had defined, if permissive, behavior for it (treating it as anyone-can-spend), the SegWit authors didn't invent new backward compatibility from nothing; they found an existing gap in the old rules deliberately loose enough to build the new, tighter behavior inside it without old nodes needing to change anything.

## Common misconceptions

**Backward compatibility at the consensus level is not the same question as backward compatibility at the wallet, API, or user-experience level.** A change can satisfy one without satisfying the other, and this book's usage of "backward compatible" throughout the Forks section specifically means the consensus-rules sense unless stated otherwise.

## Further reading

- See also: [Soft Forks](./soft-forks.md), [Hard Forks](./hard-forks.md)

---

[← Previous: Hard Forks](./hard-forks.md)
·
[Back to Forks and Protocol Upgrades](./README.md)
·
[Next: Protocol Upgrades →](./upgrades.md)
