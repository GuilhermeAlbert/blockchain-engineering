# Bibliotecas

Uma biblioteca Solidity é reutilizável código com uma restrição específica e importante. Não pode ter o seu próprio estado, não pode deter o éter e não pode ser herdado da forma como um contrato comum é herdado. Este capítulo cobre o que as bibliotecas realmente são para, e o `using for` sintaxe que os faz sentir como métodos incorporados em um tipo.

## Declaração e `using for` padrão

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

library MathLib {
    function average(uint256 a, uint256 b) internal pure returns (uint256) {
        return (a & b) + (a ^ b) / 2; // avoids overflow that (a + b) / 2 could hit
    }
}

contract LibraryDemo {
    using MathLib for uint256;

    function getAverage(uint256 x, uint256 y) external pure returns (uint256) {
        return x.average(y); // reads as a method call on x, but compiles to MathLib.average(x, y)
    }
}
```

Verificado: isto compila-se perfeitamente com solc 0.8.26. A `using MathLib for uint256` declaração é o que permite o `x.average(y)` chamada sintaxe, sem ele, a mesma função precisa ser chamada como `MathLib.average(x, y)` diretamente, funcionalmente idêntico, mas menos legível para código que acorrenta muitas chamadas.

## Por que as bibliotecas existem como um conceito distinto dos contratos

A restrição de núcleo de uma biblioteca (sem estado, sem éter) existe porque bibliotecas são feitas para ser pura, lógica sem estado: uma coleção de funções operando inteiramente sobre os argumentos passados para eles, sem dados persistentes de seus próprios para gerenciar. Isso os torna seguros para reutilizar em muitos contratos diferentes, sem qualquer risco de acidentalmente compartilhar ou corromper o estado entre chamadas não relacionadas, uma preocupação que seria muito mais difícil de raciocinar sobre se as bibliotecas poderiam manter seu próprio armazenamento como os contratos comuns fazem.

## Bibliotecas internas versus bibliotecas implantadas

A maioria das bibliotecas de Solidity modernas (como `MathLib` acima, e a maioria das bibliotecas de utilitários do OpenZeppelin) usam somente `internal` funções, que são compiladas diretamente em qualquer contrato que as use, nenhuma implantação separada, nenhuma sobrecarga de chamada externa, apenas lógica inlined, exatamente como a inclusão de código de tempo de compilação da herança coberta em [Herança](./inheritance.md#conceitos-errôneos-comuns). Uma biblioteca pode, alternativamente, expor `external` ou `public` funções, caso em que é implantado como seu próprio, contrato on-chain separado, e chamando contratos de ligação a ele via `DELEGATECALL` (ver [Chamadas de Mensagens](../evm/message-calls.md#delegatall-código-emprestado-seu-próprio-contexto)), compartilhando uma cópia da lógica implantada em muitos contratos de chamada, ao custo do gás extra que uma chamada externa envolve, um tradeoff vale a pena fazer especificamente quando uma biblioteca é grande o suficiente para evitar duplicar seu bytecode em cada contrato de chamada de forma significativa reduz custos globais de implantação.

## Conceitos errôneos comuns

**Uma biblioteca não é simplesmente "um contrato que acontece de não usar o estado"**, a restrição "sem estado, sem éter" é imposta pelo compilador, não apenas uma convenção que um desenvolvedor escolhe seguir; tentando declarar uma variável de estado que não é um `constant` em uma biblioteca, ou tentando dar uma função de biblioteca `payable` modificador, é um erro de tempo de compilação.

**`using X for Y` não modifica o tipo `Y` em qualquer sentido global**É um... **escopo de arquivo** (ou contrato-escoberto, se declarado dentro de um contrato) conveniência sintática específica para onde quer que seja declarado; o mesmo `uint256` tipo em outro lugar na base de códigos, em um arquivo ou contrato sem esse mesmo `using` declaração, não ganha o `.average()` método chamada sintaxe.

## Outras leituras

- [Documentação de solidez: Bibliotecas](https://docs.soliditylang.org/en/latest/contracts.html#libraries)
- [Contratos OpenZeppelin: bibliotecas de utilitários](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/utils)

---

[← Anterior: Herança](./inheritance.md)
·
[Voltar aos contratos inteligentes](./README.md)
·
[Próximo: Contratos de Proxy →](./proxies.md)
