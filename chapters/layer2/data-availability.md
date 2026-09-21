# Data Availability

Data availability is the guarantee that the raw data behind a rollup's transactions is actually, verifiably published somewhere anyone can retrieve it, not just referenced or summarized. This chapter covers why this specific property, distinct from correctness itself, is what a rollup's entire security model actually depends on.

## Why availability is a separate concern from correctness

A validity proof (see [Validity Proofs](./validity-proofs.md)) or a successfully unchallenged fraud-proof window (see [Fraud Proofs](./fraud-proofs.md)) tells you a state transition was computed correctly, given some batch of transaction data. Neither one, by itself, tells you that data was actually made available for anyone to check. A rollup operator could, in principle, publish only a commitment (a hash) to a batch's data, prove or claim that batch's execution was correct, and then simply withhold the actual underlying data. Nobody could verify the claim independently, reconstruct the rollup's state from scratch, or, critically, exit the rollup with their own correct balance if the operator later disappears or acts maliciously, because the information needed to do any of that was never actually published. This specific failure mode is called a **data availability problem**, and it's exactly why "publishes data to L1" is the defining property of a rollup, not an incidental detail.

## What "publish to L1" actually guarantees

When a rollup publishes its batch data to Ethereum L1, that data becomes part of Ethereum's own consensus-verified history: every Ethereum node that processes that block has access to it, at least for some retention period, which means the data genuinely was made available at the time of publication, verifiably, without trusting the rollup operator's word for it. This is why rollups specifically inherit meaningfully strong security from Ethereum: not just because Ethereum is the settlement layer verifying correctness, but because Ethereum is also where the underlying data actually gets made public, letting anyone reconstruct the rollup's state independently if they ever needed to.

## Why data availability used to be expensive, and what changed

Before Ethereum's Dencun upgrade in March 2024, rollups published their batch data as ordinary Ethereum calldata, a general-purpose transaction field that had to compete for space and pricing with every other kind of Ethereum transaction, and that every full node retains permanently as part of Ethereum's regular history. This made data availability the single largest cost component for most rollups. EIP-4844 introduced a dedicated, separately priced data type, blobs (covered fully in [Blobs](./blobs.md) and [EIP-4844](./eip-4844.md)), specifically designed to be cheap, plentiful, and only temporarily retained, since rollup data only needs to be available long enough for anyone who wants to verify or dispute it to actually do so, not permanently, the way Ethereum's own transaction history is.

## Common misconceptions

**Data availability is not the same guarantee as data correctness.** A rollup can make fully available data that turns out to describe an invalid state transition; availability and correctness are separately enforced, by different mechanisms (publication to L1, and fraud or validity proofs respectively), and both are required together for a rollup's full security model to hold.

**A sidechain publishing only an occasional state-root checkpoint to L1, without the underlying transaction data, does not have the same data availability guarantee a genuine rollup has.** Without the underlying data, nobody outside the sidechain's own operators can verify how that state root was actually reached, which is precisely the distinction [L1 vs. L2](./l1-vs-l2.md#not-every-l2-inherits-security-the-same-way) draws between a rollup and other L2 designs.

## Further reading

- [Ethereum.org: data availability](https://ethereum.org/en/developers/docs/data-availability/)
- See also: [Rollups](./rollups.md), [Blobs](./blobs.md), [EIP-4844](./eip-4844.md)

---

[← Previous: Sequencers](./sequencers.md)
·
[Back to Layer 2](./README.md)
·
[Next: Blobs →](./blobs.md)
