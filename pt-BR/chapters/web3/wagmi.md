# wagmi

wagmi é uma biblioteca de ganchos React construída em cima de [viem](./viem.md), lidar com os problemas específicos de gerenciamento de estado que vêm da construção de uma interface de usuário conectada com carteira (estado de conexão, estados de carregamento, refetching automático) `viem` Sozinho, como uma biblioteca de clientes de nível inferior, deliberadamente não se dirige.

## O que o wagmi adiciona no topo do viem

`viem`'s `readContract` e `writeContract` (coberto em [Ler o Estado da Cadeia de Blocos](./reading-state.md) e [Enviando Transações](./sending-transactions.md)) são simples funções async, chamando-as de um componente React significa gerenciar manualmente estados de carregamento, estados de erro, re-fetching em mudanças de dependência, e cache, exatamente o tipo de caldplate data-fetching bibliotecas como React Query foram construídas para eliminar para APIs HTTP comuns. wraps wagmi `viem` chamadas em ganchos React (build on React Query internamente) que lidam com tudo isso automaticamente:

```typescript
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { erc20Abi } from "viem";

function TokenBalance({ tokenAddress }: { tokenAddress: `0x${string}` }) {
  const { address } = useAccount(); // the currently connected wallet address, reactively

  const { data: balance, isLoading } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

  if (isLoading) return <span>Loading...</span>;
  return <span>Balance: {balance?.toString()}</span>;
}
```

Este componente reinicia automaticamente quando `address` alterações (uma carteira diferente conecta), lida com o estado de carregamento enquanto a consulta está em voo, e (através do cache subjacente de React Query) evita requisições redundantes, duplicadas se vários componentes precisam dos mesmos dados simultaneamente.

## Conectores: abstraindo sobre diferentes métodos de conexão de carteira

wagmi's **conectores** resumo sobre as diferentes formas como um usuário pode conectar uma carteira (uma extensão do navegador (através da interface EIP-1193 de [Conectando as Carteiras](./wallet-connections.md)), [WalletConnect](./walletconnect.md) para carteiras móveis, ou outros métodos de conexão) atrás de um consistente `useConnect` interface de gancho, para que o código de UI de uma aplicação não precise de lógica separada e específica para cada tipo de carteira suportado.

## Por que esta camada (vime por baixo, wagmi no topo) faz sentido

Isto espelha um padrão comum e sensato na arquitetura de software em geral: uma biblioteca de baixo nível, de base diagnóstica (`viem`) manuseando a mecânica real do protocolo de forma correta e completa, com uma biblioteca de alto nível específica de framework (`wagmi`, especificamente para React) lidar com a ergonomia e gestão do estado particularmente para os próprios padrões desse framework, em vez de qualquer biblioteca tentando fazer ambos os trabalhos ao mesmo tempo. Um aplicativo que não usa React (um script de infraestrutura Node.js, uma interface Vue) pode usar `viem` diretamente, exatamente como fazem os outros exemplos verificados deste livro, sem necessidade de wagmi.

## Conceitos errôneos comuns

**wagmi não é um substituto para a compreensão da mecânica viem/JSON-RPC subjacente**Ele automatiza o trabalho de gerenciamento de estado real e repetitivo, mas cada gancho ainda executa as mesmas leituras, escritas e solicitações de assinatura cobertas durante os capítulos anteriores deste livro Web3; entendendo o que está realmente acontecendo por baixo (a `readContract` chamar, a `writeContract` call) permanece igualmente relevante para depuração e raciocínio sobre o comportamento de uma aplicação baseada em wagmi.

**ganchos wagmi não funcionam fora de uma árvore de componentes React envolto na configuração necessária do provedor wagmi**, como a maioria das bibliotecas ganchos React, wagmi requer a sua `WagmiProvider` (ele mesmo embrulhando um configurado `viem`-based client) para estar presente acima da árvore de componentes; chamando um gancho wagmi sem esta configuração falha imediatamente, não silenciosamente.

## Outras leituras

- [documentação wagmi](https://wagmi.sh/)

---

[← Anterior: viem](./viem.md)
·
[Voltar para Construindo Aplicações Web3](./README.md)
·
[Próximo: Finanças descentralizadas →](../defi/README.md)
