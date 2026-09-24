# Bolsas descentralizadas

Uma troca descentralizada (DEX) permite aos usuários negociar tokens diretamente contra um contrato inteligente, sem nenhuma empresa operando um livro de pedidos ou custódia de fundos de usuários entre comércios. Este capítulo cobre os dois modelos estruturalmente diferentes que os DEXs usaram, antes que o resto desta seção vá fundo no modelo que veio a dominar.

## DEXs do livro de encomendas

Trocas descentralizadas precoces tentaram replicar o modelo de troca tradicional (um emparelhamento de motor correspondente comprar e vender encomendas a preços acordados) on-chain. Isto correu diretamente para as restrições de rendimento do Bitcoin e do Ethereum (ver [Tamanho do Bloco](../bitcoin-scaling/block-size.md) e [Gás](../ethereum/gas.md)): postar, atualizar e cancelar ordens como transações individuais on-chain é lento e caro em relação a um motor de câmbio centralizado off-chain combinando, que pode processar ordens muito mais rápido e efetivamente sem custo por ordem. Alguns DEXs order-book mitigou isso, mantendo ordem correspondência off-chain e apenas liquidando negócios reais on-chain, um modelo híbrido com seus próprios tradeoffs de centralização (um componente off-chain é em si uma dependência de confiança, semelhante em espírito à questão de confiança do provedor RPC em [Fornecedores de RPC](../web3/rpc-providers.md)).

## Automated Market Makers: o modelo que ganhou

A alternativa (e, pelo volume de negociação, o modelo que passou a dominar o comércio descentralizado) substitui o livro de pedidos inteiramente por um **Fabricante de mercado automatizado (AMM)**: um contrato inteligente reservas de dois (ou mais) tokens, preços negociam algoritmicamente com base na relação atual das reservas, em vez de combinar individualmente comprar e vender ordens em tudo. Isto é coberto em detalhe mecânico completo em [Criadores de Mercado Automatizados](./amm.md) e [Fórmula constante do produto](./constant-product.md), com números reais, em vez de apenas uma descrição conceitual.

## Por que AMMs se encaixam melhor no modelo de execução blockchain

Os preços de uma AMM são uma função pura e determinística das reservas correntes (exatamente o tipo de apátrida, `view`- lógica computável por função (ver [Funções](../contracts/functions.md#ver-e-funções-puras)) que se encaixa naturalmente em uma única transação atômica: um usuário submete uma transação especificando "troca até X de token A para pelo menos Y de token B", e o contrato executa todo o swap em que uma transação ou reverte), sem esperar a ordem separada de uma contraparte para chegar, nenhum componente off-chain correspondente necessário em tudo. Este ajuste estrutural, mais do que qualquer decisão de design, é por isso que AMMs se tornou a arquitetura DEX dominante em vez de encomendar livros, apesar de livros de ordem ser o modelo mais familiar de finanças tradicionais.

## Conceitos errôneos comuns

**Uma troca descentralizada não elimina toda a confiança ou risco**Elimina o risco de custódia da contraparte no sentido específico de que um DEX nunca detém fundos de usuário entre as transações (ver [Custodial vs Carteiras Não- Personalizadas](../wallets/custody.md)), mas os usuários ainda carregam risco contrato inteligente (um bug ou exploração no próprio código do DEX, ver [Auditoria inteligente de contratos](../security/auditing.md)) e, especificamente para os MMM, os riscos de impacto nos preços e de perda impermanente abrangidos posteriormente nesta seção.

**"DEX" não implica uma única arquitetura universal**. Order-book e os DEXs baseados em AMM são sistemas genuinamente diferentes com diferentes tradeoffs, e este livro trata "AMM" e "DEX" como termos relacionados, mas não sinónimos, em toda parte, uma vez que conflitá-los obscurece diferenças arquitetônicas reais que valem a pena entender separadamente.

## Outras leituras

- Ver também: [Criadores de Mercado Automatizados](./amm.md), [Uniswap](./uniswap.md)

---

[← Anterior: Moedas estáveis centralizadas](./centralized-stablecoins.md)
·
[Voltar para DeFi](./README.md)
·
[Próximo: Automated Market Makers →](./amm.md)
