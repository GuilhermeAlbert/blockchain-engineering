# Uniswap

Uniswap é o protocolo que popularizou o produto constante AMM (ver [Fórmula constante do produto](./constant-product.md)) e, pelo volume de negociação, continua a ser a troca descentralizada mais utilizada no Ethereum. Este capítulo traça suas três versões principais como um estudo de caso em como o modelo AMM esta seção tem coberto mecanicamente realmente evoluiu na produção.

## v1: prova do conceito, pares somente de ETH

Uniswap v1 lançado na mainnet Ethereum em 2 de novembro de 2018, construído por Hayden Adams como uma implementação de um projeto AMM Ethereum co-fundador Vitalik Buterin tinha anteriormente esboçado em um post Reddit. Cada pool v1 emparelhou um único token ERC-20 contra ETH diretamente; não havia como criar um pool entre dois tokens ERC-20 arbitrários. Negociar entre dois tokens não-ETH significou rotear através de dois pools separados (token A para ETH, então ETH para token B), uma demonstração precoce de que a fórmula de produto constante sozinho era suficiente para construir uma troca funcional, sem permissão, sem ainda ser o projeto de propósito geral versões posteriores tornou-se.

## v2: pares ERC-20 arbitrários e oráculos de preço

Uniswap v2 lançado em maio de 2020, removendo inteiramente o requisito de par ETH: qualquer token ERC-20 pode ser emparelhado diretamente contra qualquer outro. V2 introduziu também um mecanismo de preços médios ponderados em função do tempo (ver [Oráculos](./oracles.md#oráculos-twap-preço-derivado-do-histórico-comercial-de-uma-amm)), permitindo que outros contratos leiam um preço resistente à manipulação diretamente do histórico de negociação acumulado de uma Uniswap pool, que se tornou um bloco de construção amplamente utilizado para outros protocolos DeFi que precisam de uma referência de preço on-chain. Os contratos principais da V2 são de código aberto e permanecem, em forma modificada ou diretamente bifurcada, uma das peças de código mais amplamente reutilizadas na DeFi.

## v3: liquidez concentrada

Uniswap v3 lançado em 5 de maio de 2021, com a maior mudança estrutural da seção: **liquidez concentrada**. Em vez de o capital de um prestador de liquidez ser distribuído em toda a curva de preços de zero para infinito (como no modelo uniforme de v1 e v2), um v3 LP escolhe uma faixa de preços específica para concentrar o seu capital dentro. O capital comprometido com uma faixa estreita em torno do preço atual ganha proporcionalmente mais taxas por dólar depositadas do que o mesmo capital espalhado por toda a faixa, uma vez que é usado ativamente para uma parcela muito maior de transações que ocorrem perto do preço atual, ao custo desse capital não ganhando nada (e sendo totalmente convertido para o único ativo que o preço se moveu para) uma vez que o preço sai da faixa escolhida inteiramente. Uniswap Labs descreve isso como permitindo significativamente maior eficiência de capital do que a distribuição uniforme de v2 para liquidez concentrada perto do preço atual, embora o múltiplo exato depende fortemente da faixa específica escolhida e como ativamente ele é gerenciado como o preço move.

## O que esta história ilustra sobre o design AMM

Cada versão resolveu uma limitação específica e concreta da anterior, em vez de ser um redesenho ground-up: v2 removeu a exigência de roteamento do ETH e v3 abordou a ineficiência de capital do v2 para liquidez longe do preço de negociação atual. Este padrão incremental é típico de como os primitivos DeFi evoluíram geralmente: o mecanismo de produto constante do núcleo de [Fórmula constante do produto](./constant-product.md) permaneceu a base de preços em todas as três versões, com cada iteração mudando como a liquidez é organizada e preço em torno dessa mesma fórmula subjacente em vez de substituí-la.

## Conceitos errôneos comuns

**A liquidez concentrada da Uniswap v3 não elimina perdas impermanentes.** Varia a eficiência de capital de um LP e a intensidade de ganho de taxa dentro de um intervalo escolhido, mas a exposição subjacente ao movimento de preços, e a perda impermanente que vem com ele (ver [Perda impermanente](./impermanent-loss.md)), funciona da mesma forma dentro dessa faixa como faz para uma posição v2 estilo full-range; uma posição v3 pode, de fato, experimentar efetivamente pior perda impermanente do que uma posição v2 full-range se o preço sai da faixa escolhida.

**"Uniswap" não se refere a uma única implantação.** Seus contratos v2 e v3, sendo de código aberto, foram diretamente bifurcados e implantados como protocolos separados, independentemente operados inúmeras vezes, alguns com mudanças de parâmetros e alguns quase idênticos; encontrar "um fork Uniswap" em uma cadeia diferente ou sob um nome de marca diferente é comum e não implica qualquer relação com Uniswap Labs.

## Outras leituras

- [Whitepaper Uniswap v2](https://uniswap.org/whitepaper.pdf)
- [Whitepaper Uniswap v3](https://uniswap.org/whitepaper-v3.pdf)
- [Contratos de base Uniswap v2](https://github.com/Uniswap/v2-core)
- Ver também: [Fórmula constante do produto](./constant-product.md), [Criadores de Mercado Automatizados](./amm.md)

---

[← Anterior: Tomada vs. Empréstimo](./staking-vs-lending.md)
·
[Voltar para DeFi](./README.md)
·
[Próximo: Aave →](./aave.md)
