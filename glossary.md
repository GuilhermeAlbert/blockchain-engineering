# Glossary

Concise definitions for terms used throughout the book. Each entry links to the chapter that covers it in depth — read the entry here for a quick reminder, read the linked chapter for the mechanism.

This glossary grows alongside the book. If a term you expected is missing, the chapter that defines it may not be written yet — check [PROGRESS.md](./PROGRESS.md).

## A

**ASIC** — Application-Specific Integrated Circuit; a chip designed to do exactly one computation (SHA-256d hashing, for Bitcoin) extremely efficiently. See [ASICs](./chapters/bitcoin/asics.md).

**Address** — A string derived from a public key (through hashing and encoding) that identifies where funds can be sent. Not itself a key. See [Addresses](./chapters/wallets/addresses.md).

**Austrian economics** — An economic school founded by Carl Menger, developed further by Ludwig von Mises, Friedrich Hayek, and Murray Rothbard, emphasizing spontaneous market order and skepticism of centrally managed money. See [Money and Economics](./chapters/economics/README.md#austrian-economics).

## B

**Block reward / subsidy** — The newly created bitcoin a miner receives for a block, separate from transaction fees. Halves every 210,000 blocks. See [Block Rewards](./chapters/bitcoin/block-rewards.md).

**Byzantine fault** — A failure mode where a system component behaves arbitrarily or maliciously, potentially sending contradictory information to different peers, rather than simply stopping. See [Byzantine Faults](./chapters/distributed-systems/byzantine-faults.md).

**Bit Gold** — Nick Szabo's 1998 proposal for digital scarcity based on chained proof-of-work solutions. Never implemented. See [Bit Gold](./chapters/origins/bit-gold.md).

**b-money** — Wei Dai's 1998 proposal for decentralized digital cash, cited in the Bitcoin whitepaper. Never implemented. See [b-money](./chapters/origins/b-money.md).

**Blind signature** — A cryptographic technique that lets a signer sign a message without seeing its contents, used in David Chaum's DigiCash to give digital cash unlinkable privacy. See [David Chaum and DigiCash](./chapters/origins/digicash.md).

**Block height** — A block's position in the chain, counted from the genesis block at height 0. See [Block Height](./chapters/blockchain/block-height.md).

**Block** — A batch of transactions bundled together, hashed, and linked to the previous block, forming the blockchain. See [Blocks](./chapters/blockchain/blocks.md).

## C

**Cold storage** — Keeping private keys entirely offline, never present on any internet-connected device. See [Cold Storage](./chapters/wallets/cold-storage.md).

**Custodial wallet** — A wallet where a third party holds the private keys on the user's behalf. See [Custodial vs Non-Custodial Wallets](./chapters/wallets/custody.md).

**Collision (hash)** — Two different inputs that produce the same hash output. Must exist mathematically for any hash function; security depends on nobody being able to find one. See [Hash Collisions](./chapters/cryptography/collisions.md).

**Consensus** — The general problem of getting multiple independent, possibly-adversarial parties to agree on a single value or history. See [Consensus](./chapters/distributed-systems/consensus.md).

**Commitment scheme** — A way to lock in a hidden value now and reveal it later, without being able to change it after the fact. See [Commitments](./chapters/cryptography/commitments.md).

**Cantillon effect** — The uneven, sequential impact of new money entering an economy: those who receive it first benefit at the expense of those who receive it last, after prices have adjusted. See [The Cantillon Effect](./chapters/economics/cantillon-effect.md).

**Central bank** — The institution responsible for managing a currency's money supply and, typically, for supervising the banking system and acting as lender of last resort. See [Central Banking](./chapters/economics/central-banking.md).

**Chain reorganization ("reorg")** — When a node switches from one version of the recent chain to a different, competing version it now considers more valid. See [Chain Reorganizations](./chapters/blockchain/reorgs.md).

**Confirmation** — How many blocks have been mined on top of the block containing a given transaction; a rough, growing measure of how unlikely that transaction is to be reversed. See [Probabilistic Finality](./chapters/distributed-systems/probabilistic-finality.md).

**Consensus rules** — Validity conditions enforced by every node; violating one makes a block or transaction invalid network-wide, unlike a local policy rule. See [Consensus Rules](./chapters/blockchain/consensus-rules.md).

**Coinbase transaction** — The special first transaction in a block, which creates new coins and pays them to the block's creator, rather than spending existing coins. See [Coinbase Transactions](./chapters/bitcoin/coinbase-transactions.md).

**Commodity money** — Money whose value derives from a physical good with non-monetary uses, such as gold or silver. See [Commodity Money](./chapters/economics/commodity-money.md).

**Cypherpunk** — A participant in the cryptography- and privacy-focused mailing list and movement active from 1992 onward, whose members included several of Bitcoin's direct intellectual predecessors. See [The Cypherpunk Movement](./chapters/origins/cypherpunks.md).

## D

**Decimals** — An ERC-20 display convention (not a protocol rule) specifying how many places to divide a raw token balance by for human-readable display; USDC uses 6, most tokens use 18. See [Balances](./chapters/tokens/balances.md).

**Difficulty** — A normalized measure of how hard it currently is to find a valid block hash, expressed relative to Bitcoin's easiest-ever target. See [Mining Difficulty](./chapters/bitcoin/difficulty.md).

**Digital signature** — Cryptographic proof that a private key holder authorized a specific message, verifiable by anyone with the public key. See [Digital Signatures](./chapters/cryptography/digital-signatures.md).

**Deflation** — A sustained fall in the general price level, meaning a currency's purchasing power rises over time. See [Inflation and Deflation](./chapters/economics/inflation-and-deflation.md).

**Double-spending** — The problem of a digital unit of value being spent more than once, since digital data can be copied. The central problem Bitcoin's design solves without a trusted third party. See [Why Digital Cash Was Hard](./chapters/origins/digital-cash.md).

## E

**EOA (Externally Owned Account)** — An Ethereum account controlled by a private key, as opposed to a contract account. See [Externally Owned Accounts](./chapters/ethereum/eoa.md).

**ECDSA** — Elliptic Curve Digital Signature Algorithm. Bitcoin's original signature scheme, still the most widely used. See [ECDSA](./chapters/cryptography/ecdsa.md).

**Elliptic curve** — A curve of the form y² = x³ + ax + b over a finite field, used as the mathematical basis for Bitcoin and Ethereum's keys and signatures. See [Elliptic Curves](./chapters/cryptography/elliptic-curves.md).

**EIP-712** — A standard for structured, human-readable typed-data signatures, with a domain separator preventing cross-application replay. See [Typed Data and EIP-712](./chapters/web3/eip-712.md).

## E (continued)

**EVM (Ethereum Virtual Machine)** — The stack-based, Turing-complete virtual machine that executes contract bytecode. See [The EVM](./chapters/evm/README.md).

## F

**Finality** — The property of a transaction or block becoming permanent and irreversible; deterministic, probabilistic, or economic depending on the consensus mechanism. See [Finality](./chapters/distributed-systems/finality.md).

**Fiat money** — Currency with value derived from legal tender laws and institutional credibility rather than a commodity backing. See [Fiat Money](./chapters/economics/fiat-money.md).

**Fractional reserve banking** — A banking system in which banks hold only a fraction of deposits as reserves, lending out the rest. See [Banking and Credit](./chapters/economics/banking-and-credit.md).

## G

**Gas** — Ethereum's unit for metering computational work; every EVM operation costs a fixed amount, bounding execution of an otherwise Turing-complete virtual machine. See [Gas](./chapters/ethereum/gas.md).

**Genesis block** — Block 0, the first block in the Bitcoin blockchain, mined by Satoshi Nakamoto on January 3, 2009, and hardcoded into the client software rather than discovered through normal validation. See [The Genesis Block](./chapters/origins/genesis-block.md).

**Gold standard** — A monetary system in which a currency's value is formally defined as, and redeemable for, a fixed quantity of gold. See [Commodity Money](./chapters/economics/commodity-money.md).

## H

**Hard fork** — A protocol rule change incompatible with old software; requires every node to upgrade or risk a permanent chain split. See [Hard Forks](./chapters/forks/hard-forks.md).

**HD wallet (Hierarchical Deterministic)** — A wallet that derives an entire tree of keys from a single seed, standardized by BIP-32. See [HD Wallets](./chapters/wallets/hd-wallets.md).

**Hot wallet** — A wallet whose private keys are ever present on an internet-connected device. See [Hot Wallets](./chapters/wallets/hot-wallets.md).

**Halving** — The event, every 210,000 blocks (roughly four years), when Bitcoin's block subsidy cuts in half. See [The Halving](./chapters/bitcoin/halving.md).

**HTLC (Hashed Timelock Contract)** — A conditional payment that combines a hash lock and a timelock, enabling trust-minimized multi-hop routing on the Lightning Network. See [HTLCs](./chapters/lightning/htlcs.md).

**Hash function** — A function mapping arbitrary-size input to fixed-size output, deterministically and unpredictably. See [Hash Functions](./chapters/cryptography/hashes.md).

**Hard money** — A currency whose supply is difficult or slow to expand. See [Hard Money and Sound Money](./chapters/economics/sound-money.md).

**Hashcash** — Adam Back's 1997 anti-spam system using proof-of-work, cited directly in the Bitcoin whitepaper as the model for Bitcoin's mining puzzle. See [Hashcash](./chapters/origins/hashcash.md).

## I

**Inflation** — A sustained rise in the general price level, meaning a currency's purchasing power falls over time. See [Inflation and Deflation](./chapters/economics/inflation-and-deflation.md).

## L

**Lightning Network** — A network of bidirectional Bitcoin payment channels connected via HTLCs, enabling fast, low-fee off-chain payments settled periodically on-chain. See [Lightning Network](./chapters/lightning/README.md).

## M

**Multisig** — A wallet requiring more than one private key to authorize spending. See [Multisig](./chapters/wallets/multisig.md).

**Mempool** — The set of valid, unconfirmed transactions a node currently knows about and is prepared to relay or mine. Local to each node, not a single global list. See [The Mempool](./chapters/bitcoin/mempool.md).

**Mining** — Competing to create new blocks by searching for valid proof-of-work. See [Mining](./chapters/bitcoin/mining.md).

**Merkle proof** — A small set of sibling hashes proving a specific item's inclusion in a Merkle tree, without needing the full dataset. See [Merkle Proofs](./chapters/cryptography/merkle-proofs.md).

**Merkle root** — The single hash at the top of a Merkle tree, summarizing an entire dataset. See [Merkle Trees](./chapters/cryptography/merkle-trees.md).

**Merkle tree** — A tree of hashes that summarizes a large dataset into one root hash, enabling compact inclusion proofs. See [Merkle Trees](./chapters/cryptography/merkle-trees.md).

**Medium of exchange** — A function of money: something widely accepted in trade, avoiding the need for a double coincidence of wants. See [Functions of Money](./chapters/economics/functions-of-money.md).

**Monetary policy** — Actions a central bank takes to influence the money supply, interest rates, and credit conditions. See [Monetary Policy](./chapters/economics/monetary-policy.md).

**Money supply** — The total quantity of money in an economy, measured in tiers (M0, M1, M2) by liquidity. See [Money Supply](./chapters/economics/money-supply.md).

## N

**Nonce** — A 4-byte block header field miners vary while searching for a valid proof-of-work hash; also, in ECDSA, the random or deterministic value used in each signature. See [Nonce](./chapters/bitcoin/nonce.md).

**Network effect** — A property where a good becomes more valuable to each user as more people use it; money is a network good. See [Network Effects in Money](./chapters/economics/network-effects.md).

## P

**Preimage resistance** — The property that makes a hash function one-way: given an output, no practical method exists to find an input that produces it, other than brute-force search. See [Preimage Resistance](./chapters/cryptography/preimage-resistance.md).

**Private key** — A secret, randomly generated number that authorizes spending and derives a public key. Must never be shared. See [Private and Public Keys](./chapters/cryptography/keys.md).

**Public key** — A value mathematically derived from a private key, safe to share, used to verify signatures. See [Private and Public Keys](./chapters/cryptography/keys.md).

**Proof-of-work** — A mechanism requiring a party to perform a costly, difficult-to-fake computation to earn a privilege (sending an email past a spam filter, or extending the Bitcoin blockchain). Cheap to verify, expensive to produce. See [Hashcash](./chapters/origins/hashcash.md) and [Proof of Work](./chapters/bitcoin/proof-of-work.md).

**Pseudonymous** — Identified by a persistent label (a public key or address) that is not directly tied to a real-world identity, as opposed to fully anonymous (no persistent label at all) or fully identified. Describes Bitcoin's privacy model. See [The Bitcoin Whitepaper](./chapters/origins/bitcoin-whitepaper.md#10-privacy).

## Q

**Quantity theory of money** — The theory that the price level is fundamentally determined by the relationship between the money supply, its velocity, and real output (M × V = P × Y). See [Money Supply](./chapters/economics/money-supply.md).

## R

**Regression theorem** — Ludwig von Mises's argument that money's value must trace back to a good's prior non-monetary use. Central to a specific, unresolved debate about Bitcoin. See [The Regression Theorem](./chapters/economics/regression-theorem.md).

**RPOW (Reusable Proof of Work)** — Hal Finney's 2004 system letting Hashcash-style proof-of-work tokens be exchanged for transferable, signed tokens. See [Hashcash](./chapters/origins/hashcash.md#from-hashcash-to-rpow).

## S

**SegWit (Segregated Witness)** — A 2017 soft fork that moved signature data out of the main transaction structure, fixing malleability and changing fee accounting. See [SegWit](./chapters/bitcoin/segwit.md).

**Soft fork** — A protocol rule change that tightens consensus rules in a way old software still accepts. See [Soft Forks](./chapters/forks/soft-forks.md).

**Smart contract** — Code deployed to a blockchain that executes deterministically when called, holding its own state and, optionally, funds. See [Smart Contracts](./chapters/contracts/README.md).

**secp256k1** — The specific elliptic curve Bitcoin and Ethereum use for all keys and signatures. See [secp256k1](./chapters/cryptography/secp256k1.md).

**Schnorr signature** — A signature scheme added to Bitcoin via Taproot, notable for enabling signature aggregation. See [Schnorr Signatures](./chapters/cryptography/schnorr.md).

**Seed phrase** — 12 or 24 words encoding the entropy behind an HD wallet's master key, standardized by BIP-39. See [Seed Phrases](./chapters/wallets/seed-phrases.md).

**Satoshi Nakamoto** — The pseudonym used by Bitcoin's creator. Real-world identity unknown. See [Who Was Satoshi Nakamoto?](./chapters/origins/satoshi.md).

**Store of value** — A function of money: an asset that can be saved and retrieved later without significant loss of purchasing power. See [Functions of Money](./chapters/economics/functions-of-money.md).

**Sybil attack** — An attack where one party creates many fake identities to gain disproportionate influence over a system that assumes one identity equals one vote. See [Sybil Attacks](./chapters/distributed-systems/sybil-attacks.md).

## T

**Taproot** — A 2021 soft fork bringing Schnorr signatures to Bitcoin, making complex spending conditions indistinguishable on-chain from simple ones. See [Taproot](./chapters/bitcoin/taproot.md).

**Trusted third party** — An intermediary (bank, payment processor, issuer) required by a system to resolve disputes or prevent fraud, at the cost of that party being able to freeze, reverse, or surveil activity. See [Why Digital Cash Was Hard](./chapters/origins/digital-cash.md).

## U

**UASF (User-Activated Soft Fork)** — A soft fork activated by node operators enforcing new rules on a set date, independent of miner signaling. See [User-Activated Soft Forks](./chapters/forks/uasf.md).

**UTXO (Unspent Transaction Output)** — A specific output from a past transaction not yet spent. Bitcoin has no account balances; a wallet's balance is the sum of its spendable UTXOs. See [The UTXO Model](./chapters/bitcoin/utxo.md).

**Unit of account** — A function of money: the standard used to measure and compare the value of goods, debts, and contracts. See [Functions of Money](./chapters/economics/functions-of-money.md).

## V

**Validator** — A registered participant in Ethereum's proof-of-stake consensus, backed by a 32 ETH deposit, responsible for proposing blocks and attesting. See [Validators](./chapters/ethereum/validators.md).

**Velocity of money** — How many times, on average, a unit of currency is spent within a given period. See [Money Supply](./chapters/economics/money-supply.md).

## Z

**Zero-knowledge proof** — A method for proving a statement is true without revealing anything beyond that fact. See [Zero-Knowledge Proofs](./chapters/cryptography/zero-knowledge.md).
