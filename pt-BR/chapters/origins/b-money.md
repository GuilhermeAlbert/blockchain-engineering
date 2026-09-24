# b-dinheiro

Em 1998, Wei Dai (um cientista da computação conhecido na época por sua biblioteca de software criptográfico Crypto++) enviou uma breve proposta para a lista de discussão Cypherpunks descrevendo um sistema que ele chamou de "b-money". Nunca foi implementado. É, no entanto, uma das duas obras Satoshi Nakamoto cita pelo nome no whitepaper Bitcoin, e lê-lo contra o projeto real de Bitcoin mostra precisamente quais ideias já estavam na mesa em 1998 e quais problemas permaneceram por resolver por mais uma década.

## A proposta

O ensaio de Dai abre afirmando a mesma motivação política encontrada ao longo do [movimento cypherpunk](./cypherpunks.md):

> "I am fascinated by Tim May's crypto-anarchy. Unlike the communities traditionally associated with the word 'anarchy', in a crypto-anarchy the government is not temporarily destroyed but permanently forbidden and permanently unnecessary. [...] I am interested in the possibilities for collective decision-making in the crypto-anarchy without new taxes and government spending."
> Wei Dai, [b-money](http://www.weidai.com/bmoney.txt), 1998

Em seguida, ele descreve, em uma página e meia, **dois protocolos alternativos** para o que ele chama de "um esquema para um grupo de pseudônimos digitais não rastreáveis para pagar uns aos outros com dinheiro e para executar contratos entre si sem ajuda externa".

### Protocolo 1: todos mantêm todas as contas

No primeiro projeto da Dai, cada participante mantém uma cópia completa e separada de um pseudônimo de mapeamento de banco de dados para saldos de contas. Para criar um novo dinheiro, um participante transmite uma solução de prova de trabalho para um problema computacional; cada outro participante verifica independentemente o trabalho e credita a conta do criador com uma quantia ligada ao custo de produzir essa prova, Dai propõe que a própria comunidade, ao não aceitar provas que são "muito baratas" em relação à tecnologia de computador na época, mantém o custo da criação de dinheiro aproximadamente autoajustando. Para transferir dinheiro, o pagador transmite uma mensagem assinada; cada participante que recebe atualiza sua própria cópia de ambas as contas.

A proposta requer explicitamente "transmissão" para alcançar todos os participantes e assume que as mensagens não são perdidas, uma exigência bandeiras Dai como irrealistas por conta própria:

> "Unfortunately the proof-of-work function is not entirely satisfactory because its cost is not stable over time [...] Anyway, this problem is not fatal, merely inconvenient."
> Wei Dai, [b-money](http://www.weidai.com/bmoney.txt), 1998

Mais importante para os propósitos deste livro, Dai não especifica um mecanismo para resolver o que acontece quando dois participantes recebem transmissões em ordens diferentes, ou quando um participante desonesto envia mensagens de transferência conflitantes para diferentes partes da rede. Este é precisamente o problema de ordenação descrito em [Por que o dinheiro digital era difícil](./digital-cash.md), e fica por resolver.

### Protocolo 2: servidores, depósitos e votação

Reconhecendo que exigir que cada participante rastreie cada conta não escala, o segundo protocolo de Dai introduz um subconjunto de participantes ("servidores") que mantêm o banco de dados de contas autoritário, com todos os demais encaminhando transações através deles. Para manter os servidores honestos sem confiar em nenhum deles individualmente, os servidores devem postar um **caução** no escrow (realizado coletivamente por todos os servidores), e os titulares de contas periodicamente transmitem seus saldos acreditados, que são verificados quanto à consistência com as reivindicações dos servidores; um servidor pego trapaceando perde seu depósito.

Esta é a metade mais estruturalmente interessante da proposta, porque antecipa um problema que qualquer livro de registros descentralizado tem de responder: *Quem é permitido atualizar o livro de registros, e o que os impede de mentir?* A resposta de Dai (uma penalidade econômica (um depósito perdido) para mau comportamento comprovada) é uma forma da mesma idéia que aparece mais tarde, em uma forma diferente, tanto na economia de mineração de Bitcoin e na [Prova de Participação](../ethereum/proof-of-stake.md) corte (ver [Cortar](../ethereum/slashing.md)). Mas os servidores do b-money são um conjunto fixo, identificado de partidos que devem ser individualmente confiáveis para manter depósitos e votar corretamente; nada na proposta explica como esse conjunto é escolhido, como novos servidores se juntam sem permissão, ou como o sistema se defende contra uma coalizão de servidores que cola em vez de individualmente trapaceia.

## O dinheiro está certo.

Lendo a proposta contra Bitcoin, várias ideias estruturais aparecem quase duas décadas antes:

- **Criação de dinheiro ligada a computação dispendiosa.** Protocolo 1 da Dai liga a emissão de dinheiro novo diretamente à prova de trabalho, a mesma ligação que Bitcoin faz com recompensas de mineração (ver [Bloquear recompensas](../bitcoin/block-rewards.md)).
- **Um processo de emissão fixo e conhecido, regido pelo protocolo e não pela discrição.** A proposta da Dai não tem nenhum banco central que decida quanto dinheiro criar; as regras são fixadas com antecedência e seguidas mecanicamente.
- **Sanções econômicas por desonestidade comprovada**, prefigurando o princípio geral de que os sistemas descentralizados podem substituir uma participação econômica onerosa a falsa por uma identidade de confiança.
- **Participação pseudónima.** As contas são chaves públicas, não identidades do mundo real, o mesmo modelo que o Bitcoin usa para endereços (ver [Endereços](../wallets/addresses.md)).

## Que dinheiro b ficou sem solução

- **Nenhum mecanismo de consenso para ordenar transações conflitantes em toda a rede.** Protocolo 1 assume transmissão confiável para todos, que as redes reais não podem garantir; Protocolo 2 assume um conjunto fixo de servidores de verificação mútua sem explicar como que definir formulários ou como evitar uma maioria conluio dentro dele de trapacear juntos.
- **Nenhum mecanismo parecido com um blockchain.** Não há cadeia de blocos, nenhuma prova de trabalho encadeada ligando um estado ao outro, e nenhuma regra de "cadeia mais longa" para resolver desacordos sobre a história. Os servidores da Dai votam no *atual* estado de equilíbrio; não há um histórico somente de apêndices, verificável que um novo participante possa baixar e verificar do zero.
- **Nunca implementado ou testado.** A proposta é um ensaio, não software de trabalho. Seus problemas nunca foram testados pelo estresse contra o comportamento adversário real.

## O compromisso de Satoshi com a proposta

Satoshi cita o dinheiro-b nas referências do whitepaper e, antes de publicar o artigo amplamente, enviou e-mail diretamente para Wei Dai para pedir-lhe para rever um rascunho. Evidência Satoshi tinha lido o ensaio de perto em vez de citá-lo de passagem. Dai disse publicamente (em um e-mail de 2014 mais tarde publicado por Nathaniel Popper e outros) que a mensagem de Satoshi referenciava o dinheiro b e pediu feedback, embora Dai não respondeu em detalhes antes do lançamento público do whitepaper. Em uma entrevista de 2013 e posteriores declarações públicas, Dai disse que ele era "criptomoeda-agnóstico" e não entendeu inicialmente o significado de Bitcoin, apenas reconhecendo-o em retrospectiva como o problema de ordem do dinheiro b finalmente resolvido.

A evidência pública sobrevivente para esta troca é o relato posterior de Dai em vez de um arquivo criptograficamente autenticado da caixa de correio original. Por esse motivo, este capítulo resume a troca e não cita uma data ou texto exato como fato verificado independentemente.

## Conceitos errôneos comuns

**O dinheiro b não é uma criptomoeda antecessora que "quase funcionou".** Trata-se de um ensaio breve descrevendo dois protocolos alternativos parcialmente especificados, nem implementados, ambos faltando um mecanismo de consenso de trabalho. Seu valor para a história deste livro é como evidência dos problemas que a comunidade Cypherpunk já tinha identificado, não como um sistema de trabalho Bitcoin melhorou.

**Wei Dai não construiu ou lançou dinheiro b.** Nenhum código, nenhuma rede, nenhuma moeda foram criadas com esse nome durante a década de 1990.

## Outras leituras

- [b-dinheiro](http://www.weidai.com/bmoney.txt): Wei Dai, 1998 (texto original)
- [Bitcoin: Um sistema de caixa eletrônico de pares a pares](https://bitcoin.org/bitcoin.pdf): Satoshi Nakamoto, seção de referências
- [Cripto++ Biblioteca](https://www.cryptopp.com/): Biblioteca de programas criptográfica de Wei Dai

---

[← Anterior: Hashcash](./hashcash.md)
·
[Voltar às Origens](./README.md)
·
[Próximo: Ouro Bit →](./bit-gold.md)
