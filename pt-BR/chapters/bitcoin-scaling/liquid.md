# Rede líquida

Liquid é uma cadeia lateral federada Bitcoin, operada pela Blockstream desde seu lançamento da mainnet de 2018, projetada principalmente para liquidação mais rápida e quantidades de transações confidenciais, direcionada especificamente para intercâmbios, fabricantes de mercado e outros participantes institucionais que transatam entre si frequentemente e querem mais privacidade e velocidade do que a camada base do Bitcoin fornece. Este capítulo abrange o seu desenho específico como uma instância concreta do padrão geral sidechain do capítulo anterior.

## A Federação

O peg de Liquid é controlado por uma federação de **funcionários**, um conjunto fixo de instituições conhecidas, nomeadas (trocas, empresas Bitcoin e provedores de infraestrutura) que possuem coletivamente as chaves multisig autorizando peg-ins e peg-outs, e que também produzem coletivamente blocos de Liquid (Liquid não usa prova de trabalho; blocos são assinados por um quórum rotativo de funções, um processo muito mais rápido do que a própria mineração de Bitcoin). Esta é uma instância directa e explícita do [cadeia lateral federada](./sidechains.md#o-espectro-de-confiança) Modelo de confiança. A segurança da Liquid para fundos bloqueados depende de um número suficiente desses membros conhecidos da federação permanecer honestos e não conluios, uma suposição de confiança materialmente diferente e mais centralizada do que a segurança de prova de trabalho sem permissão da própria Bitcoin.

## O que o Liquid oferece sobre a camada base do Bitcoin

- **Resolução mais rápida**: cerca de um minuto de tempo de bloco (em comparação com a média de 10 minutos de Bitcoin), com finalidade prática mais rápida para blocos assinados pela federação do que o próprio modelo de finalidade probabilística de Bitcoin fornece.
- **Transações confidenciais**: os montantes das transações e os tipos de ativos estão criptograficamente ocultos da opinião pública (utilizando os compromissos Pedersen, o mesmo compromisso geral primitivo introduzido em [Autorizações](../cryptography/commitments.md#comércio)) embora ainda permita que a rede verifique se as entradas e saídas se equilibram corretamente, uma propriedade de privacidade significativamente mais forte do que a camada base do Bitcoin oferece por padrão, onde as quantidades são totalmente públicas.
- **Ativos emitidos**: Liquid suporta a emissão de ativos adicionais, não-bitcoin nativamente no sidechain (moedas estáveis e tokens de segurança, entre outros casos de uso que algumas instituições implantaram), uma característica da própria camada base do Bitcoin não suporta nativamente.

## Que realmente usa, e porquê

O caso principal de uso documentado da Liquid é a liquidação inter-troca, troca e negociação de empresas que movimentam fundos entre si mais rápido e com mais privacidade do que as transferências de Bitcoin on-chain permitiriam, particularmente valioso durante períodos de alta volatilidade do mercado, quando a liquidação rápida mais importa e as taxas de base da própria Bitcoin e os tempos de confirmação podem ser menos convenientes. Este é um caso de uso mais restrito e especializado do que o próprio Bitcoin serve, refletindo os tradeoffs de design específicos da Liquid (fidedignidade de alimentação, em troca de rapidez e privacidade) sendo bem adaptados às contrapartes institucionais que já têm outras razões para confiar nos membros específicos e conhecidos da federação envolvidos.

## Conceitos errôneos comuns

**O bitcoin líquido (L-BTC) não é o mesmo ativo que o bitcoin de camada de base em termos de garantias de confiança**, mesmo que seja 1:1 e muitas vezes tratada como intercambiável em conversa casual. A segurança da L-BTC depende da honestidade da federação de uma forma que a BTC de camada de base não, uma distinção que vale a pena ter em mente especificamente ao avaliar a custódia ou o risco de contraparte, não apenas uma nota de rodapé técnica.

**Líquido não é uma prova de trabalho blockchain**, apesar de ser uma cadeia lateral Bitcoin, seu mecanismo de produção em bloco (federation signating) é completamente diferente do processo de mineração de Bitcoin, uma diferença estrutural que este livro sinaliza explicitamente ao invés de deixar "sidechain" implicar mecânica de consenso compartilhada.

## Outras leituras

- [Documentação da rede líquida](https://docs.liquid.net/)
- Ver também: [Cadeias laterais](./sidechains.md), [Federações](./federations.md)

---

[← Anterior: Cadeias laterais](./sidechains.md)
·
[Voltar para Bitcoin Scaleing](./README.md)
·
[Próximo: Federações →](./federations.md)
