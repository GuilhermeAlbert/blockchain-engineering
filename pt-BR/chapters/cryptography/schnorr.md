# Assinaturas Schnorr

As assinaturas de Schnorr são, de certa forma, o esquema que o designer de Bitcoin poderia ter usado desde o início, se não fosse por uma patente. Nome em homenagem ao criptógrafo Claus-Peter Schnorr, que patenteou o esquema em 1989 (a patente expirou em 2008, no mesmo ano em que o whitepaper Bitcoin foi publicado. Uma coincidência temporal que tem alimentado especulação, mas não tem nenhuma conexão documentada com a escolha real de Satoshi de ECDSA sobre Schnorr, que é inexplicável em qualquer escrita conhecida), o esquema é mais simples do que ECDSA e oferece uma propriedade adicional específica, praticamente valiosa: agregação de assinatura. Bitcoin adicionou assinaturas Schnorr como opção via [Taproot](../bitcoin/taproot.md), ativado em novembro de 2021.

## Como funciona a assinatura

Dado uma chave privada `d`, a sua chave pública `Q = d × G`, e um hash de mensagem `m`:

1. **Gerar um nonce `k`** (na especificação do BIP 340, isto é gerado deterministicamente, semelhante em espírito à RFC 6979 para a ECDSA, evitando as armadilhas exatas de nonce-reuse cobertas em [ECDSA](./ecdsa.md#reutilização-do-nonce-o-erro-de-implementação-mais-conseqüente)).
2. **Calcular `R = k × G`.**
3. **Calcular um desafio `e = H(R || Q || m)`**: um hash do ponto nonce, a chave pública, e a mensagem juntos, ligando todos os três em um único valor.
4. **Calcular `s = k + e × d mod n`.**
5. **A assinatura é o par `(R, s)`**, tipicamente codificada como a coordenada x de `R` mais `s`.

## Como funciona a verificação

Dada a chave pública `Q`, mensagem `m`, e assinatura `(R, s)`:

1. Recomponha o desafio `e = H(R || Q || m)`, o mesmo hash usado durante a assinatura.
2. Verificar se `s × G = R + e × Q`.

Esta é uma identidade algébrica direta: substituindo a equação de assinatura `s = k + e·d` em `s × G` dá `(k + e·d) × G = k·G + e·d·G = R + e·Q`, que é exatamente o que verifica a verificação. Assim, uma assinatura válida sempre irá satisfazer esta equação, e (pela curva elíptica discreta logaritmo da dureza do problema, veja [Curvas elípticas](./elliptic-curves.md)) ninguém sem conhecimento de `d` pode construir um `(R, s)` par que o satisfaz para uma mensagem escolhida, exceto com probabilidade negligenciável.

## Por que Bitcoin o adotou: linearidade

A propriedade que faz assinaturas Schnorr genuinamente diferentes do ECDSA, não apenas uma alternativa com as mesmas capacidades, é **linearidade**: porque a equação de assinatura `s = k + e × d` é uma combinação linear simples, assinaturas Schnorr de vários signores diferentes podem ser matematicamente combinadas em uma única assinatura agregada compacta que verifica contra uma chave pública combinada, sem que qualquer assinatura individual ou chave privada seja revelada separadamente. Equação de assinatura da ECDSA (`s = k⁻¹(z + r·d)`) envolve uma inversão modular de `k`, que quebra este mesmo tipo de combinação linear limpa.

Isto permite **Operações multi-assinatura (multisig) que são indistinguíveis em cadeia de operações ordinárias de assinatura única**: um gasto multisig 3-of-5 usando a agregação de Schnorr (através de um protocolo chamado MuSig, construído em cima do BIP 340) produz uma assinatura do mesmo tamanho e forma como uma assinatura de um único singer, em vez de três assinaturas separadas agrupadas da forma que pré-Taproot multisig necessário. Este sistema tem duas vantagens concretas e práticas [Taproot](../bitcoin/taproot.md) e [Multisig](../wallets/multisig.md): reduz os dados de transação que os gastos multisig exigem (taxas de redução, uma vez que as taxas de Bitcoin escalam com o tamanho da transação, veja [Taxas de transação](../bitcoin/fees.md)), e melhora a privacidade, uma vez que um complexo arranjo multisig não é mais visivelmente distinguível na blockchain de uma transação de chave única comum.

## Exemplo

```typescript
import { schnorr } from "@noble/curves/secp256k1.js";
import { hexToBytes, bytesToHex } from "@noble/curves/utils.js";
import { sha256 } from "@noble/hashes/sha2.js";

const privateKey = hexToBytes((42).toString(16).padStart(64, "0"));
const publicKey = schnorr.getPublicKey(privateKey); // 32-byte x-only public key, per BIP 340

const message = sha256(new TextEncoder().encode("hello taproot"));
const signature = schnorr.sign(message, privateKey);

console.log("x-only public key:", bytesToHex(publicKey));
console.log("signature (r || s):", bytesToHex(signature));
console.log("valid:", schnorr.verify(signature, message, publicKey));
```

Resultado verificado da execução deste código exato:

```text
x-only public key: fe8d1eb1bcb3432b1db5833ff5f2226d9cb5e65cee430558c18ed3a3c86ce1af
signature (r || s): 4b5cf63c407f6b4db647d13711445f3c8a7ac45e07877d936862e6bd71c2e66c4fc8367362010303a6b5db037fdcedd10f39fac9321b35cddf511060ba1cb188
valid: true
```

Note que a chave pública aqui é 32 bytes, não o formato 33-byte comprimido (ou 65-byte não comprimido) usado em outro lugar neste livro, BIP 340 define Schnorr chaves públicas como **somente x-**, deixando completamente o bit sinal da coordenada y e fixando uma convenção para qual dos dois possíveis valores y a usar, que raspa mais um byte fora de cada chave pública em comparação com o formato ECDSA comprimido, um pequeno, mas real espaço economia que compostos através da cadeia de bloqueio.

## Comércio

As assinaturas da Schnorr requerem a construção específica e cuidadosa do BIP 340 (incluindo a convenção de chave pública somente x e o hashing específico separado de domínio para o desafio) para evitar ataques sutis que uma implementação ingênua da construção Schnorr "obvia" pode cair. A versão de Bitcoin não é simplesmente "o algoritmo original de 1989 do papel Schnorr", mas uma variante cuidadosamente especificada projetada para este caso de uso exato. A agregação, o benefício principal do esquema, também introduz nova complexidade de nível de protocolo: a família MuSig de protocolos de agregação passou por várias versões publicadas (MuSig, MuSig2) especificamente porque versões anteriores tinham falhas de segurança sutis em padrões de interação multipartidários específicos, descobertos e corrigidos através de pesquisa criptográfica contínua após a publicação inicial, um lembrete de que "linear e simples" não significa "triviamente seguro para compor em cada contexto diferentes desenvolvedores podem imaginar".

## Conceitos errôneos comuns

**As assinaturas do Schnorr não substituíram o ECDSA no Bitcoin. Eles foram adicionados ao lado dele.** Os tipos de transação pré-Taproot (P2PKH, P2SH, pré-Taproot SegWit) continuam a usar o ECDSA; apenas as transações com gastos com Taproot usam o Schnorr. Ambos permanecem válidos, suportados esquemas de assinatura na rede Bitcoin hoje.

**A agregação da assinatura não é a mesma que simplesmente "uma pessoa assina em nome de um grupo".** Cada chave participante deve ainda individualmente e honestamente participar na produção da assinatura agregada, nenhum participante pode forjar a assinatura do grupo sozinho, que é precisamente a propriedade de segurança que o torna útil para o multisig genuíno em vez de uma forma de contornar a necessidade de cooperação de cada partido.

## Outras leituras

- [BIP 340: Assinaturas da Schnorr para a secp256k1](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki)
- [Geração eficiente de assinaturas por cartões inteligentes](https://link.springer.com/article/10.1007/BF00196725): Claus-Peter Schnorr original 1991 papel

---

[← Anterior: ECDSA](./ecdsa.md)
·
[Voltar à Criptografia](./README.md)
·
[Próximo: Merkle Trees →](./merkle-trees.md)
