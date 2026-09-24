# Webhooks

A webhook is an HTTP delivery attempt, not a durable fact. The sender posts an event to a consumer endpoint and retries when acknowledgement is missing. Consumers must authenticate the sender, tolerate duplicates, and fetch canonical context when the event matters.

## Authenticate the body actually received

Providers commonly sign the raw request body with a shared secret or asymmetric key. Verify the signature before parsing or acting. Frameworks that parse and reserialize JSON can change whitespace or key order, so retain the raw bytes used by the signature scheme.

Include a timestamp and reject requests outside a bounded window to limit replay. Rotate secrets with an overlap period that accepts old and new keys. Use constant-time comparison for message authentication codes.

## Acknowledge after durable acceptance

If processing may take time, validate the request, write it to a durable inbox with a unique delivery or event ID, and return success. A worker performs the business action. Returning success before durable storage can lose the event. Waiting for every downstream call can trigger provider retries and duplicate work.

Document which status codes cause retry and the retry horizon. Providers may stop after a fixed period. A reconciliation process should compare checkpoints or query missed ranges so a webhook outage does not create permanent gaps.

## Ordering and duplicates

HTTP deliveries can arrive out of order. Multiple attempts can run concurrently. Use chain position and entity version, not arrival time, to order effects. Insert with a unique event key, then make state transitions conditional on the expected prior state.

A webhook saying a transaction was confirmed reflects the provider's observation at one moment. Store block hash and confirmation state, then reconcile reorg-sensitive events through RPC.

## Endpoint safety

Set body-size limits, timeouts, concurrency bounds, and narrow content types. Do not place secrets in query strings that proxies and logs record. Separate webhook authentication failure from temporary processing failure so the sender does not retry invalid traffic forever.

## Further reading

- [CloudEvents specification](https://cloudevents.io/)
- See also: [Event Processing](./event-processing.md), [Reorg Handling](./reorg-handling.md)

---

[← Previous: Reorg Handling](./reorg-handling.md)
·
[Back to Infrastructure](./README.md)
·
[Next: Caching →](./caching.md)
