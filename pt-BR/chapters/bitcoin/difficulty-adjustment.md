# Ajuste de Dificuldade

A cada 2016 blocos (cerca de duas semanas, se blocos são média de 10 minutos) Bitcoin recalcula seu alvo de dificuldade, especificamente para corrigir por mais que o poder de hash total da rede tenha realmente mudado. Este capítulo abrange a fórmula exacta e os seus limites de segurança integrados.

## A fórmula

```text
new target = old target × (actual time for last 2016 blocks / expected time [2016 × 10 minutes])
```

Se os últimos blocos 2016 levou *maior* do que o esperado 20.160 minutos (duas semanas) (significando poder de hash efetivamente diminuiu, ou pelo menos não cresceu tão rápido quanto o alvo assumiu) a razão é maior que 1, e o alvo aumenta (tornando-o *mais fácil* para encontrar um bloco válido, corrigindo o tempo de bloqueio de volta para 10 minutos). Se esses blocos levaram *menos* tempo do que o esperado (aumento da potência do hash) a razão é menor que 1, e o alvo diminui *mais difícil*), novamente puxando o tempo de bloqueio médio de volta para 10 minutos.

## A pinça: limitando a dificuldade que pode oscilar ao mesmo tempo

Para evitar que um único período de reorientação produza um balanço extremo e desestabilizador (por exemplo, de um pico de potência de hash muito súbito e temporário ou colapso), as regras de consenso de Bitcoin **pinçar a relação de ajuste para entre 0,25x e 4x** por período de reorientação, a dificuldade não pode exceder o quádruplo ou a queda para menos de um quarto de seu valor anterior em qualquer ajuste único, independentemente do quão extremo o tempo real observado foi.

## Exemplo: computação de um ajuste

```typescript
const TARGET_TIMESPAN_SECONDS = 2016 * 10 * 60; // expected: 2 weeks, in seconds

function clampRatio(ratio: number): number {
  return Math.max(0.25, Math.min(4, ratio));
}

function adjustDifficulty(oldTarget: bigint, actualTimespanSeconds: number): bigint {
  const rawRatio = actualTimespanSeconds / TARGET_TIMESPAN_SECONDS;
  const clampedRatio = clampRatio(rawRatio);
  // Multiply as integers scaled by 1,000,000 to avoid floating-point
  // imprecision on very large bigint targets — mirroring, in spirit, how
  // real implementations avoid float arithmetic on consensus-critical values.
  const scaledRatio = BigInt(Math.round(clampedRatio * 1_000_000));
  return (oldTarget * scaledRatio) / 1_000_000n;
}

const oldTarget = 1000000n; // illustrative units, not a real 256-bit target
// Scenario: the last 2016 blocks took 3 weeks instead of 2 (network slowed down)
const threeWeeksSeconds = 3 * 7 * 24 * 60 * 60;
console.log("New target (network slower than expected):", adjustDifficulty(oldTarget, threeWeeksSeconds).toString());

// Scenario: the last 2016 blocks took only 2 days instead of 2 weeks (network much
// faster — the raw ratio would be ~0.143, but the 0.25x floor clamps it)
const twoDaysSeconds = 2 * 24 * 60 * 60;
console.log("New target (network much faster, clamped to 0.25x):", adjustDifficulty(oldTarget, twoDaysSeconds).toString());
```

Resultado verificado da execução deste código exato:

```text
New target (network slower than expected): 1500000
New target (network much faster, clamped to 0.25x): 250000
```

O primeiro cenário (3 semanas em vez de 2) produz uma relação bruta de 1,5, dentro da faixa de pinça, portanto, aplica-se diretamente. A razão bruta do segundo cenário seria de cerca de 0,143 (2 dias versus o esperado 14), mas as tampas de 0,25x quanto o alvo pode diminuir em um único ajuste, de modo que o resultado real reflete o clamp, não a relação bruta.

## Por que fixar intervalos de 2016-bloco, não ajuste contínuo

Ajustar apenas periodicamente, em vez de depois de cada bloco, é uma escolha de estabilidade deliberada: ajuste contínuo, por bloco com base em dados de tempo muito recentes e barulhentos (lembre-se de que os intervalos de bloqueio individuais variam consideravelmente em torno da média puramente por acaso, por [Tempo de bloco](../blockchain/block-time.md#como-o-intervalo-alvo-é-realmente-mantido)) arriscaria o alvo em busca de ruído estatístico de curto prazo em vez de mudanças genuínas e sustentadas na potência de hash de rede. Uma janela média de duas semanas suaviza este ruído consideravelmente enquanto ainda responde a mudanças reais e sustentadas dentro de um prazo razoável.

## O que acontece durante uma súbita queda de energia do hash

Se uma grande fração do poder de haxixe de rede desaparece de repente (históricamente, isso aconteceu durante as proibições regionais de mineração (mais notavelmente a repressão de mineração de 2021 da China, que removeu uma grande parte da potência de haxixe global dentro de semanas)) blocos desaceleram consideravelmente até o próximo realvo programado, uma vez que a dificuldade foi calibrada para o poder de haxixe maior, agora ausente. Uma vez que o retarde ocorre, o clamp 0,25x-4x permite uma correção substancial de uma vez, se necessário, e novos retardeamentos continuam a ajustar a cada duas semanas até que os tempos de bloqueio retornem ao normal, um teste de estresse real, historicamente observado, do mecanismo, que funcionou como projetado durante esse evento específico de 2021, restaurando aproximadamente 10 minutos de tempo de bloqueio médio nas semanas seguintes.

## Conceitos errôneos comuns

**O ajuste da dificuldade não acontece "a cada duas semanas" em um calendário fixo.** Isso acontece a cada blocos de 2016, que média de cerca de duas semanas apenas se os blocos estão realmente chegando perto de seu alvo de 10 minutos, durante um período incomum (como o cenário de queda de potência de hash acima), o intervalo entre real retardeamento pode ser visivelmente mais longo ou mais curto do que duas semanas de calendário.

**A pinça 0,25x-4x é um limite por ajuste, não um limite vitalício.** A dificuldade mudou por muitas ordens de magnitude sobre a história de Bitcoin através do efeito cumulativo de muitos ajustes individuais, cada um individualmente limitado pela pinça, a pinça limita o tamanho de qualquer salto único, não a mudança total possível ao longo do tempo.

## Outras leituras

- [Referência do desenvolvedor do núcleo do Bitcoin: Target (nBits) e redirecionamento](https://developer.bitcoin.org/reference/block_chain.html#target-nbits)

---

[← Anterior: Dificuldade em Mineração](./difficulty.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Nonce →](./nonce.md)
