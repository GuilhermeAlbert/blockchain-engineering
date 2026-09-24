# Rollups Optimistas

Um rollup otimista assume que cada reivindicação de estado submetida está correta por padrão, e dá a qualquer um uma janela de tempo para provar o contrário. Este capítulo abrange o pressuposto por trás do nome, e o custo específico que impõe: um atraso de retirada medido em dias, não blocos.

## A suposição "ótima"

Quando um sequenciador publica um novo lote de transações e o estado resultante root para L1, um rollup otimista não verifica que o estado root está realmente correto no momento da publicação. Aceita simplesmente a afirmação, optimicamente, e inicia um **período de desafio**: uma janela fixa (geralmente em torno de sete dias sobre os principais desdobramentos otimistas) durante o qual qualquer um que executa o software do rollup pode recomputar independentemente o resultado correto do lote e, se ele discordar do que foi publicado, enviar um **prova de fraude** contestar (coberto completamente em [Provas de Fraude](./fraud-proofs.md)). Se ninguém contestar com sucesso a reivindicação antes do período de desafio terminar, é tratado como final.

Este é um modelo de segurança genuinamente diferente de exigir uma prova de correção inicial: depende de pelo menos uma parte honesta, assistindo ser disposta e capaz de apresentar uma prova de fraude se um lote realmente é inválido, uma suposição geralmente fraseada como precisando apenas de um único participante honesto entre os verificadores do Rollup, em vez de precisar de uma maioria.

## Por que as retiradas levam cerca de uma semana

A existência do período de desafio tem uma consequência direta e inevitável para qualquer pessoa que retire os ativos do rollup de volta para L1: uma retirada não pode ser tratada como final, e os fundos não podem ser liberados em L1, até que o período de desafio para o lote contendo essa retirada tenha decorrido totalmente sem uma prova de fraude bem sucedida. É por isso que mover fundos de uma volta otimista para Ethereum mainnet através da ponte nativa do rollup leva cerca de uma semana, não a experiência quase instantânea de transacionar dentro da própria rollup, e é uma consequência direta, estrutural do modelo de verificação otimista, não um inconveniente arbitrário.

```typescript
// Illustrative timeline for a native optimistic-rollup withdrawal.
const withdrawalInitiated = new Date("2026-01-01T00:00:00Z");
const challengePeriodDays = 7;
const withdrawalFinalized = new Date(
  withdrawalInitiated.getTime() + challengePeriodDays * 24 * 60 * 60 * 1000
);
console.log(withdrawalFinalized.toISOString()); // 2026-01-08T00:00:00.000Z
```

**Pontes rápidas** (serviços de terceiros, separados da própria ponte nativa do rollup) trabalham em torno deste atraso, frente a um usuário sua retirada imediatamente, por uma taxa, e, em seguida, coletando os próprios fundos reais assim que o período de desafio nativo ocorrer. Isso muda o período de espera para o provedor de fast-bridge em vez do usuário, ao custo de confiar nesse provedor e pagar pelo serviço, uma troca real, separada de esperar o atraso da ponte nativa diretamente.

## Conceitos errôneos comuns

**O período de desafio não significa que as transações de um rolagem otimista não sejam confirmadas ou inutilizáveis por uma semana.** As transações dentro do próprio rollup confirmam rapidamente, e a maioria das aplicações e usuários as tratam como finais bem antes do período de desafio L1 ocorrer; o atraso afeta especificamente mover ativos de volta para L1 através da ponte nativa do rollup, não ocorrendo atividade no rollup em si.

**Um período de desafio mais curto não é simplesmente uma melhoria estrita.** Reduz a latência de retirada, mas também reduz a quantidade de tempo que uma parte honesta tem para detectar e apresentar uma prova de fraude contra uma alegação de estado inválida; a janela de aproximadamente semana sobre grandes rolagem otimista reflete um comércio deliberado, não um número arbitrariamente escolhido.

## Outras leituras

- [Documentação Arbitrum](https://docs.arbitrum.io/)
- [Documentação sobre otimismo](https://docs.optimism.io/)
- Ver também: [Provas de Fraude](./fraud-proofs.md), [Rollups](./rollups.md)

---

[← Anterior: Rollups](./rollups.md)
·
[Voltar à Camada 2](./README.md)
·
[Próximo: Provas de fraude →](./fraud-proofs.md)
