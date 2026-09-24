# Sistemas distribuídos

Blockchain é um problema de sistemas distribuídos antes de ser um problema financeiro: um conjunto de computadores independentes, às vezes-adversariais que precisam concordar em uma única história, compartilhada. Esta seção abrange os conceitos específicos da teoria de sistemas distribuídos necessários para entender por que o mecanismo de consenso de Bitcoin é projetado da forma que é, e onde difere de décadas de banco de dados distribuído e pesquisa de tolerância a falhas.

## O que você precisa saber primeiro

[Criptografia](../cryptography/README.md)Esta seção assume familiaridade com funções de hash e assinaturas digitais, uma vez que ambas são componentes de carga dos mecanismos de consenso aqui discutidos.

## Capítulos

1. [Redes de pares a pares](./p2p.md): como os nós se encontram e propagam dados sem servidor central
2. [Replicação](./replication.md): por que cada nó completo armazena e verifica independentemente toda a blockchain
3. [Consenso](./consensus.md): o problema geral, e por que a associação sem permissão de Bitcoin torna mais difícil do que abordagens clássicas
4. [Falhas Bizantinas](./byzantine-faults.md): o modelo de falha onde os participantes podem mentir, não apenas bater
5. [Problema dos generais bizantinos](./byzantine-generals.md): a formulação original de 1982, seu limite de um terço, e como Bitcoin se relaciona com ele
6. [Ataques de Sybil](./sybil-attacks.md): por que prova de trabalho é "um-CPU-um-voto", não "um-node-um-voto"
7. [Teorema da PAC](./cap.md): o tradeoff de consistência/disponibilidade e a escolha específica de Bitcoin
8. [Finalidade](./finality.md): finalidade determinística, probabilística e econômica comparada
9. [Finalidade Probabilística](./probabilistic-finality.md): fórmula real do whitepaper, calculada e verificada

## Próxima

Com a teoria do consenso, [Fundamentos da Cadeia de Blocos](../blockchain/README.md) constrói a estrutura de dados real (blocos, cabeçalhos, a própria cadeia) que o mecanismo de consenso de Bitcoin opera, tratando-o como uma estrutura de dados antes de tratá-lo como um sistema financeiro.

