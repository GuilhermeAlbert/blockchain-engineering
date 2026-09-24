# Solidity Compilation

This project compiles a small `Counter` contract with a pinned Solidity compiler. The contract demonstrates state, an event, a custom error, owner-only reset, and explicit rejection of Ether.

```bash
npm install
npm test
npm run demo
```

The tests check compiler diagnostics, ABI entries, creation bytecode, and runtime bytecode. They do not deploy to a network or use a private key.

Successful compilation is not an audit. It proves that one compiler version accepted the source and produced artifacts. See [Smart Contract Auditing](../../chapters/security/auditing.md) for the broader review boundary.
