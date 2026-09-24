# Nós do Arquivo

Um nó de arquivo mantém o estado histórico para que ele possa responder perguntas sobre uma conta ou contrato em um bloco antigo sem repetir a cadeia para reconstruir esse estado. Isso difere da retenção de blocos antigos, transações e recibos.

## História tem várias camadas

Um nó completo normal verifica a cadeia e mantém o estado atual. Pode reter todos os corpos de bloco e recibos enquanto poda o estado mais velho tenta. Tal nó pode retornar uma transação antiga, mas pode não responder `eth_getBalance` ou `eth_call` no bloco onde essa transação ocorreu.

Pesquisas de estado histórico suportam exploradores, contabilidade, investigações, backfills indexer, e simulação de contrato em alturas antigas. O rastreamento pode exigir dados adicionais retidos ou índices específicos do cliente. “Archive” não é uma descrição completa da capacidade; nomeie os métodos e range as necessidades de carga de trabalho.

## Armazenamento e diferenças de clientes

O armazenamento de arquivos depende da implementação do cliente, layout do banco de dados, estratégia de poda, idade da cadeia e índices habilitados. Estimativas de tamanho publicadas tornam-se obsoletos. Meça o crescimento no cliente escolhido e inclua compactação, instantâneos, backup e tempo de restauração.

Alguns clientes podem reconstruir o estado histórico a partir de conjuntos de mudanças retidas ou usar esquemas de armazenamento mais recentes que diferem das tentativas de estado tradicionais por bloco. O requisito voltado para o usuário permanece o mesmo: devolva o resultado correto para um bloco histórico preso dentro da latência necessária.

## A servir as cargas de trabalho dos arquivos

Separar as perguntas históricas caras do tráfego de cabeça para que um grande backfill não pode passar fome de submissão de transações ou de verificação de saúde. Concorde e alcances. Cache resultados imutáveis por chain ID e bloqueio hash. Um número de bloco sozinho é inseguro até que o bloco é final sob a política da aplicação.

Teste o bloco mais antigo necessário, não só recente. Os provedores podem anunciar o acesso ao arquivo enquanto impõem limites de plano, exclusões de método ou rendimento reduzido.

## Alternativas

Um indexador pode responder a um conjunto definido de questões históricas mais eficientemente do que o acesso a um estado arbitrário. Um instantâneo ou conjunto de dados analíticos pode servir para cargas de trabalho de pesquisa. Os serviços de prova podem responder a consultas estreitas com provas verificáveis. Nenhum substitui um nó de arquivo quando as aplicações precisam de execução de contrato histórico arbitrária ou leituras de estado.

## Outras leituras

- [Nós do arquivo Ethereum](https://ethereum.org/developers/docs/nodes-and-clients/archive-nodes/)
- [Modo de arquivo Geth](https://geth.ethereum.org/docs/fundamentals/archive)
- Ver também: [Estado Ethereum](../ethereum/state.md), [Indexadores](./indexers.md)

---

[← Anterior: Fornecedores RPC](./rpc-providers.md)
·
[Voltar à Infraestrutura](./README.md)
·
[Próximo: Indexadores →](./indexers.md)

