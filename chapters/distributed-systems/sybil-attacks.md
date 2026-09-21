# Sybil Attacks

A Sybil attack is an attack where a single party creates many fake identities to gain disproportionate influence over a system that assumes each identity represents an independent participant. This chapter covers the attack in general terms and explains, precisely, why it's the specific problem Bitcoin's proof-of-work mechanism is designed to defeat, a connection the whitepaper itself draws explicitly.

## The name and the general problem

The term comes from the 1973 book *Sybil*, about a woman diagnosed with dissociative identity disorder, presenting as many distinct personalities. The name was adopted for this attack class in a 2002 paper by John R. Douceur at Microsoft Research, which formally analyzed the problem for peer-to-peer systems.

The general problem: many distributed systems make decisions by some form of counting participants. A vote, a majority check, a reputation score based on how many distinct peers vouch for something. If creating a new identity is cheap (a new email address, a new IP address, a new username), a single adversary can create an arbitrarily large number of fake identities and use them to outvote, outnumber, or otherwise dominate the honest participants, even though there's really only one adversarial party behind all of them. Douceur's paper proves a fairly stark result: without some trusted, centralized identity-issuing authority, no system can be fully immune to Sybil attacks if identity creation itself is unconstrained and free. The defense has to come from making identity, or influence, costly in some other way.

## Why this specifically threatens permissionless consensus

Recall from [Consensus](./consensus.md#two-dimensions-of-difficulty) that Bitcoin's hardest design constraint, compared to classical distributed consensus, is **permissionless membership**. Anyone can join the network at any time, with no registration or vetting. This is exactly the condition under which Sybil attacks are most dangerous: if Bitcoin's consensus mechanism counted "one node, one vote" for deciding which chain is valid, an attacker could simply run thousands of nodes (trivial and nearly free to do, spinning up software instances costs very little) and use that fake majority to have the network accept a fraudulent version of history, such as one containing a reversed, double-spent transaction.

## Bitcoin's specific defense

The Bitcoin whitepaper addresses this directly, in the same passage that introduces proof-of-work as the consensus mechanism:

> "The proof-of-work also solves the problem of determining representation in majority decision making. If the majority were based on one-IP-address-one-vote, it could be subverted by anyone able to allocate many IPs. Proof-of-work is essentially one-CPU-one-vote."
> Satoshi Nakamoto, [Bitcoin whitepaper](https://bitcoin.org/bitcoin.pdf), Section 4

The mechanism: instead of counting identities, Bitcoin counts **computational work actually performed**. Creating a new node identity is free, but that identity gains no influence over which chain the network accepts unless it can also produce valid proof-of-work, and producing proof-of-work costs real electricity and hardware regardless of how many separate "identities" (IP addresses, node instances) the attacker splits their effort across. An attacker with 10% of the network's total hash power has roughly 10% of the influence over block creation whether that hash power runs behind one node or ten thousand fake nodes, splitting hash power across more identities doesn't manufacture any additional computational power out of nothing.

This is the precise, mechanical reason proof-of-work is described as **"one-CPU-one-vote"** rather than "one-node-one-vote" or "one-IP-one-vote": voting weight is pegged to a resource (computation) that cannot be cheaply duplicated the way network identities can.

## Example: why this matters concretely

Imagine an attacker wants to convince the network that a fraudulent transaction history is legitimate. Without Sybil resistance, if consensus were based on counting how many nodes claim a given chain is valid, the attacker could spin up a million cheap virtual machines, each running a node that claims the fraudulent chain is correct, instantly outnumbering the genuinely honest nodes' claims. With proof-of-work-based consensus, the attacker instead needs to control enough actual computational power to out-mine the honest network's combined effort, a cost measured in real hardware and electricity that scales with the attack's required strength, not something that can be manufactured by simply running more software instances. This is why [51% Attacks](../bitcoin/51-percent-attacks.md) are named for a hash power percentage, not a node-count percentage.

## Where Sybil resistance shows up elsewhere in this book

Proof-of-work is not the only Sybil-resistance mechanism covered in this book, [Proof of Stake](../ethereum/proof-of-stake.md), used by Ethereum since [The Merge](../ethereum/the-merge.md), achieves the same goal through a different costly resource: economically staked capital rather than computational work, discussed fully in the Ethereum section. Both mechanisms share the same underlying logic identified here, peg influence to something genuinely costly to acquire in large quantities, so that creating additional fake identities provides no additional influence on its own.

## Tradeoffs

Resisting Sybil attacks through a costly resource (computation or stake) is effective, but it necessarily means influence over the network is proportional to wealth or resources, not to the number of distinct human participants. A large, well-funded actor can legitimately acquire more voting weight than many small individual participants combined, simply by having more resources to commit. This is a documented, structural property of both proof-of-work and proof-of-stake systems, not a flaw unique to either, and it is part of the broader [decentralization](../governance/README.md) discussion covered in this book's Governance section, Sybil resistance and perfectly equal influence per human participant are, in a permissionless system, in tension with each other.

## Common misconceptions

**A Sybil attack is not the same thing as a 51% attack**, though the two are closely related. A Sybil attack is the general strategy of creating many fake identities; a 51% attack is the specific Bitcoin scenario where an attacker gains a majority of hash power (which proof-of-work makes resistant to being achieved through fake identities alone), see [51% Attacks](../bitcoin/51-percent-attacks.md).

**Creating multiple Bitcoin addresses or wallets is not itself a Sybil attack** and carries no special risk to the network. Ordinary users create many addresses routinely for privacy reasons (see [Addresses](../wallets/addresses.md)). The attack specifically concerns creating fake influence over *consensus*, not simply holding multiple addresses.

## Further reading

- [The Sybil Attack](https://www.microsoft.com/en-us/research/wp-content/uploads/2002/01/IPTPS2002.pdf): John R. Douceur, Microsoft Research, 2002
- [Bitcoin whitepaper, Section 4](https://bitcoin.org/bitcoin.pdf)

---

[← Previous: Byzantine Generals Problem](./byzantine-generals.md)
·
[Back to Distributed Systems](./README.md)
·
[Next: CAP Theorem →](./cap.md)
