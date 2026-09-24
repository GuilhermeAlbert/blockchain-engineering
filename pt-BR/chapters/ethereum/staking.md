# Staking

Estar é o ato de bloquear a ETH como um depósito de validador para participar do consenso de Ethereum e ganhar recompensas por fazê-lo. Este capítulo abrange a paisagem prática de como as pessoas realmente estaca (solo staking, staking agrupado, e staking líquido) e as trocas significativamente diferentes cada envolve, uma vez que "staking" descreve vários arranjos estruturalmente diferentes partilhando um nome.

## Estaca individual

Executar seu próprio validador com seu próprio 32 ETH e seu próprio hardware e software (um cliente de execução e consenso, consulte [Nós Ethereum](./nodes.md)) é **estaca solo**, a opção mais minimizada pela confiança, uma vez que não requer nenhuma contraparte além do protocolo em si, diretamente análoga à execução do seu próprio Bitcoin [nó completo](../bitcoin/full-nodes.md) em vez de confiar na infraestrutura de outra pessoa. O custo é o requisito de capital total de 32 ETH, o ónus técnico e operacional da execução de uma infraestrutura de nó confiável, e o [cortar](./slashing.md) risco que cai inteiramente nos próprios erros do jogador solo.

## Empilhadeiras

Porque 32 ETH é uma soma substancial para muitos participantes individuais, **Poças de estacas** que muitas pessoas contribuam com montantes menores, que o pool combina para financiar validadores completos, distribuindo recompensas de volta aos contribuintes proporcionais à sua participação. Isto é diretamente paralelo à lógica de redução da variância do poço de mineração de [Pools de Mineração](../bitcoin/mining-pools.md#por-que-pools-existem-redução-da-variância), aplicado a estacas em vez de mineração, mas introduz uma questão de confiança real, distinta: contribuidores estão confiando na honesta gestão chave do operador do pool e competência operacional, um modelo de confiança diferente e geralmente mais centralizado do que o individual staking fornece.

## Estacas líquidas

**Estacas líquidas** protocolos (Lido e Rocket Pool estão entre os mais amplamente utilizados, embora este livro não endossa qualquer fornecedor específico) levar um passo conjunto mais longe: em troca de depositar ETH, um contribuinte recebe **símbolo de estaca de líquido** (um símbolo transaccionável, transferível, que representa a sua posição em jogo e as suas recompensas de exercício) que pode então ser utilizado noutros [DeFi](../defi/README.md) (como garantia para um empréstimo, ou depositado em um pool de liquidez, por exemplo) enquanto o ETH subjacente permanece bloqueado e em jogo. Isto resolve um verdadeiro problema de eficiência de capital (a ETH tomada de outra forma seria completamente ilíquida e inutilizável em qualquer outro lugar durante o período de jogo) ao custo de adicionar outra camada de risco de contrato inteligente (ver [Auditoria inteligente de contratos](../security/auditing.md)) e concentrando ainda mais a operação do validador entre as entidades a que o protocolo de apostas líquidas realmente delega funções de validador.

## Preocupações de centralização em todos os modelos agrupados

Tanto a aposta conjunta quanto a líquida suscitam uma preocupação real e ativamente discutida dentro da comunidade Ethereum: se um pequeno número de provedores de apostas vier a controlar uma grande parcela do ETH total em jogo, essa concentração representa um risco significativo de centralização estrutural para o conjunto de validadores da rede, ecoando a exata preocupação de centralização de mineração-pool de [Pools de Mineração](../bitcoin/mining-pools.md#a-questão-da-centralização), aplicado ao conjunto de validador de Ethereum em vez do poder de hash de Bitcoin. Isso é monitorado, discutido e continua sendo uma área aberta e ativamente abordada na comunidade de pesquisa e desenvolvimento de Ethereum, não uma questão resolvida ou rejeitada.

## Conceitos errôneos comuns

**O ETH estacionado não é líquido automaticamente, instantaneamente**, a nível individual e comum, as apostas conjuntas envolvem um processo de retirada real (ver [Validadores](./validators.md#saindo)) com potenciais atrasos; apenas as *símbolo derivado* é livremente negociável, que é precisamente o problema específico que o modelo é projetado para resolver, não uma propriedade de apostas em geral.

**Recompensas de apostas não são uma taxa de juro fixa e garantida**. A taxa real de recompensa depende do montante total de ETH em jogo em toda a rede (mais total em jogo geralmente significa que a parte de cada validador individual de recompensas é diluída, seguindo uma curva de emissão definida pelo protocolo) e de um próprio validador atual tempo de funcionamento e correção, não uma porcentagem fixa prometida pelo protocolo.

## Outras leituras

- [ethereum.org: Taking](https://ethereum.org/en/staking/)

---

[← Anterior: Validadores](./validators.md)
·
[Voltar para Ethereum](./README.md)
·
[Próximo: Slashing →](./slashing.md)
