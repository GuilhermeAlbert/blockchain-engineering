# Sinalização Miner

A sinalização Miner permite que os mineradores indiquem suporte para um soft fork proposto, incorporando um valor específico nos blocos que eles minam, dando à rede uma maneira de medir a prontidão real demonstrada antes de uma mudança de regra ativa. Este capítulo cobre o BIP 9, o mecanismo padronizado que o Bitcoin usou para a maioria de suas ativações de soft fork, e o que acontece quando a sinalização não atinge seu limite.

## Como funciona a sinalização BIP 9

[BIP 9](https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki) reutiliza o campo de versão do cabeçalho do bloco (ver [Cabeçalhos de Blocos](../blockchain/block-headers.md)) como um bit-field: cada soft fork proposto é atribuído um dos 29 bits disponíveis, e um minerador suportando que a proposta específica define o bit correspondente nos blocos que eles minam (ao lado de definir um padrão específico de alta ordem no campo de versão para sinalizar "estes bits são sinais BIP 9", distinguindo este uso dos outros propósitos históricos do campo de versão). Isso permite que várias propostas independentes sinal simultaneamente sem interferir um com o outro, uma vez que cada um recebe seu próprio pedaço dedicado.

## O processo de ativação

BIP 9 define uma máquina de estado cada proposta de soft fork se move através, verificado uma vez por **período de ajustamento da dificuldade** (2016 blocos, ver [Ajuste de Dificuldade](../bitcoin/difficulty-adjustment.md)):

- **DEFINIDOS**: a proposta existe, mas sua janela de sinalização ainda não começou.
- **INÍCIO**: a janela de sinalização está aberta; os mineradores podem começar a definir o bit.
- **LOCALIZADO  IN**: atingiu uma vez pelo menos 95% dos blocos em um único suporte de sinal de 2016-bloco período (este limiar é uma convenção Bitcoin Core dentro do quadro BIP 9, não uma exigência universal do próprio mecanismo). Uma vez travada, a ativação é agora garantida após mais um período de reorientação, independentemente da sinalização nesse período final.
- **ACTIVO**: as novas regras são agora aplicadas.
- **FALHO**: se o tempo limite da janela de sinalização for alcançado sem atingir o limiar LOCKED IN, a proposta falha e precisará ser reintroduzida (potencialmente com um bit ou parâmetros diferentes) para ser tentada novamente.

```text
DEFINED → STARTED → (95% signal in one period?) → LOCKED_IN → ACTIVE
                          │
                          └─ (timeout reached first?) → FAILED
```

## Por que 95%, e o que acontece abaixo dele

O alto limiar é deliberadamente conservador: é para garantir que no momento em que um fork mole se ativa, a esmagadora maioria do poder de haxixe (e, por forte implicação prática, a infraestrutura de mineração e pools que operam na rede) já está preparada para executá-lo, minimizando o risco de as novas regras serem violadas por mineradores despreparados imediatamente após a ativação. Este conservadorismo tem um custo real, demonstrado diretamente pelo próprio histórico de ativação do SegWit (ver [Debate sobre o Tamanho do Bloco](./block-size-war.md)): uma proposta com forte maioria, mas sub-95% apoio minerador pode parar indefinidamente sob pura sinalização BIP 9, que é exatamente a situação que levou a [Soft forks ativados pelo usuário](./uasf.md) como um caminho alternativo quando a sinalização de mineradores sozinho não estava produzindo ativação apesar do aparente suporte mais amplo do ecossistema.

## Speedy Trial: um refinamento posterior

A ativação de Taproot (2021) usou uma abordagem modificada informalmente chamada de "Speedy Trial", uma janela de sinalização mais curta do que as implantações típicas do BIP 9, refletindo lições aprendidas com a barraca de sinalização prolongada do SegWit: ao invés de deixar um longo tempo que poderia se arrastar por anos, Speedy Trial usou uma janela compacta especificamente para obter uma resposta definitiva mais rápida (ou LOCKED IN ou FAILED), com a opção de perseguir caminhos alternativos de ativação mais cedo se a sinalização sozinho não tivesse sucesso. A sinalização de Taproot atingiu o limite necessário dentro desta janela compactada, ativando sem precisar recorrer a um caminho alternativo ao estilo UASF da forma que o SegWit fez.

## Conceitos errôneos comuns

**As medidas de sinalização miner indicaram prontidão, não um voto vinculativo ou um mandato econômico ou político.** Um minerador pode sinalizar suporte e então, em princípio, produzir um bloco não conforme após a ativação (que seria simplesmente rejeitado por nós atualizados). Sinalização é uma ferramenta de coordenação e preparação-mensuração, não um mecanismo que em si impõe qualquer coisa além de acionar a máquina de estado de ativação.

**Sinalização BIP 9 só se aplica a soft forks estruturados para usá-lo**. É um mecanismo de ativação específico, não um requisito universal para cada mudança de protocolo; algumas mudanças usam outros mecanismos inteiramente, incluindo o caminho de ativação alternativo coberto em [Soft forks ativados pelo usuário](./uasf.md).

## Outras leituras

- [BIP 9: bits da versão com tempo limite e atraso](https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki)
- [BIP 8: bits da versão com lock-in no tempo-out](https://github.com/bitcoin/bips/blob/master/bip-0008.mediawiki): um refinamento posterior abordando diretamente algumas das preocupações do BIP 9

---

[← Anterior: Governança de Bitcoin](./governance.md)
·
[Voltar às atualizações de forks e protocolos](./README.md)
·
[Próximo: Soft forks ativados pelo usuário →](./uasf.md)
