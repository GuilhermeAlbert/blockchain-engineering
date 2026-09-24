# Entradas e Saídas

[Transações de Bitcoin](./transactions.md) introdução de entradas e saídas em um nível estrutural; este capítulo vai para cada campo precisamente, porque os detalhes aqui (que exatamente uma referência de entrada, o que exatamente uma saída especifica, e a diferença específica entre um script de bloqueio e dados de desbloqueio) são onde uma grande parte da confusão em torno de "como eu realmente construir uma transação" vem.

## Saídas: a metade mais simples

Um resultado especifica duas coisas: **montante** (em satoshis) e **programa de bloqueio** (`scriptPubKey`), que define a condição que alguém deve satisfazer para gastá-lo mais tarde. Apesar do nome "script de bloqueio", é melhor entendido como um pequeno programa auto-suficiente: quando alguém mais tarde tenta gastar esta saída, a rede executa este script (combinado com os dados de desbloqueio fornecidos pelo gastador) e verifica se ele avalia se é verdadeiro. Os formulários de script de bloqueio mais comuns ([P2PKH](./p2pkh.md), [P2SH](./p2sh.md), e o SegWit /[Taproot](./taproot.md) Este capítulo trata o conceito em geral.

Uma saída, uma vez criada, é imutável e existe exatamente como criada até ser gasta. Não há como modificar a quantidade de uma saída ou o script de bloqueio após a transação que a contém ser confirmada.

## Entradas: referência e desbloqueamento

Uma entrada faz três coisas: identifica **que saída anterior** está sendo gasto (pelo par `(previousTxId, outputIndex)`, ver [O Modelo UTXO](./utxo.md)), prevê **dados de desbloqueio** provando o direito de gastar essa saída (uma assinatura, para os tipos de script mais comuns, veja [ScriptPubKey e ScriptSig](./scripts.md)), e especifica a **número de sequência**, um campo com um histórico complicado (originalmente destinado por Satoshi para um mecanismo de substituição de transações que nunca foi totalmente implementado como projetado, mais tarde reaproveitado para [BIP 68's](https://github.com/bitcoin/bips/blob/master/bip-0068.mediawiki) travas de tempo relativas, ver [Calendário](./script.md#calendário)).

## "Desbloquear script" versus "desbloquear dados": uma nota de terminologia

Para os tipos de transação pré-SegWit, os dados de desbloqueio são um script (`scriptSig`), uma pequena sequência de operações (tipicamente apenas empurrando uma assinatura e chave pública para a pilha) que é executado imediatamente antes do script de bloqueio da saída, deixando seus resultados na mesma pilha para o script de bloqueio para verificar. Para SegWit e Taproot gastam, os dados equivalentes (o **testemunha**) é armazenado em uma parte separada da transação em vez de em linha no tradicional `scriptSig` Campo. Uma mudança estrutural totalmente coberta [SegWit](./segwit.md), mas funcionalmente servindo o mesmo propósito: provar o direito de gastar.

## Exemplo: conectar entradas às saídas que referenciam

```typescript
interface Output {
  amountSats: number;
  lockingScript: string; // simplified representation
}

interface Input {
  previousTxId: string;
  previousOutputIndex: number;
  unlockingData: string; // simplified representation
}

interface Transaction {
  txid: string;
  inputs: Input[];
  outputs: Output[];
}

// A miniature two-transaction chain: tx1 creates an output, tx2 spends it.
const tx1: Transaction = {
  txid: "tx1",
  inputs: [], // (a real tx1 would have its own inputs; omitted here for focus)
  outputs: [{ amountSats: 100_000_000, lockingScript: "OP_DUP OP_HASH160 <alice-pubkey-hash> OP_EQUALVERIFY OP_CHECKSIG" }],
};

const tx2: Transaction = {
  txid: "tx2",
  inputs: [
    {
      previousTxId: "tx1",
      previousOutputIndex: 0,
      unlockingData: "<alice-signature> <alice-pubkey>",
    },
  ],
  outputs: [{ amountSats: 99_900_000, lockingScript: "OP_DUP OP_HASH160 <bob-pubkey-hash> OP_EQUALVERIFY OP_CHECKSIG" }],
};

// Validation, conceptually: does tx2's input correctly reference tx1's
// output, and does its unlocking data satisfy that output's locking script?
function referencesOutput(input: Input, sourceTx: Transaction): Output | undefined {
  if (input.previousTxId !== sourceTx.txid) return undefined;
  return sourceTx.outputs[input.previousOutputIndex];
}

const referenced = referencesOutput(tx2.inputs[0], tx1);
console.log("tx2's input references an output worth:", referenced?.amountSats, "satoshis");
console.log("Implicit fee:", (referenced?.amountSats ?? 0) - tx2.outputs[0].amountSats, "satoshis");
```

A [Bitcoin Script](./script.md) capítulo abrange exatamente como o par bloqueio-script/desbloqueamento-dados `OP_DUP OP_HASH160 ... OP_CHECKSIG` realmente executa passo a passo; este exemplo trata-os como strings opacas para isolar o próprio mecânico de referência de entrada/saída.

## Múltiplas entradas, múltiplas saídas

Nada restringe uma transação a uma entrada ou uma saída. Uma única transação pode gastar muitos UTXOs (combinando várias quantidades menores para cobrir um pagamento maior) e criar muitas saídas (pagando vários destinatários, além de mudança, em uma transação, um padrão chamado **transação em lote**, comumente usado pelas trocas processando muitas retiradas de clientes ao mesmo tempo para economizar em taxas de transação cumulativas em comparação com o envio de cada pagamento separadamente).

## Conceitos errôneos comuns

**Uma entrada não contém um campo de quantidade próprio.** O montante a ser gasto é implicitamente *saída referenciada* especificado. Uma entrada só precisa identificar qual saída está gastando e provar o direito de gastá-la; o montante é procurado a partir dessa saída referenciada, não reestabelecida.

**Uma transação com múltiplas saídas não significa que o remetente esteja pagando várias partes de "contas" separadas.** Todas as saídas de uma única transação são financiadas coletivamente pelos insumos dessa mesma transação. Não há nenhuma atribuição por saída de volta a uma entrada específica.

## Outras leituras

- [Bitcoin Referência do desenvolvedor principal: Transações](https://developer.bitcoin.org/reference/transactions.html)

---

[← Anterior: O Modelo UTXO](./utxo.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Taxas de transação →](./fees.md)
