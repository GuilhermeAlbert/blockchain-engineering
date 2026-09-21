# Bitcoin Rollup Proposals

Ethereum's rollup ecosystem, covered fully in [Layer 2](../layer-2/README.md), is mature, extensively deployed, and processes real, substantial transaction volume. Bitcoin has no comparably mature, deployed rollup ecosystem. This chapter covers why the two ecosystems differ so much on this specific point, and the general shape of the proposals attempting to close the gap.

## Why rollups are harder to build on Bitcoin

An Ethereum rollup (see [Rollups](../layer-2/rollups.md)) fundamentally depends on the base layer being able to **verify a proof or arbitrate a fraud claim** about off-chain computation, Ethereum's account-based state model and Turing-complete EVM (see [The EVM](../evm/README.md)) make this a natural fit, since a rollup's on-chain verifier contract can be an ordinary, if specialized, smart contract. Bitcoin's deliberately non-Turing-complete [Script](../bitcoin/script.md#the-design-a-stack-machine-deliberately-not-turing-complete) was never designed to support this kind of general-purpose on-chain verification logic, which is precisely why building a genuine, trust-minimized rollup (one where Bitcoin's own base layer can independently verify a validity proof or adjudicate a fraud proof, the same way an Ethereum rollup's L1 contract does) is a substantially harder, still largely unsolved engineering problem on Bitcoin as of this writing.

## BitVM: the most significant current proposal

**BitVM**, proposed by Robin Linus and collaborators in 2023, is the most significant recent attempt to bring rollup-like, fraud-proof-based verification to Bitcoin without requiring any change to Bitcoin's own consensus rules. Its core insight: rather than trying to make Bitcoin Script directly execute arbitrary computation, BitVM encodes a computation as a large circuit of logic gates, commits to that circuit using Bitcoin Script and Taproot's script-path capabilities, and (critically) only requires the *specific, disputed part* of the circuit to actually be revealed and checked on-chain, in an interactive fraud-proof-style challenge process between two committed parties, similar in spirit to the fraud-proof mechanism [Optimistic Rollups](../layer-2/optimistic-rollups.md) use on Ethereum, but adapted to work within Bitcoin Script's much more limited capabilities. This lets Bitcoin verify that *a specific step* of an off-chain computation was done incorrectly, without Bitcoin ever needing to natively execute or understand the full computation itself.

## What BitVM does and doesn't provide, as of this writing

BitVM-based designs are generally structured as **optimistic** systems: they assume off-chain computation was performed honestly unless specifically challenged, and they require at least one honest, economically motivated party willing and able to detect and challenge fraud within a defined window, the same general "1-of-N honest watcher" trust assumption optimistic rollups on Ethereum rely on (see [Optimistic Rollups](../layer-2/optimistic-rollups.md#the-trust-assumption)). As of this writing, BitVM-based systems remain in comparatively early stages of development and real-world deployment relative to Ethereum's mature rollup ecosystem, the core cryptographic and engineering ideas are published and under active development, but production systems processing significant real value are considerably less established than, say, Arbitrum or Optimism on Ethereum. TODO: update this chapter's characterization of BitVM's deployment maturity as the technology develops, since this is an actively, rapidly evolving area more than most of this book's other subjects.

## Why this matters for how you should read Bitcoin scaling claims

Given how much more established Ethereum's rollup ecosystem is, claims of "Bitcoin rollups" or "Bitcoin Layer 2s" should be read carefully and specifically, checking whether a given project provides genuine, base-layer-enforced trust-minimization (the way an Ethereum rollup's on-chain verifier does) or whether it's closer to the [federated sidechain](./federations.md) or [statechain](./statechains.md) trust models covered earlier in this section, which offer real, useful properties but meaningfully different, generally weaker trust guarantees than the term "rollup," borrowed directly from Ethereum's much more established terminology, might imply to a reader already familiar with that term's Ethereum meaning.

## Common misconceptions

**"Bitcoin Layer 2" is not a single, well-defined technical category the way "Ethereum rollup" has become**. It's used, sometimes loosely, to describe a wide range of systems with genuinely different trust models (Lightning, federated sidechains, statechains, and emerging fraud-proof systems like BitVM), and this book's own use of "Layer 2" throughout is scoped carefully to specify which of these it actually means in context, rather than treating the term as carrying one consistent, precise meaning across the whole ecosystem.

**BitVM is not a soft fork, hard fork, or any kind of change to Bitcoin's own consensus rules**. It's a clever construction built entirely using Bitcoin Script and Taproot capabilities that already exist on Bitcoin's mainnet today, which is precisely the design constraint that made it worth building this way in the first place.

## Further reading

- [BitVM: Compute Anything on Bitcoin](https://bitvm.org/bitvm.pdf): Robin Linus, 2023
- See also: [Layer 2](../layer-2/README.md), [Optimistic Rollups](../layer-2/optimistic-rollups.md)

---

[← Previous: RGB](./rgb.md)
·
[Back to Bitcoin Scaling](./README.md)
·
[Next: Payment Channels →](../lightning/payment-channels.md)
