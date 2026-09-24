# SegWit2x

SegWit2x foi uma atualização planejada de duas partes (ativação SegWit seguida de um aumento de tamanho de bloco para 2 MB via fork rígido) apoiado por um acordo de indústria maio 2017, cuja segunda metade foi **cancelado em 8 de novembro de 2017**, dias antes de sua ativação planejada. Este capítulo cobre o acordo, por que a porção dura do fork foi finalmente cancelada, e o que seu cancelamento demonstra sobre a governança de Bitcoin na prática.

## O Acordo de Nova Iorque

Em maio de 2017, em uma reunião realizada durante a conferência do Consenso em Nova York, um grupo de empresas, mineradores e participantes da indústria (representando, por conta própria dos organizadores, uma parte substancial do poder de hash de mineração do Bitcoin e negócios de processamento de transações na época) assinou um acordo (informalmente chamado de "Acordo de Nova Iorque", ou NYA) comprometendo-se a um plano específico de duas etapas: ativar SegWit via sinalização minerador, seguido cerca de três meses depois por um hard fork duplicando o limite de tamanho do bloco para 2 MB. Esta foi, explicitamente, uma tentativa de ponte as duas posições descritas em [Debate sobre o Tamanho do Bloco](./block-size-war.md), dando aos partidários do SegWit o seu aumento de capacidade de soft fork, dando também aos partidários de tamanho de bloco directo o maior limite de base que tinham defendido.

## Porque se desfez

Apesar do apoio do acordo de importantes interesses de mineração e negócios, ele não teve o apoio de uma grande parte da própria comunidade desenvolvedora de Bitcoin Core, nem de uma parte significativa do ecossistema mais amplo nó-operante e usuário, muitos dos quais viram o próprio processo (um acordo alcançado entre um grupo comparativamente pequeno, auto-selecionado de empresas e mineradores, sem o processo mais amplo de consenso áspero descrito em [Governança do Bitcoin](./governance.md)) como uma forma inadequada de decidir uma mudança de regras de consenso, independentemente do que eles pensaram do aumento de 2 MB em seus próprios méritos técnicos. À medida que a data planejada de ativação do fork rígido de novembro se aproximava, tornou-se cada vez mais claro que uma grande parcela de operadores de nó e participantes economicamente significativos não tinha a intenção de executar o software compatível com SegWit2x, o que significa que o hard fork arriscou produzir outra divisão de cadeia contenciosa (semelhante a, e logo após, a divisão Bitcoin Cash) em vez da transição suave e unificadora que seus organizadores haviam pretendido.

## O cancelamento

Ligado **8 de novembro de 2017**, os organizadores do SegWit2x anunciaram que estavam suspendendo o fork rígido planejado, citando uma falta de consenso suficiente para proceder com segurança. Especificamente afirmando que o objetivo tinha sido evitar uma divisão de rede contenciosa, e que prosseguir sem acordo mais amplo funcionaria contra esse objetivo em vez de para ele. A parte da SegWit do plano original já havia sido ativada com sucesso em agosto de 2017 (através do processo abordado em [Soft forks ativados pelo usuário](./uasf.md)); foi especificamente o segundo aumento do tamanho do bloco de hard fork que foi cancelado.

## Por que este episódio importa para entender a governança de Bitcoin

SegWit2x é uma ilustração clara e concreta do ponto estrutural em geral [Governança do Bitcoin](./governance.md#controles-das-alterações-unilaterais): mesmo um acordo apoiado por empresas e mineradores que representam substancial peso econômico e de hash power não poderia, por si só, forçar uma mudança de regras de consenso em uma rede cujos operadores de nó e ecossistema mais amplo não convergiram independentemente em apoiá-lo. Isso é apresentado por diferentes observadores como evidência de coisas diferentes, alguns vêem como prova de que a governança de Bitcoin resiste genuinamente à captura por interesses econômicos concentrados, não importa o quão bem organizados; outros notam que o episódio também revelou real atrito e falta de processo institucionalizado para resolver esse tipo de discordância, uma vez que o resultado dependia fortemente da pressão social e técnica informal e não de qualquer mecanismo definido e previsível. Este livro apresenta a sequência documentada de eventos e deixa o julgamento interpretativo mais amplo ao leitor.

## Conceitos errôneos comuns

**SegWit2x não é o mesmo evento que a divisão Bitcoin Cash**, embora ambas resultem da mesma disputa de dimensão de blocos subjacente e ambas estejam estreitamente associadas ao mesmo período de meados de 2017. SegWit2x foi uma tentativa de manter todo o ecossistema em uma cadeia através de um plano coordenado e sequenciado; Bitcoin Cash foi um grupo que optou por se separar completamente ao invés de esperar ou participar desse plano coordenado.

**O cancelamento do fork rígido SegWit2x não foi um cancelamento do próprio SegWit**. SegWit já havia ativado separadamente e com sucesso meses antes da data planejada da porção de hard fork, e continua fazendo parte do protocolo de Bitcoin hoje (ver [SegWit](../bitcoin/segwit.md)).

## Outras leituras

- Ver também: [Debate sobre o Tamanho do Bloco](./block-size-war.md), [Governança do Bitcoin](./governance.md), [Soft forks ativados pelo usuário](./uasf.md)

---

[← Anterior: Bitcoin SV](./bitcoin-sv.md)
·
[Voltar às atualizações de forks e protocolos](./README.md)
·
[Próximo: O debate do tamanho do bloco →](./block-size-war.md)
