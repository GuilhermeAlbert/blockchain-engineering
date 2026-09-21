# Deployment

Deploying a contract means broadcasting a contract-creation transaction (see [Contract Creation](../evm/contract-creation.md)) and waiting for it to be mined — this closing chapter of the Contracts section covers the practical deployment workflow and the verification step that lets others confirm what's actually running at a deployed address.

## Deploying with Foundry

```bash
forge create --rpc-url $RPC_URL --private-key $PRIVATE_KEY src/Counter.sol:Counter
```

This compiles `Counter.sol`, constructs a contract-creation transaction with the compiled bytecode as its `data` field (recall from [Contract Creation](../evm/contract-creation.md#how-a-contract-account-comes-into-existence) that this data is *init code*, executed once, whose return value becomes the deployed runtime code), signs it with the provided key, and broadcasts it via the specified RPC endpoint (see [RPC Providers](../web3/rpc-providers.md)). For contracts with constructor arguments, Foundry's `--constructor-args` flag ABI-encodes and appends them to the deployment transaction's data, exactly the encoding scheme covered in [Contract ABI](./abi.md#encoding-arguments).

## Foundry scripts: deployment as code

For anything beyond a single, simple contract, Foundry scripts (written in Solidity, run via `forge script`) let a deployment sequence — deploy contract A, deploy contract B with A's address as a constructor argument, call a setup function on B — be expressed as ordinary, testable Solidity code rather than a sequence of manually run shell commands, reducing the risk of a manual step being forgotten or performed in the wrong order during a real deployment.

## Contract verification

Once deployed, a contract's on-chain presence is just bytecode — nobody observing the blockchain directly can tell what source code produced it. **Verification** (offered by block explorers like Etherscan, and increasingly standardized across chains) closes this gap: a developer submits their exact source code, compiler version, and compilation settings; the explorer independently recompiles it and checks whether the result byte-for-byte matches the deployed bytecode. A successful match lets the explorer display readable source code and a matching ABI for anyone inspecting that address — a real, checkable claim ("this deployed bytecode really does come from this human-readable source"), not merely an assertion the deploying team makes.

## Why deployment addresses matter for CREATE vs. CREATE2

Recall [Contract Creation](../evm/contract-creation.md#create-address-determined-by-sender-and-nonce): an ordinary deployment's address depends on the deployer's nonce at deployment time, meaning redeploying (after a failed transaction, or from a different environment) can produce a different address than expected if other transactions from the same account happened in between. Projects that need address predictability across multiple chains or deployment attempts (a common requirement for [Layer 2](../layer-2/README.md) infrastructure and some DeFi protocols) generally use `CREATE2` with a fixed, chosen salt specifically to sidestep this nonce-dependency entirely.

## Testnets and local nodes

Before deploying to a real network with real value at stake, deployment is typically tested on a local node (Foundry's `anvil`, a fast, locally-run Ethereum node with instant block mining) and then a public testnet (a separate, real network using worthless test ether, allowing realistic testing of gas costs, RPC interaction, and multi-block timing without financial risk) — a staged progression this book's own [Web3](../web3/README.md) and later Solidity-adjacent examples generally assume, rather than deploying directly to Ethereum mainnet as a first step.

## Common misconceptions

**A verified contract's displayed source code is not a guarantee of correctness or safety** — verification only confirms that the displayed source genuinely compiles to the deployed bytecode; it says nothing about whether that source is free of bugs, backdoors intentionally left in by its author, or the security issues covered in [Security](../security/README.md).

**Deploying to a testnet is not risk-free in every sense** — while testnet ether has no real monetary value, testnet deployments can still have real reputational or coordination costs if used carelessly (address confusion between testnet and mainnet deployments has caused real, documented user errors), and this book's guidance to never use real keys or funds in examples applies to testnet private keys too, since a testnet key habitually reused could plausibly be reused by mistake for a mainnet transaction as well.

## Further reading

- [Foundry Book: Deploying Contracts](https://book.getfoundry.sh/forge/deploying)
- [Etherscan: Contract Verification](https://docs.etherscan.io/etherscan-v2/contract-verification)

---

[← Previous: Testing](./testing.md)
·
[Back to Smart Contracts](./README.md)
·
[Next: ERC-20 →](../tokens/erc-20.md)
