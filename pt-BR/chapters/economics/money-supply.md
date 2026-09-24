# Oferta Monetária

"O oferta monetária" soa como deveria se referir a um único número, óbvio, quanto dinheiro existe. Na prática, economistas rastreiam várias medidas diferentes, porque "dinheiro" em si é uma questão de grau: alguns ativos (dinheiro físico) são imediatamente gastáveis, enquanto outros (uma conta de poupança, um fundo do mercado monetário) são gastáveis apenas após um pequeno atraso ou passo de conversão. Este capítulo define as medidas normalizadas e explica por que razão as distinções são importantes para os debates sobre inflação e bancos centrais abrangidos por outras seções.

## Medidas-tipo

Os bancos centrais e os economistas organizam geralmente o oferta monetária em níveis baseados em **liquidez**, como rapidamente e facilmente um ativo pode ser convertido em dinheiro sem perda de valor:

- **M0 (base monetária)**: moeda física em circulação mais reservas de bancos comerciais detidas no banco central. Esta é a medida mais estreita e a mais diretamente controlada por um banco central.
- **M1**: componente moeda-em-circulação do M0, mais depósitos de demanda (contas de verificação ordinárias) e outros fundos que podem ser retirados sob demanda sem penalidade. Esta é a aproximação mais comum de "dinheiro prontamente disponível para despesas".
- **M2**: M1 mais contas de poupança, depósitos de pequenos prazos (como certificados de depósito abaixo de um limiar) e acções de fundos do mercado monetário de retalho. Ligeiramente menos líquido do que M1, mas ainda conversível para forma gastável rapidamente e com fricção mínima.
- **M3** (utilizado por alguns bancos centrais, descontinuado pela Reserva Federal dos EUA em 2006), M2 mais depósitos de tempo maior e fundos do mercado monetário institucional, capturando uma definição mais ampla e menos líquida de ativos semelhantes a dinheiro.

Os bancos centrais de diferentes países definem estes níveis com limiares específicos ligeiramente diferentes e incluem instrumentos, pelo que comparar, por exemplo, o M2 dos EUA diretamente com o M2 da zona euro exige cuidados exatamente com o que cada instituição conta.

## Por que a distinção importa

A escolha da medida para assistir afeta como você interpretaria reivindicações como "o suprimento de dinheiro cresceu 25% durante a pandemia". Grande parte do aumento dramático do M2 norte-americano durante 2020-2021 veio de uma combinação de compras de ativos do Federal Reserve (que expandem diretamente as reservas bancárias, parte do M0) e um aumento nos empréstimos bancários e pagamentos de estímulo do governo fluindo para contas de verificação e poupança (expandindo M1 e M2). Os economistas de diferentes escolas concordaram amplamente que a expansão era historicamente grande; onde eles discordavam era sobre o quanto dessa expansão se traduziria em inflação sustentada, dadas as diferentes visões sobre a relação entre o crescimento da oferta de dinheiro e os níveis de preços descritos em [Inflação e deflação](./inflation-and-deflation.md).

## Velocidade: a peça em falta

A teoria da quantidade do dinheiro, em sua forma clássica, é frequentemente expressa como uma identidade:

```text
M × V = P × Y
```

Onde `M` é o oferta monetária, `V` é o **velocidade do dinheiro** (quantas vezes, em média, uma unidade monetária é gasta num determinado período), `P` é o nível de preços, e `Y` é a produção econômica real. Essa identidade mostra por que o crescimento da oferta de dinheiro por si só não determina mecanicamente a inflação: se a velocidade cai ao mesmo tempo que a oferta de dinheiro aumenta (como aconteceu notavelmente em 2020, quando grande parte da expansão monetária da era pandêmica se assentou em economias em vez de ser gasta, devido a bloqueios e economia de precaução) o efeito inflacionário da oferta de dinheiro expandido pode ser silenciado ou atrasado. Monetaristas (ver [Monetarismo](./monetarism.md)) a velocidade historicamente assumida era relativamente estável e previsível, uma suposição que veio sob tensão empírica significativa a partir da década de 1980 como a inovação financeira tornou a velocidade consideravelmente mais volátil do que os modelos monetaristas anteriores assumidos.

## Fonte de dinheiro do Bitcoin

A oferta do Bitcoin é totalmente especificada pelas regras de protocolo, não medida após o fato através de inquéritos ao sistema bancário: o total de abordagens de oferta, mas nunca superior a 21 milhões de bitcoin, seguindo um calendário de emissão fixo que se divide aproximadamente a cada quatro anos (ver [21 milhões de BTC](../bitcoin/21-million.md) e [O halving](../bitcoin/halving.md)). Isto faz com que "a fonte monetária Bitcoin" seja um tipo fundamentalmente diferente de quantidade do que M1 ou M2 para uma moeda fictícia: não é uma medição emergente da atividade do sistema bancário, mas um número que cada nó completo pode calcular exatamente e independentemente a partir da própria blockchain. Se este tipo de fornecimento não-elástico é uma vantagem ou uma responsabilidade é objeto de [Dinheiro Deflacionário](./deflationary-money.md) e [Economia austríaca e Bitcoin](./austrian-economics-and-bitcoin.md).

## Conceitos errôneos comuns

**"Imprimir dinheiro" não é uma descrição precisa da maioria do crescimento moderno de oferta de dinheiro.** De acordo com o [Banco e Crédito](./banking-and-credit.md), a maioria da expansão do oferta monetária em um sistema fiduciário acontece através de empréstimos bancários comerciais, criando novos depósitos, não através de um banco central que emite nova moeda física.

**A crescente oferta monetária não produz de forma mecânica e imediata inflação proporcional.** A `M × V = P × Y` identidade mostra pelo menos três outras variáveis (velocidade, e crescimento real da produção) que também determinam a resposta do nível de preços a uma mudança na oferta monetária.

## Outras leituras

- [Federal Reserve, Money Stock Measures (H.6 release)](https://www.federalreserve.gov/releases/h6/current/)
- [Criação de Dinheiro na Economia Moderna](https://www.bankofengland.co.uk/-/media/boe/files/quarterly-bulletin/2014/money-creation-in-the-modern-economy.pdf): Bank of England, 2014

---

[← Anterior: Política Monetária](./monetary-policy.md)
·
[Voltar à Economia](./README.md)
·
[Próximo: O Efeito Cantillon →](./cantillon-effect.md)
