# Pilha

O EVM é uma máquina de pilhas. Quase todo o opcode lê seus operandos do topo de uma pilha e empurra seu resultado de volta para ele, o modelo de execução idêntico já demonstrado diretamente em [Bytecode](./bytecode.md) e [Opcodes](./opcodes.md#exemplo-execução-verificada-do-add). Este capítulo abrange as propriedades e limites específicos da pilha.

## Estrutura e limites

A pilha EVM contém palavras de 256 bits (ver [Opcodes](./opcodes.md#cada-operação-aritmética-funciona-em-256-bit-palavras)) e limita-se a **profundidade máxima de 1024 itens**, uma constante de protocolo fixo. Excedendo este limite (um "overflow stack", em terminologia específica de EVM, distinta do conceito geral de programação do mesmo nome aplicado a uma pilha de chamadas) faz com que o contexto atual de execução reverta. A maioria dos opcodes só interagem com os itens de pilha de topo (`ADD` pops dois e empurra um, `PUSH1` empurra um, e assim por diante) com `DUP` e `SWAP` opcodes fornecendo a única maneira de chegar mais fundo na pilha (até 16 itens de volta, para `DUP1`-`DUP16` e `SWAP1`-`SWAP16`).

## Por que existem DUP e SWAP

Porque a pilha só expõe os seus primeiros itens diretamente para a maioria das operações, `DUP` (duplicar um item de até 16 posições de volta para o topo) e `SWAP` (trocar o item superior com até 16 posições de volta) são os mecanismos que permitem reordenar e reutilizar valores sem precisar de memória ou armazenamento para computação local simples. É por isso que o bytecode de Solidity compilado é denso com `DUP` e `SWAP` instruções mesmo para expressões bastante simples: o compilador está constantemente reorganizando a pilha para obter os operandos certos em posição para a próxima operação.

## Por que a pilha, especificamente, em vez de registradores nomeados

Uma máquina de empilhamento (ao contrário de uma máquina de registro, que a maioria das CPUs físicas são) tem uma vantagem específica para este contexto: ela não precisa de um conjunto fixo de locais de armazenamento nomeados para valores intermediários, o que mantém o conjunto de instruções e formato de bytes mais simples, toda operação implicitamente sabe onde encontrar seus operandos (o topo da pilha) sem precisar codificar qual registro específico para ler. O custo é que o código compilado muitas vezes precisa de mais instruções gerais (o `DUP`/`SWAP` Embaralhamento mencionado acima) do que uma seqüência de instrução baseada em registro equivalente pode precisar, um tradeoff real e aceito em troca da simplicidade geral do EVM.

## Conceitos errôneos comuns

**A pilha EVM não é a mesma coisa que o armazenamento persistente de um contrato**A pilha existe apenas para a duração da execução de uma única chamada e é descartada inteiramente uma vez que a chamada termina; nada sobre conteúdo de pilha sobrevive entre chamadas separadas para o mesmo contrato, ao contrário [Armazenamento](./storage.md), que explicitamente persiste.

**"Stack demasiado profundo" (um erro real, comumente encontrado Solidity compilador) não é um erro EVM em tempo de execução** na maioria dos casos; é tipicamente *compilador* determinando, antes do tempo, que uma função tem muitas variáveis locais ativas simultaneamente para caber ao alcance dos limites de endereçamento DUP/SWAP da pilha, e recusando-se a compilar em vez de gerar bytecode que mais tarde falharia imprevisivelmente.

## Outras leituras

- [Papel Amarelo Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf): Apêndice H (Especificação da máquina virtual)

---

[← Anterior: Opcodes](./opcodes.md)
·
[Voltar ao EVM](./README.md)
·
[Próximo: Memória →](./memory.md)
