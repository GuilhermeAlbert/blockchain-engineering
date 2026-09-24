# Economia austríaca e Bitcoin

Os capítulos anteriores abrangem [Menger](./menger.md), [Miseráveis](./mises.md), [Hayek](./hayek.md), e [Rothbard](./rothbard.md) em seus próprios termos, cada anotando explicitamente onde escritores posteriores projetaram interpretações da era Bitcoin em argumentos que esses economistas fizeram antes de Bitcoin existir. Este capítulo é onde essas interpretações são abordadas diretamente, não para demiti-las, mas para separar três categorias distintas de reivindicação que se misturam rotineiramente na escrita popular: **(1) o que esses economistas realmente argumentaram**, **(2) como os defensores mais tarde Bitcoin aplicaram esse raciocínio para Bitcoin**, e **3) As críticas a estes pedidos**, incluindo críticas de dentro da própria tradição austríaca.

## Por que a economia austríaca e Bitcoin acabaram ligados

A ligação não é acidental ou puramente retórica. Vários membros da comunidade e escritores influentes de Bitcoin foram explicitamente influenciados pela economia austríaca, e a própria escrita de Satoshi Nakamoto mostra algum engajamento direto com essas ideias, mais notavelmente, o post do fórum da Fundação P2P de Satoshi 2009 explicando a origem de Bitcoin cita a crise bancária de 2008 e critica a moeda gerenciada pelo banco central em linguagem que ecoa críticas austríacas de moeda fiduciária e reservas fracionárias bancárias:

> "The root problem with conventional currency is all the trust that's required to make it work. The central bank must be trusted not to debase the currency, but the history of fiat currencies is full of breaches of that trust."
> Satoshi Nakamoto, [P2P Foundation forum post](http://p2pfoundation.ning.com/forum/topics/bitcoin-open-source), February 11, 2009

A própria escrita de Satoshi expressa preocupações estruturalmente semelhantes às críticas monetárias austríacas. O que não está documentado no registro público é uma citação de Satoshi para Menger, Mises, Hayek ou Rothbard, ou confirmação de que Satoshi tinha lido diretamente. A sobreposição suporta uma comparação de ideias, não uma reivindicação de linhagem intelectual.

## Pedido por pedido

### "O Bitcoin cumpre a teoria de Menger sobre o surgimento do dinheiro"

**O que Menger realmente argumentou:** que o dinheiro emerge espontaneamente do mercado de mercadorias por vendabilidade, sem concepção central (ver [Carl Menger e a Origem do Dinheiro](./menger.md)).

**A aplicação Bitcoin-era:** Os defensores de Bitcoin argumentam que seu padrão de adoção (nenhuma empresa ou governo designá-lo como dinheiro, adoção espalhando-se através de escolhas individuais, descentralizadas para aceitá-lo e segurá-lo) é uma demonstração em tempo real, ao vivo de exatamente o processo Menger descrito no resumo para commodities históricas.

**A crítica:** A adoção inicial de Bitcoin também foi impulsionada por fatores que o framework de Menger não aborda diretamente (compromisso ideológico entre os primeiros adotantes cypherpunk-adjacentes, expectativas especulativas de valorização de preços, e demanda de mercado criminal nos primeiros anos de Bitcoin (ver [KYC e AML](../society/kyc-aml.md)) significando que o caso não é um teste limpo, controlado da teoria de Menger em isolamento destes outros motoristas.

### "O Bitcoin prova o teorema da regressão, ou refuta-o"

Coberto na íntegra em [O Teorema da Regressão](./regression-theorem.md): este é um debate vivo e não resolvido, mesmo entre economistas austríacos, não uma aplicação estabelecida em qualquer direção.

### "Hayek previu Bitcoin"

**O que Hayek realmente argumentou:** que suprime o monopólio público sobre a emissão de moeda e permita a concorrência, emitida em privado, *gestão activa* moedas produziriam melhores resultados monetários do que um monopólio estatal (ver [Friedrich Hayek e Moedas Competitivas](./hayek.md)).

**A diferença:** As moedas propostas por Hayek deveriam ser geridas ativamente para a estabilidade de preços por emitentes responsáveis, o oposto do projeto de fornecimento fixo não gerenciado de Bitcoin. Chamar Bitcoin de "visão de Hayek realizada" requer ignorar este requisito de design específico, declarado na própria proposta de Hayek.

### "Rothbard teria apoiado Bitcoin"

**O que Rothbard realmente argumentou:** que um regresso a uma moeda estritamente reembolsável a 100% e reembolsável a ouro era a solução correcta para os problemas do dinheiro fiduciário e do banco de reserva fraccionado (ver [Murray Rothbard e Dinheiro Som](./rothbard.md)).

**A diferença:** O remédio proposto por Rothbard foi o suporte físico de commodities, não um mecanismo de escassez computacional. Se Rothbard teria visto a escassez baseada na prova de trabalho de Bitcoin como um substituto adequado para suporte de ouro físico é desconhecido. Morreu em 1995 e nunca abordou a questão. Alguns economistas mais tarde influenciados pela Áustria (incluindo escritores que publicam através de tomadas alinhadas à Áustria) argumentaram que a hostilidade subjacente de Rothbard em relação à moeda gerenciada centralmente, não apoiada, provavelmente teria feito com que ele simpatizasse com os objetivos de Bitcoin, mesmo sem apoio físico; outros notam seu ceticismo explícito, em outros lugares em sua escrita, de esquemas monetários puramente baseados na confiança cortam a outra maneira. Ambas as leituras são inferências especulativas, não posições documentadas, e este livro não julga entre elas.

## O que a tradição austríaca contribui para a compreensão de Bitcoin, independentemente da questão "ela previu"

Deixando de lado os debates históricos de atribuição acima, a tradição austríaca fornece ferramentas analíticas genuinamente úteis que capítulos posteriores deste livro usam diretamente, independentemente de qualquer economista austríaco individual ter endossado Bitcoin especificamente:

- **Quadro de venda de Menger** para analisar como e por que um bem se torna mais amplamente aceito ao longo do tempo (utilizado em [Efeitos da Rede em Dinheiro](./network-effects.md)).
- **A crítica geral dos efeitos de distribuição da política monetária discricionária**, desenvolvido mais plenamente por Mises e Rothbard, que é diretamente aplicável para comparar a emissão fixa de Bitcoin contra qualquer moeda gerenciada discricionariamente, independente de se Bitcoin especificamente é a alternativa "correta" (utilizada em [O Efeito Cantillon](./cantillon-effect.md)).
- **Teoria mais ampla de Hayek da ordem espontânea e coordenação descentralizada da informação**, que se estende utilmente para além do dinheiro especificamente para a compreensão de sistemas descentralizados em geral, incluindo os mecanismos de consenso distribuídos abrangidos [Sistemas distribuídos](../distributed-systems/README.md).

## A posição deste livro

A economia austríaca influenciou genuinamente o ambiente intelectual de onde Bitcoin surgiu e continua a influenciar como uma parte significativa da comunidade Bitcoin entende e fala sobre o sistema. Essa influência é um fato histórico documentado. Afirmações específicas que os economistas austríacos endossaram, previram ou teriam endossado Bitcoin são, sem exceção, interpretações posteriores feitas após a morte de cada economista (nos casos de Mises, Menger e Rothbard) ou sem seu envolvimento direto com Bitcoin (no caso de Hayek, que morreu em 1992). Este livro apresenta a influência como real e as reivindicações de endosso como inverificáveis, e incentiva os leitores a encontrar fortes reivindicações em qualquer direção para verificá-las contra os próprios textos primários dos economistas, vinculados ao longo desta seção.

## Conceitos errôneos comuns

**"Economia austríaca" não é sinônimo de "pró-Bitcoin".** É uma escola específica, internamente diversificada de pensamento econômico com desacordos entre seus próprios principais números (ver o livre-bancário versus 100%-reservar desacordo em [Capítulo de Rothbard](./rothbard.md#rothbard-sobre-a-banca-de-reservas-fraccionadas)), a maioria dos quais trabalhos de fundação antecede Bitcoin por décadas a mais de um século.

**As influências documentadas de Satoshi eram mais amplas do que a economia austríaca.** O post da Fundação P2P citado acima mostra claro ceticismo em política monetária, mas o trabalho técnico de Satoshi se baseia tão diretamente na tradição ciferpunk e criptográfica [Origens](../origins/README.md), que tinha seu próprio conjunto distinto de motivações políticas e técnicas não redutíveis a qualquer escola única de economia.

## Outras leituras

- [Fórum da Fundação P2P, anúncio original de Satoshi Nakamoto](http://p2pfoundation.ning.com/forum/topics/bitcoin-open-source): 11 de fevereiro de 2009
- Todas as fontes primárias ligadas em [Menger](./menger.md), [Miseráveis](./mises.md), [Hayek](./hayek.md), e [Rothbard](./rothbard.md)

---

[← Anterior: Dinheiro duro e dinheiro de som](./sound-money.md)
·
[Voltar à Economia](./README.md)
·
[Próximo: Perspectivas Keynesianas →](./keynesian-perspectives.md)
