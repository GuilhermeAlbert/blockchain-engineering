# Saldos

Os saldos de um símbolo não são mais do que um `mapping(address => uint256)`, exatamente a mecânica de mapeamento em geral [Mapeamentos](../contracts/mappings.md), aplicado especificamente para rastrear quantos tokens cada endereço detém. Este capítulo breve torna a conexão explícita e abrange o que "equilíbrio" realmente significa no nível do contrato.

## Onde um equilíbrio realmente vive

Não há nenhum conceito especial, protocolo-nível de um "equilíbrio token" da maneira que existe para o próprio éter (armazenado diretamente no `balance` campo de cada conta, ver [Contas Ethereum](../ethereum/accounts.md#qual-a-composição-de-todas-as-contas)). Um saldo de tokens é **armazenagem contratual ordinária**, rastreada inteiramente pela lógica do próprio contrato, lembre-se `balanceOf` de [ERC-20](./erc-20.md#uma-implementação-mínima-e-funcional), um mapeamento simples como qualquer outro, cujos valores significam apenas "equilíbrio token" porque o contrato `transfer` e `transferFrom` funções lidas e atualizadas de forma consistente. Nada impõe esse significado no nível EVM; é puramente uma convenção que o código do contrato implementa e honra.

## Por que isso importa: um equilíbrio é tão confiável quanto seu contrato

Porque um saldo é apenas um número em um mapeamento, o próprio código de contrato de token é o **inteiro** fonte da verdade para o que esse número significa e como pode mudar. Não há nenhuma verificação externa verificando um contrato de token `balanceOf` Os valores estão a ser seguidos honestamente. É precisamente por isso que as auditorias token contract (ver [Auditoria inteligente de contratos](../security/auditing.md)) matéria: um contrato de token malicioso ou buggy poderia, em princípio, relatar saldos inflacionados, permitir mudanças de equilíbrio não autorizadas, ou de outra forma violar a semântica ERC-20 uma carteira integradora ou pressuposto de troca estão sendo honestamente aplicadas.

## Leitura de um saldo de fora do contrato

```typescript
import { createPublicClient, http, parseAbi, formatUnits } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({ chain: mainnet, transport: http() });
const erc20Abi = parseAbi(["function balanceOf(address) view returns (uint256)", "function decimals() view returns (uint8)"]);

// USDC's real, verified mainnet contract address.
const usdc = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" as const;

// Querying the contract's own balance of its own token — a neutral
// example that requires no claim about who controls any other address.
const [balance, decimals] = await Promise.all([
  client.readContract({ address: usdc, abi: erc20Abi, functionName: "balanceOf", args: [usdc] }),
  client.readContract({ address: usdc, abi: erc20Abi, functionName: "decimals" }),
]);

console.log("raw balance:", balance.toString());
console.log("decimals:", decimals);
console.log("formatted balance:", formatUnits(balance, decimals));
```

Resultado verificado da execução deste código exato contra os dados da mainnet ao vivo:

```text
raw balance: 0
decimals: 6
formatted balance: 0
```

Isso. `decimals: 6` é um ponto de dados verdadeiramente útil, concreto, não um resultado chato: USDC faz **não** utilizar a convenção comum de 18 decimais. Usa 6, combinando como os centavos americanos se relacionam com dólares mais de perto do que Wei se relaciona com éter. Qualquer aplicação que codifique uma suposição de 18 decimais para "cada token ERC-20" irá calcular valores de USDC fora por um fator de 10^12, uma classe real, documentada de bug de integração esta única consulta ao vivo ilustra diretamente.

## Conceitos errôneos comuns

**Uma aplicação de carteiras não procura o "blockchain" para um equilíbrio genérico da forma como consulta um equilíbrio éter**. Para cada token diferente, deve chamar que contrato de token específico `balanceOf` função separadamente; uma carteira exibindo saldos em muitos tokens diferentes está fazendo muitas chamadas de contrato independentes e separadas, não uma consulta unificada.

**Um saldo de token não é decrementado ou incrementado por outra coisa que não o caminho de código do próprio contrato de token que está sendo executado**. Não há maneira de um equilíbrio mudar como um efeito colateral de atividade não relacionada; cada mudança remonta a um `transfer`, `transferFrom`, menta, ou queimado especificamente no contrato do token.

## Outras leituras

- Ver também: [ERC-20](./erc-20.md), [Mapeamentos](../contracts/mappings.md)

---

[← Anterior: ERC-20](./erc-20.md)
·
[Voltar aos Tokens](./README.md)
·
[Próximo: Transferências →](./transfers.md)
