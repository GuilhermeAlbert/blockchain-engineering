# Enviando Transações

Este capítulo cobre o ciclo de vida completo de uma transação a partir da perspectiva de uma aplicação (construção, assinatura, transmissão e espera pela confirmação) e os pontos específicos ao longo desse ciclo de vida onde as coisas podem dar errado de maneiras que uma aplicação precisa para lidar deliberadamente, não apenas esperança não acontece.

## O ciclo de vida

```typescript
// 1. Build and send — the wallet signs behind the scenes, per Connecting Wallets.
const hash = await walletClient.sendTransaction({
  to: recipientAddress,
  value: parseEther("0.1"),
});

console.log("transaction broadcast, hash:", hash);

// 2. Wait for confirmation — blocks until the transaction is mined
//    (or, optionally, until a specified number of confirmations pass).
const receipt = await client.waitForTransactionReceipt({ hash, confirmations: 2 });

console.log("confirmed in block:", receipt.blockNumber);
console.log("status:", receipt.status); // "success" or "reverted"
```

`waitForTransactionReceipt` pesquisas (ou assina, dependendo do transporte) até que o hash de transação apareça em um bloco minado, por [Recibos de transação](./receipts.md), coberto no próximo capítulo.

## Por que "divulgar" e "confirmar" são momentos significativamente diferentes

Recordar o padrão geral de [O Mempool](../bitcoin/mempool.md) e [Confirmação da transação](../bitcoin/confirmation.md): uma transação de transmissão permanece não confirmada até que um bloco inclui-lo, e (assim como em Bitcoin) um pequeno número de confirmações ainda carrega um risco real, se geralmente baixo, de um [reorganização da cadeia](../blockchain/reorgs.md) Invertendo-o. A prova de Ethereum [Finalidade](../ethereum/finality.md) fornece uma garantia mais forte e mais rápida do que o modelo puramente probabilístico de Bitcoin (finalização dentro de aproximadamente duas épocas, ~12.8 minutos), mas o mesmo princípio subjacente se aplica: um aplicativo que lida com valor significativo geralmente deve esperar por mais do que uma única confirmação, e idealmente por finalidade real, antes de tratar os efeitos de uma transação como irreversíveis.

## Falha no tratamento: revertida versus nunca-minada

Uma transação pode falhar de duas formas estruturalmente diferentes que uma aplicação precisa distinguir:

- **Revertido em cadeia**: a transação foi minada, gás consumido, mas sua execução revertida (`receipt.status === "reverted"`). A transação realmente aconteceu e é permanentemente registrada, mas não conseguiu nada além de consumir o gás do remetente, por [Erros e Reversões](../contracts/errors.md).
- **Nunca minado**: a transação está presa no mempool (taxa muito baixa, veja [Preço do gás e taxas](../ethereum/fees.md)) ou foi completamente descartado, nenhum gás consumido ainda, mas nenhum resultado, até que seja substituído, acelerado, ou eventualmente caído por políticas de mempool de nós (echoing [O Mempool](../bitcoin/mempool.md#despejo-e-limites-de-mempool)'s discussão do comportamento análogo de Bitcoin).

A lógica de rastreamento de transações de uma aplicação precisa lidar explicitamente com ambos os casos. Assumindo que "sem recibo ainda" significa sempre "ainda pendente, eventualmente confirmará" é uma fonte real, documentada de aplicativos silenciosamente pendurado em transações que, na verdade, nunca confirmará.

## Acelerar ou cancelar uma transação emperrada

Porque as transações no Ethereum incluem um nonce (ver [EOAs](../ethereum/eoa.md#o-nonce-e-porque-importa-mais-do-que-poderia-parecer-primeiro)), uma transação emperrada pode ser substituída por uma **novo** transação com o mesmo nonce, mas um preço de gás mais elevado, quer a mesma acção pretendida (uma "velocidade acima") ou uma transação no-op para auto (uma "cancel"), exatamente o mesmo princípio de substituição baseado no nonce por trás Bitcoin [Substituir por Fee](../bitcoin/mempool.md#substituir-por-fee), aplicado à própria mempool de Ethereum e mecânica de taxas em vez disso.

## Conceitos errôneos comuns

**Um hash de transação existente não significa que a transação seja confirmada ou mesmo garantida para ser explorada**. O hash é computado e conhecido no momento em que uma transação é assinada, antes mesmo de ser transmitida, muito menos incluída em um bloco; tratar "eu tenho um hash" como equivalente a "isso aconteceu" é um bug de aplicação real, evitável.

**`waitForTransactionReceipt` bloquear (ou uma promessa ainda não resolvida) não significa necessariamente que algo esteja errado**, atraso normal de confirmação, e especialmente à espera de múltiplas confirmações por segurança, são esperados, não excepcional, e uma IU de aplicação deve refletir este estado pendente claramente em vez de tratá-lo como uma condição de erro.

## Outras leituras

- [documentação do viem: sendTransaction](https://viem.sh/docs/actions/wallet/sendTransaction)
- [documentação do viem: waitForTransactionReceipt](https://viem.sh/docs/actions/public/waitForTransactionReceipt)

---

[← Anterior: Contratos de chamada](./calling-contracts.md)
·
[Voltar para Construindo Aplicações Web3](./README.md)
·
[Próximo: Mensagens de assinatura →](./signing-messages.md)
