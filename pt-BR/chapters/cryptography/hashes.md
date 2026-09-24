# Funções do Hash

Uma função hash pega uma entrada de qualquer tamanho e produz uma saída de tamanho fixo, deterministicamente, de tal forma que a mesma entrada sempre produz a mesma saída e até mesmo uma pequena mudança para a entrada produz uma saída completamente diferente. Esta única base primitiva bloqueia a ligação, mineração, árvores Merkle, endereços e compromissos ao longo deste livro. Vale a pena compreender precisamente antes de qualquer um desses tópicos fazer sentido.

## O problema

Os sistemas Blockchain precisam de uma forma de responder a perguntas como: "Estes são exatamente os mesmos dados que vi antes?" e "Posso representar compactamente uma grande quantidade de dados de modo a que qualquer adulteração seja detectável?" Comparando grandes conjuntos de dados byte-by-byte cada vez é lento e, para alguns casos de uso (provando que você conhece um pedaço de dados sem revelá-lo), impossível. A **função de hash criptográfica** resolve ambos os problemas: comprime dados arbitrários em uma impressão digital pequena e de tamanho fixo que muda imprevisivelmente se mesmo um pouco das mudanças de entrada, tornando-se um stand-in prático para os dados completos em comparações, compromissos e verificações de integridade.

## Como funciona

Uma função de hash criptográfica `H` mapeia uma entrada de qualquer comprimento para uma saída de um comprimento fixo (256 bits para SHA-256, a função Bitcoin usa ao longo de todo). Para ser útil para fins de segurança, necessita de três propriedades, cada uma das quais tem um significado técnico preciso abrangido no seu próprio capítulo:

- **[Resistência à preimagem](./preimage-resistance.md)**: dado um hash output `h`, deve ser computacionalmente inviável encontrar qualquer entrada `x` tal que `H(x) = h`.
- **Resistência à segunda pré-imagem**: dado um contributo específico `x1`, deve ser inviável encontrar uma entrada diferente `x2` tal que `H(x1) = H(x2)`.
- **[Resistência à colisão](./collisions.md)**: deve ser inviável encontrar *qualquer* duas entradas distintas `x1` e `x2` (sem que seja dado antecipadamente) de tal forma que `H(x1) = H(x2)`.

Estas são garantias relacionadas, mas distintas. A resistência à colisão é a mais forte e implica que os outros dois se mantenham na prática para uma função bem concebida, mas vale a pena nomear separadamente porque diferentes casos de uso de blockchain dependem de garantias diferentes. Um bloco [prova de trabalho](../bitcoin/proof-of-work.md) depende principalmente da saída ser imprevisível (você não pode adivinhar qual entrada produzirá um hash abaixo de um alvo sem tentar); a [Merkle tree](./merkle-trees.md) depende principalmente da resistência à colisão (não se pode forjar um conjunto diferente de transações que hashes para a mesma raiz).

## Exemplo: tente você mesmo

Node.js inclui uma implementação de hash em sua biblioteca padrão, nenhuma dependência externa necessária para explorar esta prática.

```typescript
import { createHash } from "node:crypto";

function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

console.log(sha256("hello"));
// 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824

console.log(sha256("Hello"));
// 185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969

console.log(sha256(""));
// e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

Executa isto com `npx tsx hash-example.ts` ou compilar com `tsc` Primeiro. Note duas coisas: mudar um único personagem (`hello` → `Hello`) produz uma saída sem relação visível com o original. Esta imprevisibilidade é chamada de **efeito avalanche**, e é o que torna as saídas de hash inúteis para adivinhar qualquer coisa sobre sua entrada. Segundo, cada saída tem exatamente 64 caracteres hexadecimais (256 bits) de comprimento, independentemente se a entrada estava vazia ou um gigabyte. Esta propriedade de tamanho fixo é o que permite que um hash fique para dados arbitrariamente grandes.

```text
input                       → SHA-256 output (hex, 256 bits)
"hello"                     → 2cf24dba5fb0a30e26e83b2ac5b9e29e...
"Hello"                     → 185f8db32271fe25f561a6fc938b2e26...
"hello " (trailing space)   → completely different output
```

## Debaixo do capô

Bitcoin usa esmagadoramente **SHA-256**, e frequentemente aplica-o duas vezes seguidas (SHA-256d, ou `SHA-256(SHA-256(x))`), coberto em detalhe mecânico completo, incluindo os passos internos da função de compressão, em [SHA-256](./sha-256.md). Ethereum e o EVM usam principalmente **Keccak-256** (frequentemente, se imprecisamente, chamado de "SHA-3". Ele precede e difere ligeiramente no enchimento do mais tarde padrão NIST SHA-3, ver [Bytecode](../evm/bytecode.md) para onde isto aparece). Diferentes sistemas blockchain fazendo diferentes escolhas de função de hash é uma decisão de design real, significativa, não um detalhe intercambiável. Ele afeta tudo, desde custos de gás até possibilidades de otimização de hardware para mineração ou geração de provas.

## Comércio

Uma função de hash criptográfica é uma compressão unidirecional: você ganha uma impressão digital pequena, de tamanho fixo e evidente de dados arbitrariamente grandes, e você desiste da capacidade de recuperar os dados originais da impressão digital (este é o ponto, veja [Resistência à Preimagem](./preimage-resistance.md)) e a capacidade de provar duas peças de dados estão relacionadas de qualquer outra forma que não seja ser bit-for-bit idêntico (um hash não lhe diz nada sobre *como* duas entradas diferem, apenas *que* Diferem).

## Conceitos errôneos comuns

**Hashing não é criptografia.** A criptografia é reversível com a chave certa; o hashing é unidirecional pelo design e não tem nenhuma chave para invertê-la. Um hash não pode ser "descriptografado" para recuperar sua entrada, veja [Resistência à Preimagem](./preimage-resistance.md).

**Um hash não é um número aleatório**, embora sua saída pareça estatisticamente indistinguível de dados aleatórios. É totalmente determinístico. A mesma entrada produz sempre a mesma saída em cada máquina, cada vez, que é precisamente o que a torna útil para verificação.

## Experimenta tu mesmo.

Execute a amostra de código acima com algumas entradas diferentes, incluindo entradas muito longas (colar em um parágrafo completo) e entradas que diferem por um único caractere. Confirme que a saída é sempre 64 caracteres hex e que entradas similares produzem saídas não relacionadas.

## Outras leituras

- [NIST FIPS 180-4: Padrão de Hash seguro](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf): a especificação oficial para SHA-256 e funções relacionadas
- [Node.js `crypto` documentação do módulo](https://nodejs.org/api/crypto.html)

---

[← Anterior: O que a criptografia faz](./README.md)
·
[Voltar à Criptografia](./README.md)
·
[Próximo: SHA-256 →](./sha-256.md)
