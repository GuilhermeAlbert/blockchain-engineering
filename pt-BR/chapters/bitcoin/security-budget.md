# Orçamento de Segurança a Longo Prazo

O "orçamento de segurança" do Bitcoin é o valor total que os mineradores ganham para garantir a rede (subvenções mais taxas) e é o apoio econômico direto por trás de tudo coberto em [Prova de Trabalho](./proof-of-work.md) e [Hashes e Block Linking](../blockchain/block-linking.md#o-custo-que-isso-impõe-refazer-prova-de-trabalho): uma cadeia é cara para atacar precisamente porque tanto valor real está sendo gasto honestamente estendendo-a. Este capítulo aborda uma questão genuína e não resolvida que este livro já assinalou em vários pontos: o que acontece uma vez que o subsídio, que atualmente domina esse orçamento, diminui para quase nada.

## A preocupação, expressa precisamente

De acordo com o [Bloquear recompensas](./block-rewards.md#subvenção-versus-recompensa-total) e [O halving](./halving.md), o subsídio de bloco está em um caminho fixo, mecânico para zero, aproximadamente metade a cada quatro anos, projetado para tornar-se insignificante bem antes de sua exaustão final, formal em torno de 2140. Pelo custo de um ataque maioritário (por análise em [51% Ataques](./51-percent-attacks.md)) para permanecer proibitivamente alto. **Taxas de transação precisam crescer o suficiente para substituir a contribuição do subsídio de redução para o total das receitas dos mineradores**, mantendo (em termos reais, não necessariamente nominais) o incentivo econômico global atualmente impulsionando mineração honesta.

## Por que isso não é garantido automaticamente

É aqui que a preocupação se torna verdadeiramente aberta em vez de uma questão técnica resolvida: as receitas das taxas dependem de uma procura sustentada e elevada de espaço de bloqueio escasso (ver [Mercado de Taxas](./fee-market.md)), que por sua vez depende do uso contínuo e crescente da camada base de Bitcoin para transações as pessoas estão dispostas a pagar significativamente para. Se uma grande parte da actividade diária designada por Bitcoin se mover para [Camada 2](../lightning/README.md) sistemas como o Lightning Network especificamente para *evitar* taxas de camada de base (um resultado razoável e esperado dos sistemas Layer 2 tendo sucesso no seu propósito declarado. Ver [Por que existe a camada 2](../layer2/README.md)), a receita de taxas de base poderia, em princípio, crescer mais lentamente do que o necessário para compensar totalmente o subsídio de redução, mesmo que a adoção e utilização global de Bitcoin (claramente interpretados, em todas as camadas) continua a crescer.

## Argumentos de que isto vai resultar

- **A apreciação dos preços poderia compensar as preocupações de volume.** Se o preço de Bitcoin sobe ao longo do tempo (mesmo independente de qualquer previsão de preço específica, que este livro não endossa, veja [Stock-to-Flow](./stock-to-flow.md) para uma tentativa específica e contestada de exatamente este tipo de predição, um número fixo de satoshis cobrados por transação representa um valor crescente do mundo real, o que poderia sustentar um orçamento de segurança adequado em termos de dólar (ou poder de compra) mesmo sem um crescimento dr *contagem* ou taxa.
- **Espaço em bloco poderia permanecer verdadeiramente escasso e valioso** mesmo em um mundo onde os pagamentos mais pequenos e diários passam para a Camada 2. Sistemas de camada 2 ainda periodicamente precisam de transações de liquidação em camada de base (abrir e fechar canais Lightning, por exemplo, ver [Lightning Network](../lightning/README.md)), e a liquidação de alto valor, em particular a liquidação interinstitucional, pode continuar a valorizar o carácter definitivo da camada de base o suficiente para manter taxas significativas mesmo a um volume de transação comparativamente inferior.
- **A transição é gradual, não um penhasco.** Como as metades ocorrem aproximadamente a cada quatro anos em vez de como uma única entrega súbita, o mercado de taxas tem uma longa pista (décadas) para desenvolver e amadurecer em resposta ao equilíbrio gradualmente mudando entre subsídios e taxas, em vez de precisar resolver isso instantaneamente.

## Argumentos de que este é um risco genuíno e não resolvido

- **Não existe precedente histórico para um modelo de segurança que transfira isto completamente de subsídio para taxas na escala Bitcoin exigiria**, tornando esta uma situação genuinamente nova sem um estudo de caso análogo limpo para tirar confiança.
- **As receitas das taxas têm sido historicamente consideravelmente mais voláteis do que as receitas das subvenções** (ver [Mercado de Taxas](./fee-market.md#padrões-observados)), e um orçamento de segurança dependente principalmente de uma fonte volátil de receita é, alguns argumentam, estruturalmente menos previsível e potencialmente mais vulnerável durante a procura do que um ancorado por um subsídio fixo, previsível.
- **O crescimento da camada 2 e a receita da taxa de base poderiam estar em tensão genuína**, não apenas gradualmente reconciliado, se os sistemas Layer 2 conseguir precisamente minimizando quantas vezes os usuários precisam de transações de base-camada, isso poderia suprimir exatamente a demanda necessária para sustentar a receita adequada de taxa de longo prazo, uma dinâmica alguns pesquisadores e desenvolvedores Bitcoin têm sinalizado como vale a pena monitoramento ativo em vez de assumir que vai se resolver favoravelmente.

## A posição deste livro

Esta é uma questão verdadeiramente aberta, ativamente estudada dentro da comunidade de pesquisa técnica e econômica de Bitcoin, não um problema resolvido este livro pode responsabilidade presente como resolvido em qualquer direção, e não apenas um ponto de conversa levantada por críticos externos. Desenvolvedores e pesquisadores sérios de Bitcoin levam a sério a questão, e ela permanece, a partir desta escrita, sem uma resolução confiante, amplamente acordada, ou prevendo uma transição suave ou prevendo uma séria falha de segurança futura. Leitores encontrando reivindicações confiantes em qualquer direção (que isso é definitivamente bom, ou que definitivamente condena a segurança de longo prazo de Bitcoin) devem tratar ambos com ceticismo adequado dada a incerteza genuína e documentada envolvida.

## Conceitos errôneos comuns

**Este não é um problema iminente.** O subsídio continua a ser uma maioria substancial do total das receitas dos mineradores a partir deste texto e será para os próximos anos. A preocupação é especificamente sobre a trajetória multidécada, e não uma crise a curto prazo.

**Adoção da camada 2 sucedendo não é diretamente "ruim" para segurança da camada de base**, apesar da tensão observada acima. Depende do equilíbrio específico entre a demanda de liquidação em camada de base e o volume de pagamento da Camada 2 que realmente emerge ao longo do tempo, o que permanece genuinamente incerto em vez de previsível em qualquer direção do ponto de vista atual.

## Outras leituras

- Ver também: [Mercado de Taxas](./fee-market.md), [O halving](./halving.md), [51% Ataques](./51-percent-attacks.md)

---

[← Anterior: Mercado de taxas](./fee-market.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: O que é um fork? →](../forks/README.md)
