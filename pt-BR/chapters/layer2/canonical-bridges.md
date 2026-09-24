# Pontes Canônicas

Cada grande rollup navios a sua própria ponte oficial que o liga à L1, e essa ponte específica, ao contrário da maioria das pontes de terceiros cobertas em geral em [Pontes](./bridges.md), herda sua segurança diretamente do próprio mecanismo de verificação do rollup em vez de de uma parte confiável separada. Este capítulo cobre porque uma ponte canônica de rollup está situada em uma categoria de confiança significativamente diferente e mais forte do que a paisagem geral da ponte.

## Por que a ponte canônica não precisa de seu próprio modelo de confiança separado

O estado de uma liquidação já está a ser verificado através de provas de fraude ou de validade (ver [Provas de Fraude](./fraud-proofs.md) e [Provas de Validade](./validity-proofs.md)), especificamente para deixar a L1 confiar no estado reivindicado do rollup. A ponte canônica simplesmente reutiliza essa mesma verificação: uma retirada é, mecanicamente, apenas uma reivindicação sobre o estado do rollup (especificamente, que o saldo de um determinado usuário diminuiu no rollup, habilitando-os a uma liberação equivalente de fundos em L1), verificada através do mecanismo idêntico de segurança de cada outra parte do estado do rollup. É por isso que uma ponte canônica não introduz uma nova multisig ou federação separada da forma como a maioria das pontes de terceiros faz: não é uma suposição de confiança, é uma aplicação direta da suposição de confiança que o rollup já tem que fazer para que sua execução seja confiável.

## A consequência prática: pontes canônicas herdam os próprios atrasos do rollup

Porque a ponte canônica é apenas mais um consumidor do próprio mecanismo de verificação do rollup, ele também herda as características de tempo do próprio mecanismo diretamente. Retirar através de uma ponte canônica otimista do rollup significa esperar para fora do período de desafio do próprio rollup (ver [Rollups Optimistas](./optimistic-rollups.md#por-que-as-retiradas-levam-cerca-de-uma-semana)), geralmente em torno de uma semana; retirar através de uma ponte canônica de ZK pode ser muito mais rápido, fechado apenas por geração à prova de validade e tempo de verificação, não uma janela de desafio estendida. Trata-se de uma consequência mecânica directa da mesma escolha de projeto subjacente abrangida pelo [Rollups ZK](./zk-rollups.md#por-que-isso-remove-o-atraso-de-retirada), não uma propriedade independente da própria ponte.

## Por que existem pontes de terceiros apesar da ponte canônica ser mais minimizada pela confiança

Uma vez que a ponte canônica é, em geral, a forma mais minimizada de transferir ativos entre um rollup e L1, uma questão natural é porque é que as pontes de terceiros (e os serviços de fast-bridge já mencionados em [Rollups Optimistas](./optimistic-rollups.md#por-que-as-retiradas-levam-cerca-de-uma-semana)) existem de todo. A resposta é quase sempre velocidade e conveniência: uma ponte de terceiros pode oferecer uma retirada quase instantânea, frentendo os próprios fundos e coletando da ponte canônica mais lenta mais tarde, ou pode conectar duas rollups diretamente sem roteamento através de L1 em tudo, ao custo de introduzir pressupostos de confiança separados de terceiros em cima, ou em vez de, do próprio mecanismo de verificação do rollup. Escolher uma ponte de terceiros sobre a canônica é uma troca real, explícita entre velocidade e minimização da confiança, não uma opção estritamente melhor ou pior em todos os casos.

## Conceitos errôneos comuns

**A ponte canônica de um rollup não é livre de risco simplesmente porque evita um multisig separado.** Ele ainda carrega o próprio risco de contrato inteligente do Rollup (um bug no contrato de ponte em si, independente da lógica à prova de fraude ou à prova de validade) e, para rolagem otimista, depende do pressuposto honesto-desafio subjacente provas de fraude na prática.

**Usar uma ponte canônica nem sempre é a escolha objetivamente correta sobre uma ponte de terceiros.** É geralmente a opção mais minimizada pela confiança, mas a velocidade de uma ponte de terceiros pode valer a pena sua suposição adicional de confiança para alguns usuários e casos de uso; que tradeoff faz sentido depende da quantidade específica em jogo e quanto a espera realmente custa ao usuário na prática.

## Outras leituras

- [Documentação Arbitrum: ligação](https://docs.arbitrum.io/for-devs/dev-tools-and-resources/chain-info)
- Ver também: [Pontes](./bridges.md), [Rollups Optimistas](./optimistic-rollups.md), [Rollups ZK](./zk-rollups.md)

---

[← Anterior: Pontes](./bridges.md)
·
[Voltar à Camada 2](./README.md)
·
[Próximo: Mensagens Cross-Chain →](./cross-chain-messaging.md)
