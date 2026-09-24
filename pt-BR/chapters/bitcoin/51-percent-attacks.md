# 51% Ataques

Um ataque de 51% é um cenário em que uma única parte (ou grupo coordenado) controla a maioria do poder de hash total de uma rede de prova de trabalho, e usa essa maioria para manipular quais transações a rede aceita. Este capítulo abrange precisamente o que tal atacante pode e não pode fazer, uma vez que o termo é frequentemente utilizado de forma mais frouxa e mais alarmante do que a capacidade limitada que descreve.

## O que um atacante maioria pode fazer

Com poder de haxixe maioritário, um atacante pode:

- **Excluir as transações específicas** dos blocos que minam, censurando-os efetivamente da confirmação contanto que o atacante continue controlando a maioria (embora outros mineradores honestos não controlados pelo atacante ainda poderiam incluir essas transações em blocos *eles* encontrar, se existir).
- **Inverter as suas próprias transações recentes**: o clássico **Ataque de spend duplo**: gastar moedas em uma transação incluída na cadeia publicamente visível (por exemplo, pagar uma troca e tê-los a crédito do depósito), em seguida, secretamente minar uma cadeia alternativa que não inclui essa transação, e uma vez que essa cadeia alternativa tem mais trabalho cumulativo, transmiti-lo, por [Escolha do fork](../blockchain/fork-choice.md), a rede adota a cadeia de trabalho mais longo, órfão da transação original e deixando o atacante gastar as mesmas moedas novamente em outro lugar.
- **Impedir que outros blocos de mineradores se tornem parte da cadeia aceite** enquanto a cadeia privada do atacante está sendo construída, embora isso exija que o atacante se sobreponha continuamente à rede honesta durante o ataque.

## O que um atacante maioria não pode fazer, mesmo com 100% de poder de hash

Este é o mais importante, e mais reconfortante, metade do quadro, e vale a pena afirmar precisamente porque é frequentemente mal compreendido:

- **Não é possível roubar fundos de endereços que não controlam as chaves privadas.** Controles por maioria de provas de trabalho *válido* cadeia é estendida; ele não permite que um atacante forje assinaturas ou contorne a [assinatura digital](../cryptography/digital-signatures.md) Requisitos para gastar qualquer produto. Um ataque de 51% não é uma forma de quebrar as assinaturas da ECDSA ou da Schnorr.
- **Não é possível alterar as regras de protocolo do Bitcoin**: calendário de emissão, limites de tamanho do bloco, ou qualquer outra regra de consenso. O poder de hash determina qual *regras válidas-per-existentes* cadeia ganha uma comparação fork-escolha; ele não tem poder para fazer um bloco de outra forma-inválida (um que quebra uma regra de consenso) tornar-se aceitável para honestamente correr nós completos, que independentemente de quanto trabalho o suporta (ver [Nós Completos](./full-nodes.md)).
- **Não foi possível reverter as transações enterradas no passado** sem refazer uma quantidade de trabalho cumulativo proporcional a essa profundidade, o cálculo a partir de [Finalidade Probabilística](../distributed-systems/probabilistic-finality.md) ainda se aplica; um atacante de 51% tem *subindo*, não certo, probabilidade de reverter com sucesso as transações recentes, e reverter as muito antigas, profundamente enterradas requer uma quantidade de trabalho sustentado que se torna impraticável mesmo para um atacante maioria quanto mais profunda a transação alvo é.

## Incidentes históricos

A rede principal de Bitcoin não sofreu um ataque maioritário confirmado e sustentado do tipo descrito acima em escala significativa. Sua taxa de haxixe e o capital necessário para adquirir uma genuína maioria fazem com que tal ataque seja extraordinariamente caro. Redes de prova de trabalho menores sofreram ataques de maioria documentados e gastos duplos, incluindo Bitcoin Gold em 2018 e Ethereum Classic em 2019 e 2020. Esses incidentes estabelecem o risco técnico sem exigir estimativas incertas do seu impacto em dólares.

## Por que o limiar é chamado "51%" em vez de exatamente 50%

Um atacante com *exatamente* 50% do poder de haxixe está, na expectativa, ligado à rede honesta, a corrida descrita em [Finalidade Probabilística](../distributed-systems/probabilistic-finality.md#o-modelo) nunca resolve de forma confiável a favor do atacante a longo prazo, embora a variância de curto prazo ainda poderia ocasionalmente favorecer ambos os lados. "51%" é abreviação para "uma maioria genuína e sustentada", e na prática, uma maioria menor (por exemplo, 40-45%, especialmente combinada com estratégias como a mineração egoísta que exploram vantagens de propagação-timing em vez de puro poder de hash sozinho) pode, sob algumas análises, obter influência desproporcionada sem necessidade de um total, limpo 51%, o que significa que o limiar do mundo real para risco significativo é um pouco mais matizado do que a figura redonda, popularizada "51%" sugere.

## Conceitos errôneos comuns

**Um ataque de 51% não é uma maneira de "hack Bitcoin" no sentido de quebrar sua criptografia.** É um ataque econômico e probabilístico ao mecanismo de consenso especificamente, completamente distinto e não permitido por qualquer fraqueza nas funções de hash ou esquemas de assinatura abrangidos por [Criptografia](../cryptography/README.md).

**O custo de um ataque de 51% contra a rede principal do Bitcoin não é principalmente sobre adquirir hardware sozinho**, manter o poder de hash majoritário para uma duração de ataque significativa também requer uma enorme despesa de eletricidade em curso, e o atacante perde a receita de mineração honesta substancial (subvenção mais taxas) que eles teriam ganho com a mineração honestamente com esse mesmo hardware durante o ataque, um custo de oportunidade real fatorado em análises mais sérias de economia de ataque.

## Outras leituras

- [Whitepaper Bitcoin, Seção 11 (Calculações)](https://bitcoin.org/bitcoin.pdf)
- Ver também: [Finalidade Probabilística](../distributed-systems/probabilistic-finality.md), [Pools de Mineração](./mining-pools.md)

---

[← Anterior: Hashrate](./hashrate.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Consumo de energia →](./energy.md)
