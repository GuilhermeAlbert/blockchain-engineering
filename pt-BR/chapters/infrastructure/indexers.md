# Indexadores

Um indexador lê dados de cadeia ordenados e constrói um banco de dados em forma para consultas de aplicativos. A cadeia armazena os estados de consenso e os recibos; um indexador deriva visualizações como atividade de conta, propriedade de token, posições, volume e histórico de protocolo.

## Derivação determinística

Dado os mesmos blocos canônicos, configuração e versão de código, um indexador deve produzir o mesmo estado derivado. Armazene procedência suficiente para reproduzir cada linha: chain ID, número de bloco, hash de bloco, hash de transação, índice de log, endereço de contrato e versão decodificadora quando relevante.

Os troncos são convenientes, mas não mágicos. Contratos escolhem o que emitir, eventos podem estar faltando ou ambíguos, e upgrades proxy podem alterar o ABI em um bloco conhecido. Alguns fatos requerem informações de transação, traços ou chamadas de estado. Documento qual fonte cria cada tabela.

## Pontos de controle e recargas

Um posto de controle regista o último bloco aplicado atómicamente. Obtenha um intervalo limitado, valide a continuidade, transforme eventos, commit lines derivadas e, em seguida, avance o checkpoint na mesma transação de banco de dados. Avançando primeiro pode criar uma lacuna permanente após um acidente.

Backfills usar o mesmo caminho de transformação que ingestão ao vivo. Escalonamento de intervalo separado da aplicação de bloco para que os trabalhadores possam paralelizar o histórico imutável sem aplicar as atualizações de uma entidade fora de ordem. Gravar código e versão esquema para que um mapeamento alterado desencadeia uma reconstrução ou migração controlada.

## Idempotência e singularidade

Chamadas RPC, filas e reinícios podem entregar o mesmo registro mais de uma vez. Uma chave única baseada no ID de cadeia, hash de bloco, hash de transação e índice de log torna a aplicação repetida detectável. O hash de transação sozinho é insuficiente porque uma transação pode emitir muitos logs.

Os agregados derivados precisam de atualizações reversíveis ou recomputação. Incrementar um contador sem gravar qual evento contribuiu torna o reorg rollback e o reparo de bug difícil.

## A servir as consultas

Expor a altura e o haxixe indexados com as respostas. Os clientes podem comparar frescura com cabeça de corrente e decidir se esperar. Separar conjuntos de dados finalizados de conjuntos de dados próximos quando os consumidores têm necessidades de consistência diferentes.

A base de dados de um indexador não é consenso. Trata-se de uma interpretação materializada dos dados de consenso. Restrições de esquema, trabalhos de reconciliação, comparações amostradas com RPC, e replay determinístico manter essa interpretação honesta.

## Outras leituras

- [Ethereum logs e eventos](https://ethereum.org/developers/docs/smart-contracts/anatomy/#events-and-logs)
- [Os subgrafos do gráfico](https://thegraph.com/docs/en/subgraphs/overview/)
- Ver também: [Indexação de eventos](../web3/event-indexing.md), [Manuseamento Reorg](./reorg-handling.md)

---

[← Anterior: Nós de Arquivo](./archive-nodes.md)
·
[Voltar à Infraestrutura](./README.md)
·
[Próximo: The Graph →](./the-graph.md)
