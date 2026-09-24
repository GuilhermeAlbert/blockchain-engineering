# secp256k1

secp256k1 é a curva elíptica específica que o Bitcoin usa para cada chave e assinatura, e que Ethereum também adotou. Este capítulo curto cobre os parâmetros exatos da curva, por que Bitcoin escolheu-o em vez de alternativas mais comuns, e onde ele aparece em outros lugares na criptografia.

## O nome

"secp256k1" descodifica como: **S**tandards para **E**eficiente **C**criptografia, a **P**curva de campo de rime, com **256**- tamanho do campo de bits, do "**k**a família oblitz¿ (uma classe específica de curvas com vantagens de eficiência computacional), e é o número de curvas **1** nessa sequência de nomeação dentro da norma SEC2. Foi especificado pela Certicom Research, uma empresa de criptografia, no documento SEC 2 (Standards for Efficient Cryptography), publicado pela primeira vez em 2000.

## Os parâmetros exactos

secp256k1 é definida, por [SEC 2: Parâmetros recomendados de domínio da curva elíptica](https://www.secg.org/sec2-v2.pdf), por:

- **A equação da curva**: `y² = x³ + 7` (mod p), com `a = 0` e `b = 7`, uma das curvas não triviais mais simples possíveis.
- **O campo primo `p`**: `2^256 - 2^32 - 977`, um primo específico de 256 bits escolhido para determinadas propriedades de eficiência computacional (seu padrão de bits permite uma redução modular mais rápida do que um primo arbitrário do mesmo tamanho).
- **O ponto gerador `G`**: um determinado, fixo `(x, y)` coordenar par na curva, publicado no padrão, a partir do qual cada chave pública é derivada via `PublicKey = privateKey × G`.
- **A ordem `n`**: o número de pontos alcançáveis adicionando repetidamente `G` para si próprio, que é `0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141`, um primo grande ligeiramente menor que `2^256`, e o limite superior real em valores de chave privada válidos (uma chave privada deve ser um inteiro entre 1 e `n - 1`, referenciado em [Chaves particulares e públicas](./keys.md)).

## Por que Bitcoin escolheu secp256k1

Esta é uma das escolhas de design mais debatidas na história de Bitcoin, porque secp256k1 foi, na época da criação de Bitcoin, uma escolha relativamente incomum, as escolhas de curva elíptica mais comuns no software criptográfico mainstream na época eram as curvas padronizadas NIST (como secp256r1, também chamado de P-256), que são as alternativas Koblitz-família com diferentes parâmetros de geração. Duas razões técnicas documentadas são geralmente citadas para a seleção do secp256k1:

1. **Eficiência computacional.** A família Koblitz-curve, a qual secp256k1 pertence, permite determinadas otimizações na aritmética ponto-multiplicação (explorando a estrutura algébrica específica da curva, chamada de endomorfismo eficientemente computável) que não estão disponíveis para as curvas NIST P, tornando secp256k1 mensuravelmente mais rápido para as operações de assinatura e verificação que Bitcoin realiza constantemente.
2. **Preocupações de prova sobre as curvas NIST.** Os parâmetros das curvas padronizadas NIST foram gerados usando valores inexplicáveis de "semente" cuja origem nunca foi publicamente justificada de uma forma que excluisse a possibilidade de eles terem sido deliberadamente escolhidos para esconder uma fraqueza, uma preocupação que ganhou atenção pública significativa após as revelações de 2013 (das revelações de Edward Snowden) de que a NSA havia deliberadamente enfraquecido um padrão criptográfico NIST diferente e não relacionado (o gerador de números aleatórios Dual EC DRBG). os parâmetros de secp256k1, em contraste, são derivados de escolhas matemáticas mais simples, mais transparentes e justificáveis, semelhantes, em espírito, ao raciocínio de "nada-up-my-sleeve" discutido para as constantes de [SHA-256](./sha-256.md#4-a-função-de-compressão).

Vale a pena ser preciso sobre o tempo aqui: whitepaper e código inicial de Bitcoin (2008-2009) precedem as revelações de 2013 Dual EC DRBG por vários anos, então suspeita mais tarde de alguns projetos associados a NIST não podem ser projetados para trás como motivo documentado de Satoshi. Os escritos públicos sobreviventes de Satoshi não explicam por que o secp256k1 foi selecionado sobre as alternativas.

## Onde mais secp256k1 é usado

Além do Bitcoin, o secp256k1 é usado pelo Ethereum (para chaves de conta e assinaturas de transações, veja [Contas Ethereum](../ethereum/accounts.md)) e pela maioria das outras criptomoedas derivadas ou influenciadas pelo projeto de Bitcoin. Isto o torna, por uma ampla margem, a curva elíptica mais usada no ecossistema de criptomoeda especificamente, embora continue a ser uma escolha menos comum do que as curvas NIST P ou Curve25519 em software de uso geral como TLS e SSH.

## Exemplo: verificar os parâmetros da curva diretamente

```typescript
import { secp256k1 } from "@noble/curves/secp256k1.js";

// secp256k1's field prime: 2^256 - 2^32 - 977
const p = (2n ** 256n) - (2n ** 32n) - 977n;
console.log("Field prime matches library:", p === secp256k1.Point.Fp.ORDER);

// The curve's order (number of points reachable from G)
console.log("Curve order (n):", secp256k1.Point.Fn.ORDER.toString(16));
```

```text
Field prime matches library: true
Curve order (n): fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141
```

Isto confirma o campo primo que a biblioteca usa corresponde ao valor publicado no padrão SEC 2, e imprime a ordem da curva em hexadecimal, correspondente ao valor citado acima.

## Conceitos errôneos comuns

**Secp256k1 não é uma invenção específica de Bitcoin.** É um padrão geral de curva elíptica publicado anos antes da existência de Bitcoin, que Bitcoin adotou em vez de criar.

**Usando a mesma curva que Bitcoin não significa Ethereum ou qualquer outro formato chave de criptomoeda é diretamente interoperável com Bitcoin.** A matemática da curva subjacente é compartilhada, mas codificação de endereços, caminhos de derivação e esquemas de assinatura diferem entre cadeias, veja [Endereços](../wallets/addresses.md) e [Contas Ethereum](../ethereum/accounts.md).

## Outras leituras

- [SEC 2: Parâmetros recomendados de domínio da curva elíptica](https://www.secg.org/sec2-v2.pdf): Certicom Research
- [Fonte do núcleo do Bitcoin: biblioteca secp256k1](https://github.com/bitcoin-core/secp256k1): a implementação específica, altamente otimizada Bitcoin Core usa

---

[← Anterior: Curvas elípticas](./elliptic-curves.md)
·
[Voltar à Criptografia](./README.md)
·
[Próximo: Assinaturas digitais →](./digital-signatures.md)
