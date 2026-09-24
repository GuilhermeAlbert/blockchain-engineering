# O Modelo UTXO

Este capítulo responde a uma pergunta colocada diretamente na introdução deste livro: onde Bitcoins realmente "vive"? A resposta precisa é que eles não vivem em nenhum lugar no sentido de um saldo bancário. O Bitcoin não tem contas. O que existe é um conjunto de **Saídas de Transação não Gastadas (UTXOs)**, e "equilíbrio" de uma carteira é simplesmente a soma de qualquer UTXO suas chaves podem gastar, computado fresco cada vez ao invés de armazenado como um total em execução em qualquer lugar.

## O problema que este modelo resolve

Não digas: "A tua Bitcoin está guardada na tua carteira." Diz exatamente o que é verdade: **a carteira gerencia as chaves privadas e os dados de transação necessários para gastar UTXOs associados a endereços controlados por essas chaves.** Esta distinção importa porque muda o que você está realmente raciocinando quando você pensa sobre como as transações Bitcoin funcionam, como as taxas são calculadas, e porque conceitos como "pó" e "seleção de moedas" existem em tudo. Nenhum deles faz sentido sob um modelo mental de equilíbrio de contas.

## O que é realmente um UTXO

Um UTXO é uma saída específica de uma transação anterior específica que ainda não foi usada como entrada para qualquer transação posterior. Cada UTXO é identificado exclusivamente pelo par `(txid, output index)`, que transação o criou, e qual posição de saída dentro dessa transação (já que uma transação pode ter múltiplas saídas). Cada UTXO carrega: uma quantidade (em satoshis, a menor unidade, 1 BTC = 100.000.000 satoshis) e um script de bloqueio (`scriptPubKey`) que define a condição que deve ser satisfeita para gastá-la (coberto integralmente em [Bitcoin Script](./script.md)).

## Como funciona a despesa

Uma nova transação **consome** um ou mais UTXO existentes inteiramente como entradas. Não existe isso de gastar parcialmente um UTXO. Se você quiser enviar menos do que o valor total de um UTXO, a transação cria uma segunda saída enviando o valor restante de volta para um endereço que você controla. Isto é... **alteração**, e funciona exatamente como pagar com uma nota maior do que o preço de compra e receber troco de volta, não como diminuir um saldo armazenado.

```text
Before:  UTXO A (0.5 BTC) exists, owned by Alice's key

Alice wants to pay Bob 0.3 BTC.

Transaction:
  input:  UTXO A (0.5 BTC) — fully consumed, no longer unspent after this tx
  output 1: 0.3 BTC → Bob's address        (the actual payment)
  output 2: 0.1999 BTC → Alice's own address  (change, minus a 0.0001 BTC fee)

After:  UTXO A no longer exists (spent).
        Two new UTXOs exist: the 0.3 BTC output (now Bob's) and the
        0.1999 BTC change output (still Alice's).
```

Observe que a taxa não é um item de linha separado em qualquer lugar da transação. Está implícito, igual ao que sobrar depois de subtrair todas as quantidades de saída de todas as quantidades de entrada (ver [Taxas de transação](./fees.md) para exatamente como isso é calculado e porquê).

## Valor de combinação e divisão

A seção 9 do whitepaper descreve isso diretamente: porque um valor de pagamento raramente corresponde a qualquer UTXO existente exatamente, uma transação tipicamente **combina múltiplos pequenos UTXOs** em entradas para cobrir um pagamento maior, ou **divide um único UTXO maior** para uma saída de pagamento e uma saída de mudança. Às vezes ambos ao mesmo tempo. Esta é a origem de uma carteira **seleção de moedas** lógica: dado um montante de pagamento alvo e um conjunto de UTXOs disponíveis, decidindo quais UTXOs específicos para gastar como entradas, equilibrando considerações como minimizar o número de entradas (menos entradas geralmente significa uma transação menor e mais barata) contra evitar deixar muitos UTXOs pequenos e inconvenientes para gastar.

## Exemplo: calcular o saldo de uma carteira

O saldo de uma carteira não é lido de um único número armazenado em nenhum lugar. Ele é calculado digitalizando o conjunto completo de UTXOs a blockchain atualmente contém e somando cada um cujo script de bloqueio as chaves desta carteira podem satisfazer:

```typescript
interface UTXO {
  txid: string;
  outputIndex: number;
  amountSats: number;
  ownerAddress: string;
}

function walletBalance(utxos: UTXO[], myAddresses: Set<string>): number {
  return utxos
    .filter((utxo) => myAddresses.has(utxo.ownerAddress))
    .reduce((sum, utxo) => sum + utxo.amountSats, 0);
}

const utxoSet: UTXO[] = [
  { txid: "tx1", outputIndex: 0, amountSats: 50_000_000, ownerAddress: "alice-addr-1" },
  { txid: "tx2", outputIndex: 1, amountSats: 12_345_678, ownerAddress: "alice-addr-2" },
  { txid: "tx3", outputIndex: 0, amountSats: 30_000_000, ownerAddress: "bob-addr-1" },
];

const aliceAddresses = new Set(["alice-addr-1", "alice-addr-2"]);
console.log("Alice's balance (sats):", walletBalance(utxoSet, aliceAddresses));
```

Correndo isso com os dados da amostra soma os dois UTXOs correspondentes de Alice (50.000.000 + 12,345,678 = 62,345,678 satoshis, ou 0,62345678 BTC) e exclui corretamente o UTXO de Bob. Numa carteira verdadeira, `myAddresses` é derivado das chaves da própria carteira (ver [Carteiras HD](../wallets/hd-wallets.md)), e o conjunto UTXO vem de um banco de dados próprio de um nó completo ou de uma API de terceiros, mas a computação subjacente é exatamente esta: filtro e soma, recentemente, toda vez.

## Sob o capô: o conjunto UTXO

Cada nó completo mantém sua própria base de dados local do **Conjunto UTXO atual** (cada saída não gasta que existe agora, em toda a blockchain) porque isso é o que é realmente necessário para validar novas transações rapidamente (verificando se uma entrada reivindicada é genuinamente não gasta) sem re-scanear todo o blockchain histórico multi-hundred-gigabyte para cada nova transação. Este conjunto UTXO é em si um pedaço significativo de estado, atualmente numerando em dezenas de milhões de saídas individuais, e é exatamente os dados [nó em poda](./full-nodes.md#o-que-a-execução-realmente-requer) retém mesmo depois de descartar dados antigos do bloco histórico que já não necessita.

## Comércio

O modelo UTXO tem consequências reais e práticas em comparação com o modelo de conta [Ethereum utiliza](../ethereum/state.md) Em vez disso: suporta naturalmente validação paralela (transações não relacionadas gastando diferentes UTXOs não têm dependência de encomendas entre si), e oferece propriedades de privacidade um pouco melhores por padrão (não há "conta" persistente cujo histórico completo de transações está trivialmente ligado como o histórico de um endereço de modelo de conta é, embora a análise de cadeia baseada em UTXO ainda possa vincular UTXOs relacionados na prática, veja [Privacidade](../society/privacy.md)). O custo é adicionado complexidade para software de carteira (seleção de moedas, rastreamento de um número potencialmente grande de UTXOs individuais em vez de um equilíbrio) e um ajuste menos natural para lógica de contrato inteligente complexa, que é parte do porquê Ethereum escolheu o modelo de conta em vez disso (ver [Contas Ethereum](../ethereum/accounts.md)).

## Conceitos errôneos comuns

**Não há "balanço do Bitcoin" armazenado em qualquer lugar na blockchain para qualquer endereço.** O que é armazenado é o conjunto de saídas individuais não gastas; "equilíbrio" é um conceito derivado, calculado que carteiras e exploradores de bloco calculam para fins de exibição, não um campo que existe em qualquer bloco ou transação.

**Gastar "parte de" um UTXO não é possível.** Um UTXO é consumido inteiramente; qualquer valor restante deve ser explicitamente enviado de volta como um novo resultado de mudança dentro da mesma transação, ou ele é perdido como uma taxa (unnormalmente grande), um erro genuíno, documentado algum software de carteira mal projetado precoce, feito, resultando em taxa real, sobrepagamento acidental.

## Experimenta tu mesmo.

Estender o exemplo de equilíbrio acima com um `selectCoins(utxos, targetAmount)` função que escolhe um subconjunto mínimo de UTXOs cuja soma cobre um valor de pagamento alvo, e calcula a alteração resultante. Este é o núcleo do que a lógica de seleção de moedas de cada carteira Bitcoin faz.

## Outras leituras

- [Whitepaper Bitcoin, Seção 9 (Combinando e Dividindo o Valor)](https://bitcoin.org/bitcoin.pdf)
- [Bitcoin Referência do desenvolvedor principal: Transações](https://developer.bitcoin.org/reference/transactions.html)

---

[← Anterior: Transações de Bitcoin](./transactions.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Entradas e Saídas →](./inputs-and-outputs.md)
