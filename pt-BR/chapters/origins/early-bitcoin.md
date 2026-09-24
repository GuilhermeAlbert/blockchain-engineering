# Histórico inicial do Bitcoin

Entre a publicação do whitepaper em outubro de 2008 e a última correspondência conhecida de Satoshi em abril de 2011, Bitcoin passou de uma proposta de nove páginas para uma rede em execução com desenvolvedores independentes, trocas e um preço de mercado. Este capítulo abrange esse trecho (o primeiro lançamento, a primeira transação, a primeira atividade de mineração e desenvolvimento e a partida de Satoshi) como história documentada, distinta das questões de design abordadas em [O whitepaper Bitcoin](./bitcoin-whitepaper.md) e as questões de identidade [Quem era Satoshi Nakamoto?](./satoshi.md).

## Bitcoin v0.1

Satoshi lançou a primeira versão do software Bitcoin, v0.1.0, em **9 de janeiro de 2009**, anunciando-o na lista de discussão Criptografia com um link para baixar o cliente e o whitepaper. O anúncio descreveu claramente o software:

> "The root problem with conventional currency is all the trust that's required to make it work. [...] Bitcoin's solution is to use a peer-to-peer network to check for double-spending."
> Satoshi Nakamoto, [Cryptography mailing list](https://www.metzdowd.com/pipermail/cryptography/2009-January/015010.html), January 9, 2009

A recepção inicial na lista foi mista e, em lugares, abertamente cética. O criptografista James A. Donald respondeu cedo no thread expressando dúvida de que o sistema poderia escalar para uma rede grande, não confiável, e crescendo rapidamente peer-to-peer sem coordenação central, uma preocupação técnica justa na época, uma vez que nenhum sistema deste tipo tinha sido implantado e provado em escala antes. Satoshi respondeu a objeções técnicas específicas em detalhes nas semanas seguintes, um padrão de engajamento que continuou à medida que os adotantes mais cedo se juntaram.

## A primeira transação do Bitcoin

[Hal Finney](./cypherpunks.md#membros-que-importam-para-a-história-deste-livro) baixou o cliente no dia do lançamento, 9 de janeiro de 2009, tornando-se (baseado no registro público) a segunda pessoa a executar o software Bitcoin após Satoshi. Finney descreveu, em 2013, um post do fórum Bitcoin Talk escrito após o seu diagnóstico de ELA ter progredido, executando o cliente e blocos de mineração com Satoshi nos primeiros dias do Bitcoin, observando a mineração somente de CPU desse período tornou possível para um computador comum encontrar blocos.

Ligado **12 de janeiro de 2009**, Satoshi enviou Finney **10 BTC** na transação registada em **bloco 170**, a primeira transação Bitcoin entre duas partes distintas, ao contrário de uma recompensa de base de moeda paga ao minerador que encontrou o bloco. Esta transação é frequentemente citada como prova de que o mecanismo de transferência peer-to-peer do Bitcoin funcionou como projetado, independente do próprio processo de mineração.

## Extracção precoce

Durante aproximadamente o primeiro ano, a mineração Bitcoin foi executada em CPUs comuns usando código embutido no cliente de referência. Com poucos participantes, dificuldade (ver [Dificuldade em Mineração](../bitcoin/difficulty.md)) permaneceu em ou perto de seu protocolo mínimo por meses. O pesquisador Sergio Demian Lerner identificou um padrão recorrente em nonces e timestamps de blocos iniciais, muitas vezes chamado de "padrão de Patoshi", que é consistente com um minerador produzindo uma grande parcela de blocos iniciais. O padrão é uma inferência de dados da cadeia pública, não prova da identidade do minerador. Ver Lerner's [análise original](https://bitslog.com/2013/04/17/the-well-deserved-fortune-of-satoshi-nakamoto/).

## Desenvolvimento precoce

O desenvolvimento rapidamente se tornou um pequeno esforço colaborativo além de Satoshi sozinho:

- **Martti Malmi (sirius-m)**, um desenvolvedor finlandês, começou a contribuir para o codebase e para o início do trabalho promocional e organizacional (incluindo registrar os primeiros arranjos de hospedagem do bitcoin.org e executar o fórum bitcointalk.org) a partir de 2009, correspondendo extensivamente e diretamente com Satoshi por e-mail.
- **Gavin Andresen** começou a contribuir com o código em 2010 e tornou-se o desenvolvedor Satoshi entregou a liderança primária do projeto para como Satoshi retirou-se do envolvimento público, incluindo, nos meses seguintes, o acesso commit do repositório de código SourceForge e a chave de alerta de rede (um mecanismo, desde aposentado, que deixou uma chave confiável transmitir avisos urgentes para nós).
- O repositório de código do projeto foi movido do SourceForge para um dedicado **bitcointalk.org** fórum comunidade e, mais tarde, para GitHub, como o número de colaboradores cresceu além do que coordenação de e-mail informal poderia apoiar.

## A partida de Satoshi

O envolvimento público de Satoshi terminou no final de 2010 e início de 2011, documentado através de uma sequência específica, datada em vez de um único anúncio:

- **11 de dezembro de 2010**: Satoshi postou no fórum bitcointalk.org expressando preocupação com o interesse do WikiLeaks em aceitar doações do Bitcoin, escrevendo: "Teria sido bom receber essa atenção em qualquer outro contexto. WikiLeaks chutou o ninho de vespas, e o enxame está vindo em nossa direção."
- **12 de dezembro de 2010**: O último post do fórum público conhecido de Satoshi, discutindo uma mudança de código relacionada à negação de serviço com outros desenvolvedores.
- **Final 2010 até início 2011**: controle do repositório de código fonte e da chave de alerta de rede passada para Gavin Andresen e outros primeiros contribuidores, gradualmente ao invés de em uma transferência.
- **23 de abril de 2011**: O último e-mail conhecido de Satoshi, enviado ao desenvolvedor Mike Hearn, afirmou que Satoshi tinha "movido para outras coisas" e que Bitcoin estava "em boas mãos" com Andresen e a crescente comunidade de desenvolvedores.

Nenhuma comunicação confirmada das contas conhecidas de Satoshi ou chaves de assinatura surgiu desde então. Andresen descreveu, em palestras públicas e entrevistas, sendo solicitado por Satoshi para não retratar ele ou o projeto como tendo um único líder controlador indo em frente, consistente com o desenvolvimento subsequente do projeto como um esforço mal coordenado, multi-contributor em vez de um liderado por um fundador, uma estrutura examinada em [Governança do Bitcoin](../governance/bitcoin.md).

## Por que esta história importa para entender Bitcoin hoje

Duas consequências estruturais deste período inicial persistem na forma como o Bitcoin funciona agora. Primeiro, porque Satoshi não deixou nenhum sucessor com autoridade especial, o desenvolvimento contínuo de Bitcoin passa por um processo de consenso bruto entre colaboradores independentes e operadores de nó em vez de uma empresa ou fundação com o poder de alterar unilateralmente o protocolo, veja [Governança do Bitcoin](../forks/governance.md) e [Governança](../governance/README.md). Em segundo lugar, porque as moedas conhecidas de Satoshi nunca se moveram, o maior titular identificado de bitcoin (pela análise on-chain discutida acima) tem, como uma questão prática, nunca participou no mercado, fato às vezes citado em discussões sobre a realistica circulação de bitcoin oferta e concentração de propriedade (ver [21 milhões de BTC](../bitcoin/21-million.md)).

## Conceitos errôneos comuns

**Bitcoin não foi imediatamente valioso ou amplamente utilizado em 2009-2010.** Por seu primeiro ano, bitcoins não tinha preço de mercado estabelecido; a primeira compra do mundo real amplamente citado usando bitcoin (10,000 BTC para duas pizzas, organizado pelo desenvolvedor Laszlo Hanyecz em maio de 2010) é frequentemente citado especificamente porque era novo na época, não porque Bitcoin já estava em uso comercial comum.

**"Satoshi desapareceu" subestima quão gradual e documentado foi a partida.** O registro público mostra uma transferência multimês de responsabilidades técnicas específicas (acesso repositório, a chave de alerta) para indivíduos nomeados, não um desaparecimento súbito.

## Outras leituras

- [Lista de discussão de criptografia, Janeiro 2009 lançamento anúncio](https://www.metzdowd.com/pipermail/cryptography/2009-January/015010.html)
- [Instituto Satoshi Nakamoto, arquivo de escritos de Satoshi](https://nakamotoinstitute.org/satoshi-archive/)
- [Arquivos do fórum Bitcointalk.org](https://bitcointalk.org/index.php?topic=13.0): tópico de anúncio original
- [Fórum de Hal Finney 2013 "Bitcoin and Me" post](https://bitcointalk.org/index.php?topic=155054.0)

---

[← Anterior: O bloco de Gênesis](./genesis-block.md)
·
[Voltar às Origens](./README.md)
·
[Próximo: Dinheiro e Economia →](../economics/README.md)
