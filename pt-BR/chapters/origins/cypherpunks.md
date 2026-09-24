# O Movimento Cypherpunk

Bitcoin não surgiu de uma empresa, um laboratório universitário, ou um programa de pesquisa do governo. Foi anunciado em uma lista de discussão que tinha passado os dezessete anos anteriores discutindo exatamente sobre o problema resolvido. Este capítulo cobre essa lista de discussão, as pessoas nela, e o argumento político que motivou seu trabalho técnico, porque a própria escolha de Satoshi Nakamoto de onde publicar o whitepaper Bitcoin (a lista de discussão Criptografia, um descendente direto desta cena) não foi incidental.

## Quem eles eram

"Cypherpunk" vem de um trocadilho sobre "cifra" e "cyberpunk", cunhado por Jude Milhon (São Judas) em uma reunião inicial do grupo. O movimento começou na Baía de São Francisco em 1992, quando Eric Hughes, Timothy C. May, e John Gilmore começou uma reunião informal de criptógrafos, programadores e ativistas que se encontraram pessoalmente e, mais consequencialmente, fundou o **Lista de discussão Cypherpunks** no mesmo ano. A lista foi publicada em cypherpunks.venona.com e cypherpunks.to em toda a década de 1990, hospedando milhares de assinantes em seu auge.

O documento fundador do grupo é Eric Hughes. [Manifesto de um Cypherpunk](https://www.activism.net/cypherpunk/manifesto.html), escrito em 1993:

> "Privacy is necessary for an open society in the electronic age. [...] We cannot expect governments, corporations, or other large, faceless organizations to grant us privacy out of their beneficence. [...] We must defend our own privacy if we expect to have any. [...] Cypherpunks write code."
> Eric Hughes, 1993

Essa última linha ("Cypherpunks write code") é o princípio operacional que distingue o grupo de um movimento puramente político. A crença deles era que a privacidade não chegaria através de legislação ou boa vontade corporativa; teria de ser construída e implantada como software de trabalho que tornasse a vigilância e a censura mais difíceis, independentemente do que qualquer governo quisesse. Timothy May's [O Manifesto Anarquista Criptográfico](https://www.activism.net/cypherpunk/crypto-anarchy.html) (1988, circulado antes da lista existir e reposta a ela) colocar o argumento de forma mais radical, prevendo que a criptografia deixaria indivíduos e grupos interagir e negociar "sem saber o nome verdadeiro, ou identidade legal, do outro".

## O que eles construíram e discutiram

A produção técnica da lista ao longo da década de 1990 lê, em retrospecto, como uma lista de peças para Bitcoin, embora nenhum membro da lista tenha montado todas as peças:

- **Reenviadores anônimos** (Eric Hughes, Hal Finney e outros), sistemas para enviar e-mail que despojaram cabeçalhos de identificação, uma aplicação prática precoce das ideias de criptografia em camadas por trás do que mais tarde se tornaria Tor.
- **PGP (Privacidade Muito Boa)**, escrito por Phil Zimmermann em 1991, deu aos usuários comuns acesso à criptografia de chave pública para email. Zimmermann foi investigado pelo governo dos EUA por violações à exportação, porque a criptografia forte foi legalmente classificada como uma munição, fato que a lista tratada como prova de sua alegação fundadora de que os governos resistiriam à criptografia amplamente disponível.
- **Propostas de numerário digital**, discutido longamente abaixo e nos seguintes capítulos: David Chaum [DigiCash](./digicash.md), Adam Back's [Hashcash](./hashcash.md), Wei Dai [b-dinheiro](./b-money.md), e Nick Szabo [Bit Gold](./bit-gold.md).
- **As "Guerras de Cripto"**: a lista organizada ativamente contra as tentativas do governo dos EUA para impor a criptografia backdoor, mais notavelmente o [Chip Clipper](https://en.wikipedia.org/wiki/Clipper_chip) proposta (1993), um chip de encriptação concebido pela NSA com uma chave-chave incorporada do governo-escultura backdoor. A proposta foi retirada em 1996 após a oposição pública e técnica em que os ciferpunks eram participantes proeminentes.

A lista não estava unida em economia ou política além de um compromisso compartilhado com forte criptografia e ceticismo de autoridade centralizada. Os membros variaram de anarco-capitalistas a libertários civis a criptógrafos sem forte afiliação política em tudo. O que uniu a lista foi uma convicção técnica: que a matemática, não a política, era a única maneira confiável de garantir privacidade e resistir à censura, porque uma propriedade matemática detém independentemente de quem está no poder.

## Membros que importam para a história deste livro

- **Hal Finney**: criptógrafo, primeiro funcionário da PGP Corporation, criador de [RPOW](./hashcash.md#de-hashcash-a-rpow) (2004) e o beneficiário do [primeira transação do Bitcoin](./early-bitcoin.md#a-primeira-transação-do-bitcoin) de Satoshi Nakamoto em janeiro de 2009. Finney foi um participante ativo da lista por mais de uma década antes de Bitcoin existir.
- **Adam Back**: inventor de [Hashcash](./hashcash.md) (1997), citada diretamente no whitepaper Bitcoin como referência de prova de trabalho.
- **Wei Dai**: proposta [b-dinheiro](./b-money.md) (1998) num post para a lista; também citado diretamente no whitepaper. A menor denominação do éter, o wei, tem o nome dele.
- **Nick Szabo**: proposta [Bit Gold](./bit-gold.md) (1998) e escreveu extensamente sobre contratos inteligentes e direitos de propriedade digital anos antes da existência de Ethereum (ver [Contratos Inteligentes](../contracts/README.md)).
- **John Gilmore**: co-fundador da Electronic Frontier Foundation, hospedou a infraestrutura do servidor da lista de discussão.
- **Timothy C. May**: Físico Intel, autor do Manifesto Anarquista Crypto, um dos três fundadores da lista.

## Onde se encaixa o Bitcoin

Satoshi Nakamoto postou o whitepaper Bitcoin para o **Lista de discussão de criptografia** (uma lista separada, relacionada moderada por Perry Metzger que tinha herdado grande parte da associação e personagem da lista Cypherpunk depois que a lista original diminuiu no início dos anos 2000) em 31 de outubro de 2008, e anunciou o primeiro lançamento de Bitcoin lá em 9 de janeiro de 2009. O e-mail de anúncio começou:

> "I've been working on a new electronic cash system that's fully peer-to-peer, with no trusted third party. [...] The paper is available at http://www.bitcoin.org/bitcoin.pdf"
> Satoshi Nakamoto, [Cryptography mailing list](https://www.metzdowd.com/pipermail/cryptography/2008-October/014810.html), October 31, 2008

O enquadramento ("sem terceiros confiáveis") é a mesma declaração de problema que a lista Cypherpunk circulava desde 1992. Se Satoshi era um membro da lista de longa data escrevendo sob um pseudônimo, um recém-chegado que tinha absorvido a década da lista de arquivos públicos, ou algo mais, é desconhecido e é coberto diretamente em [Quem era Satoshi Nakamoto?](./satoshi.md)O que está documentado é que a seção de referências do whitepaper cita Hashcash e b-dinheiro pelo nome, e que Satoshi engajou direta e substantivamente com Hal Finney, Adam Back e Wei Dai nas semanas após a publicação, todos os três veteranos lista com mais de uma década de trabalho anterior sobre exatamente este problema.

## Conceitos errôneos comuns

**"Cypherpunk" não é sinónimo de "aficionado por criptomoedas".** O movimento antecede a criptomoeda por mais de quinze anos e estava principalmente preocupado com comunicação criptografada, discurso anônimo e resistência à vigilância. Dinheiro digital foi um dos vários projetos que a lista perseguiu, não seu objetivo definidor.

**Os cypherpunks não eram uma única organização com associação ou liderança.** Era uma lista de discussão aberta; qualquer um poderia se inscrever e postar. Não houve processo de verificação, não houve posição oficial e freqüente discordância pública entre os participantes.

## Outras leituras

- [Manifesto de um Cypherpunk](https://www.activism.net/cypherpunk/manifesto.html): Eric Hughes, 1993
- [O Manifesto Anarquista Criptográfico](https://www.activism.net/cypherpunk/crypto-anarchy.html): Timothy C. Maio, 1988
- [Arquivos da lista de discussão do Cypherpunks](https://cypherpunks.venona.com/) (Arquivo venona)
- [Arquivo de listas de discussão de criptografia, outubro de 2008](https://www.metzdowd.com/pipermail/cryptography/2008-October/thread.html): onde o whitepaper Bitcoin foi anunciado pela primeira vez

---

[← Anterior: Por que o dinheiro digital era difícil](./digital-cash.md)
·
[Voltar às Origens](./README.md)
·
[Próximo: David Chaum e DigiCash →](./digicash.md)
