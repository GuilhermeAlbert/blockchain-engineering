# The Cypherpunk Movement

Bitcoin did not emerge from a company, a university lab, or a government research program. It was announced on a mailing list that had spent the previous seventeen years arguing about exactly the problem it solved. This chapter covers that mailing list, the people on it, and the political argument that motivated their technical work, because Satoshi Nakamoto's own choice of where to publish the Bitcoin whitepaper (the Cryptography mailing list, a direct descendant of this scene) was not incidental.

## Who they were

"Cypherpunk" comes from a pun on "cipher" and "cyberpunk," coined by Jude Milhon (Saint Jude) at an early meeting of the group. The movement began in the San Francisco Bay Area in 1992, when Eric Hughes, Timothy C. May, and John Gilmore started an informal gathering of cryptographers, programmers, and activists who met in person and, more consequentially, founded the **Cypherpunks mailing list** that same year. The list ran on cypherpunks.venona.com and cypherpunks.to across the 1990s, hosting thousands of subscribers at its peak.

The group's founding document is Eric Hughes's [A Cypherpunk's Manifesto](https://www.activism.net/cypherpunk/manifesto.html), written in 1993:

> "Privacy is necessary for an open society in the electronic age. [...] We cannot expect governments, corporations, or other large, faceless organizations to grant us privacy out of their beneficence. [...] We must defend our own privacy if we expect to have any. [...] Cypherpunks write code."
> Eric Hughes, 1993

That last line ("Cypherpunks write code") is the operating principle that distinguishes the group from a purely political movement. Their belief was that privacy would not arrive through legislation or corporate goodwill; it would have to be built and deployed as working software that made surveillance and censorship harder regardless of what any government wanted. Timothy May's [The Crypto Anarchist Manifesto](https://www.activism.net/cypherpunk/crypto-anarchy.html) (1988, circulated before the list existed and reposted to it) put the argument in more radical form, predicting that cryptography would let individuals and groups interact and trade "without knowing the true name, or legal identity, of the other."

## What they built and argued about

The list's technical output over the 1990s reads, in retrospect, like a parts list for Bitcoin, even though no single member of the list assembled all the pieces:

- **Anonymous remailers** (Eric Hughes, Hal Finney and others), systems for sending email that stripped identifying headers, an early practical application of the layered-encryption ideas behind what would later become Tor.
- **PGP (Pretty Good Privacy)**, written by Phil Zimmermann in 1991, gave ordinary users access to public-key encryption for email. Zimmermann was investigated by the U.S. government for export violations, because strong cryptography was legally classified as a munition, a fact the list treated as proof of its founding claim that governments would resist widely available cryptography.
- **Digital cash proposals**, discussed at length below and in the following chapters: David Chaum's [DigiCash](./digicash.md), Adam Back's [Hashcash](./hashcash.md), Wei Dai's [b-money](./b-money.md), and Nick Szabo's [Bit Gold](./bit-gold.md).
- **The "Crypto Wars"**: the list actively organized against U.S. government attempts to mandate backdoored cryptography, most notably the [Clipper Chip](https://en.wikipedia.org/wiki/Clipper_chip) proposal (1993), an NSA-designed encryption chip with a built-in government key-escrow backdoor. The proposal was withdrawn by 1996 after public and technical opposition in which cypherpunks were prominent participants.

The list was not united on economics or politics beyond a shared commitment to strong cryptography and skepticism of centralized authority. Members ranged from anarcho-capitalists to civil libertarians to cryptographers with no strong political affiliation at all. What held the list together was a technical conviction: that mathematics, not policy, was the only reliable way to guarantee privacy and resist censorship, because a mathematical property holds regardless of who is in power.

## Members who matter to this book's story

- **Hal Finney**: cryptographer, first employee at PGP Corporation, creator of [RPOW](./hashcash.md#from-hashcash-to-rpow) (2004), and the recipient of the [first Bitcoin transaction](./early-bitcoin.md#the-first-bitcoin-transaction) from Satoshi Nakamoto in January 2009. Finney was an active list participant for over a decade before Bitcoin existed.
- **Adam Back**: inventor of [Hashcash](./hashcash.md) (1997), cited directly in the Bitcoin whitepaper as the proof-of-work reference.
- **Wei Dai**: proposed [b-money](./b-money.md) (1998) in a post to the list; also cited directly in the whitepaper. The smallest denomination of ether, the wei, is named after him.
- **Nick Szabo**: proposed [Bit Gold](./bit-gold.md) (1998) and wrote extensively about smart contracts and digital property rights years before Ethereum existed (see [Smart Contracts](../contracts/README.md)).
- **John Gilmore**: co-founder of the Electronic Frontier Foundation, hosted the mailing list's server infrastructure.
- **Timothy C. May**: Intel physicist, author of the Crypto Anarchist Manifesto, one of the list's three founders.

## Where Bitcoin fits

Satoshi Nakamoto posted the Bitcoin whitepaper to the **Cryptography mailing list** (a separate, related list moderated by Perry Metzger that had inherited much of the cypherpunk list's membership and character after the original list declined in the early 2000s) on October 31, 2008, and announced Bitcoin's first release there on January 9, 2009. The announcement email began:

> "I've been working on a new electronic cash system that's fully peer-to-peer, with no trusted third party. [...] The paper is available at http://www.bitcoin.org/bitcoin.pdf"
> Satoshi Nakamoto, [Cryptography mailing list](https://www.metzdowd.com/pipermail/cryptography/2008-October/014810.html), October 31, 2008

The framing ("no trusted third party") is the same problem statement the cypherpunk list had been circling since 1992. Whether Satoshi was a longtime list member writing under a pseudonym, a newcomer who had absorbed the list's decade of public archives, or something else, is unknown and is covered directly in [Who Was Satoshi Nakamoto?](./satoshi.md). What is documented is that the whitepaper's references section cites Hashcash and b-money by name, and that Satoshi engaged directly and substantively with Hal Finney, Adam Back, and Wei Dai in the weeks after publication, all three list veterans with over a decade of prior work on exactly this problem.

## Common misconceptions

**"Cypherpunk" is not a synonym for "cryptocurrency enthusiast."** The movement predates cryptocurrency by over fifteen years and was primarily concerned with encrypted communication, anonymous speech, and resistance to surveillance. Digital cash was one of several projects the list pursued, not its defining goal.

**The cypherpunks were not a single organization with membership or leadership.** It was an open mailing list; anyone could subscribe and post. There was no vetting process, no official position, and frequent public disagreement among participants.

## Further reading

- [A Cypherpunk's Manifesto](https://www.activism.net/cypherpunk/manifesto.html): Eric Hughes, 1993
- [The Crypto Anarchist Manifesto](https://www.activism.net/cypherpunk/crypto-anarchy.html): Timothy C. May, 1988
- [Cypherpunks mailing list archives](https://cypherpunks.venona.com/) (Venona archive)
- [Cryptography mailing list archive, October 2008](https://www.metzdowd.com/pipermail/cryptography/2008-October/thread.html): where the Bitcoin whitepaper was first announced

---

[← Previous: Why Digital Cash Was Hard](./digital-cash.md)
·
[Back to Origins](./README.md)
·
[Next: David Chaum and DigiCash →](./digicash.md)
