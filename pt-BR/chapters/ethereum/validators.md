# Validadores

Um validador é um participante específico, cadastrado no consenso de prova de participação de Ethereum, distinto da ideia mais ampla de "tomar" em seguida [Staking](./staking.md), que é sobre como o 32 ETH apoiando um validador realmente é financiado e por quem. Este capítulo abrange o próprio ciclo de vida do validador: activação, funções activas e saída.

## A fila de ativação

Depositar 32 ETH não torna um validador ativo imediatamente, novos validadores digitam um **fila de ativação**, processados a uma taxa limitada pelo protocolo especificamente para limitar a rapidez com que o conjunto total de validadores (e, portanto, influência total sobre o consenso) pode crescer em qualquer período. Este limite existe para evitar um cenário em que um súbito e extremamente grande afluxo de novas participações poderia desestabilizar os pressupostos de consensos existentes, ponderados pelo validador, mais rapidamente do que o protocolo e o ecossistema mais amplo poderiam razoavelmente se adaptar.

## Equilíbrio efectivo

Um validador **equilíbrio eficaz** (o montante efectivamente utilizado para pesar a sua influência no consenso e para calcular recompensas e sanções) é calculado a partir do seu saldo real, mas nivelado a um máximo de (32 ETH, correspondente ao depósito mínimo) e actualizado apenas em incrementos discretos, não seguindo continuamente o saldo real exacto. Isso significa que um validador que tenha acumulado recompensas de apostas além de 32 ETH não ganha peso de consenso adicional do excesso, a menos que especificamente opte por executar um validador adicional separado com esse excesso, um projeto deliberado mantendo a influência de cada validador individual dentro de um intervalo limitado e previsível.

## Deveres: propor e atestar

Recordar de [Prova de Participação](./proof-of-stake.md#atestados-como-os-validadores-votam) que cada validador ativo submete um atestado uma vez por época, e é ocasionalmente atribuído para propor um bloco para um slot específico. De forma consistente e correta, estas funções ganham recompensas (nova emissão de ETH, atribuída especificamente aos validadores como seu análogo à prova de participação da mineração do Bitcoin [Subvenção por categoria](../bitcoin/block-rewards.md)); falta ou incorrectamente executá-los incorre em pequenas penalidades, uma estrutura de incentivo muito mais suave e contínua do que as punições mais severas e deliberadas cobertas em [Slashing](./slashing.md), que são reservados especificamente para comportamento desonesta, não meramente ausente ou equivocado.

## Saindo

Um validador pode voluntariamente sair, iniciando um processo de retirada que (como ativação) é limitado por uma taxa **fila de saída**, pela mesma razão de estabilidade sistêmica, a ativação é limitada em taxas: impedindo um cenário em que uma parcela muito grande de participação poderia sair simultaneamente e abruptamente, o que poderia desestabilizar os pressupostos de consenso da rede ou criar preocupações de liquidez e segurança em uma janela curta. Uma vez completamente terminado e passado qualquer atraso de retirada remanescente, ETH apostado de um validador (mais recompensas acumuladas, menos quaisquer penalidades) fica disponível para retirar para um endereço especificado.

## Conceitos errôneos comuns

**Depositar 32 ETH e tornar-se um validador ativamente participante não são o mesmo momento**. A fila de ativação significa que pode haver um atraso real e variável entre o depósito e realmente começar a ganhar recompensas e participar de consensos, um atraso que tem, em vários pontos da história pós-Merge de Ethereum, variado de negligenciáveis a muitos dias, dependendo de quantos outros validadores estão simultaneamente em fila.

**Um validador não é um hardware físico**. É uma identidade criptográfica (um keypair específico e depósito) que determinado hardware e software acontecem para executar tarefas em nome de; uma única máquina física pode executar muitos validadores, e as funções de um único validador pode, com configuração adequada de gestão de chaves, ser migrado entre diferentes máquinas físicas.

## Outras leituras

- [Especificações de consenso Ethereum, Beacon Chain](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md)

---

[← Anterior: Prova de Participação](./proof-of-stake.md)
·
[Voltar para Ethereum](./README.md)
·
[Próximo: Takeing →](./staking.md)
