# Regras de Consenso

Regras de consenso são as condições específicas e exatas que cada nó verifica para decidir se um bloco ou transação é válido. Este capítulo define o termo com precisão e estabelece uma distinção (regras de consenso versus regras de política) que importa enormemente para entender como Bitcoin pode mudar ao longo do tempo, sem qualquer autoridade central decidir sobre as mudanças, coberto totalmente em [Atualizações de forks e protocolos](../forks/README.md).

## O que torna uma regra uma regra de consenso

A **regra do consenso** é uma condição de validade que, se violada, torna um bloco ou transação inválida para *cada* Nó que funciona corretamente na rede. Não há ambiguidade ou discrição local envolvida. Exemplos incluem: o hash de um bloco deve estar abaixo do alvo de dificuldade atual, uma transação não pode gastar mais do que a soma de suas entradas, e uma assinatura deve ser criptograficamente válida para a chave que afirma estar gastando. Se mesmo um nó na rede aplicasse uma versão diferente dessas regras do que todos os outros, esse nó eventualmente divergiria da cadeia em que todos concordam, e é exatamente por isso que as regras de consenso exigem um acordo quase universal entre operadores de nó para mudar com segurança (ver [Soft forks](../forks/soft-forks.md) e [Hard fork](../forks/hard-forks.md)).

## O que torna uma regra uma regra política

A **regra política**, pelo contrário, é um *local, opcional* condição de um nó individual ou minerador aplica-se para decidir, por exemplo, quais transações válidas para retransmitir ou incluir em um bloco é mineração, mas uma transação violando uma regra de política (e não uma regra de consenso) ainda é uma transação perfeitamente válida que outros nós com diferentes configurações de política aceitariam sem problema. O exemplo canônico: o padrão do Bitcoin Core **Taxa mínima de retransmissão**, um nó configurado com esta política padrão não irá retransmitir uma transação pagando uma taxa extremamente baixa, mas essa transação não é inválida por consenso; um nó diferentemente configurado, ou um minerador disposto a aceitar uma taxa menor, ainda pode incluí-la em um bloco, e todos os outros nós aceitarão esse bloco como válido uma vez minado, porque o valor da taxa em si não é uma regra de consenso.

## Exemplo: a distinção na prática

| Regra | Tipo | O que acontece se violado |
| --- | --- | --- |
| Block hash deve atender ao alvo de dificuldade | Consenso | Bloco rejeitado por cada nó, incondicionalmente |
| Entradas de transação não devem exceder saídas mais taxa | Consenso | Transação/bloco rejeitado por cada nó |
| A assinatura deve ser criptograficamente válida | Consenso | Transação/bloco rejeitado por cada nó |
| Taxa mínima de retransmissão | Política | Transação não retransmitida *isto* nó, mas ainda válido; outros nós/mineradores podem incluí-lo |
| Limites de tamanho do bloco abaixo do máximo do protocolo (usado em vários pontos no histórico do Bitcoin Core) | Política | Este nó/minerador não construirá um bloco tão grande, mas um bloco maior até o máximo de consenso real ainda é válido |

## Por que esta distinção importa para como Bitcoin evolui

Porque as regras de consenso exigem que todos os nós concordem, alterá-los é um problema de coordenação sem um tomador de decisão central (ver [Governança do Bitcoin](../forks/governance.md)). Uma mudança que não é adotada por uma parcela esmagadora da rede arrisca dividi-la em duas cadeias incompatíveis (ver [Hard fork](../forks/hard-forks.md) e o [Bitcoin Cash](../forks/bitcoin-cash.md) estudo de caso). Regras de política, em contraste, podem ser alteradas unilateralmente por qualquer operador de nó ou pool de mineração a qualquer momento, com risco zero de uma divisão de rede, precisamente porque eles não afetam o que outros nós consideram válido, apenas o que um nó específico escolhe retransmitir ou minar. É também por isso que [soft forks](../forks/soft-forks.md) (que *apertar* regras de consenso (fazendo coisas previamente válidas agora inválidas) em vez de afrouxá-las) podem ser implementadas mais gradualmente e com requisitos de coordenação mais fracos do que hard forks, uma distinção mecânica explorada totalmente na seção Forks.

## Conceitos errôneos comuns

**Regras políticas sendo "opcional" não significa que elas não sejam importantes ou arbitrárias.** Políticas padrão amplamente adotadas (como a taxa mínima de retransmissão) funcionam como um padrão eficaz e informal em toda a rede, mesmo sem ser formalmente aplicado como consenso, porque a maioria dos nós executam software padrão não modificado, mas esta é uma convergência social e prática, não uma exigência de nível de protocolo, e pode e faz mudança ao longo do tempo, conforme os padrões mudam.

**Uma regra sendo "consenso" não significa que está escrito em um único lugar canônico.** As regras de consenso reais do Bitcoin são definidas pelo que o código Bitcoin Core (e, na medida em que alcançam total compatibilidade, implementações alternativas de nó completo) realmente faz ao validar blocos e transações. O código é a especificação em um sentido muito literal, que é parte do porquê mudanças em caminhos de código consenso-críticos são revisadas com tal cuidado particular por desenvolvedores do Bitcoin Core.

## Outras leituras

- [Bitcoin Referência do desenvolvedor principal: As regras do consenso mudam](https://developer.bitcoin.org/devguide/p2p_network.html)
- Ver também: [O que é um fork?](../forks/README.md)

---

[← Anterior: Reorganizações de cadeia](./reorgs.md)
·
[Voltar para Blockchain Fundamentos](./README.md)
·
[Próximo: Escolha do fork →](./fork-choice.md)
