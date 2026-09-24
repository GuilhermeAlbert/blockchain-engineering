# Contratos Inteligentes

A solidez compila até exatamente o bytecode examinado diretamente em [O EVM](../evm/README.md). Esta seção cobre a linguagem da outra direção, indo característica por característica de um contrato de trabalho "olá mundo" através de herança, atualização, testes e implantação. Cada exemplo de código não trivial nesta seção foi compilado com um compilador de Solidity real (solc 0.8.26) e confirmado para construir de forma limpa, não apenas escrito para parecer plausível.

## O que você precisa saber primeiro

[O EVM](../evm/README.md). Esta seção explica que a Solidity constrói em grande medida em termos de que mecanismo EVM-nível eles compilam (a `view` função `STATICCALL` garantia, `DELEGATECALL` proxies subjacentes, slots de armazenamento variáveis de estado subjacentes e mapeamentos), assim, entender a máquina em baixo torna as regras específicas da linguagem muito menos arbitrárias.

## Capítulos

1. [Solidity](./solidity.md): um contrato mínimo, compilado, e por que a linguagem parece a maneira como faz
2. [Contrato ABI](./abi.md): selectores de funções calculados e cruzados com um valor real conhecido
3. [Funções](./functions.md): visibilidade, view/pure, e a pagar, verificado contra saída ABI compilado
4. [Variáveis de Estado](./state.md): declaração, embalagem de armazenamento, constantes e imutáveis
5. [Mapeamentos](./mappings.md): por que cada chave já tem um valor, e o que isso significa para enumeração
6. [Eventos e Registros](./events.md)e porque são muito mais baratos do que o armazenamento
7. [Modificadores](./modifiers.md): o `_;` placeholder, e o que ele realmente controla
8. [Erros e Reversões](./errors.md): exigir, erros personalizados e afirmar comparados diretamente
9. [Funções Payable](./payable.md): receber/fallback roteamento, e as três maneiras de enviar éter
10. [Herança](./inheritance.md): virtual/override, e regra de linearização C3 da Solidity
11. [Bibliotecas](./libraries.md): código apátrida, reutilizável e `using for` sintaxe
12. [Contratos de proxy](./proxies.md): um proxy mínimo de trabalho, e o risco de colisão de armazenamento simplifica
13. [Contratos Actualizáveis](./upgrades.md): Transparente, UUPS, e Diamond padrões, e quem controla o risco
14. [Teste](./testing.md): Códigos de fraude da fundição e testes de fuzz, contra um EVM incorporado real
15. [Implantação](./deployment.md): CREATE vs. CREATE2 endereçamento, e que verificação de contrato realmente prova

## Próxima

Continuar a [Tokens](../tokens/README.md), onde os mapeamentos, eventos e padrões de erros desta seção se combinam com os padrões ERC-20, ERC-721 e ERC-1155.
