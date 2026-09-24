# A rede Bitcoin

O presente Capítulo aplica-se [Redes de pares a pares](../distributed-systems/p2p.md)'s conceitos gerais para Bitcoin real, rede em execução, sua escala aproximada, como nós realmente encontrar uns aos outros na prática, eo que propagação se parece com a velocidade do mundo real.

## Escala e forma

A rede Bitcoin não tem tamanho fixo. Qualquer pessoa pode participar ou sair a qualquer momento (ver [Sem Permissão vs Redes Permitidas](../blockchain/permissionless-vs-permissioned.md)), e contagens de nós alcançáveis são apenas estimativas sempre, normalmente reunidas por projetos rastejantes que tentam enumerar nós acessíveis publicamente (um número que exclui nós correndo atrás de NAT ou Tor que não aceitam conexões de entrada, o que significa que a contagem total de participantes é entendida como significativamente maior do que qualquer contagem de nós alcançáveis público sugere). Estimativas de serviços públicos de rastreamento de nós geralmente colocam a contagem de nós alcançáveis na faixa de vários milhares a cerca de quinze mil em vários pontos, embora esta flutua e qualquer figura específica deve ser tratada como um instantâneo em vez de uma constante estável.

## Descoberta de nós na prática

Com base nos mecanismos gerais descritos em [Redes de pares a pares](../distributed-systems/p2p.md#como-funciona), uma nova sequência de bootstrap do nó Bitcoin Core é: tente sementes DNS primeiro, volte para uma lista de sementes codificadas se as sementes DNS não forem acessíveis, e uma vez conectadas a mesmo um punhado de pares, solicite endereços de pares adicionais via `getaddr`/`addr` mensagens, criando gradualmente uma base de dados de endereços locais (`peers.dat`) pode reutilizar em reinícios futuros sem necessidade de re-consultar sementes DNS todas as vezes.

## Velocidade de propagação na prática

Projetos de medição empírica (como os Bitnodes de longo prazo e os esforços de monitoramento de rede de Bitcoin DSN) historicamente descobriram que um bloco recém-transmitido atinge a esmagadora maioria dos nós alcançáveis em um pequeno número de segundos, rápido em relação ao intervalo médio de aproximadamente 10 minutos entre os blocos (ver [Tempo de bloco](../blockchain/block-time.md)), que é precisamente a relação que mantém a taxa de órfão natural orientada para a propagação baixa. Técnicas como **relé de bloco compacto** (BIP 152) reduzir os dados realmente transmitidos para um novo bloco enviando identificadores de transação curtos em vez de dados completos de transação quando o mempool do nó receptor provavelmente já tem a maioria das transações do bloco, acelerando ainda mais a propagação como blocos e tamanhos de mempool cresceram ao longo do tempo.

## Privacidade de nível de tor e rede

Como o endereço IP de um nó é visível para seus pares diretos por padrão, alguns operadores de nós executam seu nó exclusivamente através do Tor para evitar revelar a sua localização de rede, uma medida de privacidade real e prática [Privacidade](../society/privacy.md). Bitcoin Core tem suporte integrado para conectar e aceitar conexões através de serviços ocultos Tor.

## Conceitos errôneos comuns

**Não há status de rede "central" Bitcoin que alguém possa verificar com autoridade.** Painéis públicos e projetos de criação de nós fornecem estimativas baseadas no que eles podem observar, não uma verdade. Esta é uma consequência direta e esperada de a rede não ter registro central por projeto.

## Outras leituras

- [Bitcoin Referência do desenvolvedor principal: Rede P2P](https://developer.bitcoin.org/reference/p2p_networking.html)
- [BIP 152: Relé de bloco compacto](https://github.com/bitcoin/bips/blob/master/bip-0152.mediawiki)

---

[← Anterior: Bitcoin Nodes](./nodes.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Nós completos →](./full-nodes.md)
