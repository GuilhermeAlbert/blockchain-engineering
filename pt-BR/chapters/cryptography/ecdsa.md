# ECDSA

ECDSA (algoritmo de assinatura digital da curva elíptica) é o esquema de assinatura Bitcoin usado exclusivamente a partir de seu lançamento 2009 até [Taproot](../bitcoin/taproot.md) adicionado Schnorr assinaturas como uma alternativa em 2021, e continua a ser o esquema mais Bitcoin transações e praticamente todas as transações Ethereum usam hoje. Este capítulo cobre exatamente como ele funciona, verificado contra uma implementação real, e cobre em detalhes o único erro de implementação que causou mais roubo de criptomoeda do mundo real do que quase qualquer outro erro criptográfico: reutilização de nonce.

## Como funciona a assinatura

Dado uma chave privada `d`, um hash de mensagem `z` (ver [Assinaturas digitais](./digital-signatures.md#por-que-você-assina-um-haxixe-não-a-mensagem-crua)), e o ponto gerador da curva `G` e ordem `n` (ver [secp256k1](./secp256k1.md)):

1. **Gerar um nonce aleatório `k`.** Este deve ser um valor novo e imprevisível para cada assinatura. A razão pela qual é todo o assunto da segunda metade deste capítulo.
2. **Calcular o ponto da curva `R = k × G`**, e tomar `r`, a coordenada x de `R`, módulo reduzido `n`.
3. **Calcular `s = k⁻¹ × (z + r × d) mod n`**, onde `k⁻¹` é o inverso modular de `k`.
4. **A assinatura é o par `(r, s)`.**

## Como funciona a verificação

Dada a chave pública `Q = d × G`, o hash de mensagem `z`, e a assinatura `(r, s)`:

1. Calcular `w = s⁻¹ mod n`.
2. Calcular `u1 = z × w mod n` e `u2 = r × w mod n`.
3. Calcular o ponto `(x, y) = u1 × G + u2 × Q`.
4. **A assinatura é válida se `x mod n` igual a `r`.**

Isto funciona por causa de como `r` e `s` foram construídos durante a assinatura. A álgebra é projetada de modo que a fórmula de verificação reconstrua a mesma `r` valor somente se a assinatura foi produzida por alguém que conhecia a chave privada `d` correspondente a `Q`, sem o verificador nunca precisa saber `d` ou `k`.

## Exemplo: assinatura e verificação, verificação do fim ao fim

```typescript
import { secp256k1 } from "@noble/curves/secp256k1.js";
import { hexToBytes, bytesToHex } from "@noble/curves/utils.js";
import { sha256 } from "@noble/hashes/sha2.js";

const privateKey = hexToBytes((42).toString(16).padStart(64, "0"));
const publicKey = secp256k1.getPublicKey(privateKey, true);

const message = "hello bitcoin";
const messageHash = sha256(new TextEncoder().encode(message));

const signature = secp256k1.sign(messageHash, privateKey); // 64-byte compact (r || s)
console.log("r:", bytesToHex(signature.slice(0, 32)));
console.log("s:", bytesToHex(signature.slice(32, 64)));

console.log("valid:", secp256k1.verify(signature, messageHash, publicKey));

const tamperedHash = sha256(new TextEncoder().encode("hello bitcoin!"));
console.log("valid after tampering with the message:", secp256k1.verify(signature, tamperedHash, publicKey));
```

Resultado verificado da execução deste código exato:

```text
r: c21a625bfc4b9f6be2ec6ddfee389c5fc154ae68f4889bbdc25eb06f19ec5f08
s: 329617c8b5b819c8a240dbcd7969cf020069cc96dd0b1f0e6b715b8a8429058e
valid: true
valid after tampering with the message: false
```

Mudar um único caracter na mensagem produz um hash completamente diferente (ver [Funções do Hash](./hashes.md)), que a assinatura original já não valida contra, demonstrando a propriedade de integridade de [Assinaturas digitais](./digital-signatures.md#as-três-propriedades-necessárias) diretamente.

## Reutilização do Nonce: o erro de implementação mais conseqüente

Passo 1 do algoritmo de assinatura acima requer um **Nonce fresco, imprevisível `k` para cada assinatura**. Olhe novamente para a fórmula de assinatura: `s = k⁻¹ × (z + r × d) mod n`. Se um atacante observar **duas assinaturas diferentes que reutilizaram a mesma `k`** (para duas mensagens diferentes `z1` e `z2`, assinado pela mesma chave privada) álgebra básica permite-lhes recuperar a chave privada `d` diretamente:

Dado `s1 = k⁻¹(z1 + r·d)` e `s2 = k⁻¹(z2 + r·d)`, com o mesmo `r` (que acontece exatamente quando `k` é reutilizado, uma vez que `r` é derivado puramente de `k`), subtraindo dá `s1 - s2 = k⁻¹(z1 - z2)`, que pode ser resolvido diretamente para `k`, e uma vez `k` é conhecido, `d` segue-se imediatamente da equação de assinatura original. **Nenhuma fraqueza criptográfica é necessária. Esta é uma solução algébrica simples**, computável à mão com caneta e papel, dadas as duas assinaturas e mensagens.

Esta não é uma preocupação teórica. Dois casos bem documentados no mundo real:

- **PlayStation 3 da Sony.** Em 2010, pesquisadores de segurança (o grupo "fail0verflow", apresentado no Chaos Communication Congress) descobriram que o firmware PS3 da Sony usou ECDSA para assinar atualizações de software, mas reutilizou o mesmo nonce `k` para cada assinatura, permitindo ao grupo recuperar a chave de assinatura privada da Sony e quebrar permanentemente a segurança de assinatura de código da PS3.
- **Android Bitcoin carteiras, 2013.** Uma falha no Java `SecureRandom` implementação em certas versões do Android fez com que alguns aplicativos de carteira Bitcoin gerassem nonces previsíveis ou repetidos ao assinar transações. Vários usuários perderam fundos para atacantes que monitoraram o blockchain `r` valor (um sinal directo e observável de reutilização de nonce, uma vez que `r` é derivado de `k`), e usou as equações acima para recuperar chaves privadas e drenar os endereços afetados. Isso foi significativo o suficiente para que Bitcoin Core e outros softwares de carteira posteriormente se moveram para **Geração determinística de nonce**.

## A correção: nonces deterministic (RFC 6979)

Em vez de confiar em uma nova chamada gerador de números aleatórios para cada assinatura (que é tão confiável quanto a qualidade dessa chamada específica, como o caso Android demonstrou), implementações modernas ECDSA (incluindo o `@noble/curves` biblioteca usada nos exemplos deste livro, e Bitcoin Core) gerar o nonce `k` **deterministicamente**, como função específica, reprodutível da chave privada e do próprio hash de mensagem, seguindo o algoritmo especificado em [RFC 6979](https://www.rfc-editor.org/rfc/rfc6979). Isso garante aos observadores novos e imprevisíveis `k` para cada mensagem distinta, enquanto remove a qualidade do gerador de números aleatórios como um ponto de falha inteiramente, uma vez que nenhum valor aleatório separado precisa ser gerado no momento de assinatura em tudo, o exemplo de código acima usa isso por padrão, por isso assinar a mesma mensagem duas vezes com a mesma chave produz a assinatura idêntica ambas as vezes, verificada diretamente por re-running `secp256k1.sign` no mesmo hash e confirmando a correspondência dos bytes de saída.

## Comércio

A matemática da ECDSA é comparativamente simples de implementar (uma verdadeira vantagem explicando sua ampla adoção desde a década de 1990 em muitos sistemas não-bloqueadores, incluindo certificados TLS), mas essa mesma simplicidade deixa pouca margem para erro de implementação, como os casos de rejeição de nonce acima demonstram, um único erro sutil em um algoritmo de outro modo matematicamente som pode ser catastrófico e totalmente silencioso até ser explorado. [Assinaturas Schnorr](./schnorr.md), cobertos em seguida, foram projetados em parte para reduzir essa classe de risco de implementação, entre outras melhorias.

## Conceitos errôneos comuns

**A reutilização do Nonce em duas assinaturas não requer que um atacante encontre qualquer fraqueza matemática oculta na curva ou na função hash.** É álgebra elementar aplicada diretamente aos dados públicos observados (as duas assinaturas e suas mensagens), toda a segurança criptográfica da chave privada depende do nonce nunca repetindo, um fato que é fácil de afirmar, mas foi violado em sistemas reais, implantados tão recentemente quanto 2013.

**As assinaturas ECDSA não são determinísticas pela especificação original do algoritmo**O determinismo é uma propriedade de *que é o método de geração de nonce* uma implementação escolhe usar (RFC 6979 versus aleatoriedade fresca ingênua), não uma propriedade inerente do próprio ECDSA.

## Outras leituras

- [RFC 6979: Uso determinístico do algoritmo de assinatura digital (DSA) e algoritmo de assinatura digital de curva elíptica (ECDSA)](https://www.rfc-editor.org/rfc/rfc6979)
- [apresentação de recuperação da chave de assinatura PS3 do fail0verflow 2010](https://media.ccc.de/v/27c3-4087-en-console_hacking_2010): Congresso de Comunicação do Caos 27C3

---

[← Anterior: Assinaturas digitais](./digital-signatures.md)
·
[Voltar à Criptografia](./README.md)
·
[Próximo: Assinaturas Schnorr →](./schnorr.md)
