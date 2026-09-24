# Blocos Ethereum

Um bloco Ethereum compartilha a mesma forma básica que um bloco Bitcoin (um cabeçalho mais um corpo de transações), mas seu cabeçalho carrega significativamente mais informações, refletindo o modelo de estado mais rico de Ethereum. Este capítulo cobre os campos de cabeçalho específicos de Ethereum, construindo sobre a estrutura de bloco geral de [Blocos](../blockchain/blocks.md).

## Campos de cabeçalho para além do que o cabeçalho do Bitcoin carrega

Ao lado de campos com análogos de Bitcoin diretos (um hash bloco pai, um timestamp, um campo nonce usado pré-Merge para prova de trabalho), cabeçalho de bloco de Ethereum inclui várias raízes comprometendo-se a diferentes tipos de estado, cada uma uma raiz de seu próprio [Merkle Patricia Trie](./state-trie.md):

- **stateRoot**: commits to the *inteiro* estado do mundo atual (equilíbrio, nonce, código e armazenamento de cada conta) após as transações deste bloco terem sido executadas. Isto não tem análogo do Bitcoin. O conjunto UTXO do Bitcoin é derivado, não diretamente comprometido em nenhum campo de cabeçalho de bloco único.
- **TransaçõesRoot**: commits para a lista de transações deste bloco, desempenhando o mesmo papel que o Merkle root do Bitcoin (ver [Raízes de Merkle](../blockchain/merkle-roots.md)).
- **recibosRoot**: commits to the **recibos** (resultados da execução, incluindo se cada transação foi bem sucedida, quanto gás ele usou, e qualquer [logs de eventos](../contracts/events.md) emitido) produzido pela execução das transações deste bloco.
- **gásLimit / gásUsado**: o próprio teto de gás do bloco (ajustável, dentro dos limites, bloco para bloquear por validadores) e quanto das transações deste bloco realmente consumido, alimentando diretamente para o [ajustamento da taxa de base](./fees.md#a-fórmula-de-ajustamento-da-taxa-de-base).

## Por que uma raiz de estado, especificamente

Porque o modelo de conta de Ethereum significa que o estado mundial inteiro muda com cada bloco (equilíbrio atualização, atualização de armazenamento de contrato), comprometendo-se com esse estado inteiro no cabeçalho (não apenas para as transações que causaram as mudanças) dá uma poderosa capacidade direta: dado apenas a raiz de estado de um cabeçalho de bloco, uma parte pode solicitar e verificar uma **Prova de Merkle** (o mesmo mecanismo geral de [Provas de Merkle](../cryptography/merkle-proofs.md)) que uma conta específica atualmente tem um saldo específico, nonce, ou pedaço de armazenamento de contrato, sem precisar reproduzir todo o histórico de transações da gênese para computá-lo. Esta é a base para **cliente leve** projetos em Ethereum, conceitualmente semelhante ao SPV de Bitcoin (ver [Clientes leves](../bitcoin/light-clients.md)) mas provando o estado atual diretamente, em vez de apenas provar a inclusão histórica da transação.

## Alterações pós-fusão para bloquear a produção

Desde [The Merge](./the-merge.md), os blocos Ethereum já não são encontrados através da mineração de prova de trabalho. Eles são produzidos por **validadores** seleccionado através do mecanismo de prova de participação de Ethereum (ver [Prova de Participação](./proof-of-stake.md)), numa situação fixa, previsível de 12 segundos. **slot** calendário (ver [Validadores](./validators.md)) em vez da prova de trabalho probabilística, variável de tempo Bitcoin produz. A `nonce` e `difficulty` header fields, significativo sob prova de trabalho, são fixados a valores constantes, sem maior significado pós-Merge, retidos no formato header para compatibilidade estrutural para trás em vez de porque eles ainda servem seu propósito original.

## Conceitos errôneos comuns

**O estado de EthereumRoot não significa que o estado completo é armazenado dentro de cada bloco**, apenas um hash root 32-byte comprometendo-se com esse estado é armazenado no cabeçalho; o estado real e completo de dados vive no próprio banco de dados local de cada nó, atualizado incrementalmente como blocos são processados, exatamente análogo a como um nó Bitcoin mantém seu próprio conjunto UTXO local (veja [Sob o capuz: o conjunto UTXO](../bitcoin/utxo.md#sob-o-capô-o-conjunto-utxo)) em vez desse conjunto sendo armazenado diretamente em cabeçalhos de bloco.

**O tempo de bloqueio no Ethereum não é probabilístico como o Bitcoin é.**, desde a Fusão. Validadores são atribuídos slots específicos e agendados (ver [Validadores](./validators.md)), produzindo uma cadência fixa de 12 segundos em vez do calendário aleatório, repartido por Poisson, que produz provas de exploração mineira (ver [Tempo de bloco](../blockchain/block-time.md)).

## Outras leituras

- [Papel Amarelo Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf): Seção 4.3 (O Bloco)
- [ethereum.org: Blocos](https://ethereum.org/en/developers/docs/blocks/)

---

[← Anterior: Preço do gás e taxas](./fees.md)
·
[Voltar para Ethereum](./README.md)
·
[Próximo: Ethereum State →](./state.md)
