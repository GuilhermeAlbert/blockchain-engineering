# Estado Ethereum

O "estado" de Ethereum é o instantâneo completo e atual de cada conta que existe, cada saldo, o armazenamento de cada contrato, tudo que a rede atualmente sabe ser verdade neste exato momento. Este capítulo cobre o estado como um conceito, distinto da mecânica de como ele é realmente armazenado e provado, coberto a seguir em [Trie Estado](./state-trie.md).

## Estado versus história

Esta distinção importa e é fácil de borrar: **estado** é o instantâneo atual de Ethereum, como cada conta se parece *Agora*. **Histórico** é a sequência completa de blocos e transações que produziram esse estado atual, voltando à gênese. Um nó Ethereum completo precisa processar o histórico completo pelo menos uma vez para chegar a um estado atual correto, mas a operação contínua (validando novos blocos, respondendo consultas sobre saldos atuais) depende principalmente do estado atual, não de re-derivando-o continuamente do histórico. É por isso que [Nós do Arquivo](../infrastructure/archive-nodes.md) (que mantêm cada instantâneo de estado histórico, não apenas o atual) são uma categoria especializada, mais intensiva em recursos, distinta de um nó completo comum.

## O que a execução do estado realmente faz

Processar um bloco significa tomar o estado do bloco anterior, aplicar cada transação no novo bloco em ordem, e chegar a um novo estado. Cada transação lê algum estado atual (balanços de conta, armazenamento de contrato) e, se válido, escreve valores atualizados de volta. Isto é determinístico: cada nó honesto, dado o estado anterior idêntico e o bloco idêntico, calcula o estado resultante idêntico, que é exatamente o que permite o cabeçalho do bloco `stateRoot` campo (ver [Blocos Ethereum](./blocks.md#campos-de-cabeçalho-para-além-do-que-o-cabeçalho-do-bitcoin-carrega)) servem como um compromisso universalmente controlável; qualquer nó pode verificar independentemente uma raiz de estado reivindicada, re-executando o próprio bloco e confirmando suas próprias correspondências de raiz computada.

## Por que o tamanho do estado é uma preocupação de engenharia real e contínua

Porque o estado só cresce (novos contratos e contas são criados muito mais frequentemente do que os existentes são significativamente removidos, e até mesmo os mecanismos de compensação de contas raros de Ethereum têm sido historicamente limitados), o tamanho do estado completo de Ethereum cresceu substancialmente ao longo da história da rede, e continua a fazê-lo. Esta é uma genuína preocupação de engenharia gerenciada ativamente: estado maior significa armazenamento mais caro e acesso mais lento para cada nó completo, que é parte da motivação por trás de pesquisas e propostas em andamento (expiração do estado, apátrida, e várias formas de aluguel do estado foram discutidas dentro da comunidade de pesquisa de Ethereum) visando impedir que o crescimento do estado se torne um fardo insustentável a longo prazo para os operadores de nó, uma área ativa de pesquisa de protocolo que este livro não trata como resolvido ou finalizado.

## Conceitos errôneos comuns

**"O Blockchain" e "o estado" não são a mesma coisa, apesar de estarem intimamente relacionados.** O blockchain é o histórico completo de blocos; o estado é um derivado, atual instantâneo computável por reproduzir esse histórico, uma distinção diretamente análoga a (embora computado de forma diferente do) como um conjunto de UTXO atual de um nó Bitcoin é derivado de, mas não idêntico a, o registro histórico completo de transação.

**Ethereum estado não é global no sentido de ser instantaneamente, síncrona o mesmo em todos os lugares em todos os momentos**, como a ponta da cadeia de Bitcoin, nós diferentes podem brevemente manter visões diferentes durante o atraso de propagação de rede normal ou um fork temporário, convergendo como o mecanismo de consenso da rede (ver [Prova de Participação](./proof-of-stake.md)) resolve qual cadeia e, portanto, qual estado é canônico.

## Outras leituras

- [Papel Amarelo Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf): Seção 4 (O Estado Mundial)

---

[← Anterior: Blocos Ethereum](./blocks.md)
·
[Voltar para Ethereum](./README.md)
·
[Próximo: State Trie →](./state-trie.md)
