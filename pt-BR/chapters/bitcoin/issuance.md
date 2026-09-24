# Esquema de Emissão

Este capítulo analisa a emissão de Bitcoin como uma curva de política monetária, não apenas a mecânica já coberta em [Bloquear recompensas](./block-rewards.md) e [O halving](./halving.md), mas como essa curva realmente se parece com o tempo, e como ela se compara com os padrões de emissão de outros ativos monetários discutidos em [Dinheiro e Economia](../economics/README.md).

## A forma da curva

A emissão do Bitcoin é **desinflacionário**, não deflacionária, em um sentido técnico específico vale a pena ser preciso sobre (ver [Inflação e deflação](../economics/inflation-and-deflation.md)): a oferta ainda está crescendo (novo bitcoin ainda está sendo criado com cada bloco) mas o *taxa* deste crescimento (taxa de inflação anual, em percentagem da oferta existente) diminui continuamente, diminuindo para metade a cada metade. Este é um padrão significativamente diferente de uma moeda com uma fonte literalmente encolhendo (que seria deflacionária no sentido mais estrito), embora a comunidade e a mídia às vezes usam "deflacionária" vagamente para descrever a trajetória geral de longo prazo de Bitcoin em direção a um limite fixo.

## Taxa de inflação anual ao longo do tempo

```typescript
function annualInflationRate(circulatingSupplyBTC: number, blocksPerYear: number, subsidyBTC: number): number {
  const newSupplyPerYear = subsidyBTC * blocksPerYear;
  return (newSupplyPerYear / circulatingSupplyBTC) * 100;
}

const BLOCKS_PER_YEAR = Math.round((365.25 * 24 * 60) / 10); // ~52,596 blocks/year at 10-min average

// Illustrative circulating-supply snapshots at various points — not live data.
console.log("~2013 (post-1st halving, ~11M BTC circulating):", annualInflationRate(11_000_000, BLOCKS_PER_YEAR, 25).toFixed(2), "%");
console.log("~2021 (post-3rd halving, ~18.6M BTC circulating):", annualInflationRate(18_600_000, BLOCKS_PER_YEAR, 6.25).toFixed(2), "%");
console.log("~2024 (post-4th halving, ~19.7M BTC circulating):", annualInflationRate(19_700_000, BLOCKS_PER_YEAR, 3.125).toFixed(2), "%");
```

Resultado verificado da execução deste código exato:

```text
~2013 (post-1st halving, ~11M BTC circulating): 11.95 %
~2021 (post-3rd halving, ~18.6M BTC circulating): 1.77 %
~2024 (post-4th halving, ~19.7M BTC circulating): 0.83 %
```

As figuras de abastecimento circulante utilizadas são aproximações ilustrativas para as épocas indicadas, não precisas, fontes de instantâneos históricos, substituir por figuras citadas de um histórico de fornecimento de bloco-explorador antes de tratar qualquer porcentagem específica como autoritária para uma data específica.

O padrão claro, independentemente dos números exatos: porque ambos os subsídios por bloco *e* (na sequência de cada metade) a sua quota-parte de uma oferta existente cada vez maior está a diminuir, a taxa de inflação anual diminui consideravelmente mais rapidamente do que uma simples descrição "metade da subvenção" só poderia sugerir, cada vez que a redução de metade da emissão nova ao meio, dividindo-a em uma base já maior.

## Comparação com outros ativos monetários

A produção anual de ouro tem historicamente acrescentado cerca de 1-2% ao estoque de ouro global acima do solo existente na maioria dos anos (ver [Moeda-mercadoria](../economics/commodity-money.md)), um valor que tem sido relativamente (embora não perfeitamente) estável durante longos períodos, uma vez que a produção de mineração de ouro responde a preço e tecnologia de extração, em vez de seguir qualquer programa fixo. Crescimento da oferta de moeda fiat, discutido em [Oferta Monetária](../economics/money-supply.md), varia consideravelmente por país e período, e é uma questão de poder discricionário do banco central em curso em vez de um calendário fixo em tudo (ver [Política monetária](../economics/monetary-policy.md)). A emissão de Bitcoin, em contraste, é o único ativo monetário principal coberto neste livro com um **conhecido publicamente, programa matematicamente fixo que estende décadas para o futuro**, verificável por qualquer pessoa em vez de depender de sorte geológica, tecnologia de extração, ou discrição institucional, uma propriedade verdadeiramente distinta, independente de qualquer julgamento sobre se essa previsibilidade é, na rede, benéfica (uma questão este livro examina de múltiplos ângulos em [Economia austríaca e Bitcoin](../economics/austrian-economics-and-bitcoin.md) e [Críticas de Bitcoin como Dinheiro](../economics/bitcoin-criticism.md)).

## Conceitos errôneos comuns

**Uma taxa de inflação decrescente não significa que a oferta em circulação esteja a diminuir.** Novo bitcoin continua a ser criado em cada bloco até que o último subsídio é extraído em torno de 2140, o *taxa* de crescimento cai, não o montante total existente.

**O calendário de emissão não é ajustável em resposta à procura, preço ou condições econômicas**Ao contrário do ouro (onde preços mais elevados podem incentivar mais extração) ou moeda fiduciária (onde um banco central pode expandir a oferta em resposta a uma crise), a emissão de Bitcoin segue seu cronograma fixo, independentemente de qualquer condição econômica externa, uma escolha de design deliberada examinada de vários lados ao longo do [Economia](../economics/README.md) seção.

## Outras leituras

- [Fonte principal do Bitcoin: cálculo da subvenção](https://github.com/bitcoin/bitcoin/blob/master/src/validation.cpp)
- Ver também: [21 milhões de BTC](./21-million.md), [O halving](./halving.md)

---

[← Anterior: 21 milhões de BTC](./21-million.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Stock-to-Flow →](./stock-to-flow.md)
