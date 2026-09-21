# Contract Creation

Two opcodes create new contracts: `CREATE` and `CREATE2`. This chapter covers both, and specifically the address-determinism property `CREATE2` adds. The specific capability that makes several DeFi and Layer 2 patterns possible.

## CREATE: address determined by sender and nonce

A contract created via `CREATE` (or, at the top level, via an ordinary contract-creation transaction. See [Ethereum Transactions](../ethereum/transactions.md#core-fields)) is assigned an address computed as `keccak256(rlp_encode(senderAddress, senderNonce))`, truncated to the usual 20 bytes. This means a `CREATE`-deployed contract's address is **predictable in advance**, but only if you know the deploying account's exact nonce at deployment time, since the nonce increments with every transaction that account sends, this is often awkward to predict reliably in complex, multi-step scenarios where the exact ordering of other transactions from the same account isn't fully known ahead of time.

## CREATE2: address determined by a chosen salt

[EIP-1014](https://eips.ethereum.org/EIPS/eip-1014) introduced `CREATE2`, computing the new address as `keccak256(0xff . senderAddress . salt . keccak256(initCode))`, where **salt** is an arbitrary 32-byte value the deployer chooses. The critical difference from `CREATE`: this address depends on the salt and the init code's own content, **not** on the sender's current nonce, meaning the deploying contract can compute, and anyone else can independently verify, exactly what address a given `(sender, salt, initCode)` combination will produce, *before* actually deploying anything there, and regardless of how many other transactions the sender account sends in the meantime.

```text
CREATE:   address = f(senderAddress, senderNonce)
                     — depends on deployment order/timing

CREATE2:  address = f(senderAddress, salt, keccak256(initCode))
                     — depends only on values the deployer chooses directly,
                       fully predictable and independently verifiable in advance
```

## Why predictable addresses matter

This property enables patterns that would otherwise require an on-chain deployment step to even know what address to reference. Some documented, real use cases: **counterfactual deployment** (a Layer 2 or state-channel system can compute and reference an address for a contract that doesn't exist yet, deploying it only later, if and when actually needed, used in some account abstraction and channel-based designs); and **deterministic multi-chain deployment** (a project deploying the identical contract at the identical address across many different chains, useful for cross-chain tooling that assumes a consistent address, achievable because the same sender, salt, and init code produce the same address on any chain sharing the same address-derivation formula).

## The two-step creation process, restated

As covered in [Contract Accounts](../ethereum/contract-accounts.md#how-a-contract-account-comes-into-existence), both `CREATE` and `CREATE2` run supplied **init code** once, and whatever that init code *returns* becomes the new contract's permanently stored runtime code, the init code itself, including any deployment-time logic (constructor arguments, one-time setup), is never itself stored on-chain, only executed once and then discarded.

## Common misconceptions

**`CREATE2` does not let you deploy the same exact contract (same code, same storage) to the same address on two different occasions** without first destroying the original (an address computed by `CREATE2` can only hold one contract's code at a time; redeploying to an address that already has code deployed fails, and if that contract self-destructed (a much rarer scenario since [EIP-6780](https://eips.ethereum.org/EIPS/eip-6780) restricted `SELFDESTRUCT`'s effects, see [Opcodes](./opcodes.md#common-misconceptions)), the redeployment starts with genuinely fresh, empty storage) it doesn't somehow inherit or reuse anything from what was there before.

**A `CREATE2`-computed address is not "reserved" or protected from receiving funds before the contract is actually deployed there**. Ether can be sent to a `CREATE2`-computed address at any time, even before any contract exists there, since it's just an ordinary address as far as the protocol is concerned until code actually gets deployed to it.

## Further reading

- [EIP-1014: Skinny CREATE2](https://eips.ethereum.org/EIPS/eip-1014)
- [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf): Section 7 (Contract Creation)

---

[← Previous: Message Calls](./message-calls.md)
·
[Back to The EVM](./README.md)
·
[Next: Gas Accounting →](./gas-accounting.md)
