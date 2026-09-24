# Preço do gás e taxas

O presente capítulo abrange a forma como a Ethereum, de fato, preza o gás, o modelo de leilão simples pré-2021, e o mecanismo EIP-1559 de base e ponta o substituiu, incluindo a fórmula específica que ajusta o bloco de taxa base por bloco.

## Antes do EIP-1559: um leilão de primeiro preço

O modelo de taxa original de Ethereum tinha remetentes especificar um único `gasPrice` (o quanto eles pagariam por unidade de gás) e os mineradores, naturalmente maximizando o lucro, priorizaram as transações pendentes que oferecessem o maior preço de gás. Isto é um clássico. **leilão de primeiro preço**: os licitantes pagam exatamente o que oferecem, o que cria uma ineficiência econômica bem documentada. Os licitantes têm um incentivo para overbid fora da incerteza sobre o que outros estão licitando, uma vez que os riscos de subobrigação não ser incluído em tudo, e não há nenhuma maneira de saber o preço "apenas pouco" com antecedência.

## EIP-1559: taxa de base mais gorjeta

A **Atualização de Londres** (5 de agosto de 2021) substituiu este modelo por um modelo que dividia a taxa em dois componentes:

- **Taxa de base**: uma taxa mínima calculada pelo protocolo por unidade de gás, **queimado** (permanentemente destruído, não pago a ninguém), não definido pelo lance do remetente em tudo, mas algoritmicamente determinado pela demanda de rede recente.
- **Taxa de prioridade (dica)**: um montante adicional que o remetente escolhe para pagar diretamente ao proponente do bloco, como um incentivo para priorizar sua transação sobre outros competindo pelo mesmo espaço do bloco.

Um remetente especifica `maxFeePerGas` (o teto absoluto que eles estão dispostos a pagar por gás, cobrindo tanto a taxa de base e dica) e `maxPriorityFeePerGas` (o limite máximo da ponta); o montante efectivo cobrado é `min(maxFeePerGas, baseFee + maxPriorityFeePerGas)`, com a ponta tampada para que nunca exceda `maxFeePerGas - baseFee`.

## A fórmula de ajustamento da taxa de base

Cada bloco tem uma **utilização de gás alvo** (históricamente 15 milhões de gás, com **máximo** de 30 milhões, o alvo sendo exatamente metade do máximo, por design) e a taxa base ajusta bloco a bloco com base em como *anterior* O bloco era relativo a esse alvo:

```text
if previous block gas used > target:
    new base fee = old base fee × (1 + (excess / target) × (1/8))    [rises, capped at 12.5% per block]
if previous block gas used < target:
    new base fee = old base fee × (1 − (deficit / target) × (1/8))   [falls, capped at 12.5% per block]
if previous block gas used == target:
    new base fee = old base fee                                       [unchanged]
```

## Exemplo: simulando a taxa base em vários blocos

```typescript
function nextBaseFee(currentBaseFee: bigint, gasUsed: bigint, gasTarget: bigint): bigint {
  if (gasUsed === gasTarget) return currentBaseFee;
  if (gasUsed > gasTarget) {
    const delta = currentBaseFee * (gasUsed - gasTarget) / gasTarget / 8n;
    return currentBaseFee + (delta > 0n ? delta : 1n);
  }
  const delta = currentBaseFee * (gasTarget - gasUsed) / gasTarget / 8n;
  return currentBaseFee - delta;
}

const GAS_TARGET = 15_000_000n;
let baseFee = 20_000_000_000n; // 20 gwei, illustrative starting point

// Simulate three consecutive fully-packed blocks (30M gas used = 2x target)
for (let block = 1; block <= 3; block++) {
  baseFee = nextBaseFee(baseFee, 30_000_000n, GAS_TARGET);
  console.log(`After full block ${block}: base fee = ${baseFee / 1_000_000_000n} gwei (${baseFee} wei)`);
}
```

Resultado verificado da execução deste código exato:

```text
After full block 1: base fee = 22 gwei (22500000000 wei)
After full block 2: base fee = 25 gwei (25312500000 wei)
After full block 3: base fee = 28 gwei (28476562500 wei)
```

Cada bloco totalmente embalado aumenta a taxa de base em exatamente 12,5% sobre o bloco anterior, compondo, uma dinâmica real, documentada durante períodos de alta demanda sustentada, capaz de aproximadamente dobrar a taxa de base em cerca de seis blocos completos consecutivos se a demanda permanecer tão alta.

## Por que este design: previsibilidade sobre a eficiência do leilão

O objetivo da EIP-1559 não era principalmente diminuir as taxas (durante a alta demanda sustentada, as taxas sob EIP-1559 ainda podem ser altas), mas sim fazer taxas **estimativa** mais previsível: uma vez que a taxa de base é algorítmica e conhecida publicamente antes mesmo de uma transação ser construída, as carteiras podem estimar `maxFeePerGas` com muito menos adivinhação do que o antigo leilão de primeiro preço necessário, reduzindo o problema sistemático de sobrelotação descrito acima.

## Por que a taxa base é queimada, não paga aos validadores

Queimar a taxa de base (em vez de pagá-la a quem produz o bloco) elimina um problema de incentivo específico: se a taxa de base fosse paga para bloquear os produtores, eles teriam um incentivo financeiro direto para inflar artificialmente a demanda ou manipular o mecanismo de ajuste para empurrar a taxa de base maior. Queimando-o torna a taxa de base uma função pura de genuíno, demanda de rede orgânica, sem partido que se beneficia de manipulá-lo, e como efeito colateral, liga o crescimento total da oferta de éter de Ethereum inversamente ao uso da rede, uma conexão coberta mais [Estado Ethereum](./state.md) e a discussão mais ampla da política monetária em [Oferta Monetária](../economics/money-supply.md).

## Conceitos errôneos comuns

**EIP-1559 não suprimiu a possibilidade de taxas elevadas**, durante períodos de elevada procura sustentada, a taxa de base aumenta de modo a reflectir essa procura, e as taxas totais ainda podem ser substanciais; a taxa melhorada da alteração *previsibilidade* e redução da oferta excessiva orientada para leilões, não a escassez subjacente do próprio espaço de bloqueio.

**A taxa de base não é paga aos mineradores ou validadores**. Apenas a taxa de prioridade (dica) é; este é um detalhe frequentemente mal compreendido, uma vez que a intuição pré-EIP-1559 (todas as taxas vão para quem produz o bloco) não leva para o modelo pós-EIP-1559.

## Outras leituras

- [EIP-1559: Alteração do mercado de taxas para a cadeia ETH 1.0](https://eips.ethereum.org/EIPS/eip-1559)

---

[← Anterior: Gás](./gas.md)
·
[Voltar para Ethereum](./README.md)
·
[Próximo: Blocos Ethereum →](./blocks.md)
