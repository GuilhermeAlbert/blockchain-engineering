# Clientes de Execução

O cliente de execução é a metade de um nó Ethereum responsável pelo trabalho coberto durante a maior parte desta seção até agora: processamento de transações, execução de bytecode EVM e manutenção do [trie de estado](./state-trie.md)Este capítulo abrange o que realmente faz e as principais implementações independentes.

## O que faz um cliente de execução

Dado um bloco (com as mãos para ele pelo [cliente de consenso](./consensus-clients.md)), o cliente de execução processa cada transação em ordem, executando o EVM (ver [O EVM](../evm/README.md)) para cada um, atualizando saldos de contas e armazenamento de contrato, computação de gás e taxas, e produzindo o novo estado raiz e recibos de transação. Também serve [JSON- RPC](./json-rpc.md) pedidos, cada `eth_call`, `eth_getBalance`, e consulta semelhante é respondida pelo cliente de execução, uma vez que é o componente que realmente detém e pode consultar o estado atual.

## Implementações importantes

- **Geth (go-ethereum)**: historicamente o cliente de execução mais amplamente executado, escrito em Go, mantido pela Fundação Ethereum.
- **Nethermind**: escrito em C#/.NET.
- **Besu**: escrito em Java, notável por sua empresa e casos de uso de redes autorizadas, além do uso público da mainnet.
- **Erigon**: um cliente derivado do Geth focado especificamente em tempos de sincronização mais rápidos e armazenamento mais eficiente para casos de uso de nó de arquivo (ver [Nós do Arquivo](../infrastructure/archive-nodes.md)).
- **Reth**: um novo cliente baseado em Rust desenvolvido pela Paradigm, focado no desempenho e modularidade.

A diversidade de clientes entre estas implementações independentes é o benefício estrutural específico descrito em [Nós Ethereum](./nodes.md#por-que-esta-divisão-é-uma-força-deliberada-não-uma-complicação-restante), um bug específico para o código de um cliente não afeta nós rodando um diferente, e a comunidade Ethereum monitora ativamente a distribuição do mundo real da qual os operadores de nós de clientes realmente rodam, aumentando historicamente a preocupação quando a participação de um único cliente cresceu o suficiente para representar um risco sistêmico significativo se ele acabou por ter um bug sério.

## Conceitos errôneos comuns

**Diferentes clientes de execução não são diferentes, competindo versões do Ethereum**. São implementações independentes da especificação de protocolo idêntica, esperada para (e, ao trabalhar corretamente, fazer) produzir resultados idênticos byte-for-byte ao processar os mesmos blocos; a diversidade está no software, não nas regras que estão sendo aplicadas.

**Um cliente de execução sozinho não pode participar no consenso de Ethereum**, uma vez que a Fusão, depende inteiramente de um cliente de consenso pareado (ver [Clientes de consenso](./consensus-clients.md)) para dizer-lhe que blocos para processar e validar; não tem nenhuma maneira independente de determinar a cadeia canônica por si só.

## Outras leituras

- [ethereum.org: Clientes de execução](https://ethereum.org/en/developers/docs/nodes-and-clients/#execution-clients)

---

[← Anterior: Nós Ethereum](./nodes.md)
·
[Voltar para Ethereum](./README.md)
·
[Próximo: Clientes de consenso →](./consensus-clients.md)
