# Funções

Funções de solidez carregam mais metadados necessários do que as funções da maioria das linguagens de uso geral fazem (visibilidade, mutabilidade e (opcionalmente) pagabilidade) cada uma compilando para baixo para garantias de nível EVM específicas, reais, não apenas documentação. Este capítulo cobre cada um, verificado contra um compilador real.

## Visibilidade

- **`external`**: pode ser chamada somente de fora do contrato (através de uma chamada de mensagem, ver [Chamadas de Mensagens](../evm/message-calls.md)), não de dentro do próprio código do contrato diretamente (embora ainda pode ser chamado internamente via `this.functionName()`, que encaminha através de uma chamada externa real).
- **`public`**: chamada externa e interna.
- **`internal`**: só pode ser convocada no âmbito do contrato ou dos contratos que dele herdam (ver [Herança](./inheritance.md)), nunca de uma chamada externa.
- **`private`**: callable somente dentro do contrato exato é definido em, nem mesmo de herdar contratos.

## Ver e funções puras

- **`view`**: a função lê o estado do contrato, mas não o modifica. Chamar um `view` função através de uma transação ainda custa gás (já que o EVM tem que realmente executá-lo), mas chamando-o via `eth_call` (ver [Contratos de chamada](../web3/calling-contracts.md)) (a forma normal de `view` função) é livre e instantânea, uma vez que nenhuma transação de mudança de estado precisa ser transmitida ou minada em tudo.
- **`pure`**: a função não lê nem modifica o estado. Sua saída depende apenas de seus argumentos de entrada explícitos.

Ambos `view` e `pure` são aplicadas, pelo menos em parte, pelo próprio EVM: a `view` ou `pure` função chamada via [`STATICCALL`](../evm/message-calls.md#estaticcall-call-com-uma-garantia-somente-de-leitura) reverterá se tentar qualquer operação de alteração de estado, dando ao chamador uma garantia real, nível de protocolo, não apenas uma promessa verificada pelo compilador que poderia ser contornada por um erro na análise estática do próprio compilador.

## Funções a pagar

Por padrão, uma função que recebe éter enviado ao lado de sua chamada **reverte automaticamente**, um default de segurança deliberada, uma vez que acidentalmente aceitar o éter um contrato não tem lógica para lidar corretamente poderia permanentemente encaderná-lo. Marcando uma função **`payable`** explicitamente opta por aceitar o éter, fazendo `msg.value` (o montante enviado) disponível no corpo da função.

## Exemplo: todos os quatro conceitos, compilados e verificados

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract FunctionDemo {
    uint256 private storedValue;

    function setValue(uint256 newValue) external {
        storedValue = newValue;
    }

    function getValue() external view returns (uint256) {
        return storedValue;
    }

    function double(uint256 x) external pure returns (uint256) {
        return x * 2;
    }

    function deposit() external payable returns (uint256) {
        return msg.value;
    }
}
```

Verificado: este contrato compila de forma limpa com solc 0.8.26, produzindo uma lista ABI `setValue` como `nonpayable`, `getValue` como `view`, `double` como `pure`, e `deposit` como `payable`. Exatamente igualando a mutabilidade declarada de cada função, confirmando que o compilador impõe e relata essas distinções de forma consistente.

## Conceitos errôneos comuns

**A `view` a função não é livre de ligar de dentro da transação de mudança de estado de outro contrato**. A propriedade sem gás aplica-se especificamente a chamá-lo como um autônomo `eth_call` consulta de fora de qualquer transação; chamada como parte da execução de uma transação real (mesmo uma que apenas lê, sem escrever), ela ainda consome gás real como parte da execução total dessa transação.

**Marcando uma função `payable` não significa que deve receber éter**Significa que sim. *maio*; a `payable` função chamada com zero éter anexado executa normalmente, com `msg.value` simplesmente igual a zero.

## Outras leituras

- [Documentação de solidez: Funções](https://docs.soliditylang.org/en/latest/contracts.html#functions)

---

[← Anterior: Contrato ABI](./abi.md)
·
[Voltar aos contratos inteligentes](./README.md)
·
[Próximo: Variáveis Estaduais →](./state.md)
