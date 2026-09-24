# Tempo de bloco

O Bitcoin visa um novo bloco a cada 10 minutos. Este capítulo cobre a razão pela qual esse número específico foi escolhido, e o tradeoff geral cada blockchain faces ao escolher um intervalo de bloco alvo, uma decisão coberta em profundidade para Bitcoin especificamente em [Ajuste de Dificuldade](../bitcoin/difficulty-adjustment.md), e revisitado para a escolha muito diferente de Ethereum em [Blocos Ethereum](../ethereum/blocks.md).

## Controles do tempo do bloco de tradeoff

Um tempo de bloqueio mais curto significa que as transações são incluídas (e começam a acumular confirmações) mais rápido, o que é bom para a usabilidade. Mas vem a um custo directo ligado a [Redes de pares a pares](../distributed-systems/p2p.md#exemplo-questões-de-temporização-de-propagação): quanto mais curto o intervalo entre os blocos, mais provavelmente dois mineradores encontrar blocos válidos perto o suficiente juntos no tempo que nenhum dos dois terminou de se propagar através da rede antes do outro ser encontrado, aumentando a taxa de [Reorganizações da Cadeia](./reorgs.md) e blocos órfãos/estábulos. Um bloco que fica órfão representa o esforço de mineração desperdiçado (o minerador que o encontrou não ganha nada) e, em escala, pode sutilmente favorecer mineradores melhor conectados (que propagam seus blocos mais rápido e são menos propensos a ser órfão), uma pressão de centralização que vale a pena levar a sério.

## Por que cerca de 10 minutos

O próprio raciocínio de Satoshi para a figura específica não está amplamente documentado na escrita pública conhecida além do julgamento geral da engenharia sobre o equilíbrio desses tradeoffs, mas a escolha reflete um compromisso deliberado: curto o suficiente para que o sistema se sinta utilizável (esperando na ordem de dezenas de minutos a uma hora para confirmação razoável confiança, em vez de dias), tempo suficiente para que a propagação de atraso em uma rede global descentralizada (que, mesmo hoje, geralmente completa dentro de alguns segundos para um bloco típico) representa apenas uma pequena fração do intervalo entre blocos, mantendo a taxa de órfão natural causada pela propagação baixa sem exigir qualquer engenharia especial para suprimi-la.

## Como o intervalo alvo é realmente mantido

O tempo de bloqueio não é aplicado diretamente, nenhuma regra diz "você não pode submeter um bloco antes de 10 minutos após o último". Em vez disso, emerge como uma média estatística da interação entre a potência total de mineração da rede e o [alvo de dificuldade](../bitcoin/difficulty.md), que é periodicamente recalculado (cada bloco de 2016, aproximadamente duas semanas, para Bitcoin) especificamente para empurrar o *média* tempo entre blocos de volta para 10 minutos, compensando por mudanças no poder de hash total dedicado à mineração. Isto é coberto mecanicamente, com a fórmula de ajuste real, em [Ajuste de Dificuldade](../bitcoin/difficulty-adjustment.md).

Porque a descoberta do bloco é fundamentalmente um processo aleatório (ver [Resistência à Preimagem](../cryptography/preimage-resistance.md#por-que-isso-importa-a-mineração-é-uma-busca-de-preimagem)), os blocos individuais chegam em intervalos irregulares, mesmo quando a rede está perfeitamente calibrada para uma média de 10 minutos. Alguns blocos são encontrados em menos de um minuto, outros levam 30 minutos ou mais, puramente por acaso, da mesma forma que lançar uma moeda justa não produz cabeças e caudas em um padrão perfeitamente alternado, mesmo que a média de longo prazo é 50/50.

## Correntes diferentes, escolhas diferentes

A cadeia de provas de trabalho pré-Merge de Ethereum teve como alvo cerca de 13-15 segundos por bloco, muito mais curto do que a de Bitcoin, refletindo um tradeoff diferente priorizando a inclusão de transações mais rápida ao custo de um órfão natural significativamente mais elevado (chamado de "tio" na terminologia de Ethereum), taxa que o projeto de Ethereum explicitamente contabilizava com regras específicas para recompensar e contabilizar os blocos de tios em vez de simplesmente descartar esse esforço de mineração inteiramente. Desde [The Merge](../ethereum/the-merge.md), Ethereum utiliza um fixo de 12 segundos **slot** tempo sob prova de participação, um mecanismo inteiramente diferente (não descoberta de blocos de prova de trabalho, mas uma rotação programada do validador, ver [Slots](../ethereum/README.md)), que evita o tradeoff propagação-atraso de uma forma fundamentalmente diferente, uma vez que a atribuição de slot é determinística em vez de probabilística.

## Conceitos errôneos comuns

**"10 minutos" é uma média alvo, não uma garantia para qualquer bloco individual.** Os intervalos de bloqueio individuais variam consideravelmente e imprevisivelmente em torno dessa média, uma espera de mais de 20 minutos para o próximo bloco, ou dois blocos que chegam dentro de segundos um do outro, são ambos normais, resultados esperados do processo aleatório subjacente, não sinais de um problema.

**Um tempo de bloqueio mais curto não é simplesmente "melhor".** É uma troca genuína entre latência de transação e ineficiência de nível de rede (taxa de órfão, pressão de centralização orientada para propagação). Diferentes protocolos blockchain fazem escolhas diferentes e defensáveis aqui dependendo de suas prioridades específicas.

## Outras leituras

- [Whitepaper Bitcoin, Seção 4 (Proof-of-Work)](https://bitcoin.org/bitcoin.pdf)
- Ver também: [Ajuste de Dificuldade](../bitcoin/difficulty-adjustment.md)

---

[← Anterior: Altura do bloco](./block-height.md)
·
[Voltar para Blockchain Fundamentos](./README.md)
·
[Próximo: Reorganizações de cadeia →](./reorgs.md)
