# StarkNet

StarkNet, construída por StarkWare, lançou sua rede principal alfa em outubro de 2021 e alcançou a rede principal completa em novembro de 2021. Este capítulo encerra os estudos de caso de rolagem da seção com o que se afasta mais da compatibilidade EVM de qualquer tipo: A StarkNet não executa o bytes EVM, não executa o bytes EVM adjacentes, e requer que contratos sejam escritos para um modelo de execução totalmente diferente do zero.

## Cairo: uma linguagem construída para computação comprovada

Os contratos StarkNet estão escritos em **Cairo**, uma linguagem StarkWare projetado especificamente para ser eficiente para provar a exatidão para, em vez de adaptado a partir de uma linguagem EVM-alvo existente da forma como o compilador zkSync Era traduz Solidity (ver [zkSync](./zksync.md#não-equivalente-a-evm-compatível-com-evm)). Esta é a diferença de compatibilidade mais fundamental entre os estudos de caso desta seção: portando um contrato Ethereum existente para a StarkNet geralmente significa reescrevê-lo no Cairo, não simplesmente redeploying compilado bytecode ou recompilando código fonte idêntico a maneira como se move entre cadeias equivalentes EVM normalmente permite.

## STARKs especificamente, e o que isso troca e ganha

Stark O nome da rede reflecte o seu sistema de prova específico: **STARKS**, não SNARKs, a mesma distinção geral já referida no [Provas de Conhecimento Zero](../cryptography/zero-knowledge.md#snarks-versus-starks-num-relance) e aplicado especificamente para rollups em [Rollups ZK](./zk-rollups.md#snarks-versus-starks-neste-contexto)Isto significa que as provas de validade da StarkNet não requerem nenhuma cerimônia de configuração confiável, e são construídas sobre suposições criptográficas geralmente consideradas mais resistentes a uma ameaça futura de computação quântica do que as suposições de emparelhamento de curvas elípticas em que muitos sistemas SNARK dependem, ao custo de Stark As provas da Net são maiores e geralmente mais caras para verificar em L1 por lote do que as provas de um Rollup baseado em SNARK comparável seriam.

## Abstração de conta nativa, projetada independentemente

Como o zkSync, StarkNet constrói abstração de conta em seu protocolo nativamente em vez de confiar no padrão Ethereum ERC-4337, e cada conta StarkNet, incluindo o que seria um EOA comum em Ethereum, é realmente um contrato inteligente com sua própria lógica de validação programável desde o início. Este é um sistema projetado separadamente da abstração de conta nativa do próprio zkSync, não um padrão compartilhado entre os dois; implementações de abstração de conta da StarkNet e do zkSync, apesar de resolver um problema subjacente similar, não são intercambiáveis ou portáteis entre as duas cadeias.

## Conceitos errôneos comuns

**StarkNet não é simplesmente "outro rollup compatível com EVM com um nome diferente".** Seu modelo de execução, linguagem e arquitetura de conta são projetados de forma independente, sistemas criados com propósito, não uma adaptação EVM; tratá-lo como intercambiável com uma cadeia equivalente a EVM ou compatível com EVM para fins de ferramentas ou porta-contratos é uma fonte real e comum de esforço de migração desperdiçada.

**Escolher STARKs sobre SNARKs não é uma escolha de segurança estritamente melhor.** STARKs evitam uma configuração confiável e oferecem resistência quântica reivindicada mais forte, vantagens genuínas e reais, mas sistemas baseados em SNARK historicamente têm oferecido tamanhos de prova menores e custos de verificação L1 mais baixos; o tradeoff depende mais das prioridades de uma aplicação específica, não de uma classificação universal.

## Outras leituras

- [Documentação StarkNet](https://docs.starknet.io/)
- [Documentação do Cairo](https://docs.cairo-lang.org/)
- Ver também: [zkSync](./zksync.md), [Provas de Conhecimento Zero](../cryptography/zero-knowledge.md)

---

[← Anterior: zkSync](./zksync.md)
·
[Voltar à Camada 2](./README.md)
·
[Próximo: Blockchain Segurança →](../security/README.md)
