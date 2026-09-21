# Lightning Nodes

A Lightning node is software that manages channels, routes payments, and (for nodes wanting full trust-minimization) connects to a Bitcoin full node to independently verify on-chain events relevant to its channels. This closing chapter of the Lightning section covers the practical software landscape and the specific relationship between a Lightning node and the Bitcoin full node it depends on.

## The dependency on a Bitcoin full node

Every meaningful Lightning security guarantee covered throughout this section — detecting a revoked commitment broadcast (see [Payment Channels](./payment-channels.md#the-revocation-mechanism)), confirming a funding transaction (see [Funding Transactions](./funding-transactions.md#why-it-needs-confirmations-before-the-channel-is-considered-safely-open)), knowing when a timelock has actually expired — depends on accurate, timely, trustworthy visibility into the Bitcoin blockchain. This is exactly why a Lightning node needs a working relationship with a Bitcoin node: it needs to watch the chain for exactly the events its open channels care about. A Lightning node connected to a dishonest or unreliable chain-data source inherits that same weakness, directly undermining the on-chain enforcement guarantees the entire channel security model depends on — which is why running your own Bitcoin full node alongside a Lightning node (rather than relying on a third-party chain-data API) is the more trust-minimized configuration, echoing the same general full-node-versus-light-client tradeoff covered in [Full Nodes](../bitcoin/full-nodes.md) and [Light Clients](../bitcoin/light-clients.md).

## The major implementations

Several independent Lightning node implementations exist and interoperate through the shared BOLT specifications (see the [BOLT specifications](https://github.com/lightning/bolts) referenced throughout this section) — most prominently **LND** (Lightning Labs), **Core Lightning** (Blockstream, formerly c-lightning), **Eclair** (ACINQ), and **LDK** (Lightning Development Kit, a library for embedding Lightning functionality directly into other applications rather than running as standalone node software). Interoperability across independently developed implementations, all correctly routing payments and enforcing penalties against each other regardless of which specific software each party runs, is itself a real, practical validation of the shared BOLT specification process working as intended.

## Routing nodes versus leaf nodes

Not every Lightning node participates in routing other people's payments. A **routing node** maintains multiple, well-balanced channels specifically to forward third-party payments (earning routing fees for doing so, a real, if often modest, source of revenue for well-run routing node operators) and typically runs with high uptime and carefully managed liquidity. A **leaf node** — the far more common case for casual, individual users — primarily sends and receives its own payments through one or a few channels, without necessarily routing significant third-party traffic. Both are legitimate, complete ways to participate in the network; the distinction is about operational role, not any difference in the underlying protocol each follows.

## Common misconceptions

**Running a Lightning node is not the same as running a Bitcoin node**, though a fully trust-minimized Lightning setup requires both — a Lightning node specifically manages channels and routing; a Bitcoin full node independently validates the underlying blockchain, and the Lightning node depends on that validated view for its own security guarantees to actually hold.

**Not every Lightning node earns routing fees or meaningfully participates in network-wide payment routing** — many nodes exist purely to send and receive their own payments, and this is a complete, valid way to use Lightning, not an incomplete or lesser setup compared to running a routing node.

## Further reading

- [BOLT specifications](https://github.com/lightning/bolts)
- See also: [Full Nodes](../bitcoin/full-nodes.md), [Light Clients](../bitcoin/light-clients.md)

---

[← Previous: Watchtowers](./watchtowers.md)
·
[Back to Lightning Network](./README.md)
·
[Next: Ethereum Accounts →](../ethereum/accounts.md)
