# Slashing

Slashing is Ethereum's mechanism for punishing provably, cryptographically demonstrable dishonest validator behavior, a portion of the offending validator's stake is destroyed, and they're forcibly removed from the validator set. This chapter covers exactly what behaviors trigger it, distinguishing slashing sharply from ordinary, much gentler penalties for simple inactivity.

## Slashable offenses, precisely

Ethereum defines exactly two categories of slashable behavior, both chosen specifically because they're **provable from cryptographic evidence alone**, no judgment call or dispute resolution process is needed, only a signed message proving the violation occurred:

- **Double proposal**: signing two different blocks for the same slot. This is directly analogous to the [nonce reuse](../cryptography/ecdsa.md#nonce-reuse-the-single-most-consequential-implementation-bug) problem covered in Cryptography, in spirit if not mechanism. A validator is only supposed to propose one block per assigned slot, and signing two conflicting ones is unambiguous, provable evidence of either malicious intent or a serious operational failure (most commonly, in practice, running the same validator key on two separate machines simultaneously by mistake).
- **Double voting / surround voting**: submitting two conflicting attestations for the same epoch, or submitting an attestation that "surrounds" (is inconsistent with, in a specific, formally defined way related to the range of epochs it votes are justified) an earlier attestation from the same validator.

## Why these specific behaviors, and not others

Both slashable offenses share a structural property: an honest, correctly functioning validator running a single, correctly configured instance of its client software **cannot** accidentally produce this evidence. It's not something that happens from being offline, being slow, or making an honest mistake in judgment about which chain to follow. This is precisely why slashing (a severe penalty, destroying real capital) is reserved for these narrow, cryptographically provable categories rather than applied to the much broader, more ordinary category of simply being offline or missing duties, that lesser failure mode incurs its own, much gentler **inactivity penalty** instead (small, continuous, and specifically not treated as equivalent to deliberate dishonesty).

## The actual penalty

A slashed validator loses a portion of their stake immediately, is placed into a forced exit process, and (critically) loses **more** if many other validators are slashed around the same time (a "correlation penalty," scaling the individual penalty up based on how much total stake was slashed in the surrounding time window). This correlation-scaling design is deliberate: it makes a **coordinated attack** by many validators simultaneously (the scenario actually threatening network security) dramatically more expensive per-validator than an isolated, one-off honest mistake by a single validator, which incurs only a comparatively small base penalty.

## Whistleblower incentive

Whoever submits the cryptographic proof of a slashable offense (a "whistleblower") receives a small reward for doing so, a direct, structural incentive ensuring provable misbehavior gets reported and penalized promptly rather than potentially going unnoticed, similar in spirit to how Bitcoin's proof-of-work-based security relies on economically motivated participants actively enforcing the rules rather than passive, unenforced rule-following.

## Common misconceptions

**Slashing is not a penalty for simply being offline or missing attestations**, that incurs a much smaller, separate inactivity penalty; slashing specifically and only applies to the two narrow, cryptographically provable categories of double-signing described above, a distinction this chapter's title deliberately keeps separate from ordinary validator downtime.

**A validator cannot be slashed for holding an opinion about which chain is correct**, or for any subjective judgment call. Every slashable offense requires unambiguous, cryptographic proof (two conflicting signed messages) that leaves no room for dispute about whether it occurred, by design.

## Further reading

- [Ethereum consensus specifications, slashing conditions](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#slashings)

---

[← Previous: Staking](./staking.md)
·
[Back to Ethereum](./README.md)
·
[Next: Finality →](./finality.md)
