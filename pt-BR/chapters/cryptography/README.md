# Criptografia

Sistemas Blockchain combinam um punhado de primitivos criptográficos (funções hash, pares de chaves, assinaturas digitais, árvores Merkle) que, individualmente, precedem Bitcoin, em alguns casos por décadas. Esta seção constrói cada um a partir de seu problema subjacente, com exemplos executáveis TypeScript ao longo, de modo que capítulos posteriores podem usar termos como "hash", "sign", e "Merkle proof" precisamente em vez de como jargão inexplicável.

## O que você precisa saber primeiro

Nada além da familiaridade básica da programação. Exemplos de código usam TypeScript com o built-in de Node.js `crypto` módulo e o [`@noble/curves`](https://github.com/paulmillr/noble-curves) biblioteca para operações de curva elíptica, instalar com `npm install @noble/curves`. Todos os exemplos de código nesta seção foram executados e sua saída foi verificada diretamente, não manualmente.

## Capítulos

Esta seção é ordenada para o ensino, não a ordem que pode aparecer em uma lista de referências rápidas: conceitos de curva elíptica vêm antes dos esquemas de assinatura construídos sobre eles, mesmo que as assinaturas sejam o tópico mais imediatamente prático.

1. [Funções do Hash](./hashes.md): o primitivo geral: resistência à preimagem, resistência à colisão, o efeito avalanche
2. [SHA-256](./sha-256.md): dentro do algoritmo específico que o Bitcoin usa, passo a passo
3. [Colisões de Hash](./collisions.md): por que eles devem existir matematicamente, e a colisão real e documentada de SHA-1
4. [Resistência à Preimagem](./preimage-resistance.md): por que a mineração é uma busca bruta-força sem atalho
5. [Criptografia de Chave Pública](./public-key-cryptography.md): chaves assimétricas, e as duas coisas que você pode fazer com eles
6. [Chaves particulares e públicas](./keys.md): o que é realmente uma chave privada, e como uma chave pública é derivada
7. [Curvas elípticas](./elliptic-curves.md): a geometria e álgebra por trás de "multiplicar" uma chave por um ponto de curva
8. [secp256k1](./secp256k1.md): a curva exata Bitcoin e uso Ethereum, e por que foi escolhido
9. [Assinaturas digitais](./digital-signatures.md): autenticação, não repudiação, e porque você assina um hash
10. [ECDSA](./ecdsa.md): Esquema de assinatura original do Bitcoin, verificado de ponta a ponta, e o bug nonce-reuse que custou dinheiro real
11. [Assinaturas Schnorr](./schnorr.md): Esquema mais novo do Bitcoin, adicionado via Taproot, e por que ele permite agregação de assinatura
12. [Merkle Trees](./merkle-trees.md): sintetizando um grande conjunto de dados em um hash, construído e verificado em código
13. [Provas de Merkle](./merkle-proofs.md): provando a inclusão sem baixar todo o conjunto de dados
14. [Autorizações](./commitments.md): travando em um valor oculto você não pode mudar mais tarde
15. [Provas de Conhecimento Zero](./zero-knowledge.md): um tratamento introdutório, o suficiente para entender o rollup ZK mais tarde no livro

## Experimentos

Cada capítulo acima inclui um exemplo de código executável. Como um conjunto, eles levam-no através:

- ter um arquivo e observar o efeito da avalanche
- gerar um par de chaves e derivar uma chave pública de uma chave privada
- assinar e verificar uma mensagem com a ECDSA e a Schnorr
- construir uma pequena árvore Merkle e construir uma prova de inclusão válida
- criação de um esquema de compromisso simples (um flip de moeda verificável)

## Próxima

Continuar a [Sistemas distribuídos](../distributed-systems/README.md) ver como esses primitivos se combinam com redes e consensos. Só a criptografia prova que uma mensagem não foi adulterada; ela não, por si só, diz a uma rede de nós mutuamente desconfiantes que versão da história acreditar.
