# Teorema da PAC

O teorema CAP é um resultado fundamental na teoria de sistemas distribuídos afirmando que um sistema de dados distribuídos não pode simultaneamente garantir todos os três de consistência, disponibilidade e tolerância à partição. Ele pode fornecer no máximo dois em cada três em um dado momento uma partição de rede está realmente ocorrendo. Este capítulo cobre o teorema precisamente, em seguida, aplica-o diretamente para Bitcoin, o que faz uma escolha específica, identificável entre os tradeoffs o teorema descreve.

## As três propriedades, definidas com precisão

- **Coerência**: cada leitura recebe a escrita mais recente, ou um erro, todos os nós veem os mesmos dados ao mesmo tempo. (Nota: este é um significado diferente, mais rigoroso de "consistência" do que o C no acrônimo de banco de dados não relacionado ACID; consistência da PAC significa especificamente todos os nós concordam sobre o estado atual.)
- **Disponibilidade**: cada solicitação a um nó não-falha recebe uma resposta, o sistema não se recusa a responder, mesmo que essa resposta não possa refletir a escrita mais recente.
- **Tolerância de partição**: o sistema continua a operar apesar de um número arbitrário de mensagens ser largado ou atrasado entre nós, a **partição de rede**, onde a rede se divide em grupos que não podem se comunicar por algum período.

## A alegação real do teorema

O cientista da computação Eric Brewer propôs pela primeira vez a conjectura da PAC em uma palestra de 2000, e Seth Gilbert e Nancy Lynch formalmente a provaram em 2002. A alegação precisa: **na presença de uma partição de rede, um sistema distribuído deve escolher entre consistência e disponibilidade**. Não pode fornecer ambos simultaneamente durante a partição. Se um sistema escolhe consistência durante uma partição, alguns nós devem se recusar a responder (ou deve responder com um erro) em vez de arriscar retornar dados obsoletos ou conflitantes. Se um sistema escolhe disponibilidade durante uma partição, ele deve permitir que cada nó continue respondendo, o que significa que partes diferentes e desconectadas da rede podem acabar com visões diferentes e inconsistentes dos dados até que a partição cure.

Uma leitura errada comum do teorema trata-o como "escolha qualquer dois dos três, sempre", mas a tolerância à partição não é realmente opcional para qualquer sistema distribuído do mundo real abrangendo mais de uma localização física, uma vez que partições de rede (um cabo cortado, uma falha de roteador, uma falha regional) são um fato de operar sobre redes reais, não uma hipótese que você pode arquiteto longe. O teorema é mais precisamente entendido como: **dado que as partições irão acontecer, você deve escolher, durante a duração da partição, entre consistência e disponibilidade**Descreve uma troca genuína e inevitável sob uma condição específica do mundo real, não um menu de configurações permanentes igualmente viáveis.

## Onde está o Bitcoin

Bitcoin faz uma escolha clara, identificável: é um **Sistema AP** durante uma partição, disponível, não estritamente consistente. Quando a rede Bitcoin experimenta uma partição (que acontece rotineiramente em pequena escala simplesmente devido ao atraso de propagação normal em uma rede global, e poderia, em princípio, acontecer mais severamente durante uma grande ruptura da internet), nós de cada lado da partição continuam operando, continuam aceitando e retransmitindo transações, e mantêm a mineração e estendendo sua própria visão da cadeia. O sistema não para e se recusa a processar qualquer coisa só porque ele não pode atualmente alcançar todos os outros nós. Isto é exatamente o que produz [Reorganizações da Cadeia](../blockchain/reorgs.md): duas partes desconectadas (ou mesmo apenas lentas para comunicar) da rede podem temporariamente construir cadeias diferentes, individualmente válidas, e uma vez que a partição cicatriza, a rede converge descartando a cadeia mais curta (menos cumulativa) em favor da mais longa, por [regra de escolha do fork](../blockchain/fork-choice.md).

É precisamente por isso que Bitcoin não oferece consistência clássica, instantânea, em qualquer momento, diferentes nós podem ter visões ligeiramente diferentes dos blocos mais recentes, e o que conta como "a verdade" só é estabelecido com crescente confiança à medida que mais confirmações se acumulam (ver [Finalidade Probabilística](./probabilistic-finality.md)). O Bitcoin negocia um acordo rigoroso e sempre consistente para um sistema que continua funcionando e aceita transações mesmo quando partes da rede temporariamente não conseguem se comunicar totalmente, uma escolha de design deliberada e documentada, não um descuido.

## Exemplo: como isso acontece mecanicamente

```text
Before partition:  All nodes agree chain tip is Block 100.

Partition occurs — network splits into Group A and Group B, unable to communicate.

Group A mines Block 101a, then 102a.  ──►  Group A believes tip = 102a
Group B mines Block 101b.             ──►  Group B believes tip = 101b

Both groups remain AVAILABLE throughout — every node keeps accepting
transactions and extending its own view. Neither group halts.
The network is temporarily INCONSISTENT: A and B disagree about the tip.

Partition heals — Group B receives Group A's chain, sees it has more
cumulative proof-of-work (two blocks vs one), and adopts it, discarding
Block 101b (which becomes an orphaned/stale block — see Chain Reorganizations).

Consistency is restored, retroactively, once the partition ends.
```

## Comércio

Escolher disponibilidade sobre consistência estrita significa que Bitcoin nunca pode oferecer o tipo de finalidade instantânea e incondicional um sistema estritamente consistente (como um banco de dados monomaster tradicional, ou um protocolo clássico bizantino tolerante à falha operando entre um pequeno conjunto de nós sempre conectado) pode oferecer em condições normais. É por isso que estamos à espera [confirmações](../bitcoin/confirmation.md) é prática padrão em vez de tratar um único bloco como imediatamente, permanentemente final. Em troca, o Bitcoin ganha um sistema que continua a funcionar através de condições de rede (partições, atrasos, churn de nó) que faria com que um sistema estritamente consistente parasse ou rejeitasse solicitações até que a partição resolvesse, uma vantagem significativa para uma rede de pagamento global, sem permissão, sempre-em sem operador central que poderia coordenar uma pausa graciosa durante uma partição.

## Conceitos errôneos comuns

**Os tradeoffs do teorema CAP não são uma escolha arquitetônica fixa e permanente que um sistema faz uma vez.** Eles descrevem o que acontece especificamente *durante* uma partição ativa. Um sistema pode, e se comporta, com total consistência e disponibilidade simultaneamente durante a operação normal quando nenhuma partição está ocorrendo; o tradeoff só morde quando uma partição realmente acontece.

**Escolher disponibilidade sobre consistência não significa que o Bitcoin não tenha garantias de consistência.** Significa que a consistência é eventual e probabilística em vez de instantânea e absoluta. O sistema converge para uma única história acordada, apenas não necessariamente no instante em que um bloco é criado, e com as garantias probabilísticas específicas cobertas em [Finalidade Probabilística](./probabilistic-finality.md).

## Outras leituras

- [Conjectura de Brewer e a viabilidade de serviços web consistentes, disponíveis e tolerantes à partição](https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer2.pdf): Gilbert & Lynch, 2002 (a prova formal)

---

[← Anterior: Ataques de Sybil](./sybil-attacks.md)
·
[Voltar aos Sistemas Distribuídos](./README.md)
·
[Próximo: Finalidade →](./finality.md)
