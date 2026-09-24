# Optimism

Optimismo, cuja cadeia de produção é chamada OP Mainnet, lançado em janeiro de 2021, tornando-se uma das primeiras rollups otimistas ao vivo em Ethereum. Este capítulo cobre o que torna o Optimismo distinto para além de ser simplesmente um motor inicial: ele open-sourced sua pilha de tecnologia inteira, e construiu um ecossistema de cadeias operadas independentemente em torno dessa base de código compartilhada.

## A pilha OP: um framework de rolagem de código aberto compartilhado

OP Labs, a equipe por trás do Optimismo, open-sourced o software subjacente OP Mainnet como o **Pilha de OP**, um framework modular qualquer equipe pode usar para lançar seu próprio rollup com componentes padronizados e interoperáveis em vez de construir uma infraestrutura de rollup otimista do zero. Esta é uma estratégia significativamente diferente de tratar a tecnologia do rollup como o próprio produto proprietário da Optimism: dezenas de cadeias operadas independentemente, incluindo algumas geridas por empresas totalmente separadas, funcionam hoje no OP Stack, todos compartilhando o mesmo design de rollup subjacente e, cada vez mais, caminhos de atualização coordenados.

## A visão da Superchain

O objetivo declarado do otimismo a longo prazo, chamado **Supercorrente**, vai além de simplesmente compartilhar código de código aberto: ele visa cadeias OP Stack para eventualmente compartilhar segurança, comunicação e infraestrutura diretamente, incluindo um sequenciador compartilhado (ver [Sequenciadores](./sequencers.md#o-caminho-para-o-sequenciamento-descentralizado)) que permitiria que as transações se movessem entre as cadeias de membros da Superchain com garantias muito mais fortes do que a ponte entre duas cadeias inteiramente independentes fornece hoje. A partir de 2026, esta visão de infraestruturas partilhadas continua a ser um trabalho em curso e não uma realidade plenamente realizada: as cadeias individuais do OP Stack operam actualmente de forma independente, cada uma com o seu próprio sequenciador, embora partilhem a mesma base de códigos subjacente.

## Base: a cadeia OP Stack mais proeminente

Base, lançada pela Coinbase em agosto de 2023, funciona no OP Stack e tornou-se a cadeia OP Stack de maior volume, ilustrando o valor prático da estratégia de framework compartilhado: A Coinbase não precisou projetar e construir uma mecânica de núcleo do rolagem otimista do zero, em vez disso, implantar uma cadeia de produção na infraestrutura O Optimismo já havia construído, testado e continuado a manter, mantendo seu próprio controle operacional sobre o sequenciador específico da Base e decisões de cadeia.

## Conceitos errôneos comuns

**"OP Stack chain" não é o mesmo que "parte de uma Superchain unificada e de segurança compartilhada".** A maioria dos PO As cadeias de pilha hoje, inclusive a Base, são operadas de forma independente com seu próprio sequenciador e seus próprios pressupostos de confiança; compartilhar a base de código do OP Stack é um ponto de partida para a visão da Superchain, não evidência de que a visão já foi totalmente realizada.

**O otimismo como um movimento precoce não significa que seus mecanismos de fraude e disputa tenham permanecido estáticos desde 2021.** Como o upgrade do Arbitrum BOLD (ver [Arbitrum](./arbitrum.md#a-lacuna-de-validação-autorizada-e-bold)), os mecanismos de disputa e validação do próprio Optimismo continuaram evoluindo bem após o lançamento inicial; uma alegação sobre as propriedades de segurança atuais exatas do Optimismo deve ser verificada contra sua atual, não era de lançamento, implementação.

## Outras leituras

- [Documentação sobre otimismo](https://docs.optimism.io/)
- [Especificação da pilha de OP](https://specs.optimism.io/)
- Ver também: [Rollups Optimistas](./optimistic-rollups.md), [Base](./base.md)

---

[← Anterior: Arbitrum](./arbitrum.md)
·
[Voltar à Camada 2](./README.md)
·
[Próximo: Base →](./base.md)
