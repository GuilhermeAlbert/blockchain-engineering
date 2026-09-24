# BIP

Uma proposta de melhoria de Bitcoin (BIP) é um documento de design formal descrevendo uma mudança proposta, novo recurso, ou pedaço de informação padronizada para o protocolo ou ecossistema Bitcoin. Este capítulo abrange o próprio processo, modelado explicitamente em um processo mais antigo, semelhante de um projeto de código aberto diferente.

## Origem e modelo

O processo BIP, formalizado por Amir Taaki e Luke Dashjr a partir de 2011 via BIP 1 e BIP 2, foi explicitamente modelado no processo PEP (Python Enhancement Proposs), uma escolha deliberada para trazer uma forma estruturada, precedente de propor e documentar mudanças significativas para um projeto que, ao contrário do Python, não tem uma única organização ou figura de ditador benevolente com autoridade final sobre o que é adotado.

## As três categorias

Os BIP são classificados em tipos, cada um com uma finalidade diferente:

- **Faixa de Padrões**: propostas que afetam a maioria ou todas as implementações do Bitcoin, incluindo alterações no protocolo de rede, regras de consenso (bloqueio ou validade de transação), ou qualquer coisa que afete a interoperabilidade entre diferentes partes do software Bitcoin. Esta é a categoria mais macio forks e duro forks cair sob, incluindo [BIP 141 (SegWit)](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki) e [BIP 341 (Taproot)](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki).
- **Informação**: questões de design, diretrizes gerais, ou informações para a comunidade Bitcoin, não propondo uma nova característica; estes não carregam nenhum requisito ou expectativa de implementação.
- **Processo**: propostas sobre um processo em torno do próprio Bitcoin, em vez do protocolo, incluindo alterações no processo BIP, como o próprio BIP 1 e BIP 2.

## O ciclo de vida através do qual um BIP passa

Um BIP normalmente progride através de status, incluindo **Rascunho** (em discussão e revisão activas), **Proposta** (considerado um recurso completo e pronto para uma revisão mais ampla), **Ativo** ou **Final** (implementado, e para uma faixa de padrões BIP descrevendo uma mudança de consenso, realmente ativada na rede), **Rejeitado** (uma proposta que não avançou, que ficou registada), **Retirado** (removido pelo seu próprio autor), ou **Substituido** (superado por um BIP posterior). Um número BIP e um status "Final" não implicam amor universal pela ideia. Eles indicam especificamente que o documento atendeu à completude formal do processo e barra de revisão, e (para propostas de mudança de consenso) que a mudança realmente ativada na rede.

## Editores BIP, não uma autoridade governamental

Os BIP são formalmente atribuídos ao público e fundidos [repositório bitcoin/bips](https://github.com/bitcoin/bips) por designado **Editores de BIP**, um papel focado no processo e na qualidade da documentação (é a proposta claramente escrita, tecnicamente completa, formatada corretamente), explicitamente **não** um papel com autoridade para decidir quais propostas são boas ideias ou devem ser adotadas pela rede. Esta distinção importa diretamente para [Governança do Bitcoin](./governance.md): um editor BIP aceitando um documento no repositório é um ato curador, focado na documentação, não um endosso ou uma garantia de eventual ativação.

## BIP notáveis referenciados ao longo deste livro

| BIP | Assunto | Capítulo |
| --- | --- | --- |
| BIP 9 | Sinalização do soft fork dos bits da versão | [Sinalização Miner](./miner-signaling.md) |
| BIP 16 | Pagar ao Hash do Programa | [P2SH](../bitcoin/p2sh.md) |
| BIP 32 | Carteiras determinísticas Hierárquicas | [Carteiras HD](../wallets/hd-wallets.md) |
| BIP 39 | Código mnemônico para gerar chaves determinísticas (frases de sementes) | [Frases de sementes](../wallets/seed-phrases.md) |
| BIP 44 | Hierarquia multi-contas para carteiras determinísticas | [Caminhos de Derivação](../wallets/derivation-paths.md) |
| BIP 141 | Testemunha Segregada | [SegWit](../bitcoin/segwit.md) |
| BIP 340/341/342 | Assinaturas Taproot e Schnorr | [Taproot](../bitcoin/taproot.md) |

## Conceitos errôneos comuns

**Um BIP não é juridicamente vinculativo ou executório em qualquer sentido**Trata-se de uma convenção de documentação e coordenação que a comunidade de desenvolvedores de Bitcoin adotou voluntariamente; nada impede que uma implementação ignore totalmente um BIP, embora fazê-lo para um BIP amplamente adotado que afeta o consenso significaria cair de consenso com o resto da rede.

**Ter um número BIP não significa que uma proposta seja tecnicamente sólida ou que venha a ser adoptada**O processo aceita rascunhos para discussão estruturada e manutenção de registros; o escrutínio, o debate e, em última análise, a adoção voluntária distribuída decidem se uma ideia realmente se torna parte do protocolo.

## Outras leituras

- [repositório bitcoin/bips](https://github.com/bitcoin/bips)
- [BIP 1: Objetivo e Orientações do BIP](https://github.com/bitcoin/bips/blob/master/bip-0001.mediawiki)
- [BIP 2: Processo BIP, revisto](https://github.com/bitcoin/bips/blob/master/bip-0002.mediawiki)

---

[← Anterior: Atualizações de Protocolo](./upgrades.md)
·
[Voltar às atualizações de forks e protocolos](./README.md)
·
[Próximo: Governança Bitcoin →](./governance.md)
