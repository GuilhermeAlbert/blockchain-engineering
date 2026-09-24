# Bitcoin Cash

Bitcoin Cash split do Bitcoin através de um fork rígido **1 de agosto de 2017**, em **bloco 478.558/478,559**, tornando-se a primeira grande e duradoura cadeia dividida na história de Bitcoin. Este capítulo abrange o que aconteceu mecanicamente, o que cada lado argumentou na época, e o que aconteceu com as duas cadeias desde então, usando posições contemporâneas em vez de caracterização retrospectiva de ambos os lados.

## Contexto imediato

De acordo com o [Debate sobre o Tamanho do Bloco](./block-size-war.md), uma parte da comunidade Bitcoin tinha, por um período prolongado, favorecido diretamente elevando o limite de tamanho do bloco base em vez de perseguir [SegWit](../bitcoin/segwit.md)É um aumento de capacidade compatível com soft fork. Quando o SegWit ativou (bloqueando em pouco antes de agosto 1, 2017, após o [UASF](./uasf.md) campanha de pressão) sem incluir também um aumento de tamanho de bloco direto, um grupo de desenvolvedores, empresas e mineradores que tinham defendido para blocos maiores procedeu com seu próprio hard fork, implementado principalmente através da **Bitcoin ABC** cliente, elevando o limite de tamanho do bloco para 8 MB (mais tarde aumentou ainda mais na cadeia Bitcoin Cash) e explicitamente não adotando a abordagem de SegWit.

## O que cada lado argumentou, na época

**Os proponentes do Bitcoin Cash** argumentou que a visão original de Satoshi era para Bitcoin funcionar como peer-to-peer dinheiro eletrônico utilizável para transações diárias a baixo custo e alto volume (citando o próprio título do whitepaper e declarado objetivo diretamente), que o aumento de capacidade de SegWit era insuficiente e desnecessariamente complexo em relação a um aumento de tamanho de bloco direto, e que blocos maiores eram tanto tecnicamente seguros e necessários para evitar que as taxas de subir para níveis que custariam pequenas transações diárias.

**Bitcoin (a cadeia que reteve o ticker BTC e, essencialmente, cada liquidez, capitalização de mercado, taxa de hash, e medida de desenvolvimento-atividade, a continuação dominante) proponentes** argumentou que um grande aumento de tamanho de bloco direto aumentaria significativamente o custo de recursos de executar um nó completo, reduzindo quantas pessoas poderiam realisticamente fazê-lo e concentrando a influência prática sobre a rede entre menos operadores maiores, um custo de descentralização que eles julgaram como superando o benefício de rendimento, especialmente dada as abordagens Layer 2 (especificamente a Lightning Network, em seguida, em desenvolvimento ativo) ofereceu um caminho para uma taxa de rendimento muito mais elevada e eficaz sem esse tradeoff específico.

## Resultados técnicos e econômicos

Ambas as cadeias continuaram a funcionar de forma independente após a separação, partilhando todo o seu histórico de transações e saldos até ao ponto do fork (qualquer um que tivesse bitcoin antes da divisão tinha um saldo igual de BTC e BCH imediatamente após, uma consequência mecânica direta de um hard fork preservando o histórico pré-partido em ambos os ramos) e divergindo inteiramente desse ponto em diante. Nos anos desde então, Bitcoin (BTC) manteve uma capitalização de mercado substancialmente maior, taxa de hash, ecossistema desenvolvedor, e adoção geral do que Bitcoin Cash (BCH) por essencialmente todas as métricas comumente citadas, um resultado documentado, mensurável, embora este livro não trata o tamanho do mercado sozinho como um veredicto definitivo sobre qual os argumentos técnicos ou filosóficos subjacentes da cadeia foram "corretos", uma vez que os resultados do mercado e mérito técnico estão relacionados, mas questões distintas.

## Bitcoin História subsequente do próprio dinheiro

O próprio Bitcoin Cash mais tarde experimentou sua própria disputa de governança interna significativa, resultando em uma nova divisão em novembro de 2018 que produziu **Bitcoin SV**, coberto no capítulo seguinte, um lembrete de que o desacordo subjacente sobre a escala de filosofia, autoridade de tomada de decisão e direção do projeto que produziu a divisão original 2017 também não se resolveu totalmente dentro da nova cadeia; ele voltou em uma forma diferente.

## Conceitos errôneos comuns

**Bitcoin Cash não é "fake Bitcoin" ou um golpe em qualquer sentido técnico**Trata-se de uma bifurcação legítima e funcional, que implementa seu próprio conjunto de regras consensuais internamente consistentes, mantidas por sua própria comunidade desenvolvedora, e este livro não adota a linguagem a partir das caracterizações mais descartadas do outro lado.

**Holding bitcoin antes de 1 de agosto de 2017 não exigiu qualquer ação para "receber" o saldo equivalente Bitcoin Cash** no próprio fork, qualquer pessoa que controlasse as chaves privadas relevantes controlava automaticamente o saldo equivalente em ambas as cadeias resultantes, embora, na prática, o acesso e o manuseamento seguro das moedas de ambas as cadeias necessitassem de software de carteira que apoiasse corretamente a divisão, e carregasse seus próprios riscos técnicos (especialmente em torno da repetição da transação entre as duas cadeias) que este livro não cobre em detalhe operacional.

## Outras leituras

- [Bitcoin ABC](https://www.bitcoinabc.org/): a implementação primária do cliente
- [Histórico do projeto Bitcoin Cash](https://bitcoincash.org/): conta própria do fork sobre seus objetivos e desenvolvimento

---

[← Anterior: Soft forks ativados pelo usuário](./uasf.md)
·
[Voltar às atualizações de forks e protocolos](./README.md)
·
[Próximo: Bitcoin SV →](./bitcoin-sv.md)
