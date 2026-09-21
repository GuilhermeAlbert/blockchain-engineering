# Hashcash

Hashcash is the direct ancestor of Bitcoin's [Proof of Work](../bitcoin/proof-of-work.md). Adam Back designed it in 1997 to solve a problem that has nothing to do with money: email spam. Understanding Hashcash's actual goal matters, because Bitcoin repurposes the same mechanism for a very different job (securing a public ledger) and the differences between the two uses explain design decisions that otherwise look arbitrary.

## The problem

Sending email is nearly free for the sender. A spammer can send millions of messages at negligible marginal cost, because the cost of composing and transmitting an email does not scale with volume the way, say, printing and mailing paper letters does. Back's observation, following earlier related proposals (notably Cynthia Dwork and Moni Naor's 1992 paper on combating junk mail with computational puzzles, which Back credits), was that spam is an economic problem: it is profitable only because sending is cheap. Raise the cost of sending each email by a small, fixed amount of computation, and spam becomes economically unattractive while a legitimate sender (sending a handful of messages a day) barely notices the cost.

The challenge is doing this without a central authority that issues "sending permits." Whatever imposes the cost has to be verifiable by the recipient's own computer, unilaterally, with no need to trust or contact any third party.

## How it works

Hashcash requires the sender to find a partial hash collision: a value that, when hashed with SHA-1 (Back's original choice), produces an output with a specific number of leading zero bits. Finding such a value requires trying inputs more or less at random (there is no shortcut other than brute-force search) but *verifying* a candidate takes a single hash computation.

A Hashcash stamp, in its plain-text form, looks like this:

```text
1:20:1303030600:anna@example.com::McMybZIhxKXu57jd:ckvi
```

The fields are: version, number of leading zero bits required (the difficulty), a timestamp, the recipient's address, an optional extension field, a random nonce, and a counter. The sender repeatedly varies the counter and nonce, hashes the whole string, and checks whether the resulting hash has the required number of leading zero bits. With 20 bits of required zeros, the sender must try roughly 2^20 (about a million) candidate hashes on average before finding one that qualifies, because each hash output is effectively random and the chance any single hash has 20 specific leading zero bits is 1 in 2^20.

```text
try counter = 1  → hash = 8f3a91c2... (fails, doesn't start with 20 zero bits)
try counter = 2  → hash = 019bc0e7... (fails)
try counter = 3  → hash = 00042f11... (fails, only ~13 leading zero bits)
  ...
try counter = 1,048,321 → hash = 00000d2a... (succeeds — 20 leading zero bits)
```

On a mid-1990s CPU, computing roughly a million SHA-1 hashes took a perceptible but tolerable amount of time, around a second. A recipient's mail client can verify the stamp with one hash computation, confirming the sender did the work. If the recipient's spam filter requires a valid stamp before accepting mail, a spammer sending a million messages now has to pay for roughly a million seconds of CPU time (many CPU-years) which changes the economics of bulk spam even though it barely inconveniences someone sending a few dozen legitimate emails per day.

This is the general shape of a **proof-of-work function**: expensive (in a tunable, adjustable way) to produce, cheap to verify, and with no shortcut faster than brute-force search. Bitcoin's mining process (see [Proof of Work](../bitcoin/proof-of-work.md) and [Mining](../bitcoin/mining.md)) is structurally the same search, with SHA-256 applied twice instead of SHA-1 once, and with the "leading zero bits" requirement replaced by the more general notion of a numeric target.

## Why Satoshi cited Hashcash specifically

The Bitcoin whitepaper's proof-of-work section opens:

> "To implement a distributed timestamp server on a peer-to-peer basis, we will need to use a proof-of-work system similar to Adam Back's Hashcash, rather than newspaper or Usenet posts."
> Satoshi Nakamoto, [Bitcoin whitepaper](https://bitcoin.org/bitcoin.pdf), Section 4

The reuse is direct: Hashcash already demonstrated that (1) a proof-of-work puzzle can be made adjustably difficult, and (2) the cost of producing a valid proof is what deters abuse, not any identity check. Bitcoin's innovation is applying that same puzzle to block creation and tying the *ability to extend the ledger* to the same computational cost, turning "who gets to add the next entry" into a race that costs real resources to win, which is what makes rewriting history expensive (see [Why Can't Someone Simply Change an Old Bitcoin Block?](../bitcoin/README.md)).

Note what Hashcash does *not* provide, and Bitcoin had to add on top of it: Hashcash stamps are single-use proofs with no persistent record connecting one stamp to the next. Nothing links a chain of stamps together or enforces that the party spending computational effort is also the party who benefits from a specific, single ledger update. Bitcoin's block header commits to the previous block's hash (see [Hashes and Block Linking](../blockchain/block-linking.md)), turning isolated proof-of-work puzzles into a cumulative chain where extending history requires redoing not just one puzzle, but every puzzle after the point you want to alter.

## From Hashcash to RPOW

Hashcash tokens are **not reusable**. A stamp is proof that work was done for one specific recipient and purpose, and using it again elsewhere does not by itself prove anything new. In 2004, [Hal Finney](./cypherpunks.md#members-who-matter-to-this-books-story) (a career cryptographer and the first person after Satoshi to run the Bitcoin software) built **RPOW (Reusable Proof of Work)**, a system that let someone exchange a Hashcash-style proof-of-work token for a signed token that *could* be transferred to someone else and exchanged again, functioning as a limited form of digital cash.

RPOW ran on a central server using [trusted computing hardware](https://en.wikipedia.org/wiki/Trusted_execution_environment) (an IBM 4758 secure coprocessor) to prevent even Finney himself, as the server's operator, from forging tokens or double-issuing them. The server's code was published and its signing key was generated inside tamper-evident hardware specifically so users didn't have to trust Finney personally, only the hardware's attestation that it was running the published code. This was a genuine attempt to solve the "trusted issuer" problem identified in [DigiCash](./digicash.md), not by removing the central server, but by making the server's honesty independently verifiable.

RPOW never reached wide use, and the reliance on specific trusted hardware and a single server was a structural bottleneck rather than the kind of open, permissionless network Bitcoin later became. But it is a documented, concrete precedent for turning proof-of-work into something that changes hands, and its creator became the first person outside Satoshi to engage seriously with Bitcoin, run its software, and correspond publicly with Satoshi about the code (see [Early Bitcoin History](./early-bitcoin.md)).

## Tradeoffs

Hashcash-style proof-of-work has a cost that is worth stating plainly, because Bitcoin inherits it directly: the "expensive to produce" property is expensive in a literal sense. It consumes real electricity and hardware, which is a genuine resource cost with no output other than security (see [Energy Consumption](../bitcoin/energy.md) and [Long-Term Security Budget](../bitcoin/security-budget.md)). Back's spam-deterrence use case only ever required a small, fixed amount of work per email. Bitcoin's use case (securing a global ledger against a network of adversaries who might have enormous computing resources) requires the cost to scale with the value being protected, which is why Bitcoin's proof-of-work difficulty has grown by many orders of magnitude since 2009 (see [Difficulty Adjustment](../bitcoin/difficulty-adjustment.md)).

## Common misconceptions

**Hashcash was not designed as money and was never intended to be spent or exchanged.** It is a one-way, non-transferable proof attached to a single email. Confusing it with a currency conflates it with RPOW or with Bitcoin itself.

**"Proof of work" did not originate with Back either.** He credits Dwork and Naor's 1992 paper explicitly. Back's specific contribution was a practical, simple, widely adopted implementation, and the name "Hashcash."

## Further reading

- [Hashcash - A Denial of Service Counter-Measure](http://www.hashcash.org/papers/hashcash.pdf): Adam Back, 2002 (formal write-up of the 1997 system)
- [Pricing via Processing or Combatting Junk Mail](https://www.wisdom.weizmann.ac.il/~naor/PAPERS/pvp.pdf): Cynthia Dwork and Moni Naor, CRYPTO '92
- [RPOW - Reusable Proofs of Work](https://web.archive.org/web/20071222072154/http://www.rpow.net/): Hal Finney, 2004 (via Internet Archive; the original rpow.net server is no longer live)

---

[← Previous: David Chaum and DigiCash](./digicash.md)
·
[Back to Origins](./README.md)
·
[Next: b-money →](./b-money.md)
