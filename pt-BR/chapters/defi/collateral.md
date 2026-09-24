# Garantia

Cada empréstimo DeFi é sobre-colateralizado: o valor bloqueado sempre excede o valor emprestado, por uma margem o protocolo aplica automaticamente. Este capítulo cobre exatamente como essa margem é estabelecida e por que está estruturada da forma que está, com base no mecanismo de cofre já introduzido para as moedas estáveis em [Moedas estáveis garantidas](./collateralized-stablecoins.md).

## Rácio empréstimos/valor

O número central que rege qualquer posição garantida é o seu **rácio empréstimo-valor (LTV)**: o valor do montante emprestado dividido pelo valor da garantia. Um protocolo define um LTV máximo para cada ativo colateral suportado, nivelando o quanto um mutuário pode extrair em relação ao que eles prenderam.

```typescript
function loanToValue(borrowedValue: number, collateralValue: number): number {
  return borrowedValue / collateralValue;
}

const example = { collateralETH: 10, ethPrice: 2000, borrowedUSDC: 12_000 };
const collateralValue = example.collateralETH * example.ethPrice; // $20,000
console.log(loanToValue(example.borrowedUSDC, collateralValue)); // 0.6, 60% LTV
```

Um mutuário que bloqueia $20,000 de ETH e desenha $12.000 de USDC está em 60% LTV. Se o LTV máximo do protocolo para ETH é de 75%, este mutuário tem espaço para desenhar mais, ou espaço para absorver algum declínio de preço, antes de atingir o limite.

## Por que o LTV máximo está bem abaixo de 100%

A diferença entre o LTV emprestada máxima e 100% existe para absorver a volatilidade do preço colateral. Se o LTV máximo fosse 100%, qualquer queda de preço no ativo colateral, mesmo um pequeno, tornaria imediatamente a posição subcolateralizada, sem tempo para que ninguém (o mutuário, ou um mecanismo de liquidação automatizado) reagisse antes que o protocolo ficasse com garantia menor do que a dívida que paga. Um LTV máximo mais baixo constrói um buffer de tamanho para a volatilidade típica do ativo colateral: um ativo altamente volátil recebe um LTV máximo mais baixo do que um mais estável, porque ele precisa de um buffer maior para dar a mesma margem de segurança prática.

## Limiar de liquidação: um segundo número mais elevado

Separadamente do LTV máximo um mutuário pode *aberto* uma posição em, protocolos definir a **limiar de liquidação**: uma percentagem mais elevada de LTV em que uma posição existente se torna elegível para liquidação (ver [Liquidações](./liquidations.md)). A diferença entre o LTV máximo (por exemplo, 75%) e o limiar de liquidação (por exemplo, 80%) dá a um mutuário espaço para manter um solvente de posição já em aberto através de pequenas flutuações de preços sem desencadear imediatamente a liquidação no momento em que o LTV passa mesmo ligeiramente de onde o abriram.

## Nem todos os ativos de garantia são tratados da mesma forma

Os protocolos estabelecem diferentes parâmetros (valor máximo LTV, limiar de liquidação e se um ativo é aceite como garantia em tudo) por ativo, com base na liquidez, volatilidade desse ativo e na fiabilidade com que o seu preço pode ser determinado em cadeia (ver [Oráculos](./oracles.md)). Um ativo profundamente líquido e de baixa volatilidade como o ETH normalmente obtém parâmetros colaterais mais favoráveis do que um token finamente negociado, altamente volátil, porque um mercado fino torna tanto a alimentação do preço menos confiável quanto o próprio processo de liquidação (o que requer realmente vender a garantia apreendida) mais difícil de executar sem impacto significativo no preço.

## Conceitos errôneos comuns

**A garantia não é detida por terceiros da forma como a garantia de um empréstimo garantido tradicional pode ser.** Ele está no próprio contrato inteligente do protocolo, e o mutuário mantém a capacidade de retirá-lo (até o que resta após sua dívida pendente) em qualquer momento; nenhum banco ou empresa tem custódia dele.

**Um valor de garantia mais elevado não significa que um rácio empréstimo-valor mais baixo permaneça automaticamente dessa forma.** A LTV altera continuamente tanto o preço da garantia como a dívida em exercício (ver [Empréstimos](./borrowing.md#juros-acumulados-continuamente-não-num-calendário)) mudança, de modo que uma posição aberta com segurança abaixo do LTV máximo ainda pode derivar para o limiar de liquidação ao longo do tempo, mesmo sem o mutuário tomar qualquer nova ação.

## Outras leituras

- [Documentação do Aave: parâmetros de risco](https://docs.aave.com/risk/asset-risk/risk-parameters)
- Ver também: [Empréstimos](./borrowing.md), [Liquidações](./liquidations.md), [Oráculos](./oracles.md)

---

[← Anterior: Emprestando](./borrowing.md)
·
[Voltar para DeFi](./README.md)
·
[Próximo: Liquidações →](./liquidations.md)
