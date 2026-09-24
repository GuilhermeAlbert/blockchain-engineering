# Federações

Este capítulo generaliza o modelo de confiança da federação introduzido concretamente em [Rede líquida](./liquid.md), uma vez que é um padrão recorrente através de escala Bitcoin e ecossistema sidechain, não algo específico para qualquer único projeto.

## O padrão geral

Uma federação é um conjunto fixo, conhecido de partidos que controlam coletivamente alguma função (mais comumente, autorizando movimentos de fundos) tipicamente através de um esquema multisig ou limiar-assinatura que exige um quórum definido (M de membros N) para agir. Esta é estruturalmente a mesma ideia que o [multisig](../wallets/multisig.md) carteiras cobertas na seção Wallets, aplicadas em uma escala maior, mais institucional: em vez de um indivíduo segurando 2-de-3 chaves pessoalmente, os membros de uma federação são organizações separadas, tipicamente identificadas publicamente, cada um garantindo e controlando sua própria chave.

## Por que as federações existem como uma escolha de design

Federações ocupam um meio-termo deliberado entre dois extremos: um único, totalmente centralizado guarda (rápido e simples, mas um único ponto de fracasso e confiança) e o próprio Bitcoin totalmente sem permissão, consenso comprovado do trabalho (máximo descentralizado e minimizado pela confiança, mas lento e intensivo em recursos para iniciar um novo sistema). Uma federação de, digamos, 15 instituições conhecidas e respeitáveis que exigem 11 para concordar oferece significativamente mais resiliência do que qualquer único guardião (nenhum compromisso de um membro ou desonestidade por si só pode roubar fundos), enquanto sendo muito mais rápido para estabelecer e operar do que construir e garantir uma rede totalmente nova, sem permissão de prova de trabalho do zero, um comércio genuíno, se intermediário, em vez de uma alternativa estritamente pior para a plena descentralização.

## O que a segurança de uma federação realmente depende

A segurança prática de uma federação assenta em várias propriedades distintas, independentemente importantes: **honestidade** de membros individuais suficientes (sem conluio entre quórum), **Segurança operacional** da gestão-chave de cada membro (uma federação só é tão forte como a sua custódia-chave individual mais mal assegurada), e **diversidade e independência** dos próprios membros, uma federação de instituições todas sujeitas à mesma jurisdição, a mesma pressão regulatória, ou com propriedade comum não divulgada fornece garantias de segurança significativamente mais fracas do que uma composta por membros genuinamente independentes, de localização diversa e de regulação diversa, mesmo que o limiar nominal M-of-N pareça idêntico no papel.

## Onde mais este padrão aparece

Além de cadeias laterais Bitcoin como Liquid, modelos de confiança federated aparecem em todo o ecossistema blockchain mais amplo coberto mais tarde neste livro: muitos cross-chain [pontes](../layer2/bridges.md) utilizar validação federada ou baseada em multisig para autorizar transferências de ativos entre cadeias, e alguns projetos iniciais de oráculo blockchain (ver [Oráculos](../defi/oracles.md)) dependem de um conjunto federado de provedores de dados em vez de um mecanismo totalmente minimizado pela confiança. Reconhecer o padrão em um contexto (funcionários do Liquid) torna mais fácil avaliar corretamente o mesmo tradeoff de confiança subjacente quando ele se repete em outro lugar sob um nome diferente.

## Conceitos errôneos comuns

**Uma federação não é inerentemente não confiável ou um design menor**, para casos específicos de uso em que os custos totais de descentralização sem permissão (velocidade, requisitos de recursos) superam seus benefícios em relação ao modelo de ameaça real, uma federação bem projetada com membros verdadeiramente diversos e responsáveis pode ser um comércio de engenharia razoável, honesto, e não um compromisso de corte de esquina.

**"Federado" não especifica um determinado limiar ou membro que tem a sua própria conta**, as propriedades de segurança reais de qualquer federação específica dependem inteiramente de seus parâmetros específicos de M-of-N e composição dos membros, que variam consideravelmente entre diferentes sistemas reais e devem ser avaliadas individualmente em vez de assumidas a partir do rótulo.

## Outras leituras

- Ver também: [Rede líquida](./liquid.md), [Multisig](../wallets/multisig.md), [Pontes](../layer2/bridges.md)

---

[← Anterior: Rede líquida](./liquid.md)
·
[Voltar para Bitcoin Scaleing](./README.md)
·
[Próximo: Statechains →](./statechains.md)

