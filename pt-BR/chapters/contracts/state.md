# Variáveis de Estado

Variáveis estatais são os dados persistentes de um contrato, declarados ao nível do contrato (não dentro de uma função), cada um apoiado diretamente por [armazenamento](../evm/storage.md), o único local onde os dados sobrevivem entre chamadas separadas. Este capítulo cobre como eles são declarados, o efeito da visibilidade sobre eles especificamente, e o comportamento de embalagem que afeta os custos do gás.

## Declaração e visibilidade

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract StateDemo {
    uint256 public totalSupply;      // generates an automatic public getter
    address private owner;            // no automatic getter; only readable internally
    bool internal paused;              // readable by this contract and inheriting contracts

    constructor() {
        owner = msg.sender;
        totalSupply = 1_000_000;
    }
}
```

Verificado: isto compila-se perfeitamente com solc 0.8.26. Marcando uma variável de estado `public` faz exatamente uma coisa além da declaração comum: gera automaticamente uma função getter com o mesmo nome, retornando o valor atual da variável, visível diretamente no ABI compilado, exatamente o mecanismo já demonstrado para `count` em [Solidity](./solidity.md#um-contrato-completo-mínimo).

## Embalagem de armazenamento

Recordar de [Armazenamento](../evm/storage.md#disposição-de-armazenamento-para-tipos-complexos) que cada slot de armazenamento contém 256 bits. Solidity automaticamente **embalagens** múltiplas variáveis de estado menores em um único slot quando eles são declarados consecutivamente e seu tamanho combinado se encaixa dentro de 256 bits, a `uint128` seguido de outro `uint128` partilha um espaço; a `uint256` seguida de uma `uint128` não, uma vez que `uint256` sozinho já preenche um espaço completo. Esta embalagem é uma otimização de gás real, deliberada: ler ou escrever um único slot embalado custa o mesmo que ler ou escrever um *desembalado* slot da variável, assim que empacotar várias variáveis menores juntos pode significativamente reduzir o número de caro `SSTORE`/`SLOAD` operações que uma função necessita.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PackingDemo {
    // These two together occupy ONE storage slot (16 + 16 = 32 bytes):
    uint128 public a;
    uint128 public b;

    // This starts a NEW slot, since the previous slot is already full:
    uint256 public c;
}
```

## Constantes e imutáveis

`constant` as variáveis são cozidas diretamente no bytecode do contrato no momento da compilação (nunca ocupando um slot de armazenamento em tudo), e `immutable` variáveis são definidas uma vez, no construtor, e então também armazenadas diretamente no bytecode em vez de no armazenamento. Ambos são significativamente mais baratos de ler do que uma variável de estado comum, precisamente porque lê-los evita um `SLOAD` completamente, substituindo um bytes baratos e fixos lidos.

```solidity
uint256 public constant MAX_SUPPLY = 21_000_000;  // fixed forever, known at compile time
address public immutable deployer;                  // fixed after construction, per-deployment

constructor() {
    deployer = msg.sender;
}
```

## Conceitos errôneos comuns

**Ordem de declaração não é arbitrária ou puramente estilística quando a eficiência do gás importa**, porque o empacotamento depende de declaração consecutiva e tamanho combinado, reordenar variáveis de estado (agrupar tipos menores em conjunto) pode reduzir os custos reais e contínuos de um contrato de gás sem alterar nenhuma de sua lógica em tudo.

**`constant` e `immutable` não são permutáveis com `public` variáveis de estado que simplesmente nunca são reatribuídas**. A `constant`/`immutable` o valor da variável é incorporado diretamente no bytecode e não custa nenhum armazenamento lido, enquanto uma variável de estado comum que acontece nunca mudar após a construção ainda ocupa um slot de armazenamento completo e ainda custa um real `SLOAD` Sempre que é lido.

## Outras leituras

- [Documentação de solidez: Variáveis de Estado](https://docs.soliditylang.org/en/latest/structure-of-a-contract.html#state-variables)
- [Documentação de solidez: Disposição das Variáveis Estatais no Armazenamento](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html)

---

[← Anterior: Funções](./functions.md)
·
[Voltar aos contratos inteligentes](./README.md)
·
[Próximo: Mapeamentos →](./mappings.md)
