# Empréstimos

Emprestar emprestado a partir de um conjunto de empréstimos DeFi significa bloquear garantias e extrair um ativo diferente contra ele, sem verificação de identidade e sem calendário de reembolso fixo. Este capítulo abrange o lado do mutuário do modelo comum de empréstimo introduzido no [Empréstimos](./lending.md): como um empréstimo é aberto, como os juros são acumulados, e como o reembolso realmente funciona.

## Abertura de uma posição de empréstimo

Um mutuário deposita garantias no protocolo (ver [Garantia](./collateral.md) para quanto é necessário), em seguida, chama uma função de empréstimo especificando qual ativo e quanto eles querem extrair. O protocolo verifica o valor solicitado em relação ao valor da garantia e o rácio entre o empréstimo e o valor máximo do protocolo para esse ativo antes de liberar os fundos; se o pedido exceder o rácio permitido, a transação simplesmente reverte. Não há nenhum processo de aprovação além desta verificação on-chain, nenhum período de espera, e nenhum requisito de que o mutuário pretende usar os fundos emprestados para qualquer coisa específica.

## Juros acumulados continuamente, não num calendário

Uma vez que uma posição é aberta, os juros são acumulados sobre o montante emprestado continuamente, combinando com cada bloco em vez de em um calendário mensal ou anual como um empréstimo tradicional faz. Os protocolos rastreiam isso com um índice de juros mantido internamente: o saldo devido de cada mutuário é calculado multiplicando sua quantia originalmente emprestada por muito que esse índice tenha crescido desde que eles pediram emprestado, ao invés do protocolo armazenar e atualizar o saldo de cada mutuário individual em cada bloco (o que seria proibitivamente caro em gás).

```typescript
// Simplified interest-index accounting, the pattern Aave and Compound
// both use to avoid updating every borrower's balance on every block.
interface BorrowPosition {
  principalBorrowed: number;
  borrowIndexAtOpen: number;
}

function currentDebt(position: BorrowPosition, currentBorrowIndex: number): number {
  return position.principalBorrowed * (currentBorrowIndex / position.borrowIndexAtOpen);
}

const position: BorrowPosition = { principalBorrowed: 10_000, borrowIndexAtOpen: 1.0 };
// Some time later, accrued interest has grown the pool's borrow index:
console.log(currentDebt(position, 1.05)); // 10500, 5% accrued since borrowing
```

## Sem prazo fixo ou calendário de reembolso

Ao contrário de um empréstimo tradicional, uma posição de empréstimo DeFi não tem data de vencimento e nenhum pagamento mínimo exigido. O mutuário pode reembolsar qualquer montante a qualquer momento, parcial ou integralmente, e os juros simplesmente deixam de ser cobrados sobre qualquer capital que tenha sido reembolsado. A posição pode, em princípio, manter-se aberta indefinidamente, desde que o apoio de garantia permaneça suficiente em relação à dívida crescente à medida que os juros aumentam, o que é exatamente a condição [Liquidações](./liquidations.md) existe para impor uma vez que deixa de ser verdade.

## Por que um mutuário faria isso em vez de apenas vender seu ativo

O empréstimo contra garantia em vez de vendê-la diretamente permite que um titular acesse liquidez (moedas para gastar, ou um ativo diferente para implantar em outro lugar) sem desencadear uma venda tributável em muitas jurisdições, e sem renunciar à potencial apreciação dos preços futuros da garantia ou ao seu próprio rendimento, se for um ativo fiador ou portador de juros. Esta é a mesma motivação básica por trás de um empréstimo garantido por títulos em financiamento tradicional, aplicado a ativos on-chain com um contrato inteligente que impõe os termos em vez do departamento de crédito de um banco.

## Conceitos errôneos comuns

**Pedir emprestado de um protocolo DeFi não requer reembolso até uma data específica.** A posição pode permanecer aberta enquanto permanecer suficientemente garantida; o que realmente força a ação é a relação colateral que se aproxima do limiar de liquidação, e não a passagem do próprio tempo.

**Um montante mais elevado emprestado não significa um risco maior de liquidação por si só.** O que importa é o rácio empréstimo-valor (valor emprestado relativo ao valor da garantia), não o tamanho absoluto de qualquer um dos números; uma pequena posição a 75% LTV está mais próxima da liquidação do que uma grande posição a 30% LTV.

## Outras leituras

- [Documentação do Aave: empréstimo](https://docs.aave.com/faq/borrowing-and-repaying)
- Ver também: [Empréstimos](./lending.md), [Garantia](./collateral.md), [Liquidações](./liquidations.md)

---

[← Anterior: Empréstimos](./lending.md)
·
[Voltar para DeFi](./README.md)
·
[Próximo: Garantia →](./collateral.md)
