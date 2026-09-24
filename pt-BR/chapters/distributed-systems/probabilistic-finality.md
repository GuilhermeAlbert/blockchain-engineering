# Finalidade Probabilística

O whitepaper do Bitcoin inclui uma fórmula real para exatamente quão confiante você deve estar de que uma transação não será revertida, em função de quantos blocos foram extraídos em cima dela e quanta potência computacional um atacante pode controlar. Este capítulo trabalha através dessa fórmula diretamente, com números verificados, em vez de deixar "esperar por confirmações" como conselho vago.

## A configuração

Recordar de [Finalidade](./finality.md#finalidade-probabilística) que o Bitcoin oferece finalidade probabilística, não determinística: quanto mais fundo um bloco é enterrado sob blocos subsequentes, menos provável torna-se que um ator desonesto poderia produzir uma cadeia alternativa que o ultrapassa. A Seção 11 do Bitcoin modela isso precisamente como uma corrida entre a cadeia honesta e a cadeia privada de um atacante, e calcula a probabilidade de que o atacante alcance.

## O modelo

Vamos `q` ser a fração da potência total de hash da rede controlada por um atacante (assim `p = 1 - q` é a parte da rede honesta), e deixe `z` ser o número de blocos extraídos no topo da transação em questão (sua contagem de confirmação). Presume-se que o atacante esteja minerando uma cadeia secreta e competitiva a partir do bloco antes da transação, esperando produzir uma cadeia mais longa e forçar a rede a se reorganizar longe da cadeia honesta, revertendo a transação.

O whitepaper modela as chances do atacante usando uma distribuição de Poisson (aproximando o número de blocos que o atacante consegue minar no tempo que leva a cadeia honesta para estender por `z` blocks) combinado com um cálculo de Ruína de Jogador (o problema clássico de probabilidade-teoria de uma caminhada aleatória com um viés, aplicado aqui para se a contagem de blocos do atacante pode chegar até a cadeia honesta). A fórmula resultante, dada diretamente no whitepaper:

```text
p = probability the honest network finds the next block
q = probability the attacker finds the next block
qz = probability the attacker ever catches up from z blocks behind

λ = z(q/p)

P(catch up) = 1 - Σ (k=0 to z) [ (λ^k · e^-λ / k!) · (1 - (q/p)^(z-k)) ]
```

## Exemplo: computá-lo diretamente

```typescript
function factorial(n: number): number {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function attackerSuccessProbability(q: number, z: number): number {
  const p = 1 - q;
  const lambda = z * (q / p);
  let total = 1.0;
  for (let k = 0; k <= z; k++) {
    const poisson = (Math.exp(-lambda) * Math.pow(lambda, k)) / factorial(k);
    total -= poisson * (1 - Math.pow(q / p, z - k));
  }
  return total;
}

for (const z of [1, 2, 6, 10]) {
  console.log(`q=0.10, z=${z}: P(reversal) = ${attackerSuccessProbability(0.1, z)}`);
}
```

Resultado verificado da execução deste código exato (corresponde à tabela publicada pelo próprio whitepaper):

```text
q=0.10, z=1:  P(reversal) = 0.20458727394278242
q=0.10, z=2:  P(reversal) = 0.05097789283933862
q=0.10, z=6:  P(reversal) = 0.00024280274536282221
q=0.10, z=10: P(reversal) = 0.0000012414021748015377
```

## O que os números realmente dizem

A tabela abaixo estende este mesmo cálculo através de vários hash-power shares atacantes, verificados diretamente executando o código acima com diferentes `q` valores:

| Confirmações (z) | q = 10% | q = 30% | q = 45% |
| --- | --- | --- | --- |
| 1 | 20.5% | 62.8% | 92.0% |
| 2 | 5.1% | 44.6% | 87.8% |
| 6 | 0.024% | 13.2% | 76.6% |
| 10 | 0.00012% | 4.2% | 68.5% |
| 20 | ~0% | 0.25% | 53.7% |

Duas coisas se destacam. Primeiro, com uma modesta participação de atacantes (10% do poder de hash, já uma quantidade muito grande e cara de hardware de mineração real para controlar), a confiança cresce extremamente rapidamente com confirmações: em 6 confirmações, a probabilidade de reversão caiu abaixo de um em quatro mil, e em 10 confirmações está abaixo de um em um milhão. É por isso que "6 confirmações" (aproximadamente uma hora, no tempo médio de bloqueio de ~10 minutos do Bitcoin, ver [Tempo de bloco](../blockchain/block-time.md)) tornou-se um padrão informal amplamente utilizado para considerar um pagamento Bitcoin liquidado para fins mais práticos, e por que as trocas historicamente exigiam mais confirmações para depósitos maiores.

Segundo, e igualmente importante: **contra um atacante com cerca de 50% do poder de hash da rede, nenhum número de confirmações torna a probabilidade de reversão negligenciável.** Em `q = 45%`, mesmo 20 confirmações ainda deixa mais de 50% de chance do atacante eventualmente alcança, porque o poder de mineração do atacante está tão perto da rede honesta que a corrida fica por perto indefinidamente. Este é o conteúdo matemático por trás do termo "ataque 51%" (ver [51% Ataques](../bitcoin/51-percent-attacks.md)): todo o modelo de segurança assume que a parte do atacante permanece significativamente, não apenas marginalmente, abaixo da metade.

## Debaixo do capô: porque esperar ajuda

Intuitivamente, cada confirmação adicional é outra rodada da cadeia privada do atacante tem que acompanhar ou ultrapassar, e porque o atacante tem estritamente menos poder de hash do que a rede honesta (por suposição. Este modelo inteiro quebra uma vez que um atacante realmente excede 50%), cada rodada adicional é, em média, outra rodada o atacante fica mais para trás em vez de recuperar. O termo Poisson explica a aleatoriedade do mundo real em exatamente quantos blocos cada lado encontra em um determinado trecho de tempo, ao invés de assumir um ritmo perfeitamente constante e determinístico.

## Comércio

Escolher quantas confirmações esperar é uma decisão de risco direta e quantificável, não uma convenção arbitrária, uma transação no valor de US$10 milhões e uma transação no valor de US$10 milhões garantem diferentes limiares de confirmação, dada a mesma curva de probabilidade subjacente, razão pela qual o número "certo" de confirmações depende do valor em risco e da suposição do divulgador sobre o realismo do hash-power share atacante, não uma única regra universal.

## Conceitos errôneos comuns

**Confirmações zero não significa segurança zero, mas significa muito pouca segurança contra uma determinada tentativa de gasto duplo**, uma transação não confirmada no mempool pode, em princípio, ser substituída por uma transação conflitante antes de ser minada (ver [Substituir por Fee](../bitcoin/mempool.md)), por isso os comerciantes que aceitam pagamentos instantâneos e não confirmados para bens de alto valor carregam risco real e documentado.

**Mais confirmações não reduzem a probabilidade para exatamente zero em qualquer número finito**, como a tabela acima mostra diretamente. O modelo produz apenas probabilidades de desaparecimento pequena, não literalmente zero, que é o significado preciso de "probabilístico" no título deste capítulo.

## Outras leituras

- [Whitepaper Bitcoin, Seção 11 (Calculações)](https://bitcoin.org/bitcoin.pdf): a fórmula e tabela originais deste capítulo verifica e estende

---

[← Anterior: Finalidade](./finality.md)
·
[Voltar aos Sistemas Distribuídos](./README.md)
·
[Próximo: O que é um Blockchain? →](../blockchain/README.md)
