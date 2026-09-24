# L1 vs. L2

O roteiro de escala de Ethereum estabeleceu, ao longo de vários anos de debate, uma divisão específica do trabalho: a cadeia base (L1) prioriza a segurança e a descentralização sobre o rendimento bruto, e as cadeias separadas (L2s) construídas sobre ele priorizam o rendimento, herdando a segurança de L1 em vez de construir a sua do zero. Este capítulo cobre o que essa divisão realmente significa mecanicamente, antes que o resto desta seção funcione através do projeto dominante L2, o rollup, em detalhe.

## Porque é que o Ethereum não criou apenas o próprio rendimento da L1

Lembre-se da tensão trilemma blockchain já coberta para o debate de escala do próprio Bitcoin (ver [Debate sobre o Tamanho do Bloco](../forks/block-size-war.md)): aumentar diretamente o rendimento da transação de uma cadeia de base, aumentando seu limite de gás ou tamanho de bloco, aumenta o hardware e largura de banda necessários para executar um nó completo, que empurra para menos, nós mais poderosos realmente validar a cadeia. Ethereum's rollup-centric roadmap é uma resposta deliberada para esta tensão: mantenha L1 em si deliberadamente restringido, de modo que executar um nó completo Ethereum permanece acessível em hardware comum, e empurre o trabalho de execução de transação real para separar sistemas L2 que não carregam essa mesma restrição, enquanto ainda confia em L1 para as coisas específicas L1 é bom em fornecer: segurança e disponibilidade de dados.

## O que significa realmente "herdar segurança L1"

Um L2 não diz apenas estar seguro porque está associado ao Ethereum. Herda a segurança da Ethereum através de um mecanismo específico e verificável: uma L2 publica periodicamente dados sobre as suas próprias transações para a L1 (ver [Disponibilidade de Dados](./data-availability.md)), e inclui uma maneira de qualquer um para verificar criptograficamente que o estado reivindicado do L2 realmente seguiu a partir desses dados publicados, corretamente, de acordo com as próprias regras do L2. O mecanismo de verificação exato, se um período de desafio que permite a alguém contestar uma alegação incorreta (ver [Provas de Fraude](./fraud-proofs.md)) ou uma prova criptográfica apresentada juntamente com cada reclamação (ver [Provas de Validade](./validity-proofs.md)), é o que realmente determina quanto da garantia de segurança de L1 um L2 genuinamente herda, e por quanto atraso.

## Nem todos os L2 herdam segurança da mesma forma

"Layer 2" é usado de forma frouxa para descrever sistemas com modelos de confiança significativamente diferentes, ecoando exatamente a cautela deste livro aplicado aos próprios sistemas de escala de Bitcoin (ver [Escala de Bitcoin](../bitcoin-scaling/README.md)): um rollup que publica dados completos de transação para L1 e permite que qualquer pessoa independentemente verificar seu estado herda segurança muito diferente de uma cadeia lateral com seu próprio conjunto de validador separado e apenas uma ponte conectando-o de volta para L1. Esta seção trata "rollup" e "L2" como termos relacionados, mas não sinónimos, por exatamente esta razão, e abrange os mecanismos específicos (ver [Rollups](./rollups.md)) em vez de tratar "é um L2" como uma única reivindicação de segurança uniforme.

## Conceitos errôneos comuns

**Um L2 não é automaticamente tão seguro quanto o L1 só porque ele se fixa em L1 eventualmente.** A segurança real depende inteiramente do mecanismo de verificação específico que liga o estado alegado do L2 ao que foi publicado em L1, que varia significativamente entre os projetos de rollup e varia ainda mais entre um rollup genuíno e uma cadeia lateral que simplesmente liga a L1.

**Taxas mais baixas sobre um L2 não são livres de tradeoffs.** Eles vêm de agrupar os custos de muitas transações e executar fora do próprio ambiente restrito da L1; o que um L2 desiste em troca, seja um atraso de retirada, uma suposição de confiança diferente, ou ambos, é específico para que o projeto da L2 e vale a pena verificar explicitamente em vez de assumir.

## Outras leituras

- [Ethereum: um roteiro centrado no roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698): Vitalik Buterin, 2020
- Ver também: [Rollups](./rollups.md), [Disponibilidade de Dados](./data-availability.md)

---

[← Anterior: Camada 2](./README.md)
·
[Voltar à Camada 2](./README.md)
·
[Próximo: Rollups →](./rollups.md)
