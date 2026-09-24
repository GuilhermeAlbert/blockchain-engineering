# Endereços

Um endereço Bitcoin é uma string curta e compartilhável que diz à rede onde enviar fundos, mas não é ela mesma uma chave, e também não é a mesma coisa que uma chave pública, apesar de ser derivada de uma. Este capítulo cobre exatamente o que é um endereço, por que ele existe como uma coisa separada de uma chave pública, e os três formatos de endereço em uso ativo hoje.

## Por que os endereços existem, separadamente das chaves públicas

Tal como estabelecido em [ScriptPubKey e ScriptSig](../bitcoin/scripts.md#por-que-p2pk-deu-lugar-a-p2pkh), os primeiros scripts de bloqueio Bitcoin (P2PK) incorporaram uma chave pública completa diretamente. Endereços existem porque hashing a chave pública primeiro (antes de ser revelado on-chain) fornece valor de segurança real: um endereço não revela nada sobre a chave pública subjacente até que a saída correspondente é realmente gasto, fechando qualquer possibilidade de atacar a chave pública (incluindo, especulativamente, através de um futuro computador quântico suficientemente poderoso, veja [Curvas elípticas](../cryptography/elliptic-curves.md#multiplicação-escalar-e-o-problema-difícil)) antes desse ponto. Um endereço é, mecanicamente, `hash(publicKey)`, codificado para uso humano, nunca a própria chave pública.

## Os três formatos em uso ativo

| Formato | Prefixo (mainnet) | Tipo de script subjacente | Capítulo |
| --- | --- | --- | --- |
| Base58Verificar | `1` | P2PKH | [P2PKH](../bitcoin/p2pkh.md) |
| Base58Verificar | `3` | P2SH (incluindo SegWit embrulhado com P2SH) | [P2SH](../bitcoin/p2sh.md) |
| Bech32 | `bc1q...` | SegWit nativo (P2WPKH/P2WSH) | [SegWit](../bitcoin/segwit.md) |
| Bech32m | `bc1p...` | Taporot (P2TR) | [Taproot](../bitcoin/taproot.md) |

## Base58Verificar, precisamente

Base58 usa um alfabeto de 58 caracteres (a base comum62 alfanumérico conjunto com `0` (zero), `O` (capital o), `I` (capital i), e `l` (L minúsculo) deliberadamente removido, uma vez que estes são fáceis de confundir visualmente, especialmente em backups escritos à mão ou de baixa resolução. **Base58Verificar** adiciona um byte de versão (identificando o tipo de rede e endereço) e um checksum de 4-bytes, calculados como os primeiros quatro bytes de `SHA256(SHA256(versionByte + payload))`, anexado antes da codificação) permitindo que uma carteira detecte quase todos os erros de digitação ou transcrição acidentais em um endereço antes de transmitir fundos para ele, em vez de enviar silenciosamente para um destino não intencional, provavelmente invencível.

## Bech32 e Bech32m

[SegWit](../bitcoin/segwit.md#formatos-de-endereço-bech32) introduzido **Bech32** (BIP 173), uma codificação diferente usando um alfabeto de 32 caracteres, inteiramente minúscula (ou inteiramente maiúsculas). O caso misto é explicitamente rejeitado como inválido, que por si só captura uma classe de erros de transcrição), e um código de detecção de erro matematicamente mais forte do que o checksum do Base58Check, capaz de detectar e, para pequenas corridas de erros, identificar a posição de caracteres específicos provavelmente erroneamente digitada. Taproot usa uma variante refinada, **Bech32m** (BIP 350), que corrige um bug sutil descoberto na especificação original do Bech32 que poderia, em casos raros, deixar certos erros não detectados especificamente para strings codificadas mais longas. O Bech32m altera uma constante no cálculo da soma de verificação para fechar esta lacuna, razão pela qual os endereços Taproot usam uma `bc1p` prefixo distinto do nativo SegWit's `bc1q`, tornando os dois formatos visualmente distinguíveis de relance.

## Exemplo: derivando um endereço de uma chave pública

```typescript
import { createHash } from "node:crypto";
import { secp256k1 } from "@noble/curves/secp256k1.js";
import { hexToBytes, bytesToHex } from "@noble/curves/utils.js";

function sha256(buf: Buffer): Buffer {
  return createHash("sha256").update(buf).digest();
}
function ripemd160(buf: Buffer): Buffer {
  return createHash("ripemd160").update(buf).digest();
}
function hash160(buf: Buffer): Buffer {
  return ripemd160(sha256(buf));
}

// A toy private key (the number 42) — for demonstration only, never real funds.
const privateKey = hexToBytes((42).toString(16).padStart(64, "0"));
const publicKey = secp256k1.getPublicKey(privateKey, true); // compressed

const pubKeyHash = hash160(Buffer.from(publicKey));
console.log("Public key (hex):", bytesToHex(publicKey));
console.log("Hash160 (the value a P2PKH address encodes):", pubKeyHash.toString("hex"));
```

Resultado verificado da execução deste código exato:

```text
Public key (hex): 02fe8d1eb1bcb3432b1db5833ff5f2226d9cb5e65cee430558c18ed3a3c86ce1af
Hash160 (the value a P2PKH address encodes): 9290649ba520a35912dab1733b6f098587e432ef
```

Uma implementação completa de codificação Base58Check é deixada como a [Tente você mesmo](#experimenta-tu-mesmo) exercício abaixo em vez de incluído em linha, para manter este exemplo focado na etapa hashing especificamente.

## Comércio

Derivar endereços de um hash em vez de expor a chave pública custa diretamente uma pequena quantidade de computação extra (duas operações adicionais de hash) e uma pequena quantidade de dados extras em tipos de script mais antigos, não-SegWit, em troca do benefício de segurança e privacidade de não revelar a chave pública até gastar tempo, um tradeoff essencialmente cada carteira e designer de protocolo desde os primeiros anos do Bitcoin julgou que vale a pena, dado o quão barato hashing é relativo ao benefício.

## Conceitos errôneos comuns

**Reutilizar o mesmo endereço para vários pagamentos recebidos não é incorreto ou inválido, mas tem um custo de privacidade real**, discutido em [Privacidade](../society/privacy.md), cada transação com ou a partir desse endereço torna-se trivialmente linkable para cada outro, razão pela qual as carteiras modernas geram um novo endereço para cada nova transação por padrão (ver [Carteiras HD](./hd-wallets.md)).

**Um endereço não é "seu" na forma como um número de conta bancária está ligado à sua identidade**, nada no próprio endereço codifica quem o controla; um endereço só se torna ligado a uma identidade do mundo real através de informação externa (registros KYC em uma troca, por exemplo, veja [KYC e AML](../society/kyc-aml.md)), não através de nada no protocolo Bitcoin em si.

## Experimenta tu mesmo.

Estenda o exemplo acima com um codificador Base58Check completo (byte de versão `0x00` para mainnet P2PKH, mais o duplo-SHA256 checksum) para produzir uma cadeia de endereços P2PKH de formato válido a partir do valor de hash160 calculado.

## Outras leituras

- [Bitcoin Referência do desenvolvedor principal: Endereços](https://developer.bitcoin.org/devguide/wallets.html)
- [BIP 173: Formato de endereço base32 para saídas de testemunhas nativas v0-16](https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki)
- [BIP 350: Formato Bech32m para endereços de testemunhas v1+](https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki)

---

[← Anterior: O que é uma carteira?](./README.md)
·
[Voltar para Wallets e Key Management](./README.md)
·
[Próximo: Chaves privadas →](./private-keys.md)
