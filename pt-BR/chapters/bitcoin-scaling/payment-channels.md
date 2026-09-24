# Canais de pagamento

Um canal de pagamento permite que duas partes troquem muitos pagamentos entre si, ao mesmo tempo que só tocam na blockchain duas vezes, uma vez para abrir o canal, uma vez para fechá-lo. Este capítulo introduz o conceito e o mecanismo gerais; [Lightning Network](../lightning/README.md) a seção constrói isso em uma rede completa e multi-hop e abrange os demais mecânicos (roteamento, liquidez, torres de observação) em profundidade.

## A ideia central

Relembrar o teto de rendimento de [Tamanho do Bloco](./block-size.md#a-aritmética-de-rendimento): cada transação on-chain consome espaço de bloco escasso, limitado por taxa. Se duas partes esperam negociar com frequência uma com a outra (um cliente e um café, ou duas trocas de acordo com a outra repetidamente) colocando cada pagamento em cadeia é um desperdício. Um canal de pagamento permite-lhes autorizar fundos uma vez, em seguida, trocar um número efetivamente ilimitado de contratos de saldo atualizados **fora de cadeia**, transmitindo para o blockchain apenas quando eles finalmente querem se estabelecer e fechar.

## Como funciona, mecanicamente

1. **Operações de financiamento**: ambas as partes (ou apenas uma, para um canal mais simples) contribuem com fundos para uma única produção multisig, em cadeia (ver [Multisig](../wallets/multisig.md)), tipicamente 2 de 2, exigindo a assinatura de ambas as partes para gastar.
2. **Operações de autorização**: cada vez que as partes querem atualizar o saldo (Alice paga Bob algum valor), eles cooperam construir e assinar uma nova transação, atualizado gastar a saída multisig, refletindo a nova divisão do saldo, mas **não divulgue**. Cada nova transação de compromisso substitui a anterior; apenas a versão mais recente e mutuamente acordada deve ser publicada.
3. **Fechando**: quando qualquer uma das partes quer liquidar, eles transmitem a última transação de compromisso mutuamente assinada, que paga a divisão do saldo atual, uma última transação on-chain, independentemente de quantas atualizações off-chain aconteceram no meio.

```text
On-chain:  [Funding tx] ─────────────────────────────────── [Closing tx]
                          │
Off-chain:                ├─ update 1 (Alice: 0.9, Bob: 0.1)
                          ├─ update 2 (Alice: 0.7, Bob: 0.3)
                          ├─ update 3 (Alice: 0.5, Bob: 0.5)
                          └─ ... potentially thousands more,
                             none of them touching the blockchain
```

## Por que um velho compromisso não pode simplesmente ser retransmitido para enganar

Uma versão ingénua deste esquema tem um problema óbvio: o que impede um partido desonesto de transmitir um *antigo*, transação de compromisso desatualizada (um favorecendo-os mais do que o equilíbrio atual, correto) em vez da última? Prevenir exatamente este é o trabalho específico do **mecanismo de sanções** coberto totalmente em [Lightning Network](../lightning/README.md) e [Transações de Compromisso](../lightning/commitment-transactions.md): cada nova transação de compromisso invalida a anterior de uma forma que torna punível uma versão antiga e desatualizada. A outra parte pode, dentro de uma janela de tempo definida, reivindicar o *inteiro* Equilíbrio de canal como uma penalidade se eles detectarem um antigo compromisso sendo transmitido, um incentivo forte o suficiente para tornar a fraude irracional em condições normais.

## O padrão geral que esta estabelece

Os canais de pagamento são o bloco de construção fundamental para [Camada 2](../layer2/README.md) escalar em geral, não apenas a Lightning Network específica de Bitcoin, a mesma ideia central (comprometer on-chain uma vez, transacionar off-chain muitas vezes, estabelecer on-chain uma vez) reaparece, em várias formas, através da própria paisagem da Camada 2 de Ethereum (ver [Por que existe a camada 2](../layer2/README.md)), embora as implementações técnicas específicas diverjam substancialmente entre um canal de pagamento baseado no Bitcoin-Script e um rollup Ethereum.

## Comércio

Um canal de pagamento bipartidário só permite transacionar de forma barata e instantânea com o *contraparte específica* Você abriu o canal com. Pagar alguém com quem ainda não tenha um canal aberto requer abrir um novo canal (outra transação on-chain) ou encaminhar o pagamento através de uma rede de canais conectada, que é precisamente o problema [Lightning Network](../lightning/README.md) é projetado para resolver.

## Conceitos errôneos comuns

**Os pagamentos fora de cadeia num canal não são menos reais ou menos finais do que as transações em cadeia para fins práticos**Cada atualização de compromisso assinada cooperativamente é uma reivindicação válida e executória sobre os fundos do canal; o que é adiado é apenas o ato de transmitir para o blockchain, não a validade criptográfica do próprio acordo.

**Um canal de pagamento não requer confiar na contraparte para não enganar**, o mecanismo de penalidade (coberto totalmente na seção Lightning) é especificamente projetado para tornar a fraude economicamente irracional através da execução criptográfica e econômica, não através de confiar na boa fé do outro partido.

## Outras leituras

- Ver também: [Lightning Network](../lightning/README.md), [Multisig](../wallets/multisig.md)

---

[← Anterior: Batendo Transação](./batching.md)
·
[Voltar para Bitcoin Scaleing](./README.md)
·
[Próximo: Cadeias laterais →](./sidechains.md)
