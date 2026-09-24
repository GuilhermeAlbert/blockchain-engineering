# Stock-to-Flow

Stock-to-flow é um modelo de avaliação, popularizado na comunidade Bitcoin a partir de 2019 por um analista pseudônimo conhecido como "PlanB", que tenta relacionar o preço do Bitcoin com seu cronograma de emissão. Este capítulo cobre o que o modelo realmente afirma, por que ele atraiu tanta atenção, e as críticas substantivas, metodológicas que levaram muitos economistas e analistas quantitativos (incluindo alguns dentro da comunidade Bitcoin) a tratá-lo como não confiável. Este é um caso em que apresentar "ambos os lados" sem pesar as evidências iria deturpar o estado real do debate; este capítulo diz isso diretamente.

## O conceito principal

**Existências (S2F)** é um rácio: o stock existente de um ativo (valor total já existente) dividido pelo seu fluxo (nova produção por ano). Um rácio entre stocks e fluxos mais elevado significa que a nova produção acrescenta uma percentagem menor à oferta existente, a mesma ideia subjacente à taxa de inflação anual discutida em [Esquema de Emissão](./issuance.md), apenas expresso como um rácio (stock/flow) em vez de uma percentagem (fluxo/stock). Literalmente a relação recíproca). Stock-to-flow é um conceito de longa data na economia de commodities, historicamente usado para explicar por que o ouro, com uma relação estoque-a-fluxo muito alta (uma grande estoque existente em relação à modesta produção de mineração anual), tem funcionado bem como uma loja de valor em comparação com as commodities com baixas taxas estoque-a-fluxo (como a maioria das commodities industriais ou agrícolas, onde a produção anual é grande em relação aos estoques existentes, tornando-os mais vulneráveis às oscilações de preços das mudanças de produção).

## Modelo específico do PlanB

O modelo do PlanB, publicado em um artigo de março de 2019, propôs uma relação matemática específica (ajustando uma regressão da lei de poder entre a relação estoque-fluxo histórico de Bitcoin (que sobe em etapas discretas a cada metade) e seu preço histórico) e usou essa relação ajustada para projetar níveis de preços futuros após metades subsequentes, gerando previsões de preços específicas e quantitativas que receberam atenção e discussão significativa dentro da comunidade e meios financeiros de Bitcoin até 2020 e 2021.

## As críticas metodológicas

Várias críticas substantivas e específicas foram levantadas, principalmente por economistas e pesquisadores quantitativos, incluindo algumas figuras proeminentes dentro da própria comunidade de pesquisa Bitcoin mais ampla:

- **Correlação espúria com o tempo.** Os críticos, incluindo uma crítica amplamente discutida pelo pesquisador do Bitcoin Nic Carter e outros em análises subsequentes, apontaram que, como a relação estoque-fluxo de Bitcoin e o preço de Bitcoin têm, historicamente, tendência geral para cima ao longo do tempo, uma regressão entre os dois pode produzir um ajuste estatístico aparentemente forte em grande parte porque *ambos* variáveis estão correlacionadas com o tempo em si, ao invés de porque estoque-a-fluxo é preço genuinamente impulsionador, uma pitfall estatística bem conhecida (correlação espúria entre duas séries temporais de tendência independente) que não estabelece, por si só, qualquer relação causal ou mesmo preditiva confiável.
- **Nenhuma conta de procura.** O modelo refere-se apenas ao lado da oferta (stock-to-flow), sem qualquer termo que represente a procura, mas com uma lógica econômica de base (ver [O que é dinheiro?](../economics/money.md)) considera que o preço é determinado pela interacção da oferta *e* demanda; um modelo que omite a demanda inteiramente, argumentam os críticos, não pode ser uma explicação completa ou confiável de preço, mesmo que isso aconteça para caber dados históricos razoavelmente bem sobre alguma janela específica, limitada.
- **Falha em aguentar fora da amostra.** Seguindo o período de maior atenção do modelo, a ação de preço real de Bitcoin em 2021-2023 divergiu substancialmente e por um período sustentado a partir dos níveis que o modelo estoque-a-fluxo havia projetado, que muitos analistas (incluindo alguns que antes tinham encontrado o ajuste histórico do modelo interessante) tratou como uma falha empírica significativa das alegações preditivas do modelo, não meramente normal, esperada volatilidade em torno de uma tendência correta.

## Onde isto deixa o modelo

Stock-to-flow permanece um real, historicamente fundamentado *conceito* na economia de commodities em geral, e o rácio stock-to-flow do Bitcoin é um número real, computável e significativo que reflecte o seu calendário de emissão (diretamente relacionado com o material já abrangido [Esquema de Emissão](./issuance.md)). *modelo de preço preditivo específico* construído sobre esse conceito, no entanto, é tratado com um ceticismo substancial e bem documentado por economistas e pesquisadores quantitativos, pelas razões especificadas acima. Isto está mais perto do consenso de especialistas do que de um debate não resolvido e equilibrado, e este livro apresenta-o de acordo, em vez de como um enquadramento neutro "alguns dizem, outros dizem" que iria subestimar quão exaustiva e especificamente o modelo preditivo tem sido desafiado.

## Conceitos errôneos comuns

**Estoque a fluxo como um conceito econômico geral e modelo específico de previsão de preços do PlanB para 2019 não são a mesma coisa**, e a crítica do último não invalida o primeiro. A razão em si é uma maneira legítima, padrão de comparar a oferta existente de um ativo monetário com a sua taxa de produção; o que é especificamente contestado é se uma regressão simples contra o preço histórico prevê de forma confiável o preço futuro.

**O ajuste histórico de um modelo aos dados passados não é, por si só, evidência de que ele irá prever dados futuros de forma confiável**Este é um princípio estatístico geral (relacionado com o risco de sobreajustamento), não uma crítica única para estoque-a-fluxo, e é por isso que o desempenho atual do modelo, posterior, fora da amostra (que divergiu de suas projeções) é o teste mais relevante do que o quão bem ele parecia caber dados disponíveis antes dessas projeções foram feitas.

## Outras leituras

- [PlanB, "Modelar o Valor do Bitcoin com Escassez"](https://medium.com/@100trillionUSD/modeling-bitcoins-value-with-scarcity-91fa0fc03e25), Médio, Março de 2019 (modelo original)
- [Nic Carter, "O modelo de stock-to-Flow Bitcoin é fundamentalmente desfeito"](https://www.coindesk.com/markets/2020/06/30/why-the-stock-to-flow-bitcoin-valuation-model-is-wrong), CoinDesk, 2020

---

[← Anterior: Esquema de Emissão](./issuance.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Moedas perdidas →](./lost-coins.md)
