# Smart Contracts

Solidity compiles down to exactly the bytecode examined directly in [The EVM](../evm/README.md). This section covers the language from the other direction, going feature by feature from a working "hello world" contract through inheritance, upgradeability, testing, and deployment. Every non-trivial code example in this section has been compiled with a real Solidity compiler (solc 0.8.26) and confirmed to build cleanly, not just written to look plausible.

## What you need to know first

[The EVM](../evm/README.md). This section explains Solidity constructs largely in terms of what EVM-level mechanism they compile to (a `view` function's `STATICCALL` guarantee, `DELEGATECALL` underlying proxies, storage slots underlying state variables and mappings), so understanding the machine underneath makes the language's specific rules much less arbitrary.

## Chapters

1. [Solidity](./solidity.md): a minimal contract, compiled, and why the language looks the way it does
2. [Contract ABI](./abi.md): function selectors computed and cross-checked against a known real value
3. [Functions](./functions.md): visibility, view/pure, and payable, verified against compiled ABI output
4. [State Variables](./state.md): declaration, storage packing, constants, and immutables
5. [Mappings](./mappings.md): why every key already has a value, and what that means for enumeration
6. [Events and Logs](./events.md): off-chain-only records, and why they're far cheaper than storage
7. [Modifiers](./modifiers.md): the `_;` placeholder, and what it actually controls
8. [Errors and Reverts](./errors.md): require, custom errors, and assert compared directly
9. [Payable Functions](./payable.md): receive/fallback routing, and the three ways to send ether
10. [Inheritance](./inheritance.md): virtual/override, and Solidity's C3 linearization rule
11. [Libraries](./libraries.md): stateless, reusable code and the `using for` syntax
12. [Proxy Contracts](./proxies.md): a working minimal proxy, and the storage-collision risk it simplifies away
13. [Upgradeable Contracts](./upgrades.md): Transparent, UUPS, and Diamond patterns, and who controls the risk
14. [Testing](./testing.md): Foundry's cheatcodes and fuzz testing, against a real embedded EVM
15. [Deployment](./deployment.md): CREATE vs. CREATE2 addressing, and what contract verification actually proves

## Next

Continue to [Tokens](../tokens/README.md), where this section's mappings, events, and errors patterns combine into the actual ERC-20, ERC-721, and ERC-1155 standards.
