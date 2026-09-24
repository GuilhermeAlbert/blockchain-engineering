# Pools de Mineração

Um pool de mineração permite que muitos mineradores individuais combinam seu poder de haxixe, compartilhando qualquer recompensa que qualquer participante do pool ganha proporcionalmente, ao invés de cada minerador competindo inteiramente sozinho. Este capítulo cobre porque existem pools, como os pagamentos são realmente calculados, e a preocupação de centralização que eles introduzem, uma tensão genuína, documentada na operação prática de Bitcoin, não hipotética.

## Por que pools existem: redução da variância

De acordo com o [Mineração](./mining.md#variância-e-porque-existem-pools), um minerador individual com uma pequena parcela do poder de hash total de rede enfrenta genuína, às vezes extrema variância na frequência com que eles encontram pessoalmente um bloco, alguém com 0,01% do poder de hash de rede pode, em média, esperar encontrar um bloco aproximadamente uma vez a cada sete anos em escala de rede atual, mas poderia facilmente ir consideravelmente mais sem recompensa em tudo, puramente por acaso. Um pool converte isto em pequenos, frequentes, pagamentos previsíveis por ter o operador do pool distribuir qualquer recompensa *qualquer* o participante encontra em todos os participantes contribuintes, ponderados pelo quanto cada trabalho contribuiu, a mesma recompensa total esperada, mas com variância drasticamente reduzida para cada participante individual.

## Como os pagamentos do pool realmente funcionam

Os participantes da pool não procuram diretamente um hash completo e válido. Eles procuram **acções**: hashes que atendem a um limiar muito mais fácil e específico do que a dificuldade real da rede requer, mas que ainda demonstram que o trabalho genuíno foi realizado (uma vez que encontrar uma ação requer o mesmo processo de busca subjacente, apenas contra um alvo mais fácil). O operador do pool rastreia quantas ações cada participante submete, e quando qualquer participante no pool acontece de encontrar um hash que *real* dificuldade de rede (uma "solução completa", que é também, necessariamente, uma ação válida), a recompensa de bloco resultante é distribuída em todos os contribuintes de ações recentes de acordo com o esquema de pagamento específico do pool. Os regimes comuns incluem: **PPS** (Pagar por ação, um pagamento fixo por ação submetida, independentemente de um bloco ser finalmente encontrado, com o operador do pool suportando o risco de variância) e **PPLNS** (Pay Per Last N Shares, distribuindo recompensas reais encontradas proporcionalmente entre as ações N mais recentes submetidas, com os participantes apresentando mais da variância do que sob PPS).

## Exemplo: distribuição de recompensas sob PPLNS

```typescript
interface ShareContribution {
  miner: string;
  shares: number;
}

function distributeReward(rewardSats: number, contributions: ShareContribution[]): Record<string, number> {
  const totalShares = contributions.reduce((sum, c) => sum + c.shares, 0);
  const payout: Record<string, number> = {};
  for (const c of contributions) {
    payout[c.miner] = Math.floor((rewardSats * c.shares) / totalShares);
  }
  return payout;
}

const blockReward = 312_500_000; // 3.125 BTC in satoshis
const recentShares: ShareContribution[] = [
  { miner: "MinerA", shares: 4000 },
  { miner: "MinerB", shares: 3500 },
  { miner: "MinerC", shares: 2500 },
];

console.log(distributeReward(blockReward, recentShares));
```

Resultado verificado da execução deste código exato:

```text
{ MinerA: 125000000, MinerB: 109375000, MinerC: 78125000 }
```

MinerA contribuiu com 40% das ações recentes (4000 de 10.000) e recebeu 40% da recompensa 3.125 BTC (125.000.000 de 312.500.000 satoshis). O pagamento acompanha exatamente a contribuição proporcional de cada participante.

## A questão da centralização

Como os operadores de pool controlam quais as transações que são incluídas nos blocos de suas minas de pool (o pool, não participantes individuais, normalmente monta o modelo de bloco candidato), um pequeno número de grandes pools que controlam a maioria do poder de hash de rede coletivamente representa um ponto significativo de influência centralizada sobre a inclusão de transações e, em princípio, sobre qual cadeia é estendida durante um fork polêmico, mesmo que o poder de hash subjacente é contribuído por muitos participantes separados, individuais que poderiam, em princípio, mudar pools se discordassem do comportamento de um pool específico. Esta é uma dinâmica real e ativamente monitorada no ecossistema do Bitcoin (painéis públicos monitoram regularmente a distribuição aproximada de energia de hash em pools conhecidas), e é uma instância específica e concreta dos tradeoffs de descentralização mais amplos discutidos em [Governança](../governance/README.md)Os grupos reduzem o risco de variância individual ao custo de concentrar uma quantidade significativa de influência prática num número relativamente pequeno de operadores.

## Protocolos de Stratum e pool

Mineradores se conectam a grupos usando um protocolo chamado **Estrato** (e sua revisão posterior, Stratum V2, que adiciona características, incluindo permitir que mineradores individuais, em vez do operador do pool, escolham seus próprios conjuntos de transações, abordando diretamente parte da preocupação de centralização acima, dando aos participantes mais controle sobre o que eles realmente estão minerando, sem precisar deixar os benefícios de redução de variância do pool para trás).

## Conceitos errôneos comuns

**Juntar-se a um pool de mineração não muda quanto bitcoin total fica minado**, ou afetar o calendário de emissão de Bitcoin de qualquer forma (ver [O halving](./halving.md)). Pools só mudam como a recompensa existente, definida por protocolo é distribuída entre os mineradores que realmente contribuíram com o poder de hash para encontrá-lo.

**Um operador de grupo não tem custódia unilateral do poder de haxixe ou dos rendimentos dos participantes** em qualquer sentido técnico profundo. Os participantes geralmente podem alternar pools de forma relativamente livre, uma vez que o hardware de mineração é apontado para qualquer endereço do servidor do pool que um minerador configure, e este custo de comutação, não qualquer bloqueio técnico vinculativo, é o que limita a rapidez com que o poder de hash poderia se redistribuir longe de um pool se comportando mal.

## Outras leituras

- [Especificações do Stratum V2](https://stratumprotocol.org/)

---

[← Anterior: O halving](./halving.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: ASICs →](./asics.md)
