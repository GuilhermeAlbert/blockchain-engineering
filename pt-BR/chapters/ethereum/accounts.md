# Contas Ethereum

Ethereum não tem UTXOs. Cada equilíbrio, cada peça de armazenamento de contrato, cada unidade de estado vive em um **conta**, endereçado por um identificador de 20 bytes, e atualizado diretamente no local, o modelo de conta introduzido conceitualmente em [Operações](../blockchain/transactions.md#o-modelo-de-conta-ethereum)Este capítulo abrange o que realmente contém uma conta e a divisão fundamental entre os seus dois tipos.

## Qual a composição de todas as contas

Cada conta Ethereum, independentemente do tipo, tem exatamente quatro campos:

- **nonce**: para uma conta externa (ver [EOAs](./eoa.md)), uma contagem de transações enviadas desta conta, usada especificamente para evitar repetir a mesma transação assinada duas vezes; para uma conta de contrato, uma contagem de contratos que esta conta criou.
- **saldo**: saldo éter da conta, denominado em **wei** (10^18 wei = 1 éter, a menor unidade, nomeada em homenagem a Wei Dai, o [b-dinheiro](../origins/b-money.md) autor citado no whitepaper Bitcoin).
- **storageRoot**: o hash raiz de um [Merkle Patricia Trie](./state-trie.md) contendo o próprio armazenamento persistente desta conta (vazio para uma conta sem dados armazenados, que descreve cada EOA e muitos contratos simples).
- **códigoHash**: o hash do bytecode EVM desta conta (um hash vazio fixo e bem conhecido para um EOA, que não tem nenhum código).

## Os dois tipos de conta

Esta é a distinção única mais importante no modelo de conta da Ethereum, coberto separadamente em [Contas de propriedade externa](./eoa.md) e [Contas de Contrato](./contract-accounts.md):

| | Conta de propriedade externa (EOA) | Conta de Contrato |
| --- | --- | --- |
| Controlado por | Uma chave privada | O seu próprio código |
| Tem código? | Não | Sim (bytes EVM) |
| Pode iniciar uma transação? | Sim. | Não. Só pode agir quando solicitado por uma transação ou outro contrato |
| Endereço derivado de | A chave pública (ver [Criptografia chave de Ethereum](../cryptography/secp256k1.md)) | Endereço do criador e nonce (ou, para CREATE2, um sal escolhido, veja [CRIAR 2](../evm/contract-creation.md)) |

Cada ação em Ethereum, em última análise, remonta a uma transação assinada por um EOA. Contratos podem chamar outros contratos, mas toda essa cadeia de chamadas é sempre desencadeada, em sua raiz, pela transação assinada por algum EOA. Esta é uma propriedade estrutural que vale a pena internalizar cedo: não existe tal coisa como um contrato agindo espontaneamente por conta própria, sem prompção por uma transação externa em algum lugar a montante.

## Por que um modelo baseado em conta, não UTXOs

Recordar de [Operações](../blockchain/transactions.md#dois-modelos-fundamentalmente-diferentes) que o modelo UTXO do Bitcoin e o modelo de conta de Ethereum são um fork de design genuíno e consequente. Os designers de Ethereum escolheram contas especificamente porque é mais natural para **Estado de contrato persistente e em evolução**, um contrato inteligente (ver [Contratos Inteligentes](../contracts/README.md)) geralmente precisa lembrar as coisas em muitas chamadas separadas (mapeamento de saldos de um token, reservas de liquidez de uma bolsa descentralizada), que mapeia naturalmente em "um lugar que detém e atualiza valores" de uma forma que é consideravelmente mais estranho para expressar puramente em termos de consumo e criação de UTXOs discretos e únicos.

## Exemplo: ler o estado de uma conta

```typescript
import { createPublicClient, http, formatEther } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({ chain: mainnet, transport: http() });

// Any valid, checksummed mainnet address works here — this example reads
// public, on-chain state, which requires no special permission or
// association with the address being queried.
const address = "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe" as const;

const [balance, nonce, code] = await Promise.all([
  client.getBalance({ address }),
  client.getTransactionCount({ address }),
  client.getBytecode({ address }),
]);

console.log("balance (ETH):", formatEther(balance));
console.log("nonce:", nonce);
console.log("has contract code:", code !== undefined);
```

Este código foi executado contra um endpoint RPC de rede principal ao vivo e funciona como mostrado, a saída naturalmente varia ao longo do tempo, uma vez que está lendo ao vivo, em constante mudança estado de cadeia, mas uma execução representativa retornou:

```text
balance (ETH): 5774.491790776062094343
nonce: 0
has contract code: true
```

Esta última linha vale a pena notar: este endereço de exemplo em particular acaba por ser um **conta de contrato**Não é um EOA. Não é zero `getBytecode()` resultado é exatamente a verificação distintiva descrita na tabela acima. Ver [JSON- RPC](./json-rpc.md) para o que está realmente acontecendo sob o capô destes `viem` Chama.

## Conceitos errôneos comuns

**Um "equilíbrio" de Ethereum não é análogo a um conjunto UTXO de Bitcoin**. É um número único, diretamente armazenado, diretamente atualizado por conta, não uma soma derivada de muitas saídas discretas. O envio de éter diminui diretamente o saldo armazenado do remetente e incrementa o do destinatário, no lugar.

**Uma conta contratual com saldo não significa que o contrato possa gastá-la livremente por sua própria iniciativa.**Um contrato só pode mover seu próprio saldo em resposta a ser chamado (por uma transação ou outro contrato), executando qualquer lógica que seu próprio código especifique; ele não tem agência independente para agir fora de ser invocado.

## Outras leituras

- [Papel Amarelo Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf): a especificação formal, Seção 4 (O Estado Mundial)
- [ethereum.org: Contas](https://ethereum.org/en/developers/docs/accounts/)

---

[← Anterior: O que é Ethereum?](./README.md)
·
[Voltar para Ethereum](./README.md)
·
[Próximo: Contas externas →](./eoa.md)
