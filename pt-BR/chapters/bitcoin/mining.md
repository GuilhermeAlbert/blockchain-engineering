# Mineração

A mineração é o processo completo de competir para criar novos blocos Bitcoin: montagem de blocos candidatos, busca de prova válida de trabalho, e (se bem sucedido) transmissão do resultado para ganhar a recompensa bloco. Este capítulo abrange a exploração mineira como actividade econômica e como processo operacional, com base na mecânica pura já abrangida [Prova de Trabalho](./proof-of-work.md).

## O que um minerador realmente faz, termina

1. **Liga- se à rede** como um nó completo (ou depende do nó de uma pool, veja [Pools de Mineração](./mining-pools.md)), permanecendo sincronizado com a corrente atual e mempool.
2. **Selecciona as transações** do mempool para incluir em um bloco candidato, normalmente priorizando por taxa (ver [Taxas de transação](./fees.md)) para maximizar a receita, sujeito ao limite de peso do bloco.
3. **Construi a transação de base de moedas**, pagando-se a si próprio a subvenção por categoria acrescida da soma das taxas de operações incluídas (ver [Transações de base de moeda](./coinbase-transactions.md)).
4. **Executa a pesquisa à prova de trabalho** descrito em [Prova de Trabalho](./proof-of-work.md), utilizando hardware especializado (ver [ASICs](./asics.md)).
5. **Transmite o bloco imediatamente após encontrar um hash válido**, uma vez que qualquer atraso aumenta o risco outro minerador encontra um bloco concorrente primeiro e o esforço é desperdiçado (ver [Propagação de Blocos](../distributed-systems/p2p.md#exemplo-questões-de-temporização-de-propagação) e [Reorganizações da Cadeia](../blockchain/reorgs.md)).

## Economia mineira

A receita de um minerador é o subsídio de bloco mais taxas de transação para cada bloco que eles minam com sucesso (ver [Bloquear recompensas](./block-rewards.md)); os seus custos são os custos de capital do equipamento minerador (ver [ASICs](./asics.md)) e o custo contínuo da eletricidade para executá-lo, além de facilidade, refrigeração, e despesas gerais de manutenção. Porque a mineração é um **competitivo**, processo probabilístico (um minerador com X% do poder de hash total da rede encontra aproximadamente X% de blocos em um período longo suficiente, mas com variância genuína, às vezes substancial em períodos mais curtos) rentabilidade depende da relação entre os custos próprios de um minerador (principalmente preço de eletricidade e eficiência de hardware, em hashes-por-joule) e preço de Bitcoin, dificuldade atual, e níveis de taxa atuais. Esta relação é dinâmica e autocorrectiva: o aumento dos preços de Bitcoin atraem mais investimentos de mineração, o que aumenta o poder de hash de rede total, que o [ajuste de dificuldade](./difficulty-adjustment.md) responde aumentando a dificuldade do alvo, empurrando mineradores marginais, menos eficientes de volta para a não rentabilidade, um processo contínuo de busca de equilíbrio em vez de um estado fixo, estático.

## Variância e porque existem pools

Um minerador individual com uma pequena fração de potência total de hash de rede pode, por puro acaso, ir muito tempo sem encontrar qualquer bloco em tudo, mesmo que a sua parte esperada de longo prazo de recompensas é refletida com precisão pela sua partilha de poder de hash (este é o mesmo tipo de variância inerente a qualquer processo de baixa probabilidade por julgamento, muitos julgamentos. [Pools de Mineração](./mining-pools.md) existem especificamente para suavizar esta variância: muitos mineradores individuais combinam seu poder de haxixe, e qualquer que seja o participante do pool realmente encontre um bloco válido compartilha a recompensa entre todos os participantes contribuintes proporcionais ao seu trabalho contribuído, convertendo uma alta variação, pouca sorte em um pagamento menor, mais previsível, mais frequente) um real e compreensível pools de razões tornou-se dominante, discutido ainda mais (incluindo a centralização preocupa isso levanta) nesse capítulo.

## Blocos obsoletos e órfãos

Um minerador que encontra um bloco válido que, em última análise, não está incluído na cadeia vencedora (porque um bloco concorrente, encontrado quase simultaneamente, foi estendido primeiro. Ver [Reorganizações da Cadeia](../blockchain/reorgs.md)) recebe **nenhuma recompensa em tudo** para esse bloco, todo o tempo de energia elétrica e hardware gasto encontrando foi, sob uma perspectiva de receita pura, desperdiçado. Este é um custo real e contínuo do mecanismo de consenso probabilístico e sensível ao atraso de propagação do Bitcoin, e é parte do motivo pelo qual mineradores bem conectados (com propagação mais rápida e confiável para o resto da rede) têm uma genuína vantagem estrutural sobre os mal conectados, uma pressão de centralização que vale a pena levar a sério ao invés de tratar a mineração puramente como uma loteria proporcional ao hash.

## Conceitos errôneos comuns

**A mineração não envolve "solucionar quebra-cabeças matemáticos complexos" no sentido de resolução inteligente de problemas.** É força bruta, tentativa sem memória e erro (ver [Prova de Trabalho](./proof-of-work.md#conceitos-errôneos-comuns)). A "dificuldade" é inteiramente sobre quantas tentativas são necessárias em média, não sobre qualquer tentativa que exija mais perspicácia ou inteligência do que qualquer outra.

**A quota de potência de um minerador não garante essa quota-parte exacta de blocos durante um período curto específico.** É uma expectativa probabilística que contém com precisão apenas uma amostra longa o suficiente. Os resultados de curto prazo podem e fazem desvio significativamente, que é precisamente o problema de variância que os pools de mineração existem para resolver.

## Outras leituras

- [Bitcoin Referência do desenvolvedor principal: Mineração](https://developer.bitcoin.org/reference/)
- Ver também: [Prova de Trabalho](./proof-of-work.md), [Dificuldade em Mineração](./difficulty.md)

---

[← Anterior: Prova de trabalho](./proof-of-work.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Dificuldade em Mineração →](./difficulty.md)
