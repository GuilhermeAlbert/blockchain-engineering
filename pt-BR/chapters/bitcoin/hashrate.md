# Hashrate

Hashrate é o poder computacional total atualmente sendo aplicado à mineração de Bitcoin, medido em hashes por segundo. Este capítulo curto cobre como ele é estimado (já que, como a contagem de nós de rede, ele não pode ser observado diretamente) e o que ele realmente lhe diz.

## Por que o hashrate não pode ser medido diretamente

Nenhum registro central rastreia quanto hardware de mineração existe ou quão rápido ele está rodando. O hashrate é inferido, não observado, a partir da única informação pública que a rede realmente fornece: **quão rapidamente os blocos estão sendo encontrados em relação à dificuldade atual**. Porque a dificuldade define uma probabilidade conhecida, calculável de encontrar um bloco válido por tentativa de hash (ver [Dificuldade em Mineração](./difficulty.md) e [Prova de Trabalho](./proof-of-work.md)), *observado* tempo médio entre blocos pode ser trabalhado para trás em uma *implícito* hashrate total, usando a mesma relação ao contrário.

## A fórmula de estimativa

```text
estimated hashrate ≈ (difficulty × 2^32) / (average observed seconds per block)
```

Este é exatamente o inverso do cálculo mostrado em [Prova de Trabalho](./proof-of-work.md#exemplo-computação-das-probabilidades-aproximadas-de-hoje): dada uma dificuldade conhecida e uma *assumido* tempo médio de bloqueio (10 minutos), você pode estimar hashrate; dada uma dificuldade conhecida e a *realmente observado* tempo médio de bloqueio sobre alguma janela recente, você pode em vez disso resolver para o hashrate que produziria esse tempo observado.

## Exemplo

```typescript
function estimateHashrate(difficulty: number, averageSecondsPerBlock: number): number {
  return (difficulty * Math.pow(2, 32)) / averageSecondsPerBlock;
}

const illustrativeDifficulty = 90_000_000_000_000; // illustrative, not live — see difficulty.md
const observedAverageSeconds = 580; // blocks arriving slightly faster than the 600-second target
const hashrate = estimateHashrate(illustrativeDifficulty, observedAverageSeconds);
console.log("Estimated hashrate (H/s):", hashrate.toExponential(3));
console.log("Estimated hashrate (EH/s):", (hashrate / 1e18).toFixed(1));
```

Resultado verificado da execução deste código exato:

```text
Estimated hashrate (H/s): 6.665e+20
Estimated hashrate (EH/s): 666.5
```

Estes números usam uma figura ilustrativa, não viva, dificuldade, substituí-la por um valor específico, datado, citado de uma fonte viva antes de tratar qualquer figura hashrate neste capítulo como atual.

## Por que as estimativas de hashrate de fontes diferentes às vezes discordam

Diferentes serviços de rastreamento usam diferentes janelas de observação (as últimas 24 horas de blocos versus a última semana, por exemplo) e metodologias de suavização ligeiramente diferentes, que podem produzir estimativas de hashrate visivelmente diferentes a qualquer momento, mesmo que todos eles estejam trabalhando a partir do mesmo tempo de bloqueio subjacente, disponível publicamente e valor de dificuldade, uma fonte real da inconsistência menor que você vai notar comparando números de hashrate entre diferentes exploradores de blocos ou sites de estatísticas.

## Por que hashrate assuntos para a segurança

Hashrate é a quantidade prática do mundo real por trás da abstrata "parte do poder do hash" (`q`) utilizado em toda a [Finalidade Probabilística](../distributed-systems/probabilistic-finality.md) e [51% Ataques](./51-percent-attacks.md), um hashrate de rede honesto total mais elevado significa que um atacante precisa adquirir e operar proporcionalmente mais hardware para alcançar qualquer fração da potência total da rede, por isso que o crescimento sustentado do hashrate é geralmente tratado dentro da comunidade Bitcoin como um indicador positivo da margem de segurança global da rede, mesmo que não diga nada diretamente sobre descentralização (ver [Pools de Mineração](./mining-pools.md#a-questão-da-centralização)), que é uma preocupação distinta, distinta.

## Conceitos errôneos comuns

**Números de hashrate comunicados por painéis públicos são estimativas, não medições exatas**, tratar qualquer figura específica citada hashrate como uma aproximação com alguma incerteza inerente e variação metodologia-dependente, não uma verdade de terreno precisamente conhecido.

**Hashrate crescente não significa automaticamente aumento da descentralização**, e pode de fato coincidir com o contrário se o crescimento se concentra entre um pequeno número de grandes operadores ou pools, hashrate (segurança total) e descentralização (distribuição de controle sobre essa segurança) são propriedades relacionadas, mas distintas, ambos cobertos em toda esta seção.

## Outras leituras

- Ver também: [Dificuldade em Mineração](./difficulty.md), [Prova de Trabalho](./proof-of-work.md)

---

[← Anterior: ASIC](./asics.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: 51% Ataques →](./51-percent-attacks.md)
