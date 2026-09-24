# Roteamento dos Pagamentos

[HTLCs](./htlcs.md) cobriu como um pagamento se move com segurança através de uma cadeia conhecida de canais. Este capítulo cobre como um remetente realmente *encontra* essa cadeia em primeiro lugar, através de uma rede sem coordenador central, e por que este problema, chamado **localização do caminho**, é genuinamente mais difícil do que poderia parecer primeiro.

## O desafio principal

A topologia de rede do Lightning (que os nós têm canais abertos com os quais outros nós, e quanta capacidade cada canal tem) é transmitida através da rede (através de uma **protocolo de fofoca**, onde nós compartilham informações sobre canais públicos com seus pares, que retransmitem). Mas um canal **saldo** (quanta parte da sua capacidade situa-se actualmente em cada lado) é informação privada conhecida apenas pelos dois participantes do canal, não transmitida publicamente. Isso cria um verdadeiro desafio de roteamento: um remetente pode ver o gráfico geral da rede e a capacidade total de cada canal, mas não a divisão do saldo atual específico que determina se um determinado canal pode realmente encaminhar um pagamento de um tamanho específico em uma direção específica *Agora*.

## Roteamento baseado na fonte

Usos de raios **roteamento baseado em código fonte**: o remetente (não nós intermediários) calcula toda a rota com antecedência, usando sua visão local do gráfico de rede pública, antes de enviar o pagamento. Esta é uma escolha de projeto de privacidade deliberada, nós intermediários só aprender o hop imediatamente adjacente antes e depois de si mesmos (através do [roteamento de cebola](#roteamento-da-cebola-privacidade-ao-longo-do-caminho) construção abaixo), não o caminho completo do pagamento ou seu remetente final e destinatário.

## Roteamento da cebola: privacidade ao longo do caminho

Pagamentos relâmpagos usam uma construção baseada em **Esfinge**, um formato de pacote de roteamento de cebola (conceitualmente relacionado ao roteamento de cebola de Tor, adaptado especificamente para roteamento de pagamento). O remetente criptografa instruções de roteamento em camadas, uma por hop, de modo que cada nó intermediário pode descriptografar apenas sua própria camada, aprendendo apenas o suficiente para encaminhar o pagamento para o próximo hop, sem aprender a rota completa, a identidade do remetente original, ou o destinatário final (a menos que esse nó aconteça ser o hop final em si). Isso dá aos pagamentos Lightning uma privacidade significativamente mais forte do que um esquema de roteamento totalmente transparente seria, embora não seja perfeito, sofisticado timing ou análise de correlação de quantidade por nós bem posicionados ou em conluio permanece uma área documentada e estudada de pesquisa de privacidade em andamento para o protocolo.

## Por que o roteamento pode falhar

Como a informação de equilíbrio é privada, a rota escolhida por um remetente pode falhar parcialmente. Um canal intermédio pode não ter capacidade suficiente no lado correto para transmitir o pagamento, embora a sua capacidade total (informação pública) tenha sido suficiente. Quando isso acontece, o pagamento falha nesse salto, HTLCs descontrair para trás ao longo do caminho já tentado (por o mecanismo de manipulação de falhas em [HTLCs](./htlcs.md#o-que-acontece-se-o-pagamento-falhar-a-meio)), e o software do remetente normalmente retorna com uma rota diferente automaticamente, muitas vezes sem o usuário notar nada além de um breve atraso para pagamentos menores, bem conectados.

## Pagamentos multicaminho

Suporte de implementações Modern Lightning **Pagamentos múltiplos (MPP)**, dividindo um único pagamento em várias rotas simultâneas, em vez de exigir que uma rota carregue o montante total, abordando diretamente o problema da restrição de liquidez, uma vez que um pagamento demasiado grande para qualquer rota disponível pode ainda ter êxito ao ser dividido em múltiplos caminhos menores, individualmente suficientes, todos coordenados para ter êxito total ou falhar em conjunto utilizando um identificador de pagamento partilhado.

## Conceitos errôneos comuns

**Os nós de raios não mantêm um mapa completo e em tempo real dos saldos exatos dos canais em toda a rede**. Apenas a capacidade total do canal é pública; as divisões reais de equilíbrio permanecem privadas para os dois participantes do canal, razão pela qual o roteamento pode falhar e requer lógica de repetição.

**Uma tentativa de encaminhamento falhada não coloca fundos em risco**, de acordo com o mecanismo de timeout-and-refund da HTLC, um hop fracassado simplesmente descontrai, com fundos bloqueados retornando aos seus titulares originais em cada fase, não perdidos ou presos (barrando o atraso comum, limitado até que os prazos relevantes expirassem em um pior caso).

## Outras leituras

- [BOLT #7: Nó P2P e Discovery Canal](https://github.com/lightning/bolts/blob/master/07-routing-gossip.md)
- [BOLT # 4: Protocolo de Roteamento de Cebolas](https://github.com/lightning/bolts/blob/master/04-onion-routing.md)

---

[← Anterior: HTLCs](./htlcs.md)
·
[Voltar à Rede Lightning](./README.md)
·
[Próximo: Liquididade →](./liquidity.md)
