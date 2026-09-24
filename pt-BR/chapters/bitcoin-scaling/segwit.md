# SegWit como uma atualização de escala

[SegWit](../bitcoin/segwit.md) já recebeu um tratamento técnico completo na seção Bitcoin, cobrindo a correção maleabilidade e a mecânica exata da separação de testemunhas. Este capítulo curto isola um ângulo específico: SegWit puramente como uma medida de escala, e quanto rendimento ele realmente comprou.

## O mecanismo de escala, reafirmado concisamente

Recordar de [Taxas de transação](../bitcoin/fees.md#tamanho-e-peso-da-transação) que a fórmula de peso da SegWit fornece dados de testemunhas (assinaturas) um quarto do peso dos dados de transações normais. Como as assinaturas normalmente compõem uma parte substancial da contagem total de byte de uma transação normal, este desconto aumenta significativamente quantas transações se encaixam dentro do mesmo limite de 4 milhões de unidades de peso em comparação com o limite de 1 MB antigo, puro-byte-conte, sem alterar diretamente o título "1 MB" figura da forma como um aumento de tamanho difícil do fork bloco teria.

## Quanto rendimento isso realmente adicionou

O aumento de capacidade realizado depende da fração de dados de blocos é dados de testemunhas versus dados de não testemunhas, que por si só depende de quantas transações realmente usam formatos de script do SegWit (nativo SegWit ou SegWit-wrapped) em vez de formatos legados, uma figura de adoção dependente que cresceu gradualmente ao longo dos anos após a ativação, em vez de saltar imediatamente, uma vez que ele precisava de carteiras e serviços para realmente adotar endereços de formato SegWit (veja [Endereços](../wallets/addresses.md)) realizar o desconto em suas próprias transações. Estimativas frequentemente citadas para o aumento de capacidade efetiva realizado pelo SegWit, uma vez que a adoção do SegWit se difundiu, variam de aproximadamente 1,5x a 2x em relação ao limite pré-SegWit 1 MB. Um aumento genuíno, significativo, embora consideravelmente mais modesto do que o 2-8x aumenta um aumento de tamanho de bloco direto para 2-8 MB teria fornecido imediatamente após a ativação (apartando os tradeoffs nó-recurso tal aumento teria imposto separadamente, coberto em [Tamanho do Bloco](./block-size.md#porque-é-que-este-tecto-existe)).

## Por que o aumento de capacidade da SegWit importou além dos números brutos

Além da figura de rendimento em si, correção de maleabilidade do SegWit (ver [SegWit](../bitcoin/segwit.md#por-que-o-segwit-existe)) foi um pré-requisito técnico necessário para a construção de sistemas confiáveis de canais de pagamento fora da cadeia. A [Lightning Network](../lightning/README.md)O design depende de ser capaz de referenciar transações não confirmadas por um identificador estável e não maleável, que a maleabilidade da transação pré-SegWit tornou não confiável. Neste sentido, a contribuição de SegWit para a história geral de escala de Bitcoin é melhor entendida como duas contribuições separadas agrupadas em uma atualização: um aumento direto, modesto da capacidade de base-camada, e um efeito de habilitação indireto, mas indiscutivelmente maior na escala de Camada 2 construída em cima da camada de base.

## Conceitos errôneos comuns

**O aumento da capacidade de SegWit não foi instantâneo após ativação**, realizando o desconto total necessário transações para realmente usar scripts SegWit-format, que aconteceu gradualmente como carteiras e trocas adotou suporte, não imediatamente quando o próprio soft fork ativado em agosto de 2017.

**SegWit e um aumento direto do tamanho do bloco não são alternativas mutuamente exclusivas que Bitcoin teve que escolher entre para sempre**Foram as duas opções específicas debatidas durante [a disputa de tamanho do bloco](../forks/block-size-war.md) nesse momento em particular, não um fork binário permanente nos caminhos de escala possíveis de Bitcoin, como o resto das abordagens adicionais desta seção demonstram.

## Outras leituras

- [SegWit](../bitcoin/segwit.md): o tratamento técnico completo
- Ver também: [Taxas de transação](../bitcoin/fees.md), [Debate sobre o Tamanho do Bloco](../forks/block-size-war.md)

---

[← Anterior: Tamanho do bloco](./block-size.md)
·
[Voltar para Bitcoin Scaleing](./README.md)
·
[Próximo: Batendo Transação →](./batching.md)
