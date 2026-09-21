# WalletConnect

[Connecting Wallets](./wallet-connections.md) covered EIP-1193, the browser-extension connection model. That model has an obvious gap: it does nothing for a mobile wallet app, which isn't running inside the same browser as the dapp at all. WalletConnect solves this specific problem.

## The problem: two separate devices, or two separate apps

A mobile wallet app and a desktop browser running a dapp are two entirely separate processes with no shared browser context to inject a `window.ethereum` object into. WalletConnect bridges them: the dapp displays a QR code (or a deep link, on mobile-to-mobile connections) encoding a session proposal; the wallet app scans or opens it, establishing an encrypted, direct communication channel between the two, relayed through WalletConnect's own relay infrastructure without that infrastructure ever seeing the actual signed content in plaintext.

## The connection and signing flow

1. The dapp generates a session proposal and displays it as a QR code.
2. The user's wallet app scans the code, establishing an encrypted session with the dapp.
3. The dapp can now send requests (view an address, request a signature, request a transaction) over this session.
4. The wallet app receives each request, displays it to the user for explicit approval (exactly the same per-action approval requirement covered in [Connecting Wallets](./wallet-connections.md#what-connecting-actually-grants-and-doesnt)), and sends the signed result back over the same encrypted channel.

## Why encryption matters here specifically

Because the dapp and wallet are genuinely separate devices communicating over the open internet (relayed through WalletConnect's infrastructure, not a direct connection), the session is end-to-end encrypted specifically so that the relay infrastructure itself (a third party neither the dapp author nor the wallet user necessarily has any direct relationship with) cannot read the actual transaction or signature data passing through it, only that *some* encrypted traffic is flowing between two paired sessions.

## What WalletConnect does and doesn't change about the underlying trust model

This is worth stating precisely, since it's easy to assume a new connection mechanism changes the underlying security properties: WalletConnect changes **how** a signature or transaction request reaches the wallet for approval. It does not change **what** that request actually contains, or the user's fundamental responsibility to review it carefully before approving. The same phishing and malicious-signature risks covered in [Connecting Wallets](./wallet-connections.md#why-this-distinction-matters-for-security) apply identically over a WalletConnect session as they do over a direct browser-extension connection, a disguised, malicious request looks the same regardless of which transport carried it to the wallet for approval.

## Common misconceptions

**WalletConnect is not itself a wallet**. It's a connection protocol; the actual signing, key custody, and transaction approval happen entirely within whichever wallet app the user has chosen to use, exactly as with a browser-extension connection.

**A WalletConnect session being "encrypted" does not mean a malicious dapp cannot send a malicious request through it**. Encryption protects the *transport* from eavesdropping by the relay infrastructure; it says nothing about whether the *content* being transported (a specific transaction or signature request) is itself honest or safe to approve, which remains entirely the user's own responsibility to evaluate.

## Further reading

- [WalletConnect documentation](https://docs.walletconnect.com/)

---

[← Previous: Connecting Wallets](./wallet-connections.md)
·
[Back to Building Web3 Applications](./README.md)
·
[Next: Reading Blockchain State →](./reading-state.md)
