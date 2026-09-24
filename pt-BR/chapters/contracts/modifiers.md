# Modificadores

Um modificador é um código reutilizável que envolve a execução de uma função, mais comumente usado para controles de acesso e verificações de validação que de outra forma precisaria ser repetido, de forma idêntica, no início de muitas funções. Este capítulo cobre como eles funcionam mecanicamente, incluindo a sintaxe específica de placeholder que determina quando a função envoltória realmente é executada.

## Declaração e utilização

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ModifierDemo {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not the owner");
        _;
    }

    function setOwner(address newOwner) external onlyOwner {
        owner = newOwner;
    }
}
```

Verificado: isto compila-se perfeitamente com solc 0.8.26.

## O sublinhado: não um erro de digitação, um placeholder

A `_;` dentro de um modificador marca exatamente onde o próprio corpo da função envolto executa, tudo no modificador *antes* `_;` corre primeiro, e (se presente) qualquer coisa *após* `_;` é executado após a conclusão do corpo da função envolvida. Isto significa que um modificador pode executar verificações antes de uma função (o caso comum, como em `onlyOwner` acima, que reverte antes `setOwner`'s body alguma vez executa se a verificação falhar), executar a lógica de limpeza após uma função, ou ambos, dependendo inteiramente de onde `_;` é colocado em relação ao outro código do modificador.

```solidity
modifier logExecution() {
    // runs BEFORE the function body
    _;
    // runs AFTER the function body completes
}
```

## Modificadores múltiplos, e sua ordem

Uma função pode ter vários modificadores, aplicados da esquerda para a direita. Cada modificador pré-...`_;` o código é executado na ordem listada, em seguida, o próprio corpo da função é executado (uma vez que todos os modificadores atingiram o seu `_;`), em seguida, cada modificador pós-`_;` o código é executado em *inverso* ordem, o mesmo comportamento de nidificação uma pilha de chamadas de função produziria.

## Por que os modificadores importam para reduzir uma classe específica de bugs

Repetindo uma verificação de controle de acesso (`require(msg.sender == owner, ...)`) manualmente no início de cada função sensível é exatamente o tipo de repetitivo, fácil de-acidentalmente-código omit que tem historicamente causado vulnerabilidades reais, documentadas inteligente contrato. Uma única função onde o desenvolvedor esqueceu de adicionar a verificação é um bypass de controle de acesso genuíno (ver [Controle de acesso](../security/access-control.md)). Um modificador, aplicado consistentemente como parte da assinatura declarada de uma função, torna a verificação visualmente explícita na própria definição da função e mais difícil de simplesmente esquecer, embora não, por si só, impedir um desenvolvedor de esquecer *aplicar* o modificador para uma função que precisava dele.

## Conceitos errôneos comuns

**Um modificador não é um pedaço de código separado e independentemente implantado**. Ele é compilado em linha em cada função que o usa, o que significa que cada função usando um determinado modificador efetivamente contém sua própria cópia da lógica desse modificador no bytecode implantado, não uma rotina compartilhada, externamente chamada.

**Esquecer de incluir `_;` em um modificador é uma forma real, válida (se quase sempre não intencional) de escrever um modificador que nunca realmente executa o corpo da função envolto em tudo**. O compilador Solidity não requer `_;` aparecer, ou aparecer exatamente uma vez, que é ocasionalmente uma fonte de erros confusos, difíceis de localizar em modificadores com lógica condicional complexa em torno de onde `_;` é colocado.

## Outras leituras

- [Documentação de solidez: Modificadores de Função](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers)

---

[← Anterior: Eventos e Logs](./events.md)
·
[Voltar aos contratos inteligentes](./README.md)
·
[Próximo: Erros e Reversões →](./errors.md)

