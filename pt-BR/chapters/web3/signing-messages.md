# Assinando Mensagens

Uma carteira pode assinar uma mensagem arbitrária sem enviar qualquer transação, sem gás, sem interação blockchain, apenas uma prova criptográfica de que o titular de uma chave privada específica endossou um dado específico. Este capítulo cobre por que isso é útil, e o formato específico (EIP-191) que faz uma assinatura de mensagem simples distinguível de uma assinatura de transação.

## Assinar e verificar uma mensagem simples

```typescript
import { verifyMessage } from "viem";

// Signing (from a connected wallet):
const signature = await walletClient.signMessage({
  account: userAddress,
  message: "Sign in to Example App",
});

// Verifying (can be done by anyone, without any wallet connection at all):
const isValid = await verifyMessage({
  address: userAddress,
  message: "Sign in to Example App",
  signature,
});

console.log("signature valid:", isValid);
```

## Por que assinar uma mensagem, se não faz nada on-chain

O caso de uso mais comum é **autenticação sem senha**: uma aplicação pede a um usuário para assinar uma mensagem específica, muitas vezes gerada aleatoriamente ("Sign in to Example App, nonce: 8f3a2b..."), e trata uma assinatura válida como prova que o usuário controla o endereço reivindicado, o mesmo [assinatura digital](../cryptography/digital-signatures.md) propriedade de autenticação coberta geralmente em Cryptography, aplicada aqui para provar identidade em vez de autorizar uma transferência de fundo. Isto é verdadeiramente útil precisamente porque não custa nada e não requer nenhuma interação blockchain: sem gás, sem esperar pela confirmação, apenas uma prova criptográfica instantânea.

## EIP-191: por que as mensagens assinadas começam com um prefixo específico

Assinatura ECDSA em bruto (ver [ECDSA](../cryptography/ecdsa.md)) não pode dizer, apenas pela assinatura, que tipo de dados foi realmente assinado. Isso cria um perigo real e documentado: se a assinatura de mensagem simples usou o processo de assinatura idêntico como assinatura de transação, um site malicioso poderia enganar um usuário para "assinar uma mensagem" que uma carteira ou uma ferramenta diferente poderia realmente ser capaz de reinterpretar e retransmitir como uma transação válida e autorizada. [EIP-191](https://eips.ethereum.org/EIPS/eip-191) fecha este espaço, exigindo que cada assinatura de mensagem simples seja calculada sobre a mensagem **prefixado** com `"\x19Ethereum Signed Message:\n" + message.length`, antes de hashing e assinatura, um prefixo escolhido especificamente porque ele nunca pode colidir com o início de uma transação validamente codificada por RLP, garantindo uma assinatura de mensagem nunca pode ser mal interpretada como autorizando uma transação real.

## Conceitos errôneos comuns

**Assinar uma mensagem não é livre de riscos apenas porque não custa gás** (um dapp malicioso ainda pode apresentar *disfarçado* mensagem para assinar cujo conteúdo, uma vez decodificado, realmente autoriza algo prejudicial (particularmente relevante para as assinaturas estruturadas, mais expressivas [Dados tipados e EIP-712](./eip-712.md)) a propriedade "sem gás" significa que nenhuma taxa de transação é cobrada, não que a ação sendo autorizada é automaticamente segura.

**Uma assinatura válida sobre uma mensagem não prova, por si só, nada sobre o *veracidade* do conteúdo da mensagem**Só prova que o titular de uma chave privada específica endossou esse texto exato; se uma aplicação pedir a um usuário que assine "Eu tenho 18 anos ou mais", uma assinatura válida prova que a carteira do usuário endossou essa afirmação, não que seja factualmente verdadeira.

## Outras leituras

- [EIP-191: Padrão de dados assinados](https://eips.ethereum.org/EIPS/eip-191)

---

[← Anterior: Envio de Transações](./sending-transactions.md)
·
[Voltar para Construindo Aplicações Web3](./README.md)
·
[Próximo: Dados digitados e EIP-712 →](./eip-712.md)
