# Who Was Satoshi Nakamoto?

Satoshi Nakamoto is the name used by the person or people who designed Bitcoin, wrote its first implementation, and operated the network alone for its first several months. Nobody has established, with evidence that meets an ordinary standard of proof, who Satoshi actually was. This chapter separates what is documented (writings, code commits, forum timestamps, on-chain activity) from what is inferred, and treats the various named "candidates" as what they are: unproven speculation, some more carefully argued than others, none confirmed.

This distinction matters enough to state as a rule that the rest of this chapter follows: **a claim about Satoshi's identity is included here only if it is either (a) something Satoshi stated about themselves in a primary source, or (b) explicitly labeled as a theory, with its evidentiary basis and its refutations both described.**

## What is documented

- **The whitepaper.** [Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf) was posted to the Cryptography mailing list on October 31, 2008, under the name Satoshi Nakamoto, from an email address at vistomail.com, a since-defunct anonymous email provider. See [The Bitcoin Whitepaper](./bitcoin-whitepaper.md).
- **The software.** Satoshi wrote and released Bitcoin v0.1 on January 9, 2009, mined the [genesis block](./genesis-block.md) on January 3, 2009, and personally operated the network (mining most of the blocks in its first year) before other participants joined.
- **Public writing.** Satoshi posted extensively on the [Cryptography mailing list](https://www.metzdowd.com/pipermail/cryptography/2008-October/thread.html) and on the [bitcointalk.org](https://bitcointalk.org) forum from Bitcoin's earliest days through December 2010, and corresponded privately by email with early contributors including Hal Finney, Martti Malmi, Gavin Andresen, and Mike Hearn into 2011. Much of this correspondence has since been published by its recipients or by the [Satoshi Nakamoto Institute](https://nakamotoinstitute.org/), an archive project that collects Satoshi's known writings.
- **The timeline of departure.** Satoshi's last known public forum post was on December 12, 2010, following a December 11 post expressing concern that WikiLeaks' interest in accepting Bitcoin donations would bring unwanted attention: "It would have been nice to get this attention in any other context. WikiLeaks has kicked the hornet's nest, and the swarm is headed towards us." Starting around September–December 2010, Satoshi progressively handed control of the source code repository and the network alert key to Gavin Andresen and other early developers. The last known email, sent to developer Mike Hearn on April 23, 2011, said Satoshi had "moved on to other things" and that Bitcoin was "in good hands" with Andresen and the community. No confirmed communication from the Satoshi Nakamoto account or key has surfaced since. See [Early Bitcoin History](./early-bitcoin.md).
- **Coin holdings.** On-chain analysis has identified a pattern across many early blocks that is consistent with one miner's activity. Sergio Demian Lerner published the method and its limits in his [original Patoshi-pattern analysis](https://bitslog.com/2013/04/17/the-well-deserved-fortune-of-satoshi-nakamoto/). Connecting the pattern to Satoshi, and turning it into a precise holdings estimate, remains an inference rather than a statement or signature from Satoshi.
- **The name itself is presumed pseudonymous.** Satoshi never confirmed or denied whether "Satoshi Nakamoto" was a real legal name, a pen name, or a name used by more than one person. Early participants who corresponded with Satoshi, including Hal Finney and Gavin Andresen, described the communication style as consistent with a single individual, but this is an impression, not proof, and Satoshi's own writing never settles the question.

## Why the identity remains unknown

Satoshi took deliberate operational security measures that are documented in Satoshi's own writing and in how the whitepaper and software were released: publishing from an anonymous email service, avoiding any biographical detail in technical writing, and (per later stylometric and technical analysis by researchers) apparently posting at hours and with linguistic patterns that resist easy geographic or personal attribution. No legal document, financial record, or photograph tied to the name "Satoshi Nakamoto" and the Bitcoin project has been authenticated.

## Identity theories

The following individuals have, at various points, been publicly proposed as Satoshi Nakamoto by journalists, researchers, or in some cases the individuals themselves. Each entry states the claim, the evidence offered, and the status of that claim as of this writing.

### Dorian Prentice Satoshi Nakamoto

In March 2014, Newsweek published an article by Leah McGrath Goodman identifying Dorian Prentice Satoshi Nakamoto, a Japanese-American engineer living in California, as Bitcoin's creator, based on his name, engineering background, and in-person interactions the article characterized as evasive. Dorian Nakamoto denied any connection to Bitcoin in subsequent public statements and interviews, stating he had not heard of Bitcoin until his family found the article. No cryptographic, financial, or documentary evidence has linked him to the Bitcoin project. This theory is widely regarded, including within the Bitcoin community, as a case of mistaken identity based on a coincidental name.

### Craig Steven Wright

Craig Wright, an Australian computer scientist, publicly claimed to be Satoshi Nakamoto beginning in 2016, and pursued the claim through years of media statements and litigation, including a UK High Court case brought by the nonprofit Crypto Open Patent Alliance (COPA). In March 2024, the UK High Court ruled, after examining extensive technical and documentary evidence, that Wright is **not** the author of the Bitcoin whitepaper and **not** Satoshi Nakamoto, finding that Wright had presented forged documents to support his claim. This is the most legally definitive ruling to date on any specific identity claim, and it is a rejection, not a confirmation.

### Hal Finney

Some researchers and journalists (notably a widely circulated 2013 Forbes analysis by Andy Greenberg) have speculated that Hal Finney (the first person to run the Bitcoin software after Satoshi, the recipient of the [first Bitcoin transaction](./early-bitcoin.md#the-first-bitcoin-transaction), a career cryptographer, and creator of [RPOW](./hashcash.md#from-hashcash-to-rpow)) either was Satoshi or collaborated closely enough to have written parts of the code. The circumstantial basis cited includes Finney's technical background, his geographic proximity to Dorian Nakamoto (a neighbor in the same California town, which some have proposed as a possible source for the name association), and his early, technically fluent engagement with the project. Finney publicly and consistently denied being Satoshi before his death in 2014 from complications of ALS, and stated that his own correspondence with Satoshi convinced him they were separate people. No confirming evidence beyond circumstance has been published.

### Nick Szabo

Because [Bit Gold](./bit-gold.md) anticipates several structural features of Bitcoin, and because stylometric analyses of Satoshi's writing by some independent researchers (including a widely cited 2013 analysis) have found similarities to Szabo's writing style, Szabo has been repeatedly proposed as Satoshi. Szabo has repeatedly and publicly denied this. No confirming evidence has been published beyond stylistic and thematic similarity, which is also explainable by Szabo and Satoshi having written about closely related ideas in the same small technical community.

### Other named candidates

Len Sassaman, Adam Back, Wei Dai, and others associated with the cypherpunk and cryptography mailing lists have at various times been proposed based on similar circumstantial reasoning (technical fit, timing, mailing-list presence). Each has denied being Satoshi where a denial is on record, and none is supported by confirming evidence beyond circumstance. A 2024 HBO documentary, *Money Elect­ric: The Bitcoin Mystery*, proposed developer Peter Todd as a candidate; Todd publicly and directly denied this, and the documentary's reasoning has been broadly criticized by researchers as circumstantial.

## This book's position

None of the above is treated as established fact in this book. Where later chapters reference "Satoshi," the name refers to the author of the whitepaper and the original software, without asserting or implying a specific real-world identity. Readers interested in going further than this summary should read primary sources directly (Satoshi's own mailing-list and forum posts, archived in full at the Satoshi Nakamoto Institute) rather than secondary reporting, because the identity theories above are, without exception, built on inference rather than confirmation.

## Common misconceptions

**No cryptographic proof of identity exists for any candidate.** Bitcoin's founding key material has never been used to sign a message proving a real-world identity in a way accepted as authentic by independent cryptographers. Any claim that such proof exists should be checked against independent, reproducible verification, not press statements.

**Satoshi being a single person is an assumption, not a settled fact.** The writing and code are consistent with one author, but "Satoshi Nakamoto" could describe a small group; this cannot be ruled out from the public record alone.

## Further reading

- [Satoshi Nakamoto Institute, Satoshi's writings archive](https://nakamotoinstitute.org/satoshi-archive/)
- [Cryptography mailing list, October 2008 thread](https://www.metzdowd.com/pipermail/cryptography/2008-October/thread.html)
- [Crypto Open Patent Alliance v Craig Wright, UK High Court judgment, March 2024](https://www.judiciary.uk/wp-content/uploads/2024/05/Crypto-Open-Patent-Alliance-v-Wright-judgment-140524.pdf)
- [Newsweek's 2014 Dorian Nakamoto story and its aftermath](https://www.newsweek.com/2014/03/14/face-behind-bitcoin-247957.html)

---

[← Previous: Bit Gold](./bit-gold.md)
·
[Back to Origins](./README.md)
·
[Next: The Bitcoin Whitepaper →](./bitcoin-whitepaper.md)
