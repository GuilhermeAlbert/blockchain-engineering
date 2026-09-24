# Resistência à Preimagem

A resistência à preimagem é a propriedade que faz uma função de hash one-way: dada uma saída de hash, não há maneira prática de encontrar uma entrada que a produz, além de tentar entradas uma de cada vez. Este capítulo define precisamente a propriedade, distinguindo-a da propriedade relacionada, mas diferente, de resistência à colisão coberta em [Colisões de Hash](./collisions.md), e trabalha através da aritmética concreta de porque a mineração de Bitcoin é, especificamente, um problema de pesquisa de pré-imagem.

## Definição

Uma função de hash `H` é **resistência à preimagem** se, dado um valor de saída `h`, é computacionalmente inviável encontrar qualquer entrada `x` tal que `H(x) = h`. Isso é às vezes explicado com a frase "o temar é fácil, o não-tender é difícil": computação `H(x)` de `x` toma uma quantidade fixa, pequena de computação, independentemente do que `x` é, mas ir para outra direção (de uma saída alvo de volta para uma entrada que produz) não tem método conhecido mais rápido do que adivinhar entradas e verificar cada um.

Uma propriedade estreitamente relacionada e mais forte é **resistência à segunda preimagem**: dada uma entrada específica `x1`, deve ser inviável encontrar *diferente* entrada `x2` (com `x2 ≠ x1`) tal que `H(x1) = H(x2)`. A diferença da resistência de pré-imagem comum é sutil, mas importa: a resistência de pré-imagem começa a partir de apenas um valor de saída sem entrada conhecida; a resistência de segunda-imagem começa a partir de uma entrada conhecida e procura uma diferente que corresponda à sua saída. A diferença em relação à resistência à colisão (coberto em [Colisões de Hash](./collisions.md)) é que a resistência de colisão não fixa nenhuma entrada com antecedência. O atacante é livre para escolher ambos `x1` e `x2` em conjunto, que é um problema significativamente mais fácil (daí o mais fraco `2^(n/2)` Resistência à colisão versus resistência à pré-imagem `2^n` encadernado).

## Por que isso importa: a mineração é uma busca de preimagem

[Prova de Trabalho](../bitcoin/proof-of-work.md) é, concretamente, uma busca de pré-imagem restrita. Um minerador está procurando um cabeçalho de bloco (que inclui um campo nonce variável) cujo hash SHA-256d está numericamente abaixo de um valor alvo. Equivalentemente, cujo hash tem um número necessário de zero bits. Este é exatamente um problema de pré-imagem: dada uma região-alvo de saídas (todos os hashes abaixo de um determinado número), encontrar uma entrada que pouse nessa região.

Porque não há atalho conhecido para calcular uma preimage mais rápido do que tentar candidatos, a única estratégia disponível para um minerador é **pesquisa bruta-força**: tentar um nonce, calcular o hash, verificar se ele atende ao alvo, e se não, tentar um nonce diferente e repetir. É precisamente por isso que a dificuldade de mineração pode ser ajustada tão precisamente (ver [Dificuldade em Mineração](../bitcoin/difficulty.md)): uma vez que não há atalho inteligente, o *esperado* o número de tentativas necessárias para encontrar um hash válido é uma função simples e previsível do tamanho do alvo, que permite que a rede calibra o alvo para produzir blocos em uma taxa média aproximadamente constante.

## A aritmética

Se um alvo requer um hash para cair na fração mais baixa `p` do espaço de saída completo de 256 bits, então uma única tentativa aleatória de hash tem probabilidade `p` de sucesso. Isto dá a mesma relação que a seção 11 do whitepaper de Bitcoin depende:

```text
P(success on a given attempt) = target / 2^256
```

Se o alvo for definido de modo que apenas 1 em 2^32 possíveis saídas de hash se qualifica (um exemplo ilustrativo, não a atual dificuldade de Bitcoin, que requer muito mais zero bits de liderança), um minerador precisaria, em média, 2^32 (cerca de 4,3 bilhões) tentativas de encontrar um nonce válido, um número facilmente alcançado pelo hardware de mineração moderno em uma fração de um segundo, por isso que a dificuldade de Bitcoin real hoje requer muito mais zero bits de liderança do que este exemplo ilustrativo, calibrado contra a taxa de hash combinada real da rede (ver [Ajuste de Dificuldade](../bitcoin/difficulty-adjustment.md)).

## Exemplo: forçar uma preimagem de brinquedo

Este exemplo breve demonstra o mecanismo diretamente, procurando por uma entrada cujo hash começa com um prefixo curto específico, pequeno o suficiente para realmente executar a conclusão em um computador comum em um tempo razoável:

```typescript
import { createHash } from "node:crypto";

function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

function findPreimage(prefix: string): { input: string; hash: string; attempts: number } {
  let attempts = 0;
  let nonce = 0;
  while (true) {
    attempts++;
    const candidate = `block-data-${nonce}`;
    const hash = sha256(candidate);
    if (hash.startsWith(prefix)) {
      return { input: candidate, hash, attempts };
    }
    nonce++;
  }
}

const result = findPreimage("000"); // 3 hex chars = 12 bits of leading zeros
console.log(result);
// Expect roughly 2^12 = 4096 attempts on average to satisfy a 3-hex-character prefix
```

Executar isso repetidamente mostrará que a contagem de tentativas varia, mas clusters em torno de alguns milhares, consistente com a necessidade de aproximadamente `16^3 = 4096` tenta em média para um prefixo hex de 3 caracteres (cada caractere hex representa 4 bits, assim 3 caracteres é 12 bits, e `2^12 = 4096`). Estendendo o prefixo necessário para 6 caracteres (24 bits) aumenta as tentativas esperadas para aproximadamente 16 milhões; dificuldade de mineração real de Bitcoin, expressa da mesma forma, corresponde a um espaço de busca muitas ordens de magnitude maior, veja [Dificuldade em Mineração](../bitcoin/difficulty.md) para os números atuais do mundo real e como eles se traduzem em zero bits necessários.

## Comércio

A resistência à preimagem é exatamente o que faz a prova de trabalho funcionar como uma medida justa e imperdível de esforço: porque não há atalho, a única maneira de encontrar um hash de bloco válido é realmente gastar o trabalho computacional, o que significa que a prova resultante reflete genuinamente o esforço real gasto em vez de ser falsificado por alguém com inteligência matemática em vez de poder computacional. O custo deste é o mesmo custo discutido em [Hashcash](../origins/hashcash.md#comércio) e [Prova de Trabalho](../bitcoin/proof-of-work.md#por-que-prova-de-trabalho-especificamente-protege-a-cadeia): a busca é, por design, um desperdício no sentido de que tentativas falhadas não produzem saída útil além de excluir um candidato.

## Conceitos errôneos comuns

**A resistência à preimagem não significa "a função hash está criptografada" ou que há uma chave escondida.** Não há nenhum segredo envolvido. A função `H` é completamente público, e a dificuldade vem puramente da falta de um atalho matemático para invertê-lo, não de nada ser escondido.

**Um grande número de zero bits necessários não significa que a função de hash tenha mudado ou ficado "mais dura" em algum sentido intrínseco.** O próprio SHA-256 está inalterado; apenas o *alvo* (quantas saídas válidas contam como um sucesso) mudanças com dificuldade de mineração, o que afeta quantas tentativas são necessárias em média, nem nada sobre a computação interna da função hash.

## Outras leituras

- [Whitepaper Bitcoin, Seção 11 (Calculações)](https://bitcoin.org/bitcoin.pdf): a fórmula de probabilidade em seu contexto original
- [NIST FIPS 180-4: Padrão de Hash seguro](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf)

---

[← Anterior: Colisões de Hash](./collisions.md)
·
[Voltar à Criptografia](./README.md)
·
[Próximo: Criptografia de Chave Pública →](./public-key-cryptography.md)
