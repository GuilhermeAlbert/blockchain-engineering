# Fórmula constante do produto

Uniswap's `x * y = k` fórmula é a regra específica de preços por trás da classe mais amplamente implantada de AMM (ver [Criadores de Mercado Automatizados](./amm.md)). Este capítulo trabalha através da fórmula diretamente, verificada com números calculados reais, em vez de descrevê-la apenas no resumo.

## A fórmula

Uma pool tem duas reservas, `x` e `y` (por exemplo, ETH e USDC). A fórmula requer que o produto permaneça constante em qualquer swap:

```text
x * y = k
```

`k` não é uma taxa, um alvo ou um parâmetro de governança. É simplesmente qualquer coisa `x * y` é igual agora, e o único trabalho da fórmula é manter esse produto inalterado após uma troca. Cada troca move o pool ao longo da mesma curva, negociando alguns de uma reserva para alguns dos outros em qualquer relação mantém `k` Consertado.

## Trabalhar através de um swap

Comece com uma pool com 100 ETH e 200.000 USDC:

```text
x = 100 ETH
y = 200,000 USDC
k = x * y = 20,000,000
```

O preço atual da pool é `y / x = 2,000 USDC per ETH`Agora um comerciante envia 1 ETH para a pool, querendo USDC para fora. A nova reserva ETH é `x' = 101`. Desde então `k` deve ficar em 20.000.000, a nova reserva USDC é forçada a ser:

```text
y' = k / x' = 20,000,000 / 101 = 198,019.801980198...
```

O comerciante recebe a diferença entre a reserva USDC antiga e nova:

```text
amountOut = y - y' = 200,000 - 198,019.801980198... = 1,980.198019801988...
```

Verificado diretamente no TypeScript:

```typescript
function swap(reserveIn: number, reserveOut: number, amountIn: number) {
  const k = reserveIn * reserveOut;
  const newReserveIn = reserveIn + amountIn;
  const newReserveOut = k / newReserveIn;
  const amountOut = reserveOut - newReserveOut;
  return { amountOut, newReserveIn, newReserveOut, k };
}

const before = { x: 100, y: 200_000 };
const result = swap(before.x, before.y, 1);
// { amountOut: 1980.198019801988, newReserveIn: 101, newReserveOut: 198019.801980198, k: 20000000 }

console.log(result.newReserveIn * result.newReserveOut); // 20000000, k held constant
```

O comerciante paga 1 ETH e recebe 1.980.198... USDC, não o ingênuo 2.000 USDC o preço pré-negociação local sugeriria. Essa lacuna tem um nome: deslize.

## Slippage: o custo de mover as reservas

O comerciante *eficaz* preço (1,980.198 USDC por ETH) é pior do que o preço spot da pool antes do comércio (2.000 USDC por ETH), em cerca de 0,99%. Isto não é uma taxa tomada pelo protocolo. É uma consequência direta e mecânica da própria fórmula: comprar ETH da pool remove ETH da reserva, o que eleva a escassez da reserva ETH em relação ao USDC, que a fórmula preços como um *subindo* ETH preço como o comércio executa. Um comerciante comprando 1 ETH paga um preço misturado em toda a curva de 2.000 para baixo para o que quer que o novo preço marginal se torne, não o preço inicial plano.

O tamanho do comércio em relação às reservas da pool determina quanto deslize um comerciante come. O mesmo pool, mas com uma troca de 10 ETH em vez de 1 ETH:

```typescript
const result10 = swap(100, 200_000, 10);
// { amountOut: 18181.818181818177, newReserveIn: 110, newReserveOut: 181818.18181818182, k: 20000000 }
```

10 ETH em retornos 18.181.818... USDC, um preço efetivo de 1.818,18 USDC por ETH: cerca de 9,09% de deslizamento, cerca de nove vezes pior do que o 1 ETH comércio de 0,99%, apesar do comércio ser apenas dez vezes maior. Slippage cresce mais rápido do que o tamanho do comércio porque a curva fica mais íngreme à medida que as reservas se tornam mais desequilibradas; um tratamento completo desta relação, e de impacto de preços em pools rasas especificamente, está em [Slippage](./slippage.md).

## Por que a curva parece como parece

Gráfico `y = k / x` produz uma hipérbole: `x` cresce, `y` encolhe, e nenhuma reserva pode chegar a zero, uma vez que `y = k / x` aproxima- se de zero apenas como `x` aproxima-se do infinito. Trata-se de uma propriedade deliberada e útil, não de um acidente da álgebra: significa que um pool de produtos constantes nunca pode ser totalmente drenado de um ativo, por mais grande que seja um único comércio, uma vez que o preço das unidades restantes sobe sem limite, à medida que a reserva diminui. Um comerciante pode sempre comprar *alguns* da reserva restante, mas compra *tudo* dele custaria uma quantidade infinita do outro símbolo.

## Conceitos errôneos comuns

**`k` não é fixado durante toda a vida útil da pool, apenas através de uma troca individual.** Prestadores de liquidez que adicionam ou retiram liquidez (ver [Grupos de liquidez](./liquidity-pools.md)) altera ambas as reservas proporcionalmente, o que altera `k` sem alterar o preço da pool, uma vez que o preço depende do *razão* `y / x`, Não `k`O valor absoluto.

**Slippage não é uma taxa, e não é pago a ninguém.** A diferença entre o preço à vista e o preço efectivo reflecte o impacto do próprio preço do comércio na curva; a taxa de negociação separada e explícita (ver [Criadores de Mercado Automatizados](./amm.md#taxas)) é uma quantia distinta tomada em cima de qualquer derrapagem que o comércio já incorre.

## Outras leituras

- [Whitepaper Uniswap v2](https://uniswap.org/whitepaper.pdf)
- Ver também: [Criadores de Mercado Automatizados](./amm.md), [Slippage](./slippage.md)

---

[← Anterior: Criadores de mercado automatizados](./amm.md)
·
[Voltar para DeFi](./README.md)
·
[Próximo: Pools de liquidez →](./liquidity-pools.md)
