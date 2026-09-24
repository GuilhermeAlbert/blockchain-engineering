# Governança do Bitcoin

O Bitcoin não tem CEO, nem diretor, nem empresa, nem mecanismo de votação formal, mas seu protocolo mudou substancialmente desde 2009, e continua a mudar através de um processo real, se informal, envolvendo vários grupos distintos cujos interesses nem sempre se alinham. Este capítulo cobre como isso realmente funciona, especificamente no contexto de atualizações de protocolo e forks; um tratamento mais completo e comparativo (incluindo a governança de Ethereum e modelos de governança on-chain versus off-chain em geral) está em [Governança](../governance/README.md), mais tarde neste livro.

## Os grupos com influência prática, e o que cada um realmente controla

- **Desenvolvedores principais**: escrever e rever o código (predominantemente, embora não exclusivamente, em [Núcleo do Bitcoin](../bitcoin/bitcoin-core.md)) que se torna a implementação de referência a maioria dos operadores de nó executado. Sua influência vem da expertise técnica, reputação construída através de contribuição sustentada, e controle sobre o código que é fundido na implementação mais amplamente executada, não de qualquer autoridade formal para ditar resultados.
- **Mineradores**: decidir quais transações válidas incluir em blocos e, para soft forks usando [sinalização do minerador](./miner-signaling.md), pode acelerar ou bloquear a ativação de certas mudanças através desse mecanismo de sinalização. Sua influência é limitada: eles não podem forçar a aceitação de blocos inválidos (ver [Nós Completos](../bitcoin/full-nodes.md)), e sua potência de sinalização especificamente se aplica apenas aos mecanismos de ativação projetados em torno dele.
- **Operadores de nós**: finalmente decidir que software (e, portanto, que regras) executar. Como os nós completos validam cada bloco independentemente de suas próprias regras forçadas, independentemente do comportamento dos mineradores, os operadores de nó possuem um veto estrutural real: se uma ação suficiente se recusar a atualizar ou se recusar a aceitar uma mudança, essa mudança não pode ter sucesso como pretendido, não importa quanto suporte de mineradores ou desenvolvedores tenha. Esta é precisamente a dinâmica que produziu [Soft forks ativados pelo usuário](./uasf.md).
- **Usuários economicamente significativos**: intercâmbios, grandes comerciantes, processadores de pagamentos e grandes detentores cuja participação dá uma determinada cadeia de valor e liquidez do mundo real. Uma mudança sem seu apoio corre o risco de ativar em uma cadeia ninguém quer realmente transacionar ou preço significativamente, independentemente dos méritos técnicos da mudança.

## Por que "de consenso" em vez de um voto

A governança de Bitcoin é frequentemente descrita, pelos próprios participantes, usando a frase "através do consenso" (um termo emprestado do próprio processo de padrões informais e não votantes da IETF), ou seja, uma mudança ocorre quando a oposição se tornou suficientemente menor e suficientemente abordada que continuar a bloqueá-la seria visto como irracional, ao invés de quando alguma contagem formal de votos é alcançada. Não há limite fixo, nem cédula, e nenhum único órgão que certifica o consenso foi alcançado. É um julgamento social emergente, formado através de discussão técnica pública (listas de correio, GitHub, conferências de desenvolvedores e comentários públicos dos grupos acima), que é precisamente por isso que pode ser lento, ocasionalmente genuinamente ambíguo sobre se o consenso realmente existe, e ocasionalmente resolvido apenas observando o que a rede realmente faz uma vez que uma mudança é ao vivo (como com [SegWit2x](./segwit2x.md), onde uma falta de prontidão demonstrada da rede levou os organizadores a cancelar um fork rígido planejado em vez de arriscar a divisão de qualquer maneira).

## Controles das alterações unilaterais

Nenhum grupo nesta lista pode alterar unilateralmente as regras do Bitcoin: os desenvolvedores não podem forçar a adoção de código que ninguém corre, os mineradores não podem validar blocos que quebram as regras que os nós completos impõem, e os operadores de nós sozinhos (sem mineradores ou usuários econômicos) não podem praticamente estender uma cadeia com valor real ou produção contínua de blocos por trás dela. Esta estrutura distribuída, mútua-veto é uma deliberada, se informalmente emergiu, projetar propriedade, não um acidente (é a consequência direta governança-camada da descentralização técnica coberta em todo [Sistemas distribuídos](../distributed-systems/README.md) e [Fundamentos da Cadeia de Blocos](../blockchain/README.md), e é precisamente por isso que as mudanças contenciosas historicamente ou não ativaram, ativaram somente após anos de debate e refinamento técnico, ou produziram uma divisão de cadeia real quando o desacordo se mostrou irreconciliável) abordado diretamente nos estudos de caso desta seção.

## Conceitos errôneos comuns

**Os desenvolvedores do Bitcoin Core não têm autoridade unilateral para alterar o protocolo do Bitcoin.** Eles podem mesclar código em um repositório de software específico; se as alterações desse código realmente fazem efeito na rede ao vivo depende inteiramente da adoção voluntária por mineradores, operadores de nó, e o ecossistema mais amplo, uma distinção que este livro mantém ao longo de, inclusive em [Núcleo do Bitcoin](../bitcoin/bitcoin-core.md).

**"Consenso difícil" não é o mesmo que unanimidade**, e a história de Bitcoin inclui várias mudanças genuinamente contenciosas, onde a oposição vocal persistiu através da ativação, consenso áspero descreve um limiar prático para prosseguir apesar de algum desacordo remanescente, não uma alegação de que o desacordo foi eliminado.

## Outras leituras

- [BIP 1: Objetivo e Orientações do BIP](https://github.com/bitcoin/bips/blob/master/bip-0001.mediawiki)
- Ver também: [Governança](../governance/README.md) para o tratamento mais completo, de protocolo cruzado

---

[← Anterior: BIP](./bips.md)
·
[Voltar às atualizações de forks e protocolos](./README.md)
·
[Próximo: Sinalização Miner →](./miner-signaling.md)
