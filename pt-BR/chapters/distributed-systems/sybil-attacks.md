# Ataques de Sybil

Um ataque Sybil é um ataque onde um único partido cria muitas identidades falsas para ganhar influência desproporcional sobre um sistema que assume que cada identidade representa um participante independente. Este capítulo cobre o ataque em termos gerais e explica, precisamente, por que é o problema específico do mecanismo de prova de trabalho de Bitcoin é projetado para derrotar, uma conexão que o próprio whitepaper desenha explicitamente.

## O nome e o problema geral

O termo vem do livro de 1973 *Sybil*, sobre uma mulher diagnosticada com transtorno dissociativo de identidade, apresentando tantas personalidades distintas. O nome foi adotado para esta classe de ataque em um artigo de 2002 por John R. Douceur na Microsoft Research, que formalmente analisou o problema dos sistemas peer-to-peer.

O problema geral: muitos sistemas distribuídos tomam decisões por alguma forma de contar participantes. Um voto, um cheque por maioria, uma pontuação de reputação baseada em quantos pares distintos atestam algo. Se criar uma nova identidade é barato (um novo endereço de e-mail, um novo endereço IP, um novo nome de usuário), um único adversário pode criar um número arbitrariamente grande de identidades falsas e usá-las para superar, superar o número, ou de outra forma dominar os participantes honestos, mesmo que haja realmente apenas um partido contraditório por trás de todos eles. O artigo de Douceur prova um resultado bastante claro: sem alguma autoridade confiável e centralizada, nenhum sistema pode ser totalmente imune aos ataques de Sybil se a própria criação de identidade for desconstraída e livre. A defesa tem que vir de fazer identidade, ou influência, caro de alguma outra forma.

## Por que isso ameaça especificamente o consenso sem permissão

Recordar de [Consenso](./consensus.md#duas-dimensões-de-dificuldade) que a restrição mais difícil do projeto de Bitcoin, em comparação com o consenso distribuído clássico, é **membro sem permissão**Qualquer pessoa pode entrar na rede a qualquer momento, sem registro ou verificação. Esta é exatamente a condição sob a qual os ataques de Sybil são mais perigosos: se o mecanismo de consenso de Bitcoin contasse "um nó, um voto" para decidir qual cadeia é válida, um atacante poderia simplesmente executar milhares de nós (trivial e quase livre de fazer, girando instâncias de software custa muito pouco) e usar essa maioria falsa para ter a rede aceitar uma versão fraudulenta do histórico, como uma que contém uma transação revertida e duplamente gasta.

## Defesa específica do Bitcoin

O whitepaper Bitcoin aborda isso diretamente, na mesma passagem que introduz a prova de trabalho como mecanismo de consenso:

> "The proof-of-work also solves the problem of determining representation in majority decision making. If the majority were based on one-IP-address-one-vote, it could be subverted by anyone able to allocate many IPs. Proof-of-work is essentially one-CPU-one-vote."
> Satoshi Nakamoto, [Bitcoin whitepaper](https://bitcoin.org/bitcoin.pdf), Section 4

O mecanismo: em vez de contar identidades, o Bitcoin conta **trabalho computacional realmente realizado**. Criar uma nova identidade de nó é livre, mas essa identidade não ganha influência sobre qual cadeia a rede aceita, a menos que ela também possa produzir prova de trabalho válida, e produzir prova de trabalho custa eletricidade real e hardware, independentemente de quantas "identidades" separadas (endereços IP, instâncias de nó) o atacante divide seu esforço. Um atacante com 10% do poder de haxixe total da rede tem aproximadamente 10% da influência sobre a criação de blocos, se essa potência de haxixe corre atrás de um nó ou dez mil nós falsos, dividindo o poder de haxixe em mais identidades não fabrica qualquer poder computacional adicional a partir de nada.

Esta é a razão precisa, mecânica prova do trabalho é descrita como **"uma-CPU-uma-votação"** em vez de "one-node-one-vote" ou "one-IP-one-vote": peso de votação é ligado a um recurso (computação) que não pode ser duplicado barato da forma como as identidades de rede podem.

## Exemplo: por que isso importa concretamente

Imagine que um atacante quer convencer a rede de que um histórico de transações fraudulentas é legítimo. Sem resistência Sybil, se o consenso fosse baseado na contagem de quantos nós afirmam que uma determinada cadeia é válida, o atacante poderia girar um milhão de máquinas virtuais baratas, cada um executando um nó que afirma que a cadeia fraudulenta está correta, superando instantaneamente as reivindicações dos nós genuinamente honestos. Com consenso baseado em prova de trabalho, o atacante precisa controlar o poder computacional real suficiente para superar o esforço combinado da rede honesta, um custo medido em hardware real e eletricidade que escala com a força necessária do ataque, não algo que pode ser fabricado simplesmente executando mais instâncias de software. É por isso que [51% Ataques](../bitcoin/51-percent-attacks.md) são nomeados para uma percentagem de potência de hash, não uma percentagem de contagem de nós.

## Onde a resistência de Sybil aparece em outro lugar neste livro

Prova de trabalho não é o único mecanismo Sybil-resistência coberto neste livro, [Prova de Participação](../ethereum/proof-of-stake.md), utilizado por Ethereum desde [The Merge](../ethereum/the-merge.md), alcança o mesmo objetivo através de um recurso oneroso diferente: capital economicamente apostado em vez de trabalho computacional, discutido plenamente na seção Ethereum. Ambos os mecanismos compartilham a mesma lógica subjacente identificada aqui, peg influência para algo genuinamente caro para adquirir em grandes quantidades, de modo que a criação de identidades falsas adicionais não fornece influência adicional em si mesmo.

## Comércio

Resistir aos ataques de Sybil através de um recurso caro (computação ou participação) é eficaz, mas significa necessariamente que a influência sobre a rede é proporcional à riqueza ou recursos, não ao número de participantes humanos distintos. Um grande ator bem financiado pode legitimamente adquirir mais peso de votação do que muitos pequenos participantes individuais combinados, simplesmente por ter mais recursos para se comprometer. Trata-se de uma propriedade estrutural documentada de ambos os sistemas de prova de trabalho e de prova de participação, não uma falha única para nenhum dos dois, e faz parte do mais amplo [descentralização](../governance/README.md) a discussão abordada na seção Governança deste livro, resistência de Sybil e influência perfeitamente igual por participante humano estão, em um sistema sem permissão, em tensão entre si.

## Conceitos errôneos comuns

**Um ataque Sybil não é a mesma coisa que um ataque de 51%.**, embora os dois estão intimamente relacionados. Um ataque Sybil é a estratégia geral de criar muitas identidades falsas; um ataque de 51% é o cenário específico de Bitcoin onde um atacante ganha a maioria do poder de hash (que prova de trabalho torna resistente a ser alcançado através de identidades falsas sozinho), ver [51% Ataques](../bitcoin/51-percent-attacks.md).

**Criar vários endereços ou carteiras Bitcoin não é um ataque Sybil** e não acarreta riscos especiais para a rede. Usuários comuns criam muitos endereços rotineiramente por razões de privacidade (ver [Endereços](../wallets/addresses.md)). O ataque diz especificamente respeito a criar falsa influência sobre *consenso*, não apenas segurando vários endereços.

## Outras leituras

- [O ataque de Sybil](https://www.microsoft.com/en-us/research/wp-content/uploads/2002/01/IPTPS2002.pdf): John R. Douceur, Microsoft Research, 2002
- [Whitepaper Bitcoin, Seção 4](https://bitcoin.org/bitcoin.pdf)

---

[← Anterior: Problema dos generais bizantinos](./byzantine-generals.md)
·
[Voltar aos Sistemas Distribuídos](./README.md)
·
[Próximo: PAC Teoria →](./cap.md)
