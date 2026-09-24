# Criadores de Mercado Automatizados

Os preços automatizados do Market Maker negociam algorítmicamente a partir das reservas de tokens atuais de um pool, ao invés de combinar as compras e vendas individuais como uma troca tradicional faz. Este capítulo abrange o conceito geral de AMM; a fórmula específica e dominante (`x*y=k`) recebe seu próprio capítulo dedicado em seguida, em [Fórmula constante do produto](./constant-product.md), com números computados reais.

## A ideia central: preço das reservas, não das encomendas

Um AMM detém **pool** de duas (ou mais) tokens (por exemplo, ETH e USDC) e uma **função de fixação de preços** que determina a taxa de câmbio entre eles com base puramente em quanto de cada um dos pools atualmente detém. O comércio contra o consórcio altera as suas reservas, o que mecanicamente altera o preço do *próxima* Comércio. Não há nenhum livro de pedidos separado para consultar, nenhuma contraparte para combinar com; cada troca é contra o próprio pool, preço por uma fórmula que qualquer um pode calcular com antecedência a partir dos valores de reserva atuais, publicamente visíveis do pool.

## Porque é que isto precisa de fornecedores de liquidez

Uma AMM não se financia sozinha. Alguém tem que depositar as reservas iniciais (e contínuas) que tornam possível a negociação contra o pool. Este é o papel de **Prestadores de liquidez**, coberto na íntegra em [Prestadores de liquidez](./liquidity-providers.md): terceiros que depositam os dois tokens em um pool, em troca de uma parte das taxas de negociação cada swap contra esse pool gera, e (esta é a parte crucial, não óbvia) um risco real, quantificável de seu próprio, coberto em [Perda impermanente](./impermanent-loss.md).

## Taxas

Quase todos os AMM cobram uma pequena taxa em cada swap (normalmente 0,3% para muitos conjuntos de Uniswap-estilo, embora a taxa exata varia de acordo com o protocolo e, em alguns, por pool), uma percentagem fixa deduzida do montante de swap antes da fórmula de preços ser aplicada, acumulando-se no pool como reservas adicionais que os fornecedores de liquidez podem eventualmente retirar a sua parte proporcional. Esta taxa é o principal incentivo econômico para qualquer pessoa fornecer liquidez em primeiro lugar, uma vez que simplesmente manter ambos os tokens diretamente (sem depositá-los em um pool) não captura nenhuma dessas receitas de taxa.

## Fórmulas de preços diferentes para diferentes relações de ativos

Enquanto a fórmula produto constante (`x * y = k`, coberto próximo) é o mais conhecido e originalmente popularizado (por Uniswap, ver [Uniswap](./uniswap.md)), não é a única fórmula AMM em uso. Pools especificamente concebidos para ativos que se prevê negociar perto de uma relação fixa (duas moedas de estábulo diferentes, ambas destinadas a valer 1 dólar, por exemplo) utilizam geralmente curvas simples e diferentes (ver [Curve](./curve.md)) que reduzem o impacto dos preços especificamente nessa faixa de negociação estreita e esperada, ao custo de se comportarem de forma diferente se o valor relativo dos ativos divergir significativamente do rácio esperado. A escolha da curva de preços é uma decisão de design real e deliberada que corresponde aos ativos específicos que um pool deve servir, e não um padrão de tamanho único.

## Conceitos errôneos comuns

**O preço de um AMM pool não é definido por qualquer referência externa ou oráculo por padrão**. É determinado puramente pela relação de reserva interna própria do pool, que é precisamente por isso arbitragem (ver [Arbitragem](./slippage.md#arbitragem-e-porque-os-preços-entre-locais-convergem)) é o que realmente mantém o preço de um AMM em linha com o preço de mercado mais amplo em outro lugar, não qualquer ligação integrada a dados de mercado externo.

**Fornecer liquidez a um pool AMM não é uma forma isenta de risco de ganhar taxas**. [Perda impermanente](./impermanent-loss.md) o capítulo abrange, com números computados reais, um risco específico e quantificável que pode superar os rendimentos das taxas em condições de mercado reais e documentadas.

## Outras leituras

- [Whitepaper Uniswap v2](https://uniswap.org/whitepaper.pdf)
- Ver também: [Fórmula constante do produto](./constant-product.md), [Grupos de liquidez](./liquidity-pools.md)

---

[← Anterior: Bolsas descentralizadas](./dex.md)
·
[Voltar para DeFi](./README.md)
·
[Próximo: Fórmula de produto constante →](./constant-product.md)
