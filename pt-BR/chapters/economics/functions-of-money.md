# Funções do Dinheiro

Os economistas definem o dinheiro pelo que faz, não pelo que é feito. Este capítulo cobre as três funções que a maioria dos livros didáticos concordam, mais um quarto alguns adicionam, e mostra por que separá-los importa: um bom pode executar uma ou duas dessas funções bem enquanto executa outros mal, e Bitcoin é um caso de teste útil precisamente porque críticos e defensores discordam sobre quais funções ele atualmente desempenha.

## Meio de intercâmbio

Um meio de troca é qualquer coisa amplamente aceita no comércio de bens e serviços, usado especificamente para evitar a dupla coincidência de desejos problema descrito em [O que é dinheiro?](./money.md)Isto é geralmente tratado como a função mais fundamental do dinheiro, porque as outras funções tendem a seguir de algo já sendo amplamente utilizado em troca.

Para um bom trabalho como meio de intercâmbio, ele precisa ser aceito por uma grande parte de uma comunidade que mantê-lo é útil. Um bom que ninguém mais aceitará não é um meio de troca, não importa quão durável ou escasso seja. Isto é... **efeito de rede**: o valor de um meio de troca para qualquer usuário aumenta à medida que outros usuários o aceitam (ver [Efeitos da Rede em Dinheiro](./network-effects.md)).

## Unidade de conta

Uma unidade de conta é o padrão utilizado para medir e comparar o valor de diferentes bens e dívidas. A função "jardim". Preços, contratos, salários e dívidas são denominados em uma unidade de conta. Esta função pode, em princípio, ser separada do meio de função de câmbio: os preços poderiam teoricamente ser cotados em uma unidade (por exemplo, ouro) enquanto o pagamento real acontece em outra (por exemplo, notas convertíveis em ouro), e em algumas economias com grave instabilidade monetária, os preços são informalmente cotados em uma moeda estrangeira estável (dólares americanos, por exemplo), enquanto o pagamento acontece na moeda local, instável, um caso de mundo real da função de unidade de conta que separa da função de meio de câmbio.

Uma boa unidade de necessidades de conta **estabilidade**, não apenas aceitação: se o próprio critério continuar a mudar de comprimento, torna-se difícil escrever contratos a longo prazo, comparar preços ao longo do tempo, ou fazer a contabilidade básica que uma empresa precisa para rastrear se é rentável. Esta é a função mais citada como a mais fraca de Bitcoin, devido à volatilidade dos preços (ver [Volatilidade e adoção monetária](./volatility.md)). Um bem pode ser amplamente aceito no comércio, embora ainda sendo um bitola pobre, se o seu valor relativo aos bens do dia-a-dia oscila drasticamente em curtos períodos.

## Armazenagem de valor

Uma reserva de valor é algo que pode ser salvo, recuperado e trocado no futuro sem perda significativa de poder de compra, entretanto. Esta é a função mais diretamente ameaçada pela inflação: se uma moeda perde o poder de compra rapidamente, mantê-la à medida que a economia se torna onerosa, e as pessoas mudam a poupança para outros ativos (moeda estrangeira, imóveis, commodities, ações) que esperam manter melhor valor, mesmo que esses ativos sejam menos convenientes como meio de troca.

Armazenagem de valor e meio de troca pode puxar em diferentes direções. Um ativo que se espera que *apreciar* em valor dá aos detentores um incentivo para manter em vez de gastá-lo, um argumento frequentemente feito a favor e contra Bitcoin (ver [Bitcoin como dinheiro](./bitcoin-as-money.md) e [Dinheiro Deflacionário](./deflationary-money.md)), uma vez que um ativo pessoas preferem manter é, pela mesma lógica, um ativo pessoas são mais relutantes em gastar em compras diárias.

## Padrão de pagamento diferido

Alguns economistas (seguindo uma tradição em teoria monetária que data pelo menos do século XIX) acrescentam uma quarta função: um padrão de pagamento diferido, ou seja, a unidade em que dívidas e obrigações futuras são especificadas e finalmente liquidadas. Uma hipoteca, uma obrigação, ou um contrato de trabalho que pague um salário em doze meses de tempo todos dependem do dinheiro que serve esta função. Esta função se sobrepõe fortemente com a unidade de conta e às vezes é tratada como um caso especial dela em vez de uma função totalmente separada. Este livro observa a distinção porque os contratos de dívida exigem especificamente confiança de que a moeda ainda será utilizável, e em uma quantidade previsível em relação a hoje, na data futura do reembolso, que é um requisito ligeiramente diferente do que simplesmente preços de bens para venda hoje.

## Por que separar as funções importa para este livro

Quando capítulos posteriores perguntar "é dinheiro Bitcoin?", uma resposta precisa requer fazer a função pergunta por função em vez de como um único sim-ou-não julgamento:

| Função | O que requer | Onde este livro cobre o caso do Bitcoin |
| --- | --- | --- |
| Meio de intercâmbio | Ampla aceitação, baixo atrito de transação | [Bitcoin como dinheiro](./bitcoin-as-money.md), [Lightning Network](../lightning/README.md) |
| Unidade de conta | Estabilidade dos preços | [Volatilidade e adoção monetária](./volatility.md) |
| Armazenagem de valor | Poder de compra futuro previsível | [Dinheiro Deflacionário](./deflationary-money.md), [Bitcoin como dinheiro](./bitcoin-as-money.md) |
| Padrão de pagamento diferido | Confiança na futura liquidação do contrato | [Bitcoin como dinheiro](./bitcoin-as-money.md) |

Uma moeda não precisa de marcar perfeitamente em todas as funções para ser economicamente significativo, historicamente, ouro funcionou bem, bem como uma loja de valor e unidade de conta durante séculos, enquanto sendo relativamente impraticável como um meio de troca do dia-a-dia para pequenas compras, que é parte do porquê ouro-apoiado notas de papel e moedas (ver [Moeda-mercadoria](./commodity-money.md)) desenvolveu-se ao seu lado.

## Conceitos errôneos comuns

**"Dinheiro" e "moeda com curso legal" não são sinônimos na análise econômica.** Estatuto do curso legal (um requisito do governo de que uma moeda deve ser aceita para dívidas) é um fato legal sobre uma moeda específica, não um requisito para algo para desempenhar funções monetárias. Cigarros funcionaram como um meio de troca, unidade de conta, e armazenamento de valor em campos de prisioneiros de guerra da Segunda Guerra Mundial (documentado no jornal de R.A. Radford 1945 "The Economic Organisation of a P.O.W. Camp") sem curso legal.

**Executar uma função monetária não significa automaticamente executar todos os três.** Os cartões de presente são um meio de troca amplamente aceito, estreito (em um varejista específico) mas são uma loja pobre de valor (valor nominal fixo, sem juros, risco de falência do varejista) e não são realmente uma unidade geral de conta.

## Outras leituras

- [Organização Econômica de um Campo P.O.W.](https://www.jstor.org/stable/2550133): R.A. Radford, Economica, 1945
- [Sobre a Origem do Dinheiro](https://mises.org/library/origin-money): Carl Menger, 1892

---

[← Anterior: O que é dinheiro?](./money.md)
·
[Voltar à Economia](./README.md)
·
[Próximo: Commodity Money →](./commodity-money.md)
