# Atualizações de Protocolos

Este capítulo é uma pequena ponte entre as distinções mecânicas já abrangidas ([soft forks](./soft-forks.md), [hard forks](./hard-forks.md), [compatibilidade para trás](./backward-compatibility.md)) e os capítulos do processo que se seguem ([BIP](./bips.md), [Governança do Bitcoin](./governance.md)): como é que uma ideia proposta realmente se torna uma mudança de protocolo implantado, fim a fim?

## O caminho geral

As mudanças de protocolo de Bitcoin geralmente se movem através de uma sequência reconhecível, se informal e não estritamente aplicada: uma ideia é discutida (muitas vezes primeiro em listas de discussão ou fóruns de desenvolvedores), formalizada como uma proposta escrita (a [BIP](./bips.md), para alterações suficientemente significativas para justificar uma), implementado e revisto como código real (tipicamente em [Núcleo do Bitcoin](../bitcoin/bitcoin-core.md), embora implementações alternativas também possam propor e implementar mudanças), testadas (nas redes públicas de teste de Bitcoin, `testnet` e `signet`, que existem especificamente para permitir que desenvolvedores e operadores de nó tentem mudanças sem arriscar fundos reais), e finalmente ativado na rede principal através de qualquer mecanismo que se encaixe no perfil de compatibilidade da mudança, [sinalização do minerador](./miner-signaling.md) para muitos soft forks, ou um dia de bandeira coordenada para mudanças que exigem coordenação mais ampla.

## Nenhuma autoridade fixa para o programa de libertação ou o roteiro

Ao contrário do software com uma empresa por trás dele definindo um roteiro, Bitcoin não tem nenhuma entidade com a autoridade para agendar ou garantir quando (ou se) qualquer mudança específica proposta irá realmente ativar. Uma alteração só prossegue na medida em que obtém uma adoção efectiva e voluntária das partes específicas cuja cooperação necessita (mineradores nas ativações por sinalização, operadores de nós para que a rede passe a aplicar as novas regras e usuários e serviços economicamente relevantes para que a mudança tenha efeito prático), examinada na íntegra em [Governança do Bitcoin](./governance.md), que abrange exatamente quem tem influência prática em cada fase e porquê.

## Por que algumas propostas nunca se ativam

Muitos BIP e alterações propostas são escritos, discutidos e nunca implantados. Às vezes porque o consenso não se forma em torno deles, às vezes porque uma abordagem alternativa melhor emerge durante a discussão, e às vezes porque as prioridades do ecossistema mudam antes da implementação e testes completos. Este é um resultado normal e esperado de um processo sem autoridade central que pode simplesmente decidir que uma mudança deve acontecer. É uma característica do modelo de coordenação, não evidência de disfunção, embora isso signifique que a evolução do protocolo pode se mover consideravelmente mais lentamente do que um projeto de software direcionado centralmente poderia.

## Conceitos errôneos comuns

**Um BIP publicado não é o mesmo que uma alteração de protocolo adotada.** Muitos BIP existem puramente como propostas documentadas ou mesmo como ideias rejeitadas, preservadas para o registro histórico, um número BIP sozinho não diz nada sobre se a mudança que descreve foi alguma vez implementada, muito menos ativada na mainnet.

**Bitcoin Código de fusão principal que implementa uma proposta não ativa, por si só, uma alteração de protocolo** para soft forks e hard forks que precisam de ativação de rede mais ampla. O código precisa realmente funcionar em uma parte suficiente da rede e, dependendo do mecanismo de ativação específico, cumprir qualquer limite que esse mecanismo exija, coberto em [Sinalização Miner](./miner-signaling.md).

## Outras leituras

- Ver também: [BIP](./bips.md), [Governança do Bitcoin](./governance.md)

---

[← Anterior: Compatibilidade para trás](./backward-compatibility.md)
·
[Voltar às atualizações de forks e protocolos](./README.md)
·
[Próximo: BIPs →](./bips.md)
