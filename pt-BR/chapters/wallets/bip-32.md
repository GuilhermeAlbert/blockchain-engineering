# BIP-32

BIP-32 define exatamente como uma carteira HD, introduzida conceitualmente em [Carteiras HD](./hd-wallets.md), na verdade, deriva sua árvore de chaves de uma única semente. Este capítulo abrange precisamente o mecanismo: códigos de cadeia, derivação endurecida versus não endurecida, e chaves públicas estendidas, uma característica com propriedades reais, úteis e um risco real, documentado que vale a pena entender antes de confiar nele.

## A chave principal e o código da cadeia

Uma chave mestre BIP-32 é derivada da semente (a saída 64-byte do processo BIP-39 coberto em [Frases de sementes](./seed-phrases.md#de-mnemônico-para-semente-por-que-pbkdf2)) via HMAC-SHA512, dividindo o resultado de 512 bits em duas metades de 256 bits: **chave privada mestre** e o **código da cadeia principal**. O código da cadeia não é uma chave. É entropia adicional misturada em cada passo de derivação subsequente, especificamente para que as chaves da criança não tenham uma relação matemática facilmente detectável entre si ou com o pai, apesar de todas serem funções determinísticas da mesma semente final.

## Por que chaves de criança não parecem relacionadas

Derivando uma chave filho combina o material chave do pai com o código da cadeia e um **número de índice** através do HMAC-SHA512 novamente, produzindo uma nova saída de 512 bits que está dividida em uma nova chave privada infantil (através de adição modular com a chave do pai, para derivação não endurecida) e um novo código de cadeia infantil. Porque a saída do HMAC-SHA512 é, para fins práticos, indistinguível de entradas aleatórias dadas diferentes (a mesma propriedade de imprevisibilidade coberta em [Funções do Hash](../cryptography/hashes.md)), duas chaves de irmãos (derivadas do mesmo pai, diferindo apenas por índice) não têm padrão detectável conectando-as além de serem reprodutíveis da mesma chave pai e código de cadeia. Isto é exatamente o que o [Carteiras HD](./hd-wallets.md#exemplo-uma-semente-produzindo-deterministicamente-muitas-chaves) exemplo demonstrado: três chaves derivadas da mesma semente, cada uma parecendo um número de 256 bits totalmente independente e não relacionado.

## Derivação endurecida versus derivação não endurecida

BIP-32 define dois modos de derivação, distinguidos pela gama de índices (índices) `0` para `2^31 - 1` não endurecidos; índices `2^31` para `2^32 - 1`, convencionalmente escrito com um apóstrofo como `0'` ou `44'`, estão endurecidos):

- **Derivação não endurecida** pode calcular um filho *público* a chave diretamente da *chave pública do pai* e código de cadeia sozinho, sem precisar da chave privada do pai. Isto é o que faz [chaves públicas estendidas](#chaves-públicas-estendidas-e-um-risco-real) útil, coberto abaixo.
- **Derivação endurecida** requer do pai *privado* chave para derivar qualquer coisa (criança pública ou privada) especificamente porque foi projetado para fechar uma vulnerabilidade específica derivação não endurecida tem (coberto próximo).

## Chaves públicas estendidas e um risco real

Porque derivação não endurecida permite-lhe calcular as chaves públicas infantis a partir de apenas uma chave pública estendida de um pai (**xpub**, no formato de serialização do BIP-32) e código de cadeia, uma empresa pode gerar endereços de recepção voltados para o cliente para fins de contabilidade ou faturamento usando apenas um xpub, sem nunca ter as chaves privadas correspondentes em qualquer lugar perto desse sistema, uma separação genuinamente útil de preocupações. Mas esta conveniência acarreta um risco criptográfico específico e bem documentado: **Se um atacante aprende tanto a chave privada de uma criança não endurecida como a chave pública estendida de seus pais, eles podem recuperar matematicamente a chave privada do pai** (e, portanto, todas as outras chaves de criança em todo aquele ramo não endurecido), porque a matemática de derivação para chaves não endurecidas é totalmente reversível uma vez que você tem um par de chaves privada/pública mais o código de cadeia compartilhada. É exatamente por isso. [BIP-44](./bip-44.md) e utilização padrão de convenções de derivação **derivação endurecida para os níveis mais elevados e sensíveis do caminho** (função, tipo de moeda, conta) e derivação de reserva não endurecida apenas para os níveis inferiores (índice de endereço) em que este risco específico xpub-plus-one-leaked-key é considerado aceitável para a conveniência que permite.

## Exemplo: um xpub derivando chaves públicas infantis sem qualquer chave privada presente

```typescript
import { mnemonicToSeedSync, entropyToMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";
import { HDKey } from "@scure/bip32";

const testEntropy = new Uint8Array(16); // TEST ONLY
const seed = mnemonicToSeedSync(entropyToMnemonic(testEntropy, wordlist), "");
const master = HDKey.fromMasterSeed(seed);

// Derive down to a non-hardened branch, then export only the public data.
const account = master.derive("m/44'/0'/0'");
const accountXpub = account.publicExtendedKey;
console.log("account xpub:", accountXpub);

// Simulate a separate, private-key-free system that only has the xpub:
const watchOnly = HDKey.fromExtendedKey(accountXpub);
const child = watchOnly.derive("m/0/0"); // non-hardened from here — no private key needed
console.log("derived child public key (from xpub alone):", Buffer.from(child.publicKey!).toString("hex"));
console.log("private key is null (watch-only, as expected):", child.privateKey === null);
```

Resultado verificado da execução deste código exato:

```text
account xpub: xpub6BosfCnifzxcFwrSzQiqu2DBVTshkCXacvNsWGYJVVhhawA7d4R5WSWGFNbi8Aw6ZRc1brxMyWMzG3DSSSSoekkudhUd9yLb6qx39T9nMdj
derived child public key (from xpub alone): 03aaeb52dd7494c361049de67cc680e83ebcbbbdbeb13637d92cd845f70308af5e
private key is null (watch-only, as expected): true
```

A chave pública derivada corresponde exatamente ao que a derivação completa em [Carteiras HD](./hd-wallets.md#exemplo-uma-semente-produzindo-deterministicamente-muitas-chaves) calcula para o mesmo caminho (`e284129c...`'s chave pública correspondente), confirmando a derivação xpub-only, privada-chave-livre realmente atinge a mesma chave pública criança que a derivação full-key, sem nunca lidar com a chave privada.

## Conceitos errôneos comuns

**Um xpub não é seguro para compartilhar tão casualmente como uma chave ou endereço público comum.** Além do risco de vazamento de chave privada descrito acima, um xpub sozinho revela *cada* endereço em todo o seu ramo de derivação para quem o detém, mais as quantidades exatas e histórico de transações em cada, um vazamento de privacidade real, significativo (ver [Privacidade](../society/privacy.md)) distinto, e além disso, do risco de recuperação de chaves privadas.

**A derivação endurecida não é simplesmente "mais segura" em todas as dimensões sem tradeoff**. Fecha a vulnerabilidade específica xpub-plus-criança-chave, ao custo de exigir a chave privada pai para cada passo de derivação abaixo de um nível endurecido, que é exatamente por isso que as configurações somente relógio, privada-chave-livre (útil para contabilidade, monitoramento, ou sistemas somente recebimento) só são possíveis abaixo do limite endurecido da conta, não acima dela.

## Outras leituras

- [BIP 32: Carteiras determinísticas hierárquicas](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

---

[← Anterior: Carteiras HD](./hd-wallets.md)
·
[Voltar para Wallets e Key Management](./README.md)
·
[Próximo: BIP-44 →](./bip-44.md)
