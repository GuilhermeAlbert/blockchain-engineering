# Provas de Fraude

Uma prova de fraude é como o período de desafio de um rolagem otimista é realmente aplicado: uma maneira de um desafiante provar, em L1, que uma afirmação específica publicada do Estado está errada. Este capítulo cobre o que uma prova de fraude realmente tem que demonstrar, e por que os rolups usam um processo de disputa interativo passo a passo, em vez de simplesmente executar um lote inteiro disputado em L1.

## O problema principal: L1 não pode simplesmente repetir o lote inteiro

A maneira mais direta de verificar se o estado reivindicado de um rollup está correto seria ter L1 re-executar todo o lote disputado de transações em si e comparar o resultado. Isto derrota todo o propósito de um rollup: se L1 tivesse que re-executar cada lote para verificá-lo, nenhum dos cálculos teria realmente removido L1, e nenhuma das economias de custo que um rollup existe para fornecer iria se materializar. Uma prova de fraude tem que provar que um lote está errado sem exigir L1 para refazer todo o trabalho que o rollup fez.

## Provas de fraude interactivas: limitar a uma etapa contestada

A abordagem dominante, utilizada por Arbitrum e (na forma mais antiga, única) por Optimismo, é um **prova de fraude interativa**: em vez de pedir à L1 para verificar um lote inteiro ao mesmo tempo, o desafiante e a parte que defende a reivindicação (tipicamente o sequenciador original) se envolvem em um protocolo que repetidamente bisecta a computação disputada ao meio, estreitando exatamente onde os resultados alegados das duas partes primeiro divergem.

```text
Disputed computation: 1,000,000 execution steps, claimed results disagree

Round 1: bisect at step 500,000 — where do results diverge, before or after?
Round 2: bisect the identified half again — 250,000, or 750,000?
...continuing until the range narrows to a single step...

Final round: exactly one EVM opcode's execution is disputed.
L1 only needs to execute that ONE step to determine who's right.
```

Cada rodada de bissecção é barata: só requer comparar resultados intermediários alegados, não re-executar nada. Depois de rodadas suficientes (logarítmicas no número total de passos, o que significa que um lote com um milhão de passos de execução só precisa de cerca de vinte rodadas para reduzir a um), a disputa é reduzida a um único passo, minúsculo, individualmente verificável: uma execução do opcode EVM, barato o suficiente para L1 realmente executar e resolver a disputa definitivamente.

## O que acontece quando a fraude é comprovada

Se uma prova de fraude demonstra com sucesso que uma reivindicação de estado publicada estava errada, o protocolo do rollup reverte essa alegação, e a parte que apresentou a alegação fraudulenta (tipicamente o sequenciador, que é obrigado a postar um vínculo antes de publicar reivindicações de estado especificamente para tornar isso possível) perde seu vínculo, que é usado para recompensar o desafiante bem sucedido. Essa penalidade econômica, perdendo um vínculo substancial, é o que faz a submissão de um Estado conscientemente fraudulento reivindicar uma estratégia irracional para um sequenciador, além da dificuldade prática de obter uma falsa reivindicação passado um determinado, desafiante honesto em primeiro lugar.

## Por que isso requer pelo menos um participante honesto, observando

Todo o modelo de segurança à prova de fraude depende de alguém que realmente execute a verificação e esteja disposto a apresentar um desafio se detectar uma reclamação inválida; uma prova de fraude que ninguém submete não faz nada. Esta é a suposição de honestidade-minoridade subjacente rolagem otimista: o sistema permanece seguro, desde que pelo menos um participante honesto, adequadamente recursos está ativamente observando e disposto a desafiar, não porque reivindicações incorretas são de alguma forma impossível, mas porque eles podem sempre ser pegos e penalizados se alguém se incomoda em verificar.

## Conceitos errôneos comuns

**Uma prova de fraude não requer re-executar todo um lote de transações disputadas em L1.** O processo de bissecção interactiva reduz qualquer disputa a um único passo, barato-para-verificar; todo o projeto existe especificamente para evitar o custo de re-execução de lote completo, que eliminaria inteiramente o benefício de escala de um rollup.

**As provas de fraude não são automáticas.** Exigem que um desafiante atento e disposto detecte uma reclamação inválida e inicie o processo de disputa; um rolagem sem ninguém que verifique a infraestrutura, ou onde isso seja proibitivamente caro, tem uma garantia prática de segurança mais fraca do que o mecanismo teórico à prova de fraudes sugeriria.

## Outras leituras

- [Arbitrum: provas de fraude interativas](https://docs.arbitrum.io/how-arbitrum-works/fraud-proofs/overview-fraud-proofs)
- Ver também: [Rollups Optimistas](./optimistic-rollups.md), [Provas de Validade](./validity-proofs.md)

---

[← Anterior: Rollups Optimistas](./optimistic-rollups.md)
·
[Voltar à Camada 2](./README.md)
·
[Próximo: ZK Rollups →](./zk-rollups.md)
