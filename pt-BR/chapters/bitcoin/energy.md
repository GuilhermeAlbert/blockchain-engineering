# Consumo de Energia

A mineração de Bitcoin consome uma quantidade genuinamente grande e mensurável de eletricidade (este é um fato documentado, não uma alegação contestada) porque [prova de trabalho](./proof-of-work.md) é deliberadamente projetado para exigir computação real, dispendiosa. Este capítulo abrange como o consumo é estimado, por que o custo energético é o ponto em vez de uma falha, e os argumentos substantivos de ambos os lados do debate resultante.

## Por que o consumo de energia não é incidental

Recordar de [Prova de Trabalho](./proof-of-work.md) e [Ataques de Sybil](../distributed-systems/sybil-attacks.md) que o modelo de segurança do Bitcoin depende especificamente da extensão da cadeia *custoso*, um partido querendo influência desproporcionada sobre o consenso precisa gastar recursos reais, externos (hardware e eletricidade) proporcionais a essa influência, que é precisamente o que torna a história reescrita caro (ver [Hashes e Block Linking](../blockchain/block-linking.md#o-custo-que-isso-impõe-refazer-prova-de-trabalho)). Consumo de energia não é um efeito colateral O projeto de Bitcoin falhou em minimizar. É o mecanismo literal que fornece a propriedade de segurança de que depende todo o sistema. Qualquer sistema de prova de trabalho com um custo de energia significativamente menor seria, pela mesma lógica, significativamente mais barato para atacar.

## Como se estima o consumo

Ninguém tem visibilidade completa e direta no uso real de eletricidade de cada minerador em todo o mundo. As operações de mineração estão geograficamente dispersas, e muitos não divulgam publicamente seu consumo de energia ou abastecimento. Estimativas, como o amplamente citado Cambridge Bitcoin Electricity Consumption Index (CBECI) do Cambridge Centre for Alternative Finance, trabalham para trás de **Hashrate observável** (ver [Hashrate](./hashrate.md)) combinados com **suposições sobre eficiência de hardware de mineração** (medidas em joules per terahash, que varia entre diferentes gerações de hardware ASIC, ver [ASICs](./asics.md)), uma vez que o real, real-world mix de eficiência de hardware atualmente em operação não é diretamente observável também, estimativas normalmente apresentam uma faixa plausível (um limite inferior assumindo apenas o hardware mais eficiente disponível, um limite superior assumindo uma mistura plausível, incluindo menos eficiente, hardware mais antigo) em vez de uma única figura precisa.

## A escala, e por que qualquer número específico vai ficar velho rapidamente

Estimativas publicadas têm, em vários pontos, colocado o consumo anual de eletricidade do Bitcoin em um intervalo comparável ao de um país de médio porte, um valor absoluto genuinamente grande. Este livro evita deliberadamente indicar um número atual específico, porque o valor muda continuamente com o preço de Bitcoin (que afeta o quanto a mineração é rentável), melhorias na eficiência de hardware e mudanças regionais de atividade de mineração (como a relocação substancial de operações de mineração após a proibição de mineração de 2021 da China), qualquer número codificado em um texto estático torna-se obsoleto rapidamente. Os leitores que desejam uma figura atual devem consultar uma fonte de atualização ao vivo como o CBECI diretamente.

## O debate principal

### O fato de se tratar de um custo grave

Os críticos argumentam que este nível de consumo de eletricidade representa um custo real de recursos (competindo para a mesma capacidade de rede elétrica, e em regiões ainda substancialmente dependentes de combustíveis fósseis, contribuindo para as emissões de carbono reais e mensuráveis) para um sistema cuja produção direta (uma rede de pagamento e liquidação segura e descentralizada) alguns críticos argumentam que não justifica obviamente essa escala de despesas de recursos em comparação com sistemas alternativos (incluindo cadeias de blocos de prova de participação, ver [Prova de Participação](../ethereum/proof-of-stake.md), que atingem a resistência de Sybil através de capital em jogo, em vez de gasto energético físico) ou infraestrutura financeira convencional.

### Caso o custo seja justificado ou exagerado como um problema

Proponentes fazem vários argumentos distintos, cada um vale a pena afirmar em seus próprios termos, em vez de misturar-se: em primeiro lugar, que a flexibilidade e portabilidade da mineração de Bitcoin (um minerador pode, em princípio, operar em qualquer lugar com eletricidade e uma conexão de internet, e pode rapidamente desligar sem o tipo de exigências de continuidade muitas cargas industriais têm) torna-se uma combinação incomum para **energia encalhada ou desperdiçada** (gás natural flagrado em locais de extração de petróleo, geração renovável reduzida que, de outra forma, ficaria não utilizada quando excedesse a demanda da rede, ou geração em locais muito remotos para a infraestrutura de transporte convencional atingir economicamente) transformando energia desperdiçada em valor monetizável, exportável sob a forma de bitcoin minado, e vários projetos específicos e empresas documentaram perseguir exatamente este modelo. Em segundo lugar, que a capacidade de mineração para reduzir rapidamente o consumo (abaixar em segundos, ao contrário de muitos processos industriais) torna-se um recurso de demanda flexível genuinamente útil para operadores de rede elétrica que gerenciam fontes renováveis variáveis, uma reivindicação alguns operadores de rede e pesquisadores têm examinado diretamente. Em terceiro lugar, que comparar o uso de energia do Bitcoin com os custos de energia e recursos da mineração de ouro existente e infraestrutura bancária/financeira tradicional que em parte visa substituir é uma comparação mais adequada do que tratar o uso de energia do Bitcoin em isolamento.

Este livro apresenta todos estes argumentos como posições reais, substantivas em um debate ativo, prova-contestável (não uma questão resolvida em qualquer direção) e incentiva os leitores a consultar fontes primárias, metodologicamente transparentes (citado abaixo) diretamente em vez de confiar em resumos em segunda mão de comentários fortemente pró- ou anti-Bitcoin.

## Conceitos errôneos comuns

**"O Bitcoin desperdiça energia" e "a utilização de energia do Bitcoin é totalmente justificada" são ambas simplificações excessivas** de uma questão empírica e baseada em valores genuinamente contestada, o mecanismo (custo energético como segurança) é um fato documentado, não contestado; se esse tradeoff vale a pena é uma questão de valores separados que este livro não resolve em nome do leitor.

**Uma única percentagem específica de eletricidade global ou um único número específico de pegadas de carbono não deve ser tratada como um fato fixo e permanente**Estes números são estimativas dinâmicas que mudaram significativamente ao longo da história do Bitcoin e continuam a mudar com a eficiência do hardware de mineração, mistura de fonte de energia e taxa de hash de rede.

## Outras leituras

- [Índice de Consumo de Eletricidade de Cambridge Bitcoin](https://ccaf.io/cbnsi/cbeci): Cambridge Centre for Alternative Finance
- Ver também: [Prova de Trabalho](./proof-of-work.md), [ASICs](./asics.md)

---

[← Anterior: 51% Ataques](./51-percent-attacks.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: 21 Milhões de BTC →](./21-million.md)
