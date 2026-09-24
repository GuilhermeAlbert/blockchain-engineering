# Provas de Validade

Uma prova de validade é a prova de conhecimento zero específica que uma ZK rollup submete à L1 ao lado de cada lote, e este capítulo funciona exatamente através de que declaração essa prova realmente estabelece, e o que um contrato de verificador L1 verifica quando recebe um.

## Que declaração a prova realmente prova

Uma prova de validade não prova uma alegação vaga como "este rollup está funcionando corretamente." Ele prova uma declaração matemática precisa e específica sobre um determinado lote: dada uma raiz de estado anterior, um lote de transações (ou um compromisso com os dados desse lote), e as próprias regras de execução do rollup codificadas como um circuito, executando essas transações contra o estado anterior, seguindo exatamente essas regras, produz a nova raiz de estado reivindicada. As entradas públicas da prova são exatamente estes valores (raiz anterior, compromisso de dados em lote, nova raiz); a prova em si demonstra que existe um traço de execução válido conectando-os, sem que o verificador L1 precise re-executar qualquer coisa para confirmá-lo.

```text
Public inputs to the proof:
  - previousStateRoot
  - batchDataCommitment (a hash committing to the batch's transaction data)
  - newStateRoot

The proof demonstrates: "I know a valid execution trace, following the
rollup's own EVM-equivalent rules, that starts at previousStateRoot,
processes exactly the transactions committed to by batchDataCommitment,
and ends at newStateRoot."
```

## O que o contrato de verificador L1 realmente faz

O L1 não volta a executar o lote. Ele executa um cálculo muito menor, de custo fixo: verificando a prova apresentada contra as entradas públicas, usando o algoritmo específico de verificação criptográfica para qualquer sistema de prova (uma variante SNARK ou STARK, ver [Rollups ZK](./zk-rollups.md#snarks-versus-starks-neste-contexto)) o rollup usa. Este passo de verificação é o que torna o ZK rollups prático em tudo: é barato e rápido, independentemente de quão grande ou complexo o lote subjacente de transações era, uma vez que o tamanho da prova e o custo de verificação são em grande parte independentes de quanta computação a prova realmente atesta, uma propriedade chamada **sucinteza** que ambos os SNARKs e STARKs fornecem.

## O trabalho do provador: transformar a execução num circuito de prova

Gerar uma prova de validade requer que toda a lógica de execução do rollup, o comportamento de cada opcode de EVM, seja expressível como um circuito aritmético ou um modelo computacional demonstrável equivalente, uma vez que sistemas de prova de zero conhecimento provam declarações sobre circuitos, não código arbitrário. Construir um circuito que reproduz fielmente o comportamento real do EVM, opcode para opcode, incluindo a sua contabilidade exata de gás e casos de borda, é uma empresa de engenharia substancial em seu próprio direito (frequentemente chamado de **zkEVM**), e diferentes rollups ZK têm tomado diferentes abordagens para como completamente e como eles replicam diretamente o verdadeiro bytecode EVM versus usando um modelo de execução diferente, construído com propósito que é mais fácil de provar, mas requer tradução ou recompilação de contratos existentes Ethereum para executar nele.

## Conceitos errôneos comuns

**Uma prova de validade não prova que as próprias regras de um rollup sejam boas, justas ou livres de bugs.** Isso prova que uma transição de estado específica seguiu corretamente as próprias regras codificadas do rollup; se essas regras contêm um bug (um circuito incorretamente especificado, por exemplo), uma prova de validade pode ser totalmente válida enquanto ainda atesta um resultado que não corresponde ao que os designers do rollup realmente pretendiam.

**Gerar uma prova de validade não é algo que a transação de um usuário comum faça diretamente.** É a infraestrutura de prova do rollup que gera uma prova para um lote inteiro após o fato; um usuário individual submete uma transação normal ao sequenciador e não interage com o processo de prova em tudo.

## Outras leituras

- [Ethereum.org: Rollups ZK](https://ethereum.org/en/developers/docs/scaling/zk-rollups/)
- Ver também: [Provas de Conhecimento Zero](../cryptography/zero-knowledge.md), [Rollups ZK](./zk-rollups.md)

---

[← Anterior: Rollups ZK](./zk-rollups.md)
·
[Voltar à Camada 2](./README.md)
·
[Próximo: Sequenciadores →](./sequencers.md)
