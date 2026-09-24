# Empréstimos Flash

Um empréstimo flash permite que um mutuário desenhe um valor arbitrário de um ativo com garantia zero, na condição de que seja reembolsado, com uma taxa, dentro da mesma transação em que foi emprestado. Este capítulo cobre a garantia de atomicidade que torna seguro um empréstimo sem garantia para o credor, e para que empréstimos flash são realmente utilizados.

## O mecanismo: a atomicidade como a única garantia

Um empréstimo flash funciona por causa de uma propriedade específica para transações blockchain: uma transação inteira é totalmente bem sucedida ou totalmente revertida, sem execução parcial (ver [Transações Ethereum](../ethereum/transactions.md)). Um contrato de empréstimo flash empresta fundos, em seguida, passa o controle para o próprio código de contrato do mutuário para fazer o que quiser com eles, e finalmente, antes que a transação termine, verifica se o empréstimo mais uma taxa foi devolvido. Se não tiver, toda a transação, incluindo o desembolso do empréstimo original, reverte como se nunca tivesse acontecido. Este é todo o modelo de segurança: não há necessidade de garantias, verificações de crédito ou confiança no mutuário, porque é matematicamente impossível para o empréstimo não ser reembolsado e ainda ter seus efeitos persistir on-chain.

```solidity
// Simplified flash loan pattern, illustrating the structure real
// implementations (Aave, Uniswap v3 flash swaps) share.
contract FlashLoanExample {
    function flashLoan(uint256 amount) external {
        uint256 balanceBefore = token.balanceOf(address(this));
        token.transfer(msg.sender, amount);

        // Control returns to the caller's own contract here, which must
        // implement a callback that uses the funds and repays before
        // returning control back to this function.
        IFlashBorrower(msg.sender).onFlashLoan(amount);

        uint256 balanceAfter = token.balanceOf(address(this));
        uint256 fee = (amount * 5) / 10000; // 0.05%, Aave v3's current rate
        require(balanceAfter >= balanceBefore + fee, "Flash loan not repaid");
    }
}
```

Em um empréstimo de 1.000.000 de dólares na atual taxa de empréstimo flash Aave v3 de 0,05%, o reembolso exigido é de 1.000,500 dólares, uma taxa de 500 dólares para um empréstimo que, da perspectiva do credor, estava pendente para uma única transação e nunca carregou qualquer risco padrão em tudo.

```typescript
const loanAmount = 1_000_000;
const feeRate = 0.0005; // Aave v3's current flash loan fee
const fee = loanAmount * feeRate;
const totalRepay = loanAmount + fee;
console.log({ fee, totalRepay }); // { fee: 500, totalRepay: 1000500 }
```

## O que empréstimos flash são realmente usados para

O legítimo mais comum usa todos compartilham a mesma forma: um mutuário precisa de uma grande quantidade temporária de capital para executar uma operação multi-passo que só é rentável, ou só possível, se cada passo acontece atomicamente.

- **Arbitragem**: empréstimo de capital suficiente para explorar uma diferença de preços entre dois locais (ver [Slippage](./slippage.md#arbitragem-e-porque-os-preços-entre-locais-convergem)), compra no local barato e venda no caro dentro da mesma transação, reembolsando o empréstimo do produto, e mantendo a diferença, tudo sem necessidade de possuir qualquer capital adiantado.
- **Swaps de garantia**: substituir um ativo de garantia que apoia uma posição de empréstimo por uma posição diferente, sem necessidade de reembolsar primeiro a dívida existente com fundos separados, utilizando um empréstimo flash para cobrir brevemente a dívida enquanto o swap acontece.
- **Auto-liquidação**: um mutuário que encerra a sua própria posição em risco antes de um liquidatário externo, que recebe o bónus de liquidação (ver [Liquidações](./liquidations.md#quem-realiza-liquidações-e-porquê)) para si mesmos em vez de perdê-lo para outra pessoa.

## Por que empréstimos flash também são uma ferramenta de ataque real

A mesma propriedade que torna os empréstimos flash seguros para os credores, a capacidade de comandar uma grande quantidade temporária de capital sem garantia, também faz deles uma poderosa ferramenta para atacar outros protocolos. Um empréstimo flash pode fornecer capital suficiente para manipular brevemente o preço de um mercado fino (ver [Manipulação do Oracle](../security/oracle-manipulation.md)) ou explorar uma suposição de preços em um contrato vulnerável, tudo dentro de uma transação atômica que reverte de forma limpa se o ataque não der certo, ou seja, um atacante arrisca essencialmente apenas o custo do gás da transação, mesmo em uma tentativa falhada. Isso não é uma falha no mecanismo de empréstimo flash em si; é uma falha no protocolo que assumiu que um atacante não poderia acessar temporariamente capital enorme, sem garantia, coberto em detalhes em [Flash Empréstimo Ataca](../security/flash-loan-attacks.md).

## Conceitos errôneos comuns

**Um empréstimo flash não é dinheiro livre para o credor dar.** O empréstimo deve ser reembolsado com uma taxa dentro da mesma transação ou a transação inteira reverte; o principal do credor nunca está realmente em risco, mas nem é um empréstimo flash uma subvenção ou um presente, uma vez que uma tentativa não reembolsada simplesmente nunca aconteceu no que diz respeito ao estado final da blockchain.

**Flash empréstimos não são inerentemente malicioso.** A grande maioria do volume de empréstimo flash é legítima arbitragem, gestão de garantias e atividade de liquidação; eles são um vetor de ataque real especificamente contra protocolos com preços exploráveis ou pressupostos lógicos, não um mecanismo que é prejudicial por si só.

## Outras leituras

- [Documentação do Aave: empréstimos flash](https://aave.com/docs/aave-v3/guides/flash-loans)
- Ver também: [Liquidações](./liquidations.md), [Flash Empréstimo Ataca](../security/flash-loan-attacks.md), [Manipulação do Oracle](../security/oracle-manipulation.md)

---

[← Anterior: Liquidações](./liquidations.md)
·
[Voltar para DeFi](./README.md)
·
[Próximo: Oráculos →](./oracles.md)
