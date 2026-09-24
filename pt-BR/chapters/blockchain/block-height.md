# Altura do Bloco

A altura do bloco é a posição do bloco na cadeia, contada a partir do bloco de gênese na altura 0. Este é um capítulo curto e focado. O conceito é simples, mas subjaz à terminologia ("confirmações", "a ponta da corrente", "profundidade do reorg") usada constantemente durante todo o resto deste livro.

## Definição

O bloco de gênese (ver [Blocos de Gênesis](./genesis-blocks.md)) é a altura 0. O bloco construído diretamente em cima dele é altura 1, o próximo é altura 2, e assim por diante. Porque cada bloco referencia exatamente um bloco anterior (ver [Hashes e Block Linking](./block-linking.md)), a altura aumenta exatamente em um com cada novo bloco, dando a cada bloco da cadeia canônica uma posição única e inequívoca.

## Altura versus confirmações

Estes dois conceitos relacionados são fáceis de confundir. **Altura** é uma posição absoluta: bloco 800.000 é sempre bloco 800.000, independentemente de quando você está olhando para ele. **Confirmações** (coberto na íntegra em [Confirmação da transação](../bitcoin/confirmation.md)) é uma contagem relativa em movimento: uma transação incluída no bloco 800.000 tem 1 confirmação uma vez que bloco 800.000 é a ponta, 2 confirmações uma vez bloco 800,001 é minado no topo, e assim por diante, a contagem de confirmação para uma determinada transação cresce cada vez que um novo bloco é adicionado, enquanto sua altura de bloco permanece fixa para sempre.

```text
Chain tip is currently block 800,003.

Transaction X, included in block 800,000:
  block height of inclusion: 800,000  (fixed, never changes)
  confirmations: 800,003 - 800,000 + 1 = 4  (grows as new blocks arrive)
```

## Por que só a altura não identifica "o" bloco nessa posição

Em condições normais, há exatamente um bloco em qualquer altura dada na cadeia que todos concordam. Mas durante um [reorganização da cadeia](./reorgs.md), dois blocos diferentes podem reivindicar brevemente a mesma altura em diferentes ramos concorrentes da cadeia. Apenas um deles, em última análise, permanece parte da cadeia canônica uma vez que a rede converge (ver [Escolha do fork](./fork-choice.md)). É por isso que a altura do bloco sozinho não é um identificador permanente para um bloco específico *conteúdo*. O hash próprio do bloco é o identificador permanente, inequívoco; a altura é melhor entendida como "a posição que um bloco ocupa atualmente em qualquer cadeia que um dado nó considere atualmente canônico".

## Conceitos errôneos comuns

**A altura do bloco não é a mesma que o número total de blocos que já existiram.** Blocos órfãos ou obsoletos (blocos que foram validamente extraídos, mas finalmente excluídos da cadeia canônica após um reorg, veja [Reorganizações da Cadeia](./reorgs.md)) não contam em direção à altura; altura apenas faixas posição dentro da corrente canônica atualmente aceita.

**Uma altura de bloco maior não, por si só, torna uma cadeia mais válida.** [Escolha do fork](./fork-choice.md) é determinado pela prova cumulativa do trabalho, que é normalmente, mas nem sempre, correlacionado com a altura, em circunstâncias incomuns (uma súbita dificuldade temporária de descompasso entre ramos concorrentes), uma cadeia mais curta por altura poderia, em princípio, ter mais trabalho cumulativo, embora isso seja raro na prática dada a forma como o ajuste da dificuldade de Bitcoin funciona.

## Outras leituras

- [Bitcoin Referência do desenvolvedor principal: Cadeia de blocos](https://developer.bitcoin.org/reference/block_chain.html)

---

[← Anterior: Blocos de Gênesis](./genesis-blocks.md)
·
[Voltar para Blockchain Fundamentos](./README.md)
·
[Próximo: Bloco Tempo →](./block-time.md)
