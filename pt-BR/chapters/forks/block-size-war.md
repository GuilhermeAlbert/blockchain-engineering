# Debate sobre o Tamanho do Bloco

Entre 2015 e 2017, a comunidade de Bitcoin envolveu-se em uma disputa prolongada, muitas vezes aquecida sobre se e como aumentar a quantidade de dados de transação que cada bloco poderia conter. Este capítulo abrange o conteúdo dos argumentos técnicos de cada lado, utilizando fontes contemporâneas e não narrativas retrospectivas, e estabelece os três eventos específicos ([SegWit2x](./segwit2x.md), [Bitcoin Cash](./bitcoin-cash.md), e (indirectamente, como mais tarde Bitcoin Cash split) [Bitcoin SV](./bitcoin-sv.md)) que emergiu dele.

## A questão técnica subjacente

O código original do Bitcoin incluía um limite de tamanho de bloco de 1 MB, adicionado por Satoshi em 2010 como uma medida anti-spam (não parte do whitepaper original ou lançamento inicial) em um momento em que blocos não estavam nem perto desse tamanho. À medida que o volume de transações crescia até meados dos anos 2010, os blocos começaram a aproximar-se desse limite durante períodos de alta demanda, causando a dinâmica de mercado de taxa descrita em [Mercado de Taxas](../bitcoin/fee-market.md#padrões-observados): taxas crescentes e períodos de espera mais longos durante o congestionamento. Isto levantou uma verdadeira questão de engenharia substantiva e econômica, sem uma única resposta objectivamente correcta: **deve o limite de tamanho do bloco ser aumentado, e, em caso afirmativo, como e por quanto?**

## O caso para aumentar o limite de tamanho do bloco diretamente

Proponentes de aumentar diretamente o limite de tamanho do bloco (uma simples mudança de parâmetro, tecnicamente um hard fork uma vez que se solta em vez de apertar regras de consenso, veja [Hard fork](./hard-forks.md)) argumentou que blocos maiores manteriam as taxas de transação baixas e tempo de confirmação rápido à medida que a adoção cresce, preservando a usabilidade do Bitcoin como um sistema de pagamento diário para uma gama mais ampla de tamanhos e valores de transação. Alguns apontaram para a discussão inicial de Satoshi sobre escala, na qual blocos maiores foram discutidos como um caminho futuro plausível, como evidência que esta abordagem era consistente com a trajetória pretendida do projeto original. Apoiadores proeminentes desta direção geral incluem os contribuintes do Bitcoin Core Gavin Andresen e Mike Hearn (ambos propuseram implementações específicas de tamanho maior, incluindo "Bitcoin XT", um cliente alternativo que propõe um aumento para 8 MB), e mais tarde uma coalizão mais ampla que incluía importantes interesses de mineração e negócios.

## O caso de uma abordagem mais conservadora

Críticos de aumentar diretamente o limite de tamanho do bloco base argumentaram que blocos maiores aumentam os requisitos de recursos (armazenamento, largura de banda, tempo de validação) para executar um nó completo (ver [Nós Completos](../bitcoin/full-nodes.md#o-que-a-execução-realmente-requer)), que eles argumentaram que poderia reduzir o número de pessoas realisticamente capaz de executar uma, empurrando para uma rede com menos, maiores, operadores de nó mais centralizado, uma ameaça direta, em sua visão, para as propriedades de descentralização Bitcoin inteiro modelo de segurança depende (ver [Sem Permissão vs Redes Permitidas](../blockchain/permissionless-vs-permissioned.md)). Esta posição geralmente favoreceu um aumento menor, mais conservador, ou escalar principalmente através de off-chain e Layer 2 abordagens (mais significativamente o [Lightning Network](../lightning/README.md), cujo trabalho de concepção precoce estava acontecendo concomitantemente durante este período) combinado com melhorias de eficiência para a contabilidade de tamanho de bloco existente, que é exatamente o que [SegWit](../bitcoin/segwit.md#peso-e-aumento-da-capacidade-efetiva) finalmente fornecido, juntamente com a sua reparação de maleabilidade separada.

## Por que isso se tornou genuinamente, profundamente contencioso

Ambas as posições tinham mérito técnico real, substantivo e tradeoffs reais documentados. Isto não foi, como às vezes é retrospectivamente simplificado, uma disputa entre engenheiros tecnicamente sólidos e obstrucionistas tecnicamente não bons de ambos os lados. Ele combinou um genuíno desacordo de engenharia (sobre como pesar o rendimento contra a acessibilidade de operação de nós) com desacordos sobre o propósito fundamental e público de Bitcoin (uma rede de pagamento diária de alto rendimento, baixa taxa para a maior base de usuários possível, versus uma camada de liquidação de base mais restrita, máximamente descentralizada, com rendimento adicional construído no topo via Camada 2), e, à medida que a disputa se arrastava, acumulando atrito pessoal e organizacional entre os participantes-chave que tornavam a resolução puramente técnica progressivamente mais difícil. Este livro apresenta argumentos reais e substantivos de ambas as posições, conforme documentado acima, em vez de julgar qual lado era correto, razoável, tecnicamente informado pessoas mantidas, e continuam a manter, opiniões diferentes sobre este comércio específico.

## Como foi resolvido, e como não foi totalmente resolvido

[SegWit](../bitcoin/segwit.md) activada em Agosto de 2017, na sequência da [UASF](./uasf.md) campanha de pressão, proporcionando um aumento de capacidade eficaz compatível com um soft fork sem aumentar diretamente o limite de tamanho do bloco base. Um esforço paralelo da indústria, o "New York Agreement", propôs a combinação da ativação do SegWit com um aumento subsequente do tamanho do bloco de hard fork. Isto tornou-se [SegWit2x](./segwit2x.md), e seu cancelamento está coberto por esse capítulo. Separadamente, uma parte da comunidade que queria um aumento de tamanho de bloco maior e direto e discordou da abordagem específica de SegWit se separou completamente, criando [Bitcoin Cash](./bitcoin-cash.md) no dia 1o de agosto de 2017, a mesma data em que o próprio SegWit se trancou, embora os dois eventos, enquanto relacionados através da mesma disputa subjacente, fossem organizacionalmente distintos. O próprio Bitcoin continuou com a abordagem do SegWit e, mais tarde, [Taproot](../bitcoin/taproot.md); Bitcoin Cash continuou como sua própria cadeia governada separadamente com sua própria história subsequente, incluindo sua própria produção mais tarde dividida [Bitcoin SV](./bitcoin-sv.md).

## Conceitos errôneos comuns

**Esta não foi uma disputa com um lado representando "verdadeiro Bitcoin" e o outro representando um ataque a ele**, independentemente de como os participantes de qualquer lado o caracterizavam na época ou desde então, este livro trata-o como uma discordância genuína e substantiva sobre tradeoffs de engenharia e direção de projetos entre as pessoas que, em geral, queriam Bitcoin (em qualquer forma que cada visionado) para ter sucesso.

**O litígio não foi puramente técnico.**Também envolveu questões reais sobre processo de tomada de decisão e autoridade (quem decide, e como, quando a comunidade discorda) que se conectam diretamente com [Governança do Bitcoin](./governance.md), não apenas a questão subjacente da engenharia em bloco.

## Outras leituras

- [A discussão arquivada de Satoshi Nakamoto de aumentar o limite de tamanho de bloco](https://satoshi.nakamotoinstitute.org/posts/bitcointalk/threads/416/)
- Ver também: [SegWit](../bitcoin/segwit.md), [SegWit2x](./segwit2x.md), [Bitcoin Cash](./bitcoin-cash.md)

---

[← Anterior: SegWit2x](./segwit2x.md)
·
[Voltar às atualizações de forks e protocolos](./README.md)
·
[Próximo: O que é uma carteira? →](../wallets/README.md)
