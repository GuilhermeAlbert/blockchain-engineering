# Slippage

Slippage é a diferença entre o preço esperado de uma transação e seu preço real executado. Este capítulo cobre onde essa lacuna vem mecanicamente, por que cresce com o tamanho do comércio e encolhe com a profundidade da pool, e como a arbitragem mantém o preço de uma AMM ancorado no mercado mais amplo, apesar da pool não ter nenhum preço externo alimentação de seu próprio.

## Impacto do preço versus escorregamento citado

[Fórmula constante do produto](./constant-product.md) já mostrou o mecanismo diretamente: uma troca de 1 ETH contra um 100 ETH / 200.000 USDC pool executa a um preço efetivo de 1.980,20 USDC por ETH, não o preço pré-negociação do pool de 2.000. Essa lacuna, cerca de 0,99%, é **Impacto dos preços**: o próprio efeito do comércio sobre as reservas do pool, movendo o preço contra o comerciante como ele executa. A maioria das interfaces carteira e DEX mostra um separado, configurável pelo usuário **Tolerância de deslizamento** fixando, uma diferença máxima aceitável entre o preço cotado no momento da apresentação e o preço na execução real, protegendo contra a evolução do preço (de *outros* Trocas de desembarque primeiro) entre quando um comércio é assinado e quando é minado. Estes são relacionados, mas distintos: o impacto do preço é inerente ao próprio tamanho do comércio contra o pool atual, enquanto a tolerância de deslizamento protege contra as mudanças de preços causadas pela atividade de todos os outros no tempo entre citação e execução.

## A profundidade da pool determina quanto custa uma determinada dimensão comercial

O mesmo tamanho comercial produz impacto de preços muito diferente, dependendo do tamanho das reservas do pool. Uma troca de 1 ETH contra um pool de 100 ETH move o preço cerca de 1%; a troca de 1 ETH idêntica contra um pool de 10.000 ETH move-o aproximadamente 100 vezes menos, uma vez que as reservas que estão sendo perturbados são 100 vezes maiores em relação ao comércio:

```typescript
function swap(reserveIn: number, reserveOut: number, amountIn: number) {
  const k = reserveIn * reserveOut;
  const newReserveIn = reserveIn + amountIn;
  const newReserveOut = k / newReserveIn;
  const amountOut = reserveOut - newReserveOut;
  const spotPrice = reserveOut / reserveIn;
  const effectivePrice = amountOut / amountIn;
  const slippagePercent = (1 - effectivePrice / spotPrice) * 100;
  return { amountOut, slippagePercent };
}

console.log(swap(100, 200_000, 1));
// { amountOut: 1980.1980198019883, slippagePercent: 0.9900990099005913 }

console.log(swap(10_000, 20_000_000, 1));
// { amountOut: 1999.8000199981034, slippagePercent: 0.009999000094829125 }
```

É por isso que as plataformas de negociação superfiram a liquidez total de um pool com destaque: **profundidade da pool** (o tamanho das reservas de um pool) é o maior fator que determinará quanto impacto de preço um determinado tamanho comercial custará, independentemente de qual par ou protocolo específico está envolvido.

## Arbitragem e porque os preços entre locais convergem

Um pool AMM não tem conexão integrada com qualquer fonte de preço externa (ver [Criadores de Mercado Automatizados](./amm.md#conceitos-errôneos-comuns)); o seu preço é puramente uma função do seu próprio rácio de reserva. Se o preço de uma pool se afastar do preço disponível em outro lugar (uma troca centralizada, ou uma pool diferente para o mesmo par), essa lacuna cria uma oportunidade de lucro mecânica pura: compre o ativo barato, venda-o onde for caro, embolsando a diferença. Fazer isso move ambos os preços para o outro: comprar a partir do local barato aumenta o seu preço (exatamente o mecanismo preço-impacto acima), e vender para o local caro reduz o seu preço, até que a lacuna se reduz ao que resta após os custos de transação. Isto é... **arbitragem**, e é todo o mecanismo mantendo um preço AMM em linha com o mercado mais amplo: nenhuma decisão de governança ou atualização oráculo faz isso. Os comerciantes independentes que procuram lucros fazem-no automaticamente, continuamente, como um efeito colateral de perseguir a própria oportunidade de arbitragem.

## Conceitos errôneos comuns

**Slippage nem sempre é um custo imposto ao comerciante por outra pessoa.** Uma parte significativa dele, o componente preço-impacto, é uma consequência direta, inevitável do próprio tamanho do comércio em relação ao pool que está executando contra; um pool maior ou um comércio menor reduz-lo, mas nenhuma configuração de deslizamento-tolerância pode eliminar a parte preço-impacto inteiramente.

**Uma configuração de baixa tolerância de deslizamento não garante um bom preço, apenas um limitado.** Protege contra a deriva de preços de execução *além* um limiar escolhido a partir do preço cotado; não diz nada sobre se esse preço cotado em si já reflete impacto significativo do preço da própria dimensão do comércio.

## Outras leituras

- Ver também: [Fórmula constante do produto](./constant-product.md), [Grupos de liquidez](./liquidity-pools.md), [MEV](../security/mev.md)

---

[← Anterior: Perda impermanente](./impermanent-loss.md)
·
[Voltar para DeFi](./README.md)
·
[Próximo: Empréstimos →](./lending.md)
