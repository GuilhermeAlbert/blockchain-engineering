# Eter embrulhado

O WETH envolve o próprio éter, não o bem de uma cadeia diferente, mas a própria moeda nativa de Ethereum, convertida em um símbolo ERC-20 comum. Este capítulo cobre por que essa conversão é necessária, e o contrato mínimo e elegante que a implementa.

## Por que o éter precisa ser enrolado em sua própria cadeia

Isso vale a pena afirmar precisamente, já que é um ponto comum de confusão: **éter não é um símbolo ERC-20**É a moeda nativa da rede, rastreada diretamente em cada conta `balance` campo (ver [Contas Ethereum](../ethereum/accounts.md#qual-a-composição-de-todas-as-contas)), movido através de uma transação `value` campo, não através de qualquer contrato `transfer` função. Como o éter precede e se situa fora do padrão ERC-20, qualquer contrato ou protocolo escrito genericamente contra a interface ERC-20 (uma troca descentralizada que espera chamar `transferFrom` em qualquer token que ele está negociando, por exemplo) não tem como aceitar ou mover diretamente éter cru através dessa mesma interface. O WETH encerra esta lacuna: um contrato simples que contém o éter 1:1 e emite um símbolo conforme ao ERC-20 representando-o, deixando o éter participar em qualquer lugar um símbolo ERC-20 é esperado.

## O contrato completo, verificado

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract WETH {
    string public name = "Wrapped Ether";
    string public symbol = "WETH";
    uint8 public decimals = 18;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Deposit(address indexed to, uint256 value);
    event Withdrawal(address indexed from, uint256 value);

    receive() external payable {
        deposit();
    }

    function deposit() public payable {
        balanceOf[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external {
        require(balanceOf[msg.sender] >= amount, "insufficient balance");
        balanceOf[msg.sender] -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "ETH transfer failed");
        emit Withdrawal(msg.sender, amount);
    }

    function totalSupply() external view returns (uint256) {
        return address(this).balance;
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

Verificado: isto compila-se perfeitamente com solc 0.8.26 (estruturalmente, é o exato `SimpleToken` de [ERC-20](./erc-20.md#uma-implementação-mínima-e-funcional), com `deposit`/`withdraw` substituição de um construtor de fornecimento fixo, e `totalSupply` computado ao vivo de `address(this).balance` (a propriedade do próprio éter deste contrato) em vez de ser rastreada separadamente) uma consequência pura da garantia de apoio 1:1: o equilíbrio do éter do contrato e o seu WETH total emitido são sempre, por construção, idênticos, por isso não há valor separado para rastrear.

## Por que depositar e retirar são simétricos e sempre honra 1:1

`deposit` créditos do equilíbrio WETH do chamador com exatamente o éter enviado (`msg.value`); `withdraw` queima WETH e envia de volta exatamente tanto éter. Uma vez que cada unidade de WETH na existência corresponde ao éter realmente mantido por este contrato específico (não há mecanismo de cunhagem independente de um depósito éter real, correspondente), WETH mantém um forte, contrato-forçado 1:1 apoio, uma garantia significativamente mais forte, mais diretamente verificável do que WBTC custodian-based peg de [Ativo Embrulhado](./wrapped-assets.md#wbtc-bitcoin-embrulhado-para-ethereum), uma vez que qualquer pessoa pode verificar de forma independente o apoio simplesmente verificando o equilíbrio éter deste contrato contra o seu total fornecimento WETH, sem a honestidade do guardião para confiar em tudo.

## Conceitos errôneos comuns

**WETH não é um ativo independente, independentemente valioso que poderia negociar longe do preço do éter** (porque é apoiado 1:1 por um contrato inteligente, sempre confiável e disponível (ao invés de um guardião que poderia se tornar insolvente ou desonesto), uma WETH é sempre redimible para exatamente um ETH, e qualquer desvio de preço de mercado seria fechado imediatamente por arbitragem (depósito ETH para WETH sub-preço, ou retirar ETH de WETH super-preço)) uma garantia fundamentalmente diferente, mais forte do que um ativo embrulhado de custódia fornece.

**Usar WETH em vez de éter cru não é apenas uma preferência estilística em protocolos DeFi**. É frequentemente uma necessidade técnica genuína, uma vez que muitos protocolos são escritos genericamente contra a interface ERC-20 e não têm caminho de código separado para lidar com o mecanismo de transferência diferente do éter bruto em tudo.

## Outras leituras

- [WETH9 (a implementação canônica, amplamente implementada)](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)

---

[← Anterior: Ativos embrulhados](./wrapped-assets.md)
·
[Voltar aos Tokens](./README.md)
·
[Próximo: Token Supply →](./token-supply.md)
