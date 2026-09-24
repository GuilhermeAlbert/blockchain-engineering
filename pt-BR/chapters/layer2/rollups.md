# Rollups

Um rollup executa transações fora do L1 de Ethereum, em seguida, publica os dados e uma maneira de verificar a correção de volta para L1. Este capítulo abrange a estrutura partilhada que cada projeto de rollup tem em comum, antes de os próximos capítulos serem divididos em dois mecanismos específicos de verificação, optimistas e sem conhecimento.

## O padrão de rollup compartilhado

Cada rolagem, independentemente do seu mecanismo de verificação específico, segue o mesmo ciclo básico:

1. Usuários submetem transações ao rollup, não diretamente à L1.
2. A **sequenciador** (coberto em [Sequenciadores](./sequencers.md)) encomenda essas transações e executa-as contra o próprio estado do rollup, completamente fora L1, que é o que torna as transações rollup rápido e barato em comparação com a execução diretamente em L1.
3. O sequenciador periodicamente agrupa muitas transações e publica seus dados para L1 (ver [Disponibilidade de Dados](./data-availability.md)), de modo que qualquer pessoa, não apenas o sequenciador, tem a informação necessária para reconstruir o estado do rollup de forma independente.
4. O novo estado do rollup, após o processamento desse lote, é verificado contra L1 através de um de dois mecanismos: um período de desafio durante o qual qualquer pessoa pode disputar uma reivindicação incorreta (**Rollups otimistas**, ver [Rollups Optimistas](./optimistic-rollups.md)), ou uma prova criptográfica apresentada ao lado do próprio lote, provando a exatidão sem precisar de um período de desafio em tudo (**Rollups de conhecimento zero**, ver [Rollups ZK](./zk-rollups.md)).

## Por que "rollup" significa especificamente que os dados são publicados para L1

A propriedade definidora, de suporte de carga de um rollup, como distinto de outros projetos L2, é o passo 3: publicar dados suficientes para L1 que qualquer pessoa, usando apenas informações publicamente disponíveis, poderia reconstruir todo o estado do rollup do zero, sem precisar confiar nas próprias reivindicações do sequenciador sobre o que aconteceu. Isto é o que faz um rollup significativamente diferente de uma cadeia lateral que apenas checkpoints uma raiz de estado ocasional para L1 sem publicar os dados subjacentes da transação: a segurança de um rollup baseia-se na disponibilidade de dados mais um mecanismo de verificação, enquanto um sistema de retenção de dados não tem como uma parte externa para pegar uma reivindicação de estado inválida mesmo em princípio, uma vez que as informações necessárias para detectá-lo nunca foi tornado público.

## Bater é de onde vem a poupança de custos

Um rollup amortiza o custo de escrever para L1 em cada transação em um lote, a mesma economia de mercado de taxa já coberta para [Correcção de Transações](../bitcoin-scaling/batching.md) em Bitcoin: A publicação e verificação de dados L1 tem um custo em grande parte fixo por lote, espalhando esse custo em centenas ou milhares de transações em um único lote impulsiona o custo por transação em L1 para baixo substancialmente em comparação com o que cada uma dessas transações teria custo de execução em L1 individualmente.

## Conceitos errôneos comuns

**Um rollup não é simplesmente "uma versão mais rápida do Ethereum".** É um ambiente de execução separado, com seu próprio sequenciador e sua própria mecânica de retirada, cuja segurança depende do mecanismo de verificação específico que o liga de volta a L1; entender qual mecanismo um determinado rollup usa, e quais são seus pressupostos atuais de confiança, importa mais do que o rótulo geral "rollup" por si só.

**Publicar dados para L1 não garante, por si só, que o estado de um rollup esteja correto.** Disponibilidade de dados significa qualquer pessoa *poderia* verificar o estado de forma independente, dado o mecanismo para fazê-lo; é o mecanismo específico de verificação (provas de fraude ou provas de validade) que realmente impõe a correção, e os dois fornecem garantias significativamente diferentes, contempladas nos próximos dois capítulos.

## Outras leituras

- [Ethereum.org: rollups](https://ethereum.org/en/developers/docs/scaling/#rollups)
- Ver também: [L1 vs. L2](./l1-vs-l2.md), [Disponibilidade de Dados](./data-availability.md), [Sequenciadores](./sequencers.md)

---

[← Anterior: L1 vs. L2](./l1-vs-l2.md)
·
[Voltar à Camada 2](./README.md)
·
[Próximo: Rollups Optimistic →](./optimistic-rollups.md)
