# viem

Cada exemplo de código ao longo dos capítulos Ethereum, EVM, Tokens e Web3 deste livro usa `viem`, uma biblioteca TypeScript para interagir com Ethereum, escolhida especificamente pelas razões que este breve capítulo explica, em vez de tratada como um padrão não examinado.

## O que viem realmente fornece, em cima do JSON-RPC bruto

Lembrar [JSON- RPC](../ethereum/json-rpc.md#por-que-existem-bibliotecas-de-nível-superior-em-cima-disto): chamadas brutas JSON-RPC requerem chamadas de função de codificação manual, conversão manual de valores de hex, e manipulação manual de dezenas de formatos de parâmetros específicos do método. `viem` envolve isto numa API ergonómica e segura (`readContract`, `writeContract`, `getLogs`, e as outras funções utilizadas ao longo deste livro exemplos) enquanto permanece uma camada fina, transparente: cada chamada de `viem` nos exemplos verificados deste livro compila até exatamente as chamadas JSON-RPC brutas demonstradas diretamente em [JSON- RPC](../ethereum/json-rpc.md#exemplo-uma-chamada-json-rpc-em-bruto-sem-biblioteca).

## Clientes públicos versus clientes de carteira

`viem` separa o acesso de leitura do acesso de escrita/assinatura em dois tipos de clientes distintos, espelhando [estado de leitura](./reading-state.md) versus [enviando transações](./sending-transactions.md) Distinção já abrangida:

```typescript
import { createPublicClient, createWalletClient, http, custom } from "viem";
import { mainnet } from "viem/chains";

// Read-only — no wallet, no signing capability, safe to use anywhere.
const publicClient = createPublicClient({ chain: mainnet, transport: http() });

// Read AND write — requires a signer (a browser wallet, or a private
// key account for scripts/backends — never hardcode a real private key,
// see chapters/wallets/seed-phrases.md).
const walletClient = createWalletClient({ chain: mainnet, transport: custom(window.ethereum) });
```

Esta divisão é uma escolha de design de API deliberada refletindo um limite de segurança real: a `publicClient` genuinamente não pode assinar ou enviar nada, não importa como é usado, o que torna seguro construir e usar livremente (em um frontend, um serviço de backend, um script) sem qualquer risco de expor acidentalmente a capacidade de assinatura onde não é necessário.

## Tipo de segurança do ABI

Porque... `viem` é escrito em TypeScript com tipos genéricos fortes, passando um ABI devidamente digitado (como os exemplos deste livro fazem com `parseAbi`) dá verificação do tipo de tempo de compilação sobre nomes de funções, tipos de argumentos e tipos de retorno, um benefício real e prático que captura uma classe de bugs de integração (um nome de função erroneamente digitado, um tipo de argumento errado) em tempo de compilação em vez de como uma falha de tempo de execução contra um contrato ao vivo.

## Por que este livro usa viem especificamente

`viem` foi escolhido para os exemplos deste livro por razões declaradas claramente ao invés de implícitas esquerda: é mantido ativamente, tornou-se um padrão amplamente adotado em todo o ecossistema desenvolvedor Ethereum (incluindo ser o cliente subjacente padrão para [wagmi](./wagmi.md), coberto próximo), e seu design API espelha de perto os conceitos subjacentes JSON-RPC e ABI este livro ensina diretamente, tornando mais fácil ver a conexão entre `viem`As chamadas ergonómicas e a mecânica bruta por baixo, em vez de obscurecê-las por trás da abstração mais pesada. Bibliotecas alternativas (eters.js, historicamente o antecessor mais utilizado) permanecem válidas, escolhas bem mantidas; o uso consistente deste livro de `viem` é uma escolha pedagógica para consistência entre capítulos, não uma afirmação de que é a única opção razoável.

## Conceitos errôneos comuns

**viem não é um nó blockchain ou um provedor de RPC em si**. É uma biblioteca cliente que fala com qualquer endpoint RPC (um público, ou seu próprio nó, veja [Fornecedores de RPC](./rpc-providers.md)) você configura sua `transport` com; não tem acesso independente a dados de cadeia sem uma conexão RCP subjacente.

**Usar viem não remove as considerações de confiança [Fornecedores de RPC](./rpc-providers.md)**, a biblioteca retransmite fielmente qualquer que seja o endpoint RCP configurado retorna; verificando que a precisão dos dados de forma independente (ou confiando no endpoint) permanece exatamente a mesma consideração independentemente de qual biblioteca de clientes é usada para fazer a solicitação.

## Outras leituras

- [documentação do viem](https://viem.sh/)

---

[← Anterior: Indexação de eventos](./event-indexing.md)
·
[Voltar para Construindo Aplicações Web3](./README.md)
·
[Próximo: wagmi →](./wagmi.md)
