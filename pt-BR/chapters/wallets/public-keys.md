# Chaves Públicas

Este capítulo é deliberadamente curto: a mecânica criptográfica das chaves públicas são totalmente cobertas em [Chaves particulares e públicas](../cryptography/keys.md). Aqui, o foco é mais estreito, que papel uma chave pública desempenha especificamente dentro software carteira, e onde exatamente se torna visível on-chain.

## Onde uma chave pública realmente aparece na operação de carteira

Uma carteira calcula uma chave pública de cada chave privada que gerencia (através da multiplicação da curva elíptica coberta em [Chaves particulares e públicas](../cryptography/keys.md#derivando-a-chave-pública)), e utiliza-o de duas formas específicas: derivando de um [endereço](./addresses.md) para receber fundos em, e, quando gastar, incluindo a própria chave pública nos dados de desbloqueamento da transação (scriptSig ou testemunha, veja [Entradas e Saídas](../bitcoin/inputs-and-outputs.md)) para que a rede possa verificar a assinatura fornecida contra ela.

## Quando uma chave pública se torna visível na cadeia

Isto vale a pena dizer precisamente, já que é toda a razão [endereços](./addresses.md) existem em vez de compartilhar chaves públicas diretamente: para tipos de script padrão (P2PKH, P2WPKH, P2TR), a chave pública é **não** revelou on-chain quando você *receber* fundos, apenas o endereço (um hash da chave pública) é. A chave pública só se torna visível publicamente no momento em que você *gastar* a partir desse endereço, uma vez que os dados de desbloqueamento devem ser incluídos para verificação da assinatura. Praticamente, isso significa um endereço que recebeu fundos, mas nunca enviou nenhum é mais resistente a qualquer ataque que exigiria conhecer a chave pública (de novo, especulativamente incluindo um futuro ataque de computação quântica) do que um que já foi gasto de.

## Conceitos errôneos comuns

**Uma chave pública não é um endereço**, e não pode ser colado na maioria dos campos "enviar para endereço" como-is, carteiras esperam o codificado, hashed [endereço](./addresses.md) formato, não a chave pública bruta, embora o endereço seja derivado dele.

**Compartilhar sua chave pública não é arriscado na forma como compartilhar sua chave privada é**. É chamado de "público" porque é projetado para ser compartilhado; todo o modelo de segurança depende dessa assimetria (ver [Criptografia de Chave Pública](../cryptography/public-key-cryptography.md)). A consideração da privacidade em torno da exposição à chave pública (discussed acima) é sobre reutilização de endereço e ligação, não sobre a chave em si ser "sensível" da forma que uma chave privada é.

## Outras leituras

- [Chaves particulares e públicas](../cryptography/keys.md): tratamento criptográfico completo

---

[← Anterior: Chaves privadas](./private-keys.md)
·
[Voltar para Wallets e Key Management](./README.md)
·
[Próximo: Frases de sementes →](./seed-phrases.md)
