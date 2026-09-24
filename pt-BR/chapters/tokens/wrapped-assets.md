# Ativo Embrulhado

Um ativo embrulhado é um token que representa outro ativo, muitas vezes de uma cadeia diferente, ou, no caso específico e importante do éter, um ativo nativo representado em uma forma de token padrão. Este capítulo abrange o mecanismo geral de embrulho antes [Eter embrulhado](./weth.md) cobre especificamente o WETH como o exemplo concreto mais importante.

## O mecanismo geral: bloqueio e hortelã, queimar e soltar

Embrulhamento geralmente segue o mesmo padrão bloqueado-e-minted já introduzido para [Cadeias laterais](../bitcoin-scaling/sidechains.md#o-mecanismo-do-peg): o ativo original é bloqueado (detido por um guardião, um contrato inteligente, ou uma federação de algum tipo, o mecanismo específico que determina o modelo de confiança real do token enrolado), e uma quantidade equivalente de um novo token, conforme padrão, é cunhada em outro lugar, representando uma reivindicação no original bloqueado. Resgatar (desembrulhar) inverte isto: queimar o token embrulhado, libertar o original bloqueado.

```text
Original asset (e.g. BTC, or ETH itself) ──► locked
                                                  │
                                                  ▼
                                     wrapped token minted
                                     (e.g. WBTC, an ERC-20)
                                                  │
                              ... trades, is used in DeFi, etc ...
                                                  │
                                                  ▼
                              wrapped token burned to unwrap
                                                  │
                                                  ▼
                              original asset released
```

## Porquê embrulhar um ativo?

O problema motivador: muitas cadeias e padrões não podem interagir nativamente com ativos de fora de seu próprio ecossistema. O Bitcoin não tem forma nativa de participar num protocolo de empréstimo baseado em Ethereum (ver [DeFi](../defi/README.md)), porque o modelo UTXO de Bitcoin e Bitcoin Script não têm nenhum conceito do modelo de conta de Ethereum ou interface ERC-20 em tudo. Enrolando pontes desta lacuna criando uma representação compatível com o ERC-20 do valor do ativo original, utilizável em qualquer lugar os tokens ERC-20 são utilizáveis, sem exigir que o protocolo subjacente (Bitcoin, neste exemplo) mude algo sobre si mesmo.

## WBTC: Bitcoin, embrulhado para Ethereum

O Bitcoin embrulhado (WBTC) é a implementação mais utilizada do Bitcoin-wrapping: BTC é depositado com e mantido por um guardião (histórico, principalmente BitGo, operando ao lado de uma estrutura de governança baseada em DAO comerciante/custodiano), e uma quantidade equivalente de WBTC (um token ERC-20 comum) é cunhada em Ethereum. Isso torna o modelo de confiança do WBTC explícito e merece ser afirmado claramente, ecoando a mesma análise peg-trust de [Cadeias laterais](../bitcoin-scaling/sidechains.md#por-que-essa-questão-de-confiança-importa-tanto): O valor do WBTC é tão confiável quanto a honestidade e solvência real e contínua do guardião, um pressuposto de confiança real e diferente do que manter o BTC diretamente, não um tecnicismo, e precisamente o tipo de risco de custódia coberto geralmente em [Custodial vs Carteiras Não- Personalizadas](../wallets/custody.md).

## Conceitos errôneos comuns

**Um token embrulhado não é o mesmo ativo que o original, mesmo quando precificado e negociado como se fungível com ele.** A WBTC e a BTC são dois ativos distintos em dois livros de contabilidade distintos, ligados apenas pela promessa do guardião (e, idealmente, prova de reservas auditável transparentemente) para honrar o peg, uma distinção documentada e real que importa especificamente durante qualquer crise de confiança no guardião, quando o preço de mercado de um token embrulhado pode e divergiu do preço do ativo subjacente.

**O embrulho não requer o protocolo do próprio ativo original para suportar ou mesmo estar ciente do embrulho**. O protocolo de Bitcoin não tem nenhum conceito de WBTC e não requer alterações para acomodá-lo; todo o mecanismo de embrulho existe no *destino* cadeia e no arranjo de custódia, totalmente externo às próprias regras de consenso de Bitcoin.

## Outras leituras

- [Documentação do Bitcoin (WBTC) envolvida](https://wbtc.network/)

---

[← Anterior: Emissão e queima](./minting-and-burning.md)
·
[Voltar aos Tokens](./README.md)
·
[Próximo: Ether embrulhado →](./weth.md)
