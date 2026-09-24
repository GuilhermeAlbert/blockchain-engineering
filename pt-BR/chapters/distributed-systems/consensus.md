# Consenso

O consenso é o problema geral de conseguir que várias partes independentes concordem com um único valor ou sequência de eventos, mesmo quando algumas partes podem falhar, desconectar ou tentar ativamente interromper o acordo. Cada banco de dados distribuído, cada sistema multi-nó que precisa de uma visão consistente do mundo, e cada blockchain tem que resolver alguma versão deste problema. Este capítulo cobre o consenso como um conceito geral de sistemas distribuídos, estabelece o modelo de falha específico (falhas bizantinas) coberto nos próximos dois capítulos, e visualiza como a solução específica de Bitcoin difere das abordagens clássicas.

## O problema, afirmado precisamente

Imagine vários computadores, conectados sobre uma rede não confiável, cada um recebendo independentemente um fluxo de transações propostas de diferentes fontes, às vezes em ordens diferentes e com atrasos diferentes. Para que um sistema monetário funcione, cada participante eventualmente precisa concordar em uma única ordem canônica de transações. Caso contrário, não há maneira de chegar a acordo sobre quem possui o quê. A **protocolo de consenso** é o mecanismo que se torna independente, possivelmente-faulty, possivelmente-adversarial partidos para convergir na mesma resposta.

A teoria clássica dos sistemas distribuídos, desenvolvida em grande parte a partir da década de 1970 até a década de 1990 para sistemas como bases de dados distribuídas e sistemas de backup coordenados, geralmente assumiu um **conhecido, conjunto fixo de participantes** (uma lista específica de servidores que uma empresa ou organização controla) e focado em tolerar falhas honestas: um servidor falhando, um link de rede caindo, mensagens chegando tarde ou fora de ordem. Este é um problema significativamente diferente, e mais fácil do que o que Bitcoin enfrenta.

## Duas dimensões de dificuldade

### Tipo de falha: falhas de falha versus falhas bizantinas

A **falha** é um participante simplesmente parando (sendo offline, tornando-se inacessível, ou falhando silenciosamente) sem enviar qualquer informação incorreta enquanto ainda está funcionando. A **Falha bizantina** (coberto na íntegra em [Falhas Bizantinas](./byzantine-faults.md)) é muito mais perigoso: um participante que envia ativamente informações diferentes, contraditórias ou deliberadamente falsas para diferentes partes da rede, potencialmente de uma forma coordenada destinada a evitar um acordo honesto. A tolerância à falha bizantina é estritamente mais difícil de alcançar do que a tolerância à falha, e requer fundamentalmente diferentes projetos de protocolo, a maioria dos algoritmos clássicos de consenso pré-blockchain (como Paxos, desenvolvido por Leslie Lamport a partir do final dos anos 1980, e Raft, uma alternativa mais compreensível) toleram apenas falhas de falha, não as bizantinas.

### Composição: autorizada versus não autorizada

Protocolos clássicos de consenso geralmente assumem **fixo, conjunto conhecido de participantes** (o protocolo tem que tolerar alguns deles falhando, mas ele sabe de antemão exatamente quem está participando e quantos existem, o que lhe permite raciocinar precisamente sobre, por exemplo, "a maioria dos 5 servidores conhecidos concordam." O problema de Bitcoin é ainda mais difícil: precisa de consenso entre **sem permissão** conjunto de participantes) qualquer um pode entrar ou sair da rede de mineradores e nós a qualquer momento, sem registro, verificação ou contagem fixa. Isso exclui protocolos clássicos tolerantes à falha bizantina, como o PBFT (Practical Bizantine Fault Tolerância, desenvolvido por Miguel Castro e Barbara Liskov em 1999), que exigem saber o número exato de participantes com antecedência para calcular a fração necessária para a concordância (tipicamente mais de dois terços honestos, na formulação específica do PBFT).

## Como o consenso de Bitcoin realmente funciona

Bitcoin evita o problema de "quem pode votar" inerente à associação sem permissão, não contando votos por identidade em tudo. Em vez disso, a influência sobre qual cadeia é aceita é proporcional a **trabalho computacional realmente realizado** (prova de trabalho, ver [Prova de Trabalho](../bitcoin/proof-of-work.md)), que não pode ser fabricado barato através da criação de identidades falsas. Esta é a defesa específica do Bitcoin contra [Ataque de Sybil](./sybil-attacks.md) problema que a associação sem permissão de outra forma cria. Cada nó, então, aplica uma regra simples e determinística para resolver desacordos: aceitar a cadeia com a maior prova cumulativa de trabalho (normalmente resumida como a "regra de cadeia mais longa", embora a regra precisa é sobre o trabalho acumulado total, não simplesmente a contagem de blocos, veja [Escolha do fork](../blockchain/fork-choice.md)).

Este é um tipo de consenso genuinamente diferente do que os clássicos protocolos tolerantes à falha bizantina fornecem, e a diferença importa: O consenso de Bitcoin não produz concordância instantânea e final no momento em que um bloco é criado. Produz **acordo probabilístico que fortalece ao longo do tempo** como mais blocos são construídos no topo, um bloco com muitas confirmações atrás dele é muito menos provável de ser revertida do que um bloco que foi apenas minado, mas mesmo um bloco bem confirmado não é, estritamente falando, matematicamente garantido final da forma como um protocolo BFT clássico está comprometido com a decisão. Esta distinção (finalidade determinística versus finalidade probabilística) é suficientemente significativa para justificar o seu próprio capítulo: ver [Finalidade Probabilística](./probabilistic-finality.md).

## Comparando diretamente as duas famílias

| | BFT clássico (por exemplo, PBFT) | Consenso de Nakamoto do Bitcoin |
| --- | --- | --- |
| Composição | Conjunto fixo de participantes conhecidos | Sem permissão, qualquer um pode entrar. |
| Resistência do sibilo | Não é necessário (a adesão é controlada) | Prova de trabalho (custo de falsa influência identitária) |
| Finalidade | Determinação (uma vez cometida, final) | Probabilistic) confiança cresce com confirmações |
| Tolerância típica de falhas | Até ~1/3 dos participantes | Até ~50% do poder de hash (assumindo racional, não apenas honesto, maioria) |
| Padrão de comunicação | Várias rodadas de mensagens diretas entre todos os participantes conhecidos | Transmissão e propagação entre um conjunto desconhecido, mudando de pares |

Esta comparação configura-se [Falhas Bizantinas](./byzantine-faults.md) e [Problema dos generais bizantinos](./byzantine-generals.md) em seguida, que abrangem o modelo adversarial específico, ambas as famílias de protocolo estão tentando sobreviver, [Finalidade Probabilística](./probabilistic-finality.md), que abrange exatamente o que "a confiança cresce com confirmações" significa numericamente.

## Conceitos errôneos comuns

**"Consenso" no sentido Bitcoin não significa todos os votos participantes em cada transação.** Nenhum nó lança um voto explícito; nós validam independentemente contra regras fixas e estendem qualquer que seja a cadeia válida tem o trabalho mais acumulado, o acordo emerge de muitos atores independentes, auto-interessados seguindo a mesma regra determinística, não de um processo de votação explícito.

**O consenso de Nakamoto não é simplesmente "PBFT, mas com a mineração adicionada".** Eles são diferentes famílias de protocolo com diferentes modelos de adesão, diferentes garantias de tolerância a falhas e diferentes propriedades de finalidade, o projeto de Bitcoin precede qualquer tentativa de adaptar protocolos BFT clássicos para configurações sem permissão, e resolve uma versão genuinamente diferente do problema.

## Outras leituras

- [Whitepaper do Bitcoin](https://bitcoin.org/bitcoin.pdf): Seções 4 e 5
- [Tolerância bizantina prática](http://pmg.csail.mit.edu/papers/osdi99.pdf): Castro & Liskov, 1999
- [O Parlamento a tempo parcial](https://lamport.azurewebsites.net/pubs/lamport-paxos.pdf): Leslie Lamport, 1998 (papel Paxos original)

---

[← Anterior: Replicação](./replication.md)
·
[Voltar aos Sistemas Distribuídos](./README.md)
·
[Próximo: Falhas Bizantinas →](./byzantine-faults.md)
