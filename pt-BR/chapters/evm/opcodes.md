# Opcodes

Um opcode é uma única instrução que o EVM entende. Cerca de 140 são atualmente definidos, cada um com um único byte, cada um com um fixo [Custo do gás](./gas-accounting.md)Este capítulo organiza-os por categoria e demonstra a execução aritmética diretamente, com base no código de byte [Bytecode](./bytecode.md).

## Categorias de Opcode

| Categoria | Exemplos | Objecto |
| --- | --- | --- |
| Aritmética | `ADD`, `SUB`, `MUL`, `DIV`, `MOD`, `EXP` | Matemática inteira básica, tudo operando em 256-bit palavras |
| Comparação & bitwise | `LT`, `GT`, `EQ`, `AND`, `OR`, `XOR`, `NOT` | Comparações e manipulação de bits |
| Manipulação de pilhas | `PUSH1`-`PUSH32`, `POP`, `DUP1`-`DUP16`, `SWAP1`-`SWAP16` | Movendo valores para dentro e para fora da pilha (ver [Pilha](./stack.md)) |
| Memória | `MLOAD`, `MSTORE`, `MSTORE8`, `MSIZE` | Ler e escrever memória transitória (ver [Memória](./memory.md)) |
| Armazenamento | `SLOAD`, `SSTORE` | Leitura e escrita de armazenamento de contrato persistente (ver [Armazenamento](./storage.md)) |
| Fluxo de controle | `JUMP`, `JUMPI`, `JUMPDEST`, `PC` | Saltos condicionais e incondicionais, o único mecanismo de ramificação do EVM |
| Ambiente | `CALLER`, `CALLVALUE`, `ADDRESS`, `BALANCE`, `TIMESTAMP` | Lendo informações sobre o contexto atual de chamada e bloco |
| Chamadas | `CALL`, `DELEGATECALL`, `STATICCALL`, `CALLCODE` | Invocação de outros contratos (ver [Chamadas de Mensagens](./message-calls.md)) |
| Registro | `LOG0`-`LOG4` | Emitir acontecimentos (ver [Eventos e Registros](../contracts/events.md)) |
| Sistema | `CREATE`, `CREATE2`, `RETURN`, `REVERT`, `STOP`, `SELFDESTRUCT` | Criação de contratos, parada e (histórica) autodestruição |

## Cada operação aritmética funciona em 256-bit palavras

Esta é uma escolha de design específica e consequente que vale a pena afirmar diretamente: o tamanho da palavra nativa do EVM é de 256 bits (32 bytes), cada valor de pilha, cada operação aritmética, opera nesta largura fixa, escolhida especificamente porque é grande o suficiente para manter uma saída de hash Keccak-256 ou SHA-256, ou uma coordenada de curva secp256k1, em uma única palavra, sem precisar de aritmética de multi-palavras para as operações criptográficas que Ethereum depende constantemente.

## Exemplo: execução verificada do ADD

```typescript
import { createEVM } from "@ethereumjs/evm";
import { hexToBytes, bytesToHex } from "@ethereumjs/util";

// PUSH1 0x05, PUSH1 0x03, ADD, PUSH1 0x00, MSTORE, PUSH1 0x20, PUSH1 0x00, RETURN
// Computes 5 + 3 and returns the result.
const code = hexToBytes("0x600560030160005260206000f3");

const evm = await createEVM();
const result = await evm.runCode({ code });
console.log("5 + 3 =", BigInt(bytesToHex(result.returnValue)));
```

Resultado verificado da execução deste código exato:

```text
5 + 3 = 8n
```

Note que o opcode para adição é `01` (seguindo `ADD`'s position in the opcode table), a sequência de byte `60 05 60 03 01` é `PUSH1 0x05`, `PUSH1 0x03`, `ADD`, partindo `8` no topo da pilha antes da mesma sequência memória-armazenar-e-retorno de [Bytecode](./bytecode.md#exemplo-um-contrato-completo-mínimo-byte-by-byte) Devolve-o.

## Por que o fluxo de controle usa JUMPDEST especificamente

Ao contrário de um processador convencional, o EVM requer que cada alvo de salto seja marcado com um `JUMPDEST` opcode no próprio bytes, saltando para qualquer posição do bytes que não esteja marcada `JUMPDEST` é inválida e reverte a execução, mesmo que esse byte aconteça para corresponder numericamente a uma instrução válida. Esta é uma medida de segurança deliberada: impede uma classe específica de exploração onde um atacante poderia construir um salto que pousa no *meio* de um multi-byte `PUSH` dados de instrução (que não é realmente uma instrução em tudo, apenas dados que acontece de se parecer com um de um offset diferente), potencialmente fazendo com que o EVM interprete mal os dados como código de uma forma controlada pelo atacante.

## Conceitos errôneos comuns

**Nem cada valor de 256 bits na pilha representa um número no sentido comum**. A mesma largura de palavra de 32-bytes é usada para manter endereços (acolchoados a 32 bytes de seus 20 nativos), valores booleanos (`0` ou `1`), hashes, e dados arbitrários embalados; o próprio EVM não rastreia ou impõe qualquer distinção de tipo entre esses usos, que é inteiramente da responsabilidade do compilador (como Solidity) gerando um bytecode correto.

**`SELFDESTRUCT` não mais apaga o código de um contrato e armazenamento da forma como ele fez originalmente**, a seguir [EIP-6780](https://eips.ethereum.org/EIPS/eip-6780) (activado com a atualização de Cancun, 2024). Agora só envia o saldo remanescente do contrato para um endereço especificado, a menos que chamado dentro da mesma transação em que o contrato foi criado, uma mudança feita especificamente para reduzir uma categoria de complexidade de gerenciamento de estado o comportamento original, sem restrições de exclusão criado para implementações de nó.

## Outras leituras

- [Papel Amarelo Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf): Apêndice H (Especificação da máquina virtual)
- [evm.codes](https://www.evm.codes/): uma referência interativa opcode-by-opcode

---

[← Anterior: Bytecode](./bytecode.md)
·
[Voltar ao EVM](./README.md)
·
[Próximo: Stack →](./stack.md)
