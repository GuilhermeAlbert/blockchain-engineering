# Herança

Contratos de Solidity podem herdar de outros contratos, compartilhando variáveis de estado, funções e modificadores, a forma padrão de reutilizar e compor a lógica do contrato, particularmente para componentes bem auditados e padrão como a biblioteca de contratos do OpenZeppelin. Este capítulo abrange a mecânica e a regra específica que a Solidity usa para resolver múltiplas heranças.

## Herança básica

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Ownable {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not the owner");
        _;
    }
}

contract Vault is Ownable {
    uint256 public balance;

    function withdraw(uint256 amount) external onlyOwner {
        balance -= amount;
    }
}
```

Verificado: isto compila-se perfeitamente com solc 0.8.26. `Vault` herda `Ownable`'s `owner` variável de estado, sua lógica construtora, `onlyOwner` modificador, utilizável diretamente dentro `Vault` sem redeclarar nada disso.

## virtual e sobreposição

A função de um contrato de base deve ser explicitamente marcada `virtual` para permitir que um contrato derivado o substitua, e a substituição do contrato derivado deve ser explicitamente marcada `override`, ambas as palavras-chave necessárias, uma escolha de design deliberada impedindo a sobreposição acidental (um autor de contrato base tem que optar por permitir que uma função seja alterada por herdeiros, e um autor de contrato herdado tem que reconhecer explicitamente que eles estão intencionalmente substituindo o comportamento existente, não acidentalmente sombreando-o com uma função com o mesmo nome).

```solidity
contract Base {
    function greet() public virtual returns (string memory) {
        return "Hello from Base";
    }
}

contract Derived is Base {
    function greet() public override returns (string memory) {
        return "Hello from Derived";
    }
}
```

## Herança múltipla e regra de linearização C3

Solidity suporta herdar de vários contratos simultaneamente, e resolve a ambiguidade resultante (e se dois contratos pai definir a mesma função?) usando **linearização C3** (o mesmo algoritmo que o Python usa para sua própria herança múltipla) que calcula uma única ordem linear, bem definida, de todos os contratos de ancestrais, garantindo que cada contrato na hierarquia apareça apenas uma vez, em uma ordem consistente com a ordem declarada de cada cadeia de herança individual. Os contratos devem ser enumerados no `is` cláusula de "mais base-like" para "mais derivado" para que isso resolva corretamente; violar esta ordenação produz um erro de tempo de compilação em vez de silenciosamente escolher uma resolução não intencional.

## super

Dentro de uma função primordial, chamando `super.functionName()` invoca o *próxima* contrato na versão linearizada da ordem sucessória dessa função, não necessariamente a versão imediata do contrato pai, particularmente em uma hierarquia de múltiplas heranças, onde "próximo na ordem linearizada" pode diferir do "próprio pai direto do contrato" dependendo do gráfico de herança integral.

## Conceitos errôneos comuns

**Herdar de um contrato não cria uma instância separada e independente desse contrato-mãe**. O código do pai é compilado diretamente no próprio bytecode da criança (assumindo que nenhum link de biblioteca separado está envolvido, veja [Bibliotecas](./libraries.md)); só há um contrato implantado, `Vault` no exemplo acima, contendo toda a lógica herdada combinada.

**A ambiguidade da herança múltipla não é resolvida silenciosamente por "qualquer pai está listado primeiro"** em todos os casos. A linearização C3 da Solidity pode, particularmente em hierarquias mais complexas (às vezes chamadas de padrões de herança "diamond"), produzir uma ordem que não é imediatamente óbvia a partir de uma rápida leitura do `is` por si só, razão pela qual o compilador impõe uma regra de ordenação específica e controlável em vez de deixá-la à convenção.

## Outras leituras

- [Documentação de solidez: Herança](https://docs.soliditylang.org/en/latest/contracts.html#inheritance)
- [Contratos OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts): a biblioteca mais amplamente utilizada de componentes de contrato auditados, herdados

---

[← Anterior: Funções Payable](./payable.md)
·
[Voltar aos contratos inteligentes](./README.md)
·
[Próximo: Bibliotecas →](./libraries.md)
