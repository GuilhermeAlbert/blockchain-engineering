# Sequenciadores

O sequenciador é o componente de um rollup que decide quais transações são incluídas e em que ordem, antes que qualquer coisa seja executada ou publicada para L1. Este capítulo cobre o que um sequenciador realmente faz, e um fato específico, atual que vale a pena afirmar claramente em vez de encobrir: a partir de 2026, todo sequenciador de rollup principal é operado por uma única entidade centralizada.

## O que um sequenciador realmente faz

Quando um usuário envia uma transação para um rollup, ele vai para o sequenciador primeiro, não diretamente para L1. O sequenciador coleta transações pendentes, ordena-as (a regra exata de ordenação, seja estrita de primeiro-chegado-primeiro-servido ou algo mais complexo, é a própria política do sequenciador), executa-as contra o estado atual do rollup, e dá ao usuário uma rápida, confirmação provisória, bem antes de que o lote é realmente publicado e estabelecido em L1. Esta é toda a fonte de uma experiência rápida e barata do usuário: a confirmação provisória do sequenciador chega em aproximadamente o tempo que um serviço centralizado levaria, não o tempo que o próprio L1 levaria, com a publicação e verificação L1 (prova de fraude ou prova de validade) acontecendo depois, assincronicamente, para tornar esse estado provisório realmente final.

## Por que a centralização do sequenciador é um comércio genuíno e atual

Um operador seqüenciador único e centralizado, que é como, essencialmente, cada grande rollup (Arbitrum, OP Mainnet, Base, zkSync Era, entre outros) opera atualmente, tem dois poderes específicos que valem a pena nomear diretamente: pode reordenar transações antes de serem incluídas (uma forma de extração MEV, veja [MEV](../security/mev.md)), e pode, em princípio, censurar uma transação específica, simplesmente recusando-se a incluí-la. A maioria dos grandes rolups mitigar o risco de censura especificamente com um **inclusão forçada** mecanismo: um caminho mais lento e caro que permite que um usuário submeta uma transação diretamente ao contrato L1 do rollup, contornando o sequenciador inteiramente, garantindo eventual inclusão mesmo que o sequenciador se recuse a cooperar. Isso não elimina o poder do sequenciador sobre a ordenação de transações, mas limita o quanto um sequenciador de censura pode realmente evitar.

## O caminho para o sequenciamento descentralizado

Vários ecossistemas de rollup têm roteiros públicos ativos para remover essa dependência de um único operador, geralmente através **sequenciador compartilhado** designs: uma rede separada e descentralizada de nós (Sistemas Espresso e Astria estão entre os projetos mais desenvolvidos neste espaço) que vários rolups diferentes poderiam usar para a ordenação de transações, ao invés de cada rollup executando seu próprio sequenciador único e centralizado. A partir de 2026, nenhum dos principais desdobramentos enviou sequenciamento totalmente descentralizado na produção; linhas do tempo realistas em todo o ecossistema geralmente apontam para o final de 2026 ou 2027 para as primeiras implantações de produção, uma verdadeira lacuna, atualmente não resolvida entre a descentralização teórica do modelo de segurança de rollup e sua realidade operacional atual.

## Conceitos errôneos comuns

**Um sequenciador de rollup sendo centralizado não significa que o rollup *fundos* são controladas centralmente.** O sequenciador controla a ordenação de transações e a execução provisória, não a custódia de fundos de usuários, que permanecem protegidos pelos contratos inteligentes do rolagem em L1 e seu mecanismo de verificação (provas de fraude ou provas de validade); um sequenciador malicioso pode reordenar ou atrasar transações, mas forçar uma transição de estado inválida ainda requer derrotar esse mecanismo de verificação, não apenas controlar o sequenciador.

**A inclusão forçada não equivale à descentralização do sequenciador.** Ele fornece um retorno garantido, se lento e caro, contra um sequenciador de censura; ele não distribui o poder de ordem de transação de caso comum do sequenciador em várias partes da forma que uma rede de sequenciador realmente descentralizada faria.

## Outras leituras

- [Documentação Arbitrum: sequenciador](https://docs.arbitrum.io/how-arbitrum-works/sequencer)
- [Documentação sobre otimismo](https://docs.optimism.io/)
- Ver também: [L1 vs. L2](./l1-vs-l2.md), [MEV](../security/mev.md)

---

[← Anterior: Provas de validade](./validity-proofs.md)
·
[Voltar à Camada 2](./README.md)
·
[Próximo: Disponibilidade de dados →](./data-availability.md)
