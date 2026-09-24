# Rollups ZK

Um rollup de conhecimento zero prova que suas transições de estado estão corretas antecipadamente, usando uma prova criptográfica apresentada ao lado de cada lote, em vez de assumir a exatidão e confiar em um período de desafio como um rollup otimista faz. Este capítulo abrange o que muda mecanicamente quando um rollup fornece prova em vez de meramente uma reivindicação.

## Prova em vez de suposição

Recordar a estrutura de rollup compartilhada de [Rollups](./rollups.md): um sequenciador batelata transações, executa-as, e publica o resultado para L1. Um rollup ZK acrescenta mais uma coisa a essa publicação: a **prova de validade**, uma prova criptográfica (coberto em geral em [Provas de Conhecimento Zero](../cryptography/zero-knowledge.md) e especificamente como aplicado aqui em [Provas de Validade](./validity-proofs.md)) demonstrando que o novo estado publicado na verdade seguiu corretamente o estado anterior e o lote de transações, de acordo com as próprias regras de execução do rollup. L1 verifica essa prova diretamente, barata, como parte da aceitação do lote. Não há período de desafio, porque não há necessidade de alguém ser capaz de contestar uma alegação que já foi comprovada correta.

## Por que isso remove o atraso de retirada

Uma vez que uma prova de validade é verificada e aceita (ou rejeitada) no momento em que um lote é publicado, um estado de rollup ZK não precisa de um período de espera antes que possa ser tratado como final em L1. Este é o pagamento prático que distingue os rollups ZK dos rollups otimistas mais diretamente para um usuário comum: as retiradas de volta para L1 através de uma ponte nativa do rollup ZK podem ser quase instantâneas uma vez que a prova para o lote relevante é verificada on-chain, em vez de exigir o período de desafio de aproximadamente uma semana [Rollups Optimistas](./optimistic-rollups.md#por-que-as-retiradas-levam-cerca-de-uma-semana) impõe.

## O custo real: geração de provas

Gerar uma prova de validade para um lote inteiro de execução EVM é computacionalmente caro, significativamente mais caro do que simplesmente executar o lote em si seria. Esta é a verdadeira troca ZK rollups make: barato, rápido on-chain *verificação* em troca de caro off-chain *geração de provas*, que exige infraestruturas especializadas (muitas vezes chamadas de **prover**) e leva tempo real, não trivial e recursos de computação por lote. O rendimento prático e a latência de um rollup ZK dependem muito da eficiência com que seu sistema de comprovação específico pode gerar essas provas, uma área ativa e contínua de otimização de engenharia nas principais implementações de rollup ZK.

## SNARKs versus STARKs neste contexto

Os dois sistemas de prova dominantes [SNARKs versus STARKs](../cryptography/zero-knowledge.md#snarks-versus-starks-num-relance) mostrar-se diretamente em como diferentes rollups ZK são realmente construídos. zkSync e Scroll usam sistemas de prova baseados em SNARK; StarkNet usa STARKs especificamente, refletidos diretamente em seu nome. Os mesmos tradeoffs gerais aplicam-se aqui como no capítulo de criptografia: sistemas baseados em SNARK historicamente produziram provas menores, mais baratas em verificar-em-L1, alguns usando uma configuração confiável, enquanto sistemas baseados em STARK evitam uma configuração confiável e são tipicamente considerados mais bem posicionados contra uma ameaça de computação quântica, ao custo de tamanhos de prova maiores e geralmente maiores custos de gás de verificação L1 por lote.

## Conceitos errôneos comuns

**Os rollups ZK não são automaticamente "mais seguros" do que os rollups otimistas em todos os sentidos.** Ambos, feitos corretamente, fornecem fortes garantias de segurança enraizadas em L1; a diferença real está em *quando* a correção é estabelecida (na frente, via prova, versus após uma janela de desafio sem disputas bem sucedidas) e nos tradeoffs de engenharia e custos resultantes, não é um simples ranking melhor ou pior.

**"Zero-conhecimento" neste contexto não significa que o rolagem esconde dados de transação do público.** Um rollup ZK ainda publica os dados subjacentes de transação para L1 para disponibilidade de dados, exatamente como um rollup otimista faz; "zero-conhecimento" refere-se especificamente à propriedade matemática do sistema de prova de provar uma declaração verdadeira sem revelar as entradas privadas usadas para prová-la, uma propriedade que a maioria dos rollups ZK atuais nem mesmo usam para esconder seus próprios conteúdos de transação, que permanecem públicos.

## Outras leituras

- [Ethereum.org: Rollups ZK](https://ethereum.org/en/developers/docs/scaling/zk-rollups/)
- [Documentação StarkNet](https://docs.starknet.io/)
- [Documentação do zkSync](https://docs.zksync.io/)
- Ver também: [Provas de Conhecimento Zero](../cryptography/zero-knowledge.md), [Provas de Validade](./validity-proofs.md)

---

[← Anterior: Provas de Fraude](./fraud-proofs.md)
·
[Voltar à Camada 2](./README.md)
·
[Próximo: Provas de validade →](./validity-proofs.md)
