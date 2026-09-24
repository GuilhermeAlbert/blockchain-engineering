# Cache

As leituras da blockchain variam de imutável a imediatamente estagnada. Uma transação por hash é estável uma vez finalizada. Um saldo de conta em `latest` pode mudar com o próximo bloco. O design do cache começa nomeando o contexto do bloco e mutabilidade do resultado.

## Chaves de cache precisam de contexto de cadeia

Inclua o ID de cadeia, método ou versão de consulta, parâmetros normalizados e identidade de bloco. Para dados históricos, prefira o hash de bloco. Duas redes podem compartilhar um endereço e número de bloco enquanto contêm estado não relacionado. Um contrato proxy pode manter um endereço enquanto seu comportamento muda após uma atualização, assim resultados decodificados ou simulados podem precisar de implementação ou contexto de bloqueio.

Nunca vire `latest` numa chave não qualificada de longa duração. Resolva-o para um número de bloco e hash, cache a resposta sob essa identidade, e deixe as chamadas escolherem por quanto tempo aceitam essa cabeça.

## Classes de finalidade

Dados próximos precisam de vida útil curta e invalidação reorg. Dados seguros ou finalizados podem viver mais tempo. Os metadados do protocolo raramente mudam, mas ainda podem mudar através de atualizações. Os ativos estáticos e arquivos ABI podem usar hashes de conteúdo.

O cache negativo merece cuidados. Uma transação em falta ou o resultado de código vazio podem significar que o provedor local está por trás. Ausência de cache brevemente e anexar o bloco observado.

## Invalidação e estampagem

Quando uma nova cabeça chega, invalidar apenas as chaves cujo significado depende do estado da cabeça. Chaves históricas por hash permanecem válidas mesmo que esse bloco se torne não canônico, mas os chamados que pedem por história canônica não devem mais recebê-los. Manter mapeamentos canônicos de número para hash separadamente.

A expiração popular pode fazer com que muitos trabalhadores solicitem simultaneamente o mesmo valor caro. Use request coalescing, limited stale-while-revalidate para visualizações não críticas, e expiração aleatória. Não sirva a autorização, solvência ou dados de entrega de transações para preservar a latência.

## Camadas e observação

Navegador, CDN, aplicativo, provedor e nó podem todos cache. Um cabeçalho ou log de resposta deve expor a identidade do bloco e a idade do cache para que os resultados antigos possam ser rastreados. Medir a taxa de acertos ao lado de incidentes sem leitura e carga de origem; uma alta taxa de acertos não é o sucesso se esconder o progresso da cadeia.

## Outras leituras

- [Ethereum JSON- RPC](https://ethereum.org/developers/docs/apis/json-rpc/)
- Ver também: [RPC](./rpc.md), [Manuseamento Reorg](./reorg-handling.md)

---

[← Anterior: Webhooks](./webhooks.md)
·
[Voltar à Infraestrutura](./README.md)
·
[Próximo: Confiabilidade →](./reliability.md)

