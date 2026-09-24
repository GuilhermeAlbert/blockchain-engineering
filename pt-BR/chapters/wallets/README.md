# Carteiras e Gestão de Chaves

Uma carteira não armazena literalmente moedas. Ele armazena ou gerencia as chaves usadas para autorizar os gastos. Uma distinção nesta seção retorna repetidamente, porque o modelo mental "seu Bitcoin é armazenado em sua carteira", enquanto uma simplificação conveniente, obscurece como backup, recuperação, custódia e roubo realmente funcionam. Esta seção abrange chaves, frases de sementes, derivação hierárquica, e o espectro prático, desde carteiras quentes até armazenamento frio e com ar.

## O que você precisa saber primeiro

[Chaves particulares e públicas](../cryptography/keys.md) e [Assinaturas digitais](../cryptography/digital-signatures.md) da seção de criptografia, e [O Modelo UTXO](../bitcoin/utxo.md) de Bitcoin. Esta seção é inteiramente sobre a gestão das chaves aqueles capítulos já explicou a mecânica de.

**Cada chave privada, frase de semente e exemplo de derivação nesta seção usa um valor de teste trivial, claramente falso (como o número 42) ou o vetor de teste oficial, documentado publicamente BIP-39 all-zero, nunca real, imprevisível entropia. Nunca reutilize qualquer valor mostrado nesta seção para fundos reais.**

## Capítulos

1. [Endereços](./addresses.md): Base58Check, Bech32, e Bech32m, e porque um endereço não é uma chave pública
2. [Chaves Privadas](./private-keys.md): precisamente o que uma carteira faz e não faz com uma
3. [Chaves Públicas](./public-keys.md): quando eles se tornam visíveis on-chain, e por que esse timing importa
4. [Frases de sementes](./seed-phrases.md): entropia para mnemônica para semente, verificada contra o vetor de teste oficial BIP-39
5. [BIP-39](./bip-39.md): o próprio padrão, a frase-passe opcional, e seu risco real documentado
6. [Carteiras HD](./hd-wallets.md): uma semente, uma árvore determinística ilimitada de chaves
7. [BIP-32](./bip-32.md): códigos de cadeia, derivação endurecida e uma genuína vulnerabilidade relacionada ao xpub
8. [BIP-44](./bip-44.md): a estrutura padronizada do caminho, e suas variantes de campo de propósito
9. [Caminhos de Derivação](./derivation-paths.md): uma referência prática para ler e solucionar problemas
10. [Carteiras Quentes](./hot-wallets.md): conectividade como a propriedade definidora, não incidental,
11. [Armazenamento a frio](./cold-storage.md): ar-gapping e assinatura offline, concretamente
12. [Carteira de Hardware](./hardware-wallets.md): elementos seguros e verificação de transações no dispositivo
13. [Multisig](./multisig.md): baseado em script e agregado em Taproot, e o que cada um realmente resolve
14. [Custodial vs Carteiras Não- Personalizadas](./custody.md): "não suas chaves, não suas moedas," desempacotado precisamente
15. [Chave de backup e recuperação](./recovery.md): o tradeoff de redundância-versus-exposição, e a partilha secreta de Shamir

## Próxima

Continuar a [Escala de Bitcoin](../bitcoin-scaling/README.md), que capta as questões de rendimento desta seção [multisig](./multisig.md) e [carteira quente](./hot-wallets.md) capítulos abordados, e constrói para o [Lightning Network](../lightning/README.md). Um sistema que depende diretamente da chave e da mecânica da assinatura desta seção coberta.
