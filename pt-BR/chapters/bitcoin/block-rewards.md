# Bloquear recompensas

Uma recompensa de bloco (mais precisamente, o bloco **subvenção**) é o recém-criado bitcoin que um minerador recebe para mineração com sucesso um bloco, separado e além de quaisquer taxas de transação que o bloco inclui transações pagar. Este capítulo abrange exatamente a forma como a subvenção é definida e aplicada, estabelecendo [O halving](./halving.md) e [21 milhões de BTC](./21-million.md).

## Subvenção versus recompensa total

Vale a pena ser preciso sobre terminologia que este livro usa consistentemente: **subvenção** é o bitcoin recém-emitido, definido inteiramente por regra de protocolo e atualmente, a partir de escrita, 3.125 BTC por bloco (após a quarta metade, abril 2024, ver [O halving](./halving.md) para o calendário completo). A **recompensa total do bloco** um minerador realmente recebe é o subsídio **mais** a soma de todas as taxas de transação incluídas (ver [Taxas de transação](./fees.md)). Estes dois componentes têm trajetórias de longo prazo muito diferentes: o subsídio encolhe por design ao longo do tempo, enquanto as taxas dependem da demanda de rede para o espaço de bloco, uma relação central para [Mercado de Taxas](./fee-market.md) e [Orçamento de Segurança a Longo Prazo](./security-budget.md).

## Como aplicar a subvenção

O montante da subvenção é **regra do consenso**, não uma sugestão: uma transação de base de moeda que reivindica uma subvenção superior ao montante definido pelo protocolo para a altura desse bloco torna o bloco inteiro inválido, rejeitado por cada nó completo, independentemente da prova de trabalho (ver [Transações de base de moeda](./coinbase-transactions.md#qual-é-o-valor-da-recompensa-e-como-é-verificado)). Isso é aplicado de forma idêntica e automática pela validação independente de cada nó. Não há autoridade central que rastreie ou aprove pagamentos de mineradores; a regra é simplesmente parte do que cada nó verifica sobre cada bloco que recebe.

## Exemplo: fórmula de subvenção

```typescript
function blockSubsidySats(blockHeight: number): number {
  const halvingInterval = 210_000;
  const initialSubsidySats = 50 * 100_000_000; // 50 BTC in satoshis
  const halvings = Math.floor(blockHeight / halvingInterval);
  if (halvings >= 64) return 0; // subsidy rounds to zero after 64 halvings
  return Math.floor(initialSubsidySats / Math.pow(2, halvings));
}

for (const height of [0, 209_999, 210_000, 630_000, 840_000, 1_050_000]) {
  console.log(`Block ${height}: subsidy = ${blockSubsidySats(height) / 100_000_000} BTC`);
}
```

Resultado verificado da execução deste código exato, cruzado com o histórico do Bitcoin documentado:

```text
Block 0: subsidy = 50 BTC
Block 209999: subsidy = 50 BTC
Block 210000: subsidy = 25 BTC       (first halving, November 2012)
Block 630000: subsidy = 6.25 BTC     (third halving, May 2020)
Block 840000: subsidy = 3.125 BTC    (fourth halving, April 2024)
Block 1050000: subsidy = 1.5625 BTC  (fifth halving, projected ~2028)
```

## Por que a recompensa vai apenas para o minerador do bloco, não distribuído de forma diferente

A subvenção existe especificamente como o **mecanismo de distribuição inicial e incentivo à mineração** descrito na Seção 6 do whitepaper: pagar toda a recompensa a quem produz com sucesso um bloco válido dá a cada participante um incentivo financeiro direto, individual para contribuir com trabalho computacional honesto para a rede, sem necessidade de qualquer autoridade central decidir quem merece uma recompensa ou quanto. É também por isso que existem pools mineiras (ver [Pools de Mineração](./mining-pools.md)), a chance de um minerador individual encontrar pessoalmente um bloco e coletar toda a recompensa pode ser muito baixa em relação à sua quota de poder de hash total, de modo que pools redistribuem recompensas proporcionalmente entre muitos participantes para reduzir essa variância, discutida lá em profundidade.

## Conceitos errôneos comuns

**A recompensa do bloco não é paga "por" a rede Bitcoin como uma organização, de qualquer tesouro ou reserva.** É recém-criado bitcoin, definido e aplicado inteiramente pela regra de protocolo. Não há nenhum pool de fundos pré-existentes uma recompensa é extraída; o fornecimento total em si aumenta exatamente o montante do subsídio cada vez que um bloco é minado.

**As taxas de transação não fazem parte da "subvenção", mesmo que ambas sejam comumente agrupadas informalmente como "a recompensa do bloco".** Este livro usa "subvenção" especificamente para a porção recém-emitida e "recompensa total" para subsídio mais taxas combinadas, uma distinção que importa cada vez mais como o subsídio continua a diminuir para zero, ver [Orçamento de Segurança a Longo Prazo](./security-budget.md).

## Outras leituras

- [Whitepaper Bitcoin, Seção 6 (Incentivo)](https://bitcoin.org/bitcoin.pdf)
- [Bitcoin Referência do desenvolvedor principal: Cadeia de blocos](https://developer.bitcoin.org/reference/block_chain.html)

---

[← Anterior: Nonce](./nonce.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: O halving →](./halving.md)
