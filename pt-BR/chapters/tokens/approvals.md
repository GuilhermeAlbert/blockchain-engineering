# Subsídios e homologações

`approve` concede outra permissão de endereço para mover até uma quantidade específica de seus tokens via `transferFrom`O mecanismo [Transferências](./transfers.md#transferênciade-mover-tokens-em-nome-de-outra-pessoa) introduzido. Este capítulo abrange o modelo de subsídio na íntegra, incluindo uma condição de corrida documentada na norma original e por que importa para como você deve (e não deve) conceder aprovações na prática.

## O mecanismo

```solidity
function approve(address spender, uint256 amount) external returns (bool) {
    allowance[msg.sender][spender] = amount;
    emit Approval(msg.sender, spender, amount);
    return true;
}
```

Chamada `approve(spenderAddress, 100)` conjuntos `allowance[msg.sender][spenderAddress]` a exatamente 100, não aditivo a qualquer subsídio prévio, mas a uma substituição definitiva. `spenderAddress` pode então chamar `transferFrom` mover até 100 tokens de chamada, numa ou várias chamadas, até que o subsídio esteja esgotado ou reiniciado.

## A condição de aprovação da corrida

Esta é uma peculiaridade real e documentada da norma ERC-20 original, não uma preocupação hipotética: porque `approve` **substitui** Em vez de ajustar o subsídio, mudar um subsídio não-zero existente para um novo valor não-zero tem uma janela estreita para um ataque específico. Suponha que Alice tenha aprovado Bob para 100 tokens, e quer mudar isso para 50. Se Bob está assistindo a mempool (ver [O Mempool](../bitcoin/mempool.md), aplicado aqui para o próprio mempool de Ethereum) e vê a transação de Alice mudando a aprovação para 50, ele poderia rapidamente apresentar sua própria `transferFrom` chamar a *original* 100 subsídio, obtê-lo minado primeiro, e, em seguida, (uma vez que a transação de Alice alterando o subsídio para 50 também confirma) gastar o *novo* 50 também, extraindo 150 total de uma aprovação prevista de 50 token.

```text
Alice's allowance to Bob: 100

Alice submits: approve(Bob, 50)
                    │
Bob sees this in the mempool and front-runs it:
Bob submits: transferFrom(Alice, Bob, 100)  ← mined FIRST, spends old allowance
Alice's tx:  approve(Bob, 50)                ← mined second, sets NEW allowance
Bob submits: transferFrom(Alice, Bob, 50)   ← spends the new allowance too

Bob extracted 150 tokens from an approval Alice intended to reduce to 50.
```

## A mitigação, e porque é uma solução alternativa em vez de uma solução

A mitigação recomendada pela norma é sempre fixar um limite para **zero primeiro**, confirmar que a transação, e só então definir o novo valor desejado, removendo a janela onde tanto um antigo e novo subsídio não-zero poderia ser explorado separadamente. Alguns tokens implementam adicionalmente não padrão `increaseAllowance`/`decreaseAllowance` funções especificamente para deixar uma licença ser ajustada atomicamente sem nunca passar por esta condição de raça em tudo. Nem uma mudança para o próprio ERC-20, que permanece especificada exatamente como originalmente escrito; ambos são aplicações de padrões e os usuários adotaram especificamente porque a condição de raça subjacente é real e tem, de alguma forma, sido discutido como um fator de risco vivo em integrações reais.

## Aprovações ilimitadas: conveniência versus risco

Muitas aplicações solicitam **ilimitado** aprovação (o máximo possível) `uint256` valor) em vez de um montante correspondente à transação específica, especificamente para evitar exigir uma nova transação de aprovação (com o seu próprio custo de gás e confirmação de espera) para cada interacção futura. Este é um comércio de conveniência genuíno com um lado negativo real, documentado: uma aprovação ilimitada, se o contrato aprovado é mais tarde encontrado para ter uma vulnerabilidade ou acaba por ser malicioso, dá a um atacante a capacidade de drenar o saldo total do token, não apenas a quantidade que uma transação específica realmente necessária. Este padrão exato é coberto diretamente, com incidentes históricos reais, em [Ataques de aprovação](../security/approval-attacks.md).

## Conceitos errôneos comuns

**Uma aprovação não transfere nenhum símbolo por si só**. `approve` apenas altera uma permissão gravada na `allowance` mapeamento; sem movimentos de equilíbrio até e a menos que o gastador aprovado realmente chama `transferFrom`.

**A revogação de uma aprovação (definindo-a como zero) não exige que a operação de aprovação original seja "indeterminada"** em qualquer sentido especial. É simplesmente outro comum `approve` Chamar, fixando o subsídio para zero, disponível para o titular do token a qualquer momento, independentemente de o gastador ter utilizado algum dos montantes previamente aprovados.

## Outras leituras

- [EIP-20: Padrão de Token](https://eips.ethereum.org/EIPS/eip-20)
- Ver também: [Ataques de aprovação](../security/approval-attacks.md)

---

[← Anterior: Transferências](./transfers.md)
·
[Voltar aos Tokens](./README.md)
·
[Próximo: ERC-721 →](./erc-721.md)
