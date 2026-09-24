# Empréstimos

Protocolos de empréstimo DeFi (Aave e Compound são os dois mais amplamente utilizados) deixar qualquer um depositar ativos cripto para ganhar juros, extraídos de um pool outros usuários emprestados contra. Este capítulo abrange o modelo de empréstimo conjunto que ambos os protocolos partilham, antes dos próximos três capítulos abrangerem em pormenor empréstimos, garantias e liquidações.

## O modelo agrupado, não a correspondência entre pares

Um protocolo de empréstimo DeFi não corresponde a credores individuais para mutuários individuais como um empréstimo bilateral tradicional faz. Em vez disso, cada fundo do depositante para um determinado ativo vai para um pool compartilhado, e cada mutuário desse ativo toma emprestado do mesmo pool compartilhado. Um depositante nunca tem uma contraparte específica; sua reivindicação está em uma parte do pool como um todo, e o contrato inteligente do pool rastreia exatamente quanto dele pertence a cada depositante.

```typescript
// Simplified pooled-lending accounting.
interface Pool {
  totalDeposited: number;
  totalBorrowed: number;
}

function utilizationRate(pool: Pool): number {
  return pool.totalBorrowed / pool.totalDeposited;
}

const usdcPool: Pool = { totalDeposited: 10_000_000, totalBorrowed: 6_000_000 };
console.log(utilizationRate(usdcPool)); // 0.6, 60% utilized
```

**Utilização** (a fração dos depósitos de um pool atualmente emprestados) é a variável central que esses protocolos rastreiam, pois ele direciona diretamente as taxas de juros.

## Taxas de juro fixadas por utilização, não por decisão central

Tanto os depositantes de taxa de juro ganham quanto os mutuários de taxa pagam são calculados algoritmomente a partir da utilização atual de um pool, através de uma fórmula definida pela governança de protocolo, não decidida manualmente para cada empréstimo. À medida que a utilização aumenta para 100% (um pool com pouca liquidez disponível para emprestar), a taxa de empréstimos aumenta acentuadamente, desencorajando mais empréstimos e incentivando novos depósitos; à medida que a utilização cai, as taxas também caem. Isto cria um mecanismo de auto-correcção que impede que um pool seja totalmente drenado: uma curva de taxa que atinge quase a plena utilização dá aos mutuários um forte incentivo para reembolsar, e os depositantes um forte incentivo para adicionar liquidez, exatamente quando o pool mais precisa.

```typescript
// A simplified, illustrative version of the kind of kinked rate curve
// Aave and Compound actually use: a gentle slope below a target
// utilization, then a much steeper slope above it.
function borrowRate(utilization: number, kink = 0.8): number {
  const baseRate = 0.02;
  if (utilization <= kink) {
    return baseRate + (utilization / kink) * 0.08; // up to 10% at the kink
  }
  const excessUtilization = (utilization - kink) / (1 - kink);
  return 0.10 + excessUtilization * 0.5; // steep climb toward 60% near 100%
}

console.log(borrowRate(0.6));  // 0.08, moderate rate at 60% utilization
console.log(borrowRate(0.95)); // 0.4749..., much steeper past the 80% kink
```

Os juros do depositante são sempre inferiores aos juros do mutuário para o mesmo pool; a diferença (às vezes indo para uma reserva de protocolo, às vezes puramente uma função da própria curva de taxa de matemática) é como esses protocolos permanecem solventes, uma vez que cada dólar pago para depositantes tem que vir de algum lugar.

## Por que os credores não precisam confiar em mutuários individuais

Ao contrário de um empréstimo tradicional, um protocolo de empréstimo DeFi nunca realiza uma verificação de crédito ou depende da identidade ou reputação de um mutuário. Cada empréstimo é totalmente colateral por ativos cripto o mutuário tem bloqueado no mesmo protocolo (coberto totalmente em [Garantia](./collateral.md)), e um [liquidação](./liquidations.md) mecanismo protege o pool se o valor dessa garantia cair muito longe. Isto é o que torna possível o empréstimo agrupado, sem permissão: a solvência do protocolo depende inteiramente de garantia e código, não da vontade ou capacidade de reembolso de qualquer mutuário baseado na confiança.

## Conceitos errôneos comuns

**Depositar em um pool de empréstimos não é livre de risco só porque é garantido por ativos de outros usuários.** O próprio código de contrato inteligente do protocolo carrega risco (um erro ou exploração, veja [Auditoria inteligente de contratos](../security/auditing.md)), e condições de mercado extremas podem, em casos raros, fazer com que o mecanismo de liquidação de um pool não cubra totalmente a dívida de um mutuário antes de seu valor colateral cair abaixo do que é devido, deixando os depositantes expostos a esse déficit.

**As taxas de juros de um protocolo de empréstimo da DeFi não são definidas por uma empresa ou comitê que decida o que é rentável.** Eles são calculados diretamente a partir da própria utilização do pool através de uma fórmula, que é por isso que as taxas podem mudar de bloco para bloco como depósitos e empréstimos acontecem, ao contrário da taxa de um banco periodicamente definido.

## Outras leituras

- [Documentação do Aave](https://docs.aave.com/)
- [Documentação composta](https://docs.compound.finance/)
- Ver também: [Empréstimos](./borrowing.md), [Garantia](./collateral.md), [Aave](./aave.md)

---

[← Anterior: Slippage](./slippage.md)
·
[Voltar para DeFi](./README.md)
·
[Próximo: Emprestando →](./borrowing.md)
