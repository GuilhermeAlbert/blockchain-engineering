# The UTXO Model

This chapter answers a question posed directly in this book's introduction: where do bitcoins actually "live"? The precise answer is that they don't live anywhere in the sense a bank balance does — Bitcoin has no accounts. What exists is a set of **Unspent Transaction Outputs (UTXOs)**, and a wallet's "balance" is simply the sum of whichever UTXOs its keys can spend, computed fresh each time rather than stored as a running total anywhere.

## The problem this model solves

Don't say: "Your Bitcoin is stored in your wallet." Say precisely what's true: **the wallet manages the private keys and transaction data required to spend UTXOs associated with addresses controlled by those keys.** This distinction matters because it changes what you're actually reasoning about when you think through how Bitcoin transactions work, how fees are calculated, and why concepts like "dust" and "coin selection" exist at all — none of which make sense under an account-balance mental model.

## What a UTXO actually is

A UTXO is a specific output from a specific past transaction that has not yet been used as an input to any later transaction. Every UTXO is uniquely identified by the pair `(txid, output index)` — which transaction created it, and which output position within that transaction (since a transaction can have multiple outputs). Each UTXO carries: an amount (in satoshis, the smallest unit — 1 BTC = 100,000,000 satoshis) and a locking script (`scriptPubKey`) defining the condition that must be satisfied to spend it (covered fully in [Bitcoin Script](./script.md)).

## How spending works

A new transaction **consumes** one or more existing UTXOs entirely as inputs — there's no such thing as partially spending a UTXO. If you want to send less than a UTXO's full value, the transaction creates a second output sending the leftover amount back to an address you control — this is **change**, and it works exactly like paying with a banknote larger than the purchase price and receiving change back, not like decrementing a stored balance.

```text
Before:  UTXO A (0.5 BTC) exists, owned by Alice's key

Alice wants to pay Bob 0.3 BTC.

Transaction:
  input:  UTXO A (0.5 BTC) — fully consumed, no longer unspent after this tx
  output 1: 0.3 BTC → Bob's address        (the actual payment)
  output 2: 0.1999 BTC → Alice's own address  (change, minus a 0.0001 BTC fee)

After:  UTXO A no longer exists (spent).
        Two new UTXOs exist: the 0.3 BTC output (now Bob's) and the
        0.1999 BTC change output (still Alice's).
```

Notice the fee isn't a separate line item anywhere in the transaction — it's implicit, equal to whatever's left over after subtracting all output amounts from all input amounts (see [Transaction Fees](./fees.md) for exactly how this is calculated and why).

## Combining and splitting value

The whitepaper's Section 9 describes this directly: because a payment amount rarely matches any single existing UTXO exactly, a transaction typically either **combines multiple small UTXOs** into inputs to cover a larger payment, or **splits a single larger UTXO** into a payment output and a change output — sometimes both at once. This is the origin of a wallet's **coin selection** logic: given a target payment amount and a set of available UTXOs, deciding which specific UTXOs to spend as inputs, balancing considerations like minimizing the number of inputs (fewer inputs generally means a smaller, cheaper transaction) against avoiding leaving many small, later-inconvenient-to-spend UTXOs behind.

## Example: computing a wallet's balance

A wallet's balance is not read from a single stored number anywhere — it's computed by scanning the full set of UTXOs the blockchain currently contains and summing every one whose locking script this wallet's keys can satisfy:

```typescript
interface UTXO {
  txid: string;
  outputIndex: number;
  amountSats: number;
  ownerAddress: string;
}

function walletBalance(utxos: UTXO[], myAddresses: Set<string>): number {
  return utxos
    .filter((utxo) => myAddresses.has(utxo.ownerAddress))
    .reduce((sum, utxo) => sum + utxo.amountSats, 0);
}

const utxoSet: UTXO[] = [
  { txid: "tx1", outputIndex: 0, amountSats: 50_000_000, ownerAddress: "alice-addr-1" },
  { txid: "tx2", outputIndex: 1, amountSats: 12_345_678, ownerAddress: "alice-addr-2" },
  { txid: "tx3", outputIndex: 0, amountSats: 30_000_000, ownerAddress: "bob-addr-1" },
];

const aliceAddresses = new Set(["alice-addr-1", "alice-addr-2"]);
console.log("Alice's balance (sats):", walletBalance(utxoSet, aliceAddresses));
```

Running this against the sample data sums Alice's two matching UTXOs (50,000,000 + 12,345,678 = 62,345,678 satoshis, or 0.62345678 BTC) and correctly excludes Bob's UTXO. In a real wallet, `myAddresses` is derived from the wallet's own keys (see [HD Wallets](../wallets/hd-wallets.md)), and the UTXO set comes from either a full node's own database or a third-party API — but the underlying computation is exactly this: filter and sum, freshly, every time.

## Under the hood: the UTXO set

Every full node maintains its own local database of the **current UTXO set** — every unspent output that exists right now, across the entire blockchain — because this is what's actually needed to validate new transactions quickly (checking that a claimed input genuinely is unspent) without re-scanning the entire multi-hundred-gigabyte historical blockchain for every new transaction. This UTXO set is itself a meaningful piece of state, currently numbering in the tens of millions of individual outputs, and it's exactly the data a [pruned node](./full-nodes.md#what-running-one-actually-requires) retains even after discarding old historical block data it no longer needs.

## Tradeoffs

The UTXO model has real, practical consequences compared to the account model [Ethereum uses](../ethereum/state.md) instead: it naturally supports parallel validation (unrelated transactions spending different UTXOs have no ordering dependency on each other), and it offers somewhat better privacy properties by default (there's no persistent "account" whose full transaction history is trivially linked together the way an account-model address's history is — though UTXO-based chain analysis can still link related UTXOs together in practice, see [Privacy](../society/privacy.md)). The cost is added complexity for wallet software (coin selection, tracking a potentially large number of individual UTXOs rather than one balance) and a less natural fit for complex, stateful smart contract logic, which is part of why Ethereum chose the account model instead (see [Ethereum Accounts](../ethereum/accounts.md)).

## Common misconceptions

**There is no "Bitcoin balance" stored anywhere on the blockchain for any address.** What's stored is the set of individual unspent outputs; "balance" is a derived, computed concept that wallets and block explorers calculate for display purposes, not a field that exists in any block or transaction.

**Spending "part of" a UTXO is not possible.** A UTXO is consumed entirely; any leftover value must be explicitly sent back as a new change output within the same transaction, or it's forfeited as an (unusually large) fee — a genuine, documented mistake some early, poorly-designed wallet software made, resulting in real, accidental fee overpayment.

## Try it yourself

Extend the balance example above with a `selectCoins(utxos, targetAmount)` function that picks a minimal subset of UTXOs whose sum covers a target payment amount, and compute the resulting change. This is the core of what every Bitcoin wallet's coin selection logic does.

## Further reading

- [Bitcoin whitepaper, Section 9 (Combining and Splitting Value)](https://bitcoin.org/bitcoin.pdf)
- [Bitcoin Core developer reference: Transactions](https://developer.bitcoin.org/reference/transactions.html)

---

[← Previous: Bitcoin Transactions](./transactions.md)
·
[Back to Bitcoin](./README.md)
·
[Next: Inputs and Outputs →](./inputs-and-outputs.md)
