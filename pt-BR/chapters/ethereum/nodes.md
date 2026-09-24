# Nós Ethereum

Desde [The Merge](./the-merge.md), executar um nó Ethereum completo significa executar **dois** partes separadas de software que trabalham em conjunto (um cliente de execução e um cliente de consenso) em vez do único software de nó unificado que o Bitcoin usa. Este capítulo explica por que a divisão existe antes dos dois capítulos seguintes cobrir cada metade em detalhe.

## Porquê dois clientes, não um

Antes da The Merge, uma única peça de software (como Geth) lidou com tudo: execução de transações, manutenção de estado e execução de mineração ou validação de provas de trabalho. The Merge (ver [The Merge](./the-merge.md)) combinou a camada de execução de prova de trabalho original de Ethereum com um sistema de consenso de prova de participação desenvolvido separadamente (a Cadeia Beacon, que tinha sido executado independentemente desde dezembro de 2020 especificamente para deixar o novo mecanismo de consenso ser testado e endurecido antes de ser conectado à verdadeira camada de execução de valor). Em vez de fundi-los em uma base de código monolítica após o fato, Ethereum manteve-os como duas peças comunicando de software:

- **Cliente de execução**: processa transações, executa bytecode EVM, mantém estado (ver [Clientes de Execução](./execution-clients.md)).
- **Cliente de consenso**: executa o protocolo de consenso de prova de participação, determinando qual cadeia de blocos é canônica e coordenando validadores (ver [Clientes de consenso](./consensus-clients.md)).

Os dois comunicam através de uma interface local padronizada (o **API do motor**), com o cliente de consenso direcionando o cliente de execução em que blocos para construir e validar, e o cliente de execução reportando os resultados.

## Por que esta divisão é uma força deliberada, não uma complicação restante

Esta arquitetura, às vezes enquadrada como complexidade adicional indesejável para operadores de nó, é genuinamente útil por uma razão estrutural específica: permite que a comunidade de Ethereum execute **múltiplas implementações independentes de cada camada**, desenvolvido por equipes separadas, reduzindo o risco de que um único bug de software afetando um cliente específico poderia derrubar ou corromper o consenso de toda a rede, uma preocupação real dado que um bug compartilhado pelo software idêntico de cada participante de rede é um risco sistêmico de uma forma que a diversidade de implementações independentes mitiga diretamente. Diversidade de clientes (a distribuição real e monitorada da qual os operadores de nós de execução e consenso de clientes rodam) é monitorada e discutida ativamente dentro da comunidade Ethereum especificamente porque a concentração excessiva em qualquer único cliente reintroduziria exatamente este risco sistêmico.

## Conceitos errôneos comuns

**Executar um nó Ethereum não significa executar apenas um pedaço de software**, ao contrário do modelo binário único do Bitcoin Core (ver [Núcleo do Bitcoin](../bitcoin/bitcoin-core.md)), um nó completo e válido de Ethereum, uma vez que a Merge requer uma execução e um cliente consenso em execução e comunicação.

**A divisão execução/consenso não é a mesma distinção que a divisão full-node-versus-light-client do Bitcoin**. Ambos os tipos de clientes Ethereum são normalmente executados em conjunto para validação completa; a alternativa "light" análoga em Ethereum é uma pergunta separada sobre confiar em um provedor de RPC remoto em vez de executar qualquer software cliente localmente em tudo (ver [Infraestruturas](../infrastructure/README.md)).

## Outras leituras

- [ethereum.org: Nós e clientes](https://ethereum.org/en/developers/docs/nodes-and-clients/)

---

[← Anterior: JSON-RPC](./json-rpc.md)
·
[Voltar para Ethereum](./README.md)
·
[Próximo: Clientes de Execução →](./execution-clients.md)
