# ASICs

An ASIC (Application-Specific Integrated Circuit) is a chip designed and manufactured to do exactly one computation, extremely efficiently, and essentially nothing else. This chapter covers why Bitcoin mining moved from general-purpose hardware to ASICs, and what that shift means for who can realistically participate in mining today.

## The progression: CPU to GPU to FPGA to ASIC

Bitcoin's mining hardware evolved through a fairly clear progression in its first several years, each stage motivated by the same driver: SHA-256d hashing (see [SHA-256](../cryptography/sha-256.md#sha-256d-bitcoins-actual-choice)) is a simple, fixed, repetitive computation, and specialized hardware can perform it far more efficiently (in hashes computed per unit of energy) than general-purpose hardware designed to handle arbitrary software.

- **CPUs** (2009–2010): Bitcoin's original mining hardware, since anyone's ordinary computer could participate meaningfully when total network hash power was low.
- **GPUs** (2010 onward): graphics cards, designed for the highly parallel computations graphics rendering requires, turned out to also suit SHA-256d's parallelizable structure, offering a substantial efficiency jump over CPUs.
- **FPGAs** (briefly, around 2011): Field-Programmable Gate Arrays (reconfigurable chips that can be programmed, at a hardware level, to implement a specific circuit) offered another efficiency jump over GPUs, though FPGAs remained a relatively short-lived transitional technology.
- **ASICs** (2013 onward): purpose-built chips with the SHA-256d computation etched directly into silicon, offering orders-of-magnitude efficiency improvements over FPGAs, and rendering CPU and GPU mining permanently unprofitable for Bitcoin specifically (though GPUs remain useful for mining other cryptocurrencies using different, less ASIC-optimized proof-of-work functions, a design choice discussed further below).

## Why this happened: efficiency, measured in joules per hash

Mining profitability, as covered in [Mining](./mining.md#mining-economics), depends heavily on hash rate achieved per unit of electricity cost. A chip custom-designed for exactly one repetitive computation can be dramatically more energy-efficient at that specific task than a general-purpose processor carrying the overhead of supporting arbitrary, flexible instructions it doesn't need for this one job. Once ASICs existed and demonstrated this efficiency advantage, continuing to mine with CPUs or GPUs became economically irrational for Bitcoin specifically. The electricity cost per hash was simply too far above what ASIC-equipped competitors could achieve, pricing non-ASIC miners out of profitability entirely.

## What this means for mining accessibility

ASIC-based mining requires purchasing specialized hardware that has no general-purpose use, unlike a GPU, which retains resale value for gaming or other computing tasks even if mining becomes unprofitable, a Bitcoin ASIC's only real function is Bitcoin (or Bitcoin-compatible SHA-256d-based) mining. This raises the practical capital requirement and risk profile for entering mining meaningfully, compared to Bitcoin's earliest years when ordinary computers could participate, a real, documented shift in who can realistically compete, contributing to the mining-pool centralization dynamics discussed in [Mining Pools](./mining-pools.md#the-centralization-concern) and the broader decentralization tradeoffs in [Governance](../governance/README.md).

## Why some other cryptocurrencies deliberately resist ASICs

Some proof-of-work cryptocurrencies have deliberately chosen hash functions designed to be **memory-hard** (requiring large amounts of fast memory access, not just raw computation, in a way that's harder to gain the same order-of-magnitude efficiency advantage from specialized silicon for) specifically to keep mining more accessible to ordinary consumer hardware and resist the capital concentration ASICs can produce. This is a real, deliberate design tradeoff other projects have made differently than Bitcoin, not a mistake in Bitcoin's own design, but a different point in the same accessibility-versus-efficiency tradeoff space.

## Common misconceptions

**ASIC resistance is not a property Bitcoin's SHA-256d ever had or was designed to have.** Satoshi's original whitepaper and code anticipated ordinary CPU mining as the baseline case (see [Early Bitcoin History](../origins/early-bitcoin.md#early-mining)), but nothing in the protocol prevents more efficient specialized hardware from emerging over time. The shift to ASICs was a market response to profit incentives, not a violation of any original design intent stated anywhere in Bitcoin's founding documents.

**Owning an ASIC does not guarantee mining profitability.** Profitability depends on the ongoing relationship between the ASIC's efficiency, current electricity costs, current network difficulty, and current Bitcoin price. All of which change continuously, meaning even efficient, modern ASIC hardware can become unprofitable to operate under unfavorable conditions.

## Further reading

- See also: [Mining](./mining.md), [Hashrate](./hashrate.md), [Energy Consumption](./energy.md)

---

[← Previous: Mining Pools](./mining-pools.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Hashrate →](./hashrate.md)
