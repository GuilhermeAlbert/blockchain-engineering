# Moedas Perdidas

Alguma fração significativa de toda a bitcoin já minerada é permanentemente inspecionável, não por causa de qualquer regra de protocolo, mas porque as chaves privadas necessárias para gastá-la desapareceram. Este capítulo cobre como isso acontece, por que é fundamentalmente irrecuperável dado o design de Bitcoin, e por que as estimativas de "quanto é perdido" são necessariamente aproximadas.

## Como as moedas realmente se perdem

Porque o Bitcoin não tem nenhum mecanismo de recuperação de conta, nenhuma linha de suporte ao cliente e nenhum partido central que possa reeditar ou restaurar o acesso (uma consequência direta do [auto- custódia](../wallets/README.md) modelo discutido ao longo da seção Wallets) perder os dados específicos necessários para reconstruir uma chave privada significa perder o acesso aos fundos que controla, permanentemente e completamente, sem recurso teórico. As causas documentadas e plausíveis incluem: hardware descartado ou destruído (o caso frequentemente citado de um homem do Reino Unido cujo disco rígido, supostamente contendo uma carteira com vários milhares de bitcoin extraídos nos primeiros anos do Bitcoin, foi descartado e está agora em um aterro), senhas esquecidas ou senhas protegendo um backup de carteira de outro tipo, perdido ou destruído [frase de semente](../wallets/seed-phrases.md) cópias de segurança sem outra cópia e a morte de um detentor de moeda sem deixar informações de recuperação acessíveis aos herdeiros.

## Por que isto é genuinamente, matematicamente irrecuperável

Isso se conecta diretamente às propriedades de segurança cobertas [Chaves particulares e públicas](../cryptography/keys.md): a segurança de uma chave privada depende inteiramente dela ser computacionalmente inviável para adivinhar ou derivar de qualquer outra coisa, incluindo a sua correspondente chave pública ou endereço (ver [Resistência à Preimagem](../cryptography/preimage-resistance.md)). Esta é precisamente a mesma propriedade que faz Bitcoin seguro contra roubo, mas aplica-se de forma idêntica e sem exceção ao legítimo proprietário de uma moeda que realmente perdeu sua própria chave. Não há nenhum backdoor especial, nenhuma chave mestre, e nenhuma distinção protocolo-nível entre "um atacante tentando adivinhar uma chave privada que eles não possuem" e "um proprietário legítimo que perdeu sua própria chave privada", ambos enfrentam a idêntica, completa inviabilidade de reconstruir uma chave devidamente gerada sem os dados originais.

## Por que as estimativas são aproximadas, e por que elas importam

Ninguém pode distinguir definitivamente, puramente de dados on-chain, entre um UTXO que é verdadeiramente perdido para sempre e um cujo proprietário está simplesmente mantendo longo prazo sem movê-lo. Ambos parecem idênticos no blockchain: um UTXO não movido. Pesquisadores estimam prováveis perdas de heurísticas, tais como idade, roteiros inesperáveis conhecidos e destruição de chaves documentada. O resultado depende dos pressupostos escolhidos, de modo que este livro não apresenta uma estimativa redonda como fato estabelecido.

## Por que isso importa para o valor de 21 milhões

Tal como discutido em [21 milhões de BTC](./21-million.md#o-que-o-limite-máximo-fixo-realmente-garante), o protocolo impõe um máximo *emissão* tampa, não uma garantia sobre circulação ativa. As moedas perdidas significam que a oferta realista, ativamente circulante e gastável sempre foi, e provavelmente permanecerá, significativamente abaixo do máximo teórico de 21 milhões. Alguns observadores consideram que esta situação aumenta ligeiramente a escassez efectiva das moedas que se mantêm verdadeiramente acessíveis e em circulação, embora se trate de uma observação qualitativa, em vez de algo que o protocolo rastreia ou impõe de alguma forma.

## Conceitos errôneos comuns

**As moedas perdidas não são "destruídas" ou removidas do fornecimento total de qualquer forma que o protocolo possa detectar ou explicar.** Eles permanecem, do ponto de vista do protocolo, UTXOs inteiramente comuns e válidos, indistinguíveis nos próprios dados do blockchain de qualquer outra saída não gasta, não movida. "Perdido" é um julgamento humano externo sobre a provável inacessibilidade de uma determinada chave, não um estado de nível de protocolo.

**Não há nenhum processo de recuperação, mecanismo de seguro, ou solução de nível de protocolo para moedas perdidas**, em nítido contraste com muitos sistemas financeiros tradicionais, que normalmente oferecem algum caminho para a recuperação da conta. Esta ausência é uma consequência directa, estrutural, do tradeoff principal do modelo de auto-custodia, coberto por [Custodial vs Carteiras Não- Personalizadas](../wallets/custody.md).

## Outras leituras

- Ver também: [Chaves particulares e públicas](../cryptography/keys.md), [Chave de backup e recuperação](../wallets/recovery.md)

---

[← Anterior: Stock-to-Flow](./stock-to-flow.md)
·
[Voltar para Bitcoin](./README.md)
·
[Próximo: Mercado de taxas →](./fee-market.md)
