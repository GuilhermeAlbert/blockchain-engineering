# Processamento de Eventos

Os processadores de eventos transformam os registros em efeitos: atualizar uma visão de equilíbrio, enviar uma notificação, creditar uma conta, desencadear um fluxo de trabalho ou publicar outra mensagem. Redes e filas tentam novamente, então o processamento deve permanecer correto quando o mesmo evento chega mais de uma vez.

## Pelo menos uma vez é a linha de base prática

Um produtor não pode saber se um consumidor cometeu um efeito se o reconhecimento for perdido. Repetir evita perda silenciosa, mas cria duplicatas. Os sistemas "Exatamente uma vez" geralmente alcançam o efeito através de escrita idempotent, limites transacionais, ou deduplicação em vez de transporte que nunca repete uma mensagem.

Defina uma identidade de evento a partir de campos de cadeia estável. Para um log EVM, chain ID, block hash, transaction hash e log index identificam uma ocorrência. Uma operação de negócio pode precisar de sua própria chave se vários logs representam um resultado.

## Estado atómico e caixa de saída

Escrever o estado do banco de dados e publicar uma mensagem de fila são dois efeitos separados. Se o processo falhar entre eles, um consegue sem o outro. O padrão transacional de saída escreve a mudança de estado e um registro de saída em uma transação de banco de dados. Um relé mais tarde publica linhas de saída não enviadas e as marca entregues. Duplicar a publicação continua a ser possível, por isso os consumidores permanecem idempotentes.

## Ordenação e particionamento

A ordenação global limita o rendimento e muitas vezes é desnecessária. Identificar a entidade cujos eventos exigem ordem, como uma conta, cofre ou contrato, e partição por essa chave. Preservar bloco, transação e ordem de log dentro de um bloco quando semântica contrato depende disso.

Não processe o bloco N+1 como estado final se o bloco N para a mesma entidade ainda não estiver resolvido. Uma fila de repetição não deve mover silenciosamente um evento falhado para trás de eventos dependentes posteriores.

## Efeitos reversíveis e irreversíveis

As linhas do banco de dados podem ser roladas para trás após um reorg. Um e-mail, transferência bancária ou chamada de API externa podem não ser reversíveis. Atrasar efeitos irreversíveis até que a política de confirmação necessária, ou modelá-los como tentativa e enviar uma ação compensatória se o processo de negócio apoiá-lo.

Armazenar status de processamento, contagem de tentativas, classe de erro, próxima hora de repetição e identidade do bloco de origem. As filas de letras mortas precisam de um procedimento de operador e de um comando de repetição; caso contrário, tornam-se perda de dados oculta.

## Outras leituras

- [Especificação do CloudEvents](https://cloudevents.io/)
- Ver também: [Manuseamento Reorg](./reorg-handling.md), [Webhooks](./webhooks.md)

---

[← Anterior: Pipelines de dados de cadeia de blocos](./data-pipelines.md)
·
[Voltar à Infraestrutura](./README.md)
·
[Próximo: Reorg Manuseamento →](./reorg-handling.md)

