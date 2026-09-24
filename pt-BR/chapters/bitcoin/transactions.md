# Transações de Bitcoin

Uma transação Bitcoin é uma mensagem assinada que destrói moedas existentes (tecnicamente, saídas não gastas) e cria novas. Esta é uma descrição precisa, mecânica que vale a pena internalizar cedo, porque é fácil de deslizar inconscientemente para o modelo mental mais familiar, mas errado, de uma transferência bancária decrementando uma conta e incrementando outra. O Bitcoin não rastreia os saldos da conta. O presente capítulo abrange diretamente a estrutura de operações; [O Modelo UTXO](./utxo.md) abrange o modelo contabilístico que esta estrutura implementa, e [Entradas e Saídas](./inputs-and-outputs.md) vai mais fundo na mecânica de entrada/saída especificamente.

## A estrutura do núcleo

Cada transação do Bitcoin consiste em:

- **Um número de versão**
- **Uma lista de entradas**, cada referência à saída de uma transação anterior específica (por ID de transação e índice de saída) que esta transação está gastando, além de um script de desbloqueio (ou dados de testemunha, para transações SegWit, consulte [SegWit](./segwit.md)) provando o direito de o gastar
- **Uma lista de saídas**, especificando um montante e um script de bloqueio definindo a condição sob a qual esse montante pode ser gasto no futuro
- **Um período de bloqueio**, um campo opcional que restringe o tempo mais antigo ou altura do bloco em que a transação se torna válida para inclusão

```text
Transaction
├── version
├── inputs[]
│   ├── previous transaction ID  ─┐
│   ├── previous output index     ├─ together, these identify exactly
│   ├── unlocking script/witness  │  which UTXO is being spent, and
│   └── sequence number          ─┘  prove the right to spend it
├── outputs[]
│   ├── amount (in satoshis)
│   └── locking script  ─── defines who can spend this output next
└── locktime
```

## O ID da transação (txid)

O ID de uma transação é o hash SHA-256d de seu conteúdo serializado (para campos não-SegWit. As transações do SegWit calculam o txid sobre um subconjunto específico de campos que exclui dados de testemunhas, discutidos em [SegWit](./segwit.md#txid-e-wtxid)). Este é um valor **derivado de** o conteúdo da transação, não um campo armazenado dentro dela. Assim como o hash de um bloco é derivado de seu cabeçalho (ver [Hashes e Block Linking](../blockchain/block-linking.md)), o ID de uma transação é derivado da mesma forma, que é por isso que alterar qualquer coisa em uma transação (mesmo de uma forma que não mude seu significado econômico) produz um txid completamente diferente.

## Exemplo: construir e ter uma transação simplificada

A serialização de transação real do Bitcoin tem regras de codificação binária específicas (inteiros de comprimento variável, ordem de byte little-endian, e (para transações SegWit) um par de bytes marcador/flag e dados de testemunha separados). O exemplo abaixo implementa o núcleo, formato de serialização não-SegWit diretamente, para mostrar o mecanismo real em vez de tratá-lo como uma caixa preta:

```typescript
import { createHash } from "node:crypto";

function sha256d(buf: Buffer): Buffer {
  const once = createHash("sha256").update(buf).digest();
  return createHash("sha256").update(once).digest();
}

// Bitcoin's variable-length integer encoding, for lengths and counts.
function varint(n: number): Buffer {
  if (n < 0xfd) return Buffer.from([n]);
  const buf = Buffer.alloc(3);
  buf.writeUInt8(0xfd, 0);
  buf.writeUInt16LE(n, 1);
  return buf;
}

interface SimpleInput {
  previousTxId: string; // hex, big-endian as usually displayed
  previousOutputIndex: number;
  scriptSig: Buffer;
  sequence: number;
}

interface SimpleOutput {
  amountSats: bigint;
  scriptPubKey: Buffer;
}

function serializeTransaction(inputs: SimpleInput[], outputs: SimpleOutput[], locktime: number): Buffer {
  const parts: Buffer[] = [];

  const version = Buffer.alloc(4);
  version.writeInt32LE(1);
  parts.push(version);

  parts.push(varint(inputs.length));
  for (const input of inputs) {
    parts.push(Buffer.from(input.previousTxId, "hex").reverse()); // stored little-endian
    const outIndex = Buffer.alloc(4);
    outIndex.writeUInt32LE(input.previousOutputIndex);
    parts.push(outIndex);
    parts.push(varint(input.scriptSig.length));
    parts.push(input.scriptSig);
    const sequence = Buffer.alloc(4);
    sequence.writeUInt32LE(input.sequence);
    parts.push(sequence);
  }

  parts.push(varint(outputs.length));
  for (const output of outputs) {
    const amount = Buffer.alloc(8);
    amount.writeBigInt64LE(output.amountSats);
    parts.push(amount);
    parts.push(varint(output.scriptPubKey.length));
    parts.push(output.scriptPubKey);
  }

  const locktimeBuf = Buffer.alloc(4);
  locktimeBuf.writeUInt32LE(locktime);
  parts.push(locktimeBuf);

  return Buffer.concat(parts);
}

const tx = serializeTransaction(
  [
    {
      previousTxId: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      previousOutputIndex: 0,
      scriptSig: Buffer.from([]), // left empty here — a real scriptSig contains a signature and public key
      sequence: 0xffffffff,
    },
  ],
  [{ amountSats: 5000000000n, scriptPubKey: Buffer.from([]) }], // 50 BTC, matching the genesis-era reward for illustration
  0,
);

const txid = sha256d(tx).reverse().toString("hex"); // txids are conventionally displayed byte-reversed
console.log("Serialized size:", tx.length, "bytes");
console.log("txid:", txid);
```

Resultado verificado da execução deste código exato:

```text
Serialized size: 60 bytes
txid: f7b0f6d21b485cdfdf801c4bfffc2a5c2d30baf4aaf94284aeb9be5be96e0c0f
```

Uma transação real `scriptSig` e `scriptPubKey` Não estão vazios, claro. Este exemplo deixa-os vazios especificamente para isolar e demonstrar a serialização e hashing mecânica sem também precisar [Bitcoin Script](./script.md), que os próximos capítulos se constroem até.

## Tamanho e peso da transação

Antes do SegWit, o "tamanho" da transação significava simplesmente sua contagem de bytes serializados, e as taxas eram (e ainda podem ser) preço por byte. SegWit introduzido **unidades de peso** para dar dados de testemunhas (assinaturas, em grande parte) um desconto em relação aos dados de não testemunhas, porque os dados de testemunhas não precisa ser processado pelo software mais antigo, pré-SegWit e foi julgado para justificar tratamento diferente na contabilidade do limite de tamanho do bloco, coberto totalmente, com a fórmula de peso real, em [SegWit](./segwit.md) e [Taxas de transação](./fees.md#tamanho-e-peso-da-transação).

## Confirmação

Uma transação é **não confirmado** enquanto se senta em nós' [mempools](./mempool.md), esperando para ser incluído em um bloco. Uma vez extraído em um bloco, ele tem 1 confirmação, e que a contagem cresce por um com cada bloco subsequente, veja [Confirmação da transação](./confirmation.md) para o que diferentes profundidades de confirmação realmente significam em termos de risco de reversão, quantificados em [Finalidade Probabilística](../distributed-systems/probabilistic-finality.md).

## A transação de base de moedas: a única excepção

A primeira transação de cada bloco é uma **transação de base de moeda**, que não tem entradas reais (ele faz referência a uma transação anterior nula e carrega dados arbitrários em vez de um script de desbloqueio) e cria novas moedas do nada, de acordo com o protocolo [calendário de emissão](./issuance.md), totalmente coberta [Transações de base de moeda](./coinbase-transactions.md).

## Conceitos errôneos comuns

**Uma transação Bitcoin não diz diretamente "Alice envia Bob X bitcoin."** Ele diz "o partido que pode satisfazer essas condições específicas de desbloqueio é gastar essas saídas anteriores específicas, e criar essas novas saídas com essas novas condições de gasto específicas." Frame-lo em termos de equilíbrios é uma simplificação útil para conversa casual, mas obscurece a mecânica UTXO que capítulos posteriores (particularmente [O Modelo UTXO](./utxo.md)) dependem da compreensão precisa.

**Um txid não é atribuído ou escolhido por ninguém**. É uma consequência matemática direta do conteúdo de uma transação, razão pela qual ela não pode ser prevista antes da transação ser totalmente construída, e por que alterar até mesmo uma assinatura (ver [Maleabilidade da Transação](../cryptography/digital-signatures.md#maleabilidade-uma-sutileza-que-vale-a-pena-nomear-aqui)) altera-a.

## Outras leituras

- [Bitcoin Referência do desenvolvedor principal: Transações](https://developer.bitcoin.org/reference/transactions.html)
- [Whitepaper Bitcoin, Seção 2 e Seção 9](https://bitcoin.org/bitcoin.pdf)

---

[← Anterior: Núcleo do Bitcoin](./bitcoin-core.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: O Modelo UTXO →](./utxo.md)
