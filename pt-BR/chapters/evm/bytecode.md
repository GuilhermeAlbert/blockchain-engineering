# Bytecode

Bytecode EVM é o campo de código de uma conta de contrato (introduzido em [Contas de Contrato](../ethereum/contract-accounts.md)) realmente contém, uma sequência de instruções de um byte o EVM executa um de cada vez. Este capítulo executa um contrato mínimo e real de bytecode bruto para demonstrar o mecanismo diretamente, em vez de tratar "bytecode" como uma caixa preta abstrata.

## O que o bytecode realmente se parece

Cada byte no bytecode EVM é um **opcode** (uma instrução, totalmente coberta [Opcodes](./opcodes.md)) ou, imediatamente após `PUSH` Opcode, dados brutos a serem empurrados para a pilha. Não há separador, nenhum espaço em branco, nenhuma estrutura legível pelo homem na forma bruta, apenas uma densa sequência de bytes que o EVM interpreta estritamente esquerda para direita.

## Exemplo: um contrato completo, mínimo, byte by byte

Este bytecode armazena o valor 42 em memória e devolve-o, suficientemente curto para percorrer inteiramente à mão:

```text
602a60005260206000f3

60 2a   PUSH1 0x2a     — push the value 42 onto the stack
60 00   PUSH1 0x00     — push memory offset 0 onto the stack
52      MSTORE         — pop offset and value, store 42 at memory[0:32]
60 20   PUSH1 0x20     — push length 32 (0x20) onto the stack
60 00   PUSH1 0x00     — push memory offset 0 onto the stack
f3      RETURN         — pop offset and length, return memory[0:32]
```

```typescript
import { createEVM } from "@ethereumjs/evm";
import { hexToBytes, bytesToHex } from "@ethereumjs/util";

const evm = await createEVM();
const code = hexToBytes("0x602a60005260206000f3");

const result = await evm.runCode({ code });
console.log("returned bytes (hex):", bytesToHex(result.returnValue));
console.log("gas used:", result.executionGasUsed.toString());
```

Resultado verificado da execução deste código exato, usando [`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm), uma implementação EVM real, independente, não uma simulação construída para este livro:

```text
returned bytes (hex): 0x000000000000000000000000000000000000000000000000000000000000002a
gas used: 18
```

O valor devolvido, lido como um inteiro de 256 bits, é `0x2a` (decimal 42) exatamente o que o bytecode foi construído para retornar. Esta é uma execução genuína, se trivial, do EVM: o mesmo loop de intérprete (fetch instruction, execute, advance) que executa cada contrato implantado do Ethereum, executando contra seis bytes de código de máquina cru, escrito à mão.

## De onde vem o bytecode na prática

Quase ninguém escreve código bruto à mão para contratos reais, [Solidity](../contracts/solidity.md) e outras linguagens de alto nível compilam até exatamente este tipo de sequência de byte, que é o que realmente é implantado e armazenado no código de uma conta de contrato (ver [Criação de Contratos](./contract-creation.md) para o mecanismo de implantação). Compreender a forma bruta importa de qualquer maneira, pela mesma razão que entender a serialização da transação bruta do Bitcoin importava em [Transações de Bitcoin](../bitcoin/transactions.md#exemplo-construir-e-ter-uma-transação-simplificada). Desmistifica o que a ferramenta de nível superior está produzindo e permite verificar, ao invés de simplesmente confiar, o que um compilador gerou.

## Conceitos errôneos comuns

**Bytecode não é a mesma coisa que o código fonte Solidity**, e um bytecode de contrato implantado não pode ser mecanicamente invertido de volta para a fonte original com total fidelidade. Os descompiladores existem e podem recuperar uma aproximação da lógica, mas nomes de variáveis, comentários e a estrutura original exata da fonte desaparecem uma vez compilados, descartados durante a compilação e nunca armazenados na cadeia.

**Nem todos os bytes numa sequência de bytes são necessariamente alcançáveis ou significativos durante a execução**. `PUSH` bytes de dados são um exemplo claro (eles são dados, não instruções, mesmo que eles ocupem espaço diretamente seguindo o opcode), e contratos compilados muitas vezes incluem caminhos de código mortos ou metadados (como um hash de versão do compilador de Solidity) que a execução nunca atinge.

## Outras leituras

- [Papel Amarelo Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf): Seção 9 (Modelo de execução)
- [`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm): a biblioteca usada no exemplo deste capítulo

---

[← Anterior: O EVM](./README.md)
·
[Voltar ao EVM](./README.md)
·
[Próximo: Opcodes →](./opcodes.md)
