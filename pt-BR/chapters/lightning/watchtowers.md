# Torres de Vigia

[Canais de pagamento](./payment-channels.md#por-que-isso-requer-estar-online-ou-delegar-para-uma-torre-de-vigia) sinalizou uma exigência real e inevitável do modelo de segurança da pena de revogação: detectar e punir uma contraparte trapaceira requer realmente observar o blockchain durante a janela de bloqueio temporal relevante. Uma torre de vigia é um serviço que faz isso assistindo em seu nome, então você não precisa ficar online continuamente para permanecer protegido.

## As torres de observação de problemas resolvem

Um nó Lightning que fica off-line por mais tempo do que a janela de bloqueio de tempo de um canal é, em princípio, vulnerável: se uma contraparte transmite uma transação de compromisso antiga e revogada enquanto a parte honesta está off-line e incapaz de observá-la, a parte honesta pode perder sua janela para reivindicar a penalidade descrita em [Canais de pagamento](./payment-channels.md#o-mecanismo-de-revogação), não porque a criptografia falhou, mas porque ninguém estava assistindo para usá-la a tempo. Esta é uma exigência de disponibilidade genuína e prática, a maioria dos usuários casuais (alguém com uma carteira Lightning móvel que não está continuamente conectada, por exemplo) não pode satisfazer de forma realista por conta própria.

## Como funciona uma torre de vigia, sem precisar de ser confiado aos seus fundos

Uma torre de vigia bem projetada não requer entregar suas chaves privadas ou confiar que não roubará de você. Funciona devido a uma escolha de design específica e deliberada na forma como os dados que lhe são dados são estruturados: um cliente envia a torre de observação e **transação de penalização criptografada** para cada estado de canal, mais uma forma de reconhecer quando o compromisso antigo correspondente tiver sido transmitido (um identificador curto derivado dessa transação específica, não utilizável para a reconstruir ou identificar antecipadamente), **sem revelar qual canal ou contraparte se aplica, ou o conteúdo real da transação penal, até o momento em que é necessário**. A torre de vigia monitora a cadeia de bloqueio para qualquer transação correspondente a um dos identificadores que possui; se aparecer uma correspondência, ela descodifica e transmite a transação penal correspondente, pré-assinado, e paga os fundos recuperados para um endereço especificado com antecedência pelo cliente original, não para a própria torre de vigia. Estruturada desta forma, uma torre de vigia que nunca vê uma transmissão correspondente aprende essencialmente nada sobre os canais de seus clientes, e mesmo uma torre de vigia maliciosa ou comprometida não pode roubar fundos, uma vez que a transação de penalidade pré-assinada paga para o próprio endereço especificado do cliente, não para a torre de vigia.

```text
Client, while online:
  1. creates a new commitment (update #6), revoking #5
  2. pre-signs a penalty transaction claiming the FULL channel balance
     IF the revoked #5 commitment is ever broadcast, paying out to the
     client's own address
  3. encrypts that penalty transaction and sends it, along with a
     recognition hint for commitment #5, to the watchtower — without
     revealing which channel this is for

Later, while the client is offline:
  4. counterparty (dishonestly) broadcasts old commitment #5
  5. watchtower recognizes the match, decrypts the pre-signed penalty tx,
     broadcasts it — claiming the funds on the client's behalf, to an
     address only the client controls
```

## Comércio

As Torres de Vigia restauram a proteção contínua sem exigir tempo de serviço pessoal contínuo, ao custo de alguma complexidade operacional (gerando e gerenciando transações de penalização criptografadas por estado, e executando sua própria torre de vigia ou confiando (de forma limitada, estruturalmente restrita) em terceiros) e, para serviços de torre de vigia de terceiros, uma questão de confiança residual sobre o *disponibilidade* da própria torre de vigia (uma torre de vigia que está baixa ou sem resposta quando necessário não fornece proteção, mesmo que estruturalmente não possa roubar fundos quando está funcionando corretamente).

## Conceitos errôneos comuns

**Uma torre de vigia não é um guardião e não detém seus fundos ou chaves privadas do seu canal**, o design específico criptografado, cego descrito acima é o que o torna significativamente diferente de, e mais seguro do que, simplesmente confiar a um terceiro com custódia; uma torre de observação implementada com competência aprende nada útil sobre um canal que nunca precisa agir.

**Usar uma torre de vigia não é obrigatório para usar Lightning**. É uma proteção opcional, adicional especificamente para a janela de vulnerabilidade offline; um nó que permanece confiável on-line e monitora ativamente seus próprios canais não precisa estritamente de uma torre de observação de terceiros (ou mesmo de execução pessoal), embora muitos operadores usem uma de qualquer forma como uma medida de segurança redundante, independentemente.

## Outras leituras

- [BOLT 13: Protocolo da Torre de Vigia (especificação do projeto)](https://github.com/sr-gi/bolt13/blob/master/13-watchtowers.md): a partir desta escrita, um projeto de proposta mantido fora do núcleo `lightning/bolts` repositório, ainda não uma parte ratificada do conjunto de especificações do núcleo

---

[← Anterior: Capacidade do canal](./channel-capacity.md)
·
[Voltar à Rede Lightning](./README.md)
·
[Próximo: Nós Lightning →](./nodes.md)
