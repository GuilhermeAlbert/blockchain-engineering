# Operações de Financiamento

Uma transação de financiamento é o único evento on-chain que abre um canal Lightning, tudo o que acontece dentro do canal depois é off-chain, até que eventualmente fecha. Este capítulo abrange exatamente o que esta transação contém e por que sua estrutura específica importa.

## Estrutura

Uma operação de financiamento cria uma saída: a **2 de 2 multisig** (ver [Multisig](../wallets/multisig.md)) exigindo que ambas as assinaturas dos participantes do canal passem. Implementações Modern Lightning normalmente usam recursos de agregação de chaves do Taproot (ver [Taproot](../bitcoin/taproot.md#papel-de-schnorr)) por isso, este acordo 2-of-2, quando ambas as partes cooperam, parece on-chain como uma produção comum de uma assinatura única, mais uma instância do benefício geral de privacidade [Multisig](../wallets/multisig.md#taproot-assinaturas-agregadas).

```text
Funding transaction
  input(s): from either or both participants' regular on-chain funds
  output:   2-of-2 multisig (Alice + Bob), amount = total channel capacity
```

O valor bloqueado nesta saída torna-se o total do canal **capacidade** (ver [Capacidade do Canal](./channel-capacity.md)). A quantidade máxima que pode estar no canal de uma só vez, fixada em tempo aberto e apenas mutável fechando e reabrindo (ou, em implementações mais recentes suportando **splicing**, ajustando a capacidade on-chain-anchored do canal sem um ciclo fechado/reaberto completo).

## Por que precisa de confirmações antes de o canal ser considerado seguro

Porque a transação de financiamento é uma transação Bitcoin corrente comum, está sujeita ao mesmo [reorganização da cadeia](../blockchain/reorgs.md) risco como qualquer outra transação até que tenha acumulado confirmações suficientes (ver [Confirmação da transação](../bitcoin/confirmation.md)), a maioria das implementações espera por múltiplas confirmações (geralmente em torno de 3-6, configurável) antes de tratar um canal recém-aberto como utilizável com segurança para um valor significativo, especificamente para evitar um cenário onde a fundação do canal é reorganizada depois que a atividade off-chain já começou em cima dele.

## Saldo inicial do canal dividido

A própria transação de financiamento não precisa especificar como a capacidade do canal é inicialmente dividida entre as duas partes além de quem contribuiu quais os insumos, que o equilíbrio inicial é estabelecido pelo **primeira operação de compromisso** (coberto em [Transações de Compromisso](./commitment-transactions.md)), acordado e assinado por ambas as partes antes mesmo de a transação de financiamento ser transmitida, especificamente para que ambas as partes tenham uma forma imediatamente válida de recuperar a sua quota-parte se a contraparte desaparecer ou se tornar pouco cooperativa logo após a abertura do canal, antes de quaisquer atualizações fora da cadeia ocorrerem.

## Conceitos errôneos comuns

**A abertura de um canal não requer uma contribuição igual de ambas as partes.** Um canal pode ser financiado inteiramente por uma parte (um padrão comum para um serviço ou canais de abertura de negócios para clientes) ou por ambos, em qualquer divisão. Os inputs da transação de financiamento determinam isso, não qualquer exigência de protocolo para uma contribuição igual.

**Uma transação de financiamento não é a mesma que um "depósito" detido por um guardião.** O 2-of-2 multisig requer a cooperação de ambas as partes para gastar cooperativamente, mas qualquer das partes pode unilateralmente forçar o canal fechado usando sua transação de compromisso mais recente se a contraparte ficar sem resposta, ver [Encerramento do Canal](../bitcoin-scaling/payment-channels.md) e a cobertura desta seção de não colaboração fecha.

## Outras leituras

- [BOLT #2: Protocolo de parceria para gerenciamento de canais](https://github.com/lightning/bolts/blob/master/02-peer-protocol.md)

---

[← Anterior: Canais de pagamento](./payment-channels.md)
·
[Voltar à Rede Lightning](./README.md)
·
[Próximo: Transações de Compromisso →](./commitment-transactions.md)
