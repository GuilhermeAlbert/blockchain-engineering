# Transações de base de moeda

A primeira transação de cada bloco é especial: cria um novo bitcoin do nada e paga a quem extraiu o bloco. Este capítulo cobre exatamente como uma transação de base de moeda difere estruturalmente de uma transação comum, e os detalhes técnicos específicos (o campo extranonce, os dados incorporados) que lhe dão funções além do pagamento de recompensa simples.

## O que o torna diferente

A referência de entradas reais de uma transação comum, previamente criada UTXOs. Uma transação de base de moedas refere- se a **resultado anterior nulo** (um hash de transação anterior de todos os zeros e um índice de saída de `0xffffffff`) como não há nada sendo gasto; o valor é criado diretamente pela regra do protocolo, não transferido de uma saída existente. No lugar de um script de desbloqueio normal, o campo do script da coinbase contém **dados arbitrários**, até um limite de tamanho (100 bytes, por regras de consenso), que o minerador pode definir para o que quiser.

```text
Ordinary transaction input:              Coinbase transaction input:
  previousTxId: <real tx hash>              previousTxId: 0000...0000 (null)
  previousOutputIndex: <real index>          previousOutputIndex: 0xffffffff
  scriptSig: <signature + pubkey>            coinbase data: <arbitrary, up to 100 bytes>
```

## Qual é o valor da recompensa, e como é verificado

A(s) saída(ões) da transação de base de moeda(s) pode(m) total(ais) até à corrente **Subvenção por categoria** (a recompensa recentemente emitida, por [escalonamento da metade](./halving.md)) **mais a soma de todas as taxas de transação incluídas**, mas não mais. Esta é uma regra de consenso cada verificação completa de nó: uma transação de base de moeda que reivindica mais do que `subsidy + total fees` torna o bloco inteiro inválido, rejeitado por cada nó honesto, independentemente da prova de trabalho do bloco. Um minerador é livre de reclamar *menos* mas nunca mais.

## Utilização comum do campo de dados incorporado

Além do exemplo historicamente significativo no [bloqueio de gênese](../origins/genesis-block.md#a-mensagem-incorporada), o campo de dados da base de moedas serve para fins práticos em curso:

- **Extranonce**: tal como [Cabeçalhos de Blocos](../blockchain/block-headers.md#o-problema-do-nonce-e-extranonce), os mineradores variam os dados neste campo para estender o seu espaço de pesquisa eficaz de prova de trabalho para além do campo de 4-bytes do cabeçalho.
- **BIP 34 altura do bloco**: uma vez que o BIP 34 (activado em 2013), os dados de base de moeda devem incluir a altura do bloco como seu primeiro elemento, uma regra de consenso especificamente adicionada para garantir que cada transação de base de moeda (e, portanto, cada bloco) produza um hash de transação único, fechando uma vulnerabilidade sutil onde dois blocos diferentes em alturas diferentes poderiam, teoricamente, produzir transações de base de moeda idênticas.
- **Assinaturas/marcas de pool de mineração**: muitos pools de mineração incorporam uma cadeia de identificação curta neste campo, que é como a atribuição pública bloco-a-bloco de pools de mineração (visível em exploradores de blocos) é realmente determinada, não a partir de qualquer registro formal, mas de pools voluntariamente etiquetando seus próprios blocos.
- **Sinalização do minerador**: historicamente utilizado para sinalização de prontidão para atualizações de protocolo propostas (ver [Sinalização Miner](../forks/miner-signaling.md) e [BIP 9](../forks/README.md)).

## Regra de maturidade

Os resultados da base de moedas não podem ser gastos até **100 blocos** foram extraídos em cima do bloco contendo-os, uma regra de consenso (distinto dos julgamentos de risco de confirmação-contagem ordinários abrangidos em [Confirmação da transação](./confirmation.md)) especificamente protegendo contra um cenário onde um minerador gasta moedas recentemente cunhadas imediatamente, apenas para o bloco que as criou mais tarde ficar órfão em um reorg (ver [Reorganizações da Cadeia](../blockchain/reorgs.md)), o que faria com que as moedas gastas nunca tivessem existido. Esperar 100 blocos torna este cenário astronomicamente improvável, dada a profundidade histórica real do Bitcoin, pela mesma matemática coberta em [Finalidade Probabilística](../distributed-systems/probabilistic-finality.md).

## Conceitos errôneos comuns

**Uma transação de base de moeda não tem o nome da empresa Coinbase**, a terminologia (da "base de moedas", a transação que estabelece a base/origem de novas moedas) antecede a empresa, que tomou seu nome do termo Bitcoin pré-existente, e não o contrário.

**O campo de dados da base de moedas incorporado não é forma livre para qualquer fim**. É limitado a 100 bytes, e desde BIP 34, seus primeiros bytes devem codificar corretamente a altura do bloco, o que significa que ele não é totalmente arbitrário, mesmo que uma parte significativa dele permanece disponível para os mineradores para usar como eles escolherem.

## Outras leituras

- [BIP 34: Bloco v2, Altura na base de moedas](https://github.com/bitcoin/bips/blob/master/bip-0034.mediawiki)
- [Bitcoin Referência do desenvolvedor principal: Transações](https://developer.bitcoin.org/reference/transactions.html)

---

[← Anterior: Confirmação de Transação](./confirmation.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Bitcoin Script →](./script.md)
