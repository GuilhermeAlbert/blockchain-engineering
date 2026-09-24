# wagmi

wagmi is a React hooks library built on top of [viem](./viem.md), handling the specific state-management problems that come from building a wallet-connected user interface (connection state, loading states, automatic refetching) that `viem` alone, as a lower-level client library, deliberately doesn't address.

## What wagmi adds on top of viem

`viem`'s `readContract` and `writeContract` (covered in [Reading Blockchain State](./reading-state.md) and [Sending Transactions](./sending-transactions.md)) are plain async functions, calling them from a React component means manually managing loading states, error states, re-fetching on dependency changes, and caching, exactly the kind of boilerplate data-fetching libraries like React Query were built to eliminate for ordinary HTTP APIs. wagmi wraps `viem` calls in React hooks (built on React Query internally) that handle all of this automatically:

```typescript
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { erc20Abi } from "viem";

function TokenBalance({ tokenAddress }: { tokenAddress: `0x${string}` }) {
  const { address } = useAccount(); // the currently connected wallet address, reactively

  const { data: balance, isLoading } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

  if (isLoading) return <span>Loading...</span>;
  return <span>Balance: {balance?.toString()}</span>;
}
```

This component automatically re-fetches when `address` changes (a different wallet connects), handles the loading state while the query is in flight, and (through React Query's underlying caching) avoids redundant, duplicate requests if multiple components need the same data simultaneously.

## Connectors: abstracting over different wallet connection methods

wagmi's **connectors** abstract over the different ways a user might connect a wallet (a browser extension (via the EIP-1193 interface from [Connecting Wallets](./wallet-connections.md)), [WalletConnect](./walletconnect.md) for mobile wallets, or other connection methods) behind one consistent `useConnect` hook interface, so an application's UI code doesn't need separate, connector-specific logic for each supported wallet type.

## Why this layering (viem underneath, wagmi on top) makes sense

This mirrors a common, sensible pattern in software architecture generally: a lower-level, framework-agnostic library (`viem`) handling the actual protocol mechanics correctly and completely, with a higher-level, framework-specific library (`wagmi`, specifically for React) handling the ergonomics and state management particular to that framework's own patterns, rather than either library trying to do both jobs at once. An application not using React (a Node.js backend script, a Vue frontend) can use `viem` directly, exactly as this book's other verified examples do, without needing wagmi at all.

## Common misconceptions

**wagmi is not a replacement for understanding the underlying viem/JSON-RPC mechanics**. It automates real, repetitive state-management work, but every hook still ultimately performs the same reads, writes, and signature requests covered throughout this book's earlier Web3 chapters; understanding what's actually happening underneath (a `readContract` call, a `writeContract` call) remains just as relevant for debugging and reasoning about a wagmi-based application's behavior.

**wagmi hooks do not work outside a React component tree wrapped in wagmi's required provider setup**, like most React hooks libraries, wagmi requires its `WagmiProvider` (itself wrapping a configured `viem`-based client) to be present higher up the component tree; calling a wagmi hook without this setup fails immediately, not silently.

## Further reading

- [wagmi documentation](https://wagmi.sh/)

---

[← Previous: viem](./viem.md)
·
[Back to Building Web3 Applications](./README.md)
·
[Next: Decentralized Finance →](../defi/README.md)
