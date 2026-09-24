# Clientes de consenso

O cliente de consenso é a metade de um nó Ethereum responsável pela execução do próprio protocolo de prova de participação, rastreando validadores, participando ou verificando atestados, e determinando qual cadeia de blocos é canônica. Este capítulo abrange o que faz, antes da prova completa dos mecanismos abrangidos por [Prova de Participação](./proof-of-stake.md) e [Validadores](./validators.md).

## O que faz um cliente consensual

Um cliente de consenso implementa o protocolo de consenso de prova de participação de Ethereum (formalmente, uma combinação de **LMD-GHOST** para escolha do fork e **Casper FFG** para finalidade, ambos cobertos mecanicamente em [Prova de Participação](./proof-of-stake.md) e [Finalidade](./finality.md)). Para um nó executando um ou mais validadores (ver [Validadores](./validators.md)), o cliente consenso também lida com as próprias funções do validador: propondo blocos quando atribuído, e apresentando atestados (votos em que bloco/cadeia um validador considera canônico) no horário fixo de 12 segundos.

## Implementações importantes

- **Prisma**: escrito em Go, desenvolvido pela Prysmatic Labs (agora parte do Offchain Labs).
- **Farol**: escrito em Rust, desenvolvido por Sigma Prime.
- **Teku**: escrito em Java, desenvolvido pela Consensys.
- **Nimbus**: escrito em Nim, notável por ser especificamente otimizado para executar eficientemente em hardware restrito a recursos.
- **Lodestar**: escrito no TypeScript, notável por ser utilizável diretamente no navegador e ambientes Node.js.

Tal como acontece com os clientes de execução, a diversidade entre estas implementações independentes é monitorizada e encorajada activamente na comunidade Ethereum pelas mesmas razões de risco sistémico abrangidas pelo [Nós Ethereum](./nodes.md#por-que-esta-divisão-é-uma-força-deliberada-não-uma-complicação-restante).

## A API do motor: como as duas metades do cliente realmente falam

O cliente de consenso e cliente de execução se comunicam sobre uma API local padronizada (o **API do motor**), deixando o cliente consenso instruir o cliente de execução para construir ou validar um bloco específico e receber de volta os resultados de execução necessários para incluir na proposta ou atestado desse bloco. Esta interface é em si uma parte formalmente especificada do protocolo de Ethereum, projetado especificamente para que *qualquer* execução implementação do cliente pode emparelhar corretamente com *qualquer* implementação de cliente consenso, uma propriedade real testada (não apenas um objetivo teórico) que reforça ainda mais o benefício cliente-diversidade, uma vez que os operadores podem misturar e combinar implementações livremente em vez de serem bloqueados usando um par pareado da mesma equipe de desenvolvimento.

## Conceitos errôneos comuns

**Um cliente de consenso não executa transações ou mantém o próprio estado EVM**Esse é inteiramente o trabalho do cliente de execução; o papel do cliente de consenso é especificamente sobre qual cadeia de blocos é canônica e sobre a participação do validador no protocolo de prova de participação, não sobre o processamento de conteúdo de transação.

**Executar um cliente consenso sem também executar validadores é uma configuração completamente normal e comum**. A maioria dos clientes de consenso funcionam como parte de um nó completo comum, verificando a cadeia sem necessariamente também executar os deveres de validador que exigem ETH em jogo (ver [Staking](./staking.md)).

## Outras leituras

- [Especificações de consenso Ethereum](https://github.com/ethereum/consensus-specs)
- [ethereum.org: clientes do consenso](https://ethereum.org/en/developers/docs/nodes-and-clients/#consensus-clients)

---

[← Anterior: Clientes de Execução](./execution-clients.md)
·
[Voltar para Ethereum](./README.md)
·
[Próximo: A Fusão →](./the-merge.md)
