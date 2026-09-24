# Finalidade

Finalidade é propriedade de uma transação ou bloco tornando-se permanente e irreversível. Este capítulo define o conceito geral e as três grandes categorias blockchain sistemas caem em (finalidade determinística, probabilística e econômica) antes do próximo capítulo, [Finalidade Probabilística](./probabilistic-finality.md), trabalha através do caso específico de Bitcoin com os números reais.

## O que significa finalidade, precisamente

Uma transação atingiu a finalidade quando não é mais possível (ou praticamente impossível) que ela seja revertida, alterada ou excluída da história canônica em que os participantes do sistema concordam. Isso importa enormemente na prática: um comerciante decidir se deve enviar mercadorias após receber um pagamento de criptomoeda, ou uma troca decidir se deve creditar um depósito, precisa saber o quão confiantes eles podem estar de que o pagamento não vai mais tarde vir a ter sido invertido por uma reorganização em cadeia (ver [Reorganizações da Cadeia](../blockchain/reorgs.md)).

## Três categorias

### Finalidade determinística (absoluta)

Uma transação é deterministicamente final se, uma vez que um evento específico ocorre (um bloco é cometido por um protocolo clássico tolerante à falha bizantina, por exemplo), é **matematicamente garantido** para nunca ser invertida sob os pressupostos declarados do protocolo. Não há distribuição de probabilidade envolvida, apenas um binário antes/depois. Protocolos clássicos de consenso BFT como PBFT (coberto em [Consenso](./consensus.md)) fornecer este tipo de finalidade: uma vez que uma decisão é cometida pela supermaioria requerida, é final, ponto final, enquanto a fração presumida de participantes bizantinos não é excedida.

### Finalidade probabilística

Uma transação tem finalidade probabilística se o *chance* ele fica invertido encolhe ao longo do tempo e confirmações adicionais, aproximando-se, mas nunca matematicamente alcançando exatamente zero. Bitcoin é o exemplo de paradigma: uma transação incluída em um bloco tem alguma (tipicamente já muito pequena) chance de ser revertida se esse bloco acaba por não ser parte da cadeia eventualmente mais longa, e que chance encolhe ainda mais, aproximadamente exponencialmente, com cada bloco adicional minado em cima dele, mas estritamente falando, nenhum número finito de confirmações torna a reversão matematicamente impossível, apenas astronomicamente improvável. Isto é coberto com a fórmula real e números em [Finalidade Probabilística](./probabilistic-finality.md).

### Finalidade econômica

Um terceiro conceito, relacionado, utilizado principalmente em [Prova de Participação](../ethereum/proof-of-stake.md) sistemas como o moderno Ethereum: uma transação ou bloco é economicamente final uma vez que revertê-lo exigiria um atacante para destruir uma quantidade extremamente grande, específica, quantificável de seu próprio capital em jogo (através das regras de corte do protocolo, veja [Cortar](../ethereum/slashing.md)), tornando um ataque economicamente irracional mesmo que fosse tecnicamente possível. Isso difere do modelo probabilístico de Bitcoin, onde o custo de um ataque é uma despesa operacional contínua (menando hardware e eletricidade para superar a cadeia honesta indo em frente), em vez de uma destruição forçada por protocolo de uma vez de capital anteriormente comprometido. O consenso pós-Merge de Ethereum (coberto totalmente em [Finalidade](../ethereum/finality.md)) na verdade combina ambas as ideias: ele alcança uma forma de quase-determinismo ponto de verificação final aproximadamente a cada duas épocas (cerca de 12-13 minutos) através da votação do validador, apoiado pela garantia de corte de finalidade econômica, em vez de confiar puramente na profundidade de confirmação probabilística como Bitcoin faz.

## Comparando os três

| | Determinativo | Probabilística (Bitcoin) | Economia (Ethereum PoS) |
| --- | --- | --- | --- |
| Garantia | Certeza matemática uma vez cometida | Probabilidade aproxima-se de zero, nunca atinge exatamente | Reversão possível, mas economicamente autodestrutiva |
| Tempo típico para uma finalidade forte | Votação única (segundos) | Várias confirmações (Bitcoin: frequentemente ~ 60 minutos para transações de alto valor) | Duas épocas (~12-13 minutos) |
| O que um atacante precisa | Controle sobre o limiar bizantino-falha dos participantes | Mais poder de hash cumulativo do que a rede honesta, sustentada | Disposição de ter uma grande estaca destruída por cortar |

## Por que esta distinção importa praticamente

A escolha do modelo de finalidade forma diretamente como as empresas e os usuários devem se comportar: um comerciante de Bitcoin aceitar um pagamento muito grande razoavelmente espera por mais confirmações do que um aceitar uma xícara de café, porque a curva de probabilidade (coberto próximo) significa confirmações adicionais verdadeiramente adicionar segurança, de uma forma que seja significativa para quantificar contra o valor em risco. Trata-se de um cálculo de risco racional e contínuo em vez de uma regra fixa, e é uma consequência direta e prática da escolha probabilística sobre a finalidade determinística como um tradeoff de design (ver [Teorema da PAC](./cap.md) pela razão subjacente Bitcoin fez esta escolha).

## Conceitos errôneos comuns

**"Confirmado" não significa "matematicamente garantido para sempre" em uma cadeia de finalidade probabilística.** Mesmo as transações com muitas confirmações mantêm um não zero, se desaparecendo pequena, probabilidade teórica de reversão, ver [Finalidade Probabilística](./probabilistic-finality.md) para exatamente quão pequeno, em função da contagem de confirmação e recursos assumidos atacantes.

**Finalidade determinística não é estritamente "melhor" em cada dimensão.** Em geral, exige conhecer com antecedência o conjunto exacto de participantes (ver [Consenso](./consensus.md#duas-dimensões-de-dificuldade)), que é incompatível com o totalmente allowedless, qualquer-pode-juntar modelo Bitcoin foi projetado especificamente para apoiar. A escolha do modelo de finalidade está emaranhada com, não independente, a escolha do modelo participante.

## Outras leituras

- [Whitepaper Bitcoin, Seção 11 (Calculações)](https://bitcoin.org/bitcoin.pdf)
- Ver também: [Teorema da PAC](./cap.md), [Consenso](./consensus.md)

---

[← Anterior: Teorema da PAC](./cap.md)
·
[Voltar aos Sistemas Distribuídos](./README.md)
·
[Próximo: Finalidade Probabilística →](./probabilistic-finality.md)
