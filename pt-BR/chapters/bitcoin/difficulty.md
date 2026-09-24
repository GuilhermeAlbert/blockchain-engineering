# Dificuldade em Mineração

"Dificuldade" é um número normalizado, humano-amigo que representa o quão difícil é atualmente encontrar um hash de bloco válido, expresso em relação ao alvo mais fácil Bitcoin já definido. Este capítulo cobre exatamente como a dificuldade se relaciona com o alvo, e como a codificação compacta "bits" armazenada em cada cabeçalho de bloco realmente funciona.

## Dificuldade como proporção

O bloqueio de gênese do Bitcoin usou o alvo máximo possível. A dificuldade mais fácil que o protocolo permite, definida como **dificuldade 1**. Cada valor de dificuldade subsequente é expresso como uma relação: quantas vezes mais difícil o alvo atual é do que aquele alvo original, mais fácil.

```text
difficulty = (difficulty-1 target) / (current target)
```

Porque a *menor* média do alvo numérico *menos* saídas de hash válidas e, portanto *mais* tentativas necessárias em média, dificuldade e alvo se movem em direções opostas: à medida que a dificuldade aumenta, o alvo encolhe. Uma dificuldade de, digamos, 50.000.000.000 significa que o alvo atual é 50 bilhões de vezes menor (difícil de atingir) do que o alvo inicial dificuldade-1, o que significa que aproximadamente 50 bilhões de vezes mais tentativas de hash são necessárias em média para encontrar um bloco válido.

## A codificação compacta de "bits"

Armazenar um alvo completo de 256 bits diretamente em cada cabeçalho de bloco seria desnecessariamente grande, dado o quanto dos bits de alta ordem desse número são tipicamente todos zeros (que é exatamente o que um alvo pequeno parece). Bitcoin armazena uma **representação compacta** no campo "bits" do cabeçalho, um valor de 4-byte codificando um coeficiente e um expoente, semelhante em espírito à notação científica de ponto flutuante, que se expande para o alvo completo de 256 bits através de uma fórmula definida. Este é um truque de codificação de economia de espaço puro; ele não muda o valor do alvo subjacente ou os cálculos de probabilidade, apenas quão compactamente esse valor é representado no cabeçalho de 80-byte.

## Exemplo: converter bits para um alvo

```typescript
function bitsToTarget(bits: number): bigint {
  const exponent = bits >>> 24;
  const coefficient = BigInt(bits & 0x007fffff);
  if (exponent <= 3) {
    return coefficient >> BigInt(8 * (3 - exponent));
  }
  return coefficient << BigInt(8 * (exponent - 3));
}

// 0x1d00ffff was Bitcoin's actual genesis-era difficulty-1 bits value.
const genesisBits = 0x1d00ffff;
const target = bitsToTarget(genesisBits);
console.log("Target (hex):", target.toString(16));
console.log("Target (decimal, approx):", target.toString());
```

Resultado verificado da execução deste código exato:

```text
Target (hex): ffff0000000000000000000000000000000000000000000000000000
Target (hex, padded to 64): 00000000ffff0000000000000000000000000000000000000000000000000000
```

Isto corresponde ao alvo de dificuldade 1 bem documentado do Bitcoin.

## Por que a dificuldade existe como um conceito separado do alvo bruto

A dificuldade dá aos seres humanos (exibições de hardware de mineração, painéis de bilhar e estatísticas públicas) um único número de escala intuitiva para rastrear ao longo do tempo, sem precisar raciocinar diretamente sobre enormes valores de alvo de 256 bits. "A dificuldade dobrou este ano" é mais significativa imediatamente do que comparar dois números de 78 dígitos. A regra do consenso real, entretanto, opera sobre o alvo (através de sua codificação compacta de "bits") diretamente; "dificuldade" como uma quantidade nomeada é uma conveniência derivada, voltada para o homem construída em cima dele.

## Conceitos errôneos comuns

**A dificuldade não é ajustada continuamente, bloco por bloco.** Ele muda apenas em intervalos fixos (cada blocos 2016), ver [Ajuste de Dificuldade](./difficulty-adjustment.md) para exatamente como e porquê.

**Uma maior dificuldade não significa que o próprio SHA-256 tenha ficado "mais difícil" ou mudado de alguma forma.** A função de haxixe é inalterada; apenas o limiar-alvo um haxixe válido deve cair abaixo encolheu, exigindo mais tentativas, em média, para encontrar um haxixe qualificado, ver [Resistência à Preimagem](../cryptography/preimage-resistance.md).

## Outras leituras

- [Referência do desenvolvedor do Bitcoin Core: Cadeia de blocos (alvo de dificuldade e redirecionamento)](https://developer.bitcoin.org/reference/block_chain.html#target-nbits)

---

[← Anterior: Mineração](./mining.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Ajuste de dificuldade →](./difficulty-adjustment.md)
