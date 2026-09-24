# Confiabilidade

Infraestrutura blockchain confiável retorna dados com um contexto conhecido de cadeia, permanece disponível dentro dos limites estabelecidos e recupera sem perder ou duplicar efeitos. Processo tempo de serviço sozinho não estabelece nenhuma dessas propriedades.

## Medir a correcção e a frescura

Rastreie o número de cabeça e hash, cabeça segura ou finalizada quando disponível, distância de pares independentes, checkpoint indexer, idade da fila, backlog webhook, latência RPC, classes de erro e lag de replicação do banco de dados. Um endpoint HTTP saudável pode servir uma cabeça velha. Um nó atual pode alimentar um indexador preso milhares de blocos atrás.

Os objetivos de nível de serviço devem nomear o ponto de operação e consistência: por exemplo, registros recentes finalizados disponíveis dentro de um atraso declarado, ou submissão de transação reconhecida dentro de uma latência declarada. Combinando cada método em uma porcentagem de disponibilidade esconde falhas em caminhos caros ou críticos.

## A redundância precisa de modos de falha independentes

Réplicas em uma região compartilham falhas de rede e nuvem. Dois provedores podem compartilhar um cliente a montante ou uma camada de roteamento. Clientes idênticos compartilham defeitos de software. Independência pode exigir diferentes regiões, operadores, implementações de clientes, credenciais e pipelines de implantação.

Testes de falha devem verificar o ID da cadeia, acordo de cabeça, capacidade de arquivo, métodos suportados e limites de taxa antes da movimentação do tráfego de produção. Um recuo que nunca serviu a consultas reais é uma suposição.

## Objetivos de recuperação

O objetivo do tempo de recuperação indica quanto tempo a restauração pode levar. O objetivo do ponto de recuperação indica quantos dados não reconstruíveis podem ser perdidos. Os dados da cadeia podem ser reproduzidos, mas chaves de assinatura locais, segredos do webhook, etiquetas, pontos de verificação e configuração podem não ser reprodutíveis da cadeia.

Tempo de resincronização do documento e rendimento de preenchimento. Se replay processa 100 blocos por minuto, enquanto a cadeia cria mais trabalho do que isso, o serviço nunca alcança.

## Modos degradados

Escolha o comportamento explícito para dados obsoletos ou parciais. Um portfólio pode mostrar uma última atualização. Um sistema de retirada pode parar em vez de valorizar a garantia de um oráculo velho. Um serviço de transação pode aceitar bytes assinados em uma fila durável enquanto os provedores não estão disponíveis, mas deve informar que o envio de chamadas não chegou à rede.

Os disjuntores precisam de regras de reabertura e propriedade do operador. O failover automático precisa de um limiar que não se apazigua entre fornecedores discordantes.

## Perfurações e reconciliação

Perda de nó de teste, limites de taxa de provedor, restauração de banco de dados, WebSockets caiu, webhooks duplicados, reorgs, checkpoints corruptos e credenciais expiradas. Empregos de reconciliação comparam totais derivados e registros amostrados contra RPC canônico. Apanham divergências silenciosas que os monitores de tempo livre falham.

## Outras leituras

- [Nós e clientes Ethereum](https://ethereum.org/developers/docs/nodes-and-clients/)
- [Monitorização do nós do gráfico](https://thegraph.com/docs/en/indexing/tooling/graph-node/)
- Ver também: [Executar um Nó](./running-a-node.md), [Pipelines de Dados](./data-pipelines.md)

---

[← Anterior: Caching](./caching.md)
·
[Voltar à Infraestrutura](./README.md)
·
[Próximo: Governança →](../governance/README.md)
