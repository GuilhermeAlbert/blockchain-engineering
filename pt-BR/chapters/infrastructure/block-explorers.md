# Exploradores de Blocos

Um explorador de blocos combina dados de nó, traços, contratos decodificados, metadados de símbolos, etiquetas de endereços e índices de pesquisa em uma interface pública. É uma poderosa ferramenta de depuração, não parte do consenso blockchain.

## Campos canónicos e derivados

Bloquear hash, bytes de transação, status de recebimento, logs e código de contrato vêm de dados de cadeia. Nomes de funções legíveis por humanos vêm de um ABI ou banco de dados de assinatura. Nomes e símbolos do item vêm de chamadas de contrato ou metadados. As etiquetas de endereço vêm da pesquisa do explorador, usuários ou parceiros. Os valores de Fiat utilizam fontes de preços fora da cadeia.

Estes campos têm garantias diferentes. Um rótulo pode estar errado enquanto o endereço estiver correto. Uma chamada decodificada pode usar um ABI que não corresponde à implementação ativa nesse bloco. Um token exibido pode imitar o nome e símbolo de outro contrato.

## Verificação da origem

A verificação da fonte do contrato recompila a fonte e as configurações enviadas, então compara o bytecode resultante com o código implantado. Coincidir bytes conecta fonte legível a um endereço. Ele não audita a fonte, valida os argumentos do construtor como seguros, ou prova que um proxy atualmente delega para a implementação verificada um usuário está lendo.

Reprodutibilidade requer versão do compilador, configurações do otimizador, comportamento de metadados, bibliotecas e entradas de origem. Exploradores conscientes de proxy devem mostrar os slots de implementação e administração com o contexto de bloco em que foram lidos.

## Reorgs e status

Um explorador pode exibir uma transação em um bloco que mais tarde se torna órfão. Contagens de confirmação devem seguir o hash canônico atual, não só incremento de um número de bloco armazenado. Páginas próximas podem mudar. O histórico finalizado ou suficientemente confirmado pode ser armazenado em cache de forma mais agressiva.

## Usando exploradores com segurança

Verifique o endereço da cadeia e do contrato antes de copiar dados. Trate etiquetas, metadados de token, chamadas decodificadas e valores fiat como ajuda. Para ações de alto impacto, compare fonte, bytecode, endereço de implementação e estado de papel por meio de um caminho RCP independente.

Uma falha do explorador não para a cadeia, mas aplicativos que dependem de sua API proprietária podem parar. Prefere RPC padrão para dados de consenso e use APIs explorador para os índices adicionados que o produto precisa explicitamente.

## Outras leituras

- [Metadados do contrato de solidez](https://docs.soliditylang.org/en/latest/metadata.html)
- [slots de armazenamento proxy EIP-1967](https://eips.ethereum.org/EIPS/eip-1967)
- Ver também: [Implantação](../contracts/deployment.md), [Indexadores](./indexers.md)

---

[← Anterior: The Graph](./the-graph.md)
·
[Voltar à Infraestrutura](./README.md)
·
[Próximo: Mempool Infrastructure →](./mempool.md)
