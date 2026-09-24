# Cadeias Estatais

Um statechain é um protocolo experimental que permite a propriedade de um Bitcoin UTXO específico ser transferido entre as partes off-chain, sem uma transação on-chain para cada transferência, um mecanismo diferente de um canal de pagamento, vale a pena entender em seus próprios termos em vez de como uma variante de [Canais de pagamento](./payment-channels.md).

## O mecanismo principal

Um statechain depende de um terceiro semi-confiante, às vezes chamado de **entidade statechain** ou operador, que co-assina transações usando um acordo 2-of-2 com o proprietário atual, mas (este é o truque central, distintivo do mecanismo) nunca realmente aprende a chave privada completa por conta própria, e criticamente, quando a transferência de propriedade para um novo partido, *anterior* A ação chave do proprietário é excluída e uma nova ação chave é gerada cooperativamente entre o operador e o novo proprietário. O próprio UTXO nunca se move on-chain durante uma transferência; o que muda é quem, juntamente com o operador, pode autorizar o seu gasto.

```text
UTXO locked in a 2-of-2 (operator + current owner)
         │
         │  ownership transfer #1 (off-chain)
         ▼
Operator generates a new joint key with the new owner;
old owner's key share is deleted (this deletion step is
what the whole scheme's security depends on)
         │
         │  ownership transfer #2 (off-chain)
         ▼
        ... repeats, no on-chain transaction at any step ...
         │
         ▼
Eventual on-chain settlement, whenever the current owner
chooses to actually spend the UTXO normally
```

## Por que este é um modelo de confiança significativamente diferente do que poderia aparecer primeiro

A segurança de uma transferência statechain depende inteiramente da **A parte de chave do proprietário anterior foi genuinamente apagada** e não retidos. Isto não é algo que o novo proprietário possa verificar independentemente, criptograficamente no momento da transferência. Depende de confiar no operador statechain (e, implicitamente, confiar que o proprietário anterior não reteve secretamente uma cópia antes de supostamente excluí-la, uma ação fora do controle do operador para evitar). Esta é uma diferença estrutural real de um esquema genuinamente minimizado, e é por isso que statechains são geralmente descritos na comunidade técnica como um **semi- trust** ou **Redução da confiança** mecanismo, não um de confiança, uma distinção que este livro afirma claramente em vez de deixar "transferência off-chain" implica as mesmas garantias de segurança que uma transação on-chain própria liquidação de confiança minimizada.

## Por que usar um apesar deste tradeoff

A apelação é velocidade e custo: transferir a propriedade de um UTXO de corrente de estado é rápido (sem esperar por confirmação de bloco) e não consome nenhum espaço de bloco de corrente ou incorre em taxas on-chain, útil para cenários envolvendo mudanças de propriedade frequentes do mesmo valor subjacente (alguns casos de uso propostos e experimentais incluem transferências rápidas e de baixo custo de UTXOs específicos e maiores entre um conjunto de participantes semi-confiantes). Este é explicitamente um ponto de troca diferente da abordagem da Rede Lightning, que alcança a minimização da confiança através da aplicação de sanções criptográficas (ver [Canais de pagamento](./payment-channels.md#por-que-um-velho-compromisso-não-pode-simplesmente-ser-retransmitido-para-enganar)) em vez de através da promessa de um operador de apagar material chave antigo.

## Situação atual

Statechains continuam a ser um nicho, tecnologia experimental em relação à adoção muito mais ampla da Lightning Network e muito mais extensivamente testada. Existem implementações (o projeto Mercury Wallet é o mais comumente citado) mas statechains não conseguiram em nenhum lugar perto do nível de integração do ecossistema, liquidez, ou uso do mundo real a partir desta escrita. Este livro apresenta statechains como uma abordagem documentada, real, mas ainda experimental e comparativamente mais baixa, distinta de sistemas estabelecidos e amplamente utilizados.

## Conceitos errôneos comuns

**Uma transferência statechain não é criptograficamente confiável** na forma como uma transação Bitcoin on-chain ou uma atualização de canal de Lightning devidamente aplicada por penalidade é. Depende de confiar na eliminação honesta da chave do operador, uma propriedade de segurança significativamente diferente e mais fraca do que este livro se aplica a mecanismos verdadeiramente minimizados pela confiança em outros lugares.

**Statechains não são uma variante de Lightning Network ou extensão**. Eles são um protocolo estruturalmente distinto resolvendo um problema diferente (transferência de propriedade de um UTXO inteiro, específico) do que o problema do Lightning (roteando muitas pequenas atualizações de equilíbrio incremental através de uma rede de canais bidirecionais).

## Outras leituras

- [Cadeias de estado: Transferência de Bitcoin de fora de linha sem custo](https://www.commerceblock.com/statechains-non-custodial-off-chain-bitcoin-transfer/): uma introdução ao projeto statechain original e seu modelo de confiança

---

[← Anterior: Federações](./federations.md)
·
[Voltar para Bitcoin Scaleing](./README.md)
·
[Próximo: RGB →](./rgb.md)
