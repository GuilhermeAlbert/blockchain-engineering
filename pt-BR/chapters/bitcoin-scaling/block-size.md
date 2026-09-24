# Tamanho do Bloco

Este capítulo revisita o próprio parâmetro de tamanho do bloco (o que ele realmente limita, e a aritmética específica conectando-o ao rendimento da transação) como uma base para o resto das abordagens de escala desta seção, com base na disputa histórica já coberta em [Debate sobre o Tamanho do Bloco](../forks/block-size-war.md).

## O que o limite realmente restringe

O limite de tamanho do bloco do Bitcoin restringe a quantidade de dados de transação que podem ser incluídos em cada bloco de aproximadamente 10 minutos (ver [Tempo de bloco](../blockchain/block-time.md)). Desde [SegWit](../bitcoin/segwit.md#peso-e-aumento-da-capacidade-efetiva), isto é tecnicamente um **peso** limite (4 milhões de unidades de peso) em vez de um limite de contagem de byte simples, mas o efeito prático é o mesmo tipo de restrição: um limite máximo duro sobre a quantidade de dados de transação que a rede processa por unidade de tempo.

## A aritmética de rendimento

Uma estimativa áspera, comumente citada: uma única entrada comum, transação SegWit de saída única pesa em algum lugar cerca de 550-650 unidades de peso. Dividindo o limite de 4 milhões de peso do bloco unitário pelo peso de uma transação típica, e dividindo novamente pelo intervalo de ~600 segundos médio do bloco, dá Bitcoin base-layer throughput teto, comumente citado na faixa de aproximadamente 3-7 transações por segundo, dependendo fortemente da mistura real de tipos de transação e tamanhos em um determinado bloco (transações com mais entradas, múltiplas saídas, ou scripts complexos pesam mais e reduzem a contagem efetiva por bloco; um bloco cheio de transações simples se encaixa mais deles). Trata-se de um verdadeiro tecto estrutural, não de uma ineficiência temporária. Ele detém independentemente do desempenho do nó, da velocidade da internet, ou de qualquer outro fator além do limite de peso e do próprio intervalo de bloqueio.

## Porque é que este tecto existe?

Tal como estabelecido em [Debate sobre o Tamanho do Bloco](../forks/block-size-war.md#o-caso-de-uma-abordagem-mais-conservadora), o limite existe especificamente para vincular os requisitos de recursos (armazenamento, largura de banda, tempo de validação) de execução de um nó completo (ver [Nós Completos](../bitcoin/full-nodes.md#o-que-a-execução-realmente-requer)) um tradeoff deliberado favorecendo uma rede mais pessoas podem realisticamente totalmente validar sobre um otimizado puramente para o volume máximo de transação on-chain. Esta é a premissa inicial que o resto das abordagens desta seção todos respondem: dado que este teto está sendo deliberadamente mantido em vez de simplesmente elevado, como Bitcoin escala para servir mais usuários e mais volume de transação de qualquer maneira?

## Duas direções, não uma.

O resto desta seção abrange duas respostas estruturalmente diferentes ao mesmo limite máximo de rendimento: **fazendo melhor uso do espaço de bloco existente** (transação loteamento, e projeto próprio do SegWit-descontador de peso, coberto próximo) e **mover o volume da transação para fora da camada de base inteiramente** (canais de pagamento e a Rede Lightning, cadeias laterais e outros sistemas abrangidos mais tarde nesta seção), abordagens que não são mutuamente exclusivas e que o ecossistema Bitcoin tem perseguido simultaneamente ao invés de escolher entre.

## Conceitos errôneos comuns

**O limite de tamanho do bloco não é mais literalmente "1 MB"** e não tem sido a única restrição governando desde que a contabilidade baseada no peso de SegWit substituiu um limite puro de bytes. Ver [SegWit](../bitcoin/segwit.md#peso-e-aumento-da-capacidade-efetiva) para exatamente como essa transição funcionou tecnicamente.

**Um baixo limite de rendimento de camada de base não significa que a Bitcoin no seu conjunto se limite a essa taxa de transação.** Limita especificamente *camada base, em cadeia* volume de transação. Sistemas como a Lightning Network são projetados precisamente para deixar muito mais pagamentos reais ocorrerem do que a camada base poderia processar diretamente, estabelecendo-se apenas periodicamente em cadeia (ver [Por que existe a camada 2](../layer2/README.md) para o padrão geral isto segue, compartilhado com o ecossistema da própria Camada 2 de Ethereum).

## Outras leituras

- Ver também: [Debate sobre o Tamanho do Bloco](../forks/block-size-war.md), [Taxas de transação](../bitcoin/fees.md)

---

[← Anterior: O problema de escala](./README.md)
·
[Voltar para Bitcoin Scaleing](./README.md)
·
[Próximo: SegWit como um upgrade de escala →](./segwit.md)
