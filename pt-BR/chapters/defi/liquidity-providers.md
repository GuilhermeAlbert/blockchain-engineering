# Prestadores de liquidez

Um provedor de liquidez (LP) é qualquer pessoa que deposita tokens em um pool AMM para ganhar uma parte de suas taxas de negociação. Este capítulo cobre a posição real do LP: o que eles estão expostos, o que eles ganham, e por que o papel é um comércio de risco para o rendimento deliberado em vez de uma forma passiva, livre de risco para manter dois ativos.

## O que significa realmente ser um LP

Depósito num pool (ver [Grupos de liquidez](./liquidity-pools.md)) significa renunciar ao controle directo de dois saldos simbólicos específicos em troca de tokens LP que representem um crédito proporcional sobre as reservas do agrupamento no momento da retirada. Esta é uma posição fundamentalmente diferente da simples detenção dos mesmos dois ativos numa carteira: as participações de um LP são constantemente reequilibradas pela fórmula do produto constante (ver [Fórmula constante do produto](./constant-product.md)) como outros comerciantes trocam contra o pool, quer o LP quer que reequilíbrio ou não.

## Os dois componentes do retorno LP

O retorno global de um LP tem duas peças separadas que precisam ser avaliadas independentemente, não conflitadas:

- **Rendimentos das taxas**: a parte proporcional do LP de cada taxa de negociação cobrada em swaps em relação ao pool, que se acumula automaticamente nas reservas do pool (ver [Grupos de liquidez](./liquidity-pools.md#taxas-acrescem-ao-pool-não-como-pagamento-separado)). Isso é sempre positivo para um LP que permanece depositado; mais volume de negociação contra o pool significa mais renda de taxa para o mesmo capital depositado.
- **Perda impermanente**: a diferença de valor entre o que uma posição retirada de um LP vale versus o que simplesmente segurando os dois valores originais, unpooled, teria valido a pena. Isso pode ser positivo, negativo, ou zero, dependendo inteiramente de como a relação de preço do pool se moveu desde o depósito, e é coberto precisamente, com números calculados reais, em [Perda impermanente](./impermanent-loss.md).

A renda da taxa do pool pode superar sua perda impermanente, ou o inverso pode acontecer; o que se domina depende do volume de negociação em relação à volatilidade de preços para esse par específico, e não é algo que pode ser assumido favoravelmente por padrão.

## Por que os LP fornecem liquidez apesar do risco

O rendimento das taxas é um rendimento genuíno e recorrente sobre o capital depositado, gerado diretamente a partir de uma actividade comercial real e não de emissões simbólicas ou de qualquer outra fonte inflacionária, razão pela qual a provisão de liquidez continua a ser uma estratégia activamente seguida, apesar do risco de perda impermanente. Pools para pares de ativos esperados para se manter perto em valor relativo (duas moedas estáveis, ou um token emparelhado com sua própria versão envolto) carregam risco de perda impermanente estruturalmente menor para uma determinada quantidade de volume de negociação, que é parte do motivo pelo qual existem projetos AMM especializados para pares de proporção quase fixa (ver [Curve](./curve.md)).

## Conceitos errôneos comuns

**Ser um LP não é equivalente a simplesmente segurar ambos os símbolos subjacentes.** A fórmula do produto constante reequilibra ativamente as participações efetivas de um LP à medida que o preço do pool se move, que é uma exposição estruturalmente diferente de uma detenção estática 50/50 dos mesmos dois ativos, quantificada precisamente em [Perda impermanente](./impermanent-loss.md).

**O rendimento das taxas não é garantido para exceder a perda impermanente.** Se um pool específico é rentável para LPs durante um determinado período depende do volume de negociação real e volatilidade de preços desse pool durante esse período, ambos os quais variam por par e por condições de mercado, e nenhum dos quais pode ser assumido a favor de um LP sem verificar.

## Outras leituras

- Ver também: [Grupos de liquidez](./liquidity-pools.md), [Perda impermanente](./impermanent-loss.md)

---

[← Anterior: Grupos de liquidez](./liquidity-pools.md)
·
[Voltar para DeFi](./README.md)
·
[Próximo: Perda impermanente →](./impermanent-loss.md)
