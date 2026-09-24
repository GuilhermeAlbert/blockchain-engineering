# Moedas estáveis garantidas

Uma moeda estável cripto-garantida é apoiada não por dólares em um banco, mas por outros ativos cripto bloqueados em um contrato inteligente, super-garantida especificamente para que uma queda no preço da garantia não quebra imediatamente a estaca. Este capítulo abrange precisamente o mecanismo, utilizando DAI/USDS (emitido pelo Sky Protocol, anteriormente MakerDAO; ver [MakerDAO / Sky](./maker.md) para o estudo de caso completo) como o exemplo trabalhado.

## Mecanismo principal: posições sobregarantidas da dívida

Um usuário bloqueia a garantia (históricamente principalmente ETH, agora um conjunto mais amplo de ativos aprovados) em um contrato inteligente chamado **cofre**, e pode, em seguida, menta stealcoins contra ele, mas apenas até alguma fração do valor atual da garantia, nunca a quantidade total. Se um usuário bloquear $150 de ETH, o protocolo pode permitir cunhar apenas $100 de stablecoin contra ele: a **Rácio de garantia de 150%**Esta lacuna existe especificamente para absorver as reduções de preço de garantia. Se o preço da ETH cair, o cofre permanece solvente (valor colateral ainda excede a dívida) até algum limite, dando ao sistema espaço para reagir antes de um cofre realmente subaquático.

```text
User locks:     $150 worth of ETH
User mints:     $100 worth of stablecoin (150% collateralization)
                          │
                    ETH price falls
                          │
                          ▼
Collateral now worth $120. Still exceeds the $100 debt, but the
safety margin has shrunk from 50% to 20%. If it falls further, past
a defined liquidation threshold, the position becomes eligible for
liquidation (see Liquidations) before debt could exceed collateral value.
```

## Por que sobre-colateralização, não 1:1

Uma crypto stablecoin 1:1-backed tornar-se-ia instantaneamente insolvente no momento em que o preço de sua garantia caiu mesmo ligeiramente. Haveria mais dívida (moedas em dívida) do que valor colateral apoiando-a, quebrando imediatamente a promessa de redenção. A sobre-colateralização constrói-se num buffer deliberado, e o protocolo [liquidação](./liquidations.md) existe um mecanismo específico para encerrar posições submarginadas *antes* eles realmente vão debaixo d'água, usando a mesma lógica geral como um call de margem em finanças tradicionais, mas automatizado e aplicado inteiramente por código de contrato inteligente em vez de um processo humano back-office.

## Mecanismos de estabilidade: mantendo o peg perto de $1

Over-colateralization sozinho não garante que a moeda estável realmente negocia em $1 no mercado aberto. Isso requer mecanismos adicionais que criem um incentivo de arbitragem para corrigir desvios:

- **A taxa de estabilidade**: efetivamente uma taxa de juro cobrada sobre a dívida cunhada, ajustável pela governança do protocolo para influenciar o quão atraente a cunhagem (e, portanto, aumentando a oferta) é relativa à demanda.
- **A Taxa de Poupança Dai / Taxa de Poupança Sky**: uma taxa paga aos titulares que trancam as suas moedas de estábulo num módulo de poupança designado, ajustável para influenciar o quão atraente *Exploração* a stablecoin é, retirando o suprimento da circulação ativa quando o peg precisa de suporte.
- **Arbitragem directa**: se a moeda estável negocia abaixo de $1, qualquer pessoa pode comprá-lo barato no mercado aberto e usá-lo para fechar (reembolsar) uma posição de dívida existente no valor total de $1 face, lucrando com a diferença e reduzindo a oferta circulante. Se negocia acima de $1, abrir um novo cofre e cunhar mais (vendeble acima de $1) é rentável, aumentando o fornecimento. Ambas as direções empurram o preço de mercado de volta para o peg $1 através de comum, descentralizado que procura de lucro em vez de qualquer partido central gerenciando ativamente.

## Conceitos errôneos comuns

**A sobre-colateralização não significa que o sistema detenha mais dólares do que emitiu em moedas estáveis.** Tem mais *valor* em outros ativos cripto, cujo preço pode cair em si; sobre-colateralização é um buffer contra volatilidade de garantia, não uma reivindicação sobre a detenção de moeda fiat real em reserva em tudo.

**A estabilidade da moeda estável criptolateralizada não é garantida apenas pelo código do protocolo, independentemente das condições de mercado.** Os preços de garantia extremos e rápidos caem, particularmente os suficientemente rápidos para ultrapassar a capacidade de reacção do mecanismo de liquidação. [Liquidações](./liquidations.md) e [Manipulação do Oracle](../security/oracle-manipulation.md), pode e causou real estresse e, em incidentes históricos específicos, perdas reais dentro desses sistemas.

## Outras leituras

- [Documentação do Protocolo Sky](https://docs.sky.money/)
- Ver também: [MakerDAO / Sky](./maker.md), [Liquidações](./liquidations.md)

---

[← Anterior: Moedas estáveis](./stablecoins.md)
·
[Voltar para DeFi](./README.md)
·
[Próximo: Centralized Stablecoins →](./centralized-stablecoins.md)
