# Soft forks ativados pelo usuário

Uma Forquilha Soft Ativada pelo Usuário (UASF) é uma forquilha soft ativada pelos operadores de nó que aplicam novas regras em uma data predeterminada, independentemente de os mineradores terem sinalizado suporte suficiente através do mecanismo usual. Este capítulo abrange o conceito e sua instância única, real, historicamente consequencial: [BIP 148](https://github.com/bitcoin/bips/blob/master/bip-0148.mediawiki), parte dos eventos que levaram à ativação da SegWit em 2017.

## O argumento subjacente

[Sinalização Miner](./miner-signaling.md) dá aos mineradores um papel formal na ativação de soft forks, mas [Governança do Bitcoin](./governance.md#os-grupos-com-influência-prática-e-o-que-cada-um-realmente-controla) estabelece que operadores de nós (não mineradores) são os que decidem quais regras realmente são aplicadas, uma vez que nós completos validam blocos independentemente do comportamento dos mineradores. Um UASF torna este ponto estrutural operacional: proponentes argumentam que se um soft fork tem amplo apoio entre os operadores de nó e o ecossistema econômico mais amplo, mas está sendo especificamente bloqueado por sinalização insuficiente de mineradores, os operadores de nó podem simplesmente comprometer-se, com antecedência, a um dia de bandeira após o qual eles rejeitarão blocos não seguindo as novas regras, criando forte pressão econômica para os mineradores cumprirem (já que mineradores produzindo blocos não conformes após essa data teriam esses blocos rejeitados por cada nó de reforço da UASF, tornando-os comercialmente inúteis) sem esperarem no minerador sinalizando para atingir seu limite primeiro.

## BIP 148: o processo SegWit 2017

Em meados de 2017, SegWit ([BIP 141](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki)) estavam prontos e amplamente discutidos durante um período alargado, mas a sinalização dos mineradores ao abrigo do mecanismo normal BIP 9 (ver [Sinalização Miner](./miner-signaling.md#o-processo-de-ativação)) tinham estagnado muito abaixo do limiar de 95%, no âmbito de uma disputa mais ampla e relacionada com a dimensão dos blocos cobertos integralmente por [Debate sobre o Tamanho do Bloco](./block-size-war.md). Em resposta, um desenvolvedor pseudônimo escrevendo como "shaolinfry" (identidade real não documentada e, na medida em que este livro pode verificar, ainda desconhecido) propôs BIP 148 em março de 2017, comprometendo nós de suporte para começar a rejeitar blocos que não sinalizam prontidão SegWit começando em uma data fixa, **1 de agosto de 2017**, independentemente de qual era a porcentagem de sinalização global naquele momento.

## O que realmente aconteceu?

A ameaça credível de uma divisão orientada pela UASF (combinada com uma iniciativa industrial separada e relacionada (o Acordo de Nova Iorque, discutido em [SegWit2x](./segwit2x.md)) é amplamente creditado com mineradores motivadores para aumentar a sinalização SegWit antes do prazo BIP 148 chegou. Por último, a SegWit foi bloqueada através do mecanismo padrão BIP 9 pouco antes de 1 de agosto de 2017, atingindo o limiar exigido através da sinalização normal, em vez de através das regras do BIP 148, que precisam, na prática, produzir efeitos e rejeitar blocos de não-sinalização. Separadamente, e por volta do mesmo período, **Bitcoin Cash** dividido como sua própria cadeia em 1 de agosto de 2017, um evento relacionado, mas distinto, abrangido pelo seu próprio capítulo, [Bitcoin Cash](./bitcoin-cash.md), impulsionado pelo desacordo sobre a questão do tamanho do bloco, em vez de pelo BIP 148 especificamente.

## Por que a UASF é um precedente de governança significativo, independente deste caso

Se as regras específicas do BIP 148 alguma vez produziram efeitos sobre os blocos vivos, a sua existência e o compromisso credível por trás disso demonstraram, concretamente, que os operadores de nós possuem colectivamente uma alavancagem real e exequível sobre a activação do protocolo, não apenas um veto teórico, tal como discutido abstratamente em [Governança do Bitcoin](./governance.md), mas um mecanismo de coordenação que historicamente parece ter produzido resultados observáveis no comportamento minerador. Isso é citado por diferentes partes da comunidade Bitcoin de maneiras diferentes, às vezes conflitantes: alguns tratam-na como uma prova de validação de que "usuários", amplamente interpretados, finalmente governam Bitcoin; outros notam que o próprio apoio do BIP 148 veio substancialmente de um subconjunto específico, vocal, tecnicamente engajado da comunidade, e cautela contra generalizar muito prontamente de um episódio histórico sobre como as disputas de governança irão se resolver no futuro. Este livro apresenta a sequência de eventos como documentado acima, sem endossar qualquer interpretação mais ampla como resolvido.

## Conceitos errôneos comuns

**As regras do BIP 148 não precisavam, no final, de rejeitar ativamente quaisquer blocos na rede principal.** na prática, porque a sinalização atingiu o limite exigido antes de 1o de agosto de 2017 chegou. Isso às vezes é descrito vagamente como "o UASF funcionou", o que é preciso no sentido de que a ameaça credível atingiu o seu objetivo, mas não deve ser confundido com uma alegação de que BIP 148-aplicando nós estavam rejeitando amplamente blocos reais em números significativos como uma questão de operação de rotina.

**A UASF não é um mecanismo de finalidade geral disponível para qualquer litígio em qualquer momento**. O BIP 148 foi uma proposta específica, deliberadamente organizada, coordenada em resposta a uma ativação específica parada; o rótulo descreve uma estratégia que os operadores de nós poderiam, em princípio, empregar novamente em diferentes circunstâncias, e não em pé, recurso automático de protocolo.

## Outras leituras

- [BIP 148: Activação obrigatória da implantação de segwit](https://github.com/bitcoin/bips/blob/master/bip-0148.mediawiki)
- Ver também: [Debate sobre o Tamanho do Bloco](./block-size-war.md), [SegWit](../bitcoin/segwit.md)

---

[← Anterior: Sinalização Miner](./miner-signaling.md)
·
[Voltar às atualizações de forks e protocolos](./README.md)
·
[Próximo: Bitcoin Cash →](./bitcoin-cash.md)
