# Taxas de transação

Uma taxa de transação do Bitcoin é o que sobra quando você subtrai o valor total de saída do valor total de entrada. Este capítulo cobre como as taxas são realmente calculadas, por que eles são preços por unidade de dados em vez de como um valor fixo, e como o mercado de taxas funciona como um leilão para espaço de bloco escasso.

## Taxas implícitas, não um campo indicado

Como mostrado em [O Modelo UTXO](./utxo.md#exemplo-calcular-o-saldo-de-uma-carteira), uma transação Bitcoin não tem campo "fee" explícito. A taxa é calculada como `(sum of input amounts) − (sum of output amounts)`Um minerador que monta um bloco coleta esta diferença para cada transação incluída, razão pela qual uma transação que acidentalmente envia mais valor do que reivindica em saídas (um erro genuíno, historicamente documentado em algum software de carteira) efetivamente paga uma taxa anormalmente grande em vez da diferença indo para qualquer outro lugar.

## Por que as taxas são preço por byte (ou por unidade de peso), não plana

O espaço do bloco é escasso. Um bloco tem um tamanho máximo (mais precisamente, um máximo **peso**, ver abaixo), então apenas uma quantidade limitada de dados de transação se encaixa em cada bloco de aproximadamente 10 minutos. Uma transação maior e mais complexa (mais entradas, mais saídas, maiores scripts de desbloqueio) consome mais desse espaço escasso do que um espaço pequeno e simples, então as taxas são pagas por byte (histórico) ou por unidade de peso (pós-SegWit) em vez de como um valor fixo por transação, uma transação que paga a mesma taxa total, mas usando menos espaço é mais atraente para um minerador que monta um bloco, porque deixa mais espaço para transações adicionais de pagamento de taxa.

## Tamanho e peso da transação

Pré-SegWit, "tamanho" simplesmente significava a contagem total de bytes serializados da transação. SegWit (ver [SegWit](./segwit.md)) introduzido **peso**, que conta com dados das testemunhas (assinaturas) a um quarto do peso dos dados das testemunhas:

```text
weight = (non-witness bytes × 4) + (witness bytes × 1)
vsize (virtual size, used for fee-rate calculations) = weight / 4
```

Esta fórmula dá aos dados das testemunhas um desconto efetivo de 75% em relação aos dados das não testemunhas, refletido na taxa que uma transação precisa pagar, um incentivo deliberado para que as carteiras adotem o SegWit, uma vez que as transações do SegWit se tornaram consideravelmente mais baratas para enviar para conteúdo econômico equivalente, sem necessidade de alterar o limite de 4 milhões de unidades de peso subjacente (aproximadamente equivalente a um máximo de 4 MB em um hipotético all-witness-data, ou mais próximo de 1-2 MB de dados típicos de transações mistas na prática).

## O mercado de taxas: um leilão para espaço em bloco

Porque os mineradores são economicamente racionais (ver [Economia da mineração](./mining.md#economia-mineira)) e querem maximizar as taxas coletadas de quaisquer transações que incluam, geralmente priorizam transações que ofereçam a taxa mais alta (satoshis por byte virtual), não a taxa absoluta mais alta. Quando muitas transações competem por espaço de bloco limitado (durante períodos de alta demanda de rede) as taxas de taxa aumentam, já que usuários dispostos a pagar mais são priorizados antes daqueles que não estão dispostos a fazê-lo. Esta dinâmica está totalmente coberta, com as suas implicações a longo prazo para o orçamento de segurança do Bitcoin, [Mercado de Taxas](./fee-market.md).

## Exemplo: estimar uma taxa

```typescript
// Roughly typical sizes for illustration; real transactions vary.
const NON_WITNESS_BYTES = 110; // version, input/output structure, locktime, etc.
const WITNESS_BYTES = 107;     // a single signature + pubkey witness

function vsize(nonWitnessBytes: number, witnessBytes: number): number {
  const weight = nonWitnessBytes * 4 + witnessBytes * 1;
  return Math.ceil(weight / 4);
}

const txVsize = vsize(NON_WITNESS_BYTES, WITNESS_BYTES);
const feeRateSatsPerVbyte = 20; // an illustrative, not live, fee rate
console.log("Estimated vsize:", txVsize, "vbytes");
console.log("Estimated fee:", txVsize * feeRateSatsPerVbyte, "satoshis");
```

A `feeRateSatsPerVbyte` O valor é ilustrativo, não uma recomendação. Uma carteira conectada ao Bitcoin Core pode chamar [`estimatesmartfee`](https://developer.bitcoin.org/reference/rpc/estimatesmartfee.html) com um número alvo de blocos, em seguida, decidir quanta urgência e incerteza de estimativa o usuário aceita.

## Substituir por Fee (RBF)

Uma transação não confirmada no mempool com taxa de taxa muito baixa para ser priorizada pode, se ele explicitamente sinaliza suporte para **Substituir por Fee** (BIP 125, feito definindo o seu número de sequência abaixo de um limite específico), ser substituído por uma nova transação gastando os mesmos insumos com uma taxa mais elevada, permitindo que o remetente efetivamente oferecer a taxa acima após o fato em vez de esperar indefinidamente ou criar uma tentativa de gasto duplo conflitante. Esta situação é ainda mais [O Mempool](./mempool.md#substituir-por-fee).

## Conceitos errôneos comuns

**Uma taxa mais elevada não compra um tempo de bloqueio mais rápido.** Ele compra mais alto *prioridade* para inclusão em qualquer bloco que seja encontrado em seguida, se a rede não encontrar blocos por 40 minutos devido à variância aleatória ordinária (ver [Tempo de bloco](../blockchain/block-time.md)), mesmo uma transação de taxa muito alta ainda espera tanto tempo; taxas afetam a ordenação entre as transações concorrentes, não a taxa de descoberta de bloco subjacente da rede.

**Taxas não são pagas para "Bitcoin" ou para qualquer tesouro protocolo.** Eles são pagos inteiramente a qualquer minerador com sucesso minar o bloco, incluindo essa transação, como parte da recompensa da base de moedas desse bloco, veja [Transações de base de moeda](./coinbase-transactions.md).

## Outras leituras

- [BIP 125: Sinalização Opt-in substituta completa](https://github.com/bitcoin/bips/blob/master/bip-0125.mediawiki)
- [BIP 141: Testemunha Segregada (calculamento de peso)](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki)

---

[← Anterior: Entradas e saídas](./inputs-and-outputs.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: A Mempool →](./mempool.md)
