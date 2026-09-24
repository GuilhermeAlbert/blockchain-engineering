# Reorganizações da Cadeia

Uma reorganização de cadeia ("reorg") acontece quando um nó muda de uma versão da cadeia recente para uma versão diferente, concorrente que agora considera mais válida. Este capítulo cobre por que reorgs acontecem, por que eles são uma parte normal e esperada do projeto de Bitcoin em vez de um mau funcionamento, e como reorgs profundos diferem significativamente dos rasos, de rotina.

## Por que reorgs acontecem em tudo

Recordar de [Redes de pares a pares](../distributed-systems/p2p.md) e [Teorema da PAC](../distributed-systems/cap.md) A rede do Bitcoin não tem sincronização instantânea e perfeita. Os dados levam tempo para se propagar, e isso é uma consequência inevitável de operar em uma rede real, global e descentralizada, sem coordenador central. Por causa disso, é inteiramente possível para dois mineradores diferentes, em diferentes partes da rede, para cada um encontrar um bloco válido quase ao mesmo tempo, ambos construindo no mesmo bloco anterior. Para uma breve janela, nós diferentes vêem diferentes "pontas" da cadeia, dependendo de qual dos dois blocos os atingiu primeiro.

```text
                    Block 100
                    /        \
            Block 101a        Block 101b
          (found by miner A)  (found by miner B, nearly simultaneously)

Nodes near miner A initially see 101a as the tip.
Nodes near miner B initially see 101b as the tip.
This is a temporary fork — both blocks are individually valid.
```

## Como resolve

Por [regra de escolha do fork](./fork-choice.md), nós sempre adotar qualquer cadeia válida tem a maior prova cumulativa de trabalho. No cenário acima, qualquer ramo recebe o *próxima* bloco primeiro (por exemplo, um bloco 102 construído em cima de 101a) agora tem mais trabalho cumulativo do que o outro ramo. Nós que estavam seguindo 101b **reorganizar**: eles descartam o bloco 101b (que se torna um bloco velho ou órfão, suas transações retornam para o mempool se eles também não foram incluídos em 101a) e adotam a cadeia 101a → 102.

```text
                    Block 100
                    /        \
            Block 101a        Block 101b   ← orphaned once 101a's branch pulls ahead
                 │
            Block 102          ← this branch now has more cumulative work
                 │
                 ▼
           network converges on this chain
```

Este tipo de reorg raso de um bloco acontece rotineiramente na rede do Bitcoin. É uma consequência direta e esperada da finalidade probabilística e atraso normal de propagação (ver [Finalidade](../distributed-systems/finality.md)), nenhum sinal de um ataque ou um bug. É precisamente por isso que uma transação com zero ou uma confirmação carrega significativamente mais incerteza do que uma com vários, veja [Finalidade Probabilística](../distributed-systems/probabilistic-finality.md) para os números reais por trás dessa incerteza.

## Reorgs profundos: uma categoria diferente

A **reorg profundo** (descartar muitos blocos, não apenas um) é um evento fundamentalmente diferente e muito mais sério. Exige uma cadeia alternativa para ter acumulado mais prova de trabalho total do que muitos blocos do valor da saída da rede honesta, que (por análise em [Finalidade Probabilística](../distributed-systems/probabilistic-finality.md)) requer ou um minerador honesto extraordinariamente sortudo trabalhando sozinho por um período prolongado, ou um ataque sustentado e caro por um partido que controla uma grande parte do poder de hash de rede (ver [51% Ataques](../bitcoin/51-percent-attacks.md)). Reorgs profundos na rede principal de Bitcoin são, até o momento, eventos históricos extremamente raros, e sua raridade é em si mesmo evidência de que o poder de hash honesto da rede permaneceu grande em relação a qualquer ação adversa ao longo da história de Bitcoin. Esta é uma observação empírica e contínua sobre a história operacional de Bitcoin, não uma garantia matemática permanente.

## Exemplo: o que um reorg significa para uma transação específica

Se uma transação foi incluída apenas no bloco descartado (101b no exemplo anterior) e não no bloco vencedor (101a), essa transação não é mais confirmada. Ele retorna ao mempool como uma transação não confirmada (assumindo que ainda é válido contra o estado da nova cadeia) e precisa ser incluído em um bloco futuro para ser confirmado novamente. Este é o cenário exato contra o qual os comerciantes e as trocas estão protegendo quando eles esperam por múltiplas confirmações antes de tratar um pagamento como final: uma transação com várias confirmações por trás dela precisaria ser parte de um reorg muito mais profundo, muito menos provável para ser não confirmado do que uma transação que acabou de chegar.

## Comércio

Permitir reorgs em tudo é uma consequência direta da escolha da disponibilidade sobre a consistência estrita, instantânea (ver [Teorema da PAC](../distributed-systems/cap.md)). A alternativa seria um sistema que para ou requer intervenção manual sempre que ocorre uma discordância temporária sobre a ponta da corrente, o que tornaria Bitcoin muito menos utilizável como uma rede global sempre disponível. O custo é que nenhuma confirmação única, tomada isoladamente, oferece certeza absoluta, apenas crescente confiança estatística, como coberto por [Finalidade Probabilística](../distributed-systems/probabilistic-finality.md).

## Conceitos errôneos comuns

**Um reorg não é evidência de um ataque ou falha de segurança.** Reorgs de um bloco são uma consequência rotineira, esperada e bem compreendida do atraso normal de propagação da rede, ocorrendo naturalmente sem qualquer comportamento adverso envolvido.

**Blocos "órfãos" e "estaleiros" às vezes são usados de forma ligeiramente diferente entre fontes.**: alguns usam "órfão" especificamente para um bloco cujo pai ainda não foi recebido (um bloco visto fora de ordem), e "stale" para um bloco validamente conectado que mais tarde foi excluído da cadeia canônica por um reorg. Este livro usa "stale" para este último, significado mais comum discutido aqui, e sinaliza a variação de terminologia explicitamente uma vez que o uso não é totalmente padronizado em toda a literatura Bitcoin.

## Outras leituras

- [Whitepaper Bitcoin, Seção 5 (Rede) e Seção 11 (Calculações)](https://bitcoin.org/bitcoin.pdf)

---

[← Anterior: Tempo de bloco](./block-time.md)
·
[Voltar para Blockchain Fundamentos](./README.md)
·
[Próximo: Regras de consenso →](./consensus-rules.md)
