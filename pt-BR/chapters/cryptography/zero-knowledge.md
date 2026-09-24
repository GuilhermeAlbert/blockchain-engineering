# Provas de Conhecimento Zero

Uma prova de conhecimento zero permite que uma parte (o provador) convença outra parte (o verificador) de que uma declaração é verdadeira, sem revelar qualquer informação além do fato de que é verdade. Este capítulo dá um tratamento introdutório, intuição-primeiro, o suficiente para entender por que [Rollups ZK](../layer2/zk-rollups.md) e protocolos de preservação da privacidade usam este primitivo, e onde ir para a profundidade matemática completa este livro não cobre em detalhe.

## O problema

Considere provar que você conhece a chave privada correspondente a uma chave pública, sem revelar a chave privada em si. Isto é, de fato, exatamente o que [assinatura digital](./digital-signatures.md) já realiza, e é, em seu núcleo, um tipo específico e limitado de prova de conhecimento zero (provando conhecimento de um logaritmo discreto, sem revelá-lo). Mas a questão geral vai mais longe: você pode provar *qualquer* a instrução computacional ("eu executei este programa em alguma entrada secreta e ele produziu esta saída específica, conhecida publicamente") sem revelar a entrada secreta, e sem que o verificador precise refazer o cálculo propriamente dito para verificar?

Esta versão generalizada é o que os modernos sistemas de prova de conhecimento zero (zk-SNARKs, zk-STARKs, e construções relacionadas) fornecem, e está subjacente a dois casos de uso muito diferentes abordados em outro lugar neste livro: **privacidade** (provar que uma transação é válida sem revelar o seu montante ou partes) e **escala** (provar um lote de milhares de transações foi processado corretamente, permitindo que um verificador verifique uma pequena prova em vez de re-executar cada transação, veja [Provas de Validade](../layer2/validity-proofs.md)).

## As três propriedades necessárias

Um sistema de prova de conhecimento zero válido deve satisfazer:

- **Completação**: se a declaração é realmente verdadeira, um provador honesto pode sempre convencer um verificador honesto.
- **Som**: se a declaração for falsa, nenhum provador desonesto (não importa o quanto poder computacional ou inteligência eles têm) pode convencer o verificador que é verdade, exceto com probabilidade insignificante.
- **Zero-conhecimento**: o verificador não aprende nada além do fato de que a afirmação é verdadeira, não a entrada secreta, não quaisquer valores intermediários, nada que os ajude a derivar o segredo.

## Construindo intuição: a analogia da caverna

A ilustração clássica, amplamente utilizada (conhecida como "A Caverna de Ali Baba", de um jornal de 1989 por Jean-Jacques Quisquater e colegas) descreve uma caverna circular com uma única entrada e uma porta trancada bloqueando uma passagem entre seus dois forks, aberta apenas com uma senha secreta. Peggy (o provador) quer convencer Victor (o verificador) ela sabe a senha, sem revelar.

Victor espera lá fora enquanto Peggy entra na caverna e escolhe aleatoriamente um dos dois caminhos do fork. Victor então caminha para a entrada e grita de qual fork ele quer que Peggy saia. Se Peggy realmente sabe a senha, ela pode sempre obedecer, passando pela porta trancada se ela estiver do lado errado. Se ela não sabe a senha, ela só pode cumprir se ela aconteceu de adivinhar corretamente que lado Victor chamaria, uma chance de 50% por rodada. Repetindo isso muitas vezes, cada rodada independentemente tendo 50% de chance de "capturar" uma Peggy blefando, impulsiona a probabilidade de uma Peggy desonesta suceder a cada rodada para zero (depois de 20 rodadas, aproximadamente uma em um milhão), enquanto Victor não aprende nada sobre a senha real em qualquer ponto, apenas que Peggy consistentemente demonstra a capacidade de abrir a porta.

Isto capta a forma de um **interativo** prova de conhecimento zero: rodadas repetidas de desafio e resposta, cada um descartando um provador desonesto com alguma probabilidade, convergendo para uma confiança esmagadora sem nunca revelar o segredo.

## De interativo a não- interativo

A analogia da caverna requer interação back-and-forth entre provador e verificador. Aplicações reais de blockchain geralmente precisam **não- interactivo** provas, uma única prova auto-suficiente que um provador pode gerar uma vez e transmitir, que qualquer número de verificadores pode verificar independentemente sem qualquer retorno ao vivo. Isto é o que o "NI" em construções como zk-SNARK significa: **Zero-Conhecimento Succint Argumento Não-Interativo do Conhecimento**. Convertendo uma prova interativa em uma não-interativa geralmente depende de técnicas criptográficas (a heurística de Fiat-Shamir é a mais comum) que substituem os desafios aleatórios do verificador por valores derivados de hashing as próprias mensagens do provador, semelhante em espírito a como [Assinaturas Schnorr](./schnorr.md) derivar o seu desafio de um hash em vez de exigir um intercâmbio interativo ao vivo.

## SNARKs versus STARKs, num relance

Este livro não abrange a matemática subjacente destas construções em profundidade, que exigiria um tratamento dedicado de compromissos polinomiais, emparelhamentos de curvas elípticas, e códigos de correção de erros muito além deste capítulo introdutório. A distinção de alto nível vale a pena saber, uma vez que ambos os termos aparecem ao longo [Camada 2](../layer2/README.md):

- **zk-SNARKs** produzir provas muito pequenas, baratas para verificar, mas a maioria das construções exigem **configuração confiável**, uma cerimônia única gerando certos parâmetros públicos, onde qualquer um que retenha "resíduo tóxico" dessa cerimônia poderia potencialmente forjar falsas provas, e a maioria das implementações práticas também dependem de criptografia de curvas elípticas, que não se acredita estar segura contra um computador quântico suficientemente poderoso.
- **ZK-STARKS** evitar qualquer configuração confiável inteiramente e acredita-se que seja quantum-resistente (recorrendo em funções de hash em vez de curvas elípticas para sua segurança do núcleo), ao custo de tamanhos de prova maiores do que SNARKs normalmente produzem.

Ambos são usados em sistemas blockchain de produção hoje, veja [zkSync](../layer2/zksync.md) e [Starknet](../layer2/starknet.md) para implementações específicas e suas escolhas de design.

## Comércio

Provas de conhecimento zero permitem que um verificador ganhe confiança na exatidão de um cálculo (ou na verdade de uma declaração) sem refazer o cálculo ou aprender os dados secretos subjacentes, que é genuinamente poderoso para privacidade e escala. O custo é **complexidade da geração de provas**: produzir uma prova de conhecimento zero é tipicamente muito mais computacionalmente caro do que o próprio cálculo subjacente (muitas vezes por várias ordens de magnitude), embora *verificar* A prova resultante é barata. Esta assimetria é deliberada e útil (você gera uma prova uma vez, e muitas partes podem cheaply verificá-la muitas vezes), mas significa que os sistemas de conhecimento zero deslocam real, às vezes custo computacional substancial para quem gera as provas (no caso de um rollup ZK, o [sequenciador](../layer2/sequencers.md)) em vez de eliminar esse custo.

## Conceitos errôneos comuns

**"Zero-conhecimento" não significa "nenhuma informação é transmitida".** Uma prova em si é dados que são transmitidos e verificados; a propriedade "sem conhecimento" significa especificamente nenhuma informação sobre o *entrada secreta* Não que a prova não seja informativa.

**Provas de conhecimento zero não são a mesma coisa que criptografia ou como tecnologia específica blockchain.** A teoria criptográfica subjacente precede blockchain por décadas (os artigos de fundação, incluindo o trabalho de Shafi Goldwasser, Silvio Micali e Charles Rackoff, data de 1985) e tem aplicações muito além da criptomoeda, inclusive na verificação de identidade tradicional e pesquisa de computação segura.

## Outras leituras

- [A Complexidade do Conhecimento dos Sistemas Interativos de Prova](https://doi.org/10.1145/22145.22178): Goldwasser, Micali, Rackoff, STOC '85 (papel de fundação, vencedor do primeiro Prêmio Gödel)
- [Como explicar protocolos de conhecimento zero para seus filhos](https://link.springer.com/chapter/10.1007/0-387-34805-0_60): Quisquater et al., CRYPTO '89 (a fonte original da analogia da Caverna de Ali Baba)
- [Sessões do quadro branco ZK](https://zkhack.dev/whiteboard/): uma série de vídeo estruturada que abrange a matemática e as construções deste capítulo omite

---

[← Anterior: Autorizações](./commitments.md)
·
[Voltar à Criptografia](./README.md)
·
[Próximo: Sistemas Distribuídos Basics →](../distributed-systems/README.md)
