# Message Calls

A message call is how one piece of executing code invokes another contract — the mechanism behind every cross-contract interaction on Ethereum, from a token transfer to a DeFi protocol routing a swap through multiple pools. This chapter covers the four call opcodes and the one distinction, `DELEGATECALL` versus `CALL`, that everything else in this chapter builds toward.

## CALL: the ordinary case

`CALL` invokes another contract with a specified address, amount of ether to send, and calldata, executing the **target's own code in the target's own context** — the target's storage is what gets read and written, `msg.sender` (as seen by the target) is the calling contract's address, and any ether sent moves from caller to target. This is the default, intuitive case: calling another contract runs *that* contract's logic against *that* contract's own state.

## STATICCALL: CALL with a read-only guarantee

`STATICCALL` behaves identically to `CALL` except it **enforces, at the protocol level, that the called code cannot modify any state** — any attempt by the target to execute `SSTORE`, emit a log, send ether, or create a contract during a `STATICCALL` causes the entire call to revert. This gives a caller a strong, protocol-enforced guarantee (not just a convention or a trust assumption) when calling an untrusted contract purely to read data from it — a real security property Solidity's `view` and `pure` function modifiers (see [View/Pure](../contracts/functions.md#view-and-pure-functions)) compile down to using.

## DELEGATECALL: borrowed code, your own context

This is the opcode worth understanding precisely, because it's genuinely unintuitive on first encounter and underlies one of Ethereum's most important patterns — upgradeable contracts (see [Proxy Contracts](../contracts/proxies.md)). `DELEGATECALL` executes the **target's code**, but using the **caller's own storage, own `msg.sender`, own `msg.value`, and own address** — as if the target's code had been copy-pasted directly into the calling contract and executed there, rather than as an independent contract with its own state.

```text
CALL:
  Contract A calls Contract B
  → B's code runs, reading/writing B's own storage
  → msg.sender (as B sees it) = A

DELEGATECALL:
  Contract A delegatecalls Contract B
  → B's code runs, but reading/writing A's storage
  → msg.sender (as B's code sees it, executing "as A") = whoever called A
  → address(this) inside B's running code = A's address, not B's
```

## Why DELEGATECALL enables upgradeable contracts

This borrowed-code-own-storage property is exactly what lets a **proxy contract** pattern work: a proxy contract holds all the actual persistent state (user balances, configuration) but contains minimal logic of its own — every call to it is forwarded via `DELEGATECALL` to a separate **implementation contract** holding the actual logic. Because the implementation's code executes against the *proxy's* storage, upgrading the system means simply pointing the proxy at a new implementation contract address — the proxy's own address (which users and other contracts interact with) and all its accumulated storage stay exactly the same; only which code runs against that storage changes. This is covered in full, including its real, documented risks, in [Proxy Contracts](../contracts/proxies.md) and [Upgradeable Contracts](../contracts/upgrades.md).

## CALLCODE: DELEGATECALL's deprecated predecessor

`CALLCODE` predates `DELEGATECALL` and shares its "run target code against caller's storage" property, but does **not** preserve the original `msg.sender` (it sets it to the calling contract instead) — a subtle difference that made it awkward and error-prone for the proxy pattern specifically, which is exactly why `DELEGATECALL` was introduced (via [EIP-7](https://eips.ethereum.org/EIPS/eip-7), among Ethereum's earliest EIPs) as a corrected replacement. Modern Solidity code essentially never uses `CALLCODE` directly.

## Common misconceptions

**`DELEGATECALL` does not mean the calling contract gains the target's storage** — the reverse: the *target's code* operates on the *caller's* storage, which is precisely why proxy contracts and their implementation contracts must carefully agree on storage layout (see [Proxy Contracts](../contracts/proxies.md#the-storage-collision-risk)) — mismatched layouts between proxy and implementation are a real, documented, and serious category of smart contract bug.

**A `STATICCALL`'s read-only restriction is enforced by the EVM itself, not merely a Solidity-level convention** — even a `DELEGATECALL` made *from within* a `STATICCALL`'s execution context inherits and continues enforcing that same restriction; there is no way for called code to escape a static context's guarantee through any combination of call types.

## Further reading

- [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) — Section 9 (Execution Model)
- [EIP-7: DELEGATECALL](https://eips.ethereum.org/EIPS/eip-7)
- [EIP-214: STATICCALL](https://eips.ethereum.org/EIPS/eip-214)

---

[← Previous: Calldata](./calldata.md)
·
[Back to The EVM](./README.md)
·
[Next: Contract Creation →](./contract-creation.md)
