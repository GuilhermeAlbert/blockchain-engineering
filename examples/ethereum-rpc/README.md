# Ethereum RPC

This project implements a small JSON-RPC client instead of hiding the protocol behind a library. It serializes requests, matches batch responses by ID, distinguishes HTTP and JSON-RPC errors, and parses quantities as `bigint`.

## Run

```bash
npm install
npm test
npm run demo
```

The tests use an injected local `fetch` function and require no network. The demo makes no request unless `RPC_URL` is set:

```bash
RPC_URL=https://your-read-only-endpoint.example npm run demo
```

The URL may contain a credential. The program never prints it. Use a read-only endpoint and do not place production secrets in shell history.

## What the tests cover

- request IDs and JSON serialization
- HTTP and JSON-RPC errors
- malformed responses
- exact hexadecimal quantities beyond JavaScript's safe integer range
- batch responses returned out of order
- duplicate response IDs

See [RPC](../../chapters/infrastructure/rpc.md) for the consistency and retry rules around the wire format.
