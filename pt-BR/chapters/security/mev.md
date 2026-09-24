# MEV

Valor extraível máximo é o valor obtido controlando a inclusão, exclusão ou ordenação de transações dentro de um bloco. O termo começou como valor extraível minerador sob prova de trabalho. Agora abrange validadores, construtores de blocos, sequenciadores e outros atores que influenciam a execução ordenada.

## De onde vem o valor

As transações pendentes expõem mudanças de estado que ainda não aconteceram. Um pesquisador simula possíveis ordens e constrói um pacote que captura uma oportunidade. Fontes comuns incluem arbitragem descentralizada de câmbio, liquidações, mentas NFT e ataques sanduíche. O pesquisador pode pagar a maior parte do lucro esperado a um construtor ou validador para inclusão favorável.

Os papéis podem ser separados:

- os usuários criam transações;
- os pesquisadores encontram pacotes rentáveis;
- os construtores montam blocos candidatos;
- os relés entregam ofertas e cargas úteis;
- os validadores propõem um bloco;
- as aplicações e sequenciadores podem controlar a ordenação antes de os dados chegarem à camada de base.

O gasoduto exato depende da rede. Uma análise de segurança deve identificar quem observa o fluxo da ordem, quem pode retê-la, quem constrói a ordem e quem recebe o pagamento.

## Extração útil e prejudicial

Alguns MEV realizam o trabalho em que um protocolo depende. A arbitragem mantém os preços entre as pools suficientemente perto para que os mercados e os oráculos funcionem. Os liquidatários reembolsam dívidas não saudáveis e restauram as razões de garantia. A mesma concorrência pode criar congestionamento, transações falhadas, pressão de centralização e pior execução para os usuários.

Sanduíche transfere valor de um movimento de preço permitido de um usuário para o atacante. Censura ou inclusão tardia pode tornar uma oportunidade indisponível para todos, exceto um participante preferido. Aplicações sensíveis ao tempo podem pagar taxas cada vez mais altas, com grande parte do excedente econômico movendo-se para a camada de encomenda.

Chamar todos MEV malicioso esconde o problema de design. Chamar-lhe tudo inofensiva eficiência de mercado esconde quem suporta o custo. Medir a ação, o beneficiário, a parte prejudicada e a função de protocolo que executa.

## Pressão de centralização

Melhor latência, fluxo de ordem privada, infraestrutura de simulação e capital podem melhorar as ofertas de um construtor. Validadores preferem lances mais altos, que podem concentrar a construção de blocos entre um pequeno conjunto de construtores. Relés podem se tornar disponibilidade e pontos de estrangulamento de política. A separação proposer-builder muda quem executa a ordenação, mas não remove o poder de ordenação.

Os sequenciadores de rollup ocupam uma posição semelhante para seus ambientes de execução. Um sequenciador centralizado pode escolher ordem de transação e censurar temporariamente submissões mesmo quando os usuários mantêm um caminho de fuga através de L1. O caminho de fuga limita o risco de custódia mais diretamente do que garante ordem rápida e justa.

## Defesas das aplicações

Protocolos podem usar leilões em lote, compensação frequente, esquemas de commit-reveal, submissão criptografada, limites de preço de nível de transação, ou projetos que retornam o excedente de encomenda aos usuários. Cada alteração de latência, complexidade, confiança ou comportamento de mercado. A entrega de transações privadas pode reduzir a exposição aos pesquisadores públicos, dando ao serviço privado visibilidade e poder político.

O MEV não pode ser abordado apenas na carteira. As regras de aplicação determinam se a ordenação cria uma diferença extraível. Infraestrutura determina quem vê e controla a ordem. O consenso determina quem o pode finalizar.

## Outras leituras

- [Documentação dos Flashbots](https://docs.flashbots.net/)
- [Pesquisa com Flashbots](https://collective.flashbots.net/)
- [Pesquisa de separação entre proponente e construtor](https://ethereum.org/roadmap/pbs/)
- Ver também: [Sequenciadores](../layer2/sequencers.md), [Liquidações](../defi/liquidations.md)

---

[← Anterior: Execução frontal](./front-running.md)
·
[Voltar à Segurança](./README.md)
·
[Próximo: Explorações de Ponte →](./bridge-exploits.md)
