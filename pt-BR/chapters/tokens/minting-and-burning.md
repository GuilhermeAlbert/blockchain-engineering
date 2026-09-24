# Emissão e queima

A menta cria novos símbolos; a queima os destrói. Também não faz parte das interfaces padrão ERC-20, ERC-721 ou ERC-1155. Ambas são convenções, implementadas pela lógica adicional de um contrato token, além da mecânica de transferência padrão já coberta. Este capítulo cobre como eles realmente funcionam e por que eles são construídos sobre o mesmo evento exatamente os padrões já definem.

## A convenção: cunhagem e queima são transferências de e para o endereço zero

Nem o ERC-20 nem o ERC-721 definem um `mint` ou `burn` função nas suas interfaces formais, mas ambas as normas» `Transfer` evento, e a lógica interna da maioria das implementações, tratar o especial **endereço zero** (`0x000...000`, um endereço com uma chave privada conhecida, irrecuperável, ou, mais precisamente, nenhuma chave privada conhecida, ver [Chaves particulares e públicas](../cryptography/keys.md)) como representando "fora do sistema token inteiramente". Uma hortelã é convencionalmente implementada como transferência *de* o endereço zero; uma gravação como transferência *para* ele, visível diretamente no `SimpleToken` construtor de [ERC-20](./erc-20.md#uma-implementação-mínima-e-funcional), que emite `Transfer(address(0), msg.sender, initialSupply)` para a sua menta inicial.

```solidity
function mint(address to, uint256 amount) external onlyOwner {
    totalSupply += amount;
    balanceOf[to] += amount;
    emit Transfer(address(0), to, amount);
}

function burn(uint256 amount) external {
    require(balanceOf[msg.sender] >= amount, "insufficient balance");
    balanceOf[msg.sender] -= amount;
    totalSupply -= amount;
    emit Transfer(msg.sender, address(0), amount);
}
```

Verificado: ambas as funções compilam-se de forma limpa como parte de um contrato de token, seguindo o mesmo padrão que [ERC-20](./erc-20.md)'s verificado `SimpleToken` exemplo, com `onlyOwner` modificador de [Modificadores](../contracts/modifiers.md) restringir quem pode mete.

## Por que este congresso específico, em vez de um evento dedicado

Reutilizar o existente `Transfer` evento (em vez de definir separado `Mint`/`Burn` eventos) significa cada peça de ferramenta off-chain que já `Transfer` eventos (exploradores de bloco, carteiras, indexadores (ver [Indexação de eventos](../web3/event-indexing.md))) reflecte automaticamente, correctamente, a cunhagem e queima como alterações ao `totalSupply` e equilíbrios individuais, sem necessidade de qualquer lógica de caso especial para reconhecer separadamente um tipo de evento diferente. Esta é uma reutilização deliberada e elegante de uma interface que o padrão já requer, em vez de uma limitação do que o padrão poderia expressar.

## Quem é que pode fazer isso?

Ao contrário do Bitcoin, onde a emissão é regida por regras de consenso em todo o protocolo, todos podem verificar (ver [21 milhões de BTC](../bitcoin/21-million.md)), a lógica de cunhagem de um token ERC-20 é **inteiramente até ao código desse contrato específico**. Não há nenhuma tampa de nível de protocolo, nenhum cronograma fixo, a menos que o próprio autor do contrato deliberadamente construiu um e (criticamente) removeu qualquer capacidade para depois alterá-lo. Isto faz com que o controle de acesso específico que governa um token `mint` função uma das coisas mais consequenciais a verificar antes de confiar em qualquer pedido de fornecimento de token: um token cujo proprietário pode cunhar arbitrário novo fornecimento à vontade tem propriedades monetárias fundamentalmente diferentes do que uma com uma capa codificada, imutável ou nenhuma função de cunhagem em tudo, uma distinção coberta mais [Fornecimento de Token](./token-supply.md) e [Controle de acesso](../security/access-control.md).

## Conceitos errôneos comuns

**Os tokens de gravação não devolvem nenhum valor subjacente ao queimador**. Simplesmente destrói os tokens (decrementando `totalSupply` e o equilíbrio do queimador), tipicamente como um mecanismo deflacionário ou de gerenciamento de suprimentos deliberado; qualquer "valor" que uma queimadura pode ser entendido para criar é um efeito indireto, orientado para o mercado (fornecimento reduzido, tudo o mais igual, preço potencialmente de suporte, ver [Dinheiro Deflacionário](../economics/deflationary-money.md) para a mesma lógica econômica geral discutida extensivamente para Bitcoin), não algo que a transação de queima em si paga.

**A convenção de endereço zero não significa tokens enviados para `address(0)` por um comum `transfer` chamada são automaticamente reconhecidos como "queimado" por cada contrato**, se o envio para o endereço zero é tratado como uma gravação real `totalSupply`) depende inteiramente se as verificações lógicas específicas do contrato para e lida com esse destino especialmente; uma implementação ingênua pode simplesmente registrar um saldo permanente, inacessível no endereço zero sem nunca ajustar `totalSupply` De todo.

## Outras leituras

- [OpenZeppelin: Extensões ERC-20 (Padrões Mintáveis, Queimados)](https://docs.openzeppelin.com/contracts/api/token/erc20)

---

[← Anterior: Metadados NFT](./nft-metadata.md)
·
[Voltar aos Tokens](./README.md)
·
[Próximo: Ativos embrulhados →](./wrapped-assets.md)
