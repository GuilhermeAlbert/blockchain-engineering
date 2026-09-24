# Nós Lightning

Um nó Lightning é um software que gerencia canais, pagamentos de rotas, e (para nós que desejam total confiança-minimização) se conecta a um nó completo Bitcoin para verificar independentemente eventos on-chain relevantes para seus canais. Este capítulo final da seção Lightning cobre a paisagem de software prático e a relação específica entre um nó Lightning e o nó completo Bitcoin que depende.

## A dependência de um nó completo do Bitcoin

Todas as garantias significativas de segurança Lightning abrangidas ao longo desta seção (detectando uma emissão de compromisso revogada (ver [Canais de pagamento](./payment-channels.md#o-mecanismo-de-revogação)), confirmando uma operação de financiamento (ver [Operações de Financiamento](./funding-transactions.md#por-que-precisa-de-confirmações-antes-de-o-canal-ser-considerado-seguro)), saber quando um bloqueio de tempo realmente expirou) depende da visibilidade precisa, oportuna e confiável no blockchain Bitcoin. É exatamente por isso que um nó Lightning precisa de uma relação de trabalho com um nó Bitcoin: ele precisa assistir a cadeia para exatamente os eventos com que seus canais abertos se preocupam. Um nó Lightning conectado a uma fonte de dados de cadeia desonesta ou não confiável herda essa mesma fraqueza, comprometendo diretamente a aplicação on-chain garante que todo o modelo de segurança do canal depende, e é por isso que executar o seu próprio nó completo Bitcoin ao lado de um nó Lightning (ao invés de confiar em uma API de cadeia de dados de terceiros) é a configuração mais minimizada de confiança, ecoando o mesmo acordo geral full-node-versus-light-client coberto em [Nós Completos](../bitcoin/full-nodes.md) e [Clientes leves](../bitcoin/light-clients.md).

## As principais implementações

Várias implementações independentes de nós Lightning existem e interoperam através das especificações [Especificações do BOLT](https://github.com/lightning/bolts) referenciado em toda esta seção), mais proeminentemente **LND** (Laboratórios de Luz), **Lightning Principal** (Blockstream, anteriormente c-lightning), **Eclair** (ACINQ), e **LDK** (Lightning Development Kit, uma biblioteca para incorporar a funcionalidade Lightning diretamente em outras aplicações em vez de executar como software de nó autônomo). Interoperabilidade através de implementações desenvolvidas independentemente, todos corretamente encaminhando pagamentos e aplicando sanções uns contra os outros, independentemente de qual software específico cada parte executa, é em si uma validação real e prática do processo de especificação de BOLT compartilhado trabalhando como pretendido.

## Nós de roteamento versus nós de folhas

Nem todos os nós Lightning participam no encaminhamento dos pagamentos dos outros. A **nó de roteamento** mantém múltiplos canais bem equilibrados especificamente para encaminhar pagamentos de terceiros (receber taxas de roteamento para fazer isso, uma fonte real, se muitas vezes modesta, de receita para operadores de nó de roteamento bem executado) e normalmente funciona com alto tempo de funcionamento e liquidez cuidadosamente gerenciada. A **nó de folha** (o caso muito mais comum para usuários casuais e individuais) envia e recebe principalmente seus próprios pagamentos através de um ou alguns canais, sem necessariamente encaminhar tráfego significativo de terceiros. Ambos são formas legítimas e completas de participar na rede; a distinção é sobre o papel operacional, não há diferença no protocolo subjacente que cada um segue.

## Conceitos errôneos comuns

**Executar um nó Lightning não é o mesmo que executar um nó Bitcoin**, apesar de uma configuração totalmente minimizada de confiança Lightning requer tanto, um nó Lightning especificamente gerencia canais e roteamento; um nó completo Bitcoin independentemente valida a blockchain subjacente, eo nó Lightning depende dessa visão validada para suas próprias garantias de segurança para realmente manter.

**Nem todo nó Lightning ganha taxas de roteamento ou participa significativamente em roteamento de pagamento em toda a rede**. Muitos nós existem puramente para enviar e receber seus próprios pagamentos, e esta é uma forma completa e válida de usar Lightning, não uma configuração incompleta ou menor em comparação com a execução de um nó de roteamento.

## Outras leituras

- [Especificações do BOLT](https://github.com/lightning/bolts)
- Ver também: [Nós Completos](../bitcoin/full-nodes.md), [Clientes leves](../bitcoin/light-clients.md)

---

[← Anterior: Torres de Vigia](./watchtowers.md)
·
[Voltar à Rede Lightning](./README.md)
·
[Próximo: O que é Ethereum? →](../ethereum/README.md)
