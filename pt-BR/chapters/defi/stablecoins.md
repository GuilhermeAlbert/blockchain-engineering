# Moedas estáveis

Uma stablecoin é um token projetado para manter um valor aproximadamente constante em relação a alguma referência, quase sempre o dólar americano. Este capítulo abrange a razão pela qual existem moedas estáveis, dado que [Volatilidade e adoção monetária](../economics/volatility.md) já estabeleceu que a estabilidade de preços é exatamente o que um ativo volátil como Bitcoin ou éter carece; os próximos dois capítulos cobrem as duas formas estruturalmente diferentes de as moedas estáveis obtê-lo.

## O problema stablecoins resolver

Lembrar [Bitcoin como dinheiro](../economics/bitcoin-as-money.md#unidade-de-conta): uma moeda que oscila 10% em um dia é uma unidade de conta pobre e um meio de troca arriscado, mesmo que seja uma loja razoável de valor de longo prazo. Este é um problema genuíno, prático para quem quer usar trilhos blockchain (rápido, programável, liquidação globalmente acessível) sem assumir éter ou volatilidade de preço de bitcoin para a duração de um comércio, um empréstimo, ou simplesmente segurando capital de giro. Uma moeda estável é, mecanicamente, uma tentativa de obter uma liquidação blockchain-native *e* estabilidade de preços fiat-like simultaneamente, ao ligar o valor de um token a uma referência externa em vez de deixar a oferta ea demanda para o próprio token definir o seu preço como Bitcoin faz.

## As duas grandes abordagens

- **Moedas estáveis centralizadas (fiat-backed)**: um emitente detém dólares reais (ou ativos equivalentes a dólares) em reserva e emite tokens reembolsáveis 1:1, integralmente cobertos em [Moedas Estáveis Centralizadas](./centralized-stablecoins.md)Este é estruturalmente o mesmo modelo de confiança que [Ativo Embrulhado](../tokens/wrapped-assets.md) e WBTC especificamente, uma promessa de guarda, não uma garantia de protocolo.
- **Crypto-colateralized (descentralizado) stablecoins**: um contrato inteligente detém *outros* os ativos cripto (éter, por exemplo) como sobre-colateralização, e emite dívida de coin estável contra essa garantia, coberta integralmente em [Moedas estáveis garantidas](./collateralized-stablecoins.md). Este negoceia a confiança de custódia para um conjunto diferente de riscos, volatilidade dos preços de garantia e a mecânica do que acontece quando o valor de garantia cai (ver [Liquidações](./liquidations.md)).

Ambas as abordagens estão tentando o mesmo objetivo (estabilidade de valor) através de modelos de confiança e risco fundamentalmente diferentes, que é precisamente por isso que "stablecoin" sozinho não lhe diz muito sobre o perfil de risco real de um token específico sem saber qual categoria, e a qual implementação específica, ele pertence.

## O que significa "estável" na prática

Mesmo uma moeda estável bem projetada e bem garantida não é perfeita, permanentemente estável. Está estável em relação à sua cavilha. *normal* condições, com episódios históricos reais documentados de stablecoins negociando significativamente longe de seu valor previsto de US $ 1,00 durante períodos de estresse (um banco executado em reservas centralizadas de um emitente, uma quebra de preço colateral para um projeto cripto-apoiado, ou (no caso de *algorítmico* stablecoins não respaldados por garantias suficientes, uma categoria que este livro trata com particular cautela, dada a sua falha histórica) um colapso total e permanente do peg. "Stablecoin" descreve um objetivo de design e um comportamento geral do mercado em condições normais, não uma garantia ironclad.

## Conceitos errôneos comuns

**Um símbolo que é chamado de "moeda estável" não é, por si só, evidência de que é realmente bem garantida ou segura.**, o termo descreve um objetivo de projeto pretendido, e o mecanismo específico (e sua garantia atual, se aplicável) tem que ser verificado individualmente para qualquer determinada stablecoin, exatamente o mesmo princípio de due-diligence já estabelecido para os créditos de fornecimento token [Fornecimento de Token](../tokens/token-supply.md#por-que-verificar-a-política-de-abastecimento-importa-antes-de-confiar-em-um-token).

**As moedas estáveis não são uma tecnologia Bitcoin-native ou Bitcoin-scaling**Eles são esmagadoramente um Ethereum e outro fenômeno inteligente-contrato-plataforma, uma vez que a implementação de qualquer modelo de garantia requer o tipo de lógica de contrato de finalidade geral [Bitcoin Script](../bitcoin/script.md) deliberadamente não suporta; sistemas stickcoin-adjacent stealcoin-like geralmente operam em sidechains ou sistemas Layer 2 com capacidade de contrato inteligente (ver [Rede líquida](../bitcoin-scaling/liquid.md) e [RGB](../bitcoin-scaling/rgb.md)).

## Outras leituras

- Ver também: [Moedas Estáveis Centralizadas](./centralized-stablecoins.md), [Moedas estáveis garantidas](./collateralized-stablecoins.md)

---

[← Anterior: Finanças descentralizadas](./README.md)
·
[Voltar para DeFi](./README.md)
·
[Próximo: Coelhinhos Estáveis Colateralizados →](./collateralized-stablecoins.md)
