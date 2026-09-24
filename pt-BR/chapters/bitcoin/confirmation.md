# Confirmação da transação

Uma transação tem uma confirmação uma vez que é incluído no bloco de dicas atual, dois uma vez outro bloco é minado em cima disso, e assim por diante. Este capítulo aplica os conceitos gerais de finalidade a partir de [Finalidade Probabilística](../distributed-systems/probabilistic-finality.md) para a questão específica, prática de quantas confirmações diferentes situações do mundo real realmente justificam.

## Que número de confirmação representa realmente

Recordar os números calculados em [Finalidade Probabilística](../distributed-systems/probabilistic-finality.md#o-que-os-números-realmente-dizem): contra um atacante com 10% do poder de hash da rede, a probabilidade de uma reversão bem sucedida cai de cerca de 20% em 1 confirmação para aproximadamente 0,024% em 6 confirmações. A contagem de confirmação é, precisamente, este, um proxy para "o quanto prova cumulativa de trabalho agora está por trás desta transação", que se traduz diretamente em "o quão caro seria para um atacante produzir uma cadeia alternativa que a exclui".

## Risco de confirmação zero

Uma transação não confirmada ("zero-conf") no mempool carrega significativamente mais risco do que mesmo uma única confirmação, por uma razão específica: ela pode potencialmente ser substituída por uma transação conflitante antes de qualquer minerador incluí-la, seja através de explícito [Substituir por Fee](./mempool.md#substituir-por-fee) (se sinalizou RBF) ou, em princípio, através de um minerador simplesmente escolhendo incluir uma transação diferente, conflitante gastando os mesmos insumos (embora uma rede bem conectada, que funciona honestamente faz com que isso seja um risco prático muito menor para uma transação não-RBF-sinalização do que a substituição baseada em RBF, esforço de atacante ativo ausente). Alguns comerciantes historicamente aceitaram pagamentos de confirmação zero para transações de baixo valor, baixo risco (uma compra de café) como um tradeoff usabilidade, entendendo que isso carrega real, se geralmente pequeno, risco de fraude, uma decisão de negócios sobre risco aceitável, não uma garantia de protocolo.

## Quantas confirmações é "basta"?

Não há nenhum número universalmente correto. É uma decisão de risco que depende do valor da transação e do modelo de ameaça realista:

- **Compras pequenas e diárias**: muitos comerciantes e serviços aceitam confirmações 0-1, aceitando o risco de fraude correspondente como um custo de fazer negócios, semelhante a como as redes de cartões aceitam algum risco de chargeback.
- **Operações típicas de retalho ou de valor moderado**: 1-3 confirmações é um padrão prático comum.
- **Historicamente comum troca/padrão de grande valor**: 6 confirmações (aproximadamente uma hora) tem sido um benchmark informal amplamente utilizado desde os anos anteriores de Bitcoin, embora muitas trocas agora usam menos confirmações para menores quantidades e mais para maiores, uma abordagem graduada que reflete diretamente a lógica do valor em risco a partir [Finalidade Probabilística](../distributed-systems/probabilistic-finality.md#comércio).
- **Transações muito grandes ou aquelas especificamente preocupadas com um atacante bem-recurso**: algumas empresas e protocolos exigem consideravelmente mais de 6 confirmações, particularmente para pontes cruzadas ou contextos de depósito de troca onde os recursos supostos atacantes são maiores.

## Exemplo: uma política de confirmação graduada

```typescript
function requiredConfirmations(amountSats: number): number {
  if (amountSats < 100_000) return 0;        // small purchase, accept zero-conf risk
  if (amountSats < 10_000_000) return 1;     // moderate value
  if (amountSats < 100_000_000) return 3;    // significant value
  return 6;                                   // large value, use the conventional standard
}

for (const amount of [50_000, 5_000_000, 50_000_000, 500_000_000]) {
  console.log(`${amount} sats → require ${requiredConfirmations(amount)} confirmation(s)`);
}
```

Isto é ilustrativo, não uma regra que o próprio Bitcoin impõe. O protocolo não tem nenhum conceito de confirmação "necessária"; este tipo de política existe inteiramente na camada de aplicação, escolhida por quem está aceitando o pagamento com base em sua própria tolerância ao risco.

## Conceitos errôneos comuns

**"Confirmado" não é um interruptor de segurança binário que gira para algum número mágico específico.** A probabilidade de inversão é contínua e encolhe gradualmente com cada confirmação adicional (ver os números reais em [Finalidade Probabilística](../distributed-systems/probabilistic-finality.md)). Qualquer limiar de confirmação específico é um ponto de corte prático, baseado em risco escolhido por quem está aceitando o pagamento, não uma propriedade Bitcoin em si define como "o" número seguro.

**Uma transação que perde suas confirmações em um reorg não significa que seja permanentemente invalidada.** Se não entrar em conflito com nada na nova cadeia vencedora, normalmente retorna ao mempool como não confirmado e é re-incluído em um bloco futuro, veja [Reorganizações da Cadeia](../blockchain/reorgs.md).

## Outras leituras

- [Whitepaper Bitcoin, Seção 11 (Calculações)](https://bitcoin.org/bitcoin.pdf)

---

[← Anterior: A Mempool](./mempool.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Transações de base de moeda →](./coinbase-transactions.md)
