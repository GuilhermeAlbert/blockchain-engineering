# Webhooks

Um webhook é uma tentativa de entrega HTTP, não um fato durável. O remetente posta um evento em um endpoint do consumidor e repete quando falta o reconhecimento. Os consumidores devem autenticar o remetente, tolerar duplicatas e buscar contexto canônico quando o evento importa.

## Autenticar o corpo realmente recebido

Os provedores geralmente assinam o corpo de pedido bruto com uma chave secreta ou assimétrica compartilhada. Verifique a assinatura antes de analisar ou agir. Frameworks que analisam e reserializam o JSON podem alterar o espaço em branco ou ordem de chave, então retenha os bytes brutos usados pelo esquema de assinatura.

Inclua um timestamp e rejeite requisições fora de uma janela delimitada para limitar a repetição. Rodar segredos com um período de sobreposição que aceita chaves antigas e novas. Use a comparação de tempo constante para códigos de autenticação de mensagens.

## Reconhecer após aceitação durável

Se o processamento pode levar tempo, validar o pedido, escrevê-lo para uma caixa de entrada durável com um ID de entrega ou evento único, e retornar o sucesso. Um trabalhador realiza a ação de negócios. Devolver o sucesso antes do armazenamento durável pode perder o evento. Esperar por cada chamada a jusante pode desencadear tentativas de provedor e duplicar o trabalho.

Documento que os códigos de estado causam a repetição e o horizonte de repetição. Os fornecedores podem parar após um período fixo. Um processo de reconciliação deve comparar pontos de verificação ou intervalos de consulta perdidos para que uma falha do webhook não crie lacunas permanentes.

## Ordens e duplicações

As entregas HTTP podem chegar fora de ordem. Várias tentativas podem ser executadas simultaneamente. Use a posição da cadeia e a versão da entidade, não a hora de chegada, para ordenar efeitos. Inserir com uma chave de evento única, em seguida, fazer transições de estado condicionam o estado prévio esperado.

Um webhook dizendo que uma transação foi confirmada reflete a observação do provedor em um momento. Armazene o estado de hash de bloqueio e confirmação, depois concilie eventos sensíveis ao reorg através do RPC.

## Segurança dos pontos de contacto

Definir limites de tamanho do corpo, timeouts, limites de concorrência e tipos de conteúdo estreitos. Não coloque segredos em strings de consulta que proxies e logs registram. Separe a falha de autenticação do webhook da falha temporária de processamento para que o remetente não tente repetir o tráfego inválido para sempre.

## Outras leituras

- [Especificação do CloudEvents](https://cloudevents.io/)
- Ver também: [Processamento de Eventos](./event-processing.md), [Manuseamento Reorg](./reorg-handling.md)

---

[← Anterior: Manuseamento Reorg](./reorg-handling.md)
·
[Voltar à Infraestrutura](./README.md)
·
[Próximo: Caching →](./caching.md)

