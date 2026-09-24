# Manuseamento Reorg

Uma reorganização em cadeia substitui um ramo canônico recente por outro. Infraestrutura que indexou o ramo antigo deve remover ou reverter seus efeitos, em seguida, aplicar o ramo de substituição em ordem.

## Detecção utiliza hashes, não a altura sozinha

Suponha que o indexador armazenado bloco 100 com hash A. O próximo bloco obtido reivindica o número 101, mas seu pai não é A. O oleoduto encontrou uma descontinuidade. Deve andar para trás através de hashes canônicos armazenados e ancestrais atuais do nó até encontrar um bloco comum.

Só a última altura falha uma substituição de mesma altura. Armazenar e comparar hashes bloco. O failover do provedor pode parecer um reorg quando os provedores discordam temporariamente, então grave a fonte e verifique novamente antes de executar um rollback destrutivo quando a política permite.

## Modelos de retrocesso

Um modelo armazena cada registro derivado com seu hash de bloco e apaga registros de propriedade de blocos órfãos. Outro armazena operações inversas para cada bloco. Um terceiro reconstrui visões materializadas afetadas a partir de um log de eventos retido. O modelo correto depende do tamanho dos dados e da complexidade da transformação.

Blocos de volta do mais novo para o mais antigo, em seguida, aplicar o novo ramo do mais antigo para o mais novo. Atualizar o ponto de controle canônico na mesma transação que as alterações de cada bloco. Os agregados precisam de contribuições reversíveis ou recomputação de um ponto seguro.

## Políticas de confirmação

Esperar por confirmações reduz a chance e profundidade de retrocesso ao custo da latência. Ethereum expõe barreiras seguras e finalizadas através de clientes conscientes de consenso. Aplicações Bitcoin escolhem uma contagem de confirmação com base no valor e risco da transação. Nenhuma política significa que a velha história é matematicamente impossível de substituir sob cada falha de rede.

Use políticas diferentes para efeitos diferentes. Uma UI pode mostrar um depósito pendente rapidamente. Crédito de fundos retiradas ou envio de um ativo de alto valor pode esperar mais tempo. Mostrar o estado em vez de desmoronar visto, incluído, seguro e finalizado em “completo”.

## Testando reorgs

Fixtures deve conter dois ramos compartilhando um ancestral. Teste substituições de um bloco e multibloco, entrega duplicada, reinício do processo durante o rollback, um registro removido e discordância do provedor. Asseverar que os efeitos órfãos desaparecem, efeitos canônicos aparecem uma vez, e o checkpoint nomeia o hash substituto.

## Outras leituras

- [Blocos Ethereum e finalidade](https://ethereum.org/developers/docs/blocks/)
- [Finalidade probabilística do Bitcoin](../distributed-systems/probabilistic-finality.md)
- Ver também: [Reorganizações da Cadeia](../blockchain/reorgs.md), [Indexadores](./indexers.md)

---

[← Anterior: Processamento de eventos](./event-processing.md)
·
[Voltar à Infraestrutura](./README.md)
·
[Próximo: Webhooks →](./webhooks.md)
