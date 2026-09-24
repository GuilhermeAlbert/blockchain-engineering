# Aave

Aave é um dos dois protocolos dominantes de concessão de empréstimos agrupados que esta seção tem referenciado ao longo de toda (ver [Empréstimos](./lending.md)), e sua própria história é um estudo de caso útil em como o mecanismo de núcleo de um protocolo pode permanecer estável enquanto seu modelo de produto muda substancialmente em torno dele.

## De ETHLend para Aave: um pivô de peer-to-peer para agrupados

O protocolo agora conhecido como Aave começou em 2017 como ETHLend, fundada por Stani Kulechov, uma plataforma de empréstimo peer-to-peer que combinou os credores individuais diretamente com os mutuários individuais, financiado através de uma oferta inicial de moeda que arrecadou aproximadamente 16,2 milhões de dólares. A correspondência entre pares acabou por ser um produto genuinamente difícil de fazer líquido e eficiente on-chain: os termos de empréstimo específicos de um credor precisavam de um mutuário específico e compatível para realmente executar, um problema de correspondência muito mais difícil do que um pool compartilhado que qualquer um pode imediatamente pedir emprestado ou depositar. A equipe reconstruiu o protocolo em torno do modelo agrupado que esta seção cobriu durante todo, relançando em janeiro de 2020 sob o nome de Aave (Finlandês para "fantasma").

## O que Aave adicionou para além do modelo de empréstimo de base

A contribuição específica de Aave para o modelo de empréstimo agrupado foi menos sobre o mecanismo central, que funciona o caminho [Empréstimos](./lending.md) e [Empréstimos](./borrowing.md) descrever em geral, e mais sobre as características circundantes construídas sobre ele: Aave foi uma implementação precoce e proeminente de empréstimos flash (ver [Empréstimos Flash](./flash-loans.md)), e introduziu **aTokens**, uma token de juros cunhada 1:1 contra os ativos fornecidos por um depositante, cujo saldo aumenta automaticamente à medida que os juros são acumulados, permitindo que o crédito crescente de um depositante seja representado como um saldo ERC-20 simples e transferível, em vez de exigir um cálculo separado dos juros.

## Por que o rebrand importa além de uma mudança de nome

A mudança da ETHLend para a Aave não era cosmética: refletia um verdadeiro repensar arquitectónico, passando de um modelo que não podia ultrapassar o atrito de um empréstimo individual que combina com o modelo agrupado de taxa de utilização que esta seção [Empréstimos](./lending.md) capítulo descreve como o projeto dominante real através do espaço hoje. Os anteriores de relançamento agrupados de Aave, e pela maioria das contas ajudou a estabelecer, o padrão específico (pools compartilhados, taxas de juros algorítmicas, sobre-colateralização, liquidação sem permissão) que essencialmente todo protocolo de empréstimo DeFi subsequente, incluindo Compound, convergiu.

## Conceitos errôneos comuns

**Aave não era originalmente um protocolo de concessão de empréstimos.** Seu produto ETHLend 2017-era utilizado diretamente peer-to-peer empréstimo correspondência, um design significativamente diferente do modelo compartilhado de pool o nome Aave tem sido associado desde o relançamento janeiro 2020; os dois não devem ser tratados como o mesmo produto sob nomes diferentes.

**Aave não é a única implementação importante do modelo de concessão de empréstimos agrupados.** Composto usa um modelo de agrupamento intimamente relacionado, mas independentemente desenvolvido, e vários outros protocolos através de muitas cadeias implementar variações no mesmo padrão geral; "Aave" e "DeFi empréstimo" não são sinônimos, mesmo que Aave é uma das implementações mais amplamente utilizadas do espaço.

## Outras leituras

- [Documentação do Aave](https://aave.com/docs)
- [Whitepaper Aave V2](https://github.com/aave/aave-protocol/blob/master/docs/Aave_Protocol_Whitepaper_v1_0.pdf)
- Ver também: [Empréstimos](./lending.md), [Empréstimos Flash](./flash-loans.md), [Liquidações](./liquidations.md)

---

[← Anterior: Uniswap](./uniswap.md)
·
[Voltar para DeFi](./README.md)
·
[Próximo: MakerDAO / Sky →](./maker.md)
