# Tokens

Os padrões Token são interfaces, não código implantado. Esta seção explica o ERC-20, o ERC-721 e o ERC-1155 através de suas assinaturas e eventos reais de funções, construindo trabalhos, implementações compiladas em vez de descrever os padrões no resumo. Cada interface e contrato não trivial nesta seção foi compilado com solc 0.8.26 e confirmado para construir de forma limpa; o endereço real implantado do exemplo WETH foi verificado ao vivo, on-chain.

## O que você precisa saber primeiro

[Contratos Inteligentes](../contracts/README.md), especialmente [Mapeamentos](../contracts/mappings.md) e [Eventos e Registros](../contracts/events.md)Os contratos de token são, mecanicamente, mapeamentos rastreados através dos padrões que a seção já cobriu.

## Capítulos

1. [ERC-20](./erc-20.md): a interface do token fungible, com uma implementação completa
2. [Saldos](./balances.md): por que um saldo é apenas um mapeamento, verificado contra as decimais reais de um token
3. [Transferências](./transfers.md): transferência vs. transferênciaDe, e a distinção de confiança entre eles
4. [Subsídios e homologações](./approvals.md): a condição de aprovação da corrida, e por que as aprovações ilimitadas são um risco real
5. [ERC-721](./erc-721.md): tokens não-fungible, e o cofreTransferDe verificação ERC-20 falta inteiramente
6. [ERC-1155](./erc-1155.md): um contrato, muitos tipos de tokens, e a eficiência de loteamento que motivou
7. [Metadados NFT](./nft-metadata.md): tokenURI, e o verdadeiro fosso entre a permanência na cadeia e a disponibilidade fora da cadeia
8. [Emissão e queima](./minting-and-burning.md): a convenção do endereço zero, e por que cunhar controle de acesso importa enormemente
9. [Ativo Embrulhado](./wrapped-assets.md): o padrão lock-and-mint, e o modelo de confiança de custódia do WBTC declarado claramente
10. [Eter embrulhado](./weth.md): um contrato WETH completo, compilado, com seu endereço mainnet real verificado ao vivo
11. [Fornecimento de Token](./token-supply.md): por que "fornecimento fixo" é tão confiável quanto o código que o impõe

## Próxima

Continuar a [Construindo Aplicações Web3](../web3/README.md), onde essas mesmas interfaces são chamadas a partir de aplicativos normais TypeScript, saldos de leitura, eventos de decodificação e envio de transações contra contratos reais ao vivo.
