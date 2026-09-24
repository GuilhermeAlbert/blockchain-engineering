# b-money

In 1998, Wei Dai (a computer scientist known at the time for his cryptographic software library Crypto++) sent a short proposal to the cypherpunks mailing list describing a system he called "b-money." It was never implemented. It is nonetheless one of the two works Satoshi Nakamoto cites by name in the Bitcoin whitepaper, and reading it against Bitcoin's actual design shows precisely which ideas were already on the table in 1998 and which problems remained unsolved for another decade.

## The proposal

Dai's essay opens by stating the same political motivation found throughout the [cypherpunk movement](./cypherpunks.md):

> "I am fascinated by Tim May's crypto-anarchy. Unlike the communities traditionally associated with the word 'anarchy', in a crypto-anarchy the government is not temporarily destroyed but permanently forbidden and permanently unnecessary. [...] I am interested in the possibilities for collective decision-making in the crypto-anarchy without new taxes and government spending."
> Wei Dai, [b-money](http://www.weidai.com/bmoney.txt), 1998

He then describes, in a page and a half, **two alternative protocols** for what he calls "a scheme for a group of untraceable digital pseudonyms to pay each other with money and to enforce contracts amongst themselves without outside help."

### Protocol 1: everyone keeps every account

In Dai's first design, every participant maintains a complete, separate copy of a database mapping pseudonyms to account balances. To create new money, a participant broadcasts a proof-of-work solution to a computational problem; every other participant independently verifies the work and credits the creator's account with an amount tied to the cost of producing that proof, Dai proposes that the community itself, by not accepting proofs that are "too cheap" relative to computer technology at the time, keeps the cost of money creation roughly self-adjusting. To transfer money, the payer broadcasts a signed message; every participant who receives it updates their own copy of both accounts.

The proposal explicitly requires "broadcast" to reach all participants and assumes messages are not lost, a requirement Dai flags as unrealistic on its own:

> "Unfortunately the proof-of-work function is not entirely satisfactory because its cost is not stable over time [...] Anyway, this problem is not fatal, merely inconvenient."
> Wei Dai, [b-money](http://www.weidai.com/bmoney.txt), 1998

More importantly for this book's purposes, Dai does not specify a mechanism for resolving what happens when two participants receive broadcasts in different orders, or when a dishonest participant sends conflicting transfer messages to different parts of the network. This is precisely the ordering problem described in [Why Digital Cash Was Hard](./digital-cash.md), and it is left unsolved.

### Protocol 2: servers, deposits, and voting

Recognizing that requiring every participant to track every account does not scale, Dai's second protocol introduces a subset of participants ("servers") who keep the authoritative account database, with everyone else routing transactions through them. To keep the servers honest without trusting any one of them individually, servers must post a **security deposit** in escrow (held collectively by all servers), and account holders periodically broadcast their believed balances, which are checked for consistency against the servers' claims; a server caught cheating forfeits its deposit.

This is the more structurally interesting half of the proposal, because it anticipates a problem that any decentralized ledger has to answer: *who is allowed to update the ledger, and what stops them from lying?* Dai's answer (an economic penalty (a forfeited deposit) for provable misbehavior) is a form of the same idea that appears later, in a different shape, in both Bitcoin's mining economics and in [Proof of Stake](../ethereum/proof-of-stake.md) slashing (see [Slashing](../ethereum/slashing.md)). But b-money's servers are a fixed, identified set of parties who must be individually trusted to hold deposits and vote correctly; nothing in the proposal explains how that set is chosen, how new servers join permissionlessly, or how the system defends against a coalition of servers that colludes rather than individually cheats.

## What b-money got right

Reading the proposal against Bitcoin, several structural ideas appear nearly two decades early:

- **Money creation tied to costly computation.** Dai's Protocol 1 ties new money issuance directly to proof-of-work, the same link Bitcoin makes with mining rewards (see [Block Rewards](../bitcoin/block-rewards.md)).
- **A fixed, known issuance process governed by protocol rather than discretion.** Dai's proposal has no central bank deciding how much money to create; the rules are fixed in advance and followed mechanically.
- **Economic penalties for provable dishonesty**, foreshadowing the general principle that decentralized systems can substitute a costly-to-fake economic stake for a trusted identity.
- **Pseudonymous participation.** Accounts are public keys, not real-world identities, the same model Bitcoin uses for addresses (see [Addresses](../wallets/addresses.md)).

## What b-money left unsolved

- **No consensus mechanism for ordering conflicting transactions across the network.** Protocol 1 assumes reliable broadcast to everyone, which real networks cannot guarantee; Protocol 2 assumes a fixed set of mutually-checking servers without explaining how that set forms or how to prevent a colluding majority within it from cheating together.
- **No mechanism resembling a blockchain.** There is no chain of blocks, no chained proof-of-work linking one state to the next, and no "longest chain" rule for resolving disagreements about history. Dai's servers vote on the *current* balance state; there is no append-only, verifiable history a new participant could download and check from scratch.
- **Never implemented or tested.** The proposal is an essay, not working software. Its problems were never stress-tested against real adversarial behavior.

## Satoshi's engagement with the proposal

Satoshi cites b-money in the whitepaper's references and, before publishing the paper widely, emailed Wei Dai directly to ask him to review a draft. Evidence Satoshi had read the essay closely rather than citing it in passing. Dai has said publicly (in a 2014 email exchange later published by Nathaniel Popper and others) that Satoshi's message referenced b-money and asked for feedback, though Dai did not respond in detail before the whitepaper's public release. In a 2013 interview and subsequent public statements, Dai has said he was "cryptocurrency-agnostic" and did not initially grasp Bitcoin's significance, only recognizing it in hindsight as b-money's ordering problem finally solved.

The surviving public evidence for this exchange is Dai's later account rather than a cryptographically authenticated archive of the original mailbox. For that reason, this chapter summarizes the exchange and does not quote an exact date or wording as independently verified fact.

## Common misconceptions

**b-money is not a predecessor cryptocurrency that "almost worked."** It is a short essay describing two alternative, partially specified protocols, neither implemented, both missing a working consensus mechanism. Its value to this book's history is as evidence of what problems the cypherpunk community had already identified, not as a working system Bitcoin improved upon.

**Wei Dai did not build or launch b-money.** No code, no network, no coins were ever created under that name during the 1990s.

## Further reading

- [b-money](http://www.weidai.com/bmoney.txt): Wei Dai, 1998 (original text)
- [Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf): Satoshi Nakamoto, references section
- [Crypto++ Library](https://www.cryptopp.com/): Wei Dai's cryptographic software library

---

[← Previous: Hashcash](./hashcash.md)
·
[Back to Origins](./README.md)
·
[Next: Bit Gold →](./bit-gold.md)
