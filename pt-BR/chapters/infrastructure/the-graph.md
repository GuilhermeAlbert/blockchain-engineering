# The Graph

O gráfico transforma dados blockchain em APIs GraphQL chamadas subgraphs. Um subgrafo define quais contratos e eventos para ler, como os manipuladores os transformam e quais entidades podem retornar.

## Componentes do subgrafo

O manifesto, comumente `subgraph.yaml`, nomeia a rede, fontes de dados, contrata ABIs, inicia blocos e tratadores de eventos ou chamadas. `schema.graphql` define entidades armazenadas e campos de consulta. Mapear a cadeia de processos de código desencadeia deterministicamente e escreve entidades.

Um bloco de início preciso evita o histórico de digitalização antes da existência de um contrato. Fontes de dados dinâmicas permitem que os mapeamentos comecem seguindo contratos criados por uma fábrica. O manipulador ainda precisa de IDs de entidade estáveis e regras para múltiplos eventos que afetam a mesma entidade.

## Nó de Gráfico

O Graph Node conecta-se à cadeia RPC, busca gatilhos, executa mapeamentos, armazena entidades no PostgreSQL e serve ao GraphQL. Alguns subgrafos requerem o estado do arquivo ou métodos de rastreamento. A capacidade do provedor, portanto, afeta se a indexação é bem-sucedida, não apenas a rapidez com que ele é executado.

A indexação tem três grandes custos: encontrar dados relevantes da cadeia, executar mapeamentos e chamadas contratuais e entidades de escrita. A métrica deve separá-los. Um provedor lento, um mapeamento com muitas chamadas, e um banco de dados contendido exigem reparos diferentes.

## Determinação e erros

Os mapeamentos devem produzir o mesmo resultado para cada indexador que processa a mesma cadeia. Eles não podem depender de APIs web arbitrárias ou hora local. Os dados obtidos a partir do armazenamento de conteúdo endereçado só podem ser usados através de mecanismos determinísticos suportados.

Um erro de indexação pode parar um subgrafo ou marcar resultados como potencialmente incompletos dependendo da configuração e política de consulta. As aplicações devem inspecionar o status de indexação e bloquear metadados em vez de assumir que uma resposta GraphQL bem sucedida está atual.

## Funções da rede

Na Rede de Gráficos, desenvolvedores de subgrafos publicam definições, indexadores operam o Graph Node e atendem consultas, curadores sinalizam demanda esperada e delegados atribuem participação aos indexadores. Uma prova de indexação compromete-se com as operações de entity-store produzidas através de um bloco. Não torna correto o esquema do subgrafo nem a interpretação de negócios; mostra execução consistente dessa definição.

## Versionamento e reconstrução

Alterar mapeamentos ou esquema cria uma nova versão do subgrafo. Entidades históricas construídas sob velha lógica não se reparam. Implantar a nova versão, sincronizá-la, comparar resultados e, em seguida, mover consultas deliberadamente. O grafting pode reutilizar o histórico compatível e iniciar o novo processamento em um bloco selecionado, mas a compatibilidade e correção continuam sendo da responsabilidade do desenvolvedor.

## Outras leituras

- [Visão geral dos subgrafos](https://thegraph.com/docs/en/subgraphs/overview/)
- [Documentação do nós do gráfico](https://thegraph.com/docs/en/indexing/tooling/graph-node/)
- [Manifesto do subgrafo](https://thegraph.com/docs/en/subgraphs/developing/creating/subgraph-manifest/)

---

[← Anterior: Indexadores](./indexers.md)
·
[Voltar à Infraestrutura](./README.md)
·
[Próximo: Block Explorers →](./block-explorers.md)
