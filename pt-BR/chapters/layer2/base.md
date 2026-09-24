# Base

Base, lançada pela Coinbase em agosto de 2023, é executada no OP Stack (ver [Optimism](./optimism.md#a-pilha-op-um-framework-de-rolagem-de-código-aberto-compartilhado)) e é a cadeia de maior volume do ecossistema OP Stack. Este capítulo usa Base especificamente como um estudo de caso para como "descentralização" para um rollup é realmente uma questão de grau, medido diretamente, em vez de um rótulo binário.

## O que a base de moedas realmente controla

Sequenciador da base (ver [Sequenciadores](./sequencers.md)) é operado pela Coinbase, dando ao Coinbase o controle de caso ordinário sobre a ordem de transação, a mesma situação de sequenciador centralizado esta seção já notada se aplica essencialmente a todos os principais rolagem hoje, não algo único para Base. O que mais importa para avaliar o risco real é o que a Coinbase *não pode* do: porque a Base usa o sistema padrão à prova de falhas do OP Stack, um sequenciador centralizado pode reordenar ou atrasar transações, mas não pode fabricar uma transição de estado inválida que sobrevive à verificação à prova de fraude da própria cadeia, o mesmo limite de segurança [Rollups Optimistas](./optimistic-rollups.md) estabelece em geral.

## Medir diretamente a descentralização: quadro de fases L2Beat

Ao invés de tratar "descentralizado" como uma reivindicação binária, a organização independente de análise L2Beat avalia rolups contra um framework concreto de três estágios: **Etapa 0**, quando o operador executa eficazmente a cadeia diretamente; **Etapa 1**, onde a cadeia é governada por contratos inteligentes com um sistema funcional, sem permissão à prova de fraude, embora um conselho de segurança mantenha o poder de intervenção de emergência como um backstop; e **Etapa 2**, totalmente imutável e contratualizado, sem poder de intervenção privilegiado remanescente. Em 28 de julho de 2026, L2Beat classificou Base como tendo atingido **Etapa 1**, após a implantação de provas de falha sem permissão e uma estrutura do conselho de segurança que exige 9 de 12 membros (11 entidades independentes mais Coinbase em si) para aprovar qualquer atualização do contrato, em vez de atualizações sendo unilateralmente controlada pela Coinbase sozinho.

## Por que este fato específico, datado importa mais do que um rótulo geral

Estabelecer essa base "estágio alcançado 1 em 28 de julho de 2026" é uma afirmação significativamente mais útil do que simplesmente dizer "Base é um rollup" ou mesmo "Base é descentralizada", porque é controlável, datado, e ligado a uma mudança específica, concreta (provas de falha sem permissão que vão ao vivo, além da exigência de aprovação multipartidária do conselho de segurança) em vez de uma impressão geral. Esta é a mesma disciplina que este livro tem aplicado ao longo de: uma reivindicação específica, de origem, datada sobrevive escrutínio de uma forma que uma caracterização vaga não faz, e um status de descentralização de um rollup é exatamente o tipo de fato que muda ao longo do tempo e merece ser verificado contra seu estado atual em vez de assumido da memória.

## Conceitos errôneos comuns

**O sequenciador da base sendo operado por Coinbase não significa que a Coinbase possa unilateralmente roubar ou congelar fundos do usuário.** O sistema à prova de falhas limita o que um sequenciador de mau comportamento pode realmente se safar; o risco real e concreto de sequenciamento centralizado é manipulação e censura de ordem de transações (mitido pela inclusão forçada, veja [Sequenciadores](./sequencers.md#por-que-a-centralização-do-sequenciador-é-um-comércio-genuíno-e-atual)), não roubo de fundos.

**Chegar ao "Stage 1" não é o mesmo que chegar ao "stage 2" completo.** O conselho de segurança da base mantém real, se limitado pelo seu limite de 9-of-12, poder de intervenção de emergência sobre os contratos da cadeia; A fase 1 é um marco genuíno, verificado, não uma afirmação de que nenhum partido privilegiado retém qualquer poder especial.

## Outras leituras

- [Documentação de base](https://docs.base.org/)
- [L2Beat: Base](https://l2beat.com/scaling/projects/base)
- [L2Beat: framework de etapas de rollup](https://l2beat.com/scaling/stages)
- Ver também: [Optimism](./optimism.md), [Sequenciadores](./sequencers.md)

---

[← Anterior: Optimism](./optimism.md)
·
[Voltar à Camada 2](./README.md)
·
[Próximo: zkSync →](./zksync.md)
