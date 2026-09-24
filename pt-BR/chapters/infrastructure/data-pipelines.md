# Pipelines de Dados de Blockchain

Um pipeline de dados blockchain move blocos, transações, recibos, registros, traços e registros derivados de nós em sistemas construídos para pesquisa, análise, notificações ou estado de aplicação. O oleoduto deve preservar a ordem e a procedência enquanto tolera a repetição e reorganização.

## Estágios de ingestão

Uma divisão útil tem quatro etapas:

1. descobrir uma cabeça de candidato;
2. buscar um bloco contíguo e seus dados necessários;
3. transformá-lo em registros versionados;
4. commit registros e checkpoint atomicamente.

As filas podem separar estágios, mas cada mensagem deve identificar cadeia, número de bloco e hash de bloqueio. Os consumidores verificam a continuidade dos pais em vez de confiarem apenas na ordem de espera.

## Dados brutos duráveis

Manter uma cópia imutável compacta de entradas brutas torna as transformações reproduzíveis. Um bug de esquema pode então ser reparado sem depender de um provedor RPC para servir anos de história na velocidade de produção. Armazene o método de origem, a identidade do bloco, o tempo de ingestão e a versão do formato.

O armazenamento em bruto não remove a validação. Um provedor pode devolver recibos parciais, blocos inconsistentes ou dados da cadeia errada. Contagens de verificação, hashes, links pai, ID de cadeia e campos obrigatórios antes de publicar a jusante.

## Controle de contrapressão e alcance

A cadeia produz em seu próprio ritmo. Bancos de dados e APIs podem ser lentos. As filas fechadas tornam a pressão visível. O buffering ilimitado transforma um curto abrandamento na exaustão da memória ou num atraso de recuperação ilimitado.

Use pequenos intervalos RPC adaptativos. Os provedores frequentemente limitam a contagem dos resultados do log mesmo quando o intervalo de blocos solicitado é permitido. Dividir intervalos com falha deterministicamente e persistir segmentos completos.

## Repetir e versionar

O código de transformação altera sua interpretação de dados antigos. Anexar uma versão às linhas e tarefas derivadas. Uma repetição deve escrever em uma tabela ou versão separada até que a validação termine, em seguida, mudar os leitores. Mutação história de produção no lugar torna a comparação e rollback difícil.

## Outras leituras

- [Ethereum JSON- RPC](https://ethereum.org/developers/docs/apis/json-rpc/)
- [Visão geral da indexação do gráfico](https://thegraph.com/docs/en/indexing/overview/)
- Ver também: [Indexadores](./indexers.md), [Processamento de Eventos](./event-processing.md)

---

[← Anterior: Mempool Infrastructure](./mempool.md)
·
[Voltar à Infraestrutura](./README.md)
·
[Próximo: Processamento de eventos →](./event-processing.md)

