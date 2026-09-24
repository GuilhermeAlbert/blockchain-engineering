# Insetos Inteiros e Precisão

Contratos inteligentes contam unidades inteiras indivisíveis. Um token exibido com 18 casas decimais ainda armazena um saldo inteiro. Os preços, as taxas de juro, as acções, as taxas de câmbio, as percentagens e os valores ponderados em função do tempo necessitam, portanto, de regras explícitas de escala e arredondamento.

## As unidades pertencem ao desenho

O inteiro `1_000_000` pode significar uma escala de unidade base USDC, uma parte por milhão, ou um preço multiplicado por `10^6`O EVM não rastreia essa distinção. Uma fórmula pode digitar, compilar e executar enquanto combina unidades incompatíveis.

Escrever unidades ao lado de cada variável e derivar a dimensão do resultado antes da codificação. Se `assets` usa unidades de base token e `price` usa dólares multiplicados por `10^8`, seu produto usa token-dólares multiplicados pela escala combinada. A Divisão deve remover a escala correcta no ponto correto.

## Ordem de multiplicação e divisão

Divisão inteira trunca para zero. Avaliando `(a / b) * c` descarta o restante antes da multiplicação e pode produzir um resultado muito menor que `(a * c) / b`. Multiplicar primeiro preserva precisão, mas pode criar um valor intermediário maior. A solidez 0.8 verifica o excesso de aritmética normal e reverte, mas blocos, moldes, montagem e componentes de linguagem cruzada não controlados ainda podem envolver ou truncar.

Multiplicação de precisão completa e rotinas de divisão calculam expressões como `a * b / denominator` sem transbordar o produto intermédio. Eles ainda exigem uma direção de arredondamento escolhida.

## Valor das transferências arredondadas

O arredondamento é uma decisão econômica. Um cofre que arredonda ações recentemente cunhadas pode deixar os depósitos reivindicar mais ativos do que eles fornecidos. Um protocolo de empréstimo que arredonda a dívida pode lentamente subcotar os mutuários. Um cálculo de taxa que arredonda cada pequeno comércio para baixo pode vazar receita através da divisão de transações.

Escolha a direção contra a parte selecionando a entrada quando possível. Depósitos e levantamentos podem necessitar de regras opostas. Documente o erro máximo e os valores de teste em torno dos limites da escala, zero, uma unidade e a maior quantidade suportada.

Conversões repetidas podem acumular erros mesmo quando cada operação perde menos de uma unidade. Um atacante pode repetir uma operação favorável milhares de vezes ou dividir uma ação em muitas ações menores. Sequências de teste, não só uma chamada.

## Desfasamentos decimais

ERC-20 `decimals()` é uma convenção de exibição e tokens não usam todos o mesmo valor. Os oráculos também usam decimais específicos para alimentação. Assumindo 18 casas decimais para um token de seis decimais introduz um fator de um trilhão. A leitura de metadados de um token em tempo de execução só ajuda se o protocolo validar intervalos suportados e lidar com implementações incomuns ou revertendo.

Normalizar em limites definidos e manter unidades brutas internamente, quando possível. Valores em escala de nome para que os revisores possam ver a unidade, como `priceE8` ou `rateRay`, em vez de chamar cada inteiro `amount`.

## Testes que expõem falhas de precisão

Use testes de propriedade em toda a gama numérica. Conservação de assertos, monotonicidade, erro limitado e direção correta de arredondamento. Incluir tokens com 6, 8 e 18 casas decimais; preços abaixo de um; reservas muito grandes; depósitos minúsculos; condições do primeiro depósito; e viagens redondas repetidas. Compare a implementação inteira com um modelo de referência de alta precisão.

## Outras leituras

- [Tipos inteiros de solidez](https://docs.soliditylang.org/en/latest/types.html#integers)
- [Considerações relativas à segurança da solidez](https://docs.soliditylang.org/en/latest/security-considerations.html)
- Ver também: [Equilíbrios de Token](../tokens/balances.md), [Fórmula constante do produto](../defi/constant-product.md)

---

[← Anterior: Controle de Acesso](./access-control.md)
·
[Voltar à Segurança](./README.md)
·
[Próximo: Manipulação Oracle →](./oracle-manipulation.md)
