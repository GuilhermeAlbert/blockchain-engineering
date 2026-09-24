# Frases de sementes

Uma frase de semente (12 ou 24 palavras em inglês comuns, em uma ordem específica) é como a maioria das carteiras Bitcoin permitem que você faça backup e restaure o acesso a cada chave que eles gerenciam, sem escrever hexadecimal bruto. Este capítulo cobre exatamente como uma frase codifica uma chave, verificada contra o vetor de teste BIP-39 oficial, e por que as escolhas de design específicas (palavras resumidas, uma lista de palavras fixas) importam.

> **Every example in this chapter uses the well-known, publicly documented BIP-39 test vector, all-zero entropy, producing the phrase "abandon abandon ... about."** This specific phrase is recognized throughout the Bitcoin ecosystem as a test-only value; funds sent to any address derived from it have been swept by bots within minutes for years. Never use it, or any phrase generated the way this chapter's examples generate one, for real funds.

## Entropia

Uma frase de semente começa com **entropia** (bits genuinamente aleatórios, gerados por um gerador de números aleatórios criptograficamente seguro, exatamente a mesma qualidade de aleatoriedade que uma chave privada bruta requer (ver [Chaves particulares e públicas](../cryptography/keys.md#comércio)). [BIP 39](./bip-39.md) especifica comprimentos de entropia de 128, 160, 192, 224, ou 256 bits, correspondendo a mnemônicos de 12, 15, 18, 21, ou 24 palavras respectivamente) 128 bits (12 palavras) e 256 bits (24 palavras) são de longe os mais comuns na prática.

## Como a entropia se torna palavras

1. Gere a entropia crua (128 bits, para um exemplo de 12 palavras).
2. Computar um checksum: o primeiro `entropy-bits / 32` bits de `SHA256(entropy)`, para 128 bits de entropia, que são 4 bits de checksum.
3. Anexar o checksum à entropia, produzindo uma string de bit cujo comprimento é agora um múltiplo de 11.
4. Dividir em grupos de 11 bits (11 bits dá 2^11 = 2048 valores possíveis por grupo, exatamente o tamanho da lista de palavras BIP-39).
5. Procure cada valor de 11 bits como um índice na lista padronizada de 2048 palavras, produzindo o mnemônico.

## Exemplo: o vetor de teste oficial, reproduzido

```typescript
import { entropyToMnemonic, validateMnemonic, mnemonicToSeedSync } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";

// 128 bits of all-zero entropy — the official BIP-39 test vector, never
// real randomness, never for real funds.
const testEntropy = new Uint8Array(16);

const mnemonic = entropyToMnemonic(testEntropy, wordlist);
console.log("mnemonic:", mnemonic);
console.log("valid:", validateMnemonic(mnemonic, wordlist));

const seed = mnemonicToSeedSync(mnemonic, ""); // "" = no additional passphrase
console.log("seed (hex):", Buffer.from(seed).toString("hex"));
```

Resultado verificado da execução deste código exato, usando [`@scure/bip39`](https://github.com/paulmillr/scure-bip39):

```text
mnemonic: abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about
valid: true
seed (hex): 5eb00bbddcf069084889a8ab9155568165f5c453ccb85e70811aaed6f6da5fc19a5ac40b389cd370d086206dec8aa6c43daea6690f20ad3d8d48b2d2ce9e38e4
```

Isso corresponde exatamente ao vetor de teste publicado pela própria especificação BIP-39 oficial, confirmando esta implementação (e, por extensão, qualquer carteira que implemente corretamente o mesmo padrão) deriva a semente idêntica da mesma entropia.

## De mnemônico para semente: por que PBKDF2

Observe o passo final acima usa **PBKDF2** (Função de Derivação de Chave Baseada em Senha 2, com HMAC-SHA512, 2048 rodadas, de acordo com a especificação BIP-39) para transformar as palavras mnemônicas de volta em uma semente de 512 bits, não um hash simples. Esta é uma escolha deliberada distinta da maioria dos outros casos de uso deste livro: PBKDF2 é intencionalmente **lento** (2048 rodadas de hashing repetido, ao invés de uma passagem), o que importa especificamente porque a entropia real de um mnemônico (128-256 bits) é muito menor do que o tamanho de saída completo da semente 512 bits, e esta etapa de derivação também é onde uma frase-passe do usuário opcional é misturada (ver [BIP-39](./bip-39.md#a-frase-senha-opcional) para o que essa frase-passe realmente protege contra).

## Por que palavras em vez de feitiço cru

Doze palavras em inglês são dramaticamente mais fáceis para um humano transcrever, ler em voz alta e verificar manualmente do que 32 bytes de hexadecimal, e o built-in checksum (passo 2 acima) significa que uma carteira pode detectar a maioria dos erros de transcrição (uma palavra mal digitada ou mal lembrada) imediatamente após a entrada, em vez de silenciosamente gerar uma chave diferente e errada. Esta é uma genuína, prática melhoria de usabilidade sobre o backup chave cru, não meramente cosméticos.

## Conceitos errôneos comuns

**Uma frase de semente não é uma senha que você escolhe ou memoriza por meios comuns**Como uma chave privada, ela deve ser gerada com entropia criptograficamente segura; uma frase construída a partir de palavras memoráveis *você* pick (em vez de derivar da entropia aleatória genuína através do processo acima) é catastróficamente inseguro, por exatamente as razões [Chaves particulares e públicas](../cryptography/keys.md#comércio).

**A lista de palavras específica importa, e é padronizada, não arbitrária**. A lista de 2048 palavras BIP-39 Inglês foi deliberadamente curado (evitando palavras de som semelhante ou semelhantes, entre outros critérios) para minimizar erros de transcrição e reconhecimento; usando uma lista de palavras diferente do que o que seu software carteira espera produzirá resultados diferentes e incompatíveis.

## Outras leituras

- [BIP 39: Código mnemônico para geração de chaves determinísticas](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- [BIP 39 vectores de ensaio oficiais](https://github.com/trezor/python-mnemonic/blob/master/vectors.json)
- [`@scure/bip39`](https://github.com/paulmillr/scure-bip39): a biblioteca auditada utilizada no exemplo deste capítulo

---

[← Anterior: Chaves públicas](./public-keys.md)
·
[Voltar para Wallets e Key Management](./README.md)
·
[Próximo: BIP-39 →](./bip-39.md)
