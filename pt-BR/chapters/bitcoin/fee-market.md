# Mercado de Taxas

O espaço de bloco do Bitcoin é escasso por desenho (um limite de peso fixo por bloco, produzido a uma taxa aproximadamente fixa (ver [Tempo de bloco](../blockchain/block-time.md))) e as taxas de transação são o mecanismo de preços que atribui esse recurso escasso entre os usuários concorrentes. O presente capítulo abrange a forma como o mercado de taxas se comporta efectivamente no âmbito de uma procura variável e a sua relação com a questão a longo prazo examinada em [Orçamento de Segurança a Longo Prazo](./security-budget.md).

## Taxas como leilão, revisitado

[Taxas de transação](./fees.md) já abrangeu a forma como as taxas individuais são calculadas. Este capítulo é sobre **Dinâmica a nível de mercado**: quando muitas transações competem por espaço de bloco limitado, a taxa de taxa (satoshis por byte virtual) necessária para ser confirmada de forma confiável dentro de uma determinada janela de tempo sobe e cai com a demanda. Trata-se de um mecanismo de preços normal, se invulgarmente visível e em tempo real, de oferta e procura, diretamente análogo ao modo como os preços de qualquer recurso verdadeiramente escasso e não estocável (um quarto de hotel numa noite específica, por exemplo) respondem à procura de mudança face a uma oferta fixa.

## Padrões observados

O mercado de taxas de Bitcoin tem mostrado historicamente picos claros de demanda: períodos de intensa atividade on-chain (durante grandes comícios de preços desenhando em novos usuários, ou, mais recentemente, durante episódios de pesados [inscrição](./ordinals.md) atividade competindo pelo mesmo espaço de bloco que os pagamentos ordinários) produziram taxas de taxa acentuadamente elevadas e tempos de espera efetivos mais longos para transações de menores taxas, seguido de taxas caindo para níveis basais uma vez que o aumento específico da demanda diminui. Essa volatilidade é uma consequência direta e mecânica da oferta de peso-bloco fixo do Bitcoin atendendo à demanda variável. Não há equivalente de uma empresa escalando a capacidade do servidor para atender um pico de tráfego; a oferta de espaço de bloqueio é fixada por regras de consenso, independentemente da demanda.

## Estimativa de taxas

Carteiras e serviços tentando ajudar os usuários a escolher uma taxa apropriada **estimativa de taxas** modelos, utilizando dados de taxa de bloqueio confirmados recentes e conteúdo mempool atual para prever qual taxa é provavelmente necessária para confirmação dentro de um número alvo de blocos (por exemplo, "alta prioridade: próximo bloco", "economia: dentro de aproximadamente 6 blocos"). Essas estimativas são inerentemente probabilísticas e podem estar erradas, particularmente durante a rápida mudança da demanda, uma vez que são previsões sobre condições de rede quase futuras baseadas em padrões recentes, mas não garantidos para continuar.

## Por que o mercado de taxas importa além do custo de transação individual

Além da questão prática imediata de "quanto custará a minha transação", a saúde de longo prazo do mercado de taxas está diretamente ligada à segurança de mineração do Bitcoin, porque (como coberto em [Bloquear recompensas](./block-rewards.md#subvenção-versus-recompensa-total)) total das receitas dos mineradores é subsídio mais taxas, e o subsídio é mecanicamente, diminuindo permanentemente para zero (ver [O halving](./halving.md)). Um mercado de taxas suficientemente grande e sustentado é o componente da receita dos mineradores que este subsídio de redução tem de ser eventualmente substituído, se a segurança mineira do Bitcoin é para permanecer economicamente sustentável ao longo do horizonte multidécada para a emissão total (~2140) e além, examinado diretamente, incluindo a verdadeira incerteza em torno de se esta transição vai acontecer sem problemas, em [Orçamento de Segurança a Longo Prazo](./security-budget.md).

## Conceitos errôneos comuns

**Um "mercado de direitos" existente não significa que as taxas são definidas por qualquer partido único ou algoritmo de controle de preços.** Ela emerge inteiramente da interação descentralizada da vontade de muitos usuários individuais de pagar e da seleção independente dos mineradores, motivada por lucros, cujas transações para incluir, nenhuma entidade define níveis de taxa diretamente.

**Taxas baixas durante períodos de silêncio não indicam um mercado de taxas permanentemente saudável ou não saudável** Por conta própria. Taxa de saúde do mercado, no sentido a longo prazo relevante para [Orçamento de Segurança a Longo Prazo](./security-budget.md), trata-se da tendência sustentada e agregada ao longo dos anos e ciclos, não qualquer instantâneo das condições atuais.

## Outras leituras

- Ver também: [Taxas de transação](./fees.md), [O Mempool](./mempool.md), [Orçamento de Segurança a Longo Prazo](./security-budget.md)

---

[← Anterior: Moedas perdidas](./lost-coins.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Orçamento de Segurança de Longo Prazo →](./security-budget.md)
