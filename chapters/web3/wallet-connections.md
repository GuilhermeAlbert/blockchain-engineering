# Connecting Wallets

A Web3 application doesn't hold users' private keys — it asks their wallet software to sign things on their behalf, through a standardized connection protocol. This chapter covers how that connection actually works, and the specific standard (EIP-1193) that makes different wallets interchangeable from a dapp's perspective.

## EIP-1193: the interface every browser wallet implements

Browser-based wallets (MetaMask, and most others) inject a `window.ethereum` object into every page, implementing a standard interface ([EIP-1193](https://eips.ethereum.org/EIPS/eip-1193)) for requesting account access, sending JSON-RPC requests, and subscribing to events (account changes, network changes). Because this interface is standardized, an application written against it works with any conforming wallet, without needing wallet-specific integration code — the same interoperability principle behind [Contract ABI](../contracts/abi.md)'s standardized encoding, applied here to the wallet-connection layer instead.

## The connection flow

```typescript
import { createWalletClient, custom } from "viem";
import { mainnet } from "viem/chains";

async function connectWallet() {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("No browser wallet detected");
  }

  const walletClient = createWalletClient({
    chain: mainnet,
    transport: custom(window.ethereum),
  });

  // Requests the user's explicit permission via a wallet popup —
  // nothing is accessible before the user approves this request.
  const [address] = await walletClient.requestAddresses();
  console.log("connected address:", address);
  return { walletClient, address };
}
```

This code is illustrative browser-environment code (it depends on `window.ethereum`, which only exists in a browser with an installed wallet extension) and cannot be run in this book's usual Node.js verification environment — the pattern itself, though, is exactly what libraries like `viem` and `wagmi` (see [wagmi](./wagmi.md)) wrap into more ergonomic hooks and utilities.

## What "connecting" actually grants, and doesn't

Connecting a wallet to a dapp grants that dapp visibility into the connected account's address (and, implicitly, its public on-chain activity and balances, since those are publicly readable regardless — see [Reading Blockchain State](./reading-state.md)) and the ability to **request** signatures and transactions. It does **not** grant the dapp any ability to sign or send anything without the wallet separately prompting the user to explicitly approve each individual action — connection and authorization-per-action are two distinct steps, and a well-behaved wallet always requires the second even after the first has already happened.

## Why this distinction matters for security

This is precisely the gap [phishing attacks](../security/phishing.md) exploit: a malicious site can request a wallet connection (a low-stakes, often reflexively approved action) and then present a *disguised* transaction or signature request — one that looks routine but actually authorizes something harmful (an unlimited token approval, see [Approval Attacks](../security/approval-attacks.md), or a malicious signature, see [Malicious Signatures](../security/malicious-signatures.md)) — relying on users not carefully reading what they're actually approving at that second, separate step.

## Common misconceptions

**A wallet connection is not persistent or automatically re-granted across browser sessions** in every implementation — many wallets and dapps re-request or re-confirm connection state, and a user can typically revoke a site's connection permission at any time through their wallet's own settings, independent of anything the dapp itself does.

**Connecting a wallet does not, by itself, reveal a user's private key to the dapp** in any well-implemented wallet — the entire EIP-1193 model is specifically designed so the dapp only ever receives public information (the address) and signed outputs (signatures, transaction hashes), never the key material used to produce them.

## Further reading

- [EIP-1193: Ethereum Provider JavaScript API](https://eips.ethereum.org/EIPS/eip-1193)
- [viem documentation: Wallet Client](https://viem.sh/docs/clients/wallet)

---

[← Previous: RPC Providers](./rpc-providers.md)
·
[Back to Building Web3 Applications](./README.md)
·
[Next: WalletConnect →](./walletconnect.md)
