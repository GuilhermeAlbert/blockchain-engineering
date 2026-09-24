# Pontes

Uma ponte move valor ou informação entre duas blockchains separadas, que, não tendo consenso compartilhado, não têm nenhuma maneira nativa de falar uns com os outros. Este capítulo cobre o espectro de confiança geral cada projeto de ponte cai em algum lugar, antes que os próximos dois capítulos cobrem as duas categorias específicas que este livro distingue: uma ponte canônica própria rollup, e protocolos de mensagens de cadeia cruzada de propósito geral.

## Por que a ponte é fundamentalmente difícil

Duas blockchains independentes são, por design, sistemas separados: conjuntos de validadores separados, regras de consenso separadas e nenhum mecanismo incorporado para uma cadeia verificar o que aconteceu na outra. Movendo um ativo da cadeia "de" A cadeia "para" B não move literalmente nada; o ativo da cadeia A permanece na cadeia A. O que realmente acontece é que algum ativo fica bloqueado ou queimado na cadeia A, e uma reivindicação correspondente (muitas vezes uma representação envolto, IOU-estilo, veja [Ativo Embrulhado](../tokens/wrapped-assets.md)) é cunhado ou liberado na cadeia B, baseado em *alguém* ou *algo* Verificando que a fechadura ou queimadura na corrente A realmente aconteceu. Cada projeto de ponte é, em seu núcleo, uma resposta específica para a questão de quem ou o que realiza essa verificação, e quanta confiança esse verificador requer.

## O espectro de confiança: de confiança a confiança minimizada

- **Pontes de confiança (federadas ou multisig)**: um conjunto fixo e autorizado de partes observa a cadeia A e assina a ação correspondente na cadeia B. Este é o design mais simples de construir, e o mais comum na prática, mas concentra confiança nesse grupo específico de sinalizadores, estruturalmente a mesma questão de confiança custodial já levantada para [WBTC](../tokens/wrapped-assets.md#wbtc-bitcoin-embrulhado-para-ethereum): a ponte é tão confiável e honesta quanto seus sinalizadores.
- **Pontes de clientes leves (minimizadas pela confiança)**: cadeia B executa um cliente leve real (ver [Clientes leves](../bitcoin/light-clients.md) para o conceito geral) verificar diretamente as provas de consenso da cadeia A, exigindo nenhuma parte confiável separada além do próprio conjunto de validador da cadeia A. Isso é significativamente mais minimizado pela confiança, mas substancialmente mais difícil de construir e tipicamente mais caro para operar, uma vez que requer implementação e execução contínua da lógica de verificação de consenso de uma cadeia dentro do ambiente de execução de outra cadeia.
- **Pontes otimistas**: uma reivindicação sobre o estado da cadeia A é aceita após um período de desafio, durante o qual qualquer pessoa pode contestá-lo com uma prova de fraude, o mesmo padrão geral já coberto para [Rollups Optimistas](./optimistic-rollups.md), aplicado a mensagens cruzadas gerais em vez de especificamente para uma liquidação L1.

A maioria das pontes na produção hoje se senta mais perto do final confiável deste espectro do que o fim minimizado pela confiança, uma vez que a verificação luz-cliente é realmente difícil de implementar corretamente e eficientemente entre duas cadeias arbitrárias, projetadas independentemente.

## Por que pontes são um alvo de ataque concentrado e de alto valor

Uma ponte, por sua natureza, detém ou controla um grande conjunto de ativos bloqueados de um lado, apoiando o que foi cunhado do outro lado. Isso torna as pontes um alvo incomummente concentrado: comprometer o mecanismo de verificação de uma ponte, seja roubando chaves sinalizadoras de uma ponte federada ou explorando uma falha na lógica de verificação de um cliente leve, pode potencialmente desbloquear todo o conjunto de ativos bloqueados de uma vez, em vez de comprometer os fundos de um usuário de cada vez. É exatamente por isso que a ponte explora, [Explorações da Ponte](../security/bridge-exploits.md), responsáveis por algumas das maiores perdas individuais na história da indústria, e por que o modelo de confiança específico que uma ponte usa merece um escrutínio real antes de confiar nele para um valor significativo.

## Conceitos errôneos comuns

**Um ativo envolto em ponte não é o mesmo ativo que existe na cadeia original.** É uma reivindicação derivada separada cujo valor depende inteiramente da própria solvência e exatidão da ponte; segurar um token ponteado significa confiar que o mecanismo de verificação da ponte específica, não mantendo uma unidade fungível e intercambiável do ativo original.

**"Ponte" não implica um modelo de confiança uniforme.** A lacuna entre uma ponte multisig totalmente confiável e uma ponte de cliente-luz genuinamente minimizada pela confiança é enorme, e tratar "é uma ponte" como suficiente diligência, sem verificar qual projeto específico uma determinada ponte realmente usa, é uma fonte real e comum de risco subestimado.

## Outras leituras

- Ver também: [Pontes Canônicas](./canonical-bridges.md), [Mensagens de Mudança Cruzada](./cross-chain-messaging.md), [Explorações da Ponte](../security/bridge-exploits.md)

---

[← Anterior: EIP-4844](./eip-4844.md)
·
[Voltar à Camada 2](./README.md)
·
[Próximo: Pontes Canonical →](./canonical-bridges.md)
