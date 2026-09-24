# Ethereum

Ethereum adiciona computação de propósito geral ao modelo blockchain este livro construído através do Bitcoin, negociando o modelo UTXO de Bitcoin para contas, seu script não-Turing-completo para o EVM Turing-completo, e (desde 2022) seu consenso de prova de trabalho para prova de participação. Esta seção cobre a própria arquitetura de Ethereum em seus próprios termos, desenhando comparações diretas com Bitcoin ao longo de exatamente porque os contrastes são a maneira mais rápida de entender *Porquê?* Ethereum fez cada escolha de design diferente.

## O que você precisa saber primeiro

Tudo através [Bitcoin](../bitcoin/README.md) e [Sistemas distribuídos](../distributed-systems/README.md)Esta seção assume que você entende blocos, transações, consenso e resistência Sybil no contexto específico do Bitcoin, e constrói as diferenças de Ethereum diretamente no topo dessa fundação em vez de re-explicar conceitos compartilhados do zero.

## Capítulos

### Contas e transações

1. [Contas Ethereum](./accounts.md): os quatro campos que cada conta tem, verificados contra os dados da cadeia viva
2. [Contas de propriedade externa](./eoa.md): contas controladas por chaves, e porque cada transação remonta a uma
3. [Contas de Contrato](./contract-accounts.md): contas controladas por código, e por que eles nunca podem agir sem prompção
4. [Transações Ethereum](./transactions.md): os campos, e o tipo EIP-1559 que tem sido padrão desde 2021
5. [Gás](./gas.md): cálculo de medição para ligar uma máquina virtual Turing-completo
6. [Preço do gás e taxas](./fees.md): o modelo base-fee-and-tip, com sua fórmula de ajuste executado e verificado

### Estado

7. [Blocos Ethereum](./blocks.md): os campos de cabeçalho sem o análogo Bitcoin
8. [Estado Ethereum](./state.md): o instantâneo atual, distinguido do histórico
9. [Trie Estado](./state-trie.md): por que uma árvore Merkle simples não é suficiente para o estado baseado em chaves

### Infraestruturas

10. [JSON- RPC](./json-rpc.md): o protocolo bruto sob cada carteira e biblioteca, chamado diretamente e verificado live
11. [Nós Ethereum](./nodes.md): por que um nó completo é duas peças comunicando do software, não um
12. [Clientes de Execução](./execution-clients.md): Geth, Nethermind, Besu, Erigon, Reth
13. [Clientes de consenso](./consensus-clients.md): Prysm, Farol, Teku, Nimbus, Lodestar

### Prova de Participação

14. [The Merge](./the-merge.md): a estratégia de dois anos e duas cadeias por trás da transição consensual de Ethereum
15. [Prova de Participação](./proof-of-stake.md): capital apostado como resistência de Sybil, e por que precisa de um conjunto conhecido de validadores
16. [Validadores](./validators.md): filas de ativação, equilíbrio efetivo e saída
17. [Staking](./staking.md)A questão da centralização levanta-se, por um lado, a questão do solo, do agrupamento e do líquido.
18. [Slashing](./slashing.md): as duas ofensas estreitas, criptograficamente comprovadas que o desencadeiam
19. [Finalidade](./finality.md): controles justificados e finalizados, comparados diretamente com o modelo probabilístico de Bitcoin

## Próxima

Continuar a [O EVM](../evm/README.md) para ver exatamente o que o código de uma conta de contrato realmente é e como ele executa, o bytecode e opcode nivelam esta seção [Contas de Contrato](./contract-accounts.md) capítulo descrito apenas de fora.
