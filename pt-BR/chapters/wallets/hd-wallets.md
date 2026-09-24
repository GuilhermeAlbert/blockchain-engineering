# Carteiras HD

Uma carteira determinística hierárquica (HD) deriva uma árvore inteira de pares de chaves de uma única semente, em vez de gerar e fazer backup separado de cada chave individualmente. Este capítulo cobre porque isso importa praticamente (é a razão pela qual um backup de 12 palavras pode proteger um número ilimitado de endereços) e configura [BIP-32](./bip-32.md), que define o mecanismo de derivação real.

## O problema HD carteiras resolver

Antes das carteiras HD (normalizado por [BIP 32](./bip-32.md) em 2012), as carteiras geraram e armazenaram um pool de chaves privadas independentes, não relacionadas, cada uma necessitando de seu próprio backup separado, perdendo um backup feito após novas chaves foram geradas significando que essas chaves mais novas eram irrecuperáveis mesmo com um backup mais antigo na mão, uma vez que não havia relação matemática entre elas. Tratava-se de um problema de usabilidade e segurança genuínos e práticos: os usuários tinham de recordar-se de fazer o backup da carteira sempre que geravam novas chaves (o que a maioria das carteiras fazia de forma automática e frequente, para suportar a prática motivada pela privacidade de utilizar um novo endereço por transação, ver [Endereços](./addresses.md#conceitos-errôneos-comuns)), e um backup perdido poderia significar permanentemente perdido fundos apesar de ter um tecnicamente válido, apenas desatualizado, backup.

## Como carteiras HD resolver

Uma carteira HD deriva de cada chave que ele sempre vai precisar de um ponto de partida (o **Semente principal**, ele próprio derivado de seu [frase de semente](./seed-phrases.md)) utilizando uma função determinística unidirecional (coberto mecanicamente em [BIP-32](./bip-32.md)). Porque a derivação é determinística, o *mesmo* a semente produz sempre *mesmo* árvore inteira de chaves, no *mesmo* ordem, em qualquer software de carteira corretamente implementado. Isso significa que fazer backup da frase original é suficiente para recuperar cada chave que a carteira já tenha derivado ou alguma vez irá derivar, incluindo as chaves geradas após o backup foi feito, já que todas elas são funções determinísticas da mesma semente inicial ao invés de independentemente, gerada aleatoriamente.

```text
Master seed (from your seed phrase)
        │
        ▼
   Master key
    ├── Account 0
    │     ├── Receiving address 0
    │     ├── Receiving address 1
    │     ├── Receiving address 2, 3, 4, ...
    │     └── Change address 0, 1, 2, ...
    ├── Account 1
    │     └── ...
    └── Account 2, 3, ...
```

## Exemplo: uma semente, produzindo deterministicamente muitas chaves

```typescript
import { mnemonicToSeedSync, entropyToMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";
import { HDKey } from "@scure/bip32";

const testEntropy = new Uint8Array(16); // TEST ONLY — see chapters/wallets/seed-phrases.md
const mnemonic = entropyToMnemonic(testEntropy, wordlist);
const seed = mnemonicToSeedSync(mnemonic, "");

const master = HDKey.fromMasterSeed(seed);

// Deriving several different, unrelated-looking child keys from the same seed:
for (let i = 0; i < 3; i++) {
  const child = master.derive(`m/44'/0'/0'/0/${i}`);
  console.log(`address index ${i}: private key = ${Buffer.from(child.privateKey!).toString("hex")}`);
}
```

Resultado verificado da execução deste código exato:

```text
address index 0: private key = e284129cc0922579a535bbf4d1a3b25773090d28c909bc0fed73b5e0222cc372
address index 1: private key = 5c1141f60edd3095579529db7e88d964cb0a9ec0f814f6a10cd5cbd763078a0c
address index 2: private key = cfa32fc333b7297ca611c33f046d96895071672e1e5d9b77f3492b3c8d0149f9
```

Cada chave derivada parece uma chave privada completamente independente e independente (isto é intencional, e coberta mecanicamente em [BIP-32](./bip-32.md#por-que-chaves-de-criança-não-parecem-relacionadas)) mas todos os três, e todas as outras chaves que esta carteira irá derivar, vem de repetir a mesma frase de backup exatamente através do mesmo processo determinístico.

## Comércio

As carteiras HD trocam uma pequena quantidade de cálculo de derivação (rápido, e feito automaticamente por software de carteira, não algo que os usuários notam) para uma utilização dramática e melhoria de segurança: um backup, tomado uma vez, protege cada chave que a carteira irá gerar, para a vida útil dessa semente. O custo vale a pena nomear: a árvore inteira de uma carteira HD compartilha um único ponto de falha (semente mestre) comprometendo que uma semente compromete cada chave derivada de uma vez, um perfil de risco diferente de uma coleção de chaves totalmente independentes teria (onde comprometer uma chave não afetaria as outras). Um tradeoff este livro retorna para dentro [Multisig](./multisig.md), que se dirige diretamente.

## Conceitos errôneos comuns

**Gerar um novo endereço de recepção não requer um novo backup.** Este é o ponto inteiro da estrutura HD, cada endereço, não importa quando é gerado, é recuperável a partir do backup original frase de semente feita uma vez, na criação da carteira.

**Software de carteira diferente usando a mesma frase de semente não deriva necessariamente a árvore de endereços idêntica** a menos que ambos também concordem com a mesma estrutura do caminho de derivação (ver [BIP-44](./bip-44.md) e [Caminhos de Derivação](./derivation-paths.md)), a semente sozinha não é bem a história inteira; a convenção de caminho específico usado assuntos também.

## Outras leituras

- [BIP 32: Carteiras determinísticas hierárquicas](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

---

[← Anterior: BIP-39](./bip-39.md)
·
[Voltar para Wallets e Key Management](./README.md)
·
[Próximo: BIP-32 →](./bip-32.md)
