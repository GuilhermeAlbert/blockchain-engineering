# Erros e Reversões

Quando algo dá errado, uma função Solidity não retorna um valor de erro como muitas linguagens fazem. Ele **reverte**, descontraindo cada mudança de estado a chamada atual feita, como se nunca tivesse executado em tudo (exceto para o gás já consumido, por [Gás](../ethereum/gas.md#o-que-acontece-quando-uma-transação-fica-sem-gás)). Este capítulo cobre as três maneiras de desencadear um reverso, e por que a Solidity moderna mudou para o mais novo dos três.

## Três mecanismos, um comportamento subjacente

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ErrorDemo {
    error InsufficientBalance(uint256 available, uint256 requested);

    mapping(address => uint256) public balances;

    function withdrawWithRequire(uint256 amount) external {
        require(balances[msg.sender] >= amount, "insufficient balance");
        balances[msg.sender] -= amount;
    }

    function withdrawWithCustomError(uint256 amount) external {
        if (balances[msg.sender] < amount) {
            revert InsufficientBalance(balances[msg.sender], amount);
        }
        balances[msg.sender] -= amount;
    }

    function withdrawWithAssert(uint256 amount) external {
        balances[msg.sender] -= amount;
        assert(balances[msg.sender] >= 0); // trivially true for uint256, illustrative only
    }
}
```

Verificado: isto compila-se perfeitamente com solc 0.8.26.

- **`require(condition, "message")`**: a forma tradicional, mais comum: reverte com uma mensagem de texto se a condição for falsa. Simples e amplamente compreendida, mas a string é armazenada e devolvida na íntegra em cada reversão, o que custa gás real, evitável e tamanho de bytecode.
- **Erros personalizados** (`error InsufficientBalance(...)`, introduzido na Solidity 0.8.4). Definido como um evento leve, `revert`ad com argumentos tipográficos específicos. Codificado muito mais compacto do que uma string (apenas um seletor de 4-bytes, calculado da mesma forma que um seletor de função, veja [Contrato ABI](./abi.md#selectores-de-funções), além de argumentos codificados pelo ABI), tornando os erros personalizados significativamente mais baratos em tamanho de bytecode de implantação e gás de execução do que um equivalente `require` com uma string descritiva, razão pela qual os guias modernos do estilo Solidity e as bases de código mais ativamente mantidas mudaram para erros personalizados como a escolha padrão.
- **`assert(condition)`**: destina-se especificamente a condições que devem ser **matematicamente impossível** para violar se a lógica do contrato está correta, e `assert` erro sinaliza um erro interno, não uma condição normal, esperada para o usuário (que `require` ou um erro personalizado deve lidar com isso). Historicamente, `assert` falhas consumidas *tudo* gás remanescente em vez de reembolsar gás não utilizado; este foi alterado em Solidity 0.8.0 para se comportar como outros reverts, reembolsando gás não utilizado, mas o *semântico* convenção (usar `assert` apenas para "isso nunca deve acontecer" invariantes) permanece a prática recomendada independentemente.

## Por que reverter desfaz tudo, precisamente

Um reverso não desfaz selectivamente "a parte má". Desfaz-se. **cada** mudança de estado feita desde que o frame de chamada atual começou, incluindo alterações feitas por quaisquer chamadas aninhadas para outros contratos que este frame de chamada em si desencadeou (a menos que os efeitos dessas chamadas aninhadas já foram finalizados em uma transação de nível superior separada e anterior). Esta garantia tudo-ou-nada é o que torna o raciocínio sobre a correção de uma função tratável: se uma função reverte a partway através, um desenvolvedor nunca tem que se preocupar com um estado semi-completo, inconsistente sendo deixado para trás on-chain.

## Conceitos errôneos comuns

**A `require` ou a reversão de erro personalizado não consome todo o gás enviado com a transação**, uma vez que Solidity 0.8.0, apenas o gás realmente usado até o ponto do reverso é carregado; o restante (até o limite de gás original) é reembolsado, o mesmo comportamento descrito geralmente em [Gás](../ethereum/gas.md#o-que-acontece-quando-uma-transação-fica-sem-gás) para uma parada "fora de gás", estendida para cobrir reversos explícitos também.

**Erros personalizados não são apenas uma preferência estilística**. As economias de gás e bytes são reais e mensuráveis, particularmente para contratos com muitas condições distintas de falha, e é por isso que os exemplos de Solidity deste livro [Tokens](../tokens/README.md) e [DeFi](../defi/README.md)) padrão para erros personalizados em vez de `require` cordas onde quer que seja prático.

## Outras leituras

- [Documentação de solidez: Erros e a Declaração de Reversão](https://docs.soliditylang.org/en/latest/control-structures.html#errors-and-the-revert-statement)

---

[← Anterior: Modificadores](./modifiers.md)
·
[Voltar aos contratos inteligentes](./README.md)
·
[Próximo: Funções Payable →](./payable.md)
