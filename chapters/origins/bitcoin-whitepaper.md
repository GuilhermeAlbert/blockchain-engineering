# The Bitcoin Whitepaper

"Bitcoin: A Peer-to-Peer Electronic Cash System" is nine pages long. It has no diagrams beyond a handful of simple block diagrams, no marketing language, and reads like an engineering memo rather than a manifesto. This chapter walks through what it actually says, section by section, because the paper is short enough to summarize accurately and important enough that paraphrases circulating online frequently misstate it. Read the [original PDF](https://bitcoin.org/bitcoin.pdf) alongside this chapter if possible. It rewards close reading.

## Publication

Satoshi Nakamoto posted the paper to the [Cryptography mailing list](https://www.metzdowd.com/pipermail/cryptography/2008-October/014810.html) on **October 31, 2008**, with a message that began:

> "I've been working on a new electronic cash system that's fully peer-to-peer, with no trusted third party."

This was roughly six weeks after the collapse of Lehman Brothers (September 15, 2008) triggered the most acute phase of the 2008 financial crisis. A timing coincidence that has fueled interpretation (see the coinbase message discussed in [The Genesis Block](./genesis-block.md)), though the paper itself makes no reference to the crisis and Satoshi's prior private correspondence with early reviewers, including Wei Dai and Adam Back, shows the core design predates the September 2008 events. The paper does not claim to be a response to any specific financial event.

## Abstract

The paper's abstract states its goal and method in four sentences:

> "A purely peer-to-peer version of electronic cash would allow online payments to be sent directly from one party to another without going through a financial institution. Digital signatures provide part of the solution, but the main benefits are lost if a trusted third party is still required to prevent double-spending. We propose a solution to the double-spending problem using a peer-to-peer network. The network timestamps transactions by hashing them into an ongoing chain of hash-based proof-of-work, forming a record that cannot be changed without redoing the proof-of-work."
> Satoshi Nakamoto, [Bitcoin whitepaper](https://bitcoin.org/bitcoin.pdf), Abstract

Every later section of the paper is an elaboration of this abstract. It is worth reading twice: it names the [double-spending problem](./digital-cash.md#the-problem) as the central obstacle, states that digital signatures alone are not sufficient to solve it, and previews the specific mechanism (proof-of-work chained into an ongoing record) that solves it.

## Section by section

### 1. Introduction

Frames the problem of trust-based commerce: financial institutions are needed to process electronic payments because pure digital signatures don't prevent someone from spending the same signed value twice. Satoshi lists the costs of the trust model directly, mediation costs, the practical impossibility of non-reversible transactions for non-reversible services, fraud, and the requirement that merchants collect more customer information than they otherwise would need, to guard against reversals. The introduction closes by stating the goal precisely: "What is needed is an electronic payment system based on cryptographic proof instead of trust."

### 2. Transactions

Defines a coin as "a chain of digital signatures." A transaction transfers ownership by having the current owner digitally sign a hash of the previous transaction plus the new owner's public key, and attaching that signature to the coin. The paper immediately flags the double-spending gap this leaves open: a payee has no way to verify that a previous owner did not sign an earlier transaction of the same coin to someone else. Section 2 explicitly states that the "obvious solution" (a central mint that checks every coin for double-spending) reintroduces a trusted third party for every transaction, which is exactly what the paper is trying to avoid. This sets up the need for Section 3.

### 3. Timestamp Server

Introduces the general mechanism before applying it to money: a timestamp server that takes a hash of a block of items and publishes the hash widely (the paper cites the model of a newspaper or Usenet post). Each new timestamp includes the previous timestamp's hash, forming a chain, "each timestamp reinforcing the ones before it." This section is the conceptual seed of the [blockchain](../blockchain/README.md) data structure, described in the abstract, before proof-of-work is introduced.

### 4. Proof-of-Work

States that a distributed timestamp server needs a proof-of-work system "similar to Adam Back's Hashcash," implemented by scanning for a nonce value that, when hashed with SHA-256, gives a hash beginning with a required number of zero bits. This section makes two of the paper's most important structural claims:

1. **Majority vote by CPU power, not by IP address**, because "one-IP-address-one-vote" could be subverted by anyone able to allocate many IP addresses. This is the paper's explicit defense against [Sybil attacks](../distributed-systems/sybil-attacks.md).
2. **Immutability grows with confirmations.** To modify a past block, an attacker would have to redo the proof-of-work of that block and every block after it, then catch up with and surpass the honest chain's ongoing work, described as "getting exponentially unlikely as [the attacker] falls further behind."

### 5. Network

Describes the six-step process nodes follow: broadcast new transactions to all nodes, each node collects them into a block, each node works on finding a proof-of-work for its block, when found the node broadcasts the block, other nodes accept the block only if all its transactions are valid and not already spent, and nodes express acceptance by working on extending the accepted block as the next one in the chain. This section also states the **longest-chain rule** (nodes always consider the longest valid chain to be the correct one) and notes that nodes can leave and rejoin at any time, catching up by downloading and verifying whichever chain is longest.

### 6. Incentive

Explains that the first transaction in a block is special: it creates new coins owned by the block's creator, which is both the mechanism for initial coin distribution and the incentive for nodes to expend computing power on the network's behalf. Once a fixed total coin supply is reached, the paper proposes that transaction fees become the incentive instead, and notes this should also discourage a dishonest node from attempting to reverse its own past transactions, since it stands to gain more by following the rules and collecting new coins than by attacking the system it is invested in (see [Block Rewards](../bitcoin/block-rewards.md) and [Fee Market](../bitcoin/fee-market.md)).

### 7. Reclaiming Disk Space

Proposes pruning spent transactions from old blocks using [Merkle trees](../cryptography/merkle-trees.md): once a block's transactions are all spent, only its Merkle root (not the full transaction data) needs to be kept, since the root alone is sufficient to prove the block's identity within the chain. A back-of-the-envelope calculation in the paper estimates that block headers alone (without transactions) would need only about 80 bytes each, so even decades of headers stay small relative to available storage growth.

### 8. Simplified Payment Verification (SPV)

Explains how a party can verify a payment without running a full network node: by keeping only block headers and obtaining a Merkle branch linking the transaction to the block it's timestamped in (see [Merkle Proofs](../cryptography/merkle-proofs.md)). The paper is explicit about the limitation: SPV verification is only as reliable as the assumption that honest nodes control the network, because an attacker capable of overpowering the network could feed a lightweight client fabricated transactions for as long as the attacker can maintain that control. This is the origin of the distinction covered in depth in [Full Nodes](../bitcoin/full-nodes.md) versus [Light Clients](../bitcoin/light-clients.md).

### 9. Combining and Splitting Value

Notes that to allow value to be split and combined, transactions contain multiple inputs and outputs, normally a single input from a larger previous transaction, or multiple inputs combining smaller amounts, and at most two outputs: the payment itself, and a change output returned to the sender. This one paragraph is the origin of the [UTXO model](../bitcoin/utxo.md) covered in depth in the Bitcoin section.

### 10. Privacy

Describes the model of privacy Bitcoin actually offers: public transaction data (amounts, and the flow of value between addresses) with anonymity coming from keeping public keys unlinked to real-world identity ("the public can see that someone is sending an amount to someone else, but without information linking the transaction to anyone." The paper explicitly contrasts this with the traditional banking model, where identity is verified but transaction details are hidden from the public) Bitcoin inverts which side of that tradeoff is public. This is the mechanism behind the term "pseudonymous," covered further in [Addresses](../wallets/addresses.md) and [Privacy](../society/privacy.md).

### 11. Calculations

Works through the probability that an attacker with a minority of network hash power could still catch up to and overtake the honest chain, modeled as a Binomial Random Walk / Gambler's Ruin problem, and gives a formula for the probability of a successful attack as a function of the attacker's share of total hash power `q` and the number of confirmations `z` the honest chain has ahead. This is the quantitative basis for the common advice to wait for multiple confirmations before considering a Bitcoin payment final (see [Transaction Confirmation](../bitcoin/confirmation.md) and [Probabilistic Finality](../distributed-systems/probabilistic-finality.md)).

### 12. Conclusion

Restates the paper's contribution in one paragraph: a system for electronic transactions without relying on trust, built from coins made of digital signatures (providing strong ownership control) combined with a peer-to-peer proof-of-work network to record a public history of transactions that becomes computationally impractical for an attacker to alter, "as long as honest nodes control a majority of CPU power."

## What the paper does not specify

Reading the whitepaper alongside actual Bitcoin reveals things Satoshi left for the implementation, not the paper, to define: the paper does not fix a block size limit, does not specify the 21 million coin cap or the halving schedule numerically (it only describes the general principle of decreasing issuance), does not describe [Bitcoin Script](../bitcoin/script.md) at all, and does not use the terms "blockchain," "wallet," or "miner". "Miner" in particular is a term that emerged from community usage after release, not from the paper's own vocabulary (the paper says "nodes"). These details were filled in by the [initial source code](./early-bitcoin.md), released as Bitcoin v0.1 about ten weeks after the paper, and by subsequent development.

## Further reading

- [Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf): the primary source; read it directly
- [Cryptography mailing list, October 2008 announcement](https://www.metzdowd.com/pipermail/cryptography/2008-October/014810.html)
- [Satoshi Nakamoto Institute, whitepaper and draft history](https://nakamotoinstitute.org/library/bitcoin/)

---

[← Previous: Who Was Satoshi Nakamoto?](./satoshi.md)
·
[Back to Origins](./README.md)
·
[Next: The Genesis Block →](./genesis-block.md)
