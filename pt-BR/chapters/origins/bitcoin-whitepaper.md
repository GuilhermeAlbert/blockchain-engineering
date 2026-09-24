# O whitepaper Bitcoin

"Bitcoin: A Peer-to-Peer Electronic Cash System" tem nove páginas. Ele não tem diagramas além de um punhado de diagramas de blocos simples, nenhuma linguagem de marketing, e lê como um memorando de engenharia em vez de um manifesto. Este capítulo caminha através do que ele realmente diz, seção por seção, porque o papel é curto o suficiente para resumir com precisão e importância suficiente que parafrases circulando on-line frequentemente equivocadamente. Ler o [PDF original](https://bitcoin.org/bitcoin.pdf) a par deste capítulo, se possível. Recompensa a leitura atenta.

## Publicação

Satoshi Nakamoto postou o papel para o [Lista de discussão de criptografia](https://www.metzdowd.com/pipermail/cryptography/2008-October/014810.html) ligado **31 de Outubro de 2008**, com uma mensagem que começou:

> "I've been working on a new electronic cash system that's fully peer-to-peer, with no trusted third party."

Isto foi cerca de seis semanas após o colapso de Lehman Brothers (15 de setembro de 2008) desencadeou a fase mais aguda da crise financeira de 2008. Uma coincidência temporal que alimentou a interpretação (ver a mensagem da base de moedas discutida em [O Bloco de Gênesis](./genesis-block.md)), embora o próprio artigo não faça referência à crise e correspondência privada prévia de Satoshi com os primeiros revisores, incluindo Wei Dai e Adam Back, mostra o núcleo de design anterior aos eventos de setembro de 2008. O artigo não pretende ser uma resposta a qualquer evento financeiro específico.

## Resumo

O resumo do artigo afirma seu objetivo e método em quatro frases:

> "A purely peer-to-peer version of electronic cash would allow online payments to be sent directly from one party to another without going through a financial institution. Digital signatures provide part of the solution, but the main benefits are lost if a trusted third party is still required to prevent double-spending. We propose a solution to the double-spending problem using a peer-to-peer network. The network timestamps transactions by hashing them into an ongoing chain of hash-based proof-of-work, forming a record that cannot be changed without redoing the proof-of-work."
> Satoshi Nakamoto, [Bitcoin whitepaper](https://bitcoin.org/bitcoin.pdf), Abstract

Cada seção posterior do artigo é uma elaboração deste resumo. Vale a pena ler duas vezes: [problema de dupla despesa](./digital-cash.md#o-problema) como obstáculo central, afirma que as assinaturas digitais por si só não são suficientes para resolvê-lo, e visualiza o mecanismo específico (proof-of-work encadeado em um registro contínuo) que o resolve.

## Seção por seção

### 1. Introdução

Frames o problema do comércio baseado em confiança: instituições financeiras são necessárias para processar pagamentos eletrônicos porque assinaturas digitais puras não impedem alguém de gastar o mesmo valor assinado duas vezes. Satoshi lista diretamente os custos do modelo de confiança, os custos de mediação, a impossibilidade prática de transações não reversíveis para serviços não reversíveis, fraude, e a exigência de que os comerciantes coletam mais informações do cliente do que de outra forma eles precisariam, para se proteger contra reversões. A introdução encerra afirmando o objetivo precisamente: "O que é necessário é um sistema de pagamento eletrônico baseado em provas criptográficas em vez de confiança."

### 2. Transações

Define uma moeda como "uma cadeia de assinaturas digitais". Uma transação transfere propriedade por ter o proprietário atual digitalmente assinar um hash da transação anterior mais a chave pública do novo proprietário, e anexar essa assinatura à moeda. O papel sinaliza imediatamente a lacuna de dupla despesa que deixa em aberto: um beneficiário não tem como verificar se um proprietário anterior não assinou uma transação anterior da mesma moeda para outra pessoa. Seção 2 afirma explicitamente que a "solução óbvia" (uma moeda central que verifica cada moeda para a dupla despesa) reintroduz um terceiro confiável para cada transação, que é exatamente o que o papel está tentando evitar. Isto define a necessidade da Seção 3.

### 3. Timetamp Server

Apresenta o mecanismo geral antes de aplicá-lo ao dinheiro: um servidor de timestamp que pega um hash de um bloco de itens e publica o hash amplamente (o papel cita o modelo de um jornal ou Usenet post). Cada novo timestamp inclui o hash do timestamp anterior, formando uma cadeia, "cada timestamp reforçando os anteriores". Esta seção é a semente conceitual do [blockchain](../blockchain/README.md) estrutura de dados, descrita no resumo, antes da introdução da prova de trabalho.

### 4. Prova de trabalho

Os estados que um servidor de timestamp distribuído precisa de um sistema de prova de trabalho "semelhante ao Hashcash de Adam Back", implementado pela digitalização de um valor de nonce que, quando hashed com SHA-256, dá um hash começando com um número necessário de zero bits. Esta seção faz duas das reivindicações estruturais mais importantes do artigo:

1. **Voto majoritário pelo poder da CPU, não pelo endereço IP**, porque "um-IP-endereço-um-voto" poderia ser subvertido por qualquer pessoa capaz de alocar muitos endereços IP. Esta é a defesa explícita do jornal contra [Ataques de Sybil](../distributed-systems/sybil-attacks.md).
2. **A imutabilidade cresce com as confirmações.** Para modificar um bloco passado, um atacante teria que refazer a prova de trabalho desse bloco e cada bloco depois dele, em seguida, alcançar e superar o trabalho contínuo da cadeia honesta, descrito como "ficando exponencialmente improvável como [o atacante] cai mais para trás."

### 5. Rede

Descreve os nós de processo de seis etapas seguintes: transmitir novas transações para todos os nós, cada nó recolhe-los em um bloco, cada nó trabalha em encontrar uma prova de trabalho para o seu bloco, quando encontrado o nó transmite o bloco, outros nós aceitam o bloco apenas se todas as suas transações são válidas e não já gastas, e nós expressam aceitação ao trabalhar na extensão do bloco aceito como o próximo na cadeia. Esta seção refere igualmente a **regra da cadeia mais longa** (nós sempre consideram a cadeia válida mais longa para ser a correta) e observa que os nós podem sair e voltar a qualquer momento, alcançando-se baixando e verificando qualquer cadeia é mais longa.

### 6. Incentivo

Explica que a primeira transação em um bloco é especial: cria novas moedas de propriedade do criador do bloco, que é tanto o mecanismo para distribuição inicial de moedas quanto o incentivo para nós gastarem energia computacional em nome da rede. Uma vez alcançada uma oferta total fixa de moedas, o documento propõe que as taxas de transação se tornem o incentivo, e observa que isso também deve desencorajar um nó desonesto de tentar reverter suas próprias transações passadas, uma vez que ele está a ganhar mais seguindo as regras e coletando novas moedas do que atacando o sistema em que está investido (ver [Bloquear recompensas](../bitcoin/block-rewards.md) e [Mercado de Taxas](../bitcoin/fee-market.md)).

### 7. Recuperando o Espaço em Disco

Propõe a poda de transações gastas de blocos antigos usando [Árvores-merkle](../cryptography/merkle-trees.md): uma vez que as transações de um bloco são todas gastas, apenas sua raiz Merkle (não os dados completos da transação) precisa ser mantida, uma vez que a raiz sozinho é suficiente para provar a identidade do bloco dentro da cadeia. Um cálculo back-of-the-envelope no papel estima que os cabeçalhos de bloco sozinhos (sem transações) precisariam apenas de cerca de 80 bytes cada, então mesmo décadas de cabeçalhos permanecem pequenos em relação ao crescimento de armazenamento disponível.

### 8. Verificação de pagamento simplificada (SPV)

Explica como uma parte pode verificar um pagamento sem executar um nó de rede completo: mantendo apenas cabeçalhos de bloco e obtendo um branch Merkle ligando a transação ao bloco em que está cronometrado (ver [Provas de Merkle](../cryptography/merkle-proofs.md)). O artigo é explícito sobre a limitação: a verificação SPV é tão confiável quanto a suposição de que nós honestos controlam a rede, porque um atacante capaz de dominar a rede poderia alimentar transações fabricadas por um cliente leve enquanto o atacante pode manter esse controle. Esta é a origem da distinção em profundidade [Nós Completos](../bitcoin/full-nodes.md) versus [Clientes leves](../bitcoin/light-clients.md).

### 9. Combinando e Dividindo Valor

Observa que, para permitir que o valor seja dividido e combinado, as transações contêm múltiplas entradas e saídas, normalmente uma única entrada de uma transação anterior maior, ou múltiplas entradas combinando quantidades menores, e no máximo duas saídas: o próprio pagamento, e uma saída de mudança retornada ao remetente. Este parágrafo é a origem do [Modelo UTXO](../bitcoin/utxo.md) coberta em profundidade na seção Bitcoin.

### 10. Privacidade

Descreve o modelo de privacidade que o Bitcoin realmente oferece: dados de transação pública (montantes, e o fluxo de valor entre endereços) com o anonimato vindo de manter as chaves públicas desvinculadas da identidade do mundo real ("o público pode ver que alguém está enviando uma quantia para outra pessoa, mas sem informações ligando a transação a ninguém." O artigo contrasta explicitamente isso com o modelo bancário tradicional, onde a identidade é verificada, mas os detalhes da transação estão ocultos do público) Bitcoin inverte qual lado desse tradeoff é público. Este é o mecanismo por trás do termo "pseudônimo", coberto ainda mais em [Endereços](../wallets/addresses.md) e [Privacidade](../society/privacy.md).

### 11. Cálculos

Funciona através da probabilidade de que um atacante com uma minoria de poder de hash de rede ainda poderia alcançar e superar a cadeia honesta, modelado como um problema Binomial Random Walk / Gambler's Ruin, e dá uma fórmula para a probabilidade de um ataque bem sucedido em função da parte do atacante do poder de hash total `q` e o número de confirmações `z` A corrente honesta está à frente. Esta é a base quantitativa para o conselho comum esperar por múltiplas confirmações antes de considerar uma final de pagamento Bitcoin (ver [Confirmação da transação](../bitcoin/confirmation.md) e [Finalidade Probabilística](../distributed-systems/probabilistic-finality.md)).

### 12. Conclusão

Restabelece a contribuição do papel em um parágrafo: um sistema para transações eletrônicas sem depender de confiança, construído a partir de moedas feitas de assinaturas digitais (fornecendo forte controle de propriedade) combinadas com uma rede de prova de trabalho de pares para registrar um histórico público de transações que se torna computacionalmente impraticável para um atacante alterar, "enquanto nós honestos controlam a maioria do poder da CPU".

## O que o artigo não especifica

Ler o whitepaper ao lado do Bitcoin real revela coisas que Satoshi deixou para a implementação, não o papel, para definir: o papel não fixa um limite de tamanho de bloco, não especifica o limite de 21 milhões de moedas ou o calendário de metade numericamente (ele descreve apenas o princípio geral de redução da emissão), não descreve [Bitcoin Script](../bitcoin/script.md) em tudo, e não usa os termos "blockchain", "wallet", ou "miner". "Miner" em particular é um termo que emergiu do uso da comunidade após o lançamento, não do próprio vocabulário do jornal (o papel diz "nós"). Estes pormenores foram preenchidos pelo [código fonte inicial](./early-bitcoin.md), lançado como Bitcoin v0.1 cerca de dez semanas após o trabalho, e pelo desenvolvimento subsequente.

## Outras leituras

- [Bitcoin: Um sistema de caixa eletrônico de pares a pares](https://bitcoin.org/bitcoin.pdf): a fonte primária; leia-a diretamente
- [Lista de discussão de criptografia, Outubro 2008 anúncio](https://www.metzdowd.com/pipermail/cryptography/2008-October/014810.html)
- [Instituto Satoshi Nakamoto, whitepaper e história do esboço](https://nakamotoinstitute.org/library/bitcoin/)

---

[← Anterior: Quem era Satoshi Nakamoto?](./satoshi.md)
·
[Voltar às Origens](./README.md)
·
[Próximo: O bloco de Gênesis →](./genesis-block.md)
