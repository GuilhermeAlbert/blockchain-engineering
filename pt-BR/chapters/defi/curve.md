# Curve

Curve é a AMM desta seção [Criadores de Mercado Automatizados](./amm.md#fórmulas-de-preços-diferentes-para-diferentes-relações-de-ativos) capítulo referenciado ao descrever curvas de preços construídas especificamente para ativos esperados para negociar perto de uma relação fixa. Este capítulo cobre a fórmula de preços real da Curve, e um incidente real, documentado que mostra que uma fórmula especializada não remove o risco inteligente contrato cada protocolo DeFi carrega.

## O invariante StableSwap: produto liso que constante

A inovação central da Curve, descrita no whitepaper StableSwap de Michael Egorov, é uma fórmula de preços projetada para se comportar de forma muito diferente da curva constante-produto perto do ponto onde dois ativos são igualmente valorizados. Para os ativos destinados a negociar perto da paridade (duas moedas de dólar, ou um token e sua versão embalada líquida), uma curva de produto constante simples desperdiça a eficiência de capital: a maior parte da profundidade de um pool de produto constante está longe de 1:1, razões que esses ativos específicos nunca são esperados para realmente alcançar. A fórmula do StableSwap aplana a curva especificamente perto do ponto 1:1, concentrando liquidez muito mais eficaz, e correspondentemente menor deslizamento, bem onde as transações entre esses ativos realmente acontecem, ao custo de se comportar mais como uma curva constante-soma (linear) perto da paridade e revertendo para o comportamento constante-produto-como apenas quando os ativos do pool se afastam mais de sua relação esperada.

Esta é uma ilustração directa e concreta do princípio geral [Criadores de Mercado Automatizados](./amm.md) Levantado de forma geral: a escolha da curva de preços é uma decisão de design real que combina com os ativos específicos que um pool serve, não um padrão de um tamanho-fits-all, e a fórmula de Curve é uma resposta projetada para exatamente o caso constante-produto lida de forma ineficiente.

## A exploração de julho de 2023

Em 30 de julho de 2023, vários dos pools de liquidez da Curve foram explorados para uma perda combinada relatada por várias fontes na faixa de aproximadamente $50 a $70 milhões. A causa raiz não era uma falha na lógica de preços da Curve ou no projeto do contrato, mas um erro em versões específicas do compilador Vyper (0.2.15, 0.2.16 e 0.3.0) com o qual os pools afetados da Curve foram compilados: o compilador não implementou corretamente a reentrância guarda aqueles contratos baseados, deixando uma vulnerabilidade de reentrância (ver [Reentrância](../security/reentrancy.md)) presente no bytecode implantado apesar do próprio código fonte do contrato, incluindo o guarda como escrito. Pools compilados com versões Vyper não afetadas não eram vulneráveis a este bug específico.

## Por que este incidente importa além da Curve especificamente

A exploração da curva é um caso concreto útil para um ponto [Auditoria inteligente de contratos](../security/auditing.md) makes generally: a segurança de um contrato depende de toda sua cadeia de ferramentas, não apenas de seu próprio código fonte como um revisor humano o lê. Uma vulnerabilidade introduzida pelo compilador traduzindo código fonte correto e auditado em bytecode defeituoso é invisível para uma revisão de código de nível fonte e para a maioria das ferramentas de análise estática que raciocinam sobre código fonte em vez de saída compilada, que é exatamente por isso que esta classe específica de bug não foi detectada em várias versões do compilador Vyper antes de ser descoberto.

## Conceitos errôneos comuns

**A fórmula especializada de preços da Curve não foi a causa da exploração de julho de 2023.** A vulnerabilidade estava na geração de código do compilador Vyper para a guarda de reentrância, sem relação com a matemática de preços da StableSwap; qualquer contrato compilado com as mesmas versões Vyper afetadas e contando com o mesmo padrão de guarda quebrado carregava o mesmo risco, independente do que a lógica desse contrato fez.

**Uma curva de preços "flatter" não significa um risco mais baixo em geral.** O design do StableSwap reduz a deslize especificamente para a negociação de ativos perto de sua relação esperada; ele não diz nada sobre o risco de contrato inteligente de um pool, dependências de oráculo, ou exposição se os preços dos ativos pareados divergirem daquele rácio esperado mais do que o projeto previsto.

## Outras leituras

- [Whitepaper curvo StableSwap](https://curve.fi/files/stableswap-paper.pdf)
- [Documentação de Finanças Curve](https://resources.curve.fi/)
- Ver também: [Criadores de Mercado Automatizados](./amm.md), [Reentrância](../security/reentrancy.md), [Auditoria inteligente de contratos](../security/auditing.md)

---

[← Anterior: MakerDAO / Sky](./maker.md)
·
[Voltar para DeFi](./README.md)
·
[Próximo: Camada 2 →](../layer2/README.md)
