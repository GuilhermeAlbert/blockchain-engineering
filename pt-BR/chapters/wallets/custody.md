# Custodial vs Carteiras Não- Personalizadas

Esta é a distinção mais conseqüente em como as pessoas realmente mantêm Bitcoin, e é frequentemente sub-explicado: **quem controla as chaves privadas**Este capítulo cobre precisamente a diferença, uma vez que determina quem, em última análise, tem poder sobre qualquer determinado conjunto de fundos, não a quem os fundos nominalmente "pertencem".

## A distinção, precisamente

A **não-custodial** (ou "self-custody") carteira é um onde o usuário sozinho detém e controla as chaves privadas, o padrão que toda esta seção Carteiras assumiu e descreveu ao longo. A **custodial** a carteira é uma em que um terceiro (uma troca, um guardião, algum aplicativo ou serviço) detém as chaves privadas em nome do usuário, e o usuário interage com um equilíbrio as faixas e relatórios de custódia, tipicamente através de um login de nome de usuário/password convencional em vez de gerenciamento direto de chaves.

## O que a custódia realmente determina

Esta distinção é muitas vezes resumida pela frase **"não as tuas chaves, não as tuas moedas"**, um pedaço de shorthand comunidade vale a pena desempacotar em vez de apenas repetir: com uma custódia holding, o usuário não controla as chaves privadas que os deixaria construir uma transação válida, aceita em rede movendo esses fundos. Eles têm uma reclamação contra o guardião (uma promessa contratual ou baseada em confiança de que o guardião irá honrar pedidos de retirada), não controle direto, criptográfico sobre UTXOs específicos como um titular não-custodial faz (ver [Chaves Privadas](./private-keys.md#o-que-uma-carteira-realmente-faz-com-uma-chave-privada)). Esta não é uma distinção hipotética. Ela tem produzido resultados reais, bem documentados e consequentes: quando um guardião se torna insolvente, é hackeado, congela as retiradas, ou de outra forma não cumpre suas obrigações, o acesso dos detentores de custódia aos "seus" fundos depende inteiramente da solvência, honestidade e cooperação continuada desse guardião, de uma forma que o acesso de um não guardião nunca faz.

## Por que serviços de custódia existem e são amplamente utilizados de qualquer maneira

Custódia não é simplesmente um erro que os usuários fazem por ignorância (oferece benefícios reais e legítimos a muitos usuários valor razoável: nenhum risco de perder individualmente uma frase de semente ou chave privada (um modo de falha real e comum para a auto-custódia, veja [Moedas Perdidas](../bitcoin/lost-coins.md)), um familiar processo de recuperação de nome de usuário/password em vez de uma imperdoável, irrecuperável frase de semente perdida, e, para negociação ativa, a conveniência operacional de não precisar mover fundos on-chain (com taxas reais e atrasos de confirmação) para cada transação), uma troca pode atualizar saldos internos instantaneamente, off-chain, para comércios entre seus próprios usuários. Este livro não trata a manutenção de custódia como inerentemente errada; é uma troca genuína entre conveniência e controle, apropriada para alguns fins (comercialização ativa, quantias de um usuário é confortável confiar em um determinado, de reputação de custódia) e inadequado para outros (economias de longo prazo alguém especificamente não quer risco de contraparte em).

## Os modos de custódia de falhas documentados

Bitcoin e histórico de criptomoeda mais amplo inclui vários casos bem documentados de falhas de custódia resultando em usuários permanentemente perdendo acesso a fundos, incluindo hacks de troca (Mt. Gox, 2014, historicamente o exemplo mais significativo inicial, embora as circunstâncias específicas e eventual processo de recuperação do credor são sua própria história detalhada, separada este livro não cobre totalmente aqui) e fraude ou má gestão direta (FTX, 2022). Estes são citados em todas as seções de Segurança e Sociedade deste livro não para argumentar que a custódia nunca deve ser usada, mas porque a compreensão *Porquê?* eles aconteceram (um guardião controlando chaves e simplesmente não ter (ou desonestamente afirmar ter) reservas suficientes para honrar retiradas) é diretamente explicado pela distinção de custódia deste capítulo.

## Conceitos errôneos comuns

**Um "balanço" de custódia mostrado em um aplicativo não é o mesmo tipo de fato que um UTXO que você controla a chave privada para.** O número exibido no aplicativo é o registro interno do guardião do que lhe devem, não uma prova criptográfica de seu próprio controle atual, independentemente verificável sobre fundos específicos.

**A auto-custodia não é automaticamente "mais segura" em todas as dimensões**. Elimina o risco de contraparte (o guardião falhando ou agindo desonestamente) mas acrescenta total responsabilidade pessoal pela segurança, backup e recuperação chave, sem recurso ou processo de recuperação se essa responsabilidade for mal tratada. Ambos os modelos carregam riscos reais, diferentes; nem é uma escolha estritamente dominante para cada usuário e cada quantidade.

## Outras leituras

- Ver também: [Chave de backup e recuperação](./recovery.md), [Bolsas](../society/exchanges.md), [Autocustodia](../society/self-custody.md)

---

[← Anterior: Multisig](./multisig.md)
·
[Voltar para Wallets e Key Management](./README.md)
·
[Próximo: Key Backup e Recuperação →](./recovery.md)
