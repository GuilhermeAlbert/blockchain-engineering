# Liquididade

A liquidez é a única restrição prática que os usuários e operadores de nós encontram, mais do que algoritmos de roteamento ou mecânica criptográfica. Este capítulo cobre exatamente o que significa no nível do canal, e por que é direcional de uma forma que surpreende as pessoas vindo de um modelo mental de um simples e indiferenciado equilíbrio de contas.

## Entrada versus saída de liquidez

Num único canal, a capacidade divide-se em dois componentes direcionais:

- **liquidez de saída**: o montante *você* pode atualmente enviar através desse canal, seu lado do saldo atual.
- **Liquidação de entrada**: a quantidade que você pode atualmente *receber* através desse canal, o lado da contraparte do saldo corrente.

```text
Channel capacity: 1,000,000 sats total

Balance right now:
  Your outbound liquidity:  800,000 sats  (you can send up to this much)
  Your inbound liquidity:   200,000 sats  (you can receive up to this much)
```

Esta repartição direcional é uma consequência directa da estrutura de transação de compromisso abrangida pelo [Transações de Compromisso](./commitment-transactions.md): a capacidade total do canal é fixada no momento do financiamento, mas quanto dele fica em cada turno lateral com cada pagamento que flui. O envio diminui a sua saída e aumenta a de sua contraparte (que se torna sua entrada, do lado deles), e receber faz o inverso.

## Porque é que isto faz as pessoas subirem?

Um recém-chegado com um canal recém-inaugurado, tendo-o financiado inteiramente, **liquidez de saída máxima e liquidez de entrada zero**Eles podem enviar livremente, mas ainda não podem *receber* qualquer pagamento através desse canal, uma vez que não há saldo do lado da contraparte para mudar para eles. Este é um ponto de confusão comum e genuíno: "Abri um canal Lightning e financiei-o, porque é que ninguém me pode pagar?" A resposta é especificamente sobre a direção da liquidez, não o canal sendo quebrado ou insuficientemente capitalizado no total.

## Como a liquidez de entrada é realmente obtida

Uma vez que a capacidade total de um canal é fixa em tempo aberto, ganhar liquidez de entrada em um canal específico geralmente requer um de: receber pagamentos através dele (que desloca o equilíbrio para você, mas exige já ter *alguns* liquidez de entrada para receber qualquer coisa em primeiro lugar. Um problema genuíno de arranque a frio para um nó novo), tendo outra pessoa a abrir um canal *para* você (tornando-o o lado destinatário de um canal que eles financiaram, que começa com liquidez de entrada nesse canal específico), ou usando um **mercado ou serviço de liquidez**Vários existem onde um operador de nó pode pagar uma taxa para ter outro nó abrir um canal para eles, comprando diretamente liquidez inbound em vez de esperar para acumulá-lo organicamente.

## Conceitos errôneos comuns

**A capacidade total de um canal não lhe diz quanto pode enviar ou receber através dele**. Apenas a divisão do saldo atual (outbound versus inbound) determina que; dois canais com capacidade total idêntica podem ter usabilidade prática completamente diferente, oposta dependendo de seu equilíbrio atual.

**A liquidez não é uma propriedade de um nó global, mas de cada canal individual separadamente**. Um nó pode ter liquidez de saída abundante em um canal e zero em outro; gerenciar liquidez bem em vários canais (uma prática às vezes chamada de "reequilíbrio", equilíbrio móvel entre canais através de rotas de pagamento circulares) é uma tarefa operacional ativa e contínua para qualquer um executando um volume significativo de manuseio de um nó Lightning.

## Outras leituras

- Ver também: [Capacidade do Canal](./channel-capacity.md), [Transações de Compromisso](./commitment-transactions.md)

---

[← Anterior: Roteamento de pagamentos](./routing.md)
·
[Voltar à Rede Lightning](./README.md)
·
[Próximo: Capacidade do canal →](./channel-capacity.md)
