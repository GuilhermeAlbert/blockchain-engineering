# Recibos de transação

Um recibo de transação é o que um nó produz depois de realmente executar uma transação minada. O registro definitivo do que aconteceu, ao contrário do que foi meramente solicitado. Este capítulo cobre o que um recibo realmente contém, verificado contra uma transação real, histórica.

## Exemplo: um recibo real

```typescript
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({ chain: mainnet, transport: http() });

const receipt = await client.getTransactionReceipt({
  hash: "0x631a3d545a45a0aa38f7f4f0cefdee53debae2e8b70e05b7a692071e1d78fe95",
});

console.log("status:", receipt.status);
console.log("block number:", receipt.blockNumber);
console.log("gas used:", receipt.gasUsed.toString());
console.log("effective gas price:", receipt.effectiveGasPrice.toString());
console.log("number of logs:", receipt.logs.length);
```

Resultado verificado da execução deste código exato, contra uma transação real, minada mainnet:

```text
status: success
block number: 26028030n
gas used: 149517
effective gas price: 37540063681
number of logs: 3
```

Esta transação (uma interação contratual comum e real, não uma das construções deste livro) teve sucesso, usou 149.517 gás, pagou um preço efetivo de aproximadamente 37.5 gwei por unidade, e emitiu três registros de eventos separados através de qualquer contrato chamado sua execução desencadeada.

## O que um recibo realmente contém, e por que cada campo importa

- **status**: `"success"` ou `"reverted"` (codificado como `1` ou `0` no nível do protocolo desde [Bizâncio](https://eips.ethereum.org/EIPS/eip-658), uma atualização anterior que adicionou este campo. Antes disso, os ouvintes não tinham uma forma direta e barata de distinguir o sucesso do fracasso sem re-simular separadamente a transação).
- **gasUsed**: o gás efectivamente consumido, que (por [Gás](../ethereum/gas.md#limite-de-gás-versus-gás-utilizado-versus-preço-do-gás)) pode ser inferior ao limite de gás declarado pela operação.
- **GasPrice eficaz**: o preço real pago por unidade de gás, reflectindo o cálculo de base-fee-plus-tip [Preço do gás e taxas](../ethereum/fees.md#eip-1559-taxa-de-base-mais-gorjeta) para uma transação EIP-1559.
- **logs**: todos os eventos (ver [Eventos e Registros](../contracts/events.md)) a execução da transação emitida, através de cada contrato chamá-lo acionado, não apenas a chamada de topo. Isto é o que [Indexação de eventos](./event-indexing.md) lê para reconstruir o que realmente aconteceu durante a execução de uma transação.
- **contrato Endereço**: povoado apenas para uma transação de criação de contratos, indicando o endereço do contrato recentemente utilizado (ver [Criação de Contratos](../evm/contract-creation.md)).

## Por que um aplicativo deve sempre verificar o status, não apenas esperar que um recibo exista

Um recibo existente apenas significa que a transação foi **minado**Não diz nada sobre se a execução foi realmente bem sucedida. Recordar de [Erros e Reversões](../contracts/errors.md#por-que-reverter-desfaz-tudo-precisamente): uma transação revertida ainda produz um recibo, ainda consome gás, e ainda é permanentemente registrado, mas não alcançou nenhuma de suas mudanças de estado pretendidas. Um pedido que verifica apenas "existe um recibo" em vez de "diz o recibo `status: success`" tratará silenciosamente transações falhadas como sucesso, uma classe real, documentada e facilmente evitável de bug de aplicação.

## Conceitos errôneos comuns

**Um recibo não está disponível no momento em que uma transação é transmitida**Só existe uma vez que a transação tenha realmente sido incluída em um bloco minado; consultando por um recibo imediatamente após a transmissão não retornará nada (ou um explícito "não encontrado") até que isso aconteça, que é exatamente o que [Enviando Transações](./sending-transactions.md#o-ciclo-de-vida)'s `waitForTransactionReceipt` o padrão existe para lidar corretamente.

**gasUsado no recibo não é necessariamente o que determina o custo total da transação** em isolamento. Custo total `gasUsed × effectiveGasPrice`; duas transações com idêntica `gasUsed` Pode ter pago taxas totais muito diferentes se as condições de rede (e, por conseguinte, a taxa de base) diferirem no momento em que cada uma foi extraída.

## Outras leituras

- [EIP-658: Código de estado da transação incorporada nos recibos](https://eips.ethereum.org/EIPS/eip-658)
- [documentação do viem: getTransactionReceipt](https://viem.sh/docs/actions/public/getTransactionReceipt)

---

[← Anterior: Dados digitados e EIP-712](./eip-712.md)
·
[Voltar para Construindo Aplicações Web3](./README.md)
·
[Próximo: Índice de eventos →](./event-indexing.md)
