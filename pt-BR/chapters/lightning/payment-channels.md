# Canais de pagamento

[Escala de Bitcoin](../bitcoin-scaling/payment-channels.md) introdução do conceito geral de canal de pagamento bipartidário e sinalizado o problema central: o que impede uma parte de transmitir uma transação de compromisso antiga e desatualizada para trapacear? Este capítulo cobre a resposta real do Lightning em detalhe técnico completo. O mecanismo de revogação que faz da batota uma estratégia perdedora.

## O problema, reafirmado precisamente

Cada vez que Alice e Bob atualizam seu saldo de canal, eles criam uma nova transação de compromisso. O antigo ainda existe, ainda validamente assinado por ambas as partes, e ainda gastável. Nada inerentemente impede qualquer parte de transmitir uma antiga transação de compromisso que os favoreceu mais do que o equilíbrio atual, correto. Um design de canal viável precisa fazer isso **estritamente irracional**, não apenas desencorajado.

## O mecanismo de revogação

Solução do Lightning: cada vez que uma nova transação de compromisso é criada, o *anterior* um é explicitamente **revogado** fazendo com que ambas as partes troquem as informações necessárias para punir a outra se alguma vez as transmitirem. Concretamente, cada transação de compromisso inclui uma saída que pode ser gasta de duas maneiras:

1. **Após um bloqueio de tempo relativo** (ver [Calendário](../bitcoin/script.md#calendário)), pelo proprietário legítimo da transação de compromisso, o caminho de fechamento normal e honesto.
2. **Imediatamente, sem bloqueio temporal, pela contraparte, mas apenas se puderem produzir uma "chave de revogação" específica,** que só é revelado uma vez que determinado compromisso foi substituído por um compromisso mais recente.

Quando Alice e Bob concordam em um novo compromisso (diga, atualização 5), cada um envia ao outro o segredo de revogação para o *anterior* autorização (atualização 4). Isso significa: se Alice tentar trapacear transmitindo o antigo compromisso de atualização 4, Bob agora detém a chave de revogação para exatamente essa transação, e pode usá-la para reivindicar o **balanceamento de canal inteiro** (não apenas a sua quota-parte por direito) dentro da janela de bloqueio de tempo antes do caminho honesto da Alice ter activado.

```text
Commitment #4 broadcast (an old, revoked state):

  Alice's claim path:  spendable after N blocks (the honest path,
                        if this were genuinely the latest state)

  Bob's penalty path:  spendable IMMEDIATELY, but only with the
                        revocation key for commitment #4 —
                        which Bob already holds, because Alice
                        gave it to him when they both moved to #5

If Alice broadcasts #4: Bob sees it, has plenty of time (the N-block
window) to claim EVERYTHING using the penalty path before Alice's
own honest path could ever activate.
```

## Por que isso torna a traição irracional

A pena não é só "não se ganha com a traição". É "perdes tudo o que terias guardado, incluindo a tua parte legítima." Esta penalidade assimétrica e severa (perder todo o canal, não perder apenas a diferença disputada) é o que torna a transmissão de um velho estado uma estratégia estritamente dominada para um ator racional: o valor esperado de tentar enganar é estritamente pior do que simplesmente fechar o canal honestamente com o equilíbrio atual e correto.

## Por que isso requer estar online (ou delegar para uma torre de vigia)

Este mecanismo tem um requisito importante e inevitável que vale a pena afirmar claramente: **detectar e punir uma contraparte trapaceira requer realmente observar o blockchain** durante a janela de bloqueio de tempo para notar o antigo compromisso que está sendo transmitido. Uma parte que está off-line por um período prolongado (mais longo do que a janela de bloqueio de tempo) quando uma contraparte tenta enganar poderia perder a oportunidade de reclamar a penalidade, que é precisamente a lacuna [Torres de Vigia](./watchtowers.md) são concebidos para fechar, abrangidos no capítulo posterior desta seção.

## Conceitos errôneos comuns

**A chave de revogação não é a mesma que a chave privada do canal de qualquer das partes**. É um segredo separado gerado especificamente para e ligado a uma determinada transação de compromisso, revelado apenas uma vez que o compromisso é substituído; revelando que não compromete nada sobre compromissos futuros ou operação contínua do canal.

**Uma transmissão "traidora" não é tipicamente um sinal de intenção maliciosa em todos os casos do mundo real**, bugs de software, nós falhando restaurando a partir de um backup desatualizado, ou confusão genuína sobre o estado do canal têm tudo, na prática, levou a antigos compromissos sendo acidentalmente transmitido; o mecanismo de penalidade aplica-se independentemente da intenção, que é precisamente por isso correto, testado backup de canal-estado e gestão importa operacionalmente para qualquer um que executa um nó Lightning.

## Outras leituras

- [Especificações BOLT (Base de Tecnologia Lightning)](https://github.com/lightning/bolts): a especificação formal, de implementação cruzada do protocolo Lightning

---

[← Anterior: Lightning Network](./README.md)
·
[Voltar à Rede Lightning](./README.md)
·
[Próximo: Operações de Financiamento →](./funding-transactions.md)
