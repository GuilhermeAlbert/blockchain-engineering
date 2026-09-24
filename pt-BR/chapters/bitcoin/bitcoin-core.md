# Núcleo do Bitcoin

Bitcoin Core é a implementação de referência do protocolo Bitcoin, descendente direto do código original Satoshi Nakamoto lançado em janeiro de 2009. Este capítulo cobre o que significa "implementação de referência" para um protocolo sem documento de especificação formal, e como funciona o processo de desenvolvimento do Bitcoin Core.

## Por que não há especificação formal

Ao contrário dos protocolos desenvolvidos através de um corpo de padrões (HTTP através do IETF, por exemplo), o Bitcoin não tem nenhuma especificação de autoria independente contra a qual as implementações sejam verificadas. Bitcoin Código do núcleo **é** a especificação, em um sentido muito literal, prático: as regras de consenso são o que o código impõe, e qualquer implementação alternativa visando a compatibilidade total tem que corresponder exatamente ao comportamento do Bitcoin Core, inclusive em casos de borda que nunca foram explicitamente documentados em qualquer lugar fora do próprio código. Isso tem consequências reais e práticas, um bug sutil na lógica de validação do Bitcoin Core, se fosse amplamente implantado, efetivamente se tornaria um comportamento de consenso "correto" em virtude de ser o que a maioria da rede realmente impõe, um cenário que aconteceu pelo menos uma vez na história do Bitcoin (um fork de cadeia de 2013 causado por uma discrepância de consenso relacionada a um banco de dados entre diferentes versões do Bitcoin Core, resolvido por operadores de nó que coordenam para reconvergir o comportamento da versão mais antiga, mais amplamente desempregada).

## História e linhagem

Satoshi lançou o cliente original como "Bitcoin" (mais tarde informalmente chamado de "Bitcoin-Qt" para sua interface gráfica baseada em Qt, em seguida, "Bitcoin Core" a partir de 2014 para distinguir o software nó/consenso da funcionalidade específica da carteira e outros projetos com marca Bitcoin). Gavin Andresen tornou-se o mantenedor principal do projeto quando Satoshi retirou-se do envolvimento público (ver [Histórico inicial do Bitcoin](../origins/early-bitcoin.md)), e desde então o projeto tem operado com um conjunto rotativo de mantenedores e um grande número de contribuintes regulares, coordenado principalmente através de seu repositório GitHub público em vez de através de qualquer empresa ou fundação com autoridade formal sobre o projeto.

## Processo de desenvolvimento

Bitcoin As mudanças principais passam pela revisão de código público no GitHub, e as mudanças que afetam o consenso, em particular, recebem um escrutínio especialmente cuidadoso dado o risco de um bug na lógica de validação. Alterações nas regras reais do protocolo (em oposição a recursos de software de nó, melhorias de desempenho ou correções de erros que não afetam o consenso) normalmente passam pelo [Processo BIP](../forks/bips.md) para discussão comunitária e, para mudanças contenciosas, alguma forma de demonstrar amplo apoio entre operadores de nó, mineradores e o ecossistema mais amplo antes de serem considerados seguros para implantação. Este processo é analisado na íntegra em [Governança do Bitcoin](../forks/governance.md).

## Implementação alternativa

O Bitcoin Core não é o único software de nó Bitcoin, implementações alternativas como Bitcoin Knots (um fork derivado do Bitcoin Core com políticas padrão adicionais ou diferentes) e várias outras implementações de nó completo existem, embora alcançar e manter total compatibilidade consensual com o comportamento exato de validação do Bitcoin Core é exigir o suficiente para que o Bitcoin Core permaneça, por uma ampla margem, a implementação dominante realmente em execução na rede. Esta concentração é, por vezes, discutida como uma preocupação de centralização (a dependência prática da comunidade sobre a exatidão de uma base de código) distinta, embora relacionada com, a descentralização de nível de rede do protocolo de outra forma.

## Conceitos errôneos comuns

**Bitcoin Core não é uma empresa, e não controla Bitcoin a rede ou moeda em qualquer sentido legal ou financeiro.** É um projeto de software de código aberto; seus mantenedores e contribuintes têm influência sobre o código que é mesclado nesse repositório específico, mas eles não podem forçar os operadores de nó a executar qualquer versão em particular, e o comportamento real da rede é determinado pelo que os operadores de nó de software, em conjunto, escolhem executar.

**A executar a Bitcoin O núcleo não requer retenção, mineração ou uso de bitcoin.** É software de nó; usá-lo como um nó de validação completa é separado de qualquer decisão para também minar ou manter fundos.

## Outras leituras

- [repositório GitHub Núcleo do Bitcoin](https://github.com/bitcoin/bitcoin)
- [Bitcoin Documentação do desenvolvedor principal](https://developer.bitcoin.org/)

---

[← Anterior: Clientes de Luz](./light-clients.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Bitcoin Transações →](./transactions.md)
