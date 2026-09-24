# Liquidações

Liquidação é o processo automatizado que encerra uma posição subcolateralizada antes que sua dívida possa exceder o valor de sua garantia. Este capítulo trabalha através de um exemplo numérico completo, verificado de uma posição que é liquidada, e cobre quem realmente realiza liquidações e porque eles são incentivados a fazê-lo.

## Quando a liquidação desencadeia

Recordar o limiar de liquidação de [Garantia](./collateral.md#limiar-de-liquidação-um-segundo-número-mais-elevado): um rácio empréstimo-valor acima do qual uma posição se torna elegível para liquidação. O LTV de uma posição aumenta quando o preço da sua garantia cai, sua dívida cresce a partir de juros de aquisição, ou ambos; uma vez que o LTV cruza o limiar, qualquer pessoa (não apenas o protocolo em si) pode chamar a função de liquidação contra essa posição específica.

## Um exemplo completo de trabalho

Um mutuário bloqueia 10 ETH como garantia quando a ETH negocia em US $ 2.000, por US $ 20.000 de valor colateral, e toma emprestado $12.000 de USDC contra ela:

```typescript
const collateralETH = 10;
const initialPrice = 2000;
const borrowed = 12_000;

const collateralValue = collateralETH * initialPrice; // $20,000
const initialLTV = borrowed / collateralValue;
console.log(initialLTV); // 0.6, opened at 60% LTV
```

Suponhamos que o limite de liquidação do protocolo para ETH seja de 80%. Resolvendo pelo preço ETH ao qual o LTV desta posição específica atinge exatamente 80%:

```typescript
const liquidationThreshold = 0.80;
const liquidationPrice = borrowed / (collateralETH * liquidationThreshold);
console.log(liquidationPrice); // 1500

const collateralValueAtLiquidation = collateralETH * liquidationPrice; // $15,000
console.log(borrowed / collateralValueAtLiquidation); // 0.8, exactly the threshold
```

Se o preço da ETH cair de $2.000 para $1.500, uma queda de 25%, o valor colateral desta posição cai para $15.000 contra a mesma dívida de $12.000, um LTV de exatamente 80%: o limiar de liquidação. Neste ponto, a posição torna-se elegível para liquidação.

## Quem realiza liquidações, e porquê

A liquidação não é realizada pela equipe do protocolo ou por qualquer processo centralizado. É uma função aberta, sem permissão qualquer endereço pode chamar, e é rentável fazê-lo: um liquidatário reembolsa algumas ou todas as dívidas pendentes de uma posição em nome do mutuário, e em troca recebe um valor equivalente da garantia da posição *mais um bônus*, normalmente um desconto de alguns por cento abaixo do preço de mercado da garantia.

```typescript
const repayAmount = 5_000; // a liquidator repays part of the debt
const liquidationBonus = 0.08; // 8% bonus, protocol-specific
const priceAtLiquidation = 1500;

const collateralSeizedValue = repayAmount * (1 + liquidationBonus); // $5,400
const collateralSeizedETH = collateralSeizedValue / priceAtLiquidation; // 3.6 ETH
const liquidatorProfit = collateralSeizedValue - repayAmount; // $400

console.log({ collateralSeizedETH, liquidatorProfit });
```

Um liquidatário que paga 5.000 dólares da dívida do mutuário recebe $5.400 de ETH (3.6 ETH em $1.500), um lucro $400 para a transação, financiado pelo desconto embutido no bônus de liquidação. Este bônus é o que torna a liquidação um mercado competitivo e automatizado: bots monitoram continuamente posições abertas em todo o protocolo, prontos para liquidar o instante em que qualquer posição cruza seu limiar, e é por isso que posições subcolateralizadas em protocolos principais são normalmente liquidadas dentro do mesmo bloco que se tornam elegíveis, não deixadas expostas.

## Por que o bônus vem do mutuário, não do protocolo

O bônus de liquidação não é um subsídio que o protocolo paga; ele sai diretamente da garantia do próprio mutuário liquidado. Um mutuário que é liquidado perde mais valor colateral do que a dívida efetivamente reembolsada, exatamente o tamanho do bônus, que é o custo real de deixar uma posição derivar para o intervalo de liquidação, em vez de adicionar garantia ou reembolsar a dívida proativamente. Esta é uma escolha de design deliberada: a perda recai sobre a parte cuja posição criou o risco, não sobre os outros depositantes do pool, que permanecem protegidos enquanto as liquidações acontecem prontamente o suficiente para fechar posições antes de sua dívida realmente exceder seu valor de garantia.

## Conceitos errôneos comuns

**Liquidação não significa perder todas as garantias de uma posição.** Só são apreendidas garantias suficientes para cobrir a dívida reembolsada mais o bónus de liquidação; se um liquidatário reembolsar apenas uma parte da dívida (um limite comum imposto pelo protocolo, para evitar uma liquidação que seja forçada a encerrar uma grande posição de uma só vez), o devedor mantém qualquer garantia que permaneça após essa liquidação parcial.

**Um bónus de liquidação não é dinheiro livre independente do risco.** Um liquidatário ainda precisa realmente adquirir o ativo de reembolso, executar a transação de liquidação antes que um liquidatário concorrente faça, e muitas vezes vender a garantia apreendida depois, todos os quais carregam custos reais de transação e risco competitivo (ver [MEV](../security/mev.md)) que corroem o lucro teórico mostrado acima.

## Outras leituras

- [Documentação Aave: liquidações](https://docs.aave.com/faq/liquidations)
- Ver também: [Garantia](./collateral.md), [Empréstimos](./borrowing.md), [Manipulação do Oracle](../security/oracle-manipulation.md)

---

[← Anterior: Garantia](./collateral.md)
·
[Voltar para DeFi](./README.md)
·
[Próximo: Empréstimos Flash →](./flash-loans.md)
