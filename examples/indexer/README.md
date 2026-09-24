# Reorg-Safe Indexer

This project applies deterministic block fixtures to an in-memory store. Every event keeps block identity, transaction hash, and log index. A simulated reorganization rolls orphaned effects back before applying the replacement branch.

```bash
npm install
npm test
npm run demo
```

Tests cover checkpoints, restart, duplicate delivery, multiple logs in one transaction, one-branch rollback, replacement blocks, and unknown parents. The in-memory store keeps the state transition visible; a production implementation would place block effects and checkpoint updates in one database transaction.

See [Reorg Handling](../../chapters/infrastructure/reorg-handling.md) for the operational model.
