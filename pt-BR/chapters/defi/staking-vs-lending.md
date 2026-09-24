# Posição vs. Empréstimo

"Taking" é usado vagamente através de criptografia para descrever várias atividades estruturalmente diferentes, algumas das quais não têm nada a ver com o mecanismo de consenso prova de participação a palavra originalmente referida. Este capítulo traça as distinções reais, fechando os capítulos do mecanismo da seção DeFi antes dos estudos de caso do protocolo que se seguem.

## Possibilidade de consenso: fixar uma corrente de bloqueio

O significado original e preciso da tomada de posição é o próprio mecanismo de consenso de Ethereum, coberto plenamente por [Prova de Participação](../ethereum/proof-of-stake.md) e [Staking](../ethereum/staking.md): Bloqueando o ETH como um laço de um validador, que pode ser destruído (slashed) por comportamento desonesta, em troca do direito de propor e atestar blocos e ganhar as recompensas associadas. Este é um jogo no sentido em que o termo foi cunhado para: capital em risco, garantindo o consenso de um protocolo específico, com uma pena definida, de nível de protocolo para o mau comportamento.

## DeFi "tomar": geralmente apenas empréstimo ou provisão de liquidez, renomeado

A maioria das coisas chamadas de "tomar" em interfaces DeFi são mecanicamente idênticas ao empréstimo (ver [Empréstimos](./lending.md)) ou provisão de liquidez (ver [Prestadores de liquidez](./liquidity-providers.md)): um usuário bloqueia um token num contrato e recebe um rendimento, obtido a partir de taxas de negociação, juros do mutuário ou emissões de token (ver [Rendimento](./yield.md)). Chamar isso de "tomar" não é necessariamente impreciso, uma vez que os tokens estão, no sentido simples-inglês, sendo apostado (colocado em risco) no contrato, mas obscurece uma distinção significativa: este tipo de staking geralmente não tem nenhuma condição de corte de protocolo ou papel de consenso em tudo. O risco é o risco de contrato inteligente e a própria sustentabilidade da fonte de rendimento, não a estrutura específica de penalização definida que rege a efetiva tomada de posição de camada de consenso.

## Por que razão a distinção é importante para a avaliação dos riscos

Os riscos do Consensus staking são bem definidos e específicos: cortando para um pequeno conjunto de violações de protocolo provavelmente atribuíveis, e o risco operacional de executar (ou confiar em um operador para executar) a infraestrutura validadora corretamente. DeFi "assumir" riscos são um conjunto completamente diferente: smart contrato explora, a sustentabilidade de quaisquer emissões estão financiando o rendimento anunciado, e, se o token apostado em si é um token de governança ou protocolo em vez de algo com utilidade independente, o próprio risco de preço do token. Tratando um símbolo de governança "tomar" pool e real ETH validação staking como portador de perfis de risco comparáveis porque ambos usam a palavra "tomar" é uma fonte real, comum de expectativas mal calibradas.

## A estaca líquida fica entre os dois

[Estacas líquidas](../ethereum/staking.md#estacas-líquidas) é um híbrido genuíno: a atividade subjacente é a tomada de posição de consenso real (validadores de apoio ETH, sujeitos a condições reais de corte), mas o próprio token de fixação de líquidos (stETH, por exemplo) pode então ser depositado em empréstimos ou pools de liquidez DeFi exatamente como qualquer outro token, empilhando uma fonte de rendimento DeFi em cima do rendimento de tomada de consenso subjacente. Isto compõe as categorias de risco em vez de substituir uma pela outra: uma posição líquida, depositada pelo DeFi, comporta tanto os riscos de nível de consenso da participação subjacente como os riscos de contrato inteligente e de mercado de onde quer que o próprio símbolo de estaca líquida seja utilizado.

## Conceitos errôneos comuns

**"Tomar" um token de governança em um protocolo DeFi não contribui para a segurança de consenso de qualquer blockchain.** A menos que o mecanismo específico envolva explicitamente a infraestrutura do validador e o corte definido pelo protocolo, "tomar" aqui é uma etiqueta de UI para bloquear tokens em um contrato inteligente de rendimento, não uma atividade relevante em segurança para qualquer cadeia subjacente.

**Um APY alto "taking" anunciado por um protocolo DeFi não é evidência de nada sobre a segurança desse protocolo.** Fonte do rendimento (ver [Rendimento](./yield.md)) precisa de ser verificado de forma independente; um APY elevado financiado por emissões simbólicas comporta um risco significativamente diferente do que um APY modesto financiado por taxas de negociação reais, independentemente de qual uma UI acontece para rotular "tomar".

## Outras leituras

- Ver também: [Prova de Participação](../ethereum/proof-of-stake.md), [Staking](../ethereum/staking.md), [Rendimento](./yield.md)

---

[← Anterior: Rendimento](./yield.md)
·
[Voltar para DeFi](./README.md)
·
[Próximo: Uniswap →](./uniswap.md)
