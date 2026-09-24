# Event Processing

Event processors turn chain records into effects: update a balance view, send a notification, credit an account, trigger a workflow, or publish another message. Networks and queues retry, so processing must remain correct when the same event arrives more than once.

## At-least-once is the practical baseline

A producer cannot know whether a consumer committed an effect if the acknowledgement is lost. Retrying avoids silent loss but creates duplicates. “Exactly once” systems usually achieve the effect through idempotent writes, transactional boundaries, or deduplication rather than transport that never repeats a message.

Define an event identity from stable chain fields. For an EVM log, chain ID, block hash, transaction hash, and log index identify one occurrence. A business operation may need its own key if several logs represent one outcome.

## Atomic state and outbox

Writing database state and publishing a queue message are two separate effects. If the process crashes between them, one succeeds without the other. The transactional outbox pattern writes the state change and an outbound record in one database transaction. A relay later publishes unsent outbox rows and marks them delivered. Duplicate publication remains possible, so consumers stay idempotent.

## Ordering and partitioning

Global ordering limits throughput and is often unnecessary. Identify the entity whose events require order, such as one account, vault, or contract, and partition by that key. Preserve block, transaction, and log order within a block when contract semantics depend on it.

Do not process block N+1 as final state if block N for the same entity is still unresolved. A retry queue must not silently move a failed event behind later dependent events.

## Reversible and irreversible effects

Database rows can be rolled back after a reorg. An email, bank transfer, or external API call may not be reversible. Delay irreversible effects until the required confirmation policy, or model them as tentative and send a compensating action if the business process supports it.

Store processing status, attempt count, error class, next retry time, and source block identity. Dead-letter queues need an operator procedure and replay command; otherwise they become hidden data loss.

## Further reading

- [CloudEvents specification](https://cloudevents.io/)
- See also: [Reorg Handling](./reorg-handling.md), [Webhooks](./webhooks.md)

---

[← Previous: Blockchain Data Pipelines](./data-pipelines.md)
·
[Back to Infrastructure](./README.md)
·
[Next: Reorg Handling →](./reorg-handling.md)
