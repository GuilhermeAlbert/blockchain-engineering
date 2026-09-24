# Capacidade do Canal

Capacidade do canal é o montante total bloqueado na transação de financiamento de um canal, o limite máximo duro no que esse canal pode manter, dividido entre [liquidez de entrada e saída](./liquidity.md) em qualquer proporção o saldo atual reflete. Este breve capítulo abrange os limites práticos e as considerações em torno da capacidade de escolha e gestão.

## O limite de nível de protocolo

Lightning historicamente impôs um tamanho máximo do canal, originalmente 0,16777215 BTC (2^24 - 1 satoshis, um limite ligado a como as quantidades de canal foram codificadas na especificação original) para **não- wumbo** Canais. Nós que optam por **canais wumbo** (um real, se informalmente nomeado, extensão de protocolo suportado por grandes implementações) pode exceder este limite, permitindo canais de tamanho arbitrário por acordo mútuo entre os dois participantes, uma liberação deliberada do padrão conservador original como o protocolo e a confiança de seus operadores na segurança de canal de maior valor amadureceu.

## O tradeoff prático na capacidade de escolha

Um canal maior pode encaminhar ou manter pagamentos individuais maiores sem necessidade [divisão multi-caminho](./routing.md#pagamentos-multicaminho), mas liga mais capital (fundos de ambas as partes, no entanto para cada contribuinte) que de outra forma poderia ser implantado em outro lugar, e representa uma soma maior em risco se o canal precisa ser fechado em condições adversas (ver [Transações de Compromisso](./commitment-transactions.md#cooperativa-contra-fechamento-forçado)) ou se uma contraparte tentar [Sanção por revogação](./payment-channels.md#o-mecanismo-de-revogação) O processo precisa de ser executado. Um canal menor liga-se a menos capital, mas limita o tamanho dos pagamentos que canal específico sozinho pode encaminhar.

## Capacidade versus liquidez, reajustada

Isto vale a pena reafirmar claramente, uma vez que [Liquididade](./liquidity.md) já cobriu o mecanismo, mas a distinção terminológica é fácil de borrar na conversa casual: **capacidade fixa no canal aberto** (alterável apenas através do encerramento e reabertura, ou através de splicing em implementações de apoio); **liquidez é a atual, constante mudança de divisão dessa capacidade fixa** entre os dois lados. A capacidade de um canal nunca lhe diz o que pode enviar ou receber *Agora*, apenas qual é o teto absoluto do canal, independentemente do equilíbrio atual.

## Como a capacidade de rede é monitorada

Porque as capacidades do canal (embora não os saldos) fazem parte do gráfico de rede de fofocas públicas (ver [Roteamento dos Pagamentos](./routing.md#o-desafio-principal)), estatísticas agregadas como "capacidade total de rede" são publicamente computáveis somando a capacidade de cada canal público conhecido, uma métrica de saúde comumente citada, se necessariamente incompleta, para o Lightning Network global, incompleta especificamente porque **canais privados** (canais que opt fora de fofocas públicas, comuns para canais não destinados a rotear pagamentos de terceiros) não são contados em nenhum valor agregado público, o que significa que a capacidade real total, incluindo canais privados, é entendida como sendo maior do que qualquer total publicamente calculado sugere.

## Conceitos errôneos comuns

**A capacidade de um canal não é a mesma que o "equilíbrio" de qualquer das partes nesse canal**, ver [Liquididade](./liquidity.md) para a distinção precisa; capacidade é o total fixo, liquidez é a divisão direcional atual.

**Números de capacidade total de rede citados nos meios de comunicação social ou através de serviços de acompanhamento são subcontáveis**, totais não precisos, porque eles só podem refletir canais públicos fofocados, uma limitação real, estrutural de medir uma rede que deliberadamente permite canais privados, não-broadcast.

## Outras leituras

- [BOLT #2: Protocolo de parceria para gerenciamento de canais (limites de tamanho do canal)](https://github.com/lightning/bolts/blob/master/02-peer-protocol.md)

---

[← Anterior: Liquididade](./liquidity.md)
·
[Voltar à Rede Lightning](./README.md)
·
[Próximo: Torres de Vigia →](./watchtowers.md)
