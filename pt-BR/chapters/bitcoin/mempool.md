# O Mempool

O mempool ("memory pool") é o conjunto de transações válidas e não confirmadas que um nó atualmente conhece e está preparado para retransmitir ou incluir em um bloco. Este capítulo cobre o que realmente é, porque é local para cada nó em vez de uma única lista global, e a mecânica específica de priorização e substituição baseada em taxas.

## O que é, precisamente

Quando um nó recebe uma nova transação, ele verifica a transação contra regras de consenso e suas próprias regras de política local (ver [Regras de Consenso](../blockchain/consensus-rules.md)). Está corretamente assinado, fazer suas entradas de referência saídas reais não gastas, ele atende a taxa de relé mínima deste nó. Se passar, o nó adiciona-o ao seu mempool: uma coleção in-memory (não persistiu na blockchain, daí o nome) de transações aguardando inclusão em um bloco futuro. Um minerador que monta um novo bloco normalmente seleciona transações de seu próprio mempool, geralmente priorizando transações de taxa mais alta primeiro, até o limite de peso do bloco.

## Por que o mempool não é uma lista global compartilhada

Trata-se de um mal-entendido comum e consequente: **Não há nenhum mempool único e autoritário.** Cada nó mantém seu próprio, com base em quais transações ele viu e quais regras de política que ele aplica. Dois nós podem, e muitas vezes brevemente, ter conteúdos de mempool um pouco diferentes, especialmente nos segundos imediatamente após uma nova transação é transmitida, antes de ter propagado completamente através da rede (ver [Redes de pares a pares](../distributed-systems/p2p.md)). Exploradores de bloco e serviços de avaliação de taxas que mostram "o mempool" estão mostrando *seus próprios nós* view, que é geralmente representativo do estado da rede mais ampla, mas não de uma fonte de verdade formalmente sincronizada.

## Despejo e limites de Mempool

Como o espaço de mempool (RAM) é finito, nós aplicam políticas de despejo quando o mempool cresce muito grande, normalmente caindo as transações de taxa mais baixa primeiro para dar espaço para novas e mais altas. Uma transação que está não confirmada por um período prolongado (o padrão do Bitcoin Core é de 14 dias) também é tipicamente retirada do mempool inteiramente se não tiver sido confirmada até então, embora esta seja uma política de nó local, não uma regra de consenso. A transação permanece teoricamente válida e ainda poderia ser confirmada se retransmitisse e pegasse por um minerador.

## Substituir por Fee

Introduzido em [Taxas de transação](./fees.md#substituir-por-fee-rbf), **Substituir por Fee (RBF)**, padronizado no BIP 125, permite que um remetente substitua uma transação não confirmada por uma nova versão gastando os mesmos insumos, mas pagando uma taxa maior. Útil quando uma transação foi transmitida com uma taxa muito baixa para ser confirmada em um tempo razoável. Para que a RBF se aplique, a transação original deve sinalizar explicitamente (através de um número de sequência abaixo `0xfffffffe`), e a substituição deve cumprir regras específicas (pagando uma taxa absoluta estritamente mais elevada e taxa de taxa, entre outros no BIP 125) projetado para evitar que a RBF seja maltratada para spam a rede com ofertas de taxa concorrentes sem custo real.

## Substituição completa por Fee versus opt-in

Bitcoin O núcleo historicamente suportado **Opt-in RBF**, onde uma transação sinalizou que era substituível. O Bitcoin Core 28.0 alterou o valor por omissão de `mempoolfullrbf` para `1`, então um nó padrão pode aceitar substituições mesmo quando a transação original não sinalizou substituibilidade. Esta é a política de relé, não o consenso, e os operadores podem configurá-la. A mudança também reforça por que um pagamento não confirmado não é final. Ver [Bitcoin Core 28.0 notas de lançamento](https://bitcoincore.org/en/releases/28.0/).

## Conceitos errôneos comuns

**Uma transação "congestionada" no mempool não é perdida ou falhou**. Permanece uma transação válida, pendente que pode eventualmente confirmar (se as taxas cairem ou a demanda da rede cair), ser substituído via RBF, ou eventualmente ser retirado de mempools de nós individuais após seu período de expiração local, em que ponto pode precisar ser retransmitido para ser visto novamente.

**Tamanho e conteúdo de Mempool não são algo que qualquer partido controla ou pode manipular globalmente**. Cada nó forma sua própria visão com base no que observa e sua própria configuração política, consistente com o projeto geral peer-to-peer, no-central-autority coberto em [Redes de pares a pares](../distributed-systems/p2p.md).

## Outras leituras

- [BIP 125: Sinalização Opt-in substituta completa](https://github.com/bitcoin/bips/blob/master/bip-0125.mediawiki)
- [Bitcoin Referência do desenvolvedor principal: Transações](https://developer.bitcoin.org/reference/transactions.html)

---

[← Anterior: Taxas de transação](./fees.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Confirmação de Transação →](./confirmation.md)
