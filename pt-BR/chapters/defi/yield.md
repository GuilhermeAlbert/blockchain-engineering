# Rendimento

"Rendimento" no DeFi cobre várias fontes estruturalmente diferentes de retorno, muitas vezes agrupadas sob um número na interface de um protocolo sem distinguir de onde ele realmente vem. Este capítulo divide essas fontes, e trabalha através da distinção APR-versus-APY que aparece em quase todos os números de rendimento citados no espaço.

## De onde o rendimento DeFi realmente vem

Cada posição de DeFi que suporta o rendimento, em última análise, remonta a uma de um pequeno número de fontes subjacentes, e entender qual delas se aplica a uma posição específica é a diferença entre avaliar o retorno real e sustentável e avaliar algo que depende da inflação contínua dos símbolos:

- **Taxas de negociação**: uma quota-parte da LP em taxas de swap, cobertas na totalidade [Prestadores de liquidez](./liquidity-providers.md#os-dois-componentes-do-retorno-lp). Rendimento real, gerado diretamente da atividade de negociação, mas emparelhado com risco de perda impermanente.
- **Juros dos mutuários**: uma parte dos juros pagos pelos mutuários num mercado comum de empréstimos, coberta por: [Empréstimos](./lending.md#taxas-de-juro-fixadas-por-utilização-não-por-decisão-central). Rendimento real, financiado pela procura real de empréstimos.
- **Recompensas de apostas**: tokens recém-emitidos ou uma parte da receita do protocolo paga àqueles que bloqueiam um token para o próprio consenso ou função de governança do protocolo, cobertos separadamente em [Posição vs. Empréstimo](./staking-vs-lending.md).
- **Emissões de token ("minagem de liquidez")**: um protocolo distribuindo seu próprio token de governança recém-criado para incentivar uma atividade (geralmente depositando em um pool específico), em cima de qualquer rendimento orgânico que essa atividade já gera. Esta é a fonte mais responsável por números de "APY" de três dígitos atraentes, e é fundamentalmente diferente das fontes acima: é pago a partir de inflação simbólica, não de qualquer atividade econômica subjacente, e seu valor depende inteiramente do símbolo emitido mantendo seu preço, que a pressão de venda pesada dos próprios agricultores de rendimento muitas vezes trabalha contra.

Uma figura de rendimento que não especifica de qual delas é construída, ou que combina vários em um número de título, não dá informações suficientes para julgar se é durável.

## APR versus APY: a questão agravante

**APR** (taxa anual percentual) é uma taxa anual simples, não composta. **APY** (rendimento percentual anual) contabiliza a soma: reinvestindo o rendimento ganho para que ele mesmo comece a ganhar rendimento, o que produz um retorno anual eficaz mais elevado do que o APR declarado para a mesma taxa subjacente.

```typescript
function aprToApy(apr: number, compoundsPerYear: number): number {
  return Math.pow(1 + apr / compoundsPerYear, compoundsPerYear) - 1;
}

const apr = 0.10; // 10% APR
console.log(aprToApy(apr, 365)); // 0.10515578..., about 10.52% APY with daily compounding
console.log(aprToApy(apr, 52));  // 0.10506479..., about 10.51% APY with weekly compounding
```

Um APR de 10% composto diariamente funciona para aproximadamente 10,52% APY, uma lacuna que aumenta conforme a taxa ou a frequência de composição aumenta. Muitas interfaces DeFi citam APY assumindo uma frequência específica, muitas vezes otimista, autocompondo que um usuário não está realmente alcançando a menos que eles estão usando um cofre ou estratégia que automaticamente reinvestiu no mesmo cronograma; manualmente, compostos manualmente incorre em custos reais, repetidos de gás cada vez, que pode consumir uma parte significativa do benefício teórico para tamanhos de posição menores.

## Por que números de rendimento muito elevados merecem escrutínio, não excitação

Um protocolo de publicidade de um APY muito acima do que as taxas de negociação ou juros de empréstimo por si só poderia plausivelmente gerar é muito provável que pagando a maior parte desse rendimento em tokens de governança recém emitidos, cujo preço de mercado o valor de rendimento tipicamente assume permanece constante, uma suposição de venda pesada de produtores de rendimento rotineiramente quebra. Um valor de rendimento é tão significativo como a sustentabilidade da sua fonte subjacente; comparar um rendimento baseado em taxas com um rendimento baseado em emissões como se fosse o mesmo tipo de número é um erro de categoria comum, caro.

## Conceitos errôneos comuns

**Um APY alto citado não é automaticamente melhor do que um inferior.** A composição é mais importante do que o número do título: um rendimento mais baixo construído inteiramente a partir de taxas de negociação ou juros de empréstimo pode ser uma posição fundamentalmente mais sólida do que um rendimento mais elevado que é principalmente emissões de um símbolo susceptível de depreciar à medida que mais dele entra em circulação.

**APY não é uma garantia de retorno futuro.** Quase cada valor de rendimento DeFi é um instantâneo de uma taxa atual, variável (a partir da utilização, volume de negociação, ou calendários de emissões que se alteram), não um retorno fixo, bloqueado em qualquer período futuro específico.

## Outras leituras

- Ver também: [Prestadores de liquidez](./liquidity-providers.md), [Empréstimos](./lending.md), [Posição vs. Empréstimo](./staking-vs-lending.md)

---

[← Anterior: Oráculos](./oracles.md)
·
[Voltar para DeFi](./README.md)
·
[Próximo: Estaca vs. Financiamento →](./staking-vs-lending.md)
