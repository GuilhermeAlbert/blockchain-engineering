# Proxy Contracts

A proxy contract forwards every call it receives to a separate implementation contract, using [DELEGATECALL](../evm/message-calls.md#delegatecall-borrowed-code-your-own-context) so the implementation's code executes against the proxy's own storage. This chapter builds a minimal, working version of that pattern and covers the specific risk that makes it genuinely easy to get wrong.

## A minimal, working proxy

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MinimalProxy {
    address public implementation;

    constructor(address _implementation) {
        implementation = _implementation;
    }

    fallback() external payable {
        address impl = implementation;
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
}
```

Verified: this compiles cleanly with solc 0.8.26. The inline assembly (Yul, Solidity's low-level intermediate language) is necessary here specifically because Solidity's ordinary syntax has no way to forward arbitrary, unknown calldata and arbitrary, unknown return data to a `DELEGATECALL` and back — the proxy needs to work correctly for *any* function on the implementation, including ones it was never compiled with knowledge of, which is exactly the generic forwarding this assembly block implements: copy incoming calldata, `delegatecall` the implementation, copy back whatever it returned (or revert with whatever error it produced).

## The storage collision risk

This is the danger this chapter's introduction flagged directly. Because `DELEGATECALL` makes the implementation's code operate on the **proxy's own storage layout** (recall [Storage](../evm/storage.md#storage-layout-for-complex-types): state variables occupy storage slots in declaration order), the proxy and the implementation must agree, precisely, on which storage slot each variable occupies — if the proxy declares `address public implementation` at slot 0, and the implementation contract *also* declares its own state variable at what it thinks is slot 0 (perhaps a token's `totalSupply`), the implementation's code will read and write the proxy's `implementation` address variable, thinking it's writing `totalSupply` — a genuine, documented category of smart contract vulnerability, not a hypothetical concern.

```text
Proxy's storage:                Implementation's code, run via DELEGATECALL,
  slot 0: implementation addr    thinks slot 0 holds:
                                    totalSupply  ← WRONG — actually overwrites
                                                    the proxy's implementation
                                                    address, potentially redirecting
                                                    all future calls anywhere
                                                    the attacker chooses
```

## How real proxy standards avoid this: unstructured storage

Production proxy patterns — most notably [EIP-1967](https://eips.ethereum.org/EIPS/eip-1967), the standard OpenZeppelin's upgradeable contracts and most audited proxy implementations follow — avoid this collision by storing the implementation address (and other proxy-specific data) at a **pseudo-random, deliberately unlikely-to-collide storage slot**, computed as something like `keccak256("eip1967.proxy.implementation") - 1`, rather than at slot 0 or any other low, easily-collided slot number a straightforward implementation contract might naturally use for its own first declared variable. This is precisely why the minimal proxy above, storing `implementation` at the natural slot 0, is a genuine teaching simplification, not something to deploy for real value — a real deployment needs the EIP-1967 slot convention (or an equivalent) specifically to make collision with the implementation's own variables astronomically unlikely rather than a real, live risk.

## Common misconceptions

**A proxy pattern does not make a contract "the same contract" as its implementation in every sense** — the proxy has its own address (which is what users and other contracts actually interact with), its own storage, and its own balance; only the *executing code* comes from the implementation, borrowed via `DELEGATECALL` for the duration of each call.

**Changing which implementation a proxy points to is not, by itself, always evidence of malicious intent** — legitimate, well-governed upgradeable systems do this routinely and often transparently (frequently behind a timelock or multisig, see [Multisig](../wallets/multisig.md)) to fix bugs or add features; the same mechanism, in a badly designed or maliciously operated system, can also be used to rug-pull users by swapping in arbitrary, hostile logic — the mechanism itself is neutral, and what actually governs *who* can change the implementation (see [Access Control](../security/access-control.md)) is what determines whether a specific deployment's upgradeability is a safety feature or a risk.

## Further reading

- [EIP-1967: Standard Proxy Storage Slots](https://eips.ethereum.org/EIPS/eip-1967)
- [OpenZeppelin: Proxy Upgrade Pattern](https://docs.openzeppelin.com/upgrades-plugins/proxies)

---

[← Previous: Libraries](./libraries.md)
·
[Back to Smart Contracts](./README.md)
·
[Next: Upgradeable Contracts →](./upgrades.md)
