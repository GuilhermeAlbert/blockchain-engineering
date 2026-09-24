# Transferências

`transfer` e `transferFrom` são duas formas distintas de mover tokens. Este capítulo cobre exatamente por que duas funções existem em vez de uma, uma vez que a distinção é a base completa para a forma como as aprovações de tokens (cobertos em seguida, em [Subsídios e homologações](./approvals.md)) trabalho.

## transferência: movendo seus próprios tokens

```solidity
function transfer(address to, uint256 amount) external returns (bool) {
    require(balanceOf[msg.sender] >= amount, "insufficient balance");
    balanceOf[msg.sender] -= amount;
    balanceOf[to] += amount;
    emit Transfer(msg.sender, to, amount);
    return true;
}
```

`transfer` sempre move tokens **do próprio equilíbrio do ouvinte**. `msg.sender` é codificada como a fonte, o que significa que ninguém pode usar `transfer` para mover tokens de um endereço que eles mesmos não controlam (não há nenhum parâmetro de endereço de origem para especificar o contrário). Este é o equivalente direto de uma transação Bitcoin comum gastando um UTXO que você controla (ver [Transações de Bitcoin](../bitcoin/transactions.md)). Você só pode mover valor que você pode autorizar, em virtude da própria chamada vindo de seu próprio endereço.

## transferênciaDe: mover tokens em nome de outra pessoa

```solidity
function transferFrom(address from, address to, uint256 amount) external returns (bool) {
    require(balanceOf[from] >= amount, "insufficient balance");
    require(allowance[from][msg.sender] >= amount, "insufficient allowance");
    allowance[from][msg.sender] -= amount;
    balanceOf[from] -= amount;
    balanceOf[to] += amount;
    emit Transfer(from, to, amount);
    return true;
}
```

`transferFrom` deixa o **ouvinte** mover tokens de um **diferente** endereço (`from`), mas apenas até qualquer coisa `allowance[from][msg.sender]` atualmente permite, um valor que endereço explicitamente definido através de um `approve` chamada (ver [Subsídios e homologações](./approvals.md)). Este é o mecanismo que faz intercâmbios descentralizados, protocolos de empréstimo, e essencialmente todo o [DeFi](../defi/README.md) possível: um contrato de protocolo pode mover os tokens de um usuário em seu nome (para executar uma troca, depósito de garantia, e assim por diante) sem nunca segurar a chave privada do usuário, apenas uma permissão específica, concedida pelo usuário, on-chain para mover uma quantidade específica, limitada.

## Por que ambos são necessários: duas situações de confiança verdadeiramente diferentes

`transfer` não requer nenhuma configuração prévia (é uma ação direta autorizada puramente pela chamada proveniente do próprio endereço do titular do token. `transferFrom` exige que o titular do token tenha, separadamente, expressamente autorizado um terceiro específico (o `spender`) com antecedência) uma decisão de confiança distinta, tomada uma vez `approve`), que permite então potencialmente muitos mais tarde `transferFrom` Executa até ao limite aprovado, sem necessitar da participação directa do titular do token em cada transferência individual. Bitcoin não tem equivalente a este segundo padrão no nível do protocolo. Um Bitcoin UTXO só pode ser gasto por uma parte com a chave privada correspondente assinando diretamente essa transação específica (ver [Bitcoin Script](../bitcoin/script.md)), sem nenhum conceito nativo de "pré-autorizar alguém para gastar até X em meu nome mais tarde".

## Conceitos errôneos comuns

**`transferFrom` não requer a `from` A chave privada do endereço ou a participação directa no `transferFrom` chamada**. Esse é precisamente o ponto do padrão: o `from` Endereço autorizado *categoria* de transferências futuras com antecedência (via `approve`), e o `transferFrom` A chamada pode ser iniciada inteiramente pelo expedidor aprovado, sem que o titular original assine ou mesmo tenha conhecimento dessa transação específica.

**A `transfer` Reversão da chamada não significa necessariamente que o destinatário a rejeitou**. Para um token ERC-20 conforme padrão, `transfer` Sucede ou falha com base puramente no saldo do remetente e na própria validade da transação; o destinatário não tem nenhum mecanismo integrado para rejeitar uma transferência ERC-20 recebida (uma diferença real e documentada das verificações facultativas de chamada de resposta facultativa do ERC-721 e do ERC-1155, abrangidas por [ERC-721](./erc-721.md) e [ERC-1155](./erc-1155.md)).

## Outras leituras

- [EIP-20: Padrão de Token](https://eips.ethereum.org/EIPS/eip-20)

---

[← Anterior: Balanças](./balances.md)
·
[Voltar aos Tokens](./README.md)
·
[Próximo: Subsídios e Aprovações →](./approvals.md)
