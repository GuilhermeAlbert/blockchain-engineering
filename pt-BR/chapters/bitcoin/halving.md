# O halving

A cada 210.000 blocos (aproximadamente a cada quatro anos) O subsídio do Bitcoin corta exatamente ao meio. Este capítulo abrange o mecanismo (já [Bloquear recompensas](./block-rewards.md#exemplo-fórmula-de-subvenção)), as datas históricas reais da metade, e por que este calendário específico importa para como a oferta de Bitcoin cresce.

## O horário, exatamente

O subsídio começa em 50 BTC e metade a cada 210.000 blocos, continuando até que, após 64 metades, o subsídio gira para zero sob a aritmética inteiro-satoshi do Bitcoin Core (desde que repetidamente metade de um número inteiro de satoshis eventualmente atinge zero, em vez de continuar indefinidamente como uma fração), projetado, em aproximadamente quatro anos por metade, para ocorrer por volta do ano 2140.

| Metade | Data aproximada | Altura do bloco | Subvenção antes → depois |
| --- | --- | --- | --- |
| Gênesis | 3 de Janeiro de 2009 | 0 |, → 50 BTC |
| 1a | 28 de novembro de 2012 | 210,000 | 50 → 25 BTC |
| 2a | 9 de julho de 2016 | 420,000 | 25 → 12,5 BTC |
| 3rd | 11 de maio de 2020 | 630,000 | 12.5 → 6.25 BTC |
| 4a | 19-20 de abril de 2024 | 840,000 | 6.25 → 3.125 BTC |
| 5o (projetado) | ~ Abril 2028 | 1,050,000 | 3.125 → 1.5625 BTC |

As datas previstas para as futuras metades são estimativas baseadas no tempo médio de 10 minutos em bloco. A data real depende do tempo real do bloco histórico da rede até esse ponto, e só será conhecida quando acontecer.

## Por que cada 210.000 blocos especificamente

210.000 blocos em um tempo de bloco médio de 10 minutos funciona para quase exatamente quatro anos (210.000 × 10 minutos □ 60 □ 24 365,25 □ 3,99 anos). O código fixa o intervalo em 210.000 blocos, mas os escritos públicos sobreviventes de Satoshi não documentam por que esse número exato foi escolhido. A cadência de quatro anos é um efeito dos parâmetros, não evidência de um motivo privado declarado.

## Por que as metades são importantes para além do próprio número de subvenção

Cada redução para metade altera diretamente a relação entre a subvenção em bloco e as taxas de transação no total das receitas dos mineradores (ver [Bloquear recompensas](./block-rewards.md#subvenção-versus-recompensa-total)), que tem duas implicações, relacionadas, a longo prazo coberto totalmente em outro lugar neste livro: coloca uma pressão mecânica, previsível para baixo sobre a nova emissão de fornecimento (ver [21 milhões de BTC](./21-million.md) e [Esquema de Emissão](./issuance.md)), e levanta a questão prática de saber se as taxas de transação por si só terão eventualmente de apoiar o orçamento de segurança mineira do Bitcoin uma vez que a subvenção diminuiu para um montante negligenciável, examinado diretamente em [Orçamento de Segurança a Longo Prazo](./security-budget.md).

## Metades e economia mineira

Uma metade é, de uma perspectiva de pura mineração-receitas, um corte de 50% durante a noite para subsídio de renda para cada minerador, sem alteração correspondente aos seus custos de eletricidade ou hardware. Isso tem historicamente colocado pressão sobre os mineradores menos eficientes ( hardware mais velho ou menos eficiente em energia, ou aqueles que pagam taxas de eletricidade acima da média) para desligar logo após uma metade se o preço e a receita de taxa de Bitcoin não subiram o suficiente para compensar, após o que o [ajuste de dificuldade](./difficulty-adjustment.md) responde ao declínio da potência de hash resultante diminuindo a dificuldade, restaurando a rentabilidade para os mineradores remanescentes, mais eficientes. Esse processo de ajuste ocorreu, de alguma forma, após cada metade histórica até o momento, embora a magnitude e o tempo específicos do poder de hash mudem em torno de cada metade é uma questão empírica melhor respondida examinando dados reais da taxa de hash histórica do que afirmada como um padrão fixo.

## Conceitos errôneos comuns

**Uma metade não muda direta e imediatamente o preço de Bitcoin** através de qualquer efeito mecânico do protocolo. Muda o *taxa de emissão de nova oferta*, e qualquer efeito de preço depende inteiramente da forma como a procura responde relativamente a essa mudança de oferta, uma dinâmica de mercado que este livro não trata como previsível ou garantida (ver [Stock-to-Flow](./stock-to-flow.md) para um modelo específico, contestado que tenta vincular os dois, e suas críticas documentadas).

**As explorações de bitcoin existentes não são afectadas por uma redução para metade.** Apenas a taxa de *recém- criado* mudanças de bitcoin. O equilíbrio existente de ninguém é reduzido, dividido ou alterado.

## Outras leituras

- [Fonte principal do Bitcoin: cálculo da subvenção](https://github.com/bitcoin/bitcoin/blob/master/src/validation.cpp)
- Ver também: [Bloquear recompensas](./block-rewards.md), [21 milhões de BTC](./21-million.md)

---

[← Anterior: Recompensas bloco](./block-rewards.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Pools de mineração →](./mining-pools.md)
