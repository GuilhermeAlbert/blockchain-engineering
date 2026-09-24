# ERC-20

ERC-20 é a interface padrão quase todos os símbolos fungíveis em implementa Ethereum, não um pedaço de código implantado, mas uma especificação: um conjunto fixo de funções e eventos qualquer contrato conforme deve fornecer, de modo que carteiras, trocas e outros contratos podem interagir com qualquer símbolo ERC-20 de forma idêntica, sem precisar de código de integração específico do token. Este capítulo abrange a interface real do padrão, compilado e verificado, não apenas descrito.

## A interface

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Verificado: esta interface compila-se perfeitamente com solc 0.8.26. Seis funções e dois eventos, todo o padrão, deliberadamente mínimo (ver [EIP-20](https://eips.ethereum.org/EIPS/eip-20) para a especificação formal esta interface implementa exatamente).

## Uma implementação mínima e funcional

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SimpleToken {
    string public name = "Simple Token";
    string public symbol = "SIM";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(uint256 initialSupply) {
        totalSupply = initialSupply;
        balanceOf[msg.sender] = initialSupply;
        emit Transfer(address(0), msg.sender, initialSupply);
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        require(balanceOf[msg.sender] >= amount, "insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        require(balanceOf[from] >= amount, "insufficient balance");
        require(allowance[from][msg.sender] >= amount, "insufficient allowance");
        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
        return true;
    }
}
```

Verificado: isto compila de forma limpa e correta a interface acima (sua `balanceOf` e `allowance` mapeamentos, marcados `public`, satisfazer automaticamente a interface `balanceOf(address)` e `allowance(address,address)` funções de visualização, por mecanismo de getter automático de [Variáveis de Estado](../contracts/state.md#declaração-e-visibilidade)).

## Porquê? `decimals` existe, e o que realmente muda

`decimals` (convencionalmente 18, a relação wei-to-ETH própria do éter, embora nada no padrão requer este valor específico) **não** alterar como o contrato armazena ou calcula saldos. Cada saldo e quantidade de transferência é um inteiro comum, na menor unidade do token, exatamente como satoshis são a menor unidade de Bitcoin (ver [O Modelo UTXO](../bitcoin/utxo.md)). `decimals` é puramente um **convenção de exibição**: carteiras e interfaces dividem saldos brutos por `10^decimals` para mostrar uma quantidade legível por humanos, significando "1,5 tokens" exibidos para um usuário com `decimals = 18` corresponde realmente ao inteiro bruto `1500000000000000000` Armazenados e transferidos em cadeia.

## totalFornecimento não é automaticamente forçado para ser preciso

Nada no padrão ERC-20 ou no próprio EVM verifica que `totalSupply` valor realmente igual à soma de cada endereço `balanceOf`, lógica própria de um contrato conforme (corretamente incrementando `totalSupply` na hortelã, decremente na queimadura, e nunca permitir um `transfer` criar ou destruir o equilíbrio do nada) é inteiramente o que mantém esta verdade invariante. Um contrato de buggy ou token malicioso poderia, em princípio, relatar `totalSupply` inconsistente com os saldos reais; tokens bem auditados mantêm o invariante através de implementação cuidadosa e testada, não através de qualquer garantia de nível de protocolo.

## Conceitos errôneos comuns

**ERC-20 é um padrão de interface, não um contrato específico implantado**. "Um token ERC-20" significa qualquer contrato que implemente corretamente esta interface, e existem milhares de implementações escritas de forma independente, de forma diferente e detalhada, todas interoperáveis com as mesmas carteiras e trocas especificamente porque compartilham esta interface comum.

**A `transfer` retornando `true` é uma garantia real, controlável, não uma formalidade**. Alguns tokens precoces ou não conformes ao padrão foram documentados não retornando um valor em tudo (uma violação padrão), que é exatamente o tipo de caso de borda que causou erros de integração reais e documentados em contratos que assumiram estrita conformidade padrão sem verificar.

## Outras leituras

- [EIP-20: Padrão de Token](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin: ERC-20](https://docs.openzeppelin.com/contracts/api/token/erc20)

---

[← Anterior: O que é um Token?](./README.md)
·
[Voltar aos Tokens](./README.md)
·
[Próximo: Balanças →](./balances.md)
