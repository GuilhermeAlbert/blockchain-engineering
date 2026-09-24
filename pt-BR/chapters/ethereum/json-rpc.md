# JSON- RPC

JSON-RPC é o protocolo que cada peça do software Ethereum (carteiras, exploradores de bloco, dapps) usa para falar com um nó. Este capítulo cobre diretamente o protocolo bruto, sob as bibliotecas de alto nível (como `viem`, usado em outros lugares neste livro) que a maioria das aplicações reais constroem sobre ele, uma vez que entender as chamadas brutas desmistifica o que essas bibliotecas estão realmente fazendo.

## O protocolo, no seu mais simples

JSON-RPC é um protocolo de chamada de procedimento remoto leve: um cliente envia um objeto JSON nomeando um método e seus parâmetros; o servidor responde com um objeto JSON contendo o resultado (ou um erro). Os nós Ethereum expõem um grande conjunto de métodos padronizados (prefixo `eth_`, `net_`, `web3_`, e outros) sobre este protocolo, normalmente acessível via HTTP ou WebSocket.

## Exemplo: uma chamada JSON-RPC em bruto, sem biblioteca

```typescript
async function ethCall(method: string, params: unknown[]): Promise<unknown> {
  const response = await fetch("https://ethereum-rpc.publicnode.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  const json = await response.json();
  if (json.error) throw new Error(`RPC error: ${json.error.message}`);
  return json.result;
}

const blockNumberHex = await ethCall("eth_blockNumber", []);
console.log("latest block number (hex):", blockNumberHex);
console.log("latest block number (decimal):", parseInt(blockNumberHex as string, 16));

const chainIdHex = await ethCall("eth_chainId", []);
console.log("chain ID:", parseInt(chainIdHex as string, 16));
```

Este código foi executado contra um endpoint público vivo. Um resultado representativo:

```text
latest block number (hex): 0x18d2360
latest block number (decimal): 26026848
chain ID: 1
```

ID da Cadeia `1` confirma que esta é a rede principal Ethereum (ver [IDs de cadeia](../web3/README.md)); o número do bloco naturalmente aumenta cada vez que este é executado, uma vez que ele está lendo a ponta da corrente viva. Este exemplo utiliza um fornecedor público de RPC específico apenas para ilustração, ver [Fornecedores de RPC](../web3/rpc-providers.md) para uma discussão mais completa de escolher um para aplicações reais.

## Por que os resultados voltam como cordas hex

Cada valor numérico nas respostas JSON-RPC de Ethereum é codificado como um **string hex**, não um número JSON nativo. `eth_blockNumber` retorna `"0x1234abc"`, não `4995260`. Esta é uma escolha deliberada: os números JSON são representados convencionalmente como IEEE 754 duplos, que não podem representar precisamente inteiros além de 2^53, uma verdadeira limitação para Ethereum, onde os saldos (na wei) e outros valores normalmente excedem esse intervalo por muitas ordens de magnitude. Codificação como cordas hex evita essa perda de precisão inteiramente, ao custo de cada cliente que precisa explicitamente analisar hex antes de fazer aritmética, exatamente o que bibliotecas gostam `viem` manusear automaticamente, e exatamente por que uma integração ingênua que esquece esta conversão produz resultados sutilmente errados para qualquer valor suficientemente grande.

## Alguns dos métodos mais utilizados

| Método | Objecto |
| --- | --- |
| `eth_blockNumber` | O número do bloco da ponta da corrente atual |
| `eth_getBalance` | O saldo éter de uma conta num dado bloco |
| `eth_getTransactionCount` | Nonce atual de uma conta |
| `eth_call` | Simular uma chamada de contrato sem enviar uma transação real ou gás de pagamento (ver [Contratos de chamada](../web3/calling-contracts.md)) |
| `eth_sendRawTransaction` | Transmitir uma transação assinada |
| `eth_getTransactionReceipt` | Recuperar o resultado de execução de uma transação uma vez minada (ver [Recibos de transação](../web3/receipts.md)) |
| `eth_getLogs` | Consultar os registros históricos de eventos correspondentes a um filtro (ver [Indexação de eventos](../web3/event-indexing.md)) |

## Por que existem bibliotecas de nível superior em cima disto

Trabalhando diretamente com o JSON-RPC bruto, como o exemplo deste capítulo faz, rapidamente se torna tedioso e propensa a erros para aplicações reais: `data` campo (ver [Contrato ABI](../contracts/abi.md)), convertendo manualmente todos os valores de hex, e manuseando manualmente os muitos formatos de parâmetros específicos do método. Bibliotecas como [`viem`](../web3/viem.md), usado ao longo deste livro mais tarde Web3 exemplos, existem especificamente para embrulhar este protocolo bruto em um tipo seguro, interface ergonômica, mas tudo o que eles fazem, em última análise, compila para baixo para exatamente o tipo de bruto JSON-RPC chamadas este capítulo demonstra diretamente.

## Conceitos errôneos comuns

**JSON-RPC não é específico de Ethereum**. É uma norma RCP geral-protocolo-agnóstico; o conjunto específico de métodos de Ethereum (o `eth_` Namespace e outros) é um Ethereum específico *aplicação* do padrão geral JSON-RPC, não um protocolo completamente diferente.

**Chamada `eth_call` não cria uma transação real, on-chain ou custa gás real**. É uma simulação somente leitura contra o estado atual (ou um estado histórico especificado), útil para consultar dados do contrato sem qualquer custo ou finalidade de uma transação real de mudança de estado (ver [Contratos de chamada](../web3/calling-contracts.md)).

## Outras leituras

- [Ethereum JSON-RPC especificação](https://ethereum.org/en/developers/docs/apis/json-rpc/)
- [Especificação de APIs de execução Ethereum (formal, legível por máquina)](https://github.com/ethereum/execution-apis)

---

[← Anterior: State Trie](./state-trie.md)
·
[Voltar para Ethereum](./README.md)
·
[Próximo: Ethereum Nós →](./nodes.md)
