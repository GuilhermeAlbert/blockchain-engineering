# Forks de cadeia temporária

"Forquilha" é uma das palavras mais sobrecarregadas na terminologia blockchain. Ele descreve pelo menos três eventos genuinamente diferentes: uma rotina, discordância temporária sobre a corrente atual; uma mudança de regra que o software antigo ainda aceita; e uma mudança de regra que divide a rede em duas cadeias permanentemente separadas. Este capítulo abrange o primeiro, mais comum, e menos consequencial tipo, criação [Soft forks](./soft-forks.md) e [Hard fork](./hard-forks.md) para cobrir os outros dois.

## O que é um fork temporário na verdade

Este é exatamente o cenário já abordado mecanicamente em [Reorganizações da Cadeia](../blockchain/reorgs.md): dois mineradores encontram blocos válidos quase ao mesmo tempo, construindo sobre o mesmo pai, e partes diferentes da rede brevemente ver pontas de cadeia diferentes até que um ramo puxa adiante em trabalho cumulativo e a rede converge. Isto acontece rotineiramente, uma consequência directa e esperada do atraso de propagação através de uma rede descentralizada (ver [Redes de pares a pares](../distributed-systems/p2p.md)), não um desacordo regra, uma disputa de governança, ou qualquer coisa que exija coordenação para resolver. Ele resolve-se, automaticamente, via [Escolha do fork](../blockchain/fork-choice.md), tipicamente dentro de um ou dois blocos.

## Por que este capítulo existe separadamente

Nomear este tipo de fork explicitamente importa porque cobertura de notícias e conversa casual às vezes usa "Bitcoin bifurcado" para descrever esta rotina, evento auto-resolver e, no mesmo fôlego, para descrever uma rede permanente, contenciosa divisão como [Bitcoin Cash](./bitcoin-cash.md), duas coisas categoricamente diferentes que compartilham um nome. Este livro mantém-nos separados ao longo de: um fork de cadeia temporária é um evento operacional normal cada prova de trabalho blockchain experiências continuamente; os forks cobertos no resto desta seção (forques suaves, hard forks, e as divisões históricas específicas) são sobre **alterações às regras próprias do protocolo**, um assunto completamente diferente.

## Conceitos errôneos comuns

**Um fork de corrente temporária não requer nenhuma decisão humana, coordenação ou anúncio.** Ele é resolvido automaticamente por cada nó independentemente aplicando a mesma regra de escolha de fork para quaisquer dados que tenha recebido, veja [Escolha do fork](../blockchain/fork-choice.md).

**Ler sobre "um fork" nas notícias Bitcoin não lhe diz, por si só, qual dos vários significados diferentes se pretende**Verifique sempre se o artigo descreve uma rotina, um evento de resolução em minutos ou uma mudança permanente e coordenada de regras antes de chegar a qualquer conclusão sobre o seu significado.

## Outras leituras

- Ver também: [Reorganizações da Cadeia](../blockchain/reorgs.md), [Escolha do fork](../blockchain/fork-choice.md)

---

[← Anterior: O que é um fork?](./README.md)
·
[Voltar às atualizações de forks e protocolos](./README.md)
·
[Próximo: Soft forks →](./soft-forks.md)
