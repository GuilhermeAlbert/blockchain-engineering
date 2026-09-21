# David Chaum and DigiCash

David Chaum is the closest thing digital cash has to a founding figure who is not part of the Bitcoin story directly. A cryptographer trained at UC Berkeley, Chaum published the foundational papers on digital cash and anonymous communication in the early 1980s and then spent over a decade trying to commercialize the idea through a company called DigiCash. The company failed. The cryptography did not — it is still the basis for how modern digital cash systems think about privacy, and it is the clearest illustration of Strategy 1 described in [Why Digital Cash Was Hard](./digital-cash.md): solve privacy with cryptography, but keep a trusted issuer.

## The problem Chaum set out to solve

By the early 1980s, Chaum was worried about a specific consequence of moving payments online: every electronic transaction would leave a record at a financial institution, and the aggregate of those records would let anyone with access build a complete picture of a person's life — where they shopped, what they read, who they associated with. His 1985 paper is explicit about the stakes:

> "Computerization is robbing individuals of the ability to monitor and control the ways information about them is used. [...] The foundation is being laid for a dossier society, in which computers could be used to infer individuals' lifestyles, habits, whereabouts, and associations from data collected in ordinary consumer transactions."
> — David Chaum, [Security Without Identification: Transaction Systems to Make Big Brother Obsolete](https://www.chaum.com/publications/Security_Wthout_Identification.html), 1985

Chaum's goal was not to eliminate the bank as record-keeper — he accepted a trusted issuer as part of the design — but to make it *cryptographically impossible* for the issuer to link a withdrawal to the later spending of that same money, even though the issuer processes both events.

## How it works: blind signatures

Chaum's core invention, described in his 1982 paper [Blind Signatures for Untraceable Payments](https://www.chaum.com/publications/Chaum-blind-signatures.PDF), is a way to get a signature on a message without the signer ever seeing the message.

Here is the mechanism in concrete terms, using RSA-style blind signatures as Chaum originally proposed:

1. **Alice generates a coin.** She picks a random, unique serial number `s` for a coin worth, say, $10.
2. **Alice blinds it.** She multiplies `s` by a random blinding factor `r` (raised to the bank's public exponent), producing a blinded value `s' = s · r^e mod n`. This blinded value looks like random noise to anyone who doesn't know `r`.
3. **The bank signs the blinded value.** Alice sends `s'` to her bank along with a request to debit $10 from her account. The bank signs `s'` with its private key for the "$10 coin" denomination, producing `sig(s')`, and debits Alice's account. Critically, the bank never sees `s` — only the blinded `s'`.
4. **Alice unblinds it.** Using the blinding factor `r` she generated, Alice can mathematically remove the blinding from the bank's signature, computing `sig(s)` — a valid bank signature on the *original, unblinded* serial number — without the bank ever having seen that unblinded value.
5. **Alice spends the coin.** She gives `(s, sig(s))` to a merchant. The merchant sends it to the bank, which verifies the signature is valid and checks `s` against a list of already-spent serial numbers. If unused, the bank credits the merchant and marks `s` as spent.

The bank can verify that `sig(s)` is a genuine signature it produced (proving the coin is real, not counterfeit), but it has no way to connect `s` back to the blinded value `s'` it originally signed for Alice — the blinding factor `r` made that connection mathematically unrecoverable. The bank knows *someone* withdrew a valid $10 coin and *someone* spent one; it cannot prove they are the same person from the cryptography alone.

## Example

```text
Alice's bank account: $100
                       │
                       │  1. generate s = "9F3A...", blind with r → s'
                       ▼
              Alice ──────────► Bank
                     s', "debit $10"
                                 │
                                 │ 2. bank signs s' blindly, debits $100 → $90
                                 ▼
              Alice ◄────────── Bank
                     sig(s')
                       │
                       │ 3. Alice removes blinding factor r
                       │    → now holds (s, sig(s))
                       ▼
              Alice ──────────► Merchant   (pays with coin s)
                       │
                       │ 4. Merchant redeems (s, sig(s)) at Bank
                       ▼
                     Bank checks: sig(s) valid? s already spent?
                     → credits merchant $10, marks s as spent
```

The bank's ledger records two unlinked events: "issued a $10 coin" and "redeemed coin `s`, which nobody had spent before." Nothing in that ledger connects the coin to Alice.

## DigiCash the company

Chaum founded **DigiCash** in Amsterdam in 1989 to commercialize this research, with a product called **ecash**. Several real banks piloted it in the 1990s, including Deutsche Bank, Credit Suisse, and the U.S.-based Mark Twain Bank, which offered ecash accounts to retail customers starting in 1995. Microsoft reportedly discussed integrating ecash into Windows 95 for internet payments.

DigiCash filed for bankruptcy in 1998 and was later sold off in pieces. The reasons are debated and likely multiple: the merchant and consumer adoption needed for a two-sided payment network never reached critical mass in an era when e-commerce itself was young; Chaum has been described by contemporaries as a difficult business partner who was reluctant to relinquish control over deal terms; and DigiCash required partnering banks to run its proprietary software, which was a heavier lift than the credit-card rails merchants and consumers already had.

## Tradeoffs

Ecash's privacy-for-the-payer model was genuinely novel and, at the level of the cryptography itself, achieved something later systems — including Bitcoin, at the base protocol level — do not: strong, cryptographically enforced unlinkability between withdrawal and spending, without needing an entirely separate obfuscation layer.

What ecash did not solve is the problem that motivates the rest of this section. It required:

- **A single trusted issuer per currency.** DigiCash or a partnering bank has to be honest about how much money it issues, since nothing in the blind-signature scheme itself prevents the issuer from printing coins it isn't backing — there's no public, auditable total supply.
- **Online double-spend checking.** The bank must be consulted at redemption time to check whether a serial number has already been spent, because nothing in the coin itself prevents a user from spending a copy of the same `(s, sig(s))` pair twice. Chaum published offline variants that could detect double-spending after the fact by encoding the spender's identity in a way that only becomes recoverable if the same coin is used twice, but these did not achieve wide deployment.
- **The issuer's continued existence and cooperation.** When DigiCash went bankrupt, ecash balances had no path forward independent of the company.

This is exactly the gap identified in [Why Digital Cash Was Hard](./digital-cash.md): Chaum solved *privacy* against a trusted third party, not the *existence* of the trusted third party. Bitcoin approaches the same original goal — payment without a party that can freeze, reverse, or surveil transactions — from the opposite direction: it accepts full transaction transparency (Bitcoin transactions are pseudonymous, not anonymous — anyone can see amounts and addresses on the public [blockchain](../blockchain/README.md)) in exchange for having no issuer at all. This is a genuine tradeoff, not a strict improvement; see [Privacy](../society/privacy.md) for how the ecosystem has tried to add privacy back on top of a transparent ledger.

## Common misconceptions

**Chaum's ecash was not decentralized.** It required a central issuing bank for every currency. The privacy was cryptographic; the issuance was not.

**Chaum did not fail to solve double-spending.** His online scheme prevented it the same way a bank prevents overdrafts: by checking a central database at spend time. What he did not solve — and, by the design of blind signatures, could not easily solve without an issuer — was double-spend prevention without any central check.

## Further reading

- [Security Without Identification: Transaction Systems to Make Big Brother Obsolete](https://www.chaum.com/publications/Security_Wthout_Identification.html) — David Chaum, Communications of the ACM, 1985
- [Blind Signatures for Untraceable Payments](https://www.chaum.com/publications/Chaum-blind-signatures.PDF) — David Chaum, CRYPTO '82
- [David Chaum's publication archive](https://www.chaum.com/publications/)

---

[← Previous: The Cypherpunk Movement](./cypherpunks.md)
·
[Back to Origins](./README.md)
·
[Next: Hashcash →](./hashcash.md)
