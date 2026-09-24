# Nós de Bitcoin

Um nó Bitcoin é qualquer software de execução de computador que fala o protocolo Bitcoin. Este capítulo breve configura vocabulário o resto da seção Bitcoin depende constantemente, a diferença entre um nó, um minerador, e uma carteira, três papéis que são fáceis de confraternizar, mas funcionalmente distintos e frequentemente realizados por diferentes pedaços de software ou até mesmo pessoas diferentes inteiramente.

## Três papéis distintos

- **Um nó** valida transações e blocos contra as regras de consenso do protocolo (ver [Regras de Consenso](../blockchain/consensus-rules.md)) e retransmite dados válidos para seus pares sobre o [rede peer-to-peer](../distributed-systems/p2p.md). Executar um nó não requer mineração, segurando qualquer bitcoin, ou tendo uma carteira em tudo. O trabalho de um nó é verificar e retransmitir, ponto final.
- **Um minerador** compete criar novos blocos procurando por uma prova de trabalho válida (ver [Mineração](./mining.md)). Um minerador normalmente também executa software de nó completo (para saber quais transações e blocos são atualmente válidos para construir), mas o hardware e software específico de mineração é uma camada distinta, adicional em cima da operação de nó comum.
- **Uma carteira** gerencia chaves privadas e constrói transações em nome de um usuário (ver [O que é uma carteira?](../wallets/README.md)). Uma carteira não precisa executar um nó completo, muitas carteiras se conectam ao nó de outra pessoa ou um serviço de terceiros em vez disso, uma distinção coberta totalmente em [Nós Completos](./full-nodes.md) e [Clientes leves](./light-clients.md).

Estes papéis são comumente combinados (um minerador doméstico pode executar nod, mineração e software de carteira na mesma máquina), mas são arquitetônicamente independentes. Uma troca pode executar milhares de nós sem mineração em tudo, enquanto uma grande operação de mineração pode contar com a infraestrutura de nó de outra pessoa inteiramente em vez de executar a sua própria.

## O que um nó realmente faz, passo a passo

1. Conecta aos pares e troca dados sobre o [Rede P2P](../distributed-systems/p2p.md).
2. Recebe novas transações e blocos como eles são transmitidos.
3. Independentemente valida cada um contra o conjunto completo de [Regras de consenso](../blockchain/consensus-rules.md), verificando assinaturas, verificando se as entradas já não estão gastas, verificando prova de trabalho, e todas as outras regras que o protocolo define.
4. Retransmite dados válidos para seus próprios pares; silenciosamente deixa (e normalmente se desconecta de pares que repetidamente enviam) dados inválidos.
5. Mantém sua própria cópia local da corrente atual melhor e, para nós completos, o histórico completo necessário para tê-lo verificado independentemente do bloco de gênese adiante.

## Tipos de nós que este livro cobre separadamente

Porque a distinção tem consequências reais, práticas para os requisitos de segurança e recursos, este livro dá nós completos e clientes leves seus próprios capítulos dedicados em vez de tratar "nó" como uma única categoria indiferenciada:

- [Nós Completos](./full-nodes.md): baixar e validar independentemente toda a blockchain, não confiando em ninguém.
- [Clientes leves](./light-clients.md): baixar apenas bloquear cabeçalhos e confiar em [Provas Merkle](../cryptography/merkle-proofs.md) e confiar na maioria honesta para verificação de transações, negociando alguma minimização de confiança para requisitos de recursos drasticamente mais baixos.

## Conceitos errôneos comuns

**Executar um nó não é o mesmo que mineração, e não por si só ganhar qualquer bitcoin.** Operadores de nó completo validam e retransmitem dados como uma contribuição voluntária para a descentralização da rede e sua própria verificação minimizada pela confiança. Não há nenhuma recompensa financeira direta para executar um nó, ao contrário da mineração.

**"A rede Bitcoin" não é uma única entidade que alguém possa inspecionar de um ponto de vantagem.** É o resultado emergente de milhares de nós operados independentemente, cada um com a sua própria visão formada por quaisquer pares a que ele acontece de estar conectado, veja [Redes de pares a pares](../distributed-systems/p2p.md).

## Outras leituras

- [Bitcoin Referência do desenvolvedor principal](https://developer.bitcoin.org/reference/)

---

[← Anterior: Como funciona o Bitcoin](./README.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: A rede Bitcoin →](./network.md)
