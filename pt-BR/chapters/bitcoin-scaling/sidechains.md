# Cadeias laterais

Uma sidechain é uma blockchain separada, executando suas próprias regras de consenso, conectada ao Bitcoin através de um mecanismo que permite que o bitcoin se mova entre as duas cadeias. O presente capítulo abrange o conceito geral; [Rede líquida](./liquid.md), [Federações](./federations.md), e [Cadeias Estatais](./statechains.md) cobrir implementações específicas, reais e variantes construídas sobre esta ideia.

## A ideia central

Uma sidechain permite que desenvolvedores experimentem recursos que as próprias regras de consenso de camada de base do Bitcoin não suportam (tempos de bloqueio mais rápidos, propriedades de privacidade diferentes, funcionalidade de contrato inteligente) sem precisar dessas alterações para passar pela própria Bitcoin, deliberadamente conservadora [processo de governança](../forks/governance.md), e sem colocar a segurança da camada base de Bitcoin diretamente em risco do próprio sidechain, potencialmente menos código testado. Os usuários movem o bitcoin para uma cadeia lateral (um "peg-in"), transacionam sob as próprias regras da cadeia lateral, e podem mover o valor para trás (um "peg-out") quando feito.

## O mecanismo do peg

O padrão geral: bitcoin enviado para um endereço específico controlado por sidechain Bitcoin está bloqueado na camada base do Bitcoin, e uma quantidade equivalente de uma representação sidechain-native é emitida na cadeia lateral. Retroceder requer o inverso: queimar ou bloquear os tokens sidechain-native, em seguida, liberar o bitcoin bloqueado correspondente na camada base. Exatamente. *Quem ou o quê?* controla o bitcoin bloqueado durante este processo, e como peg-outs são autorizados, é a decisão de projeto mais conseqüente para qualquer sidechain. Determina diretamente o modelo de confiança real da sidechain, independentemente de como o próprio consenso interno da sidechain funciona.

```text
Bitcoin base layer                    Sidechain
  Alice's BTC ──► locked in a    ──►    equivalent tokens
                  peg address           issued to Alice
                       ▲                       │
                       │                       │
                       └── released when ◄─────┘
                           peg-out is
                           authorized
```

## O espectro de confiança

As cadeias laterais variam enormemente na forma como os peg-outs são autorizados, e esta variação é o eixo central em que devem ser avaliados:

- **Chains laterais federados** (ver [Federações](./federations.md)) dependem de um conjunto conhecido e fixo de "funcionários" ou "vigilantes" para autorizar coletivamente peg-outs, um modelo de confiança significativamente mais centralizado do que o próprio consenso sem permissão de Bitcoin, uma vez que exige confiar que os membros da federação não colaborem para roubar fundos bloqueados.
- **Cadeias de transmissão** (uma proposta, ainda não implantada na rede principal Bitcoin, design) em vez disso, teria os próprios mineradores Bitcoin votar em peg-out validade através de um mecanismo de sinalização de cabeçalho de bloco estendido, um modelo de confiança diferente, mudando a confiança no conjunto de mineradores existentes do Bitcoin em vez de uma federação separada, com seus próprios tradeoffs distintos e debatidos que não alcançaram o consenso necessário para a implantação real a partir desta escrita.

## Por que essa questão de confiança importa tanto

O consenso interno de uma sidechain pode ser tão descentralizado e seguro quanto seus projetistas escolhem fazê-lo, mas o **peg** é onde a garantia de segurança de uma sidechain é realmente limitada, se a entidade ou mecanismo de controle de peg-outs pode ser comprometida ou pode agir desonestamente, fundos bloqueados no lado Bitcoin estão em risco, independentemente de quão bem o sidechain em si de outra forma opera. É por isso que as reivindicações de segurança da sidechain devem sempre ser avaliadas especificamente no mecanismo de peg, não apenas no próprio projeto de consenso da sidechain, uma distinção de estudos de caso específicos desta seção (Liquid, statechains) retornar diretamente.

## Conceitos errôneos comuns

**Uma cadeia lateral não é a mesma coisa que um rollup de camada 2** no sentido coberto em [Camada 2](../layer2/README.md)A sidechain executa seu próprio mecanismo de consenso independente e não herda sua segurança diretamente da cadeia de base da forma como a validade de um rollup ou provas de fraude vinculam seu estado de volta à camada de liquidação; a segurança de uma sidechain é uma questão separada da segurança própria de Bitcoin, conectada apenas através do peg.

**Bitcoin bloqueado em um pig sidechain não é literalmente o mesmo bitcoin circulando ativamente na camada base do Bitcoin durante esse tempo**. Está bloqueado, ilíquido na camada de base, e representado por um token sidechain-native até que um peg-out termine; confundindo os dois overstates como diretamente uma sidechain "extende" a própria segurança da camada de base do Bitcoin.

## Outras leituras

- Ver também: [Rede líquida](./liquid.md), [Federações](./federations.md), [Propostas de Rollup de Bitcoin](./rollups.md)

---

[← Anterior: Canais de pagamento](./payment-channels.md)
·
[Voltar para Bitcoin Scaleing](./README.md)
·
[Próximo: Rede líquida →](./liquid.md)
