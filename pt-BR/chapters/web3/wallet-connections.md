# Conectando as Carteiras

Uma aplicação Web3 não contém as chaves privadas dos usuários. Pede ao software de carteiras que assinem coisas em seu nome, através de um protocolo de conexão padronizado. Este capítulo cobre como essa conexão realmente funciona, e o padrão específico (EIP-1193) que torna diferentes carteiras intercambiáveis da perspectiva de um dapp.

## EIP-1193: a interface que cada carteira de navegador implementa

Carteiras baseadas em navegadores (MetaMask e a maioria das outras) injetam uma `window.ethereum` objeto em cada página, implementando uma interface padrão ([EIP-1193](https://eips.ethereum.org/EIPS/eip-1193)) para solicitar acesso à conta, enviar solicitações do JSON-RPC e subscrever eventos (alterações na conta, alterações na rede). Como esta interface é padronizada, uma aplicação escrita contra ela funciona com qualquer carteira conforme, sem precisar de código de integração específico de carteira, o mesmo princípio de interoperabilidade por trás [Contrato ABI](../contracts/abi.md)A codificação é padronizada, aplicada aqui na camada de ligação da carteira.

## O fluxo de conexão

```typescript
import { createWalletClient, custom } from "viem";
import { mainnet } from "viem/chains";

async function connectWallet() {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("No browser wallet detected");
  }

  const walletClient = createWalletClient({
    chain: mainnet,
    transport: custom(window.ethereum),
  });

  // Requests the user's explicit permission via a wallet popup —
  // nothing is accessible before the user approves this request.
  const [address] = await walletClient.requestAddresses();
  console.log("connected address:", address);
  return { walletClient, address };
}
```

Este código é ilustrativo do código navegador-ambiente (depende de `window.ethereum`, que só existe em um navegador com uma extensão de carteira instalada) e não pode ser executado no ambiente normal de verificação Node.js deste livro. O próprio padrão, porém, é exatamente o que bibliotecas gostam `viem` e `wagmi` (ver [wagmi](./wagmi.md)) envolver em ganchos mais ergonómicos e utilitários.

## O que "conectar" realmente concede, e não

Conectar uma carteira a um dapp garante que a visibilidade do aplicativo no endereço da conta conectada (e, implicitamente, sua atividade e saldos na cadeia pública, uma vez que esses são legíveis publicamente independentemente, veja [Ler o Estado da Cadeia de Blocos](./reading-state.md)) e a capacidade de **pedido** Assinaturas e transações. Sim. **não** conceda ao dapp qualquer capacidade de assinar ou enviar qualquer coisa sem a carteira separadamente levando o usuário a aprovar explicitamente cada ação individual. Conexão e autorização-por-ação são duas etapas distintas, e uma carteira bem-comportada requer sempre o segundo mesmo após o primeiro já aconteceu.

## Por que esta distinção importa para a segurança

Esta é precisamente a lacuna [ataques de phishing](../security/phishing.md) explore: um site malicioso pode solicitar uma conexão com a carteira (uma ação baixa, muitas vezes *disfarçado* pedido de transação ou assinatura (um que parece rotina, mas realmente autoriza algo prejudicial (uma aprovação ilimitada do token, veja [Ataques de aprovação](../security/approval-attacks.md), ou uma assinatura maliciosa, ver [Assinaturas Maléficas](../security/malicious-signatures.md))) contando com usuários não lendo cuidadosamente o que eles estão realmente aprovando nesse segundo passo, separado.

## Conceitos errôneos comuns

**Uma conexão de carteira não é persistente ou automaticamente re- concedida em todas as sessões do navegador** em cada implementação, muitas carteiras e dapps re-request ou reconfirmam o estado de conexão, e um usuário normalmente pode revogar a permissão de conexão de um site a qualquer momento através das próprias configurações de sua carteira, independente de qualquer coisa que o próprio dapp faça.

**Conectar uma carteira não revela, por si só, a chave privada de um usuário para o dapp** em qualquer carteira bem implementada. Todo o modelo EIP-1193 é projetado especificamente para que o dapp só receba informações públicas (endereço) e saídas assinadas (assinaturas, hashes de transação), nunca o material chave usado para produzi-las.

## Outras leituras

- [EIP-1193: API JavaScript do provedor Ethereum](https://eips.ethereum.org/EIPS/eip-1193)
- [viem documentação: Carteira Cliente](https://viem.sh/docs/clients/wallet)

---

[← Anterior: Fornecedores RPC](./rpc-providers.md)
·
[Voltar para Construindo Aplicações Web3](./README.md)
·
[Próximo: WalletConnect →](./walletconnect.md)
