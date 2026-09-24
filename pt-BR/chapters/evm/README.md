# O EVM

A Máquina Virtual Ethereum é o que realmente funciona quando uma conta de contrato (ver [Contas de Contrato](../ethereum/contract-accounts.md)) é chamado, uma máquina virtual baseada em pilha executando bytecode, um opcode de cada vez, medido por gás. Esta seção vai para dentro dela diretamente: cada exemplo de código roda um bytes reais contra uma implementação EVM real e independente, não uma descrição do que o bytes devem fazer.

## O que você precisa saber primeiro

[Contas de Contrato](../ethereum/contract-accounts.md) e [Gás](../ethereum/gas.md)Esta seção assume que você entende por que os contratos precisam de código e por que a execução desse código precisa ser medido, e vai para o próprio mecanismo.

## Capítulos

1. [Bytecode](./bytecode.md): um contrato completo de seis bytes, executado e verificado
2. [Opcodes](./opcodes.md): a instrução completa definida por categoria, mais um exemplo aritmético verificado
3. [Pilha](./stack.md): 1024 itens, DUP/SWAP, e por que uma máquina de pilha sobre registros nomeados
4. [Memória](./memory.md): byte-addressable, call-scoped, and quadrically priced better a point
5. [Armazenamento](./storage.md): o único lugar onde o estado sobrevive entre as chamadas, com seu custo real do gás medido diretamente
6. [Dados de chamadas](./calldata.md): dados de entrada somente leitura, e sua conexão surpreendente aos custos da camada 2
7. [Chamadas de Mensagens](./message-calls.md): CALL, ESTATICCALL, e DELEGATECALL mecanismo de código emprestado explicado precisamente
8. [Criação de Contratos](./contract-creation.md): Endereçamento nonce-dependente do CREATE versus determinismo do CREATE2
9. [Contabilidade de gás](./gas-accounting.md): custo intrínseco, a fórmula de memória verificada, e porque os reembolsos foram cortados

## Próxima

Continuar a [Contratos Inteligentes](../contracts/README.md), onde Solidity compila para baixo para exatamente o bytecode esta seção examinada diretamente, agora do lado da linguagem de nível superior.

