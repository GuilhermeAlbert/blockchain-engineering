# ASICs

Um ASIC (Application-Specific Integrated Circuit) é um chip projetado e fabricado para fazer exatamente uma computação, extremamente eficiente, e essencialmente nada mais. Este capítulo cobre por que a mineração de Bitcoin passou de hardware de uso geral para ASICs, e o que essa mudança significa para quem pode participar realisticamente na mineração hoje.

## A progressão: CPU para GPU para FPGA para ASIC

O hardware de mineração do Bitcoin evoluiu através de uma progressão bastante clara em seus primeiros anos, cada etapa motivada pelo mesmo driver: SHA-256d hashing (ver [SHA-256](../cryptography/sha-256.md#sha-256d-escolha-real-do-bitcoin)) é um computador simples, fixo, repetitivo, e hardware especializado pode executá-lo muito mais eficientemente (em hashes computado por unidade de energia) do que hardware de uso geral projetado para lidar com software arbitrário.

- **CPUs** (2009–2010): O hardware de mineração original do Bitcoin, uma vez que o computador comum de qualquer um poderia participar significativamente quando o poder total de hash de rede era baixo.
- **GPUs** (2010 em diante): placas gráficas, projetadas para os cálculos altamente paralelos que a renderização gráfica requer, também se tornou adequada à estrutura paralelizável da SHA-256d, oferecendo um salto substancial de eficiência sobre CPUs.
- **FPGAs** (briefly, por volta de 2011): Arrays de porta programáveis em campo (chips reconfiguráveis que podem ser programados, em nível de hardware, para implementar um circuito específico) ofereceram outro salto de eficiência sobre GPUs, embora FPGAs permanecesse uma tecnologia de transição relativamente curta.
- **ASICs** (2013 em diante): chips projetados com o computador SHA-256d gravado diretamente no silício, oferecendo melhorias de eficiência de ordens de grandeza sobre FPGAs, e renderizando CPU e mineração GPU permanentemente sem fins lucrativos para Bitcoin especificamente (embora GPUs permaneçam úteis para mineração de outras criptomoedas usando diferentes, menos funções de prova de trabalho otimizadas pela ASIC, uma escolha de design discutida mais abaixo).

## Por que isso aconteceu: eficiência, medida em joules por hash

Rendibilidade da indústria extractiva, tal como [Mineração](./mining.md#economia-mineira), depende fortemente da taxa de hash alcançada por unidade de custo de eletricidade. Um chip personalizado projetado para exatamente um cálculo repetitivo pode ser dramaticamente mais eficiente em termos de energia nessa tarefa específica do que um processador de propósito geral carregando a sobrecarga de instruções arbitrárias e flexíveis de suporte que ele não precisa para este trabalho. Uma vez que as ASICs existiram e demonstraram esta vantagem de eficiência, continuar a minar com CPUs ou GPUs tornou-se economicamente irracional para Bitcoin especificamente. O custo da eletricidade por hash estava simplesmente demasiado acima do que os concorrentes equipados com a ASIC poderiam conseguir, a preços totalmente inferiores aos dos mineradores não-ASIC.

## O que isso significa para a acessibilidade à mineração

A mineração baseada na ASIC requer a aquisição de hardware especializado que não tenha uso geral, ao contrário de uma GPU, que mantém o valor de revenda para jogos ou outras tarefas de computação, mesmo que a mineração se torne inútil, a única função real do Bitcoin ASIC é a mineração com base em Bitcoin (ou compatível com Bitcoin SHA-256d). Isto levanta a exigência prática de capital e perfil de risco para entrar na mineração significativamente, em comparação com os primeiros anos do Bitcoin em que os computadores comuns poderiam participar, uma mudança real, documentada em quem pode competir realisticamente, contribuindo para a dinâmica de centralização de mineração-pool discutida em [Pools de Mineração](./mining-pools.md#a-questão-da-centralização) e os tradeoffs de descentralização mais amplos em [Governança](../governance/README.md).

## Por que outras criptomoedas resistem deliberadamente às ASIC

Algumas criptomoedas de prova de trabalho escolheram deliberadamente as funções de hash concebidas para serem **memória- dura** (exigindo grandes quantidades de acesso rápido à memória, não apenas computação bruta, de uma forma que seja mais difícil de ganhar a mesma vantagem de eficiência de ordem de grandeza do silício especializado para) especificamente para manter a mineração mais acessível ao hardware de consumo comum e resistir à concentração de capital ASICs pode produzir. Este é um comércio de design real e deliberado que outros projetos cometeram de forma diferente do Bitcoin, não um erro no próprio design do Bitcoin, mas um ponto diferente no mesmo espaço de troca acessibilidade-versus eficiência.

## Conceitos errôneos comuns

**A resistência ASIC não é uma propriedade que o SHA-256d do Bitcoin já teve ou foi projetado para ter.** O whitepaper e código original de Satoshi antecipou a mineração de CPU normal como o caso de base (ver [Histórico inicial do Bitcoin](../origins/early-bitcoin.md#extracção-precoce)), mas nada no protocolo impede que hardware especializado mais eficiente emerja ao longo do tempo. A mudança para ASICs foi uma resposta de mercado a incentivos de lucro, não uma violação de qualquer intenção de design original declarada em qualquer lugar nos documentos fundadores do Bitcoin.

**A propriedade de uma ASIC não garante rentabilidade mineira.** A rentabilidade depende da relação contínua entre a eficiência da ASIC, os custos atuais de eletricidade, a dificuldade atual da rede e o preço atual do Bitcoin. Tudo isso muda continuamente, o que significa que o hardware ASIC moderno e eficiente pode se tornar inútil para operar em condições desfavoráveis.

## Outras leituras

- Ver também: [Mineração](./mining.md), [Hashrate](./hashrate.md), [Consumo de Energia](./energy.md)

---

[← Anterior: Pools de mineração](./mining-pools.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Hashrate →](./hashrate.md)
