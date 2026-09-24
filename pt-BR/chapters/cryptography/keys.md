# Chaves particulares e públicas

Uma chave privada é, no fundo, um único número aleatório grande. Todo o resto (chaves públicas, endereços, carteiras, a capacidade de gastar fundos) é derivado desse número através de operações matemáticas fixas e públicas. Este capítulo torna isso concreto: o que é realmente uma chave, como uma chave pública é derivada dele, e por que a aleatoriedade desse primeiro número é a propriedade de segurança mais importante neste livro inteiro.

## O que é realmente uma chave privada

Para a curva elíptica Bitcoin e uso de Ethereum (secp256k1, coberto em [secp256k1](./secp256k1.md)), uma chave privada é simplesmente um inteiro entre 1 e aproximadamente 1,158 × 10^77 (precisamente, uma menor que a ordem da curva, um número primo específico grande definido na especificação secp256k1). É isso, nenhuma estrutura especial, nenhuma informação incorporada, apenas um número, tipicamente representado como 256 bits (32 bytes), frequentemente mostrado em hexadecimal:

```text
Example private key (for demonstration only — never use this or any published key for real funds):
0000000000000000000000000000000000000000000000000000000000002a
```

Toda a segurança de tudo construído em cima deste número depende de ser escolhido **imprevisivelmente** a partir da gama completa de valores possíveis, ver [Entropia](../wallets/seed-phrases.md#entropia) para como as carteiras realmente geram essa aleatoriedade na prática, e [Frases de sementes](../wallets/seed-phrases.md) para como os humanos voltam e reconstrói este número sem escrever o feitiço cru.

## Derivando a chave pública

A chave pública é calculada a partir da chave privada através **multiplicação do ponto da curva elíptica**: a curva tem um ponto de partida acordado chamado **ponto gerador** `G`, e a chave pública é calculada como `PublicKey = privateKey × G`, onde `×` aqui significa "adicionar `G` para si mesmo, na curva, `privateKey` vezes", não multiplicação comum (ver [Curvas elípticas](./elliptic-curves.md) para exatamente o que "pontos de adição em uma curva" significa geometrica e algebricamente).

Esta operação é rápida para calcular na direção da frente (existem algoritmos eficientes para calcular `k × G` mesmo para valores enormes de `k`, usando duplicações repetidas em vez de literalmente adicionar `G` para si mesmo uma vez por unidade de `k`) e, na medida em que qualquer matemática ou algoritmo conhecido pode atualmente fazer, inviável para reverter, recuperar `privateKey` de `PublicKey` e `G` é a curva elíptica discreta problema de logaritmo mencionado em [Criptografia de Chave Pública](./public-key-cryptography.md), e nenhum algoritmo clássico eficiente para resolvê-lo é conhecido.

## Exemplo

```typescript
import { secp256k1 } from "@noble/curves/secp256k1.js";
import { hexToBytes, bytesToHex } from "@noble/curves/utils.js";

// A toy private key (the number 42) — for demonstration only, never use a value this simple for real funds.
const privateKeyHex = (42).toString(16).padStart(64, "0");
const privateKeyBytes = hexToBytes(privateKeyHex);

const publicKey = secp256k1.getPublicKey(privateKeyBytes, false); // uncompressed form
console.log("Private key (decimal):", BigInt("0x" + privateKeyHex).toString());
console.log("Public key (hex):     ", bytesToHex(publicKey));
```

```text
Private key (decimal): 42
Public key (hex):      04fe8d1eb1bcb3432b1db5833ff5f2226d9cb5e65cee430558c18ed3a3c86ce1a
                        f07b158f244cd0de2134ac7c1d371cffbfae4db40801a2572e531c573cda9b5b4
```

Isto utiliza [`@noble/curves`](https://github.com/paulmillr/noble-curves), uma implementação amplamente utilizada, auditado puro-TypeScript de secp256k1 e outras curvas, instalar com `npm install @noble/curves` (o exemplo acima visa a API e os caminhos do módulo v2.x; verifique a documentação atual da biblioteca se uma versão principal diferente está instalada). Correndo esta determinísticamente produz a mesma chave pública cada vez para a mesma chave privada, que é o ponto: esta é uma função matemática pura, não um processo aleatório, a única aleatoriedade em todo o sistema está na escolha original da chave privada, discutida mais adiante. A saída acima é verificada diretamente da execução deste código exato, não manualmente.

## Chaves públicas: compactadas e não comprimidas

Um ponto numa curva elíptica tem duas coordenadas, `(x, y)`. **sem compressão** formato de chave pública inclui ambos, prefixado com `0x04` (65 bytes totais para secp256k1). Porque a equação da curva significa que para qualquer valor `x` coordenadas existem apenas dois possíveis `y` valores (um par, um ímpar), a **comprimido** formato pode armazenar apenas o `x` coordenar mais um único byte indicando qual dos dois `y` são aplicáveis os valores (`0x02` até mesmo, `0x03` para ímpar), 33 bytes no total, aproximadamente metade do tamanho. As carteiras e endereços de Bitcoin modernos usam esmagadoramente chaves públicas compactas por padrão, uma vez que o composto de economia de espaço em cada transação que inclui uma.

## Comércio

A segurança de todo o sistema repousa em uma propriedade: chaves privadas devem ser geradas com **entropia suficiente**, aleatoriedade genuína e imprevisível espalhada por toda a gama de valores possíveis. Uma chave privada gerada com aleatoriedade fraca ou previsível (um gerador de números aleatórios mal semeado, uma chave privada derivada de uma frase adivinho, ou aleatoriedade reutilizada entre assinaturas. Ver [Nonce Reuse](./ecdsa.md#reutilização-do-nonce-o-erro-de-implementação-mais-conseqüente)) pode ser encontrado por um atacante muito mais rápido do que a busca por força bruta através do espaço-chave completo sugere, independentemente de quão forte a matemática da curva elíptica subjacente é. Este é um modo de falha do mundo real documentado, não um modo teórico. Vários roubos de Bitcoin divulgados foram rastreados para pobre aleatoriedade chave privada em software de carteira específica, discutido ainda mais em [Roubo de Chave Privada](../security/private-key-theft.md).

## Conceitos errôneos comuns

**Uma chave privada não é uma senha que você escolha.** Ele deve ser gerado com aleatoriedade criptograficamente segura em toda a sua gama possível, uma chave privada baseada em uma frase memorável, uma data de nascimento, ou qualquer padrão humana-confiante é catastróficamente inseguro, porque os atacantes podem e fazem executar scripts verificando chaves privadas adivinhos contra a blockchain para quaisquer fundos enviados para seus endereços correspondentes.

**A chave pública não é a mesma que um endereço Bitcoin.** Um endereço é derivado por hashing a chave pública e codificação do resultado (ver [Endereços](../wallets/addresses.md)). Este passo extra significa que um endereço revela menos informação do que uma chave pública crua, discutida mais adiante nesse capítulo.

## Experimenta tu mesmo.

Instalar `@noble/curves` (`npm install @noble/curves`) e execute o exemplo acima com vários valores chave privados diferentes. Confirmar que a mesma entrada sempre produz a mesma chave pública, e que mudar mesmo um pouco da chave privada produz uma chave pública completamente não relacionada.

## Outras leituras

- [SEC 2: Parâmetros recomendados de domínio da curva elíptica](https://www.secg.org/sec2-v2.pdf): a especificação formal que define o ponto gerador, ordem e outros parâmetros do secp256k1
- [`@noble/curves` fonte e documentação](https://github.com/paulmillr/noble-curves)

---

[← Anterior: Criptografia de chave pública](./public-key-cryptography.md)
·
[Voltar à Criptografia](./README.md)
·
[Próximo: Curvas elípticas →](./elliptic-curves.md)
