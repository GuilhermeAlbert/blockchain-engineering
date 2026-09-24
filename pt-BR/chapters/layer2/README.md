# Camada 2

Camada 2 é a resposta de Ethereum para a mesma tensão de escala Bitcoin [Escala de Bitcoin](../bitcoin-scaling/README.md) seção coberta: manter a cadeia de base deliberadamente restringida para executar um nó completo permanece acessível, e empurrar a transferência de transação em sistemas separados que herdam a segurança do L1 através de mecanismos específicos, verificáveis em vez de uma nova suposição de confiança. Esta seção abrange esses mecanismos diretamente, incluindo vários fatos datados sobre onde os principais rolups realmente estão hoje, não apenas como eles são projetados para funcionar eventualmente.

## O que você precisa saber primeiro

[Gás](../ethereum/gas.md), [Prova de Participação](../ethereum/proof-of-stake.md), e [Provas de Conhecimento Zero](../cryptography/zero-knowledge.md)Esta seção assume familiaridade com o modelo de conta e gás de Ethereum, e baseia-se diretamente nos conceitos gerais de zero conhecimento já abordados na criptografia.

## Capítulos

1. [L1 vs. L2](./l1-vs-l2.md): por que Ethereum não apenas aumentou o próprio rendimento de L1
2. [Rollups](./rollups.md): a estrutura de verificação de sequência-batch cada rollup design shares
3. [Rollups Optimistas](./optimistic-rollups.md): por que as retiradas levam cerca de uma semana, trabalhou diretamente através
4. [Provas de Fraude](./fraud-proofs.md): interactive bissection, estreitando uma disputa para um passo barato-para-verificar
5. [Rollups ZK](./zk-rollups.md): prova em vez de suposição, e o custo real da geração de prova
6. [Provas de Validade](./validity-proofs.md): que afirmação uma prova realmente estabelece, e o que um circuito zkEVM tem para reproduzir
7. [Sequenciadores](./sequencers.md): o fato atual, datado de que cada sequenciador de rollup principal é centralizado
8. [Disponibilidade de Dados](./data-availability.md): porque razão a disponibilidade e a correcção são garantias aplicadas separadamente
9. [Blobs](./blobs.md): Tipo de dados dedicados, baratos e temporariamente conservados da Ethereum para lotes rollup
10. [EIP-4844](./eip-4844.md): a fórmula blob base fee, derivada e verificada com números reais
11. [Pontes](./bridges.md): o espectro de confiança de multisigs federados a clientes leves minimizados confiança
12. [Pontes Canônicas](./canonical-bridges.md): por que razão a própria ponte de um rollup reutiliza o seu mecanismo de verificação existente
13. [Mensagens de Mudança Cruzada](./cross-chain-messaging.md): Verificadores configuráveis da LayerZero e rede de 19 guardas do Wormhole
14. [Arbitrum](./arbitrum.md): Nitro, e o verdadeiro fosso entre provas de fraude teóricas e efetivamente implementadas sem permissão
15. [Optimism](./optimism.md): o OP Stack, a visão Superchain, e onde essa visão realmente está
16. [Base](./base.md): L2 da Coinbase e um exemplo datado de medir diretamente a descentralização
17. [zkSync](./zksync.md): EVM-compatível, mas não EVM-equivalente, com abstração de conta nativa
18. [StarkNet](./starknet.md): Cairo, STARKs especificamente, e um modelo de conta projetado independentemente

## Próxima

Continuar a [Segurança](../security/README.md), onde os limites de confiança desta seção tem desenhado cuidadosamente (o que um sequenciador pode e não pode fazer, o que o mecanismo específico de verificação de uma ponte realmente garante) tornar-se o ponto de partida para entender como as verdadeiras façanhas quebraram esses limites na prática.
