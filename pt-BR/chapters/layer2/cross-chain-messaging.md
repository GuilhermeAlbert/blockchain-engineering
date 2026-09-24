# Mensagens de Mudança Cruzada

Além dos ativos móveis, uma classe de protocolos de finalidade geral permite que um contrato em uma cadeia envie uma mensagem arbitrária, quaisquer dados, não apenas um token, para um contrato em uma cadeia totalmente diferente. Este capítulo cobre como esses protocolos funcionam em geral, e onde dois exemplos amplamente utilizados, LayerZero e Wormhole, realmente se sentam no espectro de confiança [Pontes](./bridges.md) já introduzido.

## O que um protocolo geral de transmissão de mensagens realmente faz

Um protocolo de mensagens cross-chain permite que um contrato na cadeia A emite uma mensagem que algum mecanismo de verificação confirma realmente aconteceu, de modo que um contrato na cadeia B pode agir sobre ele, atualizando o estado, liberando fundos, ou desencadeando qualquer outra lógica que o contrato de recebimento implementa. Isso generaliza o caso específico de derivação de ativos: uma ponte token é, mecanicamente, apenas uma aplicação em particular construída em cima deste mesmo padrão de transmissão de mensagens, onde a mensagem acontece de dizer "libertar esta quantidade deste ativo para este endereço".

## LayerZero: uma rede de verificação configurável

A arquitetura atual do LayerZero permite que cada aplicativo escolha um ou mais independentes **Redes de Verificadores Descentralizados (DVNs)**, operadores de nó profissionais ou empresas de segurança que observam a cadeia de origem e atestam que uma determinada mensagem realmente ocorreu lá, antes de ser aceita na cadeia de destino. Um aplicativo pode exigir atestados de vários DVNs independentes antes de aceitar uma mensagem, um modelo de segurança m-of-n explícito e configurável que permite que cada aplicativo escolha seu próprio tradeoff entre custo, velocidade e quantas partes independentes têm que colidir ou falhar para uma mensagem forjada passar. Este é um projeto significativamente diferente de um único conjunto fixo de verificadores: o pressuposto de confiança real depende de quais DVNs, e quantos, uma aplicação específica escolheu exigir.

## Buraco de minhoca: uma rede guardiã fixa

Wormhole usa um design diferente, mais tradicional: um conjunto fixo de 19 operadores de validação profissional, chamado **guardiões**, cada um observa independentemente a atividade da cadeia fonte e assina nas mensagens; uma mensagem precisa de assinaturas de pelo menos 13 dos 19 responsáveis para produzir um atestado válido e aceitável. Este é um modelo federado de confiança no sentido já [Pontes](./bridges.md#o-espectro-de-confiança-de-confiança-a-confiança-minimizada): segurança depende de pelo menos 13 desses 19 partidos específicos, nomeados agindo honestamente e não sendo comprometidos, um significativamente diferente (e, pela maioria das medidas, mais concentrada) suposição de confiança do que o modelo de DVN configurável por aplicação de LayerZero, embora Wormhole fixo, bem conhecido conjunto guardião tem sua própria vantagem em ser mais simples de raciocinar e auditoria do que um conjunto variável, aplicativo-escolhido verificador.

## Por que estes protocolos importam além de simples ponte de token

Passagem geral de mensagens permite usar casos que uma ponte de ativos simples não pode: um protocolo de empréstimo em uma cadeia de leitura de estado colateral de uma cadeia diferente, um DAO em uma cadeia executando uma decisão de governança sobre um contrato implantado em uma cadeia totalmente diferente, ou um aplicativo mantendo o estado sincronizado em várias cadeias sem que os usuários precisem ponte manual de ativos entre cada uma. Essa generalidade também é exatamente por que esses protocolos carregam o mesmo, ou maior, riscos como uma ponte de ativos: uma mensagem forjada ou reproduzida pode desencadear lógica de contrato arbitrária na cadeia de recebimento, não apenas uma liberação incorreta de ativos, tornando os pressupostos de confiança do mecanismo de verificação subjacente tão conseqüentes quanto para qualquer valor bloqueado de ponte diretamente.

## Conceitos errôneos comuns

**Um protocolo de mensagens de uso geral não é automaticamente mais ou menos confiável do que uma ponte de ativos construída com propósito.** Ambos dependem, em última análise, de algum mecanismo de verificação confirmando que um evento de cadeia fonte realmente aconteceu; a questão relevante para qualquer protocolo específico é qual mecanismo ele usa e quão concentrada ou distribuída a confiança desse mecanismo realmente é, exatamente a mesma pergunta [Pontes](./bridges.md) aumenta geralmente.

**Escolher mais verificadores, ou um limiar maior de guardião, não elimina inteiramente o risco de mensagens de cadeia cruzada.** Reduz o risco de uma mensagem forjada passar, exigindo que as partes mais independentes colaborem ou falhem simultaneamente, mas não elimina o risco de contrato inteligente no próprio código do protocolo de mensagens, ou no manuseio de uma mensagem recebida pelo aplicativo.

## Outras leituras

- [Documentação LayerZero](https://docs.layerzero.network/)
- [Documentação do buraco de minhoca](https://docs.wormhole.com/)
- Ver também: [Pontes](./bridges.md), [Explorações da Ponte](../security/bridge-exploits.md)

---

[← Anterior: Pontes canônicas](./canonical-bridges.md)
·
[Voltar à Camada 2](./README.md)
·
[Próximo: Arbitrum →](./arbitrum.md)
