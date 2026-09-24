# Correcção de Transações

O Batching combina vários pagamentos em uma única transação on-chain, compartilhando um conjunto de despesas gerais (campos fixos, versão, tempo de bloqueio, e assim por diante) em muitos pagamentos em vez de pagar essa despesa em separado para cada. Este capítulo cobre o mecanismo e por que é desproporcionalmente valioso para remetentes de alto volume como trocas.

## Como funciona

Recordar de [Entradas e Saídas](../bitcoin/inputs-and-outputs.md#múltiplas-entradas-múltiplas-saídas) que nada restringe uma transação a uma única saída. Uma transação pode pagar muitos destinatários simultaneamente. Um processamento de negócios, por exemplo, 100 retiradas de clientes individuais poderiam transmitir 100 transações separadas (cada uma com seu próprio campo de versão, entrada(s) e sobrecarga de tempo de bloqueio) ou construir uma única transação com 100 saídas, uma por destinatário, compartilhando essa sobrecarga fixa uma vez em vez de 100 vezes.

## Exemplo: poupança de taxas, quantificada

```typescript
// Illustrative per-transaction weight estimates, not live network data.
const FIXED_OVERHEAD_WU = 42 * 4;       // version, locktime, counts (roughly, in weight units)
const PER_INPUT_WU = 68 * 4;             // one typical legacy input
const PER_OUTPUT_WU = 31 * 4;            // one typical output

function separateTransactionsWeight(count: number): number {
  return count * (FIXED_OVERHEAD_WU + PER_INPUT_WU + PER_OUTPUT_WU);
}

function batchedTransactionWeight(count: number): number {
  return FIXED_OVERHEAD_WU + PER_INPUT_WU + count * PER_OUTPUT_WU; // one shared input, many outputs
}

const recipientCount = 100;
const separate = separateTransactionsWeight(recipientCount);
const batched = batchedTransactionWeight(recipientCount);

console.log(`${recipientCount} separate transactions: ${separate} weight units`);
console.log(`1 batched transaction: ${batched} weight units`);
console.log(`Savings: ${(((separate - batched) / separate) * 100).toFixed(1)}%`);
```

Resultado verificado da execução deste código exato:

```text
100 separate transactions: 56400 weight units
1 batched transaction: 12840 weight units
Savings: 77.2%
```

As constantes de peso por campo utilizadas são aproximações ilustrativas, não derivadas de uma transação real específica, citada, substituir por valores calculados de uma transação serializada real se a precisão importa para um caso de uso específico. A escala das economias (dominada por não pagar mais a sobrecarga fixa e uma entrada separada 99 vezes extra) é o ponto real, não a porcentagem exata.

## Quem mais beneficia, e porquê

Escala de poupança do Batching com o número de pagamentos combinados, razão pela qual é desproporcionalmente valioso para remetentes de alto volume (troca de processamento de retiradas de clientes, grupos de mineração distribuindo pagamentos para muitos participantes (ver [Pools de Mineração](../bitcoin/mining-pools.md#exemplo-distribuição-de-recompensas-sob-pplns)), e serviços de folha de pagamento) em vez de para um indivíduo que envia um pagamento. Várias grandes trocas documentaram publicamente a adoção de lotes programados (colhendo pedidos de retirada ao longo de uma janela de tempo e processando-os em conjunto) especificamente para reduzir a sua pegada agregada na cadeia e taxas.

## Comércio

A poupança das taxas de batching vem ao custo de **latência**: destinatários em um lote geralmente esperar pela janela de lote para fechar (qualquer intervalo que o remetente usa, em qualquer lugar de minutos a horas, dependendo do serviço) em vez de receber uma transação de transmissão imediata. É um tradeoff direto de latência-para-custo, razoável para pagamentos de rotina, não urgentes e menos apropriado para qualquer coisa que exija resolução imediata.

## Conceitos errôneos comuns

**Bater não altera o que qualquer destinatário individual pode fazer com o seu pagamento**, cada saída em uma transação em lote é uma UTXO totalmente comum, independentemente gastável (ver [O Modelo UTXO](../bitcoin/utxo.md)); nada sobre receber fundos como parte de um lote restringe ou atrasa a capacidade do próprio destinatário de gastá-los uma vez confirmado.

**Bater não é a mesma coisa que um canal de pagamento ou sistema Layer 2**. É puramente uma técnica de eficiência on-chain, reduzindo a sobrecarga dentro de transações comuns de camada de base, não uma maneira de mover volume off-chain o caminho [Canais de pagamento](./payment-channels.md) Sim.

## Outras leituras

- Ver também: [Taxas de transação](../bitcoin/fees.md), [Entradas e Saídas](../bitcoin/inputs-and-outputs.md)

---

[← Anterior: SegWit como uma atualização de escala](./segwit.md)
·
[Voltar para Bitcoin Scaleing](./README.md)
·
[Próximo: Canais de pagamento →](./payment-channels.md)
