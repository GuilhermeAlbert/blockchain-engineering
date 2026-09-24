# Operações

Uma transação é um registro assinado de uma mudança pretendida. Mais comumente, uma transferência de valor de uma parte para outra. Este capítulo trata as transações como um conceito geral blockchain, no nível necessário para entender como elas se encaixam nos blocos e na cadeia como um todo; a profundidade mecânica completa do formato de transação específico do Bitcoin (inputs, saídas, scripts, taxas) é coberta separadamente em [Transações de Bitcoin](../bitcoin/transactions.md), e formato de transação da Ethereum em [Transações Ethereum](../ethereum/transactions.md).

## O problema

Um bloco (ver [Blocos](./blocks.md)) precisa de alguma unidade de dados para realmente lotear juntos. Essa unidade precisa ser auto-suficiente o suficiente para que qualquer nó possa verificar independentemente que é legítimo, que quem a autorizou realmente tinha o direito, e que ela não tenta algo que as regras do protocolo proíbem (como o valor de gasto que não existe). Uma transação é aquela unidade auto-suficiente, independentemente verificável.

## O que cada transação blockchain tem em comum

Independentemente do blockchain específico, uma transação geralmente inclui:

- **Uma autorização**, quase sempre [assinatura digital](../cryptography/digital-signatures.md) Provar que a parte que inicia a operação controla a chave privada relevante.
- **Descrição da alteração pedida**: em Bitcoin, uma lista de entradas sendo gastas e saídas sendo criadas; em Ethereum, tipicamente um remetente, destinatário, quantidade, e opcionalmente dados para uma chamada de contrato inteligente.
- **Uma taxa**, compensando quem inclui a transação em um bloco para o espaço de bloco e esforço computacional que consome (ver [Taxas de transação](../bitcoin/fees.md) e [Gás](../ethereum/gas.md)).
- **Um identificador único**, tipicamente um hash do próprio conteúdo da transação, usado para referencia-lo (como uma entrada para uma transação posterior, no caso do Bitcoin; ou simplesmente para pesquisa, em qualquer sistema).

## Dois modelos fundamentalmente diferentes

Este é o fork de design mais conseqüente entre os formatos de transação blockchain, e vale a pena entender em um nível conceitual antes de mergulhar nas especificidades de ambos os sistemas:

### O modelo UTXO (Bitcoin)

Bitcoin não tem nenhum conceito de um "balanço de conta" armazenado em qualquer lugar. Em vez disso, a rede rastreia um conjunto de **Saídas de Transação não Gastadas (UTXOs)**, pedaços discretos, não gastos de valor, cada um criado por alguma transação anterior e ainda não gasto por qualquer posterior. Uma nova transação consome um ou mais UTXOs existentes como entradas (provando propriedade via assinatura) e cria um ou mais UTXOs novos como saídas. O "equilíbrio" de uma carteira não é um número guardado em lado nenhum. É calculado na mosca como a soma de todas as chaves de uma carteira pode gastar. Esta é coberta na íntegra em [O Modelo UTXO](../bitcoin/utxo.md).

### O modelo de conta (Ethereum)

Ethereum em vez disso mantém um explícito, global **estado** (essencialmente uma tabela grande mapeando endereços para saldos de conta (e, para contas de contrato, para dados armazenados e código)) e uma transação debita diretamente o saldo do remetente e créditos do destinatário, muito parecido com um registro bancário convencional. Esta é coberta na íntegra em [Estado Ethereum](../ethereum/state.md) e [Contas Ethereum](../ethereum/accounts.md).

```text
UTXO model (Bitcoin)                    Account model (Ethereum)

  UTXO A (0.5 BTC) ──┐                    Alice's balance: 10 ETH
  UTXO B (0.3 BTC) ──┼─► new tx ──► UTXO C (0.7 BTC)     │
                      │              UTXO D (0.1 BTC)     ▼ tx: send 2 ETH to Bob
                      └─► (change)                       Alice's balance: 8 ETH
                                                          Bob's balance:   +2 ETH
No stored "balance" anywhere —                          Balances stored directly
it's the sum of unspent outputs                          in global state
```

Nenhum dos modelos é estritamente superior. Este é um verdadeiro tradeoff de design coberto especificamente para cada cadeia em suas respectivas seções, e é uma das diferenças mais conseqüentes entre Bitcoin e arquitetura geral de Ethereum, afetando tudo a partir da privacidade (UTXOs tornar certos tipos de análise mais difícil, veja [Privacidade](../society/privacy.md)) para o design de contrato inteligente (o estado persistente do modelo de conta é um ajuste mais natural para lógica de contrato complexa, ver [Contratos Inteligentes](../contracts/README.md)).

## Como as transações se tornam parte da cadeia

Uma transação, uma vez criada e assinada, é transmitida para a rede peer-to-peer (ver [Redes de pares a pares](../distributed-systems/p2p.md)) e senta-se em nós. [mempools](../bitcoin/mempool.md) até que um minerador ou validador o inclua num bloco. Ser incluído em um bloco não o torna instantaneamente, permanentemente final. Ele herda a posição do bloco na cadeia e ganha confiança ao longo do tempo como descrito em [Finalidade Probabilística](../distributed-systems/probabilistic-finality.md). Inclusão em um bloco, e as transações desse bloco sendo resumidas corretamente na raiz do bloco Merkle, é o que [Provas de Merkle](../cryptography/merkle-proofs.md) permite que um cliente leve verifique sem baixar todas as transações na rede.

## Conceitos errôneos comuns

**Uma transação "confirmada" não significa que tenha sido verificada por alguma autoridade externa**Isso significa que foi incluído em um bloco que a rede aceitou como parte da cadeia válida, e cada nó que validou esse bloco verificou de forma independente a transação contra as próprias regras do protocolo.

**Nem todo blockchain usa o modelo UTXO, e nem todo blockchain usa o modelo de conta.** Estas são duas das abordagens mais comuns, mas a escolha específica é uma decisão de projeto de protocolo, não uma propriedade inerente de "blockchain" como categoria, veja [UTXO](../bitcoin/utxo.md) e [Contas Ethereum](../ethereum/accounts.md) para a mecânica real de cada modelo.

## Outras leituras

- [Whitepaper Bitcoin, Seção 2 (Transações)](https://bitcoin.org/bitcoin.pdf)
- Ver também: [Transações de Bitcoin](../bitcoin/transactions.md), [Transações Ethereum](../ethereum/transactions.md)

---

[← Anterior: Cabeçalhos de Bloco](./block-headers.md)
·
[Voltar para Blockchain Fundamentos](./README.md)
·
[Próximo: Hashes e Block Linking →](./block-linking.md)
