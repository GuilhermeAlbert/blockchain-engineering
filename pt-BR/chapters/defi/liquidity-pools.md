# Grupos de liquidez

Um pool de liquidez é o contrato inteligente real que detém reservas de uma AMM: os dois saldos token a fórmula de produto constante (ver [Fórmula constante do produto](./constant-product.md)) preços de venda contra. Este capítulo cobre o que um contrato de pool realmente rastreia e como os depositantes obtêm uma reivindicação sobre ele.

## O que um contrato de pool detém

No mínimo, um contrato de pool rastreia três coisas: o saldo do token A ele atualmente guarda, o saldo do token B atualmente guarda, e o fornecimento total de um terceiro token que ele menta em si, chamado de **LP token** (indicador do fornecedor de liquidez). As próprias reservas da pool são exatamente `x` e `y` de [Fórmula constante do produto](./constant-product.md); nada sobre a lógica do pool requer qualquer estado além desses dois saldos e a fórmula de swap operando sobre eles.

## Tokens LP: um recibo para uma parte do pool

Quando um prestador de liquidez deposita tokens em um pool, o contrato menta tokens LP de volta para eles, representando um crédito proporcional sobre as reservas atuais do pool. Se um provedor depositar ativos no valor de 10% do valor total do pool, eles recebem tokens de LP representando 10% do total da oferta de tokens de LP. Retirar mais tarde significa queimar esses tokens LP e receber de volta uma parte proporcional de quaisquer reservas do pool são *nesse momento*, não necessariamente os mesmos montantes simbólicos originalmente depositados: a relação de reserva do pool se move conforme as trocas acontecem, e uma retirada retorna uma fatia da relação atual.

```typescript
// Simplified LP token accounting for a first deposit into an empty pool.
// Uniswap v2 actually uses sqrt(x * y) for the first mint, burning a small
// fixed amount permanently to prevent a division-by-zero on later math;
// this omits that detail to keep the core mechanic visible.
function firstDeposit(amountA: number, amountB: number) {
  const lpTokensMinted = Math.sqrt(amountA * amountB);
  return { reserveA: amountA, reserveB: amountB, lpTokensMinted };
}

function subsequentDeposit(
  amountA: number,
  reserveA: number,
  reserveB: number,
  totalLpSupply: number
) {
  // Depositing must match the pool's current ratio, or the depositor
  // effectively donates the mismatched portion to existing LPs.
  const amountB = (amountA * reserveB) / reserveA;
  const lpTokensMinted = (amountA / reserveA) * totalLpSupply;
  return { amountB, lpTokensMinted };
}

const pool = firstDeposit(100, 200_000); // 100 ETH, 200,000 USDC
console.log(pool);
// { reserveA: 100, reserveB: 200000, lpTokensMinted: 4472.13595499958 }

const nextLp = subsequentDeposit(10, pool.reserveA, pool.reserveB, pool.lpTokensMinted);
console.log(nextLp);
// { amountB: 20000, lpTokensMinted: 447.213595499958 }
```

Um segundo depositante que adiciona 10 ETH também deve adicionar 20.000 USDC para corresponder à taxa de 1:2.000 existente do pool, e recebe tokens LP iguais a exatamente 10% da oferta existente, já que estão adicionando exatamente 10% a mais de cada reserva.

## Taxas acrescem ao pool, não como pagamento separado

Taxa de negociação cobrada em cada swap (ver [Criadores de Mercado Automatizados](./amm.md#taxas)) não é pago aos fornecedores de liquidez diretamente como um saldo em execução. Fica no pool, adicionado às reservas, o que aumenta a quantidade de ambos os tokens uma determinada quantidade de tokens LP pode ser resgatada para ao longo do tempo. O valor de um token de LP cresce à medida que as taxas acumuladas aumentam as reservas totais do pool em relação à oferta fixa de token de LP, de modo que um provedor percebe sua renda de taxa retirando-se mais tarde do que eles voltariam de seu depósito original sozinho, não através de uma transação de crédito ou distribuição separada.

## Conceitos errôneos comuns

**Depositar em um pool não garante recuperar os mesmos dois montantes simbólicos originalmente depositados.** A retirada devolve uma parte proporcional da pool *atual* as reservas, independentemente do rácio que se verifiquem no momento da retirada; se o preço do pool se tiver deslocado desde o depósito, os montantes retirados reflectem esse novo rácio, que é a base mecânica de [perda impermanente](./impermanent-loss.md).

**Um sinal LP não é um índice passivo dos dois ativos subjacentes detidos separadamente.** Seu valor rastreia a curva constante-produto do pool, que se comporta de forma diferente de simplesmente manter os dois ativos fora do pool, uma distinção coberta precisamente em [Perda impermanente](./impermanent-loss.md).

## Outras leituras

- [Contratos de base Uniswap v2](https://github.com/Uniswap/v2-core)
- Ver também: [Prestadores de liquidez](./liquidity-providers.md), [Perda impermanente](./impermanent-loss.md)

---

[← Anterior: Fórmula de produto constante](./constant-product.md)
·
[Voltar para DeFi](./README.md)
·
[Próximo: Fornecedores de liquidez →](./liquidity-providers.md)
