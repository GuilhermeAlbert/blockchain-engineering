# Teste

Os testes de fundição são escritos na própria Solidity, a mesma linguagem que os contratos sob teste, correndo contra um EVM real, incorporado em vez de um simulado ou zombado. Este capítulo abrange a estrutura de teste padrão e as capacidades específicas (cheatcodes) que tornam prático o comportamento específico do blockchain.

## Um teste padrão de fundição

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";

contract Counter {
    uint256 public count;

    function increment() external {
        count += 1;
    }
}

contract CounterTest is Test {
    Counter public counter;

    function setUp() public {
        counter = new Counter();
    }

    function testIncrement() public {
        counter.increment();
        assertEq(counter.count(), 1);
    }

    function testIncrementTwice() public {
        counter.increment();
        counter.increment();
        assertEq(counter.count(), 2);
    }
}
```

Executar com `forge test`, Fundição compila o contrato e seus testes, implementa uma nova instância para cada função de teste (via `setUp()`, re-execução antes de cada teste individual para garantir o isolamento entre os testes), e relatórios passar / falhar com o uso de gás por teste.

## Cheatcodes: testar o que um contrato comum não pode controlar

A fundição fornece funções especiais de teste ("cheatcodes", acessadas através da `vm` objeto herdado de `forge-std/Test.sol`) que permite que um teste manipule o estado blockchain e o contexto de formas que nenhum contrato real poderia fazer para si mesmo, porque testes especificamente precisam de exercitar cenários (um chamador específico, um timestamp de bloco específico, um reverso esperado) que estão fora do próprio controle de um contrato:

- **`vm.prank(address)`**: faz o *próxima* a chamada parece vir de um endereço especificado, permitindo que um teste verifique a lógica de `onlyOwner` modificador de [Modificadores](./modifiers.md)) simulando chamadas de chamadas autorizadas e não autorizadas.
- **`vm.expectRevert()`**: afirma que a próxima chamada reverte, opcionalmente verificando se há uma mensagem de erro específica ou erro personalizado (ver [Erros e Reversões](./errors.md)), essencial para testar que entradas inválidas são corretamente rejeitadas, não apenas que as válidas têm sucesso.
- **`vm.warp(timestamp)`**: define o timestamp de bloco para chamadas subsequentes, permitindo que uma lógica de tempo-dependente de exercício de teste (um timelock, um programa de vesting) sem precisar esperar em tempo real.
- **`vm.deal(address, amount)`**: define diretamente o equilíbrio éter de um endereço, permitindo que um teste estabeleça um equilíbrio inicial específico sem precisar de uma transação de financiamento real.

## Por que é importante testar um EVM real

Porque os testes de fundição são contra `revm` (uma implementação real de EVM baseada em Rust, não uma aproximação laminada à mão), custos de gás, comportamento de opcode, e reverte semântica observada durante os testes correspondem ao comportamento de rede real muito mais de perto do que testar contra um simulado simplificado seria, o mesmo princípio por trás dos exemplos de EVM deste livro em [Bytecode](../evm/bytecode.md) e [Armazenamento](../evm/storage.md), que correm contra uma implementação real EVM em vez de descrever o comportamento esperado em prosa sozinho.

## Teste de fuzz

Fundição automaticamente **fuzzes** qualquer função de ensaio que tome parâmetros, em vez de testar uma entrada escolhida a dedo, `function testIncrementBy(uint256 amount) public` é executado muitas vezes (256 por padrão) contra gerado aleatoriamente `amount` valores, incluindo casos de borda deliberadamente escolhidos (zero, o máximo `uint256` valor, valores próximos aos limites do tipo) que um desenvolvedor pode não pensar em testar manualmente, mas que historicamente foram exatamente onde bugs de manipulação inteira reais e documentados têm escondido.

## Conceitos errôneos comuns

**Um conjunto de testes não significa que um contrato seja seguro**Significa que os cenários específicos que os testes realmente verificam comportam-se como esperado; não diz nada sobre cenários que o autor do teste não pensou em escrever um teste para, que é exatamente a lacuna [Auditoria inteligente de contratos](../security/auditing.md) e [Verificação formal](../security/formal-verification.md) existem para abordar através de diferentes métodos complementares.

**Teste de fuzz não é a mesma coisa que verificação formal**, fuzzing tenta muitas entradas aleatórias e caso de borda e relata qualquer que falha em uma determinada asserção, que é altamente eficaz em encontrar bugs reais, mas não fornece nenhuma garantia matemática de que *não* a verificação formal (técnica separada, mais rigorosa e mais cara) visa exatamente essa garantia mais forte, para as propriedades específicas a que se aplica.

## Outras leituras

- [Livro de fundição: Escrita Testes](https://book.getfoundry.sh/forge/writing-tests)
- [Livro de Fundição: Referência de Cheatcodes](https://book.getfoundry.sh/cheatcodes/)

---

[← Anterior: Contratos de atualização](./upgrades.md)
·
[Voltar aos contratos inteligentes](./README.md)
·
[Próximo: Implantação →](./deployment.md)

