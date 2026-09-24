# Perda impermanente

A perda impermanente é a diferença de valor entre o valor da posição retirada de um prestador de liquidez e o que teria valido a simples retenção dos mesmos símbolos originais, não agrupados. Este capítulo deriva o número diretamente da fórmula produto constante e trabalha através de vários cenários de preços verificados, em vez de citar o resultado padrão sem mostrar de onde vem.

## Configurando a comparação

Deposite 100 ETH e 200.000 USDC em um pool quando ETH negocia em US $ 2.000, para um valor total de depósito de US $ 400.000 e `k = 100 * 200,000 = 20,000,000` (ver [Fórmula constante do produto](./constant-product.md)). Duas coisas podem acontecer a partir daqui: o LP poderia apenas ter mantido esses 100 ETH e 200.000 USDC em uma carteira, ou eles depositado na pool, onde a negociação de arbitragem constantemente puxa o preço interno da pool para o preço de mercado externo (ver [Criadores de Mercado Automatizados](./amm.md#conceitos-errôneos-comuns)) à medida que o preço da ETH se move.

Perda impermanente compara estes dois resultados em algum ponto posterior onde o preço da ETH mudou, mantendo tudo o mais (tempo do depósito, montantes) fixo.

## Derivando novas reservas da pool após uma mudança de preço

Se o preço externo da ETH se tornar `newPrice`, os árbitros negoceiam contra o agrupamento até ao seu preço interno (`reserveUSDC / reserveETH`) corresponde `newPrice`, enquanto `k` fica fixo em 20.000.000. Resolver as novas reservas:

```typescript
function poolValueAfterPriceChange(
  initialETH: number,
  initialUSDC: number,
  priceMultiplier: number
) {
  const k = initialETH * initialUSDC;
  const initialPrice = initialUSDC / initialETH;
  const newPrice = initialPrice * priceMultiplier;

  const newETH = Math.sqrt(k / newPrice);
  const newUSDC = k / newETH;

  const poolValue = newETH * newPrice + newUSDC;
  const holdValue = initialETH * newPrice + initialUSDC;
  const impermanentLossPercent = ((poolValue - holdValue) / holdValue) * 100;

  return { newETH, newUSDC, poolValue, holdValue, impermanentLossPercent };
}
```

## Resultados verificados através de movimentos de preços

Correndo isso para vários multiplicadores de preço contra o mesmo pool inicial:

| ETH variação de preços | Valor do conjunto | Manter o valor | Perda impermanente |
|---|---|---|---|
| Sem alteração (1x) | $400,000 | $400,000 | 0% |
| +25% (1,25x) | $447,213.60 | $450,000 | -0.62% |
| +50% (1,5x) | $489,897.95 | $500,000 | -2.02% |
| 2x | $565,685.42 | $600,000 | -5.72% |
| 3x | $692,820.32 | $800,000 | -13.40% |
| 4x | $800,000 | $1,000,000 | -20% |
| -50% (0,5x) | $282,842.71 | $300,000 | -5.72% |
| - 75% (0, 25x) | $200,000 | $250,000 | -20% |

A perda é simétrica no preço *razão*: um aumento de 2x e uma diminuição de 2x (0,5x) produzem a mesma -5,72% perda impermanente, uma vez que a fórmula depende de quão longe a relação de preços se moveu de 1, não na direção. Pequenos movimentos custam muito pouco (um 25% de custos de movimento abaixo de 1%), mas a perda cresce mais rápido do que a própria mudança de preço: dobrar o preço de 2x para 4x aproximadamente quadruplica a perda, de -5,72% para -20%.

## Por que isso acontece: a pool é forçada a vender o bem apreciativo

O mecanismo é exatamente o que "produto constante" implica: à medida que o preço da ETH sobe, o reequilíbrio baseado em arbitragem da pool vende a ETH da pool e compra USDC para ela, para manter `reserveETH * reserveUSDC` fixo enquanto a relação corresponde ao novo preço externo. Um LP acaba por aguentar *menos* do ativo que subiu em valor e *mais* do ativo que não fez, comparado com o que eles teriam se eles simplesmente não tivessem feito nada. Esse é todo o mecanismo: não é uma taxa, uma penalidade, ou um hack, é a consequência direta, mecânica de uma fórmula que deve manter `k` Constante, trocando continuamente as reservas próprias da pool contra movimentos de preços.

## Porque "impermanente" e quando deixa de ser impermanente

A perda é chamada impermanente porque não é realizada até que o LP realmente se retira. Se o preço da ETH retornar aos seus US$ 2 mil originais antes da retirada, as reservas da pool retornam aos seus 100 ETH / 200 mil USDC originais também, e a perda desaparece completamente, exatamente cancelando-se de volta a zero. A perda só se torna real e permanente se o LP retirar enquanto o rácio de preços permanece diferente do rácio no momento do depósito. É por isso que as perdas impermanentes devem ser sempre pesadas em relação ao rendimento acumulado das taxas obtidas durante o mesmo período (ver [Prestadores de liquidez](./liquidity-providers.md#os-dois-componentes-do-retorno-lp)): o rendimento da taxa obtida durante o depósito é real e continua a crescer independentemente do que o preço faz a seguir, enquanto perda impermanente pode diminuir, crescer ou desaparecer dependendo de onde o preço termina em retirada.

## Conceitos errôneos comuns

**Perda impermanente não é uma taxa cobrada aos LPs, e ninguém a recolhe.** É um custo de oportunidade relativo a um contrafatual específico (mantendo os mesmos símbolos unpooled), não uma transferência de valor para qualquer parte; o valor "falta" efetivamente foi para comerciantes que obtiveram melhores preços a partir do reequilíbrio do pool do que eles teriam a partir de uma atribuição estática.

**Perda impermanente não é evitada escolhendo um pool com taxas mais baixas, ou eliminado uma vez que acontece.** Depende inteiramente do movimento do rácio de preços entre o depósito e a retirada, que não está relacionado com o nível de taxas do pool; um pool de 0% e um pool de 1% experimentam perdas impermanentes idênticas para o movimento de preços idênticos, apenas o seu rendimento de taxas difere.

**"Impermanente" não significa "pequeno" ou "raro".** Como a figura -20% para uma movimentação de preço 4x mostra, a perda pode ser substancial para um par volátil, e movimentos de preço grandes são exatamente as condições em que a perda impermanente mais importa, não um caso de borda que pode ser ignorado.

## Outras leituras

- [Whitepaper Uniswap v2](https://uniswap.org/whitepaper.pdf)
- Ver também: [Prestadores de liquidez](./liquidity-providers.md), [Fórmula constante do produto](./constant-product.md)

---

[← Anterior: Fornecedores de liquidez](./liquidity-providers.md)
·
[Voltar para DeFi](./README.md)
·
[Próximo: Slippage →](./slippage.md)
