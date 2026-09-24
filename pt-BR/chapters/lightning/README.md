# Lightning Network

A Rede de Relâmpagos transforma o partido [canal de pagamento](../bitcoin-scaling/payment-channels.md) mecanismo introduzido no Bitcoin Scaling em uma rede real, utilizável, deixando Alice pagar Carol através do canal de Bob, sem Alice precisar de um canal direto com Carol, e sem precisar confiar Bob em tudo. Esta seção abrange exatamente como isso funciona: o financiamento, o mecanismo de revogação que mantém as contrapartes de canais honestos, HTLCs (a construção específica que torna o roteamento multi-hop minimizado confiança), e as realidades práticas de executar um nó, liquidez, torres de observação e capacidade de canal.

## O que você precisa saber primeiro

[Canais de pagamento](../bitcoin-scaling/payment-channels.md) (o mecanismo geral de duas partes), [Multisig](../wallets/multisig.md), [Calendário](../bitcoin/script.md#calendário), e [Compromissos criptográficos](../cryptography/commitments.md), HTLCs combinam especificamente os conceitos de bloqueio temporal e compromisso desses dois capítulos em um mecanismo.

## Relâmpagos, brevemente

Antes dos capítulos abaixo, uma peça do vocabulário diário vale a pena definir **Factura Lightning** é um pedido de pagamento, gerado pelo destinatário, codificando o montante, uma descrição, um tempo de expiração, e (criticamente, por [HTLCs](./htlcs.md)) o hash de pagamento do remetente HTLCs vai precisar satisfazer ao longo da rota. As faturas são tipicamente compartilhadas como um código QR ou uma longa string codificada por Bech32 (começando `lnbc...` na mainnet) esse software carteira decodifica e exibe antes que o remetente confirma o pagamento.

## Capítulos

1. [Canais de pagamento](./payment-channels.md): o mecanismo de revogação, na íntegra: porque transmitir um velho estado é uma estratégia perdedora
2. [Operações de Financiamento](./funding-transactions.md): a única transação on-chain que abre um canal
3. [Transações de Compromisso](./commitment-transactions.md): por que cada parte detém uma versão assimétrica diferente
4. [HTLCs](./htlcs.md): o mecanismo que faz o roteamento multi-hop minimizado confiança, trabalhou através passo a passo
5. [Roteamento dos Pagamentos](./routing.md): roteamento baseado em fonte, privacidade de cebola, e porque rotas podem falhar
6. [Liquididade](./liquidity.md): inbound versus outbound, e porque um canal financiado nem sempre pode receber
7. [Capacidade do Canal](./channel-capacity.md): o limite máximo fixo, distinguido cuidadosamente da liquidez
8. [Torres de Vigia](./watchtowers.md): como um canal permanece protegido enquanto você está offline, sem confiar em um guardião
9. [Nós Lightning](./nodes.md): as principais implementações, e o nó completo do Bitcoin cada uma delas depende de

## Próxima

Isso completa os capítulos focados em Bitcoin do livro. Continuar a [Ethereum](../ethereum/README.md), uma blockchain diferente, construída sobre um modelo de transação diferente (contas, não UTXOs), com sua própria abordagem de escala coberta em profundidade [Camada 2](../layer2/README.md) mais tarde neste livro.
