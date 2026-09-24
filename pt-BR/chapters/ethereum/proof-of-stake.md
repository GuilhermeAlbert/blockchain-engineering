# Prova de Participação

Prova de participação substitui Bitcoin [prova de trabalho](../bitcoin/proof-of-work.md) Mecanismo de resistência à sibilância (ver [Ataques de Sybil](../distributed-systems/sybil-attacks.md)) com um recurso oneroso diferente: capital em jogo em vez de trabalho computacional. Este capítulo abrange o projeto específico de prova de participação de Ethereum, que começa a propor blocos, como a rede concorda com a cadeia canônica, e como o comportamento desonesto é punido.

## A substituição do núcleo

Recordar de [Ataques de Sybil](../distributed-systems/sybil-attacks.md#defesa-específica-do-bitcoin) que Bitcoin liga influência sobre o consenso a um recurso que é caro para adquirir em grandes quantidades, poder de hash computacional. Prova de que as estacas ligam essa mesma influência a um recurso de custo diferente: **éter bloqueado como estaca**, chamado de validador **depósito**. Ambos os mecanismos resolvem o problema subjacente idêntico (prevenindo a criação de identidades falsas baratas e ilimitadas de ganhar influência desproporcionada), através de diferentes mecanismos econômicos específicos com diferentes tradeoffs específicos, abrangidos diretamente [Finalidade](./finality.md#garantias-determinísticas-versus-probabilísticas-comparadas) e este livro é mais cedo tratamento geral em [Finalidade](../distributed-systems/finality.md#finalidade-econômica).

## Tornando-se um validador

Ethereum exige um depósito de validador de **32 ETH** para ativar como um validador, uma quantidade específica, definida por protocolo, não ajustável per-validator (alguém querendo apostar uma quantidade diferente ou executa múltiplos 32 validadores de ETH, ou participa através de um conjunto de staking, veja [Staking](./staking.md), o que permite que muitos participantes financiem validadores coletivamente sem que cada um individualmente tenha o total de 32 ETH).

## Slots e épocas

O tempo na camada de consenso de Ethereum é dividido em **slots**, fixas, janelas de 12 segundos, cada uma com exatamente um validador (selecionado pseudorandomly, ponderado pelo conjunto total do validador) atribuído para propor um bloco para esse slot. Cada 32 slots (6.4 minutos) constitui um **epoch**, a unidade sobre a qual os comités de validação são reorganizados e, criticamente, sobre a qual o mecanismo de finalidade (ver [Finalidade](./finality.md)) opera.

```text
Epoch (32 slots, 6.4 minutes)
├── Slot 1 (12s): validator A proposes a block; a committee of other
│                 validators attests to (votes on) the current head
├── Slot 2 (12s): validator B proposes; a different committee attests
├── ...
└── Slot 32 (12s): validator Z proposes; final committee attests
```

Nem todo slot necessariamente produz um bloco, se o validador atribuído estiver offline ou falhar em propor no tempo, esse slot está simplesmente vazio (um "slot perdido"), e a cadeia continua a partir da proposta do próximo slot.

## Atestados: como os validadores votam

Cada validador ativo, uma vez por época, submete um **atestado**, uma votação assinada especificando que bloco consideram o atual chefe de cadeia, e que posto de controle consideram justificado para fins de finalidade (ver [Finalidade](./finality.md#pontos-de-controle-justificação-e-finalização)). Estes atestados, agregados através do conjunto de validadores, são a regra de escolha de forks da Ethereum (**LMD-GHOST**, uma variante do [escolha do fork](../blockchain/fork-choice.md) o conceito, ponderado por atestar a participação dos validadores em vez de por prova de trabalho) utiliza para determinar a cadeia canônica, diretamente análoga em *finalidade* para a regra cumulativa-prova-de-trabalho de Bitcoin, mas calculada a partir de votos validadores em vez de trabalho computacional acumulado.

## Por que isso requer conhecer o conjunto de validadores, ao contrário do Bitcoin

Esta é uma diferença estrutural que vale a pena nomear diretamente: o protocolo de prova de participação de Ethereum precisa saber, precisamente, quem são os validadores atuais e quanto cada um apostou, um **autorizado-por-registro**, embora ainda abertamente unível, conjunto validador, rastreado explicitamente pelo próprio protocolo. A prova de trabalho do Bitcoin não precisa de registro equivalente. Qualquer um pode apontar o poder de hash na rede com zero registro, e o protocolo nunca precisa saber quem ou quantos mineradores existem. Trata-se de um verdadeiro tradeoff de concepção, e não apenas de um pormenor de implementação. É parte do motivo pelo qual a prova de participação pode alcançar uma finalidade mais rápida e estruturada (ver [Finalidade](./finality.md)) do que o modelo de participante não registrado do Bitcoin permite.

## Conceitos errôneos comuns

**Prova de estaca não significa "as pessoas com mais éter controlar tudo" em um sentido irrestrita**. Significa que a influência sobre a proposta de bloco e atestação é proporcional ao ETH apostado especificamente autorizado como um depósito de validador, sujeito a risco de corte (ver [Slashing](./slashing.md)) para o mau comportamento; simplesmente segurar o éter sem apostar não confere qualquer influência consensual.

**Os validadores de Ethereum não são a mesma coisa que os mineradores de Bitcoin em termos do que fazem fisicamente.**O trabalho de um validador é assinar atestados e ocasionalmente propor blocos, computacionalmente leves em comparação com a busca por hash de força bruta de Bitcoin; o "trabalho" em prova de participação é econômico (capital em risco), não computacional.

## Outras leituras

- [Especificações de consenso Ethereum](https://github.com/ethereum/consensus-specs)
- [ethereum.org: Prova de tomada](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/)

---

[← Anterior: The Merge](./the-merge.md)
·
[Voltar para Ethereum](./README.md)
·
[Próximo: Validadores →](./validators.md)
