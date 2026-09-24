# The Merge

Ligado **15 de setembro de 2022**, Ethereum mudou seu mecanismo de consenso de prova de trabalho para prova de participação, não através de uma bifurcação dura contenciosa ou uma divisão de cadeia, mas através de um cuidadosamente projetado anos de transição na fabricação, sem interrupção para o funcionamento da rede ou sua história acumulada. Este capítulo cobre como essa transição realmente funcionou e por que levou cerca de dois anos de preparação para executar com segurança.

## A estratégia de duas cadeias

Ao invés de tentar redesenhar a cadeia de execução live, com valor para apoiar diretamente a prova de participação, os desenvolvedores de Ethereum construíram e testaram o novo mecanismo de consenso como um todo **cadeia separada** primeiro momento: **Cadeia de Beacon**, lançado em 1o de dezembro de 2020, executando o novo protocolo de prova de participação da Ethereum de forma independente, com seus próprios validadores e seu próprio ETH (tomado, não o mesmo ETH circulando ativamente na cadeia original, e inicialmente intransferível), por quase dois anos antes de assumir funções de consenso para a rede real. Isso permite que o mecanismo de prova de participação (uma peça genuinamente nova e complexa de engenharia de sistemas distribuídos) seja testado, atacado e endurecido em condições reais e adversas, sem arriscar a cadeia de execução real e com valor durante esse período de desenvolvimento e teste.

## O que realmente aconteceu na Fusão

A The Merge em si foi o momento em que a Cadeia Beacon assumiu a responsabilidade de produzir e finalizar blocos em Ethereum **existente** cadeia de execução (a cadeia com toda a história real de Ethereum, contratos e saldos de contas) em vez de lançar uma nova cadeia do zero. Praticamente, isso significava: a cadeia de execução original de prova de trabalho continuou funcionando exatamente como antes, bloco por bloco, até um ponto específico (definido pela Cadeia Beacon atingindo um determinado, predeterminado **dificuldade total terminal** valor. Uma métrica prova-de-trabalho-nativo escolhida como o gatilho especificamente porque estava ligada ao progresso real, contínuo da mineração em vez de uma altura de bloco previsível ou timestamp um atacante poderia ter tentado alvo). Nesse ponto de desencadeamento, a mineração de prova de trabalho simplesmente parou de produzir novos blocos, e os validadores da Beacon Chain assumiram a produção de bloco daquele ponto exato para frente, preservando cada bloco da história anterior de Ethereum inalterado, com a cadeia de execução e todo o seu estado acumulado (ver [Estado Ethereum](./state.md)) prosseguir sem problemas no âmbito do novo mecanismo de consenso.

```text
Before:  [PoW block] → [PoW block] → [PoW block] → ... → [PoW block, TTD reached]
                                                                    │
                                                                    ▼
After:                                                    [PoS block] → [PoS block] → ...
                                                            (produced by Beacon Chain
                                                             validators from this point on)

Same chain, same history, same state — only the block production
mechanism changed, at one precise, predetermined point.
```

## Por que "A Fusão" é o nome exato

O nome reflete exatamente o que aconteceu: dois sistemas previamente separados (a cadeia de execução de prova de trabalho original e a Cadeia de Beacon de execução independente) se fundiram em um, com a camada de consenso da Cadeia de Beacon assumindo a produção de bloco da cadeia de execução em andamento, ao invés de uma cadeia ser descartada ou reiniciada.

## O efeito imediato e mensurável

A consequência mais imediatamente mensurável foi o consumo de energia: porque a prova de participação não requer nenhuma mineração computacional competitiva (ver [Prova de Participação](./proof-of-stake.md) para o mecanismo que o substitui), o consumo de energia de Ethereum caiu por uma figura amplamente citada, inclusive pela própria Fundação Ethereum, como aproximadamente **99.95%**, uma redução documentada e dramática diretamente atribuível à eliminação da mineração de prova de trabalho especificamente, não uma afirmação mais ampla sobre a pegada total de recursos de Ethereum de cada fonte.

## Conceitos errôneos comuns

**The Merge não alterou o histórico de transações da Ethereum, saldos de contas ou contratos inteligentes existentes de qualquer forma**, cada bloco, transação e pedaço de estado de antes da Fusão permaneceu exatamente como era; apenas o mecanismo de produção *novo* Os blocos que vão para a frente mudaram.

**A Fusão não é o mesmo evento que "Ethereum 2.0,"** um termo que foi usado informalmente e às vezes confusamente na discussão da comunidade anterior para descrever o esforço de transição mais amplo, multi-ano de prova de participação, a Fundação Ethereum e desenvolvedores principais desde então se afastaram da terminologia "Eth2" especificamente porque criou uma impressão enganosa de duas redes ou tokens separadas, quando na verdade sempre foi uma atualização encenada para a única, mesma rede Ethereum e a mesma ETH.

## Outras leituras

- [ethereum.org: A Fusão](https://ethereum.org/en/roadmap/merge/)
- [Blog da Fundação Ethereum: A Fusão](https://blog.ethereum.org/2022/09/15/merge-mainnet)

---

[← Anterior: Clientes de consenso](./consensus-clients.md)
·
[Voltar para Ethereum](./README.md)
·
[Próximo: Prova de Participação →](./proof-of-stake.md)
