# DeFi

DeFi (finanças descentralizadas) é o que acontece quando os padrões de chamada de contratos e leitura de eventos de [Construindo Aplicações Web3](../web3/README.md) ser aplicado aos primitivos financeiros reais: negociação, empréstimo e empréstimo, implementado como contratos inteligentes em vez de serviços operados por intermediários. Esta seção abrange a mecânica diretamente, com matemática real, verificada ao longo, não resumos conceituais do que esses protocolos pretendem fazer.

## O que você precisa saber primeiro

[Contratos Inteligentes](../contracts/README.md), [Tokens](../tokens/README.md), e [Ler o Estado da Cadeia de Blocos](../web3/reading-state.md). Esta seção assume que você está confortável com saldos ERC-20, chamadas de contrato, e o modelo geral de conta e gás coberto em seções anteriores.

## Capítulos

1. [Moedas estáveis](./stablecoins.md): por que os trilhos blockchain precisam de estabilidade de preços, e as duas formas estruturalmente diferentes de obtê-lo
2. [Moedas estáveis garantidas](./collateralized-stablecoins.md): DAI/USDS, cofres super-colateralizados, e os mecanismos de estabilidade que prendem o peg
3. [Moedas Estáveis Centralizadas](./centralized-stablecoins.md): USDC/USDT, e a questão de confiança custodial este livro continua retornando para
4. [Bolsas descentralizadas](./dex.md): por que AMMs bater livros de ordem on-chain
5. [Criadores de Mercado Automatizados](./amm.md): comércio de preços de reservas, não de encomendas
6. [Fórmula constante do produto](./constant-product.md): `x*y=k`, trabalhou com números de deslizamento computados reais
7. [Grupos de liquidez](./liquidity-pools.md): o que um contrato de pool realmente rastreia, e como os tokens LP funcionam
8. [Prestadores de liquidez](./liquidity-providers.md): os dois componentes do retorno LP, e por que eles devem ser avaliados separadamente
9. [Perda impermanente](./impermanent-loss.md): derivado diretamente da fórmula, verificada em oito cenários de preços
10. [Slippage](./slippage.md): profundidade da pool, impacto de preço, e a arbitragem que mantém os preços AMM honestos
11. [Empréstimos](./lending.md): o modelo agrupado e as taxas de juro fixadas pela utilização
12. [Empréstimos](./borrowing.md): abertura de uma posição, exercício de interesse contínuo, e porque não há termo fixo
13. [Garantia](./collateral.md): rácios empréstimos/valores, limiares de liquidação e por que razão os dois diferem
14. [Liquidações](./liquidations.md): um exemplo completo, verificado, incluindo a matemática de bônus do liquidatário
15. [Empréstimos Flash](./flash-loans.md): empréstimos não garantidos tornados seguros apenas pela atomização
16. [Oráculos](./oracles.md): por que os contratos não podem consultar dados externos diretamente, verificados com um live Chainlink lido
17. [Rendimento](./yield.md): taxas, juros, estacas e emissões, e por que eles não devem ser comparados como um número
18. [Posição vs. Empréstimo](./staking-vs-lending.md): separando o consenso-camada staking de produtos DeFi que emprestam a palavra
19. [Uniswap](./uniswap.md): v1 a v3, como um estudo de caso em como o modelo AMM realmente evoluiu
20. [Aave](./aave.md): do ETHLend para o modelo de empréstimo agrupado a maioria dos protocolos convergiu em
21. [MakerDAO / Sky](./maker.md): Black Thursday, e uma falha de liquidação-mecanismo documentada sob estresse
22. [Curve](./curve.md): a curva StableSwap, e uma verdadeira exploração de nível compilador não relacionada com sua matemática de preços

## Compilar um

[exemplos/defi/](../../../examples/defi/) é um projeto executável implementando um pool de produtos constantes AMM e um mercado de empréstimos simplificado diretamente das fórmulas desta seção, exercido contra números reais em vez de dados zombados.

## Próxima

Continuar a [Camada 2](../layer2/README.md), onde as técnicas de escala Bitcoin's [Escala de Bitcoin](../bitcoin-scaling/README.md) Seção coberta obter Ethereum próprio, tratamento em escala muito maior: rollups, disponibilidade de dados, e as pontes conectando-os de volta para Ethereum mainnet.
