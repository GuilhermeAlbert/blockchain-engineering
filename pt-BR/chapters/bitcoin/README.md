# Bitcoin

Esta é a parte mais profunda do livro. Bitcoin recebe o tratamento mais completo aqui porque tudo em [Origens](../origins/README.md), [Economia](../economics/README.md), [Criptografia](../cryptography/README.md), [Sistemas distribuídos](../distributed-systems/README.md), e [Fundamentos da Cadeia de Blocos](../blockchain/README.md) estava construindo para ser capaz de explicar, precisamente e mecanicamente, como funciona a rede Bitcoin atual, em execução, não como analogia ou modelo simplificado, mas como protocolo específico.

## O que você precisa saber primeiro

Tudo o que precede esta seção, especialmente [Fundamentos da Cadeia de Blocos](../blockchain/README.md) (blocos, cabeçalhos, a cadeia) e [Criptografia](../cryptography/README.md) (cavalos, chaves, assinaturas, árvores Merkle). Esta seção aplica essas ferramentas diretamente à implementação real e específica do Bitcoin Core, com exemplos de código verificados ao longo.

## Capítulos

### Rede e nós

1. [Nós de Bitcoin](./nodes.md): nós, mineradores e carteiras como papéis distintos e independentes
2. [A rede Bitcoin](./network.md): escala do mundo real e velocidade de propagação
3. [Nós Completos](./full-nodes.md): que validação independente verifica realmente
4. [Clientes leves](./light-clients.md): SPV, e precisamente o que ele faz e não verifica
5. [Núcleo do Bitcoin](./bitcoin-core.md): a implementação de referência como, na prática, a especificação

### Operações

6. [Transações de Bitcoin](./transactions.md): estrutura, serialização e um cálculo txid verificado
7. [O Modelo UTXO](./utxo.md): onde os bitcoins realmente "vivem", afirmou precisamente
8. [Entradas e Saídas](./inputs-and-outputs.md): referenciando, desbloqueando, e a taxa que nunca é um campo declarado
9. [Taxas de transação](./fees.md): peso, vsize, e porque as taxas são preço por byte
10. [O Mempool](./mempool.md): por que não há um único mempool global, e como funciona o Substituir-Por-Fee
11. [Confirmação da transação](./confirmation.md): transformar a profundidade da confirmação numa decisão prática de risco
12. [Transações de base de moeda](./coinbase-transactions.md): o tipo de transação sem entrada real

### Programas e condições de despesa

13. [Bitcoin Script](./script.md): a working, verificated stack-machine interpretador
14. [ScriptPubKey e ScriptSig](./scripts.md): os tipos de script padrão, de relance
15. [P2PKH](./p2pkh.md)
16. [P2SH](./p2sh.md)
17. [SegWit](./segwit.md): a correção de maleabilidade que também mudou a contabilidade de taxas
18. [Taproot](./taproot.md): fazendo gastos complexos indistinguíveis de simples
19. [Ordinais e Inscrições](./ordinals.md): um uso emergente de Taproot, e o debate que provocou

### Mineração

20. [Prova de Trabalho](./proof-of-work.md): o que um minerador realmente calcula, com a própria fórmula do whitepaper
21. [Mineração](./mining.md): o processo completo, fim a fim, e economia mineira
22. [Dificuldade em Mineração](./difficulty.md): alvo, bits e dificuldade como uma relação
23. [Ajuste de Dificuldade](./difficulty-adjustment.md): a fórmula de reorientação, com sua pinça
24. [Nonce](./nonce.md): por que 4 bytes não é mais suficiente, e como extranonce preenche a lacuna
25. [Bloquear recompensas](./block-rewards.md): subsídio versus recompensa total
26. [O halving](./halving.md): o calendário histórico completo
27. [Pools de Mineração](./mining-pools.md): redução de variância, e a centralização que introduz
28. [ASICs](./asics.md): por que a mineração de CPU e GPU se tornou permanentemente sem fins lucrativos
29. [Hashrate](./hashrate.md): uma estimativa, não uma medição
30. [51% Ataques](./51-percent-attacks.md): precisamente o que um atacante maioria pode e não pode fazer
31. [Consumo de Energia](./energy.md): o mecanismo, a escala e o verdadeiro debate

### Política monetária do Bitcoin

32. [21 milhões de BTC](./21-million.md): de onde vem o número, e o que faz e não garante
33. [Esquema de Emissão](./issuance.md): a curva desinflacionária, em comparação com ouro e fiat
34. [Stock-to-Flow](./stock-to-flow.md): um modelo de preço contestado, e porque é contestado
35. [Moedas Perdidas](./lost-coins.md): por que "perdido" é irrecuperável pelo design, não um bug
36. [Mercado de Taxas](./fee-market.md): bloco espaço como um recurso escasso com um mecanismo de preços real
37. [Orçamento de Segurança a Longo Prazo](./security-budget.md): a pergunta aberta que esta seção constrói em direção

## Experimentos

- [Exemplos/bitcoin/](../../../examples/bitcoin/): decodificação de transações reais e blocos
- Cada exemplo de código ao longo desta seção foi executado e verificado diretamente, não manualmente

## Próxima

Continuar a [Atualizações de forks e protocolos](../forks/README.md) para ver como o Bitcoin muda ao longo do tempo sem uma autoridade central, incluindo o SegWit e o tamanho do bloco disputam os capítulos de transação e script desta seção configurados, mas não resolveram. Leitores mais interessados em gerenciamento de chaves podem pular para [Carteiras e Gestão de Chaves](../wallets/README.md).
