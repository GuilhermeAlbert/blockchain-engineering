# Mapeamentos

A `mapping` é o tipo de armazenamento de valor chave da Solidity, o mecanismo por trás essencialmente de cada saldo de tokens, subsídio e registro de propriedade em todo o ecossistema Ethereum. Este capítulo cobre exatamente como ele é armazenado, uma vez que o comportamento de um mapeamento difere de um mapa de hash convencional de maneiras que importam tanto para os custos de gás e correção.

## Declaração e utilização de base

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract BalanceTracker {
    mapping(address => uint256) public balances;

    function credit(address account, uint256 amount) external {
        balances[account] += amount;
    }
}
```

Verificado: isto compila- se de forma limpa. Nota `public` em um mapeamento gera um getter tomando a chave como parâmetro (`balances(address)` no ABI, não um nu `balances` valor) uma vez que um mapeamento não tem um único "valor atual" para retornar sem especificar qual chave.

## Cada chave possível já tem um valor: zero

Esta é a propriedade mais importante e mais frequentemente mal compreendida dos mapeamentos de Solidity: **não há como verificar se uma chave alguma vez foi definida explicitamente.** Todas as chaves possíveis (todos os 2^160 endereços possíveis, `address => uint256` mapeamento) é considerado já mapear para o valor padrão do tipo (`0` em vez `uint256`) a partir do momento em que o mapeamento é declarado. Um mapeamento não cresce ou fica inicializado por chave como um objeto JavaScript ou dicionário Python. Leitura `balances[someRandomAddressThatNeverInteractedWithThisContract]` retorna `0`, indistinguível de `balances[anAddressThatWasExplicitlySetToZero]`.

## Como isso é realmente armazenado: slots keccak256 derivados

Recordar de [Disposição de Armazenamento para Tipos Complexos](../evm/storage.md#disposição-de-armazenamento-para-tipos-complexos): valor de um mapeamento da chave `k`, declarado na zona de armazenagem `p`, vive em `keccak256(abi.encode(k, p))`É por isso que os mapeamentos podem ter um número efetivamente ilimitado de "entradas" sem necessidade de pré-alocar nada. O slot de cada chave é calculado independentemente através do hashing, não através do crescimento de uma estrutura de dados contígua, e os slots para chaves diferentes essencialmente nunca colidem (com a mesma garantia de resistência de colisão negligenciável-probabilidade coberta em [Colisões de Hash](../cryptography/collisions.md)).

## O que os mapeamentos não podem fazer

Porque não há nenhuma maneira de enumerar "cada chave que já foi definida" (o mapeamento não tem comprimento, nenhuma iteração, e nenhuma maneira de listar suas chaves. Esta é uma consequência direta e deliberada do esquema de fenda keccak256 derivado, que não fornece nenhuma estrutura de ordenação ou enumeração em tudo), qualquer lógica de contrato que precisa iterar sobre "todas as contas com um equilíbrio", por exemplo, tem que manter um **array separado** rastreando quais chaves foram usadas, ao lado do mapeamento propriamente dito, um padrão comum e necessário para qualquer coisa que precise de enumeração, não algo que os mapeamentos forneçam nativamente.

## Mapeamentos aninhados

```solidity
// A common ERC-20 allowance pattern: how much `spender` may spend on behalf of `owner`.
mapping(address => mapping(address => uint256)) public allowances;
```

Verificado: isto compila, e o getter gerado pelo ABI toma dois parâmetros (`allowances(address,address)`), refletindo as duas chaves aninhadas necessárias para atingir um valor específico.

## Conceitos errôneos comuns

**Um mapeamento não acompanha quantas chaves foram atribuídas a um valor não- padrão**, e não tem nenhuma forma incorporada de responder "esta chave existe" separadamente de "qual o valor que esta chave tem atualmente". Qualquer tal rastreamento deve ser construído explicitamente, muitas vezes através de um companheiro `mapping(address => bool)` ou bandeira de existência semelhante.

**Excluindo um item de mapeamento (via `delete balances[account]`) não remove nada de uma estrutura enumerável**. Ele simplesmente redefine o valor da chave específica de volta para o padrão do tipo (zero, para tipos numéricos), exatamente como se nunca tivesse sido definido, consistente com a propriedade "cada chave já tem um valor padrão" acima.

## Outras leituras

- [Documentação de solidez: Tipos de mapeamento](https://docs.soliditylang.org/en/latest/types.html#mapping-types)

---

[← Anterior: Variáveis de Estado](./state.md)
·
[Voltar aos contratos inteligentes](./README.md)
·
[Próximo: Eventos e Logs →](./events.md)
