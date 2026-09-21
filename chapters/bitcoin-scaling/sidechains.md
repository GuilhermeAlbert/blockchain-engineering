# Sidechains

A sidechain is a separate blockchain, running its own consensus rules, connected to Bitcoin through a mechanism that lets bitcoin move between the two chains. This chapter covers the general concept; [Liquid Network](./liquid.md), [Federations](./federations.md), and [Statechains](./statechains.md) cover specific, real implementations and variants built on this idea.

## The core idea

A sidechain lets developers experiment with features Bitcoin's own base-layer consensus rules don't support — faster block times, different privacy properties, smart-contract functionality — without needing those changes to go through Bitcoin's own, deliberately conservative [governance process](../forks/governance.md), and without putting Bitcoin's base-layer security directly at risk from the sidechain's own, potentially less battle-tested code. Users move bitcoin onto a sidechain (a "peg-in"), transact under the sidechain's own rules, and can move value back (a "peg-out") when done.

## The peg mechanism

The general pattern: bitcoin sent to a specific, sidechain-controlled Bitcoin address is locked on the Bitcoin base layer, and an equivalent amount of a sidechain-native representation is issued on the sidechain. Moving back requires the reverse: burning or locking the sidechain-native tokens, then releasing the corresponding locked bitcoin on the base layer. Exactly *who or what* controls the locked bitcoin during this process, and how peg-outs are authorized, is the single most consequential design decision for any sidechain — it directly determines the sidechain's actual trust model, regardless of how the sidechain's own internal consensus works.

```text
Bitcoin base layer                    Sidechain
  Alice's BTC ──► locked in a    ──►    equivalent tokens
                  peg address           issued to Alice
                       ▲                       │
                       │                       │
                       └── released when ◄─────┘
                           peg-out is
                           authorized
```

## The trust spectrum

Sidechains vary enormously in how peg-outs are authorized, and this variation is the central axis on which they should be evaluated:

- **Federated sidechains** (see [Federations](./federations.md)) rely on a known, fixed set of "functionaries" or "watchmen" to collectively authorize peg-outs — a meaningfully more centralized trust model than Bitcoin's own permissionless consensus, since it requires trusting that federation members won't collude to steal locked funds.
- **Drivechains** (a proposed, not yet deployed on Bitcoin mainnet, design) would instead have Bitcoin miners themselves vote on peg-out validity through an extended block-header signaling mechanism — a different trust model, shifting reliance onto Bitcoin's existing miner set rather than a separate federation, with its own distinct, debated tradeoffs that have not achieved the consensus needed for actual deployment as of this writing.

## Why this trust question matters so much

A sidechain's own internal consensus can be as decentralized and secure as its designers choose to make it, but the **peg** is where a sidechain's security guarantee is actually bounded — if the entity or mechanism controlling peg-outs can be compromised or can act dishonestly, funds locked on the Bitcoin side are at risk regardless of how well the sidechain itself otherwise operates. This is why sidechain security claims should always be evaluated specifically at the peg mechanism, not just at the sidechain's own consensus design — a distinction this section's specific case studies (Liquid, statechains) return to directly.

## Common misconceptions

**A sidechain is not the same thing as a Layer 2 rollup** in the sense covered in [Layer 2](../layer-2/README.md) — a sidechain runs its own, independent consensus mechanism and doesn't inherit its security directly from the base chain the way a rollup's validity or fraud proofs tie its state back to the settlement layer; a sidechain's security is a separate question from Bitcoin's own security, connected only through the peg.

**Bitcoin locked in a sidechain peg is not literally the same bitcoin actively circulating on Bitcoin's base layer during that time** — it's locked, illiquid on the base layer, and represented by a sidechain-native token until a peg-out completes; conflating the two overstates how directly a sidechain "extends" Bitcoin's own base-layer security.

## Further reading

- See also: [Liquid Network](./liquid.md), [Federations](./federations.md), [Bitcoin Rollup Proposals](./rollups.md)

---

[← Previous: Payment Channels](./payment-channels.md)
·
[Back to Bitcoin Scaling](./README.md)
·
[Next: Liquid Network →](./liquid.md)
