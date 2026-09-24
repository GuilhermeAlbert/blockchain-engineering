# Caminhos de Derivação

Este capítulo curto e prático é uma referência para leitura e solução de problemas caminhos de derivação no selvagem (as cordas reais que você vai encontrar em software carteira, interfaces de carteira de hardware e documentação de recuperação) com base na mecânica já coberta em [BIP-32](./bip-32.md) e [BIP-44](./bip-44.md).

## Lendo um caminho

```text
m / 84' / 0' / 0' / 0 / 5
│    │    │    │   │   └── address index 5 (the sixth address, 0-indexed)
│    │    │    │   └────── change branch: 0 = receiving, 1 = change
│    │    │    └────────── account 0 (first account)
│    │    └─────────────── coin type: 0 = Bitcoin
│    └──────────────────── purpose: 84 = native SegWit (BIP-84)
└───────────────────────── the master key itself
```

`m` refere-se sempre à chave-mestra derivada diretamente da semente (ver [BIP-32](./bip-32.md#a-chave-principal-e-o-código-da-cadeia)). Cada nível subsequente é um passo mais abaixo da árvore; um apóstrofo após um número significa que o nível usa derivação endurecida.

## Por que carteiras diferentes às vezes mostram endereços diferentes para "a mesma" semente

Esta é a única fonte mais comum de confusão do usuário este capítulo existe para resolver: restaurar uma frase de semente idêntica em duas carteiras diferentes pode produzir dois conjuntos diferentes de endereços padrão se as carteiras padrão para convenções de campo de finalidade diferentes (ver [BIP-44](./bip-44.md#variantes-de-campo-de-propósito-para-diferentes-tipos-de-scripts-do-bitcoin)) (um incumprimento para `m/44'/...` (legado), outro para `m/84'/...` (Native SegWit). **Os fundos não são perdidos ou perdidos** neste cenário) eles existem em qualquer caminho para o qual foram originalmente enviados; a nova carteira simplesmente não está verificando esse caminho específico por padrão. A maioria das carteiras modernas permitem especificar manualmente um caminho de derivação personalizado, ou automaticamente digitalizar vários caminhos comuns durante a recuperação, precisamente para lidar com isso.

## Exemplo: derivando o mesmo caminho em várias convenções comuns

```typescript
import { mnemonicToSeedSync, entropyToMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";
import { HDKey } from "@scure/bip32";

const testEntropy = new Uint8Array(16); // TEST ONLY
const seed = mnemonicToSeedSync(entropyToMnemonic(testEntropy, wordlist), "");
const master = HDKey.fromMasterSeed(seed);

const paths = {
  "legacy (BIP-44)": "m/44'/0'/0'/0/0",
  "SegWit-wrapped (BIP-49)": "m/49'/0'/0'/0/0",
  "native SegWit (BIP-84)": "m/84'/0'/0'/0/0",
  "Taproot (BIP-86)": "m/86'/0'/0'/0/0",
};

for (const [label, path] of Object.entries(paths)) {
  const child = master.derive(path);
  console.log(`${label.padEnd(28)} ${path.padEnd(18)} pubkey: ${Buffer.from(child.publicKey!).toString("hex")}`);
}
```

Resultado verificado da execução deste código exato:

```text
legacy (BIP-44)              m/44'/0'/0'/0/0    pubkey: 03aaeb52dd7494c361049de67cc680e83ebcbbbdbeb13637d92cd845f70308af5e
SegWit-wrapped (BIP-49)      m/49'/0'/0'/0/0    pubkey: 039b3b694b8fc5b5e07fb069c783cac754f5d38c3e08bed1960e31fdb1dda35c24
native SegWit (BIP-84)       m/84'/0'/0'/0/0    pubkey: 0330d54fd0dd420a6e5f8d3624f5f3482cae350f79d5f0753bf5beef9c2d91af3c
Taproot (BIP-86)             m/86'/0'/0'/0/0    pubkey: 03cc8a4bc64d897bddc5fbc2f670f7a8ba0b386779106cf1223c6fc5d7cd6fc115
```

Quatro chaves públicas completamente distintas, a partir da semente idêntica, no que parece "a mesma" endereço-index-0 posição. Confirmar o campo de propósito muda genuinamente a chave derivada, não apenas seu formato de exibição.

## Uma lista de verificação prática ao restaurar uma carteira

1. Confirme que você tem as palavras mnemônicas exatas e ordenadas corretamente (ver [Frases de sementes](./seed-phrases.md)).
2. Confirme se uma frase-passe (a "25a palavra", veja [BIP-39](./bip-39.md#a-frase-senha-opcional)) foi usado originalmente. Restaurando sem ele, se um foi usado, silenciosamente produz uma carteira completamente diferente, vazia, sem erro.
3. Confirme qual convenção de campo de finalidade (44'/49'/84'/86') a carteira original usada, se não detectada automaticamente.
4. Confirme o tipo de moeda e o índice de conta se gerenciar várias cadeias ou contas a partir da mesma semente.

## Conceitos errôneos comuns

**Um caminho de derivação não é um segredo**, conhecer o caminho sozinho, sem a própria semente, não revela nada utilizável; os caminhos são uma convenção pública para organizar uma árvore, não parte de sua segurança.

**Especificar manualmente um caminho de derivação "custom" não é inerentemente mais ou menos seguro** do que usar um padrão. A segurança vem inteiramente da entropia da semente e da exatidão do subjacente [BIP-32](./bip-32.md) matemática, não de quão obscuro ou padrão o caminho específico acontece ser.

## Outras leituras

- Ver também: [BIP-32](./bip-32.md), [BIP-44](./bip-44.md)

---

[← Anterior: BIP-44](./bip-44.md)
·
[Voltar para Wallets e Key Management](./README.md)
·
[Próximo: Hot Wallets →](./hot-wallets.md)
