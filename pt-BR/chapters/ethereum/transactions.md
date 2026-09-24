# Transações Ethereum

Uma transação Ethereum debita diretamente o saldo da conta de um remetente e credita a operação de um destinatário (ou, para uma chamada contratual, desencadeia a execução de código) estruturalmente diferente das transações que consomem UTXO abrangidas [Transações de Bitcoin](../bitcoin/transactions.md)Este capítulo abrange os campos de transação e o tipo de transação que tem sido padrão da Ethereum desde 2021.

## Campos principais

- **nonce**: o número atual de transações do remetente, coberto [EOAs](./eoa.md#o-nonce-e-porque-importa-mais-do-que-poderia-parecer-primeiro).
- **para**: o endereço do destinatário, ou vazio para uma transação de criação de contratos (ver [Criação de Contratos](../evm/contract-creation.md)).
- **valor**: a quantidade de éter (em wei) a transferir.
- **dados**: dados de byte arbitrários, usados para codificar uma chamada de função e seus argumentos ao chamar um contrato (ver [Contrato ABI](../contracts/abi.md)), ou código de inicialização do contrato para uma transação de criação.
- **gasLimit**: o montante máximo de [gás](./gas.md) o remetente está disposto a ter esta transação consumida.
- **assinatura** (v, r, s), a assinatura ECDSA autorizando a transação, cobrindo tudo o mais na transação.
- **chainId**: em que rede esta transação é válida (ver [IDs de cadeia](../web3/README.md)), impedindo que uma transação assinada para uma rede seja reproduzida em outra.

## Tipos de transação: legado versus EIP-1559

Ethereum usou mais de um formato de transação ao longo de seu histórico, distinguido por um **tipo bytes**:

- **Tipo 0 (legado)**: o formato original, usando um único `gasPrice` campo, o remetente especifica exatamente quanto eles estão dispostos a pagar por unidade de gás, e (antes EIP-1559) o montante inteiro vai para o minerador/validador que inclui a transação.
- **Tipo 2 (EIP-1559)**A Comissão adoptou, em 18 de **Atualização de Londres** (5 de agosto de 2021) e o formato padrão desde então, substituindo o single `gasPrice` com dois campos separados (`maxFeePerGas` e `maxPriorityFeePerGas`) alimentação para o mecanismo de base-fee-and-tip [Preço do gás e taxas](./fees.md#eip-1559-taxa-de-base-mais-gorjeta).

## Exemplo: construir e inspecionar os campos de uma transação com viem

```typescript
import { parseEther, parseGwei } from "viem";

const transaction = {
  to: "0x0000000000000000000000000000000000dEaD" as const, // a conventional "burn" address
  value: parseEther("0.01"),
  maxFeePerGas: parseGwei("20"),
  maxPriorityFeePerGas: parseGwei("1.5"),
  gas: 21_000n, // the fixed cost of a simple ETH transfer — see chapters/ethereum/gas.md
};

console.log("value (wei):", transaction.value.toString());
console.log("maxFeePerGas (wei):", transaction.maxFeePerGas.toString());
console.log("maxPriorityFeePerGas (wei):", transaction.maxPriorityFeePerGas.toString());
```

Resultado verificado da execução deste código exato:

```text
value (wei): 10000000000000000
maxFeePerGas (wei): 20000000000
maxPriorityFeePerGas (wei): 1500000000
```

Este exemplo específico só constrói e mostra os campos localmente (`parseEther`/`parseGwei` são funções de conversão de unidade pura), por isso não requer acesso à rede, ao contrário do exemplo de leitura de conta em [Contas Ethereum](./accounts.md#exemplo-ler-o-estado-de-uma-conta).

## Conceitos errôneos comuns

**Uma transação Ethereum `data` campo não é a mesma coisa que um script de transação do Bitcoin**. É tipicamente dados de chamada de função codificados pelo ABI interpretados pelo EVM ao executar um contrato, um mecanismo fundamentalmente diferente dos scripts de bloqueio/desbloqueamento baseados em pilhas do Bitcoin (veja [Bitcoin Script](../bitcoin/script.md)), embora ambos sirvam um papel amplamente análogo "especifique o que esta transação está instruindo".

**Definir uma alta `gasLimit` não significa que uma transação irá necessariamente consumir tanto gás**. É um teto, não um alvo; uma simples transferência de ETH consome exatamente 21.000 gás, independentemente de um limite configurado superior, e qualquer gás não utilizado (até o limite) não é carregado (ver [Gás](./gas.md)).

## Outras leituras

- [Papel Amarelo Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf): Seção 4.2 (A transação)
- [EIP-1559: Alteração do mercado de taxas para a cadeia ETH 1.0](https://eips.ethereum.org/EIPS/eip-1559)
- [EIP-155: Proteção de ataque de repetição simples (ID da cadeia)](https://eips.ethereum.org/EIPS/eip-155)

---

[← Anterior: Contas de contrato](./contract-accounts.md)
·
[Voltar para Ethereum](./README.md)
·
[Próximo: Gás →](./gas.md)
