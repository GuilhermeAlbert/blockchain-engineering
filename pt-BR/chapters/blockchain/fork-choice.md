# Escolha do fork

Quando um nó vê duas ou mais cadeias válidas concorrentes (a situação descrita em [Reorganizações da Cadeia](./reorgs.md)) precisa de uma regra precisa, determinística para decidir qual tratar como canônico. Este capítulo cobre exatamente essa regra, porque "a cadeia mais longa ganha" (a abreviatura comum) é uma simplificação imprecisa do que Bitcoin realmente faz.

## A regra, precisamente

A regra de escolha do fork do Bitcoin é: **aceitar a cadeia válida com a maior prova cumulativa de trabalho**, não a corrente com mais blocos. Estes são normalmente, mas nem sempre, a mesma coisa. O trabalho cumulativo é calculado somando-se o trabalho esperado para produzir o hash de cada bloco, uma vez que o alvo de dificuldade desse bloco na época, um bloco minado em maior dificuldade contribui mais para o trabalho cumulativo de uma cadeia do que um bloco extraído em menor dificuldade, mesmo que cada um ainda conte exatamente um bloco em direção à altura.

## Por que trabalhar, não a contagem de blocos

Considere dois ramos concorrentes: um com 10 blocos extraídos em uma dificuldade baixa, outro com 9 blocos extraídos em uma dificuldade muito maior. Se a maior dificuldade da cadeia de 9 blocos significa que realmente representa mais esforço computacional total esperado do que a cadeia de 10 blocos, a rede adota o **Cadeia de 9 blocos** apesar de ser mais curto por contagem, porque o trabalho cumulativo, não a contagem de blocos, é o que prova-de-trabalho é realmente [Prova de Trabalho](../bitcoin/proof-of-work.md)). Este cenário é incomum na prática (Bitcoin's [ajuste de dificuldade](../bitcoin/difficulty-adjustment.md) geralmente mantém ambos os ramos em dificuldade semelhante se divergiram recentemente) mas é a afirmação matematicamente correta da regra, e é importante para entender por que "cadeia mais longa" é uma simplificação em vez do mecanismo literal.

## Exemplo: como um nó aplica a regra

```text
Node currently follows Chain A (tip at block 105, cumulative work: W_A)

Node receives a new block extending a previously unseen Chain B
(tip at block 104, cumulative work: W_B)

If W_B > W_A:
    node discards Chain A from the fork point onward,
    adopts Chain B as canonical (a reorg, per Chain Reorganizations)
Else:
    node keeps following Chain A, and simply stores Chain B's blocks
    as known-but-not-canonical, in case a future block extends it
    past W_A later
```

Os nós não descartam blocos pertencentes a uma corrente perdida. Eles normalmente os mantêm por algum período, porque um ramo que perde atualmente ainda pode se tornar o vencedor se ele recebe mais trabalho antes do ramo que ganha atualmente. Isto é o que permite que um nó manuseie corretamente um reorg imediatamente, sem necessidade de re-download de dados que já havia validado.

## Sob o capô: por que esta regra é resistente a Sybil

Isto liga- se diretamente de volta para [Ataques de Sybil](../distributed-systems/sybil-attacks.md): porque a regra de escolha do fork pesa correntes por prova de trabalho e não por qual cadeia mais *nós* A alegação está correta, um atacante não pode ganhar simplesmente executando mais nós ou transmitindo mais alto. Eles têm que realmente produzir mais trabalho computacional cumulativo do que a cadeia honesta, um custo que não encolhe, não importa como o esforço do atacante é distribuído através de identidades falsas.

## Comércio

Uma regra baseada no trabalho cumulativo é inequívoca e dá a cada nó a mesma resposta determinística dada a mesma informação, que é essencial para que a rede converja de forma confiável em uma cadeia. Seu custo é exatamente aquele coberto em [Teorema da PAC](../distributed-systems/cap.md) e [Finalidade](../distributed-systems/finality.md): a resposta "direita" pode mudar à medida que novos blocos chegam e deslocam o equilíbrio cumulativo de trabalho, razão pela qual a confiança na permanência de qualquer bloco específico cresce apenas gradualmente, em vez de ser resolvido no instante em que um bloco é criado.

## Conceitos errôneos comuns

**A "cadeia mais longa" é uma abreviatura comum, útil, mas não uma descrição totalmente precisa da regra real.** O whitepaper de Bitcoin em si usa a linguagem "cadeia mais longa" informalmente em lugares enquanto o mecanismo subjacente que descreve é a prova cumulativa do trabalho. A implementação real do Bitcoin Core segue precisamente a regra do trabalho cumulativo, e as descrições baseadas em blocos devem ser entendidas como uma aproximação que se mantém no caso esmagadoramente comum, onde a dificuldade não apenas mudou drasticamente entre ramos concorrentes.

**A escolha do fork não requer nenhum nó para comunicar sua preferência a qualquer outro nó.** Cada nó aplica a mesma regra determinística independentemente de quaisquer correntes que tenha observado, o acordo emerge de cada nó que atinge a mesma conclusão dado o mesmo (eventualmente compartilhado) dados, não de qualquer processo de votação ou negociação.

## Outras leituras

- [Whitepaper Bitcoin, Seção 5 (Rede)](https://bitcoin.org/bitcoin.pdf)
- [Bitcoin Referência do desenvolvedor principal: Cadeia de blocos](https://developer.bitcoin.org/reference/block_chain.html)

---

[← Anterior: Regras de consenso](./consensus-rules.md)
·
[Voltar para Blockchain Fundamentos](./README.md)
·
[Próximo: Sem Permissão vs Redes Permitidas →](./permissionless-vs-permissioned.md)
