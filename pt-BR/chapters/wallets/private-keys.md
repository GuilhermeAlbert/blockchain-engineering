# Chaves Privadas

Este capítulo é curto e específico: estabelece exatamente o que uma carteira faz e não faz com uma chave privada, corrigindo as "suas moedas são armazenadas em sua carteira" enquadrando este livro tem sinalizado desde [O Modelo UTXO](../bitcoin/utxo.md). A criptografia subjacente (o que uma chave privada matematicamente é, como uma chave pública é derivada dela) é totalmente coberta em [Chaves particulares e públicas](../cryptography/keys.md); este capítulo é sobre o trabalho específico da carteira gerenciando essa chave.

## O que uma carteira realmente faz com uma chave privada

Uma carteira gera, armazena (de alguma forma) e usa chaves privadas para construir e assinar transações em seu nome. Ele não "contém" seu bitcoin em qualquer sentido literal, seu bitcoin, mais precisamente o [UTXOs](../bitcoin/utxo.md) associado com endereços de controle de suas chaves, existem no próprio blockchain, replicado em cada nó completo na rede. Uma carteira perdendo seus dados de chave privada não destrói nenhum bitcoin; ele destrói seu *capacidade de provar a propriedade e construir transações de despesa válidas* para qualquer UTXOs que a chave controlasse. Os próprios UTXO permanecem, inalterados e impendáveis por qualquer pessoa, para sempre (ver [Moedas Perdidas](../bitcoin/lost-coins.md)).

## Linguagem precisa versus linguagem casual

O compromisso de escrever-princípios deste livro (declarado no nível superior README) diz: não diga "a sua Bitcoin está armazenada na sua carteira". Diz: **"a carteira gerencia as chaves privadas e os dados de transação necessários para gastar UTXOs associados com endereços controlados por essas chaves."** Esta precisão é praticamente importante, não apenas pedancialmente: esclarece porque "apoiar a carteira" realmente significa "apoiar o seu material de chave privada" (ver [Frases de sementes](./seed-phrases.md) e [Chave de backup e recuperação](./recovery.md)), por que mudar o software de carteira não requer "mover" suas moedas em qualquer lugar (você está apenas apontando software diferente para as mesmas chaves, ou gerando novas chaves e enviando uma transação on-chain para eles), e por que a segurança de uma carteira é inteiramente sobre segurança de chave, não sobre "proteger um equilíbrio" a forma como um aplicativo bancário protege um número de conta.

## Como uma carteira realmente gasta fundos, fim a fim

1. Analisa o blockchain (ou consulta um serviço que faz) para UTXOs associados com endereços derivados de suas chaves.
2. Quando você inicia um pagamento, seleciona UTXOs apropriados para usar como entradas (**seleção de moedas**, introduzido em [O Modelo UTXO](../bitcoin/utxo.md#exemplo-calcular-o-saldo-de-uma-carteira)).
3. Constrói uma transação gastando essas entradas, com uma saída pagando o destinatário e, normalmente, uma mudança saída pagando qualquer valor restante de volta para um endereço os controles da carteira.
4. Assina a transação usando a(s) chave(s) privada(s) relevante(s), o passo criptográfico real coberto em [Assinaturas digitais](../cryptography/digital-signatures.md) e [ECDSA](../cryptography/ecdsa.md)/[Assinaturas Schnorr](../cryptography/schnorr.md).
5. Transmite a transação assinada para a rede.

Em nenhum ponto deste processo a chave privada deixa o software da carteira (ou hardware, para um [carteira de hardware](./hardware-wallets.md)) que o detém, apenas a assinatura resultante e os dados de chave pública são sempre transmitidos.

## Conceitos errôneos comuns

**"A minha carteira foi hackeada e a minha Bitcoin foi roubada" é uma descrição comum de um evento real, mas vale a pena ser preciso sobre o que realmente aconteceu**: um atacante ganhou acesso ao material da chave privada (através de malware, um ataque de phishing, um backup comprometido, ou similar, veja [Roubo de Chave Privada](../security/private-key-theft.md)) e o usou para assinar uma transação movendo os UTXOs associados para um endereço que eles controlam. O "roubo" é a assinatura de uma transação válida, devidamente autorizada (pela chave comprometida), não uma violação do próprio blockchain, que continua operando exatamente como projetado em todo.

**Excluir software de carteira não apaga ou destrói nenhum bitcoin.** Se você tiver um backup do material da chave privada (ver [Chave de backup e recuperação](./recovery.md)), qualquer software de carteira que suporte o mesmo formato chave pode reconstruir o acesso total aos mesmos fundos. O software é uma ferramenta para gerenciar chaves, não um valor de retenção de container.

## Outras leituras

- [Chaves particulares e públicas](../cryptography/keys.md): a criptografia subjacente
- Ver também: [Frases de sementes](./seed-phrases.md), [Custodial vs Carteiras Não- Personalizadas](./custody.md)

---

[← Anterior: Endereços](./addresses.md)
·
[Voltar para Wallets e Key Management](./README.md)
·
[Próximo: Chaves públicas →](./public-keys.md)
