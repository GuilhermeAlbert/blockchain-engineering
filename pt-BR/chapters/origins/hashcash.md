# Hashcash

Hashcash é o ancestral directo do Bitcoin [Prova de Trabalho](../bitcoin/proof-of-work.md). Adam Back o projetou em 1997 para resolver um problema que não tem nada a ver com dinheiro: spam de email. Entender o objetivo real de Hashcash importa, porque Bitcoin reaproveita o mesmo mecanismo para um trabalho muito diferente (assegurando um livro público) e as diferenças entre os dois usa explicar decisões de design que de outra forma parecem arbitrárias.

## O problema

Enviar e-mail é quase gratuito para o remetente. Um spammer pode enviar milhões de mensagens a um custo marginal negligenciável, porque o custo de compor e transmitir um e-mail não escala com volume, digamos, imprimir e enviar cartas de papel faz. A observação de Back, seguindo propostas anteriores relacionadas (notoriamente Cynthia Dwork e o artigo de Moni Naor de 1992 sobre o combate ao lixo postal com quebra-cabeças computacionais, que Back créditos), foi que o spam é um problema econômico: é rentável apenas porque enviar é barato. Aumentar o custo de enviar cada email por uma pequena quantidade fixa de computação, e spam torna-se economicamente pouco atraente, enquanto um remetente legítimo (enviar um punhado de mensagens por dia) mal percebe o custo.

O desafio é fazer isso sem uma autoridade central que emite "autoridades de envio". O que quer que imponha o custo tem de ser verificável pelo próprio computador do destinatário, unilateralmente, sem necessidade de confiar ou contactar terceiros.

## Como funciona

Hashcash requer que o remetente encontre uma colisão parcial de hash: um valor que, quando hashed com SHA-1 (a escolha original de Back), produz uma saída com um número específico de zero bits. Encontrar tal valor requer tentar entradas mais ou menos ao acaso (não há outro atalho que não a busca por força bruta) mas *verificar* Um candidato tem um único cálculo de hash.

Um selo de Hashcash, na sua forma de texto simples, é assim:

```text
1:20:1303030600:anna@example.com::McMybZIhxKXu57jd:ckvi
```

Os campos são: versão, número de zero bits principais necessários (a dificuldade), um timestamp, o endereço do destinatário, um campo de extensão opcional, um nonce aleatório, e um contador. O remetente varia repetidamente o contador e o nonce, hashes a string inteira, e verifica se o hash resultante tem o número necessário de zero bits. Com 20 bits de zeros necessários, o remetente deve tentar cerca de 2^20 (cerca de um milhão) hashes candidatos em média antes de encontrar um que se qualifica, porque cada saída hash é efetivamente aleatória e a chance de qualquer hash único tem 20 zero bits de liderança específicos é 1 em 2^20.

```text
try counter = 1  → hash = 8f3a91c2... (fails, doesn't start with 20 zero bits)
try counter = 2  → hash = 019bc0e7... (fails)
try counter = 3  → hash = 00042f11... (fails, only ~13 leading zero bits)
  ...
try counter = 1,048,321 → hash = 00000d2a... (succeeds — 20 leading zero bits)
```

Em meados da década de 1990, a computação de cerca de um milhão de hashes SHA-1 levou um tempo perceptível, mas tolerável, em torno de um segundo. O cliente de e-mail de um destinatário pode verificar o selo com um cálculo de hash, confirmando que o remetente fez o trabalho. Se o filtro de spam do destinatário requer um selo válido antes de aceitar o e-mail, um spammer enviando um milhão de mensagens agora tem que pagar por cerca de um milhão de segundos de tempo de CPU (muitos CPU-anos) que altera a economia do spam em massa, mesmo que ele mal incomode alguém enviando algumas dezenas de emails legítimos por dia.

Esta é a forma geral de um **função de prova de trabalho**: caro (de uma forma ajustável e ajustável) para produzir, barato para verificar, e sem atalho mais rápido do que a busca por força bruta. Processo de mineração do Bitcoin (ver [Prova de Trabalho](../bitcoin/proof-of-work.md) e [Mineração](../bitcoin/mining.md)) é estruturalmente a mesma busca, com SHA-256 aplicado duas vezes em vez de SHA-1 uma vez, e com o requisito de "leading zero bits" substituído pela noção mais geral de um alvo numérico.

## Por que Satoshi citou Hashcash especificamente

A seção de prova de trabalho do whitepaper Bitcoin abre:

> "To implement a distributed timestamp server on a peer-to-peer basis, we will need to use a proof-of-work system similar to Adam Back's Hashcash, rather than newspaper or Usenet posts."
> Satoshi Nakamoto, [Bitcoin whitepaper](https://bitcoin.org/bitcoin.pdf), Section 4

A reutilização é direta: Hashcash já demonstrou que (1) um quebra-cabeça de prova de trabalho pode ser tornado ajustávelmente difícil, e (2) o custo de produzir uma prova válida é o que dissuade abuso, não qualquer verificação de identidade. A inovação do Bitcoin está aplicando esse mesmo quebra-cabeça para bloquear a criação e amarrar o *capacidade de estender o livro de registros* para o mesmo custo computacional, transformando "quem consegue adicionar a próxima entrada" em uma corrida que custa recursos reais para ganhar, o que torna a história reescrita cara (ver [Por que alguém simplesmente não pode mudar um bloco de Bitcoin velho?](../bitcoin/README.md)).

Observe o que Hashcash faz *não* fornecer, e Bitcoin teve que adicionar em cima dele: Selos de Hashcash são provas de uso único, sem registro persistente ligando um selo para o próximo. Nada liga uma cadeia de selos juntos ou obriga que o esforço computacional gasto pelo partido é também o partido que se beneficia de uma atualização específica e única. O cabeçalho do bloco do Bitcoin é enviado para o hash do bloco anterior (ver [Hashes e Block Linking](../blockchain/block-linking.md)), transformando enigmas de prova de trabalho isolados em uma cadeia cumulativa onde estender a história requer refazer não apenas um quebra-cabeça, mas cada quebra-cabeça após o ponto que você quer alterar.

## De Hashcash a RPOW

Os tokens do Hashcash são **não reutilizável**Um selo é a prova de que o trabalho foi feito para um destinatário e finalidade específicos, e usá-lo novamente em outro lugar não prova por si só nada de novo. Em 2004, [Hal Finney](./cypherpunks.md#membros-que-importam-para-a-história-deste-livro) (um criptógrafo de carreira e a primeira pessoa após Satoshi para executar o software Bitcoin) construído **RPOW (Prova de trabalho reutilizável)**, um sistema que permite que alguém troque uma prova de trabalho estilo Hashcash por um token assinado que *poderia* ser transferido para outra pessoa e trocado novamente, funcionando como uma forma limitada de dinheiro digital.

O RPOW foi executado num servidor central usando [hardware de computação confiável](https://en.wikipedia.org/wiki/Trusted_execution_environment) (um coprocessador seguro IBM 4758) para evitar que até o próprio Finney, como operador do servidor, forje tokens ou faça dupla emissão. O código do servidor foi publicado e sua chave de assinatura foi gerada dentro de hardware evidente especificamente para que os usuários não tivessem que confiar em Finney pessoalmente, apenas no certificado do hardware de que ele estava executando o código publicado. Esta foi uma tentativa genuína de resolver o problema do "emissor fidedigno" identificado no [DigiCash](./digicash.md), não removendo o servidor central, mas tornando a honestidade do servidor independentemente verificável.

O RPOW nunca alcançou um uso amplo, e a confiança em hardware confiável específico e um único servidor foi um gargalo estrutural em vez do tipo de rede Bitcoin aberta e sem permissão mais tarde tornou-se. Mas é um precedente documentado e concreto para transformar a prova de trabalho em algo que muda de mãos, e seu criador tornou-se a primeira pessoa fora de Satoshi a se envolver seriamente com Bitcoin, executar seu software, e corresponder publicamente com Satoshi sobre o código (ver [Histórico inicial do Bitcoin](./early-bitcoin.md)).

## Comércio

Hashcash-estilo prova de trabalho tem um custo que vale a pena afirmar claramente, porque Bitcoin herda-lo diretamente: a propriedade "caro para produzir" é caro em um sentido literal. Consome eletricidade e hardware reais, que é um custo de recursos genuínos sem saída além de segurança (ver [Consumo de Energia](../bitcoin/energy.md) e [Orçamento de Segurança a Longo Prazo](../bitcoin/security-budget.md)). O caso de uso de spam-deterrence do Back só precisou de uma pequena quantidade fixa de trabalho por email. O caso de uso do Bitcoin (assegurando um registro global contra uma rede de adversários que podem ter recursos computacionais enormes) exige o custo para escalar com o valor sendo protegido, razão pela qual a dificuldade de prova de trabalho do Bitcoin tem crescido por muitas ordens de magnitude desde 2009 (ver [Ajuste de Dificuldade](../bitcoin/difficulty-adjustment.md)).

## Conceitos errôneos comuns

**Hashcash não foi projetado como dinheiro e nunca foi destinado a ser gasto ou trocado.** É uma prova unidirecional, não transferível anexada a um único e-mail. Confundindo-o com uma moeda conflita-o com RPOW ou com o próprio Bitcoin.

**"Prova de trabalho" também não se originou de Back.** Ele créditos Dwork e Naor 1992 jornal explicitamente. A contribuição específica de Back foi uma implementação prática, simples e amplamente adotada, e o nome "Hashcash".

## Outras leituras

- [Hashcash - Uma Negação de Contramedida de Serviço](http://www.hashcash.org/papers/hashcash.pdf): Adam Back, 2002 (escrita formal do sistema de 1997)
- [Preços via Processamento ou Combate ao Correio Lixo](https://www.wisdom.weizmann.ac.il/~naor/PAPERS/pvp.pdf): Cynthia Dwork e Moni Naor, CRYPTO '92
- [RPOW - Provas de trabalho reutilizáveis](https://web.archive.org/web/20071222072154/http://www.rpow.net/): Hal Finney, 2004 (via Internet Archive; o servidor rpow.net original não está mais ao vivo)

---

[← Anterior: David Chaum e DigiCash](./digicash.md)
·
[Voltar às Origens](./README.md)
·
[Próximo: b-dinheiro →](./b-money.md)
