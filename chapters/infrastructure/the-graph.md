# The Graph

The Graph turns blockchain data into GraphQL APIs called subgraphs. A subgraph defines which contracts and events to read, how handlers transform them, and which entities queries can return.

## Subgraph components

The manifest, commonly `subgraph.yaml`, names the network, data sources, contract ABIs, start blocks, and event or call handlers. `schema.graphql` defines stored entities and query fields. Mapping code processes chain triggers deterministically and writes entities.

A precise start block avoids scanning history before a contract existed. Dynamic data sources let mappings begin following contracts created by a factory. The handler still needs stable entity IDs and rules for multiple events affecting the same entity.

## Graph Node

Graph Node connects to chain RPC, fetches triggers, runs mappings, stores entities in PostgreSQL, and serves GraphQL. Some subgraphs require archive state or trace methods. Provider capability therefore affects whether indexing succeeds, not only how fast it runs.

Indexing has three broad costs: finding relevant chain data, executing mappings and contract calls, and writing entities. Metrics should separate them. A slow provider, a mapping with many calls, and a contended database require different repairs.

## Determinism and errors

Mappings must produce the same result for every indexer processing the same chain. They cannot depend on arbitrary web APIs or local time. Data fetched from content-addressed storage can be used only through supported deterministic mechanisms.

An indexing error may stop a subgraph or mark results as potentially incomplete depending on configuration and query policy. Applications should inspect indexing status and block metadata rather than assume a successful GraphQL response is current.

## Network roles

On The Graph Network, subgraph developers publish definitions, indexers operate Graph Node and serve queries, curators signal expected demand, and delegators assign stake to indexers. A proof of indexing commits to the entity-store operations produced through a block. It does not make the subgraph's schema or business interpretation correct; it shows consistent execution of that definition.

## Versioning and rebuilds

Changing mappings or schema creates a new subgraph version. Historical entities built under old logic do not repair themselves. Deploy the new version, sync it, compare results, then move queries deliberately. Grafting can reuse compatible history and begin new processing at a selected block, but compatibility and correctness remain the developer's responsibility.

## Further reading

- [Subgraphs overview](https://thegraph.com/docs/en/subgraphs/overview/)
- [Graph Node documentation](https://thegraph.com/docs/en/indexing/tooling/graph-node/)
- [Subgraph manifest](https://thegraph.com/docs/en/subgraphs/developing/creating/subgraph-manifest/)

---

[← Previous: Indexers](./indexers.md)
·
[Back to Infrastructure](./README.md)
·
[Next: Block Explorers →](./block-explorers.md)
