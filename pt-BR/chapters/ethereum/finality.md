# Finalidade

Este capítulo encerra a seção Ethereum, retomando um conceito introduzido em geral [Finalidade](../distributed-systems/finality.md): Mecanismo de finalidade específico de Ethereum, **Casper FFG** (Friendly Finality Gadget), e exatamente como difere do modelo puramente probabilístico de Bitcoin.

## Pontos de controle, justificação e finalização

Casper FFG opera em **pontos de controle**, especificamente, o primeiro bloco de cada época (ver [Prova de Participação](./proof-of-stake.md#slots-e-épocas)). Os atestados dos validadores não votam apenas no atual cabeçote da cadeia; também votam em que posto de controle consideram válido, construindo em direção a dois limiares sucessivos:

1. **Justificado**: um ponto de controle justifica-se uma vez atestados que representem, pelo menos, **Dois terços do total de ETH em jogo** votar nele (tecnicamente, para o `(source, target)` par de checkpoint exigido pelas regras exatas de votação do protocolo).
2. **Finalizado**: um ponto de controle fica finalizado uma vez que o **próxima** checkpoint depois que também se justifica, dois checkpoints justificados consecutivos finalizam o anterior.

```text
Epoch N checkpoint    Epoch N+1 checkpoint
   justified?    ──►      justified?
       │                      │
       └──── both justified ──┘
                  │
                  ▼
      Epoch N checkpoint is now FINALIZED
```

## O que a finalização realmente garante

Assim que um ponto de controle for finalizado, revertê-lo exigiria que um atacante controlasse pelo menos **Um terço do ETH total em jogo** e estar disposto a ter toda essa participação **cortado** (ver [Slashing](./slashing.md)), uma vez que reverter um checkpoint finalizado requer necessariamente validadores para violar as mesmas regras de dupla votação corte é especificamente projetado para pegar e punir. Isso dá à finalidade de Ethereum um caráter significativamente diferente do de Bitcoin: não é "incresmente improvável com mais confirmações" (modelo de Bitcoin, coberto com sua fórmula real em [Finalidade Probabilística](../distributed-systems/probabilistic-finality.md)) mas "exigiria deliberadamente, provavelmente destruindo uma quantidade específica, enorme, quantificável de capital real", o **finalidade econômica** conceito introduzido em geral em [Finalidade](../distributed-systems/finality.md#finalidade-econômica).

## Garantias determinísticas versus probabilísticas, comparadas

| | Bitcoin | Ethereum (após a fusão) |
| --- | --- | --- |
| Tipo de finalidade | Probabilística | Controles justificados/finalizados (finalidade econômica) |
| Tempo típico para uma forte confiança | Várias confirmações (muitas vezes ~ 1 hora para um valor elevado) | Duas épocas (~12.8 minutos) para a finalização |
| O que a reversão requer | Mais poder de hash cumulativo do que a cadeia honesta, sustentada | Cerca de 1/3 da participação total, disposta a ser cortada |
| Estilo de garantia | Abordagens de probabilidade (nunca atinge) zero | A inversão é possível mas economicamente autodestrutiva finalização passada |

## Por que este design de duas camadas (justificado, então finalizado), nem um único passo

Obrigação **dois consecutivos** checkpoints justificados, em vez de finalizar imediatamente em um único checkpoint atingindo o limiar de dois terços, é uma margem de segurança deliberada: protege contra um cenário em que um checkpoint atinge o limite devido a um padrão temporário e incomum de atestados (talvez durante uma partição de rede ou um comportamento de validação incomum) que não reflete um consenso duradouro e sustentado, exigindo o *próxima* o ponto de verificação para também atingir de forma independente o mesmo limiar fornece a confirmação de que o estado justificado reflete um acordo estável e contínuo, não uma anomalia estatística ou adversa.

## Conceitos errôneos comuns

**Os blocos finalizados de Ethereum não são matematicamente, absolutamente irreversíveis.** no mesmo sentido uma prova formal estabelece algo como logicamente impossível. Revertê-los é possível em princípio, mas apenas a um custo econômico específico, enorme e precisamente quantificável (a redução de cerca de um terço de todos os ETH em jogo), que é uma garantia diferente, embora na prática extremamente forte, tipo de impossibilidade matemática.

**"Confirmado" (um bloco simplesmente sendo adicionado à cadeia) e "finalizado" (sobrevivendo ao processo de justificação-então-finalização) não são a mesma coisa em Ethereum**Um bloco não finalizado, recentemente adicionado, ainda pode, em princípio, ser reorganizado em algumas circunstâncias, semelhante em espírito (embora diferente no mecanismo exato) aos reorgs rasos de Bitcoin cobertos em [Reorganizações da Cadeia](../blockchain/reorgs.md); finalização é a garantia mais forte, mais tarde.

## Outras leituras

- [Casper, o Gadget de Finalidade Amigo](https://arxiv.org/abs/1710.09437): Buterin & Griffith, 2017
- [Especificações de consenso Ethereum, Casper FFG](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md)

---

[← Anterior: Slashing](./slashing.md)
·
[Voltar para Ethereum](./README.md)
·
[Próximo: O EVM →](../evm/README.md)
