# 21 milhões de BTC

A oferta total do Bitcoin aproxima-se, mas nunca ultrapassa 21 milhões de moedas. Este capítulo cobre de onde esse número específico vem, mecanicamente, e trata uma questão que a seção de economia deste livro levantou, mas não resolveu totalmente: o que "21 milhões" realmente garante, e o que não garante.

## De onde vem o número

21 milhões não é um número que Satoshi escolheu diretamente. É o resultado matemático do programa de subsídios [Bloquear recompensas](./block-rewards.md) e [O halving](./halving.md): começando em 50 BTC por bloco, metade a cada 210.000 blocos, continuando até as rodadas de subsídio para zero. Somar toda esta série geométrica de recompensas de blocos produz um total que converge para quase exatamente 21 milhões:

```typescript
function totalSupplyAtHalving(halvings: number): number {
  const halvingInterval = 210_000;
  const initialSubsidySats = 50 * 100_000_000;
  let total = 0;
  for (let h = 0; h <= halvings; h++) {
    const subsidyThisEra = Math.floor(initialSubsidySats / Math.pow(2, h));
    if (subsidyThisEra === 0) break;
    total += subsidyThisEra * halvingInterval;
  }
  return total / 100_000_000; // convert back to BTC
}

console.log("Approximate total supply after all halvings (BTC):", totalSupplyAtHalving(64));
```

Resultado verificado da execução deste código exato:

```text
Approximate total supply after all halvings (BTC): 20999999.9769
```

Isto corresponde à figura bem documentada, não exatamente 21.000.000, devido ao arredondamento inteiro-satoshi aplicado em cada metade.

## Por que não são exatamente 21.000.000

Porque cada metade arredonda o subsídio para um número inteiro de satoshis (a Bitcoin não tem unidade sub-satoshi), a soma matemática real de toda a série converge para um valor muito ligeiramente inferior a 21 milhões (normalmente citado como aproximadamente 20,999,999,9769 BTC) devido ao efeito cumulativo deste arredondamento em muitas metades. Esta é uma nota de rodapé técnica bem conhecida, se menor: coloquialmente, "21 milhões" é preciso para como a figura é universalmente referida e compreendida, embora o total matemático preciso seja uma pequena fração abaixo dela.

## O que o limite máximo fixo realmente garante

Isso vale a pena afirmar com precisão, conectando de volta para [Oferta Monetária](../economics/money-supply.md): o valor de 21 milhões é **Limite máximo reforçado pelo protocolo para as moedas recentemente emitidas através da mineração**, verificável por qualquer pessoa executando um nó completo (ver [Nós Completos](./full-nodes.md)), nenhuma autoridade central decide ou poderia alterar unilateralmente este número sem uma alteração coordenada, em toda a rede, para as regras de consenso que os operadores de nó, os mineradores e o ecossistema mais vasto teriam realmente de adotar (ver [Governança do Bitcoin](../forks/governance.md)). Sim. **não** garantir que exatamente 21 milhões de moedas estarão em circulação activa e utilizável. Algumas partes são permanentemente perdidas (ver [Moedas Perdidas](./lost-coins.md)) ou impendável por design (como o [bloqueio de gênese](../origins/genesis-block.md#o-que-há-nele) a produção inespetível da base de moedas), ou seja, o suprimento realístico circulante e gastável sempre foi, e provavelmente permanecerá, um pouco abaixo do máximo teórico.

## Será que o limite máximo de 21 milhões pode ser alterado?

Tecnicamente, sim, no mesmo sentido qualquer regra de consenso poderia ser tecnicamente alterada: um hard fork coordenado (ver [Hard fork](../forks/hard-forks.md)) adotado por uma parcela esmagadora de operadores de nó, mineradores e usuários poderia alterá-lo. Na prática, isso é considerado extraordinariamente improvável e enfrentaria imensa resistência da comunidade quase universal, uma vez que a oferta fixa é amplamente considerada (em toda a gama essencialmente da base de usuários de Bitcoin, independentemente de outras discordâncias internas) como uma das propriedades de suporte de carga mais fundamentais do protocolo; uma mudança desse tipo seria quase certamente rejeitada pela esmagadora maioria da comunidade e provavelmente criaria uma cadeia alternativa separada, com pouca adoção em relação ao Bitcoin original, inalterada, seguindo a mesma dinâmica discutida em [Atualizações de forks e protocolos](../forks/README.md).

## Conceitos errôneos comuns

**"21 milhões" refere-se ao bitcoin, a unidade, não a alguma outra medida como transações ou endereços.** Os endereços totais, as carteiras totais e o total das transações são todos valores não relacionados, não vinculados, apenas o total da contagem de moedas emitidas é limitado.

**A tampa não significa que Bitcoin se torne "inutilizável" uma vez totalmente emitido.** Após a última subvenção ser extraída (projetada em torno de 2140), os mineradores continuam a receber receitas inteiramente a partir de taxas de transação, uma transição examinada diretamente em [Orçamento de Segurança a Longo Prazo](./security-budget.md), que é uma verdadeira questão em aberto, debatida, mas distinta de se a própria moeda continua a funcionar.

## Outras leituras

- [Bitcoin Fonte principal: cálculo da subvenção e da oferta total](https://github.com/bitcoin/bitcoin/blob/master/src/validation.cpp)
- Ver também: [O halving](./halving.md), [Esquema de Emissão](./issuance.md)

---

[← Anterior: Consumo de energia](./energy.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Calendário de Emissão →](./issuance.md)
