# Fornecedores de RPC

Um provedor de RPC opera nós e os expõe como um serviço gerenciado. Isso remove as operações de sincronização e frota de uma equipe de aplicativos, mas adiciona limites de provedor, credenciais, comportamento de roteamento e confiança na visão do provedor sobre a cadeia.

## O que o serviço adiciona

Os fornecedores geralmente adicionam balanceamento de carga, roteamento geográfico, cache, contabilidade de pedidos, métodos aprimorados, acesso a arquivos, rastreamento e suporte. Dois endpoints rotulados para a mesma cadeia podem diferir na implementação do cliente, lag de cabeça, histórico retido, limites de log, métodos suportados e comportamento de erro.

Uma aplicação deve sondar os recursos necessários na inicialização ou implantação. ID de cadeia, profundidade de arquivo, suporte ao WebSocket, APIs de rastreamento, intervalo máximo de log, tamanho de lote e tags de bloco suportadas pertencem à configuração ao invés de suposições escondidas em código.

## Confiança e privacidade

O provedor vê endereços IP, consultas de conta, chamadas de contrato e transações enviadas através dele. As consultas de saldo repetidas podem associar endereços com uma sessão de aplicação. Os produtos de transação privada revelam intencionalmente a intenção pendente de um caminho de infraestrutura restrito em vez do mempool público.

Um provedor pode omitir dados, retardar, censurar uma submissão ou retornar um resultado incorreto. Aplicações de alto valor podem comparar hashes de bloco e leituras críticas em provedores operados independentemente ou verificar provas onde o protocolo os suporta. Consultar duas marcas apoiadas pela mesma frota a montante não é redundância independente.

## Limites de taxa e custos

Solicitações de contadores por contagem ou cálculo ponderado. Uma consulta de log trace ou larga pode custar muito mais do que uma leitura de número de bloco. Tempestades de repetição podem transformar um curto intervalo em exaustão limite de taxa. Aplique limites de concorrência do lado do cliente, retroceda exponencialmente com jitter e um orçamento de repetição. Cache imutáveis resultados históricos.

Não tente erros determinísticos de aplicação, como um método inválido ou parâmetros mal formados. Respeite respostas explícitas de limite de taxa e orientação do provedor, mas limite de atraso para o prazo do chamador.

## Falha sem inconsistência

O fracasso deve ser contextualizado. Se uma sequência de solicitação começou no bloco hash A, o recuo deve confirmar A antes de continuar. A transmissão da mesma transação assinada para mais de um endpoint é normalmente segura porque o hash da transação é estável. Construir e assinar uma substituição em cada repetição não é.

Track identidade do provedor, latência, número de cabeça, hash cabeça, classe de erro, e razão failover. Isto torna uma resposta inconsistente diagnosticável em vez de aparecer como um erro aleatório da aplicação.

## Outras leituras

- [Ethereum JSON- RPC](https://ethereum.org/developers/docs/apis/json-rpc/)
- [Nós Ethereum como serviço](https://ethereum.org/developers/docs/nodes-and-clients/nodes-as-a-service/)
- Ver também: [Fornecedores de RPC](../web3/rpc-providers.md), [Confiabilidade](./reliability.md)

---

[← Anterior: RPC](./rpc.md)
·
[Voltar à Infraestrutura](./README.md)
·
[Próximo: Arquivo nós →](./archive-nodes.md)

