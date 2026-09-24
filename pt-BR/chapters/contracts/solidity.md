# Solidity

Solidity é a linguagem em que a maioria dos contratos inteligentes Ethereum são escritos, uma linguagem orientada para o contrato e estaticamente tipada que compila até exatamente o bytecode EVM examinado diretamente em [Bytecode](../evm/bytecode.md)Este capítulo é uma orientação prática para a forma da linguagem, verificada contra um compilador real, antes que o resto desta seção vá por recurso.

## Um contrato completo, mínimo

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {
    uint256 public count;

    function increment() external {
        count += 1;
    }
}
```

Isto compila de forma limpa e demonstra várias convenções que valem a pena nomear imediatamente: `SPDX-License-Identifier` comentário (uma declaração de licença legível por máquina O compilador Solidity verifica e avisa sobre se falta, seguindo o mesmo [SPDX](https://spdx.dev/) padrão utilizado em grande parte do ecossistema de software de código aberto), o `pragma` linha que fixa uma versão compiladora compatível mínima, e `public` na `count` variável, um modificador [Variáveis de Estado](./state.md) que automaticamente gera uma função de getter público, por isso `count` aparece no ABI compilado como uma função callable mesmo que seja declarado como uma variável de estado simples.

## Por que uma nova linguagem, em vez de reutilizar uma existente

A solidez foi projetada especificamente para o modelo de execução do EVM, seu sistema de tipo, seu manuseio de inteiros de tamanho fixo (`uint256`, combinando exatamente com a palavra nativa de 256 bits do EVM, veja [Opcodes](../evm/opcodes.md#cada-operação-aritmética-funciona-em-256-bit-palavras)), e construções de nível de linguagem para conceitos sem equivalente em línguas de uso geral (chamadas externas com gás configurável e valor, explícito `payable` funções, integradas `revert`/`require` semântica ligada diretamente ao comportamento de reembolso de gás EVM) tudo reflete a execução específica e modelo de custo do EVM em vez de ser uma linguagem de propósito geral mais tarde adaptada a ele.

## A solidez não é a única opção

Vyper (Python-inspirado, deliberadamente mais restritivo do que Solidity, visando maior auditabilidade através da simplicidade) e Fe (uma linguagem mais recente, Rust-inspirado) ambos também compilar para EVM bytecode. A solidez permanece, por uma ampla margem, a escolha dominante para o real, contratos implantados a partir desta escrita. Este livro usa-o todo por essa razão, não porque é a única opção tecnicamente válida.

## Ferramentas: Fundição

Exemplos de Solidity deste livro são escritos para [Fundição](https://getfoundry.sh/), uma cadeia de ferramentas baseada em Rust (`forge` para construção e ensaio, `cast` para interação em cadeia de linha de comando, `anvil` para um nó de teste local) que se tornou um padrão amplamente adotado para o desenvolvimento profissional de Solidity, juntamente com o Hardhat mais longo estabelecido (JavaScript/TypeScript-based). Os testes de fundição são escritos na própria Solidity, que mantém os exemplos de teste deste livro (ver [Teste](./testing.md)) na mesma língua que os contratos que eles testam, em vez de exigir uma segunda língua puramente para o conjunto de testes.

## Conceitos errôneos comuns

**Código fonte de solidez não é o que é implantado ou executado on-chain**. Somente o bytecode compilado é; a fonte (juntamente com a versão do compilador e configurações usadas) é o que é necessário para independentemente *verificar* que um dado bytecode implantado corresponde realmente a código fonte específico, legível por humanos, um exploradores de bloco de serviço como o Etherscan fornecem recompilando o código-fonte enviado e verificando as partidas de saída.

**A `.sol` compilação de arquivos sem erros não significa que o contrato é seguro ou livre de erros**. O compilador verifica sintaxe, tipos e um conjunto limitado de problemas estaticamente detectáveis; ele não faz nenhuma afirmação sobre correção lógica, solidez econômica, ou segurança contra as classes de ataque cobertas em [Segurança](../security/README.md).

## Outras leituras

- [Documentação sobre a solidez](https://docs.soliditylang.org/)
- [Livro de Fundição](https://book.getfoundry.sh/)

---

[← Anterior: Contratos inteligentes](./README.md)
·
[Voltar aos contratos inteligentes](./README.md)
·
[Próximo: Contrato ABI →](./abi.md)
