# Fundamentos da Cadeia de Blocos

Esta seção constrói a estrutura de dados blockchain a partir de suas partes individuais, antes de tratá-lo como um sistema financeiro, tratá-lo como o que é fundamentalmente: blocos de dados, ligados por hashes, protegidos por prova de trabalho, com uma regra determinística para resolver desacordos. Tudo aqui é um protocolo diagnóstico de base para o tratamento profundo e específico de Bitcoin que segue na próxima seção.

## O que você precisa saber primeiro

[Criptografia](../cryptography/README.md) (funções especificamente hash e árvores de Merkle) e [Sistemas distribuídos](../distributed-systems/README.md) (especificamente consenso e o teorema da PAC). Esta seção combina ambos diretamente: uma blockchain é uma estrutura de dados criptográficos operada sob um protocolo de consenso distribuído.

## Capítulos

1. [Blocos](./blocks.md): o cabeçalho/corpo dividido, e por que ele existe
2. [Cabeçalhos de Blocos](./block-headers.md): todos os seis campos do cabeçalho 80-byte do Bitcoin, com um exemplo de serialização verificado
3. [Operações](./transactions.md): o modelo UTXO versus o modelo de conta, como uma escolha de design geral
4. [Hashes e Block Linking](./block-linking.md): por que alterar um bloco velho requer refazer cada bloco após ele
5. [Raízes de Merkle](./merkle-roots.md): o campo de cabeçalho que se compromete com cada transação em um bloco
6. [Blocos de Gênesis](./genesis-blocks.md): a exceção necessária e codificada para verificação sem confiança
7. [Altura do Bloco](./block-height.md): posição absoluta versus contagem de confirmação
8. [Tempo de bloco](./block-time.md): o tradeoff propagação-atraso atrás do alvo ~10 minutos do Bitcoin
9. [Reorganizações da Cadeia](./reorgs.md): porque eles são rotina, e quando eles se tornam sérios
10. [Regras de Consenso](./consensus-rules.md): a distinção entre regras de consenso e regras políticas
11. [Escolha do fork](./fork-choice.md): prova cumulativa do trabalho, precisamente, não apenas "cadeia mais longa"
12. [Sem Permissão vs Redes Permitidas](./permissionless-vs-permissioned.md): por que não cada "blockchain" oferece as mesmas garantias

## Compilar um

Ler sobre uma estrutura de dados só vai até agora. [exemplos/simples- blockchain/](../../../examples/simple-blockchain/) é uma implementação pequena, executável TypeScript que constrói, módulo por módulo, tudo coberto nesta seção: blocos, ligação de hash, raizes de Merkle, uma pesquisa básica de prova de trabalho e validação de detecção de adulteração. É explicitamente **não** grau de produção ou compatível com Bitcoin, veja que o projeto é README para exatamente o que omite e porquê, então sua simplicidade não é confundida com uma afirmação sobre o que a segurança real requer.

## Próxima

Continuar a [Bitcoin](../bitcoin/README.md), onde essa mesma estrutura de dados obtém seu tratamento completo e profundo: formatos reais de transação, economia real de mineração, condições reais de gasto baseadas em scripts, e tudo o mais que transforma as abstrações deste capítulo na rede atualmente funcionando.
