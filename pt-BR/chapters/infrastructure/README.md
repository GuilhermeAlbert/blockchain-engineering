# Infraestrutura de cadeia de blocos

Uma aplicação blockchain raramente lê dados de consenso diretamente de um par e pára lá. Os nós expõem métodos RPC, provedores operam frotas, indexadores transformam blocos e logs em tabelas questionáveis, webhooks entregam eventos derivados e caches mantêm leituras repetidas acessíveis. Cada camada adiciona comportamento útil e outro lugar onde os dados podem se tornar tardios, duplicados, incompletos ou inconsistentes com a cadeia canônica.

Esta seção trata a infraestrutura como um sistema de correcção. A disponibilidade é importante, mas uma resposta rápida de um fork velho pode ser pior do que um erro explícito. Os capítulos seguem dados de um nó através de RPC, indexação, entrega, cache e recuperação após uma reorganização.

## Capítulos

1. [Executar um Nó](./running-a-node.md): verificação, sincronização, armazenamento, exposição e operações
2. [RPC](./rpc.md): solicitação semântica, referências de bloco, erros e pressupostos inseguros
3. [Fornecedores de RPC](./rpc-providers.md): acesso gerenciado, confiança, limites e failover
4. [Nós do Arquivo](./archive-nodes.md): estado histórico versus blocos históricos e recibos
5. [Indexadores](./indexers.md): derivação determinística, checkpoints, esquemas e backfills
6. [The Graph](./the-graph.md): subgraph manifesta, mapeamentos, Graph Node e serviço de consulta
7. [Exploradores de Blocos](./block-explorers.md): rótulos derivados, verificação e interfaces públicas de consulta
8. [Infraestruturas Mempool](./mempool.md): política local, propagação, substituição e incerteza pendente
9. [Pipelines de Dados de Blockchain](./data-pipelines.md): ingestão ordenada, toros duráveis, e replay
10. [Processamento de Eventos](./event-processing.md): garantias de idempotência, deduplicação e entrega
11. [Manuseamento Reorg](./reorg-handling.md): detectando um histórico canônico alterado e rolando dados de volta
12. [Webhooks](./webhooks.md): entrega assinada, recargas, encomendas e segurança do consumidor
13. [Cache](./caching.md): chaves, classes de finalidade, invalidação e leituras antigas
14. [Confiabilidade](./reliability.md): lag, sinais de saúde, redundância, objetivos de recuperação, e brocas

## O contrato central de dados

Cada fato armazenado ou entregue deve manter seu ID de cadeia, número de bloco, hash de bloco, hash de transação, quando aplicável, e índice de log, quando aplicável. Números de bloco por si só identificam uma posição, não uma história única. Hashes deixou sistemas a jusante detectar que o bloco uma vez chamado canônico foi substituído.

As infraestruturas devem também indicar o seu ponto de coerência. "Último" pode significar a cabeça atual do provedor, um checkpoint indexer, um bloco confirmado, um bloco finalizado, ou dados em cache de segundos atrás. Interfaces que escondem estas chamadas de força de distinção para adivinhar.

## Outras leituras

- [Nós e clientes Ethereum](https://ethereum.org/developers/docs/nodes-and-clients/)
- [Ethereum JSON- RPC](https://ethereum.org/developers/docs/apis/json-rpc/)
- [RPC do núcleo do Bitcoin](https://bitcoincore.org/en/doc/)
- [A documentação do gráfico](https://thegraph.com/docs/)

---

[← Anterior: Verificação formal](../security/formal-verification.md)
·
[Voltar ao Conteúdo Completo](../../SUMMARY.md)
·
[Próximo: Executando um nó →](./running-a-node.md)
