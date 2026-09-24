# Transações de Compromisso

Uma transação de compromisso é a reivindicação de cada parte atualmente válida, unilateralmente divulgada sobre os fundos do canal, refletindo a mais recente divisão do saldo acordado. [Canais de pagamento](./payment-channels.md) já abrangeu o mecanismo de revogação que impede antigos compromissos de serem proveitosamente transmitidos; este capítulo abrange a estrutura real da transação e uma sutileza digna de compreensão: **cada parte detém uma versão diferente**.

## Por que cada parte tem sua própria versão

Este é um detalhe fácil de perder e importante de acertar: Alice e Bob não compartilham uma única transação de compromisso. Cada um segura o seu **próprio** versão, estruturada para que se *eles* a transmissão, os fundos são distribuídos corretamente para ambas as partes, mas com um período de tempo especificamente aplicado à saída própria do radiodifusor (não a da contraparte), e um caminho de revogação anexado especificamente à saída do radiodifusor (tendo a contraparte a capacidade de reclamar a penalidade descrita na [Canais de pagamento](./payment-channels.md#o-mecanismo-de-revogação) se esta versão específica, assimétrica é transmitida após ser substituída).

```text
Alice's version of commitment #5:
  output to Alice: timelocked (delayed claim) OR revocable by Bob
  output to Bob:   immediately spendable by Bob

Bob's version of commitment #5:
  output to Bob:   timelocked (delayed claim) OR revocable by Alice
  output to Alice: immediately spendable by Alice
```

Cada parte só precisa transmitir o seu *próprio* versão para fechar o canal unilateralmente, o tempolock assimétrico na sua própria saída (contra a saída imediatamente gastável da contraparte) é especificamente o que dá a *outros* partido a janela necessária para detectar e punir uma transmissão revogada, por o mecanismo em [Canais de pagamento](./payment-channels.md#o-mecanismo-de-revogação).

## Cooperativa contra fechamento forçado

- **Fechar a Cooperativa**: ambas as partes concordam que o canal deve fechar, e em conjunto assinar uma única transação de liquidação, comum e final, gastando diretamente a saída de financiamento no saldo atual, mais barato e mais rápido do que um fechamento forçado, uma vez que não precisa de nenhuma das máquinas de bloqueio de tempo ou revogação em tudo.
- **Forçado (unilateral) fechar**: qualquer das partes transmite a sua própria transação de compromisso sem a cooperação da outra. Necessário se a contraparte não responder, off-line ou não cooperar, mas mais caro (os fundos próprios da emissora estão bloqueados por trás do atraso do bloqueio de tempo) e revela mais informações on-chain do que uma cooperativa fecha.

## Saídas HTLC

Uma transação de compromisso efectuada durante um ou mais contratos Hashed Timelock (ver [HTLCs](./htlcs.md)) estão em voo também inclui saídas adicionais, condicionais que representam aqueles pagamentos pendentes, ainda não liquidados, cobertos totalmente no próximo capítulo, uma vez que entender HTLCs requer o contexto de roteamento [Roteamento dos Pagamentos](./routing.md) apresenta primeiro.

## Conceitos errôneos comuns

**As versões de Alice e Bob do mesmo número de compromisso não são intercambiáveis ou idênticas.**Eles são deliberadamente, assimetricamente diferentes, especificamente para fazer o mecanismo de sanção de revogação funcionar corretamente, independentemente de qual parte acaba transmitindo.

**Uma aproximação forçada não significa que algo deu errado num sentido de segurança.**. É uma opção normal, esperada, sempre disponível, construída no protocolo especificamente para que qualquer parte possa sair do canal e recuperar seus fundos mesmo que a contraparte fique permanentemente sem resposta; é mais cara e mais lenta do que uma cooperativa próxima, não evidência de falha ou ataque.

## Outras leituras

- [BOLT # 3: Transação de Bitcoin e Formatos de Programa](https://github.com/lightning/bolts/blob/master/03-transactions.md)

---

[← Anterior: Operações de Financiamento](./funding-transactions.md)
·
[Voltar à Rede Lightning](./README.md)
·
[Próximo: HTLCs →](./htlcs.md)
